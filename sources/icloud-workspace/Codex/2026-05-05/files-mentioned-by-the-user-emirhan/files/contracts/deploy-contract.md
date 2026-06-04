# Deploy Contract

## Role Split

- Primary: Vercel
- Fallback: Netlify

## Release Rules

1. Preview deploy must pass smoke checks before production promotion.
2. Release notes must include related Linear issue IDs.
3. Behance embed count/order must match baseline.
4. Language integrity checks must pass before release.
5. Rollback path must be documented for each release.
6. Security gate must record `high findings = 0` before production promotion.
7. Guarded write state of release tasks must be `approved` or `implemented`.

## Contact Form Constraint

- Static contract: `index.html` form action remains `#contact`.
- Runtime endpoint resolution is hybrid:
  1) `window.__CONTACT_ENDPOINT__` from `site-config.json`
  2) `data-endpoint` on form
  3) fallback `contact.php`
- Deploy target should provide `CONTACT_TO` env var for backend recipient override when needed.
