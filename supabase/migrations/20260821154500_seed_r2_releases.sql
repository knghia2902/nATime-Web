-- Seed existing Cloudflare R2 Windows release into Supabase software_releases and release_artifacts

do $$
declare
  v_admin_id uuid;
  v_release_id uuid;
  v_artifact_id uuid;
begin
  select user_id into v_admin_id from public.portal_admins where is_active limit 1;
  if v_admin_id is null then
    select id into v_admin_id from auth.users limit 1;
  end if;

  -- 1. Windows x64 v0.1.63
  select id into v_release_id from public.software_releases where platform = 'windows' and version = '0.1.63';
  if v_release_id is null then
    v_release_id := gen_random_uuid();
    insert into public.software_releases (
      id, platform, architecture, version, status, notes_vi, notes_en, created_by, verified_at, published_at, created_at
    ) values (
      v_release_id,
      'windows',
      'x64',
      '0.1.63',
      'published',
      'Bản cài đặt nATime Windows x64 chính thức — Tự động thiết lập SQL Server, backend Web API .NET 10 và trạm điều hành On-Premise.',
      'Official nATime Windows x64 release — Automatically sets up SQL Server, .NET 10 Web API backend and on-premise operational hub.',
      v_admin_id,
      now(),
      now(),
      now()
    );
  else
    update public.software_releases
    set status = 'published',
        published_at = coalesce(published_at, now()),
        notes_vi = 'Bản cài đặt nATime Windows x64 chính thức — Tự động thiết lập SQL Server, backend Web API .NET 10 và trạm điều hành On-Premise.',
        updated_at = now()
    where id = v_release_id;
  end if;

  select id into v_artifact_id from public.release_artifacts where release_id = v_release_id;
  if v_artifact_id is null then
    v_artifact_id := gen_random_uuid();
    insert into public.release_artifacts (
      id, release_id, r2_key, public_url, filename, size_bytes, sha256, signature_status
    ) values (
      v_artifact_id,
      v_release_id,
      'windows/0.1.63/nATime-Setup-v0.1.63.exe',
      'https://download.natime.vn/windows/0.1.63/nATime-Setup-v0.1.63.exe',
      'nATime-Setup-v0.1.63.exe',
      865184267,
      'a61f275b4ea53bdfdc3cad9a755701aaa75ed43333b6602b1481a0a1b96981f5',
      'valid'
    );
  else
    update public.release_artifacts
    set r2_key = 'windows/0.1.63/nATime-Setup-v0.1.63.exe',
        public_url = 'https://download.natime.vn/windows/0.1.63/nATime-Setup-v0.1.63.exe',
        filename = 'nATime-Setup-v0.1.63.exe',
        size_bytes = 865184267,
        sha256 = 'a61f275b4ea53bdfdc3cad9a755701aaa75ed43333b6602b1481a0a1b96981f5',
        signature_status = 'valid',
        updated_at = now()
    where id = v_artifact_id;
  end if;

end $$;
