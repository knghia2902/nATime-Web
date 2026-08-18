'use client';

import { motion } from 'motion/react';
import { Users, Cpu, CheckCircle, Clock } from '@phosphor-icons/react';
import { useLanguage } from '@/lib/i18n';

export default function Stats() {
  const { t } = useLanguage();

  const stats = [
    {
      id: 'employees',
      value: '10,000+',
      label: t('Nhân viên đang chấm công', 'Active Employees'),
      icon: Users,
    },
    {
      id: 'devices',
      value: '500+',
      label: t('Thiết bị IoT kết nối', 'Connected IoT Devices'),
      icon: Cpu,
    },
    {
      id: 'uptime',
      value: '99.9%',
      label: t('Độ tin cậy vận hành', 'Operational Reliability'),
      icon: CheckCircle,
    },
    {
      id: 'speed',
      value: '< 0.5s',
      label: t('Tốc độ đối soát dữ liệu', 'Data Sync Latency'),
      icon: Clock,
    },
  ];

  return (
    <section className="relative bg-[rgba(15,23,38,0.5)] border-y border-white/[0.08] py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white">
                  <Icon size={20} weight="duotone" />
                </div>
                <span className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {item.value}
                </span>
                <span className="mt-2 text-xs font-semibold text-white/50 uppercase tracking-wider">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
