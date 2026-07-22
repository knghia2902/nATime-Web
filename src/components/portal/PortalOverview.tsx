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
      setSummary({ licenses: active.length, devices: active.reduce((total, item) => total + ((item.license_installations as Array<{ status: string }> | null) ?? []).filter((device) => device.status === 'active').length, 0), pendingOrders: (orders.data ?? []).filter((item) => item.status === 'pending').length, nearestExpiry: expiries[0] ?? null, trialClaimed: Boolean(trial.data) });
    });
  }, [user]);
  async function claimTrial() {
    if (!supabase) return;
    setBusy('trial'); setMessage('');
    const { error } = await supabase.functions.invoke('trial-claim', { body: {} });
    setBusy(null); setMessage(error ? 'Không thể cấp trial. Tài khoản hoặc thiết bị có thể đã sử dụng trial.' : 'Trial Standard 7 ngày đã được tạo. Hãy mở mục License để kích hoạt máy.');
    if (!error) setSummary((current) => ({ ...current, trialClaimed: true }));
  }
  async function checkout() {
    if (!supabase || !plan) return;
    setBusy('checkout'); setMessage('');
    const key = crypto.randomUUID().replace(/-/g, '');
    const { data, error } = await supabase.functions.invoke<CheckoutResponse>('payment-checkout', { body: { planCode: plan, billingPeriod: billing, idempotencyKey: key } });
    setBusy(null);
    if (error || !data?.checkoutUrl) { setMessage('Không thể tạo liên kết PayOS. Vui lòng thử lại.'); return; }
    const target = new URL(data.checkoutUrl);
    if (target.origin !== 'https://pay.payos.vn') { setMessage('Địa chỉ thanh toán không hợp lệ.'); return; }
    window.location.assign(target.toString());
  }
  const cards = [
    ['License hoạt động', String(summary.licenses), 'Đã xác minh và còn hiệu lực'],
    ['Thiết bị đang dùng', String(summary.devices), 'Máy đang chiếm vị trí kích hoạt'],
    ['Đơn chờ thanh toán', String(summary.pendingOrders), 'Đang chờ PayOS xác nhận'],
    ['Hạn gần nhất', summary.nearestExpiry ? new Intl.DateTimeFormat('vi-VN').format(new Date(summary.nearestExpiry)) : '—', 'Mốc gia hạn cần lưu ý'],
  ];
  return <PortalShell title="Tổng quan" description="Trạng thái license, thiết bị và đơn hàng của tài khoản.">
    {loadIssue && <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Chưa thể tải đầy đủ dữ liệu tài khoản. Vui lòng tải lại sau ít phút.</div>}
    {search.get('payment') && <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">{search.get('payment') === 'success' ? 'Thanh toán đã được gửi. License chỉ cập nhật sau khi webhook PayOS được xác minh.' : 'Giao dịch đã được hủy.'}</div>}
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 text-white shadow-sm"><div className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><div className="flex items-center gap-2 text-sm font-semibold text-emerald-300"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Trạng thái tài khoản</div><h2 className="mt-3 text-xl font-bold">{summary.licenses > 0 ? 'License của bạn đang sẵn sàng sử dụng' : 'Chưa có license hoạt động'}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{summary.licenses > 0 ? 'Kiểm tra thiết bị, hạn dùng và module được cấp trong mục License.' : 'Bạn có thể nhận trial Standard một lần hoặc mua gói phù hợp để kích hoạt nATime.'}</p></div><Link href="/portal/licenses" className="inline-flex w-fit rounded-md bg-white px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-blue-50">Quản lý license</Link></div></section>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value, hint], index) => <article key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold text-slate-600">{label}</p><span className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-[10px] font-bold text-slate-500">0{index + 1}</span></div><p className="mt-4 text-2xl font-bold tracking-tight">{value}</p><p className="mt-2 text-xs leading-5 text-slate-500">{hint}</p></article>)}</div>
    {plan && <section className="mt-6 rounded-lg border border-blue-200 bg-white p-6"><h2 className="text-lg font-semibold">Tiếp tục mua gói {plan === 'standard' ? 'Standard' : 'Professional'}</h2><p className="mt-2 text-sm text-slate-600">Chu kỳ: {billing === 'monthly' ? 'hàng tháng' : 'hàng năm'}. Bạn sẽ được chuyển tới PayOS để thanh toán bằng VietQR/chuyển khoản.</p><button onClick={checkout} disabled={busy !== null} className="mt-5 rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60">{busy === 'checkout' ? 'Đang tạo liên kết…' : 'Thanh toán với PayOS'}</button></section>}
    <div className="mt-6 grid gap-5 lg:grid-cols-2"><section className="rounded-lg border border-slate-200 bg-white p-6"><h2 className="text-lg font-semibold">Dùng thử Standard</h2><p className="mt-2 text-sm leading-6 text-slate-600">Trial 7 ngày, tối đa 50 nhân sự và một thiết bị. Mỗi tài khoản và Hardware ID chỉ được dùng một lần.</p><button onClick={claimTrial} disabled={busy !== null || summary.trialClaimed} className="mt-5 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100 disabled:opacity-60">{busy === 'trial' ? 'Đang kiểm tra…' : summary.trialClaimed ? 'Tài khoản đã nhận trial' : 'Nhận license trial'}</button></section><section className="rounded-lg border border-slate-200 bg-white p-6"><h2 className="text-lg font-semibold">Hành động nhanh</h2><div className="mt-4 flex flex-wrap gap-3"><Link href="/portal/licenses" className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100">Kích hoạt máy</Link><Link href="/portal/orders" className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100">Xem đơn hàng</Link><Link href="/portal/downloads" className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100">Tải bộ cài</Link></div></section></div>
    {message && <p className="mt-5 rounded-md bg-slate-100 p-4 text-sm text-slate-700">{message}</p>}
  </PortalShell>;
}
