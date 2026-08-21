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
  { plan_code: 'professional', billing_period: 'monthly', amount_vnd: 1990000, max_employees: 1000, max_devices: 20, max_attendance_devices: 15, max_faceid_devices: 20, enabled_modules: ['Attendance', 'Access', 'Weighbridge', 'Assets'] },
  { plan_code: 'professional', billing_period: 'yearly', amount_vnd: 19104000, max_employees: 1000, max_devices: 20, max_attendance_devices: 15, max_faceid_devices: 20, enabled_modules: ['Attendance', 'Access', 'Weighbridge', 'Assets'] },
];

function formatVnd(value: number) {
  return new Intl.NumberFormat('vi-VN').format(value);
}

export default function ProductPricing({ locale }: { locale: 'vi' | 'en' }) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [products, setProducts] = useState<Product[]>(verifiedCatalog);
  const vi = locale === 'vi';

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
              amount_vnd: verifiedProduct ? verifiedProduct.amount_vnd : dbProduct.amount_vnd,
              max_employees: verifiedProduct ? verifiedProduct.max_employees : dbProduct.max_employees,
              max_devices: verifiedProduct ? verifiedProduct.max_devices : dbProduct.max_devices,
              max_attendance_devices: verifiedProduct ? verifiedProduct.max_attendance_devices : dbProduct.max_attendance_devices,
              max_faceid_devices: verifiedProduct ? verifiedProduct.max_faceid_devices : dbProduct.max_faceid_devices,
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
    <div className="w-full font-sans">
      {/* ── 1. BILLING PERIOD TAB SWITCHER (MONTHLY / YEARLY) ── */}
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full glass-panel border border-white/12 bg-white/[0.04]">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={`px-6 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              billing === 'monthly'
                ? 'bg-white text-[#101c2e] shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {vi ? 'Theo tháng' : 'Monthly'}
          </button>
          <button
            type="button"
            onClick={() => setBilling('yearly')}
            className={`px-6 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              billing === 'yearly'
                ? 'bg-white text-[#101c2e] shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {vi ? 'Theo năm' : 'Yearly'}
          </button>
        </div>
        
        {/* Savings status indicator underneath */}
        <div className="mt-3 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-xs font-semibold px-3.5 py-0.5 rounded-full shadow-xs">
            <span>✨</span>
            <span>{vi ? 'Tiết kiệm 20% khi thanh toán theo năm' : 'Save 20% with annual billing'}</span>
          </span>
        </div>
      </div>

      {/* ── 2. THREE ON-PREMISE PLAN CARDS ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        {/* STANDARD */}
        <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="badge-pill text-[11px]">STANDARD</span>
              <span className="text-[11px] font-semibold text-sky-400 bg-sky-500/10 border border-sky-400/20 px-2.5 py-0.5 rounded-full">
                On-Premise
              </span>
            </div>
            <h3 className="font-sans font-bold text-[22px] text-white mb-1">
              {vi ? 'Module Chấm công' : 'Attendance Module'}
            </h3>
            <p className="font-sans text-[13px] text-white/60 mb-6">
              {vi ? 'Cho nhà máy vừa và nhỏ, chấm công tự động 1 điểm kiểm soát.' : 'For small factories starting with 1 control point.'}
            </p>
            
            <p className="font-sans text-[36px] font-extrabold text-white mb-1">
              {formatVnd(standardProduct.amount_vnd)}
              <span className="text-[14px] text-white/50 font-medium ml-1">
                {billing === 'monthly' ? (vi ? 'đ/tháng' : 'VND/mo') : (vi ? 'đ/năm' : 'VND/yr')}
              </span>
            </p>
            <p className="font-sans text-[12.5px] text-white/50 mb-8">
              {billing === 'monthly'
                ? (vi ? 'Trả trước theo tháng · Cài đặt On-Premise' : 'Billed monthly · On-Premise')
                : (vi ? 'Đã giảm 20% · Tương đương 392.000đ/tháng' : '20% off · Equivalent to 392k VND/mo')}
            </p>

            <ul className="font-sans text-[13px] text-white/75 space-y-3 mb-8">
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Quy mô: <strong>Tối đa 50 nhân sự</strong></span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Máy chấm công: <strong>2 thiết bị</strong></span>
              </li>
              <li className="flex gap-2.5 text-white/40">
                <span className="font-bold">—</span>
                <span>FaceID / Kiểm soát cửa: <strong>Không hỗ trợ</strong></span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Module Chấm công & Phân ca kíp</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Xuất báo cáo bảng công Excel</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Cài đặt On-Premise</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Hỗ trợ kỹ thuật 24/7</span>
              </li>
            </ul>
          </div>
          <Link
            href={`/portal?plan=standard&billing=${billing}`}
            className="btn-pill-glass w-full text-center py-2.5 font-semibold"
          >
            {vi ? 'Chọn gói Standard' : 'Choose Standard'}
          </Link>
        </div>

        {/* PROFESSIONAL (FEATURED) */}
        <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between relative border-2 border-white/35 shadow-2xl md:-my-3 bg-[rgba(24,44,76,0.75)] backdrop-blur-2xl">
          <span className="absolute top-0 -translate-y-1/2 left-8 bg-white text-[#101c2e] font-sans text-[11px] font-bold px-4 py-1 rounded-full shadow-lg">
            {vi ? 'PHỔ BIẾN NHẤT' : 'MOST POPULAR'}
          </span>
          <div>
            <div className="flex items-center justify-between mb-3 mt-2">
              <span className="badge-pill text-[11px]">PROFESSIONAL</span>
              <span className="text-[11px] font-semibold text-sky-400 bg-sky-500/10 border border-sky-400/20 px-2.5 py-0.5 rounded-full">
                On-Premise
              </span>
            </div>
            <h3 className="font-sans font-bold text-[22px] text-white mb-1">
              {vi ? 'Cả bốn module' : 'All 4 Modules'}
            </h3>
            <p className="font-sans text-[13px] text-white/65 mb-6">
              {vi ? 'Cho nhà máy vận hành đầy đủ: nhân sự, cửa ra vào, trạm cân & tài sản.' : 'For factories with complete operation: people, doors, scale & assets.'}
            </p>

            <p className="font-sans text-[36px] font-extrabold text-white mb-1">
              {formatVnd(proProduct.amount_vnd)}
              <span className="text-[14px] text-white/50 font-medium ml-1">
                {billing === 'monthly' ? (vi ? 'đ/tháng' : 'VND/mo') : (vi ? 'đ/năm' : 'VND/yr')}
              </span>
            </p>
            <p className="font-sans text-[12.5px] text-white/60 mb-8">
              {billing === 'monthly'
                ? (vi ? 'Trả trước theo tháng · Cài đặt On-Premise' : 'Billed monthly · On-Premise')
                : (vi ? 'Đã giảm 20% · Tương đương 1.592.000đ/tháng' : '20% off · Equivalent to 1.592M VND/mo')}
            </p>

            <ul className="font-sans text-[13px] text-white/85 space-y-3 mb-8">
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Quy mô: <strong>Tối đa 1.000 nhân sự</strong></span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Máy chấm công: <strong>15 thiết bị</strong></span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>FaceID / Kiểm soát cửa: <strong>20 thiết bị</strong></span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Toàn bộ 4 module</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>API mở kết nối phần mềm lương & ERP</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Cài đặt On-Premise</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Hỗ trợ kỹ thuật 24/7</span>
              </li>
            </ul>
          </div>
          <Link
            href={`/portal?plan=professional&billing=${billing}`}
            className="btn-pill-primary w-full text-center shadow-[0_4px_24px_rgba(255,255,255,0.25)] py-2.5 font-bold"
          >
            {vi ? 'Chọn gói Professional' : 'Choose Professional'}
          </Link>
        </div>

        {/* ENTERPRISE */}
        <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="badge-pill text-[11px]">ENTERPRISE</span>
              <span className="text-[11px] font-semibold text-sky-400 bg-sky-500/10 border border-sky-400/20 px-2.5 py-0.5 rounded-full">
                On-Premise
              </span>
            </div>
            <h3 className="font-sans font-bold text-[22px] text-white mb-1">
              {vi ? 'Đa Chi nhánh' : 'Multi-branch'}
            </h3>
            <p className="font-sans text-[13px] text-white/60 mb-6">
              {vi ? 'Cho tập đoàn nhiều nhà máy, cần máy chủ nội bộ tập trung.' : 'For multi-factory enterprises needing dedicated on-premise servers.'}
            </p>
            <p className="font-sans text-[28px] font-extrabold text-white mb-1">
              {vi ? 'Liên hệ báo giá' : 'Contact for Quote'}
            </p>
            <p className="font-sans text-[12.5px] text-white/50 mb-8">
              {vi ? 'Không giới hạn nhân sự & thiết bị' : 'Unlimited employees & devices'}
            </p>
            <ul className="font-sans text-[13px] text-white/75 space-y-3 mb-8">
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Quy mô: <strong>Không giới hạn nhân sự</strong></span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Máy chấm công: <strong>Không giới hạn</strong></span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>FaceID / Kiểm soát cửa: <strong>Không giới hạn</strong></span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Toàn bộ 4 module & Tính năng tùy biến</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Quản lý tập trung nhiều chi nhánh</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Cài đặt On-Premise / Server Đa điểm</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Hỗ trợ kỹ thuật 24/7 chuyên trách</span>
              </li>
            </ul>
          </div>
          <Link
            href="/contact?type=enterprise"
            className="btn-pill-glass w-full text-center py-2.5"
          >
            {vi ? 'Liên hệ tư vấn' : 'Contact Us'}
          </Link>
        </div>
      </section>

      {/* ── 3. DETAILED LICENSE & DEVICE COMPARISON TABLE ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20 border-t border-white/[0.08] pt-14">
        <h2 className="font-sans font-bold text-[24px] text-white mb-8">
          {vi ? 'So sánh chi tiết License & Thiết bị theo từng gói On-Premise' : 'Detailed License & Device Comparison for On-Premise Packages'}
        </h2>
        <div className="glass-panel rounded-2xl overflow-hidden overflow-x-auto border border-white/12">
          <table className="w-full text-left font-sans text-[13.5px]">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.04]">
                <th className="py-4 px-5 text-white font-semibold">{vi ? 'Tiêu chí & Hạn mức License' : 'Criteria & Limits'}</th>
                <th className="py-4 px-5 text-white font-semibold text-center w-1/5">Standard</th>
                <th className="py-4 px-5 text-white font-semibold text-center w-1/4 bg-white/[0.03]">Professional</th>
                <th className="py-4 px-5 text-white font-semibold text-center w-1/4">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {/* Device & User Limits Group */}
              <tr className="bg-white/[0.02]">
                <td colSpan={4} className="py-2.5 px-5 text-xs font-bold text-sky-400 uppercase tracking-wider">
                  {vi ? '1. Định mức Nhân sự & Thiết bị IoT' : '1. Employee & Device Capacity'}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 text-white">{vi ? 'Số lượng nhân sự tối đa' : 'Max Employees'}</td>
                <td className="text-center text-white/80 font-medium">50</td>
                <td className="text-center text-white font-bold bg-white/[0.03]">1.000</td>
                <td className="text-center text-emerald-400 font-bold">{vi ? 'Không giới hạn' : 'Unlimited'}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 text-white">{vi ? 'Máy chấm công' : 'Attendance Terminals'}</td>
                <td className="text-center text-white/80 font-medium">2</td>
                <td className="text-center text-emerald-400 font-bold bg-white/[0.03]">{vi ? 'Tối đa 15' : 'Up to 15'}</td>
                <td className="text-center text-emerald-400 font-bold">{vi ? 'Không giới hạn' : 'Unlimited'}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 text-white">{vi ? 'Thiết bị FaceID / Kiểm soát cửa' : 'FaceID / Access Devices'}</td>
                <td className="text-center text-white/30">—</td>
                <td className="text-center text-emerald-400 font-bold bg-white/[0.03]">{vi ? 'Tối đa 20' : 'Up to 20'}</td>
                <td className="text-center text-emerald-400 font-bold">{vi ? 'Không giới hạn' : 'Unlimited'}</td>
              </tr>

              {/* Modules Group */}
              <tr className="bg-white/[0.02]">
                <td colSpan={4} className="py-2.5 px-5 text-xs font-bold text-sky-400 uppercase tracking-wider">
                  {vi ? '2. Module Nghiệp vụ & Tính năng' : '2. Modules & Features'}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 text-white">{vi ? 'Chấm công & Ca kíp' : 'Attendance & Shifts'}</td>
                <td className="text-center text-emerald-400 font-bold">✓</td>
                <td className="text-center text-emerald-400 font-bold bg-white/[0.03]">✓</td>
                <td className="text-center text-emerald-400 font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 text-white">{vi ? 'Kiểm soát ra vào 8 làn' : '8-Lane Access Control'}</td>
                <td className="text-center text-white/30">—</td>
                <td className="text-center text-emerald-400 font-bold bg-white/[0.03]">✓</td>
                <td className="text-center text-emerald-400 font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 text-white">{vi ? 'Trạm cân điện tử' : 'Weighbridge'}</td>
                <td className="text-center text-white/30">—</td>
                <td className="text-center text-emerald-400 font-bold bg-white/[0.03]">✓</td>
                <td className="text-center text-emerald-400 font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 text-white">{vi ? 'Quản lý tài sản IoT' : 'IoT Asset Management'}</td>
                <td className="text-center text-white/30">—</td>
                <td className="text-center text-emerald-400 font-bold bg-white/[0.03]">✓</td>
                <td className="text-center text-emerald-400 font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 text-white">{vi ? 'API / Tích hợp phần mềm lương & ERP' : 'API / ERP Integration'}</td>
                <td className="text-center text-white/30">—</td>
                <td className="text-center text-emerald-400 font-bold bg-white/[0.03]">✓</td>
                <td className="text-center text-emerald-400 font-bold">✓</td>
              </tr>

              {/* Infrastructure & Support */}
              <tr className="bg-white/[0.02]">
                <td colSpan={4} className="py-2.5 px-5 text-xs font-bold text-sky-400 uppercase tracking-wider">
                  {vi ? '3. Hạ tầng Triển khai & Hỗ trợ' : '3. Infrastructure & Support'}
                </td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 text-white">{vi ? 'Hình thức triển khai' : 'Deployment Mode'}</td>
                <td className="text-center text-white/80 font-medium">On-Premise</td>
                <td className="text-center text-white font-bold bg-white/[0.03]">On-Premise</td>
                <td className="text-center text-emerald-400 font-bold">{vi ? 'On-Premise / Server Đa điểm' : 'Dedicated On-Premise Server'}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 text-white">{vi ? 'Hỗ trợ kỹ thuật' : 'Technical Support'}</td>
                <td className="text-center text-emerald-400 font-bold">24/7</td>
                <td className="text-center text-emerald-400 font-bold bg-white/[0.03]">24/7</td>
                <td className="text-center text-emerald-400 font-bold">{vi ? '24/7 Chuyên trách' : '24/7 Dedicated'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 4. FAQ SECTION ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24 border-t border-white/[0.08] pt-14">
        <h2 className="font-sans font-bold text-[24px] text-white mb-8">
          {vi ? 'Câu hỏi thường gặp' : 'Frequently Asked Questions'}
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="glass-panel rounded-2xl p-6">
            <p className="font-sans font-semibold text-[15px] text-white mb-2">
              {vi ? 'Có thể đổi gói sau khi đã dùng không?' : 'Can I upgrade my plan later?'}
            </p>
            <p className="font-sans text-[13px] text-white/60 leading-relaxed">
              {vi
                ? 'Có. Bạn có thể nâng cấp lên gói Professional hoặc Enterprise bất kỳ lúc nào, phần chênh lệch được tính theo số ngày còn lại của license.'
                : 'Yes. You can upgrade to Professional or Enterprise at any time, calculated by remaining days.'}
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <p className="font-sans font-semibold text-[15px] text-white mb-2">
              {vi ? 'Thiết bị hiện có của nhà máy có dùng được không?' : 'Are existing factory devices compatible?'}
            </p>
            <p className="font-sans text-[13px] text-white/60 leading-relaxed">
              {vi
                ? 'Phần lớn đầu đọc vân tay, máy chấm công Hikvision, ZKTeco, camera IP và đầu cân phổ biến trên thị trường đều tương thích 100%.'
                : 'Most Hikvision, ZKTeco terminals, IP cameras, and weighbridges on the market are fully compatible.'}
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <p className="font-sans font-semibold text-[15px] text-white mb-2">
              {vi ? 'Dữ liệu được lưu trữ ở đâu?' : 'Where is data stored?'}
            </p>
            <p className="font-sans text-[13px] text-white/60 leading-relaxed">
              {vi
                ? '100% dữ liệu được lưu trữ trên SQL Server nội bộ tại máy chủ On-Premise của quý doanh nghiệp, đảm bảo an toàn tuyệt đối và bảo mật thông tin.'
                : '100% of data is stored in the local SQL Server on the customer\'s On-Premise machine, ensuring complete security.'}
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <p className="font-sans font-semibold text-[15px] text-white mb-2">
              {vi ? 'Thời gian triển khai On-Premise mất bao lâu?' : 'How long does On-Premise setup take?'}
            </p>
            <p className="font-sans text-[13px] text-white/60 leading-relaxed">
              {vi
                ? 'Bộ cài Windows 1-click cho phép hoàn tất thiết lập cơ sở dữ liệu và vận hành chỉ trong 15–30 phút.'
                : 'The 1-click Windows installer completes database setup and operations in 15–30 minutes.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
