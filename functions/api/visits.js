// Cloudflare Pages Function — Server-side proxy for counterapi.dev
// Eliminates ALL browser CORS restrictions by proxying through same-origin natime.vn
export async function onRequestGet(context) {
  try {
    const res = await fetch('https://api.counterapi.dev/v1/natime.vn/visits');
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ count: 0, error: String(err) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestPost(context) {
  try {
    const res = await fetch('https://api.counterapi.dev/v1/natime.vn/visits/up');
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ count: 0, error: String(err) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
