import assert from 'node:assert/strict';
import { constants, createHmac, generateKeyPairSync, verify } from 'node:crypto';
import test from 'node:test';
import {
  createSignedLicenseKey,
  createValidationToken,
  secureStringEquals,
  toDotNetDateTimeOffset,
  type LicensePayload,
} from './license.ts';

test('license envelope uses the .NET-compatible PascalCase payload and RSA-PSS SHA-256', async () => {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const privatePem = privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
  const payload: LicensePayload = {
    LicenseId: '11111111-2222-3333-4444-555555555555',
    CustomerName: 'Interop Customer',
    ProductTier: 'professional',
    MaxEmployees: 500,
    MaxDevices: 10,
    ExpiresAtUtc: '2027-07-13T10:11:12+00:00',
    EnabledModules: ['Attendance', 'Access'],
    HardwareId: 'ABCDEF0123456789',
    IssuedAtUtc: '2026-07-13T10:11:12+00:00',
    NotBeforeUtc: null,
    Revision: 1,
    ValidationToken: 'validation-token',
  };

  const licenseKey = await createSignedLicenseKey(payload, privatePem);
  const envelope = JSON.parse(Buffer.from(licenseKey, 'base64').toString('utf8')) as {
    Payload: LicensePayload;
    Signature: string;
  };
  assert.deepEqual(Object.keys(envelope.Payload), [
    'LicenseId', 'CustomerName', 'ProductTier', 'MaxEmployees', 'MaxDevices',
    'ExpiresAtUtc', 'EnabledModules', 'HardwareId', 'IssuedAtUtc', 'NotBeforeUtc',
    'Revision', 'ValidationToken',
  ]);
  assert.equal(
    verify(
      'sha256',
      Buffer.from(JSON.stringify(envelope.Payload)),
      { key: publicKey, padding: constants.RSA_PKCS1_PSS_PADDING, saltLength: 32 },
      Buffer.from(envelope.Signature, 'base64'),
    ),
    true,
  );
});

test('UTC timestamps match System.Text.Json DateTimeOffset formatting', () => {
  assert.equal(toDotNetDateTimeOffset('2026-07-13T10:11:12.000Z'), '2026-07-13T10:11:12+00:00');
  assert.equal(toDotNetDateTimeOffset('2026-07-13T10:11:12.120Z'), '2026-07-13T10:11:12.12+00:00');
  assert.equal(toDotNetDateTimeOffset(null), null);
});

test('validation token matches the .NET HMAC-SHA256 contract', async () => {
  const secret = 'validation-secret-with-at-least-thirty-two-characters';
  const licenseId = 'AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE';
  const expected = createHmac('sha256', secret)
    .update('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee:3')
    .digest('base64');
  assert.equal(await createValidationToken(secret, licenseId, 3), expected);
});

test('constant-work string comparison rejects content and length differences', () => {
  assert.equal(secureStringEquals('same-secret', 'same-secret'), true);
  assert.equal(secureStringEquals('same-secret', 'other-secret'), false);
  assert.equal(secureStringEquals('same-secret', 'same-secret-extra'), false);
});
