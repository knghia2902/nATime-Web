import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-12 pb-20">
      <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (5 of 12 columns ~ 42%) */}
        <div className="col-span-12 lg:col-span-5 text-left">
          <p className="inline-flex items-center gap-2 font-sans text-[13px] font-600 text-indigo-text bg-indigo-soft px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo" /> Nền tảng vận hành nhà máy
          </p>
          <h1 className="font-sans font-800 text-[38px] sm:text-[44px] lg:text-[48px] leading-[1.1] tracking-tight text-ink">
            Chấm công & Vận hành
          </h1>
          <p className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-sub mt-6">
            nATime hợp nhất chấm công tự động, kiểm soát cửa ra vào, trạm cân và quản lý tài sản trên cùng một phần mềm — giúp doanh nghiệp tối ưu chi phí.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/contact"
              className="bg-indigo text-white font-sans text-[14px] font-600 px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
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

        {/* Right Column Showcase (7 of 12 columns ~ 58%) */}
        <div className="col-span-12 lg:col-span-7">
          <div className="bg-white border border-line rounded-2xl shadow-card overflow-hidden w-full">
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
                width={1679}
                height={937}
                className="w-full h-auto block"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
