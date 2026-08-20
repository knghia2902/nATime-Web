'use client';

import React from 'react';
import { 
  Gear, 
  FloppyDisk, 
  Minus, 
  Square, 
  X, 
  Sun
} from '@phosphor-icons/react';

export default function GateDesktopShowcase() {
  return (
    <div 
      style={{ zoom: 0.48 }}
      className="w-[1180px] bg-[#d6e8fa] text-slate-800 p-3.5 select-none font-sans rounded-b-[6px] text-[11.5px] leading-tight shadow-inner"
    >
      {/* ── 1. App Header ── */}
      <div className="flex items-center justify-between px-2.5 py-1.5 mb-2.5 border-b border-sky-200/60">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold text-[14px] shadow-xs">
            A
          </div>
          <span className="font-bold text-[16px] text-slate-900 tracking-tight">nATime Gate</span>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/60 hover:text-slate-900 cursor-pointer">
            <Sun size={14} />
          </div>
          <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/60 hover:text-slate-900 cursor-pointer">
            <Minus size={14} />
          </div>
          <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/60 hover:text-slate-900 cursor-pointer">
            <Square size={12} />
          </div>
          <div className="w-6 h-6 rounded flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 cursor-pointer">
            <X size={14} />
          </div>
        </div>
      </div>

      {/* ── 2. Full-width 8 Lanes Grid (No Sidebar) ── */}
      <div className="w-full bg-white/50 backdrop-blur-md rounded-[14px] border border-white/70 p-2.5 grid grid-cols-4 gap-2.5">
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
                <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[85px]">nATime</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">Hành chính</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">PT-001</span></div>
                <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:18:09</span></div>
                <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:42:15</span></div>
              </div>

              <div className="w-[85px] bg-slate-100 rounded-[8px] border border-slate-200/70 p-1.5 flex flex-col items-center justify-between text-center min-h-[118px]">
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

            {/* 2 Camera Slots */}
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

            {/* Vehicle Info Box */}
            <div className="bg-slate-50/70 rounded-[10px] border border-slate-200/60 p-2 my-1">
              <p className="text-[11px] font-bold text-slate-900 mb-1">Thông tin phương tiện</p>
              <div className="flex gap-2">
                <div className="flex-1 space-y-0.8 text-[10px]">
                  <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold">51A-123.45</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-001</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">BP CNTT</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:12:06</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[75px]">nATime</span></div>
                </div>

                <div className="w-[75px] bg-slate-100 rounded-[6px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[80px]">
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
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[75px]">nATime</span></div>
                </div>

                <div className="w-[75px] bg-slate-100 rounded-[6px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[80px]">
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
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[75px]">nATime</span></div>
                </div>

                <div className="w-[75px] bg-slate-100 rounded-[6px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[80px]">
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
                <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[85px]">nATime</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Phòng ban</span><span className="text-slate-700">An ninh</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">PT-002</span></div>
                <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:26:44</span></div>
                <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:50:02</span></div>
              </div>

              <div className="w-[85px] bg-slate-100 rounded-[8px] border border-slate-200/70 p-1.5 flex flex-col items-center justify-between text-center min-h-[118px]">
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

                <div className="w-[75px] bg-slate-100 rounded-[6px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[80px]">
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

                <div className="w-[75px] bg-slate-100 rounded-[6px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[80px]">
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

                <div className="w-[75px] bg-slate-100 rounded-[6px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[80px]">
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
  );
}
