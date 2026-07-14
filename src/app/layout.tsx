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
  title: 'nATime — Giải pháp Chấm công & Kiểm soát Ra vào Thông minh',
  description:
    'nATime cung cấp giải pháp toàn diện cho chấm công thông minh, kiểm soát cổng ra vào, quản lý thiết bị, nhà thầu & khách, cân xe, tài sản CNTT với báo cáo phân tích real-time. Smart Time Attendance & Access Control Solution.',
  keywords: [
    'chấm công',
    'kiểm soát ra vào',
    'access control',
    'time attendance',
    'nATime',
    'quản lý nhân sự',
    'smart attendance',
    'gate access',
  ],
  authors: [{ name: 'nATime' }],
  creator: 'nATime',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    alternateLocale: 'en_US',
    url: 'https://natime.vn',
    siteName: 'nATime',
    title: 'nATime — Smart Time Attendance & Access Control Solution',
    description:
      'Giải pháp toàn diện cho chấm công thông minh, kiểm soát cổng ra vào, quản lý thiết bị và phân tích dữ liệu real-time.',
    images: [
      {
        url: 'https://natime.vn/og-image.png',
        width: 1200,
        height: 630,
        alt: 'nATime — Smart Time Attendance & Access Control',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nATime — Smart Time Attendance & Access Control Solution',
    description:
      'Giải pháp toàn diện cho chấm công thông minh, kiểm soát cổng ra vào, quản lý thiết bị và phân tích dữ liệu real-time.',
    images: ['https://natime.vn/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
