'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Lightning, Sparkle, ArrowRight } from '@phosphor-icons/react';
import { supabase } from '@/lib/supabase';

type Product = {
  plan_code: 'standard' | 'professional';
  billing_period: 'monthly' | 'yearly';
  amount_vnd: number;
  max_employees: number;
  max_devices: number;
  max_attendance_devices: number;
  max_faceid_devices: number;
  enabled_modules: string[];
};

const verifiedCatalog: Product[] = [
  { plan_code: 'standard', billing_period: 'monthly', amount_vnd: 490000, max_employees: 50, max_devices: 2, max_attendance_devices: 2, max_faceid_devices: 0, enabled_modules: ['Attendance'] },
  { plan_code: 'standard', billing_period: 'yearly', amount_vnd: 4704000, max_employees: 50, max_devices: 2, max_attendance_devices: 2, max_faceid_devices: 0, enabled_modules: ['Attendance'] },
  { plan_code: 'professional', billing_period: 'monthly', amount_vnd: 1990000, max_employees: 1000, max_devices: 10, max_attendance_devices: 10, max_faceid_devices: 16, enabled_modules: ['Attendance', 'Access', 'Weighbridge', 'Assets'] },
  { plan_code: 'professional', billing_period: 'yearly', amount_vnd: 19104000, max_employees: 1000, max_devices: 10, max_attendance_devices: 10, max_faceid_devices: 16, enabled_modules: ['Attendance', 'Access', 'Weighbridge', 'Assets'] },
];

function formatVnd(value: number) {
  return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
}

function getModuleLabel(module: string, vi: boolean): string {
  switch (module) {
    case 'Attendance': return vi ? 'Chấm công' : 'Attendance';
    case 'Access': return vi ? 'Kiểm soát ra vào' : 'Access control';
    case 'Weighbridge': return vi ? 'Trạm cân xe tải' : 'Weighbridge';
    case 'Assets': return vi ? 'Quản lý tài sản' : 'IT Asset Management';
    case 'MCC': return vi ? 'Thiết bị MCC' : 'MCC Devices';
    case 'FaceID': return vi ? 'Thiết bị FaceID' : 'FaceID Devices';
    default: return module;
  }
}

export default function ProductPricing({ locale, compact = false }: { locale: 'vi' | 'en'; compact?: boolean }) {
  const vi = locale === 'vi';
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');
  const [products, setProducts] = useState<Product[]>(verifiedCatalog);
  const [catalogLive, setCatalogLive] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    void supabase
      .from('license_products')
      .select('plan_code,billing_period,amount_vnd,max_employees,max_devices,max_attendance_devices,max_faceid_devices,enabled_modules')
      .eq('is_active', true)
      .then(({ data, error }) => {
        if (!error && data?.length) {
          const mergedProducts = data.map((dbProduct) => {
            const verifiedProduct = verifiedCatalog.find(
              (item) => item.plan_code === dbProduct.plan_code && item.billing_period === dbProduct.billing_period,
            );
            return {
              ...dbProduct,
              enabled_modules: verifiedProduct ? verifiedProduct.enabled_modules : dbProduct.enabled_modules,
            };
          });
          setProducts(mergedProducts as Product[]);
          setCatalogLive(true);
        }
      });
  }, []);

  const plans = useMemo(() => ['standard', 'professional'] as const, []);

  return (
    <div className="w-full">
      {/* Billing Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex items-center rounded-full border border-border/80 bg-card p-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
              billing === 'monthly'
                ? 'bg-primary text-white shadow-md'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {vi ? 'Thanh toán Tháng' : 'Monthly Billing'}
          </button>
          <button
            type="button"
            onClick={() => setBilling('yearly')}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              billing === 'yearly'
                ? 'bg-primary text-white shadow-md'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <span>{vi ? 'Thanh toán Năm' : 'Yearly Billing'}</span>
            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
              {vi ? 'Tiết kiệm' : 'Save'}
            </span>
          </button>
        </div>
      </div>

      {/* Plan Grid */}
      <div className={`mt-10 grid gap-8 ${compact ? 'lg:grid-cols-3' : 'lg:grid-cols-3'}`}>
        {plans.map((code) => {
          const product = products.find((item) => item.plan_code === code && item.billing_period === billing)
            ?? verifiedCatalog.find((item) => item.plan_code === code && item.billing_period === billing)!;
          const professional = code === 'professional';

          return (
            <motion.article
              key={code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative flex flex-col justify-between rounded-3xl border bg-card p-8 shadow-sm transition-all duration-300 ${
                professional
                  ? 'border-primary ring-2 ring-primary/20 shadow-xl lg:-translate-y-2'
                  : 'border-border/80 hover:border-border'
              }`}
            >
              {professional && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1 text-xs font-bold text-white shadow-md">
                  <Sparkle size={12} weight="fill" />
                  <span>{vi ? 'Khuyên dùng' : 'Recommended'}</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-foreground">
                    {professional ? 'Professional' : 'Standard'}
                  </h3>
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black tracking-tight text-foreground">
                    {formatVnd(product.amount_vnd)}
                  </span>
                  <span className="text-xs font-semibold text-muted">
                    / {billing === 'monthly' ? (vi ? 'tháng' : 'month') : (vi ? 'năm' : 'year')}
                  </span>
                </div>

                <ul className="mt-8 space-y-3.5 text-sm font-medium text-foreground/90">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle size={18} className="text-emerald-500 shrink-0" weight="fill" />
                    <span>{vi ? `Tối đa ${product.max_employees} nhân sự` : `Up to ${product.max_employees} employees`}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle size={18} className="text-emerald-500 shrink-0" weight="fill" />
                    <span>{vi ? `Tối đa ${product.max_attendance_devices} Máy chấm công (MCC)` : `Up to ${product.max_attendance_devices} MCC devices`}</span>
                  </li>
                  {product.max_faceid_devices > 0 && (
                    <li className="flex items-center gap-2.5">
                      <CheckCircle size={18} className="text-emerald-500 shrink-0" weight="fill" />
                      <span>{vi ? `Tối đa ${product.max_faceid_devices} Thiết bị FaceID` : `Up to ${product.max_faceid_devices} FaceID devices`}</span>
                    </li>
                  )}
                  {product.enabled_modules.map((module) => (
                    <li key={module} className="flex items-center gap-2.5">
                      <CheckCircle size={18} className="text-emerald-500 shrink-0" weight="fill" />
                      <span>{getModuleLabel(module, vi)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/portal?plan=${code}&billing=${billing}`}
                className={`mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all ${
                  professional
                    ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-hover hover:shadow-xl'
                    : 'border border-border bg-card text-foreground hover:bg-card-hover hover:border-primary/30'
                }`}
              >
                <span>{vi ? 'Chọn gói này' : 'Choose Plan'}</span>
                <ArrowRight size={16} weight="bold" />
              </Link>
            </motion.article>
          );
        })}

        {/* Enterprise Plan */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-between rounded-3xl border border-border/80 bg-card/60 p-8 shadow-sm"
        >
          <div>
            <h3 className="text-xl font-extrabold text-foreground">Enterprise</h3>
            <div className="mt-4">
              <span className="text-3xl font-black text-foreground">{vi ? 'Tùy chỉnh' : 'Custom'}</span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              {vi
                ? 'Dành cho tập đoàn, dự án quy mô lớn hoặc yêu cầu khảo sát hạ tầng thiết bị riêng.'
                : 'For large enterprises, custom deployments, or specific infrastructure needs.'}
            </p>
          </div>

          <Link
            href={`${vi ? '' : '/en'}/contact?type=enterprise`}
            className="mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card text-sm font-bold text-foreground hover:bg-card-hover hover:border-primary/30 transition-all"
          >
            <span>{vi ? 'Liên hệ Enterprise' : 'Contact Enterprise'}</span>
            <ArrowRight size={16} weight="bold" />
          </Link>
        </motion.article>
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        {catalogLive
          ? (vi ? 'Giá và giới hạn được tải trực tiếp từ Supabase.' : 'Pricing and limits loaded directly from Supabase.')
          : (vi ? 'Hiển thị danh mục giá đã xác minh gần nhất.' : 'Showing latest verified catalog.')}
      </p>
    </div>
  );
}
