import Link from 'next/link';

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-[0.95fr_1.05fr] gap-14 items-center">
      <div>
        <p className="inline-flex items-center gap-2 font-sans text-[13px] font-600 text-indigo bg-indigo-soft px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo" /> Nền tảng vận hành nhà máy
        </p>
        <h1 className="font-sans font-800 text-[40px] md:text-[50px] leading-[1.1] tracking-tight text-ink">
          Một nền tảng,<br />bốn trạm kiểm soát vận hành.
        </h1>
        <p className="font-sans text-[16px] leading-relaxed text-sub mt-6 max-w-md">
          nATime hợp nhất chấm công, kiểm soát ra vào, trạm cân và quản lý tài sản vào một hệ thống duy nhất — cùng một giao diện bạn thấy ngay bên dưới, không cần chuyển đổi giữa nhiều phần mềm.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            href="/contact"
            className="bg-indigo text-white font-sans text-[14px] font-600 px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Yêu cầu demo
          </Link>
          <Link
            href="/features"
            className="border border-line bg-white font-sans text-[14px] font-600 text-ink px-6 py-3 rounded-lg hover:bg-page transition-colors"
          >
            Xem tính năng
          </Link>
        </div>
      </div>

      {/* PRODUCT WINDOW MOCKUP */}
      <div className="bg-white border border-line rounded-2xl shadow-card overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 h-10 border-b border-line bg-page">
          <span className="w-2.5 h-2.5 rounded-full bg-rose/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald/40" />
          <span className="font-sans text-[11px] text-sub/60 ml-3">app.natime.vn/dashboard</span>
        </div>
        <div className="p-5">
          <p className="font-sans font-700 text-[15px] text-ink mb-1">Tổng quan</p>
          <p className="font-sans text-[12px] text-sub mb-4">Thông tin vận hành hôm nay</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="border border-line rounded-xl p-3.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-soft flex items-center justify-center mb-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-indigo" />
              </div>
              <p className="font-sans font-700 text-[20px] text-ink leading-none">438</p>
              <p className="font-sans text-[11px] text-sub mt-1">Tổng số nhân sự</p>
            </div>
            <div className="border border-line rounded-xl p-3.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-soft flex items-center justify-center mb-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-emerald" />
              </div>
              <p className="font-sans font-700 text-[20px] text-ink leading-none">405</p>
              <p className="font-sans text-[11px] text-sub mt-1">Đã check-in hôm nay</p>
            </div>
          </div>
          <div className="border border-line rounded-xl overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-line bg-page">
              <p className="font-sans text-[11px] font-600 text-sub">Sự kiện chấm công</p>
            </div>
            <div className="divide-y divide-line">
              <div className="flex items-center justify-between px-3.5 py-2.5">
                <span className="font-sans text-[12px] text-ink">Lê Xuân Hiệp</span>
                <span className="font-sans text-[12px] text-emerald">08:03</span>
              </div>
              <div className="flex items-center justify-between px-3.5 py-2.5">
                <span className="font-sans text-[12px] text-ink">Nguyễn Thị Thảo</span>
                <span className="font-sans text-[12px] text-emerald">08:02</span>
              </div>
              <div className="flex items-center justify-between px-3.5 py-2.5">
                <span className="font-sans text-[12px] text-ink">Phạm Duy Thị Tâm</span>
                <span className="font-sans text-[12px] text-rose">Đi muộn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
