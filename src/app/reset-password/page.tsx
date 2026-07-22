'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import AuthFrame from '@/components/auth/AuthFrame';
import { useAuth } from '@/lib/authContext';

export default function ResetPasswordPage() {
  const { resetPassword, updatePassword } = useAuth();
  const router = useRouter();
  const [updateMode, setUpdateMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedHash = sessionStorage.getItem('natime-auth-hash') ?? '';
    const hash = `${window.location.hash}${storedHash}`;
    if (hash.includes('access_token=') || hash.includes('type=recovery') || hash.includes('type=invite')) {
      queueMicrotask(() => setUpdateMode(true));
      sessionStorage.removeItem('natime-auth-hash');
    }
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage('');
    if (updateMode && (password.length < 8 || password !== confirmation)) {
      setMessage(password.length < 8 ? 'Mật khẩu phải có ít nhất 8 ký tự.' : 'Mật khẩu xác nhận không khớp.');
      return;
    }
    setBusy(true);
    const result = updateMode ? await updatePassword(password) : await resetPassword(email.trim());
    setBusy(false);
    if (result.error) { setMessage(result.error.message); return; }
    setSuccess(true);
    if (updateMode) setTimeout(() => router.replace('/portal'), 1000);
  }

  return (
    <AuthFrame title={updateMode ? 'Đặt mật khẩu mới' : 'Khôi phục mật khẩu'} description={updateMode ? 'Tạo mật khẩu mới cho tài khoản nATime.' : 'Nhập email đã đăng ký để nhận liên kết khôi phục.'}>
      <form onSubmit={submit} className="space-y-5">
        {updateMode ? <>
          <label className="block text-sm font-semibold">Mật khẩu mới<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" /></label>
          <label className="block text-sm font-semibold">Xác nhận mật khẩu<input required minLength={8} type="password" autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" /></label>
        </> : <label className="block text-sm font-semibold">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" /></label>}
        <button disabled={busy || success} className="w-full rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60">{busy ? 'Đang xử lý…' : updateMode ? 'Lưu mật khẩu mới' : 'Gửi liên kết khôi phục'}</button>
        {message && <p role="alert" className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">{message}</p>}
        {success && <p className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{updateMode ? 'Đã cập nhật mật khẩu. Đang chuyển tới Cổng khách hàng…' : 'Nếu email tồn tại, liên kết khôi phục đã được gửi.'}</p>}
      </form>
      <p className="mt-6 text-center"><Link href="/login" className="text-sm font-semibold text-blue-700 hover:underline">Quay lại đăng nhập</Link></p>
    </AuthFrame>
  );
}
