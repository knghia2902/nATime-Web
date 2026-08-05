'use client';

import Link from 'next/link';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabase';
import PortalShell from './PortalShell';

type Installation = {
  id: string;
  display_name: string | null;
  hardware_id_hash: string;
  status: string;
  activated_at: string;
  last_validated_at: string | null;
};

type Entitlement = {
  id: string;
  plan_code: string;
  origin?: string;
  status: string;
  max_employees: number;
  max_devices: number;
  max_attendance_devices: number;
  max_faceid_devices: number;
  enabled_modules: string[];
  starts_at: string | null;
  expires_at: string | null;
  license_installations: Installation[] | null;
};

export default function PortalLicenses() {
  const { user } = useAuth();
  const [licenses, setLicenses] = useState<Entitlement[]>([]);
  const [selected, setSelected] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const activeLicenses = licenses.filter((item) => item.status === 'active');

  const load = useCallback(async () => {
    if (!user || !supabase) return;

    const { data } = await supabase
      .from('license_entitlements')
      .select('id,plan_code,origin,status,max_employees,max_devices,max_attendance_devices,max_faceid_devices,enabled_modules,starts_at,expires_at,license_installations(id,display_name,hardware_id_hash,status,activated_at,last_validated_at)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    const rows = (data as Entitlement[] | null) ?? [];
    const firstActive = rows.find((item) => item.status === 'active')?.id ?? '';

    setLicenses(rows);
    setSelected((current) => current || firstActive);
  }, [user]);

  useEffect(() => {
    queueMicrotask(() => void load());
  }, [load]);

  async function approve(event: FormEvent) {
    event.preventDefault();
    if (!supabase || !selected || !code.trim()) return;

    setBusy(true);
    setMessage('');

    const { error } = await supabase.functions.invoke('license-activation', {
      body: {
        action: 'approve',
        userCode: code.trim().toUpperCase(),
        entitlementId: selected,
      },
    });

    setBusy(false);
    setMessage(error
      ? 'Không thể phê duyệt mã. Kiểm tra mã liên kết, thời hạn license và giới hạn thiết bị.'
      : 'Đã phê duyệt. Máy cài nATime sẽ nhận license đã ký.');

    if (!error) {
      setCode('');
      await load();
    }
  }

  return (
    <PortalShell title="License" description="Gói, module, hạn dùng và máy đã kích hoạt.">
      <div className="space-y-8">
        {/* ── Activate Machine Form (Matching portal.html industrial style) ── */}
        <form onSubmit={approve} className="border hairline bg-white p-6 md:p-8 space-y-4">
          <div className="border-b hairline pb-4">
            <p className="font-mono text-[11px] text-teal">KÍCH HOẠT MÁY</p>
            <h2 className="font-display font-bold text-lg text-ink mt-1">Liên kết một máy nATime</h2>
            <p className="font-body text-xs text-ink/60 mt-1">
              Tạo mã tại Cài đặt → Bản quyền trên ứng dụng máy chủ nATime, sau đó nhập mã liên kết tại đây để phê duyệt.
            </p>
          </div>

          {activeLicenses.length === 0 && (
            <div className="border hairline bg-amber/10 p-4 font-body text-xs text-ink">
              Tài khoản chưa có gói license đang hoạt động. Vui lòng nhận trial tại{' '}
              <Link href="/portal" className="font-bold text-amber hover:underline">Tổng quan</Link>
              {' '}hoặc mua gói tại{' '}
              <Link href="/pricing" className="font-bold text-amber hover:underline">Bảng giá</Link>.
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-[1fr_1fr_auto]">
            <div>
              <label className="font-body text-[13px] text-ink/60 block mb-1.5">Gói license</label>
              <select
                required
                disabled={activeLicenses.length === 0}
                value={selected}
                onChange={(event) => setSelected(event.target.value)}
                className="w-full border hairline px-3.5 py-2.5 font-body text-[14px] bg-white outline-none focus:border-ink disabled:bg-paper"
              >
                <option value="">Chọn gói</option>
                {activeLicenses.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.plan_code.toUpperCase()} · LIC-{item.id.slice(0, 8).toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-body text-[13px] text-ink/60 block mb-1.5">Mã liên kết</label>
              <input
                required
                disabled={activeLicenses.length === 0}
                value={code}
                onChange={(event) => setCode(event.target.value.toUpperCase())}
                maxLength={32}
                placeholder="ABCD-EFGH"
                className="w-full border hairline px-3.5 py-2.5 font-mono text-[14px] font-bold tracking-wider bg-white outline-none focus:border-ink uppercase disabled:bg-paper"
              />
            </div>

            <div className="flex items-end">
              <button
                disabled={busy || activeLicenses.length === 0}
                className="w-full md:w-auto bg-ink text-paper font-body text-[14px] font-semibold px-6 py-2.5 hover:bg-graphite transition-colors cursor-pointer disabled:opacity-50"
              >
                {busy ? 'Đang phê duyệt…' : 'Phê duyệt'}
              </button>
            </div>
          </div>

          {message && (
            <div className="border hairline bg-paper p-3 font-mono text-xs text-ink">
              {message}
            </div>
          )}
        </form>

        {/* ── License Table (Matching portal.html 02 / LICENSE table) ── */}
        <section>
          <p className="font-mono text-[11px] text-teal tracking-wide mb-4">DANH SÁCH LICENSE</p>
          <div className="border hairline overflow-x-auto">
            <table className="w-full text-left font-body text-[13px]">
              <thead>
                <tr className="border-b hairline bg-white/60">
                  <th className="py-3 px-4 text-ink/50 font-medium">Mã license</th>
                  <th className="py-3 px-4 text-ink/50 font-medium">Gói</th>
                  <th className="py-3 px-4 text-ink/50 font-medium">Nhân sự / Thiết bị</th>
                  <th className="py-3 px-4 text-ink/50 font-medium">Hết hạn</th>
                  <th className="py-3 px-4 text-ink/50 font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[12px]">
                {licenses.length === 0 ? (
                  <tr className="bg-white">
                    <td colSpan={5} className="py-6 px-4 text-center text-ink/50 font-body">
                      Tài khoản chưa có license. Hãy nhận trial hoặc chọn mua gói bản quyền.
                    </td>
                  </tr>
                ) : (
                  licenses.map((license) => {
                    const activeDevices = (license.license_installations ?? []).filter((item) => item.status === 'active');
                    const isActive = license.status === 'active';
                    return (
                      <tr key={license.id} className="border-b hairline bg-white">
                        <td className="py-3 px-4 font-bold text-ink">
                          LIC-{license.id.slice(0, 8).toUpperCase()}
                        </td>
                        <td className="py-3 px-4 font-body font-semibold capitalize text-ink">
                          {license.plan_code}
                        </td>
                        <td className="py-3 px-4 text-ink/80">
                          {license.max_employees} nhân sự · {activeDevices.length}/{license.max_attendance_devices} MCC
                        </td>
                        <td className="py-3 px-4 text-ink/60">
                          {license.expires_at ? new Intl.DateTimeFormat('vi-VN').format(new Date(license.expires_at)) : 'Không giới hạn'}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 ${isActive ? 'bg-teal/10 text-teal' : 'bg-amber/10 text-amber'}`}>
                            {isActive ? 'Hoạt động' : license.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
