import Link from 'next/link';

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
      <div>
        <p className="font-mono text-[12px] text-teal tracking-wide mb-5">
          PHẦN MỀM CHẤM CÔNG & QUẢN LÝ THIẾT BỊ
        </p>
        <h1 className="font-display font-extrabold text-[40px] md:text-[52px] leading-[1.08] tracking-tight text-ink">
          Quản lý chấm công,<br />tự động hóa ca kíp & tính lương.
        </h1>
        <p className="font-body text-[16px] leading-relaxed text-ink/70 mt-6 max-w-md">
          nATime giúp doanh nghiệp quản lý chấm công, ca làm việc và kết nối máy chấm công trên bộ cài Windows self-host chính xác, minh bạch và bảo mật.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            href="/register?trial=standard"
            className="bg-ink text-paper font-body text-[14px] font-semibold px-6 py-3 hover:bg-graphite transition-colors"
          >
            Dùng thử miễn phí 7 ngày
          </Link>
          <Link
            href="/features"
            className="border hairline font-body text-[14px] font-medium px-6 py-3 hover:bg-white transition-colors"
          >
            Xem tính năng
          </Link>
        </div>
      </div>

      {/* Data Panel */}
      <div className="diag-corner bg-graphite p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] text-paper/50">BẢNG ĐIỀU KHIỂN · MÁY CHỦ CỤC BỘ</span>
          <span className="w-2 h-2 rounded-full bg-teal" />
        </div>
        <div className="font-mono text-amber text-[44px] leading-none mb-1">
          96.4<span className="text-[18px] ml-1 text-amber/70">%</span>
        </div>
        <p className="font-mono text-[11px] text-paper/40 mb-6">
          Tỷ lệ đi làm đúng giờ hôm nay · 128 nhân sự
        </p>
        <div className="border-t border-white/10 pt-4 space-y-3">
          <div className="flex justify-between font-mono text-[12px] text-paper/70">
            <span>NV-0482 · Trần Văn An</span>
            <span className="text-teal">Đúng giờ — 07:58:12</span>
          </div>
          <div className="flex justify-between font-mono text-[12px] text-paper/70">
            <span>NV-0398 · Phạm Quốc Cường</span>
            <span className="text-amber">Đi trễ 14 phút — 08:14</span>
          </div>
          <div className="flex justify-between font-mono text-[12px] text-paper/70">
            <span>MCC Gate-01</span>
            <span className="text-teal">Kết nối trực tuyến</span>
          </div>
        </div>
      </div>
    </section>
  );
}
