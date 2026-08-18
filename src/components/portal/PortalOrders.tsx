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
      <div className="card-elevated overflow-hidden border border-white/[0.08] bg-[rgba(15,23,38,0.75)] shadow-sm rounded-2xl backdrop-blur">
        {orders.length === 0 ? (
          <p className="p-8 text-center text-sm font-medium text-white/50">Chưa có đơn hàng.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-enhanced">
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Gói</th>
                  <th>Chu kỳ</th>
                  <th>Số tiền</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <code className="font-mono text-xs font-bold text-white/70 bg-white/[0.06] px-2.5 py-1 rounded border border-white/[0.08] select-all">
                        {order.id.slice(0, 8).toUpperCase()}
                      </code>
                    </td>
                    <td className="capitalize font-bold text-white">
                      {order.plan_code}
                    </td>
                    <td className="text-white/60 font-medium">
                      {order.billing_period === 'monthly' ? 'Hàng tháng' : 'Hàng năm'}
                    </td>
                    <td className="font-black text-white text-base">
                      {new Intl.NumberFormat('vi-VN').format(order.amount_vnd)}đ
                    </td>
                    <td>
                      <span className={`badge-status ${order.status === 'paid' ? 'badge-active' : 'badge-pending'}`}>
                        <span className="badge-dot" />
                        {order.status === 'paid' ? 'Đã thanh toán' : order.status}
                      </span>
                    </td>
                    <td className="text-white/60 font-medium">
                      {new Intl.DateTimeFormat('vi-VN').format(new Date(order.created_at))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
