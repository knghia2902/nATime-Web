'use client';

import React, { useState } from 'react';
import { 
  ArrowClockwise, 
  MicrosoftExcelLogo, 
  Funnel, 
  CalendarBlank, 
  CaretDown, 
  CaretUpDown, 
  ArrowDown
} from '@phosphor-icons/react';

interface AttendanceRecord {
  stt: number;
  code: string;
  name: string;
  department: string;
  date: string;
  shift: string;
  inTime: string;
  outTime: string;
  workHours: string;
  overtime: string;
  status: string;
}

const records: AttendanceRecord[] = [
  {
    stt: 1,
    code: '05A00000563',
    name: 'Nguyễn Văn Hoàn',
    department: 'BP R&D',
    date: '20/08/2026',
    shift: '08:00-17:00',
    inTime: '08:00:00',
    outTime: '—',
    workHours: '—',
    overtime: '—',
    status: 'Đi muộn',
  },
  {
    stt: 2,
    code: '05A00002147',
    name: 'Huỳnh Khánh Vinh',
    department: 'BP Kho',
    date: '20/08/2026',
    shift: '08:00-17:00',
    inTime: '08:00:00',
    outTime: '—',
    workHours: '—',
    overtime: '—',
    status: 'Đi muộn',
  },
  {
    stt: 3,
    code: '05A00002277',
    name: 'Nguyễn Đăng Vương',
    department: 'BP Kho',
    date: '20/08/2026',
    shift: '08:00-17:00',
    inTime: '08:00:00',
    outTime: '—',
    workHours: '—',
    overtime: '—',
    status: 'Đi muộn',
  },
  {
    stt: 4,
    code: '05A00000003',
    name: 'Trần Quốc Vũ',
    department: 'BP Kho',
    date: '20/08/2026',
    shift: '08:00-17:00',
    inTime: '07:59:00',
    outTime: '—',
    workHours: '—',
    overtime: '—',
    status: '—',
  },
  {
    stt: 5,
    code: '05A00002290',
    name: 'Ngô Trung Thiêm',
    department: 'Phòng KD',
    date: '20/08/2026',
    shift: '08:00-17:00',
    inTime: '07:58:00',
    outTime: '—',
    workHours: '—',
    overtime: '—',
    status: '—',
  },
  {
    stt: 6,
    code: '05A00001223',
    name: 'Nguyễn Thị Ngà',
    department: 'Xưởng Sơn (X4)',
    date: '20/08/2026',
    shift: '08:00-17:00',
    inTime: '07:58:00',
    outTime: '—',
    workHours: '—',
    overtime: '—',
    status: '—',
  },
  {
    stt: 7,
    code: '05A00000781',
    name: 'Đặng Văn Hoan',
    department: 'Phòng Kỹ thuật',
    date: '20/08/2026',
    shift: '08:00-17:00',
    inTime: '07:58:00',
    outTime: '—',
    workHours: '—',
    overtime: '—',
    status: '—',
  },
  {
    stt: 8,
    code: '05A00001242',
    name: 'Phạm Duy Thị Tâm',
    department: 'Phòng Tổ chức',
    date: '20/08/2026',
    shift: '08:00-17:00',
    inTime: '07:57:00',
    outTime: '—',
    workHours: '—',
    overtime: '—',
    status: '—',
  },
];

export default function AttendanceTableShowcase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reportType, setReportType] = useState('Lịch sử chấm công');
  const [department, setDepartment] = useState('Tất cả');

  const filteredRecords = records.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.department.toLowerCase().includes(searchTerm.toLowerCase())
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
            Lịch sử chấm công
          </h2>
          <p className="text-[8px] text-slate-500 mt-0.5">
            Tổng hợp dữ liệu theo bộ lọc
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[2px] text-[8px] font-semibold text-white bg-[#4f46e5] hover:bg-[#4338ca] shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <ArrowClockwise size={9} weight="bold" />
            <span>Tính lại</span>
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
          {/* Loại báo cáo */}
          <div className="space-y-0.5">
            <label className="text-[7px] font-bold text-slate-500 uppercase tracking-wider block">
              Loại báo cáo
            </label>
            <div className="relative">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full h-5 pl-1.5 pr-4 rounded-[2px] border border-slate-200 bg-white text-[8px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Lịch sử chấm công">Lịch sử chấm công</option>
                <option value="Bảng công chi tiết">Bảng công chi tiết</option>
              </select>
              <CaretDown size={8} weight="bold" className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Từ ngày */}
          <div className="space-y-0.5">
            <label className="text-[7px] font-bold text-slate-500 uppercase tracking-wider block">
              Từ ngày
            </label>
            <div className="relative">
              <input
                type="text"
                defaultValue="20/08/2026"
                className="w-full h-5 pl-1.5 pr-4 rounded-[2px] border border-slate-200 bg-white text-[8px] text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
              />
              <CalendarBlank size={8} weight="bold" className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Đến ngày */}
          <div className="space-y-0.5">
            <label className="text-[7px] font-bold text-slate-500 uppercase tracking-wider block">
              Đến ngày
            </label>
            <div className="relative">
              <input
                type="text"
                defaultValue="20/08/2026"
                className="w-full h-5 pl-1.5 pr-4 rounded-[2px] border border-slate-200 bg-white text-[8px] text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
              />
              <CalendarBlank size={8} weight="bold" className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Phòng ban */}
          <div className="space-y-0.5">
            <label className="text-[7px] font-bold text-slate-500 uppercase tracking-wider block">
              Phòng ban
            </label>
            <div className="relative">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-5 pl-1.5 pr-4 rounded-[2px] border border-slate-200 bg-white text-[8px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="BP Kho">BP Kho</option>
                <option value="BP R&D">BP R&D</option>
                <option value="Phòng KD">Phòng KD</option>
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
              placeholder="Mã/tên NV..."
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
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[7.5px] font-semibold text-slate-500">
                <th className="py-1.5 px-1.5 text-center w-6">STT</th>
                <th className="py-1.5 px-1.5 text-[#4f46e5] font-bold">
                  <span className="inline-flex items-center gap-0.5">
                    Mã NV <CaretUpDown size={7} weight="bold" />
                  </span>
                </th>
                <th className="py-1.5 px-1.5 text-slate-700">Nhân viên</th>
                <th className="py-1.5 px-1.5 text-slate-700">Phòng ban</th>
                <th className="py-1.5 px-1.5 text-slate-700">
                  <span className="inline-flex items-center gap-0.5">
                    Ngày <CaretUpDown size={7} weight="bold" />
                  </span>
                </th>
                <th className="py-1.5 px-1.5 text-slate-700">Khung ca</th>
                <th className="py-1.5 px-1.5 text-slate-700">
                  <span className="inline-flex items-center gap-0.5">
                    Giờ vào <ArrowDown size={7} weight="bold" className="text-[#4f46e5]" />
                  </span>
                </th>
                <th className="py-1.5 px-1 text-center">Giờ ra</th>
                <th className="py-1.5 px-1 text-center">Giờ công</th>
                <th className="py-1.5 px-1 text-center">Tăng ca</th>
                <th className="py-1.5 px-1.5 text-center">Chế độ</th>
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
                  <td className="py-1 px-1.5">
                    <span className="inline-block px-1 py-0 rounded-[1.5px] text-[7px] font-semibold bg-slate-100 text-slate-700 font-mono border border-slate-200/50">
                      {r.code}
                    </span>
                  </td>
                  <td className="py-1 px-1.5 font-bold text-slate-900 whitespace-nowrap">
                    {r.name}
                  </td>
                  <td className="py-1 px-1.5 text-slate-600 font-medium whitespace-nowrap">
                    {r.department}
                  </td>
                  <td className="py-1 px-1.5 text-slate-600 font-medium whitespace-nowrap">
                    {r.date}
                  </td>
                  <td className="py-1 px-1.5 text-slate-600 font-medium whitespace-nowrap">
                    {r.shift}
                  </td>
                  <td className="py-1 px-1.5 font-bold text-emerald-600">
                    {r.inTime}
                  </td>
                  <td className="py-1 px-1 text-center text-blue-500 font-medium">
                    {r.outTime}
                  </td>
                  <td className="py-1 px-1 text-center text-slate-400">
                    {r.workHours}
                  </td>
                  <td className="py-1 px-1 text-center text-indigo-400 font-medium">
                    {r.overtime}
                  </td>
                  <td className="py-1 px-1.5 text-center">
                    {r.status === 'Đi muộn' ? (
                      <span className="font-semibold text-rose-600">
                        {r.status}
                      </span>
                    ) : (
                      <span className="text-slate-400">{r.status}</span>
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
