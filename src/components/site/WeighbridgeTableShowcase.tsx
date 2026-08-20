'use client';

import React, { useState } from 'react';
import { 
  ArrowClockwise, 
  MicrosoftExcelLogo, 
  Funnel, 
  CaretDown, 
  CaretUpDown, 
  ArrowDown
} from '@phosphor-icons/react';

interface WeighTicketRecord {
  stt: number;
  code: string;
  plate: string;
  partner: string;
  goods: string;
  grossWeight: string;
  tareWeight: string;
  netWeight: string;
  status: 'match' | 'diff' | 'pending';
  statusText: string;
}

const records: WeighTicketRecord[] = [
  {
    stt: 1,
    code: 'PC-20260820-042',
    plate: '51C-224.19',
    partner: 'Tập đoàn Đồng Tâm',
    goods: 'Gạch men 60x60',
    grossWeight: '42.580',
    tareWeight: '14.200',
    netWeight: '28.380',
    status: 'match',
    statusText: 'Khớp 100%',
  },
  {
    stt: 2,
    code: 'PC-20260820-041',
    plate: '60H-189.52',
    partner: 'Xi măng Hà Tiên',
    goods: 'Clinker thô PCB40',
    grossWeight: '38.120',
    tareWeight: '12.500',
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
    grossWeight: '52.460',
    tareWeight: '15.100',
    netWeight: '37.360',
    status: 'diff',
    statusText: 'Lệch +1.2%',
  },
  {
    stt: 4,
    code: 'PC-20260820-039',
    plate: '29H-774.20',
    partner: 'Bê tông Rạch Chiếc',
    goods: 'Cát vàng san lấp',
    grossWeight: '31.950',
    tareWeight: '10.800',
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
    grossWeight: '18.420',
    tareWeight: '6.150',
    netWeight: '12.270',
    status: 'pending',
    statusText: 'Chờ cân ra',
  },
  {
    stt: 6,
    code: 'PC-20260820-037',
    plate: '61C-442.89',
    partner: 'Giấy Sài Gòn',
    goods: 'Bột giấy nguyên liệu',
    grossWeight: '27.800',
    tareWeight: '9.300',
    netWeight: '18.500',
    status: 'match',
    statusText: 'Khớp 100%',
  },
  {
    stt: 7,
    code: 'PC-20260820-036',
    plate: '72A-518.23',
    partner: 'Hóa chất Miền Nam',
    goods: 'Xút lỏng NaOH',
    grossWeight: '24.650',
    tareWeight: '8.400',
    netWeight: '16.250',
    status: 'match',
    statusText: 'Khớp 100%',
  },
  {
    stt: 8,
    code: 'PC-20260820-035',
    plate: '51C-612.04',
    partner: 'Tập đoàn Đồng Tâm',
    goods: 'Ngói lợp Viglacera',
    grossWeight: '35.200',
    tareWeight: '11.900',
    netWeight: '23.300',
    status: 'match',
    statusText: 'Khớp 100%',
  },
];

export default function WeighbridgeTableShowcase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weighType, setWeighType] = useState('Tất cả');
  const [station, setStation] = useState('Tất cả');

  const filteredRecords = records.filter(
    (r) =>
      r.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.goods.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      style={{ zoom: 0.84 }}
      className="w-full bg-[#f8fafc] text-slate-800 p-2.5 sm:p-3 select-none font-sans rounded-b-[4px] text-[8.5px] leading-tight"
    >
      {/* ── 1. Header ── */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div>
          <h2 className="text-[11px] sm:text-[11.5px] font-bold text-slate-900 leading-none">
            Nhật ký phiếu cân xe
          </h2>
          <p className="text-[8px] text-slate-500 mt-0.5">
            Đối soát khối lượng hàng hóa tự động theo đơn PO
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[2px] text-[8px] font-semibold text-white bg-[#4f46e5] hover:bg-[#4338ca] shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <ArrowClockwise size={9} weight="bold" />
            <span>Cân mới</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[2px] text-[8px] font-semibold text-white bg-[#059669] hover:bg-[#047857] shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <MicrosoftExcelLogo size={9} weight="bold" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* ── 2. Filter Box ── */}
      <div className="bg-white rounded-[4px] border border-slate-200/80 p-2 shadow-2xs mb-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 items-end">
          {/* Loại cân */}
          <div className="space-y-0.5">
            <label className="text-[7px] font-bold text-slate-500 uppercase tracking-wider block">
              Loại cân
            </label>
            <div className="relative">
              <select
                value={weighType}
                onChange={(e) => setWeighType(e.target.value)}
                className="w-full h-5 pl-1.5 pr-4 rounded-[2px] border border-slate-200 bg-white text-[8px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Tất cả">Tất cả loại cân</option>
                <option value="Hàng nhập">Cân hàng nhập</option>
                <option value="Hàng xuất">Cân hàng xuất</option>
                <option value="Dịch vụ">Cân dịch vụ</option>
              </select>
              <CaretDown size={8} weight="bold" className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Trạm cân */}
          <div className="space-y-0.5">
            <label className="text-[7px] font-bold text-slate-500 uppercase tracking-wider block">
              Trạm cân
            </label>
            <div className="relative">
              <select
                value={station}
                onChange={(e) => setStation(e.target.value)}
                className="w-full h-5 pl-1.5 pr-4 rounded-[2px] border border-slate-200 bg-white text-[8px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Tất cả">Tất cả trạm</option>
                <option value="Trạm 01">Trạm 01 (80 Tấn)</option>
                <option value="Trạm 02">Trạm 02 (120 Tấn)</option>
              </select>
              <CaretDown size={8} weight="bold" className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Trạng thái đối soát */}
          <div className="space-y-0.5">
            <label className="text-[7px] font-bold text-slate-500 uppercase tracking-wider block">
              Đối soát ERP
            </label>
            <div className="relative">
              <select
                className="w-full h-5 pl-1.5 pr-4 rounded-[2px] border border-slate-200 bg-white text-[8px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="match">Khớp 100%</option>
                <option value="pending">Chờ cân ra</option>
                <option value="diff">Lệch tải trọng</option>
              </select>
              <CaretDown size={8} weight="bold" className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Khách hàng / NCC */}
          <div className="space-y-0.5">
            <label className="text-[7px] font-bold text-slate-500 uppercase tracking-wider block">
              Đối tác
            </label>
            <div className="relative">
              <select
                className="w-full h-5 pl-1.5 pr-4 rounded-[2px] border border-slate-200 bg-white text-[8px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="Đồng Tâm">Tập đoàn Đồng Tâm</option>
                <option value="Hà Tiên">Xi măng Hà Tiên</option>
                <option value="Hòa Phát">Thép Hòa Phát</option>
              </select>
              <CaretDown size={8} weight="bold" className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Tìm kiếm */}
          <div className="space-y-0.5">
            <label className="text-[7px] font-bold text-slate-500 uppercase tracking-wider block">
              Tìm kiếm
            </label>
            <input
              type="text"
              placeholder="Phiếu/biển số/hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-5 px-1 rounded-[2px] border border-slate-200 bg-white text-[8px] text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Nút Lọc */}
          <div>
            <button
              type="button"
              className="w-full h-5 inline-flex items-center justify-center gap-0.5 px-1.5 rounded-[2px] border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[8px] font-semibold text-slate-700 transition-all active:scale-95 cursor-pointer"
            >
              <Funnel size={8} weight="bold" />
              <span>Lọc</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. Data Table ── */}
      <div className="bg-white rounded-[4px] border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[530px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[7.5px] font-semibold text-slate-500">
                <th className="py-1.5 px-1.5 text-center w-6">STT</th>
                <th className="py-1.5 px-1.5 text-[#4f46e5] font-bold">
                  <span className="inline-flex items-center gap-0.5">
                    Số phiếu <ArrowDown size={7} weight="bold" className="text-[#4f46e5]" />
                  </span>
                </th>
                <th className="py-1.5 px-1.5 text-slate-700">
                  <span className="inline-flex items-center gap-0.5">
                    Biển số <CaretUpDown size={7} weight="bold" />
                  </span>
                </th>
                <th className="py-1.5 px-1.5 text-slate-700">Đối tác / Khách hàng</th>
                <th className="py-1.5 px-1.5 text-slate-700">Loại hàng</th>
                <th className="py-1.5 px-1.5 text-right text-slate-700">Tổng (Kg)</th>
                <th className="py-1.5 px-1.5 text-right text-slate-500">Bì xe (Kg)</th>
                <th className="py-1.5 px-1.5 text-right text-[#4f46e5] font-bold">Hàng ròng (Kg)</th>
                <th className="py-1.5 px-1.5 text-center">Đối soát ERP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[8px]">
              {filteredRecords.map((r) => (
                <tr
                  key={r.stt}
                  className="hover:bg-indigo-50/30 transition-colors"
                >
                  <td className="py-1 px-1.5 text-center text-slate-400 font-medium">
                    {r.stt}
                  </td>
                  <td className="py-1 px-1.5 font-mono font-bold text-slate-800 whitespace-nowrap">
                    {r.code}
                  </td>
                  <td className="py-1 px-1.5">
                    <span className="inline-block px-1 py-0 rounded-[1.5px] text-[7px] font-semibold bg-slate-100 text-slate-800 font-mono border border-slate-200/50 whitespace-nowrap">
                      {r.plate}
                    </span>
                  </td>
                  <td className="py-1 px-1.5 font-bold text-slate-900 whitespace-nowrap">
                    {r.partner}
                  </td>
                  <td className="py-1 px-1.5 text-slate-600 font-medium whitespace-nowrap">
                    {r.goods}
                  </td>
                  <td className="py-1 px-1.5 text-right text-slate-700 whitespace-nowrap">
                    {r.grossWeight}
                  </td>
                  <td className="py-1 px-1.5 text-right text-slate-400 whitespace-nowrap">
                    {r.tareWeight}
                  </td>
                  <td className="py-1 px-1.5 text-right font-bold text-emerald-600 whitespace-nowrap">
                    {r.netWeight}
                  </td>
                  <td className="py-1 px-1.5 text-center whitespace-nowrap">
                    {r.status === 'match' && (
                      <span className="inline-block px-1.5 py-0.2 rounded-[1.5px] text-[7px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        {r.statusText}
                      </span>
                    )}
                    {r.status === 'diff' && (
                      <span className="inline-block px-1.5 py-0.2 rounded-[1.5px] text-[7px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                        {r.statusText}
                      </span>
                    )}
                    {r.status === 'pending' && (
                      <span className="inline-block px-1.5 py-0.2 rounded-[1.5px] text-[7px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
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
