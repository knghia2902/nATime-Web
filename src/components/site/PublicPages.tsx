import Link from 'next/link';
import type { ReactNode } from 'react';
import ContactForm from './ContactForm';
import MobilePreviewDownload from './MobilePreviewDownload';
import ProductPricing from './ProductPricing';
import PublicShell from './PublicShell';
import ReleaseDownload from './ReleaseDownload';

type Locale = 'vi' | 'en';

/* ================================================================
   SHARED LAYOUT HELPERS
   ================================================================ */
function Intro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="border-b hairline bg-white/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-[12px] text-teal tracking-wide mb-4">{eyebrow}</p>
        <h1 className="font-display font-extrabold text-[36px] md:text-[46px] leading-[1.1] text-ink max-w-2xl">{title}</h1>
        <p className="font-body text-[16px] text-ink/70 mt-5 max-w-xl leading-relaxed">{description}</p>
      </div>
    </section>
  );
}

/* ================================================================
   FEATURES PAGE
   ================================================================ */
export function FeaturesContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  const modules = [
    {
      num: '01',
      tag: vi ? '01 / CHẤM CÔNG & CA KÍP' : '01 / ATTENDANCE & SHIFTS',
      title: vi ? 'Tính công tự động, không đối soát tay.' : 'Auto payroll, no manual reconciliation.',
      points: vi
        ? [
            'Chấm công bằng vân tay, khuôn mặt hoặc thẻ từ, đồng bộ đa chi nhánh.',
            'Tự động tính giờ công, tăng ca, đi trễ, nghỉ phép theo quy chế riêng từng nhà máy.',
            'Xuất bảng công trực tiếp sang phần mềm lương, không cần nhập liệu lại.',
          ]
        : [
            'Fingerprint, face, or card attendance with multi-branch sync.',
            'Auto-calculate hours, overtime, late arrivals per factory rules.',
            'Export payroll directly to salary software.',
          ],
      panel: (
        <div className="bg-graphite p-6">
          <p className="font-mono text-[11px] text-paper/50 mb-4">{vi ? 'BẢNG CÔNG HÔM NAY · XƯỞNG 2' : 'TODAY\'S SHEET · WORKSHOP 2'}</p>
          <div className="space-y-2 font-mono text-[12px]">
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>NV-0482 · Trần Văn An</span><span className="text-teal">07:58 → —</span></div>
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>NV-0511 · Lê Thị Bình</span><span className="text-teal">07:52 → —</span></div>
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>NV-0398 · Phạm Quốc Cường</span><span className="text-amber">08:14 → Đi trễ</span></div>
            <div className="flex justify-between text-paper/70"><span>NV-0627 · Nguyễn Thị Dung</span><span className="text-teal">07:49 → —</span></div>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      tag: vi ? '02 / KIỂM SOÁT RA VÀO' : '02 / ACCESS CONTROL',
      title: vi ? 'Biết chính xác ai đang ở khu vực nào, lúc nào.' : 'Know exactly who is where, when.',
      points: vi
        ? [
            'Phân quyền cửa và khu vực theo từng nhân sự, nhà thầu hoặc khách.',
            'Cảnh báo tức thời khi có thẻ hết hạn hoặc truy cập trái phép.',
            'Nhật ký ra vào lưu trữ đầy đủ, tra cứu theo người, cửa hoặc thời gian.',
          ]
        : [
            'Per-person, contractor, or guest door/zone permissions.',
            'Instant alerts for expired cards or unauthorized access.',
            'Full access logs searchable by person, door, or time.',
          ],
      panel: (
        <div className="bg-graphite p-6">
          <p className="font-mono text-[11px] text-paper/50 mb-4">{vi ? 'NHẬT KÝ RA VÀO · CỔNG B' : 'ACCESS LOG · GATE B'}</p>
          <div className="space-y-2 font-mono text-[12px]">
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>07:58:47</span><span className="text-teal">{vi ? 'Nhà thầu #114 · vào' : 'Contractor #114 · in'}</span></div>
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>08:02:10</span><span className="text-teal">{vi ? 'NV-0482 · vào khu vực hạn chế' : 'NV-0482 · restricted zone'}</span></div>
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>08:05:33</span><span className="text-amber">{vi ? 'Thẻ khách #002 · từ chối — hết hạn' : 'Guest #002 · denied — expired'}</span></div>
            <div className="flex justify-between text-paper/70"><span>08:09:02</span><span className="text-teal">{vi ? 'Nhà thầu #114 · ra' : 'Contractor #114 · out'}</span></div>
          </div>
        </div>
      ),
    },
    {
      num: '03',
      tag: vi ? '03 / QUẢN LÝ THIẾT BỊ & MCC' : '03 / DEVICE MANAGEMENT',
      title: vi ? 'Kết nối máy chấm công trực tiếp, theo dõi trạng thái online.' : 'Directly connect attendance devices, monitor online status.',
      points: vi
        ? [
            'Khai báo máy chấm công (vân tay, FaceID, thẻ từ) theo từng chi nhánh.',
            'Tự động tải nhật ký sự kiện chấm công về cơ sở dữ liệu cục bộ.',
            'Giám sát kết nối mạng và cảnh báo mất kết nối thiết bị ngay tức thì.',
          ]
        : [
            'Register attendance devices per branch.',
            'Auto-pull attendance event logs to local database.',
            'Monitor connectivity and instant disconnect alerts.',
          ],
      panel: (
        <div className="bg-graphite p-6">
          <p className="font-mono text-[11px] text-paper/50 mb-4">{vi ? 'DANH SÁCH THIẾT BỊ · 4 MÁY' : 'DEVICE LIST · 4 UNITS'}</p>
          <div className="space-y-2 font-mono text-[12px]">
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>MCC Gate-01 (192.168.1.100)</span><span className="text-teal">Online · MCC</span></div>
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>MCC Workshop-02 (192.168.1.101)</span><span className="text-teal">Online · MCC</span></div>
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>FaceID Cổng A (192.168.1.105)</span><span className="text-amber">Chờ đồng bộ · FaceID</span></div>
            <div className="flex justify-between text-paper/70"><span>MCC Kho B (192.168.1.110)</span><span className="text-teal">Online · MCC</span></div>
          </div>
        </div>
      ),
    },
    {
      num: '04',
      tag: vi ? '04 / QUẢN LÝ THÔNG TIN & BẢN QUYỀN' : '04 / LICENSING & SYSTEM',
      title: vi ? 'Cài đặt Windows self-host, kích hoạt bản quyền nATime.' : 'Windows self-host install, activate nATime license.',
      points: vi
        ? [
            'Cài đặt trực tiếp trên máy chủ Windows của doanh nghiệp, làm chủ dữ liệu.',
            'Kích hoạt bản quyền qua Cổng khách hàng theo Hardware ID.',
            'Cập nhật bộ cài an toàn được ký số mã nguồn Authenticode.',
          ]
        : [
            'Install directly on company Windows server, full data control.',
            'Activate license via Customer Portal by Hardware ID.',
            'Safe updates digitally signed with Authenticode code signing.',
          ],
      panel: (
        <div className="bg-graphite p-6">
          <p className="font-mono text-[11px] text-paper/50 mb-4">{vi ? 'THÔNG TIN BẢN QUYỀN · NATIVE' : 'LICENSE INFO · NATIVE'}</p>
          <div className="space-y-2 font-mono text-[12px]">
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>Gói bản quyền</span><span className="text-amber">Professional</span></div>
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>Giới hạn nhân sự</span><span className="text-teal">1.000 nhân sự</span></div>
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>Thiết bị cho phép</span><span className="text-teal">10 MCC · 16 FaceID</span></div>
            <div className="flex justify-between text-paper/70"><span>Trạng thái</span><span className="text-teal">Đã kích hoạt</span></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PublicShell locale={locale}>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="font-mono text-[12px] text-teal tracking-wide mb-4">{vi ? 'TÍNH NĂNG' : 'FEATURES'}</p>
        <h1 className="font-display font-extrabold text-[36px] md:text-[46px] leading-[1.1] text-ink max-w-2xl">
          {vi ? 'Bốn nhóm nghiệp vụ, một nền tảng vận hành duy nhất.' : 'Four operational modules, one unified platform.'}
        </h1>
        <p className="font-body text-[16px] text-ink/70 mt-5 max-w-xl leading-relaxed">
          {vi
            ? 'nATime hợp nhất chấm công, phân ca kíp, kiểm soát ra vào và quản lý kết nối thiết bị — dữ liệu luôn chính xác và đồng bộ.'
            : 'nATime unifies attendance, shift scheduling, access control, and device management.'}
        </p>
      </section>

      {/* Modules */}
      {modules.map((mod, i) => {
        const reversed = i % 2 !== 0;
        return (
          <section key={mod.num} className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center border-t hairline">
            <div className={reversed ? 'md:order-2' : ''}>
              <span className="font-mono text-[11px] text-teal">{mod.tag}</span>
              <h2 className="font-display font-bold text-[26px] text-ink mt-3 mb-4">{mod.title}</h2>
              <ul className="font-body text-[14px] text-ink/70 space-y-3">
                {mod.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="text-amber font-semibold">→</span>{p}
                  </li>
                ))}
              </ul>
            </div>
            <div className={reversed ? 'md:order-1' : ''}>
              {mod.panel}
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center border-t hairline">
        <h2 className="font-display font-bold text-[28px] md:text-[34px] text-ink max-w-xl mx-auto mb-6">
          {vi ? 'Sẵn sàng dùng thử nATime cho doanh nghiệp của bạn?' : 'Ready to try nATime for your business?'}
        </h2>
        <Link href="/register?trial=standard" className="inline-block bg-ink text-paper font-body text-[14px] font-medium px-7 py-3.5 hover:bg-graphite transition-colors">
          {vi ? 'Dùng thử miễn phí 7 ngày' : 'Start 7-Day Free Trial'}
        </Link>
      </section>
    </PublicShell>
  );
}

/* ================================================================
   PRICING PAGE - Real ProductPricing Component Integration
   ================================================================ */
export function PricingContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  return (
    <PublicShell locale={locale}>
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14 text-center">
        <p className="font-mono text-[12px] text-teal tracking-wide mb-4">{vi ? 'BẢNG GIÁ & BẢN QUYỀN' : 'PRICING & LICENSING'}</p>
        <h1 className="font-display font-extrabold text-[36px] md:text-[46px] leading-[1.1] text-ink max-w-2xl mx-auto">
          {vi ? 'Chọn gói bản quyền theo quy mô sử dụng.' : 'Choose a license plan for your scale.'}
        </h1>
        <p className="font-body text-[16px] text-ink/70 mt-5 max-w-lg mx-auto leading-relaxed">
          {vi
            ? 'Thanh toán trực tiếp qua PayOS, kích hoạt bản quyền nhanh chóng qua Cổng khách hàng. Mỗi tài khoản đủ điều kiện nhận 1 lần Trial Standard miễn phí.'
            : 'Pay directly via PayOS, activate license quickly via Customer Portal.'}
        </p>
      </section>

      {/* Product Pricing Component with Real Supabase Catalog */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <ProductPricing locale={locale} />
      </section>
    </PublicShell>
  );
}

/* ================================================================
   CONTACT PAGE
   ================================================================ */
export function ContactContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  return (
    <PublicShell locale={locale}>
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="font-mono text-[12px] text-teal tracking-wide mb-4">{vi ? 'LIÊN HỆ' : 'CONTACT'}</p>
        <h1 className="font-display font-extrabold text-[36px] md:text-[46px] leading-[1.1] text-ink max-w-2xl">
          {vi ? 'Trao đổi với đội ngũ nATime.' : 'Talk to nATime team.'}
        </h1>
        <p className="font-body text-[16px] text-ink/70 mt-5 max-w-xl leading-relaxed">
          {vi
            ? 'Gửi yêu cầu gói Enterprise, hỗ trợ kỹ thuật hoặc câu hỏi trước khi mua. Đội ngũ nATime sẽ liên hệ trong vòng 1 ngày làm việc.'
            : 'Send Enterprise inquiry or technical question. We will contact you within 1 business day.'}
        </p>
      </section>

      {/* Form + Info */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-[1.1fr_0.9fr] gap-12">
        {/* Form */}
        <ContactForm locale={locale} />

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-graphite text-paper p-6">
            <p className="font-mono text-[11px] text-paper/50 mb-4">{vi ? 'VĂN PHÒNG & KÊNH HỖ TRỢ' : 'OFFICE & SUPPORT'}</p>
            <p className="font-body text-[14px] leading-relaxed mb-1">{vi ? 'Công ty Cổ phần Công nghệ nATime' : 'nATime Technology Corp'}</p>
            <p className="font-body text-[14px] leading-relaxed mb-4">{vi ? 'Bình Dương & TP. Hồ Chí Minh, Việt Nam' : 'Binh Duong & HCMC, Vietnam'}</p>
            <div className="border-t border-white/10 pt-4 space-y-2 font-mono text-[13px] text-paper/70">
              <div className="flex justify-between"><span>Hotline</span><span className="text-amber">1900 6868</span></div>
              <div className="flex justify-between"><span>Email</span><span className="text-amber">support@natime.vn</span></div>
              <div className="flex justify-between"><span>{vi ? 'Giờ hỗ trợ' : 'Support hours'}</span><span className="text-teal">24/7</span></div>
            </div>
          </div>

          <div className="diag-corner border hairline p-6">
            <p className="font-mono text-[11px] text-ink/40 mb-4">{vi ? 'XÁC MINH BỘ CÀI' : 'INSTALLER VERIFICATION'}</p>
            <p className="font-body text-[13px] text-ink/70 leading-relaxed">
              {vi
                ? 'Bộ cài nATime Windows x64 được ký số bằng chứng thư mã nguồn hợp lệ (Authenticode). Vui lòng kiểm tra mã SHA-256 công bố tại trang Tải xuống trước khi cài đặt.'
                : 'nATime Windows x64 installer is digitally signed with Authenticode. Please verify SHA-256 before installing.'}
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
      <Intro eyebrow="Windows x64" title={vi ? 'Tải bộ cài nATime đã xác minh' : 'Download verified nATime installer'} description={vi ? 'Bộ cài đi qua kiểm tra chữ ký số Authenticode và SHA-256 trước khi được công khai.' : 'The installer passes digital signature and SHA-256 verification.'} />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
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
        ['1. Download', 'Download the current Windows release and verify its SHA-256.'],
        ['2. Install', 'Run the installer with Administrator permissions and wait for service configuration.'],
        ['3. Open nATime', 'Open local address provided by installer and sign in to admin account.'],
        ['4. Activate', 'Open Settings, License, create a link code and approve it from customer portal.'],
        ['5. Verify', 'Reload license status and verify plan, expiry, Hardware ID and licensed modules.'],
      ];

  return (
    <PublicShell locale={locale}>
      <Intro eyebrow={vi ? 'TÀI LIỆU' : 'DOCUMENTATION'} title={vi ? 'Cài đặt và kích hoạt theo từng bước' : 'Install and activate step by step'} description={vi ? 'Quy trình dưới đây bám theo bộ cài Windows và hệ thống license đang hoạt động.' : 'This flow follows the current Windows installer and licensing system.'} />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="space-y-4">
          {steps.map(([title, text], index) => (
            <article key={title} className="grid grid-cols-[48px_1fr] gap-4 border hairline p-6">
              <span className="grid h-10 w-10 place-items-center bg-ink text-paper text-sm font-extrabold font-mono">{index + 1}</span>
              <div>
                <h2 className="text-lg font-bold text-ink">{title.replace(/^\d+\.\s*/, '')}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{text}</p>
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
      <Intro eyebrow={vi ? 'GIỚI THIỆU' : 'ABOUT'} title={vi ? 'Phần mềm tập trung vào vận hành thực tế' : 'Software focused on real operations'} description={vi ? 'nATime được phát triển cho nhu cầu chấm công và quản lý thiết bị của doanh nghiệp.' : 'nATime is built for business attendance and device management needs.'} />
      <section className="mx-auto grid max-w-4xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2">
        <article className="border hairline p-8">
          <h2 className="text-xl font-bold text-ink">{vi ? 'Nguyên tắc sản phẩm' : 'Product Principle'}</h2>
          <p className="mt-3 leading-relaxed text-ink/70">{vi ? 'Chỉ công bố tính năng đã được phê duyệt, kiểm thử và có cơ chế cấp phép rõ ràng.' : 'Only approved, tested capabilities with clear licensing are published.'}</p>
        </article>
        <article className="border hairline p-8">
          <h2 className="text-xl font-bold text-ink">{vi ? 'Mô hình triển khai' : 'Deployment Model'}</h2>
          <p className="mt-3 leading-relaxed text-ink/70">{vi ? 'Ứng dụng được cài trên Windows của khách hàng; tài khoản natime.vn dùng để mua và quản lý bản quyền.' : 'The application is installed on customer Windows machine; natime.vn account manages licenses.'}</p>
        </article>
      </section>
    </PublicShell>
  );
}

export function ChangelogContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  return (
    <PublicShell locale={locale}>
      <Intro eyebrow={vi ? 'NHẬT KÝ THAY ĐỔI' : 'CHANGELOG'} title={vi ? 'Các phiên bản đã phát hành' : 'Published releases'} description={vi ? 'Danh sách chỉ lấy từ những release Windows đã được xác minh và công khai.' : 'This list contains verified and published Windows releases.'} />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <ReleaseDownload locale={locale} changelog />
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
      <Intro eyebrow={vi ? 'CHÍNH SÁCH' : 'POLICY'} title={policyContent.title} description={policyContent.lead} />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="mb-8 text-xs font-semibold text-ink/50">
          {vi ? 'Cập nhật: 15/07/2026.' : 'Updated: 15 July 2026.'}
        </p>
        <div className="space-y-8">
          {policyContent.sections.map(([title, text]) => (
            <section key={title}>
              <h2 className="text-xl font-bold text-ink">{title}</h2>
              <p className="mt-2 leading-relaxed text-ink/70">{text}</p>
            </section>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
