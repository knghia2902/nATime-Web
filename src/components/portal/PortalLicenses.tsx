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
      <div className="stagger-fade-in space-y-6">
        <form onSubmit={approve} className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm border-t-4 border-t-blue-600">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground mb-0.5">Liên kết một máy nATime</h2>
              <p className="text-sm font-medium text-muted">
                Tạo mã tại Cài đặt → Bản quyền trên máy cần kích hoạt, sau đó nhập mã tại đây.
              </p>
            </div>
          </div>

          {activeLicenses.length === 0 && (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 flex items-start gap-3 font-medium">
              <svg className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                Tài khoản này chưa có gói license đang hoạt động nên chưa thể liên kết máy. Hãy nhận trial tại{' '}
                <Link href="/portal" className="font-bold underline hover:text-amber-950">Tổng quan</Link>
                {' '}hoặc mua gói tại{' '}
                <Link href="/pricing" className="font-bold underline hover:text-amber-950">Bảng giá</Link>
                {' '}trước.
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-5 md:grid-cols-[1fr_1fr_auto]">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                Gói license
              </label>
              <div className="relative">
                <select
                  required
                  disabled={activeLicenses.length === 0}
                  value={selected}
                  onChange={(event) => setSelected(event.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-semibold text-foreground shadow-xs transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-muted/50 disabled:text-muted appearance-none pr-10"
                >
                  <option value="">Chọn gói</option>
                  {activeLicenses.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.plan_code} · {item.id.slice(0, 8).toUpperCase()}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                Mã liên kết
              </label>
              <div className="input-group">
                <input
                  required
                  disabled={activeLicenses.length === 0}
                  value={code}
                  onChange={(event) => setCode(event.target.value.toUpperCase())}
                  maxLength={32}
                  className="w-full rounded-xl border border-border bg-card py-2.5 pr-3.5 font-mono text-sm font-bold tracking-wider text-foreground uppercase shadow-xs transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-muted/50 disabled:text-muted placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:text-muted"
                  placeholder="ABCD-EFGH"
                />
                <svg className="input-icon text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>

            <div className="flex items-end">
              <button
                disabled={busy || activeLicenses.length === 0}
                className="btn-gradient w-full md:w-auto h-[42px] px-6 text-sm font-bold tracking-wide"
              >
                {busy ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Đang phê duyệt…
                  </span>
                ) : (
                  'Phê duyệt'
                )}
              </button>
            </div>
          </div>

          {message && (
            <div className="mt-5 rounded-xl bg-muted/50 border border-border p-4 text-sm font-semibold text-foreground flex items-center gap-2.5">
              <svg className="h-5 w-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{message}</span>
            </div>
          )}
        </form>

        <div className="space-y-6">
          {licenses.length === 0 && (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm font-medium text-muted shadow-sm">
              Tài khoản chưa có license. Bạn cần nhận trial hoặc mua gói trước khi liên kết máy.
            </div>
          )}

          {licenses.map((license) => {
            const activeDevices = (license.license_installations ?? []).filter((item) => item.status === 'active');

            return (
              <article key={license.id} className="rounded-2xl border border-border bg-card p-6 sm:p-8 mb-6 shadow-sm overflow-hidden relative">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-xl font-bold capitalize text-foreground">{license.plan_code}</h2>
                      <span className={`badge-status ${license.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
                        <span className="badge-dot" />
                        {license.status}
                      </span>
                      {license.origin && (
                        <span className="rounded-full bg-blue-50 px-3 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
                          {license.origin}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono font-bold text-muted flex items-center gap-1.5">
                      <span className="text-muted/70">ID:</span>
                      LIC-{license.id.slice(0, 8).toUpperCase()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-4 rounded-xl bg-muted/20 border border-border/80">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted">
                        <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Nhân sự</span>
                      </div>
                      <p className="text-lg font-black text-foreground">{license.max_employees}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted">
                        <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>MCC</span>
                      </div>
                      <p className="text-lg font-black text-foreground">
                        {activeDevices.length}<span className="text-muted font-medium text-sm">/{license.max_attendance_devices}</span>
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted">
                        <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>FaceID</span>
                      </div>
                      <p className="text-lg font-black text-foreground">
                        0<span className="text-muted font-medium text-sm">/{license.max_faceid_devices}</span>
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted">
                        <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Hết hạn</span>
                      </div>
                      <p className="text-sm font-extrabold text-foreground pt-0.5">
                        {license.expires_at ? new Intl.DateTimeFormat('vi-VN').format(new Date(license.expires_at)) : 'Không giới hạn'}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted">
                        <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <span>Module</span>
                      </div>
                      <p className="text-xs font-bold text-foreground pt-1">
                        {license.enabled_modules.join(', ') || '—'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-border/80 pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                      <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Máy đã kích hoạt ({activeDevices.length})
                    </h3>
                  </div>

                  {activeDevices.length === 0 ? (
                    <p className="text-sm text-muted font-medium italic bg-muted/20 p-4 rounded-xl border border-dashed border-border">
                      Chưa có máy nào.
                    </p>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-border">
                      <table className="table-enhanced">
                        <thead>
                          <tr>
                            <th>Tên máy</th>
                            <th>Hardware ID</th>
                            <th>Kích hoạt</th>
                            <th>Xác minh gần nhất</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeDevices.map((device) => (
                            <tr key={device.id}>
                              <td className="font-bold text-foreground">
                                <div className="flex items-center gap-2">
                                  <span className="badge-status badge-active p-0 bg-transparent">
                                    <span className="badge-dot" />
                                  </span>
                                  <span>{device.display_name || 'Máy nATime'}</span>
                                </div>
                              </td>
                              <td>
                                <code className="font-mono text-xs font-bold text-muted bg-muted/50 px-2.5 py-1 rounded border border-border select-all">
                                  {device.hardware_id_hash.slice(0, 12)}…{device.hardware_id_hash.slice(-8)}
                                </code>
                              </td>
                              <td className="text-muted font-medium">
                                {new Intl.DateTimeFormat('vi-VN').format(new Date(device.activated_at))}
                              </td>
                              <td className="text-muted font-medium">
                                {device.last_validated_at ? new Intl.DateTimeFormat('vi-VN').format(new Date(device.last_validated_at)) : '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </PortalShell>
  );
}
