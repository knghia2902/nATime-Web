'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';

interface NavLink {
  href: string;
  vi: string;
  en: string;
  isRoute?: boolean;
}

const navLinks: NavLink[] = [
  { href: '#hero', vi: 'Trang chủ', en: 'Home' },
  { href: '#features', vi: 'Tính năng', en: 'Features' },
  { href: '#pricing', vi: 'Bảng giá', en: 'Pricing' },
  { href: '/blog', vi: 'Blog', en: 'Blog', isRoute: true },
  { href: '#contact', vi: 'Liên hệ', en: 'Contact' },
];

export default function Navbar() {
  const { t } = useLanguage();
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
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveHash(href);
      }
    },
    [closeMobile]
  );

  /* ── Render helpers ─────────────────────────────────── */
  const isActive = (href: string) => activeHash === href;

  const desktopLinkClass = (href: string) =>
    `relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
      isActive(href)
        ? 'text-primary bg-primary/[0.08]'
        : 'text-muted hover:text-foreground hover:bg-primary/5'
    }`;

  const mobileLinkClass = (href: string) =>
    `flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 ${
      isActive(href)
        ? 'text-primary bg-primary/[0.08]'
        : 'text-foreground hover:bg-primary/5 hover:text-primary'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-border/60 bg-background/70 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.02)]'
            : 'border-b border-transparent bg-transparent backdrop-blur-none'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Logo ───────────────────────────────────── */}
          <Link
            href="/"
            className="group relative flex items-center gap-2.5 select-none"
          >
            <img
              src="/logo.png"
              alt="nATime Logo"
              className="h-8 w-auto object-contain dark:brightness-110 dark:contrast-110 transition-all duration-300 group-hover:scale-[1.03]"
            />
          </Link>

          {/* ── Desktop Nav Links ──────────────────────── */}
          <div className="hidden items-center gap-0.5 lg:flex">
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
                  {/* Active indicator dot */}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </a>
              )
            )}
          </div>

          {/* ── Desktop Right Actions ──────────────────── */}
          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <LanguageToggle />
            <Link
              href="/register"
              className="group/cta relative ml-1 inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
            >
              <span className="relative z-10">
                {t('Dùng thử miễn phí', 'Start Free Trial')}
              </span>
              {/* Arrow icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
              {/* Shine sweep on hover */}
              <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
            </Link>
          </div>

          {/* ── Mobile Right Controls ──────────────────── */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <LanguageToggle />
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={t('Mở menu', 'Toggle menu')}
              aria-expanded={mobileOpen}
              className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border bg-card transition-all duration-300 hover:bg-card-hover hover:border-primary/40"
            >
              <div className="flex w-[14px] flex-col items-center gap-[4px]">
                <span
                  className={`block h-[1.5px] w-full rounded-full bg-foreground transition-all duration-300 origin-center ${
                    mobileOpen ? 'translate-y-[5.5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full rounded-full bg-foreground transition-all duration-300 ${
                    mobileOpen ? 'scale-x-0 opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full rounded-full bg-foreground transition-all duration-300 origin-center ${
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
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
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
        className={`fixed top-0 right-0 z-50 flex h-full w-[300px] max-w-[85vw] flex-col border-l border-border/50 bg-background/95 backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/50 px-5">
            <img
              src="/logo.png"
              alt="nATime Logo"
              className="h-7 w-auto object-contain dark:brightness-110"
            />
          <button
            onClick={closeMobile}
            aria-label={t('Đóng menu', 'Close menu')}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-card-hover"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
          {navLinks.map((link, i) => {
            const content = (
              <>
                {/* Link indicator */}
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                    isActive(link.href) ? 'bg-primary' : 'bg-border'
                  }`}
                />
                {t(link.vi, link.en)}
              </>
            );

            const delay = { animationDelay: `${i * 50}ms` };

            return link.isRoute ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className={mobileLinkClass(link.href)}
                style={delay}
              >
                {content}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={mobileLinkClass(link.href)}
                style={delay}
              >
                {content}
              </a>
            );
          })}
        </nav>

        {/* Drawer CTA */}
        <div className="shrink-0 border-t border-border/50 p-4">
          <Link
            href="/register"
            onClick={closeMobile}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
          >
            {t('Dùng thử miễn phí', 'Start Free Trial')}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Spacer to offset fixed header ─────────────── */}
      <div className="h-16" />
    </>
  );
}
