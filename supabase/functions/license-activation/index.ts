import { createClient } from 'npm:@supabase/supabase-js@2.110.2';

type JsonRecord = Record<string, unknown>;

const supabaseUrl = requireEnv('SUPABASE_URL');
const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
const authorityUrl = requireEnv('NATIME_LICENSE_AUTHORITY_URL').replace(/\/$/, '');
const authorityOperatorKey = requireEnv('NATIME_LICENSE_OPERATOR_KEY');
const ipHashSalt = requireEnv('NATIME_ACTIVATION_IP_SALT');
const allowedOrigins = new Set(
  (Deno.env.get('NATIME_PORTAL_ORIGINS') ?? 'https://natime.vn')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean),
);

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

Deno.serve(async (request) => {
  const origin = request.headers.get('origin');
  const cors = corsHeaders(origin);

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }
  if (request.method !== 'POST') {
    return json({ error: 'METHOD_NOT_ALLOWED' }, 405, cors);
  }

  try {
    const body = await request.json() as JsonRecord;
    switch (body.action) {
      case 'request':
        return await requestActivation(request, body, cors);
      case 'approve':
        return await approveActivation(request, body, cors);
      case 'poll':
        return await pollActivation(body, cors);
      default:
        return json({ error: 'INVALID_ACTION' }, 400, cors);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR';
    return json({ error: message }, 400, cors);
  }
});

async function requestActivation(
  request: Request,
  body: JsonRecord,
  cors: HeadersInit,
): Promise<Response> {
  const hardwareId = requiredString(body.hardwareId, 'HARDWARE_ID_REQUIRED', 256);
  const displayName = optionalString(body.displayName, 120);
  const suppliedDeviceCode = optionalString(body.deviceCode, 128);
  const deviceCode = suppliedDeviceCode ?? randomToken(32);
  if (deviceCode.length < 32) throw new Error('DEVICE_CODE_TOO_SHORT');

  const deviceCodeHash = await sha256Hex(deviceCode);
  const idempotencyKey = `activation:${deviceCodeHash}`;
  const userCode = randomUserCode();
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const requestedIpHash = await sha256Hex(`${ipHashSalt}:${forwardedFor}`);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const { error } = await admin.from('license_activation_requests').insert({
    device_code_hash: `\\x${deviceCodeHash}`,
    user_code: userCode,
    hardware_id: hardwareId,
    display_name: displayName,
    requested_ip_hash: requestedIpHash,
    idempotency_key: idempotencyKey,
    expires_at: expiresAt,
  });

  if (error) {
    const { data: existing } = await admin
      .from('license_activation_requests')
      .select('user_code, expires_at, status')
      .eq('device_code_hash', `\\x${deviceCodeHash}`)
      .maybeSingle();
    if (!existing) throw new Error('ACTIVATION_REQUEST_FAILED');
    return json({
      deviceCode,
      userCode: existing.user_code,
      verificationUri: 'https://natime.vn/dashboard?tab=licenses',
      expiresAt: existing.expires_at,
      status: existing.status,
      intervalSeconds: 5,
    }, 200, cors);
  }

  await writeAudit('activation.requested', idempotencyKey, null, null, {
    displayName,
  });

  return json({
    deviceCode,
    userCode,
    verificationUri: 'https://natime.vn/dashboard?tab=licenses',
    expiresAt,
    status: 'pending',
    intervalSeconds: 5,
  }, 201, cors);
}

async function approveActivation(
  request: Request,
  body: JsonRecord,
  cors: HeadersInit,
): Promise<Response> {
  const user = await authenticatedUser(request);
  const userCode = requiredString(body.userCode, 'USER_CODE_REQUIRED', 32).toUpperCase();
  const entitlementId = requiredString(body.entitlementId, 'ENTITLEMENT_REQUIRED', 64);

  const { data: entitlement, error: entitlementError } = await admin
    .from('license_entitlements')
    .select('id, plan_code, status, max_employees, max_devices, enabled_modules, expires_at')
    .eq('id', entitlementId)
    .eq('user_id', user.id)
    .maybeSingle();
  if (entitlementError || !entitlement) throw new Error('ENTITLEMENT_NOT_FOUND');

  const { data: reservedRows, error: reserveError } = await admin.rpc(
    'reserve_license_activation',
    { p_user_id: user.id, p_entitlement_id: entitlementId, p_user_code: userCode },
  );
  if (reserveError || !reservedRows?.length) {
    throw new Error(reserveError?.message ?? 'ACTIVATION_RESERVATION_FAILED');
  }

  const activation = reservedRows[0];
  const correlationId = activation.idempotency_key as string;
  const hardwareIdHash = await sha256Hex(String(activation.hardware_id));
  const { data: existingInstallation, error: existingInstallationError } = await admin
    .from('license_installations')
    .select('id, authority_license_id')
    .eq('entitlement_id', entitlementId)
    .eq('hardware_id_hash', hardwareIdHash)
    .maybeSingle();
  if (existingInstallationError) {
    await markActivationFailed(activation.id, 'INSTALLATION_LOOKUP_FAILED', null);
    throw new Error('INSTALLATION_LOOKUP_FAILED');
  }

  try {
    const authorityResponse = await fetch(`${authorityUrl}/v1/licenses`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-licensing-admin-key': authorityOperatorKey,
        'idempotency-key': correlationId,
      },
      body: JSON.stringify({
        activationRequestId: activation.id,
        customerName: user.email ?? user.id,
        productTier: entitlement.plan_code,
        maxEmployees: entitlement.max_employees,
        maxDevices: entitlement.max_devices,
        expiresAtUtc: entitlement.expires_at,
        enabledModules: entitlement.enabled_modules,
        hardwareId: activation.hardware_id,
      }),
    });
    if (!authorityResponse.ok) throw new Error(`AUTHORITY_${authorityResponse.status}`);

    const issued = await authorityResponse.json() as JsonRecord;
    const authorityLicenseId = String(issued.licenseId ?? issued.LicenseId ?? '');
    const licenseKey = String(issued.licenseKey ?? issued.LicenseKey ?? '');
    if (!authorityLicenseId || !licenseKey) throw new Error('AUTHORITY_RESPONSE_INVALID');

    const installationMutation = existingInstallation
      ? admin.from('license_installations').update({
        authority_license_id: authorityLicenseId,
        display_name: activation.display_name,
        status: 'active',
        activated_at: new Date().toISOString(),
        revoked_at: null,
      }).eq('id', existingInstallation.id)
      : admin.from('license_installations').insert({
        entitlement_id: entitlementId,
        authority_license_id: authorityLicenseId,
        hardware_id_hash: hardwareIdHash,
        display_name: activation.display_name,
      });
    const { error: installationError } = await installationMutation;
    if (installationError) {
      await markActivationFailed(activation.id, 'RECONCILIATION_REQUIRED', authorityLicenseId);
      throw new Error('RECONCILIATION_REQUIRED');
    }

    const approvedAt = new Date().toISOString();
    const { error: updateError } = await admin
      .from('license_activation_requests')
      .update({
        status: 'approved',
        authority_license_id: authorityLicenseId,
        result_license_key: licenseKey,
        approved_at: approvedAt,
      })
      .eq('id', activation.id)
      .eq('status', 'processing');
    if (updateError) {
      await markActivationFailed(activation.id, 'RECONCILIATION_REQUIRED', authorityLicenseId);
      throw new Error('RECONCILIATION_REQUIRED');
    }

    await writeAudit(existingInstallation ? 'activation.reissued' : 'activation.approved', correlationId, user.id, entitlementId, {
      activationRequestId: activation.id,
      authorityLicenseId,
      replacedAuthorityLicenseId: existingInstallation?.authority_license_id ?? null,
    });

    if (existingInstallation?.authority_license_id
      && existingInstallation.authority_license_id !== authorityLicenseId) {
      try {
        const revokeResponse = await fetch(
          `${authorityUrl}/v1/licenses/${existingInstallation.authority_license_id}/revoke`,
          {
            method: 'POST',
            headers: {
              'x-licensing-admin-key': authorityOperatorKey,
              'idempotency-key': `${correlationId}:replace`,
            },
          },
        );
        if (!revokeResponse.ok) {
          await writeAudit('activation.reissue_revoke_failed', correlationId, user.id, entitlementId, {
            activationRequestId: activation.id,
            authorityLicenseId: existingInstallation.authority_license_id,
            responseStatus: revokeResponse.status,
          });
        }
      } catch {
        await writeAudit('activation.reissue_revoke_failed', correlationId, user.id, entitlementId, {
          activationRequestId: activation.id,
          authorityLicenseId: existingInstallation.authority_license_id,
          errorCode: 'REVOKE_REQUEST_FAILED',
        });
      }
    }
    return json({ status: 'approved', activationRequestId: activation.id }, 200, cors);
  } catch (error) {
    const code = error instanceof Error ? error.message : 'ACTIVATION_FAILED';
    if (code !== 'RECONCILIATION_REQUIRED') {
      await markActivationFailed(activation.id, code, null);
    }
    await writeAudit('activation.failed', correlationId, user.id, entitlementId, {
      activationRequestId: activation.id,
      errorCode: code,
    });
    throw error;
  }
}

async function pollActivation(body: JsonRecord, cors: HeadersInit): Promise<Response> {
  const deviceCode = requiredString(body.deviceCode, 'DEVICE_CODE_REQUIRED', 128);
  if (deviceCode.length < 32) throw new Error('DEVICE_CODE_TOO_SHORT');
  const deviceCodeHash = await sha256Hex(deviceCode);

  const { data: activation } = await admin
    .from('license_activation_requests')
    .select('id, status, result_license_key, error_code, expires_at')
    .eq('device_code_hash', `\\x${deviceCodeHash}`)
    .maybeSingle();
  if (!activation) return json({ error: 'ACTIVATION_NOT_FOUND' }, 404, cors);

  if (new Date(activation.expires_at).getTime() <= Date.now()) {
    await admin.from('license_activation_requests').update({
      status: activation.status === 'approved' ? 'approved' : 'expired',
      result_license_key: null,
    }).eq('id', activation.id);
    return json({ status: 'expired' }, 410, cors);
  }
  if (activation.status === 'approved') {
    await admin.from('license_activation_requests')
      .update({ delivered_at: new Date().toISOString() })
      .eq('id', activation.id);
    return json({ status: 'approved', licenseKey: activation.result_license_key }, 200, cors);
  }
  if (activation.status === 'failed') {
    return json({ status: 'failed', error: activation.error_code }, 409, cors);
  }
  return json({ status: activation.status }, 202, cors);
}

async function authenticatedUser(request: Request) {
  const authorization = request.headers.get('authorization');
  const token = authorization?.replace(/^Bearer\s+/i, '');
  if (!token) throw new Error('UNAUTHORIZED');
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) throw new Error('UNAUTHORIZED');
  return data.user;
}

async function markActivationFailed(id: string, errorCode: string, authorityLicenseId: string | null) {
  await admin.from('license_activation_requests').update({
    status: 'failed',
    error_code: errorCode.slice(0, 120),
    authority_license_id: authorityLicenseId,
  }).eq('id', id).eq('status', 'processing');
}

async function writeAudit(
  eventType: string,
  correlationId: string,
  userId: string | null,
  entitlementId: string | null,
  details: JsonRecord,
) {
  await admin.from('license_audit_entries').insert({
    event_type: eventType,
    correlation_id: correlationId,
    user_id: userId,
    entitlement_id: entitlementId,
    activation_request_id: details.activationRequestId ?? null,
    details,
  });
}

function corsHeaders(origin: string | null): HeadersInit {
  const allowedOrigin = origin && allowedOrigins.has(origin) ? origin : 'https://natime.vn';
  return {
    'access-control-allow-origin': allowedOrigin,
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

function requireEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function requiredString(value: unknown, code: string, maxLength: number): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > maxLength) {
    throw new Error(code);
  }
  return value.trim();
}

function optionalString(value: unknown, maxLength: number): string | null {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string' || value.trim().length > maxLength) throw new Error('INVALID_INPUT');
  return value.trim();
}

function randomToken(byteLength: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function randomUserCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const value = Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('');
  return `${value.slice(0, 4)}-${value.slice(4)}`;
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}
