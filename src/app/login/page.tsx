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

  const [activeTab, setActiveTab] = useState<'portal' | 'admin'>('portal');

  const destination = () => {
    if (typeof window === 'undefined') return activeTab === 'admin' ? '/admin' : '/portal';
    const requested = new URLSearchParams(window.location.search).get('redirect');
    return requested?.startsWith('/') && !requested.startsWith('//') ? requested : (activeTab === 'admin' ? '/admin' : '/portal');
  };

  useEffect(() => {
    if (user) router.replace(destination());
  }, [router, user, activeTab]);

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
      title={activeTab === 'admin' ? 'Đăng nhập Quản trị' : 'Đăng nhập Khách hàng'}
      description={activeTab === 'admin' ? 'Truy cập Cổng Quản trị Super Admin để cấp duyệt license, đơn hàng và phát hành bộ cài.' : 'Truy cập Cổng Khách hàng để quản lý license, thiết bị, đơn hàng và bộ cài Windows.'}
    >
      <div className="mb-6 flex rounded-lg bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setActiveTab('portal')}
          className={`flex-1 rounded-md py-2 text-xs font-semibold transition ${activeTab === 'portal' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Cổng Khách hàng (Portal)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('admin')}
          className={`flex-1 rounded-md py-2 text-xs font-semibold transition ${activeTab === 'admin' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Cổng Quản trị (Super Admin)
        </button>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <label className="block text-sm font-semibold">Email
          <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
        </label>
        <label className="block text-sm font-semibold">Mật khẩu
          <input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" />
        </label>
        <div className="flex justify-end"><Link href="/reset-password" className="text-sm font-semibold text-blue-700 hover:underline">Quên mật khẩu?</Link></div>
        <button disabled={busy} className="w-full rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60">
          {busy ? 'Đang đăng nhập…' : activeTab === 'admin' ? 'Đăng nhập Quản trị' : 'Đăng nhập Cổng Khách hàng'}
        </button>
        {message && <p role="alert" className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">{message}</p>}
      </form>
      <p className="mt-6 border-t border-slate-200 pt-5 text-center text-sm text-slate-600">Chưa có tài khoản? <Link href="/register" className="font-semibold text-blue-700 hover:underline">Đăng ký</Link></p>
    </AuthFrame>
  );
}
