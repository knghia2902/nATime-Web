'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Release = { version: string; published_at: string; notes_vi: string | null; notes_en: string | null; release_artifacts: Array<{ public_url: string; filename: string; size_bytes: number; sha256: string; signature_status: string }> | null };

export default function ReleaseDownload({ locale, changelog = false }: { locale: 'vi' | 'en'; changelog?: boolean }) {
  const vi = locale === 'vi';
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;
    void supabase.from('software_releases').select('version,published_at,notes_vi,notes_en,release_artifacts(public_url,filename,size_bytes,sha256,signature_status)').eq('platform', 'windows').eq('status', 'published').order('published_at', { ascending: false }).limit(changelog ? 20 : 1).then(({ data }) => { setReleases((data as Release[] | null) ?? []); setLoading(false); });
  }, [changelog]);

  if (loading) return <div className="rounded-lg border border-border bg-muted/50 p-6 text-sm text-muted">{vi ? 'Đang kiểm tra bản phát hành…' : 'Checking published releases…'}</div>;
  if (!releases.length) return <div className="rounded-lg border border-amber-200 bg-amber-50 p-6"><h2 className="font-semibold text-amber-900">{vi ? 'Chưa có bản phát hành công khai' : 'No public release yet'}</h2><p className="mt-2 text-sm leading-6 text-amber-900/80">{vi ? 'nATime chỉ công khai bộ cài sau khi chữ ký số và mã SHA-256 được xác minh.' : 'nATime only publishes installers after the digital signature and SHA-256 have been verified.'}</p></div>;

  return <div className="space-y-4">{releases.map((release) => { const artifact = release.release_artifacts?.find((item) => item.signature_status === 'valid'); return <article key={release.version} className="rounded-xl border border-border bg-card p-6"><div className="flex flex-col justify-between gap-5 sm:flex-row"><div><p className="text-sm font-semibold text-primary">Windows x64</p><h2 className="mt-2 text-2xl font-bold text-foreground">nATime {release.version}</h2><p className="mt-2 text-sm text-muted">{new Intl.DateTimeFormat(vi ? 'vi-VN' : 'en-US', { dateStyle: 'long' }).format(new Date(release.published_at))}</p>{(vi ? release.notes_vi : release.notes_en) && <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">{vi ? release.notes_vi : release.notes_en}</p>}</div>{artifact && !changelog && <a href={artifact.public_url} className="h-fit rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90">{vi ? 'Tải bộ cài đã ký' : 'Download signed installer'}</a>}</div>{artifact && <dl className="mt-5 grid gap-3 border-t border-border pt-5 text-xs text-muted sm:grid-cols-2"><div><dt className="font-semibold text-foreground">{vi ? 'Tệp' : 'File'}</dt><dd className="mt-1 break-all">{artifact.filename}</dd></div><div><dt className="font-semibold text-foreground">SHA-256</dt><dd className="mt-1 break-all font-mono">{artifact.sha256}</dd></div></dl>}</article>; })}</div>;
}
