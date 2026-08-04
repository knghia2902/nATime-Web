'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Row = Record<string, unknown>;

function date(value: unknown) {
  return typeof value === 'string'
    ? new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(value))
    : '—';
}

function cell(value: unknown) {
  if (value == null) return '—';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function formatCurrency(amount: unknown) {
  if (typeof amount === 'number') {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }
  return cell(amount);
}

function CopyableId({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (value === '—') return;
    void navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  if (value === '—') return <span className="text-muted">—</span>;

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Click để sao chép: ${value}`}
      className="group relative inline-flex items-center gap-1.5 rounded-lg bg-muted/50 px-2.5 py-1 font-mono text-xs font-bold text-foreground hover:bg-blue-50 hover:text-blue-700 transition-colors border border-border text-left max-w-full truncate cursor-pointer"
    >
      <span className="truncate">{value}</span>
      {copied ? (
        <span className="shrink-0 text-[10px] font-sans font-bold text-emerald-700 bg-emerald-100 px-1 rounded">
          Đã chép!
        </span>
      ) : (
        <svg
          className="h-3 w-3 shrink-0 text-muted opacity-0 group-hover:opacity-100 transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 002-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  let style = 'bg-muted/50 text-foreground border-border';
  let dotStyle = 'bg-muted';
  let label = status;

  if (['active', 'published', 'verified', 'completed', 'paid', 'success'].includes(normalized)) {
    style = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    dotStyle = 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]';
  } else if (['pending', 'in_progress', 'draft', 'processing'].includes(normalized)) {
    style = 'bg-amber-50 text-amber-800 border-amber-200';
    dotStyle = 'bg-amber-500';
  } else if (['new', 'open'].includes(normalized)) {
    style = 'bg-blue-50 text-blue-800 border-blue-200';
    dotStyle = 'bg-blue-500';
  } else if (['closed', 'disabled', 'cancelled', 'withdrawn', 'failed'].includes(normalized)) {
    style = 'bg-muted/50 text-muted border-border';
    dotStyle = 'bg-muted';
  }

  if (normalized === 'new') label = 'Mới';
  if (normalized === 'in_progress') label = 'Đang xử lý';
  if (normalized === 'closed') label = 'Đã đóng';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${style}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyle}`} />
      {label}
    </span>
  );
}

export function AdminOverview() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = supabase;
    if (!client) {
      setLoading(false);
      return;
    }
    const tables = [
      'portal_profiles',
      'license_orders',
      'license_entitlements',
      'license_installations',
      'contact_requests',
      'software_releases'
    ] as const;

    void Promise.all(
      tables.map(async (table) => ({
        table,
        count: (await client.from(table).select('*', { count: 'exact', head: true })).count ?? 0
      }))
    )
      .then((items) => {
        setCounts(Object.fromEntries(items.map((item) => [item.table, item.count])));
      })
      .finally(() => setLoading(false));
  }, []);

  const cardConfigs = [
    {
      key: 'portal_profiles',
      label: 'Khách hàng',
      value: counts.portal_profiles,
      accentGradient: 'from-blue-500 to-blue-500',
      iconBg: 'bg-blue-50 text-blue-600',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      key: 'license_orders',
      label: 'Đơn hàng',
      value: counts.license_orders,
      accentGradient: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-50 text-emerald-600',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      key: 'license_entitlements',
      label: 'License',
      value: counts.license_entitlements,
      accentGradient: 'from-amber-500 to-orange-500',
      iconBg: 'bg-amber-50 text-amber-600',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      )
    },
    {
      key: 'license_installations',
      label: 'Thiết bị',
      value: counts.license_installations,
      accentGradient: 'from-blue-400 to-blue-600',
      iconBg: 'bg-blue-50 text-blue-600',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      key: 'contact_requests',
      label: 'Liên hệ mới',
      value: counts.contact_requests,
      accentGradient: 'from-rose-500 to-red-500',
      iconBg: 'bg-rose-50 text-rose-600',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      key: 'software_releases',
      label: 'Release',
      value: counts.software_releases,
      accentGradient: 'from-sky-500 to-blue-500',
      iconBg: 'bg-sky-50 text-sky-600',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {cardConfigs.map(({ label, value, accentGradient, iconBg, icon }) => (
        <article
          key={label}
          className="rounded-2xl border border-border bg-card shadow-sm p-6 flex flex-col justify-between group transition-all duration-200 hover:-translate-y-1 hover:shadow-md relative overflow-hidden"
        >
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentGradient}`} />
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-foreground">{label}</span>
            <div className={`p-2.5 rounded-xl ${iconBg} transition-transform duration-200 group-hover:scale-110`}>
              {icon}
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <p className="text-3xl font-black text-foreground tracking-tight">
              {loading ? (
                <span className="inline-block h-8 w-16 animate-pulse rounded bg-muted/50" />
              ) : value != null ? (
                value.toLocaleString('vi-VN')
              ) : (
                '—'
              )}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

const definitions = {
  customers: {
    title: 'Khách hàng',
    description: 'Hồ sơ chủ tài khoản.',
    table: 'portal_profiles',
    select: 'user_id,display_name,organization_name,created_at',
    columns: [
      ['display_name', 'Tên'],
      ['organization_name', 'Đơn vị'],
      ['user_id', 'User ID'],
      ['created_at', 'Ngày tạo']
    ]
  },
  orders: {
    title: 'Đơn hàng',
    description: 'Trạng thái PayOS và số tiền.',
    table: 'license_orders',
    select: 'id,user_id,plan_code,billing_period,amount_vnd,status,payment_provider,created_at',
    columns: [
      ['id', 'Mã'],
      ['plan_code', 'Gói'],
      ['billing_period', 'Chu kỳ'],
      ['amount_vnd', 'Số tiền'],
      ['status', 'Trạng thái'],
      ['created_at', 'Ngày tạo']
    ]
  },
  licenses: {
    title: 'License',
    description: 'Entitlement đã cấp cho khách hàng.',
    table: 'license_entitlements',
    select: 'id,user_id,plan_code,origin,status,max_employees,max_devices,enabled_modules,expires_at',
    columns: [
      ['id', 'Mã'],
      ['plan_code', 'Gói'],
      ['origin', 'Nguồn'],
      ['status', 'Trạng thái'],
      ['max_devices', 'Thiết bị'],
      ['expires_at', 'Hết hạn']
    ]
  },
  devices: {
    title: 'Thiết bị',
    description: 'Máy đã liên kết với license.',
    table: 'license_installations',
    select: 'id,entitlement_id,display_name,hardware_id_hash,status,activated_at,last_validated_at',
    columns: [
      ['display_name', 'Tên máy'],
      ['hardware_id_hash', 'Hardware hash'],
      ['status', 'Trạng thái'],
      ['activated_at', 'Kích hoạt'],
      ['last_validated_at', 'Xác minh']
    ]
  },
  audit: {
    title: 'Audit',
    description: 'Lịch sử license và thao tác quản trị.',
    table: 'license_audit_entries',
    select: 'id,user_id,event_type,correlation_id,details,created_at',
    columns: [
      ['event_type', 'Sự kiện'],
      ['user_id', 'User'],
      ['correlation_id', 'Correlation'],
      ['details', 'Chi tiết'],
      ['created_at', 'Thời gian']
    ]
  }
} as const;

export function AdminTablePage({ kind }: { kind: keyof typeof definitions }) {
  const definition = definitions[kind];
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const client = supabase;
    if (!client) {
      queueMicrotask(() => {
        if (!cancelled) setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }
    void client
      .from(definition.table)
      .select(definition.select)
      .order('created_at', { ascending: false })
      .limit(100)
      .then(({ data }) => {
        if (cancelled) return;
        setRows((data as Row[] | null) ?? []);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [definition]);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table-enhanced w-full text-left text-sm">
          <thead>
            <tr>
              {definition.columns.map(([key, label]) => (
                <th key={key} className="px-4 py-3.5 font-bold text-muted">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {rows.map((row, index) => (
              <tr
                key={String(row.id ?? row.user_id ?? index)}
                className="hover:bg-muted/20 transition-colors"
              >
                {definition.columns.map(([key]) => {
                  const val = row[key];
                  const isIdOrHash = key.includes('id') || key.includes('hash');

                  let renderedContent;
                  if (key === 'status') {
                    renderedContent = <StatusBadge status={String(val ?? '')} />;
                  } else if (key.includes('_at')) {
                    renderedContent = (
                      <span className="text-muted font-medium">{date(val)}</span>
                    );
                  } else if (key === 'amount_vnd') {
                    renderedContent = (
                      <span className="font-black text-foreground text-base">
                        {formatCurrency(val)}
                      </span>
                    );
                  } else if (isIdOrHash) {
                    renderedContent = <CopyableId value={cell(val)} />;
                  } else {
                    renderedContent = <span className="font-semibold text-foreground">{cell(val)}</span>;
                  }

                  return (
                    <td key={key} className="max-w-[320px] truncate px-4 py-3.5 text-foreground">
                      {renderedContent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 text-muted">
          <svg className="h-6 w-6 animate-spin text-blue-600 mb-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-sm font-semibold">Đang tải dữ liệu…</p>
        </div>
      ) : (
        rows.length === 0 && (
          <div className="p-12 text-center text-sm font-medium text-muted">
            <svg className="mx-auto h-8 w-8 text-muted mb-2 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p>Không có dữ liệu hoặc phiên MFA đã hết hạn.</p>
          </div>
        )
      )}
    </div>
  );
}

export function AdminContacts() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('contact_requests')
      .select('id,name,email,company,kind,message,status,created_at')
      .order('created_at', { ascending: false })
      .limit(100);
    setRows((data as Row[] | null) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    queueMicrotask(() => void load());
  }, []);

  async function update(id: string, status: string) {
    if (!supabase) return;
    await supabase.from('contact_requests').update({ status }).eq('id', id);
    await load();
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm font-medium text-muted shadow-sm">
          <svg className="mx-auto h-6 w-6 animate-spin text-blue-600 mb-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p>Đang tải danh sách liên hệ…</p>
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm font-medium text-muted shadow-sm">
          Chưa có yêu cầu liên hệ nào.
        </div>
      ) : (
        rows.map((row) => (
          <article
            key={String(row.id)}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-bold text-foreground text-base">
                    {cell(row.name)}
                  </h2>
                  <span className="inline-flex items-center rounded-md bg-muted/50 px-2.5 py-1 text-xs font-semibold text-muted border border-border">
                    {cell(row.kind)}
                  </span>
                  <StatusBadge status={String(row.status ?? 'new')} />
                </div>

                <div className="flex items-center gap-3 text-xs text-muted flex-wrap">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {cell(row.email)}
                  </span>
                  <span>·</span>
                  {row.company ? (
                    <>
                      <span className="inline-flex items-center gap-1 font-medium">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {cell(row.company)}
                      </span>
                      <span>·</span>
                    </>
                  ) : null}
                  <span className="font-medium">{date(row.created_at)}</span>
                </div>

                <div className="mt-3 rounded-xl bg-muted/20 p-4 border border-border">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground font-normal">
                    {cell(row.message)}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <label className="block text-xs font-semibold text-muted mb-1 sm:sr-only">
                  Trạng thái
                </label>
                <select
                  value={String(row.status)}
                  onChange={(event) => void update(String(row.id), event.target.value)}
                  className="h-9 rounded-lg border border-border bg-card px-3 text-xs font-bold text-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                >
                  <option value="new">Mới</option>
                  <option value="in_progress">Đang xử lý</option>
                  <option value="closed">Đã đóng</option>
                </select>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
