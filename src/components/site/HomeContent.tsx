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
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#eff6ff_46%,#ffffff_100%)]">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden="true"><div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl" /><div className="absolute -bottom-48 left-1/4 h-96 w-96 rounded-full bg-indigo-100/70 blur-3xl" /></div>
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:py-24 xl:gap-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-blue-800 shadow-sm"><span className="h-2 w-2 rounded-full bg-emerald-500" />nATime for Windows</div>
            <h1 className="mt-6 max-w-2xl text-4xl font-black tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-[3.7rem] lg:leading-[1.08]">{vi ? 'Chấm công rõ ràng. Vận hành chủ động.' : 'Clear attendance. Controlled operations.'}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{vi ? 'Một hệ thống cài đặt trên Windows để doanh nghiệp quản lý chấm công, thiết bị và quyền sử dụng phần mềm theo đúng nhu cầu.' : 'A Windows-installed system for businesses to manage attendance, devices and software access based on actual needs.'}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/register?trial=standard" className="rounded-lg bg-blue-700 px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800">{vi ? 'Dùng thử Standard 7 ngày' : 'Start a 7-day Standard trial'}</Link><Link href={`${prefix}/features`} className="rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-center text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400">{vi ? 'Khám phá tính năng' : 'Explore features'}</Link></div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-500"><span>✓ Windows x64</span><span>✓ {vi ? 'Trial không cần thẻ' : 'No card for trial'}</span><span>✓ {vi ? 'License theo máy' : 'Machine-bound license'}</span></div>
          </div>
          <div className="relative"><div className="absolute -inset-5 -z-10 rotate-2 rounded-[2rem] bg-blue-700/8" aria-hidden="true" /><ProductPreview kind="overview" /></div>
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
