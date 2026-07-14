import { createClient } from 'npm:@supabase/supabase-js@2.110.2';
import { secureStringEquals } from '../_shared/license.ts';
import { payOsSignature } from '../_shared/payos.ts';

type JsonRecord = Record<string, unknown>;

const TEST_AMOUNT_VND = 3000;
const supabaseUrl = requireEnv('SUPABASE_URL');
const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
const payOsClientId = requireEnv('PAYOS_CLIENT_ID');
const payOsApiKey = requireEnv('PAYOS_API_KEY');
const payOsChecksumKey = requireEnv('PAYOS_CHECKSUM_KEY');
const operatorKey = requireEnv('NATIME_PAYMENT_TEST_KEY');
const testEmail = requireEnv('NATIME_PAYMENT_TEST_EMAIL').trim().toLowerCase();
const portalOrigin = (Deno.env.get('NATIME_PORTAL_ORIGIN') ?? 'https://natime.vn').replace(/\/$/, '');

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

Deno.serve(async (request) => {
  if (request.method !== 'POST') return json({ error: 'METHOD_NOT_ALLOWED' }, 405);

  try {
    requireOperator(request);
    const body = await request.json() as JsonRecord;
    const action = body.action;
    if (action === 'create') return await createTestCheckout();
    if (action === 'status') return await testOrderStatus(requiredUuid(body.orderId));
    if (action === 'cleanup') return await cleanupTestEntitlement(requiredUuid(body.orderId));
    return json({ error: 'ACTION_INVALID' }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'INTERNAL_ERROR';
    const status = message === 'UNAUTHORIZED' ? 401 : message.endsWith('_NOT_FOUND') ? 404 : 400;
    return json({ error: message }, status);
  }
});

async function createTestCheckout(): Promise<Response> {
  const user = await findUserByEmail(testEmail);
  const orderCode = Date.now() * 1000 + crypto.getRandomValues(new Uint16Array(1))[0] % 1000;
  const correlationId = crypto.randomUUID();
  const externalReference = `payment-test:${user.id}:${correlationId}`;

  const { data: order, error: orderError } = await admin.from('license_orders').insert({
    user_id: user.id,
    external_reference: externalReference,
    plan_code: 'standard',
    billing_period: 'yearly',
    amount_vnd: TEST_AMOUNT_VND,
    status: 'pending',
    payment_provider: 'payos',
    provider_order_code: orderCode,
  }).select('id').single();
  if (orderError || !order) throw new Error('ORDER_CREATE_FAILED');

  const description = `NT${String(orderCode).slice(-7)}`;
  const cancelUrl = `${portalOrigin}/dashboard?payment=cancel&order=${order.id}`;
  const returnUrl = `${portalOrigin}/dashboard?payment=success&order=${order.id}`;
  const signatureData = {
    amount: TEST_AMOUNT_VND,
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
      buyerEmail: testEmail,
      items: [{ name: 'nATime webhook test', quantity: 1, price: TEST_AMOUNT_VND }],
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
    event_type: 'payment.test_checkout.created',
    correlation_id: correlationId,
    details: { orderId: order.id, amountVnd: TEST_AMOUNT_VND, provider: 'payos' },
  });

  return json({ orderId: order.id, amountVnd: TEST_AMOUNT_VND, checkoutUrl, expiresInSeconds: 900 }, 201);
}

async function testOrderStatus(orderId: string): Promise<Response> {
  const order = await getTestOrder(orderId);
  const { data: entitlement } = await admin
    .from('license_entitlements')
    .select('id, status')
    .eq('order_id', order.id)
    .maybeSingle();
  return json({
    orderId: order.id,
    orderStatus: order.status,
    entitlementId: entitlement?.id ?? null,
    entitlementStatus: entitlement?.status ?? null,
  }, 200);
}

async function cleanupTestEntitlement(orderId: string): Promise<Response> {
  const order = await getTestOrder(orderId);
  const { data: entitlement, error } = await admin
    .from('license_entitlements')
    .update({ status: 'revoked' })
    .eq('order_id', order.id)
    .select('id, status')
    .maybeSingle();
  if (error) throw new Error('ENTITLEMENT_CLEANUP_FAILED');
  if (!entitlement) throw new Error('ENTITLEMENT_NOT_FOUND');

  await admin.from('license_audit_entries').insert({
    user_id: order.user_id,
    entitlement_id: entitlement.id,
    event_type: 'payment.test_entitlement.revoked',
    correlation_id: crypto.randomUUID(),
    details: { orderId: order.id, amountVnd: TEST_AMOUNT_VND },
  });
  return json({ orderId: order.id, entitlementId: entitlement.id, entitlementStatus: entitlement.status }, 200);
}

async function getTestOrder(orderId: string) {
  const { data: order, error } = await admin
    .from('license_orders')
    .select('id, user_id, status, external_reference, amount_vnd')
    .eq('id', orderId)
    .maybeSingle();
  if (error || !order) throw new Error('ORDER_NOT_FOUND');
  if (!order.external_reference?.startsWith('payment-test:') || order.amount_vnd !== TEST_AMOUNT_VND) {
    throw new Error('ORDER_NOT_FOUND');
  }
  return order;
}

async function findUserByEmail(email: string) {
  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error('USER_LOOKUP_FAILED');
    const user = data.users.find((candidate) => candidate.email?.toLowerCase() === email);
    if (user) return user;
    if (data.users.length < 1000) break;
  }
  throw new Error('USER_NOT_FOUND');
}

function requireOperator(request: Request): void {
  const supplied = request.headers.get('x-payment-test-key') ?? '';
  if (!secureStringEquals(supplied, operatorKey)) throw new Error('UNAUTHORIZED');
}

function requiredUuid(value: unknown): string {
  if (typeof value !== 'string' || !/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(value)) {
    throw new Error('ORDER_ID_INVALID');
  }
  return value.toLowerCase();
}

function requireEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function json(body: JsonRecord, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}
