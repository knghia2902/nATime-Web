import type { Metadata } from 'next';

const origin = 'https://natime.vn';

export function publicPageMetadata(
  title: string,
  description: string,
  path: string,
  locale: 'vi' | 'en',
): Metadata {
  const normalizedPath = path === '/' ? '' : path;
  const viPath = normalizedPath || '/';
  const enPath = `/en${normalizedPath}`;
  const canonical = locale === 'en' ? enPath : viPath;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { vi: viPath, en: enPath, 'x-default': viPath },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      url: new URL(canonical, origin),
      title,
      description,
      siteName: 'nATime',
    },
  };
}
