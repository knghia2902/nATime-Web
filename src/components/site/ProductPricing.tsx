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

export default function ProductPricing({ locale }: { locale: 'vi' | 'en' }) {
  const vi = locale === 'vi';
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');
  const [products, setProducts] = useState<Product[]>(verifiedCatalog);

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
        }
      });
  }, []);

  const standardProduct = useMemo(() => {
    return products.find((item) => item.plan_code === 'standard' && item.billing_period === billing)
      ?? verifiedCatalog.find((item) => item.plan_code === 'standard' && item.billing_period === billing)!;
  }, [products, billing]);

  const proProduct = useMemo(() => {
    return products.find((item) => item.plan_code === 'professional' && item.billing_period === billing)
      ?? verifiedCatalog.find((item) => item.plan_code === 'professional' && item.billing_period === billing)!;
  }, [products, billing]);

  return (
    <div className="w-full">
      {/* Billing Switcher - Industrial Style */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex border hairline bg-white p-1">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`px-5 py-2 font-mono text-[13px] font-semibold transition-colors cursor-pointer ${
              billing === 'monthly'
                ? 'bg-ink text-paper'
                : 'text-ink/60 hover:text-ink'
            }`}
          >
            {vi ? 'Thanh toán Tháng' : 'Monthly Billing'}
          </button>
          <button
            type="button"
            onClick={() => setBilling('yearly')}
            className={`px-5 py-2 font-mono text-[13px] font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              billing === 'yearly'
                ? 'bg-ink text-paper'
                : 'text-ink/60 hover:text-ink'
            }`}
          >
            <span>{vi ? 'Thanh toán Năm' : 'Yearly Billing'}</span>
            <span className="text-[11px] px-1.5 py-0.5 bg-amber text-ink font-bold">
              {vi ? 'Tiết kiệm 20%' : 'Save 20%'}
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards - 3 Columns Bento Grid (Matching pricing.html) */}
      <section className="grid md:grid-cols-3 gap-px bg-ink/10">
        {/* Standard Plan */}
        <div className="bg-paper p-8 flex flex-col">
          <p className="font-mono text-[11px] text-teal mb-2">STANDARD</p>
          <h3 className="font-display font-bold text-[22px] text-ink mb-1">Standard</h3>
          <p className="font-body text-[13px] text-ink/60 mb-6">
            {vi ? 'Cho doanh nghiệp vừa và nhỏ, quản lý chấm công tự động.' : 'For small & medium teams managing attendance.'}
          </p>
          <p className="font-mono text-[34px] font-semibold text-ink mb-1">
            {formatVnd(standardProduct.amount_vnd)}
            <span className="text-[14px] text-ink/50">/{billing === 'monthly' ? (vi ? 'tháng' : 'mo') : (vi ? 'năm' : 'yr')}</span>
          </p>
          <p className="font-body text-[12px] text-ink/50 mb-8">
            {vi
              ? `Tối đa ${standardProduct.max_employees} nhân sự · ${standardProduct.max_attendance_devices} Máy chấm công`
              : `Up to ${standardProduct.max_employees} employees · ${standardProduct.max_attendance_devices} devices`}
          </p>
          <ul className="font-body text-[13px] text-ink/70 space-y-2.5 mb-8 flex-1">
            <li className="flex gap-2"><span className="text-teal">✓</span>{vi ? 'Module Chấm công & Ca kíp' : 'Attendance & Shift module'}</li>
            <li className="flex gap-2"><span className="text-teal">✓</span>{vi ? 'Báo cáo tổng hợp tự động' : 'Auto summary reports'}</li>
            <li className="flex gap-2"><span className="text-teal">✓</span>{vi ? 'Hỗ trợ kỹ thuật 8/5' : '8/5 Technical support'}</li>
            <li className="flex gap-2"><span className="text-teal">✓</span>{vi ? 'Cài đặt Windows self-host' : 'Self-hosted Windows setup'}</li>
          </ul>
          <Link
            href={`/portal?plan=standard&billing=${billing}`}
            className="text-center border hairline font-body text-[14px] font-semibold px-6 py-3 hover:bg-white transition-colors text-ink"
          >
            {vi ? 'Chọn gói Standard' : 'Choose Standard'}
          </Link>
        </div>

        {/* Professional Plan - Featured (Matching pricing.html bg-graphite border-2 border-amber) */}
        <div className="bg-graphite p-8 flex flex-col border-2 border-amber -my-px md:-my-0">
          <p className="font-mono text-[11px] text-amber mb-2">{vi ? 'PROFESSIONAL · PHỔ BIẾN NHẤT' : 'PROFESSIONAL · MOST POPULAR'}</p>
          <h3 className="font-display font-bold text-[22px] text-paper mb-1">Professional</h3>
          <p className="font-body text-[13px] text-paper/60 mb-6">
            {vi ? 'Cho doanh nghiệp quy mô lớn: chấm công, kiểm soát ra vào & FaceID.' : 'For large teams: attendance, access control & FaceID.'}
          </p>
          <p className="font-mono text-[34px] font-semibold text-paper mb-1">
            {formatVnd(proProduct.amount_vnd)}
            <span className="text-[14px] text-paper/50">/{billing === 'monthly' ? (vi ? 'tháng' : 'mo') : (vi ? 'năm' : 'yr')}</span>
          </p>
          <p className="font-body text-[12px] text-paper/50 mb-8">
            {vi
              ? `Tối đa ${proProduct.max_employees} nhân sự · ${proProduct.max_attendance_devices} MCC · ${proProduct.max_faceid_devices} FaceID`
              : `Up to ${proProduct.max_employees} employees · ${proProduct.max_attendance_devices} MCC · ${proProduct.max_faceid_devices} FaceID`}
          </p>
          <ul className="font-body text-[13px] text-paper/80 space-y-2.5 mb-8 flex-1">
            <li className="flex gap-2"><span className="text-amber">✓</span>{vi ? 'Toàn bộ module: Chấm công & Access Control' : 'All modules: Attendance & Access'}</li>
            <li className="flex gap-2"><span className="text-amber">✓</span>{vi ? 'Tích hợp máy chấm công FaceID' : 'FaceID device integration'}</li>
            <li className="flex gap-2"><span className="text-amber">✓</span>{vi ? 'API kết nối phần mềm lương / ERP' : 'Payroll / ERP API integration'}</li>
            <li className="flex gap-2"><span className="text-amber">✓</span>{vi ? 'Hỗ trợ kỹ thuật 24/7' : '24/7 Technical support'}</li>
          </ul>
          <Link
            href={`/portal?plan=professional&billing=${billing}`}
            className="text-center bg-amber text-ink font-body text-[14px] font-semibold px-6 py-3 hover:bg-amber/90 transition-colors"
          >
            {vi ? 'Chọn gói Professional' : 'Choose Professional'}
          </Link>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-paper p-8 flex flex-col">
          <p className="font-mono text-[11px] text-teal mb-2">{vi ? 'ENTERPRISE' : 'ENTERPRISE'}</p>
          <h3 className="font-display font-bold text-[22px] text-ink mb-1">Enterprise</h3>
          <p className="font-body text-[13px] text-ink/60 mb-6">
            {vi ? 'Cho tập đoàn nhiều nhà máy, hạ tầng & triển khai riêng.' : 'For multi-branch enterprise requiring custom deployment.'}
          </p>
          <p className="font-mono text-[24px] font-semibold text-ink mb-1">{vi ? 'Liên hệ báo giá' : 'Custom Quote'}</p>
          <p className="font-body text-[12px] text-ink/50 mb-8">{vi ? 'Không giới hạn nhân sự & thiết bị' : 'Unlimited employees & devices'}</p>
          <ul className="font-body text-[13px] text-ink/70 space-y-2.5 mb-8 flex-1">
            <li className="flex gap-2"><span className="text-teal">✓</span>{vi ? 'Triển khai On-premise hoặc Private Cloud' : 'On-premise or Private Cloud'}</li>
            <li className="flex gap-2"><span className="text-teal">✓</span>{vi ? 'Quản lý tập trung đa chi nhánh' : 'Centralized multi-branch system'}</li>
            <li className="flex gap-2"><span className="text-teal">✓</span>{vi ? 'Đội ngũ kỹ thuật khảo sát & hỗ trợ riêng' : 'Dedicated support & survey team'}</li>
            <li className="flex gap-2"><span className="text-teal">✓</span>{vi ? 'Cam kết SLA dịch vụ cao nhất' : 'Highest SLA guarantee'}</li>
          </ul>
          <Link
            href="/contact?type=enterprise"
            className="text-center border hairline font-body text-[14px] font-semibold px-6 py-3 hover:bg-white transition-colors text-ink"
          >
            {vi ? 'Liên hệ Enterprise' : 'Contact Enterprise'}
          </Link>
        </div>
      </section>

      {/* Comparison Table (Matching pricing.html) */}
      <section className="max-w-6xl mx-auto px-6 pb-20 border-t hairline pt-14 mt-14">
        <h2 className="font-display font-bold text-[24px] text-ink mb-8">{vi ? 'So sánh tính năng theo từng gói' : 'Feature Comparison'}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-[13px]">
            <thead>
              <tr className="border-b-2 border-ink/20">
                <th className="py-3 pr-4 text-ink/50 font-medium">Tính năng / Module</th>
                <th className="py-3 px-4 text-ink/50 font-medium text-center">Standard</th>
                <th className="py-3 px-4 text-ink/50 font-medium text-center">Professional</th>
                <th className="py-3 px-4 text-ink/50 font-medium text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[13px]">
              <tr className="border-b hairline">
                <td className="py-3 pr-4 font-body">Giới hạn nhân sự</td>
                <td className="text-center text-teal">50 nhân sự</td>
                <td className="text-center text-teal">1.000 nhân sự</td>
                <td className="text-center text-teal">Không giới hạn</td>
              </tr>
              <tr className="border-b hairline">
                <td className="py-3 pr-4 font-body">Máy chấm công (MCC)</td>
                <td className="text-center text-teal">2 thiết bị</td>
                <td className="text-center text-teal">10 thiết bị</td>
                <td className="text-center text-teal">Không giới hạn</td>
              </tr>
              <tr className="border-b hairline">
                <td className="py-3 pr-4 font-body">Thiết bị FaceID</td>
                <td className="text-center text-ink/30">—</td>
                <td className="text-center text-teal">16 thiết bị</td>
                <td className="text-center text-teal">Không giới hạn</td>
              </tr>
              <tr className="border-b hairline">
                <td className="py-3 pr-4 font-body">Module Chấm công & Ca kíp</td>
                <td className="text-center text-teal">✓</td>
                <td className="text-center text-teal">✓</td>
                <td className="text-center text-teal">✓</td>
              </tr>
              <tr className="border-b hairline">
                <td className="py-3 pr-4 font-body">Module Kiểm soát ra vào (Access)</td>
                <td className="text-center text-ink/30">—</td>
                <td className="text-center text-teal">✓</td>
                <td className="text-center text-teal">✓</td>
              </tr>
              <tr className="border-b hairline">
                <td className="py-3 pr-4 font-body">API tích hợp phần mềm lương / ERP</td>
                <td className="text-center text-ink/30">—</td>
                <td className="text-center text-teal">✓</td>
                <td className="text-center text-teal">✓</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-body">Hỗ trợ kỹ thuật</td>
                <td className="text-center text-teal">8/5</td>
                <td className="text-center text-teal">24/7</td>
                <td className="text-center text-teal">Đội ngũ riêng SLA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
