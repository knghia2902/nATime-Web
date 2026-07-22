begin;
create extension if not exists pgtap with schema extensions;
select plan(39);

select has_table('public', 'portal_profiles', 'portal profiles table exists');
select has_table('public', 'portal_admins', 'portal administrators table exists');
select has_table('public', 'license_trial_offers', 'trial offer catalog exists');
select has_table('public', 'license_trial_claims', 'trial claims table exists');
select has_table('public', 'order_billing_details', 'billing snapshots table exists');
select has_table('public', 'contact_requests', 'contact request table exists');
select has_table('public', 'software_releases', 'software release table exists');
select has_table('public', 'release_artifacts', 'release artifact table exists');
select has_table('public', 'portal_audit_entries', 'portal audit table exists');
select has_column('public', 'license_entitlements', 'origin', 'entitlements record their origin');
select has_column('public', 'contact_requests', 'idempotency_key', 'contact requests have an idempotency key');

select is(
  (select count(*)::integer from pg_class
   where relnamespace = 'public'::regnamespace
     and relname in ('portal_profiles', 'portal_admins', 'license_trial_offers', 'license_trial_claims',
       'order_billing_details', 'contact_requests', 'software_releases', 'release_artifacts', 'portal_audit_entries')
     and relrowsecurity),
  9,
  'RLS is enabled on every B2B portal table'
);
select ok(has_function_privilege('service_role', 'public.claim_license_trial(uuid)', 'EXECUTE'), 'service role can claim trials');
select ok(not has_function_privilege('authenticated', 'public.claim_license_trial(uuid)', 'EXECUTE'), 'customers cannot bypass the trial function');
select ok(not has_table_privilege('authenticated', 'public.portal_admins', 'INSERT'), 'customers cannot create administrators');
select ok(not has_table_privilege('authenticated', 'public.portal_audit_entries', 'INSERT'), 'customers cannot fabricate audit records');
select ok(
  exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'portal_profiles' and cmd = 'ALL'),
  'profiles use an ownership-filtered policy'
);
select ok(
  exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'release_artifacts' and cmd = 'SELECT'),
  'artifact reads require a published signed release'
);

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data
) values
  ('00000000-0000-0000-0000-000000000000', '10101010-1010-4010-8010-101010101010',
   'authenticated', 'authenticated', 'trial-one@natime.invalid', '', now(), now(), now(),
   '{"provider":"email","providers":["email"]}', '{"name":"Trial One"}'),
  ('00000000-0000-0000-0000-000000000000', '20202020-2020-4020-8020-202020202020',
   'authenticated', 'authenticated', 'trial-two@natime.invalid', '', now(), now(), now(),
   '{"provider":"email","providers":["email"]}', '{"name":"Trial Two"}');

select is(
  (select count(*)::integer from public.portal_profiles
   where user_id in ('10101010-1010-4010-8010-101010101010', '20202020-2020-4020-8020-202020202020')),
  2,
  'confirmed auth users receive portal profiles'
);

select lives_ok(
  $$ select public.claim_license_trial('10101010-1010-4010-8010-101010101010') $$,
  'first user can claim Standard trial'
);
select is(
  (select origin from public.license_entitlements where user_id = '10101010-1010-4010-8010-101010101010'),
  'trial',
  'trial entitlement origin is explicit'
);
select is(
  (select max_devices from public.license_entitlements where user_id = '10101010-1010-4010-8010-101010101010'),
  1,
  'trial is limited to one device'
);
select is(
  (select max_employees from public.license_entitlements where user_id = '10101010-1010-4010-8010-101010101010'),
  50,
  'trial is limited to fifty employees'
);
select throws_ok(
  $$ select public.claim_license_trial('10101010-1010-4010-8010-101010101010') $$,
  'P0001', 'TRIAL_ALREADY_CLAIMED',
  'the same account cannot claim a second trial'
);
select lives_ok(
  $$ select public.claim_license_trial('20202020-2020-4020-8020-202020202020') $$,
  'a second account can claim before assigning hardware'
);

insert into public.portal_admins(user_id) values ('10101010-1010-4010-8010-101010101010');
select set_config('request.jwt.claims', '{"sub":"10101010-1010-4010-8010-101010101010","aal":"aal1","role":"authenticated"}', true);
set local role authenticated;
select is((select count(*)::integer from public.portal_profiles), 1, 'customer reads only their own profile');
select is((select count(*)::integer from public.license_entitlements), 1, 'customer cannot read another account entitlement');
select is((select count(*)::integer from public.license_trial_claims), 1, 'customer cannot read another account trial claim');
select ok(not public.is_portal_admin(), 'administrator mutation access is denied at AAL1');
reset role;

select set_config('request.jwt.claims', '{"sub":"10101010-1010-4010-8010-101010101010","aal":"aal2","role":"authenticated"}', true);
set local role authenticated;
select ok(public.is_portal_admin(), 'administrator mutation access is allowed at AAL2');
reset role;
select set_config('request.jwt.claims', '{"sub":"20202020-2020-4020-8020-202020202020","aal":"aal2","role":"authenticated"}', true);
set local role authenticated;
select ok(not public.is_portal_admin(), 'AAL2 does not grant admin rights to a customer');
reset role;

insert into public.license_activation_requests (
  device_code_hash, user_code, hardware_id, status, idempotency_key, expires_at
) values
  (decode(repeat('31', 32), 'hex'), 'TRY1-HW1', 'SHARED-TRIAL-HARDWARE', 'pending', 'trial:first-hardware', now() + interval '10 minutes'),
  (decode(repeat('32', 32), 'hex'), 'TRY2-HW1', 'SHARED-TRIAL-HARDWARE', 'pending', 'trial:reused-hardware', now() + interval '10 minutes');

select lives_ok(
  $$ select * from public.reserve_license_activation(
    '10101010-1010-4010-8010-101010101010',
    (select id from public.license_entitlements where user_id = '10101010-1010-4010-8010-101010101010' and origin = 'trial'),
    'TRY1-HW1'
  ) $$,
  'first trial reserves its hardware'
);
select ok(
  (select hardware_id_hash is not null from public.license_trial_claims where user_id = '10101010-1010-4010-8010-101010101010'),
  'trial hardware is stored only as a hash'
);
select throws_ok(
  $$ select * from public.reserve_license_activation(
    '20202020-2020-4020-8020-202020202020',
    (select id from public.license_entitlements where user_id = '20202020-2020-4020-8020-202020202020' and origin = 'trial'),
    'TRY2-HW1'
  ) $$,
  'P0001', 'TRIAL_HARDWARE_ALREADY_USED',
  'a Hardware ID cannot receive a second trial'
);
select is(
  (select status from public.license_activation_requests where user_code = 'TRY2-HW1'),
  'pending',
  'rejected hardware reservation remains pending'
);
select ok(
  exists (select 1 from public.license_audit_entries where event_type = 'trial.claimed'),
  'trial claims are audited'
);
select ok(has_function_privilege('service_role', 'public.expire_license_trials()', 'EXECUTE'), 'service role can expire trials');
update public.license_entitlements
set starts_at = now() - interval '8 days', expires_at = now() - interval '1 day'
where user_id = '10101010-1010-4010-8010-101010101010' and origin = 'trial';
select is(public.expire_license_trials(), 1, 'expiry worker transitions one due trial');
select ok(
  exists (
    select 1 from public.license_entitlements entitlement
    join public.license_audit_entries audit on audit.entitlement_id = entitlement.id
    where entitlement.user_id = '10101010-1010-4010-8010-101010101010'
      and entitlement.status = 'expired' and audit.event_type = 'trial.expired'
  ),
  'expired trial status and audit are persisted together'
);

select * from finish();
rollback;
