create extension if not exists pgcrypto;

create table public.license_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  external_reference text unique,
  plan_code text not null check (plan_code in ('standard', 'professional', 'enterprise')),
  billing_period text not null check (billing_period in ('monthly', 'yearly', 'perpetual')),
  amount_vnd bigint not null check (amount_vnd >= 0),
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled', 'refunded', 'failed')),
  payment_provider text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.license_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  order_id uuid references public.license_orders(id) on delete restrict,
  plan_code text not null check (plan_code in ('standard', 'professional', 'enterprise')),
  status text not null default 'pending' check (status in ('pending', 'active', 'suspended', 'expired', 'revoked')),
  max_employees integer not null check (max_employees > 0),
  max_devices integer not null check (max_devices >= 0),
  enabled_modules text[] not null default '{}',
  starts_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint license_entitlements_expiry check (expires_at is null or starts_at is null or expires_at > starts_at)
);

create table public.license_installations (
  id uuid primary key default gen_random_uuid(),
  entitlement_id uuid not null references public.license_entitlements(id) on delete restrict,
  authority_license_id uuid not null unique,
  hardware_id_hash text not null,
  display_name text,
  status text not null default 'active' check (status in ('active', 'revoked', 'replaced')),
  activated_at timestamptz not null default now(),
  revoked_at timestamptz,
  last_validated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (entitlement_id, hardware_id_hash)
);

create table public.license_activation_requests (
  id uuid primary key default gen_random_uuid(),
  device_code_hash bytea not null unique,
  user_code text not null unique,
  hardware_id text not null,
  display_name text,
  entitlement_id uuid references public.license_entitlements(id) on delete restrict,
  requested_ip_hash text,
  status text not null default 'pending' check (status in ('pending', 'processing', 'approved', 'denied', 'expired', 'failed')),
  idempotency_key text not null unique,
  authority_license_id uuid,
  result_license_key text,
  error_code text,
  approved_by uuid references auth.users(id) on delete restrict,
  approved_at timestamptz,
  delivered_at timestamptz,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index license_activation_requests_user_code_status_idx
  on public.license_activation_requests (user_code, status, expires_at);

create table public.license_payment_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  provider_event_id text not null,
  payload_sha256 text not null,
  status text not null default 'received' check (status in ('received', 'processed', 'rejected', 'failed')),
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (provider, provider_event_id)
);

create table public.license_audit_entries (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  entitlement_id uuid references public.license_entitlements(id) on delete set null,
  activation_request_id uuid references public.license_activation_requests(id) on delete set null,
  event_type text not null,
  correlation_id text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_license_portal_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.reserve_license_activation(
  p_user_id uuid,
  p_entitlement_id uuid,
  p_user_code text
)
returns setof public.license_activation_requests
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  entitlement public.license_entitlements%rowtype;
  request public.license_activation_requests%rowtype;
  capacity_used integer;
begin
  select * into entitlement
  from public.license_entitlements
  where id = p_entitlement_id and user_id = p_user_id
  for update;

  if not found or entitlement.status <> 'active' then
    raise exception using errcode = 'P0001', message = 'ENTITLEMENT_NOT_ACTIVE';
  end if;
  if entitlement.expires_at is not null and entitlement.expires_at <= now() then
    raise exception using errcode = 'P0001', message = 'ENTITLEMENT_EXPIRED';
  end if;

  select count(*)::integer into capacity_used
  from public.license_installations
  where entitlement_id = p_entitlement_id and status = 'active';

  capacity_used := capacity_used + (
    select count(*)::integer
    from public.license_activation_requests
    where entitlement_id = p_entitlement_id and status = 'processing'
  );

  if capacity_used >= entitlement.max_devices then
    raise exception using errcode = 'P0001', message = 'DEVICE_LIMIT_REACHED';
  end if;

  update public.license_activation_requests
  set status = 'processing', entitlement_id = p_entitlement_id, approved_by = p_user_id
  where user_code = upper(trim(p_user_code))
    and status = 'pending'
    and expires_at > now()
  returning * into request;

  if not found then
    raise exception using errcode = 'P0001', message = 'ACTIVATION_CODE_INVALID';
  end if;

  return next request;
end;
$$;

create trigger license_orders_updated_at before update on public.license_orders
for each row execute function public.set_license_portal_updated_at();
create trigger license_entitlements_updated_at before update on public.license_entitlements
for each row execute function public.set_license_portal_updated_at();
create trigger license_installations_updated_at before update on public.license_installations
for each row execute function public.set_license_portal_updated_at();
create trigger license_activation_requests_updated_at before update on public.license_activation_requests
for each row execute function public.set_license_portal_updated_at();

alter table public.license_orders enable row level security;
alter table public.license_entitlements enable row level security;
alter table public.license_installations enable row level security;
alter table public.license_activation_requests enable row level security;
alter table public.license_payment_events enable row level security;
alter table public.license_audit_entries enable row level security;

create policy "Customers read their own license orders" on public.license_orders
for select to authenticated using (user_id = (select auth.uid()));
create policy "Customers read their own entitlements" on public.license_entitlements
for select to authenticated using (user_id = (select auth.uid()));
create policy "Customers read their own installations" on public.license_installations
for select to authenticated using (
  exists (
    select 1 from public.license_entitlements entitlement
    where entitlement.id = license_installations.entitlement_id
      and entitlement.user_id = (select auth.uid())
  )
);
create policy "Customers read their own license audit" on public.license_audit_entries
for select to authenticated using (user_id = (select auth.uid()));

revoke all on public.license_activation_requests from anon, authenticated;
revoke all on public.license_payment_events from anon, authenticated;
revoke insert, update, delete on public.license_audit_entries from anon, authenticated;
revoke all on function public.reserve_license_activation(uuid, uuid, text) from public, anon, authenticated;
grant execute on function public.reserve_license_activation(uuid, uuid, text) to service_role;
grant select on public.license_orders to authenticated;
grant select on public.license_entitlements to authenticated;
grant select on public.license_installations to authenticated;
grant select on public.license_audit_entries to authenticated;

comment on column public.license_activation_requests.result_license_key is
  'Short-lived signed envelope. Accessible only to the service role and the matching device-code bearer.';
