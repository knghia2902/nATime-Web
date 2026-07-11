'use client';

import { useLanguage } from '@/lib/i18n';

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section id="cta" className="relative py-24 overflow-hidden bg-background">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.15),transparent_50%)]" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="relative rounded-3xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-xl p-8 md:p-16 shadow-2xl">
          {/* Decorative glowing gradient inside card */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-primary bg-primary/10 border border-primary/20 mb-6 uppercase">
              {t('Dùng thử miễn phí', 'Get Started for Free')}
            </span>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent">
              {t(
                'Sẵn sàng nâng tầm quản trị nhân sự và kiểm soát ra vào?',
                'Ready to elevate attendance & gate access control?'
              )}
            </h2>

            <p className="text-lg text-muted mb-10 leading-relaxed max-w-2xl">
              {t(
                'Bắt đầu ngay hôm nay với 30 ngày dùng thử miễn phí đầy đủ tính năng. Không yêu cầu thẻ tín dụng, hủy bất kỳ lúc nào.',
                'Start today with a 30-day free trial containing all premium features. No credit card required, cancel anytime.'
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="relative group overflow-hidden px-8 py-4 rounded-xl bg-primary text-primary-light font-semibold shadow-lg hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                {/* Shine Animation overlay */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
                {t('Bắt đầu thử nghiệm', 'Start Free Trial')}
              </button>
              
              <a 
                href="#contact"
                className="px-8 py-4 rounded-xl border border-border/80 bg-card/60 hover:bg-card/90 text-foreground font-semibold hover:border-foreground/20 transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                {t('Liên hệ tư vấn', 'Contact Sales')}
              </a>
            </div>

            {/* Trust factors */}
            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('Kích hoạt tức thì', 'Instant activation')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('Bảo mật dữ liệu tối đa', 'GDPR & AES-256 secure')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('Hỗ trợ setup onsite', 'Onsite setup support')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes shine {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
