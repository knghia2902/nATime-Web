'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import AuthFrame from '@/components/auth/AuthFrame';
import { useAuth } from '@/lib/authContext';

export default function RegisterPage() {
  const { signUp, user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const destination = () => {
    if (typeof window === 'undefined') return '/portal';
    const query = new URLSearchParams(window.location.search);
    const plan = query.get('plan');
    const billing = query.get('billing') === 'monthly' ? 'monthly' : 'yearly';
    return plan === 'standard' || plan === 'professional' ? `/portal?plan=${plan}&billing=${billing}` : '/portal';
  };

  useEffect(() => {
    if (user) router.replace(destination());
  }, [router, user]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (password.length < 8) { setError('Mật khẩu phải có ít nhất 8 ký tự.'); return; }
    setBusy(true);
    setError('');
    const result = await signUp(email.trim(), password, name.trim(), company.trim());
    setBusy(false);
    if (result.error) { setError(result.error.message); return; }
    setSuccess(true);
  }

  return (
    <AuthFrame title="Tạo tài khoản" description="Email phải được xác thực trước khi nhận trial hoặc mua license nATime.">
      {success ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-900">
          <h2 className="font-semibold">Kiểm tra email của bạn</h2>
          <p className="mt-2">Mở liên kết xác thực được gửi tới <strong>{email}</strong>, sau đó đăng nhập để tiếp tục.</p>
          <Link href="/login" className="mt-4 inline-flex font-semibold text-blue-700 hover:underline">Đến trang đăng nhập</Link>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <label className="block text-sm font-semibold">Họ và tên<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" /></label>
          <label className="block text-sm font-semibold">Đơn vị <span className="font-normal text-slate-500">(không bắt buộc)</span><input autoComplete="organization" value={company} onChange={(event) => setCompany(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" /></label>
          <label className="block text-sm font-semibold">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" /></label>
          <label className="block text-sm font-semibold">Mật khẩu<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" /><span className="mt-1 block text-xs font-normal text-slate-500">Tối thiểu 8 ký tự.</span></label>
          <button disabled={busy} className="w-full rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60">{busy ? 'Đang tạo tài khoản…' : 'Đăng ký'}</button>
          {error && <p role="alert" className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        </form>
      )}
      <p className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-600">Đã có tài khoản? <Link href="/login" className="font-semibold text-blue-700 hover:underline">Đăng nhập</Link></p>
    </AuthFrame>
  );
}
