import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n';
import { AuthProvider } from '@/lib/authContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://natime.vn'),
  title: {
    default: 'nATime — Phần mềm chấm công cho doanh nghiệp',
    template: '%s | nATime',
  },
  description:
    'Phần mềm chấm công và quản lý thiết bị dành cho doanh nghiệp, cài đặt trên Windows và kích hoạt bằng bản quyền nATime.',
  keywords: ['chấm công', 'kiểm soát ra vào', 'time attendance', 'nATime', 'quản lý nhân sự'],
  authors: [{ name: 'nATime' }],
  creator: 'nATime',
  alternates: { canonical: '/', languages: { vi: '/', en: '/en' } },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    alternateLocale: 'en_US',
    url: 'https://natime.vn',
    siteName: 'nATime',
    title: 'nATime — Phần mềm chấm công cho doanh nghiệp',
    description: 'Cài đặt trên Windows, quản lý chấm công và thiết bị trong một hệ thống.',
  },
  twitter: {
    card: 'summary',
    title: 'nATime — Phần mềm chấm công cho doanh nghiệp',
    description: 'Cài đặt trên Windows, quản lý chấm công và thiết bị trong một hệ thống.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans text-slate-950 antialiased">
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
