import Link from 'next/link';
import ProductPreview from './ProductPreview';
import ProductPricing from './ProductPricing';
import PublicShell from './PublicShell';

export default function HomeContent({ locale }: { locale: 'vi' | 'en' }) {
  const vi = locale === 'vi';
  const prefix = vi ? '' : '/en';
  const values = [
    ['01', vi ? 'Chấm công tập trung' : 'Centralized attendance', vi ? 'Theo dõi sự kiện chấm công, ca làm việc và kết quả tổng hợp trong cùng một hệ thống.' : 'Review attendance events, shifts and calculated results in one system.'],
    ['02', vi ? 'Thiết bị được kiểm soát' : 'Controlled devices', vi ? 'Khai báo máy chấm công, theo dõi kết nối và quản lý các tác vụ đồng bộ được hỗ trợ.' : 'Register attendance devices, monitor connectivity and manage supported synchronization tasks.'],
    ['03', vi ? 'License minh bạch' : 'Transparent licensing', vi ? 'Biết rõ gói, module, thời hạn và số máy được phép sử dụng ngay trong Cổng khách hàng.' : 'See the plan, modules, term and activated machine allowance in the customer portal.'],
  ];
  const steps = vi ? [
    ['Tạo tài khoản', 'Xác thực email để quản lý trial, đơn hàng và license.'],
    ['Cài trên Windows', 'Tải bộ cài đã xác minh và hoàn tất cấu hình tại máy chủ.'],
    ['Liên kết thiết bị', 'Tạo mã liên kết trong nATime rồi phê duyệt tại Cổng khách hàng.'],
    ['Bắt đầu vận hành', 'Kiểm tra gói, module và trạng thái license trước khi sử dụng.'],
  ] : [
    ['Create an account', 'Verify your email to manage trials, orders and licenses.'],
    ['Install on Windows', 'Download the verified installer and complete server setup.'],
    ['Link the machine', 'Create a link code in nATime and approve it in the customer portal.'],
    ['Start operating', 'Confirm the plan, modules and license status before use.'],
  ];

  return (
    <PublicShell locale={locale}>
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden bg-slate-50">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-40 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,.32)_0%,transparent_70%)] opacity-30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[500px] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,.36)_0%,transparent_70%)] opacity-20 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(79,70,229,1)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,1)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-24 sm:px-6 md:pb-24 md:pt-28 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-start">
              <h1 className="mb-5">
                <span className="mb-3 block text-5xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">nATime</span>
                <span className="block text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl lg:text-[2rem]">
                  <span className="text-slate-700">{vi ? 'Giải pháp Chấm công' : 'Time Attendance'}</span>
                  <br />
                  <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-600 bg-clip-text text-transparent">{vi ? '& Quản lý Thiết bị cho Doanh nghiệp' : '& Business Device Management'}</span>
                </span>
              </h1>

              <p className="mb-9 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">{vi ? 'Hệ thống cài đặt trên Windows giúp doanh nghiệp quản lý chấm công, máy chấm công và quyền sử dụng phần mềm trong cùng một quy trình.' : 'A Windows-installed system for managing attendance, attendance devices and software access in one operational flow.'}</p>

              <div className="mb-12 flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Link href="/register?trial=standard" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 text-sm font-bold text-white shadow-lg shadow-blue-700/25 transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl sm:w-auto">{vi ? 'Dùng thử miễn phí' : 'Start free trial'}<span aria-hidden="true">→</span></Link>
                <Link href={`${prefix}/contact`} className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white/85 px-7 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 sm:w-auto">{vi ? 'Liên hệ tư vấn' : 'Contact sales'}</Link>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                <span className="rounded-full border border-slate-200 bg-white/60 px-3 py-1.5">✓ Windows x64</span>
                <span className="rounded-full border border-slate-200 bg-white/60 px-3 py-1.5">✓ {vi ? 'Trial Standard 7 ngày' : '7-day Standard trial'}</span>
                <span className="rounded-full border border-slate-200 bg-white/60 px-3 py-1.5">✓ {vi ? 'License theo máy' : 'Machine-bound license'}</span>
              </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,.25)_0%,transparent_70%)] opacity-40 blur-2xl" />
              <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_20px_80px_-10px_rgba(15,23,42,.20)] transition duration-700 hover:-translate-y-1 lg:max-w-none">
                <div className="flex select-none items-center justify-between border-b border-slate-200 bg-slate-100/90 px-4 py-3">
                  <div className="flex shrink-0 items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-red-400/80" /><span className="h-3 w-3 rounded-full bg-yellow-400/80" /><span className="h-3 w-3 rounded-full bg-green-400/80" /></div>
                  <div className="flex w-full max-w-[240px] items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-1 font-mono text-[11px] text-slate-500"><span className="text-emerald-600" aria-hidden="true">●</span><span className="truncate">nATime · Windows</span></div>
                  <div className="w-10 shrink-0" />
                </div>
                <div className="relative overflow-hidden bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/screenshots/dashboard.png" alt={vi ? 'Giao diện quản trị nATime' : 'nATime administration interface'} className="h-auto w-full select-none object-cover" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-50/35 to-transparent" />
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-xl border border-slate-200/80 bg-white/90 px-4 py-3 text-xs shadow-xl backdrop-blur-xl sm:flex">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600">✓</span>
                <div><p className="text-[10px] text-slate-500">{vi ? 'Phát hành' : 'Release'}</p><p className="font-bold text-slate-800">{vi ? 'Bộ cài Windows đã xác minh' : 'Verified Windows installer'}</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white"><div className="mx-auto grid max-w-[1200px] divide-y divide-slate-200 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6"><InfoStrip title={vi ? 'Triển khai' : 'Deployment'} value={vi ? 'Tại hệ thống Windows của doanh nghiệp' : 'On the business Windows system'} /><InfoStrip title={vi ? 'Cấp phép' : 'Licensing'} value={vi ? 'Theo gói, module và thiết bị' : 'By plan, modules and devices'} /><InfoStrip title={vi ? 'Quản lý tài khoản' : 'Account management'} value="natime.vn" /></div></section>

      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:py-24">
        <SectionHeading eyebrow={vi ? 'Giá trị cốt lõi' : 'Core value'} title={vi ? 'Đủ rõ để quản lý. Đủ gọn để vận hành.' : 'Clear enough to manage. Focused enough to operate.'} description={vi ? 'nATime tập trung vào những khả năng đang được phát hành và cấp phép thực tế.' : 'nATime focuses on capabilities that are actually released and licensed.'} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">{values.map(([number, title, text]) => <article key={number} className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60"><div className="flex items-center justify-between"><span className="text-xs font-black tracking-[0.18em] text-blue-700">{number}</span><span className="h-px w-12 bg-slate-200 transition group-hover:bg-blue-300" /></div><h3 className="mt-8 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></article>)}</div>
      </section>

      <section className="overflow-hidden border-y border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:py-24">
          <SectionHeading dark eyebrow={vi ? 'Trong một hệ thống' : 'In one system'} title={vi ? 'Từ dữ liệu chấm công đến trạng thái thiết bị' : 'From attendance records to device status'} description={vi ? 'Giao diện nghiệp vụ được tổ chức theo luồng công việc, giúp người quản trị biết dữ liệu nào đã ghi nhận và việc nào cần xử lý.' : 'Operational screens follow the work flow so administrators can see what is recorded and what needs attention.'} />
          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"><ProductPreview kind="attendance" /><FeatureCopy index="01" title={vi ? 'Theo dõi chấm công theo bộ lọc' : 'Filter attendance records'} text={vi ? 'Lọc theo thời gian, phòng ban và nhân sự; xem giờ vào, giờ ra và kết quả liên quan trong bảng nghiệp vụ.' : 'Filter by date, department and employee; review check-in, check-out and related results in the operational table.'} link={`${prefix}/features`} linkText={vi ? 'Xem toàn bộ tính năng' : 'See all features'} /></div>
          <div className="mt-20 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]"><div className="lg:order-2"><ProductPreview kind="devices" /></div><FeatureCopy index="02" title={vi ? 'Biết thiết bị nào cần xử lý' : 'Know which device needs attention'} text={vi ? 'Theo dõi trạng thái kết nối và các thao tác đồng bộ được hỗ trợ mà không trộn lẫn với module ngoài license.' : 'Monitor connectivity and supported synchronization actions without mixing in modules outside the license.'} link={`${prefix}/docs`} linkText={vi ? 'Đọc hướng dẫn triển khai' : 'Read deployment guidance'} /></div>
        </div>
      </section>

      <section className="bg-slate-50"><div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:py-24"><SectionHeading eyebrow={vi ? 'Bắt đầu' : 'Getting started'} title={vi ? 'Bốn bước từ tài khoản đến vận hành' : 'Four steps from account to operation'} description={vi ? 'Quy trình cài đặt và kích hoạt được thiết kế để doanh nghiệp tự kiểm tra từng bước.' : 'The installation and activation flow lets the business verify every step.'} /><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{steps.map(([title, text], index) => <article key={title} className="relative rounded-xl border border-slate-200 bg-white p-6"><span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-sm font-black text-blue-700">{index + 1}</span><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></article>)}</div></div></section>

      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:py-24"><SectionHeading centered eyebrow={vi ? 'Bảng giá' : 'Pricing'} title={vi ? 'Chọn theo quy mô sử dụng thực tế' : 'Choose for actual usage'} description={vi ? 'Giá, giới hạn nhân sự, thiết bị và module được lấy từ danh mục sản phẩm nATime.' : 'Prices, employee and device limits, and modules come from the nATime product catalog.'} /><div className="mt-12"><ProductPricing locale={locale} compact /></div></section>

      <section className="px-4 pb-20 sm:px-6"><div className="mx-auto max-w-[1200px] overflow-hidden rounded-3xl bg-[linear-gradient(120deg,#0f172a,#172554_58%,#1d4ed8)] px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14 lg:py-14"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">nATime Standard</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">{vi ? 'Kiểm chứng quy trình trên một máy Windows' : 'Validate the flow on one Windows machine'}</h2><p className="mt-4 max-w-2xl leading-7 text-blue-100">{vi ? 'Trial 7 ngày, tối đa 50 nhân sự, một thiết bị và module Standard hiện hành.' : 'A 7-day trial for up to 50 employees, one device and the current Standard modules.'}</p></div><div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:ml-10"><Link href="/register?trial=standard" className="rounded-lg bg-white px-6 py-3.5 text-center text-sm font-bold text-slate-950 hover:bg-blue-50">{vi ? 'Tạo tài khoản' : 'Create account'}</Link><Link href={`${prefix}/download`} className="rounded-lg border border-white/30 px-6 py-3.5 text-center text-sm font-bold text-white hover:bg-white/10">{vi ? 'Tải bộ cài' : 'Download'}</Link></div></div></section>
    </PublicShell>
  );
}

function SectionHeading({ eyebrow, title, description, dark = false, centered = false }: { eyebrow: string; title: string; description: string; dark?: boolean; centered?: boolean }) {
  return <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}><p className={`text-xs font-black uppercase tracking-[0.18em] ${dark ? 'text-blue-300' : 'text-blue-700'}`}>{eyebrow}</p><h2 className={`mt-3 text-3xl font-black tracking-[-0.025em] sm:text-4xl ${dark ? 'text-white' : 'text-slate-950'}`}>{title}</h2><p className={`mt-4 text-base leading-7 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p></div>;
}

function InfoStrip({ title, value }: { title: string; value: string }) {
  return <div className="px-5 py-6 sm:px-7"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">{title}</p><p className="mt-2 text-sm font-semibold text-slate-800">{value}</p></div>;
}

function FeatureCopy({ index, title, text, link, linkText }: { index: string; title: string; text: string; link: string; linkText: string }) {
  return <div><span className="text-xs font-black tracking-[0.18em] text-blue-300">{index}</span><h3 className="mt-4 text-3xl font-black tracking-tight">{title}</h3><p className="mt-4 max-w-xl leading-7 text-slate-300">{text}</p><Link href={link} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-300 hover:text-white">{linkText}<span aria-hidden="true">→</span></Link></div>;
}
