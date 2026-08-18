'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabase';

const sections = [
  { group: 'Vận hành', items: [
    { label: 'Tổng quan', href: '/admin', icon: 'chart', description: 'Số liệu vận hành lấy trực tiếp từ Supabase.' },
    { label: 'Khách hàng', href: '/admin/customers', icon: 'users', description: 'Hồ sơ chủ tài khoản.' },
    { label: 'Đơn hàng', href: '/admin/orders', icon: 'receipt', description: 'Trạng thái PayOS và số tiền.' },
  ]},
  { group: 'License', items: [
    { label: 'License', href: '/admin/licenses', icon: 'key', description: 'Entitlement đã cấp cho khách hàng.' },
    { label: 'Thiết bị', href: '/admin/devices', icon: 'device', description: 'Máy đã liên kết với license.' },
  ]},
  { group: 'Hệ thống', items: [
    { label: 'Release Windows', href: '/admin/releases', icon: 'upload', description: 'Upload, xác minh và phát hành bộ cài Windows.' },
    { label: 'Liên hệ', href: '/admin/contacts', icon: 'mail', description: 'Yêu cầu từ website và Enterprise.' },
    { label: 'Audit', href: '/admin/audit', icon: 'shield', description: 'Lịch sử license và thao tác quản trị.' },
  ]},
];

const allItems = sections.flatMap((s) => s.items);

function AdminIcon({ name, className }: { name: string; className?: string }) {
  const cls = className || 'h-4 w-4 shrink-0';
  switch (name) {
    case 'chart': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>;
    case 'users': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
    case 'receipt': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>;
    case 'key': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>;
    case 'device': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>;
    case 'upload': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>;
    case 'mail': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
    case 'shield': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;
    default: return null;
  }
}

function describeMfaError(error: { code?: string; message: string }) {
  if (error.code === 'mfa_factor_name_conflict') return 'Một thiết lập MFA cùng tên đang bị dang dở. Hãy bấm Thử lại để tạo mã QR mới.';
  if (error.code === 'too_many_enrolled_mfa_factors') return 'Tài khoản đang có quá nhiều phương thức MFA. Hãy gỡ phương thức không còn sử dụng trong Supabase Auth.';
  if (error.code === 'mfa_totp_enroll_not_enabled') return 'TOTP chưa được bật trong cấu hình Supabase Auth.';
  return error.message;
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth(); const router = useRouter(); const pathname = usePathname();
  const initialPath = useRef(pathname);
  const currentItem = allItems.find((item) => item.href === pathname) ?? allItems[0];
  const [access, setAccess] = useState<'checking' | 'denied' | 'mfa' | 'allowed'>('checking');
  const [factorId, setFactorId] = useState(''); const [qr, setQr] = useState(''); const [code, setCode] = useState(''); const [mfaError, setMfaError] = useState('');
  const checkingMfa = useRef(false);
  const enrollingMfa = useRef(false);

  const check = useCallback(async () => {
    if (!user || !supabase || checkingMfa.current) return;
    checkingMfa.current = true;
    setMfaError('');
    try {
      const { data: administrator, error: administratorError } = await supabase.from('portal_admins').select('user_id').eq('user_id', user.id).eq('role', 'super_admin').eq('is_active', true).maybeSingle();
      if (administratorError) { setMfaError(administratorError.message); setAccess('mfa'); return; }
      if (!administrator) { setAccess('denied'); return; }

      const { data: assurance, error: assuranceError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (assuranceError) { setMfaError(describeMfaError(assuranceError)); setAccess('mfa'); return; }
      if (assurance?.currentLevel === 'aal2') { setAccess('allowed'); return; }

      const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
      if (factorsError) { setMfaError(describeMfaError(factorsError)); setAccess('mfa'); return; }
      const verified = factors?.totp.find((factor) => factor.status === 'verified');
      if (verified) { setFactorId(verified.id); setQr(''); setAccess('mfa'); return; }

      setFactorId(''); setQr(''); setCode(''); setAccess('mfa');
    } finally {
      checkingMfa.current = false;
    }
  }, [user]);

  useEffect(() => { if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent(initialPath.current)}`); else if (!loading && user) queueMicrotask(() => void check()); }, [check, loading, router, user]);

  async function enrollMfa() {
    if (!supabase || enrollingMfa.current) return;
    enrollingMfa.current = true;
    setMfaError('');
    try {
      const { data: enrolled, error: enrollError } = await supabase.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'nATime Super Admin' });
      if (enrollError || !enrolled) { setMfaError(enrollError ? describeMfaError(enrollError) : 'Không thể tạo MFA.'); return; }
      setFactorId(enrolled.id); setQr(enrolled.totp.qr_code); setCode('');
    } finally {
      enrollingMfa.current = false;
    }
  }

  async function verify(event: FormEvent) { event.preventDefault(); if (!supabase || !factorId) return; setMfaError(''); const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code }); if (error) { setMfaError(error.message); return; } setAccess('allowed'); }

  // ── Loading state ──
  if (loading || access === 'checking') return (
    <div className="flex min-h-screen items-center justify-center bg-[#081120]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        <p className="text-sm font-normal text-white/50">Đang kiểm tra quyền quản trị…</p>
      </div>
    </div>
  );

  // ── Denied state ──
  if (access === 'denied') return (
    <div className="flex min-h-screen items-center justify-center bg-[#081120] p-6">
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 text-center shadow-2xl">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-rose-500/10 text-rose-400">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
        </div>
        <h1 className="text-xl font-semibold text-white">Không có quyền truy cập</h1>
        <p className="mt-3 text-sm leading-6 font-normal text-white/60">Tài khoản này không nằm trong danh sách Super Admin.</p>
        <Link href="/portal" className="mt-6 inline-flex btn-pill-primary text-xs py-2.5 px-5">Về Cổng khách hàng</Link>
      </div>
    </div>
  );

  // ── MFA state ──
  if (access === 'mfa') return (
    <div className="flex min-h-screen items-center justify-center bg-[#081120] p-6">
      <form onSubmit={verify} className="w-full max-w-md glass-panel rounded-3xl p-8 shadow-2xl">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/[0.06] text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
          </span>
          <div>
            <h1 className="text-lg font-semibold text-white">Xác thực Super Admin</h1>
            <p className="text-xs font-normal text-white/50">MFA bắt buộc trước khi truy cập</p>
          </div>
        </div>
        <p className="text-sm leading-6 font-normal text-white/60">Nhập mã 6 số từ ứng dụng xác thực (Google Authenticator, Authy…).</p>
        {!factorId && !mfaError && <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-sm leading-6 font-normal text-white/80">Tài khoản chưa có TOTP. Bấm nút bên dưới một lần để tạo mã QR thiết lập.</p><button type="button" onClick={() => void enrollMfa()} className="mt-3 w-full btn-pill-primary text-xs py-2.5">Tạo mã QR</button></div>}
        {qr && <div className="mt-5 text-center"><div className="mx-auto inline-block rounded-2xl border border-white/20 bg-white p-3 shadow-lg"><img src={qr} alt="Mã QR thiết lập MFA" className="h-48 w-48" /></div><p className="mt-3 text-xs font-normal text-white/50">Quét QR một lần bằng ứng dụng xác thực.</p></div>}
        {factorId && <><input required inputMode="numeric" pattern="[0-9]{6}" value={code} onChange={(event) => setCode(event.target.value)} className="mt-5 w-full rounded-xl border border-white/[0.12] bg-[#09152b] px-4 py-3.5 text-center font-mono text-xl tracking-[0.4em] text-white outline-none transition focus:border-white/40" placeholder="000000" /><button className="mt-4 w-full btn-pill-primary text-sm py-3 cursor-pointer">Xác minh</button></>}
        {mfaError && <div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-3"><p className="text-sm font-medium text-rose-400">{mfaError}</p>{!factorId && <button type="button" onClick={() => void enrollMfa()} className="mt-3 rounded-full border border-rose-500/30 px-3 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-500/20">Thử lại</button>}</div>}
      </form>
    </div>
  );

  // ── Main Admin Layout ──
  return (
    <div className="min-h-screen text-white font-sans antialiased">
      {/* Dark Topbar */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#0e2246]/60 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-2 text-sm">
              <span className="font-normal text-white/50">Admin</span>
              <svg className="h-3.5 w-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              <span className="font-semibold text-white">{currentItem.label}</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge-pill py-0.5 px-2.5 text-[11px] font-semibold text-white">Super Admin</span>
            <Link href="/portal" className="btn-pill-glass text-xs py-1 px-3">Portal</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] md:grid-cols-[240px_1fr]">
        {/* Deep Oceanic Sidebar */}
        <aside className="hidden border-r border-white/[0.08] bg-[#09152b] p-4 text-white md:block md:min-h-[calc(100vh-56px)] md:p-5">
          <Link href="/admin" className="mb-6 flex items-center gap-2.5 px-2 select-none">
            <Image src="/logo.png" alt="nATime Logo" width={26} height={26} className="h-6.5 w-6.5 object-contain" />
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-white">nATime</span>
              <span className="badge-pill py-0.2 px-1.5 text-[10px] uppercase font-semibold">Admin</span>
            </div>
          </Link>

          {sections.map((section) => (
            <div key={section.group} className="mb-5">
              <p className="mb-2 px-2 text-[10px] font-semibold tracking-widest text-white/40 uppercase">{section.group}</p>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const active = item.href === pathname;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all ${
                        active
                          ? 'bg-white/10 text-white font-semibold border border-white/15 shadow-2xs'
                          : 'text-white/60 font-normal hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      <AdminIcon name={item.icon} className={`h-4 w-4 shrink-0 ${active ? 'text-sky-300' : 'text-white/40'}`} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          <header className="mb-6 border-b border-white/[0.08] pb-4">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">{currentItem.label}</h1>
            <p className="mt-1 text-sm font-normal text-white/60">{currentItem.description}</p>
          </header>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
