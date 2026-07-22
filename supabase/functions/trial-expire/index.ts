import { createClient } from 'npm:@supabase/supabase-js@2.110.2';

const admin = createClient(required('SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), {
  auth: { persistSession: false, autoRefreshToken: false },
});
const schedulerSecret = required('NATIME_SCHEDULER_SECRET');

Deno.serve(async (request) => {
  if (request.method !== 'POST') return json({ error: 'METHOD_NOT_ALLOWED' }, 405);
  const supplied = request.headers.get('x-natime-scheduler-secret') ?? '';
  if (!constantTime(supplied, schedulerSecret)) return json({ error: 'UNAUTHORIZED' }, 401);

  const { data, error } = await admin.rpc('expire_license_trials');
  if (error) return json({ error: 'TRIAL_EXPIRY_FAILED' }, 500);
  return json({ expired: Number(data ?? 0) }, 200);
});

function constantTime(left: string, right: string) {
  const encoder = new TextEncoder();
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  const size = Math.max(leftBytes.length, rightBytes.length);
  let difference = leftBytes.length ^ rightBytes.length;
  for (let index = 0; index < size; index++) difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  return difference === 0;
}

function required(name: string) {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`${name}_REQUIRED`);
  return value;
}

function json(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}
