type PreviewKind = 'overview' | 'attendance' | 'devices';

const rows = {
  overview: [
    ['Nhân viên 01', 'Phòng ban A', '08:02', 'Đúng giờ'],
    ['Nhân viên 02', 'Phòng ban B', '08:07', 'Đã ghi nhận'],
    ['Nhân viên 03', 'Phòng ban A', '08:15', 'Cần kiểm tra'],
  ],
  attendance: [
    ['NV-001', 'Ca hành chính', '08:02', '17:04'],
    ['NV-002', 'Ca sáng', '07:01', '16:03'],
    ['NV-003', 'Ca hành chính', '08:10', '17:12'],
  ],
  devices: [
    ['Thiết bị 01', 'Máy chấm công', 'Online', 'Đã đồng bộ'],
    ['Thiết bị 02', 'Máy chấm công', 'Online', 'Sẵn sàng'],
    ['Thiết bị 03', 'Máy chấm công', 'Offline', 'Cần kiểm tra'],
  ],
} satisfies Record<PreviewKind, string[][]>;

const headings = {
  overview: ['Nhân viên', 'Phòng ban', 'Giờ vào', 'Trạng thái'],
  attendance: ['Mã nhân sự', 'Ca làm việc', 'Giờ vào', 'Giờ ra'],
  devices: ['Thiết bị', 'Loại', 'Kết nối', 'Đồng bộ'],
} satisfies Record<PreviewKind, string[]>;

export default function ProductPreview({ kind = 'overview', compact = false }: { kind?: PreviewKind; compact?: boolean }) {
  const title = kind === 'overview' ? 'Tổng quan vận hành' : kind === 'attendance' ? 'Lịch sử chấm công' : 'Quản lý thiết bị';
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_28px_80px_-32px_rgba(15,23,42,0.38)]" aria-label={`Minh họa giao diện ${title}`}>
      <div className="flex h-10 items-center justify-between border-b border-slate-200 bg-slate-950 px-4">
        <div className="flex gap-1.5" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">nATime · UI illustration</span>
      </div>
      <div className="grid grid-cols-[76px_1fr] sm:grid-cols-[104px_1fr]">
        <div className="border-r border-slate-200 bg-slate-50 p-3">
          <div className="mb-5 flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-700 text-[10px] font-black text-white">nA</span><span className="hidden text-xs font-bold sm:inline">nATime</span></div>
          <div className="space-y-2" aria-hidden="true">{[64, 46, 58, 52, 62].map((width, index) => <div key={width} className={`h-2 rounded-full ${index === 0 ? 'bg-blue-200' : 'bg-slate-200'}`} style={{ width: `${width}%` }} />)}</div>
        </div>
        <div className={compact ? 'p-4' : 'p-4 sm:p-6'}>
          <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-700">Minh họa sản phẩm</p><h3 className="mt-1 text-sm font-bold text-slate-950 sm:text-base">{title}</h3></div><span className="rounded-md border border-slate-200 px-2 py-1 text-[9px] font-semibold text-slate-500">Windows</span></div>
          {kind === 'overview' && <div className="mt-4 grid grid-cols-3 gap-2"><Metric label="Nhân sự" value="—" tone="blue" /><Metric label="Thiết bị" value="—" tone="emerald" /><Metric label="Cần xử lý" value="—" tone="amber" /></div>}
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <div className="grid grid-cols-4 bg-slate-50">{headings[kind].map((heading) => <div key={heading} className="truncate px-2 py-2 text-[8px] font-bold uppercase tracking-wide text-slate-500 sm:px-3 sm:text-[9px]">{heading}</div>)}</div>
            {rows[kind].map((row) => <div key={row[0]} className="grid grid-cols-4 border-t border-slate-100">{row.map((cell, index) => <div key={cell} className={`truncate px-2 py-2.5 text-[9px] sm:px-3 sm:text-[10px] ${index === 0 ? 'font-semibold text-slate-800' : cell === 'Online' || cell === 'Đúng giờ' || cell === 'Đã ghi nhận' ? 'text-emerald-600' : cell === 'Offline' || cell === 'Cần kiểm tra' ? 'text-amber-600' : 'text-slate-500'}`}>{cell}</div>)}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: 'blue' | 'emerald' | 'amber' }) {
  const colors = { blue: 'bg-blue-50 text-blue-700', emerald: 'bg-emerald-50 text-emerald-700', amber: 'bg-amber-50 text-amber-700' };
  return <div className={`rounded-lg p-2.5 ${colors[tone]}`}><p className="truncate text-[8px] font-semibold sm:text-[9px]">{label}</p><p className="mt-1 text-sm font-bold">{value}</p></div>;
}
