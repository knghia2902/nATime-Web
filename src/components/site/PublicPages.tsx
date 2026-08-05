import Link from 'next/link';
import ContactForm from './ContactForm';
import MobilePreviewDownload from './MobilePreviewDownload';
import ProductPricing from './ProductPricing';
import PublicShell from './PublicShell';
import ReleaseDownload from './ReleaseDownload';

type Locale = 'vi' | 'en';

/* ================================================================
   FEATURES PAGE (Matching features.html)
   ================================================================ */
export function FeaturesContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  return (
    <PublicShell locale={locale}>
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="font-sans text-[13px] font-600 text-indigo mb-3">{vi ? 'TÍNH NĂNG' : 'FEATURES'}</p>
        <h1 className="font-sans font-800 text-[36px] md:text-[44px] leading-[1.1] text-ink max-w-2xl">
          {vi ? 'Bốn module, một nguồn dữ liệu vận hành duy nhất.' : 'Four modules, one unified operational data source.'}
        </h1>
        <p className="font-sans text-[16px] text-sub mt-5 max-w-xl leading-relaxed">
          {vi
            ? 'Mỗi module hoạt động độc lập theo nhu cầu của từng nhà máy, nhưng chia sẻ chung một lớp dữ liệu — để báo cáo, cảnh báo và đối soát luôn khớp nhau, ngay trên cùng một giao diện.'
            : 'Each module operates independently based on factory needs, but shares a single data layer for reporting and reconciliation.'}
        </p>
      </section>

      {/* MODULE 01 — CHẤM CÔNG */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center border-t border-line">
        <div>
          <div className="w-10 h-10 rounded-lg bg-indigo-soft flex items-center justify-center mb-4">
            <span className="w-4.5 h-4.5 rounded-sm bg-indigo" />
          </div>
          <span className="font-sans text-[13px] font-600 text-indigo">{vi ? '01 / CHẤM CÔNG' : '01 / ATTENDANCE'}</span>
          <h2 className="font-sans font-700 text-[26px] text-ink mt-2 mb-4">
            {vi ? 'Tính công tự động, không đối soát tay.' : 'Auto payroll calculation, no manual checks.'}
          </h2>
          <ul className="font-sans text-[14px] text-sub space-y-3">
            <li className="flex gap-3"><span className="text-indigo font-700">→</span>Chấm công bằng vân tay, khuôn mặt hoặc thẻ từ, đồng bộ đa chi nhánh.</li>
            <li className="flex gap-3"><span className="text-indigo font-700">→</span>Tự động tính giờ công, tăng ca, đi trễ, nghỉ phép theo quy chế riêng.</li>
            <li className="flex gap-3"><span className="text-indigo font-700">→</span>Xuất bảng công trực tiếp sang phần mềm lương, không cần nhập lại.</li>
          </ul>
        </div>
        <div className="bg-white border border-line rounded-2xl shadow-card overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 h-10 border-b border-line bg-page">
            <span className="w-2.5 h-2.5 rounded-full bg-rose/40" /><span className="w-2.5 h-2.5 rounded-full bg-amber/40" /><span className="w-2.5 h-2.5 rounded-full bg-emerald/40" />
            <span className="font-sans text-[11px] text-sub/60 ml-3">Bảng công · Xưởng 2</span>
          </div>
          <div className="divide-y divide-line">
            <div className="flex items-center justify-between px-4 py-3">
              <div><p className="font-sans text-[13px] text-ink">Trần Văn An</p><p className="font-sans text-[11px] text-sub">NV-0482</p></div>
              <span className="font-sans text-[12px] font-600 text-emerald bg-emerald-soft px-2.5 py-1 rounded-full">07:58</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div><p className="font-sans text-[13px] text-ink">Lê Thị Bình</p><p className="font-sans text-[11px] text-sub">NV-0511</p></div>
              <span className="font-sans text-[12px] font-600 text-emerald bg-emerald-soft px-2.5 py-1 rounded-full">07:52</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div><p className="font-sans text-[13px] text-ink">Phạm Quốc Cường</p><p className="font-sans text-[11px] text-sub">NV-0398</p></div>
              <span className="font-sans text-[12px] font-600 text-rose bg-rose-soft px-2.5 py-1 rounded-full">Đi muộn</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div><p className="font-sans text-[13px] text-ink">Nguyễn Thị Dung</p><p className="font-sans text-[11px] text-sub">NV-0627</p></div>
              <span className="font-sans text-[12px] font-600 text-emerald bg-emerald-soft px-2.5 py-1 rounded-full">07:49</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 02 — KIỂM SOÁT RA VÀO */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center border-t border-line">
        <div className="bg-white border border-line rounded-2xl shadow-card overflow-hidden md:order-1 order-2">
          <div className="flex items-center gap-1.5 px-4 h-10 border-b border-line bg-page">
            <span className="w-2.5 h-2.5 rounded-full bg-rose/40" /><span className="w-2.5 h-2.5 rounded-full bg-amber/40" /><span className="w-2.5 h-2.5 rounded-full bg-emerald/40" />
            <span className="font-sans text-[11px] text-sub/60 ml-3">Nhật ký ra vào · Cổng B</span>
          </div>
          <div className="divide-y divide-line">
            <div className="flex items-center justify-between px-4 py-3">
              <div><p className="font-sans text-[13px] text-ink">Nhà thầu #114</p><p className="font-sans text-[11px] text-sub">07:58:47 · vào</p></div>
              <span className="w-2 h-2 rounded-full bg-emerald" />
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div><p className="font-sans text-[13px] text-ink">NV-0482</p><p className="font-sans text-[11px] text-sub">08:02:10 · khu vực hạn chế</p></div>
              <span className="w-2 h-2 rounded-full bg-emerald" />
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div><p className="font-sans text-[13px] text-ink">Thẻ khách #002</p><p className="font-sans text-[11px] text-sub">08:05:33 · từ chối, hết hạn</p></div>
              <span className="w-2 h-2 rounded-full bg-rose" />
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-soft flex items-center justify-center mb-4">
            <span className="w-4.5 h-4.5 rounded-sm bg-emerald" />
          </div>
          <span className="font-sans text-[13px] font-600 text-emerald">{vi ? '02 / KIỂM SOÁT RA VÀO' : '02 / ACCESS CONTROL'}</span>
          <h2 className="font-sans font-700 text-[26px] text-ink mt-2 mb-4">
            {vi ? 'Biết chính xác ai đang ở khu vực nào, lúc nào.' : 'Know exactly who is in which area, when.'}
          </h2>
          <ul className="font-sans text-[14px] text-sub space-y-3">
            <li className="flex gap-3"><span className="text-emerald font-700">→</span>Phân quyền cửa và khu vực theo từng nhân sự, nhà thầu hoặc khách.</li>
            <li className="flex gap-3"><span className="text-emerald font-700">→</span>Cảnh báo tức thời khi có thẻ hết hạn hoặc truy cập trái phép.</li>
            <li className="flex gap-3"><span className="text-emerald font-700">→</span>Nhật ký ra vào lưu trữ đầy đủ, tra cứu theo người, cửa hoặc thời gian.</li>
          </ul>
        </div>
      </section>

      {/* MODULE 03 — TRẠM CÂN */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center border-t border-line">
        <div>
          <div className="w-10 h-10 rounded-lg bg-amber-soft flex items-center justify-center mb-4">
            <span className="w-4.5 h-4.5 rounded-sm bg-amber" />
          </div>
          <span className="font-sans text-[13px] font-600 text-amber">{vi ? '03 / TRẠM CÂN' : '03 / WEIGHBRIDGE'}</span>
          <h2 className="font-sans font-700 text-[26px] text-ink mt-2 mb-4">
            {vi ? 'Mỗi phiếu cân đều được đối chiếu tự động.' : 'Every weigh ticket is automatically cross-checked.'}
          </h2>
          <ul className="font-sans text-[14px] text-sub space-y-3">
            <li className="flex gap-3"><span className="text-amber font-700">→</span>Kết nối trực tiếp đầu cân điện tử, ghi nhận khối lượng thời gian thực.</li>
            <li className="flex gap-3"><span className="text-amber font-700">→</span>Tự động đối chiếu phiếu cân với đơn hàng và biển số xe.</li>
            <li className="flex gap-3"><span className="text-amber font-700">→</span>Phát hiện sai lệch khối lượng bất thường ngay tại cổng cân.</li>
          </ul>
        </div>
        <div className="bg-white border border-line rounded-2xl shadow-card overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 h-10 border-b border-line bg-page">
            <span className="w-2.5 h-2.5 rounded-full bg-rose/40" /><span className="w-2.5 h-2.5 rounded-full bg-amber/40" /><span className="w-2.5 h-2.5 rounded-full bg-emerald/40" />
            <span className="font-sans text-[11px] text-sub/60 ml-3">Phiếu cân #20260804-118</span>
          </div>
          <div className="p-5">
            <p className="font-sans font-800 text-[36px] text-ink leading-none">18.420<span className="text-[16px] text-sub font-500 ml-1">kg</span></p>
            <p className="font-sans text-[12px] text-sub mt-1.5 mb-4">Xe 51C-224.19 · Đơn hàng PO-4471</p>
            <div className="flex items-center justify-between border-t border-line pt-4">
              <span className="font-sans text-[13px] text-sub">Đối chiếu đơn hàng</span>
              <span className="font-sans text-[12px] font-600 text-emerald bg-emerald-soft px-2.5 py-1 rounded-full">Khớp</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODULE 04 — QUẢN LÝ TÀI SẢN */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center border-t border-line">
        <div className="bg-white border border-line rounded-2xl shadow-card overflow-hidden md:order-1 order-2">
          <div className="flex items-center gap-1.5 px-4 h-10 border-b border-line bg-page">
            <span className="w-2.5 h-2.5 rounded-full bg-rose/40" /><span className="w-2.5 h-2.5 rounded-full bg-amber/40" /><span className="w-2.5 h-2.5 rounded-full bg-emerald/40" />
            <span className="font-sans text-[11px] text-sub/60 ml-3">Tài sản · Xưởng 2</span>
          </div>
          <div className="divide-y divide-line">
            <div className="flex items-center justify-between px-4 py-3">
              <div><p className="font-sans text-[13px] text-ink">FL-07 · Xe nâng</p></div>
              <span className="font-sans text-[12px] font-600 text-amber bg-amber-soft px-2.5 py-1 rounded-full">Bảo trì 3 ngày</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div><p className="font-sans text-[13px] text-ink">CM-22 · Máy nén khí</p></div>
              <span className="font-sans text-[12px] font-600 text-emerald bg-emerald-soft px-2.5 py-1 rounded-full">Hoạt động</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div><p className="font-sans text-[13px] text-ink">GT-03 · Xe nâng tay</p></div>
              <span className="font-sans text-[12px] font-600 text-emerald bg-emerald-soft px-2.5 py-1 rounded-full">Hoạt động</span>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="w-10 h-10 rounded-lg bg-sky-soft flex items-center justify-center mb-4">
            <span className="w-4.5 h-4.5 rounded-sm bg-sky" />
          </div>
          <span className="font-sans text-[13px] font-600 text-sky">{vi ? '04 / QUẢN LÝ TÀI SẢN' : '04 / ASSET MANAGEMENT'}</span>
          <h2 className="font-sans font-700 text-[26px] text-ink mt-2 mb-4">
            {vi ? 'Theo dõi thiết bị từ khi mua đến khi thanh lý.' : 'Track equipment from purchase to disposal.'}
          </h2>
          <ul className="font-sans text-[14px] text-sub space-y-3">
            <li className="flex gap-3"><span className="text-sky font-700">→</span>Gắn mã định danh riêng cho từng thiết bị, dễ dàng tra cứu.</li>
            <li className="flex gap-3"><span className="text-sky font-700">→</span>Lịch bảo trì định kỳ, nhắc hạn tự động trước khi thiết bị hỏng.</li>
            <li className="flex gap-3"><span className="text-sky font-700">→</span>Theo dõi khấu hao và vị trí thiết bị theo thời gian thực.</li>
          </ul>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center border-t border-line">
        <h2 className="font-sans font-700 text-[28px] md:text-[34px] text-ink max-w-xl mx-auto mb-6">
          {vi ? 'Xem cả bốn module hoạt động trên dữ liệu thật của bạn.' : 'See all four modules running on your real data.'}
        </h2>
        <Link href="/contact" className="inline-block bg-indigo text-white font-sans text-[14px] font-600 px-7 py-3.5 rounded-lg hover:bg-indigo-700 transition-colors">
          {vi ? 'Yêu cầu demo' : 'Request Demo'}
        </Link>
      </section>
    </PublicShell>
  );
}

/* ================================================================
   PRICING PAGE (Matching pricing.html)
   ================================================================ */
export function PricingContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  return (
    <PublicShell locale={locale}>
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14 text-center">
        <p className="font-sans text-[13px] font-600 text-indigo mb-3">{vi ? 'BẢNG GIÁ' : 'PRICING'}</p>
        <h1 className="font-sans font-800 text-[36px] md:text-[44px] leading-[1.1] text-ink max-w-2xl mx-auto">
          {vi ? 'Chọn gói theo quy mô nhà máy của bạn.' : 'Choose a plan based on your factory scale.'}
        </h1>
        <p className="font-sans text-[16px] text-sub mt-5 max-w-lg mx-auto leading-relaxed">
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
   CONTACT PAGE (Matching contact.html)
   ================================================================ */
export function ContactContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  return (
    <PublicShell locale={locale}>
      {/* Header Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="font-sans text-[13px] font-600 text-indigo mb-3">{vi ? 'LIÊN HỆ' : 'CONTACT'}</p>
        <h1 className="font-sans font-800 text-[36px] md:text-[44px] leading-[1.1] text-ink max-w-2xl">
          {vi ? 'Nói chuyện với đội ngũ triển khai nATime.' : 'Talk to the nATime deployment team.'}
        </h1>
        <p className="font-sans text-[16px] text-sub mt-5 max-w-xl leading-relaxed">
          {vi
            ? 'Để lại thông tin, chúng tôi sẽ liên hệ trong vòng 1 ngày làm việc để sắp xếp buổi demo trên chính dữ liệu nhà máy của bạn.'
            : 'Leave your details, we will contact you within 1 business day for a live demo.'}
        </p>
      </section>

      {/* Main Grid: Form Left 1.1fr, Info Right 0.9fr */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-[1.1fr_0.9fr] gap-8">
        {/* Form */}
        <ContactForm locale={locale} />

        {/* Info Column */}
        <div className="space-y-6">
          {/* Office Card */}
          <div className="bg-ink rounded-2xl text-white p-6">
            <p className="font-sans text-[12px] font-600 text-white/50 uppercase tracking-wider mb-4">{vi ? 'VĂN PHÒNG' : 'OFFICE'}</p>
            <p className="font-sans text-[14px] leading-relaxed mb-1">{vi ? 'Khu công nghiệp Sóng Thần, Dĩ An' : 'Song Than Industrial Zone, Di An'}</p>
            <p className="font-sans text-[14px] leading-relaxed mb-4">{vi ? 'Bình Dương, Việt Nam' : 'Binh Duong, Vietnam'}</p>
            <div className="border-t border-white/10 pt-4 space-y-2.5 font-sans text-[13px] text-white/70">
              <div className="flex justify-between"><span>Hotline</span><span className="text-indigo-300 font-600">1900 6868</span></div>
              <div className="flex justify-between"><span>Email</span><span className="text-indigo-300 font-600">hotro@natime.vn</span></div>
              <div className="flex justify-between"><span>{vi ? 'Giờ hỗ trợ' : 'Support hours'}</span><span className="text-emerald-400 font-600">24/7</span></div>
            </div>
          </div>

          {/* Location Map Card */}
          <div className="bg-white border border-line rounded-2xl shadow-card p-6">
            <p className="font-sans text-[12px] font-600 text-sub/70 uppercase tracking-wider mb-4">{vi ? 'SƠ ĐỒ VỊ TRÍ' : 'LOCATION MAP'}</p>
            <div className="aspect-[4/3] rounded-xl bg-page relative overflow-hidden">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo ring-4 ring-indigo-soft" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-5 font-sans text-[11px] text-sub whitespace-nowrap">nATime HQ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels Section */}
      <section className="border-t border-line bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-6">
          <div>
            <p className="font-sans text-[12px] font-600 text-indigo mb-2">HOTLINE</p>
            <p className="font-sans text-[14px] text-sub leading-relaxed">
              {vi ? 'Gọi trực tiếp đội hỗ trợ kỹ thuật, phản hồi trong 5 phút cho các sự cố khẩn.' : 'Direct line to technical support, 5-minute response for urgent issues.'}
            </p>
          </div>
          <div>
            <p className="font-sans text-[12px] font-600 text-emerald mb-2">EMAIL</p>
            <p className="font-sans text-[14px] text-sub leading-relaxed">
              {vi ? 'Gửi yêu cầu chi tiết, đội triển khai phản hồi trong vòng 1 ngày làm việc.' : 'Send detailed requests, deployment team responds within 1 business day.'}
            </p>
          </div>
          <div>
            <p className="font-sans text-[12px] font-600 text-amber mb-2">{vi ? 'TẠI HIỆN TRƯỜNG' : 'ON-SITE'}</p>
            <p className="font-sans text-[14px] text-sub leading-relaxed">
              {vi ? 'Đội kỹ thuật khảo sát trực tiếp tại nhà máy trước khi triển khai chính thức.' : 'Technical team surveys your factory before official deployment.'}
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

/* ================================================================
   REMAINING PAGES
   ================================================================ */
export function DownloadContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  return (
    <PublicShell locale={locale}>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="font-sans text-[13px] font-600 text-indigo mb-3">TẢI XUỐNG</p>
        <h1 className="font-sans font-800 text-[36px] md:text-[44px] leading-[1.1] text-ink max-w-2xl">
          {vi ? 'Tải bộ cài nATime đã xác minh' : 'Download verified nATime installer'}
        </h1>
        <p className="font-sans text-[16px] text-sub mt-5 max-w-xl leading-relaxed">
          {vi ? 'Bộ cài đi qua kiểm tra chữ ký số Authenticode và SHA-256 trước khi được công khai.' : 'The installer passes digital signature and SHA-256 verification.'}
        </p>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <ReleaseDownload locale={locale} />
        <MobilePreviewDownload locale={locale} />
      </section>
    </PublicShell>
  );
}

export function DocsContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  const steps = vi
    ? [
        ['1. Tải bộ cài', 'Tải phiên bản Windows đang được phát hành tại trang Tải xuống và kiểm tra SHA-256.'],
        ['2. Cài đặt', 'Chạy bộ cài bằng quyền Administrator và chờ hoàn tất cấu hình dịch vụ nATime.'],
        ['3. Mở hệ thống', 'Truy cập địa chỉ cục bộ do bộ cài cung cấp và đăng nhập tài khoản quản trị.'],
        ['4. Kích hoạt', 'Mở Cài đặt, Bản quyền, tạo mã liên kết rồi phê duyệt bằng tài khoản tại Cổng khách hàng.'],
        ['5. Xác minh', 'Tải lại trạng thái bản quyền, kiểm tra gói, hạn dùng, Hardware ID và module được cấp phép.'],
      ]
    : [
        ['1. Download', 'Download current Windows release and verify its SHA-256.'],
        ['2. Install', 'Run installer with Administrator permissions.'],
        ['3. Open nATime', 'Open local address provided by installer.'],
        ['4. Activate', 'Open Settings, License, create link code and approve from portal.'],
        ['5. Verify', 'Reload license status and verify plan, expiry and modules.'],
      ];

  return (
    <PublicShell locale={locale}>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="font-sans text-[13px] font-600 text-indigo mb-3">TÀI LIỆU</p>
        <h1 className="font-sans font-800 text-[36px] md:text-[44px] leading-[1.1] text-ink max-w-2xl">
          {vi ? 'Cài đặt và kích hoạt theo từng bước' : 'Install and activate step by step'}
        </h1>
        <p className="font-sans text-[16px] text-sub mt-5 max-w-xl leading-relaxed">
          {vi ? 'Quy trình dưới đây bám theo bộ cài Windows và hệ thống license đang hoạt động.' : 'This flow follows the current Windows installer and licensing system.'}
        </p>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="space-y-4">
          {steps.map(([title, text], index) => (
            <article key={title} className="grid grid-cols-[48px_1fr] gap-4 bg-white border border-line rounded-xl p-6 shadow-card">
              <span className="grid h-10 w-10 place-items-center bg-indigo text-white text-sm font-extrabold font-sans rounded-lg">{index + 1}</span>
              <div>
                <h2 className="text-lg font-bold text-ink">{title.replace(/^\d+\.\s*/, '')}</h2>
                <p className="mt-2 text-sm leading-relaxed text-sub">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}

export function AboutContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  return (
    <PublicShell locale={locale}>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="font-sans text-[13px] font-600 text-indigo mb-3">GIỚI THIỆU</p>
        <h1 className="font-sans font-800 text-[36px] md:text-[44px] leading-[1.1] text-ink max-w-2xl">
          {vi ? 'Phần mềm tập trung vào vận hành thực tế' : 'Software focused on real operations'}
        </h1>
        <p className="font-sans text-[16px] text-sub mt-5 max-w-xl leading-relaxed">
          {vi ? 'nATime được phát triển cho nhu cầu chấm công và quản lý thiết bị của doanh nghiệp.' : 'nATime is built for business attendance and device management needs.'}
        </p>
      </section>
      <section className="mx-auto grid max-w-4xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
        <article className="bg-white border border-line rounded-xl p-8 shadow-card">
          <h2 className="text-xl font-bold text-ink">{vi ? 'Nguyên tắc sản phẩm' : 'Product Principle'}</h2>
          <p className="mt-3 leading-relaxed text-sub">{vi ? 'Chỉ công bố tính năng đã được phê duyệt, kiểm thử và có cơ chế cấp phép rõ ràng.' : 'Only approved, tested capabilities with clear licensing are published.'}</p>
        </article>
        <article className="bg-white border border-line rounded-xl p-8 shadow-card">
          <h2 className="text-xl font-bold text-ink">{vi ? 'Mô hình triển khai' : 'Deployment Model'}</h2>
          <p className="mt-3 leading-relaxed text-sub">{vi ? 'Ứng dụng được cài trên Windows của khách hàng; tài khoản natime.vn dùng để mua và quản lý bản quyền.' : 'The application is installed on customer Windows machine; natime.vn account manages licenses.'}</p>
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
        <p className="font-sans text-[13px] font-600 text-indigo mb-3">CHÍNH SÁCH</p>
        <h1 className="font-sans font-800 text-[36px] md:text-[44px] leading-[1.1] text-ink max-w-2xl">{policyContent.title}</h1>
        <p className="font-sans text-[16px] text-sub mt-5 max-w-xl leading-relaxed">{policyContent.lead}</p>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="mb-8 text-xs font-semibold text-sub">
          {vi ? 'Cập nhật: 15/07/2026.' : 'Updated: 15 July 2026.'}
        </p>
        <div className="space-y-8">
          {policyContent.sections.map(([title, text]) => (
            <section key={title}>
              <h2 className="text-xl font-bold text-ink">{title}</h2>
              <p className="mt-2 leading-relaxed text-sub">{text}</p>
            </section>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
