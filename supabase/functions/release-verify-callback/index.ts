import { createClient } from 'npm:@supabase/supabase-js@2.110.2';

const admin = createClient(required('SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false, autoRefreshToken: false } });
const callbackSecret = required('NATIME_RELEASE_CALLBACK_SECRET');
const allowedSigners = new Set(required('NATIME_RELEASE_SIGNER_THUMBPRINTS').split(',').map((item) => item.replace(/\s/g, '').toUpperCase()).filter(Boolean));
Deno.serve(async (request) => {
  if (request.method !== 'POST') return json({ error: 'METHOD_NOT_ALLOWED' }, 405);
  try {
    const raw = await request.text(); const supplied = request.headers.get('x-natime-signature') ?? '';
    const expected = await hmac(raw, callbackSecret); if (!constantTime(supplied.toLowerCase(), expected)) throw new Error('UNAUTHORIZED');
    const body = JSON.parse(raw) as Record<string, unknown>; const releaseId = uuid(body.releaseId); const artifactId = uuid(body.artifactId);
    const sha256 = text(body.sha256).toLowerCase(); if (!/^[0-9a-f]{64}$/.test(sha256)) throw new Error('SHA256_INVALID');
    const signer = text(body.signerThumbprint).replace(/\s/g, '').toUpperCase(); const reportedValid = body.signatureStatus === 'valid'; const sizeBytes = Number(body.sizeBytes);
    const { data: artifact } = await admin.from('release_artifacts').select('size_bytes').eq('id', artifactId).eq('release_id', releaseId).maybeSingle(); if (!artifact) throw new Error('ARTIFACT_NOT_FOUND');
    const valid = reportedValid && allowedSigners.has(signer) && sizeBytes === artifact.size_bytes;
    await admin.from('release_artifacts').update({ sha256, signature_status: valid ? 'valid' : 'invalid', signer_thumbprint: signer || null, verification_details: { reportedStatus: body.signatureStatus, reportedVersion: body.productVersion ?? null, sizeMatches: sizeBytes === artifact.size_bytes } }).eq('id', artifactId);
    await admin.from('software_releases').update({ status: valid ? 'verified' : 'failed', verified_at: valid ? new Date().toISOString() : null }).eq('id', releaseId).eq('status', 'verifying');
    await admin.from('portal_audit_entries').insert({ actor_user_id: null, event_type: valid ? 'release.verification.succeeded' : 'release.verification.failed', target_type: 'software_release', target_id: releaseId, correlation_id: crypto.randomUUID(), after_state: { artifactId, sha256, signer, valid } });
    return json({ accepted: true, valid }, 200);
  } catch (error) { const code = error instanceof Error ? error.message : 'CALLBACK_FAILED'; return json({ error: code }, code === 'UNAUTHORIZED' ? 401 : 400); }
});
async function hmac(value: string, secret: string) { const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']); const bytes = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value)); return Array.from(new Uint8Array(bytes), (item) => item.toString(16).padStart(2, '0')).join(''); }
function constantTime(left: string, right: string) { if (left.length !== right.length) return false; let result = 0; for (let i = 0; i < left.length; i++) result |= left.charCodeAt(i) ^ right.charCodeAt(i); return result === 0; }
function uuid(value: unknown) { const result = text(value); if (!/^[0-9a-f-]{36}$/i.test(result)) throw new Error('ID_INVALID'); return result; }
function text(value: unknown) { if (typeof value !== 'string') throw new Error('VALUE_INVALID'); return value; }
function required(name: string) { const value = Deno.env.get(name); if (!value) throw new Error(`${name}_REQUIRED`); return value; }
function json(body: Record<string, unknown>, status: number) { return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } }); }
