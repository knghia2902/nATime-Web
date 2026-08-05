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

  return (
    <PortalShell title={`Chào ${user?.name || 'quý khách'}.`} description="Tổng quan trạng thái license, thiết bị kết nối và đơn hàng.">
      <div className="space-y-8">
        {loadIssue && (
          <div className="border hairline bg-amber/10 p-4 text-sm text-ink flex items-start gap-3">
            <span className="font-mono text-amber">⚠️</span>
            <div>Chưa thể tải đầy đủ dữ liệu tài khoản. Vui lòng tải lại sau ít phút.</div>
          </div>
        )}

        {search.get('payment') && (
          <div className="border hairline bg-teal/10 p-4 text-sm text-ink flex items-start gap-3 font-mono">
            <span className="text-teal">●</span>
            <div>
              {search.get('payment') === 'success'
                ? 'Thanh toán đã được gửi. License chỉ cập nhật sau khi webhook PayOS được xác minh.'
                : 'Giao dịch đã được hủy.'}
            </div>
          </div>
        )}

        {/* ── Top Hero Cards (Matching portal.html) ── */}
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="bg-graphite text-paper p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[11px] text-paper/50">GÓI TÀI KHOẢN</p>
              <span className="bg-teal/20 text-teal font-mono text-[11px] px-2 py-0.5">
                {summary.licenses > 0 ? 'Đang hoạt động' : 'Chưa có license'}
              </span>
            </div>
            <p className="font-display font-bold text-[22px] mb-1 text-paper">
              {summary.licenses > 0 ? `${summary.licenses} License đang kích hoạt` : 'Chưa có license hoạt động'}
            </p>
            <p className="font-mono text-[12px] text-paper/50">
              {summary.nearestExpiry
                ? `Hạn gần nhất: ${new Intl.DateTimeFormat('vi-VN').format(new Date(summary.nearestExpiry))}`
                : 'Nhận trial 7 ngày miễn phí hoặc mua gói bản quyền để kích hoạt.'}
            </p>
          </div>

          <div className="border hairline p-6 flex flex-col justify-between bg-paper">
            <div>
              <p className="font-mono text-[11px] text-teal mb-1">DÙNG THỬ STANDARD</p>
              <p className="font-body text-[13px] text-ink/70">
                {summary.trialClaimed ? 'Tài khoản đã kích hoạt gói Trial.' : 'Dùng thử Standard 7 ngày miễn phí cho 50 nhân sự và 2 thiết bị.'}
              </p>
            </div>
            <button
              onClick={claimTrial}
              disabled={busy !== null || summary.trialClaimed}
              className="mt-4 bg-ink text-paper font-body text-[13px] font-semibold px-4 py-2.5 hover:bg-graphite transition-colors cursor-pointer disabled:opacity-50 w-full sm:w-auto"
            >
              {busy === 'trial' ? 'Đang cấp…' : summary.trialClaimed ? 'Đã nhận Trial' : 'Nhận Trial 7 ngày'}
            </button>
          </div>
        </div>

        {/* ── 4 KPI Stats Bar (Matching portal.html bento gap-px) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10">
          <div className="bg-white p-5">
            <p className="font-body text-[12px] text-ink/50 mb-2">License đang dùng</p>
            <p className="font-mono text-[26px] font-semibold text-ink">{summary.licenses}</p>
          </div>
          <div className="bg-white p-5">
            <p className="font-body text-[12px] text-ink/50 mb-2">Thiết bị kết nối</p>
            <p className="font-mono text-[26px] font-semibold text-ink">{summary.devices}</p>
          </div>
          <div className="bg-white p-5">
            <p className="font-body text-[12px] text-ink/50 mb-2">Đơn chờ thanh toán</p>
            <p className="font-mono text-[26px] font-semibold text-ink">{summary.pendingOrders}</p>
          </div>
          <div className="bg-white p-5">
            <p className="font-body text-[12px] text-ink/50 mb-2">Hạn gần nhất</p>
            <p className="font-mono text-[16px] font-semibold text-ink mt-2">
              {summary.nearestExpiry ? new Intl.DateTimeFormat('vi-VN').format(new Date(summary.nearestExpiry)) : '—'}
            </p>
          </div>
        </div>

        {/* ── Plan Checkout (If selected from Pricing page) ── */}
        {plan && (
          <section className="border hairline bg-white p-6 space-y-4">
            <div>
              <p className="font-mono text-[11px] text-teal">THANH TOÁN ĐƠN HÀNG</p>
              <h2 className="font-display font-bold text-lg text-ink">Gói {plan === 'standard' ? 'Standard' : 'Professional'} ({billing === 'monthly' ? 'Hàng tháng' : 'Hàng năm'})</h2>
              <p className="font-body text-xs text-ink/60 mt-1">Chuyển sang cổng thanh toán PayOS bằng mã VietQR.</p>
            </div>
            <button
              onClick={checkout}
              disabled={busy !== null}
              className="bg-amber text-ink font-body text-sm font-bold px-6 py-3 hover:bg-amber/90 transition-colors cursor-pointer disabled:opacity-60"
            >
              {busy === 'checkout' ? 'Đang tạo liên kết…' : 'Thanh toán ngay với PayOS'}
            </button>
          </section>
        )}

        {message && (
          <div className="border hairline bg-paper p-4 text-xs font-mono text-ink">
            {message}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
