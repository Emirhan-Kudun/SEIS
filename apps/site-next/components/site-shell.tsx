"use client";

import { useEffect, useMemo, useState } from "react";

import {
  behanceEmbeds,
  caseStudies,
  drawings,
  getDictionary,
  locales,
  resolveLocale,
  services,
  siteMeta,
  softwareLanguages,
  works,
  type Locale
} from "@seis/content";
import { getMcpReadinessSnapshot, getRuntimeSnapshot } from "@seis/runtime";

import { BriefIntakeForm } from "./brief-intake-form";
import { BehanceEmbedPanel } from "./behance-embed-panel";
import { CinematicHeroScene } from "./cinematic-hero-scene";
import { CinematicShowcaseScene } from "./cinematic-showcase-scene";

type ShellMode = "home";

const nav = [
  ["#home", "navHome"],
  ["#portfolio", "navPortfolio"],
  ["#drawings", "navDrawings"],
  ["#cases", "navCases"],
  ["/design-system", "navDesign"],
  ["#runtime", "navRuntime"],
  ["/ops", "navOps"],
  ["#contact", "navContact"]
] as const;

export function SiteShell({ mode }: { mode: ShellMode }) {
  const [locale, setLocale] = useState<Locale>("tr");
  const dictionary = useMemo(() => getDictionary(locale), [locale]);
  const runtime = useMemo(() => getRuntimeSnapshot({}, new Date("2026-05-23T00:00:00.000Z")), []);
  const mcp = useMemo(() => getMcpReadinessSnapshot(new Date("2026-05-23T00:00:00.000Z")), []);
  const featuredDrawings = useMemo(() => drawings.filter((drawing) => drawing.featured).slice(0, 8), []);

  useEffect(() => {
    const stored = window.localStorage.getItem("seis-locale");
    setLocale(resolveLocale(stored || "tr"));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("seis-locale", locale);
  }, [locale]);

  return (
    <main className="site-shell" data-mode={mode}>
      <a href="#home" className="skip-link">Skip to content</a>
      <nav className="top-nav" aria-label="Primary navigation">
        <a href="#home" className="brand" aria-label="Emirhan Kudun home">
          Emirhan Kudun
        </a>
        <div className="nav-links">
          {nav.map(([href, key]) => (
            <a key={href} href={href}>
              {dictionary[key]}
            </a>
          ))}
        </div>
        <div className="language-switcher" aria-label="Language selector">
          {locales.map((item) => (
            <button
              className={item === locale ? "active" : ""}
              key={item}
              type="button"
              onClick={() => setLocale(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <section id="home" className="hero-section">
        <CinematicHeroScene />
        <div className="hero-copy">
          <p className="eyebrow">{dictionary.heroEyebrow}</p>
          <h1>{dictionary.heroTitle}</h1>
          <p>{dictionary.heroLead}</p>
          <div className="hero-actions">
            <a href="#portfolio" className="primary-link">{dictionary.heroPrimary}</a>
            <a href="#runtime" className="secondary-link">{dictionary.heroSecondary}</a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Portfolio system highlights">
          <span>SEIS / 2026 / 3D</span>
          <strong>{dictionary.heroPanelTitle}</strong>
          <p>{dictionary.heroPanelLead}</p>
          <div className="panel-line" />
          <div className="panel-metrics" aria-label="Hero metrics">
            <span>{dictionary.studioMetricOne}</span>
            <span>{dictionary.studioMetricTwo}</span>
            <span>{dictionary.studioMetricThree}</span>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <p className="eyebrow">01 / Services</p>
        <h2>{dictionary.servicesTitle}</h2>
        <div className="card-grid compact">
          {services.map((service) => (
            <article className="work-card" key={service.id}>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section studio-section" id="studio">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / Orbital Studio</p>
            <h2>{dictionary.studioTitle}</h2>
          </div>
          <p>{dictionary.studioLead}</p>
        </div>
        <div className="studio-showcase">
          <CinematicShowcaseScene />
          <div className="studio-rail" aria-label="Featured drawing orbit">
            {featuredDrawings.slice(0, 4).map((drawing) => (
              <article className="studio-tile" key={drawing.id}>
                <img src={drawing.src} alt={`${drawing.title} - ${drawing.tone}`} loading="lazy" />
                <span>{drawing.title}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section editorial-section" id="portfolio">
        <p className="eyebrow">03 / Portfolio</p>
        <h2>{dictionary.worksTitle}</h2>
        <div className="card-grid">
          {works.map((work) => (
            <article className="work-card" key={work.id}>
              <p className="kicker">{work.tag}</p>
              <h3>{work.title}</h3>
              <p>{work.summary}</p>
              <span>{work.impact}</span>
              <a className="text-link" href={`/portfolio/${work.id}`}>Project detail</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section behance-section" id="behance">
        <BehanceEmbedPanel dictionary={dictionary} embeds={behanceEmbeds} compact />
      </section>

      <section className="section gallery-section" id="drawings">
        <p className="eyebrow">05 / Drawing Archive</p>
        <h2>{dictionary.drawingsTitle}</h2>
        <div className="featured-strip" aria-label="Featured drawings">
          {featuredDrawings.map((drawing) => (
            <figure className="featured-drawing" key={`featured-${drawing.id}`}>
              <img src={drawing.src} alt={`${drawing.title} - ${drawing.tone}`} loading="lazy" />
              <figcaption>{drawing.title}</figcaption>
            </figure>
          ))}
        </div>
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

      <section className="section" id="cases">
        <p className="eyebrow">06 / Case Studies</p>
        <h2>{dictionary.casesTitle}</h2>
        <div className="stack">
          {caseStudies.map((study) => (
            <article className="case-card" key={study.slug}>
              <p className="kicker">{study.year} / {study.role}</p>
              <h3>{study.title}</h3>
              <p>{study.challenge}</p>
              <p><strong>Solution:</strong> {study.solution}</p>
              <p><strong>Outcome:</strong> {study.outcome}</p>
              <a className="text-link" href={`/case-studies/${study.slug}`}>Case detail</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section runtime-band" id="runtime">
        <p className="eyebrow">07 / Active Runtime</p>
        <h2>{dictionary.runtimeTitle}</h2>
        <div className="metrics">
          <article><span>Total</span><strong>{runtime.summary.total}</strong></article>
          <article><span>Active</span><strong>{runtime.summary.active}</strong></article>
          <article><span>Needs credentials</span><strong>{runtime.summary.needsCredentials}</strong></article>
          <article><span>Unavailable</span><strong>{runtime.summary.unavailable}</strong></article>
          <article><span>MCP seen</span><strong>{mcp.summary.total}</strong></article>
        </div>
        <div className="runtime-grid">
          {runtime.connectors.slice(0, 6).map((item) => (
            <article className="runtime-card" data-status={item.status} key={item.id}>
              <p className="kicker">{item.category} / {item.status}</p>
              <h3>{item.name}</h3>
              <p>{item.scope}</p>
              <span>{item.requiresEnv.length ? item.requiresEnv.join(", ") : "No credential required"}</span>
            </article>
          ))}
        </div>
        <div className="mcp-preview">
          <div>
            <p className="eyebrow">MCP / Skills / Plugins</p>
            <h3>{dictionary.mcpTitle}</h3>
            <p>{dictionary.mcpLead}</p>
          </div>
          <div className="mcp-list">
            {mcp.items.slice(0, 8).map((item) => (
              <article className="mcp-row" data-status={item.status} key={item.id}>
                <span>{item.name}</span>
                <strong>{item.status}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section language-section" id="software-languages">
        <div className="section-heading">
          <div>
            <p className="eyebrow">08 / Polyglot Branch</p>
            <h2>{dictionary.languagesTitle}</h2>
          </div>
          <p>{dictionary.languagesLead}</p>
        </div>
        <div className="language-grid">
          {softwareLanguages.map((language) => (
            <article className="language-card" data-status={language.status} key={language.id}>
              <p className="kicker">{language.layer} / {language.status}</p>
              <h3>{language.name}</h3>
              <p>{language.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <p className="eyebrow">09 / Contact</p>
        <h2>{dictionary.contactTitle}</h2>
        <p>{dictionary.contactLead}</p>
        <div className="contact-layout">
          <div className="contact-direct">
            <a className="primary-link" href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a>
            <p>{dictionary.briefReady}</p>
          </div>
          <BriefIntakeForm dictionary={dictionary} services={services} />
        </div>
      </section>
    </main>
  );
}
