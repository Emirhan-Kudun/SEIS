# Premium Website Task (Local + Cloud Continuity)

This task keeps premium website development consistent across local and cloud setups.

## Target Branch

- `codex/premium-local-foundation`

## Scope

- Main premium page: `index.html`
- Exhibition module: `add-ons/exhibition-photo/*`
- Governance and quality scripts remain active.

## Local Workflow

```bash
git switch codex/premium-local-foundation
node scripts/local-quality-gate.js --strict
bash scripts/pre-merge-check.sh
```

Open for local preview:

- `/Users/emirhan/Documents/New project/index.html`
- `/Users/emirhan/Documents/New project/add-ons/exhibition-photo/index.html`

## Cloud Workflow

Setup command:

```bash
bash scripts/codex-cloud-setup.sh
```

Recommended cloud task prompt:

```text
Work on branch codex/premium-local-foundation.
Keep premium visual quality and responsive behavior.
Focus only on index.html and add-ons/exhibition-photo when needed.
Do not add dependencies.
Run:
- node scripts/local-quality-gate.js --strict
- bash scripts/pre-merge-check.sh
Return changed files and concise pass/fail summary.
```

## Guardrails

- Keep one cohesive premium design direction.
- No social-media themed showcase sections.
- No alcohol-focused or food-focused framing.
- Keep changes small and reversible.
