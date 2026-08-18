export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-4" aria-label="Đang tải dữ liệu quản trị">
      <div className="h-24 rounded-xl border border-white/[0.08] bg-white/[0.04]" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="h-32 rounded-xl border border-white/[0.08] bg-white/[0.04]" />
        <div className="h-32 rounded-xl border border-white/[0.08] bg-white/[0.04]" />
        <div className="h-32 rounded-xl border border-white/[0.08] bg-white/[0.04]" />
      </div>
    </div>
  );
}
