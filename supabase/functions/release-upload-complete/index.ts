import { createClient } from 'npm:@supabase/supabase-js@2.110.2';
import { adminStatus, requireSuperAdmin } from '../_shared/admin-auth.ts';
import { presign, r2Client, r2Config, r2ObjectUrl } from '../_shared/r2.ts';

const admin = createClient(required('SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false, autoRefreshToken: false } });
const origin = (Deno.env.get('NATIME_PORTAL_ORIGIN') ?? 'https://natime.vn').replace(/\/$/, '');
Deno.serve(async (request) => {
  const cors = headers(); if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  try {
    if (request.method !== 'POST') return json({ error: 'METHOD_NOT_ALLOWED' }, 405, cors);
    const user = await requireSuperAdmin(request, admin); const body = await request.json() as Record<string, unknown>;
    const releaseId = uuid(body.releaseId); const artifactId = uuid(body.artifactId);
    const { data: artifact } = await admin.from('release_artifacts').select('id,release_id,r2_key,size_bytes,software_releases(version,status)').eq('id', artifactId).eq('release_id', releaseId).maybeSingle();
    if (!artifact) throw new Error('ARTIFACT_NOT_FOUND');
    const config = r2Config(); const client = r2Client(config); const head = await client.fetch(r2ObjectUrl(config, config.quarantineBucket, artifact.r2_key), { method: 'HEAD' });
    if (!head.ok) throw new Error('R2_OBJECT_NOT_FOUND');
    const actualSize = Number(head.headers.get('content-length')); if (actualSize !== artifact.size_bytes) throw new Error('R2_SIZE_MISMATCH');
    const release = Array.isArray(artifact.software_releases) ? artifact.software_releases[0] : artifact.software_releases as unknown as { version: string };
    await admin.from('software_releases').update({ status: 'verifying' }).eq('id', releaseId).in('status', ['draft', 'uploaded']);
    const downloadUrl = await presign(config, config.quarantineBucket, artifact.r2_key, 'GET', 3600);
    const repository = required('NATIME_RELEASE_REPOSITORY'); const githubToken = required('GITHUB_RELEASE_TOKEN'); const callbackUrl = `${required('SUPABASE_URL')}/functions/v1/release-verify-callback`;
    const dispatch = await fetch(`https://api.github.com/repos/${repository}/actions/workflows/verify-release.yml/dispatches`, { method: 'POST', headers: { authorization: `Bearer ${githubToken}`, accept: 'application/vnd.github+json', 'content-type': 'application/json', 'x-github-api-version': '2022-11-28' }, body: JSON.stringify({ ref: 'main', inputs: { release_id: releaseId, artifact_id: artifactId, expected_version: release.version, expected_size: String(artifact.size_bytes), download_url: downloadUrl, callback_url: callbackUrl } }) });
    if (!dispatch.ok) { await admin.from('software_releases').update({ status: 'failed' }).eq('id', releaseId); throw new Error('GITHUB_DISPATCH_FAILED'); }
    await admin.from('portal_audit_entries').insert({ actor_user_id: user.id, event_type: 'release.verification.started', target_type: 'software_release', target_id: releaseId, correlation_id: crypto.randomUUID(), after_state: { artifactId, actualSize } });
    return json({ releaseId, status: 'verifying' }, 202, cors);
  } catch (error) { const result = adminStatus(error); return json({ error: result.code }, result.status, cors); }
});
function uuid(value: unknown) { if (typeof value !== 'string' || !/^[0-9a-f-]{36}$/i.test(value)) throw new Error('ID_INVALID'); return value; }
function required(name: string) { const value = Deno.env.get(name); if (!value) throw new Error(`${name}_REQUIRED`); return value; }
function headers(): HeadersInit { return { 'access-control-allow-origin': origin, 'access-control-allow-headers': 'authorization, apikey, content-type, x-client-info', 'access-control-allow-methods': 'POST, OPTIONS', vary: 'Origin' }; }
function json(body: Record<string, unknown>, status: number, headers: HeadersInit) { return new Response(JSON.stringify(body), { status, headers: { ...headers, 'content-type': 'application/json' } }); }
