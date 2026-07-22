'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabase';
import PortalShell from './PortalShell';

type Installation = { id: string; display_name: string | null; hardware_id_hash: string; status: string; activated_at: string; last_validated_at: string | null };
type Entitlement = { id: string; plan_code: string; origin?: string; status: string; max_employees: number; max_devices: number; enabled_modules: string[]; starts_at: string | null; expires_at: string | null; license_installations: Installation[] | null };

export default function PortalLicenses() {
  const { user } = useAuth();
  const [licenses, setLicenses] = useState<Entitlement[]>([]);
  const [selected, setSelected] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    if (!user || !supabase) return;
    const { data } = await supabase.from('license_entitlements').select('id,plan_code,origin,status,max_employees,max_devices,enabled_modules,starts_at,expires_at,license_installations(id,display_name,hardware_id_hash,status,activated_at,last_validated_at)').eq('user_id', user.id).order('created_at', { ascending: false });
    const rows = (data as Entitlement[] | null) ?? [];
    setLicenses(rows); setSelected((current) => current || rows.find((item) => item.status === 'active')?.id || '');
  }, [user]);
  useEffect(() => { queueMicrotask(() => void load()); }, [load]);
  async function approve(event: FormEvent) {
    event.preventDefault(); if (!supabase || !selected || !code.trim()) return;
    setBusy(true); setMessage('');
    const { error } = await supabase.functions.invoke('license-activation', { body: { action: 'approve', userCode: code.trim().toUpperCase(), entitlementId: selected } });
    setBusy(false); setMessage(error ? 'Không thể phê duyệt mã. Kiểm tra mã, thời hạn và giới hạn thiết bị.' : 'Đã phê duyệt. Máy cài nATime sẽ nhận license đã ký.');
    if (!error) { setCode(''); await load(); }
  }
  return <PortalShell title="License" description="Gói, module, hạn dùng và máy đã kích hoạt.">
    <form onSubmit={approve} className="rounded-lg border border-slate-200 bg-white p-6"><h2 className="text-lg font-semibold">Liên kết một máy nATime</h2><p className="mt-2 text-sm text-slate-600">Tạo mã tại Cài đặt → Bản quyền trên máy cần kích hoạt, sau đó nhập mã tại đây.</p><div className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr_auto]"><label className="text-sm font-semibold">Gói license<select required value={selected} onChange={(event) => setSelected(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 font-normal"><option value="">Chọn gói</option>{licenses.filter((item) => item.status === 'active').map((item) => <option value={item.id} key={item.id}>{item.plan_code} · {item.id.slice(0, 8).toUpperCase()}</option>)}</select></label><label className="text-sm font-semibold">Mã liên kết<input required value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} maxLength={32} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-mono font-normal uppercase" placeholder="ABCD-EFGH" /></label><button disabled={busy} className="self-end rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60">{busy ? 'Đang phê duyệt…' : 'Phê duyệt'}</button></div>{message && <p className="mt-4 text-sm text-slate-700">{message}</p>}</form>
    <div className="mt-6 space-y-5">{licenses.length === 0 && <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">Tài khoản chưa có license. Bạn có thể nhận trial tại trang Tổng quan.</div>}{licenses.map((license) => { const activeDevices = (license.license_installations ?? []).filter((item) => item.status === 'active'); return <article key={license.id} className="rounded-lg border border-slate-200 bg-white p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row"><div><div className="flex items-center gap-2"><h2 className="text-lg font-semibold capitalize">{license.plan_code}</h2><span className={`rounded px-2 py-1 text-xs font-semibold ${license.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>{license.status}</span>{license.origin && <span className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">{license.origin}</span>}</div><p className="mt-2 text-sm text-slate-500">LIC-{license.id.slice(0, 8).toUpperCase()}</p></div><dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm"><div><dt className="text-slate-500">Nhân sự</dt><dd className="font-semibold">{license.max_employees}</dd></div><div><dt className="text-slate-500">Thiết bị</dt><dd className="font-semibold">{activeDevices.length}/{license.max_devices}</dd></div><div><dt className="text-slate-500">Hết hạn</dt><dd className="font-semibold">{license.expires_at ? new Intl.DateTimeFormat('vi-VN').format(new Date(license.expires_at)) : 'Không giới hạn'}</dd></div><div><dt className="text-slate-500">Module</dt><dd className="font-semibold">{license.enabled_modules.join(', ') || '—'}</dd></div></dl></div>
      <div className="mt-5 border-t border-slate-200 pt-5"><h3 className="text-sm font-semibold">Máy đã kích hoạt</h3>{activeDevices.length === 0 ? <p className="mt-3 text-sm text-slate-500">Chưa có máy nào.</p> : <div className="mt-3 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-slate-200 text-slate-500"><th className="py-2 pr-4">Tên máy</th><th className="py-2 pr-4">Hardware ID</th><th className="py-2 pr-4">Kích hoạt</th><th className="py-2">Xác minh gần nhất</th></tr></thead><tbody>{activeDevices.map((device) => <tr key={device.id} className="border-b border-slate-100"><td className="py-3 pr-4 font-medium">{device.display_name || 'Máy nATime'}</td><td className="py-3 pr-4 font-mono text-xs">{device.hardware_id_hash.slice(0, 12)}…{device.hardware_id_hash.slice(-8)}</td><td className="py-3 pr-4">{new Intl.DateTimeFormat('vi-VN').format(new Date(device.activated_at))}</td><td className="py-3">{device.last_validated_at ? new Intl.DateTimeFormat('vi-VN').format(new Date(device.last_validated_at)) : '—'}</td></tr>)}</tbody></table></div>}</div></article>; })}</div>
  </PortalShell>;
}
