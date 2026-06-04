# Premium Exhibition Add-on Task (Local + Cloud)

This coding task is designed to run in both local and cloud environments without touching the main website code.

## Goal

Build and maintain a standalone premium gallery module under:

- `add-ons/exhibition-photo/`

Main website files such as `index.html` at repo root must remain unchanged.

## Local Workflow

1. Work on branch:

```bash
git switch codex/premium-local-foundation
```

2. Validate governance + quality:

```bash
bash scripts/pre-merge-check.sh
node scripts/local-quality-gate.js --strict
```

3. Open add-on directly:

`/Users/emirhan/Documents/New project/add-ons/exhibition-photo/index.html`

## Cloud Workflow

Use branch:

- `codex/premium-local-foundation`

Setup script:

```bash
bash scripts/codex-cloud-setup.sh
```

Recommended cloud task prompt:

```text
Work only inside add-ons/exhibition-photo.
Do not modify root index.html or existing core scripts.
Keep a premium minimal visual language.
Run:
- bash scripts/pre-merge-check.sh
- node scripts/local-quality-gate.js --strict
Return concise summary and changed files list.
```

## Content Constraints

- No social media showcase sections.
- No alcohol-focused or food-focused framing.
- Keep museum, exhibition, open-space, and photography context only.

## Acceptance

- Add-on renders on mobile and desktop.
- Keyboard-accessible lightbox works (`Esc`, `ArrowLeft`, `ArrowRight`).
- Existing root website remains untouched.
- Governance and quality scripts pass.
