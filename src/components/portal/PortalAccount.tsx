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
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-border pb-6 mb-6">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-xl font-bold text-white shadow-md shadow-blue-500/20">
              {initials}
            </span>
            <div>
              <h2 className="text-xl font-bold text-foreground">{name || 'Chủ tài khoản'}</h2>
              <p className="text-sm font-medium text-muted mt-0.5">{user?.email}</p>
              {company && (
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-muted/50 border border-border px-3 py-1 text-xs font-semibold text-muted">
                  🏢 {company}
                </span>
              )}
            </div>
          </div>

          <form onSubmit={save} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-muted">
                Email đăng nhập
                <input
                  value={user?.email ?? ''}
                  disabled
                  className="mt-2 w-full rounded-xl border border-border bg-muted/50 px-4 py-2.5 font-semibold text-muted cursor-not-allowed text-sm"
                />
              </label>

              <label className="block text-sm font-semibold text-muted">
                Họ và tên
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>

            <label className="block text-sm font-semibold text-muted">
              Đơn vị / Công ty
              <input
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                placeholder="Tên công ty hoặc tổ chức"
                className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <div className="pt-2">
              <button disabled={busy} className="btn-gradient px-6 py-2.5">
                {busy ? 'Đang lưu…' : 'Lưu thay đổi'}
              </button>
            </div>

            {message && (
              <p className={`rounded-xl p-4 text-sm font-semibold ${message.includes('cập nhật') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {message}
              </p>
            )}
          </form>
        </section>

        {/* Invoice Info Disclaimer */}
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 text-lg border border-blue-100">📄</span>
            <div>
              <h3 className="font-bold text-foreground text-base">Thông tin hóa đơn GTGT</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted font-medium">
                Thông tin hóa đơn được ghi nhận theo từng đơn hàng khi checkout qua PayOS. Hệ thống chưa tự động xuất hóa đơn điện tử GTGT trực tiếp trên website. Nếu cần xuất hóa đơn doanh nghiệp, vui lòng liên hệ bộ phận hỗ trợ sau khi thanh toán.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}
