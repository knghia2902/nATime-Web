'use client';

import { useLanguage } from '@/lib/i18n';

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const toggle = () => {
    setLocale(locale === 'vi' ? 'en' : 'vi');
  };

  return (
    <button
      onClick={toggle}
      className="relative h-9 flex items-center gap-1.5 rounded-full border border-border
                 bg-card px-3 transition-all duration-300
                 hover:bg-card-hover hover:border-primary/30
                 hover:shadow-[0_0_12px_rgba(79,70,229,0.15)] cursor-pointer"
      aria-label={locale === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
    >
      {/* Globe icon */}
      <svg
        className="h-3.5 w-3.5 text-muted"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>

      <span className="text-xs font-semibold tracking-wide text-foreground">
        {locale === 'vi' ? 'VI' : 'EN'}
      </span>
    </button>
  );
}
