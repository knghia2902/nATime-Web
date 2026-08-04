'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import ThemeToggle from '@/components/ThemeToggle';

type Locale = 'vi' | 'en';

const labels = {
  vi: {
    home: 'Trang chủ',
    features: 'Tính năng',
    pricing: 'Bảng giá',
    blog: 'Blog',
    support: 'Support',
    login: 'Đăng nhập',
    portal: 'Cổng khách hàng',
    trial: 'Dùng thử miễn phí',
    menu: 'Mở menu',
    close: 'Đóng menu',
  },
  en: {
    home: 'Home',
    features: 'Features',
    pricing: 'Pricing',
    blog: 'Blog',
    support: 'Support',
    login: 'Sign in',
    portal: 'Portal',
    trial: 'Start Free Trial',
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
  const [scrolled, setScrolled] = useState(false);
  const text = labels[locale];

  const nav = [
    [text.home, localPath(locale, '/')],
    [text.features, localPath(locale, '/features')],
    [text.pricing, localPath(locale, '/pricing')],
    [text.blog, localPath(locale, '/changelog')],
    [text.support, localPath(locale, '/contact')],
  ];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const isActive = (href: string) => {
    if (href === localPath(locale, '/')) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-xl'
            : 'border-b border-transparent bg-background/80 backdrop-blur-md'
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Global">
          {/* Brand Logo */}
          <Link href={localPath(locale, '/')} className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="nATime Logo" width={36} height={36} className="h-9 w-9 object-contain" />
            <span className="text-xl font-extrabold tracking-tight text-[#1e3a8a] dark:text-white">nATime</span>
          </Link>

          {/* Center Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`relative text-sm font-bold transition-colors ${
                  isActive(href)
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href={user ? '/portal' : '/login'}
              className="rounded-full px-5 py-2.5 text-sm font-bold text-foreground hover:text-primary transition"
            >
              {user ? text.portal : text.login}
            </Link>

            {!user && (
              <Link
                href="/register?trial=standard"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-md shadow-primary/25 hover:bg-primary-hover hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                {text.trial}
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground"
              aria-label={open ? text.close : text.menu}
            >
              <span className="flex w-5 flex-col gap-1.5">
                <span className={`h-0.5 rounded-full bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`h-0.5 rounded-full bg-current transition ${open ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 rounded-full bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background p-6 lg:hidden">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <Link href={localPath(locale, '/')} onClick={() => setOpen(false)} className="flex items-center gap-2">
              <Image src="/logo.png" alt="nATime" width={32} height={32} />
              <span className="text-lg font-bold text-foreground">nATime</span>
            </Link>
            <button onClick={() => setOpen(false)} className="text-2xl text-muted font-bold">×</button>
          </div>
          <div className="flex flex-col gap-4 py-6">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="text-base font-bold text-foreground hover:text-primary">
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-auto space-y-3 pt-4 border-t border-border">
            <Link href={user ? '/portal' : '/login'} onClick={() => setOpen(false)} className="block w-full text-center py-3 rounded-xl border border-border font-bold">
              {user ? text.portal : text.login}
            </Link>
            {!user && (
              <Link href="/register?trial=standard" onClick={() => setOpen(false)} className="block w-full text-center py-3 rounded-xl bg-primary text-white font-bold">
                {text.trial}
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="h-20" />
    </>
  );
}
