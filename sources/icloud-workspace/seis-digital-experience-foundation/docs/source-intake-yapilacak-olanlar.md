# Yapilacak Olanlar Source Intake

The remaining standalone portfolio files from `Downloads/Yapılacak olanlar/files` have been moved into the canonical iCloud GitHub repository as reviewed source intake.

## Canonical Location

- `source-intake/yapilacak-olanlar/index.html`
- `source-intake/yapilacak-olanlar/style.css`
- `source-intake/yapilacak-olanlar/script.js`
- `source-intake/yapilacak-olanlar/emirhan-kudun-portfolio.html`

## Why This Is Not The Root Runtime

The files are valuable as a design and interaction reference, but they should not overwrite the active root portfolio. The current repository has stronger governance, full-stack runtime checks, security checks, UX Apps module checks, and duplicate cleanup.

## Promotion Candidates

- Editorial serif/sans typography pairing.
- Dreamweaver-compatible fallback layout ideas.
- Custom cursor and motion pacing, subject to reduced-motion and low-power constraints.
- Turkish-first portfolio copy fragments that can be reviewed for i18n parity.

## Guardrail

`npm run check:source-intake` verifies that this intake stays source-only and avoids local metadata, zipped archives, dependency folders, and runtime data.
