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
      <div className="max-w-3xl space-y-6 stagger-fade-in">
        {/* Profile Card */}
        <section className="card-elevated p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-slate-100 pb-6 mb-6">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 text-xl font-bold text-white shadow-lg shadow-indigo-500/25">
              {initials}
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{name || 'Chủ tài khoản'}</h2>
              <p className="text-sm text-slate-500 mt-0.5">{user?.email}</p>
              {company && (
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  🏢 {company}
                </span>
              )}
            </div>
          </div>

          <form onSubmit={save} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-slate-700">
                Email đăng nhập
                <input
                  value={user?.email ?? ''}
                  disabled
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 font-normal text-slate-500 cursor-not-allowed text-sm"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Họ và tên
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-normal outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </label>
            </div>

            <label className="block text-sm font-semibold text-slate-700">
              Đơn vị / Công ty
              <input
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                placeholder="Tên công ty hoặc tổ chức"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-normal outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>

            <div className="pt-2">
              <button disabled={busy} className="btn-gradient px-6 py-2.5">
                {busy ? 'Đang lưu…' : 'Lưu thay đổi'}
              </button>
            </div>

            {message && (
              <p className={`rounded-xl p-4 text-sm font-medium ${message.includes('cập nhật') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {message}
              </p>
            )}
          </form>
        </section>

        {/* Invoice Info Disclaimer */}
        <section className="card-elevated p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 text-lg">📄</span>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Thông tin hóa đơn GTGT</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Thông tin hóa đơn được ghi nhận theo từng đơn hàng khi checkout qua PayOS. Hệ thống chưa tự động xuất hóa đơn điện tử GTGT trực tiếp trên website. Nếu cần xuất hóa đơn doanh nghiệp, vui lòng liên hệ bộ phận hỗ trợ sau khi thanh toán.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
