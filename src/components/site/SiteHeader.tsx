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
    demo: 'Dùng thử miễn phí',
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
    demo: 'Start Free Trial',
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
      <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur border-b hairline">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo with /logo.png */}
          <Link href={localPath(locale, '/')} className="flex items-center gap-2.5 font-display font-extrabold text-xl tracking-tight text-ink">
            <Image src="/logo.png" alt="nATime Logo" width={32} height={32} className="h-8 w-8 object-contain" />
            <span>nATime</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-body text-[14px] text-ink/80">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-ink transition-colors ${
                  isActive(href) ? 'text-ink font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={user ? '/portal' : '/login'}
              className="font-body text-[14px] font-semibold text-ink px-3 py-2 hover:text-amber transition-colors"
            >
              {user ? text.portal : text.login}
            </Link>
            {!user && (
              <Link
                href="/register?trial=standard"
                className="font-body text-[14px] font-semibold bg-ink text-paper px-4 py-2 hover:bg-graphite transition-colors"
              >
                {text.demo}
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid h-10 w-10 place-items-center text-ink"
            aria-label={open ? text.close : text.menu}
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span className={`h-0.5 rounded-full bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`h-0.5 rounded-full bg-current transition ${open ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 rounded-full bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-paper p-6 md:hidden">
          <div className="flex items-center justify-between border-b hairline pb-4">
            <Link href={localPath(locale, '/')} onClick={() => setOpen(false)} className="flex items-center gap-2 font-display font-extrabold text-xl text-ink">
              <Image src="/logo.png" alt="nATime" width={28} height={28} />
              <span>nATime</span>
            </Link>
            <button onClick={() => setOpen(false)} className="text-2xl text-ink/60 font-bold">×</button>
          </div>
          <div className="flex flex-col gap-4 py-6">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`font-body text-base text-ink hover:text-amber ${isActive(href) ? 'font-semibold' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-auto space-y-3 pt-4 border-t hairline">
            <Link
              href={user ? '/portal' : '/login'}
              onClick={() => setOpen(false)}
              className="block w-full text-center border hairline font-body text-[14px] font-semibold py-2.5"
            >
              {user ? text.portal : text.login}
            </Link>
            {!user && (
              <Link
                href="/register?trial=standard"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-ink text-paper font-body text-[14px] font-semibold py-2.5"
              >
                {text.demo}
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
