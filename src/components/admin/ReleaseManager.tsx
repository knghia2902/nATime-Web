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
    minute: '2-digit'
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
        notesEn: form.get('notesEn')
      }
    });
    if (error || !data?.uploadUrl) {
      setBusy(false);
      setMessage('Không thể khởi tạo upload. Kiểm tra MFA và cấu hình R2.');
      return;
    }
    const uploadResponse = await fetch(data.uploadUrl, {
      method: 'PUT',
      headers: { 'content-type': 'application/vnd.microsoft.portable-executable' },
      body: file
    });
    if (!uploadResponse.ok) {
      setBusy(false);
      setMessage('Upload R2 thất bại.');
      return;
    }
    const completed = await supabase.functions.invoke('release-upload-complete', {
      body: { releaseId: data.releaseId, artifactId: data.artifactId }
    });
    setBusy(false);
    setMessage(
      completed.error
        ? 'Đã upload nhưng chưa thể bắt đầu xác minh.'
        : 'Đã upload. Windows runner đang xác minh Authenticode và SHA-256.'
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
      body: { releaseId, action: 'withdraw' }
    });
    setBusy(false);
    setMessage(error ? 'Không thể rút release.' : 'Release đã được rút khỏi trang tải xuống.');
    await load();
  }

  return (
    <div className="space-y-8">
      {/* Form Card */}
      <form
        onSubmit={upload}
        className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm transition-all"
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Upload Bản Phát Hành Mới</h2>
            <p className="text-xs font-medium text-muted">
              Khởi tạo tải lên bộ cài .exe an toàn lên R2 storage để xác minh chữ ký số Authenticode.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Version input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted">
              Phiên bản <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                required
                name="version"
                pattern="[0-9]+\.[0-9]+\.[0-9]+"
                placeholder="0.1.2"
                className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-mono font-bold text-foreground placeholder:text-muted focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
              />
            </div>
            <p className="text-[11px] font-medium text-muted">Định dạng Semantic Versioning (ví dụ: 1.0.0)</p>
          </div>

          {/* Installer file upload styled dropzone */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted">
              Bộ cài đã ký (.exe) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <label className="group flex flex-col items-center justify-center border-2 border-dashed border-border hover:border-blue-500 rounded-xl p-4 bg-muted/20 cursor-pointer transition-colors text-center">
                <input
                  required
                  name="installer"
                  type="file"
                  accept=".exe,application/vnd.microsoft.portable-executable"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                  className="sr-only"
                />
                <svg className="h-6 w-6 text-muted group-hover:text-blue-500 transition-colors mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-xs font-bold text-muted truncate max-w-[240px]">
                  {selectedFile ? selectedFile.name : 'Nhấp để chọn hoặc kéo thả file .exe vào đây'}
                </span>
                {selectedFile && (
                  <span className="text-[10px] text-blue-600 mt-0.5 font-mono font-bold">
                    {formatBytes(selectedFile.size)}
                  </span>
                )}
              </label>
            </div>
          </div>

          {/* Notes VI */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted">
              Ghi chú tiếng Việt
            </label>
            <textarea
              name="notesVi"
              rows={3}
              placeholder="Mô tả các thay đổi, tính năng mới hoặc sửa lỗi bằng tiếng Việt..."
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground placeholder:text-muted focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
            />
          </div>

          {/* Notes EN */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted">
              English notes
            </label>
            <textarea
              name="notesEn"
              rows={3}
              placeholder="Description of changes, features or bug fixes in English..."
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground placeholder:text-muted focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
          <button
            type="submit"
            disabled={busy}
            className="btn-gradient w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {busy ? (
              <>
                <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Đang xử lý…</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Upload bản nháp</span>
              </>
            )}
          </button>

          {message && (
            <div className="w-full sm:w-auto flex-1 text-sm font-semibold rounded-xl bg-muted/50 px-4 py-2 border border-border text-foreground">
              {message}
            </div>
          )}
        </div>
      </form>

      {/* Release List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
            Danh sách phát hành ({releases.length})
          </h3>
        </div>

        {releases.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm font-medium text-muted shadow-sm">
            Chưa có bản phát hành nào được upload.
          </div>
        ) : (
          releases.map((release) => {
            const artifact = release.release_artifacts?.[0];
            const isVerified = release.status === 'verified';
            const isPublished = release.status === 'published';

            let statusBadge = (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Bản nháp ({release.status})
              </span>
            );

            if (isVerified) {
              statusBadge = (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                  Đã xác minh
                </span>
              );
            } else if (isPublished) {
              statusBadge = (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.5)]" />
                  Đã công khai
                </span>
              );
            }

            const sigStatus = artifact?.signature_status ?? '—';
            const sigStyle =
              sigStatus === 'valid' || sigStatus === 'verified'
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                : 'text-muted bg-muted/50 border-border';

            return (
              <article
                key={release.id}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="text-lg font-black text-foreground tracking-tight">
                        nATime {release.version}
                      </h4>
                      {statusBadge}
                      <span className="text-xs font-medium text-muted">
                        {formatDate(release.created_at)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span className="font-bold text-foreground bg-muted/50 px-2.5 py-1 rounded-md border border-border">
                        {artifact?.filename ?? 'Chưa có artifact'}
                        {artifact?.size_bytes ? ` (${formatBytes(artifact.size_bytes)})` : ''}
                      </span>

                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${sigStyle}`}>
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Chữ ký: {sigStatus}
                      </span>
                    </div>

                    {artifact?.sha256 && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2 text-[11px] text-muted mb-1 font-bold">
                          <span>SHA-256 Checksum:</span>
                        </div>
                        <p className="break-all font-mono text-xs font-semibold text-foreground bg-muted/20 p-2.5 rounded-xl border border-border">
                          {artifact.sha256}
                        </p>
                      </div>
                    )}

                    {release.notes_vi && (
                      <p className="text-xs text-muted font-medium line-clamp-2 italic">
                        &ldquo;{release.notes_vi}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
                    {isVerified && (
                      <button
                        onClick={() => void publish(release.id)}
                        disabled={busy}
                        className="h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm disabled:opacity-60 flex items-center gap-1.5 cursor-pointer"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Publish</span>
                      </button>
                    )}

                    {isPublished && (
                      <button
                        onClick={() => void withdraw(release.id)}
                        disabled={busy}
                        className="h-9 px-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs transition-colors disabled:opacity-60 flex items-center gap-1.5 cursor-pointer"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        <span>Rút bản</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
