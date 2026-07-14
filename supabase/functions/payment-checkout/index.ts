import { createClient } from 'npm:@supabase/supabase-js@2.110.2';
import { payOsSignature } from '../_shared/payos.ts';

type JsonRecord = Record<string, unknown>;

const supabaseUrl = requireEnv('SUPABASE_URL');
const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
const payOsClientId = requireEnv('PAYOS_CLIENT_ID');
const payOsApiKey = requireEnv('PAYOS_API_KEY');
const payOsChecksumKey = requireEnv('PAYOS_CHECKSUM_KEY');
const portalOrigin = (Deno.env.get('NATIME_PORTAL_ORIGIN') ?? 'https://natime.vn').replace(/\/$/, '');
const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

Deno.serve(async (request) => {
  const cors = corsHeaders(request.headers.get('origin'));
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (request.method !== 'POST') return json({ error: 'METHOD_NOT_ALLOWED' }, 405, cors);

  try {
    const user = await authenticatedUser(request);
    const body = await request.json() as JsonRecord;
    const planCode = requiredChoice(body.planCode, ['standard', 'professional'], 'PLAN_INVALID');
    const billingPeriod = requiredChoice(body.billingPeriod, ['monthly', 'yearly'], 'BILLING_PERIOD_INVALID');
    const idempotencyKey = requiredString(body.idempotencyKey, 'IDEMPOTENCY_KEY_REQUIRED', 80);
    if (!/^[A-Za-z0-9_-]{16,80}$/.test(idempotencyKey)) throw new Error('IDEMPOTENCY_KEY_INVALID');

    const externalReference = `checkout:${user.id}:${idempotencyKey}`;
    const { data: existing } = await admin
      .from('license_orders')
      .select('id, status, checkout_url')
      .eq('external_reference', externalReference)
      .maybeSingle();
    if (existing?.checkout_url && existing.status === 'pending') {
      return json({ orderId: existing.id, checkoutUrl: existing.checkout_url, status: existing.status }, 200, cors);
    }
    if (existing) return json({ error: 'CHECKOUT_ALREADY_PROCESSED', status: existing.status }, 409, cors);

    const { data: product } = await admin
      .from('license_products')
      .select('amount_vnd')
      .eq('plan_code', planCode)
      .eq('billing_period', billingPeriod)
      .eq('is_active', true)
      .maybeSingle();
    if (!product) throw new Error('PRODUCT_NOT_AVAILABLE');

    const orderCode = Date.now() * 1000 + crypto.getRandomValues(new Uint16Array(1))[0] % 1000;
    const { data: order, error: orderError } = await admin.from('license_orders').insert({
      user_id: user.id,
      external_reference: externalReference,
      plan_code: planCode,
      billing_period: billingPeriod,
      amount_vnd: product.amount_vnd,
      status: 'pending',
      payment_provider: 'payos',
      provider_order_code: orderCode,
    }).select('id').single();
    if (orderError || !order) throw new Error('ORDER_CREATE_FAILED');

    const description = `NT${String(orderCode).slice(-7)}`;
    const cancelUrl = `${portalOrigin}/dashboard?payment=cancel&order=${order.id}`;
    const returnUrl = `${portalOrigin}/dashboard?payment=success&order=${order.id}`;
    const signatureData = {
      amount: product.amount_vnd,
      cancelUrl,
      description,
      orderCode,
      returnUrl,
    };
    const signature = await payOsSignature(signatureData, payOsChecksumKey);

    const payOsResponse = await fetch('https://api-merchant.payos.vn/v2/payment-requests', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-client-id': payOsClientId,
        'x-api-key': payOsApiKey,
      },
      body: JSON.stringify({
        ...signatureData,
        buyerName: user.user_metadata?.name ?? undefined,
        buyerEmail: user.email ?? undefined,
        items: [{
          name: `nATime ${planCode} ${billingPeriod}`,
          quantity: 1,
          price: product.amount_vnd,
        }],
        expiredAt: Math.floor(Date.now() / 1000) + 15 * 60,
        signature,
      }),
    });
    const payOsBody = await payOsResponse.json() as JsonRecord;
    const payOsData = payOsBody.data as JsonRecord | undefined;
    const checkoutUrl = typeof payOsData?.checkoutUrl === 'string' ? payOsData.checkoutUrl : null;
    const paymentLinkId = typeof payOsData?.paymentLinkId === 'string' ? payOsData.paymentLinkId : null;
    if (!payOsResponse.ok || payOsBody.code !== '00' || !checkoutUrl || !paymentLinkId) {
      await admin.from('license_orders').update({ status: 'failed' }).eq('id', order.id);
      throw new Error('PAYOS_CREATE_LINK_FAILED');
    }

    const { error: updateError } = await admin.from('license_orders').update({
      checkout_url: checkoutUrl,
      payment_link_id: paymentLinkId,
    }).eq('id', order.id).eq('status', 'pending');
    if (updateError) throw new Error('ORDER_UPDATE_FAILED');

    await admin.from('license_audit_entries').insert({
      user_id: user.id,
      event_type: 'payment.checkout.created',
      correlation_id: idempotencyKey,
      details: { orderId: order.id, provider: 'payos', planCode, billingPeriod },
    });
    return json({ orderId: order.id, checkoutUrl, status: 'pending' }, 201, cors);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'CHECKOUT_FAILED';
    return json({ error: message }, message === 'UNAUTHORIZED' ? 401 : 400, cors);
  }
});

async function authenticatedUser(request: Request) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) throw new Error('UNAUTHORIZED');
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) throw new Error('UNAUTHORIZED');
  return data.user;
}

function requiredChoice(value: unknown, choices: string[], code: string): string {
  if (typeof value !== 'string' || !choices.includes(value)) throw new Error(code);
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

function corsHeaders(origin: string | null): HeadersInit {
  return {
    'access-control-allow-origin': origin === portalOrigin ? portalOrigin : portalOrigin,
    'access-control-allow-headers': 'authorization, apikey, content-type, x-client-info',
    'access-control-allow-methods': 'POST, OPTIONS',
    'vary': 'Origin',
  };
}

function json(body: JsonRecord, status: number, headers: HeadersInit): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, 'content-type': 'application/json; charset=utf-8' },
  });
}
