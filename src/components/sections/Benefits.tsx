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

      {/* TESTIMONIAL */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-ink rounded-2xl p-10 md:p-14 text-white">
          <p className="font-sans text-[13px] font-600 text-indigo-300 mb-6">ĐƯỢC TIN DÙNG BỞI CÁC NHÀ MÁY TẠI VIỆT NAM</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-sans font-700 text-[18px] text-white/50 mb-10">
            <span>Hòa Phát Container</span>
            <span>Phú Gia Logistics</span>
            <span>Đồng Tâm Group</span>
            <span>Kim Sơn Manufacturing</span>
          </div>
          <blockquote className="font-sans text-[18px] md:text-[22px] leading-relaxed max-w-2xl font-500">
            &ldquo;Chỉ một màn hình, chúng tôi thấy toàn bộ nhân sự, camera và thiết bị đang hoạt động ra sao — không cần mở nhiều phần mềm khác nhau.&rdquo;
          </blockquote>
          <p className="font-sans text-[13px] text-white/50 mt-4">— Quản trị viên hệ thống, Hòa Phát Container</p>
        </div>
      </section>
    </>
  );
}
