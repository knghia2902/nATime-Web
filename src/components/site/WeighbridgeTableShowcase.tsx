'use client';

import React, { useState } from 'react';
import { 
  ArrowClockwise, 
  Printer, 
  Funnel, 
  CaretDown, 
  Camera, 
  CheckCircle,
  Truck
} from '@phosphor-icons/react';

interface WeighTicketRecord {
  stt: number;
  code: string;
  plate: string;
  partner: string;
  goods: string;
  weightIn: string;
  weightOut: string;
  netWeight: string;
  status: 'match' | 'diff' | 'pending';
  statusText: string;
}

const recentTickets: WeighTicketRecord[] = [
  {
    stt: 1,
    code: 'PC-20260820-042',
    plate: '51C-224.19',
    partner: 'Tập đoàn Đồng Tâm',
    goods: 'Gạch men 60x60',
    weightIn: '42.580',
    weightOut: '14.200',
    netWeight: '28.380',
    status: 'match',
    statusText: 'Khớp 100%',
  },
  {
    stt: 2,
    code: 'PC-20260820-041',
    plate: '60H-189.52',
    partner: 'Xi măng Hà Tiên',
    goods: 'Clinker PCB40',
    weightIn: '38.120',
    weightOut: '12.500',
    netWeight: '25.620',
    status: 'match',
    statusText: 'Khớp 100%',
  },
  {
    stt: 3,
    code: 'PC-20260820-040',
    plate: '50LD-034.81',
    partner: 'Thép Hòa Phát',
    goods: 'Thép cuộn D10',
    weightIn: '52.460',
    weightOut: '15.100',
    netWeight: '37.360',
    status: 'diff',
    statusText: 'Lệch +1.2%',
  },
  {
    stt: 4,
    code: 'PC-20260820-039',
    plate: '29H-774.20',
    partner: 'Bê tông Rạch Chiếc',
    goods: 'Cát vàng',
    weightIn: '31.950',
    weightOut: '10.800',
    netWeight: '21.150',
    status: 'match',
    statusText: 'Khớp 100%',
  },
  {
    stt: 5,
    code: 'PC-20260820-038',
    plate: '51D-903.11',
    partner: 'Nhựa Bình Minh',
    goods: 'Hạt nhựa HDPE',
    weightIn: '18.420',
    weightOut: '6.150',
    netWeight: '12.270',
    status: 'pending',
    statusText: 'Chờ cân ra',
  },
];

export default function WeighbridgeTableShowcase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [station, setStation] = useState('Trạm 01 (80 Tấn)');

  const filteredTickets = recentTickets.filter(
    (r) =>
      r.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      style={{ zoom: 0.84 }}
      className="w-full bg-[#f8fafc] text-slate-800 p-2.5 sm:p-3 select-none font-sans rounded-b-[4px] text-[8.5px] leading-tight"
    >
      {/* ── 1. Header ── */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-[2px] bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold">
            <Truck size={11} weight="bold" />
          </div>
          <div>
            <h2 className="text-[11px] sm:text-[11.5px] font-bold text-slate-900 leading-none">
              Trạm cân xe điện tử
            </h2>
            <p className="text-[8px] text-slate-500 mt-0.5">
              Giám sát đầu cân trực tiếp & Camera ANPR (Trạm 01 - 80 Tấn)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[2px] text-[8px] font-semibold text-white bg-[#4f46e5] hover:bg-[#4338ca] shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <ArrowClockwise size={9} weight="bold" />
            <span>Chốt cân</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[2px] text-[8px] font-semibold text-white bg-[#059669] hover:bg-[#047857] shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <Printer size={9} weight="bold" />
            <span>In phiếu</span>
          </button>
        </div>
      </div>

      {/* ── 2. Live Weighing Terminal & Vehicle Card ── */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 mb-2">
        {/* Left: Industrial Digital Indicator */}
        <div className="sm:col-span-5 bg-slate-950 text-white rounded-[3px] p-2 border border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[7px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-emerald-400">STABLE (ỔN ĐỊNH)</span>
            </span>
            <span className="font-mono text-slate-400">ĐẦU CÂN CÔNG NGHIỆP</span>
          </div>

          <div className="my-1 text-center py-0.5 bg-slate-900/80 rounded-[2px] border border-slate-800/80">
            <div className="font-mono font-black text-[24px] text-emerald-400 tracking-tight leading-none">
              42.580
              <span className="text-[10px] text-emerald-500/70 font-medium ml-1">kg</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[6.5px] text-slate-400 border-t border-slate-800/80 pt-1">
            <span>ZERO: 0.00 kg</span>
            <span>MAX: 80.000 kg</span>
            <span>D: 10 kg</span>
          </div>
        </div>

        {/* Right: Vehicle & Order Match Info */}
        <div className="sm:col-span-7 bg-white rounded-[3px] p-2 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1">
            <div className="flex items-center gap-1">
              <Camera size={8} weight="bold" className="text-indigo-600" />
              <span className="text-[7.5px] font-bold text-slate-800">Xe trên bàn cân:</span>
              <span className="px-1 py-0 rounded-[1.5px] text-[7.5px] font-bold bg-slate-100 text-slate-900 font-mono border border-slate-200">
                51C-224.19
              </span>
            </div>
            <span className="inline-flex items-center gap-0.5 px-1 py-0.2 rounded-[1.5px] text-[6.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <CheckCircle size={7} weight="bold" /> Khớp đơn PO
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7.5px]">
            <div>
              <span className="text-slate-400 text-[6.5px] block">Khách hàng / Đơn hàng</span>
              <span className="font-bold text-slate-800 truncate block">Tập đoàn Đồng Tâm (PO-4471)</span>
            </div>
            <div>
              <span className="text-slate-400 text-[6.5px] block">Loại hàng hóa</span>
              <span className="font-semibold text-slate-700 truncate block">Gạch men 60x60 (Pallet)</span>
            </div>
            <div>
              <span className="text-slate-400 text-[6.5px] block">Cân lần 1 (Tổng)</span>
              <span className="font-bold text-slate-900">42.580 kg</span>
            </div>
            <div>
              <span className="text-slate-400 text-[6.5px] block">Cân lần 2 (Bì) ➔ Ròng</span>
              <span className="font-bold text-emerald-600">14.200 ➔ 28.380 kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Filter Box ── */}
      <div className="bg-white rounded-[3px] border border-slate-200/80 p-1.5 shadow-2xs mb-1.5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 items-end">
          {/* Trạm cân */}
          <div className="space-y-0.5">
            <label className="text-[6.5px] font-bold text-slate-500 uppercase tracking-wider block">
              Trạm cân
            </label>
            <div className="relative">
              <select
                value={station}
                onChange={(e) => setStation(e.target.value)}
                className="w-full h-4.5 pl-1 pr-3.5 rounded-[2px] border border-slate-200 bg-white text-[7.5px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Trạm 01 (80 Tấn)">Trạm 01 (80 Tấn)</option>
                <option value="Trạm 02 (120 Tấn)">Trạm 02 (120 Tấn)</option>
              </select>
              <CaretDown size={7} weight="bold" className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Loại cân */}
          <div className="space-y-0.5">
            <label className="text-[6.5px] font-bold text-slate-500 uppercase tracking-wider block">
              Loại cân
            </label>
            <div className="relative">
              <select
                className="w-full h-4.5 pl-1 pr-3.5 rounded-[2px] border border-slate-200 bg-white text-[7.5px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Tất cả">Cân hàng nhập / xuất</option>
                <option value="Hàng nhập">Hàng nhập</option>
                <option value="Hàng xuất">Hàng xuất</option>
              </select>
              <CaretDown size={7} weight="bold" className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Tìm kiếm */}
          <div className="space-y-0.5">
            <label className="text-[6.5px] font-bold text-slate-500 uppercase tracking-wider block">
              Tìm kiếm phiếu
            </label>
            <input
              type="text"
              placeholder="Phiếu/biển số..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-4.5 px-1 rounded-[2px] border border-slate-200 bg-white text-[7.5px] text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Nút Lọc */}
          <div>
            <button
              type="button"
              className="w-full h-4.5 inline-flex items-center justify-center gap-0.5 px-1.5 rounded-[2px] border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[7.5px] font-semibold text-slate-700 transition-all active:scale-95 cursor-pointer"
            >
              <Funnel size={7} weight="bold" />
              <span>Lọc danh sách</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 4. Recent Tickets Table ── */}
      <div className="bg-white rounded-[3px] border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[7px] font-semibold text-slate-500">
                <th className="py-1 px-1.5 text-center w-5">STT</th>
                <th className="py-1 px-1.5 text-[#4f46e5] font-bold">Số phiếu</th>
                <th className="py-1 px-1.5 text-slate-700">Biển số</th>
                <th className="py-1 px-1.5 text-slate-700">Khách hàng / NCC</th>
                <th className="py-1 px-1.5 text-slate-700">Hàng hóa</th>
                <th className="py-1 px-1.5 text-right text-slate-700">Tổng (Kg)</th>
                <th className="py-1 px-1.5 text-right text-slate-400">Bì (Kg)</th>
                <th className="py-1 px-1.5 text-right font-bold text-emerald-600">Ròng (Kg)</th>
                <th className="py-1 px-1.5 text-center">Đối soát ERP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[7.5px]">
              {filteredTickets.map((r) => (
                <tr
                  key={r.stt}
                  className="hover:bg-indigo-50/30 transition-colors"
                >
                  <td className="py-0.5 px-1.5 text-center text-slate-400 font-medium">
                    {r.stt}
                  </td>
                  <td className="py-0.5 px-1.5 font-mono font-bold text-slate-800 whitespace-nowrap">
                    {r.code}
                  </td>
                  <td className="py-0.5 px-1.5">
                    <span className="inline-block px-1 py-0 rounded-[1.5px] text-[6.5px] font-semibold bg-slate-100 text-slate-800 font-mono border border-slate-200/50 whitespace-nowrap">
                      {r.plate}
                    </span>
                  </td>
                  <td className="py-0.5 px-1.5 font-bold text-slate-900 whitespace-nowrap">
                    {r.partner}
                  </td>
                  <td className="py-0.5 px-1.5 text-slate-600 font-medium whitespace-nowrap">
                    {r.goods}
                  </td>
                  <td className="py-0.5 px-1.5 text-right text-slate-700 whitespace-nowrap">
                    {r.weightIn}
                  </td>
                  <td className="py-0.5 px-1.5 text-right text-slate-400 whitespace-nowrap">
                    {r.weightOut}
                  </td>
                  <td className="py-0.5 px-1.5 text-right font-bold text-emerald-600 whitespace-nowrap">
                    {r.netWeight}
                  </td>
                  <td className="py-0.5 px-1.5 text-center whitespace-nowrap">
                    {r.status === 'match' && (
                      <span className="inline-block px-1 py-0.2 rounded-[1.5px] text-[6.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        {r.statusText}
                      </span>
                    )}
                    {r.status === 'diff' && (
                      <span className="inline-block px-1 py-0.2 rounded-[1.5px] text-[6.5px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                        {r.statusText}
                      </span>
                    )}
                    {r.status === 'pending' && (
                      <span className="inline-block px-1 py-0.2 rounded-[1.5px] text-[6.5px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                        {r.statusText}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
