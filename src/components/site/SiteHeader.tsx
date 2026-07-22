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
    knowledge: 'Kiến thức',
    support: 'Hỗ trợ',
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
    knowledge: 'Knowledge',
    support: 'Support',
    login: 'Sign in',
    portal: 'Customer portal',
    trial: 'Start free trial',
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
  const pathWithoutLocale = pathname.startsWith('/en') ? pathname.slice(3) || '/' : pathname;
  const languageHref = locale === 'vi' ? `/en${pathname === '/' ? '' : pathname}` : pathWithoutLocale;
  const nav = [
    [text.home, localPath(locale, '/')],
    [text.features, localPath(locale, '/features')],
    [text.pricing, localPath(locale, '/pricing')],
    [text.knowledge, localPath(locale, '/changelog')],
    [text.support, localPath(locale, '/contact')],
  ];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === localPath(locale, '/')) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'border-slate-200/80 bg-white/82 shadow-[0_1px_3px_rgba(15,23,42,.04),0_10px_30px_rgba(15,23,42,.04)] backdrop-blur-xl' : 'border-transparent bg-white/55 backdrop-blur-md'}`}>
        <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
          <Link href={localPath(locale, '/')} className="group flex items-center gap-2.5" aria-label="nATime">
            <Image src="/logo.png" alt="" width={34} height={34} className="h-[34px] w-[34px] object-contain transition-transform duration-300 group-hover:scale-105" />
            <span className="text-[15px] font-extrabold tracking-[-0.02em] text-slate-950">nATime</span>
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${isActive(href) ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-950'}`}>
                {label}
                {isActive(href) && <span className="absolute bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-blue-700" />}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-1.5 lg:flex">
            <Link href={languageHref} className="grid h-9 min-w-9 place-items-center rounded-full border border-slate-200 bg-white px-2.5 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:text-blue-700">{locale === 'vi' ? 'EN' : 'VI'}</Link>
            <Link href={user ? '/portal' : '/login'} className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">{user ? text.portal : text.login}</Link>
            {!user && (
              <Link href="/register?trial=standard" className="group relative ml-1 inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-full bg-blue-700 px-5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-700/25">
                <span className="relative z-10">{text.trial}</span>
                <span className="relative z-10 transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
                <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            )}
          </div>

          <button type="button" onClick={() => setOpen((value) => !value)} className="relative grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden" aria-label={open ? text.close : text.menu} aria-expanded={open}>
            <span className="sr-only">{open ? text.close : text.menu}</span>
            <span className="flex w-4 flex-col gap-1">
              <span className={`h-0.5 rounded-full bg-current transition ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
              <span className={`h-0.5 rounded-full bg-current transition ${open ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 rounded-full bg-current transition ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
            </span>
          </button>
        </nav>
      </header>

      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm transition-opacity lg:hidden ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} aria-hidden="true" />
      <aside className={`fixed right-0 top-0 z-50 flex h-dvh w-[300px] max-w-[86vw] flex-col border-l border-slate-200 bg-white/96 shadow-2xl backdrop-blur-xl transition-transform duration-300 lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`} aria-hidden={!open}>
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <Link href={localPath(locale, '/')} onClick={() => setOpen(false)} className="flex items-center gap-2"><Image src="/logo.png" alt="" width={30} height={30} className="h-[30px] w-[30px] object-contain" /><span className="font-extrabold text-slate-950">nATime</span></Link>
          <button type="button" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-full text-xl text-slate-500 hover:bg-slate-100" aria-label={text.close}>×</button>
        </div>
        <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-semibold ${isActive(href) ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100'}`}><span className={`h-1.5 w-1.5 rounded-full ${isActive(href) ? 'bg-blue-700' : 'bg-slate-300'}`} />{label}</Link>)}
        </div>
        <div className="border-t border-slate-200 p-4">
          <div className="mb-3 grid grid-cols-2 gap-2"><Link href={languageHref} className="rounded-lg border border-slate-200 px-3 py-2.5 text-center text-sm font-bold text-slate-600">{locale === 'vi' ? 'English' : 'Tiếng Việt'}</Link><Link href={user ? '/portal' : '/login'} className="rounded-lg border border-slate-200 px-3 py-2.5 text-center text-sm font-bold text-slate-700">{user ? text.portal : text.login}</Link></div>
          {!user && <Link href="/register?trial=standard" onClick={() => setOpen(false)} className="flex h-11 items-center justify-center rounded-xl bg-blue-700 text-sm font-bold text-white shadow-lg shadow-blue-700/20">{text.trial}</Link>}
        </div>
      </aside>
      <div className="h-16" />
    </>
  );
}
