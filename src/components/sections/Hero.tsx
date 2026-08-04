'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ShieldCheck, Lightning, Buildings, ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/lib/authContext';

export default function Hero() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <section className="relative min-h-[calc(100dvh-4rem)] flex flex-col justify-center overflow-hidden bg-background py-16 lg:py-20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.35) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* 1. Eyebrow badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary">
            <Lightning size={14} weight="fill" />
            <span>{t('Nền tảng Quản lý Chấm công & Thiết bị Doanh nghiệp', 'Enterprise Time Attendance & Device Platform')}</span>
          </div>

          {/* 2. Headline (Max 2 lines) */}
          <h1 className="mb-6 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.12]">
            nATime <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
              {t('Chấm công & Kiểm soát Ra vào Thông minh', 'Smart Access & Time Attendance')}
            </span>
          </h1>

          {/* 3. Subtext (Max 20 words) */}
          <p className="mb-8 text-base leading-relaxed text-muted sm:text-lg max-w-[56ch]">
            {t(
              'Giải pháp chấm công self-host trên hệ điều hành Windows, tự động đối soát ca kíp và kết nối thiết bị IoT.',
              'Self-hosted Windows attendance solution with automated shift reconciliation and IoT device integration.'
            )}
          </p>

          {/* 4. Action Buttons */}
          <div className="mb-12 flex flex-col gap-3.5 sm:flex-row sm:items-center justify-center w-full sm:w-auto">
            <Link
              href={user ? '/portal' : '/register?trial=standard'}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto"
            >
              <span>{user ? t('Vào Cổng Khách hàng', 'Customer Portal') : t('Dùng thử miễn phí 30 ngày', 'Start 30-Day Free Trial')}</span>
              <ArrowRight size={16} weight="bold" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 text-sm font-semibold text-foreground transition-all hover:bg-card-hover hover:border-primary/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto"
            >
              <span>{t('Liên hệ tư vấn', 'Contact Sales')}</span>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-muted">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/60 px-4 py-1.5 shadow-sm">
              <ShieldCheck size={16} className="text-emerald-500" weight="fill" />
              <span>{t('Bảo mật AES-256', 'AES-256 Secured')}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/60 px-4 py-1.5 shadow-sm">
              <Lightning size={16} className="text-blue-500" weight="fill" />
              <span>{t('.NET 10 Hiệu năng cao', 'High-performance .NET 10')}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/60 px-4 py-1.5 shadow-sm">
              <Buildings size={16} className="text-indigo-500" weight="fill" />
              <span>{t('On-premise / Local Server', 'On-premise / Local Server')}</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
