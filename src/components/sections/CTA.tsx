'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Laptop, Smartphone } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/lib/authContext';

export default function CTA() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <section id="cta" className="relative py-16 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 sm:p-12 lg:p-14 text-white shadow-2xl overflow-hidden"
        >
          {/* Subtle Dot matrix overlay */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)',
              backgroundSize: '16px 16px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Left Graphics */}
            <div className="lg:col-span-4 flex items-center justify-center gap-4">
              <div className="flex h-20 w-28 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-lg">
                <Laptop className="h-10 w-10 text-white" />
              </div>
              <div className="flex h-24 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
                <Smartphone className="h-9 w-9 text-white" />
              </div>
            </div>

            {/* Right Copy & Button */}
            <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t('Bắt đầu cùng nATime ngay hôm nay!', 'Get started with nATime today!')}
              </h2>
              <p className="mt-2 text-base text-blue-100 sm:text-lg">
                {t('Dùng thử miễn phí 14 ngày - Không cần thẻ tín dụng', 'Start 14-day free trial - No credit card required')}
              </p>

              <div className="mt-6">
                <Link
                  href={user ? '/portal' : '/register?trial=standard'}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-white px-8 text-sm font-bold text-blue-700 shadow-xl transition hover:bg-blue-50 cursor-pointer"
                >
                  <span>{user ? t('Vào Portal', 'Go to Portal') : t('Dùng thử miễn phí', 'Start Free Trial')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
