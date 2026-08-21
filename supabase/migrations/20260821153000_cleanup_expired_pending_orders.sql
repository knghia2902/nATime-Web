-- Automatically mark all expired pending orders (> 15 minutes old) as cancelled in Supabase database
update public.license_orders
set status = 'cancelled', updated_at = now()
where status = 'pending'
  and created_at < now() - interval '15 minutes';

-- Create RPC function to expire old pending orders automatically on page load
create or replace function public.cleanup_expired_license_orders()
returns integer
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_affected integer;
begin
  update public.license_orders
  set status = 'cancelled', updated_at = now()
  where status = 'pending'
    and created_at < now() - interval '15 minutes';
  get diagnostics v_affected = row_count;
  return v_affected;
end;
$$;

grant execute on function public.cleanup_expired_license_orders() to anon, authenticated, service_role;
