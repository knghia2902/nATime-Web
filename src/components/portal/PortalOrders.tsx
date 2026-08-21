'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabase';
import PortalShell from './PortalShell';

type Order = {
  id: string;
  plan_code: string;
  billing_period: string;
  amount_vnd: number;
  status: string;
  payment_provider: string | null;
  checkout_url: string | null;
  paid_at: string | null;
  created_at: string;
};

type CheckoutResponse = { checkoutUrl: string };

const CANCELLED_ORDERS_KEY = 'natime_cancelled_orders';

function getCancelledOrderIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(CANCELLED_ORDERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function markOrderCancelledLocally(orderId: string) {
  if (typeof window === 'undefined') return;
  const list = getCancelledOrderIds();
  if (!list.includes(orderId)) {
    list.push(orderId);
    localStorage.setItem(CANCELLED_ORDERS_KEY, JSON.stringify(list));
  }
}

export default function PortalOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [busyOrderId, setBusyOrderId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const loadOrders = async () => {
    if (!user || !supabase) return;
    const { data } = await supabase
      .from('license_orders')
      .select('id,plan_code,billing_period,amount_vnd,status,payment_provider,checkout_url,paid_at,created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    const cancelledIds = getCancelledOrderIds();
    const mapped = ((data as Order[] | null) ?? []).map((ord) => {
      if (ord.status === 'pending' && cancelledIds.includes(ord.id)) {
        return { ...ord, status: 'cancelled' };
      }
      return ord;
    });
    setOrders(mapped);
  };

  useEffect(() => {
    void loadOrders();
  }, [user]);

  async function resumePayment(order: Order) {
    if (!supabase) return;
    setBusyOrderId(order.id);
    setMessage('');

    // Check if the existing checkout URL is still within its 14-minute validity window
    const createdAtMs = new Date(order.created_at).getTime();
    const ageMinutes = (Date.now() - createdAtMs) / (1000 * 60);

    if (order.checkout_url && ageMinutes < 14) {
      try {
        const target = new URL(order.checkout_url);
        if (target.origin === 'https://pay.payos.vn') {
          window.location.assign(target.toString());
          return;
        }
      } catch {
        // Fallback to fresh checkout creation
      }
    }

    // If the link has expired (> 14 mins), cancel old order locally to prevent duplicates
    markOrderCancelledLocally(order.id);
    if (supabase) {
      void supabase.from('license_orders').update({ status: 'cancelled' }).eq('id', order.id);
    }

    // Create fresh checkout session
    const key = crypto.randomUUID().replace(/-/g, '');
    const { data, error } = await supabase.functions.invoke<CheckoutResponse>('payment-checkout', {
      body: {
        planCode: order.plan_code,
        billingPeriod: order.billing_period,
        idempotencyKey: key,
      },
    });

    setBusyOrderId(null);

    if (error || !data?.checkoutUrl) {
      setMessage('Không thể tạo liên kết thanh toán. Vui lòng thử lại sau.');
      return;
    }

    const target = new URL(data.checkoutUrl);
    if (target.origin !== 'https://pay.payos.vn') {
      setMessage('Địa chỉ thanh toán không hợp lệ.');
      return;
    }

    window.location.assign(target.toString());
  }

  async function cancelOrder(orderId: string) {
    const confirmCancel = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?');
    if (!confirmCancel) return;

    setBusyOrderId(orderId);
    markOrderCancelledLocally(orderId);

    if (supabase) {
      await supabase.from('license_orders').update({ status: 'cancelled' }).eq('id', orderId);
    }

    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: 'cancelled' } : ord))
    );
    setBusyOrderId(null);
    setMessage('Đã hủy đơn hàng thành công.');
  }

  return (
    <PortalShell title="Đơn hàng" description="Quản lý lịch sử giao dịch, tiếp tục thanh toán hoặc hủy đơn hàng.">
      <div className="space-y-6 stagger-fade-in">
        {message && (
          <div className={`rounded-xl p-4 text-sm font-medium ${message.includes('thành công') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
            {message}
          </div>
        )}

        <div className="card-elevated overflow-hidden border border-white/[0.08] bg-[rgba(15,23,38,0.75)] shadow-sm rounded-2xl backdrop-blur">
          {orders.length === 0 ? (
            <p className="p-8 text-center text-sm font-medium text-white/50">Chưa có đơn hàng.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-enhanced w-full">
                <thead>
                  <tr>
                    <th className="text-left">Mã đơn</th>
                    <th className="text-left">Gói dịch vụ</th>
                    <th className="text-left">Chu kỳ</th>
                    <th className="text-left">Số tiền</th>
                    <th className="text-left">Trạng thái</th>
                    <th className="text-left">Ngày tạo</th>
                    <th className="text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="text-left">
                        <code className="font-mono text-xs font-bold text-white/70 bg-white/[0.06] px-2.5 py-1 rounded border border-white/[0.08] select-all">
                          {order.id.slice(0, 8).toUpperCase()}
                        </code>
                      </td>
                      <td className="capitalize font-bold text-white text-left">
                        {order.plan_code}
                      </td>
                      <td className="text-white/60 font-medium text-left">
                        {order.billing_period === 'monthly' ? 'Hàng tháng' : 'Hàng năm'}
                      </td>
                      <td className="font-black text-white text-base text-left">
                        {new Intl.NumberFormat('vi-VN').format(order.amount_vnd)}đ
                      </td>
                      <td className="text-left">
                        <span
                          className={`badge-status ${
                            order.status === 'paid'
                              ? 'badge-active'
                              : order.status === 'cancelled'
                              ? 'badge-inactive'
                              : 'badge-pending'
                          }`}
                        >
                          <span className="badge-dot" />
                          {order.status === 'paid'
                            ? 'Đã thanh toán'
                            : order.status === 'cancelled'
                            ? 'Đã hủy'
                            : 'Chờ thanh toán'}
                        </span>
                      </td>
                      <td className="text-white/60 font-medium text-left">
                        {new Intl.DateTimeFormat('vi-VN').format(new Date(order.created_at))}
                      </td>
                      <td className="text-right">
                        {order.status === 'pending' ? (
                          <div className="inline-flex items-center gap-2 justify-end">
                            <button
                              onClick={() => resumePayment(order)}
                              disabled={busyOrderId === order.id}
                              className="btn-pill-primary !h-7 !py-0 !px-3 text-xs font-bold gap-1 cursor-pointer disabled:opacity-50"
                            >
                              {busyOrderId === order.id ? (
                                'Đang xử lý…'
                              ) : (
                                <>
                                  <span>Thanh toán</span>
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                  </svg>
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => cancelOrder(order.id)}
                              disabled={busyOrderId === order.id}
                              title="Hủy đơn hàng này"
                              className="btn-pill-glass !h-7 !py-0 !px-2.5 text-xs text-rose-300 hover:text-rose-200 border-rose-500/30 hover:border-rose-500/50 hover:bg-rose-500/10 cursor-pointer disabled:opacity-50"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : order.status === 'paid' ? (
                          <span className="text-xs text-emerald-400 font-semibold inline-flex items-center gap-1">
                            <span>✓ Hoàn tất</span>
                          </span>
                        ) : (
                          <span className="text-xs text-white/40 font-medium">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PortalShell>
  );
}
