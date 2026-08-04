'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import AuthFrame from '@/components/auth/AuthFrame';
import { useAuth } from '@/lib/authContext';

export default function LoginPage() {
  const { user, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const destination = () => {
    if (typeof window === 'undefined') return '/portal';
    const requested = new URLSearchParams(window.location.search).get('redirect');
    return requested?.startsWith('/') && !requested.startsWith('//') ? requested : '/portal';
  };

  useEffect(() => {
    if (user) router.replace(destination());
  }, [router, user]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const { error } = await signIn(email.trim(), password);
    setBusy(false);
    if (error) { setMessage(error.message); return; }
    router.replace(destination());
  }

  return (
    <AuthFrame
      title="Đăng nhập"
      description="Đăng nhập tài khoản để quản lý license, thiết bị, đơn hàng và bộ cài."
    >
      <form onSubmit={submit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Email đăng nhập</label>
          <div className="input-group">
            <svg className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            <input
              required
              type="email"
              autoComplete="email"
              placeholder="nhanvien@congty.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-border py-3 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Mật khẩu</label>
          <div className="input-group">
            <svg className="input-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
            <input
              required
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-border py-3 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-muted cursor-pointer select-none">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-blue-600 focus:ring-blue-500" />
            Ghi nhớ đăng nhập
          </label>
          <Link href="/reset-password" className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition">
            Quên mật khẩu?
          </Link>
        </div>

        {/* Submit */}
        <button
          disabled={busy}
          className="btn-gradient w-full py-3"
        >
          {busy ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Đang đăng nhập…
            </span>
          ) : 'Đăng nhập'}
        </button>

        {/* Error */}
        {message && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
            <p className="text-xs text-red-700 leading-5">{message}</p>
          </div>
        )}
      </form>

      <div className="relative mt-7">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted">hoặc</span></div>
      </div>

      <p className="mt-5 text-center text-sm text-muted">
        Chưa có tài khoản?{' '}
        <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-800 transition">
          Tạo tài khoản mới
        </Link>
      </p>
    </AuthFrame>
  );
}
