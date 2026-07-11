'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { useLanguage } from '@/lib/i18n';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';

export default function RegisterPage() {
  const { t } = useLanguage();
  const { signUp, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Validation states
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [companyError, setCompanyError] = useState<string | null>(null);

  const validate = () => {
    let valid = true;
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setCompanyError(null);

    if (!name.trim()) {
      setNameError(t('Vui lòng nhập họ và tên', 'Please enter your full name'));
      valid = false;
    }

    if (!email) {
      setEmailError(t('Vui lòng nhập email', 'Email is required'));
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(t('Vui lòng nhập email hợp lệ', 'Please enter a valid email'));
      valid = false;
    }

    if (!password) {
      setPasswordError(t('Vui lòng nhập mật khẩu', 'Password is required'));
      valid = false;
    } else if (password.length < 6) {
      setPasswordError(t('Mật khẩu phải từ 6 ký tự trở lên', 'Password must be at least 6 characters'));
      valid = false;
    }

    if (!company.trim()) {
      setCompanyError(t('Vui lòng nhập tên doanh nghiệp', 'Please enter your company name'));
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setSuccess(null);

    if (!validate()) return;

    setLoading(true);
    const { error: signUpError } = await signUp(email, password, name, company);

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      setSuccess(t('Đăng ký thành công! Đang chuyển hướng...', 'Registration successful! Redirecting...'));
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      {/* Top Header Actions */}
      <header className="w-full max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="nATime Logo"
            className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-[440px] animate-fade-in-up">
          {/* Card Wrapper with Glassmorphism */}
          <div className="bg-card/70 dark:bg-card/40 border border-border backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
            
            {/* Header Text */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {t('Đăng ký dùng thử', 'Start Free Trial')}
              </h1>
              <p className="text-xs text-muted mt-1.5 leading-relaxed max-w-[340px] mx-auto">
                {t('Trải nghiệm giải pháp chấm công & kiểm soát cổng ra vào thông minh 14 ngày miễn phí.', 'Experience smart time attendance & gate access control 14-days free.')}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-2.5 rounded-lg bg-danger/10 border border-danger/20 text-danger text-xs flex items-start gap-2 animate-pulse-glow">
                <svg className="h-4 w-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-2.5 rounded-lg bg-success/10 border border-success/20 text-success text-xs flex items-start gap-2">
                <svg className="h-4 w-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{success}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  {t('Họ và tên', 'Full Name')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyen Van A"
                  className={`w-full h-[34px] px-3 py-1 text-sm bg-background border rounded-md text-foreground placeholder:text-muted/40 transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 ${
                    nameError ? 'border-danger focus:border-danger focus:ring-danger/40' : 'border-border'
                  }`}
                  disabled={loading}
                />
                {nameError && (
                  <p className="text-[10px] text-danger mt-0.5">{nameError}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  {t('Địa chỉ Email', 'Email Address')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`w-full h-[34px] px-3 py-1 text-sm bg-background border rounded-md text-foreground placeholder:text-muted/40 transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 ${
                    emailError ? 'border-danger focus:border-danger focus:ring-danger/40' : 'border-border'
                  }`}
                  disabled={loading}
                />
                {emailError && (
                  <p className="text-[10px] text-danger mt-0.5">{emailError}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  {t('Mật khẩu', 'Password')}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full h-[34px] px-3 py-1 text-sm bg-background border rounded-md text-foreground placeholder:text-muted/40 transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 ${
                    passwordError ? 'border-danger focus:border-danger focus:ring-danger/40' : 'border-border'
                  }`}
                  disabled={loading}
                />
                {passwordError && (
                  <p className="text-[10px] text-danger mt-0.5">{passwordError}</p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  {t('Tên doanh nghiệp', 'Company Name')}
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company ABC"
                  className={`w-full h-[34px] px-3 py-1 text-sm bg-background border rounded-md text-foreground placeholder:text-muted/40 transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 ${
                    companyError ? 'border-danger focus:border-danger focus:ring-danger/40' : 'border-border'
                  }`}
                  disabled={loading}
                />
                {companyError && (
                  <p className="text-[10px] text-danger mt-0.5">{companyError}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[36px] mt-4 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-md shadow-md shadow-primary/20 transition-all duration-200 active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{t('Đang đăng ký...', 'Signing up...')}</span>
                  </>
                ) : (
                  <span>{t('Đăng ký ngay', 'Sign Up')}</span>
                )}
              </button>
            </form>

            {/* Back link */}
            <div className="text-center mt-6">
              <span className="text-xs text-muted">
                {t('Đã có tài khoản?', 'Already have an account?')}{' '}
                <Link
                  href="/login"
                  className="text-primary hover:text-primary-hover font-semibold transition-colors"
                >
                  {t('Đăng nhập', 'Log in')}
                </Link>
              </span>
            </div>

          </div>
        </div>
      </main>

      {/* Footer Text */}
      <footer className="w-full text-center py-6 text-[10px] text-muted z-10 border-t border-border/20">
        <p>© {new Date().getFullYear()} nATime. {t('Bản quyền được bảo lưu.', 'All rights reserved.')}</p>
      </footer>
    </div>
  );
}
