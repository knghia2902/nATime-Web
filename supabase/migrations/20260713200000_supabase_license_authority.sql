create table public.license_authority_licenses (
  id uuid primary key default gen_random_uuid(),
  activation_request_id uuid not null unique references public.license_activation_requests(id) on delete restrict,
  entitlement_id uuid not null references public.license_entitlements(id) on delete restrict,
  idempotency_key text not null unique,
  customer_name text not null,
  product_tier text not null check (product_tier in ('standard', 'professional', 'enterprise')),
  max_employees integer not null check (max_employees > 0),
  max_devices integer not null check (max_devices >= 0),
  expires_at_utc timestamptz,
  enabled_modules text[] not null default '{}',
  hardware_id text not null,
  issued_at_utc timestamptz not null default now(),
  not_before_utc timestamptz,
  revision integer not null default 1 check (revision > 0),
  revoked_at_utc timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint license_authority_customer_name_length check (char_length(customer_name) between 1 and 256),
  constraint license_authority_hardware_id_length check (char_length(hardware_id) between 1 and 256),
  constraint license_authority_expiry check (expires_at_utc is null or expires_at_utc > issued_at_utc)
);

create table public.license_authority_rate_limits (
  bucket_key text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now()
);

create unique index license_audit_authority_idempotency_uidx
on public.license_audit_entries(event_type, correlation_id)
where event_type in ('authority.issued', 'authority.renewed', 'authority.revoked');

create trigger license_authority_licenses_updated_at
before update on public.license_authority_licenses
for each row execute function public.set_license_portal_updated_at();

alter table public.license_authority_licenses enable row level security;
alter table public.license_authority_rate_limits enable row level security;
revoke all on public.license_authority_licenses from public, anon, authenticated;
revoke all on public.license_authority_rate_limits from public, anon, authenticated;

create or replace function public.issue_authority_license(
  p_activation_request_id uuid,
  p_idempotency_key text,
  p_customer_name text
)
returns setof public.license_authority_licenses
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  activation public.license_activation_requests%rowtype;
  entitlement public.license_entitlements%rowtype;
  issued public.license_authority_licenses%rowtype;
begin
  if char_length(trim(p_customer_name)) not between 1 and 256 then
    raise exception using errcode = 'P0001', message = 'CUSTOMER_NAME_INVALID';
  end if;
  if char_length(p_idempotency_key) not between 16 and 160 then
    raise exception using errcode = 'P0001', message = 'IDEMPOTENCY_KEY_INVALID';
  end if;

  select * into issued
  from public.license_authority_licenses
  where idempotency_key = p_idempotency_key;

  if found then
    if issued.activation_request_id <> p_activation_request_id then
      raise exception using errcode = 'P0001', message = 'IDEMPOTENCY_CONFLICT';
    end if;
    return next issued;
    return;
  end if;

  select * into activation
  from public.license_activation_requests
  where id = p_activation_request_id
    and idempotency_key = p_idempotency_key
    and status = 'processing'
    and expires_at > now()
  for update;

  if not found or activation.entitlement_id is null then
    raise exception using errcode = 'P0001', message = 'ACTIVATION_NOT_RESERVED';
  end if;

  select * into entitlement
  from public.license_entitlements
  where id = activation.entitlement_id
    and status = 'active'
    and (expires_at is null or expires_at > now())
  for share;

  if not found then
    raise exception using errcode = 'P0001', message = 'ENTITLEMENT_NOT_ACTIVE';
  end if;

  insert into public.license_authority_licenses (
    activation_request_id,
    entitlement_id,
    idempotency_key,
    customer_name,
    product_tier,
    max_employees,
    max_devices,
    expires_at_utc,
    enabled_modules,
    hardware_id
  ) values (
    activation.id,
    entitlement.id,
    p_idempotency_key,
    trim(p_customer_name),
    entitlement.plan_code,
    entitlement.max_employees,
    entitlement.max_devices,
    entitlement.expires_at,
    entitlement.enabled_modules,
    activation.hardware_id
  ) on conflict do nothing
  returning * into issued;

  if not found then
    select * into issued
    from public.license_authority_licenses
    where idempotency_key = p_idempotency_key;
    if not found or issued.activation_request_id <> p_activation_request_id then
      raise exception using errcode = 'P0001', message = 'IDEMPOTENCY_CONFLICT';
    end if;
    return next issued;
    return;
  end if;

  insert into public.license_audit_entries (
    user_id, entitlement_id, activation_request_id, event_type, correlation_id, details
  ) values (
    entitlement.user_id,
    entitlement.id,
    activation.id,
    'authority.issued',
    p_idempotency_key,
    jsonb_build_object('authorityLicenseId', issued.id, 'revision', issued.revision)
  );

  return next issued;
end;
$$;

create or replace function public.renew_authority_license(
  p_license_id uuid,
  p_max_employees integer,
  p_max_devices integer,
  p_expires_at_utc timestamptz,
  p_enabled_modules text[],
  p_correlation_id text
)
returns setof public.license_authority_licenses
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  renewed public.license_authority_licenses%rowtype;
  owner_id uuid;
begin
  if p_max_employees < 1 or p_max_devices < 0 then
    raise exception using errcode = 'P0001', message = 'LICENSE_QUOTA_INVALID';
  end if;
  if char_length(trim(p_correlation_id)) not between 8 and 160 then
    raise exception using errcode = 'P0001', message = 'CORRELATION_ID_INVALID';
  end if;

  perform pg_advisory_xact_lock(hashtextextended('authority.renewed:' || trim(p_correlation_id), 0));
  if exists (
    select 1 from public.license_audit_entries
    where event_type = 'authority.renewed' and correlation_id = trim(p_correlation_id)
      and details ->> 'authorityLicenseId' = p_license_id::text
  ) then
    return query select * from public.license_authority_licenses where id = p_license_id;
    return;
  end if;
  if exists (
    select 1 from public.license_audit_entries
    where event_type = 'authority.renewed' and correlation_id = trim(p_correlation_id)
  ) then
    raise exception using errcode = 'P0001', message = 'IDEMPOTENCY_CONFLICT';
  end if;

  update public.license_authority_licenses
  set max_employees = p_max_employees,
      max_devices = p_max_devices,
      expires_at_utc = p_expires_at_utc,
      enabled_modules = coalesce(p_enabled_modules, '{}'),
      revision = revision + 1
  where id = p_license_id
    and revoked_at_utc is null
  returning * into renewed;

  if not found then
    raise exception using errcode = 'P0001', message = 'LICENSE_NOT_FOUND';
  end if;

  select user_id into owner_id from public.license_entitlements where id = renewed.entitlement_id;
  insert into public.license_audit_entries (
    user_id, entitlement_id, activation_request_id, event_type, correlation_id, details
  ) values (
    owner_id, renewed.entitlement_id, renewed.activation_request_id,
    'authority.renewed', trim(p_correlation_id),
    jsonb_build_object('authorityLicenseId', renewed.id, 'revision', renewed.revision)
  );

  return next renewed;
end;
$$;

create or replace function public.revoke_authority_license(
  p_license_id uuid,
  p_correlation_id text
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  revoked public.license_authority_licenses%rowtype;
  owner_id uuid;
begin
  if char_length(trim(p_correlation_id)) not between 8 and 160 then
    raise exception using errcode = 'P0001', message = 'CORRELATION_ID_INVALID';
  end if;

  perform pg_advisory_xact_lock(hashtextextended('authority.revoked:' || trim(p_correlation_id), 0));
  if exists (
    select 1 from public.license_audit_entries
    where event_type = 'authority.revoked' and correlation_id = trim(p_correlation_id)
      and details ->> 'authorityLicenseId' = p_license_id::text
  ) then
    return true;
  end if;
  if exists (
    select 1 from public.license_audit_entries
    where event_type = 'authority.revoked' and correlation_id = trim(p_correlation_id)
  ) then
    raise exception using errcode = 'P0001', message = 'IDEMPOTENCY_CONFLICT';
  end if;

  update public.license_authority_licenses
  set revoked_at_utc = coalesce(revoked_at_utc, now()),
      revision = case when revoked_at_utc is null then revision + 1 else revision end
  where id = p_license_id
  returning * into revoked;

  if not found then return false; end if;

  select user_id into owner_id from public.license_entitlements where id = revoked.entitlement_id;
  insert into public.license_audit_entries (
    user_id, entitlement_id, activation_request_id, event_type, correlation_id, details
  ) values (
    owner_id, revoked.entitlement_id, revoked.activation_request_id,
    'authority.revoked', trim(p_correlation_id),
    jsonb_build_object('authorityLicenseId', revoked.id, 'revision', revoked.revision)
  );

  return true;
end;
$$;

create or replace function public.consume_authority_validation_rate(
  p_bucket_key text,
  p_limit integer default 60,
  p_window_seconds integer default 60
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  current_count integer;
begin
  if char_length(p_bucket_key) < 32 or p_limit < 1 or p_window_seconds < 1 then
    raise exception using errcode = 'P0001', message = 'RATE_LIMIT_INPUT_INVALID';
  end if;

  insert into public.license_authority_rate_limits(bucket_key, request_count)
  values (p_bucket_key, 1)
  on conflict (bucket_key) do update set
    request_count = case
      when license_authority_rate_limits.window_started_at <= now() - make_interval(secs => p_window_seconds) then 1
      else license_authority_rate_limits.request_count + 1
    end,
    window_started_at = case
      when license_authority_rate_limits.window_started_at <= now() - make_interval(secs => p_window_seconds) then now()
      else license_authority_rate_limits.window_started_at
    end,
    updated_at = now()
  returning request_count into current_count;

  return current_count <= p_limit;
end;
$$;

revoke all on function public.issue_authority_license(uuid, text, text) from public, anon, authenticated;
revoke all on function public.renew_authority_license(uuid, integer, integer, timestamptz, text[], text) from public, anon, authenticated;
revoke all on function public.revoke_authority_license(uuid, text) from public, anon, authenticated;
revoke all on function public.consume_authority_validation_rate(text, integer, integer) from public, anon, authenticated;
grant execute on function public.issue_authority_license(uuid, text, text) to service_role;
grant execute on function public.renew_authority_license(uuid, integer, integer, timestamptz, text[], text) to service_role;
grant execute on function public.revoke_authority_license(uuid, text) to service_role;
grant execute on function public.consume_authority_validation_rate(text, integer, integer) to service_role;
