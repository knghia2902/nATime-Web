export function canonicalizePayOsData(data: Record<string, unknown>): string {
  return Object.keys(data)
    .sort()
    .map((key) => `${key}=${normalizeValue(data[key])}`)
    .join('&');
}

export async function payOsSignature(
  data: Record<string, unknown>,
  checksumKey: string,
): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(checksumKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(canonicalizePayOsData(data)),
  );
  return toHex(new Uint8Array(signature));
}

export async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return toHex(new Uint8Array(digest));
}

export function secureHexEquals(left: string, right: string): boolean {
  const normalizedLeft = left.toLowerCase();
  const normalizedRight = right.toLowerCase();
  if (normalizedLeft.length !== normalizedRight.length) return false;
  let difference = 0;
  for (let index = 0; index < normalizedLeft.length; index += 1) {
    difference |= normalizedLeft.charCodeAt(index) ^ normalizedRight.charCodeAt(index);
  }
  return difference === 0;
}

function normalizeValue(value: unknown): string {
  if (value === null || value === undefined || value === 'null' || value === 'undefined') return '';
  if (Array.isArray(value)) return JSON.stringify(value.map(sortObject));
  if (typeof value === 'object') return JSON.stringify(sortObject(value));
  return String(value);
}

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObject);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, nested]) => [key, sortObject(nested)]),
  );
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}
