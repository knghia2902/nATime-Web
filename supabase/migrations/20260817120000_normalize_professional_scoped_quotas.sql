-- Normalize legacy Professional rows where scoped quotas were null and
-- previously fell back to the total device quota.

update public.license_entitlements
set max_devices = 20,
    max_attendance_devices = 15,
    max_faceid_devices = 20,
    updated_at = now()
where plan_code = 'professional'
  and status = 'active';

update public.license_authority_licenses authority
set max_devices = 20,
    max_attendance_devices = 15,
    max_faceid_devices = 20,
    updated_at = now()
where product_tier = 'professional'
  and revoked_at_utc is null;
