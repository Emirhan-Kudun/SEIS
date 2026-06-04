import type { Metadata } from "next";
import Link from "next/link";

import { getDictionary, readinessDecision, securityPostureSignals } from "@seis/content";
import { getDeploymentTargets } from "@seis/runtime";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.securityPostureTitle,
    description: dict.securityPostureLead,
    path: "/security-posture",
    locale
  });
}

export default async function SecurityPosturePage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const deploymentTargets = getDeploymentTargets();
  const watchSignals = securityPostureSignals.filter((signal) => signal.status === "watch");
  const passingSignals = securityPostureSignals.filter((signal) => signal.status === "passing");
  const metrics = [
    { label: dict.securityPostureMetricSignals, value: securityPostureSignals.length },
    { label: dict.securityPostureMetricWatch, value: watchSignals.length },
    { label: dict.securityPostureMetricPassing, value: passingSignals.length },
    { label: dict.publishingConsoleMetricTargets, value: deploymentTargets.length }
  ];

  return (
    <main className="page-shell security-posture-shell" id="page-main-content">
      <a href="#security-posture-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">Emirhan Kudun</Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/publishing-console")}>{dict.navPublishingConsole}</Link>
          <Link href={withLocalePath(locale, "/security-posture")} aria-current="page">{dict.navSecurityPosture}</Link>
          <Link href={withLocalePath(locale, "/connector-console")}>{dict.navConnectorConsole}</Link>
          <Link href={withLocalePath(locale, "/readiness")}>{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero security-posture-hero" id="security-posture-content">
        <p className="eyebrow">{dict.securityPostureEyebrow}</p>
        <h1>{dict.securityPostureTitle}</h1>
        <p className="page-lead">{dict.securityPostureLead}</p>
        <aside className="security-posture-decision" data-status={readinessDecision.status} aria-label={readinessDecision.label}>
          <span>{readinessDecision.status}</span>
          <h2>{readinessDecision.label}</h2>
          <p>{readinessDecision.signal}</p>
        </aside>
        <div className="readiness-metrics" aria-label={dict.securityPostureTitle}>
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section security-posture-section" aria-labelledby="security-posture-signals-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.securityPostureEyebrow}</p>
            <h2 id="security-posture-signals-title">{dict.securityPostureSignalsTitle}</h2>
          </div>
          <p>{dict.securityPostureSignalsLead}</p>
        </div>
        <div className="security-posture-grid">
          {securityPostureSignals.map((signal) => (
            <article className="security-posture-card" data-status={signal.status} key={signal.id}>
              <span>{signal.status}</span>
              <h3>{signal.label}</h3>
              <p>{signal.signal}</p>
              <strong>{signal.action}</strong>
              <ul>
                {signal.evidence.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section security-posture-section" aria-labelledby="security-posture-actions-title">
        <div className="security-posture-actions-panel">
          <div>
            <p className="eyebrow">{dict.securityPostureActionsTitle}</p>
            <h2 id="security-posture-actions-title">{dict.securityPostureActionsTitle}</h2>
            <p>{dict.securityPostureActionsLead}</p>
            <div className="security-posture-actions">
              <Link className="primary-link" href="/api/security-posture">{dict.securityPostureApiCta}</Link>
              <Link className="secondary-link" href={withLocalePath(locale, "/publishing-console")}>{dict.securityPosturePublishingCta}</Link>
            </div>
          </div>
          <div className="security-posture-targets">
            {deploymentTargets.map((target) => (
              <article key={target.id} data-status={target.status}>
                <span>{target.status}</span>
                <h3>{target.name}</h3>
                <p>{target.safety}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
