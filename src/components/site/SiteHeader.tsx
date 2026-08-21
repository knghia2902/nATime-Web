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
    support: 'Hỗ trợ',
    demo: 'Yêu cầu demo',
    portal: 'Portal',
    login: 'Đăng nhập',
    menu: 'Mở menu',
    close: 'Đóng menu',
  },
  en: {
    home: 'Home',
    features: 'Features',
    pricing: 'Pricing',
    blog: 'Blog',
    support: 'Support',
    demo: 'Request Demo',
    portal: 'Portal',
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
  const [, setOpen] = useState(false);
  const text = labels[locale];

  const nav = [
    [text.home, localPath(locale, '/')],
    [text.features, localPath(locale, '/features')],
    [text.pricing, localPath(locale, '/pricing')],
    [text.blog, localPath(locale, '/blog')],
    [text.support, localPath(locale, '/support')],
  ];

  const isActive = (href: string) => {
    if (href === localPath(locale, '/')) return pathname === href;
    return pathname.startsWith(href);
  };

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-[#101c2e]/40 backdrop-blur-2xl border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={localPath(locale, '/')} className="flex items-center gap-2.5 font-sans font-bold text-base tracking-tight text-white select-none">
          <Image src="/logo.png" alt="nATime" width={28} height={28} className="h-7 w-7 object-contain" />
          <span>nATime</span>
        </Link>

        {/* Desktop Nav Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08] backdrop-blur-md">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                isActive(href)
                  ? 'bg-white/10 text-white shadow-xs'
                  : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href={user ? '/portal' : '/login'}
            className="hidden sm:inline-flex btn-pill-glass !h-9 !py-0 !px-4 text-sm font-medium border border-white/10"
          >
            {user ? text.portal : text.login}
          </Link>
          <Link
            href="/contact"
            className="btn-pill-primary !h-9 !py-0 !px-4 text-sm font-semibold"
          >
            {text.demo}
          </Link>
        </div>
      </div>
    </header>
  );
}
