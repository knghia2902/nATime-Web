'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-28 text-center relative">
      <div className="glass-panel rounded-3xl p-10 md:p-14 border border-white/12 shadow-2xl relative overflow-hidden">
        {/* Ambient Subtle Glow */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-sky-500/10 filter blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-500/10 filter blur-3xl pointer-events-none" />

        <h2 className="font-sans font-bold text-[28px] md:text-[34px] text-white max-w-xl mx-auto mb-8 leading-tight">
          Sẵn sàng nhìn thấy vận hành nhà máy của bạn theo thời gian thực?
        </h2>

        <div className="flex justify-center">
          <Link
            href="/contact"
            className="btn-pill-primary text-sm py-3 px-8 shadow-[0_4px_24px_rgba(255,255,255,0.25)] font-semibold"
          >
            Yêu cầu demo miễn phí
          </Link>
        </div>
      </div>
    </section>
  );
}
