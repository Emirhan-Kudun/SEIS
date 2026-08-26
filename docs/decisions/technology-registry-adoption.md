# Technology Registry Adoption

Date: 2026-08-25

## Context

A product brief circulated describing SEIS as a "Full Technology Edition" —
a single platform meant to eventually span AI/agents, an AAA-class game
engine, a Digital Human engine, robotics, aerospace, quantum computing, and
over a dozen other technology domains, organized under a canonical
Technology Registry, Capability Registry, and Tool Registry, with every
capability declaring a stable ID, domain, maturity, implementation class,
dependencies, permissions, standards, tests, and rollback plan.

None of those subsystems (game engine, Digital Human engine, robotics
integration, quantum computing, etc.) exist in this repository. Building
placeholder registry entries for them would mean fabricating claims this
repo cannot back — exactly what V14's anti-bloat rule and this repo's
existing honesty norms (see the CHANGELOG's explicit wrong-page-bug
correction, and `docs/design/icon-system-research.md`'s refusal to claim an
unbuilt Windows app) forbid.

## Decision

Adopt the **registry pattern** the brief asks for, but scope its first
version to only what is real today: SEIS's own existing internal
components. [`apps/fullstack/technology-registry.json`](../../apps/fullstack/technology-registry.json)
catalogs exactly seven real, inspectable components — the desktop shells,
the web cockpit, the icon-governance system, the app-shell-contract
validator, the plugin-capability catalog, and the backend state model —
each with the brief's requested fields (domain, subdomain, maturity,
implementation class, owner, dependencies, permissions, supported
platforms, hardware requirements, standards, license, provenance, tests,
benchmarks, fallback, rollback, status), filled honestly rather than
aspirationally (many `tests`/`benchmarks` fields say "None yet" because
that's true).

The registry carries the brief's full 16-domain taxonomy and 10-level
maturity ladder as reference enums (so future real entries have a place to
land), but a `domains_with_no_entries` field explicitly lists the 12 of 16
domains with zero real entries today — Intelligence, Software, Reality,
Game, Digital Life, Cinema and Audio, Science and Mathematics, Engineering
and Manufacturing, Robotics and Autonomous Systems, Hardware and
Electronics, Cloud and Distributed Systems, and Security and Privacy. This
is not a gap to be silently filled with placeholders; it is the registry
telling the truth about scope.

## Enforcement

`scripts/check-technology-registry.mjs` (wired into `npm run
check:technology-registry` and `npm run check:governance`) validates:

- every entry has all required fields, non-empty;
- `domain`, `maturity`, and `implementation_class` are drawn from the
  declared enums;
- every `provenance` path exists in the repository;
- every `dependencies` reference points at another real entry in the
  registry;
- **`domains_with_no_entries` stays exactly equal to the domains actually
  uncovered by real entries** — the anti-fabrication drift gate. Adding an
  entry to a previously-empty domain without updating the disclaimer fails
  the check, and so does letting the disclaimer overclaim a domain that
  now has coverage.

## Consequences

- This is additive: no existing check, contract, or file is modified in a
  breaking way. `apps/fullstack/state-model.json` and
  `apps/desktop/shell-contract.json` remain the authoritative sources for
  their own domains; the registry's entries for those components
  cross-reference them rather than duplicating their detail.
- Future real subsystems (should any of the brief's aspirational domains
  ever get a genuine, running implementation) get a place to register
  themselves truthfully, with the same enforcement.
- This explicitly does **not** commit SEIS to building a game engine,
  Digital Human engine, robotics stack, or any other item from the
  original brief. Those remain undecided, out-of-repo aspirations unless a
  future decision record says otherwise.

## Rollback

Revert this commit. `apps/fullstack/technology-registry.json`,
`scripts/check-technology-registry.mjs`, and this document are additive;
removing them and the `check:technology-registry` line in
`scripts/check-governance.mjs` and `package.json` restores the prior state
exactly.
