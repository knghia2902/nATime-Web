'use client';

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
  const cls = className || 'h-[18px] w-[18px]';
  switch (name) {
    case 'chart': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>;
    case 'users': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
    case 'receipt': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>;
    case 'key': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>;
    case 'device': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>;
    case 'upload': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>;
    case 'mail': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
    case 'shield': return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;
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
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-indigo-400" />
        <p className="text-sm text-slate-400">Đang kiểm tra quyền quản trị…</p>
      </div>
    </div>
  );

  // ── Denied state ──
  if (access === 'denied') return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center backdrop-blur">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-red-500/10">
          <svg className="h-7 w-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
        </div>
        <h1 className="text-xl font-bold text-white">Không có quyền truy cập</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">Tài khoản này không nằm trong danh sách Super Admin.</p>
        <Link href="/portal" className="mt-6 inline-flex rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition">Về Cổng khách hàng</Link>
      </div>
    </div>
  );

  // ── MFA state ──
  if (access === 'mfa') return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <form onSubmit={verify} className="w-full max-w-md rounded-2xl border border-slate-800 bg-white p-8 shadow-2xl">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
          </span>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Xác thực Super Admin</h1>
            <p className="text-xs text-slate-500">MFA bắt buộc trước khi truy cập</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-slate-600">Nhập mã 6 số từ ứng dụng xác thực (Google Authenticator, Authy…).</p>
        {!factorId && !mfaError && <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4"><p className="text-sm leading-6 text-blue-900">Tài khoản chưa có TOTP. Bấm nút bên dưới một lần để tạo mã QR thiết lập.</p><button type="button" onClick={() => void enrollMfa()} className="btn-gradient mt-3 w-full">Tạo mã QR</button></div>}
        {qr && <div className="mt-5 text-center"><div className="mx-auto inline-block rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"><img src={qr} alt="Mã QR thiết lập MFA" className="h-48 w-48" /></div><p className="mt-3 text-xs text-slate-500">Quét QR một lần bằng ứng dụng xác thực.</p></div>}
        {factorId && <><input required inputMode="numeric" pattern="[0-9]{6}" value={code} onChange={(event) => setCode(event.target.value)} className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3.5 text-center font-mono text-xl tracking-[0.4em] outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" placeholder="000000" /><button className="btn-gradient mt-4 w-full">Xác minh</button></>}
        {mfaError && <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3"><p className="text-sm text-red-700">{mfaError}</p>{!factorId && <button type="button" onClick={() => void enrollMfa()} className="mt-3 rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-800 hover:bg-red-100">Thử lại</button>}</div>}
      </form>
    </div>
  );

  // ── Main Admin Layout ──
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Glass Topbar */}
      <div className="glass-topbar sticky top-0 z-30">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-1.5 text-sm md:flex">
              <span className="font-medium text-slate-400">Admin</span>
              <svg className="h-3.5 w-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              <span className="font-semibold text-slate-700">{currentItem.label}</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 px-3 py-1 text-xs font-bold text-orange-700">Super Admin</span>
            <Link href="/portal" className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100 transition">Portal</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] md:grid-cols-[240px_1fr]">
        {/* Dark Sidebar */}
        <aside className="sidebar-dark sidebar-admin hidden border-r border-slate-800 p-4 md:block md:min-h-[calc(100vh-56px)] md:p-5">
          <Link href="/admin" className="mb-5 flex items-center gap-3 px-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-xs font-bold text-white">nA</span>
            <div>
              <span className="text-sm font-bold text-white">nATime</span>
              <span className="ml-2 text-[10px] font-medium text-slate-500">Admin</span>
            </div>
          </Link>

          {sections.map((section) => (
            <div key={section.group}>
              <p className="sidebar-section-label">{section.group}</p>
              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const active = item.href === pathname;
                  return (
                    <Link key={item.href} href={item.href} className={`sidebar-link ${active ? 'active' : ''}`}>
                      <AdminIcon name={item.icon} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          <header className="header mb-8">
            <h1 className="title text-2xl font-bold" style={{ margin: '0 0 3px 0', lineHeight: 1.2 }}>{currentItem.label}</h1>
            <p className="subtitle text-sm text-slate-600">{currentItem.description}</p>
          </header>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
