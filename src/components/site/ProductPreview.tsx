'use client';

import { ShieldCheck, Cpu, Clock, CheckCircle } from '@phosphor-icons/react';

type PreviewKind = 'overview' | 'attendance' | 'devices';

export default function ProductPreview({ kind = 'overview', compact = false }: { kind?: PreviewKind; compact?: boolean }) {
  const info = {
    overview: {
      title: 'Hệ thống Quản lý nATime',
      badge: 'Bản quyền Windows',
      metrics: [
        { label: 'Trạng thái máy chủ', value: 'Sẵn sàng (Local)', tone: 'emerald' },
        { label: 'Hệ quản trị CSDL', value: 'SQL Server', tone: 'blue' },
        { label: 'Bảo mật dữ liệu', value: 'AES-256 Encrypted', tone: 'indigo' },
      ],
    },
    attendance: {
      title: 'Xử lý Ca kíp & Giờ công',
      badge: 'Thuật toán đối soát',
      metrics: [
        { label: 'Quy tắc ca làm việc', value: 'Linh hoạt ngày/tuần', tone: 'blue' },
        { label: 'Tính toán tăng ca', value: 'Thời gian thực', tone: 'emerald' },
        { label: 'Xử lý ca đêm', value: 'Xác thực qua ngày', tone: 'indigo' },
      ],
    },
    devices: {
      title: 'Kết nối Thiết bị Chấm công',
      badge: 'Giao thức IoT LAN',
      metrics: [
        { label: 'Máy chấm công (MCC)', value: 'Đã kết nối', tone: 'emerald' },
        { label: 'Đầu đọc FaceID', value: 'Sẵn sàng', tone: 'blue' },
        { label: 'Đồng bộ từ xa', value: 'Tự động', tone: 'indigo' },
      ],
    },
  }[kind];

  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-md">
      <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-primary">
            {kind === 'devices' ? <Cpu size={18} weight="duotone" /> : kind === 'attendance' ? <Clock size={18} weight="duotone" /> : <ShieldCheck size={18} weight="duotone" />}
          </div>
          <span className="font-bold text-sm text-foreground">{info.title}</span>
        </div>
        <span className="rounded-full bg-muted/60 px-3 py-1 text-[11px] font-semibold text-muted">
          {info.badge}
        </span>
      </div>

      <div className="space-y-3">
        {info.metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-xs">
            <span className="font-medium text-muted">{m.label}</span>
            <span className="flex items-center gap-1.5 font-bold text-foreground">
              <CheckCircle size={14} className="text-emerald-500" weight="fill" />
              <span>{m.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
