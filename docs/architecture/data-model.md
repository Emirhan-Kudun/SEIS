# SEIS Core Data Model

Date: 2026-06-19

The minimum conceptual model for the SEIS ecosystem (V16 §25). This is a
**conceptual contract**, not a database schema; it names the entities the
Command Center, AI Core, and operations layers must agree on. Concrete storage
(Convex-first, per the existing backend decision) is derived from this, not the
other way around.

## Entities

### Ecosystem & work
- **Ecosystem** — the SEIS whole; root of everything.
- **Workspace** — an isolated working context (local or remote).
- **Repository** — a governed Git repo (SEIS is canonical; satellites mirrored).
- **Branch** — a line of work; `main` is protected.
- **PullRequest** — a proposed, reviewable change set, with rescue/recovery state.

### Agents & AI
- **Agent** — a role with identity, provider, capabilities, allowed/denied tools,
  permissions, status (V16 §13).
- **AgentTask** — a unit of work assigned to an agent.
- **AgentRun** — one execution of a task, with logs, outputs, provenance, cost.
- **ModelProvider** — an external/local provider adapter (env-based credentials).
- **Model** — a concrete model exposed by a provider.
- **ModelProfile** — a provider-agnostic intent (`reasoning`, `fast`, …).
- **ModelRoute** — a routing decision (task type → provider + profile + reason).
- **PromptVersion** — a versioned prompt template (id + version).
- **LanguageVersion** — an application-layer behaviour bundle (e.g. v0.1).

### Product & governance
- **Plugin** — a capability-declaring extension with a permission manifest.
- **Permission** — a capability grant (capability-based, least privilege).
- **Goal** / **Milestone** / **Blocker** — roadmap entities with evidence-based
  progress.
- **Document** — a knowledge/architecture/runbook artifact, versioned.
- **ArchitectureDecision (ADR)** — a recorded decision with rationale.
- **ApprovalRequest** — a human gate for a privileged operation (V16 §32).

### Automation & infrastructure
- **Workflow** / **Trigger** / **AutomationRun** — observable, cancellable,
  permission-aware automation.
- **Host** — a remote machine.
- **SSHConnectionProfile** — safe connection metadata + a **SecretReference**
  (never a raw private key).
- **RemoteWorkspace** — an isolated remote working dir/worktree.
- **RemoteCommandRun** — a scoped, audited remote execution.
- **Deployment** — an environment release with rollback.
- **SecretReference** — a pointer to a secret in a secret store; never the value.

### Security, audit & knowledge
- **SecurityFinding** — evidence + severity + scope + remediation.
- **Alert** — a surfaced, explainable signal (never fabricated).
- **AuditEvent** — actor, action, target, timestamp, source, result, approval.
- **KnowledgeNode** / **Relationship** — knowledge graph; untrusted refs kept out.

### Research (SEIS Universe — future)
- **Dataset** — provenance/license/consent-tracked data (V16 §18 Phase 3).
- **Tokenizer** — a tokenization artifact.
- **Checkpoint** — model weights at a step (none exist yet).
- **EvaluationRun** — a scored evaluation against gates.
- **ModelCard** — honest documentation of a model/version.

## Cross-cutting rules

- Every privileged mutation produces an **AuditEvent** and may require an
  **ApprovalRequest** (V16 §29, §32).
- Secrets appear only as **SecretReference**; raw values never enter entities,
  logs, or the web client (V16 §20, §23).
- Progress/alerts/relationships must be **evidence-backed**, never fabricated
  (V16 §9).
- External systems sit behind adapters so a **ModelProvider** or **Host** is
  replaceable without rewrites (V16 §25 ports/adapters).

See [`seis-command-center.md`](./seis-command-center.md) for how these surface in
the UI and [`api-design.md`](./api-design.md) for the access contracts.
