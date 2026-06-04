# SEIS Next.js Foundation

Bu klasor, static portfolio yapisini bozmadan paralel migration icin olusturulmustur.

## Kapsam

- Next.js App Router temeli
- Tailwind CSS token altyapisi
- shadcn/ui + Radix primitive uyumlu button ornegi
- Framer Motion + GSAP motion foundation
- TR/EN/FR/IT/DE dil toggle foundation
- Data-driven portfolio + case-study sistemi
- Data-driven selected works + dynamic work detail route
- Insights content system + dynamic insight detail route
- Command palette (Cmd/Ctrl + K)
- Insights search/filter + related scoring
- Works browser search/filter + comparison matrix
- About, Motion Showcase, Visual Research, Experiments, Experience, Tools, Social sections
- Workflow + roadmap + FAQ section katmani
- Services route (paket + roadmap + kalite sinyalleri)
- Contact API + interactive request form
- Integrations readiness API endpoint
- Health + events + content snapshot API endpoints
- Studio readiness board route
- Theme mode toggle (dark/light/system)
- Newsletter API + subscription form
- Metrics, search, estimate, and automation API layers
- AI workflow registry + playbooks route
- Control center route (search + release signals)
- Operations console route (quality + governance)
- Governance matrix route
- Bench capabilities route
- Strategy board route (launch checklist + branch strategy)
- Release lab route (scenario simulator)
- Risk register route
- Quality lab route (performance + accessibility + content governance)
- Provider hub route (multi-provider orchestration + connector strategy)
- Growth lab route (funnel + friction + experiments)
- Experience lab route (UX signal telemetry)
- Orchestration route (cross-system command board)
- Incident center route (response + drills + rollback flow)
- Dependency lab route (dependency policy governance)
- Execution lab route (delivery pipeline intelligence)
- SEO lab route (metadata and discoverability intelligence)
- SRE lab route (SLO + error budget + runbook intelligence)
- Compliance lab route (security/privacy/accessibility/governance matrix)
- Capacity lab route (scaling forecasts and risk models)
- Research lab route (learning signals and backlog intelligence)
- Automation lab route (pipeline + queue governance intelligence)
- FinOps lab route (budget + cost optimization intelligence)
- Localization lab route (TR/EN/FR/IT/DE parity governance intelligence)
- Security lab route (risk posture + drill governance intelligence)
- Accessibility lab route (inclusive quality + remediation intelligence)
- Experiment lab route (hypothesis + growth loop intelligence)
- Collaboration lab route (workflow + branch governance intelligence)
- Release readiness + system manifest API layers
- Quality scorecard + feature flags + governance API layers
- Risk register + release scenarios + launch checklist API layers
- System roadmap + orchestration readiness API layers
- Incident + dependency + execution + SEO intelligence API layers
- SRE + compliance + capacity + research API layers
- Automation + FinOps + localization API layers
- Security + accessibility + experiment + collaboration API layers
- Performance + content ops + AI governance + growth analytics command layers
- Worktree + design system + observability + product ops + monetization + knowledge command layers
- Merge + rollback + connector + agent + deployment + testing command layers
- Cloud + cloud cost + handoff + skills governance command layers
- Security headers in Next.js config
- Robots + sitemap metadata route katmani
- Open Graph/Twitter image route katmani

## Calistirma

```bash
cd apps/seis-nextjs-foundation
npm install
npm run dev
```

Optional environment:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=hello@your-domain.com
```

Default route:

- `http://localhost:3000/`

Additional routes:

- `http://localhost:3000/case-studies`
- `http://localhost:3000/case-studies/luxury-retail-landing`
- `http://localhost:3000/portfolio`
- `http://localhost:3000/services`
- `http://localhost:3000/works`
- `http://localhost:3000/works/aurora-saas-command-center`
- `http://localhost:3000/insights`
- `http://localhost:3000/insights/cinematic-ui-without-performance-debt`
- `http://localhost:3000/studio`
- `http://localhost:3000/automation`
- `http://localhost:3000/playbooks`
- `http://localhost:3000/control`
- `http://localhost:3000/ops`
- `http://localhost:3000/governance`
- `http://localhost:3000/bench`
- `http://localhost:3000/strategy`
- `http://localhost:3000/release-lab`
- `http://localhost:3000/risk`
- `http://localhost:3000/quality-lab`
- `http://localhost:3000/provider-hub`
- `http://localhost:3000/growth-lab`
- `http://localhost:3000/experience-lab`
- `http://localhost:3000/orchestration`
- `http://localhost:3000/incident-center`
- `http://localhost:3000/dependency-lab`
- `http://localhost:3000/execution-lab`
- `http://localhost:3000/seo-lab`
- `http://localhost:3000/sre-lab`
- `http://localhost:3000/compliance-lab`
- `http://localhost:3000/capacity-lab`
- `http://localhost:3000/research-lab`
- `http://localhost:3000/automation-lab`
- `http://localhost:3000/finops-lab`
- `http://localhost:3000/localization-lab`
- `http://localhost:3000/security-lab`
- `http://localhost:3000/accessibility-lab`
- `http://localhost:3000/experiment-lab`
- `http://localhost:3000/collaboration-lab`
- `http://localhost:3000/performance-lab`
- `http://localhost:3000/content-ops-lab`
- `http://localhost:3000/ai-governance-lab`
- `http://localhost:3000/growth-analytics-lab`
- `http://localhost:3000/worktree-lab`
- `http://localhost:3000/design-lab`
- `http://localhost:3000/observability-lab`
- `http://localhost:3000/product-ops-lab`
- `http://localhost:3000/monetization-lab`
- `http://localhost:3000/knowledge-lab`
- `http://localhost:3000/merge-lab`
- `http://localhost:3000/rollback-lab`
- `http://localhost:3000/connector-lab`
- `http://localhost:3000/agent-lab`
- `http://localhost:3000/deployment-lab`
- `http://localhost:3000/testing-lab`
- `http://localhost:3000/cloud-lab`
- `http://localhost:3000/cloud-cost-lab`
- `http://localhost:3000/handoff-lab`
- `http://localhost:3000/skills-lab`

API routes:

- `GET /api/integrations`
- `GET /api/health`
- `GET /api/content-snapshot?lang=en`
- `POST /api/events`
- `GET /api/newsletter`
- `POST /api/newsletter`
- `GET /api/metrics`
- `GET /api/search?q=ai&domain=all&lang=en`
- `POST /api/estimate`
- `GET /api/automation-playbooks`
- `GET /api/ai-workflows`
- `GET /api/release-readiness`
- `GET /api/system-manifest`
- `GET /api/quality-scorecard`
- `GET /api/governance-matrix`
- `GET /api/feature-flags`
- `GET /api/bench-capabilities`
- `GET /api/tomorrow-sprint`
- `GET /api/risk-register`
- `GET /api/release-scenarios`
- `GET /api/launch-checklist`
- `GET /api/branch-strategy`
- `GET /api/quality-audits`
- `GET /api/provider-orchestration`
- `GET /api/funnel-strategy`
- `GET /api/mega-capability-dashboard`
- `GET /api/system-roadmap`
- `GET /api/experience-lab`
- `GET /api/orchestration-readiness`
- `GET /api/incident-center`
- `GET /api/dependency-governance`
- `GET /api/execution-pipeline`
- `GET /api/seo-intelligence`
- `GET /api/sre-command`
- `GET /api/compliance-matrix`
- `GET /api/capacity-forecast`
- `GET /api/research-ops`
- `GET /api/automation-command`
- `GET /api/finops-command`
- `GET /api/localization-command`
- `GET /api/security-command`
- `GET /api/accessibility-command`
- `GET /api/experiment-command`
- `GET /api/collaboration-command`
- `GET /api/performance-command`
- `GET /api/content-ops-command`
- `GET /api/ai-governance-command`
- `GET /api/growth-analytics-command`
- `GET /api/worktree-command`
- `GET /api/design-system-command`
- `GET /api/observability-command`
- `GET /api/product-ops-command`
- `GET /api/monetization-command`
- `GET /api/knowledge-command`
- `GET /api/merge-command`
- `GET /api/rollback-command`
- `GET /api/connector-command`
- `GET /api/agent-command`
- `GET /api/deployment-command`
- `GET /api/testing-command`
- `GET /api/cloud-command`
- `GET /api/cloud-cost-command`
- `GET /api/handoff-command`
- `GET /api/skills-command`
- `POST /api/contact`

## Notlar

- Root static sistem (`index.html`) calismaya devam eder.
- Bu klasor phase-2 migration icin izolasyon katmanidir.
- Production'a gecis adimlari `docs/seis-phase2-migration-plan.md` dosyasinda tutulur.
- Dil secimi query ile de verilebilir (`?lang=tr|en|fr|it|de`).
