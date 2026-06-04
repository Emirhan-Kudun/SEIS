## Summary

Briefly describe what changed and why.

## Related Work

- Linear issue:
- Trend note:
- Additional links:

## Scope

- [ ] Desktop flow verified
- [ ] Mobile flow verified
- [ ] Behance embed order/count unchanged
- [ ] Contact form static contract preserved (`#contact` + JSON endpoint)
- [ ] i18n parity complete (`tr/en/fr/it/de`)

## Test Evidence

- [ ] `node scripts/quality-gate.js`
- [ ] `node scripts/regression-smoke.js`
- [ ] `node scripts/infrastructure-check.js`
- [ ] `node scripts/security-static-check.js`
- [ ] `node scripts/run-core-orchestration.js`
- [ ] Manual hash navigation (`#drawings`, `#contact`, `#tech-stack` alias)
- [ ] Manual form validation + submit UX check

## Risk Notes

- What could regress?
- Rollback step if needed:
