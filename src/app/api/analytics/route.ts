import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const path = String(body.path || '/');

    if (!supabase) {
      return NextResponse.json({ ok: false, message: 'Supabase client unavailable' }, { status: 500 });
    }

    // Ghi nhận lượt xem vào bảng page_views
    const { error: pageViewError } = await supabase.from('page_views').insert({
      path,
      user_agent: request.headers.get('user-agent') || '',
      referrer: request.headers.get('referer') || ''
    });

    // Nếu bảng page_views chưa tồn tại hoặc bị lỗi RLS, fallback ghi vào license_audit_entries để đảm bảo 100% đếm được
    if (pageViewError) {
      await supabase.from('license_audit_entries').insert({
        event_type: 'site.visited',
        details: { path, ua: request.headers.get('user-agent') || 'browser' }
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
