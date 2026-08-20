'use client';

import React, { useState } from 'react';
import { 
  FileArrowDown, 
  FileArrowUp, 
  Plus, 
  MagnifyingGlass, 
  QrCode, 
  PencilSimple, 
  Trash, 
  CaretUpDown,
  CaretDown
} from '@phosphor-icons/react';

interface AssetItem {
  id: string;
  code: string;
  name: string;
  group: 'Màn hình' | 'PC' | 'Laptop' | 'Khác';
  serial: string;
  tag: string;
  specs: string;
  status: 'Đang sử dụng' | 'Sẵn sàng' | 'Bảo trì';
  department: string;
  userName: string;
  userCode: string;
  note: string;
  warning: string;
}

const SAMPLE_ASSETS: AssetItem[] = [
  {
    id: '1',
    code: 'A000000035',
    name: 'Màn hình máy tính Dell E2220H 21.5" Led',
    group: 'Màn hình',
    serial: '—',
    tag: '—',
    specs: '—',
    status: 'Đang sử dụng',
    department: 'Phòng Kế toán',
    userName: 'Đỗ Thị Ngọc Dung',
    userCode: '05A00000820',
    note: '—',
    warning: '—',
  },
  {
    id: '2',
    code: 'A000000115',
    name: 'Máy tính OptiPlex 3090 Tower/Core i5-10505/ Ram 16GB/...',
    group: 'PC',
    serial: '—',
    tag: '—',
    specs: 'Intel Core i5-12500 | 16GB RAM | HDD 3.5inch 1',
    status: 'Đang sử dụng',
    department: 'Phòng Kế toán',
    userName: 'Đỗ Lê Quý Hào',
    userCode: '05A00002053',
    note: '—',
    warning: '—',
  },
  {
    id: '3',
    code: 'A000000096',
    name: 'Màn hình máy tính Dell E2220H 21.5" Led',
    group: 'Màn hình',
    serial: '—',
    tag: '—',
    specs: '—',
    status: 'Đang sử dụng',
    department: 'Phòng Kế toán',
    userName: 'Đỗ Lê Quý Hào',
    userCode: '05A00002053',
    note: '—',
    warning: '—',
  },
  {
    id: '4',
    code: 'A000000027',
    name: 'Máy tính xách tay (NB) HP Pavilion 15-eg0007TX i7-1165...',
    group: 'Laptop',
    serial: '—',
    tag: '—',
    specs: 'HP Pavilion 15-eg0007TX i7-1165G7 | 512GSSD',
    status: 'Đang sử dụng',
    department: 'Phòng Kỹ thuật',
    userName: 'Đặng Văn Hoan',
    userCode: '05A00000781',
    note: '—',
    warning: '—',
  },
  {
    id: '5',
    code: 'A000000146',
    name: 'Màn hình Dell E2319H 23inch, 1DP, 1VGA0',
    group: 'Màn hình',
    serial: '—',
    tag: '—',
    specs: '—',
    status: 'Đang sử dụng',
    department: 'Phòng Kỹ thuật',
    userName: 'Đặng Văn Hoan',
    userCode: '05A00000781',
    note: '—',
    warning: '—',
  },
  {
    id: '6',
    code: 'A000000148',
    name: 'Dell USB-C Mobile Adapter - DA310',
    group: 'Khác',
    serial: '—',
    tag: '—',
    specs: '—',
    status: 'Đang sử dụng',
    department: 'Phòng Kỹ thuật',
    userName: 'Đặng Văn Hoan',
    userCode: '05A00000781',
    note: '—',
    warning: '—',
  },
  {
    id: '7',
    code: 'A0000000733',
    name: 'Bộ máy tính PC lắp ráp (Main B760M/CPU Core i7-13700/...',
    group: 'PC',
    serial: '—',
    tag: '—',
    specs: 'CPU Core i7-13700 | Ram 16GBx2 RAM | SSD 1T',
    status: 'Đang sử dụng',
    department: 'Phòng Kỹ thuật',
    userName: 'Đặng Văn Hoan',
    userCode: '05A00000781',
    note: '—',
    warning: '—',
  },
];

export default function AssetManagementTableShowcase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('ALL');
  const [selectedDept, setSelectedDept] = useState('ALL');

  return (
    <div 
      style={{ zoom: 0.84 }}
      className="w-full bg-[#f8fafc] text-slate-800 p-3 select-none font-sans rounded-b-[4px] text-[11px] leading-tight"
    >
      {/* ── 1. Header & Actions ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h2 className="font-bold text-[14px] text-slate-900 tracking-tight">Danh sách thiết bị CNTT</h2>
          <p className="text-[10px] text-slate-500 mt-0.5">Quản lý tài sản phần cứng, specs, vị trí phòng ban và người sử dụng</p>
        </div>

        <div className="flex items-center gap-1.5">
          <button className="flex items-center gap-1 px-2.5 h-[28px] rounded-[3px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[10px] shadow-2xs transition-colors cursor-pointer">
            <FileArrowDown size={12} weight="bold" />
            <span>Import Excel</span>
          </button>

          <button className="flex items-center gap-1 px-2.5 h-[28px] rounded-[3px] bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-[10px] shadow-2xs transition-colors cursor-pointer">
            <FileArrowUp size={12} weight="bold" />
            <span>Xuất Excel</span>
          </button>

          <button className="flex items-center gap-1 px-3 h-[28px] rounded-[3px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[10px] shadow-2xs transition-colors cursor-pointer">
            <Plus size={12} weight="bold" />
            <span>Thêm thiết bị</span>
          </button>
        </div>
      </div>

      {/* ── 2. Filter Bar ── */}
      <div className="bg-white rounded-[4px] border border-slate-200/90 p-1.5 mb-2.5 shadow-2xs flex flex-wrap items-center gap-2">
        {/* Search Box */}
        <div className="relative flex-1 min-w-[180px]">
          <input
            type="text"
            placeholder="Tìm kiếm tên, mã QR, serial..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-[28px] pl-2.5 pr-6 bg-slate-50/70 border border-slate-200 rounded-[3px] text-[10px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white"
          />
          <MagnifyingGlass size={12} className="absolute right-2 top-2 text-slate-400" />
        </div>

        {/* Group Select */}
        <div className="relative min-w-[130px]">
          <select 
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="w-full h-[28px] px-2 pr-6 bg-slate-50/70 border border-slate-200 rounded-[3px] text-[10px] text-slate-700 appearance-none focus:outline-none cursor-pointer"
          >
            <option value="ALL">-- Tất cả nhóm tài sản --</option>
            <option value="PC">PC</option>
            <option value="Laptop">Laptop</option>
            <option value="Màn hình">Màn hình</option>
            <option value="Khác">Khác</option>
          </select>
          <CaretDown size={10} className="absolute right-2 top-2.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Department Select */}
        <div className="relative min-w-[125px]">
          <select 
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full h-[28px] px-2 pr-6 bg-slate-50/70 border border-slate-200 rounded-[3px] text-[10px] text-slate-700 appearance-none focus:outline-none cursor-pointer"
          >
            <option value="ALL">-- Tất cả phòng ban --</option>
            <option value="KT">Phòng Kế toán</option>
            <option value="IT">Phòng Kỹ thuật</option>
          </select>
          <CaretDown size={10} className="absolute right-2 top-2.5 text-slate-400 pointer-events-none" />
        </div>

        {/* Status Select */}
        <div className="relative min-w-[100px]">
          <select 
            className="w-full h-[28px] px-2 pr-6 bg-slate-50/70 border border-slate-200 rounded-[3px] text-[10px] text-slate-700 appearance-none focus:outline-none cursor-pointer"
          >
            <option>Đang sử dụng</option>
            <option>Sẵn sàng</option>
            <option>Bảo trì</option>
          </select>
          <CaretDown size={10} className="absolute right-2 top-2.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* ── 3. Data Table ── */}
      <div className="bg-white rounded-[4px] border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[9.5px]">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[8.5px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2 px-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span>MÃ QR / CODE</span>
                    <CaretUpDown size={9} />
                  </div>
                </th>
                <th className="py-2 px-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span>TÊN THIẾT BỊ</span>
                    <CaretUpDown size={9} />
                  </div>
                </th>
                <th className="py-2 px-2 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span>NHÓM TÀI SẢN</span>
                    <CaretUpDown size={9} />
                  </div>
                </th>
                <th className="py-2 px-2 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span>SERIAL / TAG</span>
                    <CaretUpDown size={9} />
                  </div>
                </th>
                <th className="py-2 px-2.5 whitespace-nowrap">CẤU HÌNH</th>
                <th className="py-2 px-2 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span>TRẠNG THÁI</span>
                    <CaretUpDown size={9} />
                  </div>
                </th>
                <th className="py-2 px-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span>VỊ TRÍ PHÒNG BAN</span>
                    <CaretUpDown size={9} />
                  </div>
                </th>
                <th className="py-2 px-2.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span>NGƯỜI SỬ DỤNG</span>
                    <CaretUpDown size={9} />
                  </div>
                </th>
                <th className="py-2 px-2 whitespace-nowrap text-center">GHI CHÚ</th>
                <th className="py-2 px-2 whitespace-nowrap text-center">CẢNH BÁO</th>
                <th className="py-2 px-2 whitespace-nowrap text-center">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SAMPLE_ASSETS.map((asset) => (
                <tr key={asset.id} className="hover:bg-sky-50/30 transition-colors">
                  {/* Code & QR */}
                  <td className="py-2 px-2.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[9px] text-slate-700 bg-slate-100/90 px-1.5 py-0.5 rounded-[2px] border border-slate-200/60 font-semibold">
                        {asset.code}
                      </span>
                      <QrCode size={13} className="text-slate-400 cursor-pointer hover:text-indigo-600" />
                    </div>
                  </td>

                  {/* Name */}
                  <td className="py-2 px-2.5 whitespace-nowrap font-bold text-slate-900 max-w-[190px] truncate">
                    {asset.name}
                  </td>

                  {/* Group */}
                  <td className="py-2 px-2 whitespace-nowrap text-slate-600">
                    {asset.group}
                  </td>

                  {/* Serial / Tag */}
                  <td className="py-2 px-2 whitespace-nowrap text-[8.5px] font-mono text-slate-400">
                    <div>S/N: {asset.serial}</div>
                    <div>Tag: {asset.tag}</div>
                  </td>

                  {/* Specs */}
                  <td className="py-2 px-2.5 whitespace-nowrap text-slate-600 font-mono text-[9px] max-w-[170px] truncate">
                    {asset.specs}
                  </td>

                  {/* Status */}
                  <td className="py-2 px-2 whitespace-nowrap">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-[2px] text-[8px] font-bold bg-sky-100 text-sky-700">
                      {asset.status}
                    </span>
                  </td>

                  {/* Department */}
                  <td className="py-2 px-2.5 whitespace-nowrap text-slate-700">
                    {asset.department}
                  </td>

                  {/* User */}
                  <td className="py-2 px-2.5 whitespace-nowrap">
                    <div className="font-bold text-slate-800">{asset.userName}</div>
                    <div className="font-mono text-[8px] text-slate-400">{asset.userCode}</div>
                  </td>

                  {/* Note */}
                  <td className="py-2 px-2 whitespace-nowrap text-center text-slate-400">
                    {asset.note}
                  </td>

                  {/* Warning */}
                  <td className="py-2 px-2 whitespace-nowrap text-center text-slate-400">
                    {asset.warning}
                  </td>

                  {/* Actions */}
                  <td className="py-2 px-2 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1.5 text-slate-400">
                      <PencilSimple size={12} className="cursor-pointer hover:text-slate-700 transition-colors" />
                      <Trash size={12} className="cursor-pointer hover:text-rose-600 transition-colors" />
                    </div>
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
