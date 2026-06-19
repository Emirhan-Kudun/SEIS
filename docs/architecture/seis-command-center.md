# SEIS Command Center

Date: 2026-06-19

The SEIS Command Center is the operating interface of the SEIS ecosystem (V16
§8–§9). It is **not** a generic dashboard: every control must be real,
deliberately disabled, or clearly marked as a prototype (V16 §8). It is realised
as the existing static cockpit in [`apps/web`](../../apps/web/cockpit.html) and
evolves incrementally (V16 §24 phases).

## Current surface

The cockpit ships these panels today:
`build`, `plugins`, `repository`, `research`, `security`, `workspace`. It renders
from local JSON records under [`data/`](../../data) and `content/`, honours
reduced motion, and consumes the [SEIS Design System](../../packages/ui/README.md).

## V16 module → cockpit mapping

| V16 §9 module | Cockpit status | Backing data / next step |
|---|---|---|
| A. Ecosystem Dashboard | partial (home/build) | aggregate existing `content/lab/*` + governance JSON; recommendations must be evidence-linked |
| B. Repository Center | present (`panel-repository`) | extend with PR/CI status via official GitHub API |
| C. Agent Center | planned | render roles from [`packages/agent-runtime`](../../packages/agent-runtime/README.md); capability-based, human-supervised |
| D. Plugins & Extensions | present (`panel-plugins`) | permission manifests; install/escalation require approval |
| E. Goal & Roadmap Center | planned | needs `data/roadmap-status.json` (partly proposed in stale PR #10) |
| F. Documentation Hub | partial | index `docs/` with search/tags/provenance |
| G. Architecture Center | planned | derive from declared data only; no guessed relationships |
| H. Automation Center | planned | observable, cancellable, approval-aware; destructive effects explicit |
| I. Security Center | present (`panel-security`) | findings with evidence/severity/scope |
| J. Knowledge System | planned | keep untrusted refs out of permanent knowledge |
| K. Remote Infrastructure & SSH Center | partial (`panel-workspace`) | builds on access work (PRs #11–#13); scoped/audited ops, not a root shell |
| L. SEIS AI Center | planned | surface [model router](../platform/seis-ai-core.md) + [language versions](../../content/governance/seis-language-versions.json) + evals |

## Design constraints (V16 §8)

- Premium, minimal, calm, fast, accessible; information-rich without clutter.
- Persistent compact nav, global search, command palette, environment + connection
  indicators, approval requests, clear loading/empty/error/recovery states.
- Keyboard navigation, visible focus, reduced-motion support (WCAG 2.2 AA, §28).
- Contextual actions belong to their own module — no mis-routed generic forms.
- No decorative controls that look operational but do nothing.

## Evolution path (V16 §24)

1. **Phase 1 (now):** static HTML/CSS/ESM cockpit; mock/local data; prove the core
   journeys. Keep isolated from the no-bundler portfolio.
2. **Phase 2:** standalone TypeScript/React/Next.js app with authenticated APIs,
   GitHub integration, audit + observability. Incremental and reversible.
3. **Phase 3:** native SwiftUI macOS operator app + iOS companion (monitor,
   approvals, incidents). Share stable domain contracts, not forced code sharing.

Migration to Phase 2 must not begin until Phase 1 behaviour and architecture are
documented and validated.
