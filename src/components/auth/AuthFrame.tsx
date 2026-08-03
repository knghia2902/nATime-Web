import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AuthFrame({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-slate-50 text-slate-950 px-4 py-12">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_center,_rgba(37,99,235,0.12),_transparent_60%)]" />

      <div className="relative w-full max-w-md">
        {/* Logo & Header */}
        <div className="mb-6 text-center">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="nATime">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white border border-slate-200 shadow-md">
              <Image src="/logo.png" alt="nATime Logo" width={32} height={32} className="h-8 w-8 object-contain" />
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">nATime</span>
          </Link>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50">
          <header className="header text-center mb-6">
            <h1 className="title text-2xl font-bold tracking-tight text-slate-900" style={{ margin: '0 0 3px 0', lineHeight: 1.2 }}>{title}</h1>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">{description}</p>
          </header>

          <div>{children}</div>
        </section>

        <div className="mt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} nATime · Phần mềm Quản lý Chấm công Doanh nghiệp
        </div>
      </div>
    </main>
  );
}
