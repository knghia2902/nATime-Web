-- Update license_products table with latest pricing and device quotas
update public.license_products
set amount_vnd = 1990000,
    max_employees = 1000,
    max_devices = 20,
    max_attendance_devices = 15,
    max_faceid_devices = 20
where plan_code = 'professional' and billing_period = 'monthly';

update public.license_products
set amount_vnd = 19104000,
    max_employees = 1000,
    max_devices = 20,
    max_attendance_devices = 15,
    max_faceid_devices = 20
where plan_code = 'professional' and billing_period = 'yearly';
