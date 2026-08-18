-- Preserve scoped Professional quotas when an authority license is issued.

alter table public.license_authority_licenses
  add column if not exists max_attendance_devices integer,
  add column if not exists max_faceid_devices integer;

update public.license_authority_licenses authority
set max_attendance_devices = coalesce(entitlement.max_attendance_devices, entitlement.max_devices),
    max_faceid_devices = coalesce(entitlement.max_faceid_devices, entitlement.max_devices),
    updated_at = now()
from public.license_entitlements entitlement
where entitlement.id = authority.entitlement_id
  and authority.product_tier = 'professional';

create or replace function public.apply_authority_device_quotas()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  entitlement public.license_entitlements%rowtype;
begin
  select * into entitlement
  from public.license_entitlements
  where id = new.entitlement_id;

  if new.product_tier = 'professional' and entitlement.id is not null then
    new.max_attendance_devices := coalesce(entitlement.max_attendance_devices, entitlement.max_devices, new.max_devices);
    new.max_faceid_devices := coalesce(entitlement.max_faceid_devices, entitlement.max_devices, new.max_devices);
  end if;
  return new;
end;
$$;

drop trigger if exists apply_authority_device_quotas_on_license
on public.license_authority_licenses;
create trigger apply_authority_device_quotas_on_license
before insert or update of entitlement_id, product_tier, max_devices
on public.license_authority_licenses
for each row execute function public.apply_authority_device_quotas();
