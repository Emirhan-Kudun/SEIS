# Linear Issue Contract

Each generated issue must include all fields below.

## Required Fields

- `title`
- `problem`
- `proposed_change`
- `acceptance_criteria`
- `labels`
- `source_link`
- `status` (`suggested|approved|implemented`)
- `checklist` (step list for implementation tracking)

## Label Set

Use one or more:

- `ux`
- `seo`
- `lead`
- `i18n`

## Acceptance Criteria Minimum

- Desktop flow validated
- Mobile flow validated
- i18n parity validated (`tr/en/fr/it/de`)
- Behance section unchanged unless explicitly approved
- Contact form static contract preserved (`#contact` + endpoint from JSON config)
- Security gate status recorded (`high = 0` before release)
