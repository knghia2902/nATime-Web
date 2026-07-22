'use client';

import { FormEvent, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactForm({ locale }: { locale: 'vi' | 'en' }) {
  const vi = locale === 'vi';
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const idempotencyKey = useRef<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get('website')) return;
    if (!supabase) { setStatus('error'); return; }
    setStatus('sending');
    idempotencyKey.current ??= crypto.randomUUID().replace(/-/g, '');
    const { error } = await supabase.functions.invoke('contact-submit', { body: { idempotencyKey: idempotencyKey.current, name: form.get('name'), email: form.get('email'), company: form.get('company'), kind: form.get('kind'), message: form.get('message') } });
    setStatus(error ? 'error' : 'sent');
    if (!error) event.currentTarget.reset();
  }
  return <form onSubmit={submit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-800">{vi ? 'Họ và tên' : 'Full name'}<input required name="name" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" /></label><label className="text-sm font-semibold text-slate-800">Email<input required type="email" name="email" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" /></label><label className="text-sm font-semibold text-slate-800">{vi ? 'Đơn vị' : 'Company'}<input name="company" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" /></label><label className="text-sm font-semibold text-slate-800">{vi ? 'Loại yêu cầu' : 'Inquiry type'}<select name="kind" className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 font-normal"><option value="general">{vi ? 'Thông tin chung' : 'General'}</option><option value="enterprise">Enterprise</option><option value="support">{vi ? 'Hỗ trợ hiện tại' : 'Existing customer support'}</option></select></label></div>
    <label className="mt-5 block text-sm font-semibold text-slate-800">{vi ? 'Nội dung' : 'Message'}<textarea required name="message" rows={6} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2.5 font-normal" /></label><input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    <button disabled={status === 'sending'} className="mt-5 rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60">{status === 'sending' ? (vi ? 'Đang gửi…' : 'Sending…') : (vi ? 'Gửi yêu cầu' : 'Send inquiry')}</button>
    {status === 'sent' && <p className="mt-4 text-sm font-medium text-emerald-700">{vi ? 'Yêu cầu đã được ghi nhận.' : 'Your inquiry has been received.'}</p>}{status === 'error' && <p className="mt-4 text-sm text-red-700">{vi ? 'Chưa thể gửi form. Vui lòng email support@natime.vn.' : 'The form could not be sent. Please email support@natime.vn.'}</p>}
  </form>;
}
