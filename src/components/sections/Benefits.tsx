'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Clock, ShieldCheck, FileCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function Benefits() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-background py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/40 via-white to-blue-50/60 dark:border-blue-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30 p-8 sm:p-12 lg:p-16 shadow-lg">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            {/* Left Copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 flex flex-col items-start"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-3">
                {t('LỢI ÍCH KHI SỬ DỤNG nATime', 'BENEFITS OF USING nATime')}
              </span>

              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight mb-5">
                {t('Tối ưu thời gian', 'Optimize Time')} <br />
                <span className="text-blue-600 dark:text-blue-500">
                  {t('Nâng cao hiệu suất', 'Boost Performance')}
                </span>
              </h2>

              <p className="text-base leading-relaxed text-muted mb-8 max-w-md">
                {t(
                  'nATime giúp doanh nghiệp tự động hóa việc chấm công, giảm thiểu sai sót và tiết kiệm thời gian quản lý.',
                  'nATime helps businesses automate time attendance, minimize errors, and save management time.'
                )}
              </p>

              <Link
                href="/features"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition"
              >
                <span>{t('Tìm hiểu thêm', 'Learn More')}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Center/Right Items List & Graphic */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-8 items-center"
            >
              {/* 3 Benefit cards column */}
              <div className="sm:col-span-7 space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">{t('Tiết kiệm thời gian', 'Save Time')}</h3>
                    <p className="text-xs text-muted mt-1">{t('Giảm 80% thời gian xử lý chấm công', 'Reduce attendance processing time by 80%')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">{t('Chính xác tuyệt đối', 'Absolute Accuracy')}</h3>
                    <p className="text-xs text-muted mt-1">{t('Dữ liệu minh bạch, hạn chế sai sót', 'Transparent data, minimize errors')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-red-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400">
                    <FileCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">{t('Tuân thủ pháp luật', 'Legal Compliance')}</h3>
                    <p className="text-xs text-muted mt-1">{t('Đáp ứng đầy đủ quy định về lao động', 'Fully compliant with labor regulations')}</p>
                  </div>
                </div>
              </div>

              {/* Graphic Illustration Column */}
              <div className="sm:col-span-5 flex items-center justify-center">
                <div className="relative w-full max-w-[220px] aspect-square rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-6 flex flex-col items-center justify-center text-white shadow-xl text-center">
                  <div className="text-5xl mb-2">📊</div>
                  <div className="text-2xl font-extrabold">+80%</div>
                  <div className="text-xs font-medium text-blue-100 mt-1">{t('Hiệu suất quản lý', 'Management Efficiency')}</div>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
