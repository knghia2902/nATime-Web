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
        minute: '2-digit',
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
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
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

  if (value === '—') return <span className="text-ink/40 font-mono text-xs">—</span>;

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Click để sao chép full: ${value}`}
      className="inline-flex items-center gap-1 font-mono text-xs text-ink/70 hover:text-ink transition-colors cursor-pointer"
    >
      <span>{formatShortId(value)}</span>
      {copied && <span className="text-[10px] text-teal font-mono">(đã chép)</span>}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  let style = 'bg-ink/5 text-ink/70';
  let label = status;

  if (['active', 'published', 'verified', 'completed', 'paid', 'success', 'hoạt động'].includes(normalized)) {
    style = 'bg-teal/10 text-teal';
    label = 'Hoạt động';
  } else if (['pending', 'in_progress', 'draft', 'processing', 'chờ', 'mới'].includes(normalized)) {
    style = 'bg-amber/10 text-amber';
    label = 'Chờ xử lý';
  } else if (['closed', 'disabled', 'cancelled', 'withdrawn', 'failed', 'hết hạn', 'quá hạn'].includes(normalized)) {
    style = 'bg-red-100 text-red-700';
    label = 'Hết hạn / Đóng';
  }

  if (normalized === 'new') label = 'Mới';
  if (normalized === 'paid') label = 'Đã thanh toán';

  return (
    <span className={`px-2 py-0.5 font-mono text-[11px] ${style}`}>
      {label}
    </span>
  );
}

// ── Redesigned Clean Admin Overview Page (Matching admin.html 01 / TỔNG QUAN) ──
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
      'software_releases',
    ] as const;

    void Promise.all([
      ...tables.map(async (table) => ({
        table,
        count: (await client.from(table).select('*', { count: 'exact', head: true })).count ?? 0,
      })),
      client.from('license_audit_entries').select('id,event_type,details,created_at').order('created_at', { ascending: false }).limit(5),
    ]).then(([pProfile, lOrder, lEnt, lInst, cReq, sRel, auditRes]) => {
      setCounts({
        portal_profiles: pProfile.count ?? 0,
        license_orders: lOrder.count ?? 0,
        license_entitlements: lEnt.count ?? 0,
        license_installations: lInst.count ?? 0,
        contact_requests: cReq.count ?? 0,
        software_releases: sRel.count ?? 0,
      });
      setRecentAudits((auditRes as { data: Row[] | null }).data ?? []);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Overview Header Section */}
      <section>
        <p className="font-mono text-[11px] text-teal tracking-wide mb-1">01 / TỔNG QUAN</p>
        <h1 className="font-display font-bold text-[24px] text-ink mb-6">Chào Admin, đây là tình hình hôm nay.</h1>

        {/* 4 Metrics Grid (Matching admin.html gap-px bg-ink/10) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10">
          <div className="bg-white p-5">
            <p className="font-body text-[12px] text-ink/50 mb-2">Khách hàng đang hoạt động</p>
            <p className="font-mono text-[26px] font-semibold text-ink">{counts.portal_profiles ?? 0}</p>
            <p className="font-mono text-[11px] text-teal mt-1">Live Supabase</p>
          </div>
          <div className="bg-white p-5">
            <p className="font-body text-[12px] text-ink/50 mb-2">Đơn hàng thanh toán</p>
            <p className="font-mono text-[26px] font-semibold text-ink">{counts.license_orders ?? 0}</p>
            <p className="font-mono text-[11px] text-teal mt-1">Xác nhận PayOS</p>
          </div>
          <div className="bg-white p-5">
            <p className="font-body text-[12px] text-ink/50 mb-2">Thiết bị đã kết nối</p>
            <p className="font-mono text-[26px] font-semibold text-ink">{counts.license_installations ?? 0}</p>
            <p className="font-mono text-[11px] text-amber mt-1">Máy cài nATime</p>
          </div>
          <div className="bg-white p-5">
            <p className="font-body text-[12px] text-ink/50 mb-2">Liên hệ chưa xử lý</p>
            <p className="font-mono text-[26px] font-semibold text-ink">{counts.contact_requests ?? 0}</p>
            <p className="font-mono text-[11px] text-ink/40 mt-1">Yêu cầu hỗ trợ</p>
          </div>
        </div>
      </section>

      {/* Recent Audit Timeline Section */}
      <section className="border hairline bg-white p-6">
        <div className="flex items-center justify-between border-b hairline pb-4 mb-4">
          <h2 className="font-display font-bold text-base text-ink">Hoạt động vận hành gần đây</h2>
          <span className="font-mono text-[11px] text-teal">Realtime Audit Log</span>
        </div>

        {loading ? (
          <div className="p-6 text-center font-mono text-xs text-ink/50">Đang tải nhật ký hoạt động…</div>
        ) : recentAudits.length === 0 ? (
          <div className="p-6 text-center font-mono text-xs text-ink/50">Chưa có nhật ký hoạt động nào.</div>
        ) : (
          <div className="space-y-3 font-mono text-[12px]">
            {recentAudits.map((item) => (
              <div key={String(item.id)} className="flex justify-between text-ink/70 border-b hairline pb-2">
                <span>{String(item.event_type ?? '')}</span>
                <span className="text-ink/40">{date(item.created_at)}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

const definitions = {
  customers: {
    num: '02',
    title: 'Khách hàng',
    description: 'Hồ sơ chủ tài khoản.',
    table: 'portal_profiles',
    select: 'user_id,display_name,organization_name,created_at',
    columns: [
      ['display_name', 'Tên'],
      ['organization_name', 'Đơn vị'],
      ['user_id', 'User ID'],
      ['created_at', 'Ngày tạo'],
    ],
  },
  orders: {
    num: '03',
    title: 'Đơn hàng',
    description: 'Trạng thái PayOS và số tiền.',
    table: 'license_orders',
    select: 'id,user_id,plan_code,billing_period,amount_vnd,status,payment_provider,created_at',
    columns: [
      ['id', 'Mã đơn'],
      ['plan_code', 'Gói'],
      ['billing_period', 'Chu kỳ'],
      ['amount_vnd', 'Số tiền'],
      ['status', 'Trạng thái'],
      ['created_at', 'Ngày tạo'],
    ],
  },
  licenses: {
    num: '04',
    title: 'License',
    description: 'Entitlement đã cấp cho khách hàng.',
    table: 'license_entitlements',
    select: 'id,user_id,plan_code,origin,status,max_employees,max_devices,enabled_modules,expires_at',
    columns: [
      ['id', 'Mã license'],
      ['plan_code', 'Gói'],
      ['origin', 'Nguồn'],
      ['status', 'Trạng thái'],
      ['max_devices', 'Thiết bị'],
      ['expires_at', 'Hết hạn'],
    ],
  },
  devices: {
    num: '05',
    title: 'Thiết bị',
    description: 'Máy đã liên kết với license.',
    table: 'license_installations',
    select: 'id,entitlement_id,display_name,hardware_id_hash,status,activated_at,last_validated_at',
    columns: [
      ['display_name', 'Tên máy'],
      ['hardware_id_hash', 'Hardware hash'],
      ['status', 'Trạng thái'],
      ['activated_at', 'Kích hoạt'],
      ['last_validated_at', 'Xác minh'],
    ],
  },
  audit: {
    num: '08',
    title: 'Audit',
    description: 'Lịch sử license và thao tác quản trị.',
    table: 'license_audit_entries',
    select: 'id,user_id,event_type,correlation_id,details,created_at',
    columns: [
      ['event_type', 'Sự kiện'],
      ['user_id', 'Người thực hiện'],
      ['correlation_id', 'Mã vết'],
      ['details', 'Chi tiết'],
      ['created_at', 'Thời gian'],
    ],
  },
} as const;

export function AdminTablePage({ kind }: { kind: keyof typeof definitions }) {
  const definition = definitions[kind];
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const client = supabase;
    if (!client) {
      setLoading(false);
      return;
    }

    void client.from(definition.table).select(definition.select).order('created_at', { ascending: false }).limit(100).then((tableRes) => {
      if (!cancelled) {
        setRows((tableRes.data as Row[] | null) ?? []);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [definition]);

  return (
    <div className="space-y-6">
      <p className="font-mono text-[11px] text-teal tracking-wide">{definition.num} / {definition.title.toUpperCase()}</p>
      <div className="border hairline overflow-x-auto">
        <table className="w-full text-left font-body text-[13px]">
          <thead>
            <tr className="border-b hairline bg-white/60">
              {definition.columns.map(([key, label]) => (
                <th key={key} className="py-3 px-4 text-ink/50 font-medium">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mono text-[12px]">
            {loading ? (
              <tr className="bg-white">
                <td colSpan={definition.columns.length} className="py-6 px-4 text-center text-ink/50 font-body">
                  Đang tải dữ liệu…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr className="bg-white">
                <td colSpan={definition.columns.length} className="py-6 px-4 text-center text-ink/50 font-body">
                  Chưa có bản ghi nào.
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={String(row.id ?? row.user_id ?? index)} className="border-b hairline bg-white">
                  {definition.columns.map(([key]) => {
                    const val = row[key];
                    const isIdOrHash = key.includes('id') || key.includes('hash');

                    let content;
                    if (key === 'status') {
                      content = <StatusBadge status={String(val ?? '')} />;
                    } else if (key.includes('_at')) {
                      content = <span className="text-ink/60">{date(val)}</span>;
                    } else if (key === 'amount_vnd') {
                      content = <span className="font-semibold text-ink">{formatCurrency(val)}</span>;
                    } else if (isIdOrHash) {
                      content = <CopyableId value={cell(val)} />;
                    } else {
                      content = <span className="font-body text-ink">{cell(val)}</span>;
                    }

                    return (
                      <td key={key} className="py-3 px-4">
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
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
    <div className="space-y-6">
      <p className="font-mono text-[11px] text-teal tracking-wide">07 / LIÊN HỆ</p>
      <div className="border hairline overflow-x-auto">
        <table className="w-full text-left font-body text-[13px]">
          <thead>
            <tr className="border-b hairline bg-white/60">
              <th className="py-3 px-4 text-ink/50 font-medium">Tên</th>
              <th className="py-3 px-4 text-ink/50 font-medium">Công ty / Email</th>
              <th className="py-3 px-4 text-ink/50 font-medium">Module quan tâm</th>
              <th className="py-3 px-4 text-ink/50 font-medium">Ngày gửi</th>
              <th className="py-3 px-4 text-ink/50 font-medium">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="font-mono text-[12px]">
            {loading ? (
              <tr className="bg-white">
                <td colSpan={5} className="py-6 px-4 text-center text-ink/50 font-body">Đang tải danh sách liên hệ…</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr className="bg-white">
                <td colSpan={5} className="py-6 px-4 text-center text-ink/50 font-body">Chưa có yêu cầu liên hệ nào.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={String(row.id)} className="border-b hairline bg-white">
                  <td className="py-3 px-4 font-body font-semibold text-ink">{cell(row.name)}</td>
                  <td className="py-3 px-4 font-body text-ink/70">
                    {row.company ? `${cell(row.company)} (${cell(row.email)})` : cell(row.email)}
                  </td>
                  <td className="py-3 px-4 font-body text-ink/80">{cell(row.kind)}</td>
                  <td className="py-3 px-4 text-ink/60">{date(row.created_at)}</td>
                  <td className="py-3 px-4">
                    <select
                      value={String(row.status)}
                      onChange={(event) => void update(String(row.id), event.target.value)}
                      className="border hairline bg-white px-2 py-1 font-mono text-[11px] outline-none cursor-pointer"
                    >
                      <option value="new">Mới</option>
                      <option value="in_progress">Đang xử lý</option>
                      <option value="closed">Đã đóng</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
