'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import AuthFrame from '@/components/auth/AuthFrame';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const { user, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const destination = async (userId?: string) => {
    if (typeof window === 'undefined') return '/portal';
    const requested = new URLSearchParams(window.location.search).get('redirect');
    if (requested?.startsWith('/') && !requested.startsWith('//')) {
      return requested;
    }

    if (userId && supabase) {
      try {
        const { data: admin } = await supabase
          .from('portal_admins')
          .select('user_id')
          .eq('user_id', userId)
          .eq('is_active', true)
          .maybeSingle();
        if (admin) {
          return '/admin';
        }
      } catch {
        // fallback to portal
      }
    }

    return '/portal';
  };

  useEffect(() => {
    if (user) {
      void destination(user.id).then((dest) => router.replace(dest));
    }
  }, [router, user]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const { error } = await signIn(email.trim(), password);
    if (error) {
      setBusy(false);
      setMessage(error.message);
      return;
    }

    const { data: sessionData } = (await supabase?.auth.getSession()) ?? { data: { session: null } };
    const dest = await destination(sessionData?.session?.user?.id);
    setBusy(false);
    router.replace(dest);
  }

  return (
    <AuthFrame
      title="Đăng nhập"
      description="Đăng nhập tài khoản để quản lý license, thiết bị, đơn hàng và bộ cài."
    >
      <form onSubmit={submit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">Email đăng nhập</label>
          <div className="relative flex items-center">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <input
              required
              type="email"
              autoComplete="email"
              placeholder="nhanvien@congty.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-white/[0.12] bg-[#09152b] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 font-normal outline-none transition focus:border-white/40"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">Mật khẩu</label>
          <div className="relative flex items-center">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <input
              required
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/[0.12] bg-[#09152b] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 font-normal outline-none transition focus:border-white/40"
            />
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-xs text-white/60 font-normal cursor-pointer select-none">
            <input type="checkbox" defaultChecked className="h-3.5 w-3.5 rounded border-white/20 bg-[#09152b] text-white" />
            Ghi nhớ đăng nhập
          </label>
          <Link href="/reset-password" className="text-xs font-medium text-white/70 hover:text-white transition">
            Quên mật khẩu?
          </Link>
        </div>

        {/* Submit */}
        <button
          disabled={busy}
          className="btn-pill-primary w-full text-center py-3 text-sm shadow-[0_4px_20px_rgba(255,255,255,0.2)] disabled:opacity-60 cursor-pointer"
        >
          {busy ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#081120]/30 border-t-[#081120]" />
              Đang đăng nhập…
            </span>
          ) : 'Đăng nhập'}
        </button>

        {/* Error */}
        {message && (
          <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
            <p className="text-xs text-rose-400 leading-5 font-medium">{message}</p>
          </div>
        )}
      </form>

      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.08]" /></div>
        <div className="relative flex justify-center"><span className="bg-[rgba(9,20,42,0.9)] px-3 text-xs font-normal text-white/40">hoặc</span></div>
      </div>

      <p className="mt-5 text-center text-sm font-normal text-white/60">
        Chưa có tài khoản?{' '}
        <Link href="/register" className="font-semibold text-white hover:underline transition">
          Tạo tài khoản mới
        </Link>
      </p>
    </AuthFrame>
  );
}
