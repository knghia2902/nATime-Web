'use client';

import { FormEvent, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Release = {
  id: string;
  version: string;
  status: string;
  notes_vi: string | null;
  created_at: string;
  verified_at: string | null;
  published_at: string | null;
  release_artifacts: Array<{
    id: string;
    filename: string;
    size_bytes: number;
    sha256: string | null;
    signature_status: string;
  }> | null;
};

type InitResponse = { releaseId: string; artifactId: string; uploadUrl: string };

function formatDate(iso: string | null) {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default function ReleaseManager() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  async function load() {
    if (!supabase) return;
    const { data } = await supabase
      .from('software_releases')
      .select('id,version,status,notes_vi,created_at,verified_at,published_at,release_artifacts(id,filename,size_bytes,sha256,signature_status)')
      .order('created_at', { ascending: false });
    setReleases((data as Release[] | null) ?? []);
  }

  useEffect(() => {
    queueMicrotask(() => void load());
  }, []);

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    const form = new FormData(event.currentTarget);
    const file = form.get('installer');
    if (!(file instanceof File) || !file.name.toLowerCase().endsWith('.exe')) {
      setMessage('Chỉ chấp nhận bộ cài .exe.');
      return;
    }
    setBusy(true);
    setMessage('Đang tạo vùng upload an toàn…');
    const { data, error } = await supabase.functions.invoke<InitResponse>('release-upload-init', {
      body: {
        version: form.get('version'),
        filename: file.name,
        sizeBytes: file.size,
        notesVi: form.get('notesVi'),
        notesEn: form.get('notesEn'),
      },
    });
    if (error || !data?.uploadUrl) {
      setBusy(false);
      setMessage('Không thể khởi tạo upload. Kiểm tra MFA và cấu hình R2.');
      return;
    }
    const uploadResponse = await fetch(data.uploadUrl, {
      method: 'PUT',
      headers: { 'content-type': 'application/vnd.microsoft.portable-executable' },
      body: file,
    });
    if (!uploadResponse.ok) {
      setBusy(false);
      setMessage('Upload R2 thất bại.');
      return;
    }
    const completed = await supabase.functions.invoke('release-upload-complete', {
      body: { releaseId: data.releaseId, artifactId: data.artifactId },
    });
    setBusy(false);
    setMessage(
      completed.error
        ? 'Đã upload nhưng chưa thể bắt đầu xác minh.'
        : 'Đã upload. Windows runner đang xác minh Authenticode và SHA-256.',
    );
    await load();
  }

  async function publish(releaseId: string) {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.functions.invoke('release-publish', { body: { releaseId } });
    setBusy(false);
    setMessage(error ? 'Không thể publish. Release phải được xác minh hợp lệ.' : 'Release đã được công khai.');
    await load();
  }

  async function withdraw(releaseId: string) {
    if (!supabase || !window.confirm('Rút bản phát hành này khỏi trang tải xuống?')) return;
    setBusy(true);
    const { error } = await supabase.functions.invoke('release-publish', {
      body: { releaseId, action: 'withdraw' },
    });
    setBusy(false);
    setMessage(error ? 'Không thể rút release.' : 'Release đã được rút khỏi trang tải xuống.');
    await load();
  }

  return (
    <div className="space-y-8">
      {/* Upload Form (Matching admin.html 06 / RELEASE WINDOWS) */}
      <form onSubmit={upload} className="border hairline bg-white p-6 md:p-8 space-y-4">
        <div className="border-b hairline pb-4">
          <p className="font-mono text-[11px] text-teal">RELEASE WINDOWS</p>
          <h2 className="font-display font-bold text-lg text-ink mt-1">Upload Bản Phát Hành Mới</h2>
          <p className="font-body text-xs text-ink/60 mt-1">
            Tải bộ cài .exe đã ký số Authenticode lên lưu trữ R2 để tự động xác minh và công khai.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="font-body text-[13px] text-ink/60 block mb-1.5">Phiên bản (SemVer)</label>
            <input
              required
              name="version"
              pattern="[0-9]+\.[0-9]+\.[0-9]+"
              placeholder="4.2.2"
              className="w-full border hairline px-3.5 py-2.5 font-mono text-[14px] font-bold bg-white outline-none focus:border-ink"
            />
          </div>

          <div>
            <label className="font-body text-[13px] text-ink/60 block mb-1.5">Bộ cài .exe</label>
            <input
              required
              name="installer"
              type="file"
              accept=".exe,application/vnd.microsoft.portable-executable"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              className="w-full border hairline px-3.5 py-2 font-body text-[13px] bg-white outline-none"
            />
          </div>

          <div>
            <label className="font-body text-[13px] text-ink/60 block mb-1.5">Ghi chú tiếng Việt</label>
            <textarea
              name="notesVi"
              rows={3}
              placeholder="Ghi chú về bản cập nhật..."
              className="w-full border hairline px-3.5 py-2.5 font-body text-[14px] bg-white resize-none outline-none focus:border-ink"
            />
          </div>

          <div>
            <label className="font-body text-[13px] text-ink/60 block mb-1.5">English notes</label>
            <textarea
              name="notesEn"
              rows={3}
              placeholder="Release notes in English..."
              className="w-full border hairline px-3.5 py-2.5 font-body text-[14px] bg-white resize-none outline-none focus:border-ink"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            disabled={busy}
            className="bg-ink text-paper font-body text-[14px] font-semibold px-6 py-2.5 hover:bg-graphite transition-colors cursor-pointer disabled:opacity-50"
          >
            {busy ? 'Đang upload…' : 'Upload bản phát hành'}
          </button>
          {message && <span className="font-mono text-xs text-teal">{message}</span>}
        </div>
      </form>

      {/* Release List Table (Matching admin.html 06 / RELEASE WINDOWS table) */}
      <section>
        <p className="font-mono text-[11px] text-teal tracking-wide mb-4">DANH SÁCH BẢN PHÁT HÀNH</p>
        <div className="border hairline overflow-x-auto">
          <table className="w-full text-left font-body text-[13px]">
            <thead>
              <tr className="border-b hairline bg-white/60">
                <th className="py-3 px-4 text-ink/50 font-medium">Phiên bản</th>
                <th className="py-3 px-4 text-ink/50 font-medium">Ngày phát hành</th>
                <th className="py-3 px-4 text-ink/50 font-medium">Kích thước</th>
                <th className="py-3 px-4 text-ink/50 font-medium">Ghi chú</th>
                <th className="py-3 px-4 text-ink/50 font-medium">Trạng thái</th>
                <th className="py-3 px-4 text-ink/50 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[12px]">
              {releases.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan={6} className="py-6 px-4 text-center text-ink/50 font-body">Chưa có bản phát hành nào.</td>
                </tr>
              ) : (
                releases.map((release) => {
                  const artifact = release.release_artifacts?.[0];
                  const isVerified = release.status === 'verified';
                  const isPublished = release.status === 'published';

                  return (
                    <tr key={release.id} className="border-b hairline bg-white">
                      <td className="py-3 px-4 font-bold text-ink">{release.version}</td>
                      <td className="py-3 px-4 text-ink/60">{formatDate(release.published_at || release.created_at)}</td>
                      <td className="py-3 px-4">{artifact ? formatBytes(artifact.size_bytes) : '—'}</td>
                      <td className="py-3 px-4 font-body text-ink/80">{release.notes_vi || '—'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 ${isPublished ? 'bg-teal/10 text-teal' : isVerified ? 'bg-amber/10 text-amber' : 'bg-ink/10 text-ink/60'}`}>
                          {isPublished ? 'Đang phát hành' : isVerified ? 'Đã xác minh' : release.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {isVerified && (
                          <button onClick={() => void publish(release.id)} disabled={busy} className="text-teal font-bold hover:underline cursor-pointer">
                            Publish →
                          </button>
                        )}
                        {isPublished && (
                          <button onClick={() => void withdraw(release.id)} disabled={busy} className="text-red-600 font-bold hover:underline cursor-pointer">
                            Rút bản
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
