# i18n Contract

## Required Languages

- `tr`
- `en`
- `fr`
- `it`
- `de`

## Rules

1. Every new UI key must be added to all 5 languages in the same change set.
2. Runtime fallback cannot be used as a substitute for missing keys.
3. Keys used in `data-i18n`, `data-i18n-placeholder`, `data-i18n-aria-label`, and `data-i18n-alt` are all mandatory.
4. Language selection persistence (`localStorage` + `?lang=`) must continue to work after each sprint.

## Validation

- Run `node scripts/quality-gate.js`.
- Confirm output contains `No i18n contract violations`.
