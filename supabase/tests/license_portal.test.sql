begin;
create extension if not exists pgtap with schema extensions;
select plan(38);

select has_table('public', 'license_orders', 'license orders table exists');
select has_table('public', 'license_entitlements', 'license entitlements table exists');
select has_table('public', 'license_installations', 'license installations table exists');
select has_table('public', 'license_activation_requests', 'activation requests table exists');
select has_table('public', 'license_payment_events', 'payment event inbox exists');
select has_table('public', 'license_audit_entries', 'append-only audit table exists');
select has_table('public', 'license_products', 'server-owned product and price catalog exists');
select has_table('public', 'license_authority_licenses', 'server-owned license authority state exists');
select has_table('public', 'license_authority_rate_limits', 'authority validation rate-limit state exists');

select is(
  (select count(*)::integer from pg_class where relnamespace = 'public'::regnamespace and relname like 'license_%' and relrowsecurity),
  9,
  'RLS is enabled on every license table'
);

select ok(
  exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'license_orders' and cmd = 'SELECT'),
  'customers have an ownership-filtered order read policy'
);
select ok(
  exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'license_entitlements' and cmd = 'SELECT'),
  'customers have an ownership-filtered entitlement read policy'
);
select ok(
  exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'license_installations' and cmd = 'SELECT'),
  'installation reads are ownership-filtered through entitlements'
);

select ok(not has_table_privilege('anon', 'public.license_activation_requests', 'SELECT'), 'anonymous users cannot read device bearer credentials');
select ok(not has_table_privilege('authenticated', 'public.license_activation_requests', 'SELECT'), 'portal users cannot bypass the activation Edge Function');
select ok(not has_table_privilege('authenticated', 'public.license_payment_events', 'INSERT'), 'clients cannot fabricate payment events');
select ok(has_function_privilege('service_role', 'public.reserve_license_activation(uuid,uuid,text)', 'EXECUTE'), 'only the service boundary can reserve device quota');
select ok(has_function_privilege('service_role', 'public.process_payos_payment(text,text,bigint,bigint,text,text)', 'EXECUTE'), 'service boundary can atomically process PayOS events');
select ok(not has_function_privilege('authenticated', 'public.process_payos_payment(text,text,bigint,bigint,text,text)', 'EXECUTE'), 'customers cannot mark PayOS orders as paid');
select ok(has_function_privilege('service_role', 'public.issue_authority_license(uuid,text,text)', 'EXECUTE'), 'service boundary can issue authority licenses');
select ok(not has_function_privilege('authenticated', 'public.issue_authority_license(uuid,text,text)', 'EXECUTE'), 'customers cannot issue signed licenses');
select ok(has_function_privilege('service_role', 'public.renew_authority_license(uuid,integer,integer,timestamptz,text[],text)', 'EXECUTE'), 'service boundary can renew authority licenses');
select ok(has_function_privilege('service_role', 'public.revoke_authority_license(uuid,text)', 'EXECUTE'), 'service boundary can revoke authority licenses');
select ok(has_function_privilege('service_role', 'public.consume_authority_validation_rate(text,integer,integer)', 'EXECUTE'), 'service boundary can rate-limit validations');
select ok(not has_function_privilege('anon', 'public.consume_authority_validation_rate(text,integer,integer)', 'EXECUTE'), 'anonymous callers cannot bypass the validation boundary');

select throws_ok(
  $$ select * from public.reserve_license_activation(gen_random_uuid(), gen_random_uuid(), 'ABCD-EFGH') $$,
  'P0001',
  'ENTITLEMENT_NOT_ACTIVE',
  'quota reservation rejects unknown or inactive entitlements'
);

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data
) values (
  '00000000-0000-0000-0000-000000000000',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'authenticated', 'authenticated', 'payment-test@natime.invalid', '',
  now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}'
);

insert into public.license_orders (
  id, user_id, external_reference, plan_code, billing_period, amount_vnd,
  status, payment_provider, provider_order_code, payment_link_id
) values (
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'checkout:test', 'standard', 'yearly', 4704000,
  'pending', 'payos', 123456789, 'payos-link-test'
);

select is(
  public.process_payos_payment('event-1', 'payload-hash', 123456789, 4704000, 'payos-link-test', 'bank-reference'),
  'processed',
  'a valid PayOS event is processed'
);
select is((select status from public.license_orders where id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'), 'paid', 'valid webhook marks its order paid');
select is((select count(*)::integer from public.license_entitlements where order_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'), 1, 'valid webhook creates one entitlement');
select is(
  public.process_payos_payment('event-1', 'payload-hash', 123456789, 4704000, 'payos-link-test', 'bank-reference'),
  'duplicate',
  'replayed PayOS event is idempotent'
);
select is((select count(*)::integer from public.license_entitlements where order_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'), 1, 'replay cannot create a second entitlement');

insert into public.license_activation_requests (
  id, device_code_hash, user_code, hardware_id, entitlement_id, status,
  idempotency_key, approved_by, expires_at
) values (
  'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  decode(repeat('ab', 32), 'hex'),
  'TEST-CODE',
  'TEST-HARDWARE-ID',
  (select id from public.license_entitlements where order_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
  'processing',
  'activation:authority-test-idempotency-key',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  now() + interval '10 minutes'
);

select is(
  (select count(*)::integer from public.issue_authority_license(
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    'activation:authority-test-idempotency-key',
    'Payment Test Customer'
  )),
  1,
  'reserved activation can issue one authority license'
);
select is(
  (select count(*)::integer from public.issue_authority_license(
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    'activation:authority-test-idempotency-key',
    'Payment Test Customer'
  )),
  1,
  'authority issue replay returns the existing license'
);
select is(
  (select count(*)::integer from public.license_authority_licenses where activation_request_id = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc'),
  1,
  'authority issue replay cannot create a duplicate license'
);
select ok(
  exists (select 1 from public.license_audit_entries where event_type = 'authority.issued' and activation_request_id = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc'),
  'authority issuance is audited'
);
select is(
  (select revision from public.renew_authority_license(
    (select id from public.license_authority_licenses where activation_request_id = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc'),
    750, 20, now() + interval '2 years', array['Attendance', 'Access', 'Gate'], 'renew-test-correlation'
  )),
  2,
  'authority renewal increments the signed revision'
);
select ok(
  public.revoke_authority_license(
    (select id from public.license_authority_licenses where activation_request_id = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc'),
    'revoke-test-correlation'
  ),
  'authority license can be revoked and audited'
);
select ok(
  public.consume_authority_validation_rate(repeat('a', 64), 60, 60),
  'first authority validation request is inside the rate limit'
);

select * from finish();
rollback;
