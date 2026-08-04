'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ShieldCheck, Lightning, Buildings, ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/lib/authContext';

export default function Hero() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-background pt-20 pb-16 lg:pt-24 lg:pb-20">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute -top-32 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.4) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Headline & Value Prop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start lg:col-span-6"
          >
            {/* 1. Eyebrow badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3.5 py-1 text-xs font-semibold text-primary">
              <Lightning size={14} weight="fill" />
              <span>{t('Nền tảng Quản lý Chấm công & Thiết bị', 'Time Attendance & Device Management')}</span>
            </div>

            {/* 2. Headline (Max 2 lines) */}
            <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
              nATime <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
                {t('Chấm công & Ra vào Thông minh', 'Smart Access & Attendance')}
              </span>
            </h1>

            {/* 3. Subtext (Max 20 words) */}
            <p className="mb-8 text-base leading-relaxed text-muted sm:text-lg max-w-[54ch]">
              {t(
                'Giải pháp chấm công self-host cài đặt trên Windows, tự động đối soát ca kíp và kết nối thiết bị IoT.',
                'Self-hosted Windows attendance solution with automated shift reconciliation and IoT device integration.'
              )}
            </p>

            {/* 4. Action Buttons */}
            <div className="mb-10 flex flex-col gap-3.5 sm:flex-row sm:items-center w-full sm:w-auto">
              <Link
                href={user ? '/portal' : '/register?trial=standard'}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto"
              >
                <span>{user ? t('Vào Cổng Khách hàng', 'Customer Portal') : t('Dùng thử miễn phí', 'Start Free Trial')}</span>
                <ArrowRight size={16} weight="bold" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 text-sm font-semibold text-foreground transition-all hover:bg-card-hover hover:border-primary/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto"
              >
                <span>{t('Liên hệ tư vấn', 'Contact Sales')}</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card/60 px-3 py-1.5">
                <ShieldCheck size={16} className="text-emerald-500" weight="fill" />
                <span>{t('Bảo mật AES-256', 'AES-256 Secured')}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card/60 px-3 py-1.5">
                <Lightning size={16} className="text-blue-500" weight="fill" />
                <span>{t('.NET 10 Hiệu năng cao', 'High-performance .NET 10')}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card/60 px-3 py-1.5">
                <Buildings size={16} className="text-indigo-500" weight="fill" />
                <span>{t('On-premise / Local Host', 'On-premise / Local Host')}</span>
              </span>
            </div>
          </motion.div>

          {/* Right Column: Screenshot Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-2xl rounded-2xl border border-border/80 bg-card shadow-2xl overflow-hidden">
              {/* Window Chrome Header */}
              <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-3 select-none">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <div className="rounded-md border border-border/50 bg-background px-3 py-0.5 text-center font-mono text-[11px] text-muted">
                  app.natime.vn/dashboard
                </div>
                <div className="w-12" />
              </div>

              {/* Real Product Image */}
              <div className="relative bg-background">
                <Image
                  src="/screenshots/dashboard.png"
                  alt="nATime Dashboard Preview"
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
