# SEIS Testing Strategy

Date: 2026-06-19

The layered testing approach for the SEIS ecosystem (V16 §30). It builds on the
existing [`lightweight-checks.md`](./lightweight-checks.md) and the governance
`check:*` scripts; this doc gives the full picture and the honesty rules.

## Layers

| Layer | Purpose | Where |
|---|---|---|
| Governance checks | foundation, doc-links, closed-code, ai-core, design-system | `npm run check:governance`, `check:foundation`, `check:workspace` |
| Unit | pure logic in packages | per-package (as code lands) |
| Integration | adapter ↔ contract behaviour | model-router/provider adapters, API handlers |
| Contract | API request/response + error shape | `docs/architecture/api-design.md` |
| Component / E2E | cockpit flows, navigation, states | `apps/web` (static smoke first) |
| Accessibility | WCAG 2.2 AA, keyboard, reduced motion | cockpit panels (V16 §28) |
| Security / permission | authz, secret redaction, capability limits | secret scan, permission tests |
| Failure-path | cancellation, retry, recovery | automation + remote ops |
| Research (future) | tokenizer, training smoke, checkpoint restore, prompt regression | SEIS Universe (V16 §18) |

## What to run now

```bash
npm run check:governance     # constitution, ai-routing-policy, ai-core, open-modules, doc-links, design-system
npm run check:foundation
npm run check:workspace
npm test --if-present
```

Browser smoke (only when visual verification is needed; static, local):

```bash
python3 -m http.server 4174 --bind 127.0.0.1
```

## Rules (V16 §30)

- Run the **lightest reliable check first**; scale testing to blast radius.
- **Never claim tests passed if they were not run.** Report exactly what ran and
  what did not.
- Never hide a failed check or weaken a gate to make CI green (V16 §4).
- Do not run destructive SSH/infra tests against production; use isolated
  fixtures/containers/test hosts.
- Visual/native rendering not executed in CI must be flagged for manual review
  before merge (as prior cockpit PRs have done).

## Promotion gates

A change is testable-complete only when required checks pass, security
implications are reviewed, docs match reality, and rollback is understood
(V16 §38). Model versions promote only past explicit quality/safety/regression
gates (V16 §18 Phase 7).
