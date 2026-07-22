import Image from 'next/image';
import Link from 'next/link';

type Locale = 'vi' | 'en';

function localPath(locale: Locale, path: string) {
  return locale === 'en' ? `/en${path === '/' ? '' : path}` : path;
}

export default function SiteFooter({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  const columns = [
    { title: vi ? 'Sản phẩm' : 'Product', links: [[vi ? 'Tính năng' : 'Features', '/features'], [vi ? 'Bảng giá' : 'Pricing', '/pricing'], [vi ? 'Tải xuống' : 'Download', '/download'], [vi ? 'Tài liệu' : 'Documentation', '/docs']] },
    { title: 'nATime', links: [[vi ? 'Giới thiệu' : 'About', '/about'], [vi ? 'Nhật ký thay đổi' : 'Changelog', '/changelog'], [vi ? 'Liên hệ' : 'Contact', '/contact']] },
    { title: vi ? 'Chính sách' : 'Policies', links: [[vi ? 'Quyền riêng tư' : 'Privacy', '/privacy'], [vi ? 'Điều khoản sử dụng' : 'Terms', '/terms'], [vi ? 'Thanh toán & giao nhận' : 'Payment & delivery', '/payment-delivery-policy'], [vi ? 'Hoàn tiền' : 'Refund policy', '/refund-policy']] },
  ];
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_2fr]">
        <div>
          <Link href={localPath(locale, '/')} className="inline-flex items-center gap-2 text-white"><Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 object-contain brightness-0 invert" /><span className="font-bold">nATime</span></Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">{vi ? 'Phần mềm chấm công và quản lý thiết bị dành cho doanh nghiệp, cài đặt trên Windows.' : 'Windows software for business attendance and device management.'}</p>
          <a href="mailto:support@natime.vn" className="mt-4 inline-block text-sm font-semibold text-white hover:underline">support@natime.vn</a>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => <div key={column.title}><h2 className="text-sm font-semibold text-white">{column.title}</h2><ul className="mt-4 space-y-3">{column.links.map(([label, path]) => <li key={path}><Link href={localPath(locale, path)} className="text-sm text-slate-400 hover:text-white">{label}</Link></li>)}</ul></div>)}
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-center text-xs text-slate-500">© 2026 nATime. {vi ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'}</div>
    </footer>
  );
}
