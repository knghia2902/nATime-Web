import type { Metadata } from 'next';
import { Inter, Be_Vietnam_Pro, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n';
import { AuthProvider } from '@/lib/authContext';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

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
    default: 'nATime — Nền tảng vận hành nhà máy',
    template: '%s | nATime',
  },
  description:
    'nATime hợp nhất chấm công, kiểm soát ra vào, trạm cân và quản lý tài sản vào một hệ thống duy nhất.',
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
    title: 'nATime — Nền tảng vận hành nhà máy',
    description: 'Hợp nhất chấm công, kiểm soát ra vào, trạm cân và quản lý tài sản.',
  },
  twitter: {
    card: 'summary',
    title: 'nATime — Nền tảng vận hành nhà máy',
    description: 'Hợp nhất chấm công, kiểm soát ra vào, trạm cân và quản lý tài sản.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${inter.variable} ${beVietnamPro.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-screen bg-page font-sans text-ink antialiased">
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
