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
    <div className="w-full bg-[#d6e8fa] text-slate-800 select-none font-sans rounded-b-[4px] shadow-inner overflow-hidden flex justify-center">
      <div 
        style={{ zoom: 0.5 }}
        className="w-[960px] p-2.5 text-[9.5px] leading-tight"
      >
        {/* ── 1. App Header ── */}
        <div className="flex items-center justify-between px-2 py-1 mb-1.5 border-b border-sky-200/60">
          <div className="flex items-center gap-1.5">
            <div className="w-5.5 h-5.5 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
              A
            </div>
            <span className="font-bold text-[13.5px] text-slate-900 tracking-tight">nATime Gate</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <div className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/60 hover:text-slate-900 cursor-pointer">
              <Sun size={12} />
            </div>
            <div className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/60 hover:text-slate-900 cursor-pointer">
              <Minus size={12} />
            </div>
            <div className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/60 hover:text-slate-900 cursor-pointer">
              <Square size={10} />
            </div>
            <div className="w-5 h-5 rounded flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 cursor-pointer">
              <X size={12} />
            </div>
          </div>
        </div>

        {/* ── 2. Full-width 8 Lanes Grid (4 Columns x 2 Rows) ── */}
        <div className="w-full bg-white/50 backdrop-blur-md rounded-[10px] border border-white/70 p-2 grid grid-cols-4 gap-2">
          {/* ══════════════ ROW 1 ══════════════ */}

          {/* ── CARD 01: Đi bộ 01 ── */}
          <div className="bg-white rounded-[8px] border border-slate-200/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-indigo-100 text-indigo-700">ĐB</span>
                  <span className="font-bold text-[10.5px] text-slate-900">Đi bộ 01</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={11} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={11} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[6px] border border-slate-200/60 p-1.5 my-1 flex gap-1.5 items-center">
                <div className="flex-1 space-y-0.6 text-[9px]">
                  <div className="flex justify-between"><span className="text-slate-400">Họ tên</span><b className="text-slate-800">Lê Thu Hà</b></div>
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[65px]">nATime</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">P.Ban</span><span className="text-slate-700">Hành chính</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">PT-001</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:18:09</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:42:15</span></div>
                </div>

                <div className="w-[68px] bg-slate-100 rounded-[5px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[96px] shrink-0">
                  <div className="my-auto text-center">
                    <span className="text-[8px] font-bold text-slate-400 block leading-tight">MẪU</span>
                    <span className="text-[8px] font-bold text-slate-400 block leading-tight">ẢNH NGƯỜI</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-slate-800 block truncate">Lê Thu Hà</span>
                    <span className="text-[7px] text-slate-400 block font-mono">PT-001</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[8.5px]">
              <div className="h-5 px-1.5 rounded-[3px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                Chưa nối
              </div>
              <div className="flex gap-0.5">
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[8px] font-semibold cursor-pointer">Barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 02: Xe máy vào 01 ── */}
          <div className="bg-white rounded-[8px] border border-slate-200/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[10.5px] text-slate-900">Xe máy vào 01</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={11} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={11} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              {/* 2 Camera Slots */}
              <div className="grid grid-cols-2 gap-1 mb-1">
                <div className="h-[42px] bg-slate-100 rounded-[5px] border border-slate-200/80 flex flex-col items-center justify-center text-[8px] font-bold text-slate-400 leading-tight">
                  <span>MẪU BIỂN SỐ</span>
                </div>
                <div className="h-[42px] bg-slate-100 rounded-[5px] border border-slate-200/80 flex flex-col items-center justify-center text-[8px] font-bold text-slate-400 leading-tight">
                  <span>MẪU GÓC KHÁC</span>
                </div>
              </div>

              {/* Vehicle Info Box */}
              <div className="bg-slate-50/70 rounded-[6px] border border-slate-200/60 p-1.5 my-1">
                <p className="text-[9.5px] font-bold text-slate-900 mb-0.5">Thông tin phương tiện</p>
                <div className="flex gap-1.5">
                  <div className="flex-1 space-y-0.6 text-[8.5px]">
                    <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold">51A-123.45</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-001</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">P.Ban</span><span className="text-slate-700">BP CNTT</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:12:06</span></div>
                  </div>

                  <div className="w-[62px] bg-slate-100 rounded-[4px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[66px] shrink-0">
                    <div className="my-auto text-center">
                      <span className="text-[7.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                      <span className="text-[7.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                    </div>
                    <div>
                      <span className="text-[7.5px] font-bold text-slate-800 block truncate">K.Nghĩa</span>
                      <span className="text-[6.5px] text-slate-400 block font-mono">05A...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[8.5px]">
              <div className="h-5 px-1.5 rounded-[3px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                Chưa nối
              </div>
              <div className="flex gap-0.5">
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[8px] font-semibold cursor-pointer">Barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 03: Xe máy vào 02 ── */}
          <div className="bg-white rounded-[8px] border border-slate-200/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[10.5px] text-slate-900">Xe máy vào 02</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={11} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={11} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 mb-1">
                <div className="h-[42px] bg-slate-100 rounded-[5px] border border-slate-200/80 flex flex-col items-center justify-center text-[8px] font-bold text-slate-400 leading-tight">
                  <span>MẪU BIỂN SỐ</span>
                </div>
                <div className="h-[42px] bg-slate-100 rounded-[5px] border border-slate-200/80 flex flex-col items-center justify-center text-[8px] font-bold text-slate-400 leading-tight">
                  <span>MẪU GÓC KHÁC</span>
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[6px] border border-slate-200/60 p-1.5 my-1">
                <p className="text-[9.5px] font-bold text-slate-900 mb-0.5">Thông tin phương tiện</p>
                <div className="flex gap-1.5">
                  <div className="flex-1 space-y-0.6 text-[8.5px]">
                    <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold">59B-246.80</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-002</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">P.Ban</span><span className="text-slate-700">Kỹ thuật</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:14:22</span></div>
                  </div>

                  <div className="w-[62px] bg-slate-100 rounded-[4px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[66px] shrink-0">
                    <div className="my-auto text-center">
                      <span className="text-[7.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                      <span className="text-[7.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                    </div>
                    <div>
                      <span className="text-[7.5px] font-bold text-slate-800 block truncate">Hải Nam</span>
                      <span className="text-[6.5px] text-slate-400 block font-mono">XM-002</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[8.5px]">
              <div className="h-5 px-1.5 rounded-[3px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                Chưa nối
              </div>
              <div className="flex gap-0.5">
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[8px] font-semibold cursor-pointer">Barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 04: Ô tô vào ── */}
          <div className="bg-white rounded-[8px] border border-slate-200/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-indigo-100 text-indigo-700">OT</span>
                  <span className="font-bold text-[10.5px] text-slate-900">Ô tô vào</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={11} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={11} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 mb-1">
                <div className="h-[42px] bg-slate-100 rounded-[5px] border border-slate-200/80 flex flex-col items-center justify-center text-[8px] font-bold text-slate-400 leading-tight">
                  <span>MẪU BIỂN SỐ</span>
                </div>
                <div className="h-[42px] bg-slate-100 rounded-[5px] border border-slate-200/80 flex flex-col items-center justify-center text-[8px] font-bold text-slate-400 leading-tight">
                  <span>MẪU GÓC KHÁC</span>
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[6px] border border-slate-200/60 p-1.5 my-1">
                <p className="text-[9.5px] font-bold text-slate-900 mb-0.5">Thông tin phương tiện</p>
                <div className="flex gap-1.5">
                  <div className="flex-1 space-y-0.6 text-[8.5px]">
                    <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold">30A-678.90</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">OT-001</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">P.Ban</span><span className="text-slate-700">Điều phối</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:20:14</span></div>
                  </div>

                  <div className="w-[62px] bg-slate-100 rounded-[4px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[66px] shrink-0">
                    <div className="my-auto text-center">
                      <span className="text-[7.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                      <span className="text-[7.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                    </div>
                    <div>
                      <span className="text-[7.5px] font-bold text-slate-800 block truncate">Quốc Bảo</span>
                      <span className="text-[6.5px] text-slate-400 block font-mono">OT-001</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[8.5px]">
              <div className="h-5 px-1.5 rounded-[3px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                Chưa nối
              </div>
              <div className="flex gap-0.5">
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[8px] font-semibold cursor-pointer">Barie</button>
              </div>
            </div>
          </div>

          {/* ══════════════ ROW 2 ══════════════ */}

          {/* ── CARD 05: Đi bộ 02 ── */}
          <div className="bg-white rounded-[8px] border border-slate-200/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-indigo-100 text-indigo-700">ĐB</span>
                  <span className="font-bold text-[10.5px] text-slate-900">Đi bộ 02</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={11} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={11} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[6px] border border-slate-200/60 p-1.5 my-1 flex gap-1.5 items-center">
                <div className="flex-1 space-y-0.6 text-[9px]">
                  <div className="flex justify-between"><span className="text-slate-400">Họ tên</span><b className="text-slate-800">Võ Mai Chi</b></div>
                  <div className="flex justify-between"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate max-w-[65px]">nATime</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">P.Ban</span><span className="text-slate-700">An ninh</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700">Nhân viên</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">PT-002</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:26:44</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:50:02</span></div>
                </div>

                <div className="w-[68px] bg-slate-100 rounded-[5px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[96px] shrink-0">
                  <div className="my-auto text-center">
                    <span className="text-[8px] font-bold text-slate-400 block leading-tight">MẪU</span>
                    <span className="text-[8px] font-bold text-slate-400 block leading-tight">ẢNH NGƯỜI</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-slate-800 block truncate">Võ Mai Chi</span>
                    <span className="text-[7px] text-slate-400 block font-mono">PT-002</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[8.5px]">
              <div className="h-5 px-1.5 rounded-[3px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                Chưa nối
              </div>
              <div className="flex gap-0.5">
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[8px] font-semibold cursor-pointer">Barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 06: Xe máy ra 01 ── */}
          <div className="bg-white rounded-[8px] border border-slate-200/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[10.5px] text-slate-900">Xe máy ra 01</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={11} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={11} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 mb-1">
                <div className="h-[42px] bg-slate-100 rounded-[5px] border border-slate-200/80 flex flex-col items-center justify-center text-[8px] font-bold text-slate-400 leading-tight">
                  <span>MẪU BIỂN SỐ</span>
                </div>
                <div className="h-[42px] bg-slate-100 rounded-[5px] border border-slate-200/80 flex flex-col items-center justify-center text-[8px] font-bold text-slate-400 leading-tight">
                  <span>MẪU GÓC KHÁC</span>
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[6px] border border-slate-200/60 p-1.5 my-1">
                <p className="text-[9.5px] font-bold text-slate-900 mb-0.5">Thông tin phương tiện</p>
                <div className="flex gap-1.5">
                  <div className="flex-1 space-y-0.6 text-[8.5px]">
                    <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold">51A-456.78</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-003</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">P.Ban</span><span className="text-slate-700">Sản xuất</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:25:41</span></div>
                  </div>

                  <div className="w-[62px] bg-slate-100 rounded-[4px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[66px] shrink-0">
                    <div className="my-auto text-center">
                      <span className="text-[7.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                      <span className="text-[7.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                    </div>
                    <div>
                      <span className="text-[7.5px] font-bold text-slate-800 block truncate">Thanh Tùng</span>
                      <span className="text-[6.5px] text-slate-400 block font-mono">XM-003</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[8.5px]">
              <div className="h-5 px-1.5 rounded-[3px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                Chưa nối
              </div>
              <div className="flex gap-0.5">
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[8px] font-semibold cursor-pointer">Barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 07: Xe máy ra 02 ── */}
          <div className="bg-white rounded-[8px] border border-slate-200/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[10.5px] text-slate-900">Xe máy ra 02</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={11} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={11} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 mb-1">
                <div className="h-[42px] bg-slate-100 rounded-[5px] border border-slate-200/80 flex flex-col items-center justify-center text-[8px] font-bold text-slate-400 leading-tight">
                  <span>MẪU BIỂN SỐ</span>
                </div>
                <div className="h-[42px] bg-slate-100 rounded-[5px] border border-slate-200/80 flex flex-col items-center justify-center text-[8px] font-bold text-slate-400 leading-tight">
                  <span>MẪU GÓC KHÁC</span>
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[6px] border border-slate-200/60 p-1.5 my-1">
                <p className="text-[9.5px] font-bold text-slate-900 mb-0.5">Thông tin phương tiện</p>
                <div className="flex gap-1.5">
                  <div className="flex-1 space-y-0.6 text-[8.5px]">
                    <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold">59B-135.79</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-004</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">P.Ban</span><span className="text-slate-700">Bảo trì</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:28:03</span></div>
                  </div>

                  <div className="w-[62px] bg-slate-100 rounded-[4px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[66px] shrink-0">
                    <div className="my-auto text-center">
                      <span className="text-[7.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                      <span className="text-[7.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                    </div>
                    <div>
                      <span className="text-[7.5px] font-bold text-slate-800 block truncate">Gia Huy</span>
                      <span className="text-[6.5px] text-slate-400 block font-mono">XM-004</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[8.5px]">
              <div className="h-5 px-1.5 rounded-[3px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                Chưa nối
              </div>
              <div className="flex gap-0.5">
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[8px] font-semibold cursor-pointer">Barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 08: Ô tô ra ── */}
          <div className="bg-white rounded-[8px] border border-slate-200/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-indigo-100 text-indigo-700">OT</span>
                  <span className="font-bold text-[10.5px] text-slate-900">Ô tô ra</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <FloppyDisk size={11} className="cursor-pointer hover:text-slate-600" />
                  <Gear size={11} className="cursor-pointer hover:text-slate-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 mb-1">
                <div className="h-[42px] bg-slate-100 rounded-[5px] border border-slate-200/80 flex flex-col items-center justify-center text-[8px] font-bold text-slate-400 leading-tight">
                  <span>MẪU BIỂN SỐ</span>
                </div>
                <div className="h-[42px] bg-slate-100 rounded-[5px] border border-slate-200/80 flex flex-col items-center justify-center text-[8px] font-bold text-slate-400 leading-tight">
                  <span>MẪU GÓC KHÁC</span>
                </div>
              </div>

              <div className="bg-slate-50/70 rounded-[6px] border border-slate-200/60 p-1.5 my-1">
                <p className="text-[9.5px] font-bold text-slate-900 mb-0.5">Thông tin phương tiện</p>
                <div className="flex gap-1.5">
                  <div className="flex-1 space-y-0.6 text-[8.5px]">
                    <div className="flex justify-between"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold">30A-246.80</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">OT-002</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">P.Ban</span><span className="text-slate-700">Kho vận</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:31:27</span></div>
                  </div>

                  <div className="w-[62px] bg-slate-100 rounded-[4px] border border-slate-200/70 p-1 flex flex-col items-center justify-between text-center min-h-[66px] shrink-0">
                    <div className="my-auto text-center">
                      <span className="text-[7.5px] font-bold text-slate-400 block leading-tight">MẪU</span>
                      <span className="text-[7.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                    </div>
                    <div>
                      <span className="text-[7.5px] font-bold text-slate-800 block truncate">Đức Long</span>
                      <span className="text-[6.5px] text-slate-400 block font-mono">OT-002</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[8.5px]">
              <div className="h-5 px-1.5 rounded-[3px] bg-slate-100/90 border border-slate-200 text-slate-500 flex items-center gap-1 font-medium">
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                Chưa nối
              </div>
              <div className="flex gap-0.5">
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho vào</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[8px] font-semibold cursor-pointer">Cho ra</button>
                <button className="h-5 px-1.5 rounded-[3px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[8px] font-semibold cursor-pointer">Barie</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
