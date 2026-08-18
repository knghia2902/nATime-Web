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
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-sm leading-6 text-emerald-400">
          <h2 className="font-bold text-white text-base">Kiểm tra email của bạn</h2>
          <p className="mt-2 text-white/70">Mở liên kết xác thực được gửi tới <strong className="text-white">{email}</strong>, sau đó đăng nhập để tiếp tục.</p>
          <Link href="/login" className="mt-5 inline-flex btn-pill-primary text-xs py-2 px-5">Đến trang đăng nhập</Link>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-xs font-medium text-white/70 uppercase tracking-wider">Họ và tên<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nguyễn Văn A" className="mt-1.5 w-full rounded-xl border border-white/[0.12] bg-[#09152b] px-4 py-2.5 text-sm font-normal text-white placeholder:text-white/30 outline-none focus:border-white/40" /></label>
          <label className="block text-xs font-medium text-white/70 uppercase tracking-wider">Đơn vị <span className="font-normal text-white/40">(không bắt buộc)</span><input autoComplete="organization" value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Tên nhà máy / công ty" className="mt-1.5 w-full rounded-xl border border-white/[0.12] bg-[#09152b] px-4 py-2.5 text-sm font-normal text-white placeholder:text-white/30 outline-none focus:border-white/40" /></label>
          <label className="block text-xs font-medium text-white/70 uppercase tracking-wider">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nhanvien@congty.com" className="mt-1.5 w-full rounded-xl border border-white/[0.12] bg-[#09152b] px-4 py-2.5 text-sm font-normal text-white placeholder:text-white/30 outline-none focus:border-white/40" /></label>
          <label className="block text-xs font-medium text-white/70 uppercase tracking-wider">Mật khẩu<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" className="mt-1.5 w-full rounded-xl border border-white/[0.12] bg-[#09152b] px-4 py-2.5 text-sm font-normal text-white placeholder:text-white/30 outline-none focus:border-white/40" /><span className="mt-1 block text-xs font-normal text-white/40">Tối thiểu 8 ký tự.</span></label>
          <button disabled={busy} className="btn-pill-primary w-full text-center py-3 text-sm shadow-[0_4px_20px_rgba(255,255,255,0.2)] disabled:opacity-60 cursor-pointer">{busy ? 'Đang tạo tài khoản…' : 'Đăng ký'}</button>
          {error && <p role="alert" className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400 font-medium">{error}</p>}
        </form>
      )}
      <p className="mt-6 border-t border-white/[0.08] pt-5 text-center text-sm text-white/60">Đã có tài khoản? <Link href="/login" className="font-semibold text-white hover:underline">Đăng nhập</Link></p>
    </AuthFrame>
  );
}
