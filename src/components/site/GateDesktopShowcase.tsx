'use client';

import React, { useState } from 'react';
import { 
  ChartBar, 
  Scales, 
  FileText, 
  UserPlus, 
  Package, 
  ChartPie, 
  Truck, 
  Door, 
  Database, 
  Sliders, 
  HardDrives, 
  ArrowsClockwise, 
  Key, 
  Gear, 
  FloppyDisk, 
  Minus, 
  Square, 
  X, 
  Sun
} from '@phosphor-icons/react';

export default function GateDesktopShowcase() {
  const [activeNav, setActiveNav] = useState('Giám sát');

  return (
    <div 
      style={{ zoom: 0.47 }}
      className="w-[1200px] bg-[#d6e8fa] text-slate-800 p-3 select-none font-sans rounded-b-[6px] text-[11.5px] leading-tight shadow-inner"
    >
      {/* ── 1. App Header ── */}
      <div className="flex items-center justify-between px-2.5 py-1 mb-2 border-b border-sky-200/60">
        <div className="flex items-center gap-2">
          <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold text-[13px] shadow-xs">
            A
          </div>
          <span className="font-bold text-[15px] text-slate-900 tracking-tight">nATime Gate</span>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/60 hover:text-slate-900 cursor-pointer">
            <Sun size={13} />
          </div>
          <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/60 hover:text-slate-900 cursor-pointer">
            <Minus size={13} />
          </div>
          <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/60 hover:text-slate-900 cursor-pointer">
            <Square size={11} />
          </div>
          <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 cursor-pointer">
            <X size={13} />
          </div>
        </div>
      </div>

      {/* ── 2. Main Workspace (Sidebar reduced to 130px + 8 Lanes Grid) ── */}
      <div className="flex gap-2.5 items-stretch">
        {/* Left Compact Sidebar (Width: 130px) */}
        <div className="w-[130px] shrink-0 bg-white/75 backdrop-blur-md rounded-[10px] border border-white/80 p-2 flex flex-col justify-between shadow-xs">
          <div className="space-y-1.5">
            {/* Group 1: QUẢN LÝ VÀO RA */}
            <div>
              <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-0.5">
                Quản lý vào ra
              </span>
              <div className="space-y-0.5">
                {[
                  { name: 'Giám sát', icon: ChartBar },
                  { name: 'Vận hành trạm cân', icon: Scales },
                  { name: 'Báo cáo vào ra', icon: FileText },
                  { name: 'Đăng ký khách', icon: UserPlus },
                  { name: 'Danh sách vật tư', icon: Package },
                  { name: 'Báo cáo tổng hợp', icon: ChartPie },
                  { name: 'Báo cáo cân', icon: Truck },
                  { name: 'Đăng ký ra cổng', icon: Door },
                ].map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeNav === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setActiveNav(item.name)}
                      className={`w-full flex items-center gap-1.5 px-1.5 py-1 rounded-[4px] text-[10px] font-semibold transition-all cursor-pointer text-left ${
                        isActive
                          ? 'bg-sky-100 text-sky-800 shadow-2xs'
                          : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
                      }`}
                    >
                      <IconComponent size={12} weight={isActive ? 'bold' : 'regular'} className={isActive ? 'text-sky-600' : 'text-slate-400'} />
                      <span className="truncate">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 2: CẤU HÌNH HỆ THỐNG */}
            <div>
              <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-0.5">
                Cấu hình hệ thống
              </span>
              <div className="space-y-0.5">
                {[
                  { name: 'Cấu hình SQL', icon: Database },
                  { name: 'Cấu hình trạm', icon: Sliders },
                  { name: 'Cấu hình server', icon: HardDrives },
                  { name: 'Cấu hình đồng bộ', icon: ArrowsClockwise },
                  { name: 'Cấu hình bản quyền', icon: Key },
                ].map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="flex items-center gap-1.5 px-1.5 py-0.8 rounded-[4px] text-[9.5px] text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
                    >
                      <IconComponent size={11} className="text-slate-400" />
                      <span className="truncate">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Account Box */}
          <div className="bg-white rounded-[5px] border border-slate-200/80 p-1.5 mt-1.5 flex items-center justify-between shadow-2xs">
            <div className="min-w-0 flex-1">
              <p className="font-bold text-[10px] text-slate-800 truncate leading-tight">Tài khoản</p>
              <p className="text-[8px] text-slate-400 truncate leading-tight">Chế độ mẫu</p>
            </div>
            <button className="px-1.5 py-0.5 rounded-[3px] text-[9px] font-semibold text-rose-600 border border-rose-200 bg-rose-50 hover:bg-rose-100 cursor-pointer shrink-0">
              Thoát
            </button>
          </div>
        </div>

        {/* Right 8 Lanes Grid (Unchanged 4 Columns) */}
        <div className="flex-1 bg-white/50 backdrop-blur-md rounded-[14px] border border-white/70 p-2.5 grid grid-cols-4 gap-2.5">
          {/* ══════════════ ROW 1 ══════════════ */}

          {/* ── CARD 01: Đi bộ 01 ── */}
          <div className="bg-white rounded-[12px] border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-100 text-indigo-700">ĐB</span>
                  <span className="font-bold text-[12px] text-slate-900">Đi bộ 01</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={12} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={12} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[10px] border border-slate-200/60 p-2 my-1 flex gap-2 items-center">
                <div className="flex-1 space-y-0.8 text-[10.5px]">
                  <div className="flex justify-between"><span className="text-slate-400">Họ tên</span><b className="text-slate-800">Lê Thu Hà</b></div>
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[80px]">nATime</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">Hành chính</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">PT-001</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:18:09</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:42:15</span></div>
                </div>

                <div className="w-[82px] bg-slate-100 rounded-[8px] border border-slate-200/70 p-1.5 flex flex-col items-center justify-between text-center min-h-[118px]">
                  <div className="my-auto text-center">
                    <span className="text-[9.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                    <span className="text-[9.5px] font-bold text-slate-400 block leading-tight">ẢNH NGƯỜI</span>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-bold text-slate-800 block truncate">Lê Thu Hà</span>
                    <span className="text-[8px] text-slate-400 block font-mono">PT-001</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[10px]">
              <div className="h-6 px-2 rounded-[4px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Chưa kết nối
              </div>
              <div className="flex gap-1">
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-6 px-2 rounded-[4px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-semibold cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 02: Xe máy vào 01 ── */}
          <div className="bg-white rounded-[12px] border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[12px] text-slate-900">Xe máy vào 01</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={12} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={12} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 mb-1">
                <div className="h-[54px] bg-slate-100 rounded-[8px] border border-slate-200/80 flex flex-col items-center justify-center text-[9.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>BIỂN SỐ</span>
                </div>
                <div className="h-[54px] bg-slate-100 rounded-[8px] border border-slate-200/80 flex flex-col items-center justify-center text-[9.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>GÓC KHÁC</span>
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[10px] border border-slate-200/60 p-2 my-1">
                <p className="text-[11px] font-bold text-slate-900 mb-1">Thông tin phương tiện</p>
                <div className="flex gap-2">
                  <div className="flex-1 space-y-0.8 text-[10px]">
                    <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold">51A-123.45</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-001</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">BP CNTT</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:12:06</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[70px]">nATime</span></div>
                  </div>

                  <div className="w-[72px] bg-slate-100 rounded-[6px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[80px]">
                    <div className="my-auto text-center">
                      <span className="text-[8.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                      <span className="text-[8.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                    </div>
                    <div>
                      <span className="text-[8.5px] font-bold text-slate-800 block truncate">Bùi Khắc Nghĩa</span>
                      <span className="text-[7.5px] text-slate-400 block font-mono">05A00001315</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[10px]">
              <div className="h-6 px-2 rounded-[4px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Chưa kết nối
              </div>
              <div className="flex gap-1">
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-6 px-2 rounded-[4px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-semibold cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 03: Xe máy vào 02 ── */}
          <div className="bg-white rounded-[12px] border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[12px] text-slate-900">Xe máy vào 02</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={12} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={12} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 mb-1">
                <div className="h-[54px] bg-slate-100 rounded-[8px] border border-slate-200/80 flex flex-col items-center justify-center text-[9.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>BIỂN SỐ</span>
                </div>
                <div className="h-[54px] bg-slate-100 rounded-[8px] border border-slate-200/80 flex flex-col items-center justify-center text-[9.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>GÓC KHÁC</span>
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[10px] border border-slate-200/60 p-2 my-1">
                <p className="text-[11px] font-bold text-slate-900 mb-1">Thông tin phương tiện</p>
                <div className="flex gap-2">
                  <div className="flex-1 space-y-0.8 text-[10px]">
                    <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold">59B-246.80</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-002</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">Kỹ thuật</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:14:22</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[70px]">nATime</span></div>
                  </div>

                  <div className="w-[72px] bg-slate-100 rounded-[6px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[80px]">
                    <div className="my-auto text-center">
                      <span className="text-[8.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                      <span className="text-[8.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                    </div>
                    <div>
                      <span className="text-[8.5px] font-bold text-slate-800 block truncate">Trần Hải Nam</span>
                      <span className="text-[7.5px] text-slate-400 block font-mono">XM-002</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[10px]">
              <div className="h-6 px-2 rounded-[4px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Chưa kết nối
              </div>
              <div className="flex gap-1">
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-6 px-2 rounded-[4px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-semibold cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 04: Ô tô vào ── */}
          <div className="bg-white rounded-[12px] border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-100 text-indigo-700">OT</span>
                  <span className="font-bold text-[12px] text-slate-900">Ô tô vào</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={12} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={12} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 mb-1">
                <div className="h-[54px] bg-slate-100 rounded-[8px] border border-slate-200/80 flex flex-col items-center justify-center text-[9.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>BIỂN SỐ</span>
                </div>
                <div className="h-[54px] bg-slate-100 rounded-[8px] border border-slate-200/80 flex flex-col items-center justify-center text-[9.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>GÓC KHÁC</span>
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[10px] border border-slate-200/60 p-2 my-1">
                <p className="text-[11px] font-bold text-slate-900 mb-1">Thông tin phương tiện</p>
                <div className="flex gap-2">
                  <div className="flex-1 space-y-0.8 text-[10px]">
                    <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold">30A-678.90</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">OT-001</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">Điều phối</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Khách</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:20:14</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[70px]">nATime</span></div>
                  </div>

                  <div className="w-[72px] bg-slate-100 rounded-[6px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[80px]">
                    <div className="my-auto text-center">
                      <span className="text-[8.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                      <span className="text-[8.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                    </div>
                    <div>
                      <span className="text-[8.5px] font-bold text-slate-800 block truncate">Phạm Quốc Bảo</span>
                      <span className="text-[7.5px] text-slate-400 block font-mono">OT-001</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[10px]">
              <div className="h-6 px-2 rounded-[4px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Chưa kết nối
              </div>
              <div className="flex gap-1">
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-6 px-2 rounded-[4px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-semibold cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ══════════════ ROW 2 ══════════════ */}

          {/* ── CARD 05: Đi bộ 02 ── */}
          <div className="bg-white rounded-[12px] border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-100 text-indigo-700">ĐB</span>
                  <span className="font-bold text-[12px] text-slate-900">Đi bộ 02</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={12} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={12} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[10px] border border-slate-200/60 p-2 my-1 flex gap-2 items-center">
                <div className="flex-1 space-y-0.8 text-[10.5px]">
                  <div className="flex justify-between"><span className="text-slate-400">Họ tên</span><b className="text-slate-800">Võ Mai Chi</b></div>
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[80px]">nATime</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">An ninh</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">PT-002</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:26:44</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:50:02</span></div>
                </div>

                <div className="w-[82px] bg-slate-100 rounded-[8px] border border-slate-200/70 p-1.5 flex flex-col items-center justify-between text-center min-h-[118px]">
                  <div className="my-auto text-center">
                    <span className="text-[9.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                    <span className="text-[9.5px] font-bold text-slate-400 block leading-tight">ẢNH NGƯỜI</span>
                  </div>
                  <div>
                    <span className="text-[9.5px] font-bold text-slate-800 block truncate">Võ Mai Chi</span>
                    <span className="text-[8px] text-slate-400 block font-mono">PT-002</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[10px]">
              <div className="h-6 px-2 rounded-[4px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Chưa kết nối
              </div>
              <div className="flex gap-1">
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-6 px-2 rounded-[4px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-semibold cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 06: Xe máy ra 01 ── */}
          <div className="bg-white rounded-[12px] border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[12px] text-slate-900">Xe máy ra 01</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={12} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={12} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 mb-1">
                <div className="h-[54px] bg-slate-100 rounded-[8px] border border-slate-200/80 flex flex-col items-center justify-center text-[9.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>BIỂN SỐ</span>
                </div>
                <div className="h-[54px] bg-slate-100 rounded-[8px] border border-slate-200/80 flex flex-col items-center justify-center text-[9.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>GÓC KHÁC</span>
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[10px] border border-slate-200/60 p-2 my-1">
                <p className="text-[11px] font-bold text-slate-900 mb-1">Thông tin phương tiện</p>
                <div className="flex gap-2">
                  <div className="flex-1 space-y-0.8 text-[10px]">
                    <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold">51A-456.78</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-003</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">Sản xuất</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">07:55:30</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:25:41</span></div>
                  </div>

                  <div className="w-[72px] bg-slate-100 rounded-[6px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[80px]">
                    <div className="my-auto text-center">
                      <span className="text-[8.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                      <span className="text-[8.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                    </div>
                    <div>
                      <span className="text-[8.5px] font-bold text-slate-800 block truncate">Đỗ Thanh Tùng</span>
                      <span className="text-[7.5px] text-slate-400 block font-mono">XM-003</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[10px]">
              <div className="h-6 px-2 rounded-[4px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Chưa kết nối
              </div>
              <div className="flex gap-1">
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-6 px-2 rounded-[4px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-semibold cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 07: Xe máy ra 02 ── */}
          <div className="bg-white rounded-[12px] border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[12px] text-slate-900">Xe máy ra 02</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={12} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={12} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 mb-1">
                <div className="h-[54px] bg-slate-100 rounded-[8px] border border-slate-200/80 flex flex-col items-center justify-center text-[9.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>BIỂN SỐ</span>
                </div>
                <div className="h-[54px] bg-slate-100 rounded-[8px] border border-slate-200/80 flex flex-col items-center justify-center text-[9.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>GÓC KHÁC</span>
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[10px] border border-slate-200/60 p-2 my-1">
                <p className="text-[11px] font-bold text-slate-900 mb-1">Thông tin phương tiện</p>
                <div className="flex gap-2">
                  <div className="flex-1 space-y-0.8 text-[10px]">
                    <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold">59B-135.79</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-004</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">Bảo trì</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">07:48:11</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:28:03</span></div>
                  </div>

                  <div className="w-[72px] bg-slate-100 rounded-[6px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[80px]">
                    <div className="my-auto text-center">
                      <span className="text-[8.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                      <span className="text-[8.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                    </div>
                    <div>
                      <span className="text-[8.5px] font-bold text-slate-800 block truncate">Hoàng Gia Huy</span>
                      <span className="text-[7.5px] text-slate-400 block font-mono">XM-004</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[10px]">
              <div className="h-6 px-2 rounded-[4px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Chưa kết nối
              </div>
              <div className="flex gap-1">
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-6 px-2 rounded-[4px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-semibold cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 08: Ô tô ra ── */}
          <div className="bg-white rounded-[12px] border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-100 text-indigo-700">OT</span>
                  <span className="font-bold text-[12px] text-slate-900">Ô tô ra</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={12} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={12} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 mb-1">
                <div className="h-[54px] bg-slate-100 rounded-[8px] border border-slate-200/80 flex flex-col items-center justify-center text-[9.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>BIỂN SỐ</span>
                </div>
                <div className="h-[54px] bg-slate-100 rounded-[8px] border border-slate-200/80 flex flex-col items-center justify-center text-[9.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>GÓC KHÁC</span>
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[10px] border border-slate-200/60 p-2 my-1">
                <p className="text-[11px] font-bold text-slate-900 mb-1">Thông tin phương tiện</p>
                <div className="flex gap-2">
                  <div className="flex-1 space-y-0.8 text-[10px]">
                    <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold">30A-246.80</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">OT-002</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">Kho vận</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Đối tác</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">07:40:19</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:31:27</span></div>
                  </div>

                  <div className="w-[72px] bg-slate-100 rounded-[6px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[80px]">
                    <div className="my-auto text-center">
                      <span className="text-[8.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                      <span className="text-[8.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                    </div>
                    <div>
                      <span className="text-[8.5px] font-bold text-slate-800 block truncate">Nguyễn Đức Long</span>
                      <span className="text-[7.5px] text-slate-400 block font-mono">OT-002</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[10px]">
              <div className="h-6 px-2 rounded-[4px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Chưa kết nối
              </div>
              <div className="flex gap-1">
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-6 px-2 rounded-[4px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-6 px-2 rounded-[4px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-semibold cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
