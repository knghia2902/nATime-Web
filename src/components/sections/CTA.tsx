'use client';

import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';

export default function CTA() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <section id="cta" className="relative py-24 overflow-hidden bg-background">
      {/* Subtle Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.06),transparent_50%)] pointer-events-none" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="relative rounded-2xl overflow-hidden border border-border bg-card p-8 md:p-16 shadow-xl">
          {/* Decorative glowing gradient inside card */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-primary bg-primary/5 border border-primary/15 mb-6 uppercase">
              {t('Dùng thử miễn phí', 'Get Started for Free')}
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-foreground">
              {t(
                'Sẵn sàng nâng tầm quản trị nhân sự và kiểm soát ra vào?',
                'Ready to elevate attendance & gate access control?'
              )}
            </h2>

            <p className="text-base sm:text-lg text-muted mb-8 leading-relaxed max-w-2xl">
              {t(
                'Bắt đầu ngay hôm nay với 30 ngày dùng thử miễn phí đầy đủ tính năng. Không yêu cầu thẻ tín dụng, hủy bất kỳ lúc nào.',
                'Start today with a 30-day free trial containing all premium features. No credit card required, cancel anytime.'
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href={user ? "/dashboard" : "/register"}
                className="inline-flex h-12 items-center justify-center px-8 rounded-lg bg-primary text-white font-bold shadow-md shadow-primary/15 hover:bg-primary-hover transition-all hover:scale-[1.01] active:scale-[0.99] w-full sm:w-auto text-center cursor-pointer"
              >
                {t('Bắt đầu thử nghiệm', 'Start Free Trial')}
              </Link>
              
              <Link 
                href="/contact"
                className="inline-flex h-12 items-center justify-center px-8 rounded-lg border border-border bg-card hover:bg-card-hover text-foreground font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] w-full sm:w-auto text-center cursor-pointer"
              >
                {t('Liên hệ tư vấn', 'Contact Sales')}
              </Link>
            </div>

            {/* Trust factors */}
            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-muted">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('Kích hoạt tức thì', 'Instant activation')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('Bảo mật dữ liệu tối đa', 'GDPR & AES-256 secure')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('Hỗ trợ setup onsite', 'Onsite setup support')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
