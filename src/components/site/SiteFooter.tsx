import Image from 'next/image';
import Link from 'next/link';

type Locale = 'vi' | 'en';

function localPath(locale: Locale, path: string) {
  return locale === 'en' ? `/en${path === '/' ? '' : path}` : path;
}

export default function SiteFooter({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  return (
    <footer className="bg-[#0a1424]/75 backdrop-blur-2xl border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Link href={localPath(locale, '/')} className="flex items-center gap-2.5 font-sans font-bold text-lg text-white mb-3">
            <Image src="/logo.png" alt="nATime" width={28} height={28} className="h-7 w-7 object-contain" />
            <span>nATime</span>
          </Link>
          <p className="font-sans text-[13px] leading-relaxed max-w-xs text-white/60">
            {vi
              ? 'Nền tảng vận hành nhà máy hợp nhất: chấm công, kiểm soát ra vào 8 làn, trạm cân và quản lý tài sản.'
              : 'Unified factory operation platform: attendance, 8-lane access control, weighbridge, and asset management.'}
          </p>
        </div>
        <div>
          <p className="font-sans text-[12px] font-semibold uppercase tracking-wider text-white/40 mb-3">
            {vi ? 'Sản phẩm' : 'Products'}
          </p>
          <ul className="font-sans text-[13px] text-white/60 space-y-2.5">
            <li><Link href={localPath(locale, '/features')} className="hover:text-white transition-colors">{vi ? 'Chấm công' : 'Attendance'}</Link></li>
            <li><Link href={localPath(locale, '/features')} className="hover:text-white transition-colors">{vi ? 'Kiểm soát ra vào' : 'Access Control'}</Link></li>
            <li><Link href={localPath(locale, '/features')} className="hover:text-white transition-colors">{vi ? 'Trạm cân' : 'Weighbridge'}</Link></li>
            <li><Link href={localPath(locale, '/features')} className="hover:text-white transition-colors">{vi ? 'Quản lý tài sản' : 'Asset Management'}</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-sans text-[12px] font-semibold uppercase tracking-wider text-white/40 mb-3">
            {vi ? 'Công ty' : 'Company'}
          </p>
          <ul className="font-sans text-[13px] text-white/60 space-y-2.5">
            <li><Link href={localPath(locale, '/')} className="hover:text-white transition-colors">{vi ? 'Trang chủ' : 'Home'}</Link></li>
            <li><Link href={localPath(locale, '/pricing')} className="hover:text-white transition-colors">{vi ? 'Bảng giá' : 'Pricing'}</Link></li>
            <li><Link href={localPath(locale, '/blog')} className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href={localPath(locale, '/contact')} className="hover:text-white transition-colors">{vi ? 'Liên hệ' : 'Contact'}</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-sans text-[12px] font-semibold uppercase tracking-wider text-white/40 mb-3">
            {vi ? 'Liên hệ' : 'Contact'}
          </p>
          <ul className="font-sans text-[13px] text-white/60 space-y-2.5">
            <li>support@natime.vn</li>
            <li>0583392700</li>
            <li>Ông Trịnh, Tân Phước, Hồ Chí Minh</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between gap-2 font-sans text-[12px] text-white/40">
          <span>© 2026 natime.vn — bản quyền thuộc về nATime</span>
          <span>Phiên bản Enterprise 2026</span>
        </div>
      </div>
    </footer>
  );
}
