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
          <div className="flex items-center gap-2 font-display font-[800] text-lg text-paper mb-3">
            <span className="w-2 h-2 rounded-full bg-amber inline-block" /> natime
          </div>
          <p className="font-body text-[13px] leading-relaxed max-w-xs">
            {vi
              ? 'N\u1ec1n t\u1ea3ng v\u1eadn h\u00e0nh nh\u00e0 m\u00e1y h\u1ee3p nh\u1ea5t: ch\u1ea5m c\u00f4ng, ki\u1ec3m so\u00e1t ra v\u00e0o, tr\u1ea1m c\u00e2n v\u00e0 qu\u1ea3n l\u00fd t\u00e0i s\u1ea3n.'
              : 'Unified factory operations: attendance, access control, weighing station and asset management.'}
          </p>
        </div>

        {/* S\u1ea3n ph\u1ea9m */}
        <div>
          <p className="font-body text-[12px] uppercase tracking-wider text-paper/40 mb-3">
            {vi ? 'S\u1ea3n ph\u1ea9m' : 'Products'}
          </p>
          <ul className="font-body text-[13px] space-y-2">
            <li><Link href={localPath(locale, '/features')} className="hover:text-paper">{vi ? 'Ch\u1ea5m c\u00f4ng' : 'Attendance'}</Link></li>
            <li><Link href={localPath(locale, '/features')} className="hover:text-paper">{vi ? 'Ki\u1ec3m so\u00e1t ra v\u00e0o' : 'Access Control'}</Link></li>
            <li><Link href={localPath(locale, '/features')} className="hover:text-paper">{vi ? 'Tr\u1ea1m c\u00e2n' : 'Weighing'}</Link></li>
            <li><Link href={localPath(locale, '/features')} className="hover:text-paper">{vi ? 'Qu\u1ea3n l\u00fd t\u00e0i s\u1ea3n' : 'Assets'}</Link></li>
          </ul>
        </div>

        {/* C\u00f4ng ty */}
        <div>
          <p className="font-body text-[12px] uppercase tracking-wider text-paper/40 mb-3">
            {vi ? 'C\u00f4ng ty' : 'Company'}
          </p>
          <ul className="font-body text-[13px] space-y-2">
            <li><Link href={localPath(locale, '/')} className="hover:text-paper">{vi ? 'Trang ch\u1ee7' : 'Home'}</Link></li>
            <li><Link href={localPath(locale, '/pricing')} className="hover:text-paper">{vi ? 'B\u1ea3ng gi\u00e1' : 'Pricing'}</Link></li>
            <li><Link href={localPath(locale, '/blog')} className="hover:text-paper">Blog</Link></li>
            <li><Link href={localPath(locale, '/contact')} className="hover:text-paper">{vi ? 'Li\u00ean h\u1ec7' : 'Contact'}</Link></li>
          </ul>
        </div>

        {/* Li\u00ean h\u1ec7 */}
        <div>
          <p className="font-body text-[12px] uppercase tracking-wider text-paper/40 mb-3">
            {vi ? 'Li\u00ean h\u1ec7' : 'Contact'}
          </p>
          <ul className="font-body text-[13px] space-y-2">
            <li>hotro@natime.vn</li>
            <li>1900 6868</li>
            <li>{vi ? 'B\u00ecnh D\u01b0\u01a1ng, Vi\u1ec7t Nam' : 'Binh Duong, Vietnam'}</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between gap-2 font-mono text-[11px] text-paper/40">
          <span>&copy; 2026 natime.vn</span>
          <span>{vi ? 'N\u1ec1n t\u1ea3ng v\u1eadn h\u00e0nh nh\u00e0 m\u00e1y' : 'Factory operations platform'}</span>
        </div>
      </div>
    </footer>
  );
}
