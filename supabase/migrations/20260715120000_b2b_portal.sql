create extension if not exists pgcrypto;

alter table public.license_entitlements
  add column if not exists origin text not null default 'paid'
  check (origin in ('trial', 'paid', 'manual'));

create table public.portal_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  organization_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_portal_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.portal_profiles(user_id, display_name, organization_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', ''), coalesce(new.raw_user_meta_data->>'company', ''))
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger auth_user_created_portal_profile
after insert on auth.users for each row execute function public.handle_new_portal_user();

insert into public.portal_profiles(user_id, display_name, organization_name)
select id, coalesce(raw_user_meta_data->>'name', raw_user_meta_data->>'full_name', ''), coalesce(raw_user_meta_data->>'company', '')
from auth.users on conflict (user_id) do nothing;

create table public.portal_admins (
  user_id uuid primary key references auth.users(id) on delete restrict,
  role text not null default 'super_admin' check (role = 'super_admin'),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.is_portal_admin(require_aal2 boolean default true)
returns boolean
language sql
stable
security definer
set search_path = public, auth, pg_temp
as $$
  select exists (
    select 1 from public.portal_admins administrator
    where administrator.user_id = (select auth.uid()) and administrator.is_active
  ) and (not require_aal2 or coalesce((select auth.jwt()->>'aal'), 'aal1') = 'aal2');
$$;

revoke all on function public.is_portal_admin(boolean) from public, anon;
grant execute on function public.is_portal_admin(boolean) to authenticated, service_role;

create table public.license_trial_offers (
  plan_code text primary key check (plan_code = 'standard'),
  duration_days integer not null check (duration_days between 1 and 30),
  max_employees integer not null check (max_employees > 0),
  max_devices integer not null check (max_devices = 1),
  enabled_modules text[] not null,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.license_trial_offers(plan_code, duration_days, max_employees, max_devices, enabled_modules)
values ('standard', 7, 50, 1, array['Attendance'])
on conflict (plan_code) do update set duration_days = excluded.duration_days, max_employees = excluded.max_employees,
  max_devices = excluded.max_devices, enabled_modules = excluded.enabled_modules, is_active = true, updated_at = now();

create table public.license_trial_claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete restrict,
  entitlement_id uuid not null unique references public.license_entitlements(id) on delete restrict,
  hardware_id_hash text unique,
  claimed_at timestamptz not null default now(),
  expires_at timestamptz not null,
  constraint license_trial_claim_expiry check (expires_at > claimed_at)
);

create or replace function public.claim_license_trial(p_user_id uuid)
returns public.license_entitlements
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  offer public.license_trial_offers%rowtype;
  entitlement public.license_entitlements%rowtype;
begin
  if p_user_id is null then raise exception using errcode = 'P0001', message = 'USER_REQUIRED'; end if;
  if exists (select 1 from public.license_trial_claims where user_id = p_user_id) then
    raise exception using errcode = 'P0001', message = 'TRIAL_ALREADY_CLAIMED';
  end if;
  select * into offer from public.license_trial_offers where plan_code = 'standard' and is_active for update;
  if not found then raise exception using errcode = 'P0001', message = 'TRIAL_NOT_AVAILABLE'; end if;

  insert into public.license_entitlements(user_id, plan_code, status, max_employees, max_devices, enabled_modules, starts_at, expires_at, origin)
  values (p_user_id, offer.plan_code, 'active', offer.max_employees, offer.max_devices, offer.enabled_modules, now(), now() + make_interval(days => offer.duration_days), 'trial')
  returning * into entitlement;

  insert into public.license_trial_claims(user_id, entitlement_id, expires_at)
  values (p_user_id, entitlement.id, entitlement.expires_at);

  insert into public.license_audit_entries(user_id, entitlement_id, event_type, correlation_id, details)
  values (p_user_id, entitlement.id, 'trial.claimed', 'trial:' || entitlement.id::text, jsonb_build_object('durationDays', offer.duration_days));
  return entitlement;
end;
$$;

revoke all on function public.claim_license_trial(uuid) from public, anon, authenticated;
grant execute on function public.claim_license_trial(uuid) to service_role;

create or replace function public.expire_license_trials()
returns integer
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  expired_entitlement record;
  affected integer := 0;
begin
  for expired_entitlement in
    update public.license_entitlements
    set status = 'expired', updated_at = now()
    where origin = 'trial' and status = 'active' and expires_at <= now()
    returning id, user_id, expires_at
  loop
    affected := affected + 1;
    insert into public.license_audit_entries(user_id, entitlement_id, event_type, correlation_id, details)
    values (
      expired_entitlement.user_id,
      expired_entitlement.id,
      'trial.expired',
      'trial-expiry:' || expired_entitlement.id::text,
      jsonb_build_object('expiredAt', expired_entitlement.expires_at)
    );
  end loop;
  return affected;
end;
$$;

revoke all on function public.expire_license_trials() from public, anon, authenticated;
grant execute on function public.expire_license_trials() to service_role;

create or replace function public.enforce_trial_hardware_once()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, pg_temp
as $$
declare
  entitlement_origin text;
  claimant uuid;
  hardware_hash text;
begin
  if old.status is not distinct from new.status or new.status <> 'processing' or new.entitlement_id is null then
    return new;
  end if;

  select origin, user_id into entitlement_origin, claimant
  from public.license_entitlements where id = new.entitlement_id;
  if entitlement_origin <> 'trial' then return new; end if;

  hardware_hash := encode(digest(new.hardware_id, 'sha256'), 'hex');
  if exists (
    select 1 from public.license_trial_claims
    where hardware_id_hash = hardware_hash and user_id <> claimant
  ) then
    raise exception using errcode = 'P0001', message = 'TRIAL_HARDWARE_ALREADY_USED';
  end if;

  update public.license_trial_claims
  set hardware_id_hash = coalesce(hardware_id_hash, hardware_hash)
  where entitlement_id = new.entitlement_id and user_id = claimant
    and (hardware_id_hash is null or hardware_id_hash = hardware_hash);
  if not found then raise exception using errcode = 'P0001', message = 'TRIAL_HARDWARE_MISMATCH'; end if;
  return new;
end;
$$;

create trigger license_activation_trial_hardware_guard
before update of status, entitlement_id on public.license_activation_requests
for each row execute function public.enforce_trial_hardware_once();

create table public.order_billing_details (
  order_id uuid primary key references public.license_orders(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete restrict,
  organization_name text not null,
  tax_code text,
  billing_address text not null,
  billing_email text not null,
  status text not null default 'requested' check (status in ('requested', 'processing', 'issued', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  company text,
  kind text not null check (kind in ('general', 'enterprise', 'support')),
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  source_ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.software_releases (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform = 'windows'),
  architecture text not null default 'x64' check (architecture = 'x64'),
  version text not null,
  status text not null default 'draft' check (status in ('draft', 'uploaded', 'verifying', 'verified', 'published', 'withdrawn', 'failed')),
  notes_vi text,
  notes_en text,
  created_by uuid not null references auth.users(id) on delete restrict,
  verified_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (platform, architecture, version)
);

create table public.release_artifacts (
  id uuid primary key default gen_random_uuid(),
  release_id uuid not null unique references public.software_releases(id) on delete restrict,
  r2_key text not null unique,
  public_url text,
  filename text not null,
  size_bytes bigint not null check (size_bytes > 0),
  sha256 text check (sha256 is null or sha256 ~ '^[0-9a-f]{64}$'),
  signature_status text not null default 'pending' check (signature_status in ('pending', 'valid', 'invalid', 'error')),
  signer_thumbprint text,
  verification_details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.portal_audit_entries (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  target_type text not null,
  target_id text,
  correlation_id text not null,
  before_state jsonb,
  after_state jsonb,
  created_at timestamptz not null default now()
);

create trigger portal_profiles_updated_at before update on public.portal_profiles
for each row execute function public.set_license_portal_updated_at();
create trigger order_billing_details_updated_at before update on public.order_billing_details
for each row execute function public.set_license_portal_updated_at();
create trigger contact_requests_updated_at before update on public.contact_requests
for each row execute function public.set_license_portal_updated_at();
create trigger software_releases_updated_at before update on public.software_releases
for each row execute function public.set_license_portal_updated_at();
create trigger release_artifacts_updated_at before update on public.release_artifacts
for each row execute function public.set_license_portal_updated_at();

alter table public.portal_profiles enable row level security;
alter table public.portal_admins enable row level security;
alter table public.license_trial_offers enable row level security;
alter table public.license_trial_claims enable row level security;
alter table public.order_billing_details enable row level security;
alter table public.contact_requests enable row level security;
alter table public.software_releases enable row level security;
alter table public.release_artifacts enable row level security;
alter table public.portal_audit_entries enable row level security;

create policy "Customers manage own profile" on public.portal_profiles for all to authenticated
using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "Admins read administrator record" on public.portal_admins for select to authenticated
using (user_id = (select auth.uid()) and public.is_portal_admin(false));
create policy "Trial offers are public" on public.license_trial_offers for select to anon, authenticated using (is_active);
create policy "Customers read own trial claim" on public.license_trial_claims for select to authenticated using (user_id = (select auth.uid()));
create policy "Customers read own billing details" on public.order_billing_details for select to authenticated using (user_id = (select auth.uid()));
create policy "Published releases are public" on public.software_releases for select to anon, authenticated using (status = 'published');
create policy "Published signed artifacts are public" on public.release_artifacts for select to anon, authenticated using (
  signature_status = 'valid' and exists (select 1 from public.software_releases release where release.id = release_id and release.status = 'published')
);

create policy "Admins read all orders" on public.license_orders for select to authenticated using (public.is_portal_admin());
create policy "Admins read all entitlements" on public.license_entitlements for select to authenticated using (public.is_portal_admin());
create policy "Admins read all installations" on public.license_installations for select to authenticated using (public.is_portal_admin());
create policy "Admins read all license audit" on public.license_audit_entries for select to authenticated using (public.is_portal_admin());
create policy "Admins manage contacts" on public.contact_requests for all to authenticated using (public.is_portal_admin()) with check (public.is_portal_admin());
create policy "Admins manage releases" on public.software_releases for all to authenticated using (public.is_portal_admin()) with check (public.is_portal_admin());
create policy "Admins manage release artifacts" on public.release_artifacts for all to authenticated using (public.is_portal_admin()) with check (public.is_portal_admin());
create policy "Admins read portal audit" on public.portal_audit_entries for select to authenticated using (public.is_portal_admin());
create policy "Admins manage billing details" on public.order_billing_details for all to authenticated using (public.is_portal_admin()) with check (public.is_portal_admin());

grant select, insert, update on public.portal_profiles to authenticated;
grant select on public.portal_admins to authenticated;
grant select on public.license_trial_offers to anon, authenticated;
grant select on public.license_trial_claims to authenticated;
grant select on public.order_billing_details to authenticated;
grant select on public.software_releases, public.release_artifacts to anon, authenticated;
grant select, update on public.contact_requests to authenticated;
grant select, insert, update on public.software_releases, public.release_artifacts to authenticated;
grant select on public.portal_audit_entries to authenticated;

revoke insert, update, delete on public.license_trial_claims from anon, authenticated;
revoke insert, update, delete on public.portal_admins from anon, authenticated;
revoke insert, update, delete on public.portal_audit_entries from anon, authenticated;

comment on table public.portal_admins is 'Seed the single super-admin by auth.users UUID; never by hard-coded email.';
comment on table public.order_billing_details is 'Invoice request snapshot only; does not guarantee VAT invoice issuance.';
