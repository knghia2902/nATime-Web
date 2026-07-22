import { AwsClient } from 'npm:aws4fetch@1.0.20';

export type R2Config = { accountId: string; accessKeyId: string; secretAccessKey: string; quarantineBucket: string; publicBucket: string; publicOrigin: string };

export function r2Config(): R2Config {
  return {
    accountId: required('R2_ACCOUNT_ID'), accessKeyId: required('R2_ACCESS_KEY_ID'), secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
    quarantineBucket: required('R2_QUARANTINE_BUCKET'), publicBucket: required('R2_PUBLIC_BUCKET'), publicOrigin: (Deno.env.get('R2_PUBLIC_ORIGIN') ?? 'https://download.natime.vn').replace(/\/$/, ''),
  };
}

export function r2Client(config: R2Config) { return new AwsClient({ accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, service: 's3', region: 'auto' }); }
export function r2ObjectUrl(config: R2Config, bucket: string, key: string) { return `https://${config.accountId}.r2.cloudflarestorage.com/${bucket}/${key.split('/').map(encodeURIComponent).join('/')}`; }
export async function presign(config: R2Config, bucket: string, key: string, method: 'GET' | 'PUT', expires = 900) {
  const client = r2Client(config); const url = `${r2ObjectUrl(config, bucket, key)}?X-Amz-Expires=${expires}`;
  const request = await client.sign(url, { method, headers: method === 'PUT' ? { 'content-type': 'application/vnd.microsoft.portable-executable' } : undefined, aws: { signQuery: true, allHeaders: true } });
  return request.url;
}
function required(name: string) { const value = Deno.env.get(name); if (!value) throw new Error(`${name}_REQUIRED`); return value; }
