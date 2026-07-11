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

          {/* Inner application workspace mockup */}
          <div className="grid grid-cols-12 bg-background/40 dark:bg-slate-950/20 text-[11px] min-h-[380px] font-sans">
            {/* Mock Sidebar */}
            <div className="col-span-12 md:col-span-3 border-b md:border-b-0 md:border-r border-border bg-card/45 dark:bg-card/5 p-4 space-y-4">
              <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white text-xs">
                <span className="h-6 w-6 rounded-md bg-primary flex items-center justify-center text-white text-[11px] font-black">N</span>
                <span>nATime Admin Portal</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 rounded-lg bg-primary/[0.08] px-3 py-2 text-primary font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {t('Tổng quan', 'Dashboard')}
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 text-muted hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  {t('Quản lý Thiết bị', 'Device Management')}
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 text-muted hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  {t('Chấm công & Phép', 'Time Attendance')}
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 text-muted hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  {t('Cổng Access Control', 'Gate Access')}
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 text-muted hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  {t('Nhà thầu & Khách', 'Contractor & Visitor')}
                </div>
              </div>
            </div>

            {/* Mock Main content */}
            <div className="col-span-12 md:col-span-9 p-5 space-y-5">
              {/* Metrics cards row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg border border-border bg-card p-3.5 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-muted tracking-wider">{t('Tổng nhân sự', 'Total Employees')}</p>
                  <p className="text-xl font-black mt-1 text-foreground">1,248</p>
                  <p className="text-[9px] text-emerald-500 font-medium mt-1">↑ 12% {t('tháng này', 'this month')}</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-3.5 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-muted tracking-wider">{t('Thiết bị Online', 'Online Devices')}</p>
                  <p className="text-xl font-black mt-1 text-foreground">34 / 36</p>
                  <p className="text-[9px] text-emerald-500 font-medium mt-1">94.4% {t('Đang hoạt động', 'Active')}</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-3.5 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-muted tracking-wider">{t('Vào ca hôm nay', 'Today Attendance')}</p>
                  <p className="text-xl font-black mt-1 text-foreground">982</p>
                  <p className="text-[9px] text-primary font-medium mt-1">87.5% {t('Tỷ lệ đi làm', 'Attendance Rate')}</p>
                </div>
              </div>

              {/* Data elements grid row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Real-time events */}
                <div className="lg:col-span-7 rounded-lg border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3 border-b border-border/80 pb-2">
                    <span className="font-bold text-foreground text-xs">{t('Nhật ký sự kiện thời gian thực', 'Real-time Event Log')}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <div>
                        <p className="font-semibold text-foreground text-xs">Nguyễn Hoàng Nam</p>
                        <p className="text-[9px] text-muted">{t('Máy kiểm soát cửa chính', 'Main Gate Terminal')}</p>
                      </div>
                      <div className="text-right">
                        <span className="rounded bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 text-[9px] font-bold">Face ID</span>
                        <p className="text-[9px] text-muted mt-0.5 font-mono">08:02:14</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-border/30">
                      <div>
                        <p className="font-semibold text-foreground text-xs">Trần Thị Mai</p>
                        <p className="text-[9px] text-muted">{t('Cổng phụ tòa nhà B', 'Building B Side Gate')}</p>
                      </div>
                      <div className="text-right">
                        <span className="rounded bg-indigo-500/10 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 px-2 py-0.5 text-[9px] font-bold">QR Code</span>
                        <p className="text-[9px] text-muted mt-0.5 font-mono">08:01:45</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <div>
                        <p className="font-semibold text-foreground text-xs">Lê Văn Hùng</p>
                        <p className="text-[9px] text-muted">{t('Cổng trạm cân số 1', 'Weighbridge Gate 1')}</p>
                      </div>
                      <div className="text-right">
                        <span className="rounded bg-amber-500/10 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 px-2 py-0.5 text-[9px] font-bold">RFID Card</span>
                        <p className="text-[9px] text-muted mt-0.5 font-mono">07:59:32</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub status summary */}
                <div className="lg:col-span-5 rounded-lg border border-border bg-card p-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <p className="font-bold text-foreground text-xs">{t('Tình trạng Phân hệ', 'Subsystem Status')}</p>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-muted">{t('Cổng Barie xoay', 'Barriers & Turnstiles')}</span>
                        <span className="font-bold text-emerald-500 font-mono">12/12 Online</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">{t('Camera nhận diện LPR', 'ANPR Cameras')}</span>
                        <span className="font-bold text-emerald-500 font-mono">8/8 Online</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">{t('Trạm cân điện tử', 'Weighbridges')}</span>
                        <span className="font-bold text-emerald-500 font-mono">2/2 Online</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted">{t('Đầu đọc sinh trắc học', 'Biometric Readers')}</span>
                        <span className="font-bold text-amber-500 font-mono">14/16 Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border/80 pt-3 mt-4 flex items-center justify-between text-[9px] text-muted">
                    <span>{t('Đồng bộ dữ liệu:', 'Last synced:')}</span>
                    <span className="font-mono">{t('Thời gian thực', 'Real-time')}</span>
                  </div>
                </div>
              </div>
            </div>
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
