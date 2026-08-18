'use client';

import { Users, ShieldCheck, Scales, Cpu } from '@phosphor-icons/react';

export default function Features() {
  return (
    <>
      {/* ── 1. STATS METRICS ROW ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="glass-panel rounded-2xl p-6 shadow-card hover:border-white/20 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center mb-3.5 text-sky-400">
            <Users size={22} weight="duotone" />
          </div>
          <p className="font-sans font-bold text-[28px] text-white leading-none">120+</p>
          <p className="font-sans text-[13px] text-white/65 mt-2">nhà máy đang vận hành</p>
        </div>

        <div className="glass-panel rounded-2xl p-6 shadow-card hover:border-white/20 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center mb-3.5 text-emerald-400">
            <ShieldCheck size={22} weight="duotone" />
          </div>
          <p className="font-sans font-bold text-[28px] text-white leading-none">99.9%</p>
          <p className="font-sans text-[13px] text-white/65 mt-2">thời gian hoạt động</p>
        </div>

        <div className="glass-panel rounded-2xl p-6 shadow-card hover:border-white/20 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center mb-3.5 text-amber-400">
            <Cpu size={22} weight="duotone" />
          </div>
          <p className="font-sans font-bold text-[28px] text-white leading-none">&lt;200ms</p>
          <p className="font-sans text-[13px] text-white/65 mt-2">độ trễ ghi nhận sự kiện</p>
        </div>

        <div className="glass-panel rounded-2xl p-6 shadow-card hover:border-white/20 transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center mb-3.5 text-sky-400">
            <Scales size={22} weight="duotone" />
          </div>
          <p className="font-sans font-bold text-[28px] text-white leading-none">24/7</p>
          <p className="font-sans text-[13px] text-white/65 mt-2">giám sát & hỗ trợ</p>
        </div>
      </section>

      {/* ── 2. FOUR MODULES GRID ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-left mb-10">
          <p className="font-sans text-[13px] font-semibold text-sky-400 tracking-wider uppercase mb-2">
            BỐN MODULE
          </p>
          <h2 className="font-sans font-bold text-[28px] md:text-[34px] text-white max-w-xl tracking-tight">
            Từng module vận hành độc lập, dữ liệu luôn đồng bộ.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Module 1: Chấm công */}
          <div className="glass-panel rounded-2xl p-7 shadow-card hover:border-white/25 transition-all">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center mb-4 text-sky-400">
              <Users size={24} weight="duotone" />
            </div>
            <h3 className="font-sans font-bold text-[18px] text-white mb-2">Chấm công</h3>
            <p className="font-sans text-[14px] text-white/70 leading-relaxed">
              Ghi nhận giờ vào/ra bằng vân tay, khuôn mặt hoặc thẻ từ. Tự động tính công, tăng ca và nghỉ phép.
            </p>
          </div>

          {/* Module 2: Kiểm soát ra vào */}
          <div className="glass-panel rounded-2xl p-7 shadow-card hover:border-white/25 transition-all">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center mb-4 text-emerald-400">
              <ShieldCheck size={24} weight="duotone" />
            </div>
            <h3 className="font-sans font-bold text-[18px] text-white mb-2">Kiểm soát ra vào</h3>
            <p className="font-sans text-[14px] text-white/70 leading-relaxed">
              Phân quyền cửa và khu vực theo từng nhân sự, nhà thầu hoặc khách. Nhật ký ra vào tức thời.
            </p>
          </div>

          {/* Module 3: Trạm cân */}
          <div className="glass-panel rounded-2xl p-7 shadow-card hover:border-white/25 transition-all">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center mb-4 text-amber-400">
              <Scales size={24} weight="duotone" />
            </div>
            <h3 className="font-sans font-bold text-[18px] text-white mb-2">Trạm cân</h3>
            <p className="font-sans text-[14px] text-white/70 leading-relaxed">
              Kết nối trực tiếp đầu cân điện tử. Đối chiếu phiếu cân tự động, chống gian lận khối lượng.
            </p>
          </div>

          {/* Module 4: Quản lý tài sản */}
          <div className="glass-panel rounded-2xl p-7 shadow-card hover:border-white/25 transition-all">
            <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center mb-4 text-sky-400">
              <Cpu size={24} weight="duotone" />
            </div>
            <h3 className="font-sans font-bold text-[18px] text-white mb-2">Quản lý tài sản</h3>
            <p className="font-sans text-[14px] text-white/70 leading-relaxed">
              Gắn mã định danh cho từng thiết bị, theo dõi vị trí, lịch bảo trì và khấu hao.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
