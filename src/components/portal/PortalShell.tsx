'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';

const links = [
  { href: '/portal', label: 'Tổng quan', icon: 'dashboard' },
  { href: '/portal/licenses', label: 'License', icon: 'key' },
  { href: '/portal/orders', label: 'Đơn hàng', icon: 'receipt' },
  { href: '/portal/downloads', label: 'Tải xuống', icon: 'download' },
  { href: '/portal/account', label: 'Tài khoản', icon: 'user' },
];

function SidebarIcon({ name, className }: { name: string; className?: string }) {
  const cls = className || 'h-[18px] w-[18px]';
  switch (name) {
    case 'dashboard':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>;
    case 'key':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>;
    case 'receipt':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>;
    case 'download':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>;
    case 'user':
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
    default:
      return null;
  }
}

export default function PortalShell({ title, description, children, actions }: { title: string; description: string; children: ReactNode; actions?: ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [loading, pathname, router, user]);

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-600">Đang kiểm tra tài khoản…</div>;
  }

  async function logout() {
    await signOut();
    router.replace('/');
  }

  const initials = (user.name || user.email || '?').slice(0, 2).toUpperCase();
  const currentPage = links.find((l) => l.href === '/portal' ? pathname === l.href : pathname.startsWith(l.href));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      {/* ── Glass Topbar ── */}
      <div className="glass-topbar sticky top-0 z-30">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen((v) => !v)} className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 md:hidden" aria-expanded={mobileOpen}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            </button>
            <nav className="hidden items-center gap-1.5 text-sm md:flex">
              <Link href="/portal" className="font-medium text-slate-400 hover:text-slate-600">Cổng khách hàng</Link>
              {currentPage && currentPage.href !== '/portal' && <>
                <svg className="h-3.5 w-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                <span className="font-semibold text-slate-700">{currentPage.label}</span>
              </>}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100 sm:inline-flex">Website</Link>
            <button onClick={logout} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 transition">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] md:grid-cols-[240px_1fr]">
        {/* ── Dark Sidebar ── */}
        <aside className={`sidebar-dark ${mobileOpen ? 'block' : 'hidden'} border-b border-slate-800 p-4 md:block md:min-h-[calc(100vh-56px)] md:border-r md:border-b-0 md:border-slate-800 md:p-5`}>
          {/* Logo */}
          <Link href="/portal" className="mb-6 flex items-center gap-3 px-2">
            <Image src="/logo.png" alt="" width={28} height={28} className="h-7 w-7 object-contain brightness-110" />
            <div>
              <span className="text-sm font-bold text-white">nATime</span>
              <span className="ml-2 text-[10px] font-medium text-slate-500">Portal</span>
            </div>
          </Link>

          <p className="sidebar-section-label">Quản lý dịch vụ</p>
          <nav className="space-y-0.5">
            {links.map((link) => {
              const active = link.href === '/portal' ? pathname === link.href : pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`sidebar-link ${active ? 'active' : ''}`}>
                  <SidebarIcon name={link.icon} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User Card */}
          <div className="mt-auto pt-8">
            <div className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">{initials}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{user.name || 'Khách hàng'}</p>
                  <p className="truncate text-[11px] text-slate-400">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          <header className="header mb-6 sm:flex sm:items-start sm:justify-between sm:gap-4">
            <div>
              <h1 className="title text-2xl font-bold tracking-tight text-slate-900" style={{ margin: '0 0 3px 0', lineHeight: 1.2 }}>{title}</h1>
              <p className="subtitle text-sm text-slate-500">{description}</p>
            </div>
            {actions && <div className="header-actions mt-4 flex gap-2 sm:mt-0">{actions}</div>}
          </header>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
