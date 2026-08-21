'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import LanguageToggle from '@/components/LanguageToggle';
import { useAuth } from '@/lib/authContext';

interface NavLink {
  href: string;
  vi: string;
  en: string;
  isRoute?: boolean;
}

const navLinks: NavLink[] = [
  { href: '/', vi: 'Trang chủ', en: 'Home', isRoute: true },
  { href: '/features', vi: 'Tính năng', en: 'Features', isRoute: true },
  { href: '/pricing', vi: 'Bảng giá', en: 'Pricing', isRoute: true },
  { href: '/blog', vi: 'Blog', en: 'Blog', isRoute: true },
  { href: '/contact', vi: 'Liên hệ', en: 'Contact', isRoute: true },
];

export default function Navbar() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  /* ── Scroll detection ─────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section tracking via IntersectionObserver ── */
  useEffect(() => {
    const sectionIds = navLinks
      .filter((l) => l.href.startsWith('#'))
      .map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: '-20% 0px -75% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Lock body scroll when mobile drawer open ───────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* ── Close drawer on outside click ──────────────────── */
  useEffect(() => {
    if (!mobileOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileOpen]);

  /* ── Close drawer on Escape ─────────────────────────── */
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  /* ── Smooth scroll handler for hash links ───────────── */
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith('#')) return;
      e.preventDefault();
      closeMobile();
      if (pathname !== '/') {
        router.push(`/${href}`);
        return;
      }
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveHash(href);
      }
    },
    [closeMobile, pathname, router]
  );

  /* ── Render helpers ─────────────────────────────────── */
  const isActive = (href: string) => {
    if (href.startsWith('#')) return activeHash === href;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const desktopLinkClass = (href: string) =>
    `relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
      isActive(href)
        ? 'text-white bg-white/10 shadow-xs'
        : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
    }`;

  const mobileLinkClass = (href: string) =>
    `flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 ${
      isActive(href)
        ? 'text-white bg-white/10'
        : 'text-white/70 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.08] bg-[#081120]/80 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.35)]'
            : 'border-b border-transparent bg-transparent backdrop-blur-none'
        }`}
      >
        <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Logo ───────────────────────────────────── */}
          <Link
            href="/"
            className="group relative flex items-center gap-2.5 select-none"
          >
            <img
              src="/logo.png"
              alt="nATime Logo"
              className="h-8 w-auto object-contain transition-all duration-300 group-hover:scale-[1.03]"
            />
            <span className="text-[16px] font-bold tracking-tight text-white transition-colors duration-300">
              nATime
            </span>
            <span className="badge-pill hidden sm:inline-flex py-0.5 px-2 text-[11px] font-medium">
              Enterprise
            </span>
          </Link>

          {/* ── Desktop Nav Links (Center Pills) ─────────── */}
          <div className="hidden items-center gap-1 lg:flex absolute left-1/2 -translate-x-1/2 bg-white/[0.04] p-1 rounded-full border border-white/[0.08] backdrop-blur-md">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={desktopLinkClass(link.href)}
                >
                  {t(link.vi, link.en)}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={desktopLinkClass(link.href)}
                >
                  {t(link.vi, link.en)}
                </a>
              )
            )}
          </div>

          {/* ── Desktop Right Actions ──────────────────── */}
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageToggle />
            <Link
              href={user ? "/portal" : "/login"}
              className="btn-pill-glass !h-7 !py-0 !px-3 text-[11.5px] font-medium"
            >
              {user ? t('Portal', 'Portal') : t('Đăng nhập', 'Sign in')}
            </Link>
            <Link
              href={user ? "/dashboard" : "/contact"}
              className="btn-pill-primary !h-7 !py-0 !px-3 text-[11.5px] font-semibold gap-1.5"
            >
              <span>
                {user ? t('Vào Dashboard', 'Go to Dashboard') : t('Yêu cầu demo', 'Request Demo')}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3 w-3"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          {/* ── Mobile Right Controls ──────────────────── */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={t('Mở menu', 'Toggle menu')}
              aria-expanded={mobileOpen}
              className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition-all duration-300 hover:bg-white/10"
            >
              <div className="flex w-[14px] flex-col items-center gap-[4px]">
                <span
                  className={`block h-[1.5px] w-full rounded-full bg-white transition-all duration-300 origin-center ${
                    mobileOpen ? 'translate-y-[5.5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full rounded-full bg-white transition-all duration-300 ${
                    mobileOpen ? 'scale-x-0 opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full rounded-full bg-white transition-all duration-300 origin-center ${
                    mobileOpen ? '-translate-y-[5.5px] -rotate-45' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Backdrop Overlay ──────────────────────── */}
      <div
        onClick={closeMobile}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* ── Mobile Slide-in Drawer ──────────────────────── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('Menu điều hướng', 'Navigation menu')}
        className={`fixed top-0 right-0 z-50 flex h-full w-[300px] max-w-[85vw] flex-col border-l border-white/10 bg-[#081120]/95 backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <img
            src="/logo.png"
            alt="nATime Logo"
            className="h-7 w-auto object-contain"
          />
          <button
            onClick={closeMobile}
            aria-label={t('Đóng menu', 'Close menu')}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer navigation links */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className={mobileLinkClass(link.href)}
              >
                {t(link.vi, link.en)}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={mobileLinkClass(link.href)}
              >
                {t(link.vi, link.en)}
              </a>
            )
          )}
        </div>

        {/* Drawer footer CTA */}
        <div className="border-t border-white/10 p-5 space-y-2.5">
          <Link
            href="/contact"
            onClick={closeMobile}
            className="btn-pill-primary w-full text-center text-xs py-2"
          >
            {t('Yêu cầu demo', 'Request Demo')}
          </Link>
          <Link
            href={user ? "/portal" : "/login"}
            onClick={closeMobile}
            className="btn-pill-glass w-full text-center text-xs py-2"
          >
            {user ? t('Portal', 'Portal') : t('Đăng nhập', 'Sign in')}
          </Link>
        </div>
      </div>
    </>
  );
}
