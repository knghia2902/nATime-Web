import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AuthFrame({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_48%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.1),_transparent_42%)]" />
      <div className="relative mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[minmax(0,1.1fr)_minmax(460px,0.9fr)]">
        <section className="hidden min-h-screen border-r border-slate-200 bg-slate-950 px-10 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="nATime">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-lg shadow-blue-950/30">
              <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
            </span>
            <span className="text-xl font-bold tracking-tight">nATime Enterprise Portal</span>
          </Link>

          <div className="max-w-xl py-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Cổng Dịch vụ B2B & Quản trị Hệ thống</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight xl:text-4xl text-white">
              Nền tảng Cấp duyệt Bản quyền & Quản lý Máy chủ nATime.
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Đăng nhập đúng cổng phân quyền để quản lý license, thiết bị chấm công, thanh toán PayOS và bộ cài Windows chính thức.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
                <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                  <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                  Khách hàng Doanh nghiệp (/portal)
                </div>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">✓ Đăng ký Trial 7 ngày Miễn phí</li>
                  <li className="flex items-center gap-2">✓ Mua/Gia hạn gói Standard, Enterprise</li>
                  <li className="flex items-center gap-2">✓ Liên kết Hardware ID máy chủ Local</li>
                  <li className="flex items-center gap-2">✓ Tải file .natlic & Bộ cài Windows</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                  Super Admin Hệ thống (/admin)
                </div>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">✓ Quản lý danh sách Khách hàng B2B</li>
                  <li className="flex items-center gap-2">✓ Cấp duyệt / Thu hồi License Key</li>
                  <li className="flex items-center gap-2">✓ Phê duyệt đơn hàng PayOS</li>
                  <li className="flex items-center gap-2">✓ Quản lý các phiên bản Installer</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-xs leading-5 text-slate-500">&copy; {new Date().getFullYear()} nATime · Nền tảng Chấm công & Kiểm soát Thiết bị Doanh nghiệp</p>
        </section>

        <section className="flex min-h-screen items-center px-4 py-8 sm:px-8 lg:px-12 xl:px-16">
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
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Tài khoản natime.vn</p>
                <h1 className="title text-3xl font-bold tracking-tight" style={{ margin: '0 0 3px 0', lineHeight: 1.2 }}>{title}</h1>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </header>
              <div className="mt-7">{children}</div>
            </section>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-white/80 p-4 text-xs leading-5 text-slate-600">
              <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-50 font-bold text-blue-700">i</span>
              <p>nATime tuyệt đối không yêu cầu bạn gửi mật khẩu hoặc mã xác thực qua bất kỳ kênh trung gian nào.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
