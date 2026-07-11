'use client';

import { useLanguage } from '@/lib/i18n';

const PARTICLES = [
  { size: 4, top: '12%', left: '8%', delay: '0s', duration: '6s', opacity: 0.3 },
  { size: 6, top: '20%', left: '85%', delay: '1s', duration: '8s', opacity: 0.2 },
  { size: 3, top: '65%', left: '12%', delay: '2s', duration: '7s', opacity: 0.25 },
  { size: 5, top: '75%', left: '90%', delay: '0.5s', duration: '9s', opacity: 0.15 },
  { size: 3, top: '40%', left: '95%', delay: '3s', duration: '6.5s', opacity: 0.2 },
  { size: 7, top: '85%', left: '50%', delay: '1.5s', duration: '8.5s', opacity: 0.18 },
  { size: 4, top: '10%', left: '45%', delay: '2.5s', duration: '7.5s', opacity: 0.22 },
  { size: 5, top: '50%', left: '5%', delay: '0.8s', duration: '9.5s', opacity: 0.16 },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Animated mesh gradient background ── */}
      <div className="hero-bg absolute inset-0 -z-10" aria-hidden="true" />

      {/* ── Noise texture overlay ── */}
      <div
        className="absolute inset-0 -z-5 opacity-[0.03] dark:opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 -z-5" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="hero-particle absolute rounded-full bg-indigo-500 dark:bg-indigo-400"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* ── Radial glow accents ── */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full -z-5"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full -z-5"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <div className="hero-fade-in hero-delay-1 flex justify-center mb-8">
          <div className="hero-badge-border relative inline-flex rounded-full p-px">
            <span className="relative inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('🚀 Phiên bản 1.0 — Ra mắt Q3/2026', '🚀 Version 1.0 — Launching Q3/2026')}
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="hero-fade-in hero-delay-2 mb-6">
          <span className="hero-gradient-text block text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-none mb-4">
            nATime
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 leading-snug max-w-2xl mx-auto whitespace-pre-line">
            {t(
              'Giải pháp Chấm công &\nKiểm soát Ra vào Thông minh',
              'Smart Time Attendance &\nAccess Control Solution'
            )}
          </span>
        </h1>

        {/* Description */}
        <p className="hero-fade-in hero-delay-3 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t(
            'Nền tảng quản lý chấm công, kiểm soát ra vào và giám sát toàn diện dành cho doanh nghiệp. Tích hợp AI, nhận diện khuôn mặt và phân tích dữ liệu thời gian thực.',
            'Enterprise-grade platform for time attendance, access control, and comprehensive monitoring. Powered by AI, facial recognition, and real-time data analytics.'
          )}
        </p>

        {/* CTA Buttons */}
        <div className="hero-fade-in hero-delay-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            className="group relative inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.03] active:scale-[0.98] cursor-pointer w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('Bắt đầu ngay', 'Get Started')}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </button>

          <button
            className="group relative inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-white/5 backdrop-blur-sm px-8 text-base font-semibold text-gray-800 dark:text-gray-200 transition-all duration-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-700 dark:hover:text-indigo-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer w-full sm:w-auto"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            {t('Xem Demo', 'Watch Demo')}
          </button>
        </div>

        {/* Trust indicators */}
        <div className="hero-fade-in hero-delay-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-gray-500 dark:text-gray-500">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {t('Miễn phí 30 ngày', '30-day free trial')}
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {t('Không cần thẻ tín dụng', 'No credit card required')}
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {t('Hỗ trợ 24/7', '24/7 support')}
          </span>
        </div>
      </div>

      {/* ── Bottom gradient fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 -z-1"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to top, var(--background), transparent)',
        }}
      />

      {/* ── Inline styles for animations ── */}
      <style jsx>{`
        /* ── Mesh gradient background ── */
        .hero-bg {
          background:
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79,70,229,0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(168,85,247,0.10), transparent),
            radial-gradient(ellipse 50% 60% at 20% 80%, rgba(99,102,241,0.08), transparent),
            radial-gradient(ellipse 40% 30% at 70% 20%, rgba(139,92,246,0.06), transparent);
          animation: meshShift 12s ease-in-out infinite alternate;
        }

        :global(.dark) .hero-bg {
          background:
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79,70,229,0.25), transparent),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(168,85,247,0.15), transparent),
            radial-gradient(ellipse 50% 60% at 20% 80%, rgba(99,102,241,0.12), transparent),
            radial-gradient(ellipse 40% 30% at 70% 20%, rgba(139,92,246,0.10), transparent);
          animation: meshShift 12s ease-in-out infinite alternate;
        }

        @keyframes meshShift {
          0% {
            background-position: 0% 0%, 100% 50%, 0% 100%, 70% 20%;
          }
          33% {
            background-position: 20% 10%, 80% 40%, 10% 90%, 60% 30%;
          }
          66% {
            background-position: 10% 20%, 90% 60%, 20% 80%, 75% 15%;
          }
          100% {
            background-position: 30% 5%, 70% 55%, 5% 85%, 65% 25%;
          }
        }

        /* ── Floating particles ── */
        .hero-particle {
          animation: particleFloat 6s ease-in-out infinite alternate;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: var(--tw-opacity, 0.2);
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.2);
          }
          50% {
            transform: translateY(-10px) translateX(-15px) scale(0.9);
          }
          75% {
            transform: translateY(-30px) translateX(5px) scale(1.1);
          }
          100% {
            transform: translateY(-15px) translateX(-10px) scale(1);
            opacity: calc(var(--tw-opacity, 0.2) * 1.5);
          }
        }

        /* ── Gradient text ── */
        .hero-gradient-text {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #a855f7 70%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Badge gradient border ── */
        .hero-badge-border {
          background: linear-gradient(135deg, #4f46e5, #a855f7, #6366f1, #4f46e5);
          background-size: 300% 300%;
          animation: borderShimmer 4s ease-in-out infinite;
        }

        @keyframes borderShimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* ── Fade-in-up animation ── */
        .hero-fade-in {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-delay-1 { animation-delay: 0.1s; }
        .hero-delay-2 { animation-delay: 0.25s; }
        .hero-delay-3 { animation-delay: 0.4s; }
        .hero-delay-4 { animation-delay: 0.55s; }
        .hero-delay-5 { animation-delay: 0.7s; }
      `}</style>
    </section>
  );
}
