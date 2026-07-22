'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/lib/authContext';

type Locale = 'vi' | 'en';

const labels = {
  vi: { product: 'Sản phẩm', features: 'Tính năng', pricing: 'Bảng giá', download: 'Tải xuống', docs: 'Tài liệu', contact: 'Liên hệ', login: 'Đăng nhập', portal: 'Cổng khách hàng', trial: 'Dùng thử 7 ngày', menu: 'Mở menu' },
  en: { product: 'Product', features: 'Features', pricing: 'Pricing', download: 'Download', docs: 'Docs', contact: 'Contact', login: 'Sign in', portal: 'Customer portal', trial: 'Start 7-day trial', menu: 'Open menu' },
};

function localPath(locale: Locale, path: string) {
  return locale === 'en' ? `/en${path === '/' ? '' : path}` : path;
}

export default function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const text = labels[locale];
  const pathWithoutLocale = pathname.startsWith('/en') ? pathname.slice(3) || '/' : pathname;
  const languageHref = locale === 'vi' ? `/en${pathname === '/' ? '' : pathname}` : pathWithoutLocale;
  const nav = [
    [text.product, localPath(locale, '/')],
    [text.features, localPath(locale, '/features')],
    [text.pricing, localPath(locale, '/pricing')],
    [text.download, localPath(locale, '/download')],
    [text.docs, localPath(locale, '/docs')],
    [text.contact, localPath(locale, '/contact')],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6" aria-label="Primary navigation">
        <Link href={localPath(locale, '/')} className="flex items-center gap-2" aria-label="nATime">
          <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
          <span className="text-base font-bold tracking-tight text-slate-950">nATime</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {nav.map(([label, href]) => {
            const active = href === localPath(locale, '/') ? pathname === href : pathname.startsWith(href);
            return <Link key={href} href={href} className={`rounded-md px-3 py-2 text-sm font-medium ${active ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}>{label}</Link>;
          })}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href={languageHref} className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">{locale === 'vi' ? 'EN' : 'VI'}</Link>
          <Link href={user ? '/portal' : '/login'} className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">{user ? text.portal : text.login}</Link>
          {!user && <Link href="/register?trial=standard" className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">{text.trial}</Link>}
        </div>
        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-md border border-slate-300 p-2 text-slate-700 lg:hidden" aria-label={text.menu} aria-expanded={open}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </nav>
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-1">
            {nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100">{label}</Link>)}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3">
              <Link href={languageHref} className="rounded-md border border-slate-300 px-3 py-2 text-center text-sm font-semibold">{locale === 'vi' ? 'English' : 'Tiếng Việt'}</Link>
              <Link href={user ? '/portal' : '/login'} className="rounded-md border border-slate-300 px-3 py-2 text-center text-sm font-semibold">{user ? text.portal : text.login}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
