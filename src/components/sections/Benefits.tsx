export default function Benefits() {
  return (
    <section className="bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="font-mono text-[12px] text-amber tracking-wide mb-8">
          ĐƯỢC TIN DÙNG BỞI CÁC DOANH NGHIỆP TẠI VIỆT NAM
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-display font-bold text-[20px] text-paper/50">
          <span>Thành Long JSC</span>
          <span>Phú Gia Logistics</span>
          <span>Đồng Tâm Group</span>
          <span>Kim Sơn Manufacturing</span>
        </div>
        <blockquote className="font-body text-[18px] md:text-[22px] leading-relaxed mt-12 max-w-2xl">
          &ldquo;nATime giúp chúng tôi tự động hóa hoàn toàn việc tổng hợp bảng công và kết nối máy chấm công đa chi nhánh một cách minh bạch, chính xác.&rdquo;
        </blockquote>
        <p className="font-mono text-[12px] text-paper/50 mt-4">
          — Giám đốc Nhân sự, Thành Long JSC
        </p>
      </div>
    </section>
  );
}
