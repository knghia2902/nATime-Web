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
    <form onSubmit={submit} className="glass-panel rounded-3xl p-8 md:p-10 space-y-6 shadow-2xl">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="font-sans text-[13px] text-white/70 block mb-2 font-medium">
            {vi ? 'Họ và tên' : 'Full name'}
          </label>
          <input
            required
            name="name"
            type="text"
            placeholder={vi ? 'Nguyễn Văn A' : 'John Doe'}
            className="w-full border border-white/[0.12] rounded-xl px-4 py-3 font-sans text-[14px] bg-[#09152b] text-white placeholder:text-white/30 outline-none focus:border-white/40 transition-all"
          />
        </div>
        <div>
          <label className="font-sans text-[13px] text-white/70 block mb-2 font-medium">
            {vi ? 'Công ty' : 'Company'}
          </label>
          <input
            name="company"
            type="text"
            placeholder={vi ? 'Tên nhà máy / công ty' : 'Factory / company name'}
            className="w-full border border-white/[0.12] rounded-xl px-4 py-3 font-sans text-[14px] bg-[#09152b] text-white placeholder:text-white/30 outline-none focus:border-white/40 transition-all"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="font-sans text-[13px] text-white/70 block mb-2 font-medium">
            {vi ? 'Email công việc' : 'Work email'}
          </label>
          <input
            required
            name="email"
            type="email"
            placeholder={vi ? 'ban@congty.vn' : 'you@company.com'}
            className="w-full border border-white/[0.12] rounded-xl px-4 py-3 font-sans text-[14px] bg-[#09152b] text-white placeholder:text-white/30 outline-none focus:border-white/40 transition-all"
          />
        </div>
        <div>
          <label className="font-sans text-[13px] text-white/70 block mb-2 font-medium">
            {vi ? 'Số điện thoại' : 'Phone number'}
          </label>
          <input
            name="phone"
            type="text"
            placeholder="09xx xxx xxx"
            className="w-full border border-white/[0.12] rounded-xl px-4 py-3 font-sans text-[14px] bg-[#09152b] text-white placeholder:text-white/30 outline-none focus:border-white/40 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="font-sans text-[13px] text-white/70 block mb-2 font-medium">
          {vi ? 'Bạn quan tâm module nào?' : 'Which module interests you?'}
        </label>
        <select
          name="kind"
          className="w-full border border-white/[0.12] rounded-xl px-4 py-3 font-sans text-[14px] bg-[#09152b] text-white outline-none focus:border-white/40 transition-all"
        >
          <option value="all" className="bg-[#09152b] text-white">{vi ? 'Cả bốn module' : 'All four modules'}</option>
          <option value="attendance" className="bg-[#09152b] text-white">{vi ? 'Chấm công' : 'Attendance'}</option>
          <option value="access" className="bg-[#09152b] text-white">{vi ? 'Kiểm soát ra vào 8 làn' : 'Access Control'}</option>
          <option value="weighbridge" className="bg-[#09152b] text-white">{vi ? 'Trạm cân điện tử' : 'Weighbridge'}</option>
          <option value="assets" className="bg-[#09152b] text-white">{vi ? 'Quản lý tài sản' : 'Asset Management'}</option>
        </select>
      </div>

      <div>
        <label className="font-sans text-[13px] text-white/70 block mb-2 font-medium">
          {vi ? 'Lời nhắn' : 'Message'}
        </label>
        <textarea
          required
          name="message"
          rows={4}
          placeholder={vi ? 'Cho chúng tôi biết quy mô nhà máy và nhu cầu cụ thể của bạn' : 'Tell us about your factory scale and specific needs'}
          className="w-full border border-white/[0.12] rounded-xl px-4 py-3 font-sans text-[14px] bg-[#09152b] text-white placeholder:text-white/30 resize-none outline-none focus:border-white/40 transition-all"
        />
      </div>

      {/* Honeypot field */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-pill-primary text-sm py-3 px-8 shadow-[0_4px_24px_rgba(255,255,255,0.25)]"
        >
          {status === 'sending' ? (vi ? 'Đang gửi...' : 'Sending...') : (vi ? 'Gửi yêu cầu' : 'Submit Request')}
        </button>

        {status === 'sent' && (
          <p className="font-sans text-[13px] text-emerald-400 font-semibold">
            ✓ {vi ? 'Yêu cầu đã được ghi nhận.' : 'Request submitted successfully.'}
          </p>
        )}

        {status === 'error' && (
          <p className="font-sans text-[13px] text-rose-400 font-semibold">
            ✕ {vi ? 'Chưa thể gửi form. Vui lòng email support@natime.vn.' : 'Error sending form. Please email support@natime.vn.'}
          </p>
        )}
      </div>
    </form>
  );
}
