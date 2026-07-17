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

export default function ProductPricing({ locale, compact = false }: { locale: 'vi' | 'en'; compact?: boolean }) {
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

  const plans = useMemo(() => ['standard', 'professional'] as const, []);

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-md border border-slate-300 bg-white p-1" role="group" aria-label={vi ? 'Chu kỳ thanh toán' : 'Billing period'}>
          <button type="button" onClick={() => setBilling('monthly')} className={`rounded px-4 py-2 text-sm font-semibold transition-colors duration-200 ${billing === 'monthly' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}>{vi ? 'Hàng tháng' : 'Monthly'}</button>
          <button type="button" onClick={() => setBilling('yearly')} className={`rounded px-4 py-2 text-sm font-semibold transition-colors duration-200 ${billing === 'yearly' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}>{vi ? 'Hàng năm' : 'Yearly'}</button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className={`mt-8 grid gap-6 ${compact ? 'lg:grid-cols-3' : 'lg:grid-cols-3'}`}>
        
        {/* --- Standard Card --- */}
        <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <p className="text-sm font-semibold text-slate-500">{vi ? 'Standard' : 'Standard'}</p>
          <div className="mt-3">
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">{formatVnd(calculateTotal('standard'))}</h3>
            <p className="mt-1 text-sm text-slate-500">/ {billing === 'monthly' ? (vi ? 'tháng' : 'month') : (vi ? 'năm' : 'year')}</p>
            {billing === 'yearly' && <span className="inline-block mt-2 rounded bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">{vi ? 'Tiết kiệm ~20%' : 'Save ~20%'}</span>}
          </div>

          <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-700">
            <li>✓ {vi ? `Mặc định 50 nhân sự (+ ${standardAddons.employees * 50} mua thêm)` : `Default 50 employees (+ ${standardAddons.employees * 50} added)`}</li>
            <li>✓ {vi ? `Mặc định 2 máy chấm công (+ ${standardAddons.devices} mua thêm)` : `Default 2 active devices (+ ${standardAddons.devices} added)`}</li>
            <li>✓ {vi ? 'Phân hệ Chấm công thông minh' : 'Smart Attendance Module'}</li>
          </ul>

          {/* Add-ons for Standard */}
          <div className="mt-6 border-t border-slate-100 pt-4 space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{vi ? 'Cấu hình tùy chọn mua thêm' : 'Add-on Options'}</p>
            
            {/* Nhân sự */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{vi ? 'Thêm 50 nhân sự (+500k/năm)' : 'Add 50 employees (+500k/yr)'}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleDecrement('standard', 'employees')} className="h-6 w-6 rounded border bg-slate-50 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">-</button>
                <span className="font-semibold text-slate-900 w-4 text-center">{standardAddons.employees}</span>
                <button type="button" onClick={() => handleIncrement('standard', 'employees')} className="h-6 w-6 rounded border bg-slate-50 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">+</button>
              </div>
            </div>

            {/* Thiết bị */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{vi ? 'Thêm 1 máy chấm công (+1tr/năm)' : 'Add 1 device (+1M/yr)'}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleDecrement('standard', 'devices')} className="h-6 w-6 rounded border bg-slate-50 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">-</button>
                <span className="font-semibold text-slate-900 w-4 text-center">{standardAddons.devices}</span>
                <button type="button" onClick={() => handleIncrement('standard', 'devices')} className="h-6 w-6 rounded border bg-slate-50 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">+</button>
              </div>
            </div>
          </div>

          <Link href={`/portal?plan=standard&billing=${billing}&empAddon=${standardAddons.employees}&devAddon=${standardAddons.devices}`} className="mt-8 rounded-md border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-800 transition-colors duration-200 hover:bg-slate-50">{vi ? 'Chọn gói Standard' : 'Choose Standard'}</Link>
        </article>

        {/* --- Professional Card (Featured) --- */}
        <article className="flex flex-col rounded-xl border border-blue-600 bg-white p-6 shadow-md ring-1 ring-blue-600 transition-all duration-300 hover:shadow-lg relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white tracking-wide">{vi ? 'PHỔ BIẾN NHẤT' : 'MOST POPULAR'}</div>
          <p className="text-sm font-semibold text-blue-700 mt-2">{vi ? 'Professional' : 'Professional'}</p>
          <div className="mt-3">
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">{formatVnd(calculateTotal('professional'))}</h3>
            <p className="mt-1 text-sm text-slate-500">/ {billing === 'monthly' ? (vi ? 'tháng' : 'month') : (vi ? 'năm' : 'year')}</p>
            {billing === 'yearly' && <span className="inline-block mt-2 rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">{vi ? 'Tiết kiệm ~20%' : 'Save ~20%'}</span>}
          </div>

          <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-700">
            <li>✓ {vi ? `Mặc định 500 nhân sự (+ ${proAddons.employees * 500} mua thêm)` : `Default 500 employees (+ ${proAddons.employees * 500} added)`}</li>
            <li>✓ {vi ? `Mặc định 2 Làn xe / Cổng (+ ${proAddons.lanes} mua thêm)` : `Default 2 Gates / Lanes (+ ${proAddons.lanes} added)`}</li>
            <li>✓ {vi ? `Mặc định 10 thiết bị kết nối (+ ${proAddons.devices} mua thêm)` : `Default 10 active devices (+ ${proAddons.devices} added)`}</li>
            <li>✓ {vi ? 'Phân hệ Chấm công & Kiểm soát cổng' : 'Attendance & Gate Access Modules'}</li>
            <li>✓ {vi ? 'Phân hệ Trạm cân xe tải & Tài sản' : 'Weighbridge & IT Asset Modules'}</li>
          </ul>

          {/* Add-ons for Professional */}
          <div className="mt-6 border-t border-slate-100 pt-4 space-y-3">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">{vi ? 'Cấu hình tùy chọn mua thêm' : 'Add-on Options'}</p>
            
            {/* Làn xe */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{vi ? 'Thêm làn cổng/cân (+4tr/năm)' : 'Add lane/scale (+4M/yr)'}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleDecrement('pro', 'lanes')} className="h-6 w-6 rounded border border-blue-200 bg-slate-50 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">-</button>
                <span className="font-semibold text-slate-900 w-4 text-center">{proAddons.lanes}</span>
                <button type="button" onClick={() => handleIncrement('pro', 'lanes')} className="h-6 w-6 rounded border border-blue-200 bg-slate-50 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">+</button>
              </div>
            </div>

            {/* Thiết bị */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{vi ? 'Thêm 1 thiết bị kết nối (+1tr/năm)' : 'Add 1 device (+1M/yr)'}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleDecrement('pro', 'devices')} className="h-6 w-6 rounded border border-blue-200 bg-slate-50 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">-</button>
                <span className="font-semibold text-slate-900 w-4 text-center">{proAddons.devices}</span>
                <button type="button" onClick={() => handleIncrement('pro', 'devices')} className="h-6 w-6 rounded border border-blue-200 bg-slate-50 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">+</button>
              </div>
            </div>

            {/* Nhân sự */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{vi ? 'Thêm 500 nhân sự (+2tr/năm)' : 'Add 500 employees (+2M/yr)'}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleDecrement('pro', 'employees')} className="h-6 w-6 rounded border border-blue-200 bg-slate-50 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">-</button>
                <span className="font-semibold text-slate-900 w-4 text-center">{proAddons.employees}</span>
                <button type="button" onClick={() => handleIncrement('pro', 'employees')} className="h-6 w-6 rounded border border-blue-200 bg-slate-50 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">+</button>
              </div>
            </div>
          </div>

          <Link href={`/portal?plan=professional&billing=${billing}&lanes=${proAddons.lanes}&devices=${proAddons.devices}&employees=${proAddons.employees}`} className="mt-8 rounded-md bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-800">{vi ? 'Chọn gói Professional' : 'Choose Professional'}</Link>
        </article>

        {/* --- Enterprise Card --- */}
        <article className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <p className="text-sm font-semibold text-slate-700">{vi ? 'Enterprise (On-Premise)' : 'Enterprise (On-Premise)'}</p>
          <div className="mt-3">
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">{formatVnd(calculateTotal('enterprise'))}</h3>
            <p className="mt-1 text-sm text-slate-500">{vi ? '/ mua đứt một lần' : '/ one-time purchase'}</p>
            <span className="inline-block mt-2 rounded bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">{vi ? 'Sử dụng vĩnh viễn' : 'Perpetual License'}</span>
          </div>

          <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-700">
            <li>✓ {vi ? 'Không giới hạn số lượng nhân viên' : 'Unlimited employees count'}</li>
            <li>✓ {vi ? `Mặc định 5 Làn xe / Cổng (+ ${enterpriseAddons.lanes} mua thêm)` : `Default 5 Lanes / Scales (+ ${enterpriseAddons.lanes} added)`}</li>
            <li>✓ {vi ? `Mặc định 5 máy chấm công (+ ${enterpriseAddons.devices} mua thêm)` : `Default 5 attendance devices (+ ${enterpriseAddons.devices} added)`}</li>
            <li>✓ {vi ? 'Full toàn bộ tính năng và module 100%' : 'Full access to 100% features & modules'}</li>
            <li>✓ {vi ? 'Hỗ trợ triển khai On-Premise server riêng' : 'Deploy on private On-Premise servers'}</li>
          </ul>

          {/* Add-ons for Enterprise */}
          <div className="mt-6 border-t border-slate-200 pt-4 space-y-3">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">{vi ? 'Cấu hình tùy chọn mua thêm' : 'Add-on Options'}</p>
            
            {/* Làn xe */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{vi ? 'Thêm làn cổng/cân (+8tr vĩnh viễn)' : 'Add lane/scale (+8M perpetual)'}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleDecrement('enterprise', 'lanes')} className="h-6 w-6 rounded border bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">-</button>
                <span className="font-semibold text-slate-900 w-4 text-center">{enterpriseAddons.lanes}</span>
                <button type="button" onClick={() => handleIncrement('enterprise', 'lanes')} className="h-6 w-6 rounded border bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">+</button>
              </div>
            </div>

            {/* Thiết bị */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{vi ? 'Thêm 1 máy chấm công (+2tr vĩnh viễn)' : 'Add 1 device (+2M perpetual)'}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleDecrement('enterprise', 'devices')} className="h-6 w-6 rounded border bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">-</button>
                <span className="font-semibold text-slate-900 w-4 text-center">{enterpriseAddons.devices}</span>
                <button type="button" onClick={() => handleIncrement('enterprise', 'devices')} className="h-6 w-6 rounded border bg-white flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100">+</button>
              </div>
            </div>
          </div>

          <Link href={`${vi ? '' : '/en'}/contact?type=enterprise&lanes=${enterpriseAddons.lanes}&devices=${enterpriseAddons.devices}`} className="mt-8 rounded-md border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-800 transition-colors duration-200 hover:bg-slate-100">{vi ? 'Gửi yêu cầu' : 'Send inquiry'}</Link>
        </article>

      </div>
      
      {/* Footer info */}
      <p className="mt-6 text-center text-xs text-slate-500">{catalogLive ? (vi ? 'Giá cơ bản và giới hạn được tải động từ Supabase.' : 'Base pricing and limits dynamically loaded from Supabase.') : (vi ? 'Đang hiển thị danh mục giá đã xác minh gần nhất.' : 'Showing the latest verified pricing catalog.')}</p>
    </div>
  );
}
