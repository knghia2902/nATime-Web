'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/lib/authContext';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';

export default function LoginPage() {
  const { t } = useLanguage();
  const { user, signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If user is already logged in, redirect them to dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg(t('Vui lòng nhập địa chỉ email', 'Please enter your email address'));
      return;
    }
    setErrorMsg('');
    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setErrorMsg(t('Đăng nhập thất bại. Vui lòng thử lại.', 'Login failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Top action controls */}
      <div className="absolute top-5 right-5 flex items-center gap-3">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 translate-x-1/2 translate-y-1/2 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md space-y-6 z-10 animate-[fade-in-up_0.5s_ease-out_both]">
        <div className="text-center">
          <Link href="/" className="inline-block group">
            <img
              src="/logo.png"
              alt="nATime Logo"
              className="mx-auto h-9 w-auto object-contain dark:brightness-110"
            />
          </Link>
          <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground select-none">
            {t('Đăng nhập Client Portal', 'Sign in to Client Portal')}
          </h2>
          <p className="mt-1.5 text-xs text-muted">
            {t('Quản lý thông tin bản quyền & yêu cầu kỹ thuật nATime', 'Manage licensing options and technical support tickets')}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="rounded-md bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-3 text-xs font-semibold text-rose-800 dark:text-rose-400">
                ⚠️ {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-muted uppercase tracking-wider mb-1.5">
                {t('Địa chỉ Email', 'Email Address')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder-muted/55 focus:border-primary focus:outline-none transition-colors duration-150"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-muted uppercase tracking-wider">
                  {t('Mật khẩu', 'Password')}
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(t('Tính năng khôi phục đang được cập nhật!', 'Password recovery functionality coming soon!'));
                  }}
                  className="text-[10px] font-semibold text-primary hover:underline"
                >
                  {t('Quên mật khẩu?', 'Forgot password?')}
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder-muted/55 focus:border-primary focus:outline-none transition-colors duration-150"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                defaultChecked
                className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2.5 text-[11px] font-medium text-muted select-none cursor-pointer">
                {t('Ghi nhớ đăng nhập trên thiết bị này', 'Remember session on this device')}
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                t('Đăng nhập', 'Sign In')
              )}
            </button>
          </form>

        </div>

        {/* Back to Home Link */}
        <p className="text-center text-[11px] text-muted">
          <Link href="/" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">
            ← {t('Quay lại trang giới thiệu', 'Back to website home')}
          </Link>
        </p>
      </div>

    </div>
  );
}
