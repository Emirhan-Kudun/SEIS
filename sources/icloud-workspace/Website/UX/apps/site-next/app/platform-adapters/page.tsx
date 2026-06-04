import type { Metadata } from "next";
import Link from "next/link";

import { getDictionary, platformAdapterPrinciples, platformAdapters } from "@seis/content";
import { getDeploymentTargets, getSourceArchives } from "@seis/runtime";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.platformAdaptersTitle,
    description: dict.platformAdaptersLead,
    path: "/platform-adapters",
    locale
  });
}

export default async function PlatformAdaptersPage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const deploymentTargets = getDeploymentTargets();
  const archives = getSourceArchives();
  const readyAdapters = platformAdapters.filter((adapter) => adapter.status === "ready");
  const plannedAdapters = platformAdapters.filter((adapter) => adapter.status === "planned");
  const metrics = [
    { label: dict.platformAdaptersMetricAdapters, value: platformAdapters.length },
    { label: dict.platformAdaptersMetricReady, value: readyAdapters.length },
    { label: dict.platformAdaptersMetricPlanned, value: plannedAdapters.length },
    { label: dict.platformAdaptersMetricArchives, value: archives.length }
  ];

  return (
    <main className="page-shell platform-adapters-shell" id="page-main-content">
      <a href="#platform-adapters-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">Emirhan Kudun</Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/compatibility")}>{dict.navCompatibility}</Link>
          <Link href={withLocalePath(locale, "/platform-adapters")} aria-current="page">{dict.navPlatformAdapters}</Link>
          <Link href={withLocalePath(locale, "/publishing-console")}>{dict.navPublishingConsole}</Link>
          <Link href={withLocalePath(locale, "/readiness")}>{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero platform-adapters-hero" id="platform-adapters-content">
        <p className="eyebrow">{dict.platformAdaptersEyebrow}</p>
        <h1>{dict.platformAdaptersTitle}</h1>
        <p className="page-lead">{dict.platformAdaptersLead}</p>
        <div className="readiness-metrics" aria-label={dict.platformAdaptersTitle}>
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section platform-adapters-section" aria-labelledby="platform-adapters-map-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.platformAdaptersEyebrow}</p>
            <h2 id="platform-adapters-map-title">{dict.platformAdaptersMapTitle}</h2>
          </div>
          <p>{dict.platformAdaptersMapLead}</p>
        </div>
        <div className="platform-adapter-grid">
          {platformAdapters.map((adapter) => (
            <article className="platform-adapter-card" data-status={adapter.status} key={adapter.id}>
              <span>{adapter.status}</span>
              <h3>{adapter.label}</h3>
              <p className="kicker">{adapter.platform}</p>
              <p>{adapter.contract}</p>
              <code>{adapter.entrypoint}</code>
              <ul>
                {adapter.handoff.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section platform-adapters-section" aria-labelledby="platform-adapters-governance-title">
        <div className="platform-adapter-governance">
          <div>
            <p className="eyebrow">{dict.platformAdaptersGovernanceTitle}</p>
            <h2 id="platform-adapters-governance-title">{dict.platformAdaptersGovernanceTitle}</h2>
            <p>{dict.platformAdaptersGovernanceLead}</p>
            <div className="platform-adapter-actions">
              <Link className="primary-link" href="/api/platform-adapters">{dict.platformAdaptersApiCta}</Link>
              <Link className="secondary-link" href={withLocalePath(locale, "/compatibility")}>{dict.platformAdaptersCompatibilityCta}</Link>
            </div>
          </div>
          <div className="platform-adapter-principles">
            {platformAdapterPrinciples.map((principle) => (
              <article key={principle.id}>
                <span>{principle.id}</span>
                <h3>{principle.label}</h3>
                <p>{principle.rule}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section platform-adapters-section" aria-labelledby="platform-adapters-release-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.navPublishingConsole}</p>
            <h2 id="platform-adapters-release-title">{dict.platformAdaptersReleaseTitle}</h2>
          </div>
          <p>{dict.platformAdaptersReleaseLead}</p>
        </div>
        <div className="platform-adapter-release-grid">
          {deploymentTargets.map((target) => (
            <article className="platform-adapter-release" data-status={target.status} key={target.id}>
              <span>{target.status}</span>
              <h3>{target.name}</h3>
              <p>{target.safety}</p>
              <code>{target.command}</code>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
