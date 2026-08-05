'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';

type Locale = 'vi' | 'en';

const labels = {
  vi: {
    home: 'Trang ch\u1ee7',
    features: 'T\u00ednh n\u0103ng',
    pricing: 'B\u1ea3ng gi\u00e1',
    blog: 'Blog',
    contact: 'Li\u00ean h\u1ec7',
    demo: 'Y\u00eau c\u1ea7u demo',
    menu: 'M\u1edf menu',
    close: '\u0110\u00f3ng menu',
  },
  en: {
    home: 'Home',
    features: 'Features',
    pricing: 'Pricing',
    blog: 'Blog',
    contact: 'Contact',
    demo: 'Request Demo',
    menu: 'Open menu',
    close: 'Close menu',
  },
};

function localPath(locale: Locale, path: string) {
  return locale === 'en' ? `/en${path === '/' ? '' : path}` : path;
}

export default function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const text = labels[locale];

  const nav = [
    [text.home, localPath(locale, '/')],
    [text.features, localPath(locale, '/features')],
    [text.pricing, localPath(locale, '/pricing')],
    [text.blog, localPath(locale, '/blog')],
    [text.contact, localPath(locale, '/contact')],
  ];

  const isActive = (href: string) => {
    if (href === localPath(locale, '/')) return pathname === href;
    return pathname.startsWith(href);
  };

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur border-b hairline">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href={localPath(locale, '/')} className="flex items-center gap-2 font-display font-[800] text-lg tracking-tight text-ink">
            <span className="w-2 h-2 rounded-full bg-amber inline-block" />
            natime
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-body text-[14px] text-ink/80">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-ink transition-colors ${
                  isActive(href) ? 'text-ink font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href={user ? '/portal' : localPath(locale, '/contact')}
              className="font-body text-[14px] font-medium bg-ink text-paper px-4 py-2 hover:bg-graphite transition-colors"
            >
              {text.demo}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid h-10 w-10 place-items-center text-ink"
            aria-label={open ? text.close : text.menu}
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span className={`h-0.5 rounded-full bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`h-0.5 rounded-full bg-current transition ${open ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 rounded-full bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-paper p-6 md:hidden">
          <div className="flex items-center justify-between border-b hairline pb-4">
            <Link href={localPath(locale, '/')} onClick={() => setOpen(false)} className="flex items-center gap-2 font-display font-[800] text-lg text-ink">
              <span className="w-2 h-2 rounded-full bg-amber inline-block" />
              natime
            </Link>
            <button onClick={() => setOpen(false)} className="text-2xl text-ink/60 font-bold">\u00d7</button>
          </div>
          <div className="flex flex-col gap-4 py-6">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`font-body text-base text-ink hover:text-amber ${isActive(href) ? 'font-semibold' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-auto pt-4 border-t hairline">
            <Link
              href={user ? '/portal' : localPath(locale, '/contact')}
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-ink text-paper font-body text-[14px] font-medium py-3"
            >
              {text.demo}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
