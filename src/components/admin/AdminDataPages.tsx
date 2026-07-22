'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Row = Record<string, unknown>;
function date(value: unknown) { return typeof value === 'string' ? new Intl.DateTimeFormat('vi-VN').format(new Date(value)) : '—'; }
function cell(value: unknown) { if (value == null) return '—'; if (Array.isArray(value)) return value.join(', '); if (typeof value === 'object') return JSON.stringify(value); return String(value); }

export function AdminOverview() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  useEffect(() => { const client = supabase; if (!client) return; const tables = ['portal_profiles', 'license_orders', 'license_entitlements', 'license_installations', 'contact_requests', 'software_releases'] as const; void Promise.all(tables.map(async (table) => ({ table, count: (await client.from(table).select('*', { count: 'exact', head: true })).count ?? 0 }))).then((items) => setCounts(Object.fromEntries(items.map((item) => [item.table, item.count])))); }, []);
  const cards = [['Khách hàng', counts.portal_profiles], ['Đơn hàng', counts.license_orders], ['License', counts.license_entitlements], ['Thiết bị', counts.license_installations], ['Liên hệ mới', counts.contact_requests], ['Release', counts.software_releases]];
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label, value]) => <article key={label as string} className="rounded-lg border border-slate-200 bg-white p-6"><p className="text-sm text-slate-500">{label}</p><p className="mt-3 text-3xl font-bold">{value ?? '—'}</p></article>)}</div>;
}

const definitions = {
  customers: { title: 'Khách hàng', description: 'Hồ sơ chủ tài khoản.', table: 'portal_profiles', select: 'user_id,display_name,organization_name,created_at', columns: [['display_name', 'Tên'], ['organization_name', 'Đơn vị'], ['user_id', 'User ID'], ['created_at', 'Ngày tạo']] },
  orders: { title: 'Đơn hàng', description: 'Trạng thái PayOS và số tiền.', table: 'license_orders', select: 'id,user_id,plan_code,billing_period,amount_vnd,status,payment_provider,created_at', columns: [['id', 'Mã'], ['plan_code', 'Gói'], ['billing_period', 'Chu kỳ'], ['amount_vnd', 'Số tiền'], ['status', 'Trạng thái'], ['created_at', 'Ngày tạo']] },
  licenses: { title: 'License', description: 'Entitlement đã cấp cho khách hàng.', table: 'license_entitlements', select: 'id,user_id,plan_code,origin,status,max_employees,max_devices,enabled_modules,expires_at', columns: [['id', 'Mã'], ['plan_code', 'Gói'], ['origin', 'Nguồn'], ['status', 'Trạng thái'], ['max_devices', 'Thiết bị'], ['expires_at', 'Hết hạn']] },
  devices: { title: 'Thiết bị', description: 'Máy đã liên kết với license.', table: 'license_installations', select: 'id,entitlement_id,display_name,hardware_id_hash,status,activated_at,last_validated_at', columns: [['display_name', 'Tên máy'], ['hardware_id_hash', 'Hardware hash'], ['status', 'Trạng thái'], ['activated_at', 'Kích hoạt'], ['last_validated_at', 'Xác minh']] },
  audit: { title: 'Audit', description: 'Lịch sử license và thao tác quản trị.', table: 'license_audit_entries', select: 'id,user_id,event_type,correlation_id,details,created_at', columns: [['event_type', 'Sự kiện'], ['user_id', 'User'], ['correlation_id', 'Correlation'], ['details', 'Chi tiết'], ['created_at', 'Thời gian']] },
} as const;

export function AdminTablePage({ kind }: { kind: keyof typeof definitions }) {
  const definition = definitions[kind]; const [rows, setRows] = useState<Row[]>([]); const [loading, setLoading] = useState(true);
  useEffect(() => { let cancelled = false; const client = supabase; if (!client) { queueMicrotask(() => { if (!cancelled) setLoading(false); }); return () => { cancelled = true; }; } void client.from(definition.table).select(definition.select).order('created_at', { ascending: false }).limit(100).then(({ data }) => { if (cancelled) return; setRows((data as Row[] | null) ?? []); setLoading(false); }); return () => { cancelled = true; }; }, [definition]);
  return <div className="overflow-hidden rounded-lg border border-slate-200 bg-white"><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-600"><tr>{definition.columns.map(([key, label]) => <th key={key} className="px-4 py-3">{label}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={String(row.id ?? row.user_id ?? index)} className="border-t border-slate-200">{definition.columns.map(([key]) => <td key={key} className={`max-w-[320px] truncate px-4 py-3 ${key.includes('id') || key.includes('hash') ? 'font-mono text-xs' : ''}`}>{key.includes('_at') ? date(row[key]) : cell(row[key])}</td>)}</tr>)}</tbody></table></div>{loading ? <p className="p-8 text-center text-sm text-slate-500">Đang tải dữ liệu…</p> : rows.length === 0 && <p className="p-8 text-center text-sm text-slate-500">Không có dữ liệu hoặc phiên MFA đã hết hạn.</p>}</div>;
}

export function AdminContacts() {
  const [rows, setRows] = useState<Row[]>([]); async function load() { if (!supabase) return; const { data } = await supabase.from('contact_requests').select('id,name,email,company,kind,message,status,created_at').order('created_at', { ascending: false }).limit(100); setRows((data as Row[] | null) ?? []); } useEffect(() => { queueMicrotask(() => void load()); }, []);
  async function update(id: string, status: string) { if (!supabase) return; await supabase.from('contact_requests').update({ status }).eq('id', id); await load(); }
  return <div className="space-y-4">{rows.map((row) => <article key={String(row.id)} className="rounded-lg border border-slate-200 bg-white p-5"><div className="flex flex-col justify-between gap-4 sm:flex-row"><div><h2 className="font-semibold">{cell(row.name)} · {cell(row.kind)}</h2><p className="mt-1 text-sm text-slate-500">{cell(row.email)} · {date(row.created_at)}</p><p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">{cell(row.message)}</p></div><select value={String(row.status)} onChange={(event) => void update(String(row.id), event.target.value)} className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm"><option value="new">Mới</option><option value="in_progress">Đang xử lý</option><option value="closed">Đã đóng</option></select></div></article>)}</div>;
}
