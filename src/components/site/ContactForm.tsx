'use client';

import { FormEvent, useRef, useState } from 'react';
import { PaperPlaneRight, CheckCircle, Warning } from '@phosphor-icons/react';
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
    <form onSubmit={submit} className="rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-lg">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
            {vi ? 'Họ và tên' : 'Full Name'} <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="name"
            placeholder={vi ? 'Nguyễn Văn A' : 'John Doe'}
            className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="a@congty.com"
            className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
            {vi ? 'Tên Đơn vị / Công ty' : 'Company Name'}
          </label>
          <input
            name="company"
            placeholder={vi ? 'Công ty CP ABC' : 'ABC Corporation'}
            className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
            {vi ? 'Loại yêu cầu' : 'Inquiry Type'}
          </label>
          <select
            name="kind"
            className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="general">{vi ? 'Thông tin chung' : 'General Inquiry'}</option>
            <option value="enterprise">Enterprise</option>
            <option value="support">{vi ? 'Hỗ trợ khách hàng' : 'Customer Support'}</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
          {vi ? 'Nội dung tin nhắn' : 'Message'} <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          name="message"
          rows={5}
          placeholder={vi ? 'Mô tả nhu cầu của bạn...' : 'Describe your inquiry...'}
          className="w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Honeypot field */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-hover hover:shadow-xl disabled:opacity-60 cursor-pointer"
        >
          <span>{status === 'sending' ? (vi ? 'Đang gửi...' : 'Sending...') : (vi ? 'Gửi yêu cầu' : 'Send Inquiry')}</span>
          <PaperPlaneRight size={16} weight="bold" />
        </button>

        {status === 'sent' && (
          <p className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle size={18} weight="fill" />
            <span>{vi ? 'Yêu cầu đã được ghi nhận.' : 'Inquiry received successfully.'}</span>
          </p>
        )}

        {status === 'error' && (
          <p className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
            <Warning size={18} weight="fill" />
            <span>{vi ? 'Chưa thể gửi form. Vui lòng email support@natime.vn.' : 'Failed to send form. Please email support@natime.vn.'}</span>
          </p>
        )}
      </div>
    </form>
  );
}
