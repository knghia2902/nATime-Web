import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 text-center">
      {/* Top Badge */}
      <div className="flex justify-center mb-6">
        <p className="inline-flex items-center gap-2 font-sans text-[13px] font-600 text-indigo-text bg-indigo-soft px-3.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo" /> Nền tảng vận hành nhà máy
        </p>
      </div>

      {/* Main Headline */}
      <h1 className="font-sans font-800 text-[40px] sm:text-[48px] md:text-[56px] leading-[1.1] tracking-tight text-ink max-w-3xl mx-auto">
        Một nền tảng,<br className="hidden sm:inline" /> bốn trạm kiểm soát vận hành.
      </h1>

      {/* Subtitle */}
      <p className="font-sans text-[16px] md:text-[18px] leading-relaxed text-sub mt-6 max-w-2xl mx-auto">
        nATime hợp nhất chấm công, kiểm soát ra vào, trạm cân và quản lý tài sản vào một hệ thống duy nhất — cùng một giao diện bạn thấy ngay bên dưới, không cần chuyển đổi giữa nhiều phần mềm.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-3.5 mt-8 mb-14">
        <Link
          href="/contact"
          className="bg-indigo text-white font-sans text-[14px] font-600 px-7 py-3.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Yêu cầu demo
        </Link>
        <Link
          href="/features"
          className="border border-line bg-white font-sans text-[14px] font-600 text-ink px-7 py-3.5 rounded-lg hover:bg-page transition-colors"
        >
          Xem tính năng
        </Link>
      </div>

      {/* FULL WIDTH DASHBOARD SHOWCASE */}
      <div className="max-w-5xl mx-auto bg-white border border-line rounded-2xl shadow-card overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 h-10 border-b border-line bg-page text-left">
          <span className="w-2.5 h-2.5 rounded-full bg-rose/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald/40" />
          <span className="font-sans text-[11px] text-sub/60 ml-3">app.natime.vn/dashboard</span>
        </div>
        <div className="w-full bg-slate-100">
          <Image
            src="/dashboard-preview.png"
            alt="nATime Dashboard Preview"
            width={1920}
            height={1080}
            className="w-full h-auto block"
            priority
          />
        </div>
      </div>
    </section>
  );
}
