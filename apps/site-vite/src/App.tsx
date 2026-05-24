import { useMemo, useState } from "react";

import {
  behanceEmbeds,
  drawings,
  getDictionary,
  locales,
  services,
  softwareLanguages,
  works,
  type Locale
} from "@seis/content";
import { getDecisionQuestionCount } from "@seis/content/decision-questions";
import { getDeploymentTargets, getMcpReadinessSnapshot, getRuntimeSnapshot } from "@seis/runtime";

export function App() {
  const [locale, setLocale] = useState<Locale>("tr");
  const dict = getDictionary(locale);
  const runtime = useMemo(() => getRuntimeSnapshot({}, new Date("2026-05-23T00:00:00.000Z")), []);
  const mcp = useMemo(() => getMcpReadinessSnapshot(new Date("2026-05-23T00:00:00.000Z")), []);
  const deploymentTargets = useMemo(() => getDeploymentTargets({}, new Date("2026-05-23T00:00:00.000Z")), []);
  const decisionQuestionCount = getDecisionQuestionCount();
  const featuredDrawings = drawings.filter((drawing) => drawing.featured).slice(0, 6);

  return (
    <main>
      <nav className="nav">
        <strong>Emirhan Kudun</strong>
        <div>
          {locales.map((item) => (
            <button className={locale === item ? "active" : ""} key={item} onClick={() => setLocale(item)}>
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <section className="hero">
        <p>{dict.heroEyebrow}</p>
        <h1>{dict.heroTitle}</h1>
        <span>{dict.heroLead}</span>
        <div className="hero-metrics" aria-label="Portfolio preview metrics">
          <strong>{dict.studioMetricOne}</strong>
          <strong>{dict.studioMetricTwo}</strong>
          <strong>{dict.studioMetricThree}</strong>
        </div>
      </section>

      <section className="grid">
        {services.map((service) => (
          <article key={service.id}>
            <h2>{service.title}</h2>
            <p>{service.summary}</p>
          </article>
        ))}
      </section>

      <section className="grid">
        {works.map((work) => (
          <article key={work.id}>
            <small>{work.tag}</small>
            <h2>{work.title}</h2>
            <p>{work.summary}</p>
          </article>
        ))}
      </section>

      <section className="drawings">
        {featuredDrawings.map((drawing) => (
          <figure key={drawing.id}>
            <img src={drawing.src} alt={drawing.title} loading="lazy" />
            <figcaption>{drawing.title}</figcaption>
          </figure>
        ))}
      </section>

      <section className="grid">
        {behanceEmbeds.slice(0, 3).map((embed) => (
          <article className="embed-card" key={embed.id}>
            <small>{embed.category}</small>
            <h2>{embed.title}</h2>
            <p>{embed.notes}</p>
            <pre><code>{embed.embedCode}</code></pre>
          </article>
        ))}
      </section>

      <section className="runtime">
        <h2>{dict.runtimeTitle}</h2>
        <p>
          {runtime.summary.active} active / {runtime.summary.needsCredentials} needs credentials /{" "}
          {runtime.summary.unavailable} unavailable
        </p>
        <p>
          {mcp.summary.total} MCP surfaces / {mcp.summary.skippedWithReason} skipped with reason
        </p>
      </section>

      <section className="grid">
        {softwareLanguages.map((language) => (
          <article key={language.id}>
            <small>{language.layer} / {language.status}</small>
            <h2>{language.name}</h2>
            <p>{language.role}</p>
          </article>
        ))}
      </section>

      <section className="runtime">
        <h2>{dict.deployTitle}</h2>
        <p>{dict.deployLead}</p>
        <ul>
          {deploymentTargets.map((target) => (
            <li key={target.id}>{target.name}: {target.status}</li>
          ))}
        </ul>
      </section>

      <section className="runtime">
        <h2>Decision ledger</h2>
        <p>{decisionQuestionCount} questions are packaged for API, docs and future intake flows.</p>
      </section>
    </main>
  );
}
