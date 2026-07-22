'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';

const links = [
  { href: '/portal', label: 'Tổng quan', icon: '01' },
  { href: '/portal/licenses', label: 'License', icon: '02' },
  { href: '/portal/orders', label: 'Đơn hàng', icon: '03' },
  { href: '/portal/downloads', label: 'Tải xuống', icon: '04' },
  { href: '/portal/account', label: 'Tài khoản', icon: '05' },
];

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6">
          <Link href="/portal" className="inline-flex items-center gap-3 font-bold">
            <Image src="/logo.png" alt="" width={30} height={30} className="h-7 w-7 object-contain" />
            <span>nATime</span>
            <span className="hidden border-l border-slate-200 pl-3 text-sm font-medium text-slate-500 sm:inline">Cổng khách hàng</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="hidden rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 sm:inline-flex">Website</Link>
            <button onClick={() => setMobileOpen((value) => !value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold md:hidden" aria-expanded={mobileOpen}>Menu</button>
            <button onClick={logout} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Đăng xuất</button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1280px] md:grid-cols-[232px_1fr]">
        <aside className={`${mobileOpen ? 'block' : 'hidden'} border-b border-slate-200 bg-white p-4 md:block md:min-h-[calc(100vh-64px)] md:border-r md:border-b-0 md:p-5`}>
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Quản lý dịch vụ</p>
          <nav className="space-y-1">
            {links.map((link) => {
              const active = link.href === '/portal' ? pathname === link.href : pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${active ? 'bg-blue-50 text-blue-800 ring-1 ring-blue-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
                  <span className={`grid h-7 w-7 place-items-center rounded-md text-[10px] font-bold ${active ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'}`}>{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="truncate text-sm font-semibold">{user.name || user.email}</p>
            <p className="mt-1 truncate text-xs text-slate-500">{user.email}</p>
            <Link href="/portal/account" className="mt-3 inline-flex text-xs font-bold text-blue-700 hover:text-blue-900">Quản lý tài khoản →</Link>
          </div>
        </aside>

        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          <header className="header rounded-xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:flex sm:items-start sm:justify-between sm:gap-4 sm:px-6">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-700">Cổng khách hàng</p>
              <h1 className="title text-2xl font-bold tracking-tight" style={{ margin: '0 0 3px 0', lineHeight: 1.2 }}>{title}</h1>
              <p className="subtitle text-sm text-slate-600">{description}</p>
            </div>
            {actions && <div className="header-actions mt-4 flex gap-2 sm:mt-0">{actions}</div>}
          </header>
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
