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
  SignIn, 
  User, 
  Cpu, 
  Globe, 
  Camera 
} from '@phosphor-icons/react';

type Tab = 'home' | 'scanner' | 'schedule' | 'device-detail';

interface AssetDetail {
  code: string;
  name: string;
  category: string;
  status: string;
  serialNumber: string;
  serviceTag: string;
  cpu: string;
  ram: string;
  hardDrive: string;
  employeeName: string;
  employeeCode: string;
  department: string;
  vendor: string;
  ipAddress: string;
  macAddress: string;
  purchaseDate: string;
  warranty: string;
}

const ASSET_DATABASE: Record<string, AssetDetail> = {
  'A000001744': {
    code: 'A000001744',
    name: 'Màn hình máy tính Dell U2424H',
    category: 'Màn hình',
    status: 'Đang sử dụng',
    serialNumber: 'CN-012345-71618',
    serviceTag: '7XYZ921',
    cpu: 'IPS 23.8" FHD 120Hz 99% sRGB',
    ram: '100% Recycled Aluminum Frame',
    hardDrive: '1x DP 1.4, 1x HDMI 1.4, 1x Type-C 90W',
    employeeName: 'Bùi Khắc Nghĩa',
    employeeCode: '05A00001315',
    department: 'BP CNTT',
    vendor: 'Dell Việt Nam',
    ipAddress: '—',
    macAddress: '—',
    purchaseDate: '15/1/2024',
    warranty: '36 tháng'
  },
  'A000000670': {
    code: 'A000000670',
    name: 'Máy tính để bàn DELL OptiPlex 3090 Tower',
    category: 'PC',
    status: 'Đang sử dụng',
    serialNumber: '8XYZ921-VN',
    serviceTag: '9ABC123',
    cpu: 'Intel Core i7-10700 @ 2.90GHz',
    ram: '16 GB DDR4 3200MHz',
    hardDrive: '512 GB PCIe NVMe M.2 SSD',
    employeeName: 'Bùi Khắc Nghĩa',
    employeeCode: '05A00001315',
    department: 'BP CNTT',
    vendor: 'Dell Việt Nam',
    ipAddress: '192.168.1.145',
    macAddress: 'D8:BB:C1:42:A8:19',
    purchaseDate: '10/8/2023',
    warranty: '36 tháng'
  }
};

export default function MobileAppShowcase() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedDay, setSelectedDay] = useState<number>(21);
  const [selectedAssetCode, setSelectedAssetCode] = useState<string>('A000001744');

  // Calendar month day mapping for Aug 2026 (Aug 1 is Saturday -> 5 empty prefix slots Mon-Fri)
  const emptyPrefixSlots = 5;
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Helper for calendar dot status
  const getDayDot = (day: number) => {
    if (day === 2 || day === 9 || day === 16 || day === 23 || day === 30) return null; // Weekend
    if (day === 3) return { color: 'bg-rose-600' }; // Không phép
    if (day === 15) return { color: 'bg-rose-400' }; // Đi muộn
    if (day === 7 || day === 12 || day === 17 || day === 19) return { color: 'bg-orange-500' }; // Quên chấm
    if (day <= 21) return { color: 'bg-slate-400' }; // Ca làm bình thường
    return null;
  };

  // Dynamic Day Details Calculation for August 2026
  const getDayDetailInfo = (day: number) => {
    const isSunday = (day + emptyPrefixSlots) % 7 === 0;
    const isSaturday = (day + emptyPrefixSlots) % 7 === 6;

    if (isSunday) {
      return {
        label: 'NGÀY CUỐI TUẦN',
        badge: 'NGHỈ TUẦN',
        badgeClass: 'bg-slate-100 text-slate-600 border border-slate-200',
        hasPlan: false,
        shiftName: 'Nghỉ hàng tuần',
        shiftTime: '—',
        hasLog: false,
        inTime: '--:--',
        outTime: '--:--',
        workHours: 0,
        workDays: 0,
        lateMinutes: 0,
        note: 'Không có ca làm việc được phân.'
      };
    }

    if (day === 21) {
      return {
        label: 'ĐÃ CHẤM CÔNG',
        badge: 'ĐÚNG GIỜ',
        badgeClass: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
        hasPlan: true,
        shiftName: 'Hành chính',
        shiftTime: '08:00 - 17:00',
        hasLog: true,
        inTime: '07:51:02',
        outTime: '--:--',
        workHours: 0,
        workDays: 0,
        lateMinutes: 0,
        note: 'Ca làm việc đang diễn ra.'
      };
    }

    if (day === 20 || day === 18 || day === 14 || day === 13 || day === 11 || day === 10 || day === 8 || day === 6 || day === 5 || day === 4 || day === 1) {
      return {
        label: 'HOÀN THÀNH CA',
        badge: 'ĐÚNG GIỜ',
        badgeClass: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
        hasPlan: true,
        shiftName: 'Hành chính',
        shiftTime: '08:00 - 17:00',
        hasLog: true,
        inTime: day === 20 ? '07:55:54' : '07:55:01',
        outTime: day === 20 ? '17:20:22' : '17:11:45',
        workHours: 8.0,
        workDays: 1.0,
        lateMinutes: 0,
        note: 'Đã hoàn thành đủ giờ công.'
      };
    }

    if (day === 19 || day === 17 || day === 12 || day === 7) {
      return {
        label: 'CHƯA CHẤM RA',
        badge: 'QUÊN CHẤM CÔNG',
        badgeClass: 'bg-orange-50 text-orange-600 border border-orange-200',
        hasPlan: true,
        shiftName: 'Hành chính',
        shiftTime: '08:00 - 17:00',
        hasLog: true,
        inTime: '07:56:21',
        outTime: '--:--',
        workHours: 8.0,
        workDays: 1.0,
        lateMinutes: 0,
        note: 'Hệ thống tự động ghi nhận theo quy định.'
      };
    }

    if (day === 15) {
      return {
        label: 'ĐI MUỘN 14 PHÚT',
        badge: 'ĐI MUỘN',
        badgeClass: 'bg-rose-50 text-rose-600 border border-rose-200',
        hasPlan: true,
        shiftName: 'Hành chính',
        shiftTime: '08:00 - 17:00',
        hasLog: true,
        inTime: '08:14:32',
        outTime: '17:05:10',
        workHours: 7.75,
        workDays: 1.0,
        lateMinutes: 14,
        note: 'Đi muộn sau giờ bắt đầu ca.'
      };
    }

    if (day === 3) {
      return {
        label: 'VẮNG MẶT',
        badge: 'KHÔNG PHÉP',
        badgeClass: 'bg-red-50 text-red-600 border border-red-200',
        hasPlan: true,
        shiftName: 'Hành chính',
        shiftTime: '08:00 - 17:00',
        hasLog: false,
        inTime: '--:--',
        outTime: '--:--',
        workHours: 0,
        workDays: 0,
        lateMinutes: 0,
        note: 'Chưa có dữ liệu chấm công trong ngày.'
      };
    }

    // Future days (>= 22)
    return {
      label: isSaturday ? 'THỨ BẢY' : 'NGÀY LÀM VIỆC',
      badge: 'CHƯA DIỄN RA',
      badgeClass: 'bg-sky-50 text-sky-600 border border-sky-200',
      hasPlan: true,
      shiftName: 'Hành chính',
      shiftTime: '08:00 - 17:00',
      hasLog: false,
      inTime: '--:--',
      outTime: '--:--',
      workHours: 0,
      workDays: 0,
      lateMinutes: 0,
      note: 'Ca làm việc chưa bắt đầu.'
    };
  };

  const currentDayInfo = getDayDetailInfo(selectedDay);
  const currentAsset = ASSET_DATABASE[selectedAssetCode] || ASSET_DATABASE['A000001744'];

  const handleOpenAsset = (code: string) => {
    setSelectedAssetCode(code);
    setActiveTab('device-detail');
  };

  return (
    <div className="w-full flex items-center justify-center py-0 select-none">
      {/* ── Scaled Phone Wrapper (10% Reduction -> 90% Scale) ── */}
      <div className="scale-90 origin-center transition-transform duration-300 -my-7">
        {/* ── Outer iPhone Chassis Frame (340px x 670px) ── */}
        <div className="relative w-[340px] h-[670px] bg-[#0c1322] rounded-[48px] p-[10px] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.18)] ring-1 ring-white/10 flex flex-col justify-between overflow-hidden">
          
          {/* iPhone Side Hardware Buttons */}
          <div className="absolute -left-[2px] top-24 w-[3px] h-7 bg-slate-700 rounded-l-xs" />
          <div className="absolute -left-[2px] top-36 w-[3px] h-11 bg-slate-700 rounded-l-xs" />
          <div className="absolute -left-[2px] top-50 w-[3px] h-11 bg-slate-700 rounded-l-xs" />
          <div className="absolute -right-[2px] top-32 w-[3px] h-14 bg-slate-700 rounded-r-xs" />

          {/* ── Inner Retina Screen (Curved & Isolated with matching rounded-[38px]) ── */}
          <div className="relative w-full h-full bg-[#f8fafc] text-slate-800 rounded-[38px] overflow-hidden flex flex-col justify-between border border-slate-200/90 font-sans shadow-inner isolate">
            
            {/* ── 1. iPhone Top Status Bar & Dynamic Island ── */}
            <div className="relative h-10 bg-transparent flex justify-between items-center px-6 shrink-0 text-slate-900 select-none z-30 pt-1.5">
              {/* Left: Time */}
              <span className="font-bold text-[12px] tracking-tight pl-0.5">9:41</span>
              
              {/* iPhone Dynamic Island (Centered Absolutely) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-24 h-[19px] rounded-full bg-black flex items-center justify-between px-2.5 shadow-sm ring-1 ring-white/10 z-40">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0a1120] border border-[#1e293b]/60 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#1e3a8a]/40" />
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#0a1120] border border-[#1e293b]/60" />
              </div>

              {/* Right: Status Icons (Signal, Wifi & Battery) */}
              <div className="flex items-center gap-1.5 text-slate-900 pr-0.5">
                {/* iOS Cellular signal bars */}
                <svg className="w-[15px] h-[10px]" viewBox="0 0 17 12" fill="currentColor">
                  <rect x="0.5" y="8.5" width="2.5" height="3.5" rx="0.8" />
                  <rect x="4.8" y="6" width="2.5" height="6" rx="0.8" />
                  <rect x="9.2" y="3.5" width="2.5" height="8.5" rx="0.8" />
                  <rect x="13.5" y="0.5" width="2.5" height="11.5" rx="0.8" />
                </svg>
                {/* iOS Wifi icon */}
                <svg className="w-[14px] h-[11px]" viewBox="0 0 16 12" fill="currentColor">
                  <path d="M8 9.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Zm-3.5-3.3a5.1 5.1 0 0 1 7 0 .75.75 0 0 1-1.06 1.06 3.6 3.6 0 0 0-4.88 0 .75.75 0 1 1-1.06-1.06Zm-2.8-2.8a9 9 0 0 1 12.6 0 .75.75 0 0 1-1.06 1.06 7.5 7.5 0 0 0-10.48 0 .75.75 0 0 1-1.06-1.06Z" />
                </svg>
                {/* iOS Battery icon */}
                <div className="flex items-center gap-[1px]">
                  <div className="w-[20px] h-[10.5px] rounded-[3.5px] border-[1.2px] border-slate-900 p-[1.5px] flex items-center">
                    <div className="h-full w-full bg-slate-900 rounded-[1.5px]" />
                  </div>
                  <div className="w-[1.5px] h-[4px] bg-slate-900 rounded-r-[1px]" />
                </div>
              </div>
            </div>

            {/* ── 2. Scrollable Body Area (Unified rounded-2xl standard) ── */}
            <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar-light pb-4">
              
              {/* ══════════════ TAB 1: TRANG CHỦ ══════════════ */}
              {activeTab === 'home' && (
                <div className="space-y-3.5">
                  {/* Header Profile Panel - Seamless Soft Gradient */}
                  <div className="bg-gradient-to-b from-sky-100/70 via-slate-50/40 to-transparent px-5 pt-2 pb-4 relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 p-[1.5px] shadow-sm shadow-sky-500/15 overflow-hidden shrink-0">
                          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-extrabold text-[11px] text-sky-600 uppercase tracking-wider">
                            BN
                          </div>
                        </div>
                        <div>
                          <p className="text-[7px] text-slate-400 font-bold uppercase tracking-wider block">NHÂN VIÊN</p>
                          <h3 className="font-extrabold text-[12.5px] text-slate-900 leading-snug mt-0.5 block">
                            Bùi Khắc Nghĩa
                          </h3>
                          <p className="text-[8.5px] text-sky-600 font-semibold mt-0.5 block">BP CNTT &bull; 05A00001315</p>
                        </div>
                      </div>

                      {/* Top Right Action Buttons */}
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-2xl bg-white/90 border border-slate-200 text-slate-500 flex items-center justify-center shadow-xs">
                          <Moon size={13} weight="bold" />
                        </div>
                        <div className="w-8 h-8 rounded-2xl bg-white/90 border border-slate-200 text-slate-500 flex items-center justify-center shadow-xs">
                          <SignOut size={13} weight="bold" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 space-y-3.5 relative z-20">
                    
                    {/* Card HÔM NAY: THỨ SÁU, 21/8 (Unified rounded-2xl) */}
                    <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/80 space-y-2.5">
                      {/* Card Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="font-bold text-[9px] text-slate-800 flex items-center gap-1.5 uppercase tracking-wide whitespace-nowrap">
                          <span className="w-1 h-3 rounded bg-sky-500 shrink-0" />
                          HÔM NAY: THỨ SÁU, 21/8
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[6.5px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 border border-emerald-500/20 whitespace-nowrap shrink-0">
                          ĐÃ CHẤM CÔNG
                        </span>
                      </div>

                      {/* Shift & Activity Grid (Unified rounded-2xl) */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="bg-slate-50/80 p-2.5 rounded-2xl border border-slate-150 shadow-2xs">
                          <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">CA LÀM VIỆC</p>
                          <p className="font-bold text-[9.5px] text-slate-800 mt-1 truncate leading-tight">Hành chính</p>
                          <p className="text-[8px] text-slate-500 mt-1 font-medium">08:00 - 17:00</p>
                        </div>

                        <div className="bg-slate-50/80 p-2.5 rounded-2xl border border-slate-150 shadow-2xs">
                          <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">HOẠT ĐỘNG</p>
                          <p className="font-bold text-[9.5px] text-emerald-600 mt-1 leading-tight">Đúng giờ</p>
                        </div>
                      </div>

                      {/* Clock In / Out Times (Unified rounded-2xl) */}
                      <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center shrink-0">
                            <CheckCircle size={15} weight="bold" />
                          </div>
                          <div>
                            <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">GIỜ VÀO</p>
                            <p className="font-extrabold text-[9.5px] text-slate-800 font-mono mt-0.5">07:51:02</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-2xl bg-sky-500/10 text-sky-600 border border-sky-500/20 flex items-center justify-center shrink-0">
                            <SignIn size={15} weight="bold" />
                          </div>
                          <div>
                            <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">GIỜ RA</p>
                            <p className="font-extrabold text-[9.5px] text-slate-800 font-mono mt-0.5">--:--</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section LỊCH SỬ CÔNG GẦN ĐÂY */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center px-1">
                        <h4 className="font-bold text-[9px] text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                          <span className="w-1 h-3 rounded bg-sky-500 shrink-0" />
                          LỊCH SỬ CÔNG GẦN ĐÂY
                        </h4>
                        <span 
                          onClick={() => setActiveTab('schedule')}
                          className="text-[8.5px] text-sky-600 font-bold hover:underline cursor-pointer transition-colors"
                        >
                          Xem thêm
                        </span>
                      </div>

                      {/* Recent History Table Card (Unified rounded-2xl) */}
                      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden divide-y divide-slate-150 shadow-sm text-[8.5px]">
                        {/* Row 21/8 */}
                        <div 
                          onClick={() => { setSelectedDay(21); setActiveTab('schedule'); }}
                          className="p-2.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7.5 h-7.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-[8px] flex items-center justify-center shrink-0">
                              21/8
                            </div>
                            <div>
                              <p className="font-bold text-[9.5px] text-slate-800 leading-snug">Hành chính</p>
                              <p className="text-[7.5px] text-slate-400 font-mono mt-0.5">Vào: 07:51:02 | Ra: --</p>
                            </div>
                          </div>
                          <span className="text-[8.5px] font-bold text-emerald-600">Đúng giờ</span>
                        </div>

                        {/* Row 20/8 */}
                        <div 
                          onClick={() => { setSelectedDay(20); setActiveTab('schedule'); }}
                          className="p-2.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7.5 h-7.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-[8px] flex items-center justify-center shrink-0">
                              20/8
                            </div>
                            <div>
                              <p className="font-bold text-[9.5px] text-slate-800 leading-snug">Hành chính</p>
                              <p className="text-[7.5px] text-slate-400 font-mono mt-0.5">Vào: 07:55:54 | Ra: 17:20:22</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[8.5px] font-bold text-emerald-600 block">Đúng giờ</span>
                            <span className="text-[7.5px] text-slate-400 font-medium mt-0.5 block">8.0h công</span>
                          </div>
                        </div>

                        {/* Row 19/8 */}
                        <div 
                          onClick={() => { setSelectedDay(19); setActiveTab('schedule'); }}
                          className="p-2.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7.5 h-7.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-[8px] flex items-center justify-center shrink-0">
                              19/8
                            </div>
                            <div>
                              <p className="font-bold text-[9.5px] text-slate-800 leading-snug">Hành chính</p>
                              <p className="text-[7.5px] text-slate-400 font-mono mt-0.5">Vào: 07:56:21 | Ra: --</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[8.5px] font-bold text-orange-500 block">Quên chấm công</span>
                            <span className="text-[7.5px] text-slate-400 font-medium mt-0.5 block">8.0h công</span>
                          </div>
                        </div>

                        {/* Row 18/8 */}
                        <div 
                          onClick={() => { setSelectedDay(18); setActiveTab('schedule'); }}
                          className="p-2.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7.5 h-7.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-[8px] flex items-center justify-center shrink-0">
                              18/8
                            </div>
                            <div>
                              <p className="font-bold text-[9.5px] text-slate-800 leading-snug">Hành chính</p>
                              <p className="text-[7.5px] text-slate-400 font-mono mt-0.5">Vào: 07:55:01 | Ra: 17:11:45</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[8.5px] font-bold text-emerald-600 block">Đúng giờ</span>
                            <span className="text-[7.5px] text-slate-400 font-medium mt-0.5 block">8.0h công</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section THIẾT BỊ ĐANG BÀN GIAO (2) - Clickable cards */}
                    <div className="space-y-2 pb-2">
                      <h4 className="font-bold text-[9px] text-slate-700 uppercase tracking-wide flex items-center gap-1.5 px-0.5">
                        <span className="w-1 h-3 rounded bg-indigo-600 shrink-0" />
                        THIẾT BỊ ĐANG BÀN GIAO (2)
                      </h4>

                      {/* Asset 1 */}
                      <div 
                        onClick={() => handleOpenAsset('A000001744')}
                        className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:border-indigo-300 active:scale-[0.99] cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 flex items-center justify-center shrink-0">
                            <Desktop size={16} weight="bold" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[9.5px] text-slate-800 truncate leading-snug">Màn hình máy tính Dell U2424H</p>
                            <p className="text-[8px] text-slate-400 font-semibold truncate mt-0.5">A000001744 &bull; Màn hình</p>
                          </div>
                        </div>
                        <CaretRight size={12} className="text-slate-400 shrink-0" />
                      </div>

                      {/* Asset 2 */}
                      <div 
                        onClick={() => handleOpenAsset('A000000670')}
                        className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:border-indigo-300 active:scale-[0.99] cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 flex items-center justify-center shrink-0">
                            <Desktop size={16} weight="bold" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[9.5px] text-slate-800 truncate leading-snug">Máy tính để bàn DELL OptiPlex 3090 To...</p>
                            <p className="text-[8px] text-slate-400 font-semibold truncate mt-0.5">A000000670 &bull; PC</p>
                          </div>
                        </div>
                        <CaretRight size={12} className="text-slate-400 shrink-0" />
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* ══════════════ TAB 4: CHI TIẾT THIẾT BỊ (Chuẩn 100% DeviceDetailView.vue) ══════════════ */}
              {activeTab === 'device-detail' && (
                <div className="space-y-3 pb-3">
                  {/* Header */}
                  <div className="bg-gradient-to-b from-sky-100/70 via-slate-50/40 to-transparent px-5 pt-2 pb-3.5 flex items-center gap-3 relative">
                    <button 
                      onClick={() => setActiveTab('home')} 
                      className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 cursor-pointer shadow-xs active:scale-95 transition-all"
                    >
                      <CaretLeft size={14} weight="bold" />
                    </button>
                    <div>
                      <h3 className="font-extrabold text-[13px] text-slate-900 leading-tight">Chi tiết thiết bị</h3>
                      <p className="text-[8px] text-slate-500 font-medium">Thông tin chi tiết tài sản của doanh nghiệp</p>
                    </div>
                  </div>

                  <div className="px-4 space-y-3">
                    {/* Card 1: Basic Information */}
                    <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/80 space-y-2.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[7.5px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                            {{ 'Màn hình': 'Màn hình', 'PC': 'Tài sản CNTT' }[currentAsset.category] || 'Tài sản CNTT'}
                          </span>
                          <h4 className="font-extrabold text-[11.5px] text-slate-900 mt-1 leading-snug">
                            {currentAsset.name}
                          </h4>
                          <p className="text-[9px] font-bold text-sky-600 mt-0.5">{currentAsset.code}</p>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[7.5px] font-bold bg-sky-500/10 text-sky-600 border border-sky-500/20">
                          {currentAsset.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-2 pt-2.5 border-t border-slate-100 text-[8.5px]">
                        <div>
                          <p className="text-[7px] text-slate-400 font-bold uppercase">SERIAL NUMBER</p>
                          <p className="font-bold text-slate-750 mt-0.5 font-mono">{currentAsset.serialNumber}</p>
                        </div>
                        <div>
                          <p className="text-[7px] text-slate-400 font-bold uppercase">SERVICE TAG</p>
                          <p className="font-bold text-slate-750 mt-0.5 font-mono">{currentAsset.serviceTag}</p>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Specifications (Cấu hình phần cứng) */}
                    <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/80 space-y-2.5">
                      <h5 className="font-bold text-[9px] text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Cpu size={13} weight="bold" className="text-sky-500" />
                        Cấu hình phần cứng
                      </h5>
                      <div className="grid grid-cols-2 gap-y-2 text-[8.5px] pt-0.5">
                        <div>
                          <p className="text-[7px] text-slate-400 font-bold uppercase">CPU</p>
                          <p className="font-bold text-slate-750 mt-0.5">{currentAsset.cpu}</p>
                        </div>
                        <div>
                          <p className="text-[7px] text-slate-400 font-bold uppercase">RAM</p>
                          <p className="font-bold text-slate-750 mt-0.5">{currentAsset.ram}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-[7px] text-slate-400 font-bold uppercase">Ổ CỨNG</p>
                          <p className="font-bold text-slate-750 mt-0.5">{currentAsset.hardDrive}</p>
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Assignment Information (Quản lý & Sử dụng) */}
                    <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/80 space-y-2.5">
                      <h5 className="font-bold text-[9px] text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <User size={13} weight="bold" className="text-sky-500" />
                        Quản lý & Sử dụng
                      </h5>
                      <div className="grid grid-cols-2 gap-y-2 text-[8.5px] pt-0.5">
                        <div className="col-span-2">
                          <p className="text-[7px] text-slate-400 font-bold uppercase">NGƯỜI SỬ DỤNG</p>
                          <p className="font-bold text-slate-750 mt-0.5">{currentAsset.employeeName} ({currentAsset.employeeCode})</p>
                        </div>
                        <div>
                          <p className="text-[7px] text-slate-400 font-bold uppercase">PHÒNG BAN QUẢN LÝ</p>
                          <p className="font-bold text-slate-750 mt-0.5">{currentAsset.department}</p>
                        </div>
                        <div>
                          <p className="text-[7px] text-slate-400 font-bold uppercase">NHÀ CUNG CẤP</p>
                          <p className="font-bold text-slate-750 mt-0.5">{currentAsset.vendor}</p>
                        </div>
                      </div>
                    </div>

                    {/* Card 4: Network & Procurement (Mạng & Mua sắm) */}
                    <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/80 space-y-2.5">
                      <h5 className="font-bold text-[9px] text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Globe size={13} weight="bold" className="text-sky-500" />
                        Mạng & Mua sắm
                      </h5>
                      <div className="grid grid-cols-2 gap-y-2 text-[8.5px] pt-0.5">
                        <div>
                          <p className="text-[7px] text-slate-400 font-bold uppercase">ĐỊA CHỈ IP</p>
                          <p className="font-bold text-slate-750 mt-0.5 font-mono">{currentAsset.ipAddress}</p>
                        </div>
                        <div>
                          <p className="text-[7px] text-slate-400 font-bold uppercase">ĐỊA CHỈ MAC</p>
                          <p className="font-bold text-slate-750 mt-0.5 font-mono">{currentAsset.macAddress}</p>
                        </div>
                        <div>
                          <p className="text-[7px] text-slate-400 font-bold uppercase">NGÀY MUA</p>
                          <p className="font-bold text-slate-750 mt-0.5">{currentAsset.purchaseDate}</p>
                        </div>
                        <div>
                          <p className="text-[7px] text-slate-400 font-bold uppercase">BẢO HÀNH</p>
                          <p className="font-bold text-slate-750 mt-0.5">{currentAsset.warranty}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button: Quét thiết bị tiếp theo */}
                    <button 
                      onClick={() => setActiveTab('scanner')}
                      className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 rounded-2xl text-[9px] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <Camera size={14} weight="bold" />
                      Quét thiết bị tiếp theo
                    </button>
                  </div>
                </div>
              )}

              {/* ══════════════ TAB 2: QUÉT QR ══════════════ */}
              {activeTab === 'scanner' && (
                <div className="p-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <button 
                      onClick={() => setActiveTab('home')} 
                      className="p-1.5 rounded-2xl bg-white border border-slate-200 text-slate-600 cursor-pointer shadow-xs active:scale-95 transition-all"
                    >
                      <CaretLeft size={13} weight="bold" />
                    </button>
                    <h3 className="text-[9px] font-bold tracking-wide uppercase text-slate-800">Quét mã QR thiết bị</h3>
                    <div className="w-5" />
                  </div>

                  {/* Camera Scanner Viewfinder */}
                  <div className="flex flex-col justify-center items-center py-4">
                    <div className="w-[180px] aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative shadow-lg flex items-center justify-center">
                      
                      {/* Simulated Camera Feed with QR Code pattern */}
                      <div className="w-22 h-22 opacity-30 grid grid-cols-6 gap-1 p-2">
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
                      <div className="absolute inset-3 border border-sky-400/40 relative">
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-sky-400" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-sky-400" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-sky-400" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-sky-400" />
                        
                        {/* Laser Scanning Line */}
                        <div className="absolute w-full h-0.5 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)] top-1/2 -translate-y-1/2 animate-pulse" />
                      </div>
                    </div>

                    <p className="text-[8.5px] text-slate-500 text-center mt-3.5 max-w-[180px] leading-relaxed">
                      Hướng camera về phía mã QR dán trên nhãn tài sản thiết bị để tự động tra cứu.
                    </p>
                  </div>
                </div>
              )}

              {/* ══════════════ TAB 3: LỊCH & CÔNG ══════════════ */}
              {activeTab === 'schedule' && (
                <div className="space-y-3.5">
                  {/* Header - Seamless Soft Gradient */}
                  <div className="bg-gradient-to-b from-sky-100/70 via-slate-50/40 to-transparent px-5 pt-2 pb-3 relative">
                    <h3 className="font-extrabold text-[14px] text-slate-900 leading-snug">Lịch làm & Ngày công</h3>
                    <p className="text-[8.5px] text-sky-600 font-semibold mt-0.5">Theo dõi ca làm và giờ công chi tiết hàng tháng</p>
                  </div>

                  <div className="px-4 space-y-3.5 relative z-20">
                    {/* Month Selector */}
                    <div className="flex items-center justify-between px-1">
                      <button className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-500 shadow-xs">
                        <CaretLeft size={12} weight="bold" />
                      </button>
                      <h4 className="font-bold text-slate-700 text-[8.5px] bg-white px-3.5 py-1 rounded-full border border-slate-200 shadow-xs">
                        Tháng 8 / 2026
                      </h4>
                      <button className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-500 shadow-xs">
                        <CaretRight size={12} weight="bold" />
                      </button>
                    </div>

                    {/* 6 Statistics Cards (Unified rounded-2xl) */}
                    <div className="grid grid-cols-3 gap-2.5 text-center">
                      {/* Giờ công */}
                      <div className="bg-white border border-slate-200 p-2.5 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                        <div className="w-6 h-6 rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20 flex items-center justify-center mb-1">
                          <Clock size={13} weight="bold" />
                        </div>
                        <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">GIỜ CÔNG</p>
                        <p className="font-extrabold text-[10px] text-slate-800 mt-0.5">102.2h</p>
                      </div>

                      {/* Ngày công */}
                      <div className="bg-white border border-slate-200 p-2.5 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                        <div className="w-6 h-6 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center mb-1">
                          <Files size={13} weight="bold" />
                        </div>
                        <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">NGÀY CÔNG</p>
                        <p className="font-extrabold text-[10px] text-slate-800 mt-0.5">16 công</p>
                      </div>

                      {/* Tăng ca */}
                      <div className="bg-white border border-slate-200 p-2.5 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                        <div className="w-6 h-6 rounded-xl bg-violet-500/10 text-violet-600 border border-violet-500/20 flex items-center justify-center mb-1">
                          <Plus size={13} weight="bold" />
                        </div>
                        <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">TĂNG CA</p>
                        <p className="font-extrabold text-[10px] text-slate-800 mt-0.5">0h</p>
                      </div>

                      {/* Quên công */}
                      <div className="bg-white border border-slate-200 p-2.5 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                        <div className="w-6 h-6 rounded-xl bg-orange-500/10 text-orange-600 border border-orange-500/20 flex items-center justify-center mb-1">
                          <WarningCircle size={13} weight="bold" />
                        </div>
                        <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">QUÊN CÔNG</p>
                        <p className="font-extrabold text-[10px] text-slate-800 mt-0.5">4 ngày</p>
                      </div>

                      {/* Muộn / Sớm */}
                      <div className="bg-white border border-slate-200 p-2.5 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                        <div className="w-6 h-6 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/20 flex items-center justify-center mb-1">
                          <Warning size={13} weight="bold" />
                        </div>
                        <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">MUỘN / SỚM</p>
                        <p className="font-extrabold text-[10px] text-slate-800 mt-0.5">2 ngày</p>
                      </div>

                      {/* Không phép */}
                      <div className="bg-white border border-slate-200 p-2.5 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                        <div className="w-6 h-6 rounded-xl bg-red-500/10 text-red-600 border border-red-500/20 flex items-center justify-center mb-1">
                          <X size={13} weight="bold" />
                        </div>
                        <p className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">KHÔNG PHÉP</p>
                        <p className="font-extrabold text-[10px] text-slate-800 mt-0.5">1 ngày</p>
                      </div>
                    </div>

                    {/* Calendar Card (Interactive Day Selection) */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
                      {/* Weekday Headers */}
                      <div className="grid grid-cols-7 text-center text-[8.5px] font-extrabold text-slate-700 pb-2 border-b border-slate-150">
                        <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span className="text-rose-600">CN</span>
                      </div>

                      {/* Days Grid */}
                      <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
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
                              className={`aspect-square flex flex-col items-center justify-between p-1 rounded-full transition-all cursor-pointer relative active:scale-95 ${
                                isSelected 
                                  ? 'bg-gradient-to-tr from-sky-400 to-indigo-600 text-white shadow-md shadow-sky-500/25 scale-105' 
                                  : isSunday 
                                  ? 'text-rose-500 hover:bg-slate-100' 
                                  : 'text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <span className="text-[8.5px] font-bold">{day}</span>
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
                      <div className="flex justify-between items-center pt-2.5 border-t border-slate-150 text-[6.5px] font-bold text-slate-600 uppercase tracking-tight">
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <span>CA LÀM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          <span>ĐI MUỘN</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          <span>QUÊN CHẤM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                          <span>KHÔNG PHÉP</span>
                        </div>
                      </div>
                    </div>

                    {/* Day Details Card: CHI TIẾT NGÀY */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3 pb-2 transition-all">
                      <div className="flex items-center justify-between border-b border-slate-150 pb-2">
                        <div>
                          <h5 className="font-extrabold text-slate-800 text-[9.5px] uppercase tracking-wide">
                            CHI TIẾT NGÀY {selectedDay}/8/2026
                          </h5>
                          <p className="text-[7px] text-slate-400 font-semibold mt-0.5">{currentDayInfo.label}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[6.5px] font-bold uppercase tracking-wider ${currentDayInfo.badgeClass}`}>
                          {currentDayInfo.badge}
                        </span>
                      </div>

                      {/* Shift Assigned */}
                      <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-150 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-lg bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 flex items-center justify-center shrink-0">
                            <Calendar size={11} weight="bold" />
                          </div>
                          <p className="text-[6.5px] text-slate-500 font-extrabold uppercase tracking-wider">CA LÀM ĐƯỢC PHÂN</p>
                        </div>
                        <p className="font-extrabold text-[9.5px] text-slate-800">{currentDayInfo.shiftName}</p>
                        <p className="text-[7.5px] text-slate-500 font-medium">
                          {currentDayInfo.hasPlan ? `Thời gian: ${currentDayInfo.shiftTime}` : currentDayInfo.note}
                        </p>
                      </div>

                      {/* Actual Times & Records */}
                      <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-150 space-y-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-lg bg-sky-500/10 text-sky-600 border border-sky-500/20 flex items-center justify-center shrink-0">
                            <CheckCircle size={11} weight="bold" />
                          </div>
                          <p className="text-[6.5px] text-slate-500 font-extrabold uppercase tracking-wider">GIỜ VÀO / RA THỰC TẾ</p>
                        </div>

                        {currentDayInfo.hasLog ? (
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-[8.5px]">
                              <span className="text-slate-500 font-medium">Giờ vào (In):</span>
                              <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 font-mono">
                                {currentDayInfo.inTime}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-[8.5px]">
                              <span className="text-slate-500 font-medium">Giờ ra (Out):</span>
                              <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 font-mono">
                                {currentDayInfo.outTime}
                              </span>
                            </div>
                            {currentDayInfo.workHours > 0 && (
                              <div className="flex justify-between items-center text-[8px] pt-1 border-t border-slate-200/60">
                                <span className="text-slate-500 font-medium">Số giờ công:</span>
                                <span className="font-bold text-sky-600">{currentDayInfo.workHours.toFixed(1)} giờ</span>
                              </div>
                            )}
                            {currentDayInfo.lateMinutes > 0 && (
                              <div className="flex justify-between items-center text-[8px] text-rose-600">
                                <span className="font-medium">Đi muộn:</span>
                                <span className="font-bold">{currentDayInfo.lateMinutes} phút</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-[7.5px] text-slate-400 font-medium italic">
                            {currentDayInfo.note}
                          </p>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* ── 3. Exact iPhone Bottom Navigation Bar (rounded-b-[38px]) ── */}
            <div className="w-full bg-white/95 backdrop-blur-xl border-t border-slate-200/90 pt-1 pb-2 px-4 rounded-b-[38px] flex flex-col items-center z-30 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
              
              {/* Tab Items Row */}
              <div className="w-full h-10 flex items-center justify-around relative">
                
                {/* Home Tab */}
                <div 
                  onClick={() => setActiveTab('home')}
                  className={`flex flex-col items-center justify-center w-14 cursor-pointer transition-colors ${
                    activeTab === 'home' || activeTab === 'device-detail' ? 'text-sky-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <span className="text-[7px] font-bold mt-0.5">Trang chủ</span>
                </div>

                {/* Scan Tab */}
                <div 
                  onClick={() => setActiveTab('scanner')}
                  className="flex flex-col items-center justify-center w-14 relative cursor-pointer"
                >
                  <div className="absolute -top-3.5 w-11 h-11 bg-gradient-to-tr from-sky-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-sky-400/35 border-[3px] border-slate-50 text-white transform active:scale-95 hover:opacity-95 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5">
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
                  className={`flex flex-col items-center justify-center w-14 cursor-pointer transition-colors ${
                    activeTab === 'schedule' ? 'text-sky-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <span className="text-[7px] font-bold mt-0.5">Lịch & Công</span>
                </div>

              </div>

              {/* iPhone Home Indicator Bar */}
              <div className="w-26 h-1 bg-slate-900 rounded-full shrink-0 mt-1" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
