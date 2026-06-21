# SEIS Unified Master Constitution — V16

Version: V16 · Date: 2026-06-21 · Status: canonical governing constitution.

V16 is the single master operating prompt for the SEIS ecosystem (Command Center
+ AI Core + SEIS Universe + clean-room engineering + remote SSH + GitHub PR
rescue + agent collaboration). It **extends** the
[V14 constitution](./seis-master-prompt-v14.md); where they differ, V16 governs
(see the [adoption ADR](../decisions/seis-master-prompt-v16-adoption.md)).
Machine-readable record: [`content/governance/seis-master-prompt-v16.json`](../../content/governance/seis-master-prompt-v16.json).

This document is the authority that the AI Core, Universe, architecture, security,
product, and testing docs cite as **"V16 §N"**. The section index below defines
those numbers.

## Section index

1. Core Mission
2. SEIS Core Identity
3. Core Operating Principles
4. Source of Truth & Repository Governance — GitHub is source of truth; `main` is sacred; no direct push/auto-merge/force-push; respect existing conventions.
5. Source of Truth Priority — read AGENTS/README/ARCHITECTURE/ROADMAP/SECURITY first; archives are reference only.
6. Execution Model — inspect → analyze → plan → implement → validate → document → review.
7. Universal SEIS Project Structure — one coherent monorepo; don't force folders; respect existing structure.
8. SEIS Command Center Vision — the secure operating interface; every control real/disabled/marked-prototype.
9. Command Center Primary Modules — A Dashboard … L SEIS AI Center.
10. SEIS AI Core — original, provider-agnostic AI application layer (not a frontier model).
11. What "SEIS Language Version" Means — versioned application-layer behaviour, not weights.
12. Model Router — provider-agnostic routing; env-based secrets; adapters.
13. Agent Runtime — roles, allowed/forbidden, human-supervised, no self-escalation.
14. Prompt Engine — versioned, structured prompts; no secrets/copied prompts.
15. SEIS Universe — Original AI Model Research (long-term, genuine, measurable).
16. Model Ownership Rule — a real SEIS model independently controls architecture/tokenizer/training/data/checkpoints/eval/inference; wrappers/fine-tunes labelled as such; never market app-layer behaviour as learned intelligence.
17. AI Model Source Authority — A identity, B research, C implementation, D data (allowed-source priority).
18. AI Model Research Phases — Phase 0 audit → 1 constitution → 2 architecture → 3 data/tokenizer → 4 nano → 5 training platform → 6 capabilities → 7 evaluation → 8 universe system → 9 multimodal.
19. Hardware-Aware Execution — measure capacity first; never start unbounded training; staged, gated.
20. Remote SSH Operating Model — Ed25519, host verification, hardened server, scoped/audited ops, not a root shell.
21. Clean-Room Engineering — isolated analysis → REFERENCE_REQUIREMENTS (WHAT not HOW) → separated, official-docs-first build → independent validation.
22. GitHub PR Rescue & Full Folder Integration — recover only safe useful work into a clean branch; never blindly reopen/merge.
23. Strict Security Rules — never commit secrets/keys/.env/credentials/generated folders.
24. Technology Strategy — Apple-first, cross-platform, provider-neutral; ADR major choices.
25. Architecture Requirements — modular, bounded, ports/adapters; minimum entity model; API contracts.
26. Security Requirements — least privilege, secure defaults, defense in depth, fail-closed, threat model.
27. Performance & Reliability — budgets, lazy loading, resilient retries, deterministic states.
28. Accessibility & Humane UX — WCAG 2.2 AA; calm, non-manipulative.
29. Observability & Audit — structured logs/metrics/traces/audit; redact secrets.
30. Testing & Validation — layered tests; report exactly what ran; never claim untested passes.
31. Documentation Deliverables — the canonical doc set; every doc has a clear purpose (no empty inflation).
32. Human Approval Boundaries — merge/deploy/new deps/SSH-config/secrets/destructive/training/promotion require human approval.
33. Codex, Claude & Qwen Collaboration — one writer at a time; docs are the coordination layer.
34. Required Delivery Sequence — phased, reviewable increments.
35. Recovery Report Required Before Commit.
36. Commit Rules — clean branch, small clear commits.
37. PR Preparation — prepare, don't merge; wait for approval.
38. Definition of Done.
39. Output Format.
40. Forbidden Behaviors — no push-to-main, no unapproved merge, no secret exposure, no fake progress/results, no pretending a frontier LLM exists, no unbounded training, no invented hardware/credentials/results, no proprietary/leaked source.
41. Final Execution Order.
42. Final Command — build SEIS honestly; inspect, plan, implement incrementally, validate honestly, preserve rollback safety.

## How citations work

Docs cite `V16 §N` referring to the numbered sections above. The full directive
text lives in the maintainer's master prompt; this constitution persists the
authoritative section map so every citation resolves to a real, stable section.
