-- Fix Admin RLS policies to use is_portal_admin(false) without requiring AAL2 MFA

drop policy if exists "Admins manage releases" on public.software_releases;
create policy "Admins manage releases" on public.software_releases
for all to authenticated
using (public.is_portal_admin(false))
with check (public.is_portal_admin(false));

drop policy if exists "Admins manage release artifacts" on public.release_artifacts;
create policy "Admins manage release artifacts" on public.release_artifacts
for all to authenticated
using (public.is_portal_admin(false))
with check (public.is_portal_admin(false));

drop policy if exists "Admins manage contacts" on public.contact_requests;
create policy "Admins manage contacts" on public.contact_requests
for all to authenticated
using (public.is_portal_admin(false))
with check (public.is_portal_admin(false));

drop policy if exists "Admins read portal audit" on public.portal_audit_entries;
create policy "Admins read portal audit" on public.portal_audit_entries
for select to authenticated
using (public.is_portal_admin(false));

drop policy if exists "Admins read all entitlements" on public.license_entitlements;
create policy "Admins read all entitlements" on public.license_entitlements
for select to authenticated
using (public.is_portal_admin(false));

drop policy if exists "Admins read all installations" on public.license_installations;
create policy "Admins read all installations" on public.license_installations
for select to authenticated
using (public.is_portal_admin(false));

drop policy if exists "Admins read all license audit" on public.license_audit_entries;
create policy "Admins read all license audit" on public.license_audit_entries
for select to authenticated
using (public.is_portal_admin(false));

drop policy if exists "Admins manage billing details" on public.order_billing_details;
create policy "Admins manage billing details" on public.order_billing_details
for all to authenticated
using (public.is_portal_admin(false))
with check (public.is_portal_admin(false));

-- Helper function to register an existing R2 release directly into Supabase
create or replace function public.register_r2_release(
  p_version text,
  p_filename text,
  p_r2_key text,
  p_size_bytes bigint,
  p_notes_vi text default null,
  p_notes_en text default null,
  p_status text default 'published'
)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_release_id uuid;
  v_artifact_id uuid;
  v_user_id uuid;
begin
  if not public.is_portal_admin(false) then
    raise exception 'FORBIDDEN';
  end if;

  v_user_id := auth.uid();
  if v_user_id is null then
    select user_id into v_user_id from public.portal_admins where is_active limit 1;
  end if;

  select id into v_release_id
  from public.software_releases
  where platform = 'windows' and architecture = 'x64' and version = p_version;

  if v_release_id is null then
    v_release_id := gen_random_uuid();
    insert into public.software_releases (
      id, platform, architecture, version, status, notes_vi, notes_en, created_by, published_at
    ) values (
      v_release_id, 'windows', 'x64', p_version, p_status, p_notes_vi, p_notes_en, v_user_id,
      case when p_status = 'published' then now() else null end
    );
  else
    update public.software_releases
    set status = p_status,
        notes_vi = coalesce(p_notes_vi, notes_vi),
        notes_en = coalesce(p_notes_en, notes_en),
        published_at = case when p_status = 'published' then coalesce(published_at, now()) else published_at end,
        updated_at = now()
    where id = v_release_id;
  end if;

  select id into v_artifact_id
  from public.release_artifacts
  where release_id = v_release_id;

  if v_artifact_id is null then
    v_artifact_id := gen_random_uuid();
    insert into public.release_artifacts (
      id, release_id, r2_key, filename, size_bytes, signature_status
    ) values (
      v_artifact_id, v_release_id, p_r2_key, p_filename, coalesce(p_size_bytes, 104857600), 'valid'
    );
  else
    update public.release_artifacts
    set r2_key = p_r2_key,
        filename = p_filename,
        size_bytes = coalesce(p_size_bytes, size_bytes),
        signature_status = 'valid',
        updated_at = now()
    where id = v_artifact_id;
  end if;

  return v_release_id;
end;
$$;

grant execute on function public.register_r2_release(text, text, text, bigint, text, text, text) to authenticated, service_role;
