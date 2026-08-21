'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import PortalShell from './PortalShell';

export default function PortalAccount() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [taxId, setTaxId] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [invoiceEmail, setInvoiceEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) {
      queueMicrotask(() => {
        setName(user.name || '');
        setCompany(user.company || '');
        setTaxId(user.taxId || '');
        setCompanyAddress(user.companyAddress || '');
        setInvoiceEmail(user.invoiceEmail || '');
      });
    }
  }, [user]);

  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const { error } = await updateProfile(
      name.trim(),
      company.trim(),
      taxId.trim(),
      companyAddress.trim(),
      invoiceEmail.trim()
    );
    setBusy(false);
    setMessage(error ? error.message : 'Thông tin tài khoản và thuế đã được lưu thành công.');
  }

  const initials = (name || user?.email || '?').slice(0, 2).toUpperCase();

  return (
    <PortalShell title="Tài khoản & Pháp lý" description="Thông tin người sở hữu đơn hàng, bản quyền và dữ liệu xuất hóa đơn VAT.">
      <div className="grid gap-8 lg:grid-cols-12 stagger-fade-in">
        {/* Main Form (Column 1 - 7 cols) */}
        <section className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 sm:p-7 shadow-sm backdrop-blur">
            {/* Header user info */}
            <div className="flex items-center gap-4 border-b border-white/[0.08] pb-5 mb-6">
              <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-white text-base font-bold text-[#0a1628] shadow-xs">
                {initials}
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-white truncate">{name || 'Chủ tài khoản'}</h2>
                <p className="text-sm font-normal text-white/50 truncate mt-0.5">{user?.email}</p>
              </div>
            </div>

            <form onSubmit={save} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Email đăng nhập</label>
                <input
                  value={user?.email ?? ''}
                  disabled
                  className="w-full rounded-xl border border-white/[0.12] bg-[#0a1220]/60 px-4 py-2.5 font-normal text-white/40 cursor-not-allowed text-sm"
                />
                <p className="mt-1.5 text-xs text-white/40 font-normal">Email không thể thay đổi sau khi đăng ký.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Họ và tên người đại diện</label>
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Nhập họ và tên"
                  className="w-full rounded-xl border border-white/[0.12] bg-[#0a1220] px-4 py-2.5 text-sm font-normal text-white placeholder:text-white/30 outline-none transition focus:border-white/40"
                />
              </div>

              <div className="border-t border-white/[0.08] pt-5 mt-5">
                <h3 className="text-sm font-bold text-white mb-3">Thông tin xuất hóa đơn VAT (Doanh nghiệp)</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1.5">Tên Đơn vị / Công ty</label>
                    <input
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      placeholder="Ví dụ: Công ty Cổ phần Công nghệ XYZ"
                      className="w-full rounded-xl border border-white/[0.12] bg-[#0a1220] px-4 py-2.5 text-sm font-normal text-white placeholder:text-white/30 outline-none transition focus:border-white/40"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1.5">Mã số thuế (MST)</label>
                      <input
                        value={taxId}
                        onChange={(event) => setTaxId(event.target.value)}
                        placeholder="Ví dụ: 0312345678"
                        className="w-full rounded-xl border border-white/[0.12] bg-[#0a1220] px-4 py-2.5 text-sm font-mono text-white placeholder:font-sans placeholder:text-white/30 outline-none transition focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1.5">Email nhận Hóa đơn điện tử</label>
                      <input
                        type="email"
                        value={invoiceEmail}
                        onChange={(event) => setInvoiceEmail(event.target.value)}
                        placeholder="ketoan@congty.vn"
                        className="w-full rounded-xl border border-white/[0.12] bg-[#0a1220] px-4 py-2.5 text-sm font-normal text-white placeholder:text-white/30 outline-none transition focus:border-white/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1.5">Địa chỉ công ty (trên GPKD)</label>
                    <input
                      value={companyAddress}
                      onChange={(event) => setCompanyAddress(event.target.value)}
                      placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                      className="w-full rounded-xl border border-white/[0.12] bg-[#0a1220] px-4 py-2.5 text-sm font-normal text-white placeholder:text-white/30 outline-none transition focus:border-white/40"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button disabled={busy} className="px-6 py-2.5 text-sm font-semibold rounded-xl text-[#0a1628] bg-white hover:bg-white/85 transition-all shadow-[0_2px_12px_rgba(255,255,255,0.15)] disabled:opacity-60 cursor-pointer">
                  {busy ? 'Đang lưu…' : 'Lưu thông tin'}
                </button>
              </div>

              {message && (
                <p className={`rounded-xl p-4 text-sm font-medium ${message.includes('thành công') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Side Info Cards (Column 2 - 5 cols) */}
        <section className="lg:col-span-5 space-y-6">
          {/* Invoice Info Disclaimer */}
          <div className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 shadow-sm backdrop-blur">
            <div className="flex items-start gap-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-white text-base border border-white/10">
                📄
              </span>
              <div>
                <h3 className="font-semibold text-white text-sm">Hóa đơn GTGT & Thuế</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/60 font-normal">
                  Sản phẩm phần mềm nATime thuộc đối tượng không chịu thuế GTGT (0%) theo quy định hiện hành. Hóa đơn điện tử hợp lệ của Cơ quan Thuế sẽ được phát hành và gửi về email kế toán sau khi đơn hàng được thanh toán.
                </p>
              </div>
            </div>
          </div>

          {/* Account Security Card */}
          <div className="rounded-2xl border border-white/[0.08] bg-[rgba(15,23,38,0.75)] p-6 shadow-sm backdrop-blur">
            <div className="flex items-start gap-3.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 text-base border border-emerald-500/20">
                🛡️
              </span>
              <div>
                <h3 className="font-semibold text-white text-sm">Bảo mật tài khoản</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/60 font-normal">
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
