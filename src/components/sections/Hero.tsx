'use client';

import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/lib/authContext';
import Link from 'next/link';

export default function Hero() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-50 dark:bg-[#0a0a14]">

      {/* ── Background layers ── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {/* Top indigo radial */}
        <div
          className="absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full opacity-30 dark:opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.35) 0%, transparent 70%)' }}
        />
        {/* Bottom right accent */}
        <div
          className="absolute bottom-0 right-0 h-[400px] w-[500px] translate-x-1/4 translate-y-1/4 rounded-full opacity-20 dark:opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.4) 0%, transparent 70%)' }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.022] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(79,70,229,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,1) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Text Content ── */}
          <div className="flex flex-col items-start">



            {/* Heading */}
            <h1 className="hero-fade-in hero-delay-2 mb-5">
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-3">
                nATime
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-[2rem] font-extrabold leading-snug tracking-tight">
                <span className="text-slate-700 dark:text-slate-200">
                  {t('Giải pháp Chấm công', 'Smart Time Attendance')}
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600 bg-clip-text text-transparent">
                  {t('& Kiểm soát Ra vào Thông minh', '& Access Control Solution')}
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="hero-fade-in hero-delay-3 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mb-9 leading-relaxed">
              {t(
                'Nền tảng quản lý chấm công, kiểm soát ra vào và giám sát thiết bị toàn diện dành cho doanh nghiệp.',
                'Enterprise-grade platform for time attendance, access control, and device monitoring.'
              )}
            </p>

            {/* CTA Buttons */}
            <div className="hero-fade-in hero-delay-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-12 w-full sm:w-auto">
              <Link
                href={user ? '/dashboard' : '/register'}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md cursor-pointer w-full sm:w-auto"
              >
                {t('Dùng thử miễn phí', 'Start Free Trial')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/85 dark:bg-card/20 px-7 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-primary/5 hover:border-primary/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto"
              >
                {t('Liên hệ tư vấn', 'Contact Sales')}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="hero-fade-in hero-delay-5 flex flex-wrap items-center gap-4 text-xs text-slate-400 dark:text-slate-500 font-medium">
              {[
                { icon: '🔒', label: t('Bảo mật AES-256', 'AES-256 Secured') },
                { icon: '⚡', label: t('.NET 10 hiệu năng cao', 'High-performance .NET 10') },
                { icon: '🏢', label: t('On-premise / Cloud', 'On-premise / Cloud') },
              ].map((badge) => (
                <span key={badge.label} className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/50 px-3 py-1 backdrop-blur-sm">
                  <span>{badge.icon}</span>
                  <span>{badge.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Dashboard Mockup ── */}
          <div className="hero-fade-in hero-delay-3 relative flex items-center justify-center lg:justify-end">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-2xl opacity-40 blur-2xl -z-10"
              style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.25) 0%, transparent 70%)' }}
            />

            {/* Browser window mockup */}
            <div className="relative w-full max-w-xl lg:max-w-none rounded-2xl overflow-hidden border border-border/70 bg-card shadow-[0_20px_80px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_80px_-10px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:-translate-y-1">

              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-border bg-slate-100/80 dark:bg-slate-900/80 px-4 py-3 select-none">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex items-center gap-2 rounded-md bg-background px-4 py-1 text-[11px] text-muted border border-border/50 font-mono max-w-[240px] w-full justify-center">
                  <svg className="w-3 h-3 text-muted/65 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="truncate">app.natime.vn/dashboard</span>
                </div>
                <div className="w-10 shrink-0" />
              </div>

              {/* Screenshot */}
              <div className="relative overflow-hidden bg-slate-950">
                <img
                  src="/screenshots/dashboard.png"
                  alt="nATime Dashboard"
                  className="w-full h-auto object-cover select-none"
                />
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50/60 dark:from-[#0a0a14]/60 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating stat card — top left */}
            <div className="absolute -left-4 top-10 hidden sm:flex items-center gap-3 rounded-xl border border-border/60 bg-card/90 px-3.5 py-2.5 backdrop-blur-xl shadow-lg text-xs font-semibold text-foreground select-none">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 text-base">✅</span>
              <div>
                <p className="text-[10px] font-normal text-muted">{t('Đồng bộ thiết bị', 'Device synced')}</p>
                <p className="font-bold text-sm">24 {t('thiết bị online', 'devices online')}</p>
              </div>
            </div>

            {/* Floating stat card — bottom right */}
            <div className="absolute -right-4 bottom-12 hidden sm:flex items-center gap-3 rounded-xl border border-border/60 bg-card/90 px-3.5 py-2.5 backdrop-blur-xl shadow-lg text-xs font-semibold text-foreground select-none">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 text-base">⏱️</span>
              <div>
                <p className="text-[10px] font-normal text-muted">{t('Hôm nay đúng giờ', 'On-time today')}</p>
                <p className="font-bold text-sm">98.2%</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Animations ── */}
      <style jsx>{`
        .hero-fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-delay-1 { animation-delay: 0.1s; }
        .hero-delay-2 { animation-delay: 0.2s; }
        .hero-delay-3 { animation-delay: 0.35s; }
        .hero-delay-4 { animation-delay: 0.5s; }
        .hero-delay-5 { animation-delay: 0.65s; }
      `}</style>
    </section>
  );
}
