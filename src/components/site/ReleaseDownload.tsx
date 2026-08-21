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

const DEFAULT_WINDOWS_RELEASES: Release[] = [
  {
    version: '0.1.63',
    published_at: '2026-08-21T01:04:29Z',
    notes_vi: 'Bản cài đặt nATime Windows x64 chính thức — Tự động thiết lập SQL Server, backend Web API .NET 10 và trạm điều hành On-Premise.',
    notes_en: 'Official nATime Windows x64 release — Automatically sets up SQL Server, .NET 10 Web API backend and on-premise operational hub.',
    release_artifacts: [
      {
        public_url: 'https://download.natime.vn/windows/0.1.63/nATime-Setup-v0.1.63.exe',
        filename: 'nATime-Setup-v0.1.63.exe · 825.1 MB',
        size_bytes: 865184267,
        sha256: 'A61F275B4EA53BDFDC3CAD9A755701AAA75ED43333B6602B1481A0A1B96981F5',
        signature_status: 'valid',
      },
    ],
  },
];

export default function ReleaseDownload({ locale, changelog = false }: { locale: 'vi' | 'en'; changelog?: boolean }) {
  const vi = locale === 'vi';
  const [releases, setReleases] = useState<Release[]>(DEFAULT_WINDOWS_RELEASES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    
    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 1500);

    supabase
      .from('software_releases')
      .select('version,published_at,notes_vi,notes_en,release_artifacts(public_url,filename,size_bytes,sha256,signature_status)')
      .eq('platform', 'windows')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(changelog ? 20 : 1)
      .then(({ data }) => {
        clearTimeout(timer);
        if (!isMounted) return;
        const fetched = data as Release[] | null;
        if (fetched && fetched.length > 0) {
          setReleases(fetched);
        }
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(timer);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [changelog]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 text-sm font-mono text-white/60 backdrop-blur">
        {vi ? 'Đang kiểm tra bản phát hành…' : 'Checking published releases…'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {releases.map((release) => {
        const artifact = release.release_artifacts?.find((item) => item.signature_status === 'valid') ?? release.release_artifacts?.[0];
        return (
          <article key={release.version} className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 backdrop-blur">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-white/70">Windows x64</p>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                    {vi ? 'Bản chính thức' : 'Official release'}
                  </span>
                </div>
                <h2 className="mt-2 text-2xl font-bold text-white">nATime {release.version}</h2>
                <p className="mt-1 font-mono text-[12px] text-white/40">
                  {new Intl.DateTimeFormat(vi ? 'vi-VN' : 'en-US', { dateStyle: 'long' }).format(new Date(release.published_at))}
                </p>
                {(vi ? release.notes_vi : release.notes_en) && (
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
                    {vi ? release.notes_vi : release.notes_en}
                  </p>
                )}
              </div>
              {artifact && !changelog && (
                <a
                  href={artifact.public_url}
                  className="h-fit rounded-xl bg-white text-[#0a1628] text-sm font-bold px-5 py-3 hover:bg-white/85 transition-all shadow-[0_2px_12px_rgba(255,255,255,0.15)] inline-block text-center cursor-pointer shrink-0"
                >
                  {vi ? 'Tải bộ cài đã ký' : 'Download signed installer'}
                </a>
              )}
            </div>
            {artifact && (
              <dl className="mt-5 grid gap-3 border-t border-white/[0.08] pt-5 text-xs text-white/60 sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-white">{vi ? 'Tệp bộ cài' : 'Installer File'}</dt>
                  <dd className="mt-1 break-all font-mono text-white/70">{artifact.filename}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-white">SHA-256</dt>
                  <dd className="mt-1 break-all font-mono text-[10.5px] text-white/70">{artifact.sha256}</dd>
                </div>
              </dl>
            )}
          </article>
        );
      })}
    </div>
  );
}
