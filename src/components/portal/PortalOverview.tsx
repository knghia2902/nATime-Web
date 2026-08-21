'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabase';
import PortalShell from './PortalShell';

type Summary = { licenses: number; devices: number; pendingOrders: number; nearestExpiry: string | null; trialClaimed: boolean };
type CheckoutResponse = { checkoutUrl: string };

export default function PortalOverview() {
  const { user, updateProfile } = useAuth();
  const search = useSearchParams();
  const [summary, setSummary] = useState<Summary>({ licenses: 0, devices: 0, pendingOrders: 0, nearestExpiry: null, trialClaimed: false });
  const [busy, setBusy] = useState<'trial' | 'checkout' | null>(null);
  const [message, setMessage] = useState('');
  const [loadIssue, setLoadIssue] = useState(false);
  const plan = search.get('plan') === 'professional' ? 'professional' : search.get('plan') === 'standard' ? 'standard' : null;
  const billing = search.get('billing') === 'monthly' ? 'monthly' : 'yearly';

  // VAT Invoice Form State
  const [requireVat, setRequireVat] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [invoiceEmail, setInvoiceEmail] = useState('');

  useEffect(() => {
    if (user) {
      if (user.company) setCompanyName(user.company);
      if (user.taxId) setTaxId(user.taxId);
      if (user.companyAddress) setCompanyAddress(user.companyAddress);
      if (user.invoiceEmail) setInvoiceEmail(user.invoiceEmail);
    }
  }, [user]);

  useEffect(() => {
    if (!user || !supabase) return;
    void Promise.all([
      supabase.from('license_entitlements').select('id,status,expires_at,license_installations(id,status)').eq('user_id', user.id),
      supabase.from('license_orders').select('id,status').eq('user_id', user.id),
      supabase.from('license_trial_claims').select('id').eq('user_id', user.id).maybeSingle(),
    ]).then(([entitlements, orders, trial]) => {
      if (entitlements.error || orders.error || trial.error) {
        setLoadIssue(true);
        return;
      }
      setLoadIssue(false);
      const active = (entitlements.data ?? []).filter((item) => item.status === 'active');
      const expiries = active.map((item) => item.expires_at).filter(Boolean).sort() as string[];
      let cancelledIds: string[] = [];
      try {
        cancelledIds = JSON.parse(localStorage.getItem('natime_cancelled_orders') || '[]');
      } catch {
        cancelledIds = [];
      }
      setSummary({
        licenses: active.length,
        devices: active.reduce((total, item) => total + ((item.license_installations as Array<{ status: string }> | null) ?? []).filter((device) => device.status === 'active').length, 0),
        pendingOrders: (orders.data ?? []).filter((item) => item.status === 'pending' && !cancelledIds.includes(item.id)).length,
        nearestExpiry: expiries[0] ?? null,
        trialClaimed: Boolean(trial.data),
      });
    });
  }, [user]);

  async function claimTrial() {
    if (!supabase) return;
    setBusy('trial');
    setMessage('');
    const { error } = await supabase.functions.invoke('trial-claim', { body: {} });
    setBusy(null);
    setMessage(error ? 'Không thể cấp trial. Tài khoản hoặc thiết bị có thể đã sử dụng trial.' : 'Trial Standard 7 ngày đã được tạo. Hãy mở mục License để kích hoạt máy.');
    if (!error) setSummary((current) => ({ ...current, trialClaimed: true }));
  }

  async function checkout() {
    if (!supabase || !plan) return;
    setBusy('checkout');
    setMessage('');

    if (requireVat) {
      if (!companyName.trim() || !taxId.trim()) {
        setBusy(null);
        setMessage('Vui lòng nhập đầy đủ Tên công ty và Mã số thuế để yêu cầu xuất hóa đơn VAT.');
        return;
      }
      // Save tax details in profile
      void updateProfile(
        user?.name || '',
        companyName.trim(),
        taxId.trim(),
        companyAddress.trim(),
        invoiceEmail.trim() || user?.email
      );
    }

    const key = crypto.randomUUID().replace(/-/g, '');
    const { data, error } = await supabase.functions.invoke<CheckoutResponse>('payment-checkout', { body: { planCode: plan, billingPeriod: billing, idempotencyKey: key } });
    setBusy(null);
    if (error || !data?.checkoutUrl) {
      setMessage('Không thể tạo liên kết PayOS. Vui lòng thử lại.');
      return;
    }
    const target = new URL(data.checkoutUrl);
    if (target.origin !== 'https://pay.payos.vn') {
      setMessage('Địa chỉ thanh toán không hợp lệ.');
      return;
    }
    window.location.assign(target.toString());
  }

  const cards = [
    {
      label: 'License hoạt động',
      value: String(summary.licenses),
      hint: 'Đã xác minh và còn hiệu lực',
      iconBg: 'bg-white/[0.06] text-white',
      badgeClass: 'badge-status badge-active',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      ),
    },
    {
      label: 'Thiết bị đang dùng',
      value: String(summary.devices),
      hint: 'Máy đang chiếm vị trí kích hoạt',
      iconBg: 'bg-white/[0.06] text-white',
      badgeClass: 'badge-status badge-active',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0v12" />
        </svg>
      ),
    },
    {
      label: 'Đơn chờ xử lý',
      value: String(summary.pendingOrders),
      hint: 'Đang đợi webhook PayOS',
      iconBg: 'bg-white/[0.06] text-white',
      badgeClass: summary.pendingOrders > 0 ? 'badge-status badge-pending' : 'badge-status badge-inactive',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Hạn gần nhất',
      value: summary.nearestExpiry ? new Intl.DateTimeFormat('vi-VN').format(new Date(summary.nearestExpiry)) : '--',
      hint: 'Thời điểm cần gia hạn license',
      iconBg: 'bg-white/[0.06] text-white',
      badgeClass: summary.nearestExpiry ? 'badge-status badge-active' : 'badge-status badge-inactive',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
  ];

  return (
    <PortalShell title="Tổng quan" description="Trung tâm điều khiển tài khoản, bản quyền và đơn hàng.">
      <div className="space-y-8 stagger-fade-in">
        {/* Banner with modern glass styling */}
        <section className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-linear-to-r from-[rgba(15,23,38,0.95)] via-[rgba(20,32,54,0.85)] to-[rgba(15,23,38,0.95)] p-6 sm:p-8 shadow-sm backdrop-blur">
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="badge-pill mb-3">ON-PREMISE HUB</span>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Cổng Quản Lý Bản Quyền
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70 font-medium">
                Kích hoạt máy tính cài nATime bằng Pairing Code, theo dõi thiết bị chấm công và gia hạn license tức thì qua VietQR.
              </p>
            </div>
            <Link
              href="/portal/licenses"
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0a1628] hover:bg-white/85 transition-all shadow-[0_2px_12px_rgba(255,255,255,0.15)] shrink-0 cursor-pointer"
            >
              <span>Quản lý License</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Stat/KPI cards (4 cards grid) */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => (
            <article key={card.label} className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 shadow-sm flex flex-col justify-between hover:border-white/20 transition-all duration-200 backdrop-blur">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`grid h-9 w-9 place-items-center rounded-lg ${card.iconBg}`}>
                      {card.icon}
                    </div>
                    <p className="text-sm font-bold text-white">{card.label}</p>
                  </div>
                  <span className={card.badgeClass}>
                    <span className="badge-dot" />
                    0{index + 1}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-black text-white tracking-tight">{card.value}</p>
                </div>
              </div>
              <p className="mt-3 text-xs font-medium leading-5 text-white/50">{card.hint}</p>
            </article>
          ))}
        </div>

        {/* Plan checkout section if plan search param exists */}
        {plan && (
          <section className="rounded-2xl border border-white/20 bg-[rgba(15,23,38,0.85)] p-6 sm:p-8 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#0a1628] shadow-md">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5M3.75 6h16.5a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5v-9A1.5 1.5 0 013.75 6z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Đăng ký mua gói {plan === 'standard' ? 'Standard' : 'Professional'}</h2>
                <p className="text-xs text-white/60 font-medium">Thanh toán tự động bằng VietQR qua cổng PayOS</p>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#0a1220]/60 p-4 text-sm text-white/80 space-y-1 mb-6">
              <p>Gói dịch vụ: <span className="font-bold text-white uppercase">{plan}</span></p>
              <p>Chu kỳ thanh toán: <span className="font-bold text-white">{billing === 'monthly' ? 'Hàng tháng' : 'Hàng năm (Tiết kiệm 20%)'}</span></p>
              <p className="text-xs text-white/50 pt-1">Sau khi quét mã VietQR thành công, bản quyền sẽ được kích hoạt tức thì.</p>
            </div>

            {/* VAT Invoice Expandable Form */}
            <div className="border-t border-white/[0.08] pt-5 mb-6">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={requireVat}
                  onChange={(e) => setRequireVat(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-[#0a1220] text-emerald-500 focus:ring-0 cursor-pointer"
                />
                <span className="text-sm font-semibold text-white">
                  Yêu cầu xuất Hóa đơn GTGT (VAT 0% cho phần mềm)
                </span>
              </label>

              {requireVat && (
                <div className="mt-4 p-5 rounded-xl border border-white/[0.12] bg-[#0a1220]/80 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Tên Đơn vị / Doanh nghiệp <span className="text-rose-400">*</span></label>
                    <input
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ví dụ: Công ty Cổ phần Công nghệ XYZ"
                      className="w-full rounded-lg border border-white/[0.12] bg-[#0a1220] px-3.5 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1">Mã số thuế (MST) <span className="text-rose-400">*</span></label>
                      <input
                        required
                        value={taxId}
                        onChange={(e) => setTaxId(e.target.value)}
                        placeholder="Ví dụ: 0312345678"
                        className="w-full rounded-lg border border-white/[0.12] bg-[#0a1220] px-3.5 py-2 text-sm font-mono text-white placeholder:font-sans placeholder:text-white/30 outline-none focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1">Email nhận HĐĐT</label>
                      <input
                        type="email"
                        value={invoiceEmail}
                        onChange={(e) => setInvoiceEmail(e.target.value)}
                        placeholder="ketoan@congty.vn"
                        className="w-full rounded-lg border border-white/[0.12] bg-[#0a1220] px-3.5 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Địa chỉ trụ sở (theo GPKD)</label>
                    <input
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                      className="w-full rounded-lg border border-white/[0.12] bg-[#0a1220] px-3.5 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={checkout}
              disabled={busy !== null}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#0a1628] hover:bg-white/85 transition-all shadow-[0_2px_12px_rgba(255,255,255,0.15)] disabled:opacity-60 cursor-pointer"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              <span>{busy === 'checkout' ? 'Đang tạo liên kết thanh toán…' : 'Tiến hành thanh toán VietQR (PayOS)'}</span>
            </button>
          </section>
        )}

        {/* Section blocks (Trial Standard & Quick Actions) */}
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 sm:p-7 shadow-sm flex flex-col justify-between backdrop-blur">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.06] text-emerald-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-white">Dùng thử Standard</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/60 font-medium">
                Trial 7 ngày, tối đa 50 nhân sự và một thiết bị. Mỗi tài khoản và Hardware ID chỉ được dùng một lần.
              </p>
            </div>
            <button
              onClick={claimTrial}
              disabled={busy !== null || summary.trialClaimed}
              className="mt-5 inline-flex items-center justify-center gap-2 w-fit rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#0a1628] hover:bg-white/85 transition-all shadow-[0_2px_12px_rgba(255,255,255,0.15)] disabled:opacity-60 cursor-pointer"
            >
              <span>{summary.trialClaimed ? 'Đã nhận trial' : busy === 'trial' ? 'Đang cấp…' : 'Kích hoạt Trial 7 ngày'}</span>
            </button>
          </section>

          <section className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 sm:p-7 shadow-sm flex flex-col justify-between backdrop-blur">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.06] text-sky-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-white">Mua thêm / Gia hạn License</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/60 font-medium">
                Nâng cấp quy mô nhân sự, số lượng FaceID hoặc mở rộng thời hạn hoạt động của hệ thống On-Premise.
              </p>
            </div>
            <Link
              href="/pricing"
              className="mt-5 inline-flex items-center justify-center gap-2 w-fit rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <span>Xem bảng giá & Chọn gói</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </section>
        </div>

        {message && (
          <div className={`rounded-xl p-4 text-sm font-medium ${message.includes('thành công') || message.includes('tạo') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
            {message}
          </div>
        )}

        {loadIssue && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-300">
            Không thể tải đầy đủ thông tin tổng quan. Vui lòng thử lại sau.
          </div>
        )}
      </div>
    </PortalShell>
  );
}
