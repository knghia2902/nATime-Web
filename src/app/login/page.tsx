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
      title="Đăng nhập natime.vn"
      description="Đăng nhập tài khoản để quản lý license, thiết bị, đơn hàng và bộ cài Windows."
    >
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-semibold text-slate-800">
          Email đăng nhập
          <input
            required
            type="email"
            autoComplete="email"
            placeholder="nhanvien@congty.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 font-normal text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-800">
          Mật khẩu
          <input
            required
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 font-normal text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-xs font-normal text-slate-600 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-700" />
            Ghi nhớ đăng nhập
          </label>
          <Link href="/reset-password" className="text-xs font-semibold text-blue-700 hover:underline">
            Quên mật khẩu?
          </Link>
        </div>

        <button
          disabled={busy}
          className="mt-2 w-full rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-700/20 hover:bg-blue-800 transition disabled:opacity-60"
        >
          {busy ? 'Đang đăng nhập…' : 'Đăng nhập'}
        </button>

        {message && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800">
            {message}
          </p>
        )}
      </form>

      <p className="mt-6 border-t border-slate-100 pt-4 text-center text-xs text-slate-600">
        Chưa có tài khoản?{' '}
        <Link href="/register" className="font-semibold text-blue-700 hover:underline">
          Tạo tài khoản mới
        </Link>
      </p>
    </AuthFrame>
  );
}
