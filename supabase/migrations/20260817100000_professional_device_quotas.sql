-- Align Professional quotas across product catalog and active entitlements.
-- max_devices is the total device ceiling; the scoped ceilings are used by
-- attendance and FaceID device provisioning respectively.

alter table public.license_products
  add column if not exists max_attendance_devices integer,
  add column if not exists max_faceid_devices integer;

update public.license_products
set max_devices = 20,
    max_attendance_devices = 15,
    max_faceid_devices = 20
where plan_code = 'professional';

update public.license_products
set max_attendance_devices = 2,
    max_faceid_devices = 0
where plan_code = 'standard';

alter table public.license_entitlements
  add column if not exists max_attendance_devices integer,
  add column if not exists max_faceid_devices integer;

create or replace function public.apply_professional_device_quotas()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.plan_code = 'professional' then
    new.max_devices := greatest(new.max_devices, 20);
    new.max_attendance_devices := greatest(coalesce(new.max_attendance_devices, 0), 15);
    new.max_faceid_devices := greatest(coalesce(new.max_faceid_devices, 0), 20);
  end if;
  return new;
end;
$$;

drop trigger if exists apply_professional_device_quotas_on_entitlement
on public.license_entitlements;
create trigger apply_professional_device_quotas_on_entitlement
before insert or update of plan_code, max_devices, max_attendance_devices, max_faceid_devices
on public.license_entitlements
for each row execute function public.apply_professional_device_quotas();

do $$
declare
  changed_entitlement record;
begin
  create temp table professional_quota_changes(
    id uuid,
    user_id uuid,
    previous_max_devices integer,
    previous_max_attendance_devices integer,
    previous_max_faceid_devices integer
  ) on commit drop;

  insert into professional_quota_changes
  select id, user_id, max_devices, max_attendance_devices, max_faceid_devices
  from public.license_entitlements
  where plan_code = 'professional'
    and status = 'active'
    and (max_devices < 20
      or coalesce(max_attendance_devices, max_devices) < 15
      or coalesce(max_faceid_devices, max_devices) < 20);

  update public.license_entitlements
  set max_devices = greatest(max_devices, 20),
      max_attendance_devices = greatest(coalesce(max_attendance_devices, 0), 15),
      max_faceid_devices = greatest(coalesce(max_faceid_devices, 0), 20),
      updated_at = now()
  where id in (select id from professional_quota_changes);

  for changed_entitlement in
    select * from professional_quota_changes
  loop
    insert into public.license_audit_entries(
      user_id, entitlement_id, event_type, correlation_id, details
    ) values (
      changed_entitlement.user_id,
      changed_entitlement.id,
      'license.entitlement.quota_updated',
      'professional-device-quota-20:' || changed_entitlement.id::text,
      jsonb_build_object(
        'planCode', 'professional',
        'previousMaxDevices', changed_entitlement.previous_max_devices,
        'maxDevices', 20,
        'previousMaxAttendanceDevices', changed_entitlement.previous_max_attendance_devices,
        'maxAttendanceDevices', 15,
        'previousMaxFaceIdDevices', changed_entitlement.previous_max_faceid_devices,
        'maxFaceIdDevices', 20,
        'reason', 'Professional plan quota adjustment'
      )
    )
    on conflict do nothing;
  end loop;
end $$;
