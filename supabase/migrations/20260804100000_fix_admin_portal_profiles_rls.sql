-- Fix RLS policy on portal_profiles to allow Super Admins to read all customer profiles

create policy "Admins read all portal_profiles" on public.portal_profiles
for select to authenticated
using (public.is_portal_admin());
