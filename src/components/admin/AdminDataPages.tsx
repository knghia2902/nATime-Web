'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Row = Record<string, unknown>;

function date(value: unknown) {
  if (value == null || String(value).trim() === '') return '—';
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
  if (value == null || String(value).trim() === '') return '—';
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

function formatShortId(value: string) {
  if (value.length > 16 && (value.includes('-') || value.length > 24)) {
    return `${value.slice(0, 8)}...${value.slice(-4)}`;
  }
  return value;
}

function CopyableId({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (value === '—') return;
    void navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  if (value === '—') return <span className="text-white/40 font-normal text-left">—</span>;

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Click để sao chép full: ${value}`}
      className="group relative inline-flex items-center justify-start gap-1 rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-xs font-normal text-white/70 hover:bg-white/10 hover:text-white transition-colors border border-white/10 cursor-pointer text-left shrink-0"
    >
      <span className="truncate">{formatShortId(value)}</span>
      {copied ? (
        <span className="shrink-0 text-[10px] font-sans font-medium text-emerald-400 bg-emerald-500/20 px-1 rounded">
          Đã chép!
        </span>
      ) : (
        <svg
          className="h-3 w-3 shrink-0 text-white/40 opacity-40 group-hover:opacity-100 transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
    </button>
  );
}

// ── Clean & Minimalist Event Badge ──
function AuditEventBadge({ eventType }: { eventType: string }) {
  const type = eventType.toLowerCase();

  let label = eventType;
  if (type === 'activation.requested') label = 'Yêu cầu kích hoạt';
  else if (type === 'activation.approved') label = 'Đã duyệt kích hoạt';
  else if (type === 'authority.issued') label = 'Cấp bản quyền';
  else if (type === 'activation.reissued' || type === 'authority.reissued') label = 'Cấp lại bản quyền';
  else if (type === 'authority.renewed') label = 'Gia hạn bản quyền';
  else if (type === 'authority.revoked') label = 'Thu hồi bản quyền';
  else if (type === 'trial.claimed') label = 'Dùng thử 7 ngày';
  else if (type === 'trial.expired') label = 'Hết hạn dùng thử';
  else if (type === 'entitlement.modules.test_enabled') label = 'Bật module thử nghiệm';

  return (
    <span className="inline-block rounded bg-white/[0.06] px-2.5 py-0.5 text-xs font-normal text-white/80 border border-white/10 text-left shrink-0">
      {label}
    </span>
  );
}

// ── Clean Audit User Cell (No icon, text left) ──
function AuditUserCell({ userId, profilesMap }: { userId: unknown; profilesMap?: Record<string, string> }) {
  const str = cell(userId);
  if (str === '—') {
    return <span className="text-white/40 font-normal text-xs text-left">Tự động</span>;
  }

  const friendlyName = profilesMap?.[str];
  if (friendlyName && friendlyName.trim() !== '') {
    return (
      <span className="font-semibold text-white text-xs text-left" title={`UUID: ${str}`}>
        {friendlyName}
      </span>
    );
  }

  return (
    <span className="font-normal text-white/70 text-xs text-left" title={`UUID đầy đủ: ${str}`}>
      Admin <span className="font-mono text-white/40 text-[11px]">({str.slice(0, 8)})</span>
    </span>
  );
}

// ── Clean Audit Details Formatter (No "Lần #1, Lần #2") ──
function AuditDetailsFormatter({ details }: { details: unknown }) {
  if (!details || typeof details !== 'object') {
    return <span className="text-white/40 font-normal text-left">—</span>;
  }

  const obj = details as Record<string, unknown>;

  if (obj.displayName) {
    return (
      <span className="text-xs text-white/70 font-normal text-left">
        Tên máy: <span className="font-semibold text-white">{String(obj.displayName)}</span>
      </span>
    );
  }

  if (obj.authorityLicenseId) {
    return (
      <span className="text-xs text-white/70 font-normal inline-flex items-center justify-start gap-1.5 text-left">
        Bản quyền <CopyableId value={String(obj.authorityLicenseId)} />
      </span>
    );
  }

  if (obj.durationDays) {
    return (
      <span className="text-xs text-white/70 font-normal text-left">
        Thời hạn: <span className="font-semibold text-white">{String(obj.durationDays)} ngày</span>
      </span>
    );
  }

  const keys = Object.keys(obj);
  if (keys.length === 0) return <span className="text-white/40 font-normal text-left">—</span>;

  return (
    <span className="text-xs font-mono text-white/60 truncate block max-w-[280px] text-left" title={JSON.stringify(obj)}>
      {JSON.stringify(obj)}
    </span>
  );
}

// ── Clean Audit Correlation ID Cell ──
function AuditCorrelationTag({ correlationId }: { correlationId: unknown }) {
  const str = cell(correlationId);
  if (str === '—') return <span className="text-white/40 font-normal text-left">—</span>;

  const parts = str.split(':');
  const cleanVal = parts.length >= 2 ? parts.slice(1).join(':') : str;

  return <CopyableId value={cleanVal} />;
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  let style = 'bg-white/[0.06] text-white/60 border-white/10';
  let dotStyle = 'bg-white/40';
  let label = status;

  if (['active', 'published', 'verified', 'completed', 'paid', 'success'].includes(normalized)) {
    style = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    dotStyle = 'bg-emerald-400';
    if (['paid', 'completed', 'success'].includes(normalized)) label = 'Đã thanh toán';
    else if (normalized === 'active') label = 'Hoạt động';
    else if (normalized === 'published') label = 'Đã phát hành';
    else if (normalized === 'verified') label = 'Đã xác minh';
  } else if (['pending', 'in_progress', 'draft', 'processing'].includes(normalized)) {
    style = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    dotStyle = 'bg-amber-400';
    if (['pending', 'processing'].includes(normalized)) label = 'Chờ xử lý';
    else if (normalized === 'in_progress') label = 'Đang xử lý';
    else if (normalized === 'draft') label = 'Bản nháp';
  } else if (['new', 'open'].includes(normalized)) {
    style = 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    dotStyle = 'bg-sky-400';
    label = 'Mới';
  } else if (['closed', 'disabled', 'cancelled', 'withdrawn', 'failed', 'expired'].includes(normalized)) {
    style = 'bg-white/[0.04] text-white/40 border-white/[0.08]';
    dotStyle = 'bg-white/30';
    if (normalized === 'cancelled') label = 'Đã hủy';
    else if (normalized === 'failed') label = 'Thất bại';
    else if (normalized === 'expired') label = 'Hết hạn';
    else if (normalized === 'closed') label = 'Đã đóng';
    else if (normalized === 'disabled') label = 'Vô hiệu';
    else if (normalized === 'withdrawn') label = 'Đã rút';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyle}`} />
      {label}
    </span>
  );
}

// ── Clean Admin Overview Page ──
export function AdminOverview() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [recentAudits, setRecentAudits] = useState<Row[]>([]);
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

    void Promise.all([
      ...tables.map(async (table) => ({
        table,
        count: (await client.from(table).select('*', { count: 'exact', head: true })).count ?? 0
      })),
      client.from('license_audit_entries').select('id,event_type,details,created_at').order('created_at', { ascending: false }).limit(5)
    ]).then(([pProfile, lOrder, lEnt, lInst, cReq, sRel, auditRes]) => {
      setCounts((prev) => ({
        ...prev,
        portal_profiles: pProfile.count ?? 0,
        license_orders: lOrder.count ?? 0,
        license_entitlements: lEnt.count ?? 0,
        license_installations: lInst.count ?? 0,
        contact_requests: cReq.count ?? 0,
        software_releases: sRel.count ?? 0
      }));
      setRecentAudits((auditRes as { data: Row[] | null }).data ?? []);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    let cancelled = false;

    void client
      .from('site_counters')
      .select('count')
      .eq('name', 'page_views')
      .single()
      .then(({ data }) => {
        if (!cancelled && data && typeof data.count === 'number') {
          setCounts((prev) => ({ ...prev, page_views: data.count }));
        }
      });

    return () => { cancelled = true; };
  }, []);

  const cardConfigs = [
    {
      key: 'portal_profiles',
      label: 'Khách hàng',
      value: counts.portal_profiles,
      tagline: 'Tài khoản hoạt động',
      iconBg: 'bg-white/[0.06] text-white border border-white/10',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      key: 'license_orders',
      label: 'Đơn hàng',
      value: counts.license_orders,
      tagline: 'Thanh toán PayOS',
      iconBg: 'bg-white/[0.06] text-white border border-white/10',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      key: 'license_entitlements',
      label: 'License',
      value: counts.license_entitlements,
      tagline: 'Bản quyền đã cấp',
      iconBg: 'bg-white/[0.06] text-white border border-white/10',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      )
    },
    {
      key: 'license_installations',
      label: 'Thiết bị',
      value: counts.license_installations,
      tagline: 'Máy đã kích hoạt',
      iconBg: 'bg-white/[0.06] text-white border border-white/10',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      key: 'contact_requests',
      label: 'Liên hệ mới',
      value: counts.contact_requests,
      tagline: 'Yêu cầu hỗ trợ',
      iconBg: 'bg-white/[0.06] text-white border border-white/10',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      key: 'page_views',
      label: 'Truy cập Web',
      value: counts.page_views,
      tagline: 'Lượt xem trang natime.vn',
      iconBg: 'bg-white/[0.06] text-white border border-white/10',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      key: 'software_releases',
      label: 'Release',
      value: counts.software_releases,
      tagline: 'Bộ cài Windows',
      iconBg: 'bg-white/[0.06] text-white border border-white/10',
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-8 stagger-fade-in">
      {/* Top KPI Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cardConfigs.map(({ label, value, tagline, iconBg, icon }) => (
          <article
            key={label}
            className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 shadow-sm transition-all duration-200 hover:border-white/20 flex flex-col justify-between backdrop-blur"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">{label}</span>
                <p className="text-2xl font-bold text-white tracking-tight mt-1">
                  {value != null ? (
                    value.toLocaleString('vi-VN')
                  ) : (
                    <span className="text-white/30">—</span>
                  )}
                </p>
              </div>
              <div className={`p-3 rounded-2xl ${iconBg}`}>
                {icon}
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/50">
              <span className="font-normal">{tagline}</span>
              <span className="inline-flex items-center gap-1 font-semibold text-white bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                Live
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Recent Activity Timeline Section */}
      <div className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
          <div>
            <h2 className="text-base font-semibold text-white">Hoạt động vận hành gần đây</h2>
            <p className="text-xs text-white/50 font-normal mt-0.5">Nhật ký sự kiện license và kích hoạt thiết bị thời gian thực.</p>
          </div>
          <span className="text-xs font-normal text-white/60 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
            Realtime Audit Log
          </span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-white/40">Đang tải nhật ký hoạt động…</div>
        ) : recentAudits.length === 0 ? (
          <div className="p-8 text-center text-xs text-white/40">Chưa có nhật ký hoạt động nào.</div>
        ) : (
          <div className="space-y-3">
            {recentAudits.map((item) => (
              <div key={String(item.id)} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition">
                <div className="flex items-center gap-3">
                  <AuditEventBadge eventType={String(item.event_type ?? '')} />
                  <AuditDetailsFormatter details={item.details} />
                </div>
                <span className="text-xs font-normal text-white/40 shrink-0">
                  {date(item.created_at)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
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
      ['created_at', 'Ngày tạo'],
      ['actions', 'Thao tác']
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
      ['user_id', 'Người thực hiện'],
      ['correlation_id', 'Mã vết'],
      ['details', 'Chi tiết'],
      ['created_at', 'Thời gian']
    ]
  }
} as const;

function isCenteredHeader(kind: string, colKey: string): boolean {
  if (kind === 'audit') {
    return false;
  }
  return false;
}

export function AdminTablePage({ kind }: { kind: keyof typeof definitions }) {
  const definition = definitions[kind];
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterEvent, setFilterEvent] = useState<string>('all');
  const [profilesMap, setProfilesMap] = useState<Record<string, string>>({});
  const [busyOrderId, setBusyOrderId] = useState<string | null>(null);

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) return;
    if (!supabase) return;
    setBusyOrderId(orderId);
    await supabase.rpc('cancel_license_order', { p_order_id: orderId });
    const { error } = await supabase
      .from('license_orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId);
    setBusyOrderId(null);
    setRows((prev) =>
      prev.map((r) => (String(r.id) === orderId ? { ...r, status: 'cancelled' } : r))
    );
  };

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

    const fetchData = async () => {
      if (kind === 'orders') {
        try {
          await client.rpc('cleanup_expired_license_orders');
        } catch {
          // ignore RPC errors
        }
      }

      const [tableRes, profileRes] = await Promise.all([
        client.from(definition.table).select(definition.select).order('created_at', { ascending: false }).limit(100),
        client.from('portal_profiles').select('user_id,display_name,organization_name')
      ]);

      if (cancelled) return;

      if (profileRes.data) {
        const map: Record<string, string> = {};
        for (const p of profileRes.data) {
          const name = p.display_name || p.organization_name;
          if (p.user_id && name) map[p.user_id] = name;
        }
        setProfilesMap(map);
      }

      const rawRows = (tableRes.data as Row[] | null) ?? [];
      const mappedRows = rawRows.map((r) => {
        if (kind === 'orders' && r.status === 'pending' && r.created_at) {
          const ageMs = Date.now() - new Date(String(r.created_at)).getTime();
          if (ageMs > 15 * 60 * 1000) {
            return { ...r, status: 'cancelled' };
          }
        }
        return r;
      });

      setRows(mappedRows);
      setLoading(false);
    };

    void fetchData();

    return () => {
      cancelled = true;
    };
  }, [definition, kind]);

  const isAudit = kind === 'audit';
  const filteredRows = isAudit && filterEvent !== 'all'
    ? rows.filter((r) => String(r.event_type ?? '').toLowerCase().includes(filterEvent))
    : rows;

  return (
    <div className="space-y-4">
      {/* Event Filter for Audit Page */}
      {isAudit && (
        <div className="flex items-center justify-between gap-3 bg-[rgba(15,23,38,0.75)] p-3 rounded-xl border border-white/[0.08] backdrop-blur flex-wrap">
          <span className="text-xs font-normal text-white/50">Lọc sự kiện:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              ['all', 'Tất cả'],
              ['requested', 'Yêu cầu kích hoạt'],
              ['approved', 'Đã duyệt'],
              ['issued', 'Cấp bản quyền'],
              ['revoked', 'Thu hồi'],
              ['trial', 'Trial 7 ngày']
            ].map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setFilterEvent(val)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition cursor-pointer ${
                  filterEvent === val
                    ? 'bg-white text-[#0a1628] font-bold shadow-xs'
                    : 'bg-white/[0.06] text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] shadow-sm overflow-hidden backdrop-blur">
        <div className="overflow-x-auto">
          <table className="table-enhanced w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                {definition.columns.map(([key, label]) => {
                  const centered = isCenteredHeader(kind, key);
                  return (
                    <th
                      key={key}
                      className={`px-4 py-3 font-semibold text-xs text-white/50 uppercase tracking-wider align-middle ${
                        centered ? 'text-center' : 'text-left'
                      }`}
                    >
                      <div className={`flex items-center w-full ${centered ? 'justify-center text-center' : 'justify-start text-left'}`}>
                        {label}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredRows.map((row, index) => (
                <tr
                  key={String(row.id ?? row.user_id ?? index)}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  {definition.columns.map(([key]) => {
                    const val = row[key];
                    const isIdOrHash = key.includes('id') || key.includes('hash');

                    let renderedContent;
                    if (key === 'status') {
                      renderedContent = <StatusBadge status={String(val ?? '')} />;
                    } else if (key === 'event_type') {
                      renderedContent = <AuditEventBadge eventType={String(val ?? '')} />;
                    } else if (key === 'user_id' && isAudit) {
                      renderedContent = <AuditUserCell userId={val} profilesMap={profilesMap} />;
                    } else if (key === 'details') {
                      renderedContent = <AuditDetailsFormatter details={val} />;
                    } else if (key === 'correlation_id') {
                      renderedContent = <AuditCorrelationTag correlationId={val} />;
                    } else if (key.includes('_at')) {
                      renderedContent = (
                        <span className="text-white/50 font-normal text-xs">{date(val)}</span>
                      );
                    } else if (key === 'amount_vnd') {
                      renderedContent = (
                        <span className="font-semibold text-white text-sm">
                          {formatCurrency(val)}
                        </span>
                      );
                    } else if (key === 'actions') {
                      if (kind === 'orders' && row.status === 'pending') {
                        const isBusy = busyOrderId === String(row.id);
                        renderedContent = (
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleCancelOrder(String(row.id))}
                            className="px-2.5 py-1 text-xs font-semibold text-rose-300 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/20 rounded-lg transition cursor-pointer disabled:opacity-50"
                          >
                            {isBusy ? 'Đang hủy...' : 'Hủy đơn'}
                          </button>
                        );
                      } else {
                        renderedContent = <span className="text-white/30 text-xs font-normal">—</span>;
                      }
                    } else if (isIdOrHash) {
                      renderedContent = <CopyableId value={cell(val)} />;
                    } else {
                      const strVal = cell(val);
                      renderedContent = (
                        <span className={`font-normal ${strVal === '—' ? 'text-white/40' : 'text-white'}`}>
                          {strVal}
                        </span>
                      );
                    }

                    return (
                      <td
                        key={key}
                        className="px-4 py-3 text-white align-middle text-left"
                      >
                        <div className="flex items-center w-full justify-start text-left">
                          {renderedContent}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-white/50">
            <svg className="h-6 w-6 animate-spin text-white mb-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-sm font-medium">Đang tải dữ liệu…</p>
          </div>
        ) : (
          filteredRows.length === 0 && (
            <div className="p-12 text-center text-sm font-normal text-white/40">
              <svg className="mx-auto h-8 w-8 text-white/30 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p>Không tìm thấy nhật ký phù hợp với bộ lọc.</p>
            </div>
          )
        )}
      </div>
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
        <div className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-8 text-center text-sm font-medium text-white/50 shadow-sm backdrop-blur">
          <svg className="mx-auto h-6 w-6 animate-spin text-white mb-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p>Đang tải danh sách liên hệ…</p>
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-8 text-center text-sm font-normal text-white/40 shadow-sm backdrop-blur">
          Chưa có yêu cầu liên hệ nào.
        </div>
      ) : (
        rows.map((row) => (
          <article
            key={String(row.id)}
            className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 shadow-sm transition-all hover:border-white/20 backdrop-blur"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-semibold text-white text-base">
                    {cell(row.name)}
                  </h2>
                  <span className="inline-flex items-center rounded-md bg-white/[0.06] px-2.5 py-0.5 text-xs font-normal text-white/70 border border-white/10">
                    {cell(row.kind)}
                  </span>
                  <StatusBadge status={String(row.status ?? 'new')} />
                </div>

                <div className="flex items-center gap-3 text-xs text-white/50 flex-wrap">
                  <span className="inline-flex items-center gap-1 font-normal">
                    <svg className="h-3.5 w-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {cell(row.email)}
                  </span>
                  <span>·</span>
                  {row.company ? (
                    <>
                      <span className="inline-flex items-center gap-1 font-normal">
                        <svg className="h-3.5 w-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {cell(row.company)}
                      </span>
                      <span>·</span>
                    </>
                  ) : null}
                  <span className="font-normal">{date(row.created_at)}</span>
                </div>

                <div className="mt-3 rounded-xl bg-[#0a1220] p-4 border border-white/[0.08]">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/80 font-normal">
                    {cell(row.message)}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <label className="block text-xs font-medium text-white/50 mb-1 sm:sr-only">
                  Trạng thái
                </label>
                <select
                  value={String(row.status)}
                  onChange={(event) => void update(String(row.id), event.target.value)}
                  className="h-9 rounded-lg border border-white/[0.12] bg-[#0a1220] px-3 text-xs font-medium text-white shadow-xs focus:border-white/40 focus:outline-none cursor-pointer"
                >
                  <option value="new" className="bg-[#0a1220] text-white">Mới</option>
                  <option value="in_progress" className="bg-[#0a1220] text-white">Đang xử lý</option>
                  <option value="closed" className="bg-[#0a1220] text-white">Đã đóng</option>
                </select>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
