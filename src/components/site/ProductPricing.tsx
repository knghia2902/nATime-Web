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
  enabled_modules: string[];
};

const verifiedCatalog: Product[] = [
  { plan_code: 'standard', billing_period: 'monthly', amount_vnd: 490000, max_employees: 50, max_devices: 2, enabled_modules: ['Attendance'] },
  { plan_code: 'standard', billing_period: 'yearly', amount_vnd: 4704000, max_employees: 50, max_devices: 2, enabled_modules: ['Attendance'] },
  { plan_code: 'professional', billing_period: 'monthly', amount_vnd: 1490000, max_employees: 500, max_devices: 10, enabled_modules: ['Attendance', 'Access', 'Weighbridge', 'Assets'] },
  { plan_code: 'professional', billing_period: 'yearly', amount_vnd: 14304000, max_employees: 500, max_devices: 10, enabled_modules: ['Attendance', 'Access', 'Weighbridge', 'Assets'] },
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
    default: return module;
  }
}

export default function ProductPricing({ locale }: { locale: 'vi' | 'en' }) {
  const vi = locale === 'vi';
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');
  const [products, setProducts] = useState<Product[]>(verifiedCatalog);
  const [catalogLive, setCatalogLive] = useState(false);

  // --- Add-on States ---
  const [standardAddons, setStandardAddons] = useState({ employees: 0, devices: 0 });
  const [proAddons, setProAddons] = useState({ lanes: 0, devices: 0, employees: 0 });
  const [enterpriseAddons, setEnterpriseAddons] = useState({ lanes: 0, devices: 0 });

  useEffect(() => {
    if (!supabase) return;
    void supabase.from('license_products').select('plan_code,billing_period,amount_vnd,max_employees,max_devices,enabled_modules').eq('is_active', true).then(({ data, error }) => {
      if (!error && data?.length) {
        const mergedProducts = data.map((dbProd) => {
          const localProd = verifiedCatalog.find((lp) => lp.plan_code === dbProd.plan_code && lp.billing_period === dbProd.billing_period);
          return {
            ...dbProd,
            enabled_modules: localProd ? localProd.enabled_modules : dbProd.enabled_modules
          };
        });
        setProducts(mergedProducts as Product[]);
        setCatalogLive(true);
      }
    });
  }, []);

  const handleIncrement = (plan: 'standard' | 'pro' | 'enterprise', type: 'employees' | 'devices' | 'lanes') => {
    if (plan === 'standard') {
      setStandardAddons(prev => ({ ...prev, [type]: prev[type as 'employees' | 'devices'] + 1 }));
    } else if (plan === 'pro') {
      setProAddons(prev => ({ ...prev, [type]: prev[type as 'lanes' | 'devices' | 'employees'] + 1 }));
    } else {
      setEnterpriseAddons(prev => ({ ...prev, [type]: prev[type as 'lanes' | 'devices'] + 1 }));
    }
  };

  const handleDecrement = (plan: 'standard' | 'pro' | 'enterprise', type: 'employees' | 'devices' | 'lanes') => {
    if (plan === 'standard') {
      setStandardAddons(prev => ({ ...prev, [type]: Math.max(0, prev[type as 'employees' | 'devices'] - 1) }));
    } else if (plan === 'pro') {
      setProAddons(prev => ({ ...prev, [type]: Math.max(0, prev[type as 'lanes' | 'devices' | 'employees'] - 1) }));
    } else {
      setEnterpriseAddons(prev => ({ ...prev, [type]: Math.max(0, prev[type as 'lanes' | 'devices'] - 1) }));
    }
  };

  // --- Price Calculations ---
  const calculateTotal = (code: 'standard' | 'professional' | 'enterprise') => {
    const isYearly = billing === 'yearly';
    
    if (code === 'standard') {
      const baseProduct = products.find(p => p.plan_code === 'standard' && p.billing_period === billing) ?? verifiedCatalog[0];
      const employeesCost = standardAddons.employees * (isYearly ? 500000 : 50000);
      const devicesCost = standardAddons.devices * (isYearly ? 1000000 : 100000);
      return baseProduct.amount_vnd + employeesCost + devicesCost;
    }
    
    if (code === 'professional') {
      const baseProduct = products.find(p => p.plan_code === 'professional' && p.billing_period === billing) ?? verifiedCatalog[2];
      const lanesCost = proAddons.lanes * (isYearly ? 4000000 : 400000);
      const devicesCost = proAddons.devices * (isYearly ? 1000000 : 100000);
      const employeesCost = proAddons.employees * (isYearly ? 2000000 : 200000);
      return baseProduct.amount_vnd + lanesCost + devicesCost + employeesCost;
    }
    
    // Enterprise (Mua đứt)
    const baseEnterprise = 90000000;
    const lanesCost = enterpriseAddons.lanes * 8000000;
    const devicesCost = enterpriseAddons.devices * 2000000;
    return baseEnterprise + lanesCost + devicesCost;
  };

  // Hàm tính đơn giá chia trung bình mỗi tháng để hiển thị lớn giống natime.vn
  const getDisplayMonthlyPrice = (code: 'standard' | 'professional') => {
    const total = calculateTotal(code);
    if (billing === 'yearly') {
      return Math.round(total / 12);
    }
    return total;
  };

  // SVG Icons
  const checkIcon = (
    <svg className="h-5 w-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  const crossIcon = (
    <svg className="h-5 w-5 shrink-0 text-slate-300 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="space-y-20">
      
      {/* 1. Nút gạt chọn Tháng/Năm Premium */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-sm font-semibold transition-colors duration-200 ${billing === 'monthly' ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
          {vi ? 'Theo tháng' : 'Monthly'}
        </span>
        <button
          onClick={() => setBilling(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
          className="relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 dark:bg-slate-800 transition-colors duration-300 ease-in-out focus:outline-none"
          role="switch"
          aria-checked={billing === 'yearly'}
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-blue-700 shadow-md ring-0 transition duration-300 ease-in-out ${billing === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`}
          />
        </button>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold transition-colors duration-200 ${billing === 'yearly' ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
            {vi ? 'Theo năm' : 'Yearly'}
          </span>
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            {vi ? 'Tiết kiệm 20%' : 'Save 20%'}
          </span>
        </div>
      </div>

      {/* 2. 3 Pricing Cards lấy layout từ natime.vn */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        
        {/* --- Card Standard --- */}
        <div className="relative flex flex-col justify-between rounded-2xl bg-white p-8 border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-zinc-900 dark:border-zinc-800">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Standard</h3>
            </div>
            <p className="text-sm text-slate-500 mb-6 min-h-[40px]">
              {vi ? 'Cài đặt tại chỗ (Self-Host). Giải pháp cơ bản cho văn phòng, doanh nghiệp nhỏ và startups.' : 'Self-Host installation. Basic solution for offices, small businesses, and startups.'}
            </p>
            
            <div className="mb-6 flex flex-col justify-end min-h-[70px]">
              <div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white transition-all duration-300">
                    {formatVnd(getDisplayMonthlyPrice('standard'))}
                  </span>
                  <span className="ml-2 text-sm text-slate-500">/ {vi ? 'tháng' : 'month'}</span>
                </div>
                {billing === 'yearly' && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                    {vi ? `Thanh toán hàng năm: ${formatVnd(calculateTotal('standard'))} / năm` : `Billed annually: ${formatVnd(calculateTotal('standard'))} / yr`}
                  </p>
                )}
              </div>
            </div>
            <div className="h-px bg-slate-100 dark:bg-zinc-800 my-6" />
            
            <ul className="space-y-4 mb-8 text-sm">
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">
                  {vi ? `Lên tới 50 nhân viên (+ ${standardAddons.employees * 50} thêm)` : `Up to 50 employees (+ ${standardAddons.employees * 50} added)`}
                </span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">
                  {vi ? `Hỗ trợ tối đa 2 thiết bị (+ ${standardAddons.devices} thêm)` : `Support up to 2 devices (+ ${standardAddons.devices} added)`}
                </span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">{vi ? 'Triển khai Self-Host tại chỗ' : 'Deploy On-Premise / Self-Host'}</span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">{vi ? 'Bộ cài đặt tự động (.EXE Setup)' : 'Automated (.EXE Setup) installer'}</span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">{vi ? 'Xác thực bản quyền: Thuê bao năm' : 'License validation: Annual sub'}</span>
              </li>
              <li className="flex items-start gap-3">
                {crossIcon}
                <span className="text-slate-400 line-through dark:text-zinc-600">{vi ? 'Kiểm soát cổng ra vào' : 'Gate Access Control'}</span>
              </li>
              <li className="flex items-start gap-3">
                {crossIcon}
                <span className="text-slate-400 line-through dark:text-zinc-600">{vi ? 'Quản lý nhà thầu & khách' : 'Contractors & Visitors'}</span>
              </li>
            </ul>

            {/* Interactive Add-on section */}
            <div className="mt-6 border-t border-slate-100 dark:border-zinc-800 pt-4 space-y-3 bg-slate-50 dark:bg-zinc-900/50 p-4 rounded-xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{vi ? 'Tùy chọn cấu hình mua thêm' : 'Add-on Options'}</p>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-zinc-400">{vi ? 'Thêm 50 nhân sự (+500k/năm)' : 'Add 50 employees (+500k/yr)'}</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => handleDecrement('standard', 'employees')} className="h-6 w-6 rounded border bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">-</button>
                  <span className="font-semibold text-slate-900 dark:text-white w-4 text-center">{standardAddons.employees}</span>
                  <button type="button" onClick={() => handleIncrement('standard', 'employees')} className="h-6 w-6 rounded border bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-zinc-400">{vi ? 'Thêm 1 máy chấm công (+1tr/năm)' : 'Add 1 device (+1M/yr)'}</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => handleDecrement('standard', 'devices')} className="h-6 w-6 rounded border bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">-</button>
                  <span className="font-semibold text-slate-900 dark:text-white w-4 text-center">{standardAddons.devices}</span>
                  <button type="button" onClick={() => handleIncrement('standard', 'devices')} className="h-6 w-6 rounded border bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">+</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link href={`/portal?plan=standard&billing=${billing}&empAddon=${standardAddons.employees}&devAddon=${standardAddons.devices}`} className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-semibold border border-blue-700 text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-950/20 transition-all duration-200">
              {vi ? 'Dùng thử miễn phí' : 'Try for free'}
            </Link>
          </div>
        </div>

        {/* --- Card Professional (Best Seller) --- */}
        <div className="relative flex flex-col justify-between rounded-2xl bg-white p-8 border-2 border-blue-600 shadow-xl shadow-blue-500/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-zinc-900 relative">
          <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full bg-blue-700 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
            {vi ? 'Bán chạy nhất' : 'Best Seller'}
          </span>
          
          <div className="mt-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Professional</h3>
            </div>
            <p className="text-sm text-slate-500 mb-6 min-h-[40px]">
              {vi ? 'Cài đặt tại chỗ (Self-Host). Phù hợp nhất cho chuỗi cửa hàng, doanh nghiệp đang tăng trưởng và nhà máy vừa.' : 'Self-Host installation. Ideal for chains, growing businesses, and medium factories.'}
            </p>
            
            <div className="mb-6 flex flex-col justify-end min-h-[70px]">
              <div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white transition-all duration-300">
                    {formatVnd(getDisplayMonthlyPrice('professional'))}
                  </span>
                  <span className="ml-2 text-sm text-slate-500">/ {vi ? 'tháng' : 'month'}</span>
                </div>
                {billing === 'yearly' && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                    {vi ? `Thanh toán hàng năm: ${formatVnd(calculateTotal('professional'))} / năm` : `Billed annually: ${formatVnd(calculateTotal('professional'))} / yr`}
                  </p>
                )}
              </div>
            </div>
            <div className="h-px bg-slate-100 dark:bg-zinc-800 my-6" />
            
            <ul className="space-y-4 mb-8 text-sm">
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">
                  {vi ? `Lên tới 500 nhân viên (+ ${proAddons.employees * 500} thêm)` : `Up to 500 employees (+ ${proAddons.employees * 500} added)`}
                </span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">
                  {vi ? `Mặc định 2 Làn xe / Cổng (+ ${proAddons.lanes} thêm)` : `Default 2 Gates / Lanes (+ ${proAddons.lanes} added)`}
                </span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">
                  {vi ? `Hỗ trợ tối đa 10 thiết bị (+ ${proAddons.devices} thêm)` : `Support up to 10 devices (+ ${proAddons.devices} added)`}
                </span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">{vi ? 'Đầy đủ tính năng chấm công, ca kíp' : 'Full attendance & shifts features'}</span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">{vi ? 'Triển khai Self-Host tại chỗ (.EXE)' : 'On-Premise / Self-Host (.EXE)'}</span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">{vi ? 'Hỗ trợ nâng cao từ xa 24/7' : 'Premium 24/7 remote support'}</span>
              </li>
            </ul>

            {/* Interactive Add-on section */}
            <div className="mt-6 border-t border-slate-100 dark:border-zinc-800 pt-4 space-y-3 bg-blue-50/50 dark:bg-zinc-800/40 p-4 rounded-xl">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">{vi ? 'Tùy chọn cấu hình mua thêm' : 'Add-on Options'}</p>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-zinc-400">{vi ? 'Thêm làn cổng/cân (+4tr/năm)' : 'Add lane/scale (+4M/yr)'}</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => handleDecrement('pro', 'lanes')} className="h-6 w-6 rounded border border-blue-200 bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">-</button>
                  <span className="font-semibold text-slate-900 dark:text-white w-4 text-center">{proAddons.lanes}</span>
                  <button type="button" onClick={() => handleIncrement('pro', 'lanes')} className="h-6 w-6 rounded border border-blue-200 bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-zinc-400">{vi ? 'Thêm 1 thiết bị (+1tr/năm)' : 'Add 1 active device (+1M/yr)'}</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => handleDecrement('pro', 'devices')} className="h-6 w-6 rounded border border-blue-200 bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">-</button>
                  <span className="font-semibold text-slate-900 dark:text-white w-4 text-center">{proAddons.devices}</span>
                  <button type="button" onClick={() => handleIncrement('pro', 'devices')} className="h-6 w-6 rounded border border-blue-200 bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-zinc-400">{vi ? 'Thêm 500 nhân sự (+2tr/năm)' : 'Add 500 employees (+2M/yr)'}</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => handleDecrement('pro', 'employees')} className="h-6 w-6 rounded border border-blue-200 bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">-</button>
                  <span className="font-semibold text-slate-900 dark:text-white w-4 text-center">{proAddons.employees}</span>
                  <button type="button" onClick={() => handleIncrement('pro', 'employees')} className="h-6 w-6 rounded border border-blue-200 bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">+</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link href={`/portal?plan=professional&billing=${billing}&lanes=${proAddons.lanes}&devices=${proAddons.devices}&employees=${proAddons.employees}`} className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-semibold bg-blue-700 text-white hover:bg-blue-800 shadow-lg shadow-blue-700/25 transition-all duration-200 hover:-translate-y-0.5">
              {vi ? 'Bắt đầu ngay' : 'Get started'}
            </Link>
          </div>
        </div>

        {/* --- Card Enterprise --- */}
        <div className="relative flex flex-col justify-between rounded-2xl bg-white p-8 border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-zinc-900 dark:border-zinc-800">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Enterprise</h3>
            </div>
            <p className="text-sm text-slate-500 mb-6 min-h-[40px]">
              {vi ? 'Giải pháp toàn diện thiết kế riêng cho tập đoàn lớn, khu công nghiệp và hạ tầng phức tạp.' : 'Comprehensive custom solution for large groups, industrial parks & complex infrastructures.'}
            </p>
            
            <div className="mb-6 flex flex-col justify-end min-h-[70px]">
              <div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white transition-all duration-300">
                    {formatVnd(calculateTotal('enterprise'))}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {vi ? 'Giấy phép mua đứt vĩnh viễn' : 'One-time perpetual license'}
                </p>
              </div>
            </div>
            <div className="h-px bg-slate-100 dark:bg-zinc-800 my-6" />
            
            <ul className="space-y-4 mb-8 text-sm">
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">{vi ? 'Không giới hạn nhân viên & thiết bị' : 'Unlimited employees & devices'}</span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">
                  {vi ? `Mặc định 5 Làn xe / Cổng (+ ${enterpriseAddons.lanes} thêm)` : `Default 5 Gates / Lanes (+ ${enterpriseAddons.lanes} added)`}
                </span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">{vi ? 'Bản quyền trọn đời (Mua đứt)' : 'Lifetime license (Perpetual)'}</span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">{vi ? 'Triển khai Self-Host tại chỗ chuyên sâu' : 'On-Premise / Self-Host deployment'}</span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">{vi ? 'Kỹ sư nATime lắp đặt & bàn giao tận nơi' : 'nATime engineers deploy onsite'}</span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">{vi ? 'Tích hợp Trạm cân (Weighbridge)' : 'Weighbridge / scale integration'}</span>
              </li>
              <li className="flex items-start gap-3">
                {checkIcon}
                <span className="text-slate-700 dark:text-zinc-300">{vi ? 'Cam kết SLA kỹ thuật khắt khe 24/7' : 'Strict 24/7 SLA technical commitment'}</span>
              </li>
            </ul>

            {/* Interactive Add-on section */}
            <div className="mt-6 border-t border-slate-100 dark:border-zinc-800 pt-4 space-y-3 bg-slate-50 dark:bg-zinc-900/50 p-4 rounded-xl">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{vi ? 'Cấu hình tùy chọn mua thêm' : 'Add-on Options'}</p>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-zinc-400">{vi ? 'Thêm làn cổng/cân (+8tr vĩnh viễn)' : 'Add lane/scale (+8M perpetual)'}</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => handleDecrement('enterprise', 'lanes')} className="h-6 w-6 rounded border bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">-</button>
                  <span className="font-semibold text-slate-900 dark:text-white w-4 text-center">{enterpriseAddons.lanes}</span>
                  <button type="button" onClick={() => handleIncrement('enterprise', 'lanes')} className="h-6 w-6 rounded border bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-zinc-400">{vi ? 'Thêm 1 máy chấm công (+2tr vĩnh viễn)' : 'Add 1 device (+2M perpetual)'}</span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => handleDecrement('enterprise', 'devices')} className="h-6 w-6 rounded border bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">-</button>
                  <span className="font-semibold text-slate-900 dark:text-white w-4 text-center">{enterpriseAddons.devices}</span>
                  <button type="button" onClick={() => handleIncrement('enterprise', 'devices')} className="h-6 w-6 rounded border bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300">+</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link href={`${vi ? '' : '/en'}/contact?type=enterprise&lanes=${enterpriseAddons.lanes}&devices=${enterpriseAddons.devices}`} className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-semibold border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition-all duration-200">
              {vi ? 'Liên hệ tư vấn' : 'Contact for consulting'}
            </Link>
          </div>
        </div>

      </div>

      {/* 3. Bảng so sánh chi tiết tính năng khôi phục từ natime.vn */}
      <div className="pt-12 border-t border-slate-200 dark:border-zinc-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {vi ? 'So sánh chi tiết tính năng' : 'Detailed Feature Comparison'}
          </h2>
          <p className="mt-4 text-slate-500 text-base">
            {vi ? 'Xem xét tất cả các phân hệ và quyền lợi cụ thể của từng phiên bản để đưa ra quyết định tối ưu.' : 'Review all modules and specific benefits of each version to make the optimal decision.'}
          </p>
        </div>

        <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:bg-zinc-950/50 dark:border-zinc-800">
                <th className="w-[34%] py-5 px-6 text-left text-sm font-bold text-slate-900 dark:text-white">
                  {vi ? 'TÍNH NĂNG & PHÂN HỆ' : 'FEATURE & MODULE'}
                </th>
                <th className="w-[22%] py-5 px-6 text-center text-sm font-bold text-slate-600 dark:text-zinc-400">Standard</th>
                <th className="w-[22%] py-5 px-6 text-center text-sm font-bold text-blue-700 dark:text-blue-400 relative bg-blue-50/20">
                  Professional
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 rounded-full bg-blue-100 dark:bg-blue-900/50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-800 dark:text-blue-300">
                    {vi ? 'Phổ biến' : 'Popular'}
                  </span>
                </th>
                <th className="w-[22%] py-5 px-6 text-center text-sm font-bold text-slate-900 dark:text-white">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
              
              {/* Group 1 */}
              <tr className="bg-slate-50/50 dark:bg-zinc-950/20">
                <td colSpan={4} className="py-3 px-6 text-xs font-bold text-slate-500 dark:text-zinc-400 tracking-wider uppercase">
                  {vi ? 'Quy mô & Thiết bị' : 'Scale & Devices'}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Số lượng nhân viên tối đa' : 'Max employees'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">50</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="font-semibold text-slate-900 dark:text-white">500</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Không giới hạn' : 'Unlimited'}</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Số lượng thiết bị tối đa' : 'Max active devices'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">2</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="font-semibold text-slate-900 dark:text-white">10</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Không giới hạn' : 'Unlimited'}</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Số lượng chi nhánh/địa điểm' : 'Max branches/sites'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">1</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="font-semibold text-slate-900 dark:text-white">10</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Không giới hạn' : 'Unlimited'}</span></td>
              </tr>

              {/* Group 2 */}
              <tr className="bg-slate-50/50 dark:bg-zinc-950/20">
                <td colSpan={4} className="py-3 px-6 text-xs font-bold text-slate-500 dark:text-zinc-400 tracking-wider uppercase">
                  {vi ? 'Phân hệ Chấm công & Kiểm soát' : 'Attendance & Access Control'}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Chấm công thông minh (Smart Attendance)' : 'Smart Attendance'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Cơ bản' : 'Basic'}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Nâng cao' : 'Advanced'}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Tùy biến cao' : 'Highly Custom'}</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Kiểm soát cổng ra vào (Gate Access Control)' : 'Gate Access Control'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="inline-flex justify-center p-1">{crossIcon}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="inline-flex justify-center p-1">{checkIcon}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="inline-flex justify-center p-1">{checkIcon}</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Quản lý thiết bị đa điểm' : 'Multi-site Device Management'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Cơ bản' : 'Basic'}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Nâng cao' : 'Advanced'}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Tập trung' : 'Centralized'}</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Quản lý ca kíp phức tạp' : 'Complex shifts & schedules'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="inline-flex justify-center p-1">{crossIcon}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="inline-flex justify-center p-1">{checkIcon}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="inline-flex justify-center p-1">{checkIcon}</span></td>
              </tr>

              {/* Group 3 */}
              <tr className="bg-slate-50/50 dark:bg-zinc-950/20">
                <td colSpan={4} className="py-3 px-6 text-xs font-bold text-slate-500 dark:text-zinc-400 tracking-wider uppercase">
                  {vi ? 'Các phân hệ mở rộng' : 'Expansion Modules'}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Nhà thầu & Khách (Contractors & Visitors)' : 'Contractors & Visitors'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="inline-flex justify-center p-1">{crossIcon}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Cơ bản' : 'Basic'}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Chuyên sâu' : 'Advanced'}</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Tài sản CNTT (IT Asset Management)' : 'IT Asset Management'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="inline-flex justify-center p-1">{crossIcon}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Cơ bản' : 'Basic'}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Nâng cao' : 'Advanced'}</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Phân hệ Cân xe / Trạm cân (Weighbridge)' : 'Weighbridge integration'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="inline-flex justify-center p-1">{crossIcon}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="inline-flex justify-center p-1">{crossIcon}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="inline-flex justify-center p-1">{checkIcon}</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Ứng dụng di động (Mobile App)' : 'Mobile App'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Chỉ xem' : 'View only'}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="font-semibold text-slate-900 dark:text-white">Pro (GPS/Wifi)</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Tùy biến thương hiệu' : 'Custom Brand'}</span></td>
              </tr>

              {/* Group 4 */}
              <tr className="bg-slate-50/50 dark:bg-zinc-950/20">
                <td colSpan={4} className="py-3 px-6 text-xs font-bold text-slate-500 dark:text-zinc-400 tracking-wider uppercase">
                  {vi ? 'Báo cáo & Tích hợp' : 'Reports & Integrations'}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Báo cáo & Phân tích (Reports)' : 'Reports & Analytics'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Cơ bản' : 'Basic'}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Nâng cao' : 'Advanced'}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'BI tự thiết kế' : 'Custom BI'}</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Tích hợp ERP bên thứ 3' : '3rd party ERP Integration'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="inline-flex justify-center p-1">{crossIcon}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="inline-flex justify-center p-1">{crossIcon}</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="inline-flex justify-center p-1">{checkIcon}</span></td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors duration-150">
                <td className="py-4 px-6 text-sm font-medium text-slate-900 dark:text-zinc-200">{vi ? 'Phương thức triển khai' : 'Deployment Method'}</td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">Self-Host</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500 bg-blue-50/10"><span className="font-semibold text-slate-900 dark:text-white">Self-Host</span></td>
                <td className="py-4 px-6 text-center text-sm text-slate-500"><span className="font-semibold text-slate-900 dark:text-white">{vi ? 'Mua đứt vĩnh viễn' : 'Perpetual'}</span></td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
