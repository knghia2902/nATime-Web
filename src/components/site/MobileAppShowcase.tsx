'use client';

import React, { useState } from 'react';
import { 
  Sun, 
  SignOut, 
  CheckCircle, 
  Clock, 
  CaretRight, 
  Desktop,
  CaretLeft
} from '@phosphor-icons/react';

type Tab = 'home' | 'scanner' | 'schedule';

export default function MobileAppShowcase() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="w-full flex items-center justify-center p-2 select-none">
      {/* ── Outer Smartphone Frame ── */}
      <div className="relative w-[340px] h-[670px] bg-slate-950 rounded-[50px] p-3 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-white/10 flex flex-col justify-between overflow-hidden">
        
        {/* Screen Bezel & Container */}
        <div className="relative w-full h-full bg-slate-900 text-slate-100 rounded-[40px] overflow-hidden flex flex-col justify-between border border-white/5 font-sans">
          
          {/* ── 1. Top Status Bar (App.vue standard) ── */}
          <div className="h-8 bg-slate-950 flex justify-between items-center px-6 shrink-0 text-slate-400 text-[10px] font-bold tracking-wider select-none border-b border-slate-900/60 z-30">
            <span>08:00</span>
            {/* Notch / Dynamic Island */}
            <div className="w-22 h-4.5 rounded-full bg-black flex items-center justify-center border border-slate-900/60">
              <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800 mr-2 shrink-0" />
              <div className="w-6 h-1 rounded-full bg-slate-900 shrink-0" />
            </div>
            {/* Status Icons: Wifi & Battery */}
            <div className="flex items-center gap-1.5 text-slate-400">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.79-1.79C9.07 19.64 10.48 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 3.31-6 6z"/>
              </svg>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-1 11H4V8h12v8zm5-7.5v5c.83 0 1.5-.67 1.5-1.5v-2c0-.83-.67-1.5-1.5-1.5z"/>
              </svg>
            </div>
          </div>

          {/* ── 2. Dynamic Screen View Body ── */}
          <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar pb-18">
            
            {/* ══════════════ TAB 1: TRANG CHỦ (DashboardView.vue) ══════════════ */}
            {activeTab === 'home' && (
              <div>
                {/* Header/Profile Panel with Rich Gradients & Curved Bottom (rounded-b-[2.5rem]) */}
                <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-b border-slate-800 rounded-b-[2.5rem] px-5 pt-5 pb-11 relative overflow-hidden shadow-md">
                  {/* Decorative Glow Blobs */}
                  <div className="absolute w-48 h-48 rounded-full bg-sky-500/15 blur-[45px] -top-10 -right-10 pointer-events-none" />
                  <div className="absolute w-44 h-44 rounded-full bg-indigo-600/15 blur-[40px] -bottom-10 -left-10 pointer-events-none" />

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 p-[1.5px] shadow-lg shadow-sky-500/10 overflow-hidden shrink-0">
                        <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-extrabold text-base text-sky-400 uppercase">
                          BN
                        </div>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Nhân viên</p>
                        <h3 className="font-extrabold text-base leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                          Bùi Khắc Nghĩa
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

                {/* Main Content overlapping the Header (-mt-8) */}
                <div className="px-4 -mt-8 relative z-20 space-y-4">
                  
                  {/* Today's Attendance Widget */}
                  <div className="bg-slate-800/70 backdrop-blur-xl rounded-3xl p-4 shadow-xl border border-slate-700/70 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5">
                      <h4 className="font-bold text-[10.5px] text-slate-300 flex items-center gap-1.5 uppercase tracking-wide">
                        <span className="w-1.5 h-3.5 rounded bg-sky-500" />
                        Hôm nay: 20/08/2026
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[8.5px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        Đã chấm công
                      </span>
                    </div>

                    {/* Shift Details */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-700/40">
                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Ca làm việc</p>
                        <p className="font-bold text-[11.5px] text-slate-200 mt-0.5 truncate">Ca Hành Chính</p>
                        <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">08:00 - 17:00</p>
                      </div>

                      <div className="bg-slate-900/70 p-3 rounded-2xl border border-slate-700/40">
                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Hoạt động</p>
                        <p className="font-bold text-[11.5px] text-emerald-400 mt-0.5">Đúng giờ</p>
                        <p className="text-[9px] text-emerald-400/80 mt-0.5 font-semibold">Sớm 2 phút</p>
                      </div>
                    </div>

                    {/* Clock-in / Clock-out Times */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8.5 h-8.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                          <CheckCircle size={16} weight="bold" />
                        </div>
                        <div>
                          <p className="text-[8px] text-slate-400 font-bold uppercase">Giờ vào</p>
                          <p className="font-extrabold text-[12.5px] text-slate-200 font-mono">07:58</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="w-8.5 h-8.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0">
                          <Clock size={16} weight="bold" />
                        </div>
                        <div>
                          <p className="text-[8px] text-slate-400 font-bold uppercase">Giờ ra</p>
                          <p className="font-extrabold text-[12.5px] text-slate-200 font-mono">17:02</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Attendance History Section */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <h4 className="font-bold text-[10.5px] text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 rounded bg-sky-500" />
                        Lịch sử công gần đây
                      </h4>
                      <span 
                        onClick={() => setActiveTab('schedule')}
                        className="text-[9.5px] text-sky-400 font-bold hover:underline cursor-pointer"
                      >
                        Xem thêm
                      </span>
                    </div>

                    <div className="bg-slate-800/40 border border-slate-700/60 rounded-3xl overflow-hidden divide-y divide-slate-700/40 text-[9.5px]">
                      <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex flex-col justify-center items-center font-bold text-[9px] text-slate-300">
                            <span>19</span>
                          </div>
                          <div>
                            <p className="font-bold text-[10.5px] text-slate-200">Ca Hành Chính</p>
                            <p className="text-[9px] text-slate-400 font-mono">Vào: 07:55 | Ra: 17:05</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-bold text-emerald-400 block">Đúng giờ</span>
                          <span className="text-[8.5px] text-slate-400 font-medium">8.0h công</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assigned Assets Section */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[10.5px] text-slate-400 uppercase tracking-wide flex items-center gap-1.5 px-1">
                      <span className="w-1.5 h-3.5 rounded bg-indigo-500" />
                      Thiết bị đang bàn giao (1)
                    </h4>

                    <div className="bg-slate-800/50 p-3.5 rounded-3xl border border-slate-700/60 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
                          <Desktop size={20} weight="duotone" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[11px] text-slate-200 truncate">Dell OptiPlex 3090 Tower</p>
                          <p className="text-[9px] text-slate-400 font-semibold truncate">05A0000035 &bull; PC Máy bàn</p>
                        </div>
                      </div>
                      <CaretRight size={14} className="text-slate-500 shrink-0" />
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ══════════════ TAB 2: QUÉT QR (ScannerView.vue) ══════════════ */}
            {activeTab === 'scanner' && (
              <div className="h-full flex flex-col justify-between p-4 pt-3">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <button 
                    onClick={() => setActiveTab('home')} 
                    className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 cursor-pointer"
                  >
                    <CaretLeft size={16} weight="bold" />
                  </button>
                  <h3 className="text-xs font-bold tracking-wide uppercase text-white">Quét mã QR thiết bị</h3>
                  <div className="w-8" />
                </div>

                {/* Camera Scanner Viewfinder Element */}
                <div className="flex-1 flex flex-col justify-center items-center py-6">
                  <div className="w-full max-w-[230px] aspect-square rounded-3xl overflow-hidden bg-black border border-slate-700 relative shadow-2xl flex items-center justify-center">
                    
                    {/* Simulated Camera Feed with QR Code pattern */}
                    <div className="w-32 h-32 opacity-25 grid grid-cols-6 gap-1 p-2">
                      <div className="bg-white col-span-2 row-span-2 rounded-xs" />
                      <div className="bg-white" />
                      <div className="bg-white col-span-2 row-span-2 rounded-xs" />
                      <div className="bg-white" />
                      <div className="bg-white" />
                      <div className="bg-white" />
                      <div className="bg-white col-span-2 row-span-2 rounded-xs" />
                      <div className="bg-white" />
                      <div className="bg-white" />
                    </div>

                    {/* UI Overlay Scanner Box with 4 Corner Brackets */}
                    <div className="absolute inset-4 border border-sky-400/40 relative">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-sky-400" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-sky-400" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-sky-400" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-sky-400" />
                      
                      {/* Laser Scanning Animation Line */}
                      <div className="absolute w-full h-0.5 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] top-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 text-center mt-5 max-w-[210px] leading-relaxed">
                    Hướng camera về phía mã QR dán trên nhãn tài sản thiết bị để tự động quét.
                  </p>
                </div>
              </div>
            )}

            {/* ══════════════ TAB 3: LỊCH & CÔNG (ScheduleView.vue) ══════════════ */}
            {activeTab === 'schedule' && (
              <div className="p-4 space-y-3.5">
                {/* Header */}
                <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-b border-slate-800 rounded-2xl p-4 shadow-md">
                  <h3 className="font-extrabold text-sm text-white">Lịch làm & Ngày công</h3>
                  <p className="text-[9.5px] text-sky-400 font-semibold mt-0.5">Theo dõi ca làm và giờ công chi tiết hàng tháng</p>
                </div>

                {/* Month Selector */}
                <div className="flex items-center justify-between px-1">
                  <button className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                    <CaretLeft size={13} weight="bold" />
                  </button>
                  <h4 className="font-bold text-slate-200 text-[10.5px] bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                    Tháng 08/2026
                  </h4>
                  <button className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                    <CaretRight size={13} weight="bold" />
                  </button>
                </div>

                {/* 6 Statistics Metrics Cards */}
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="bg-slate-800/60 border border-slate-700/60 p-2 rounded-xl">
                    <p className="text-[7.5px] text-slate-400 font-bold uppercase">Giờ công</p>
                    <p className="font-extrabold text-[12px] text-sky-400 mt-0.5">168h</p>
                  </div>
                  <div className="bg-slate-800/60 border border-slate-700/60 p-2 rounded-xl">
                    <p className="text-[7.5px] text-slate-400 font-bold uppercase">Ngày công</p>
                    <p className="font-extrabold text-[12px] text-amber-400 mt-0.5">21 công</p>
                  </div>
                  <div className="bg-slate-800/60 border border-slate-700/60 p-2 rounded-xl">
                    <p className="text-[7.5px] text-slate-400 font-bold uppercase">Tăng ca</p>
                    <p className="font-extrabold text-[12px] text-indigo-400 mt-0.5">12.5h</p>
                  </div>
                  <div className="bg-slate-800/60 border border-slate-700/60 p-2 rounded-xl">
                    <p className="text-[7.5px] text-slate-400 font-bold uppercase">Quên công</p>
                    <p className="font-extrabold text-[12px] text-slate-200 mt-0.5">0</p>
                  </div>
                  <div className="bg-slate-800/60 border border-slate-700/60 p-2 rounded-xl">
                    <p className="text-[7.5px] text-slate-400 font-bold uppercase">Muộn / Sớm</p>
                    <p className="font-extrabold text-[12px] text-rose-400 mt-0.5">1 lần</p>
                  </div>
                  <div className="bg-slate-800/60 border border-slate-700/60 p-2 rounded-xl">
                    <p className="text-[7.5px] text-slate-400 font-bold uppercase">Không phép</p>
                    <p className="font-extrabold text-[12px] text-emerald-400 mt-0.5">0</p>
                  </div>
                </div>

                {/* Calendar Card Preview */}
                <div className="bg-slate-800/70 border border-slate-700/70 rounded-2xl p-3 space-y-2">
                  <div className="grid grid-cols-7 text-center text-[8px] font-bold text-slate-400 pb-1 border-b border-slate-700/50">
                    <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span className="text-rose-400">CN</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-semibold">
                    {Array.from({ length: 21 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-6 rounded flex items-center justify-center border ${
                          i + 1 === 20 
                            ? 'bg-sky-500 text-slate-950 font-bold border-sky-400 shadow-xs' 
                            : i + 1 < 20 
                            ? 'bg-slate-900/80 text-emerald-400 border-slate-700/50' 
                            : 'bg-slate-900/30 text-slate-500 border-slate-800/40'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ── 3. Exact BottomNavigation.vue Structure with Floating Center QR Button ── */}
          <div className="w-full h-16 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 flex items-center justify-around px-4 relative z-30 shrink-0">
            
            {/* Home Tab */}
            <div 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center w-16 h-full cursor-pointer transition-colors ${
                activeTab === 'home' ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5.5 h-5.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span className="text-[9px] font-bold mt-1">Trang chủ</span>
            </div>

            {/* Scan Tab (Floating Centered Circular Action Button) */}
            <div 
              onClick={() => setActiveTab('scanner')}
              className={`flex flex-col items-center justify-center w-16 h-full relative cursor-pointer ${
                activeTab === 'scanner' ? 'text-sky-400' : 'text-slate-400'
              }`}
            >
              <div className="absolute -top-5 w-14 h-14 bg-gradient-to-tr from-sky-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-sky-400/25 border-4 border-slate-900 text-white transform active:scale-95 hover:opacity-95 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <rect x="3.25" y="3.25" width="5.5" height="5.5" rx="1.25" stroke="white" strokeWidth="1.5" />
                  <rect x="5" y="5" width="2" height="2" fill="white" />
                  <rect x="15.25" y="3.25" width="5.5" height="5.5" rx="1.25" stroke="white" strokeWidth="1.5" />
                  <rect x="17" y="5" width="2" height="2" fill="white" />
                  <rect x="3.25" y="15.25" width="5.5" height="5.5" rx="1.25" stroke="white" strokeWidth="1.5" />
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
              <span className="text-[9px] font-bold mt-7">Quét QR</span>
            </div>

            {/* Schedule Tab */}
            <div 
              onClick={() => setActiveTab('schedule')}
              className={`flex flex-col items-center justify-center w-16 h-full cursor-pointer transition-colors ${
                activeTab === 'schedule' ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5.5 h-5.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <span className="text-[9px] font-bold mt-1">Lịch & Công</span>
            </div>

          </div>

          {/* Home indicator bar */}
          <div className="w-28 h-1 bg-white/20 rounded-full mx-auto mb-1" />
        </div>
      </div>
    </div>
  );
}
