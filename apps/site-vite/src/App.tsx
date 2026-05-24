import { useMemo, useState } from "react";

import { drawings, getDictionary, locales, services, works, type Locale } from "@seis/content";
import { getMcpReadinessSnapshot, getRuntimeSnapshot } from "@seis/runtime";

export function App() {
  const [locale, setLocale] = useState<Locale>("tr");
  const dict = getDictionary(locale);
  const runtime = useMemo(() => getRuntimeSnapshot({}, new Date("2026-05-23T00:00:00.000Z")), []);
  const mcp = useMemo(() => getMcpReadinessSnapshot(new Date("2026-05-23T00:00:00.000Z")), []);
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
    </main>
  );
}
