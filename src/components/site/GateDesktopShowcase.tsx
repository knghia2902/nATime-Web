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
    <div className="w-full bg-[#d6e8fa] text-slate-800 p-2 select-none font-sans rounded-b-[4px] text-[7.5px] leading-tight shadow-inner">
      {/* ── 1. App Header ── */}
      <div className="flex items-center justify-between px-1.5 py-1 mb-1.5 border-b border-sky-200/60">
        <div className="flex items-center gap-1.5">
          <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold text-[9px] shadow-2xs">
            A
          </div>
          <span className="font-bold text-[10.5px] text-slate-900 tracking-tight">nATime Gate</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500">
          <Sun size={10} className="hover:text-slate-900 cursor-pointer" />
          <Minus size={10} className="hover:text-slate-900 cursor-pointer" />
          <Square size={9} className="hover:text-slate-900 cursor-pointer" />
          <X size={10} className="hover:text-rose-600 cursor-pointer" />
        </div>
      </div>

      {/* ── 2. Full-width 8 Lanes Grid (Responsive 4 Columns, Zero Gap) ── */}
      <div className="w-full bg-white/60 backdrop-blur-md rounded-[8px] border border-white/80 p-1.5 grid grid-cols-4 gap-1.5">
        {/* ══════════════ ROW 1 ══════════════ */}

        {/* ── CARD 01: Đi bộ 01 ── */}
        <div className="bg-white rounded-[6px] border border-slate-200/90 p-1.5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
              <div className="flex items-center gap-1 min-w-0">
                <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-indigo-100 text-indigo-700 shrink-0">ĐB</span>
                <span className="font-bold text-[8px] text-slate-900 truncate">Đi bộ 01</span>
              </div>
              <div className="flex items-center gap-0.5 text-slate-400 shrink-0">
                <FloppyDisk size={8} />
                <Gear size={8} />
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-[5px] border border-slate-200/60 p-1 my-0.5 flex gap-1 items-center">
              <div className="flex-1 min-w-0 space-y-0.5 text-[7px]">
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">Họ tên</span><b className="text-slate-800 truncate">Lê Thu Hà</b></div>
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate">nATime</span></div>
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">P.Ban</span><span className="text-slate-700 truncate">Hành chính</span></div>
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700 truncate">Nhân viên</span></div>
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">PT-001</span></div>
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:18</span></div>
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:42</span></div>
              </div>

              <div className="w-[36px] bg-slate-100 rounded-[4px] border border-slate-200/70 p-0.5 flex flex-col items-center justify-between text-center min-h-[64px] shrink-0">
                <div className="my-auto text-center">
                  <span className="text-[6px] font-bold text-slate-400 block leading-tight">MẪU</span>
                  <span className="text-[6px] font-bold text-slate-400 block leading-tight">ẢNH</span>
                </div>
                <span className="text-[6.5px] font-bold text-slate-800 block truncate w-full">L.T.Hà</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 pt-1 flex items-center justify-between gap-0.5 text-[6.5px]">
            <div className="px-1 py-0.5 rounded-[2px] bg-slate-100 border border-slate-200 text-slate-500 flex items-center gap-0.5 font-medium shrink-0">
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>Chưa nối</span>
            </div>
            <div className="flex gap-0.5 shrink-0">
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Vào</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Ra</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold cursor-pointer">Barie</button>
            </div>
          </div>
        </div>

        {/* ── CARD 02: Xe máy vào 01 ── */}
        <div className="bg-white rounded-[6px] border border-slate-200/90 p-1.5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
              <div className="flex items-center gap-1 min-w-0">
                <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-sky-100 text-sky-700 shrink-0">XM</span>
                <span className="font-bold text-[8px] text-slate-900 truncate">Xe máy vào 01</span>
              </div>
              <div className="flex items-center gap-0.5 text-slate-400 shrink-0">
                <FloppyDisk size={8} />
                <Gear size={8} />
              </div>
            </div>

            {/* 2 Camera Slots */}
            <div className="grid grid-cols-2 gap-1 mb-0.5">
              <div className="h-[28px] bg-slate-100 rounded-[4px] border border-slate-200/80 flex flex-col items-center justify-center text-[6px] font-bold text-slate-400 leading-tight">
                <span>BIỂN SỐ</span>
              </div>
              <div className="h-[28px] bg-slate-100 rounded-[4px] border border-slate-200/80 flex flex-col items-center justify-center text-[6px] font-bold text-slate-400 leading-tight">
                <span>GÓC KHÁC</span>
              </div>
            </div>

            {/* Vehicle Info Box */}
            <div className="bg-slate-50/80 rounded-[5px] border border-slate-200/60 p-1 my-0.5">
              <div className="flex gap-1 items-center">
                <div className="flex-1 min-w-0 space-y-0.5 text-[7px]">
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold truncate">51A-123.45</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-001</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">P.Ban</span><span className="text-slate-700 truncate">CNTT</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700 truncate">N.Viên</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:12</span></div>
                </div>

                <div className="w-[32px] bg-slate-100 rounded-[3px] border border-slate-200/70 p-0.5 flex flex-col items-center justify-between text-center min-h-[46px] shrink-0">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                  </div>
                  <span className="text-[6px] font-bold text-slate-800 block truncate w-full">Nghĩa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 pt-1 flex items-center justify-between gap-0.5 text-[6.5px]">
            <div className="px-1 py-0.5 rounded-[2px] bg-slate-100 border border-slate-200 text-slate-500 flex items-center gap-0.5 font-medium shrink-0">
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>Chưa nối</span>
            </div>
            <div className="flex gap-0.5 shrink-0">
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Vào</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Ra</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold cursor-pointer">Barie</button>
            </div>
          </div>
        </div>

        {/* ── CARD 03: Xe máy vào 02 ── */}
        <div className="bg-white rounded-[6px] border border-slate-200/90 p-1.5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
              <div className="flex items-center gap-1 min-w-0">
                <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-sky-100 text-sky-700 shrink-0">XM</span>
                <span className="font-bold text-[8px] text-slate-900 truncate">Xe máy vào 02</span>
              </div>
              <div className="flex items-center gap-0.5 text-slate-400 shrink-0">
                <FloppyDisk size={8} />
                <Gear size={8} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 mb-0.5">
              <div className="h-[28px] bg-slate-100 rounded-[4px] border border-slate-200/80 flex flex-col items-center justify-center text-[6px] font-bold text-slate-400 leading-tight">
                <span>BIỂN SỐ</span>
              </div>
              <div className="h-[28px] bg-slate-100 rounded-[4px] border border-slate-200/80 flex flex-col items-center justify-center text-[6px] font-bold text-slate-400 leading-tight">
                <span>GÓC KHÁC</span>
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-[5px] border border-slate-200/60 p-1 my-0.5">
              <div className="flex gap-1 items-center">
                <div className="flex-1 min-w-0 space-y-0.5 text-[7px]">
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold truncate">59B-246.80</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-002</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">P.Ban</span><span className="text-slate-700 truncate">Kỹ thuật</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700 truncate">N.Viên</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:14</span></div>
                </div>

                <div className="w-[32px] bg-slate-100 rounded-[3px] border border-slate-200/70 p-0.5 flex flex-col items-center justify-between text-center min-h-[46px] shrink-0">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                  </div>
                  <span className="text-[6px] font-bold text-slate-800 block truncate w-full">Nam</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-1 flex items-center justify-between gap-0.5 text-[6.5px]">
            <div className="px-1 py-0.5 rounded-[2px] bg-slate-100 border border-slate-200 text-slate-500 flex items-center gap-0.5 font-medium shrink-0">
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>Chưa nối</span>
            </div>
            <div className="flex gap-0.5 shrink-0">
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Vào</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Ra</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold cursor-pointer">Barie</button>
            </div>
          </div>
        </div>

        {/* ── CARD 04: Ô tô vào ── */}
        <div className="bg-white rounded-[6px] border border-slate-200/90 p-1.5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
              <div className="flex items-center gap-1 min-w-0">
                <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-indigo-100 text-indigo-700 shrink-0">OT</span>
                <span className="font-bold text-[8px] text-slate-900 truncate">Ô tô vào</span>
              </div>
              <div className="flex items-center gap-0.5 text-slate-400 shrink-0">
                <FloppyDisk size={8} />
                <Gear size={8} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 mb-0.5">
              <div className="h-[28px] bg-slate-100 rounded-[4px] border border-slate-200/80 flex flex-col items-center justify-center text-[6px] font-bold text-slate-400 leading-tight">
                <span>BIỂN SỐ</span>
              </div>
              <div className="h-[28px] bg-slate-100 rounded-[4px] border border-slate-200/80 flex flex-col items-center justify-center text-[6px] font-bold text-slate-400 leading-tight">
                <span>GÓC KHÁC</span>
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-[5px] border border-slate-200/60 p-1 my-0.5">
              <div className="flex gap-1 items-center">
                <div className="flex-1 min-w-0 space-y-0.5 text-[7px]">
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold truncate">30A-678.90</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">OT-001</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">P.Ban</span><span className="text-slate-700 truncate">Điều phối</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700 truncate">Khách</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:20</span></div>
                </div>

                <div className="w-[32px] bg-slate-100 rounded-[3px] border border-slate-200/70 p-0.5 flex flex-col items-center justify-between text-center min-h-[46px] shrink-0">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                  </div>
                  <span className="text-[6px] font-bold text-slate-800 block truncate w-full">Bảo</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-1 flex items-center justify-between gap-0.5 text-[6.5px]">
            <div className="px-1 py-0.5 rounded-[2px] bg-slate-100 border border-slate-200 text-slate-500 flex items-center gap-0.5 font-medium shrink-0">
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>Chưa nối</span>
            </div>
            <div className="flex gap-0.5 shrink-0">
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Vào</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Ra</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold cursor-pointer">Barie</button>
            </div>
          </div>
        </div>

        {/* ══════════════ ROW 2 ══════════════ */}

        {/* ── CARD 05: Đi bộ 02 ── */}
        <div className="bg-white rounded-[6px] border border-slate-200/90 p-1.5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
              <div className="flex items-center gap-1 min-w-0">
                <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-indigo-100 text-indigo-700 shrink-0">ĐB</span>
                <span className="font-bold text-[8px] text-slate-900 truncate">Đi bộ 02</span>
              </div>
              <div className="flex items-center gap-0.5 text-slate-400 shrink-0">
                <FloppyDisk size={8} />
                <Gear size={8} />
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-[5px] border border-slate-200/60 p-1 my-0.5 flex gap-1 items-center">
              <div className="flex-1 min-w-0 space-y-0.5 text-[7px]">
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">Họ tên</span><b className="text-slate-800 truncate">Võ Mai Chi</b></div>
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">Công ty</span><span className="text-slate-700 truncate">nATime</span></div>
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">P.Ban</span><span className="text-slate-700 truncate">An ninh</span></div>
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700 truncate">Nhân viên</span></div>
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">PT-002</span></div>
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">TG vào</span><span className="text-slate-700 font-mono">08:26</span></div>
                <div className="flex justify-between gap-0.5"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:50</span></div>
              </div>

              <div className="w-[36px] bg-slate-100 rounded-[4px] border border-slate-200/70 p-0.5 flex flex-col items-center justify-between text-center min-h-[64px] shrink-0">
                <div className="my-auto text-center">
                  <span className="text-[6px] font-bold text-slate-400 block leading-tight">MẪU</span>
                  <span className="text-[6px] font-bold text-slate-400 block leading-tight">ẢNH</span>
                </div>
                <span className="text-[6.5px] font-bold text-slate-800 block truncate w-full">M.Chi</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-1 flex items-center justify-between gap-0.5 text-[6.5px]">
            <div className="px-1 py-0.5 rounded-[2px] bg-slate-100 border border-slate-200 text-slate-500 flex items-center gap-0.5 font-medium shrink-0">
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>Chưa nối</span>
            </div>
            <div className="flex gap-0.5 shrink-0">
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Vào</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Ra</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold cursor-pointer">Barie</button>
            </div>
          </div>
        </div>

        {/* ── CARD 06: Xe máy ra 01 ── */}
        <div className="bg-white rounded-[6px] border border-slate-200/90 p-1.5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
              <div className="flex items-center gap-1 min-w-0">
                <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-sky-100 text-sky-700 shrink-0">XM</span>
                <span className="font-bold text-[8px] text-slate-900 truncate">Xe máy ra 01</span>
              </div>
              <div className="flex items-center gap-0.5 text-slate-400 shrink-0">
                <FloppyDisk size={8} />
                <Gear size={8} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 mb-0.5">
              <div className="h-[28px] bg-slate-100 rounded-[4px] border border-slate-200/80 flex flex-col items-center justify-center text-[6px] font-bold text-slate-400 leading-tight">
                <span>BIỂN SỐ</span>
              </div>
              <div className="h-[28px] bg-slate-100 rounded-[4px] border border-slate-200/80 flex flex-col items-center justify-center text-[6px] font-bold text-slate-400 leading-tight">
                <span>GÓC KHÁC</span>
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-[5px] border border-slate-200/60 p-1 my-0.5">
              <div className="flex gap-1 items-center">
                <div className="flex-1 min-w-0 space-y-0.5 text-[7px]">
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold truncate">51A-456.78</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-003</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">P.Ban</span><span className="text-slate-700 truncate">Sản xuất</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700 truncate">N.Viên</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:25</span></div>
                </div>

                <div className="w-[32px] bg-slate-100 rounded-[3px] border border-slate-200/70 p-0.5 flex flex-col items-center justify-between text-center min-h-[46px] shrink-0">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                  </div>
                  <span className="text-[6px] font-bold text-slate-800 block truncate w-full">Tùng</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-1 flex items-center justify-between gap-0.5 text-[6.5px]">
            <div className="px-1 py-0.5 rounded-[2px] bg-slate-100 border border-slate-200 text-slate-500 flex items-center gap-0.5 font-medium shrink-0">
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>Chưa nối</span>
            </div>
            <div className="flex gap-0.5 shrink-0">
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Vào</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Ra</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold cursor-pointer">Barie</button>
            </div>
          </div>
        </div>

        {/* ── CARD 07: Xe máy ra 02 ── */}
        <div className="bg-white rounded-[6px] border border-slate-200/90 p-1.5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
              <div className="flex items-center gap-1 min-w-0">
                <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-sky-100 text-sky-700 shrink-0">XM</span>
                <span className="font-bold text-[8px] text-slate-900 truncate">Xe máy ra 02</span>
              </div>
              <div className="flex items-center gap-0.5 text-slate-400 shrink-0">
                <FloppyDisk size={8} />
                <Gear size={8} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 mb-0.5">
              <div className="h-[28px] bg-slate-100 rounded-[4px] border border-slate-200/80 flex flex-col items-center justify-center text-[6px] font-bold text-slate-400 leading-tight">
                <span>BIỂN SỐ</span>
              </div>
              <div className="h-[28px] bg-slate-100 rounded-[4px] border border-slate-200/80 flex flex-col items-center justify-center text-[6px] font-bold text-slate-400 leading-tight">
                <span>GÓC KHÁC</span>
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-[5px] border border-slate-200/60 p-1 my-0.5">
              <div className="flex gap-1 items-center">
                <div className="flex-1 min-w-0 space-y-0.5 text-[7px]">
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold truncate">59B-135.79</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">XM-004</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">P.Ban</span><span className="text-slate-700 truncate">Bảo trì</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700 truncate">N.Viên</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:28</span></div>
                </div>

                <div className="w-[32px] bg-slate-100 rounded-[3px] border border-slate-200/70 p-0.5 flex flex-col items-center justify-between text-center min-h-[46px] shrink-0">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                  </div>
                  <span className="text-[6px] font-bold text-slate-800 block truncate w-full">Huy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-1 flex items-center justify-between gap-0.5 text-[6.5px]">
            <div className="px-1 py-0.5 rounded-[2px] bg-slate-100 border border-slate-200 text-slate-500 flex items-center gap-0.5 font-medium shrink-0">
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>Chưa nối</span>
            </div>
            <div className="flex gap-0.5 shrink-0">
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Vào</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Ra</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold cursor-pointer">Barie</button>
            </div>
          </div>
        </div>

        {/* ── CARD 08: Ô tô ra ── */}
        <div className="bg-white rounded-[6px] border border-slate-200/90 p-1.5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
              <div className="flex items-center gap-1 min-w-0">
                <span className="px-1 py-0.2 rounded text-[6.5px] font-bold bg-indigo-100 text-indigo-700 shrink-0">OT</span>
                <span className="font-bold text-[8px] text-slate-900 truncate">Ô tô ra</span>
              </div>
              <div className="flex items-center gap-0.5 text-slate-400 shrink-0">
                <FloppyDisk size={8} />
                <Gear size={8} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 mb-0.5">
              <div className="h-[28px] bg-slate-100 rounded-[4px] border border-slate-200/80 flex flex-col items-center justify-center text-[6px] font-bold text-slate-400 leading-tight">
                <span>BIỂN SỐ</span>
              </div>
              <div className="h-[28px] bg-slate-100 rounded-[4px] border border-slate-200/80 flex flex-col items-center justify-center text-[6px] font-bold text-slate-400 leading-tight">
                <span>GÓC KHÁC</span>
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-[5px] border border-slate-200/60 p-1 my-0.5">
              <div className="flex gap-1 items-center">
                <div className="flex-1 min-w-0 space-y-0.5 text-[7px]">
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Biển số</span><span className="text-slate-900 font-bold truncate">30A-246.80</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Mã thẻ</span><span className="text-slate-700 font-mono">OT-002</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">P.Ban</span><span className="text-slate-700 truncate">Kho vận</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">Đối tượng</span><span className="text-slate-700 truncate">Đối tác</span></div>
                  <div className="flex justify-between gap-0.5"><span className="text-slate-400">TG ra</span><span className="text-slate-700 font-mono">08:31</span></div>
                </div>

                <div className="w-[32px] bg-slate-100 rounded-[3px] border border-slate-200/70 p-0.5 flex flex-col items-center justify-between text-center min-h-[46px] shrink-0">
                  <div className="my-auto text-center">
                    <span className="text-[5.5px] font-bold text-slate-400 block leading-tight">FACEID</span>
                  </div>
                  <span className="text-[6px] font-bold text-slate-800 block truncate w-full">Long</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-1 flex items-center justify-between gap-0.5 text-[6.5px]">
            <div className="px-1 py-0.5 rounded-[2px] bg-slate-100 border border-slate-200 text-slate-500 flex items-center gap-0.5 font-medium shrink-0">
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>Chưa nối</span>
            </div>
            <div className="flex gap-0.5 shrink-0">
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Vào</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold cursor-pointer">Ra</button>
              <button className="px-1 py-0.5 rounded-[2px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold cursor-pointer">Barie</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
