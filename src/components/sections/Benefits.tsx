'use client';

export default function Benefits() {
  return (
    <>
      {/* ── 1. REAL-TIME DEVICE STATUS & PRESENCE RATE ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-6">
          {/* Left: Connected Devices List */}
          <div className="glass-panel rounded-2xl p-7 shadow-card">
            <p className="font-sans font-bold text-[18px] text-white mb-1">Toàn bộ thiết bị, một màn hình</p>
            <p className="font-sans text-[13px] text-white/65 mb-6">Camera, đầu đọc vân tay, đầu cân — trạng thái kết nối theo thời gian thực.</p>
            
            <div className="space-y-2">
              {/* Device 1 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <div>
                    <p className="font-sans text-[13.5px] font-medium text-white">Cổng 1 — FaceID đi bộ ra 01</p>
                    <p className="font-sans text-[11px] text-white/50">AccessControl</p>
                  </div>
                </div>
                <span className="font-sans text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  Online
                </span>
              </div>

              {/* Device 2 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <div>
                    <p className="font-sans text-[13.5px] font-medium text-white">Cổng 1 — Camera biển số xe máy ra 02</p>
                    <p className="font-sans text-[11px] text-white/50">Camera</p>
                  </div>
                </div>
                <span className="font-sans text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  Online
                </span>
              </div>

              {/* Device 3 */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
                  <div>
                    <p className="font-sans text-[13.5px] font-medium text-white">Cổng 1 — Camera toàn cảnh xe máy ra 02</p>
                    <p className="font-sans text-[11px] text-white/50">Camera</p>
                  </div>
                </div>
                <span className="font-sans text-[11px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
                  Offline
                </span>
              </div>
            </div>
          </div>

          {/* Right: Presence Rate Radial Graph */}
          <div className="glass-panel rounded-2xl p-7 shadow-card flex flex-col items-center justify-center text-center">
            <div className="relative w-36 h-36 mb-5">
              <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(#10B981 0% 92%, #F59E0B 92% 100%)' }} />
              <div className="absolute inset-3 rounded-full bg-[#101c2e] flex items-center justify-center flex-col">
                <p className="font-sans font-bold text-[28px] text-white leading-none">92%</p>
              </div>
            </div>
            <p className="font-sans font-semibold text-[15px] text-white">tỷ lệ hiện diện hôm nay</p>
            <div className="flex gap-5 mt-4 font-sans text-[12px] text-white/70">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />Đã check-in</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" />Chưa check-in</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FACTORY DEPLOYMENT PROCESS ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="glass-panel rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-white/12">
          <p className="font-sans text-[13px] font-semibold text-sky-400 mb-8 uppercase tracking-wider">
            QUY TRÌNH TRIỂN KHAI NHÀ MÁY
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* Step 1 */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-white/20 transition-all">
              <span className="font-sans text-[12px] font-bold text-sky-400 block mb-2">01 / LẮP ĐẶT</span>
              <h3 className="font-sans font-bold text-[17px] text-white mb-2">Cài đặt On-Premise</h3>
              <p className="font-sans text-[13.5px] text-white/65 leading-relaxed">
                Bộ cài Windows 1-click tự động thiết lập SQL Server và dịch vụ nATime cục bộ.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-white/20 transition-all">
              <span className="font-sans text-[12px] font-bold text-sky-400 block mb-2">02 / KẾT NỐI</span>
              <h3 className="font-sans font-bold text-[17px] text-white mb-2">Kết nối Thiết bị</h3>
              <p className="font-sans text-[13.5px] text-white/65 leading-relaxed">
                Nhập IP máy chấm công, camera AI và đầu cân điện tử sẵn có tại nhà máy.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-white/20 transition-all">
              <span className="font-sans text-[12px] font-bold text-sky-400 block mb-2">03 / VẬN HÀNH</span>
              <h3 className="font-sans font-bold text-[17px] text-white mb-2">Vận hành Tập trung</h3>
              <p className="font-sans text-[13.5px] text-white/65 leading-relaxed">
                Phân quyền nhân sự, tính công tự động và giám sát ra vào thời gian thực 24/7.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="font-sans text-[14px] text-white/80 font-medium text-center md:text-left">
              “Triển khai trực tiếp trên hạ tầng sẵn có của nhà máy, không cần đầu tư thay mới thiết bị.”
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
