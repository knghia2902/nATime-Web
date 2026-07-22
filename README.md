# nATime website and customer portal

Static B2B website, customer portal, licensing checkout and release administration for [natime.vn](https://natime.vn).

## Architecture

- Next.js static export deployed to Cloudflare Pages.
- Supabase Auth, Postgres, RLS and Edge Functions for customer and administrator workflows.
- PayOS checkout; only a verified webhook can mark an order paid.
- Cloudflare R2 quarantine and public buckets for signed Windows installers.
- GitHub Actions Windows runner verifies Authenticode and SHA-256 before publishing.
- No VPS is required and no service-role, PayOS, R2 or signing secret is exposed to the browser.

Public content lives at `/` and `/en`. Customer functions live under `/portal`; `/dashboard` permanently redirects to it. System administration lives under `/admin` and requires a `portal_admins` UUID plus Supabase AAL2.

## Local verification

```powershell
npm install
npm run lint
npm run test:payos
npm run test:license
npm run build
```

The production site is a static export. Do not add server-only Next.js handlers; privileged operations belong in authenticated Supabase Edge Functions.

## Deployment

See [supabase/README.md](supabase/README.md) for migrations, secrets and function order. Cloudflare Pages must publish the Next.js `out` directory and preserve `public/_redirects`.

Release infrastructure additionally requires:

1. Two private R2 buckets: quarantine and public-release storage.
2. R2 CORS that permits `PUT` from `https://natime.vn` only for the quarantine bucket.
3. `download.natime.vn` mapped to the public bucket through an R2 custom domain.
4. The GitHub Actions callback secret configured identically in Supabase and GitHub.
5. The approved Authenticode signer thumbprint allowlist in Supabase Secrets.

Never commit `.env*`, keys, customer records, logs or release-signing material.
