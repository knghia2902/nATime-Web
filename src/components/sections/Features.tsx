export default function Features() {
  return (
    <>
      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-white border border-line rounded-xl p-5 shadow-card">
          <div className="w-9 h-9 rounded-lg bg-indigo-soft flex items-center justify-center mb-3">
            <span className="w-4 h-4 rounded-sm bg-indigo" />
          </div>
          <p className="font-sans font-700 text-[24px] text-ink leading-none">120+</p>
          <p className="font-sans text-[13px] text-sub mt-1.5">nhà máy đang vận hành</p>
        </div>
        <div className="bg-white border border-line rounded-xl p-5 shadow-card">
          <div className="w-9 h-9 rounded-lg bg-emerald-soft flex items-center justify-center mb-3">
            <span className="w-4 h-4 rounded-sm bg-emerald" />
          </div>
          <p className="font-sans font-700 text-[24px] text-ink leading-none">99.9%</p>
          <p className="font-sans text-[13px] text-sub mt-1.5">thời gian hoạt động</p>
        </div>
        <div className="bg-white border border-line rounded-xl p-5 shadow-card">
          <div className="w-9 h-9 rounded-lg bg-amber-soft flex items-center justify-center mb-3">
            <span className="w-4 h-4 rounded-sm bg-amber" />
          </div>
          <p className="font-sans font-700 text-[24px] text-ink leading-none">&lt;200ms</p>
          <p className="font-sans text-[13px] text-sub mt-1.5">độ trễ ghi nhận sự kiện</p>
        </div>
        <div className="bg-white border border-line rounded-xl p-5 shadow-card">
          <div className="w-9 h-9 rounded-lg bg-sky-soft flex items-center justify-center mb-3">
            <span className="w-4 h-4 rounded-sm bg-sky" />
          </div>
          <p className="font-sans font-700 text-[24px] text-ink leading-none">24/7</p>
          <p className="font-sans text-[13px] text-sub mt-1.5">giám sát & hỗ trợ</p>
        </div>
      </section>

      {/* MODULES */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <p className="font-sans text-[13px] font-600 text-indigo-text mb-2">BỐN MODULE</p>
        <h2 className="font-sans font-700 text-[28px] md:text-[32px] text-ink max-w-lg mb-10">Từng module vận hành độc lập, dữ liệu luôn đồng bộ.</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white border border-line rounded-xl p-6 shadow-card">
            <div className="w-10 h-10 rounded-lg bg-indigo-soft flex items-center justify-center mb-4">
              <span className="w-4.5 h-4.5 rounded-sm bg-indigo" />
            </div>
            <h3 className="font-sans font-700 text-[17px] text-ink mb-2">Chấm công</h3>
            <p className="font-sans text-[14px] text-sub leading-relaxed">Ghi nhận giờ vào/ra bằng vân tay, khuôn mặt hoặc thẻ từ. Tự động tính công, tăng ca và nghỉ phép.</p>
          </div>
          <div className="bg-white border border-line rounded-xl p-6 shadow-card">
            <div className="w-10 h-10 rounded-lg bg-emerald-soft flex items-center justify-center mb-4">
              <span className="w-4.5 h-4.5 rounded-sm bg-emerald" />
            </div>
            <h3 className="font-sans font-700 text-[17px] text-ink mb-2">Kiểm soát ra vào</h3>
            <p className="font-sans text-[14px] text-sub leading-relaxed">Phân quyền cửa và khu vực theo từng nhân sự, nhà thầu hoặc khách. Nhật ký ra vào tức thời.</p>
          </div>
          <div className="bg-white border border-line rounded-xl p-6 shadow-card">
            <div className="w-10 h-10 rounded-lg bg-amber-soft flex items-center justify-center mb-4">
              <span className="w-4.5 h-4.5 rounded-sm bg-amber" />
            </div>
            <h3 className="font-sans font-700 text-[17px] text-ink mb-2">Trạm cân</h3>
            <p className="font-sans text-[14px] text-sub leading-relaxed">Kết nối trực tiếp đầu cân điện tử. Đối chiếu phiếu cân tự động, chống gian lận khối lượng.</p>
          </div>
          <div className="bg-white border border-line rounded-xl p-6 shadow-card">
            <div className="w-10 h-10 rounded-lg bg-sky-soft flex items-center justify-center mb-4">
              <span className="w-4.5 h-4.5 rounded-sm bg-sky" />
            </div>
            <h3 className="font-sans font-700 text-[17px] text-ink mb-2">Quản lý tài sản</h3>
            <p className="font-sans text-[14px] text-sub leading-relaxed">Gắn mã định danh cho từng thiết bị, theo dõi vị trí, lịch bảo trì và khấu hao.</p>
          </div>
        </div>
      </section>
    </>
  );
}
