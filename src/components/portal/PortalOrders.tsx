'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabase';
import PortalShell from './PortalShell';

type Order = { id: string; plan_code: string; billing_period: string; amount_vnd: number; status: string; payment_provider: string | null; paid_at: string | null; created_at: string };
export default function PortalOrders() {
  const { user } = useAuth(); const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => { if (!user || !supabase) return; void supabase.from('license_orders').select('id,plan_code,billing_period,amount_vnd,status,payment_provider,paid_at,created_at').eq('user_id', user.id).order('created_at', { ascending: false }).then(({ data }) => setOrders((data as Order[] | null) ?? [])); }, [user]);
  return <PortalShell title="Đơn hàng" description="Trạng thái thanh toán được xác nhận từ webhook PayOS."><div className="overflow-hidden rounded-lg border border-slate-200 bg-white">{orders.length === 0 ? <p className="p-8 text-center text-sm text-slate-600">Chưa có đơn hàng.</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-600"><tr><th className="px-5 py-3">Mã</th><th className="px-5 py-3">Gói</th><th className="px-5 py-3">Chu kỳ</th><th className="px-5 py-3">Số tiền</th><th className="px-5 py-3">Trạng thái</th><th className="px-5 py-3">Ngày tạo</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-t border-slate-200"><td className="px-5 py-4 font-mono text-xs">{order.id.slice(0, 8).toUpperCase()}</td><td className="px-5 py-4 capitalize">{order.plan_code}</td><td className="px-5 py-4">{order.billing_period === 'monthly' ? 'Hàng tháng' : 'Hàng năm'}</td><td className="px-5 py-4 font-semibold">{new Intl.NumberFormat('vi-VN').format(order.amount_vnd)}đ</td><td className="px-5 py-4"><span className={`rounded px-2 py-1 text-xs font-semibold ${order.status === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>{order.status}</span></td><td className="px-5 py-4">{new Intl.DateTimeFormat('vi-VN').format(new Date(order.created_at))}</td></tr>)}</tbody></table></div>}</div></PortalShell>;
}
