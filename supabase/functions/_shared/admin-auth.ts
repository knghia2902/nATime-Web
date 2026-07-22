import type { SupabaseClient, User } from 'npm:@supabase/supabase-js@2.110.2';

export async function requireSuperAdmin(request: Request, admin: SupabaseClient): Promise<User> {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) throw new Error('UNAUTHORIZED');
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) throw new Error('UNAUTHORIZED');
  const payload = jwtPayload(token);
  if (payload.aal !== 'aal2') throw new Error('MFA_REQUIRED');
  const { data: operator } = await admin.from('portal_admins').select('user_id').eq('user_id', data.user.id).eq('is_active', true).maybeSingle();
  if (!operator) throw new Error('FORBIDDEN');
  return data.user;
}

function jwtPayload(token: string): Record<string, unknown> {
  try {
    const value = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(value.padEnd(Math.ceil(value.length / 4) * 4, '=')));
  } catch { throw new Error('UNAUTHORIZED'); }
}

export function adminStatus(error: unknown) {
  const code = error instanceof Error ? error.message : 'ADMIN_REQUEST_FAILED';
  return { code, status: code === 'UNAUTHORIZED' ? 401 : code === 'MFA_REQUIRED' || code === 'FORBIDDEN' ? 403 : 400 };
}
