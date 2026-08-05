'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';

type Locale = 'vi' | 'en';

const labels = {
  vi: {
    home: 'Trang chủ',
    features: 'Tính năng',
    pricing: 'Bảng giá',
    blog: 'Blog',
    contact: 'Liên hệ',
    demo: 'Yêu cầu demo',
    portal: 'Cổng khách hàng',
    login: 'Đăng nhập',
    menu: 'Mở menu',
    close: 'Đóng menu',
  },
  en: {
    home: 'Home',
    features: 'Features',
    pricing: 'Pricing',
    blog: 'Blog',
    contact: 'Contact',
    demo: 'Request Demo',
    portal: 'Customer Portal',
    login: 'Sign in',
    menu: 'Open menu',
    close: 'Close menu',
  },
};

function localPath(locale: Locale, path: string) {
  return locale === 'en' ? `/en${path === '/' ? '' : path}` : path;
}

export default function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const text = labels[locale];

  const nav = [
    [text.home, localPath(locale, '/')],
    [text.features, localPath(locale, '/features')],
    [text.pricing, localPath(locale, '/pricing')],
    [text.blog, localPath(locale, '/blog')],
    [text.contact, localPath(locale, '/contact')],
  ];

  const isActive = (href: string) => {
    if (href === localPath(locale, '/')) return pathname === href;
    return pathname.startsWith(href);
  };

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo with /logo.png */}
          <Link href={localPath(locale, '/')} className="flex items-center gap-2.5 font-sans font-800 text-lg tracking-tight text-ink">
            <Image src="/logo.png" alt="nATime" width={28} height={28} className="h-7 w-7 object-contain" />
            <span>natime</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-sans text-[14px] text-sub">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-ink transition-colors ${
                  isActive(href) ? 'text-ink font-600' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href={user ? '/portal' : '/login'}
              className="hidden md:inline font-sans text-[14px] font-500 text-sub hover:text-ink"
            >
              {user ? text.portal : text.login}
            </Link>
            <Link
              href="/contact"
              className="font-sans text-[14px] font-600 bg-indigo text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {text.demo}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
