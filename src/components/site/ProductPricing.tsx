'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
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
    <div>
      <div className="flex justify-center">
        <div className="inline-flex rounded-md border border-border bg-card p-1" role="group" aria-label={vi ? 'Chu kỳ thanh toán' : 'Billing period'}>
          <button type="button" onClick={() => setBilling('monthly')} className={`rounded px-4 py-2 text-sm font-semibold ${billing === 'monthly' ? 'bg-foreground text-background' : 'text-muted'}`}>
            {vi ? 'Hàng tháng' : 'Monthly'}
          </button>
          <button type="button" onClick={() => setBilling('yearly')} className={`rounded px-4 py-2 text-sm font-semibold ${billing === 'yearly' ? 'bg-foreground text-background' : 'text-muted'}`}>
            {vi ? 'Hàng năm' : 'Yearly'}
          </button>
        </div>
      </div>

      <div className={`mt-8 grid gap-5 ${compact ? 'lg:grid-cols-3' : 'lg:grid-cols-3'}`}>
        {plans.map((code) => {
          const product = products.find((item) => item.plan_code === code && item.billing_period === billing)
            ?? verifiedCatalog.find((item) => item.plan_code === code && item.billing_period === billing)!;
          const professional = code === 'professional';

          return (
            <article key={code} className={`flex flex-col rounded-xl border bg-card p-6 ${professional ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
              <p className="text-sm font-semibold text-primary">{professional ? 'Professional' : 'Standard'}</p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground">{formatVnd(product.amount_vnd)}</h3>
              <p className="mt-1 text-sm text-muted">/ {billing === 'monthly' ? (vi ? 'tháng' : 'month') : (vi ? 'năm' : 'year')}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-foreground/80">
                <li>✓ {vi ? `Tối đa ${product.max_employees} nhân sự` : `Up to ${product.max_employees} employees`}</li>
                <li>✓ {vi ? `Tối đa ${product.max_attendance_devices} máy MCC` : `Up to ${product.max_attendance_devices} MCC devices`}</li>
                {product.max_faceid_devices > 0 && (
                  <li>✓ {vi ? `Tối đa ${product.max_faceid_devices} máy FaceID` : `Up to ${product.max_faceid_devices} FaceID devices`}</li>
                )}
                {product.enabled_modules.map((module) => (
                  <li key={module}>✓ {getModuleLabel(module, vi)}</li>
                ))}
              </ul>
              <Link href={`/portal?plan=${code}&billing=${billing}`} className={`mt-7 rounded-md px-4 py-3 text-center text-sm font-semibold ${professional ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-border text-foreground hover:bg-muted'}`}>
                {vi ? 'Chọn gói' : 'Choose plan'}
              </Link>
            </article>
          );
        })}

        <article className="flex flex-col rounded-xl border border-border bg-muted/30 p-6">
          <p className="text-sm font-semibold text-foreground/80">Enterprise</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground">{vi ? 'Liên hệ' : 'Contact us'}</h3>
          <p className="mt-5 flex-1 text-sm leading-6 text-muted">
            {vi ? 'Dành cho nhu cầu triển khai và giới hạn cần được khảo sát riêng.' : 'For deployments and limits that require a separate assessment.'}
          </p>
          <Link href={`${vi ? '' : '/en'}/contact?type=enterprise`} className="mt-7 rounded-md border border-border bg-card px-4 py-3 text-center text-sm font-semibold text-foreground hover:bg-muted">
            {vi ? 'Gửi yêu cầu' : 'Send inquiry'}
          </Link>
        </article>
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        {catalogLive
          ? (vi ? 'Giá và giới hạn được tải từ danh mục sản phẩm nATime.' : 'Pricing and limits loaded from the nATime product catalog.')
          : (vi ? 'Đang hiển thị danh mục giá đã xác minh gần nhất.' : 'Showing the latest verified pricing catalog.')}
      </p>
    </div>
  );
}
