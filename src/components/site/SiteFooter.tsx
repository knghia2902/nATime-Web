import Image from 'next/image';
import Link from 'next/link';

type Locale = 'vi' | 'en';

function localPath(locale: Locale, path: string) {
  return locale === 'en' ? `/en${path === '/' ? '' : path}` : path;
}

export default function SiteFooter({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          
          {/* Logo & Intro Column */}
          <div className="md:col-span-4 flex flex-col items-start justify-between">
            <div>
              <Link href={localPath(locale, '/')} className="flex items-center gap-2.5">
                <Image src="/logo.png" alt="nATime" width={34} height={34} className="h-8 w-8 object-contain" />
                <span className="text-xl font-extrabold tracking-tight text-blue-900 dark:text-white">nATime</span>
              </Link>
              <p className="mt-4 max-w-xs text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {vi ? 'Giải pháp chấm công thông minh dành cho mọi doanh nghiệp.' : 'Smart time attendance solution for all businesses.'}
              </p>
            </div>
            <p className="mt-8 text-xs text-slate-400 dark:text-slate-500">
              © 2026 nATime. All rights reserved.
            </p>
          </div>

          {/* Nav Columns */}
          <div className="md:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            
            {/* Column 1: SẢN PHẨM */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                {vi ? 'SẢN PHẨM' : 'PRODUCTS'}
              </h3>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><Link href={localPath(locale, '/features')} className="hover:text-blue-600 dark:hover:text-white">{vi ? 'Tính năng' : 'Features'}</Link></li>
                <li><Link href={localPath(locale, '/pricing')} className="hover:text-blue-600 dark:hover:text-white">{vi ? 'Bảng giá' : 'Pricing'}</Link></li>
                <li><Link href={localPath(locale, '/register?trial=standard')} className="hover:text-blue-600 dark:hover:text-white">{vi ? 'Dùng thử' : 'Trial'}</Link></li>
              </ul>
            </div>

            {/* Column 2: CÔNG TY */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                {vi ? 'CÔNG TY' : 'COMPANY'}
              </h3>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><Link href={localPath(locale, '/about')} className="hover:text-blue-600 dark:hover:text-white">{vi ? 'Về chúng tôi' : 'About Us'}</Link></li>
                <li><Link href={localPath(locale, '/changelog')} className="hover:text-blue-600 dark:hover:text-white">{vi ? 'Blog' : 'Blog'}</Link></li>
                <li><Link href={localPath(locale, '/contact')} className="hover:text-blue-600 dark:hover:text-white">{vi ? 'Liên hệ' : 'Contact'}</Link></li>
              </ul>
            </div>

            {/* Column 3: HỖ TRỢ */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                {vi ? 'HỖ TRỢ' : 'SUPPORT'}
              </h3>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><Link href={localPath(locale, '/contact')} className="hover:text-blue-600 dark:hover:text-white">Support</Link></li>
                <li><Link href={localPath(locale, '/docs')} className="hover:text-blue-600 dark:hover:text-white">{vi ? 'Hướng dẫn' : 'Docs'}</Link></li>
                <li><Link href={localPath(locale, '/privacy')} className="hover:text-blue-600 dark:hover:text-white">{vi ? 'Chính sách bảo mật' : 'Privacy Policy'}</Link></li>
              </ul>
            </div>

            {/* Column 4: KẾT NỐI VỚI CHÚNG TÔI */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                {vi ? 'KẾT NỐI VỚI CHÚNG TÔI' : 'CONNECT WITH US'}
              </h3>
              <div className="flex items-center gap-3">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://zalo.me" target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-[10px] hover:bg-blue-600">
                  Zalo
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
