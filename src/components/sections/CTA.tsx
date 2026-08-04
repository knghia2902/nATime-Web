'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/lib/authContext';

export default function CTA() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <section id="cta" className="relative py-20 lg:py-28 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-primary-light/40 p-8 sm:p-12 lg:p-16 shadow-xl overflow-hidden"
        >
          {/* Ambient decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-8 flex flex-col items-start">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl leading-tight">
                {t(
                  'Sẵn sàng hiện đại hóa hệ thống chấm công?',
                  'Ready to modernize your time attendance?'
                )}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg max-w-2xl">
                {t(
                  'Dùng thử 30 ngày đầy đủ tính năng. Cài đặt đơn giản trên hệ điều hành Windows.',
                  '30-day full-feature trial. Simple setup on Windows Operating System.'
                )}
              </p>

              {/* Trust checklist */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-emerald-500" weight="fill" />
                  <span>{t('Kích hoạt tức thì', 'Instant activation')}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-emerald-500" weight="fill" />
                  <span>{t('Bảo mật dữ liệu tối đa', 'Max data security')}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-emerald-500" weight="fill" />
                  <span>{t('Hỗ trợ kỹ thuật Onsite', 'Onsite setup support')}</span>
                </span>
              </div>
            </div>

            {/* Right Action */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-stretch sm:items-center lg:items-end">
              <Link
                href={user ? '/portal' : '/register?trial=standard'}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full text-center"
              >
                <span>{user ? t('Vào Portal', 'Go to Portal') : t('Đăng ký trải nghiệm', 'Register Trial')}</span>
                <ArrowRight size={16} weight="bold" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 text-sm font-semibold text-foreground transition-all hover:bg-card-hover hover:border-primary/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full text-center"
              >
                <span>{t('Yêu cầu báo giá', 'Request Quote')}</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
