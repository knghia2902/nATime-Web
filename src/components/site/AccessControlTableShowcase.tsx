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

interface AccessRecord {
  stt: number;
  time: string;
  code: string;
  name: string;
  location: string;
  device: string;
  method: string;
  status: 'valid' | 'invalid' | 'warning';
  statusText: string;
}

const records: AccessRecord[] = [
  {
    stt: 1,
    time: '08:05:33',
    code: 'KH-002',
    name: 'Khách vãng lai · Đặng Tuấn',
    location: 'Cổng B · Làn 04 (VIP)',
    device: 'DS-K1T673 (FaceID)',
    method: 'Khuôn mặt',
    status: 'invalid',
    statusText: 'Từ chối (Hết hạn)',
  },
  {
    stt: 2,
    time: '08:04:12',
    code: 'NV-0482',
    name: 'Trần Văn An',
    location: 'Cổng B · Làn 03 (Turnstile)',
    device: 'Turnstile T200',
    method: 'FaceID',
    status: 'valid',
    statusText: 'Hợp lệ',
  },
  {
    stt: 3,
    time: '08:02:50',
    code: 'NT-114',
    name: 'Công ty Điện lực (Xe cẩu)',
    location: 'Cổng B · Làn 01 (Xe tải)',
    device: 'Barrier ANPR B10',
    method: 'Biển số + Thẻ',
    status: 'valid',
    statusText: 'Hợp lệ',
  },
  {
    stt: 4,
    time: '08:01:25',
    code: 'NV-0128',
    name: 'Lê Hoàng Yến',
    location: 'Cổng A · Cửa xoay 01',
    device: 'DS-K2604T (Vân tay)',
    method: 'Vân tay',
    status: 'valid',
    statusText: 'Hợp lệ',
  },
  {
    stt: 5,
    time: '07:59:48',
    code: 'NV-0931',
    name: 'Vũ Đình Trọng',
    location: 'Cổng C · Làn 02 (Xe máy)',
    device: 'RFID Long Range',
    method: 'Thẻ từ',
    status: 'valid',
    statusText: 'Hợp lệ',
  },
  {
    stt: 6,
    time: '07:58:14',
    code: 'NT-089',
    name: 'Nhà thầu Vệ sinh Xanh',
    location: 'Cổng B · Cửa phụ X4',
    device: 'DS-K1T673',
    method: 'Thẻ từ',
    status: 'warning',
    statusText: 'Cảnh báo (Khu vực cấm)',
  },
  {
    stt: 7,
    time: '07:57:02',
    code: 'NV-0512',
    name: 'Phạm Minh Quân',
    location: 'Cổng B · Làn 03 (Turnstile)',
    device: 'Turnstile T200',
    method: 'FaceID',
    status: 'valid',
    statusText: 'Hợp lệ',
  },
  {
    stt: 8,
    time: '07:55:30',
    code: 'NV-0045',
    name: 'Hoàng Trọng Nghĩa',
    location: 'Cổng A · Nhà điều hành',
    device: 'DS-K1T673 (FaceID)',
    method: 'FaceID',
    status: 'valid',
    statusText: 'Hợp lệ',
  },
];

export default function AccessControlTableShowcase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gate, setGate] = useState('Tất cả');
  const [targetType, setTargetType] = useState('Tất cả');

  const filteredRecords = records.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase())
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
            Nhật ký ra vào cửa
          </h2>
          <p className="text-[8px] text-slate-500 mt-0.5">
            Sự kiện thời gian thực theo cổng & làn
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[2px] text-[8px] font-semibold text-white bg-[#4f46e5] hover:bg-[#4338ca] shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <ArrowClockwise size={9} weight="bold" />
            <span>Làm mới</span>
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
          {/* Cổng / Khu vực */}
          <div className="space-y-0.5">
            <label className="text-[7px] font-bold text-slate-500 uppercase tracking-wider block">
              Cổng / Vị trí
            </label>
            <div className="relative">
              <select
                value={gate}
                onChange={(e) => setGate(e.target.value)}
                className="w-full h-5 pl-1.5 pr-4 rounded-[2px] border border-slate-200 bg-white text-[8px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Tất cả">Tất cả cổng</option>
                <option value="Cổng A">Cổng A - Điều hành</option>
                <option value="Cổng B">Cổng B - Sản xuất</option>
                <option value="Cổng C">Cổng C - Kho vận</option>
              </select>
              <CaretDown size={8} weight="bold" className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Làn quét */}
          <div className="space-y-0.5">
            <label className="text-[7px] font-bold text-slate-500 uppercase tracking-wider block">
              Làn quét
            </label>
            <div className="relative">
              <select
                className="w-full h-5 pl-1.5 pr-4 rounded-[2px] border border-slate-200 bg-white text-[8px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Tất cả">Tất cả làn (8 làn)</option>
                <option value="Làn 01">Làn 01 - Xe ô tô</option>
                <option value="Làn 02">Làn 02 - Xe máy</option>
                <option value="Làn 03">Làn 03 - Turnstile</option>
                <option value="Làn 04">Làn 04 - VIP</option>
              </select>
              <CaretDown size={8} weight="bold" className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Đối tượng */}
          <div className="space-y-0.5">
            <label className="text-[7px] font-bold text-slate-500 uppercase tracking-wider block">
              Đối tượng
            </label>
            <div className="relative">
              <select
                value={targetType}
                onChange={(e) => setTargetType(e.target.value)}
                className="w-full h-5 pl-1.5 pr-4 rounded-[2px] border border-slate-200 bg-white text-[8px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="Nhân viên">Nhân viên</option>
                <option value="Nhà thầu">Nhà thầu</option>
                <option value="Khách">Khách vãng lai</option>
              </select>
              <CaretDown size={8} weight="bold" className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Trạng thái */}
          <div className="space-y-0.5">
            <label className="text-[7px] font-bold text-slate-500 uppercase tracking-wider block">
              Trạng thái
            </label>
            <div className="relative">
              <select
                className="w-full h-5 pl-1.5 pr-4 rounded-[2px] border border-slate-200 bg-white text-[8px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="valid">Hợp lệ</option>
                <option value="invalid">Từ chối</option>
                <option value="warning">Cảnh báo</option>
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
              placeholder="Mã/tên/biển số..."
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
          <table className="w-full text-left border-collapse min-w-[520px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[7.5px] font-semibold text-slate-500">
                <th className="py-1.5 px-1.5 text-center w-6">STT</th>
                <th className="py-1.5 px-1.5 text-[#4f46e5] font-bold">
                  <span className="inline-flex items-center gap-0.5">
                    Thời gian <ArrowDown size={7} weight="bold" className="text-[#4f46e5]" />
                  </span>
                </th>
                <th className="py-1.5 px-1.5 text-slate-700">
                  <span className="inline-flex items-center gap-0.5">
                    Mã thẻ <CaretUpDown size={7} weight="bold" />
                  </span>
                </th>
                <th className="py-1.5 px-1.5 text-slate-700">Họ và tên / Đơn vị</th>
                <th className="py-1.5 px-1.5 text-slate-700">Vị trí & Làn</th>
                <th className="py-1.5 px-1.5 text-slate-700">Thiết bị</th>
                <th className="py-1.5 px-1.5 text-slate-700">Phương thức</th>
                <th className="py-1.5 px-1.5 text-center">Trạng thái</th>
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
                  <td className="py-1 px-1.5 font-mono font-bold text-slate-800">
                    {r.time}
                  </td>
                  <td className="py-1 px-1.5">
                    <span className="inline-block px-1 py-0 rounded-[1.5px] text-[7px] font-semibold bg-slate-100 text-slate-700 font-mono border border-slate-200/50">
                      {r.code}
                    </span>
                  </td>
                  <td className="py-1 px-1.5 font-bold text-slate-900 whitespace-nowrap">
                    {r.name}
                  </td>
                  <td className="py-1 px-1.5 text-slate-600 font-medium whitespace-nowrap">
                    {r.location}
                  </td>
                  <td className="py-1 px-1.5 text-slate-500 whitespace-nowrap">
                    {r.device}
                  </td>
                  <td className="py-1 px-1.5 text-slate-600 whitespace-nowrap">
                    {r.method}
                  </td>
                  <td className="py-1 px-1.5 text-center whitespace-nowrap">
                    {r.status === 'valid' && (
                      <span className="inline-block px-1.5 py-0.2 rounded-[1.5px] text-[7px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        {r.statusText}
                      </span>
                    )}
                    {r.status === 'invalid' && (
                      <span className="inline-block px-1.5 py-0.2 rounded-[1.5px] text-[7px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                        {r.statusText}
                      </span>
                    )}
                    {r.status === 'warning' && (
                      <span className="inline-block px-1.5 py-0.2 rounded-[1.5px] text-[7px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
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
