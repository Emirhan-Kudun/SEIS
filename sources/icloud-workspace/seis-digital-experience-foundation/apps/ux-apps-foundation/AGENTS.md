# AGENTS.md

UX Apps repository operating rules.

Operate in high-efficiency, low-power mode on scoped `codex/*` branches by default.

Prioritize:

- reversible changes
- dependency restraint
- iCloud Drive stability
- semantic HTML
- accessible interaction
- reduced-motion support
- lightweight API contracts
- explainable repository structure
- clear governance documentation

Avoid:

- heavy dependencies without a budget note
- noisy animation
- unbounded scans
- dashboard overload
- direct work on protected branches
- generated caches and large binary assets

Default workflow:

1. Check `git status --short --branch`.
2. Prefer small, testable changes.
3. Run `npm run quality` before commit when Node is available.
4. Stage only intentional files.

Quality rules:

- Keep UI calm, accessible, responsive, and readable.
- Use semantic HTML before adding JavaScript behavior.
- Keep animation subtle and optional through `prefers-reduced-motion`.
- Do not commit secrets, local caches, or generated dependency folders.

Product direction:

- UX audit tools
- journey and flow mappers
- accessibility and content review helpers
- product decision dashboards
- reusable interface patterns

Reduce noise. Preserve clarity. Keep the apps useful.
