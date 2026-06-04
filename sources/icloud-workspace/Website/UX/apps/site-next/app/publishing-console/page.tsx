import type { Metadata } from "next";
import Link from "next/link";

import { getDictionary, publishingConsoleSteps } from "@seis/content";
import { getDeploymentTargets, getSourceArchives } from "@seis/runtime";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.publishingConsoleTitle,
    description: dict.publishingConsoleLead,
    path: "/publishing-console",
    locale
  });
}

export default async function PublishingConsolePage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const targets = getDeploymentTargets();
  const archives = getSourceArchives();
  const blockedTargets = targets.filter((target) => target.status === "needs_credentials");
  const metrics = [
    { label: dict.publishingConsoleMetricSteps, value: publishingConsoleSteps.length },
    { label: dict.publishingConsoleMetricTargets, value: targets.length },
    { label: dict.publishingConsoleMetricArchives, value: archives.length },
    { label: dict.publishingConsoleMetricBlocked, value: blockedTargets.length }
  ];

  return (
    <main className="page-shell publishing-console-shell" id="page-main-content">
      <a href="#publishing-console-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">Emirhan Kudun</Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/portfolio-os")}>{dict.navPortfolioOs}</Link>
          <Link href={withLocalePath(locale, "/publishing-console")} aria-current="page">{dict.navPublishingConsole}</Link>
          <Link href={withLocalePath(locale, "/readiness")}>{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero publishing-console-hero" id="publishing-console-content">
        <p className="eyebrow">{dict.publishingConsoleEyebrow}</p>
        <h1>{dict.publishingConsoleTitle}</h1>
        <p className="page-lead">{dict.publishingConsoleLead}</p>
        <div className="readiness-metrics" aria-label={dict.publishingConsoleTitle}>
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section publishing-console-section" aria-labelledby="publishing-console-steps-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.publishingConsoleEyebrow}</p>
            <h2 id="publishing-console-steps-title">{dict.publishingConsoleStepsTitle}</h2>
          </div>
          <p>{dict.publishingConsoleStepsLead}</p>
        </div>
        <div className="publishing-step-grid">
          {publishingConsoleSteps.map((step) => (
            <article className="publishing-step-card" data-status={step.status} key={step.id}>
              <span>{step.status}</span>
              <h3>{step.title}</h3>
              <p>{step.signal}</p>
              <code>{step.command}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="section publishing-console-section" aria-labelledby="publishing-console-targets-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.publishingConsoleEyebrow}</p>
            <h2 id="publishing-console-targets-title">{dict.publishingConsoleTargetsTitle}</h2>
          </div>
          <p>{dict.publishingConsoleTargetsLead}</p>
        </div>
        <div className="publishing-target-grid">
          {targets.map((target) => (
            <article className="publishing-target-card" data-status={target.status} key={target.id}>
              <span>{target.status}</span>
              <h3>{target.name}</h3>
              <p>{target.safety}</p>
              <code>{target.command}</code>
            </article>
          ))}
        </div>
        <div className="publishing-console-actions">
          <Link className="primary-link" href="/api/publishing-console">{dict.publishingConsoleApiCta}</Link>
          <Link className="secondary-link" href={withLocalePath(locale, "/readiness")}>{dict.publishingConsoleReadinessCta}</Link>
        </div>
      </section>
    </main>
  );
}
