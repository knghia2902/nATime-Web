import type { Metadata } from 'next';
import { Be_Vietnam_Pro, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n';
import { AuthProvider } from '@/lib/authContext';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '700', '800'],
  display: 'swap',
  variable: '--font-display',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-body',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://natime.vn'),
  title: {
    default: 'nATime - Nen tang van hanh nha may',
    template: '%s | nATime',
  },
  description:
    'nATime hop nhat cham cong, kiem soat ra vao, tram can va quan ly tai san vao mot he thong duy nhat.',
  keywords: ['cham cong', 'kiem soat ra vao', 'tram can', 'quan ly tai san', 'nATime', 'nha may'],
  authors: [{ name: 'nATime' }],
  creator: 'nATime',
  alternates: { canonical: '/', languages: { vi: '/', en: '/en' } },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    alternateLocale: 'en_US',
    url: 'https://natime.vn',
    siteName: 'nATime',
    title: 'nATime - Nen tang van hanh nha may',
    description: 'Hop nhat cham cong, kiem soat ra vao, tram can va quan ly tai san.',
  },
  twitter: {
    card: 'summary',
    title: 'nATime - Nen tang van hanh nha may',
    description: 'Hop nhat cham cong, kiem soat ra vao, tram can va quan ly tai san.',
  },
  robots: { index: true, follow: true },
};

import { AnalyticsTracker } from '@/components/AnalyticsTracker';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <LanguageProvider>
          <AuthProvider>
            <AnalyticsTracker />
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
