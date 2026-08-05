'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';

const links = [
  { href: '/portal', label: 'Tổng quan', num: '01' },
  { href: '/portal/licenses', label: 'License', num: '02' },
  { href: '/portal/orders', label: 'Đơn hàng', num: '03' },
  { href: '/portal/downloads', label: 'Tải xuống', num: '04' },
  { href: '/portal/account', label: 'Tài khoản', num: '05' },
];

export default function PortalShell({
  title,
  description,
  children,
  actions,
}: {
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [loading, pathname, router, user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-sm text-ink/60 font-mono">
        Đang kiểm tra tài khoản…
      </div>
    );
  }

  async function logout() {
    await signOut();
    router.replace('/');
  }

  const initials = (user.name || user.email || '?').slice(0, 2).toUpperCase();
  const currentPage = links.find((l) => (l.href === '/portal' ? pathname === l.href : pathname.startsWith(l.href)));

  return (
    <div className="min-h-screen bg-paper text-ink font-body antialiased flex flex-col md:flex-row">
      {/* ── Left Sidebar (Industrial Dark Graphite Style) ── */}
      <aside
        className={`w-64 shrink-0 bg-graphite text-paper flex flex-col justify-between fixed left-0 top-0 bottom-0 z-40 transition-transform md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Brand Header */}
          <Link
            href="/portal"
            className="flex items-center gap-2.5 px-6 h-16 border-b border-white/10 font-display font-extrabold text-[16px] tracking-tight text-paper"
          >
            <Image src="/logo.png" alt="nATime" width={24} height={24} className="h-6 w-6 object-contain" />
            <span>natime</span>
            <span className="text-paper/40 font-medium text-[12px] font-mono">/portal</span>
          </Link>

          {/* Navigation Items */}
          <nav className="px-3 py-6 space-y-1 font-body text-[14px]">
            {links.map((link) => {
              const active = link.href === '/portal' ? pathname === link.href : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 transition-colors ${
                    active
                      ? 'bg-white/10 text-paper font-semibold'
                      : 'text-paper/70 hover:bg-white/5 hover:text-paper'
                  }`}
                >
                  <span className={`font-mono text-[11px] ${active ? 'text-amber font-bold' : 'text-paper/40'}`}>
                    {link.num}
                  </span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card */}
        <div className="px-6 py-5 border-t border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal/20 text-teal font-mono text-[12px] flex items-center justify-center shrink-0 font-bold">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-[13px] text-paper truncate font-semibold">{user.name || 'Khách hàng'}</p>
            <p className="font-mono text-[11px] text-paper/40 truncate">{user.email}</p>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="md:ml-64 flex-1 flex flex-col min-w-0">
        {/* Sticky Topbar */}
        <header className="sticky top-0 z-20 bg-paper/95 backdrop-blur border-b hairline h-16 flex items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-ink/70 hover:text-ink"
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <p className="font-body text-[13px] text-ink/60">
              Cổng thông tin khách hàng {currentPage ? `· ${currentPage.label}` : ''}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-teal hidden sm:inline-block">● License đang hoạt động</span>
            <Link href="/" className="font-body text-[13px] text-ink/70 hover:text-ink hidden sm:inline-block">
              Website
            </Link>
            <button
              onClick={logout}
              className="font-body text-[13px] font-medium border hairline px-3.5 py-1.5 hover:bg-white transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8 flex-1">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b hairline pb-6">
            <div>
              <h1 className="font-display font-bold text-[24px] md:text-[28px] text-ink leading-tight">{title}</h1>
              <p className="font-body text-[14px] text-ink/60 mt-1">{description}</p>
            </div>
            {actions && <div className="flex gap-2">{actions}</div>}
          </div>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
