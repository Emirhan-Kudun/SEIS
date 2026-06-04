import type { Metadata } from "next";
import Link from "next/link";

import {
  behanceVisuals,
  buildPortfolioIndex,
  drawings,
  getDictionary,
  portfolioOsPanels,
  readinessSmokeRoutes,
  works
} from "@seis/content";
import { getRuntimeSnapshot } from "@seis/runtime";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.portfolioOsTitle,
    description: dict.portfolioOsLead,
    path: "/portfolio-os",
    locale
  });
}

export default async function PortfolioOsPage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const runtime = getRuntimeSnapshot();
  const portfolioIndex = buildPortfolioIndex();
  const metrics = [
    { label: dict.portfolioOsMetricWorks, value: works.length },
    { label: dict.portfolioOsMetricAssets, value: behanceVisuals.length + drawings.length },
    { label: dict.portfolioOsMetricRoutes, value: readinessSmokeRoutes.length },
    { label: dict.portfolioOsMetricRuntime, value: runtime.summary.total }
  ];
  const indexNote = dict.portfolioOsIndexNote.replace("{count}", portfolioIndex.length.toString());

  return (
    <main className="page-shell portfolio-os-shell" id="page-main-content">
      <a href="#portfolio-os-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">
          Emirhan Kudun
        </Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/portfolio")}>{dict.navPortfolio}</Link>
          <Link href={withLocalePath(locale, "/portfolio-os")} aria-current="page">{dict.navPortfolioOs}</Link>
          <Link href={withLocalePath(locale, "/case-study-builder")}>{dict.navCaseStudyBuilder}</Link>
          <Link href={withLocalePath(locale, "/readiness")}>{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero portfolio-os-hero" id="portfolio-os-content">
        <p className="eyebrow">{dict.portfolioOsEyebrow}</p>
        <h1>{dict.portfolioOsTitle}</h1>
        <p className="page-lead">{dict.portfolioOsLead}</p>
        <div className="readiness-metrics" aria-label={dict.portfolioOsTitle}>
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
        <p className="portfolio-os-footnote">{indexNote}</p>
      </section>

      <section className="section portfolio-os-section" aria-labelledby="portfolio-os-panels-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.portfolioOsEyebrow}</p>
            <h2 id="portfolio-os-panels-title">{dict.portfolioOsPanelsTitle}</h2>
          </div>
          <p>{dict.portfolioOsPanelsLead}</p>
        </div>
        <div className="portfolio-os-panel-grid">
          {portfolioOsPanels.map((panel) => (
            <article className="portfolio-os-panel-card" data-panel={panel.id} key={panel.id}>
              <span>{panel.id}</span>
              <h3>{panel.title}</h3>
              <p>{panel.signal}</p>
              <ul>
                {panel.proof.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="portfolio-os-actions">
          <Link className="primary-link" href="/api/portfolio-os">{dict.portfolioOsApiCta}</Link>
          <Link className="secondary-link" href={withLocalePath(locale, "/readiness")}>{dict.portfolioOsReadinessCta}</Link>
        </div>
      </section>
    </main>
  );
}
