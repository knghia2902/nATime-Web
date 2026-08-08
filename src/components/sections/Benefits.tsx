export default function Benefits() {
  return (
    <>
      {/* DEVICE STATUS PREVIEW */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-5">
          <div className="bg-white border border-line rounded-xl p-6 shadow-card">
            <p className="font-sans font-700 text-[16px] text-ink mb-1">Toàn bộ thiết bị, một màn hình</p>
            <p className="font-sans text-[13px] text-sub mb-5">Camera, đầu đọc vân tay, đầu cân — trạng thái kết nối theo thời gian thực.</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between py-2.5 border-b border-line">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald" />
                  <div>
                    <p className="font-sans text-[13px] text-ink">Cổng 1 — FaceID đi bộ ra 01</p>
                    <p className="font-sans text-[11px] text-sub">AccessControl</p>
                  </div>
                </div>
                <span className="font-sans text-[11px] font-600 text-emerald-text bg-emerald-soft px-2.5 py-1 rounded-full">Online</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-line">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald" />
                  <div>
                    <p className="font-sans text-[13px] text-ink">Cổng 1 — Camera biển số xe máy ra 02</p>
                    <p className="font-sans text-[11px] text-sub">Camera</p>
                  </div>
                </div>
                <span className="font-sans text-[11px] font-600 text-emerald-text bg-emerald-soft px-2.5 py-1 rounded-full">Online</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-rose" />
                  <div>
                    <p className="font-sans text-[13px] text-ink">Cổng 1 — Camera toàn cảnh xe máy ra 02</p>
                    <p className="font-sans text-[11px] text-sub">Camera</p>
                  </div>
                </div>
                <span className="font-sans text-[11px] font-600 text-rose-text bg-rose-soft px-2.5 py-1 rounded-full">Offline</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-line rounded-xl p-6 shadow-card flex flex-col items-center justify-center text-center">
            <div className="relative w-32 h-32 mb-4">
              <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(#10B981 0% 92%, #F59E0B 92% 100%)' }} />
              <div className="absolute inset-3 rounded-full bg-white" />
            </div>
            <p className="font-sans font-700 text-[22px] text-ink">92%</p>
            <p className="font-sans text-[13px] text-sub mt-1">tỷ lệ hiện diện hôm nay</p>
            <div className="flex gap-4 mt-4 font-sans text-[12px] text-sub">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald" />Đã check-in</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber" />Chưa check-in</span>
            </div>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT PROCESS (OPTION A) */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-ink rounded-2xl p-8 md:p-12 text-white">
          <p className="font-sans text-[13px] font-600 text-indigo-300 mb-8 uppercase tracking-wider">
            QUY TRÌNH TRIỂN KHAI NHÀ MÁY
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <span className="font-sans text-[12px] font-700 text-indigo-300 block mb-2">01 / LẮP ĐẶT</span>
              <h3 className="font-sans font-700 text-[16px] text-white mb-2">Cài đặt On-Premise</h3>
              <p className="font-sans text-[13px] text-white/70 leading-relaxed">
                Bộ cài Windows 1-click tự động thiết lập SQL Server và dịch vụ nATime cục bộ.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <span className="font-sans text-[12px] font-700 text-indigo-300 block mb-2">02 / KẾT NỐI</span>
              <h3 className="font-sans font-700 text-[16px] text-white mb-2">Kết nối Thiết bị</h3>
              <p className="font-sans text-[13px] text-white/70 leading-relaxed">
                Nhập IP máy chấm công, camera AI và đầu cân điện tử sẵn có tại nhà máy.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <span className="font-sans text-[12px] font-700 text-indigo-300 block mb-2">03 / VẬN HÀNH</span>
              <h3 className="font-sans font-700 text-[16px] text-white mb-2">Vận hành Tập trung</h3>
              <p className="font-sans text-[13px] text-white/70 leading-relaxed">
                Phân quyền nhân sự, tính công tự động và giám sát ra vào thời gian thực 24/7.
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6">
            <p className="font-sans text-[14px] text-white/80 font-500 text-center md:text-left">
              &ldquo;Triển khai trực tiếp trên hạ tầng sẵn có của nhà máy, không cần đầu tư thay mới thiết bị.&rdquo;
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
