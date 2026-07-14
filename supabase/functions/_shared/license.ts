export type LicensePayload = {
  LicenseId: string;
  CustomerName: string;
  ProductTier: string;
  MaxEmployees: number;
  MaxDevices: number;
  ExpiresAtUtc: string | null;
  EnabledModules: string[];
  HardwareId: string;
  IssuedAtUtc: string;
  NotBeforeUtc: string | null;
  Revision: number;
  ValidationToken: string;
};

export async function createValidationToken(
  secret: string,
  licenseId: string,
  revision: number,
): Promise<string> {
  if (secret.length < 32) throw new Error('NATIME_LICENSE_VALIDATION_SECRET_TOO_SHORT');
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`${licenseId.toLowerCase()}:${revision}`),
  );
  return bytesToBase64(new Uint8Array(signature));
}

export async function createSignedLicenseKey(
  payload: LicensePayload,
  privateKeyPem: string,
): Promise<string> {
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    pemToBytes(privateKeyPem, 'PRIVATE KEY'),
    { name: 'RSA-PSS', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));
  const signature = await crypto.subtle.sign(
    { name: 'RSA-PSS', saltLength: 32 },
    privateKey,
    payloadBytes,
  );
  const envelope = {
    Payload: payload,
    Signature: bytesToBase64(new Uint8Array(signature)),
  };
  return bytesToBase64(new TextEncoder().encode(JSON.stringify(envelope)));
}

export function secureStringEquals(left: string, right: string): boolean {
  const leftBytes = new TextEncoder().encode(left);
  const rightBytes = new TextEncoder().encode(right);
  const maxLength = Math.max(leftBytes.length, rightBytes.length);
  let difference = leftBytes.length ^ rightBytes.length;
  for (let index = 0; index < maxLength; index++) {
    difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }
  return difference === 0;
}

export function toDotNetDateTimeOffset(value: string | null): string | null {
  if (!value) return null;
  const iso = new Date(value).toISOString();
  const withoutZulu = iso.slice(0, -1);
  const normalizedFraction = withoutZulu
    .replace(/\.000$/, '')
    .replace(/(\.\d*?[1-9])0+$/, '$1');
  return `${normalizedFraction}+00:00`;
}

function pemToBytes(pem: string, label: string): Uint8Array {
  const normalized = pem.replace(/\\n/g, '\n').trim();
  const base64 = normalized
    .replace(`-----BEGIN ${label}-----`, '')
    .replace(`-----END ${label}-----`, '')
    .replace(/\s+/g, '');
  if (!base64) throw new Error('NATIME_LICENSE_SIGNING_PRIVATE_KEY_PEM_INVALID');
  return base64ToBytes(base64);
}

function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function bytesToBase64(value: Uint8Array): string {
  let binary = '';
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary);
}
