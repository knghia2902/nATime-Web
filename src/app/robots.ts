import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/portal', '/dashboard', '/admin', '/login', '/register', '/reset-password'],
    },
    sitemap: 'https://natime.vn/sitemap.xml',
    host: 'https://natime.vn',
  };
}
