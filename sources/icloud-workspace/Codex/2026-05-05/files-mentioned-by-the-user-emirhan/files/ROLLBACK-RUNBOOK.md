# Rollback Runbook

## Trigger Conditions

- Critical UX regression in production
- Contact form submit broken
- Behance embeds broken or reordered accidentally
- Missing i18n keys in live build

## Rollback Steps

1. Freeze new deploys.
2. Re-deploy last known good release on primary host (Vercel).
3. Verify smoke checks:
   - `#drawings` navigation
   - Behance embeds
   - Contact form UX
   - Security gate status (`high = 0`)
   - Connector-step audit log exists in `reports/ecosystem/`
4. If primary deploy cannot be restored quickly, publish fallback on Netlify.
5. Post incident note with root cause and prevention action.

## Verification After Rollback

- [ ] Navigation works
- [ ] Behance list intact
- [ ] Form UX intact
- [ ] i18n keys complete
- [ ] No console errors on first load
