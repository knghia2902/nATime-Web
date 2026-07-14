import assert from 'node:assert/strict';
import test from 'node:test';
import { canonicalizePayOsData, payOsSignature, secureHexEquals } from './payos.ts';

test('checkout signature fields are sorted exactly as required by payOS', () => {
  assert.equal(
    canonicalizePayOsData({
      returnUrl: 'https://natime.vn/dashboard?payment=success',
      orderCode: 123,
      description: 'NT0000123',
      cancelUrl: 'https://natime.vn/dashboard?payment=cancel',
      amount: 490000,
    }),
    'amount=490000&cancelUrl=https://natime.vn/dashboard?payment=cancel&description=NT0000123&orderCode=123&returnUrl=https://natime.vn/dashboard?payment=success',
  );
});

test('webhook signature matches the official payOS payment-request sample', async () => {
  const data = {
    orderCode: 123,
    amount: 3000,
    description: 'VQRIO123',
    accountNumber: '12345678',
    reference: 'TF230204212323',
    transactionDateTime: '2023-02-04 18:25:00',
    currency: 'VND',
    paymentLinkId: '124c33293c43417ab7879e14c8d9eb18',
    code: '00',
    desc: 'Thành công',
    counterAccountBankId: '',
    counterAccountBankName: '',
    counterAccountName: '',
    counterAccountNumber: '',
    virtualAccountName: '',
    virtualAccountNumber: '',
  };
  const checksumKey = '1a54716c8f0efb2744fb28b6e38b25da7f67a925d98bc1c18bd8faaecadd7675';

  assert.equal(
    await payOsSignature(data, checksumKey),
    '412e915d2871504ed31be63c8f62a149a4410d34c4c42affc9006ef9917eaa03',
  );
});

test('signature comparison rejects length and content differences', () => {
  assert.equal(secureHexEquals('aabb', 'AABB'), true);
  assert.equal(secureHexEquals('aabb', 'aabc'), false);
  assert.equal(secureHexEquals('aabb', 'aabb00'), false);
});
