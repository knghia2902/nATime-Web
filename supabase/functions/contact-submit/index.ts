import { createClient } from 'npm:@supabase/supabase-js@2.110.2';

type JsonRecord = Record<string, unknown>;

const supabaseUrl = requireEnv('SUPABASE_URL');
const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
const resendApiKey = Deno.env.get('RESEND_API_KEY');
const ipSalt = Deno.env.get('NATIME_CONTACT_IP_SALT') ?? 'natime-contact-ip-salt-default';
const portalOrigin = (Deno.env.get('NATIME_PORTAL_ORIGIN') ?? 'https://natime.vn').replace(/\/$/, '');
const supportEmail = Deno.env.get('NATIME_SUPPORT_EMAIL') ?? 'support@natime.vn';
const fromEmail = Deno.env.get('NATIME_CONTACT_FROM') ?? 'nATime Website <no-reply@natime.vn>';

const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });

Deno.serve(async (request) => {
  const cors = corsHeaders(request.headers.get('origin'));
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (request.method !== 'POST') return json({ error: 'METHOD_NOT_ALLOWED' }, 405, cors);

  try {
    const body = await request.json() as JsonRecord;
    const idempotencyKey = required(body.idempotencyKey, 128, 'IDEMPOTENCY_KEY_REQUIRED');
    if (!/^[A-Za-z0-9_-]{16,128}$/.test(idempotencyKey)) throw new Error('IDEMPOTENCY_KEY_INVALID');

    const name = required(body.name, 120, 'NAME_REQUIRED');
    const email = required(body.email, 254, 'EMAIL_REQUIRED').toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('EMAIL_INVALID');

    const company = optional(body.company, 160);
    const kind = required(body.kind, 20, 'KIND_REQUIRED');
    if (!['general', 'enterprise', 'support'].includes(kind)) throw new Error('KIND_INVALID');

    const message = required(body.message, 4000, 'MESSAGE_REQUIRED');
    const remoteIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const sourceIpHash = await sha256(`${ipSalt}:${remoteIp}`);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { count, error: rateLimitError } = await admin.from('contact_requests').select('id', { count: 'exact', head: true }).eq('source_ip_hash', sourceIpHash).gte('created_at', oneHourAgo);
    if (rateLimitError) throw new Error('RATE_LIMIT_CHECK_FAILED');
    if ((count ?? 0) >= 5) throw new Error('RATE_LIMITED');

    const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    const user = token ? (await admin.auth.getUser(token)).data.user : null;

    const { data: saved, error: saveError } = await admin.from('contact_requests').insert({ idempotency_key: idempotencyKey, user_id: user?.id ?? null, name, email, company, kind, message, source_ip_hash: sourceIpHash }).select('id').single();
    if (saveError?.code === '23505') {
      const { data: existing } = await admin.from('contact_requests').select('id').eq('idempotency_key', idempotencyKey).maybeSingle();
      return json({ requestId: existing?.id ?? null, duplicate: true }, 200, cors);
    }
    if (saveError || !saved) throw new Error('CONTACT_SAVE_FAILED');

    let emailNotified = false;
    const smtpPass = Deno.env.get('NATIME_SMTP_PASS');
    const smtpHost = Deno.env.get('NATIME_SMTP_HOST') ?? 'mail92227.maychuemail.com';
    const smtpPort = parseInt(Deno.env.get('NATIME_SMTP_PORT') ?? '465', 10);
    const smtpUser = Deno.env.get('NATIME_SMTP_USER') ?? 'support@natime.vn';

    if (resendApiKey) {
      try {
        const mail = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { authorization: `Bearer ${resendApiKey}`, 'content-type': 'application/json' },
          body: JSON.stringify({ from: fromEmail, to: [supportEmail], reply_to: email, subject: `[nATime] ${kind}: ${name}`, text: `Request: ${saved.id}\nName: ${name}\nEmail: ${email}\nCompany: ${company ?? '-'}\nType: ${kind}\n\n${message}` })
        });
        emailNotified = mail.ok;
      } catch {
        emailNotified = false;
      }
    } else if (smtpPass) {
      try {
        const nodemailer = await import('npm:nodemailer@6.9.16');
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: { user: smtpUser, pass: smtpPass },
          tls: { rejectUnauthorized: false }
        });

        await transporter.sendMail({
          from: `"nATime Website" <${smtpUser}>`,
          to: supportEmail,
          replyTo: email,
          subject: `[nATime Liên Hệ] ${kind.toUpperCase()}: ${name}`,
          text: `Yêu cầu hỗ trợ mới từ Website nATime:\n\nMã yêu cầu: ${saved.id}\nHọ và tên: ${name}\nEmail khách hàng: ${email}\nĐơn vị/Công ty: ${company ?? '-'}\nPhân loại: ${kind}\n\nNội dung:\n${message}`
        });
        emailNotified = true;
      } catch (err) {
        console.error('SMTP Send Error:', err);
        emailNotified = false;
      }
    }

    return json({ requestId: saved.id, emailNotified }, 201, cors);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'CONTACT_FAILED';
    return json({ error: message }, message === 'RATE_LIMITED' ? 429 : 400, cors);
  }
});

function required(value: unknown, max: number, code: string) { if (typeof value !== 'string' || !value.trim() || value.trim().length > max) throw new Error(code); return value.trim(); }
function optional(value: unknown, max: number) { if (value == null || value === '') return null; if (typeof value !== 'string' || value.trim().length > max) throw new Error('VALUE_INVALID'); return value.trim(); }
async function sha256(value: string) { const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)); return Array.from(new Uint8Array(bytes), (item) => item.toString(16).padStart(2, '0')).join(''); }
function requireEnv(name: string) { const value = Deno.env.get(name); if (!value) throw new Error(`${name} is required`); return value; }
function corsHeaders(origin: string | null): HeadersInit {
  const allowed = origin && (origin.endsWith('natime.vn') || origin.includes('localhost')) ? origin : portalOrigin;
  return {
    'access-control-allow-origin': allowed,
    'access-control-allow-headers': 'authorization, apikey, content-type, x-client-info',
    'access-control-allow-methods': 'POST, OPTIONS',
    'vary': 'Origin'
  };
}
function json(body: JsonRecord, status: number, headers: HeadersInit) { return new Response(JSON.stringify(body), { status, headers: { ...headers, 'content-type': 'application/json; charset=utf-8' } }); }
