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
      <div className="card-elevated overflow-hidden">
        {orders.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-600 dark:text-slate-400">Chưa có đơn hàng.</p>
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
                      <code className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 select-all">
                        {order.id.slice(0, 8).toUpperCase()}
                      </code>
                    </td>
                    <td className="capitalize font-semibold text-slate-900 dark:text-slate-100">
                      {order.plan_code}
                    </td>
                    <td className="text-slate-600 dark:text-slate-400">
                      {order.billing_period === 'monthly' ? 'Hàng tháng' : 'Hàng năm'}
                    </td>
                    <td className="font-bold text-slate-900 dark:text-slate-100">
                      {new Intl.NumberFormat('vi-VN').format(order.amount_vnd)}đ
                    </td>
                    <td>
                      <span className={`badge-status ${order.status === 'paid' ? 'badge-active' : 'badge-pending'}`}>
                        <span className="badge-dot" />
                        {order.status === 'paid' ? 'Đã thanh toán' : order.status}
                      </span>
                    </td>
                    <td className="text-slate-600 dark:text-slate-400">
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
