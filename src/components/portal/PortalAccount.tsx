'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import PortalShell from './PortalShell';

export default function PortalAccount() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) {
      queueMicrotask(() => {
        setName(user.name || '');
        setCompany(user.company || '');
      });
    }
  }, [user]);

  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const { error } = await updateProfile(name.trim(), company.trim());
    setBusy(false);
    setMessage(error ? error.message : 'Thông tin tài khoản đã được cập nhật.');
  }

  const initials = (name || user?.email || '?').slice(0, 2).toUpperCase();

  return (
    <PortalShell title="Tài khoản" description="Thông tin người sở hữu đơn hàng và license.">
      <div className="grid gap-8 lg:grid-cols-12 stagger-fade-in">
        {/* Main Form (Column 1 - 7 cols) */}
        <section className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
            {/* Header user info */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-6">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-sm">
                {initials}
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-slate-900 truncate">{name || 'Chủ tài khoản'}</h2>
                <p className="text-sm font-medium text-slate-500 truncate mt-0.5">{user?.email}</p>
              </div>
            </div>

            <form onSubmit={save} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1.5">Email đăng nhập</label>
                <input
                  value={user?.email ?? ''}
                  disabled
                  className="w-full rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-2.5 font-medium text-slate-500 cursor-not-allowed text-sm"
                />
                <p className="mt-1.5 text-xs text-slate-400">Email không thể thay đổi sau khi đăng ký.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1.5">Họ và tên</label>
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Nhập họ và tên"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1.5">Đơn vị / Công ty</label>
                <input
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder="Tên công ty hoặc tổ chức"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="pt-2">
                <button disabled={busy} className="btn-gradient px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs">
                  {busy ? 'Đang lưu…' : 'Lưu thay đổi'}
                </button>
              </div>

              {message && (
                <p className={`rounded-xl p-4 text-sm font-medium ${message.includes('cập nhật') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Side Info Cards (Column 2 - 5 cols) */}
        <section className="lg:col-span-5 space-y-6">
          {/* Invoice Info Disclaimer */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-start gap-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 text-lg border border-blue-100">
                📄
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Hóa đơn GTGT</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 font-medium">
                  Thông tin hóa đơn được ghi nhận theo từng đơn hàng khi checkout qua PayOS. Nếu cần xuất hóa đơn điện tử doanh nghiệp, vui lòng liên hệ bộ phận hỗ trợ sau khi thanh toán.
                </p>
              </div>
            </div>
          </div>

          {/* Account Security Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-start gap-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 text-lg border border-emerald-100">
                🛡️
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Bảo mật tài khoản</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 font-medium">
                  Tài khoản nATime được bảo mật thông qua Supabase Auth và liên kết bản quyền theo Email đăng ký.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
