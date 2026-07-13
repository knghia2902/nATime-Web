'use client';

import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/lib/authContext';
import Link from 'next/link';

export default function Hero() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <section className="hero-section relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#0a0a14] pt-24 md:pt-32 pb-16">
      {/* ── Professional Subtle Background Radial Glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] -z-10 opacity-60 dark:opacity-40 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(79, 70, 229, 0.12) 0%, transparent 80%)',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center items-center">
        {/* Badge */}
        <div className="hero-fade-in hero-delay-1 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-foreground/80 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>{t('🚀 Phiên bản 1.0 — Ra mắt Q3/2026', '🚀 Version 1.0 — Launching Q3/2026')}</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="hero-fade-in hero-delay-2 mb-6 max-w-3xl">
          <span className="block text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            nATime
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            {t(
              'Giải pháp Chấm công & Kiểm soát Ra vào Thông minh',
              'Smart Time Attendance & Access Control Solution'
            )}
          </span>
        </h1>

        {/* Description */}
        <p className="hero-fade-in hero-delay-3 text-base sm:text-lg text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          {t(
            'Nền tảng quản lý chấm công, kiểm soát ra vào và giám sát thiết bị toàn diện dành cho doanh nghiệp. Tích hợp công nghệ hiện đại, vận hành bền bỉ trên nền tảng .NET 10 độc lập.',
            'Enterprise-grade platform for time attendance, access control, and unified device monitoring. Built independently on .NET 10 for highly secure and stable operations.'
          )}
        </p>

        {/* CTA Buttons */}
        <div className="hero-fade-in hero-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full sm:w-auto">
          <Link
            href={user ? "/dashboard" : "/register"}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary-hover hover:scale-[1.01] active:scale-[0.99] cursor-pointer w-full sm:w-auto text-center"
          >
            {t('Dùng thử miễn phí', 'Start Free Trial')}
            <svg
              className="w-4 h-4 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card/85 dark:bg-card/20 px-6 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-primary/5 hover:border-primary/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer w-full sm:w-auto text-center"
          >
            {t('Liên hệ tư vấn', 'Contact Sales')}
          </Link>
        </div>

        {/* ── 5. REALISTIC WEB PORTAL PREVIEW ────────────────── */}
        <div className="hero-fade-in hero-delay-5 w-full max-w-5xl mx-auto rounded-xl border border-border bg-card shadow-2xl overflow-hidden text-left relative">
          {/* Top Window Chrome */}
          <div className="flex items-center justify-between border-b border-border bg-slate-100/80 dark:bg-slate-900/80 px-4 py-3 select-none">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="h-3 w-3 rounded-full bg-red-400/80 dark:bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80 dark:bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-400/80 dark:bg-green-500/70" />
            </div>
            <div className="flex items-center gap-2 rounded-md bg-background px-4 py-1 text-[11px] text-muted border border-border/50 max-w-[280px] sm:max-w-xs w-full justify-center font-mono overflow-hidden truncate">
              <svg className="w-3 h-3 text-muted/65 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="truncate">app.natime.vn/dashboard</span>
            </div>
            <div className="w-10 shrink-0" />
          </div>

          {/* The Image */}
          <div className="relative overflow-hidden bg-background">
            <img 
              src="/screenshots/dashboard.png" 
              alt="nATime Dashboard" 
              className="w-full h-auto object-cover select-none" 
            />
          </div>
        </div>
      </div>

      {/* ── Inline styles for animations ── */}
      <style jsx>{`
        /* ── Fade-in-up animation ── */
        .hero-fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-delay-1 { animation-delay: 0.1s; }
        .hero-delay-2 { animation-delay: 0.2s; }
        .hero-delay-3 { animation-delay: 0.3s; }
        .hero-delay-4 { animation-delay: 0.4s; }
        .hero-delay-5 { animation-delay: 0.5s; }
      `}</style>
    </section>
  );
}
