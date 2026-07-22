import { createClient } from 'npm:@supabase/supabase-js@2.110.2';

const supabaseUrl = requireEnv('SUPABASE_URL');
const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
const portalOrigin = (Deno.env.get('NATIME_PORTAL_ORIGIN') ?? 'https://natime.vn').replace(/\/$/, '');
const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });

Deno.serve(async (request) => {
  const cors = corsHeaders(request.headers.get('origin'));
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (request.method !== 'POST') return json({ error: 'METHOD_NOT_ALLOWED' }, 405, cors);
  try {
    const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    if (!token) throw new Error('UNAUTHORIZED');
    const { data, error } = await admin.auth.getUser(token);
    if (error || !data.user || !data.user.email_confirmed_at) throw new Error('VERIFIED_ACCOUNT_REQUIRED');
    const { data: entitlement, error: claimError } = await admin.rpc('claim_license_trial', { p_user_id: data.user.id });
    if (claimError) throw new Error(claimError.message);
    return json({ entitlementId: entitlement.id, status: entitlement.status, expiresAt: entitlement.expires_at }, 201, cors);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'TRIAL_CLAIM_FAILED';
    const status = message === 'UNAUTHORIZED' || message === 'VERIFIED_ACCOUNT_REQUIRED' ? 401 : message.includes('ALREADY') ? 409 : 400;
    return json({ error: message }, status, cors);
  }
});

function requireEnv(name: string) { const value = Deno.env.get(name); if (!value) throw new Error(`${name} is required`); return value; }
function corsHeaders(origin: string | null): HeadersInit { return { 'access-control-allow-origin': origin === portalOrigin ? portalOrigin : portalOrigin, 'access-control-allow-headers': 'authorization, apikey, content-type, x-client-info', 'access-control-allow-methods': 'POST, OPTIONS', vary: 'Origin' }; }
function json(body: Record<string, unknown>, status: number, headers: HeadersInit) { return new Response(JSON.stringify(body), { status, headers: { ...headers, 'content-type': 'application/json; charset=utf-8' } }); }
