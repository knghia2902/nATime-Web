'use client';

import { FormEvent, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactForm({ locale }: { locale: 'vi' | 'en' }) {
  const vi = locale === 'vi';
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const idempotencyKey = useRef<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    if (form.get('website')) return;
    if (!supabase) { setStatus('error'); return; }
    setStatus('sending');
    idempotencyKey.current ??= crypto.randomUUID().replace(/-/g, '');
    const { error } = await supabase.functions.invoke('contact-submit', {
      body: {
        idempotencyKey: idempotencyKey.current,
        name: form.get('name'),
        email: form.get('email'),
        company: form.get('company'),
        phone: form.get('phone'),
        kind: form.get('kind'),
        message: form.get('message'),
      },
    });
    setStatus(error ? 'error' : 'sent');
    if (!error) {
      formElement.reset();
      idempotencyKey.current = null;
    }
  }

  return (
    <form onSubmit={submit} className="bg-white border border-line rounded-2xl shadow-card p-8 space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="font-sans text-[13px] text-sub block mb-1.5">
            {vi ? 'Họ và tên' : 'Full name'}
          </label>
          <input
            required
            name="name"
            type="text"
            placeholder={vi ? 'Nguyễn Văn A' : 'John Doe'}
            className="w-full border border-line rounded-lg px-3.5 py-2.5 font-sans text-[14px] bg-white outline-none focus:border-indigo"
          />
        </div>
        <div>
          <label className="font-sans text-[13px] text-sub block mb-1.5">
            {vi ? 'Công ty' : 'Company'}
          </label>
          <input
            name="company"
            type="text"
            placeholder={vi ? 'Tên nhà máy / công ty' : 'Factory / company name'}
            className="w-full border border-line rounded-lg px-3.5 py-2.5 font-sans text-[14px] bg-white outline-none focus:border-indigo"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="font-sans text-[13px] text-sub block mb-1.5">
            {vi ? 'Email công việc' : 'Work email'}
          </label>
          <input
            required
            name="email"
            type="email"
            placeholder={vi ? 'ban@congty.vn' : 'you@company.com'}
            className="w-full border border-line rounded-lg px-3.5 py-2.5 font-sans text-[14px] bg-white outline-none focus:border-indigo"
          />
        </div>
        <div>
          <label className="font-sans text-[13px] text-sub block mb-1.5">
            {vi ? 'Số điện thoại' : 'Phone number'}
          </label>
          <input
            name="phone"
            type="text"
            placeholder="09xx xxx xxx"
            className="w-full border border-line rounded-lg px-3.5 py-2.5 font-sans text-[14px] bg-white outline-none focus:border-indigo"
          />
        </div>
      </div>

      <div>
        <label className="font-sans text-[13px] text-sub block mb-1.5">
          {vi ? 'Bạn quan tâm module nào?' : 'Which module interests you?'}
        </label>
        <select
          name="kind"
          className="w-full border border-line rounded-lg px-3.5 py-2.5 font-sans text-[14px] bg-white outline-none focus:border-indigo"
        >
          <option value="all">{vi ? 'Cả bốn module' : 'All four modules'}</option>
          <option value="attendance">{vi ? 'Chấm công' : 'Attendance'}</option>
          <option value="access">{vi ? 'Kiểm soát ra vào' : 'Access Control'}</option>
          <option value="weighbridge">{vi ? 'Trạm cân' : 'Weighbridge'}</option>
          <option value="assets">{vi ? 'Quản lý tài sản' : 'Asset Management'}</option>
        </select>
      </div>

      <div>
        <label className="font-sans text-[13px] text-sub block mb-1.5">
          {vi ? 'Lời nhắn' : 'Message'}
        </label>
        <textarea
          required
          name="message"
          rows={4}
          placeholder={vi ? 'Cho chúng tôi biết quy mô nhà máy và nhu cầu cụ thể của bạn' : 'Tell us about your factory scale and specific needs'}
          className="w-full border border-line rounded-lg px-3.5 py-2.5 font-sans text-[14px] bg-white resize-none outline-none focus:border-indigo"
        />
      </div>

      {/* Honeypot field */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-indigo text-white font-sans text-[14px] font-600 rounded-lg px-7 py-3 hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-60"
        >
          {status === 'sending' ? (vi ? 'Đang gửi...' : 'Sending...') : (vi ? 'Gửi yêu cầu' : 'Submit Request')}
        </button>

        {status === 'sent' && (
          <p className="font-sans text-[13px] text-emerald-text font-600">
            ✓ {vi ? 'Yêu cầu đã được ghi nhận.' : 'Request submitted successfully.'}
          </p>
        )}

        {status === 'error' && (
          <p className="font-sans text-[13px] text-rose-text font-600">
            ✕ {vi ? 'Chưa thể gửi form. Vui lòng email support@natime.vn.' : 'Error sending form. Please email support@natime.vn.'}
          </p>
        )}
      </div>
    </form>
  );
}
