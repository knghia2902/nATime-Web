create table public.license_products (
  plan_code text not null check (plan_code in ('standard', 'professional')),
  billing_period text not null check (billing_period in ('monthly', 'yearly')),
  amount_vnd bigint not null check (amount_vnd > 0),
  max_employees integer not null check (max_employees > 0),
  max_devices integer not null check (max_devices > 0),
  enabled_modules text[] not null,
  duration_months integer not null check (duration_months in (1, 12)),
  is_active boolean not null default true,
  primary key (plan_code, billing_period)
);

insert into public.license_products
  (plan_code, billing_period, amount_vnd, max_employees, max_devices, enabled_modules, duration_months)
values
  ('standard', 'monthly', 490000, 50, 2, array['Attendance'], 1),
  ('standard', 'yearly', 4704000, 50, 2, array['Attendance'], 12),
  ('professional', 'monthly', 1490000, 500, 10, array['Attendance', 'Access'], 1),
  ('professional', 'yearly', 14304000, 500, 10, array['Attendance', 'Access'], 12)
on conflict (plan_code, billing_period) do update set
  amount_vnd = excluded.amount_vnd,
  max_employees = excluded.max_employees,
  max_devices = excluded.max_devices,
  enabled_modules = excluded.enabled_modules,
  duration_months = excluded.duration_months,
  is_active = true;

alter table public.license_orders
  add column provider_order_code bigint unique,
  add column payment_link_id text unique,
  add column checkout_url text;

create unique index license_entitlements_order_id_uidx
  on public.license_entitlements(order_id)
  where order_id is not null;

alter table public.license_products enable row level security;
create policy "Published products are readable"
on public.license_products for select
to anon, authenticated
using (is_active);
grant select on public.license_products to anon, authenticated;

create or replace function public.process_payos_payment(
  p_provider_event_id text,
  p_payload_sha256 text,
  p_order_code bigint,
  p_amount_vnd bigint,
  p_payment_link_id text,
  p_reference text
)
returns text
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  target_order public.license_orders%rowtype;
  product public.license_products%rowtype;
  event_id uuid;
  entitlement_id uuid;
begin
  insert into public.license_payment_events(provider, provider_event_id, payload_sha256)
  values ('payos', p_provider_event_id, p_payload_sha256)
  on conflict (provider, provider_event_id) do nothing
  returning id into event_id;

  if event_id is null then
    return 'duplicate';
  end if;

  select * into target_order
  from public.license_orders
  where provider_order_code = p_order_code
  for update;

  if not found then
    update public.license_payment_events set status = 'rejected', processed_at = now() where id = event_id;
    return 'order_not_found';
  end if;

  if target_order.amount_vnd <> p_amount_vnd then
    update public.license_payment_events set status = 'rejected', processed_at = now() where id = event_id;
    return 'amount_mismatch';
  end if;

  if target_order.payment_link_id is not null and target_order.payment_link_id <> p_payment_link_id then
    update public.license_payment_events set status = 'rejected', processed_at = now() where id = event_id;
    return 'payment_link_mismatch';
  end if;

  if target_order.status = 'paid' then
    update public.license_payment_events set status = 'processed', processed_at = now() where id = event_id;
    return 'already_paid';
  end if;

  select * into product
  from public.license_products
  where plan_code = target_order.plan_code
    and billing_period = target_order.billing_period
    and is_active;

  if not found then
    update public.license_payment_events set status = 'rejected', processed_at = now() where id = event_id;
    return 'product_not_found';
  end if;

  update public.license_orders set
    status = 'paid',
    paid_at = now(),
    payment_link_id = coalesce(payment_link_id, p_payment_link_id),
    external_reference = coalesce(external_reference, p_reference)
  where id = target_order.id;

  insert into public.license_entitlements(
    user_id, order_id, plan_code, status, max_employees, max_devices,
    enabled_modules, starts_at, expires_at
  ) values (
    target_order.user_id, target_order.id, target_order.plan_code, 'active',
    product.max_employees, product.max_devices, product.enabled_modules,
    now(), now() + make_interval(months => product.duration_months)
  )
  on conflict (order_id) where order_id is not null do nothing
  returning id into entitlement_id;

  insert into public.license_audit_entries(
    user_id, entitlement_id, event_type, correlation_id, details
  ) values (
    target_order.user_id,
    entitlement_id,
    'payment.completed',
    p_provider_event_id,
    jsonb_build_object('orderId', target_order.id, 'provider', 'payos', 'orderCode', p_order_code)
  );

  update public.license_payment_events set status = 'processed', processed_at = now() where id = event_id;
  return 'processed';
end;
$$;

revoke all on function public.process_payos_payment(text, text, bigint, bigint, text, text) from public, anon, authenticated;
grant execute on function public.process_payos_payment(text, text, bigint, bigint, text, text) to service_role;
