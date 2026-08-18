'use client';

import { ShieldCheck, Cpu, Clock, CheckCircle } from '@phosphor-icons/react';

type PreviewKind = 'overview' | 'attendance' | 'devices';

export default function ProductPreview({ kind = 'overview', compact = false }: { kind?: PreviewKind; compact?: boolean }) {
  const info = {
    overview: {
      title: 'Hệ thống Quản lý nATime',
      badge: 'Bản quyền Windows',
      metrics: [
        { label: 'Trạng thái máy chủ', value: 'Sẵn sàng (Local)' },
        { label: 'Hệ quản trị CSDL', value: 'SQL Server' },
        { label: 'Bảo mật dữ liệu', value: 'AES-256 Encrypted' },
      ],
    },
    attendance: {
      title: 'Xử lý Ca kíp & Giờ công',
      badge: 'Thuật toán đối soát',
      metrics: [
        { label: 'Quy tắc ca làm việc', value: 'Linh hoạt ngày/tuần' },
        { label: 'Tính toán tăng ca', value: 'Thời gian thực' },
        { label: 'Xử lý ca đêm', value: 'Xác thực qua ngày' },
      ],
    },
    devices: {
      title: 'Kết nối Thiết bị Chấm công',
      badge: 'Giao thức IoT LAN',
      metrics: [
        { label: 'Máy chấm công (MCC)', value: 'Đã kết nối' },
        { label: 'Đầu đọc FaceID', value: 'Sẵn sàng' },
        { label: 'Đồng bộ từ xa', value: 'Tự động' },
      ],
    },
  }[kind];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 shadow-xl backdrop-blur">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-white">
            {kind === 'devices' ? <Cpu size={18} weight="duotone" /> : kind === 'attendance' ? <Clock size={18} weight="duotone" /> : <ShieldCheck size={18} weight="duotone" />}
          </div>
          <span className="font-bold text-sm text-white">{info.title}</span>
        </div>
        <span className="rounded-full bg-white/[0.06] border border-white/10 px-3 py-1 text-[11px] font-semibold text-white/70">
          {info.badge}
        </span>
      </div>

      <div className="space-y-3">
        {info.metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-xs">
            <span className="font-medium text-white/60">{m.label}</span>
            <span className="flex items-center gap-1.5 font-bold text-white">
              <CheckCircle size={14} className="text-emerald-400" weight="fill" />
              <span>{m.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
