import { createClient } from 'npm:@supabase/supabase-js@2.110.2';
import { adminStatus, requireSuperAdmin } from '../_shared/admin-auth.ts';
import { r2Client, r2Config, r2ObjectUrl } from '../_shared/r2.ts';

const admin = createClient(required('SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false, autoRefreshToken: false } });
const origin = (Deno.env.get('NATIME_PORTAL_ORIGIN') ?? 'https://natime.vn').replace(/\/$/, '');
Deno.serve(async (request) => {
  const cors = headers(); if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  try {
    if (request.method !== 'POST') return json({ error: 'METHOD_NOT_ALLOWED' }, 405, cors);
    const user = await requireSuperAdmin(request, admin); const body = await request.json() as Record<string, unknown>; const releaseId = uuid(body.releaseId); const action = body.action === 'withdraw' ? 'withdraw' : 'publish';
    const { data: release } = await admin.from('software_releases').select('id,version,status,release_artifacts(id,r2_key,filename,sha256,signature_status,public_url)').eq('id', releaseId).maybeSingle(); if (!release) throw new Error('RELEASE_NOT_FOUND');
    const artifact = (release.release_artifacts as Array<{ id: string; r2_key: string; filename: string; sha256: string | null; signature_status: string; public_url: string | null }> | null)?.[0]; if (!artifact) throw new Error('ARTIFACT_NOT_FOUND');
    const config = r2Config(); const client = r2Client(config);
    if (action === 'withdraw') {
      if (release.status !== 'published') throw new Error('RELEASE_NOT_PUBLISHED');
      const deletion = await client.fetch(r2ObjectUrl(config, config.publicBucket, artifact.r2_key), { method: 'DELETE' }); if (!deletion.ok && deletion.status !== 404) throw new Error('R2_WITHDRAW_FAILED');
      await admin.from('release_artifacts').update({ public_url: null }).eq('id', artifact.id); await admin.from('software_releases').update({ status: 'withdrawn', published_at: null }).eq('id', releaseId);
      await audit(user.id, 'release.withdrawn', releaseId, { artifactId: artifact.id }); return json({ releaseId, status: 'withdrawn' }, 200, cors);
    }
    if (release.status !== 'verified' || artifact.signature_status !== 'valid' || !artifact.sha256) throw new Error('RELEASE_NOT_VERIFIED');
    const publicKey = `windows/${release.version}/${artifact.filename}`; const source = `/${config.quarantineBucket}/${artifact.r2_key}`;
    const copy = await client.fetch(r2ObjectUrl(config, config.publicBucket, publicKey), { method: 'PUT', headers: { 'x-amz-copy-source': source } }); if (!copy.ok) throw new Error('R2_PUBLISH_FAILED');
    const head = await client.fetch(r2ObjectUrl(config, config.publicBucket, publicKey), { method: 'HEAD' }); if (!head.ok) throw new Error('R2_PUBLISH_VERIFY_FAILED');
    const publicUrl = `${config.publicOrigin}/${publicKey}`;
    await admin.from('release_artifacts').update({ r2_key: publicKey, public_url: publicUrl }).eq('id', artifact.id); await admin.from('software_releases').update({ status: 'published', published_at: new Date().toISOString() }).eq('id', releaseId).eq('status', 'verified');
    await client.fetch(r2ObjectUrl(config, config.quarantineBucket, artifact.r2_key), { method: 'DELETE' }); await audit(user.id, 'release.published', releaseId, { artifactId: artifact.id, publicUrl });
    return json({ releaseId, status: 'published', publicUrl }, 200, cors);
  } catch (error) { const result = adminStatus(error); return json({ error: result.code }, result.status, cors); }
});
async function audit(actor: string, event: string, target: string, state: Record<string, unknown>) { await admin.from('portal_audit_entries').insert({ actor_user_id: actor, event_type: event, target_type: 'software_release', target_id: target, correlation_id: crypto.randomUUID(), after_state: state }); }
function uuid(value: unknown) { if (typeof value !== 'string' || !/^[0-9a-f-]{36}$/i.test(value)) throw new Error('ID_INVALID'); return value; }
function required(name: string) { const value = Deno.env.get(name); if (!value) throw new Error(`${name}_REQUIRED`); return value; }
function headers(): HeadersInit { return { 'access-control-allow-origin': origin, 'access-control-allow-headers': 'authorization, apikey, content-type, x-client-info', 'access-control-allow-methods': 'POST, OPTIONS', vary: 'Origin' }; }
function json(body: Record<string, unknown>, status: number, headers: HeadersInit) { return new Response(JSON.stringify(body), { status, headers: { ...headers, 'content-type': 'application/json' } }); }
