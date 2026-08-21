'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-10 pb-20 lg:pt-14 lg:pb-28 min-h-[calc(100vh-64px)] flex flex-col justify-center">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ── Left Column: Typography & Pill Action Buttons (5 cols on desktop) ── */}
          <div className="lg:col-span-5 text-left">
            {/* Tagline */}
            <p className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-sky-400 bg-sky-500/10 border border-sky-400/20 px-3.5 py-1.5 rounded-full mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" /> Nền tảng vận hành nhà máy
            </p>

            {/* Main Headline */}
            <h1 className="font-sans font-bold text-[38px] sm:text-[46px] lg:text-[50px] xl:text-[54px] leading-[1.12] tracking-tight text-white">
              Chấm công & Vận hành
            </h1>

            {/* Description */}
            <p className="font-sans text-[15px] sm:text-[16px] leading-relaxed text-white/70 mt-6 max-w-xl">
              nATime hợp nhất chấm công tự động, kiểm soát cửa ra vào, trạm cân và quản lý tài sản trên cùng một phần mềm — giúp doanh nghiệp tối ưu chi phí.
            </p>

            {/* Pill Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              {/* Primary Action Button */}
              <Link
                href="/download"
                className="btn-pill-primary text-sm py-2.5 px-5 shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                <span>Tải nATime</span>
              </Link>

              {/* Secondary Features Button */}
              <Link
                href="/features"
                className="btn-pill-glass text-sm py-2.5 px-4.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 text-white/70"
                >
                  <path fillRule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.31A3.75 3.75 0 0010 13a3.75 3.75 0 002.5-3.69v-.268a32.964 32.964 0 015.65-2.614.75.75 0 01.964.717v4.618a8.25 8.25 0 01-8.25 8.25 8.25 8.25 0 01-8.25-8.25V7.145a.75.75 0 01.964-.717 33.153 33.153 0 017.086 2.871z" clipRule="evenodd" />
                </svg>
                <span>Xem tính năng</span>
              </Link>
            </div>
          </div>

          {/* ── Right Column: MacOS Frosted Glass Dashboard Showcase (7 cols on desktop) ── */}
          <div className="lg:col-span-7 relative">
            {/* Subtle Ambient Glow behind showcase */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-indigo-500/15 blur-2xl opacity-60 -z-10" />

            {/* MacOS Window Container */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.45)] w-full">
              {/* Window Header */}
              <div className="flex items-center gap-1.5 px-4 h-10 border-b border-white/10 bg-white/[0.04] text-left select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="font-mono text-[11px] text-white/50 ml-3">app.natime.vn/dashboard</span>
              </div>

              {/* Real Dashboard Image */}
              <div className="w-full bg-slate-900/40 relative">
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
      </div>
    </section>
  );
}
