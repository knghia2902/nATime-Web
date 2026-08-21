-- Robust order cancellation RPC and RLS fix without requiring AAL2

create or replace function public.cancel_license_order(p_order_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user_id uuid;
begin
  select user_id into v_user_id from public.license_orders where id = p_order_id and status = 'pending';
  if not found then
    return false;
  end if;

  -- Allow if caller is the owner or is admin (without strict AAL2 MFA requirement)
  if v_user_id = auth.uid() or public.is_portal_admin(false) then
    update public.license_orders set status = 'cancelled', updated_at = now() where id = p_order_id;
    return true;
  end if;

  return false;
end;
$$;

grant execute on function public.cancel_license_order(uuid) to authenticated;

-- Update RLS policies to use is_portal_admin(false)
drop policy if exists "Admins update all license orders" on public.license_orders;
create policy "Admins update all license orders" on public.license_orders
for update to authenticated
using (public.is_portal_admin(false))
with check (public.is_portal_admin(false));

drop policy if exists "Customers cancel own pending orders" on public.license_orders;
create policy "Customers cancel own pending orders" on public.license_orders
for update to authenticated
using (user_id = (select auth.uid()) and status = 'pending')
with check (user_id = (select auth.uid()) and status = 'cancelled');

grant update on public.license_orders to authenticated;
