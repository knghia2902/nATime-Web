'use client';

import { motion } from 'motion/react';
import { ScanFace, CalendarDays, FileText, BarChart3, Users, Settings } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      id: 'attendance',
      title: t('Chấm công đa dạng', 'Diverse Attendance'),
      desc: t('Hỗ trợ Face ID, GPS, Wi-Fi, QR Code và máy chấm công.', 'Supports Face ID, GPS, Wi-Fi, QR Code, and biometric devices.'),
      icon: ScanFace,
      bgColor: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/50 dark:border-blue-900 dark:text-blue-400',
    },
    {
      id: 'shift',
      title: t('Quản lý ca làm việc', 'Shift Management'),
      desc: t('Thiết lập ca linh hoạt, xoay ca tự động, phù hợp mọi mô hình.', 'Flexible shift setup, auto rotation, suitable for any business model.'),
      icon: CalendarDays,
      bgColor: 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/50 dark:border-emerald-900 dark:text-emerald-400',
    },
    {
      id: 'requests',
      title: t('Quản lý đơn từ', 'Request Management'),
      desc: t('Đề nghị, xin phép, tăng ca dễ dàng, duyệt nhanh chóng.', 'Easy leave, overtime, and request submissions with fast approval.'),
      icon: FileText,
      bgColor: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/50 dark:border-amber-900 dark:text-amber-400',
    },
    {
      id: 'reports',
      title: t('Báo cáo trực quan', 'Visual Reports'),
      desc: t('Hệ thống báo cáo đa dạng, dễ theo dõi và xuất dữ liệu.', 'Diverse reporting system, easy tracking and data exports.'),
      icon: BarChart3,
      bgColor: 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-950/50 dark:border-purple-900 dark:text-purple-400',
    },
    {
      id: 'employees',
      title: t('Quản lý nhân sự', 'Personnel Management'),
      desc: t('Thông tin nhân sự tập trung, đồng bộ và bảo mật.', 'Centralized employee information, synchronized and secure.'),
      icon: Users,
      bgColor: 'bg-teal-50 text-teal-600 border-teal-100 dark:bg-teal-950/50 dark:border-teal-900 dark:text-teal-400',
    },
    {
      id: 'settings',
      title: t('Tùy chỉnh linh hoạt', 'Flexible Customization'),
      desc: t('Phân quyền chi tiết, cấu hình theo nhu cầu doanh nghiệp.', 'Granular permissions and configuration tailored to enterprise needs.'),
      icon: Settings,
      bgColor: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/50 dark:border-blue-900 dark:text-blue-400',
    },
  ];

  return (
    <section id="features" className="relative bg-background py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-left"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-2">
            {t('TÍNH NĂNG NỔI BẬT', 'FEATURE HIGHLIGHTS')}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {t('Đầy đủ tính năng - Dễ dàng sử dụng', 'Full Featured - Easy to Use')}
          </h2>
        </motion.div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative rounded-2xl border border-slate-100 bg-card p-6 shadow-sm dark:border-slate-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${item.bgColor}`}>
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-base font-extrabold text-foreground mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
