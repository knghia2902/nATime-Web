import Link from 'next/link';
import AttendanceTableShowcase from './AttendanceTableShowcase';
import ContactForm from './ContactForm';
import MobilePreviewDownload from './MobilePreviewDownload';
import ProductPricing from './ProductPricing';
import PublicShell from './PublicShell';
import ReleaseDownload from './ReleaseDownload';

type Locale = 'vi' | 'en';

/* ================================================================
   FEATURES PAGE
   ================================================================ */
export function FeaturesContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  return (
    <PublicShell locale={locale}>
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <span className="badge-pill mb-3">{vi ? 'TÍNH NĂNG NỀN TẢNG' : 'FEATURES'}</span>
        <h1 className="font-sans font-bold text-[38px] md:text-[46px] leading-[1.1] text-white max-w-2xl mt-2">
          {vi ? 'Bốn module, một nguồn dữ liệu vận hành duy nhất.' : 'Four modules, one unified operational data source.'}
        </h1>
        <p className="font-sans text-[16px] text-white/60 mt-5 max-w-xl leading-relaxed">
          {vi
            ? 'Mỗi module hoạt động độc lập theo nhu cầu của từng nhà máy, nhưng chia sẻ chung một lớp dữ liệu — để báo cáo, cảnh báo và đối soát luôn khớp nhau, ngay trên cùng một giao diện.'
            : 'Each module operates independently based on factory needs, but shares a single data layer for reporting and reconciliation.'}
        </p>
      </section>

      {/* MODULE 01 — CHẤM CÔNG */}
      <section className="max-w-6xl mx-auto px-6 py-14 border-t border-white/[0.08]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="font-mono text-[12px] font-bold text-sky-400 block mb-2">{vi ? '01 / CHẤM CÔNG' : '01 / ATTENDANCE'}</span>
            <h2 className="font-sans font-bold text-[28px] md:text-[32px] text-white">
              {vi ? 'Tính công tự động, không đối soát tay.' : 'Auto payroll calculation, no manual checks.'}
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 text-white/70 text-[13.5px]">
            <span className="flex items-center gap-1.5"><span className="text-sky-400 font-bold">✓</span> Chấm công đa chi nhánh</span>
            <span className="flex items-center gap-1.5"><span className="text-sky-400 font-bold">✓</span> Tự động tính ca & đi trễ</span>
            <span className="flex items-center gap-1.5"><span className="text-sky-400 font-bold">✓</span> Xuất Excel bảng công tức thì</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl shadow-card overflow-hidden border border-white/12">
          <div className="flex items-center gap-1.5 px-4 h-10 border-b border-white/[0.08] bg-white/[0.03]">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            <span className="font-sans text-[11px] text-white/40 ml-3">nATime · Lịch sử chấm công (app.natime.vn)</span>
          </div>
          <div className="relative w-full overflow-hidden">
            <AttendanceTableShowcase />
          </div>
        </div>
      </section>

      {/* MODULE 02 — KIỂM SOÁT RA VÀO */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center border-t border-white/[0.08]">
        <div className="glass-panel rounded-2xl shadow-card overflow-hidden md:order-1 order-2">
          <div className="flex items-center gap-1.5 px-4 h-10 border-b border-white/[0.08] bg-white/[0.03]">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            <span className="font-sans text-[11px] text-white/40 ml-3">Nhật ký ra vào · Cổng B (8 Làn)</span>
          </div>
          <div className="divide-y divide-white/[0.06]">
            <div className="flex items-center justify-between px-5 py-3.5">
              <div><p className="font-sans text-[13px] font-medium text-white">Nhà thầu #114 · Công ty Điện lực</p><p className="font-sans text-[11px] text-white/50">07:58:47 · Làn 01 (Xe ô tô)</p></div>
              <span className="badge-status badge-active">Hợp lệ</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3.5">
              <div><p className="font-sans text-[13px] font-medium text-white">NV-0482 · Trần Văn An</p><p className="font-sans text-[11px] text-white/50">08:02:10 · Làn 03 (Turnstile FaceID)</p></div>
              <span className="badge-status badge-active">Hợp lệ</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3.5">
              <div><p className="font-sans text-[13px] font-medium text-white">Thẻ khách #002 · Khách vãng lai</p><p className="font-sans text-[11px] text-white/50">08:05:33 · Làn 04 (Khu vực hạn chế)</p></div>
              <span className="badge-status badge-inactive">Từ chối</span>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="font-mono text-[12px] font-bold text-sky-400 block mb-2">{vi ? '02 / KIỂM SOÁT RA VÀO' : '02 / ACCESS CONTROL'}</span>
          <h2 className="font-sans font-bold text-[28px] text-white mb-4">
            {vi ? 'Biết chính xác ai đang ở khu vực nào, lúc nào.' : 'Know exactly who is in which area, when.'}
          </h2>
          <ul className="font-sans text-[14px] text-white/65 space-y-3">
            <li className="flex gap-3"><span className="text-sky-400 font-bold">✓</span>Phân quyền cửa và 8 làn theo từng nhân sự, nhà thầu hoặc khách.</li>
            <li className="flex gap-3"><span className="text-sky-400 font-bold">✓</span>Cảnh báo tức thời khi có thẻ hết hạn hoặc truy cập trái phép.</li>
            <li className="flex gap-3"><span className="text-sky-400 font-bold">✓</span>Nhật ký ra vào lưu trữ đầy đủ, tra cứu theo người, cửa hoặc thời gian.</li>
          </ul>
        </div>
      </section>

      {/* MODULE 03 — TRẠM CÂN */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center border-t border-white/[0.08]">
        <div>
          <span className="font-mono text-[12px] font-bold text-sky-400 block mb-2">{vi ? '03 / TRẠM CÂN' : '03 / WEIGHBRIDGE'}</span>
          <h2 className="font-sans font-bold text-[28px] text-white mb-4">
            {vi ? 'Mỗi phiếu cân đều được đối chiếu tự động.' : 'Every weigh ticket is automatically cross-checked.'}
          </h2>
          <ul className="font-sans text-[14px] text-white/65 space-y-3">
            <li className="flex gap-3"><span className="text-sky-400 font-bold">✓</span>Kết nối trực tiếp đầu cân điện tử, ghi nhận khối lượng thời gian thực.</li>
            <li className="flex gap-3"><span className="text-sky-400 font-bold">✓</span>Tự động đối chiếu phiếu cân với đơn hàng và biển số xe.</li>
            <li className="flex gap-3"><span className="text-sky-400 font-bold">✓</span>Phát hiện sai lệch khối lượng bất thường ngay tại cổng cân.</li>
          </ul>
        </div>
        <div className="glass-panel rounded-2xl shadow-card overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 h-10 border-b border-white/[0.08] bg-white/[0.03]">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            <span className="font-sans text-[11px] text-white/40 ml-3">Phiếu cân #20260804-118</span>
          </div>
          <div className="p-6">
            <p className="font-sans font-extrabold text-[40px] text-white leading-none">18.420<span className="text-[18px] text-white/50 font-medium ml-1">kg</span></p>
            <p className="font-sans text-[13px] text-white/60 mt-2 mb-5">Xe tải 51C-224.19 · Đơn hàng giao hàng PO-4471</p>
            <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
              <span className="font-sans text-[13px] text-white/60">Đối chiếu đơn hàng ERP</span>
              <span className="badge-status badge-active">Trùng khớp 100%</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 04 — QUẢN LÝ TÀI SẢN */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center border-t border-white/[0.08]">
        <div className="glass-panel rounded-2xl shadow-card overflow-hidden md:order-1 order-2">
          <div className="flex items-center gap-1.5 px-4 h-10 border-b border-white/[0.08] bg-white/[0.03]">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            <span className="font-sans text-[11px] text-white/40 ml-3">Tài sản · Xưởng 2</span>
          </div>
          <div className="divide-y divide-white/[0.06]">
            <div className="flex items-center justify-between px-5 py-3.5">
              <div><p className="font-sans text-[13px] font-medium text-white">FL-07 · Xe nâng điện Toyota</p></div>
              <span className="badge-status badge-pending">Bảo trì sau 3 ngày</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3.5">
              <div><p className="font-sans text-[13px] font-medium text-white">CM-22 · Máy nén khí trục vít</p></div>
              <span className="badge-status badge-active">Hoạt động tốt</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3.5">
              <div><p className="font-sans text-[13px] font-medium text-white">GT-03 · Xe nâng tay thủy lực</p></div>
              <span className="badge-status badge-active">Hoạt động tốt</span>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="font-mono text-[12px] font-bold text-sky-400 block mb-2">{vi ? '04 / QUẢN LÝ TÀI SẢN' : '04 / ASSET MANAGEMENT'}</span>
          <h2 className="font-sans font-bold text-[28px] text-white mb-4">
            {vi ? 'Theo dõi thiết bị từ khi mua đến khi thanh lý.' : 'Track equipment from purchase to disposal.'}
          </h2>
          <ul className="font-sans text-[14px] text-white/65 space-y-3">
            <li className="flex gap-3"><span className="text-sky-400 font-bold">✓</span>Gắn mã định danh riêng cho từng thiết bị, dễ dàng tra cứu.</li>
            <li className="flex gap-3"><span className="text-sky-400 font-bold">✓</span>Lịch bảo trì định kỳ, nhắc hạn tự động trước khi thiết bị hỏng.</li>
            <li className="flex gap-3"><span className="text-sky-400 font-bold">✓</span>Theo dõi khấu hao và vị trí thiết bị theo thời gian thực.</li>
          </ul>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center border-t border-white/[0.08]">
        <h2 className="font-sans font-bold text-[28px] md:text-[36px] text-white max-w-xl mx-auto mb-6">
          {vi ? 'Xem cả bốn module hoạt động trên dữ liệu thật của bạn.' : 'See all four modules running on your real data.'}
        </h2>
        <Link href="/contact" className="btn-pill-primary text-sm py-3.5 px-8 shadow-[0_4px_24px_rgba(255,255,255,0.25)]">
          {vi ? 'Yêu cầu demo' : 'Request Demo'}
        </Link>
      </section>
    </PublicShell>
  );
}

/* ================================================================
   PRICING PAGE
   ================================================================ */
export function PricingContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  return (
    <PublicShell locale={locale}>
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14 text-center">
        <span className="badge-pill mb-3">{vi ? 'BẢNG GIÁ DỊCH VỤ' : 'PRICING'}</span>
        <h1 className="font-sans font-bold text-[38px] md:text-[46px] leading-[1.1] text-white max-w-2xl mx-auto mt-2">
          {vi ? 'Chọn gói theo quy mô nhà máy của bạn.' : 'Choose a plan based on your factory scale.'}
        </h1>
        <p className="font-sans text-[16px] text-white/60 mt-5 max-w-lg mx-auto leading-relaxed">
          {vi
            ? 'Giá tính theo số đầu đọc và số nhân sự quản lý. Không phí ẩn, không ràng buộc hợp đồng dài hạn.'
            : 'Priced per reader and managed staff count. No hidden fees.'}
        </p>
      </section>

      {/* Product Pricing Component */}
      <ProductPricing locale={locale} />
    </PublicShell>
  );
}

/* ================================================================
   SUPPORT & CONTACT & DOCS PAGE
   ================================================================ */
export function SupportContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  const steps = vi
    ? [
        ['1. Tải bộ cài', 'Tải phiên bản Windows đang phát hành tại mục Tải xuống và kiểm tra mã SHA-256.'],
        ['2. Cài đặt On-Premise', 'Chạy bộ cài bằng quyền Administrator, bộ cài tự động thiết lập SQL Server và dịch vụ.'],
        ['3. Mở hệ thống', 'Truy cập địa chỉ máy chủ cục bộ (http://127.0.0.1:5080) và đăng nhập tài khoản quản trị.'],
        ['4. Kích hoạt License', 'Vào Cài đặt > Bản quyền, sinh mã Pairing Code và phê duyệt tại Cổng khách hàng.'],
        ['5. Kết nối thiết bị', 'Khai báo IP của Máy chấm công, FaceID, Đầu cân để bắt đầu vận hành tự động.'],
      ]
    : [
        ['1. Download Installer', 'Download current Windows release and verify its SHA-256 hash.'],
        ['2. Run Installer', 'Run installer with Administrator permissions, auto-configuring SQL Server.'],
        ['3. Access System', 'Open local address (http://127.0.0.1:5080) and log in to admin account.'],
        ['4. Activate License', 'Open Settings > License, generate Pairing Code and approve from portal.'],
        ['5. Connect Devices', 'Add IP of terminals, FaceID, or weighbridge to start operation.'],
      ];

  return (
    <PublicShell locale={locale}>
      {/* Header Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <span className="badge-pill mb-3">{vi ? 'TRUNG TÂM HỖ TRỢ & TÀI LIỆU' : 'SUPPORT & DOCS'}</span>
        <h1 className="font-sans font-bold text-[38px] md:text-[46px] leading-[1.1] text-white max-w-3xl mt-2">
          {vi ? 'Hỗ trợ kỹ thuật & Hướng dẫn vận hành.' : 'Technical Support & Operations Guidance.'}
        </h1>
        <p className="font-sans text-[16px] text-white/65 mt-5 max-w-2xl leading-relaxed">
          {vi
            ? 'Đồng hành 24/7 cùng đội ngũ kỹ thuật nhà máy từ khâu cài đặt, tích hợp thiết bị IoT đến xử lý sự cố vận hành.'
            : '24/7 dedicated support for factory IT teams from installation to IoT hardware integration.'}
        </p>
      </section>

      {/* ── 1. THREE SUPPORT CHANNELS ── */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-3xl p-7 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 font-bold mb-4">
                📞
              </div>
              <p className="font-mono text-[12px] font-bold text-white mb-1 uppercase tracking-wider">HOTLINE 24/7</p>
              <p className="font-sans font-extrabold text-[22px] text-sky-400 mb-2">0583392700</p>
              <p className="font-sans text-[13.5px] text-white/60 leading-relaxed">
                {vi ? 'Đường dây nóng hỗ trợ khẩn cấp, phản hồi kỹ sư trong vòng 5 phút cho các sự cố gián đoạn ca.' : 'Emergency hotline, 5-minute response for shift interruptions.'}
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-7 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 font-bold mb-4">
                ✉️
              </div>
              <p className="font-mono text-[12px] font-bold text-emerald-400 mb-1 uppercase tracking-wider">EMAIL KỸ THUẬT</p>
              <p className="font-sans font-extrabold text-[20px] text-white mb-2">support@natime.vn</p>
              <p className="font-sans text-[13.5px] text-white/60 leading-relaxed">
                {vi ? 'Tiếp nhận yêu cầu cấu hình, xuất báo cáo tùy biến hoặc nâng cấp phiên bản trong 1 ngày làm việc.' : 'Configuration and custom reports requests answered within 1 business day.'}
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-7 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400 font-bold mb-4">
                🏭
              </div>
              <p className="font-mono text-[12px] font-bold text-amber-400 mb-1 uppercase tracking-wider">{vi ? 'KHẢO SÁT HIỆN TRƯỜNG' : 'ON-SITE SURVEY'}</p>
              <p className="font-sans font-extrabold text-[20px] text-white mb-2">{vi ? 'Triển khai tận nơi' : 'On-site Survey'}</p>
              <p className="font-sans text-[13.5px] text-white/60 leading-relaxed">
                {vi ? 'Kỹ sư nATime trực tiếp khảo sát vị trí lắp đặt đầu đọc, trạm cân và hệ thống mạng nhà máy.' : 'Engineers survey reader locations, weighbridge, and network infrastructure.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STEP-BY-STEP INSTALLATION & ACTIVATION DOCS ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20 border-t border-white/[0.08] pt-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-mono text-[12px] font-semibold text-sky-400 uppercase tracking-wider block mb-2">
              {vi ? 'TÀI LIỆU KỸ THUẬT' : 'TECHNICAL DOCUMENTATION'}
            </span>
            <h2 className="font-sans font-bold text-[26px] md:text-[30px] text-white">
              {vi ? '5 bước cài đặt & kích hoạt On-Premise' : '5 Steps for On-Premise Setup & Activation'}
            </h2>
          </div>
          <Link
            href="/download"
            className="btn-pill-glass text-xs font-semibold py-2 px-5 w-fit"
          >
            {vi ? 'Tải bộ cài Windows mới nhất →' : 'Download Latest Installer →'}
          </Link>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {steps.map(([title, text], index) => (
            <div key={title} className="glass-panel rounded-2xl p-5 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
              <div>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white text-[#0a1628] font-mono text-sm font-extrabold mb-3">
                  {index + 1}
                </span>
                <h3 className="font-sans font-bold text-[15px] text-white mb-2">{title.replace(/^\d+\.\s*/, '')}</h3>
                <p className="font-sans text-[12.5px] text-white/60 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. CONTACT FORM & LOCATION MAP ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24 border-t border-white/[0.08] pt-14">
        <div className="mb-8">
          <span className="font-mono text-[12px] font-semibold text-sky-400 uppercase tracking-wider block mb-2">
            {vi ? 'GỬI YÊU CẦU' : 'SUBMIT INQUIRY'}
          </span>
          <h2 className="font-sans font-bold text-[26px] md:text-[30px] text-white">
            {vi ? 'Gửi yêu cầu hỗ trợ hoặc đăng ký tư vấn' : 'Submit Support Request or Consultation'}
          </h2>
        </div>

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8">
          {/* Support Form */}
          <ContactForm locale={locale} />

          {/* Location & Map Column */}
          <div className="space-y-6">
            {/* Office Info Card */}
            <div className="glass-panel rounded-3xl text-white p-7">
              <span className="font-mono text-[12px] font-semibold text-white/50 uppercase tracking-wider block mb-4">{vi ? 'VĂN PHÒNG ĐIỀU HÀNH' : 'HEADQUARTERS'}</span>
              <p className="font-sans text-[15px] leading-relaxed mb-1 font-medium">{vi ? 'Ông Trịnh, Tân Phước, Thị xã Phú Mỹ' : 'Ong Trinh, Tan Phuoc, Phu My'}</p>
              <p className="font-sans text-[15px] leading-relaxed mb-4 text-white/80">{vi ? 'Bà Rịa - Vũng Tàu / TP. Hồ Chí Minh, Việt Nam' : 'Ba Ria - Vung Tau / Ho Chi Minh City, Vietnam'}</p>
              <div className="border-t border-white/[0.08] pt-4 space-y-2.5 font-sans text-[13px] text-white/70">
                <div className="flex justify-between"><span>Hotline</span><span className="text-white font-semibold">0583392700</span></div>
                <div className="flex justify-between"><span>Email</span><span className="text-white font-semibold">support@natime.vn</span></div>
                <div className="flex justify-between"><span>{vi ? 'Giờ hỗ trợ' : 'Support hours'}</span><span className="text-emerald-400 font-semibold">24/7</span></div>
              </div>
            </div>

            {/* Location Map Card with Interactive Google Maps */}
            <div className="glass-panel rounded-3xl p-7 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[12px] font-semibold text-white/50 uppercase tracking-wider">
                  {vi ? 'SƠ ĐỒ VỊ TRÍ' : 'LOCATION MAP'}
                </span>
                <a
                  href="https://maps.google.com/?q=%C3%94ng+Tr%E1%BB%8Bnh,+T%C3%A2n+Ph%C6%B0%E1%BB%9Bc,+Ph%C3%BA+M%E1%BB%B9,+B%C3%A0+R%E1%BB%8Ba+-+V%C5%A9ng+T%C3%A0u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-semibold text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1"
                >
                  <span>{vi ? 'Mở Google Maps' : 'Open in Maps'}</span>
                  <span>↗</span>
                </a>
              </div>
              <div className="aspect-[4/3] rounded-2xl bg-[#0a1525] border border-white/10 relative overflow-hidden">
                <iframe
                  title="nATime Office Map"
                  src="https://maps.google.com/maps?q=%C3%94ng%20Tr%E1%BB%8Bnh,%20T%C3%A2n%20Ph%C6%B0%E1%BB%9Bc,%20Ph%C3%BA%20M%E1%BB%B9,%20B%C3%A0%20R%E1%BB%8Ba%20-%20V%C5%A9ng%20T%C3%A0u&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 opacity-90 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

export function DownloadContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  return (
    <PublicShell locale={locale}>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <span className="badge-pill mb-3">{vi ? 'TẢI XUỐNG CHÍNH THỨC' : 'OFFICIAL DOWNLOAD'}</span>
        <h1 className="font-sans font-bold text-[38px] md:text-[46px] leading-[1.1] text-white max-w-2xl mt-2">
          {vi ? 'Tải bộ cài nATime đã xác minh' : 'Download verified nATime installer'}
        </h1>
        <p className="font-sans text-[16px] text-white/60 mt-5 max-w-xl leading-relaxed">
          {vi ? 'Bộ cài đi qua kiểm tra chữ ký số Authenticode và SHA-256 trước khi được công khai.' : 'The installer passes digital signature and SHA-256 verification.'}
        </p>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-8">
        <ReleaseDownload locale={locale} />
        <MobilePreviewDownload locale={locale} />
      </section>
    </PublicShell>
  );
}

export function ContactContent({ locale }: { locale: Locale }) {
  return <SupportContent locale={locale} />;
}

export function DocsContent({ locale }: { locale: Locale }) {
  return <SupportContent locale={locale} />;
}

export function AboutContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  return (
    <PublicShell locale={locale}>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <span className="badge-pill mb-3">VỀ CHÚNG TÔI</span>
        <h1 className="font-sans font-bold text-[38px] md:text-[46px] leading-[1.1] text-white max-w-2xl mt-2">
          {vi ? 'Phần mềm tập trung vào vận hành thực tế' : 'Software focused on real operations'}
        </h1>
        <p className="font-sans text-[16px] text-white/60 mt-5 max-w-xl leading-relaxed">
          {vi ? 'nATime được phát triển cho nhu cầu chấm công và quản lý thiết bị của doanh nghiệp.' : 'nATime is built for business attendance and device management needs.'}
        </p>
      </section>
      <section className="mx-auto grid max-w-4xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
        <article className="glass-panel rounded-3xl p-8 shadow-card">
          <h2 className="text-xl font-bold text-white">{vi ? 'Nguyên tắc sản phẩm' : 'Product Principle'}</h2>
          <p className="mt-3 leading-relaxed text-white/60">{vi ? 'Chỉ công bố tính năng đã được phê duyệt, kiểm thử và có cơ chế cấp phép rõ ràng.' : 'Only approved, tested capabilities with clear licensing are published.'}</p>
        </article>
        <article className="glass-panel rounded-3xl p-8 shadow-card">
          <h2 className="text-xl font-bold text-white">{vi ? 'Mô hình triển khai' : 'Deployment Model'}</h2>
          <p className="mt-3 leading-relaxed text-white/60">{vi ? 'Ứng dụng được cài trên Windows của khách hàng; tài khoản natime.vn dùng để mua và quản lý bản quyền.' : 'The application is installed on customer Windows machine; natime.vn account manages licenses.'}</p>
        </article>
      </section>
    </PublicShell>
  );
}

export type PolicyKind = 'privacy' | 'terms' | 'payment' | 'refund';
export function PolicyContent({ locale, kind }: { locale: Locale; kind: PolicyKind }) {
  const vi = locale === 'vi';
  const policyContent = {
    privacy: {
      title: vi ? 'Chính sách quyền riêng tư' : 'Privacy policy',
      lead: vi ? 'Cách nATime xử lý dữ liệu tài khoản và bản quyền.' : 'How nATime handles account and licensing data.',
      sections: vi
        ? [
            ['Dữ liệu thu thập', 'Thông tin tài khoản, đơn vị, đơn hàng, trạng thái license, Hardware ID dạng băm và dữ liệu kỹ thuật cần thiết để vận hành dịch vụ.'],
            ['Mục đích sử dụng', 'Xác thực, thanh toán, cấp phép, hỗ trợ và bảo vệ hệ thống.'],
            ['Liên hệ', 'Yêu cầu về dữ liệu cá nhân được gửi tới support@natime.vn.'],
          ]
        : [
            ['Data collected', 'Account, company, order, license status, hashed Hardware ID and technical data required to operate the service.'],
            ['Use', 'Authentication, payment, licensing, support and system protection.'],
            ['Contact', 'Privacy requests can be sent to support@natime.vn.'],
          ],
    },
    terms: {
      title: vi ? 'Điều khoản sử dụng' : 'Terms of use',
      lead: vi ? 'Điều kiện sử dụng website, tài khoản và license nATime.' : 'Conditions for using nATime website, account and licenses.',
      sections: vi
        ? [
            ['Tài khoản', 'Người dùng chịu trách nhiệm bảo vệ thông tin đăng nhập và cung cấp thông tin chính xác.'],
            ['License', 'Quyền sử dụng phụ thuộc gói, thời hạn, module và số thiết bị được cấp.'],
            ['Giới hạn', 'Các nội dung chưa được xác nhận bằng hợp đồng hoặc báo giá không tạo thành cam kết dịch vụ riêng.'],
          ]
        : [
            ['Account', 'Users are responsible for protecting credentials.'],
            ['License', 'Usage rights depend on purchased plan.'],
            ['Limitations', 'Content not confirmed in contract does not create separate service commitment.'],
          ],
    },
    payment: {
      title: vi ? 'Chính sách thanh toán và giao nhận số' : 'Payment and digital delivery policy',
      lead: vi ? 'Quy trình thanh toán PayOS và cấp quyền sử dụng phần mềm.' : 'PayOS payment and digital software delivery flow.',
      sections: vi
        ? [
            ['Thanh toán', 'Standard và Professional được thanh toán qua liên kết PayOS.'],
            ['Giao nhận', 'Sau khi xác nhận, entitlement được cập nhật trong Cổng khách hàng.'],
            ['Hóa đơn', 'Website ghi nhận yêu cầu hóa đơn nhưng không cam kết tự động phát hành hóa đơn GTGT.'],
          ]
        : [
            ['Payment', 'Standard and Professional are paid through PayOS payment link.'],
            ['Delivery', 'After confirmation, entitlement is updated in customer portal.'],
            ['Invoice', 'Website records invoice requests.'],
          ],
    },
    refund: {
      title: vi ? 'Chính sách hoàn tiền' : 'Refund policy',
      lead: vi ? 'Cách tiếp nhận và đánh giá yêu cầu hoàn tiền.' : 'How refund requests are received and assessed.',
      sections: vi
        ? [
            ['Gửi yêu cầu', 'Khách hàng gửi mã đơn hàng và lý do tới support@natime.vn.'],
            ['Xử lý', 'Yêu cầu được xem xét theo trạng thái kích hoạt, thời gian sử dụng và thỏa thuận.'],
            ['Kết quả', 'nATime thông báo kết quả và phương thức xử lý qua email đã đăng ký.'],
          ]
        : [
            ['Request', 'Send order reference and reason to support@natime.vn.'],
            ['Assessment', 'Requests are assessed based on activation status and usage.'],
            ['Outcome', 'nATime communicates outcome to registered email.'],
          ],
    },
  }[kind];

  return (
    <PublicShell locale={locale}>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <span className="badge-pill mb-3">CHÍNH SÁCH PHÁP LÝ</span>
        <h1 className="font-sans font-bold text-[38px] md:text-[46px] leading-[1.1] text-white max-w-2xl mt-2">{policyContent.title}</h1>
        <p className="font-sans text-[16px] text-white/60 mt-5 max-w-xl leading-relaxed">{policyContent.lead}</p>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="mb-8 text-xs font-semibold text-white/40">
          {vi ? 'Cập nhật: 15/07/2026.' : 'Updated: 15 July 2026.'}
        </p>
        <div className="space-y-6">
          {policyContent.sections.map(([title, text]) => (
            <section key={title} className="glass-panel rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white">{title}</h2>
              <p className="mt-2 leading-relaxed text-white/65 text-sm">{text}</p>
            </section>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
