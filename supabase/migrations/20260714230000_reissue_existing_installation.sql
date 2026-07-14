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
  hardware_hash text;
  existing_installation_id uuid;
  existing_installation_status text;
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

  select * into request
  from public.license_activation_requests
  where user_code = upper(trim(p_user_code))
    and status = 'pending'
    and expires_at > now()
  for update;

  if not found then
    raise exception using errcode = 'P0001', message = 'ACTIVATION_CODE_INVALID';
  end if;

  hardware_hash := encode(digest(request.hardware_id, 'sha256'), 'hex');
  select id, status into existing_installation_id, existing_installation_status
  from public.license_installations
  where entitlement_id = p_entitlement_id
    and hardware_id_hash = hardware_hash
  for update;

  if existing_installation_status is distinct from 'active' then
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
  end if;

  update public.license_activation_requests
  set status = 'processing', entitlement_id = p_entitlement_id, approved_by = p_user_id
  where id = request.id
  returning * into request;

  return next request;
end;
$$;

revoke all on function public.reserve_license_activation(uuid, uuid, text) from public, anon, authenticated;
grant execute on function public.reserve_license_activation(uuid, uuid, text) to service_role;

comment on function public.reserve_license_activation(uuid, uuid, text) is
  'Reserves device capacity while allowing the same entitlement and Hardware ID to replace its existing installation license without consuming another slot.';
