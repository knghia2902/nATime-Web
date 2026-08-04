'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle2, PlayCircle, Send, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/lib/authContext';

export default function Hero() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start lg:col-span-5"
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 dark:bg-blue-950/40 dark:border-blue-800 px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
              <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="uppercase tracking-wide">{t('PHẦN MỀM CHẤM CÔNG THÔNG MINH', 'SMART ATTENDANCE SOFTWARE')}</span>
            </div>

            {/* H1 Headline */}
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] leading-[1.15]">
              {t('Quản lý thời gian', 'Time Management')} <br />
              <span className="text-blue-600 dark:text-blue-500">
                {t('Hiệu quả hơn mỗi ngày', 'More Efficient Every Day')}
              </span>
            </h1>

            {/* Subtext */}
            <p className="mb-8 text-base leading-relaxed text-muted sm:text-lg max-w-xl">
              {t(
                'nATime giúp doanh nghiệp tự động hóa việc chấm công, quản lý nhân sự và tính lương một cách chính xác, minh bạch và dễ dàng.',
                'nATime helps businesses automate time attendance, employee management, and payroll processing with accuracy and ease.'
              )}
            </p>

            {/* Action Buttons */}
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center w-full sm:w-auto">
              <Link
                href={user ? '/portal' : '/register?trial=standard'}
                className="inline-flex h-13 items-center justify-center gap-2.5 rounded-2xl bg-blue-600 px-7 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto"
              >
                <Send className="h-4 w-4 fill-white" />
                <span>{user ? t('Vào Cổng khách hàng', 'Customer Portal') : t('Dùng thử miễn phí 14 ngày', 'Start 14-Day Free Trial')}</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-card px-7 text-sm font-bold text-blue-600 dark:text-blue-400 dark:border-blue-800 transition-all hover:bg-blue-50/50 cursor-pointer w-full sm:w-auto"
              >
                <PlayCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>{t('Xem demo', 'Watch Demo')}</span>
              </Link>
            </div>

            {/* 3 Check factors */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-foreground">
              <span className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                <span>{t('Dễ sử dụng', 'Easy to use')}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                <span>{t('Triển khai nhanh', 'Fast deployment')}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                <span>{t('Bảo mật tuyệt đối', 'Absolute security')}</span>
              </span>
            </div>
          </motion.div>

          {/* Right Column - Rich Interactive App Mockup matching image */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
              
              {/* Top Bar inside App Mockup */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">nA</span>
                  <span className="font-extrabold text-sm text-blue-900 dark:text-blue-200">nATime</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">🔔</span>
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-semibold">
                    <span className="h-5 w-5 rounded-full bg-amber-500 text-[10px] text-white flex items-center justify-center">👤</span>
                    <span>Admin ▾</span>
                  </div>
                </div>
              </div>

              {/* Main Content inside App Mockup */}
              <div className="grid grid-cols-12 gap-4">
                {/* Left Mini Sidebar */}
                <div className="col-span-3 space-y-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400 hidden sm:block">
                  <div className="flex items-center gap-2 rounded-lg bg-blue-600 text-white p-2 font-bold">
                    <span>📊</span> <span>Tổng quan</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <span>⏱️</span> <span>Chấm công</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <span>📅</span> <span>Ca làm việc</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <span>📝</span> <span>Đơn từ</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <span>📈</span> <span>Báo cáo</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <span>👥</span> <span>Nhân viên</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <span>⚙️</span> <span>Thiết lập</span>
                  </div>
                </div>

                {/* Main Dashboard Panel */}
                <div className="col-span-12 sm:col-span-9 space-y-4">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Tổng quan</h3>

                  {/* 4 Stat Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-800/50 p-2.5">
                      <span className="text-[10px] text-slate-500 block">Nhân viên</span>
                      <span className="text-base font-extrabold text-slate-900 dark:text-white block mt-0.5">128</span>
                      <span className="text-[9px] text-blue-600 dark:text-blue-400 font-semibold block mt-1">Xem chi tiết →</span>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-800/50 p-2.5">
                      <span className="text-[10px] text-slate-500 block">Tỷ lệ đúng giờ</span>
                      <span className="text-base font-extrabold text-slate-900 dark:text-white block mt-0.5">96.4%</span>
                      <span className="text-[9px] text-blue-600 dark:text-blue-400 font-semibold block mt-1">Xem chi tiết →</span>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-800/50 p-2.5">
                      <span className="text-[10px] text-slate-500 block">Tổng giờ làm</span>
                      <span className="text-base font-extrabold text-slate-900 dark:text-white block mt-0.5">2,560h</span>
                      <span className="text-[9px] text-blue-600 dark:text-blue-400 font-semibold block mt-1">Xem chi tiết →</span>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-800/50 p-2.5">
                      <span className="text-[10px] text-slate-500 block">Đơn chờ duyệt</span>
                      <span className="text-base font-extrabold text-slate-900 dark:text-white block mt-0.5">12</span>
                      <span className="text-[9px] text-blue-600 dark:text-blue-400 font-semibold block mt-1">Xem chi tiết →</span>
                    </div>
                  </div>

                  {/* Mid Chart Row */}
                  <div className="grid grid-cols-12 gap-3">
                    {/* Line Chart */}
                    <div className="col-span-7 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30 p-3">
                      <div className="flex items-center justify-between text-[10px] mb-2">
                        <span className="font-bold text-slate-700 dark:text-slate-300">Tổng giờ làm việc</span>
                        <span className="text-slate-400">Tháng này ▾</span>
                      </div>
                      <svg className="w-full h-16 text-blue-500 overflow-visible" viewBox="0 0 200 60" fill="none">
                        <path d="M0 45 Q 30 35, 60 40 T 120 20 T 180 10 L 200 5" stroke="currentColor" strokeWidth="2.5" fill="none" />
                        <path d="M0 45 Q 30 35, 60 40 T 120 20 T 180 10 L 200 5 L 200 60 L 0 60 Z" fill="rgba(37,99,235,0.12)" />
                      </svg>
                      <div className="flex justify-between text-[8px] text-slate-400 mt-1">
                        <span>01/05</span><span>06/05</span><span>11/05</span><span>16/05</span><span>21/05</span><span>26/05</span><span>31/05</span>
                      </div>
                    </div>

                    {/* Donut Chart */}
                    <div className="col-span-5 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30 p-3 flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Tỷ lệ chấm công</span>
                      <div className="relative my-1 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-amber-400 border-r-red-400 flex items-center justify-center text-[9px] font-extrabold text-blue-600 dark:text-blue-400">
                          96.4%
                        </div>
                      </div>
                      <div className="space-y-0.5 text-[8px] text-slate-500">
                        <div className="flex items-center justify-between"><span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" />Đi làm</span><span>96.4%</span></div>
                        <div className="flex items-center justify-between"><span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" />Đi muộn</span><span>2.1%</span></div>
                        <div className="flex items-center justify-between"><span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-red-400" />Vắng</span><span>1.5%</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Table & Mobile Card Row */}
                  <div className="grid grid-cols-12 gap-3">
                    {/* Recent Attendance Table */}
                    <div className="col-span-7 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/30 p-3">
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block mb-2">Chấm công gần đây</span>
                      <div className="space-y-1.5 text-[9px]">
                        <div className="flex items-center justify-between py-0.5 border-b border-slate-100 dark:border-slate-800">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">Nguyễn Văn A</span>
                          <span className="text-slate-400">08:02</span>
                          <span className="rounded bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 text-emerald-600 dark:text-emerald-400 font-bold">Đi làm</span>
                        </div>
                        <div className="flex items-center justify-between py-0.5 border-b border-slate-100 dark:border-slate-800">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">Trần Thị B</span>
                          <span className="text-slate-400">07:58</span>
                          <span className="rounded bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 text-emerald-600 dark:text-emerald-400 font-bold">Đi làm</span>
                        </div>
                        <div className="flex items-center justify-between py-0.5 border-b border-slate-100 dark:border-slate-800">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">Lê Văn C</span>
                          <span className="text-slate-400">08:15</span>
                          <span className="rounded bg-amber-100 dark:bg-amber-950 px-1.5 py-0.5 text-amber-600 dark:text-amber-400 font-bold">Đi muộn</span>
                        </div>
                        <div className="flex items-center justify-between py-0.5">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">Phạm Thị D</span>
                          <span className="text-slate-400">--:--</span>
                          <span className="rounded bg-red-100 dark:bg-red-950 px-1.5 py-0.5 text-red-600 dark:text-red-400 font-bold">Vắng</span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile App Promo Card */}
                    <div className="col-span-5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 p-3 flex flex-col justify-between border border-blue-100 dark:border-blue-900">
                      <div>
                        <span className="text-[10px] font-bold text-blue-900 dark:text-blue-200 block">Chấm công mọi lúc mọi nơi</span>
                        <p className="text-[8px] text-blue-700 dark:text-blue-400 mt-1 leading-tight">Ứng dụng nATime hỗ trợ chấm công bằng Face ID, GPS, Wi-Fi nội bộ.</p>
                      </div>
                      <button className="mt-2 w-full rounded-lg bg-blue-600 py-1 text-[9px] font-bold text-white shadow-sm">
                        Tải ứng dụng
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
