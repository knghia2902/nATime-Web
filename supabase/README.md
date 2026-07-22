# nATime Supabase backend

The website is a static Next.js export. Sensitive licensing, payment, contact and release operations run in Supabase Edge Functions. The browser never receives an Authority operator key, service role, PayOS key, R2 secret or signing key.

## Required secrets

Licensing and payments:

- `NATIME_LICENSE_AUTHORITY_URL`
- `NATIME_LICENSE_OPERATOR_KEY`
- `NATIME_LICENSE_SIGNING_PRIVATE_KEY_PEM`
- `NATIME_LICENSE_VALIDATION_SECRET`
- `NATIME_ACTIVATION_IP_SALT`
- `NATIME_PORTAL_ORIGINS` — comma-separated; include `https://natime.vn`
- `NATIME_PORTAL_ORIGIN=https://natime.vn`
- `PAYOS_CLIENT_ID`
- `PAYOS_API_KEY`
- `PAYOS_CHECKSUM_KEY`

Contact delivery:

- `RESEND_API_KEY`
- `NATIME_CONTACT_IP_SALT`
- `NATIME_SUPPORT_EMAIL` — optional, defaults to `support@natime.vn`
- `NATIME_CONTACT_FROM` — a verified Resend sender
- `NATIME_SCHEDULER_SECRET` — high-entropy secret for the trial-expiry schedule

Windows release pipeline:

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_QUARANTINE_BUCKET`
- `R2_PUBLIC_BUCKET`
- `R2_PUBLIC_ORIGIN=https://download.natime.vn`
- `NATIME_RELEASE_REPOSITORY` — `owner/repository`
- `GITHUB_RELEASE_TOKEN` — fine-grained token limited to Actions dispatch for that repository
- `NATIME_RELEASE_CALLBACK_SECRET`
- `NATIME_RELEASE_SIGNER_THUMBPRINTS` — comma-separated allowlist

Supabase supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Never create a `NEXT_PUBLIC_` version of a privileged secret.

## Deployment order

1. Back up the Supabase project and review the migration diff.
2. Apply existing migrations in timestamp order, ending with `20260715120000_b2b_portal.sql`.
3. Seed the initial Super Admin by the exact `auth.users.id` UUID in `portal_admins`; do not use email as authorization.
4. Set every required secret.
5. Deploy licensing/payment functions: `license-authority`, `license-activation`, `payment-checkout`, `payos-webhook`.
6. Deploy portal functions: `trial-claim`, `trial-expire`, `contact-submit`.
7. Deploy release functions: `release-upload-init`, `release-upload-complete`, `release-verify-callback`, `release-publish`.
8. Configure the PayOS webhook as `https://kqsarkvwhzhmujaxatns.supabase.co/functions/v1/payos-webhook`.
9. Configure the self-hosted application to use the deployed activation and Authority function URLs.
10. Run pgTAP and the end-to-end UAT checklist before exposing `/admin`.
11. Configure a Supabase Cron invocation of `trial-expire` every 15 minutes with `x-natime-scheduler-secret`; never put this secret in the website bundle.

Functions with custom HMAC/device-code boundaries implement their own verification. Confirm each function's Supabase gateway JWT setting during deployment; do not disable verification without a reviewed in-function boundary.

## R2 configuration

- The quarantine bucket is private. Its CORS policy allows `PUT`, `HEAD` and the signed request headers from `https://natime.vn` only.
- The public bucket is writable only by `release-publish` and is exposed through `download.natime.vn`.
- Browser uploads go directly to a short-lived presigned quarantine URL.
- Only the Windows workflow callback can mark an artifact verified.
- Only an AAL2 Super Admin can publish a verified artifact.

## Payment invariant

The PayOS return URL is informational. Only a signature-verified webhook that matches event, order code, payment link and amount may call `process_payos_payment`. Replays must remain idempotent.

Trial-to-paid conversion and invoice snapshot changes touch this critical function and must receive a separate impact approval before deployment.
