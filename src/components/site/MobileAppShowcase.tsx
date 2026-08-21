'use client';

import React, { useState } from 'react';
import { 
  Moon, 
  SignOut, 
  CheckCircle, 
  CaretRight, 
  Desktop,
  CaretLeft,
  Clock,
  Files,
  Plus,
  WarningCircle,
  Warning,
  X,
  Calendar,
  SignIn
} from '@phosphor-icons/react';

type Tab = 'home' | 'scanner' | 'schedule';

export default function MobileAppShowcase() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedDay, setSelectedDay] = useState<number>(21);

  // Calendar month day mapping for Aug 2026 (Aug 1 is Saturday -> 5 empty prefix slots Mon-Fri)
  const emptyPrefixSlots = 5;
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Helper for calendar dot status
  const getDayDot = (day: number) => {
    if (day === 2 || day === 9 || day === 16 || day === 23 || day === 30) return null; // Weekend
    if (day === 3 || day === 15) return { color: 'bg-rose-500' }; // Không phép / Đi muộn
    if (day === 7 || day === 12 || day === 17 || day === 19) return { color: 'bg-orange-500' }; // Quên chấm
    if (day <= 21) return { color: 'bg-slate-400' }; // Ca làm bình thường
    return null;
  };

  return (
    <div className="w-full flex items-center justify-center p-2 select-none">
      {/* ── Outer Compact iPhone Chassis Frame ── */}
      <div className="relative w-[305px] h-[610px] bg-[#0c1322] rounded-[46px] p-[8px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.18)] ring-1 ring-white/10 flex flex-col justify-between overflow-hidden">
        
        {/* iPhone Side Hardware Buttons */}
        <div className="absolute -left-[2px] top-22 w-[2.5px] h-6 bg-slate-700 rounded-l-xs" />
        <div className="absolute -left-[2px] top-33 w-[2.5px] h-10 bg-slate-700 rounded-l-xs" />
        <div className="absolute -left-[2px] top-46 w-[2.5px] h-10 bg-slate-700 rounded-l-xs" />
        <div className="absolute -right-[2px] top-29 w-[2.5px] h-12 bg-slate-700 rounded-r-xs" />

        {/* ── Inner Retina Screen (Curved & Isolated with matching rounded-[38px]) ── */}
        <div className="relative w-full h-full bg-[#f8fafc] text-slate-800 rounded-[38px] overflow-hidden flex flex-col justify-between border border-slate-200/90 font-sans shadow-inner isolate">
          
          {/* ── 1. iPhone Top Status Bar & Dynamic Island ── */}
          <div className="h-8.5 bg-transparent flex justify-between items-center px-5 shrink-0 text-slate-900 text-[10.5px] font-semibold tracking-tight select-none z-30 pt-1">
            <span className="font-semibold">9:41</span>
            
            {/* iPhone Dynamic Island */}
            <div className="w-19 h-4 rounded-full bg-black flex items-center justify-between px-1.5 border border-slate-900/40 shadow-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0d1627] border border-sky-500/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b]" />
            </div>

            {/* Status Icons: Signal, Wifi & Battery */}
            <div className="flex items-center gap-1 text-slate-900">
              {/* Cellular signal bars */}
              <svg className="w-3 h-2.5" viewBox="0 0 17 12" fill="currentColor">
                <rect x="0" y="9" width="2.5" height="3" rx="0.5" />
                <rect x="4" y="6" width="2.5" height="6" rx="0.5" />
                <rect x="8" y="3" width="2.5" height="9" rx="0.5" />
                <rect x="12" y="0" width="2.5" height="12" rx="0.5" />
              </svg>
              {/* Wifi icon */}
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.79-1.79C9.07 19.64 10.48 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 3.31-6 6z"/>
              </svg>
              {/* Battery icon */}
              <svg className="w-4 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-1 11H4V8h12v8zm5-7.5v5c.83 0 1.5-.67 1.5-1.5v-2c0-.83-.67-1.5-1.5-1.5z"/>
              </svg>
            </div>
          </div>

          {/* ── 2. Scrollable Body Area ── */}
          <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar-light pb-3">
            
            {/* ══════════════ TAB 1: TRANG CHỦ (Ảnh 2 & Ảnh 3) ══════════════ */}
            {activeTab === 'home' && (
              <div className="space-y-2.5">
                {/* Header Profile Panel - Seamless Soft Gradient (No Border Line) */}
                <div className="bg-gradient-to-b from-sky-100/60 via-slate-50/40 to-transparent px-4 pt-1.5 pb-3.5 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 p-[1.5px] shadow-sm shadow-sky-500/10 overflow-hidden shrink-0">
                        <div className="w-full h-full bg-white rounded-[13px] flex items-center justify-center font-extrabold text-[11px] text-sky-600 uppercase tracking-wider">
                          BN
                        </div>
                      </div>
                      <div>
                        <p className="text-[7.5px] text-slate-400 font-bold uppercase tracking-wider">NHÂN VIÊN</p>
                        <h3 className="font-extrabold text-[13px] leading-tight text-slate-900">
                          Bùi Khắc Nghĩa
                        </h3>
                        <p className="text-[8.5px] text-sky-600 font-semibold mt-0.5">BP CNTT &bull; 05A00001315</p>
                      </div>
                    </div>

                    {/* Top Right Action Buttons */}
                    <div className="flex gap-1">
                      <div className="w-7 h-7 rounded-2xl bg-white/90 border border-slate-200 text-slate-500 flex items-center justify-center shadow-xs">
                        <Moon size={13} weight="bold" />
                      </div>
                      <div className="w-7 h-7 rounded-2xl bg-white/90 border border-slate-200 text-slate-500 flex items-center justify-center shadow-xs">
                        <SignOut size={13} weight="bold" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-3 space-y-2.5 relative z-20">
                  
                  {/* Card HÔM NAY: THỨ SÁU, 21/8 (Rounded-3xl, Single Line Header) */}
                  <div className="bg-white rounded-3xl p-3 shadow-md border border-slate-200/70 space-y-2">
                    {/* Card Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <h4 className="font-bold text-[9px] text-slate-800 flex items-center gap-1.5 uppercase tracking-wide whitespace-nowrap">
                        <span className="w-1 h-3 rounded bg-sky-500 shrink-0" />
                        HÔM NAY: THỨ SÁU, 21/8
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[6.5px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 border border-emerald-500/20 whitespace-nowrap shrink-0">
                        ĐÃ CHẤM CÔNG
                      </span>
                    </div>

                    {/* Shift & Activity Grid */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="bg-slate-50/80 p-2 rounded-2xl border border-slate-150 shadow-2xs">
                        <p className="text-[7px] text-slate-400 font-bold uppercase tracking-wider">CA LÀM VIỆC</p>
                        <p className="font-bold text-[9.5px] text-slate-800 mt-0.5 truncate">Hành Chính V...</p>
                        <p className="text-[7.5px] text-slate-500 mt-0.5 font-medium">08:00 - 17:00</p>
                      </div>

                      <div className="bg-slate-50/80 p-2 rounded-2xl border border-slate-150 shadow-2xs">
                        <p className="text-[7px] text-slate-400 font-bold uppercase tracking-wider">HOẠT ĐỘNG</p>
                        <p className="font-bold text-[9.5px] text-emerald-600 mt-0.5">Đúng giờ</p>
                      </div>
                    </div>

                    {/* Clock In / Out Times */}
                    <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center shrink-0">
                          <CheckCircle size={14} weight="bold" />
                        </div>
                        <div>
                          <p className="text-[6.5px] text-slate-400 font-bold uppercase">GIỜ VÀO</p>
                          <p className="font-extrabold text-[10px] text-slate-800 font-mono">07:51:02</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-2xl bg-sky-500/10 text-sky-600 border border-sky-500/20 flex items-center justify-center shrink-0">
                          <SignIn size={14} weight="bold" />
                        </div>
                        <div>
                          <p className="text-[6.5px] text-slate-400 font-bold uppercase">GIỜ RA</p>
                          <p className="font-extrabold text-[10px] text-slate-800 font-mono">--:--</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section LỊCH SỬ CÔNG GẦN ĐÂY */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center px-1">
                      <h4 className="font-bold text-[9px] text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                        <span className="w-1 h-3 rounded bg-sky-500 shrink-0" />
                        LỊCH SỬ CÔNG GẦN ĐÂY
                      </h4>
                      <span 
                        onClick={() => setActiveTab('schedule')}
                        className="text-[8.5px] text-sky-600 font-bold hover:underline cursor-pointer"
                      >
                        Xem thêm
                      </span>
                    </div>

                    {/* Recent History Table Card */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden divide-y divide-slate-150 shadow-sm text-[8.5px]">
                      {/* Row 21/8 */}
                      <div className="p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6.5 h-6.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-[7.5px] flex items-center justify-center">
                            21/8
                          </div>
                          <div>
                            <p className="font-bold text-[9px] text-slate-800">Hành Chính Văn Phòng</p>
                            <p className="text-[7.5px] text-slate-400 font-mono">Vào: 07:51:02 | Ra: --</p>
                          </div>
                        </div>
                        <span className="text-[8px] font-bold text-emerald-600">Đúng giờ</span>
                      </div>

                      {/* Row 20/8 */}
                      <div className="p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6.5 h-6.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-[7.5px] flex items-center justify-center">
                            20/8
                          </div>
                          <div>
                            <p className="font-bold text-[9px] text-slate-800">Hành Chính Văn Phòng</p>
                            <p className="text-[7.5px] text-slate-400 font-mono">Vào: 07:55:54 | Ra: 17:20:22</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] font-bold text-emerald-600 block">Đúng giờ</span>
                          <span className="text-[7px] text-slate-400 font-medium">8.0h công</span>
                        </div>
                      </div>

                      {/* Row 19/8 */}
                      <div className="p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6.5 h-6.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-[7.5px] flex items-center justify-center">
                            19/8
                          </div>
                          <div>
                            <p className="font-bold text-[9px] text-slate-800">Hành Chính Văn Phòng</p>
                            <p className="text-[7.5px] text-slate-400 font-mono">Vào: 07:56:21 | Ra: --</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] font-bold text-orange-500 block">Quên chấm công</span>
                          <span className="text-[7px] text-slate-400 font-medium">8.0h công</span>
                        </div>
                      </div>

                      {/* Row 18/8 */}
                      <div className="p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6.5 h-6.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-[7.5px] flex items-center justify-center">
                            18/8
                          </div>
                          <div>
                            <p className="font-bold text-[9px] text-slate-800">Hành Chính Văn Phòng</p>
                            <p className="text-[7.5px] text-slate-400 font-mono">Vào: 07:55:01 | Ra: 17:11:45</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] font-bold text-emerald-600 block">Đúng giờ</span>
                          <span className="text-[7px] text-slate-400 font-medium">8.0h công</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section THIẾT BỊ ĐANG BÀN GIAO (2) */}
                  <div className="space-y-1.5 pb-2">
                    <h4 className="font-bold text-[9px] text-slate-700 uppercase tracking-wide flex items-center gap-1.5 px-1">
                      <span className="w-1 h-3 rounded bg-indigo-600 shrink-0" />
                      THIẾT BỊ ĐANG BÀN GIAO (2)
                    </h4>

                    {/* Asset 1 */}
                    <div className="bg-white p-2.5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-slate-300 transition-colors">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7.5 h-7.5 rounded-2xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 flex items-center justify-center shrink-0">
                          <Desktop size={15} weight="bold" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[9.5px] text-slate-800 truncate">Màn hình máy tính Dell U2424H</p>
                          <p className="text-[7.5px] text-slate-400 font-semibold truncate">A000001744 &bull; Màn hình</p>
                        </div>
                      </div>
                      <CaretRight size={12} className="text-slate-400 shrink-0" />
                    </div>

                    {/* Asset 2 */}
                    <div className="bg-white p-2.5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-slate-300 transition-colors">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7.5 h-7.5 rounded-2xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 flex items-center justify-center shrink-0">
                          <Desktop size={15} weight="bold" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[9.5px] text-slate-800 truncate">Máy tính để bàn DELL OptiPlex 3090 To...</p>
                          <p className="text-[7.5px] text-slate-400 font-semibold truncate">A000000670 &bull; PC</p>
                        </div>
                      </div>
                      <CaretRight size={12} className="text-slate-400 shrink-0" />
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ══════════════ TAB 2: QUÉT QR (ScannerView.vue) ══════════════ */}
            {activeTab === 'scanner' && (
              <div className="p-3 space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                  <button 
                    onClick={() => setActiveTab('home')} 
                    className="p-1.5 rounded-2xl bg-white border border-slate-200 text-slate-600 cursor-pointer shadow-xs"
                  >
                    <CaretLeft size={12} weight="bold" />
                  </button>
                  <h3 className="text-[9.5px] font-bold tracking-wide uppercase text-slate-800">Quét mã QR thiết bị</h3>
                  <div className="w-4" />
                </div>

                {/* Camera Scanner Viewfinder */}
                <div className="flex flex-col justify-center items-center py-3">
                  <div className="w-[160px] aspect-square rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 relative shadow-lg flex items-center justify-center">
                    
                    {/* Simulated Camera Feed with QR Code pattern */}
                    <div className="w-20 h-20 opacity-30 grid grid-cols-6 gap-1 p-2">
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
                    <div className="absolute inset-2.5 border border-sky-400/40 relative">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-sky-400" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-sky-400" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-sky-400" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-sky-400" />
                      
                      {/* Laser Scanning Line */}
                      <div className="absolute w-full h-0.5 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)] top-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                  </div>

                  <p className="text-[8px] text-slate-500 text-center mt-3 max-w-[160px] leading-relaxed">
                    Hướng camera về phía mã QR dán trên nhãn tài sản thiết bị để tự động tra cứu.
                  </p>
                </div>
              </div>
            )}

            {/* ══════════════ TAB 3: LỊCH & CÔNG (Ảnh 4 & Ảnh 1) ══════════════ */}
            {activeTab === 'schedule' && (
              <div className="space-y-2.5">
                {/* Header - Seamless Soft Gradient */}
                <div className="bg-gradient-to-b from-sky-100/60 via-slate-50/40 to-transparent px-4 pt-1.5 pb-2.5 relative">
                  <h3 className="font-extrabold text-[14px] text-slate-900 leading-tight">Lịch làm & Ngày công</h3>
                  <p className="text-[8.5px] text-sky-600 font-semibold mt-0.5">Theo dõi ca làm và giờ công chi tiết hàng tháng</p>
                </div>

                <div className="px-3 space-y-2.5 relative z-20">
                  {/* Month Selector */}
                  <div className="flex items-center justify-between px-1">
                    <button className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-500 shadow-xs">
                      <CaretLeft size={11} weight="bold" />
                    </button>
                    <h4 className="font-bold text-slate-700 text-[9px] bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                      Tháng 8 / 2026
                    </h4>
                    <button className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-500 shadow-xs">
                      <CaretRight size={11} weight="bold" />
                    </button>
                  </div>

                  {/* 6 Statistics Cards */}
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    {/* Giờ công */}
                    <div className="bg-white border border-slate-200 p-1.5 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                      <div className="w-5.5 h-5.5 rounded-lg bg-sky-500/10 text-sky-600 border border-sky-500/20 flex items-center justify-center mb-0.5">
                        <Clock size={12} weight="bold" />
                      </div>
                      <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">GIỜ CÔNG</p>
                      <p className="font-extrabold text-[10px] text-slate-800 mt-0.5">102.2h</p>
                    </div>

                    {/* Ngày công */}
                    <div className="bg-white border border-slate-200 p-1.5 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                      <div className="w-5.5 h-5.5 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center mb-0.5">
                        <Files size={12} weight="bold" />
                      </div>
                      <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">NGÀY CÔNG</p>
                      <p className="font-extrabold text-[10px] text-slate-800 mt-0.5">16 công</p>
                    </div>

                    {/* Tăng ca */}
                    <div className="bg-white border border-slate-200 p-1.5 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                      <div className="w-5.5 h-5.5 rounded-lg bg-violet-500/10 text-violet-600 border border-violet-500/20 flex items-center justify-center mb-0.5">
                        <Plus size={12} weight="bold" />
                      </div>
                      <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">TĂNG CA</p>
                      <p className="font-extrabold text-[10px] text-slate-800 mt-0.5">0h</p>
                    </div>

                    {/* Quên công */}
                    <div className="bg-white border border-slate-200 p-1.5 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                      <div className="w-5.5 h-5.5 rounded-lg bg-orange-500/10 text-orange-600 border border-orange-500/20 flex items-center justify-center mb-0.5">
                        <WarningCircle size={12} weight="bold" />
                      </div>
                      <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">QUÊN CÔNG</p>
                      <p className="font-extrabold text-[10px] text-slate-800 mt-0.5">4 ngày</p>
                    </div>

                    {/* Muộn / Sớm */}
                    <div className="bg-white border border-slate-200 p-1.5 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                      <div className="w-5.5 h-5.5 rounded-lg bg-rose-500/10 text-rose-600 border border-rose-500/20 flex items-center justify-center mb-0.5">
                        <Warning size={12} weight="bold" />
                      </div>
                      <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">MUỘN / SỚM</p>
                      <p className="font-extrabold text-[10px] text-slate-800 mt-0.5">2 ngày</p>
                    </div>

                    {/* Không phép */}
                    <div className="bg-white border border-slate-200 p-1.5 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                      <div className="w-5.5 h-5.5 rounded-lg bg-red-500/10 text-red-600 border border-red-500/20 flex items-center justify-center mb-0.5">
                        <X size={12} weight="bold" />
                      </div>
                      <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">KHÔNG PHÉP</p>
                      <p className="font-extrabold text-[10px] text-slate-800 mt-0.5">1 ngày</p>
                    </div>
                  </div>

                  {/* Calendar Card */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-3 shadow-sm space-y-2">
                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 text-center text-[8.5px] font-extrabold text-slate-700 pb-1 border-b border-slate-150">
                      <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span className="text-rose-600">CN</span>
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-y-1 gap-x-1 text-center">
                      {/* Empty Prefix Slots */}
                      {Array.from({ length: emptyPrefixSlots }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                      ))}

                      {/* Month Days */}
                      {daysInMonth.map((day) => {
                        const isSelected = selectedDay === day;
                        const isSunday = (day + emptyPrefixSlots) % 7 === 0;
                        const dot = getDayDot(day);

                        return (
                          <div 
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`aspect-square flex flex-col items-center justify-between p-0.5 rounded-2xl transition-all cursor-pointer relative ${
                              isSelected 
                                ? 'bg-gradient-to-tr from-sky-400 to-indigo-600 text-white shadow-md shadow-sky-500/20 scale-105' 
                                : isSunday 
                                ? 'text-rose-500 hover:bg-slate-100' 
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span className="text-[9px] font-bold">{day}</span>
                            <div className="h-1 flex items-center justify-center">
                              {dot && (
                                <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : dot.color}`} />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Legend */}
                    <div className="flex justify-between items-center pt-1.5 border-t border-slate-150 text-[6.5px] font-bold text-slate-600 uppercase tracking-tight">
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-slate-400" />
                        <span>CA LÀM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-rose-400" />
                        <span>ĐI MUỘN</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-orange-500" />
                        <span>QUÊN CHẤM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-rose-600" />
                        <span>KHÔNG PHÉP</span>
                      </div>
                    </div>
                  </div>

                  {/* Day Details Card: CHI TIẾT NGÀY */}
                  <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-200 space-y-2 pb-1.5">
                    <div className="flex items-center justify-between border-b border-slate-150 pb-1">
                      <h5 className="font-extrabold text-slate-800 text-[9px] uppercase tracking-wide">
                        CHI TIẾT NGÀY {selectedDay}/8/2026
                      </h5>
                      <span className="px-2 py-0.5 rounded-full text-[6.5px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                        ĐÚNG GIỜ
                      </span>
                    </div>

                    {/* Shift Assigned */}
                    <div className="bg-slate-50/80 p-2 rounded-2xl border border-slate-150 space-y-0.5">
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-lg bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 flex items-center justify-center shrink-0">
                          <Calendar size={11} weight="bold" />
                        </div>
                        <p className="text-[6.5px] text-slate-500 font-extrabold uppercase tracking-wider">CA LÀM ĐƯỢC PHÂN</p>
                      </div>
                      <p className="font-extrabold text-[9.5px] text-slate-800">Hành Chính Văn Phòng</p>
                      <p className="text-[7.5px] text-slate-500 font-medium">Thời gian: 08:00 - 17:00</p>
                    </div>

                    {/* Actual Times */}
                    <div className="bg-slate-50/80 p-2 rounded-2xl border border-slate-150 space-y-1">
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-lg bg-sky-500/10 text-sky-600 border border-sky-500/20 flex items-center justify-center shrink-0">
                          <CheckCircle size={11} weight="bold" />
                        </div>
                        <p className="text-[6.5px] text-slate-500 font-extrabold uppercase tracking-wider">GIỜ VÀO / RA THỰC TẾ</p>
                      </div>
                      <div className="flex justify-between items-center text-[8.5px]">
                        <span className="text-slate-500 font-medium">Giờ vào (In):</span>
                        <span className="font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded-lg border border-slate-200 font-mono">07:51:02</span>
                      </div>
                      <div className="flex justify-between items-center text-[8.5px]">
                        <span className="text-slate-500 font-medium">Giờ ra (Out):</span>
                        <span className="font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded-lg border border-slate-200 font-mono">--:--</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* ── 3. Exact iPhone Bottom Navigation Bar (rounded-b-[38px]) ── */}
          <div className="w-full bg-white/95 backdrop-blur-xl border-t border-slate-200/90 pt-1 pb-1.5 px-3 rounded-b-[38px] flex flex-col items-center z-30 shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
            
            {/* Tab Items Row */}
            <div className="w-full h-10 flex items-center justify-around relative">
              
              {/* Home Tab */}
              <div 
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center justify-center w-12 cursor-pointer transition-colors ${
                  activeTab === 'home' ? 'text-sky-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span className="text-[7.5px] font-bold mt-0.5">Trang chủ</span>
              </div>

              {/* Scan Tab */}
              <div 
                onClick={() => setActiveTab('scanner')}
                className="flex flex-col items-center justify-center w-12 relative cursor-pointer"
              >
                <div className="absolute -top-3.5 w-10.5 h-10.5 bg-gradient-to-tr from-sky-400 to-indigo-600 rounded-full flex items-center justify-center shadow-md shadow-sky-400/30 border-[2.5px] border-slate-50 text-white transform active:scale-95 hover:opacity-95 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
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
                <span className={`text-[7px] font-bold mt-7 ${activeTab === 'scanner' ? 'text-sky-600' : 'text-slate-400'}`}>
                  Quét QR
                </span>
              </div>

              {/* Schedule Tab */}
              <div 
                onClick={() => setActiveTab('schedule')}
                className={`flex flex-col items-center justify-center w-12 cursor-pointer transition-colors ${
                  activeTab === 'schedule' ? 'text-sky-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <span className="text-[7.5px] font-bold mt-0.5">Lịch & Công</span>
              </div>

            </div>

            {/* iPhone Home Indicator Bar */}
            <div className="w-26 h-1 bg-slate-900 rounded-full shrink-0 mt-0.5" />
          </div>

        </div>
      </div>
    </div>
  );
}
