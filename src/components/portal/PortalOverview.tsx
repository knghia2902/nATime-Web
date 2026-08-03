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
  const { user } = useAuth();
  const search = useSearchParams();
  const [summary, setSummary] = useState<Summary>({ licenses: 0, devices: 0, pendingOrders: 0, nearestExpiry: null, trialClaimed: false });
  const [busy, setBusy] = useState<'trial' | 'checkout' | null>(null);
  const [message, setMessage] = useState('');
  const [loadIssue, setLoadIssue] = useState(false);
  const plan = search.get('plan') === 'professional' ? 'professional' : search.get('plan') === 'standard' ? 'standard' : null;
  const billing = search.get('billing') === 'monthly' ? 'monthly' : 'yearly';

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
      setSummary({
        licenses: active.length,
        devices: active.reduce((total, item) => total + ((item.license_installations as Array<{ status: string }> | null) ?? []).filter((device) => device.status === 'active').length, 0),
        pendingOrders: (orders.data ?? []).filter((item) => item.status === 'pending').length,
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
      iconBg: 'bg-indigo-50 text-indigo-600',
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
      iconBg: 'bg-blue-50 text-blue-600',
      badgeClass: 'badge-status badge-active',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0v12" />
        </svg>
      ),
    },
    {
      label: 'Đơn chờ thanh toán',
      value: String(summary.pendingOrders),
      hint: 'Đang chờ PayOS xác nhận',
      iconBg: 'bg-amber-50 text-amber-600',
      badgeClass: `badge-status ${summary.pendingOrders > 0 ? 'badge-pending' : 'badge-inactive'}`,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
    {
      label: 'Hạn gần nhất',
      value: summary.nearestExpiry ? new Intl.DateTimeFormat('vi-VN').format(new Date(summary.nearestExpiry)) : '—',
      hint: 'Mốc gia hạn cần lưu ý',
      iconBg: 'bg-violet-50 text-violet-600',
      badgeClass: 'badge-status badge-inactive',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
  ];

  return (
    <PortalShell title="Tổng quan" description="Trạng thái license, thiết bị và đơn hàng của tài khoản.">
      <div className="space-y-6 stagger-fade-in">
        {loadIssue && (
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900 backdrop-blur-sm flex items-start gap-3">
            <svg className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <div>Chưa thể tải đầy đủ dữ liệu tài khoản. Vui lòng tải lại sau ít phút.</div>
          </div>
        )}

        {search.get('payment') && (
          <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-4 text-sm text-blue-900 backdrop-blur-sm flex items-start gap-3">
            <svg className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <div>
              {search.get('payment') === 'success'
                ? 'Thanh toán đã được gửi. License chỉ cập nhật sau khi webhook PayOS được xác minh.'
                : 'Giao dịch đã được hủy.'}
            </div>
          </div>
        )}

        {/* Hero banner section */}
        <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Trạng thái tài khoản
              </div>
              <h2 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-white">
                {summary.licenses > 0 ? 'License của bạn đang sẵn sàng sử dụng' : 'Chưa có license hoạt động'}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
                {summary.licenses > 0
                  ? 'Kiểm tra thiết bị, hạn dùng và module được cấp trong mục License.'
                  : 'Bạn có thể nhận trial Standard một lần hoặc mua gói phù hợp để kích hoạt nATime.'}
              </p>
            </div>
            <Link
              href="/portal/licenses"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-white/10 hover:bg-slate-100 hover:shadow-white/20 transition-all duration-200 group w-fit"
            >
              <span>Quản lý license</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Stat/KPI cards (4 cards grid) */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => (
            <article key={card.label} className="card-elevated p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`grid h-9 w-9 place-items-center rounded-lg ${card.iconBg}`}>
                      {card.icon}
                    </div>
                    <p className="text-sm font-medium text-slate-600">{card.label}</p>
                  </div>
                  <span className={card.badgeClass}>
                    <span className="badge-dot" />
                    0{index + 1}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{card.value}</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">{card.hint}</p>
            </article>
          ))}
        </div>

        {/* Plan checkout section if plan search param exists */}
        {plan && (
          <section className="card-elevated p-6 sm:p-7 border-indigo-100 bg-gradient-to-br from-indigo-50/60 via-white to-slate-50">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5M3.75 6h16.5a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5v-9A1.5 1.5 0 013.75 6z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Tiếp tục mua gói {plan === 'standard' ? 'Standard' : 'Professional'}</h2>
                <p className="text-xs text-slate-500">Thanh toán an toàn qua cổng PayOS</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Chu kỳ: <span className="font-semibold text-slate-800">{billing === 'monthly' ? 'hàng tháng' : 'hàng năm'}</span>. Bạn sẽ được chuyển tới PayOS để thanh toán bằng VietQR/chuyển khoản.
            </p>
            <button
              onClick={checkout}
              disabled={busy !== null}
              className="btn-gradient mt-5 inline-flex items-center gap-2 disabled:opacity-60"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              <span>{busy === 'checkout' ? 'Đang tạo liên kết…' : 'Thanh toán với PayOS'}</span>
            </button>
          </section>
        )}

        {/* Section blocks (Trial Standard & Quick Actions) */}
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="card-elevated p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-slate-900">Dùng thử Standard</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Trial 7 ngày, tối đa 50 nhân sự và một thiết bị. Mỗi tài khoản và Hardware ID chỉ được dùng một lần.
              </p>
            </div>
            <button
              onClick={claimTrial}
              disabled={busy !== null || summary.trialClaimed}
              className="btn-gradient mt-5 inline-flex items-center justify-center gap-2 w-fit disabled:opacity-60"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>{busy === 'trial' ? 'Đang kiểm tra…' : summary.trialClaimed ? 'Tài khoản đã nhận trial' : 'Nhận license trial'}</span>
            </button>
          </section>

          <section className="card-elevated p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-slate-900">Hành động nhanh</h2>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/portal/licenses"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all duration-200 shadow-sm"
                >
                  <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                  <span>Kích hoạt máy</span>
                </Link>
                <Link
                  href="/portal/orders"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all duration-200 shadow-sm"
                >
                  <svg className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span>Xem đơn hàng</span>
                </Link>
                <Link
                  href="/portal/downloads"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 transition-all duration-200 shadow-sm"
                >
                  <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>Tải bộ cài</span>
                </Link>
              </div>
            </div>
          </section>
        </div>

        {message && (
          <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 text-sm text-slate-700 flex items-start gap-3">
            <svg className="h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <p>{message}</p>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
