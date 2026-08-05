'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Release = {
  version: string;
  published_at: string;
  notes_vi: string | null;
  notes_en: string | null;
  release_artifacts: Array<{
    public_url: string;
    filename: string;
    size_bytes: number;
    sha256: string;
    signature_status: string;
  }> | null;
};

export default function ReleaseDownload({ locale, changelog = false }: { locale: 'vi' | 'en'; changelog?: boolean }) {
  const vi = locale === 'vi';
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;
    void supabase
      .from('software_releases')
      .select('version,published_at,notes_vi,notes_en,release_artifacts(public_url,filename,size_bytes,sha256,signature_status)')
      .eq('platform', 'windows')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(changelog ? 20 : 1)
      .then(({ data }) => {
        setReleases((data as Release[] | null) ?? []);
        setLoading(false);
      });
  }, [changelog]);

  if (loading) {
    return (
      <div className="border hairline bg-paper p-6 text-sm font-mono text-ink/60">
        {vi ? 'Đang kiểm tra bản phát hành…' : 'Checking published releases…'}
      </div>
    );
  }

  if (!releases.length) {
    return (
      <div className="border hairline bg-paper p-6">
        <span className="font-mono text-[11px] text-amber block mb-2">{vi ? 'THÔNG BÁO' : 'NOTICE'}</span>
        <h2 className="font-display font-bold text-ink text-lg">{vi ? 'Chưa có bản phát hành công khai' : 'No public release yet'}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          {vi
            ? 'nATime chỉ công khai bộ cài sau khi chữ ký số Authenticode và mã SHA-256 được xác minh.'
            : 'nATime only publishes installers after digital signature and SHA-256 have been verified.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {releases.map((release) => {
        const artifact = release.release_artifacts?.find((item) => item.signature_status === 'valid');
        return (
          <article key={release.version} className="border hairline bg-paper p-6">
            <div className="flex flex-col justify-between gap-5 sm:flex-row">
              <div>
                <p className="font-mono text-[11px] text-teal">WINDOWS X64</p>
                <h2 className="mt-1 font-display font-bold text-2xl text-ink">nATime {release.version}</h2>
                <p className="mt-1 font-mono text-[12px] text-ink/50">
                  {new Intl.DateTimeFormat(vi ? 'vi-VN' : 'en-US', { dateStyle: 'long' }).format(new Date(release.published_at))}
                </p>
                {(vi ? release.notes_vi : release.notes_en) && (
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/70">
                    {vi ? release.notes_vi : release.notes_en}
                  </p>
                )}
              </div>
              {artifact && !changelog && (
                <a
                  href={artifact.public_url}
                  className="h-fit bg-ink text-paper font-body text-[14px] font-semibold px-5 py-3 hover:bg-graphite transition-colors inline-block"
                >
                  {vi ? 'Tải bộ cài đã ký' : 'Download signed installer'}
                </a>
              )}
            </div>
            {artifact && (
              <dl className="mt-5 grid gap-3 border-t hairline pt-5 text-xs text-ink/70 sm:grid-cols-2">
                <div>
                  <dt className="font-bold text-ink">{vi ? 'Tệp' : 'File'}</dt>
                  <dd className="mt-1 break-all font-mono text-[11px]">{artifact.filename}</dd>
                </div>
                <div>
                  <dt className="font-bold text-ink">SHA-256</dt>
                  <dd className="mt-1 break-all font-mono text-[11px]">{artifact.sha256}</dd>
                </div>
              </dl>
            )}
          </article>
        );
      })}
    </div>
  );
}
