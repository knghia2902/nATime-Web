import { createClient } from 'npm:@supabase/supabase-js@2.110.2';
import { payOsSignature, secureHexEquals, sha256 } from '../_shared/payos.ts';

type JsonRecord = Record<string, unknown>;

const supabaseUrl = requireEnv('SUPABASE_URL');
const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
const checksumKey = requireEnv('PAYOS_CHECKSUM_KEY');
const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

Deno.serve(async (request) => {
  if (request.method !== 'POST') return response({ error: 'METHOD_NOT_ALLOWED' }, 405);

  let rawBody = '';
  try {
    rawBody = await request.text();
    if (rawBody.length > 64 * 1024) return response({ error: 'PAYLOAD_TOO_LARGE' }, 413);
    const payload = JSON.parse(rawBody) as JsonRecord;
    const data = payload.data as JsonRecord | undefined;
    const suppliedSignature = typeof payload.signature === 'string' ? payload.signature : '';
    if (!data || !suppliedSignature) return response({ error: 'WEBHOOK_INVALID' }, 400);

    const expectedSignature = await payOsSignature(data, checksumKey);
    if (!secureHexEquals(expectedSignature, suppliedSignature)) {
      return response({ error: 'SIGNATURE_INVALID' }, 401);
    }

    if (payload.success !== true || data.code !== '00') {
      return response({ received: true, status: 'ignored' }, 200);
    }

    const orderCode = safeInteger(data.orderCode, 'ORDER_CODE_INVALID');
    const amount = safeInteger(data.amount, 'AMOUNT_INVALID');
    const paymentLinkId = requiredString(data.paymentLinkId, 'PAYMENT_LINK_ID_REQUIRED', 80);
    const reference = requiredString(data.reference, 'REFERENCE_REQUIRED', 120);
    const eventId = `${paymentLinkId}:${reference}:${String(data.code)}`;
    const payloadHash = await sha256(rawBody);

    const { data: result, error } = await admin.rpc('process_payos_payment', {
      p_provider_event_id: eventId,
      p_payload_sha256: payloadHash,
      p_order_code: orderCode,
      p_amount_vnd: amount,
      p_payment_link_id: paymentLinkId,
      p_reference: reference,
    });
    if (error) return response({ error: 'PAYMENT_PROCESSING_FAILED' }, 500);

    return response({ received: true, status: result }, 200);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'WEBHOOK_INVALID';
    return response({ error: message }, 400);
  }
});

function safeInteger(value: unknown, code: string): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) throw new Error(code);
  return value;
}

function requiredString(value: unknown, code: string, maxLength: number): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > maxLength) throw new Error(code);
  return value.trim();
}

function requireEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function response(body: JsonRecord, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
