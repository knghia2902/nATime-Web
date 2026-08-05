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
  return new Intl.NumberFormat('vi-VN').format(value);
}

export default function ProductPricing({ locale }: { locale: 'vi' | 'en' }) {
  const vi = locale === 'vi';
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
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
    <div className="w-full font-sans">
      {/* 3 PLAN CARDS (Matching pricing.html) */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        {/* STANDARD */}
        <div className="bg-white border border-line rounded-2xl shadow-card p-8 flex flex-col">
          <p className="font-sans text-[12px] font-600 text-indigo mb-2">STANDARD</p>
          <h3 className="font-sans font-700 text-[22px] text-ink mb-1">Module Chấm công</h3>
          <p className="font-sans text-[13px] text-sub mb-6">Cho nhà máy quy mô nhỏ, cần bắt đầu với một điểm kiểm soát.</p>
          <p className="font-sans text-[34px] font-800 text-ink mb-1">
            {formatVnd(standardProduct.amount_vnd)}<span className="text-[14px] text-sub font-500">đ/tháng</span>
          </p>
          <p className="font-sans text-[13px] text-sub mb-8">
            hoặc 4.704.000đ/năm <span className="text-emerald font-600">(tiết kiệm 20%)</span>
          </p>
          <ul className="font-sans text-[13px] text-sub space-y-3 mb-8 flex-1">
            <li className="flex gap-2.5"><span className="text-emerald">✓</span>Module Chấm công</li>
            <li className="flex gap-2.5"><span className="text-emerald">✓</span>Báo cáo cơ bản</li>
            <li className="flex gap-2.5"><span className="text-emerald">✓</span>Hỗ trợ kỹ thuật 24/7</li>
          </ul>
          <Link
            href="/contact"
            className="text-center border border-line font-sans text-[14px] font-600 text-ink px-6 py-3 rounded-lg hover:bg-page transition-colors"
          >
            Bắt đầu dùng thử
          </Link>
        </div>

        {/* PROFESSIONAL (FEATURED) */}
        <div className="bg-ink rounded-2xl shadow-card p-8 flex flex-col relative md:-my-2">
          <span className="absolute top-0 -translate-y-1/2 left-8 bg-indigo text-white font-sans text-[11px] font-700 px-3 py-1 rounded-full">
            PHỔ BIẾN NHẤT
          </span>
          <p className="font-sans text-[12px] font-600 text-indigo-300 mb-2 mt-2">PROFESSIONAL</p>
          <h3 className="font-sans font-700 text-[22px] text-white mb-1">Cả bốn module</h3>
          <p className="font-sans text-[13px] text-white/60 mb-6">Cho nhà máy vận hành đầy đủ: người, cửa, cân và tài sản.</p>
          <p className="font-sans text-[34px] font-800 text-white mb-1">
            {formatVnd(proProduct.amount_vnd)}<span className="text-[14px] text-white/50 font-500">đ/tháng</span>
          </p>
          <p className="font-sans text-[13px] text-white/60 mb-8">
            hoặc 19.104.000đ/năm <span className="text-emerald-400 font-600">(tiết kiệm 20%)</span>
          </p>
          <ul className="font-sans text-[13px] text-white/80 space-y-3 mb-8 flex-1">
            <li className="flex gap-2.5"><span className="text-emerald-400">✓</span>Toàn bộ 4 module, dữ liệu đồng bộ</li>
            <li className="flex gap-2.5"><span className="text-emerald-400">✓</span>Cảnh báo và đối chiếu tự động</li>
            <li className="flex gap-2.5"><span className="text-emerald-400">✓</span>API tích hợp phần mềm lương / ERP</li>
            <li className="flex gap-2.5"><span className="text-emerald-400">✓</span>Hỗ trợ kỹ thuật 24/7</li>
          </ul>
          <Link
            href="/contact"
            className="text-center bg-indigo text-white font-sans text-[14px] font-600 px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Yêu cầu demo
          </Link>
        </div>

        {/* ENTERPRISE */}
        <div className="bg-white border border-line rounded-2xl shadow-card p-8 flex flex-col">
          <p className="font-sans text-[12px] font-600 text-indigo mb-2">ENTERPRISE</p>
          <h3 className="font-sans font-700 text-[22px] text-ink mb-1">Đa chi nhánh</h3>
          <p className="font-sans text-[13px] text-sub mb-6">Cho tập đoàn nhiều nhà máy, cần triển khai và hạ tầng riêng.</p>
          <p className="font-sans text-[24px] font-800 text-ink mb-1">Liên hệ báo giá</p>
          <p className="font-sans text-[13px] text-sub mb-8">không giới hạn nhân sự</p>
          <ul className="font-sans text-[13px] text-sub space-y-3 mb-8 flex-1">
            <li className="flex gap-2.5"><span className="text-emerald">✓</span>Triển khai on-premise hoặc private cloud</li>
            <li className="flex gap-2.5"><span className="text-emerald">✓</span>Quản lý tập trung nhiều chi nhánh</li>
            <li className="flex gap-2.5"><span className="text-emerald">✓</span>Đội ngũ hỗ trợ triển khai riêng</li>
            <li className="flex gap-2.5"><span className="text-emerald">✓</span>Hỗ trợ kỹ thuật 24/7</li>
          </ul>
          <Link
            href="/contact?type=enterprise"
            className="text-center border border-line font-sans text-[14px] font-600 text-ink px-6 py-3 rounded-lg hover:bg-page transition-colors"
          >
            Liên hệ tư vấn
          </Link>
        </div>
      </section>

      {/* COMPARISON TABLE (Matching pricing.html) */}
      <section className="max-w-6xl mx-auto px-6 pb-20 border-t border-line pt-14">
        <h2 className="font-sans font-700 text-[24px] text-ink mb-8">So sánh module theo từng gói</h2>
        <div className="bg-white border border-line rounded-2xl shadow-card overflow-hidden overflow-x-auto">
          <table className="w-full text-left font-sans text-[13px]">
            <thead>
              <tr className="border-b border-line bg-page">
                <th className="py-3.5 px-5 text-sub font-600">Module</th>
                <th className="py-3.5 px-5 text-sub font-600 text-center">Standard</th>
                <th className="py-3.5 px-5 text-sub font-600 text-center">Professional</th>
                <th className="py-3.5 px-5 text-sub font-600 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr><td className="py-3.5 px-5 text-ink">Chấm công</td><td className="text-center text-emerald">✓</td><td className="text-center text-emerald">✓</td><td className="text-center text-emerald">✓</td></tr>
              <tr><td className="py-3.5 px-5 text-ink">Kiểm soát ra vào</td><td className="text-center text-sub/40">—</td><td className="text-center text-emerald">✓</td><td className="text-center text-emerald">✓</td></tr>
              <tr><td className="py-3.5 px-5 text-ink">Trạm cân</td><td className="text-center text-sub/40">—</td><td className="text-center text-emerald">✓</td><td className="text-center text-emerald">✓</td></tr>
              <tr><td className="py-3.5 px-5 text-ink">Quản lý tài sản</td><td className="text-center text-sub/40">—</td><td className="text-center text-emerald">✓</td><td className="text-center text-emerald">✓</td></tr>
              <tr><td className="py-3.5 px-5 text-ink">API / tích hợp ERP</td><td className="text-center text-sub/40">—</td><td className="text-center text-emerald">✓</td><td className="text-center text-emerald">✓</td></tr>
              <tr><td className="py-3.5 px-5 text-ink">Hỗ trợ kỹ thuật 24/7</td><td className="text-center text-emerald">✓</td><td className="text-center text-emerald">✓</td><td className="text-center text-emerald">✓</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ SECTION (Matching pricing.html) */}
      <section className="max-w-6xl mx-auto px-6 pb-24 border-t border-line pt-14">
        <h2 className="font-sans font-700 text-[24px] text-ink mb-8">Câu hỏi thường gặp</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white border border-line rounded-xl p-5">
            <p className="font-sans font-600 text-[14px] text-ink mb-2">Có thể đổi gói sau khi đã dùng không?</p>
            <p className="font-sans text-[13px] text-sub leading-relaxed">Có. Bạn có thể nâng cấp lên gói Professional hoặc Enterprise bất kỳ lúc nào, phần chênh lệch được tính theo số ngày còn lại.</p>
          </div>
          <div className="bg-white border border-line rounded-xl p-5">
            <p className="font-sans font-600 text-[14px] text-ink mb-2">Thiết bị hiện có của nhà máy có dùng được không?</p>
            <p className="font-sans text-[13px] text-sub leading-relaxed">Phần lớn đầu đọc vân tay, camera và đầu cân phổ biến trên thị trường đều tương thích. Đội kỹ thuật sẽ khảo sát trước khi triển khai.</p>
          </div>
          <div className="bg-white border border-line rounded-xl p-5">
            <p className="font-sans font-600 text-[14px] text-ink mb-2">Có hỗ trợ triển khai on-premise không?</p>
            <p className="font-sans text-[13px] text-sub leading-relaxed">Có, ở gói Enterprise. Phù hợp với nhà máy yêu cầu dữ liệu lưu trữ nội bộ vì lý do bảo mật hoặc quy định riêng.</p>
          </div>
          <div className="bg-white border border-line rounded-xl p-5">
            <p className="font-sans font-600 text-[14px] text-ink mb-2">Thời gian triển khai mất bao lâu?</p>
            <p className="font-sans text-[13px] text-sub leading-relaxed">Trung bình 1–2 tuần cho một module, tuỳ số lượng thiết bị và độ phức tạp hạ tầng mạng hiện có.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
