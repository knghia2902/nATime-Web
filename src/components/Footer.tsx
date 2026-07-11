'use client';

import { useLanguage } from '@/lib/i18n';

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface FooterLink {
  label: { vi: string; en: string };
  href: string;
}

interface FooterColumn {
  title: { vi: string; en: string };
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: { vi: 'Sản phẩm', en: 'Product' },
    links: [
      { label: { vi: 'Tính năng', en: 'Features' }, href: '#features' },
      { label: { vi: 'Bảng giá', en: 'Pricing' }, href: '#pricing' },
      { label: { vi: 'Tài liệu', en: 'Documentation' }, href: '#docs' },
      { label: { vi: 'Nhật ký thay đổi', en: 'Changelog' }, href: '#changelog' },
    ],
  },
  {
    title: { vi: 'Công ty', en: 'Company' },
    links: [
      { label: { vi: 'Về chúng tôi', en: 'About Us' }, href: '#about' },
      { label: { vi: 'Blog', en: 'Blog' }, href: '#blog' },
      { label: { vi: 'Tuyển dụng', en: 'Careers' }, href: '#careers' },
      { label: { vi: 'Liên hệ', en: 'Contact' }, href: '#contact' },
    ],
  },
  {
    title: { vi: 'Hỗ trợ', en: 'Support' },
    links: [
      { label: { vi: 'Trung tâm hỗ trợ', en: 'Help Center' }, href: '#help' },
      { label: { vi: 'API Docs', en: 'API Docs' }, href: '#api' },
      { label: { vi: 'Trạng thái', en: 'Status' }, href: '#status' },
      { label: { vi: 'Điều khoản dịch vụ', en: 'Terms of Service' }, href: '#terms' },
    ],
  },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/natime', icon: GitHubIcon },
  { name: 'Facebook', href: 'https://facebook.com/natime', icon: FacebookIcon },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/natime', icon: LinkedInIcon },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-slate-900 dark:bg-slate-950">
      {/* Subtle gradient accent at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full opacity-[0.04]"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8 lg:pt-24">
        {/* Main grid: 4 columns on desktop */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-6 md:col-span-2 lg:col-span-1">
            {/* Logo */}
            <a href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 transition-shadow duration-300 group-hover:shadow-indigo-500/40">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-white"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                n<span className="text-indigo-400">A</span>Time
              </span>
            </a>

            {/* Description */}
            <p className="max-w-xs text-sm leading-6 text-slate-400">
              {t({
                vi: 'Nền tảng quản lý chấm công và kiểm soát ra vào hàng đầu cho doanh nghiệp Việt Nam.',
                en: 'Leading time attendance and access control platform for Vietnamese enterprises.',
              })}
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/social flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-500/25 dark:bg-slate-800/50"
                  aria-label={social.name}
                >
                  <social.icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover/social:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns 2-4: Link groups */}
          {footerColumns.map((column) => (
            <div key={column.title.en}>
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                {t(column.title)}
              </h3>
              <ul role="list" className="mt-6 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label.en}>
                    <a
                      href={link.href}
                      className="group/link relative inline-flex text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                    >
                      <span className="relative">
                        {t(link.label)}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300 group-hover/link:w-full" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; 2026 nATime.{' '}
            {t({ vi: 'Bảo lưu mọi quyền.', en: 'All rights reserved.' })}
          </p>
          <div className="flex gap-6">
            <a
              href="#privacy"
              className="text-xs text-slate-500 transition-colors duration-300 hover:text-slate-300"
            >
              {t({ vi: 'Chính sách bảo mật', en: 'Privacy Policy' })}
            </a>
            <a
              href="#terms"
              className="text-xs text-slate-500 transition-colors duration-300 hover:text-slate-300"
            >
              {t({ vi: 'Điều khoản', en: 'Terms' })}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
