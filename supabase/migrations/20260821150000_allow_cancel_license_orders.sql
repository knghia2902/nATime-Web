-- Allow customers to cancel their own pending orders and admins to manage orders

create policy "Customers cancel own pending orders" on public.license_orders
for update to authenticated
using (user_id = (select auth.uid()) and status = 'pending')
with check (user_id = (select auth.uid()) and status = 'cancelled');

create policy "Admins update all license orders" on public.license_orders
for update to authenticated
using (public.is_portal_admin())
with check (public.is_portal_admin());

grant update on public.license_orders to authenticated;
