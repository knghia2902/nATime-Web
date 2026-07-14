import { createClient } from 'npm:@supabase/supabase-js@2.110.2';
import {
  createSignedLicenseKey,
  createValidationToken,
  secureStringEquals,
  toDotNetDateTimeOffset,
  type LicensePayload,
} from '../_shared/license.ts';

type JsonRecord = Record<string, unknown>;
type AuthorityLicenseRow = {
  id: string;
  customer_name: string;
  product_tier: string;
  max_employees: number;
  max_devices: number;
  expires_at_utc: string | null;
  enabled_modules: string[] | null;
  hardware_id: string;
  issued_at_utc: string;
  not_before_utc: string | null;
  revision: number;
  revoked_at_utc: string | null;
};

const supabaseUrl = requireEnv('SUPABASE_URL');
const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
const operatorKey = requireEnv('NATIME_LICENSE_OPERATOR_KEY');
const signingPrivateKeyPem = requireEnv('NATIME_LICENSE_SIGNING_PRIVATE_KEY_PEM');
const validationSecret = requireEnv('NATIME_LICENSE_VALIDATION_SECRET');
const ipHashSalt = requireEnv('NATIME_ACTIVATION_IP_SALT');
if (operatorKey.length < 32) throw new Error('NATIME_LICENSE_OPERATOR_KEY_TOO_SHORT');
if (validationSecret.length < 32) throw new Error('NATIME_LICENSE_VALIDATION_SECRET_TOO_SHORT');

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 });
  const path = new URL(request.url).pathname;

  try {
    if (request.method === 'GET' && path.endsWith('/health')) {
      return json({ status: 'ok' }, 200);
    }
    if (request.method === 'POST' && path.endsWith('/v1/licenses')) {
      requireOperator(request);
      return await issueLicense(request);
    }
    if (request.method === 'POST' && path.endsWith('/v1/validations')) {
      return await validateLicense(request);
    }

    const operation = path.match(/\/v1\/licenses\/([0-9a-f-]{36})\/(renew|revoke)$/i);
    if (request.method === 'POST' && operation) {
      requireOperator(request);
      return operation[2].toLowerCase() === 'renew'
        ? await renewLicense(request, operation[1])
        : await revokeLicense(request, operation[1]);
    }
    return json({ error: 'NOT_FOUND' }, 404);
  } catch (error) {
    const code = knownErrorCode(error);
    const status = code === 'UNAUTHORIZED' ? 401
      : code === 'LICENSE_NOT_FOUND' ? 404
      : code === 'IDEMPOTENCY_CONFLICT' ? 409
      : code === 'INTERNAL_ERROR' ? 500
      : 400;
    return json({ error: code }, status);
  }
});

async function issueLicense(request: Request): Promise<Response> {
  const body = await request.json() as JsonRecord;
  const activationRequestId = requiredUuid(body.activationRequestId ?? body.ActivationRequestId, 'ACTIVATION_REQUEST_ID_INVALID');
  const customerName = requiredString(body.customerName ?? body.CustomerName, 'CUSTOMER_NAME_INVALID', 256);
  const idempotencyKey = requiredString(request.headers.get('idempotency-key'), 'IDEMPOTENCY_KEY_REQUIRED', 160);
  if (!/^[A-Za-z0-9:_-]{16,160}$/.test(idempotencyKey)) throw new Error('IDEMPOTENCY_KEY_INVALID');

  const { data, error } = await admin.rpc('issue_authority_license', {
    p_activation_request_id: activationRequestId,
    p_idempotency_key: idempotencyKey,
    p_customer_name: customerName,
  });
  if (error || !data?.length) throw new Error(databaseErrorCode(error?.message, 'LICENSE_ISSUE_FAILED'));

  const issued = data[0] as AuthorityLicenseRow;
  return json({
    licenseId: issued.id,
    licenseKey: await signedKey(issued),
  }, 201);
}

async function validateLicense(request: Request): Promise<Response> {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const bucketKey = await sha256Hex(`${ipHashSalt}:${forwardedFor}`);
  const { data: rateAllowed, error: rateError } = await admin.rpc('consume_authority_validation_rate', {
    p_bucket_key: bucketKey,
    p_limit: 60,
    p_window_seconds: 60,
  });
  if (rateError) throw new Error('INTERNAL_ERROR');
  if (rateAllowed !== true) return json({ error: 'RATE_LIMITED' }, 429);

  const body = await request.json() as JsonRecord;
  const licenseId = requiredUuid(body.licenseId ?? body.LicenseId, 'LICENSE_ID_INVALID');
  const hardwareId = requiredString(body.hardwareId ?? body.HardwareId, 'HARDWARE_ID_INVALID', 256);
  const revision = requiredInteger(body.revision ?? body.Revision, 'REVISION_INVALID', 1);
  const suppliedToken = requiredString(body.validationToken ?? body.ValidationToken, 'VALIDATION_TOKEN_INVALID', 512);

  const { data, error } = await admin
    .from('license_authority_licenses')
    .select('id, customer_name, product_tier, max_employees, max_devices, expires_at_utc, enabled_modules, hardware_id, issued_at_utc, not_before_utc, revision, revoked_at_utc')
    .eq('id', licenseId)
    .maybeSingle();
  if (error) throw new Error('INTERNAL_ERROR');

  const expectedToken = await createValidationToken(validationSecret, licenseId, revision);
  const authentic = data
    && secureStringEquals(hardwareId, data.hardware_id)
    && secureStringEquals(suppliedToken, expectedToken);
  if (!authentic) {
    return json({ isRevoked: true, replacementLicenseKey: null, message: 'License validation failed.' }, 200);
  }

  const license = data as AuthorityLicenseRow;
  if (license.revoked_at_utc) {
    return json({ isRevoked: true, replacementLicenseKey: null, message: 'License has been revoked.' }, 200);
  }
  const replacementLicenseKey = revision < license.revision ? await signedKey(license) : null;
  return json({ isRevoked: false, replacementLicenseKey, message: 'License is valid.' }, 200);
}

async function renewLicense(request: Request, licenseId: string): Promise<Response> {
  const body = await request.json() as JsonRecord;
  const maxEmployees = requiredInteger(body.maxEmployees ?? body.MaxEmployees, 'MAX_EMPLOYEES_INVALID', 1);
  const maxDevices = requiredInteger(body.maxDevices ?? body.MaxDevices, 'MAX_DEVICES_INVALID', 0);
  const expiresAtUtc = optionalTimestamp(body.expiresAtUtc ?? body.ExpiresAtUtc);
  const enabledModules = stringArray(body.enabledModules ?? body.EnabledModules, 64, 80);
  const correlationId = correlation(request);
  const { data, error } = await admin.rpc('renew_authority_license', {
    p_license_id: licenseId,
    p_max_employees: maxEmployees,
    p_max_devices: maxDevices,
    p_expires_at_utc: expiresAtUtc,
    p_enabled_modules: enabledModules,
    p_correlation_id: correlationId,
  });
  if (error || !data?.length) throw new Error(databaseErrorCode(error?.message, 'LICENSE_NOT_FOUND'));
  const renewed = data[0] as AuthorityLicenseRow;
  return json({ licenseId: renewed.id, licenseKey: await signedKey(renewed) }, 200);
}

async function revokeLicense(request: Request, licenseId: string): Promise<Response> {
  const { data, error } = await admin.rpc('revoke_authority_license', {
    p_license_id: licenseId,
    p_correlation_id: correlation(request),
  });
  if (error) throw new Error(databaseErrorCode(error.message, 'LICENSE_REVOKE_FAILED'));
  if (data !== true) throw new Error('LICENSE_NOT_FOUND');
  return new Response(null, { status: 204 });
}

async function signedKey(license: AuthorityLicenseRow): Promise<string> {
  const validationToken = await createValidationToken(validationSecret, license.id, license.revision);
  const payload: LicensePayload = {
    LicenseId: license.id.toLowerCase(),
    CustomerName: license.customer_name,
    ProductTier: license.product_tier,
    MaxEmployees: license.max_employees,
    MaxDevices: license.max_devices,
    ExpiresAtUtc: normalizeTimestamp(license.expires_at_utc),
    EnabledModules: Array.from(new Set(license.enabled_modules ?? [])),
    HardwareId: license.hardware_id,
    IssuedAtUtc: normalizeTimestamp(license.issued_at_utc)!,
    NotBeforeUtc: normalizeTimestamp(license.not_before_utc),
    Revision: license.revision,
    ValidationToken: validationToken,
  };
  return await createSignedLicenseKey(payload, signingPrivateKeyPem);
}

function requireOperator(request: Request): void {
  const supplied = request.headers.get('x-licensing-admin-key') ?? '';
  if (!secureStringEquals(supplied, operatorKey)) throw new Error('UNAUTHORIZED');
}

function correlation(request: Request): string {
  const supplied = request.headers.get('idempotency-key')?.trim();
  return supplied && supplied.length >= 8 && supplied.length <= 160 ? supplied : crypto.randomUUID();
}

function databaseErrorCode(message: string | undefined, fallback: string): string {
  const known = [
    'ACTIVATION_NOT_RESERVED', 'ENTITLEMENT_NOT_ACTIVE', 'IDEMPOTENCY_CONFLICT',
    'IDEMPOTENCY_KEY_INVALID', 'CUSTOMER_NAME_INVALID', 'LICENSE_NOT_FOUND',
    'LICENSE_QUOTA_INVALID', 'CORRELATION_ID_INVALID',
  ];
  return known.find((code) => message?.includes(code)) ?? fallback;
}

function knownErrorCode(error: unknown): string {
  const message = error instanceof Error ? error.message : 'INTERNAL_ERROR';
  const known = [
    'UNAUTHORIZED', 'NOT_FOUND', 'ACTIVATION_REQUEST_ID_INVALID', 'CUSTOMER_NAME_INVALID',
    'IDEMPOTENCY_KEY_REQUIRED', 'IDEMPOTENCY_KEY_INVALID', 'ACTIVATION_NOT_RESERVED',
    'ENTITLEMENT_NOT_ACTIVE', 'IDEMPOTENCY_CONFLICT', 'LICENSE_ISSUE_FAILED',
    'LICENSE_ID_INVALID', 'HARDWARE_ID_INVALID', 'REVISION_INVALID',
    'VALIDATION_TOKEN_INVALID', 'MAX_EMPLOYEES_INVALID', 'MAX_DEVICES_INVALID',
    'TIMESTAMP_INVALID', 'ENABLED_MODULES_INVALID', 'LICENSE_NOT_FOUND',
    'LICENSE_QUOTA_INVALID', 'CORRELATION_ID_INVALID', 'LICENSE_REVOKE_FAILED',
    'NATIME_LICENSE_VALIDATION_SECRET_TOO_SHORT',
    'NATIME_LICENSE_SIGNING_PRIVATE_KEY_PEM_INVALID',
  ];
  return known.includes(message) ? message : 'INTERNAL_ERROR';
}

function normalizeTimestamp(value: string | null): string | null {
  return toDotNetDateTimeOffset(value);
}

function optionalTimestamp(value: unknown): string | null {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string' || Number.isNaN(Date.parse(value))) throw new Error('TIMESTAMP_INVALID');
  return new Date(value).toISOString();
}

function stringArray(value: unknown, maxItems: number, maxLength: number): string[] {
  if (!Array.isArray(value) || value.length > maxItems) throw new Error('ENABLED_MODULES_INVALID');
  const result = value.map((item) => requiredString(item, 'ENABLED_MODULES_INVALID', maxLength));
  return Array.from(new Set(result));
}

function requiredUuid(value: unknown, code: string): string {
  const text = requiredString(value, code, 36).toLowerCase();
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(text)) throw new Error(code);
  return text;
}

function requiredInteger(value: unknown, code: string, minimum: number): number {
  if (!Number.isInteger(value) || (value as number) < minimum) throw new Error(code);
  return value as number;
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

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function json(body: JsonRecord, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}
