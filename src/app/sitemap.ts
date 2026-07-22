import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const origin = 'https://natime.vn';
const paths = [
  '',
  '/features',
  '/pricing',
  '/download',
  '/docs',
  '/changelog',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/payment-delivery-policy',
  '/refund-policy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => [
    {
      url: `${origin}${path}`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: path === '/changelog' || path === '/download' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.7,
      alternates: { languages: { vi: `${origin}${path}`, en: `${origin}/en${path}` } },
    },
    {
      url: `${origin}/en${path}`,
      lastModified: new Date('2026-07-15'),
      changeFrequency: path === '/changelog' || path === '/download' ? 'weekly' : 'monthly',
      priority: path === '' ? 0.9 : 0.6,
      alternates: { languages: { vi: `${origin}${path}`, en: `${origin}/en${path}` } },
    },
  ]);
}
