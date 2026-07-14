# nATime license portal backend

The public site remains a static Next.js export. Sensitive license operations run in the `license-activation` Supabase Edge Function; the browser never receives the License Authority operator key.

## Required function secrets

- `NATIME_LICENSE_AUTHORITY_URL`
- `NATIME_LICENSE_OPERATOR_KEY`
- `NATIME_LICENSE_SIGNING_PRIVATE_KEY_PEM`
- `NATIME_LICENSE_VALIDATION_SECRET`
- `NATIME_ACTIVATION_IP_SALT`
- `NATIME_PORTAL_ORIGINS` (comma-separated; defaults to `https://natime.vn`)
- `NATIME_PORTAL_ORIGIN` (checkout return/cancel origin; defaults to `https://natime.vn`)
- `PAYOS_CLIENT_ID`
- `PAYOS_API_KEY`
- `PAYOS_CHECKSUM_KEY`

Supabase provides `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to deployed functions. Do not use `NEXT_PUBLIC_` for any Authority or service-role secret.

## Deployment order

1. Apply `supabase/migrations/20260713190000_license_portal.sql`.
2. Set the required function secrets.
3. Deploy `license-authority`, `license-activation`, `payment-checkout`, and `payos-webhook`. Gateway JWT verification is disabled because each function implements its own boundary: Authority operator actions use a fixed-time compared server secret, customer actions validate the Supabase bearer session, PayOS validates HMAC, and device request/poll uses a high-entropy bearer code.
4. Configure PayOS webhook URL as `https://kqsarkvwhzhmujaxatns.supabase.co/functions/v1/payos-webhook`.
5. Set `NATIME_LICENSE_AUTHORITY_URL=https://kqsarkvwhzhmujaxatns.supabase.co/functions/v1/license-authority`.
6. Configure the self-hosted WebPortal to call `https://kqsarkvwhzhmujaxatns.supabase.co/functions/v1/license-activation` and the local API Authority URL to the `license-authority` function.

The PayOS return URL is informational only. `process_payos_payment` is the only path that marks an order paid and creates an entitlement, after HMAC verification, amount matching, and payment-event idempotency.
