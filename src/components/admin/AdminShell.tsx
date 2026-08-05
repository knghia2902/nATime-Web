'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabase';

const sections = [
  {
    group: 'VẬN HÀNH',
    items: [
      { label: 'Tổng quan', href: '/admin', num: '01' },
      { label: 'Khách hàng', href: '/admin/customers', num: '02' },
      { label: 'Đơn hàng', href: '/admin/orders', num: '03' },
    ],
  },
  {
    group: 'LICENSE',
    items: [
      { label: 'License', href: '/admin/licenses', num: '04' },
      { label: 'Thiết bị', href: '/admin/devices', num: '05' },
    ],
  },
  {
    group: 'HỆ THỐNG',
    items: [
      { label: 'Release Windows', href: '/admin/releases', num: '06' },
      { label: 'Liên hệ', href: '/admin/contacts', num: '07' },
      { label: 'Audit', href: '/admin/audit', num: '08' },
    ],
  },
];

const allItems = sections.flatMap((s) => s.items);

export default function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const initialPath = useRef(pathname);
  const [access, setAccess] = useState<'checking' | 'denied' | 'mfa' | 'allowed'>('checking');
  const [factorId, setFactorId] = useState('');
  const [qr, setQr] = useState('');
  const [code, setCode] = useState('');
  const [mfaError, setMfaError] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const checkingMfa = useRef(false);
  const enrollingMfa = useRef(false);

  const check = useCallback(async () => {
    if (!user || !supabase || checkingMfa.current) return;
    checkingMfa.current = true;
    setMfaError('');
    try {
      const { data: administrator, error: administratorError } = await supabase
        .from('portal_admins')
        .select('user_id')
        .eq('user_id', user.id)
        .eq('role', 'super_admin')
        .eq('is_active', true)
        .maybeSingle();

      if (administratorError) {
        setMfaError(administratorError.message);
        setAccess('mfa');
        return;
      }
      if (!administrator) {
        setAccess('denied');
        return;
      }

      const { data: assurance, error: assuranceError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (assuranceError) {
        setMfaError(assuranceError.message);
        setAccess('mfa');
        return;
      }
      if (assurance?.currentLevel === 'aal2') {
        setAccess('allowed');
        return;
      }

      const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
      if (factorsError) {
        setMfaError(factorsError.message);
        setAccess('mfa');
        return;
      }
      const verified = factors?.totp.find((factor) => factor.status === 'verified');
      if (verified) {
        setFactorId(verified.id);
        setQr('');
        setAccess('mfa');
        return;
      }

      setFactorId('');
      setQr('');
      setCode('');
      setAccess('mfa');
    } finally {
      checkingMfa.current = false;
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent(initialPath.current)}`);
    else if (!loading && user) queueMicrotask(() => void check());
  }, [check, loading, router, user]);

  async function enrollMfa() {
    if (!supabase || enrollingMfa.current) return;
    enrollingMfa.current = true;
    setMfaError('');
    try {
      const { data: enrolled, error: enrollError } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'nATime Super Admin',
      });
      if (enrollError || !enrolled) {
        setMfaError(enrollError?.message || 'Không thể tạo MFA.');
        return;
      }
      setFactorId(enrolled.id);
      setQr(enrolled.totp.qr_code);
    } finally {
      enrollingMfa.current = false;
    }
  }

  async function verifyMfa(e: FormEvent) {
    e.preventDefault();
    if (!supabase || !code) return;
    setMfaError('');
    try {
      let targetFactorId = factorId;
      if (!targetFactorId) {
        const { data: enrolled, error: enrollError } = await supabase.auth.mfa.enroll({
          factorType: 'totp',
          friendlyName: 'nATime Super Admin',
        });
        if (enrollError || !enrolled) {
          setMfaError(enrollError?.message || 'Không thể tạo MFA.');
          return;
        }
        targetFactorId = enrolled.id;
      }
      const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId: targetFactorId });
      if (challengeError || !challenge) {
        setMfaError(challengeError?.message || 'Không thể tạo challenge MFA.');
        return;
      }
      const { error: verifyError } = await supabase.auth.mfa.verify({ factorId: targetFactorId, challengeId: challenge.id, code });
      if (verifyError) {
        setMfaError(verifyError.message);
        return;
      }
      setAccess('allowed');
    } catch (err: unknown) {
      setMfaError(err instanceof Error ? err.message : 'Xác thực MFA thất bại.');
    }
  }

  if (loading || access === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-sm text-ink/60 font-mono">
        Đang kiểm tra quyền Admin…
      </div>
    );
  }

  if (access === 'denied') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper p-6">
        <div className="max-w-md border hairline bg-white p-8 text-center space-y-4">
          <p className="font-mono text-[11px] text-amber">TRUY CẬP BỊ TỪ CHỐI</p>
          <h1 className="font-display font-bold text-xl text-ink">Quyền hạn không đủ</h1>
          <p className="font-body text-sm text-ink/70 leading-relaxed">Tài khoản hiện tại không có quyền Super Admin.</p>
          <Link href="/portal" className="inline-block bg-ink text-paper font-body text-[13px] px-5 py-2.5 hover:bg-graphite">
            Về Cổng khách hàng
          </Link>
        </div>
      </div>
    );
  }

  if (access === 'mfa') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper p-6">
        <div className="max-w-md w-full border hairline bg-white p-8 space-y-6">
          <div>
            <p className="font-mono text-[11px] text-teal mb-1">MFA AUTHENTICATION</p>
            <h1 className="font-display font-bold text-2xl text-ink">Xác thực 2 yếu tố</h1>
            <p className="font-body text-xs text-ink/60 mt-1">Yêu cầu xác thực Authenticator để vào trang Quản trị.</p>
          </div>
          {mfaError && <p className="font-mono text-xs text-amber border hairline p-3 bg-amber/5">{mfaError}</p>}
          {!factorId && !qr && (
            <button onClick={enrollMfa} className="w-full bg-ink text-paper font-body text-sm font-semibold py-3 hover:bg-graphite">
              Thiết lập mã QR Authenticator
            </button>
          )}
          {qr && (
            <div className="text-center space-y-3">
              <p className="font-body text-xs text-ink/70">Quét mã QR bằng Google Authenticator:</p>
              <img src={qr} alt="MFA QR Code" className="mx-auto h-44 w-44 border hairline p-2" />
            </div>
          )}
          <form onSubmit={verifyMfa} className="space-y-4">
            <div>
              <label className="font-body text-xs text-ink/60 block mb-1">Mã xác thực 6 chữ số</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                className="w-full border hairline px-3.5 py-2 font-mono text-base tracking-widest text-center bg-white"
                maxLength={6}
              />
            </div>
            <button type="submit" className="w-full bg-amber text-ink font-body text-sm font-bold py-3 hover:bg-amber/90">
              Xác nhận mã OTP
            </button>
          </form>
        </div>
      </div>
    );
  }

  const initials = (user?.name || user?.email || 'AD').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-paper text-ink font-body antialiased flex flex-col md:flex-row">
      {/* ── Left Sidebar (Industrial Dark Graphite Admin Style) ── */}
      <aside
        className={`w-64 shrink-0 bg-graphite text-paper flex flex-col justify-between fixed left-0 top-0 bottom-0 z-40 transition-transform md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="overflow-y-auto">
          {/* Logo Brand Header */}
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-6 h-16 border-b border-white/10 font-display font-extrabold text-[16px] tracking-tight text-paper"
          >
            <Image src="/logo.png" alt="nATime" width={24} height={24} className="h-6 w-6 object-contain" />
            <span>natime</span>
            <span className="text-paper/40 font-medium text-[12px] font-mono">/admin</span>
          </Link>

          {/* Nav Groups */}
          <nav className="px-3 py-6 font-body text-[14px]">
            {sections.map((sec) => (
              <div key={sec.group} className="mb-4">
                <p className="font-mono text-[11px] text-paper/35 tracking-wide px-3 mb-2">{sec.group}</p>
                <div className="space-y-0.5">
                  {sec.items.map((item) => {
                    const active = item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 transition-colors ${
                          active
                            ? 'bg-white/10 text-paper font-semibold'
                            : 'text-paper/70 hover:bg-white/5 hover:text-paper'
                        }`}
                      >
                        <span className={`font-mono text-[11px] ${active ? 'text-amber font-bold' : 'text-paper/40'}`}>
                          {item.num}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Admin Footer User Card */}
        <div className="px-6 py-5 border-t border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber/20 text-amber font-mono text-[12px] flex items-center justify-center shrink-0 font-bold">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-[13px] text-paper truncate font-semibold">{user?.name || 'Admin'}</p>
            <p className="font-mono text-[11px] text-paper/40">Quản trị viên</p>
          </div>
        </div>
      </aside>

      {/* ── Main Admin Content ── */}
      <div className="md:ml-64 flex-1 flex flex-col min-w-0">
        {/* Topbar matching admin.html */}
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
            <input
              type="text"
              placeholder="Tìm khách hàng, license, thiết bị..."
              className="border hairline px-3.5 py-2 font-body text-[13px] bg-white w-64 md:w-80 outline-none focus:border-ink"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-teal hidden sm:inline-block">● Hệ thống hoạt động bình thường</span>
          </div>
        </header>

        <main className="p-6 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
