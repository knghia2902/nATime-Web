import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AuthFrame({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_48%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.1),_transparent_42%)]" />
      <div className="relative mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[minmax(0,1.05fr)_minmax(440px,0.95fr)]">
        <section className="hidden min-h-screen border-r border-slate-200 bg-slate-950 px-10 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="nATime">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-lg shadow-blue-950/30">
              <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
            </span>
            <span className="text-lg font-bold tracking-tight">nATime</span>
          </Link>

          <div className="max-w-xl py-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Cổng khách hàng</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Quản lý license và bộ cài trong một nơi rõ ràng.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">
              Theo dõi gói đang dùng, thiết bị đã kích hoạt, đơn hàng PayOS và bản phát hành Windows chính thức của nATime.
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/30">
              <div className="flex items-center gap-2 border-b border-slate-700 px-5 py-4">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-slate-300">License đang hoạt động</span>
                <span className="ml-auto rounded-md bg-emerald-400/10 px-2 py-1 text-[11px] font-bold text-emerald-300">HỢP LỆ</span>
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-3">
                {[
                  ['Gói sản phẩm', 'Standard'],
                  ['Thiết bị', '1 / 2'],
                  ['Nền tảng', 'Windows'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs leading-5 text-slate-500">nATime · Phần mềm quản lý chấm công và kiểm soát thiết bị</p>
        </section>

        <section className="flex min-h-screen items-center px-4 py-8 sm:px-8 lg:px-12 xl:px-20">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex items-center justify-between lg:justify-end">
              <Link href="/" className="inline-flex items-center gap-2 lg:hidden" aria-label="nATime">
                <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                <span className="font-bold">nATime</span>
              </Link>
              <Link href="/" className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-blue-700">
                Về website
              </Link>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
              <header className="header">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Tài khoản nATime</p>
                <h1 className="title text-3xl font-bold tracking-tight" style={{ margin: '0 0 3px 0', lineHeight: 1.2 }}>{title}</h1>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </header>
              <div className="mt-7">{children}</div>
            </section>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-white/80 p-4 text-xs leading-5 text-slate-600">
              <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-50 font-bold text-blue-700">i</span>
              <p>nATime không yêu cầu bạn gửi mật khẩu hoặc mã xác thực cho bất kỳ ai.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
