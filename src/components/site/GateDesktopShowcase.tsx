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
      style={{ zoom: 0.65 }}
      className="w-full bg-[#d6e8fa] text-slate-800 p-2.5 select-none font-sans rounded-b-[4px] text-[8px] leading-normal"
    >
      {/* ── 1. App Top Window Header ── */}
      <div className="flex items-center justify-between px-2 py-1 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
            A
          </div>
          <span className="font-bold text-[12px] text-slate-900 tracking-tight">nATime Gate</span>
        </div>

        <div className="flex items-center gap-2.5 text-slate-500">
          <Sun size={11} className="hover:text-slate-900 cursor-pointer" />
          <Minus size={11} className="hover:text-slate-900 cursor-pointer" />
          <Square size={10} className="hover:text-slate-900 cursor-pointer" />
          <X size={11} className="hover:text-rose-600 cursor-pointer" />
        </div>
      </div>

      {/* ── 2. App Main Workspace (Sidebar + 8 Lanes Grid) ── */}
      <div className="flex gap-2.5 items-stretch">
        {/* Left Sidebar */}
        <div className="w-[112px] shrink-0 bg-white/70 backdrop-blur-md rounded-lg border border-white/80 p-1.5 flex flex-col justify-between shadow-2xs">
          <div className="space-y-2">
            {/* Group 1: QUẢN LÝ VÀO RA */}
            <div>
              <span className="text-[5.5px] font-bold text-slate-400 uppercase tracking-wider block px-1.5 mb-1">
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
                      className={`w-full flex items-center gap-1.5 px-1.5 py-1 rounded-[3px] text-[7px] font-semibold transition-all cursor-pointer text-left ${
                        isActive
                          ? 'bg-sky-100/90 text-sky-800 shadow-2xs'
                          : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
                      }`}
                    >
                      <IconComponent size={9} weight={isActive ? 'bold' : 'regular'} className={isActive ? 'text-sky-600' : 'text-slate-400'} />
                      <span className="truncate">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 2: CẤU HÌNH HỆ THỐNG */}
            <div>
              <span className="text-[5.5px] font-bold text-slate-400 uppercase tracking-wider block px-1.5 mb-1">
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
                      className="flex items-center gap-1.5 px-1.5 py-0.8 rounded-[3px] text-[6.5px] text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      <IconComponent size={8} className="text-slate-400" />
                      <span className="truncate">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Account Card */}
          <div className="bg-white rounded-[3px] border border-slate-200/70 p-1.5 mt-2 flex items-center justify-between shadow-2xs">
            <div>
              <p className="font-bold text-[7px] text-slate-800 leading-none">Tài khoản mẫu</p>
              <p className="text-[5.5px] text-slate-400 mt-0.5 leading-none">Chế độ trình bày</p>
            </div>
            <button className="px-1.5 py-0.5 rounded-[2px] text-[6px] font-semibold text-rose-600 border border-rose-200 bg-rose-50 hover:bg-rose-100 cursor-pointer">
              Thoát
            </button>
          </div>
        </div>

        {/* Right 8 Lanes Grid */}
        <div className="flex-1 bg-white/40 backdrop-blur-md rounded-lg border border-white/60 p-2 grid grid-cols-4 gap-2">
          {/* ══════════════ ROW 1 ══════════════ */}

          {/* ── CARD 01: Đi bộ 01 (Pedestrian - No top cameras) ── */}
          <div className="bg-white rounded-lg border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-indigo-100 text-indigo-700">ĐB</span>
                  <span className="font-bold text-[9px] text-slate-800">Đi bộ 01</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={8} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={8} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              {/* Info Table & Person Photo */}
              <div className="grid grid-cols-12 gap-2 mb-2">
                <div className="col-span-7 space-y-1 text-[6.5px]">
                  <div className="flex justify-between"><span className="text-slate-400">Họ tên</span><b className="text-slate-800">Lê Thu Hà</b></div>
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[55px]">Công ty mẫu nATime</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">Hành chính</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">PT-001</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:18:09</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:42:15</span></div>
                </div>

                <div className="col-span-5 bg-slate-100/80 rounded-md border border-slate-200/60 p-1 flex flex-col items-center justify-between text-center min-h-[90px]">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">ẢNH NGƯỜI</span>
                  </div>
                  <div>
                    <span className="text-[6px] font-bold text-slate-800 block truncate">Lê Thu Hà</span>
                    <span className="text-[5px] text-slate-400 block font-mono">PT-001</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[6.5px]">
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Chưa kết nối
              </span>
              <div className="flex gap-1">
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho vào</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho ra</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 02: Xe máy vào 01 ── */}
          <div className="bg-white rounded-lg border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[9px] text-slate-800">Xe máy vào 01</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={8} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={8} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              {/* 2 Camera Feeds */}
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                <div className="h-9 bg-slate-100/80 rounded-md border border-slate-200/60 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>BIỂN SỐ</span>
                </div>
                <div className="h-9 bg-slate-100/80 rounded-md border border-slate-200/60 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>GÓC KHÁC</span>
                </div>
              </div>

              {/* Subheading */}
              <p className="text-[7.5px] font-bold text-slate-800 mb-1">Thông tin phương tiện</p>

              {/* Info & FaceID */}
              <div className="grid grid-cols-12 gap-1.5 mb-1.5">
                <div className="col-span-7 space-y-0.8 text-[6.5px]">
                  <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-800 font-bold">51A-123.45</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-001</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">BP CNTT</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:12:06</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[50px]">Công ty mẫu nATime</span></div>
                </div>

                <div className="col-span-5 bg-slate-100/80 rounded-md border border-slate-200/60 p-1 flex flex-col items-center justify-between text-center min-h-[70px]">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                  </div>
                  <div>
                    <span className="text-[5.5px] font-bold text-slate-800 block truncate">Bùi Khắc Nghĩa</span>
                    <span className="text-[4.5px] text-slate-400 block font-mono">05A00001315</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[6.5px]">
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Chưa kết nối
              </span>
              <div className="flex gap-1">
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho vào</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho ra</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 03: Xe máy vào 02 ── */}
          <div className="bg-white rounded-lg border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[9px] text-slate-800">Xe máy vào 02</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={8} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={8} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              {/* 2 Camera Feeds */}
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                <div className="h-9 bg-slate-100/80 rounded-md border border-slate-200/60 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>BIỂN SỐ</span>
                </div>
                <div className="h-9 bg-slate-100/80 rounded-md border border-slate-200/60 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>GÓC KHÁC</span>
                </div>
              </div>

              <p className="text-[7.5px] font-bold text-slate-800 mb-1">Thông tin phương tiện</p>

              <div className="grid grid-cols-12 gap-1.5 mb-1.5">
                <div className="col-span-7 space-y-0.8 text-[6.5px]">
                  <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-800 font-bold">59B-246.80</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-002</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">Kỹ thuật</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:14:22</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[50px]">Công ty mẫu nATime</span></div>
                </div>

                <div className="col-span-5 bg-slate-100/80 rounded-md border border-slate-200/60 p-1 flex flex-col items-center justify-between text-center min-h-[70px]">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                  </div>
                  <div>
                    <span className="text-[5.5px] font-bold text-slate-800 block truncate">Trần Hải Nam</span>
                    <span className="text-[4.5px] text-slate-400 block font-mono">XM-002</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[6.5px]">
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Chưa kết nối
              </span>
              <div className="flex gap-1">
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho vào</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho ra</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 04: Ô tô vào ── */}
          <div className="bg-white rounded-lg border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-indigo-100 text-indigo-700">OT</span>
                  <span className="font-bold text-[9px] text-slate-800">Ô tô vào</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={8} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={8} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              {/* 2 Camera Feeds */}
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                <div className="h-9 bg-slate-100/80 rounded-md border border-slate-200/60 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>BIỂN SỐ</span>
                </div>
                <div className="h-9 bg-slate-100/80 rounded-md border border-slate-200/60 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>GÓC KHÁC</span>
                </div>
              </div>

              <p className="text-[7.5px] font-bold text-slate-800 mb-1">Thông tin phương tiện</p>

              <div className="grid grid-cols-12 gap-1.5 mb-1.5">
                <div className="col-span-7 space-y-0.8 text-[6.5px]">
                  <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-800 font-bold">30A-678.90</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">OT-001</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">Điều phối</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Khách</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:20:14</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[50px]">Công ty mẫu nATime</span></div>
                </div>

                <div className="col-span-5 bg-slate-100/80 rounded-md border border-slate-200/60 p-1 flex flex-col items-center justify-between text-center min-h-[70px]">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                  </div>
                  <div>
                    <span className="text-[5.5px] font-bold text-slate-800 block truncate">Phạm Quốc Bảo</span>
                    <span className="text-[4.5px] text-slate-400 block font-mono">OT-001</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[6.5px]">
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Chưa kết nối
              </span>
              <div className="flex gap-1">
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho vào</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho ra</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ══════════════ ROW 2 ══════════════ */}

          {/* ── CARD 05: Đi bộ 02 (Pedestrian) ── */}
          <div className="bg-white rounded-lg border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-indigo-100 text-indigo-700">ĐB</span>
                  <span className="font-bold text-[9px] text-slate-800">Đi bộ 02</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={8} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={8} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              {/* Info Table & Person Photo */}
              <div className="grid grid-cols-12 gap-2 mb-2">
                <div className="col-span-7 space-y-1 text-[6.5px]">
                  <div className="flex justify-between"><span className="text-slate-400">Họ tên</span><b className="text-slate-800">Võ Mai Chi</b></div>
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[55px]">Công ty mẫu nATime</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">An ninh</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">PT-002</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:26:44</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:50:02</span></div>
                </div>

                <div className="col-span-5 bg-slate-100/80 rounded-md border border-slate-200/60 p-1 flex flex-col items-center justify-between text-center min-h-[90px]">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">ẢNH NGƯỜI</span>
                  </div>
                  <div>
                    <span className="text-[6px] font-bold text-slate-800 block truncate">Võ Mai Chi</span>
                    <span className="text-[5px] text-slate-400 block font-mono">PT-002</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[6.5px]">
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Chưa kết nối
              </span>
              <div className="flex gap-1">
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho vào</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho ra</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 06: Xe máy ra 01 ── */}
          <div className="bg-white rounded-lg border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[9px] text-slate-800">Xe máy ra 01</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={8} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={8} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              {/* 2 Camera Feeds */}
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                <div className="h-9 bg-slate-100/80 rounded-md border border-slate-200/60 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>BIỂN SỐ</span>
                </div>
                <div className="h-9 bg-slate-100/80 rounded-md border border-slate-200/60 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>GÓC KHÁC</span>
                </div>
              </div>

              <p className="text-[7.5px] font-bold text-slate-800 mb-1">Thông tin phương tiện</p>

              <div className="grid grid-cols-12 gap-1.5 mb-1.5">
                <div className="col-span-7 space-y-0.8 text-[6.5px]">
                  <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-800 font-bold">51A-456.78</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-003</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">Sản xuất</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">07:55:30</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:25:41</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[50px]">Công ty mẫu nATime</span></div>
                </div>

                <div className="col-span-5 bg-slate-100/80 rounded-md border border-slate-200/60 p-1 flex flex-col items-center justify-between text-center min-h-[70px]">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                  </div>
                  <div>
                    <span className="text-[5.5px] font-bold text-slate-800 block truncate">Đỗ Thanh Tùng</span>
                    <span className="text-[4.5px] text-slate-400 block font-mono">XM-003</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[6.5px]">
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Chưa kết nối
              </span>
              <div className="flex gap-1">
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho vào</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho ra</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 07: Xe máy ra 02 ── */}
          <div className="bg-white rounded-lg border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[9px] text-slate-800">Xe máy ra 02</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={8} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={8} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              {/* 2 Camera Feeds */}
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                <div className="h-9 bg-slate-100/80 rounded-md border border-slate-200/60 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>BIỂN SỐ</span>
                </div>
                <div className="h-9 bg-slate-100/80 rounded-md border border-slate-200/60 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>GÓC KHÁC</span>
                </div>
              </div>

              <p className="text-[7.5px] font-bold text-slate-800 mb-1">Thông tin phương tiện</p>

              <div className="grid grid-cols-12 gap-1.5 mb-1.5">
                <div className="col-span-7 space-y-0.8 text-[6.5px]">
                  <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-800 font-bold">59B-135.79</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-004</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">Bảo trì</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">07:48:11</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:28:03</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[50px]">Công ty mẫu nATime</span></div>
                </div>

                <div className="col-span-5 bg-slate-100/80 rounded-md border border-slate-200/60 p-1 flex flex-col items-center justify-between text-center min-h-[70px]">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                  </div>
                  <div>
                    <span className="text-[5.5px] font-bold text-slate-800 block truncate">Hoàng Gia Huy</span>
                    <span className="text-[4.5px] text-slate-400 block font-mono">XM-004</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[6.5px]">
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Chưa kết nối
              </span>
              <div className="flex gap-1">
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho vào</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho ra</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 08: Ô tô ra ── */}
          <div className="bg-white rounded-lg border border-slate-200/80 p-2.5 flex flex-col justify-between shadow-2xs">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-indigo-100 text-indigo-700">OT</span>
                  <span className="font-bold text-[9px] text-slate-800">Ô tô ra</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={8} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={8} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              {/* 2 Camera Feeds */}
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                <div className="h-9 bg-slate-100/80 rounded-md border border-slate-200/60 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>BIỂN SỐ</span>
                </div>
                <div className="h-9 bg-slate-100/80 rounded-md border border-slate-200/60 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400 leading-tight">
                  <span>MẪU</span>
                  <span>GÓC KHÁC</span>
                </div>
              </div>

              <p className="text-[7.5px] font-bold text-slate-800 mb-1">Thông tin phương tiện</p>

              <div className="grid grid-cols-12 gap-1.5 mb-1.5">
                <div className="col-span-7 space-y-0.8 text-[6.5px]">
                  <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-800 font-bold">30A-246.80</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">OT-002</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">Kho vận</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Đối tác</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">07:40:19</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:31:27</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[50px]">Công ty mẫu nATime</span></div>
                </div>

                <div className="col-span-5 bg-slate-100/80 rounded-md border border-slate-200/60 p-1 flex flex-col items-center justify-between text-center min-h-[70px]">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                  </div>
                  <div>
                    <span className="text-[5.5px] font-bold text-slate-800 block truncate">Nguyễn Đức Long</span>
                    <span className="text-[4.5px] text-slate-400 block font-mono">OT-002</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-1.5 flex items-center justify-between text-[6.5px]">
              <span className="flex items-center gap-1 text-slate-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                Chưa kết nối
              </span>
              <div className="flex gap-1">
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho vào</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Cho ra</button>
                <button className="px-1.5 py-0.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-[6px] font-medium cursor-pointer">Mở barie</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
