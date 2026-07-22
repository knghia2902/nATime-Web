'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import PortalShell from './PortalShell';

export default function PortalAccount() {
  const { user, updateProfile } = useAuth(); const [name, setName] = useState(''); const [company, setCompany] = useState(''); const [message, setMessage] = useState('');
  useEffect(() => { if (user) queueMicrotask(() => { setName(user.name); setCompany(user.company); }); }, [user]);
  async function save(event: FormEvent) { event.preventDefault(); const { error } = await updateProfile(name.trim(), company.trim()); setMessage(error ? error.message : 'Thông tin tài khoản đã được cập nhật.'); }
  return <PortalShell title="Tài khoản" description="Thông tin người sở hữu đơn hàng và license."><form onSubmit={save} className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6"><div className="space-y-5"><label className="block text-sm font-semibold">Email<input value={user?.email ?? ''} disabled className="mt-2 w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2.5 font-normal text-slate-500" /></label><label className="block text-sm font-semibold">Họ và tên<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" /></label><label className="block text-sm font-semibold">Đơn vị<input value={company} onChange={(event) => setCompany(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" /></label></div><button className="mt-6 rounded-md bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">Lưu thay đổi</button>{message && <p className="mt-4 text-sm text-slate-600">{message}</p>}</form><section className="mt-6 max-w-2xl rounded-lg border border-slate-200 bg-white p-6"><h2 className="font-semibold">Thông tin hóa đơn</h2><p className="mt-2 text-sm leading-6 text-slate-600">Thông tin hóa đơn được ghi nhận theo từng đơn hàng khi checkout. Website chưa cam kết tự động phát hành hóa đơn GTGT.</p></section></PortalShell>;
}
