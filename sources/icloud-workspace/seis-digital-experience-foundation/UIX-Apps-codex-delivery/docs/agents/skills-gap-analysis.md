# Skills Gap Analysis

This package expands the SEIS skill system with missing operational and product
review coverage. The goal is more useful agent routing without repeating long
prompts or enabling risky automation.

## Added Coverage

- CI/CD and protected deployment review
- environment and secret handling
- security threat modeling
- testing and QA planning
- build stability
- observability and analytics safety
- GitHub PR readiness
- repository cleanliness and archive hygiene
- asset optimization
- motion system review
- design research synthesis
- Next.js foundation review
- Tailwind, shadcn/ui, and Radix consistency
- fullstack API and database safety
- auth and payments review
- product strategy and UX journey review
- portfolio case-study architecture
- technical debt sequencing
- AI memory and decision logging
- Figma handoff review
- platform expansion planning
- single-run connector orchestration
- plugin permission boundaries
- skipped_with_reason connector reporting

## Application Rule

Start with the smallest relevant card, then add reviewers only when risk grows.
For example:

- UI change: `premium-ui-guardian`, then `mobile-responsive-guardian` if layout risk appears.
- Cloud change: `cloud-deployment-guardian`, then `environment-secrets-guardian` if variables change.
- Backend change: `fullstack-api-guardian`, then `security-threat-modeler` if auth or data risk appears.
- Large AI task: `token-budget-coordinator`, then `multi-agent-orchestrator` if multiple reviewers disagree.
- Connector run: `connector-orchestration-governor`, then `plugin-permission-auditor` for write or auth risk.

## Guardrails

- No dependency install.
- No secrets.
- No workflow activation.
- No deployment.
- No staging unrelated dirty files.
- No broad architecture rewrite.

## Success Criteria

- More tasks route to focused experts.
- Long manifestos stay compressed into small cards.
- Main branch remains protected.
- Reviews become repeatable and easier to audit.
