import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AuthFrame({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <main className="relative min-h-screen flex bg-slate-50 text-slate-950">
      {/* ── Left: Branding Showcase (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)' }}>
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Glow orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-12 xl:px-16">
          {/* Logo */}
          <Link href="/" className="mb-10 inline-flex items-center gap-3">
            <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain brightness-110" />
            <span className="text-2xl font-bold text-white tracking-tight">nATime</span>
          </Link>

          {/* Headline */}
          <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
            Giải pháp Chấm công
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              & Kiểm soát Ra vào
            </span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300">
            Nền tảng quản lý chấm công, kiểm soát ra vào và giám sát thiết bị toàn diện dành cho doanh nghiệp.
          </p>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { icon: '🔒', label: 'Bảo mật AES-256' },
              { icon: '⚡', label: '.NET 10 hiệu năng cao' },
              { icon: '🏢', label: 'On-premise / Cloud' },
            ].map((b) => (
              <span key={b.label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm">
                <span>{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="relative z-10 border-t border-white/10 px-12 xl:px-16 py-6">
          <div className="flex gap-10">
            {[
              { value: '500+', label: 'Doanh nghiệp' },
              { value: '50K+', label: 'Nhân sự quản lý' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Form Area ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-8">
        {/* Mobile ambient background */}
        <div className="absolute inset-0 lg:hidden" aria-hidden="true">
          <div className="absolute inset-x-0 top-0 h-80" style={{ background: 'linear-gradient(180deg, rgba(99,102,241,0.08) 0%, transparent 100%)' }} />
        </div>

        <div className="relative w-full max-w-[420px]">
          {/* Mobile Logo */}
          <div className="mb-8 text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white border border-slate-200 shadow-lg">
                <Image src="/logo.png" alt="nATime" width={32} height={32} className="h-8 w-8 object-contain" />
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-900">nATime</span>
            </Link>
          </div>

          {/* Card */}
          <section className="rounded-2xl border border-slate-200/80 bg-white p-7 sm:p-9 shadow-xl shadow-slate-200/40">
            <header className="header text-center mb-7">
              <h1 className="title text-2xl font-bold tracking-tight text-slate-900" style={{ margin: '0 0 3px 0', lineHeight: 1.2 }}>{title}</h1>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{description}</p>
            </header>
            <div>{children}</div>
          </section>

          <div className="mt-6 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} nATime · Phần mềm Quản lý Chấm công Doanh nghiệp
          </div>
        </div>
      </div>
    </main>
  );
}
