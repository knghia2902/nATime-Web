import Image from 'next/image';
import Link from 'next/link';

type Locale = 'vi' | 'en';

function localPath(locale: Locale, path: string) {
  return locale === 'en' ? `/en${path === '/' ? '' : path}` : path;
}

export default function SiteFooter({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  const columns = [
    { title: vi ? 'Sản phẩm' : 'Product', links: [[vi ? 'Tính năng' : 'Features', '/features'], [vi ? 'Bảng giá' : 'Pricing', '/pricing'], [vi ? 'Tải xuống Windows' : 'Windows download', '/download'], [vi ? 'Tài liệu' : 'Documentation', '/docs']] },
    { title: vi ? 'Tài nguyên' : 'Resources', links: [[vi ? 'Kiến thức & cập nhật' : 'Knowledge & updates', '/changelog'], [vi ? 'Giới thiệu' : 'About', '/about'], [vi ? 'Liên hệ hỗ trợ' : 'Contact support', '/contact']] },
    { title: vi ? 'Pháp lý' : 'Legal', links: [[vi ? 'Quyền riêng tư' : 'Privacy', '/privacy'], [vi ? 'Điều khoản sử dụng' : 'Terms', '/terms'], [vi ? 'Thanh toán & giao nhận' : 'Payment & delivery', '/payment-delivery-policy'], [vi ? 'Hoàn tiền' : 'Refund policy', '/refund-policy']] },
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-blue-700/10 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_2fr] lg:px-8 lg:py-20">
        <div>
          <Link href={localPath(locale, '/')} className="group inline-flex items-center gap-2.5 text-white"><span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5"><Image src="/logo.png" alt="" width={30} height={30} className="h-[30px] w-[30px] object-contain brightness-0 invert" /></span><span className="text-lg font-extrabold tracking-tight">nATime</span></Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">{vi ? 'Phần mềm chấm công, quản lý thiết bị và bản quyền dành cho doanh nghiệp, cài đặt trên Windows.' : 'Windows software for business attendance, device management and licensing.'}</p>
          <a href="mailto:support@natime.vn" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-300"><span className="grid h-7 w-7 place-items-center rounded-full bg-white/10">@</span>support@natime.vn</a>
        </div>
        <div className="grid gap-9 sm:grid-cols-3">
          {columns.map((column) => <div key={column.title}><h2 className="text-xs font-black uppercase tracking-[0.16em] text-white">{column.title}</h2><ul className="mt-5 space-y-3.5">{column.links.map(([label, path]) => <li key={path}><Link href={localPath(locale, path)} className="text-sm text-slate-400 transition hover:translate-x-0.5 hover:text-white">{label}</Link></li>)}</ul></div>)}
        </div>
      </div>
      <div className="relative border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><span>© 2026 nATime. {vi ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}</span><span>{vi ? 'Phần mềm doanh nghiệp trên Windows' : 'Business software for Windows'}</span></div></div>
    </footer>
  );
}
