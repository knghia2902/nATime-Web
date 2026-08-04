import Link from 'next/link';
import type { ReactNode } from 'react';
import { CheckCircle, DownloadSimple, ShieldCheck, ArrowRight, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr';
import ContactForm from './ContactForm';
import MobilePreviewDownload from './MobilePreviewDownload';
import ProductPricing from './ProductPricing';
import ProductPreview from './ProductPreview';
import PublicShell from './PublicShell';
import ReleaseDownload from './ReleaseDownload';

type Locale = 'vi' | 'en';

function Intro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="border-b border-border/80 bg-card/60 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      </div>
    </section>
  );
}

function VisualPageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-border/80 bg-gradient-to-br from-card via-background to-primary-light/30 py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-tight">{title}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        </div>
        <div className="lg:col-span-6">{children}</div>
      </div>
    </section>
  );
}

export function FeaturesContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  const items = [
    { title: vi ? 'Chấm công & Ca kíp' : 'Attendance & Shifts', description: vi ? 'Quản lý dữ liệu chấm công, ca làm việc và kết quả tổng hợp theo nghiệp vụ được cấp phép.' : 'Manage attendance data, work shifts and calculated results within licensed capabilities.', kind: 'attendance' as const, points: vi ? ['Lọc theo ngày và đơn vị', 'Theo dõi giờ vào, giờ ra', 'Kết quả theo ca làm việc'] : ['Filter by date and unit', 'Review check-in and check-out', 'Shift-based results'] },
    { title: vi ? 'Thiết bị & Kết nối' : 'Devices & Connectivity', description: vi ? 'Khai báo máy chấm công, theo dõi kết nối và thực hiện các thao tác đồng bộ được hệ thống hỗ trợ.' : 'Register attendance devices, monitor connectivity and use supported synchronization operations.', kind: 'devices' as const, points: vi ? ['Trạng thái kết nối', 'Tác vụ đồng bộ hỗ trợ', 'Thiết bị theo phạm vi license'] : ['Connectivity status', 'Supported synchronization', 'Licensed device allowance'] },
    { title: vi ? 'Kiểm soát ra vào' : 'Access Control', description: vi ? 'Module Access dành cho gói Professional và chỉ xuất hiện khi license cho phép.' : 'The Access module is available with Professional and only appears when licensed.', kind: 'overview' as const, points: vi ? ['Theo quyền được cấp', 'Ẩn module ngoài gói', 'Backend tiếp tục bảo vệ dữ liệu'] : ['Entitlement-aware access', 'Unlicensed modules hidden', 'Backend enforcement remains active'] },
  ];

  return (
    <PublicShell locale={locale}>
      <VisualPageHero eyebrow={vi ? 'Tính năng' : 'Features'} title={vi ? 'Nghiệp vụ thật, hiển thị đúng theo license' : 'Real operations, shown according to license'} description={vi ? 'nATime chỉ giới thiệu những module đang có trong danh mục license hiện hành.' : 'nATime advertises modules available in current licensing catalog.'}>
        <ProductPreview kind="overview" compact />
      </VisualPageHero>
      <section className="mx-auto max-w-7xl space-y-16 px-4 py-20 sm:px-6">
        {items.map((item, index) => (
          <article key={item.title} className="grid items-center gap-10 lg:grid-cols-2">
            <div className={index % 2 ? 'lg:order-2' : ''}>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">0{index + 1}</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{item.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
              <ul className="mt-6 space-y-2.5">
                {item.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-sm font-semibold text-foreground/90">
                    <CheckCircle size={18} className="text-emerald-500 shrink-0" weight="fill" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={index % 2 ? 'lg:order-1' : ''}>
              <ProductPreview kind={item.kind} compact />
            </div>
          </article>
        ))}
      </section>
    </PublicShell>
  );
}

export function PricingContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  return (
    <PublicShell locale={locale}>
      <VisualPageHero eyebrow={vi ? 'Bảng giá' : 'Pricing'} title={vi ? 'Chọn gói theo quy mô sử dụng' : 'Choose a plan for your scale'} description={vi ? 'Standard và Professional thanh toán qua PayOS. Enterprise được khảo sát và báo giá riêng.' : 'Standard and Professional are paid through PayOS. Enterprise is assessed and quoted separately.'}>
        <div className="rounded-3xl border border-primary/20 bg-card p-8 shadow-xl">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Standard trial</p>
          <p className="mt-2 text-4xl font-black text-foreground">7 {vi ? 'ngày' : 'days'}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-border bg-background p-4">
              <strong className="block text-xl font-extrabold text-foreground">50</strong>
              <span className="text-xs font-semibold text-muted">{vi ? 'nhân sự' : 'employees'}</span>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <strong className="block text-lg font-extrabold text-foreground">2 MCC</strong>
              <span className="text-xs font-semibold text-muted">{vi ? 'máy chấm công' : 'attendance devices'}</span>
            </div>
          </div>
        </div>
      </VisualPageHero>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <ProductPricing locale={locale} />
        <div className="mt-12 flex flex-col justify-between gap-6 rounded-3xl border border-primary/20 bg-primary-light p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-foreground">{vi ? 'Dùng thử trước khi mua' : 'Try before buying'}</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">{vi ? 'Mỗi tài khoản và Hardware ID đủ điều kiện nhận trial Standard một lần.' : 'Each eligible account and Hardware ID can receive one Standard trial.'}</p>
          </div>
          <Link href="/register?trial=standard" className="shrink-0 rounded-xl bg-primary px-6 py-3 text-center text-sm font-bold text-white shadow-md hover:bg-primary-hover transition">
            {vi ? 'Bắt đầu dùng thử' : 'Start Trial'}
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}

export function DownloadContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  const checks = vi
    ? [
        ['01', 'Authenticode Signature', 'Bộ cài được ký số hợp lệ bằng chứng thư mã nguồn.'],
        ['02', 'Mã băm SHA-256', 'Mã băm được công bố minh bạch cùng mỗi bản phát hành.'],
        ['03', 'Verified Release', 'Chỉ release đã xác minh qua kiểm thử mới được công khai.'],
      ]
    : [
        ['01', 'Authenticode Signature', 'The installer has a valid digital code signature.'],
        ['02', 'SHA-256 Hash', 'The hash is published with every release.'],
        ['03', 'Verified Release', 'Only verified releases pass to publication.'],
      ];

  return (
    <PublicShell locale={locale}>
      <VisualPageHero eyebrow="Windows x64" title={vi ? 'Tải bộ cài nATime đã xác minh' : 'Download verified nATime installer'} description={vi ? 'Bộ cài đi qua vùng cách ly và kiểm tra chữ ký trước khi được công khai.' : 'The installer passes quarantine and signature verification before publication.'}>
        <div className="space-y-3">
          {checks.map(([number, title, text]) => (
            <div key={number} className="flex gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-sm">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-light text-xs font-extrabold text-primary">{number}</span>
              <div>
                <p className="font-bold text-foreground">{title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </VisualPageHero>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <ReleaseDownload locale={locale} />
        <MobilePreviewDownload locale={locale} />
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-bold text-foreground">{vi ? 'Lưu ý trước khi cài đặt' : 'Before installation'}</h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-500 shrink-0" weight="fill" />
              <span>{vi ? 'Đối chiếu chữ ký số và SHA-256 được công bố.' : 'Verify the published digital signature and SHA-256.'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-500 shrink-0" weight="fill" />
              <span>{vi ? 'Dùng tài khoản nATime để nhận trial hoặc mua license.' : 'Use your nATime account for trial or paid license.'}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-emerald-500 shrink-0" weight="fill" />
              <span>{vi ? 'Bộ cài Windows dùng cho máy chủ; APK Android chỉ cài trên thiết bị thử nghiệm.' : 'Use Windows installer for server; Android APK for test phone only.'}</span>
            </li>
          </ul>
        </div>
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
      <VisualPageHero eyebrow={vi ? 'Tài liệu' : 'Documentation'} title={vi ? 'Cài đặt và kích hoạt theo từng bước' : 'Install and activate step by step'} description={vi ? 'Quy trình dưới đây bám theo bộ cài Windows và hệ thống license đang hoạt động.' : 'This flow follows the current Windows installer and licensing system.'}>
        <div className="grid grid-cols-5 gap-2">
          {steps.map(([title], index) => (
            <div key={title} className="rounded-xl border border-border bg-card p-3 text-center shadow-sm">
              <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-black text-white">{index + 1}</span>
              <p className="mt-2 hidden truncate text-[10px] font-bold text-muted sm:block">{title.replace(/^\d+\.\s*/, '')}</p>
            </div>
          ))}
        </div>
      </VisualPageHero>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="space-y-4">
          {steps.map(([title, text], index) => (
            <article key={title} className="grid grid-cols-[48px_1fr] gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-light text-sm font-extrabold text-primary">{index + 1}</span>
              <div>
                <h2 className="text-lg font-bold text-foreground">{title.replace(/^\d+\.\s*/, '')}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-2xl bg-foreground p-8 text-sm text-background">
          <p className="font-bold text-background text-base">{vi ? 'Cần hỗ trợ?' : 'Need help?'}</p>
          <p className="mt-2 text-muted">
            {vi ? 'Gửi mô tả lỗi và log cài đặt đã loại bỏ secret tới ' : 'Send issue description and sanitized installation log to '}
            <a className="text-primary underline font-semibold" href="mailto:support@natime.vn">support@natime.vn</a>.
          </p>
        </div>
      </section>
    </PublicShell>
  );
}

export function AboutContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  return (
    <PublicShell locale={locale}>
      <Intro eyebrow={vi ? 'Giới thiệu' : 'About'} title={vi ? 'Phần mềm tập trung vào vận hành thực tế' : 'Software focused on real operations'} description={vi ? 'nATime được phát triển cho nhu cầu chấm công và quản lý thiết bị của doanh nghiệp.' : 'nATime is built for business attendance and device management needs.'} />
      <section className="mx-auto grid max-w-4xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-xl font-bold text-foreground">{vi ? 'Nguyên tắc sản phẩm' : 'Product Principle'}</h2>
          <p className="mt-3 leading-relaxed text-muted">{vi ? 'Chỉ công bố tính năng đã được phê duyệt, kiểm thử và có cơ chế cấp phép rõ ràng.' : 'Only approved, tested capabilities with clear licensing are published.'}</p>
        </article>
        <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-xl font-bold text-foreground">{vi ? 'Mô hình triển khai' : 'Deployment Model'}</h2>
          <p className="mt-3 leading-relaxed text-muted">{vi ? 'Ứng dụng được cài trên Windows của khách hàng; tài khoản natime.vn dùng để mua và quản lý bản quyền.' : 'The application is installed on customer Windows machine; natime.vn account manages licenses.'}</p>
        </article>
      </section>
    </PublicShell>
  );
}

export function ChangelogContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  return (
    <PublicShell locale={locale}>
      <Intro eyebrow={vi ? 'Nhật ký thay đổi' : 'Changelog'} title={vi ? 'Các phiên bản đã phát hành' : 'Published releases'} description={vi ? 'Danh sách chỉ lấy từ những release Windows đã được xác minh và công khai.' : 'This list contains verified and published Windows releases.'} />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <ReleaseDownload locale={locale} changelog />
      </section>
    </PublicShell>
  );
}

export function ContactContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  return (
    <PublicShell locale={locale}>
      <Intro eyebrow={vi ? 'Liên hệ' : 'Contact'} title={vi ? 'Trao đổi với nATime' : 'Talk to nATime'} description={vi ? 'Gửi yêu cầu Enterprise, câu hỏi trước khi mua hoặc vấn đề của khách hàng hiện tại.' : 'Send Enterprise inquiry, pre-sales question or existing customer issue.'} />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="text-xl font-bold text-foreground">{vi ? 'Kênh liên hệ trực tiếp' : 'Contact Channel'}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {vi ? 'Form được lưu để theo dõi trạng thái xử lý. Không gửi mật khẩu, private key hoặc dữ liệu sinh trắc học.' : 'Form is stored for follow-up. Do not send passwords, private keys or biometric data.'}
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
            <EnvelopeSimple size={18} weight="bold" />
            <a href="mailto:support@natime.vn" className="hover:underline">support@natime.vn</a>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ContactForm locale={locale} />
        </div>
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
            ['Mục đích sử dụng', 'Xác thực, thanh toán, cấp phép, hỗ trợ và bảo vệ hệ thống. nATime không yêu cầu gửi mẫu sinh trắc học qua website.'],
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
            ['Thanh toán', 'Standard và Professional được thanh toán qua liên kết PayOS. Webhook hợp lệ là nguồn xác nhận thanh toán.'],
            ['Giao nhận', 'Sau khi xác nhận, entitlement được cập nhật trong Cổng khách hàng. Bộ cài Windows được tải tại trang Tải xuống.'],
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
      <Intro eyebrow={vi ? 'Chính sách' : 'Policy'} title={policyContent.title} description={policyContent.lead} />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="mb-8 text-xs font-semibold text-muted">
          {vi ? 'Cập nhật: 15/07/2026.' : 'Updated: 15 July 2026.'}
        </p>
        <div className="space-y-8">
          {policyContent.sections.map(([title, text]) => (
            <section key={title}>
              <h2 className="text-xl font-bold text-foreground">{title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{text}</p>
            </section>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
