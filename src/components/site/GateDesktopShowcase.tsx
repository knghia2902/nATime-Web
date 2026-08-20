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
  File, 
  Minus, 
  Square, 
  X, 
  Sun,
  User
} from '@phosphor-icons/react';

export default function GateDesktopShowcase() {
  const [activeNav, setActiveNav] = useState('Giám sát');

  return (
    <div 
      style={{ zoom: 0.63 }}
      className="w-full bg-[#dbeafe]/80 text-slate-800 p-2.5 select-none font-sans rounded-b-[4px] text-[8.5px] leading-tight"
    >
      {/* ── 1. App Top Window Header ── */}
      <div className="flex items-center justify-between px-2 py-1 mb-2 border-b border-sky-200/50">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
            A
          </div>
          <span className="font-bold text-[12px] text-slate-900 tracking-tight">nATime Gate</span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <Sun size={10} className="hover:text-slate-900 cursor-pointer" />
          <Minus size={10} className="hover:text-slate-900 cursor-pointer" />
          <Square size={9} className="hover:text-slate-900 cursor-pointer" />
          <X size={10} className="hover:text-rose-600 cursor-pointer" />
        </div>
      </div>

      {/* ── 2. App Main Workspace (Slim Sidebar + 8 Lanes Grid) ── */}
      <div className="flex gap-2">
        {/* Left Slim Sidebar */}
        <div className="w-[108px] shrink-0 bg-white/70 backdrop-blur-md rounded-[3px] border border-white/60 p-1 flex flex-col justify-between shadow-2xs">
          <div className="space-y-1.5">
            {/* Group 1: QUẢN LÝ VÀO RA */}
            <div>
              <span className="text-[5.5px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-0.5">
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
                      className={`w-full flex items-center gap-1 px-1 py-0.5 rounded-[2px] text-[6.5px] font-semibold transition-all cursor-pointer text-left ${
                        isActive
                          ? 'bg-sky-100/90 text-sky-800 shadow-2xs'
                          : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
                      }`}
                    >
                      <IconComponent size={8} weight={isActive ? 'bold' : 'regular'} className={isActive ? 'text-sky-600' : 'text-slate-400'} />
                      <span className="truncate">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 2: CẤU HÌNH HỆ THỐNG */}
            <div>
              <span className="text-[5.5px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-0.5">
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
                      className="flex items-center gap-1 px-1 py-0.5 rounded-[2px] text-[6px] text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      <IconComponent size={7} className="text-slate-400" />
                      <span className="truncate">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Account Box */}
          <div className="bg-white/90 rounded-[2px] border border-slate-200/80 p-1 mt-1.5 flex items-center justify-between">
            <div>
              <p className="font-bold text-[6.5px] text-slate-800 leading-none">Tài khoản mẫu</p>
              <p className="text-[5px] text-slate-400 mt-0.5 leading-none">Trình bày</p>
            </div>
            <button className="px-1 py-0.2 rounded-[1.5px] text-[5.5px] font-semibold text-rose-600 border border-rose-200 bg-rose-50 hover:bg-rose-100 cursor-pointer">
              Thoát
            </button>
          </div>
        </div>

        {/* Right 8 Lanes Grid */}
        <div className="flex-1 grid grid-cols-4 gap-1.5">
          {/* ── CARD 01: Đi bộ 01 ── */}
          <div className="bg-white/90 backdrop-blur-md rounded-[3px] border border-white/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1.5">
                <div className="flex items-center gap-1">
                  <span className="px-1 py-0 rounded-[1.5px] text-[6.5px] font-bold bg-indigo-100 text-indigo-700">ĐB</span>
                  <span className="font-bold text-[8.5px] text-slate-800">Đi bộ 01</span>
                </div>
                <div className="flex items-center gap-0.5 text-slate-400">
                  <File size={7} />
                  <Gear size={7} />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-1 mb-2">
                <div className="col-span-7 space-y-0.5 text-[6.5px]">
                  <div><span className="text-slate-400">Họ tên:</span> <b className="text-slate-800">Lê Thu Hà</b></div>
                  <div className="truncate"><span className="text-slate-400">Công ty:</span> nATime</div>
                  <div><span className="text-slate-400">P.ban:</span> Hành chính</div>
                  <div><span className="text-slate-400">Đ.tượng:</span> Nhân viên</div>
                  <div><span className="text-slate-400">Mã thẻ:</span> PT-001</div>
                  <div><span className="text-slate-400">TG vào:</span> 08:18:09</div>
                  <div><span className="text-slate-400">TG ra:</span> 08:42:15</div>
                </div>
                <div className="col-span-5 bg-slate-100/90 rounded-[2px] border border-slate-200/80 p-1 flex flex-col items-center justify-center text-center">
                  <span className="text-[5.5px] text-slate-400 font-bold block mb-1">MẪU ẢNH</span>
                  <div className="w-7 h-10 bg-slate-200/80 rounded-[1px] mb-1 flex items-center justify-center text-slate-400">
                    <User size={12} weight="duotone" />
                  </div>
                  <span className="text-[5.5px] font-bold text-slate-700 block truncate">Lê Thu Hà</span>
                  <span className="text-[4.5px] text-slate-400 block">PT-001</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[6px]">
              <span className="text-slate-400">● Sẵn sàng</span>
              <div className="flex gap-0.5">
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho vào</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho ra</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-indigo-50 text-indigo-600 border border-indigo-200 text-[5.5px]">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 02: Xe máy vào 01 ── */}
          <div className="bg-white/90 backdrop-blur-md rounded-[3px] border border-white/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1.5">
                <div className="flex items-center gap-1">
                  <span className="px-1 py-0 rounded-[1.5px] text-[6.5px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[8.5px] text-slate-800">Xe máy vào 01</span>
                </div>
                <div className="flex items-center gap-0.5 text-slate-400"><File size={7} /><Gear size={7} /></div>
              </div>

              {/* 2 Camera Feeds */}
              <div className="grid grid-cols-2 gap-1 mb-1.5">
                <div className="h-8 bg-slate-100/90 rounded-[2px] border border-slate-200 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400">
                  MẪU BIỂN SỐ
                </div>
                <div className="h-8 bg-slate-100/90 rounded-[2px] border border-slate-200 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400">
                  MẪU GÓC KHÁC
                </div>
              </div>

              <div className="grid grid-cols-12 gap-1 mb-1">
                <div className="col-span-7 space-y-0.5 text-[6.5px]">
                  <div><span className="text-slate-400">Biển số:</span> <b className="text-slate-800">51A-123.45</b></div>
                  <div><span className="text-slate-400">Mã thẻ:</span> XM-001</div>
                  <div><span className="text-slate-400">P.ban:</span> BP CNTT</div>
                  <div><span className="text-slate-400">Đ.tượng:</span> Nhân viên</div>
                  <div><span className="text-slate-400">TG vào:</span> 08:12:06</div>
                </div>
                <div className="col-span-5 bg-slate-100/90 rounded-[2px] border border-slate-200/80 p-0.5 flex flex-col items-center justify-center text-center">
                  <span className="text-[5.5px] text-slate-400 font-bold block mb-0.5">FACEID</span>
                  <div className="w-6 h-7 bg-slate-200/80 rounded-[1px] mb-0.5 flex items-center justify-center text-slate-400">
                    <User size={10} weight="duotone" />
                  </div>
                  <span className="text-[5px] font-bold text-slate-700 block truncate">Bùi Khắc Nghĩa</span>
                  <span className="text-[4px] text-slate-400 block">05A00001315</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[6px]">
              <span className="text-slate-400">● Sẵn sàng</span>
              <div className="flex gap-0.5">
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho vào</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho ra</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-indigo-50 text-indigo-600 border border-indigo-200 text-[5.5px]">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 03: Xe máy vào 02 ── */}
          <div className="bg-white/90 backdrop-blur-md rounded-[3px] border border-white/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1.5">
                <div className="flex items-center gap-1">
                  <span className="px-1 py-0 rounded-[1.5px] text-[6.5px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[8.5px] text-slate-800">Xe máy vào 02</span>
                </div>
                <div className="flex items-center gap-0.5 text-slate-400"><File size={7} /><Gear size={7} /></div>
              </div>

              <div className="grid grid-cols-2 gap-1 mb-1.5">
                <div className="h-8 bg-slate-100/90 rounded-[2px] border border-slate-200 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400">MẪU BIỂN SỐ</div>
                <div className="h-8 bg-slate-100/90 rounded-[2px] border border-slate-200 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400">MẪU GÓC KHÁC</div>
              </div>

              <div className="grid grid-cols-12 gap-1 mb-1">
                <div className="col-span-7 space-y-0.5 text-[6.5px]">
                  <div><span className="text-slate-400">Biển số:</span> <b className="text-slate-800">59B-246.80</b></div>
                  <div><span className="text-slate-400">Mã thẻ:</span> XM-002</div>
                  <div><span className="text-slate-400">P.ban:</span> Kỹ thuật</div>
                  <div><span className="text-slate-400">Đ.tượng:</span> Nhân viên</div>
                  <div><span className="text-slate-400">TG vào:</span> 08:14:22</div>
                </div>
                <div className="col-span-5 bg-slate-100/90 rounded-[2px] border border-slate-200/80 p-0.5 flex flex-col items-center justify-center text-center">
                  <span className="text-[5.5px] text-slate-400 font-bold block mb-0.5">FACEID</span>
                  <div className="w-6 h-7 bg-slate-200/80 rounded-[1px] mb-0.5 flex items-center justify-center text-slate-400">
                    <User size={10} weight="duotone" />
                  </div>
                  <span className="text-[5px] font-bold text-slate-700 block truncate">Trần Hải Nam</span>
                  <span className="text-[4px] text-slate-400 block">XM-002</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[6px]">
              <span className="text-slate-400">● Sẵn sàng</span>
              <div className="flex gap-0.5">
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho vào</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho ra</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-indigo-50 text-indigo-600 border border-indigo-200 text-[5.5px]">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 04: Ô tô vào ── */}
          <div className="bg-white/90 backdrop-blur-md rounded-[3px] border border-white/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1.5">
                <div className="flex items-center gap-1">
                  <span className="px-1 py-0 rounded-[1.5px] text-[6.5px] font-bold bg-amber-100 text-amber-700">OT</span>
                  <span className="font-bold text-[8.5px] text-slate-800">Ô tô vào</span>
                </div>
                <div className="flex items-center gap-0.5 text-slate-400"><File size={7} /><Gear size={7} /></div>
              </div>

              <div className="grid grid-cols-2 gap-1 mb-1.5">
                <div className="h-8 bg-slate-100/90 rounded-[2px] border border-slate-200 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400">MẪU BIỂN SỐ</div>
                <div className="h-8 bg-slate-100/90 rounded-[2px] border border-slate-200 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400">MẪU GÓC KHÁC</div>
              </div>

              <div className="grid grid-cols-12 gap-1 mb-1">
                <div className="col-span-7 space-y-0.5 text-[6.5px]">
                  <div><span className="text-slate-400">Biển số:</span> <b className="text-slate-800">30A-678.90</b></div>
                  <div><span className="text-slate-400">Mã thẻ:</span> OT-001</div>
                  <div><span className="text-slate-400">P.ban:</span> Điều phối</div>
                  <div><span className="text-slate-400">Đ.tượng:</span> Khách</div>
                  <div><span className="text-slate-400">TG vào:</span> 08:20:14</div>
                </div>
                <div className="col-span-5 bg-slate-100/90 rounded-[2px] border border-slate-200/80 p-0.5 flex flex-col items-center justify-center text-center">
                  <span className="text-[5.5px] text-slate-400 font-bold block mb-0.5">FACEID</span>
                  <div className="w-6 h-7 bg-slate-200/80 rounded-[1px] mb-0.5 flex items-center justify-center text-slate-400">
                    <User size={10} weight="duotone" />
                  </div>
                  <span className="text-[5px] font-bold text-slate-700 block truncate">Phạm Quốc Bảo</span>
                  <span className="text-[4px] text-slate-400 block">OT-001</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[6px]">
              <span className="text-slate-400">● Sẵn sàng</span>
              <div className="flex gap-0.5">
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho vào</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho ra</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-indigo-50 text-indigo-600 border border-indigo-200 text-[5.5px]">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 05: Đi bộ 02 ── */}
          <div className="bg-white/90 backdrop-blur-md rounded-[3px] border border-white/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1.5">
                <div className="flex items-center gap-1">
                  <span className="px-1 py-0 rounded-[1.5px] text-[6.5px] font-bold bg-indigo-100 text-indigo-700">ĐB</span>
                  <span className="font-bold text-[8.5px] text-slate-800">Đi bộ 02</span>
                </div>
                <div className="flex items-center gap-0.5 text-slate-400"><File size={7} /><Gear size={7} /></div>
              </div>

              <div className="grid grid-cols-12 gap-1 mb-2">
                <div className="col-span-7 space-y-0.5 text-[6.5px]">
                  <div><span className="text-slate-400">Họ tên:</span> <b className="text-slate-800">Võ Mai Chi</b></div>
                  <div className="truncate"><span className="text-slate-400">Công ty:</span> nATime</div>
                  <div><span className="text-slate-400">P.ban:</span> An ninh</div>
                  <div><span className="text-slate-400">Đ.tượng:</span> Nhân viên</div>
                  <div><span className="text-slate-400">Mã thẻ:</span> PT-002</div>
                  <div><span className="text-slate-400">TG vào:</span> 08:26:44</div>
                  <div><span className="text-slate-400">TG ra:</span> 08:50:02</div>
                </div>
                <div className="col-span-5 bg-slate-100/90 rounded-[2px] border border-slate-200/80 p-1 flex flex-col items-center justify-center text-center">
                  <span className="text-[5.5px] text-slate-400 font-bold block mb-1">MẪU ẢNH</span>
                  <div className="w-7 h-10 bg-slate-200/80 rounded-[1px] mb-1 flex items-center justify-center text-slate-400">
                    <User size={12} weight="duotone" />
                  </div>
                  <span className="text-[5.5px] font-bold text-slate-700 block truncate">Võ Mai Chi</span>
                  <span className="text-[4.5px] text-slate-400 block">PT-002</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[6px]">
              <span className="text-slate-400">● Sẵn sàng</span>
              <div className="flex gap-0.5">
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho vào</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho ra</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-indigo-50 text-indigo-600 border border-indigo-200 text-[5.5px]">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 06: Xe máy ra 01 ── */}
          <div className="bg-white/90 backdrop-blur-md rounded-[3px] border border-white/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1.5">
                <div className="flex items-center gap-1">
                  <span className="px-1 py-0 rounded-[1.5px] text-[6.5px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[8.5px] text-slate-800">Xe máy ra 01</span>
                </div>
                <div className="flex items-center gap-0.5 text-slate-400"><File size={7} /><Gear size={7} /></div>
              </div>

              <div className="grid grid-cols-2 gap-1 mb-1.5">
                <div className="h-8 bg-slate-100/90 rounded-[2px] border border-slate-200 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400">MẪU BIỂN SỐ</div>
                <div className="h-8 bg-slate-100/90 rounded-[2px] border border-slate-200 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400">MẪU GÓC KHÁC</div>
              </div>

              <div className="grid grid-cols-12 gap-1 mb-1">
                <div className="col-span-7 space-y-0.5 text-[6.5px]">
                  <div><span className="text-slate-400">Biển số:</span> <b className="text-slate-800">51A-456.78</b></div>
                  <div><span className="text-slate-400">Mã thẻ:</span> XM-003</div>
                  <div><span className="text-slate-400">P.ban:</span> Sản xuất</div>
                  <div><span className="text-slate-400">Đ.tượng:</span> Nhân viên</div>
                  <div><span className="text-slate-400">Vào/Ra:</span> 07:55 / 08:25</div>
                </div>
                <div className="col-span-5 bg-slate-100/90 rounded-[2px] border border-slate-200/80 p-0.5 flex flex-col items-center justify-center text-center">
                  <span className="text-[5.5px] text-slate-400 font-bold block mb-0.5">FACEID</span>
                  <div className="w-6 h-7 bg-slate-200/80 rounded-[1px] mb-0.5 flex items-center justify-center text-slate-400">
                    <User size={10} weight="duotone" />
                  </div>
                  <span className="text-[5px] font-bold text-slate-700 block truncate">Đỗ Thanh Tùng</span>
                  <span className="text-[4px] text-slate-400 block">XM-003</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[6px]">
              <span className="text-slate-400">● Sẵn sàng</span>
              <div className="flex gap-0.5">
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho vào</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho ra</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-indigo-50 text-indigo-600 border border-indigo-200 text-[5.5px]">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 07: Xe máy ra 02 ── */}
          <div className="bg-white/90 backdrop-blur-md rounded-[3px] border border-white/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1.5">
                <div className="flex items-center gap-1">
                  <span className="px-1 py-0 rounded-[1.5px] text-[6.5px] font-bold bg-sky-100 text-sky-700">XM</span>
                  <span className="font-bold text-[8.5px] text-slate-800">Xe máy ra 02</span>
                </div>
                <div className="flex items-center gap-0.5 text-slate-400"><File size={7} /><Gear size={7} /></div>
              </div>

              <div className="grid grid-cols-2 gap-1 mb-1.5">
                <div className="h-8 bg-slate-100/90 rounded-[2px] border border-slate-200 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400">MẪU BIỂN SỐ</div>
                <div className="h-8 bg-slate-100/90 rounded-[2px] border border-slate-200 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400">MẪU GÓC KHÁC</div>
              </div>

              <div className="grid grid-cols-12 gap-1 mb-1">
                <div className="col-span-7 space-y-0.5 text-[6.5px]">
                  <div><span className="text-slate-400">Biển số:</span> <b className="text-slate-800">59B-135.79</b></div>
                  <div><span className="text-slate-400">Mã thẻ:</span> XM-004</div>
                  <div><span className="text-slate-400">P.ban:</span> Bảo trì</div>
                  <div><span className="text-slate-400">Đ.tượng:</span> Nhân viên</div>
                  <div><span className="text-slate-400">Vào/Ra:</span> 07:48 / 08:28</div>
                </div>
                <div className="col-span-5 bg-slate-100/90 rounded-[2px] border border-slate-200/80 p-0.5 flex flex-col items-center justify-center text-center">
                  <span className="text-[5.5px] text-slate-400 font-bold block mb-0.5">FACEID</span>
                  <div className="w-6 h-7 bg-slate-200/80 rounded-[1px] mb-0.5 flex items-center justify-center text-slate-400">
                    <User size={10} weight="duotone" />
                  </div>
                  <span className="text-[5px] font-bold text-slate-700 block truncate">Hoàng Gia Huy</span>
                  <span className="text-[4px] text-slate-400 block">XM-004</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[6px]">
              <span className="text-slate-400">● Sẵn sàng</span>
              <div className="flex gap-0.5">
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho vào</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho ra</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-indigo-50 text-indigo-600 border border-indigo-200 text-[5.5px]">Mở barie</button>
              </div>
            </div>
          </div>

          {/* ── CARD 08: Ô tô ra ── */}
          <div className="bg-white/90 backdrop-blur-md rounded-[3px] border border-white/80 p-2 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1.5">
                <div className="flex items-center gap-1">
                  <span className="px-1 py-0 rounded-[1.5px] text-[6.5px] font-bold bg-amber-100 text-amber-700">OT</span>
                  <span className="font-bold text-[8.5px] text-slate-800">Ô tô ra</span>
                </div>
                <div className="flex items-center gap-0.5 text-slate-400"><File size={7} /><Gear size={7} /></div>
              </div>

              <div className="grid grid-cols-2 gap-1 mb-1.5">
                <div className="h-8 bg-slate-100/90 rounded-[2px] border border-slate-200 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400">MẪU BIỂN SỐ</div>
                <div className="h-8 bg-slate-100/90 rounded-[2px] border border-slate-200 flex flex-col items-center justify-center text-[5.5px] font-bold text-slate-400">MẪU GÓC KHÁC</div>
              </div>

              <div className="grid grid-cols-12 gap-1 mb-1">
                <div className="col-span-7 space-y-0.5 text-[6.5px]">
                  <div><span className="text-slate-400">Biển số:</span> <b className="text-slate-800">30A-246.80</b></div>
                  <div><span className="text-slate-400">Mã thẻ:</span> OT-002</div>
                  <div><span className="text-slate-400">P.ban:</span> Kho vận</div>
                  <div><span className="text-slate-400">Đ.tượng:</span> Đối tác</div>
                  <div><span className="text-slate-400">Vào/Ra:</span> 07:40 / 08:31</div>
                </div>
                <div className="col-span-5 bg-slate-100/90 rounded-[2px] border border-slate-200/80 p-0.5 flex flex-col items-center justify-center text-center">
                  <span className="text-[5.5px] text-slate-400 font-bold block mb-0.5">FACEID</span>
                  <div className="w-6 h-7 bg-slate-200/80 rounded-[1px] mb-0.5 flex items-center justify-center text-slate-400">
                    <User size={10} weight="duotone" />
                  </div>
                  <span className="text-[5px] font-bold text-slate-700 block truncate">Nguyễn Đức Long</span>
                  <span className="text-[4px] text-slate-400 block">OT-002</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-1 flex items-center justify-between text-[6px]">
              <span className="text-slate-400">● Sẵn sàng</span>
              <div className="flex gap-0.5">
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho vào</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-slate-100 text-slate-600 border border-slate-200 text-[5.5px]">Cho ra</button>
                <button className="px-1 py-0.2 rounded-[1px] bg-indigo-50 text-indigo-600 border border-indigo-200 text-[5.5px]">Mở barie</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
