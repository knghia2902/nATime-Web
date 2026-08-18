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
      <form onSubmit={submit} className="space-y-4">
        {updateMode ? <>
          <label className="block text-xs font-medium text-white/70 uppercase tracking-wider">Mật khẩu mới<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" className="mt-1.5 w-full rounded-xl border border-white/[0.12] bg-[#09152b] px-4 py-2.5 text-sm font-normal text-white placeholder:text-white/30 outline-none focus:border-white/40" /></label>
          <label className="block text-xs font-medium text-white/70 uppercase tracking-wider">Xác nhận mật khẩu<input required minLength={8} type="password" autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} placeholder="••••••••" className="mt-1.5 w-full rounded-xl border border-white/[0.12] bg-[#09152b] px-4 py-2.5 text-sm font-normal text-white placeholder:text-white/30 outline-none focus:border-white/40" /></label>
        </> : <label className="block text-xs font-medium text-white/70 uppercase tracking-wider">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nhanvien@congty.com" className="mt-1.5 w-full rounded-xl border border-white/[0.12] bg-[#09152b] px-4 py-2.5 text-sm font-normal text-white placeholder:text-white/30 outline-none focus:border-white/40" /></label>}
        <button disabled={busy || success} className="btn-pill-primary w-full text-center py-3 text-sm shadow-[0_4px_20px_rgba(255,255,255,0.2)] disabled:opacity-60 cursor-pointer">{busy ? 'Đang xử lý…' : updateMode ? 'Lưu mật khẩu mới' : 'Gửi liên kết khôi phục'}</button>
        {message && <p role="alert" className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400 font-medium">{message}</p>}
        {success && <p className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-400 font-medium">{updateMode ? 'Đã cập nhật mật khẩu. Đang chuyển tới Cổng khách hàng…' : 'Nếu email tồn tại, liên kết khôi phục đã được gửi.'}</p>}
      </form>
      <p className="mt-6 text-center"><Link href="/login" className="text-sm font-semibold text-white hover:underline">Quay lại đăng nhập</Link></p>
    </AuthFrame>
  );
}
