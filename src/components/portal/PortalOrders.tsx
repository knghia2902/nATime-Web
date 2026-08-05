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
  paid_at: string | null;
  created_at: string;
};

export default function PortalOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user || !supabase) return;
    void supabase
      .from('license_orders')
      .select('id,plan_code,billing_period,amount_vnd,status,payment_provider,paid_at,created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setOrders((data as Order[] | null) ?? []));
  }, [user]);

  return (
    <PortalShell title="Đơn hàng" description="Trạng thái thanh toán được xác nhận từ webhook PayOS.">
      <div className="space-y-6">
        <p className="font-mono text-[11px] text-teal tracking-wide">03 / ĐƠN HÀNG</p>
        <div className="border hairline overflow-x-auto">
          <table className="w-full text-left font-body text-[13px]">
            <thead>
              <tr className="border-b hairline bg-white/60">
                <th className="py-3 px-4 text-ink/50 font-medium">Mã đơn</th>
                <th className="py-3 px-4 text-ink/50 font-medium">Ngày</th>
                <th className="py-3 px-4 text-ink/50 font-medium">Gói</th>
                <th className="py-3 px-4 text-ink/50 font-medium">Chu kỳ</th>
                <th className="py-3 px-4 text-ink/50 font-medium">Số tiền</th>
                <th className="py-3 px-4 text-ink/50 font-medium">Thanh toán</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[12px]">
              {orders.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan={6} className="py-6 px-4 text-center text-ink/50 font-body">
                    Chưa có đơn hàng.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const isPaid = order.status === 'paid';
                  return (
                    <tr key={order.id} className="border-b hairline bg-white">
                      <td className="py-3 px-4 font-bold text-ink">
                        INV-{order.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="py-3 px-4 text-ink/60">
                        {new Intl.DateTimeFormat('vi-VN').format(new Date(order.created_at))}
                      </td>
                      <td className="py-3 px-4 font-body font-semibold capitalize text-ink">
                        {order.plan_code}
                      </td>
                      <td className="py-3 px-4 font-body text-ink/70">
                        {order.billing_period === 'monthly' ? 'Hàng tháng' : 'Hàng năm'}
                      </td>
                      <td className="py-3 px-4 text-ink font-semibold">
                        {new Intl.NumberFormat('vi-VN').format(order.amount_vnd)}đ
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 ${isPaid ? 'bg-teal/10 text-teal' : 'bg-amber/10 text-amber'}`}>
                          {isPaid ? 'Đã thanh toán' : order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PortalShell>
  );
}
