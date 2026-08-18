import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AuthFrame({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <main className="relative min-h-screen flex text-white overflow-hidden">
      {/* ── Left: Branding Showcase (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-[50%] relative flex-col justify-between overflow-hidden bg-[rgba(9,20,42,0.5)] backdrop-blur-2xl border-r border-white/[0.08] z-10">
        
        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-12 xl:px-16">
          {/* Logo */}
          <Link href="/" className="mb-10 inline-flex items-center gap-3 select-none">
            <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold text-white tracking-tight">nATime</span>
            <span className="badge-pill py-0.5 px-2.5 text-xs font-medium">Harness</span>
          </Link>

          {/* Headline */}
          <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight tracking-tight">
            Giải pháp Chấm công
            <br />
            <span className="text-sky-300 font-extrabold">
              & Kiểm soát Ra vào 8 làn
            </span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60">
            Nền tảng quản lý chấm công, kiểm soát ra vào và trạm cân toàn diện dành cho doanh nghiệp và nhà máy.
          </p>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { icon: '🔒', label: 'Bảo mật AES-256' },
              { icon: '⚡', label: '.NET 10 hiệu năng cao' },
              { icon: '🏢', label: 'On-premise / Cloud' },
            ].map((b) => (
              <span key={b.label} className="badge-pill py-1.5 px-4 text-xs font-medium">
                <span>{b.icon}</span>
                <span>{b.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="relative z-10 border-t border-white/[0.08] px-12 xl:px-16 py-6 bg-black/20">
          <div className="flex gap-10">
            {[
              { value: '500+', label: 'Doanh nghiệp' },
              { value: '50K+', label: 'Nhân sự quản lý' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Form Area ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-8 relative z-10">
        <div className="relative w-full max-w-[440px]">
          {/* Mobile Logo */}
          <div className="mb-8 text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.06] border border-white/10 shadow-lg">
                <Image src="/logo.png" alt="nATime" width={32} height={32} className="h-8 w-8 object-contain" />
              </span>
              <span className="text-xl font-bold tracking-tight text-white">nATime</span>
            </Link>
          </div>

          {/* Card */}
          <section className="glass-panel rounded-3xl p-8 sm:p-10 shadow-2xl">
            <header className="header text-center mb-7">
              <h1 className="title text-2xl font-bold tracking-tight text-white justify-center" style={{ margin: '0 0 3px 0', lineHeight: 1.2 }}>{title}</h1>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{description}</p>
            </header>
            <div>{children}</div>
          </section>

          <div className="mt-6 text-center text-xs text-white/40">
            &copy; {new Date().getFullYear()} nATime · Nền tảng Chấm công Doanh nghiệp
          </div>
        </div>
      </div>
    </main>
  );
}
