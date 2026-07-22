'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabase';

const sections = [
  { label: 'Tổng quan', href: '/admin', description: 'Số liệu vận hành lấy trực tiếp từ Supabase.' },
  { label: 'Khách hàng', href: '/admin/customers', description: 'Hồ sơ chủ tài khoản.' },
  { label: 'Đơn hàng', href: '/admin/orders', description: 'Trạng thái PayOS và số tiền.' },
  { label: 'License', href: '/admin/licenses', description: 'Entitlement đã cấp cho khách hàng.' },
  { label: 'Thiết bị', href: '/admin/devices', description: 'Máy đã liên kết với license.' },
  { label: 'Release Windows', href: '/admin/releases', description: 'Upload, xác minh và phát hành bộ cài Windows.' },
  { label: 'Liên hệ', href: '/admin/contacts', description: 'Yêu cầu từ website và Enterprise.' },
  { label: 'Audit', href: '/admin/audit', description: 'Lịch sử license và thao tác quản trị.' },
] as const;

function describeMfaError(error: { code?: string; message: string }) {
  if (error.code === 'mfa_factor_name_conflict') return 'Một thiết lập MFA cùng tên đang bị dang dở. Hãy bấm Thử lại để tạo mã QR mới.';
  if (error.code === 'too_many_enrolled_mfa_factors') return 'Tài khoản đang có quá nhiều phương thức MFA. Hãy gỡ phương thức không còn sử dụng trong Supabase Auth.';
  if (error.code === 'mfa_totp_enroll_not_enabled') return 'TOTP chưa được bật trong cấu hình Supabase Auth.';
  return error.message;
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth(); const router = useRouter(); const pathname = usePathname();
  const initialPath = useRef(pathname);
  const section = sections.find((item) => item.href === pathname) ?? sections[0];
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
  if (loading || access === 'checking') return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-slate-300">Đang kiểm tra quyền quản trị…</div>;
  if (access === 'denied') return <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6"><div className="max-w-md rounded-lg border border-slate-800 bg-slate-900 p-7 text-white"><h1 className="text-xl font-semibold">Không có quyền truy cập</h1><p className="mt-3 text-sm leading-6 text-slate-400">Tài khoản này không nằm trong danh sách Super Admin.</p><Link href="/portal" className="mt-5 inline-flex text-sm font-semibold text-blue-400">Về Cổng khách hàng</Link></div></div>;
  if (access === 'mfa') return <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6"><form onSubmit={verify} className="w-full max-w-md rounded-lg border border-slate-800 bg-white p-7"><h1 className="text-xl font-semibold">Xác thực Super Admin</h1><p className="mt-3 text-sm leading-6 text-slate-600">Nhập mã 6 số từ ứng dụng xác thực. MFA là bắt buộc trước khi đọc hoặc thay đổi dữ liệu quản trị.</p>{!factorId && !mfaError && <div className="mt-5 rounded-md border border-blue-200 bg-blue-50 p-4"><p className="text-sm leading-6 text-blue-900">Tài khoản chưa có TOTP. Bấm nút bên dưới một lần để tạo mã QR thiết lập.</p><button type="button" onClick={() => void enrollMfa()} className="mt-3 w-full rounded-md bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800">Tạo mã QR</button></div>}{qr && <div className="mt-5"><img src={qr} alt="Mã QR thiết lập MFA" className="mx-auto h-48 w-48" /><p className="mt-3 text-center text-xs text-slate-500">Quét QR một lần bằng ứng dụng xác thực.</p></div>}{factorId && <><input required inputMode="numeric" pattern="[0-9]{6}" value={code} onChange={(event) => setCode(event.target.value)} className="mt-5 w-full rounded-md border border-slate-300 px-3 py-3 text-center font-mono text-lg tracking-[0.3em]" placeholder="000000" /><button className="mt-4 w-full rounded-md bg-blue-700 px-4 py-3 text-sm font-semibold text-white">Xác minh</button></>}{mfaError && <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3"><p className="text-sm text-red-700">{mfaError}</p>{!factorId && <button type="button" onClick={() => void enrollMfa()} className="mt-3 rounded-md border border-red-300 px-3 py-2 text-sm font-semibold text-red-800 hover:bg-red-100">Thử lại</button>}</div>}</form></div>;
  return <div className="min-h-screen bg-slate-100"><div className="border-b border-slate-800 bg-slate-950 text-white"><div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6"><Link href="/admin" className="font-bold">nATime <span className="ml-2 text-sm font-medium text-slate-400">Super Admin</span></Link><Link href="/portal" className="text-sm font-semibold text-slate-300 hover:text-white">Cổng khách hàng</Link></div></div><div className="mx-auto grid max-w-[1400px] md:grid-cols-[220px_1fr]"><aside className="border-r border-slate-200 bg-white p-4 md:min-h-[calc(100vh-64px)]"><nav className="space-y-1">{sections.map((item) => { const active = item.href === pathname; return <Link key={item.href} href={item.href} className={`block rounded-md px-3 py-2.5 text-sm font-semibold ${active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{item.label}</Link>; })}</nav></aside><main className="min-w-0 p-4 sm:p-6 lg:p-8"><header className="header"><h1 className="title text-2xl font-bold" style={{ margin: '0 0 3px 0', lineHeight: 1.2 }}>{section.label}</h1><p className="subtitle text-sm text-slate-600">{section.description}</p></header><div className="mt-8">{children}</div></main></div></div>;
}
