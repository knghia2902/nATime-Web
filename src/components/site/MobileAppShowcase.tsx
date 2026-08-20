'use client';

import React from 'react';
import { 
  QrCode, 
  CalendarCheck, 
  House, 
  Clock, 
  CheckCircle, 
  SignOut,
  Sun,
  ShieldCheck
} from '@phosphor-icons/react';

export default function MobileAppShowcase() {
  return (
    <div className="w-full flex items-center justify-center p-2 select-none">
      {/* ── Outer Smartphone Frame ── */}
      <div className="relative w-[300px] h-[580px] bg-slate-950 rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-white/10 flex flex-col justify-between overflow-hidden">
        
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
          <div className="w-2 h-2 rounded-full bg-[#0d1f38] border border-sky-500/30" />
        </div>

        {/* Screen Bezel / Content Container */}
        <div className="relative w-full h-full bg-slate-900 text-slate-100 rounded-[34px] overflow-hidden flex flex-col justify-between pt-7 pb-2 border border-white/5 font-sans">
          
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute w-44 h-44 rounded-full bg-sky-500/10 blur-[40px] -top-10 -right-10 pointer-events-none" />
          <div className="absolute w-44 h-44 rounded-full bg-indigo-500/10 blur-[40px] top-40 -left-10 pointer-events-none" />

          {/* ── Scrollable Body Area ── */}
          <div className="flex-1 px-4 pt-2 pb-3 overflow-y-auto space-y-3 relative z-10 custom-scrollbar">
            
            {/* Header: User Profile */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-600 p-[1.5px] shadow-sm">
                  <div className="w-full h-full bg-slate-900 rounded-[9px] flex items-center justify-center font-extrabold text-xs text-sky-400">
                    KN
                  </div>
                </div>
                <div>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Nhân viên</p>
                  <h4 className="font-bold text-[13px] text-white leading-tight">Khắc Nghĩa</h4>
                  <p className="text-[9px] text-sky-400 font-medium">BP CNTT • 05A00001315</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400">
                  <Sun size={12} weight="fill" />
                </div>
                <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400">
                  <SignOut size={12} />
                </div>
              </div>
            </div>

            {/* Card 1: Today Attendance Status */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-3 border border-slate-700/60 space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-700/50 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-3 rounded bg-sky-400" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Hôm nay: 20/08</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  ĐÃ CHẤM CÔNG
                </span>
              </div>

              {/* Shift info */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700/40">
                  <p className="text-[7.5px] text-slate-400 font-bold uppercase">Ca làm việc</p>
                  <p className="font-bold text-[10.5px] text-slate-200 mt-0.5 truncate">Ca Hành Chính</p>
                  <p className="text-[8px] text-slate-400">08:00 - 17:00</p>
                </div>
                <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700/40">
                  <p className="text-[7.5px] text-slate-400 font-bold uppercase">Trạng thái</p>
                  <p className="font-bold text-[10.5px] text-emerald-400 mt-0.5">Đúng giờ</p>
                  <p className="text-[8px] text-emerald-400/80">Sớm 2 phút</p>
                </div>
              </div>

              {/* Times */}
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle size={13} weight="bold" />
                  </div>
                  <div>
                    <p className="text-[7.5px] text-slate-400 font-bold uppercase">Giờ vào</p>
                    <p className="font-extrabold text-[12px] text-slate-200 font-mono">07:58:14</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0">
                    <Clock size={13} weight="bold" />
                  </div>
                  <div>
                    <p className="text-[7.5px] text-slate-400 font-bold uppercase">Giờ ra</p>
                    <p className="font-extrabold text-[12px] text-slate-400 font-mono">--:--:--</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Monthly Summary Counters */}
            <div className="grid grid-cols-3 gap-1.5">
              <div className="bg-slate-800/40 border border-slate-700/40 p-2 rounded-xl text-center">
                <p className="text-[7.5px] text-slate-400 font-bold uppercase">Giờ công</p>
                <p className="font-extrabold text-[12px] text-sky-400 mt-0.5">168h</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/40 p-2 rounded-xl text-center">
                <p className="text-[7.5px] text-slate-400 font-bold uppercase">Ngày công</p>
                <p className="font-extrabold text-[12px] text-amber-400 mt-0.5">21 công</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/40 p-2 rounded-xl text-center">
                <p className="text-[7.5px] text-slate-400 font-bold uppercase">Tăng ca</p>
                <p className="font-extrabold text-[12px] text-indigo-400 mt-0.5">12.5h</p>
              </div>
            </div>

            {/* Quick Action: QR Scan Hardware banner */}
            <div className="bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-purple-500/15 border border-sky-400/20 rounded-2xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-400 text-slate-950 flex items-center justify-center font-bold shadow-sm">
                  <QrCode size={18} weight="bold" />
                </div>
                <div>
                  <p className="text-[9.5px] font-bold text-white leading-tight">Quét QR Thiết bị</p>
                  <p className="text-[8px] text-sky-300/80">Tra cứu specs & bàn giao</p>
                </div>
              </div>
              <span className="text-[8px] font-bold px-2 py-1 rounded-lg bg-white/10 text-white border border-white/10">
                Mở camera →
              </span>
            </div>
          </div>

          {/* ── Bottom Navigation Bar ── */}
          <div className="px-6 py-2 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md flex items-center justify-between text-slate-400">
            <div className="flex flex-col items-center gap-0.5 text-sky-400 cursor-pointer">
              <House size={16} weight="fill" />
              <span className="text-[8px] font-bold">Tổng quan</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 hover:text-slate-200 cursor-pointer">
              <QrCode size={16} />
              <span className="text-[8px] font-medium">Quét mã</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 hover:text-slate-200 cursor-pointer">
              <CalendarCheck size={16} />
              <span className="text-[8px] font-medium">Lịch công</span>
            </div>
          </div>

          {/* Home indicator bar */}
          <div className="w-24 h-1 bg-white/20 rounded-full mx-auto mt-1" />
        </div>
      </div>
    </div>
  );
}
