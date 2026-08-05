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

  return (
    <PortalShell title="Tài khoản" description="Thông tin người sở hữu đơn hàng và license.">
      <div className="space-y-6">
        <p className="font-mono text-[11px] text-teal tracking-wide">05 / TÀI KHOẢN</p>
        <div className="border hairline bg-white p-6 max-w-lg space-y-5">
          <div>
            <label className="font-body text-[13px] text-ink/60 block mb-1.5">Email đăng nhập</label>
            <input
              value={user?.email ?? ''}
              disabled
              className="w-full border hairline px-3.5 py-2.5 font-mono text-[14px] bg-paper text-ink/50 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="font-body text-[13px] text-ink/60 block mb-1.5">Tên công ty</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Tên công ty hoặc tổ chức"
              className="w-full border hairline px-3.5 py-2.5 font-body text-[14px] bg-white outline-none focus:border-ink"
            />
          </div>

          <div>
            <label className="font-body text-[13px] text-ink/60 block mb-1.5">Người liên hệ chính</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Họ và tên người liên hệ"
              className="w-full border hairline px-3.5 py-2.5 font-body text-[14px] bg-white outline-none focus:border-ink"
            />
          </div>

          <button
            onClick={save}
            disabled={busy}
            className="bg-ink text-paper font-body text-[13px] font-semibold px-5 py-2.5 hover:bg-graphite transition-colors cursor-pointer disabled:opacity-50"
          >
            {busy ? 'Đang lưu…' : 'Lưu thay đổi'}
          </button>

          {message && (
            <p className="font-mono text-xs text-teal border hairline p-3 bg-paper">
              {message}
            </p>
          )}
        </div>
      </div>
    </PortalShell>
  );
}
