'use client';

import React from 'react';
import { 
  Sun, 
  SignOut, 
  CheckCircle, 
  Clock, 
  House, 
  CalendarCheck, 
  CaretRight, 
  Desktop
} from '@phosphor-icons/react';

export default function MobileAppShowcase() {
  return (
    <div className="w-full flex items-center justify-center p-2 select-none">
      {/* ── Outer Smartphone Frame ── */}
      <div className="relative w-[320px] h-[640px] bg-slate-950 rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-white/10 flex flex-col justify-between overflow-hidden">
        
        {/* Dynamic Island / Top Camera Pill */}
        <div className="absolute top-4.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-black rounded-full z-30 flex items-center justify-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#0d1f38] border border-sky-500/30" />
        </div>

        {/* Screen Bezel & Container */}
        <div className="relative w-full h-full bg-slate-900 text-slate-100 rounded-[38px] overflow-hidden flex flex-col justify-between border border-white/5 font-sans">
          
          {/* ── Scrollable Body Area (matching DashboardView.vue) ── */}
          <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar pb-16">
            
            {/* 1. Header/Profile Panel with Rich Gradients & Curved Bottom (rounded-b-[2.2rem]) */}
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-b border-slate-800 rounded-b-[2.2rem] px-5 pt-10 pb-9 relative overflow-hidden shadow-md">
              {/* Decorative Glow Blobs */}
              <div className="absolute w-44 h-44 rounded-full bg-sky-500/15 blur-[40px] -top-10 -right-10 pointer-events-none" />
              <div className="absolute w-40 h-40 rounded-full bg-indigo-600/15 blur-[35px] -bottom-10 -left-10 pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 p-[1.5px] shadow-md shadow-sky-500/10 overflow-hidden shrink-0">
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-extrabold text-sm text-sky-400 uppercase">
                      KN
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Nhân viên</p>
                    <h3 className="font-extrabold text-[15px] leading-tight text-white">
                      Khắc Nghĩa
                    </h3>
                    <p className="text-[10px] text-sky-400 font-semibold mt-0.5">BP CNTT &bull; 05A00001315</p>
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-800/60 border border-slate-700/40 text-slate-400 flex items-center justify-center">
                    <Sun size={14} weight="fill" />
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-slate-800/60 border border-slate-700/40 text-slate-400 flex items-center justify-center">
                    <SignOut size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Main Content overlapping the Header (-mt-6) */}
            <div className="px-4 -mt-6 relative z-20 space-y-3.5">
              
              {/* Today's Attendance Widget */}
              <div className="bg-slate-800/70 backdrop-blur-xl rounded-2xl p-3.5 shadow-xl border border-slate-700/70 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                  <h4 className="font-bold text-[10px] text-slate-300 flex items-center gap-1.5 uppercase tracking-wide">
                    <span className="w-1 h-3 rounded bg-sky-400" />
                    Hôm nay: 20/08/2026
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    Đã chấm công
                  </span>
                </div>

                {/* Shift Details */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-700/40">
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Ca làm việc</p>
                    <p className="font-bold text-[11px] text-slate-200 mt-0.5 truncate">Ca Hành Chính</p>
                    <p className="text-[8.5px] text-slate-400 mt-0.5 font-semibold">08:00 - 17:00</p>
                  </div>

                  <div className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-700/40">
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Hoạt động</p>
                    <p className="font-bold text-[11px] text-emerald-400 mt-0.5">Đúng giờ</p>
                    <p className="text-[8.5px] text-emerald-400/80 mt-0.5 font-semibold">Sớm 2 phút</p>
                  </div>
                </div>

                {/* Clock-in / Clock-out Times */}
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle size={15} weight="bold" />
                    </div>
                    <div>
                      <p className="text-[8px] text-slate-400 font-bold uppercase">Giờ vào</p>
                      <p className="font-extrabold text-[12px] text-slate-200 font-mono">07:58</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0">
                      <Clock size={15} weight="bold" />
                    </div>
                    <div>
                      <p className="text-[8px] text-slate-400 font-bold uppercase">Giờ ra</p>
                      <p className="font-extrabold text-[12px] text-slate-200 font-mono">17:02</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Attendance History Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-1 h-3 rounded bg-sky-400" />
                    Lịch sử công gần đây
                  </h4>
                  <span className="text-[9.5px] text-sky-400 font-bold hover:underline cursor-pointer">Xem thêm</span>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl overflow-hidden divide-y divide-slate-700/40 text-[9.5px]">
                  <div className="p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex flex-col justify-center items-center font-bold text-[8.5px] text-slate-300">
                        <span>19</span>
                      </div>
                      <div>
                        <p className="font-bold text-[10px] text-slate-200">Ca Hành Chính</p>
                        <p className="text-[8.5px] text-slate-400 font-mono">Vào: 07:55 | Ra: 17:05</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[8.5px] font-bold text-emerald-400 block">Đúng giờ</span>
                      <span className="text-[8px] text-slate-400 font-medium">8.0h công</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assigned Assets Section */}
              <div className="space-y-2">
                <h4 className="font-bold text-[10px] text-slate-400 uppercase tracking-wide flex items-center gap-1.5 px-1">
                  <span className="w-1 h-3 rounded bg-indigo-400" />
                  Thiết bị đang bàn giao (1)
                </h4>

                <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/60 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <Desktop size={18} weight="duotone" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[10.5px] text-slate-200 truncate">Dell OptiPlex 3090 Tower</p>
                      <p className="text-[8.5px] text-slate-400 font-semibold truncate">05A0000035 &bull; PC Máy bàn</p>
                    </div>
                  </div>
                  <CaretRight size={13} className="text-slate-500 shrink-0" />
                </div>
              </div>

            </div>
          </div>

          {/* ── 3. Exact BottomNavigation.vue Structure with Floating Center QR Button ── */}
          <div className="w-full h-15 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 flex items-center justify-around px-4 relative z-30 shrink-0">
            
            {/* Home Tab */}
            <div className="flex flex-col items-center justify-center w-14 text-sky-400 cursor-pointer">
              <House size={18} weight="fill" />
              <span className="text-[8px] font-bold mt-0.5">Trang chủ</span>
            </div>

            {/* Scan Tab (Floating Centered Circular Action Button) */}
            <div className="flex flex-col items-center justify-center w-14 relative cursor-pointer">
              <div className="absolute -top-6.5 w-12 h-12 bg-gradient-to-tr from-sky-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-sky-400/25 border-[3.5px] border-slate-900 text-white active:scale-95 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <rect x="3.25" y="3.25" width="5.5" height="5.5" rx="1.25" stroke="white" stroke-width="1.5" />
                  <rect x="5" y="5" width="2" height="2" fill="white" />
                  <rect x="15.25" y="3.25" width="5.5" height="5.5" rx="1.25" stroke="white" stroke-width="1.5" />
                  <rect x="17" y="5" width="2" height="2" fill="white" />
                  <rect x="3.25" y="15.25" width="5.5" height="5.5" rx="1.25" stroke="white" stroke-width="1.5" />
                  <rect x="5" y="17" width="2" height="2" fill="white" />
                  <rect x="11" y="4" width="2" height="2" fill="white" rx="0.5" />
                  <rect x="11" y="8" width="2" height="2" fill="white" rx="0.5" />
                  <rect x="4" y="11" width="2" height="2" fill="white" rx="0.5" />
                  <rect x="8" y="11" width="2" height="2" fill="white" rx="0.5" />
                  <rect x="11" y="11" width="2" height="2" fill="white" rx="0.5" />
                  <rect x="15" y="11" width="2" height="2" fill="white" rx="0.5" />
                  <rect x="11" y="15" width="2" height="2" fill="white" rx="0.5" />
                  <rect x="15" y="15" width="2" height="2" fill="white" rx="0.5" />
                  <rect x="18" y="15" width="2" height="2" fill="white" rx="0.5" />
                  <rect x="11" y="18" width="2" height="2" fill="white" rx="0.5" />
                  <rect x="15" y="18" width="2" height="2" fill="white" rx="0.5" />
                  <rect x="18" y="18" width="2" height="2" fill="white" rx="0.5" />
                </svg>
              </div>
              <span className="text-[8px] font-bold text-slate-400 mt-5.5">Quét QR</span>
            </div>

            {/* Schedule Tab */}
            <div className="flex flex-col items-center justify-center w-14 text-slate-400 hover:text-slate-200 cursor-pointer">
              <CalendarCheck size={18} />
              <span className="text-[8px] font-bold mt-0.5">Lịch & Công</span>
            </div>

          </div>

          {/* Home indicator bar */}
          <div className="w-24 h-1 bg-white/20 rounded-full mx-auto mb-1.5" />
        </div>
      </div>
    </div>
  );
}
