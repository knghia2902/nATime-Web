'use client';

import React, { useState } from 'react';
import { 
  ArrowClockwise, 
  MicrosoftExcelLogo, 
  Funnel, 
  CalendarBlank, 
  CaretDown, 
  CaretLeft, 
  CaretRight,
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
    department: 'BP Nghiên Cứu & Phát Triển(R&D)',
    date: '20/08/2026',
    shift: '08:00:00-17:00:00',
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
    shift: '08:00:00-17:00:00',
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
    shift: '08:00:00-17:00:00',
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
    shift: '08:00:00-17:00:00',
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
    department: 'Phòng Kinh doanh',
    date: '20/08/2026',
    shift: '08:00:00-17:00:00',
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
    department: 'Xưởng Sơn & Hoàn Thiện (X4)',
    date: '20/08/2026',
    shift: '08:00:00-17:00:00',
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
    shift: '08:00:00-17:00:00',
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
    shift: '08:00:00-17:00:00',
    inTime: '07:57:00',
    outTime: '—',
    workHours: '—',
    overtime: '—',
    status: '—',
  },
  {
    stt: 9,
    code: '05A00001348',
    name: 'Nguyễn Thị Thùy Duyên',
    department: 'Xưởng Hàn (X2)',
    date: '20/08/2026',
    shift: '08:00:00-17:00:00',
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
    <div className="w-full bg-[#f8fafc] text-slate-800 p-4 sm:p-6 select-none font-sans rounded-b-xl">
      {/* ── 1. Page Header & Actions Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 tracking-tight">
            Lịch sử chấm công
          </h2>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Tổng hợp dữ liệu theo bộ lọc
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold text-white bg-[#4f46e5] hover:bg-[#4338ca] shadow-sm transition-all active:scale-95"
          >
            <ArrowClockwise size={15} weight="bold" />
            <span>Tính lại</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold text-white bg-[#059669] hover:bg-[#047857] shadow-sm transition-all active:scale-95"
          >
            <MicrosoftExcelLogo size={15} weight="bold" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* ── 2. Filter Box Card ── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 items-end">
          {/* Loại báo cáo */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
              Loại báo cáo
            </label>
            <div className="relative">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full h-9 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-[12px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                <option value="Lịch sử chấm công">Lịch sử chấm công</option>
                <option value="Bảng công chi tiết">Bảng công chi tiết</option>
                <option value="Báo cáo đi muộn">Báo cáo đi muộn</option>
              </select>
              <CaretDown size={14} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Từ ngày */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
              Từ ngày
            </label>
            <div className="relative">
              <input
                type="text"
                defaultValue="20/08/2026"
                className="w-full h-9 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-[12px] text-slate-800 font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <CalendarBlank size={15} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Đến ngày */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
              Đến ngày
            </label>
            <div className="relative">
              <input
                type="text"
                defaultValue="20/08/2026"
                className="w-full h-9 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-[12px] text-slate-800 font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <CalendarBlank size={15} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Phòng ban */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
              Phòng ban
            </label>
            <div className="relative">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-9 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-[12px] text-slate-800 font-medium appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="BP Kho">BP Kho</option>
                <option value="BP Nghiên Cứu & Phát Triển(R&D)">BP Nghiên Cứu & Phát Triển(R&D)</option>
                <option value="Phòng Kinh doanh">Phòng Kinh doanh</option>
                <option value="Xưởng Sơn & Hoàn Thiện (X4)">Xưởng Sơn & Hoàn Thiện (X4)</option>
              </select>
              <CaretDown size={14} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Tìm kiếm */}
          <div className="space-y-1.5 lg:col-span-1">
            <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
              Tìm kiếm
            </label>
            <input
              type="text"
              placeholder="Mã hoặc tên NV..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-slate-200 bg-white text-[12px] text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Nút Lọc */}
          <div>
            <button
              type="button"
              className="w-full h-9 inline-flex items-center justify-center gap-1.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[12px] font-semibold text-slate-700 transition-all active:scale-95 cursor-pointer"
            >
              <Funnel size={14} weight="bold" />
              <span>Lọc</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. Data Table Card ── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold text-slate-500">
                <th className="py-3 px-4 text-center w-12">STT</th>
                <th className="py-3 px-4 text-[#4f46e5] font-bold">
                  <span className="inline-flex items-center gap-1">
                    Mã NV <CaretUpDown size={12} weight="bold" />
                  </span>
                </th>
                <th className="py-3 px-4 text-slate-700">Nhân viên</th>
                <th className="py-3 px-4 text-slate-700">Phòng ban</th>
                <th className="py-3 px-4 text-slate-700">
                  <span className="inline-flex items-center gap-1">
                    Ngày <CaretUpDown size={12} weight="bold" />
                  </span>
                </th>
                <th className="py-3 px-4 text-slate-700">Khung ca</th>
                <th className="py-3 px-4 text-slate-700">
                  <span className="inline-flex items-center gap-1">
                    Giờ vào <ArrowDown size={12} weight="bold" className="text-[#4f46e5]" />
                  </span>
                </th>
                <th className="py-3 px-4 text-center">Giờ ra</th>
                <th className="py-3 px-4 text-center">Giờ công</th>
                <th className="py-3 px-4 text-center">Tăng ca</th>
                <th className="py-3 px-4 text-center">Chế độ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12.5px]">
              {filteredRecords.map((r) => (
                <tr
                  key={r.stt}
                  className="hover:bg-indigo-50/30 transition-colors duration-150"
                >
                  <td className="py-3 px-4 text-center text-slate-500 font-medium">
                    {r.stt}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 font-mono border border-slate-200/60">
                      {r.code}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {r.name}
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">
                    {r.department}
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">
                    {r.date}
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">
                    {r.shift}
                  </td>
                  <td className="py-3 px-4 font-semibold text-emerald-600">
                    {r.inTime}
                  </td>
                  <td className="py-3 px-4 text-center text-blue-500 font-medium">
                    {r.outTime}
                  </td>
                  <td className="py-3 px-4 text-center text-slate-400">
                    {r.workHours}
                  </td>
                  <td className="py-3 px-4 text-center text-indigo-400 font-medium">
                    {r.overtime}
                  </td>
                  <td className="py-3 px-4 text-center">
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

        {/* ── 4. Pagination Footer ── */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-slate-50/40 text-[12px] text-slate-500">
          <p>
            Hiển thị <span className="font-semibold text-slate-700">1</span> đến{' '}
            <span className="font-semibold text-slate-700">{filteredRecords.length}</span> của{' '}
            <span className="font-semibold text-slate-700">{records.length}</span> bản ghi
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors disabled:opacity-50"
              disabled
            >
              <CaretLeft size={13} weight="bold" />
            </button>

            <button
              type="button"
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#2563eb] text-white text-[12px] font-bold shadow-xs"
            >
              1
            </button>

            <button
              type="button"
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors disabled:opacity-50"
              disabled
            >
              <CaretRight size={13} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
