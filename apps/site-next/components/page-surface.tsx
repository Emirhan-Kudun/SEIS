import Link from "next/link";

import { caseStudies, drawings, getDictionary, services, siteMeta, works } from "@seis/content";
import { getMcpReadinessSnapshot, getRuntimeSnapshot } from "@seis/runtime";

type PageMode = "portfolio" | "drawings" | "cases" | "runtime" | "ops" | "contact";

const navItems = [
  ["/", "Home"],
  ["/portfolio", "Portfolio"],
  ["/drawings", "Drawings"],
  ["/case-studies", "Case studies"],
  ["/design-system", "Design system"],
  ["/runtime", "Runtime"],
  ["/ops", "Ops"],
  ["/contact", "Contact"]
] as const;

export function PageSurface({ mode }: { mode: PageMode }) {
  const dict = getDictionary("en");
  const runtime = getRuntimeSnapshot();
  const mcp = getMcpReadinessSnapshot();

  return (
    <main className="page-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <Link href="/" className="brand">
          Emirhan Kudun
        </Link>
        <div className="nav-links">
          {navItems.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {mode === "portfolio" && (
        <section className="section page-hero">
          <p className="eyebrow">{dict.worksTitle}</p>
          <h1>Selected visual systems, editorial structures and calm interface work.</h1>
          <div className="card-grid">
            {works.map((work) => (
              <article className="work-card" key={work.id}>
                <p className="kicker">{work.tag}</p>
                <h2>{work.title}</h2>
                <p>{work.summary}</p>
                <span>{work.impact}</span>
              </article>
            ))}
          </div>
        </section>
      )}

      {mode === "drawings" && (
        <section className="section page-hero">
          <p className="eyebrow">{dict.drawingsTitle}</p>
          <h1>Drawing archive as a quiet visual research layer.</h1>
          <div className="drawing-grid">
            {drawings.map((drawing) => (
              <figure className="drawing-card" key={drawing.id}>
                <img src={drawing.src} alt={`${drawing.title} - ${drawing.tone}`} loading="lazy" />
                <figcaption>
                  <strong>{drawing.title}</strong>
                  <span>{drawing.tone}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {mode === "cases" && (
        <section className="section page-hero">
          <p className="eyebrow">{dict.casesTitle}</p>
          <h1>Case studies that explain decisions, not just outcomes.</h1>
          <div className="stack">
            {caseStudies.map((study) => (
              <article className="case-card" key={study.slug}>
                <p className="kicker">{study.year} / {study.role}</p>
                <h2>{study.title}</h2>
                <p>{study.challenge}</p>
                <ol>
                  {study.process.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p><strong>Solution:</strong> {study.solution}</p>
                <p><strong>Outcome:</strong> {study.outcome}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {mode === "runtime" && (
        <section className="section page-hero">
          <p className="eyebrow">{dict.runtimeTitle}</p>
          <h1>Credential-aware active runtime without secret leakage.</h1>
          <RuntimeSummary />
          <McpSummary />
        </section>
      )}

      {mode === "ops" && (
        <section className="section page-hero">
          <p className="eyebrow">{dict.opsTitle}</p>
          <h1>{dict.opsLead}</h1>
          <RuntimeSummary includeSkills />
          <McpSummary expanded />
          <div className="api-list" aria-label="Runtime APIs">
            {[
              "/api/health",
              "/api/runtime",
              "/api/connectors",
              "/api/skills",
              "/api/mcp-readiness",
              "/api/contact",
              "/api/briefs",
              "/api/activation-policy"
            ].map((api) => (
              <Link key={api} href={api}>{api}</Link>
            ))}
          </div>
        </section>
      )}

      {mode === "contact" && (
        <section className="section page-hero contact-page">
          <p className="eyebrow">{dict.contactTitle}</p>
          <h1>{dict.contactLead}</h1>
          <a className="primary-link" href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a>
          <div className="card-grid compact">
            {services.map((service) => (
              <article className="work-card" key={service.id}>
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );

  function RuntimeSummary({ includeSkills = false }: { includeSkills?: boolean }) {
    const items = includeSkills ? [...runtime.connectors, ...runtime.skills] : runtime.connectors;

    return (
      <>
        <div className="metrics" aria-label="Runtime summary">
          <article><span>Total</span><strong>{runtime.summary.total}</strong></article>
          <article><span>Active</span><strong>{runtime.summary.active}</strong></article>
          <article><span>Configured</span><strong>{runtime.summary.configured}</strong></article>
          <article><span>Needs credentials</span><strong>{runtime.summary.needsCredentials}</strong></article>
          <article><span>Unavailable</span><strong>{runtime.summary.unavailable}</strong></article>
        </div>
        <div className="runtime-grid">
          {items.map((item) => (
            <article className="runtime-card" data-status={item.status} key={`${item.category}-${item.id}`}>
              <p className="kicker">{item.category} / {item.status}</p>
              <h2>{item.name}</h2>
              <p>{item.scope}</p>
              <span>{item.requiresEnv.length ? item.requiresEnv.join(", ") : "No credential required"}</span>
              <small>{item.notes}</small>
            </article>
          ))}
        </div>
      </>
    );
  }

  function McpSummary({ expanded = false }: { expanded?: boolean }) {
    return (
      <section className="ops-block" aria-label="MCP readiness">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MCP / Readiness</p>
            <h2>{dict.mcpTitle}</h2>
          </div>
          <p>{dict.mcpLead}</p>
        </div>
        <div className="metrics">
          <article><span>Total</span><strong>{mcp.summary.total}</strong></article>
          <article><span>Active</span><strong>{mcp.summary.active}</strong></article>
          <article><span>Configured</span><strong>{mcp.summary.configured}</strong></article>
          <article><span>Needs credentials</span><strong>{mcp.summary.needsCredentials}</strong></article>
          <article><span>Skipped</span><strong>{mcp.summary.skippedWithReason}</strong></article>
        </div>
        <div className="runtime-grid">
          {mcp.items.slice(0, expanded ? 36 : 12).map((item) => (
            <article className="runtime-card" data-status={item.status} key={item.id}>
              <p className="kicker">{item.archiveStatus} / {item.auth}</p>
              <h2>{item.name}</h2>
              <p>{item.scope}</p>
              <small>{item.notes}</small>
            </article>
          ))}
        </div>
      </section>
    );
  }
}
