import Image from 'next/image';
import Link from 'next/link';

type Locale = 'vi' | 'en';

function localPath(locale: Locale, path: string) {
  return locale === 'en' ? `/en${path === '/' ? '' : path}` : path;
}

export default function SiteFooter({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  return (
    <footer className="bg-graphite text-paper/70">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        {/* Logo & Intro */}
        <div className="col-span-2">
          <Link href={localPath(locale, '/')} className="flex items-center gap-2.5 font-display font-extrabold text-xl text-paper mb-3">
            <Image src="/logo.png" alt="nATime" width={28} height={28} className="h-7 w-7 object-contain" />
            <span>nATime</span>
          </Link>
          <p className="font-body text-[13px] leading-relaxed max-w-xs text-paper/60">
            {vi
              ? 'Giải pháp chấm công và quản lý thiết bị thông minh dành cho doanh nghiệp, cài đặt trên Windows self-host.'
              : 'Smart time attendance and device management software for enterprises, installed on self-hosted Windows.'}
          </p>
        </div>

        {/* Sản phẩm */}
        <div>
          <p className="font-body text-[12px] uppercase tracking-wider text-paper/40 mb-3">
            {vi ? 'Sản phẩm' : 'Products'}
          </p>
          <ul className="font-body text-[13px] space-y-2">
            <li><Link href={localPath(locale, '/features')} className="hover:text-paper">{vi ? 'Tính năng' : 'Features'}</Link></li>
            <li><Link href={localPath(locale, '/pricing')} className="hover:text-paper">{vi ? 'Bảng giá' : 'Pricing'}</Link></li>
            <li><Link href={localPath(locale, '/download')} className="hover:text-paper">{vi ? 'Tải bộ cài' : 'Downloads'}</Link></li>
            <li><Link href={localPath(locale, '/docs')} className="hover:text-paper">{vi ? 'Hướng dẫn' : 'Docs'}</Link></li>
          </ul>
        </div>

        {/* Công ty */}
        <div>
          <p className="font-body text-[12px] uppercase tracking-wider text-paper/40 mb-3">
            {vi ? 'Công ty' : 'Company'}
          </p>
          <ul className="font-body text-[13px] space-y-2">
            <li><Link href={localPath(locale, '/about')} className="hover:text-paper">{vi ? 'Giới thiệu' : 'About'}</Link></li>
            <li><Link href={localPath(locale, '/blog')} className="hover:text-paper">Blog</Link></li>
            <li><Link href={localPath(locale, '/contact')} className="hover:text-paper">{vi ? 'Liên hệ' : 'Contact'}</Link></li>
          </ul>
        </div>

        {/* Hỗ trợ & Pháp lý */}
        <div>
          <p className="font-body text-[12px] uppercase tracking-wider text-paper/40 mb-3">
            {vi ? 'Pháp lý' : 'Legal'}
          </p>
          <ul className="font-body text-[13px] space-y-2">
            <li><Link href={localPath(locale, '/privacy')} className="hover:text-paper">{vi ? 'Bảo mật' : 'Privacy'}</Link></li>
            <li><Link href={localPath(locale, '/terms')} className="hover:text-paper">{vi ? 'Điều khoản' : 'Terms'}</Link></li>
            <li><Link href={localPath(locale, '/payment-delivery-policy')} className="hover:text-paper">{vi ? 'Thanh toán' : 'Payment'}</Link></li>
            <li><Link href={localPath(locale, '/refund-policy')} className="hover:text-paper">{vi ? 'Hoàn tiền' : 'Refund'}</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between gap-2 font-mono text-[11px] text-paper/40">
          <span>© 2026 natime.vn — Bản quyền thuộc về nATime</span>
          <span>support@natime.vn</span>
        </div>
      </div>
    </footer>
  );
}
