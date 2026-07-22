import { createClient } from 'npm:@supabase/supabase-js@2.110.2';
import { adminStatus, requireSuperAdmin } from '../_shared/admin-auth.ts';
import { presign, r2Config } from '../_shared/r2.ts';

const admin = createClient(required('SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false, autoRefreshToken: false } });
const origin = (Deno.env.get('NATIME_PORTAL_ORIGIN') ?? 'https://natime.vn').replace(/\/$/, '');
Deno.serve(async (request) => {
  const cors = headers(); if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  try {
    if (request.method !== 'POST') return json({ error: 'METHOD_NOT_ALLOWED' }, 405, cors);
    const user = await requireSuperAdmin(request, admin); const body = await request.json() as Record<string, unknown>;
    const version = text(body.version, 32, 'VERSION_REQUIRED'); if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error('VERSION_INVALID');
    const filename = text(body.filename, 180, 'FILENAME_REQUIRED'); if (!/^[A-Za-z0-9._-]+\.exe$/i.test(filename)) throw new Error('FILENAME_INVALID');
    const sizeBytes = Number(body.sizeBytes); if (!Number.isSafeInteger(sizeBytes) || sizeBytes < 1024 || sizeBytes > 2_500_000_000) throw new Error('SIZE_INVALID');
    const releaseId = crypto.randomUUID(); const artifactId = crypto.randomUUID(); const key = `windows/${version}/${artifactId}-${filename}`;
    const { error: releaseError } = await admin.from('software_releases').insert({ id: releaseId, platform: 'windows', architecture: 'x64', version, status: 'draft', notes_vi: optional(body.notesVi, 4000), notes_en: optional(body.notesEn, 4000), created_by: user.id });
    if (releaseError) throw new Error(releaseError.code === '23505' ? 'VERSION_ALREADY_EXISTS' : 'RELEASE_CREATE_FAILED');
    const { error: artifactError } = await admin.from('release_artifacts').insert({ id: artifactId, release_id: releaseId, r2_key: key, filename, size_bytes: sizeBytes });
    if (artifactError) { await admin.from('software_releases').delete().eq('id', releaseId); throw new Error('ARTIFACT_CREATE_FAILED'); }
    const config = r2Config(); const uploadUrl = await presign(config, config.quarantineBucket, key, 'PUT', 900);
    await audit(user.id, 'release.upload.initialized', releaseId, { artifactId, filename, sizeBytes });
    return json({ releaseId, artifactId, uploadUrl }, 201, cors);
  } catch (error) { const result = adminStatus(error); return json({ error: result.code }, result.status, cors); }
});
async function audit(actor: string, event: string, target: string, state: Record<string, unknown>) { await admin.from('portal_audit_entries').insert({ actor_user_id: actor, event_type: event, target_type: 'software_release', target_id: target, correlation_id: crypto.randomUUID(), after_state: state }); }
function text(value: unknown, max: number, code: string) { if (typeof value !== 'string' || !value.trim() || value.trim().length > max) throw new Error(code); return value.trim(); }
function optional(value: unknown, max: number) { return typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : null; }
function required(name: string) { const value = Deno.env.get(name); if (!value) throw new Error(`${name}_REQUIRED`); return value; }
function headers(): HeadersInit { return { 'access-control-allow-origin': origin, 'access-control-allow-headers': 'authorization, apikey, content-type, x-client-info', 'access-control-allow-methods': 'POST, OPTIONS', vary: 'Origin' }; }
function json(body: Record<string, unknown>, status: number, headers: HeadersInit) { return new Response(JSON.stringify(body), { status, headers: { ...headers, 'content-type': 'application/json' } }); }
