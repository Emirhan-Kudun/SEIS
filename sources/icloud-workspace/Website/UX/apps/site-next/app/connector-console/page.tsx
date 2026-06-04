import type { Metadata } from "next";
import Link from "next/link";

import { connectorConsolePanels, getDictionary } from "@seis/content";
import {
  getConnectorActivationManifest,
  getMcpReadinessSnapshot,
  getRuntimeSnapshot,
  getSourceArchives
} from "@seis/runtime";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.connectorConsoleTitle,
    description: dict.connectorConsoleLead,
    path: "/connector-console",
    locale
  });
}

export default async function ConnectorConsolePage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const runtime = getRuntimeSnapshot();
  const mcpReadiness = getMcpReadinessSnapshot();
  const archives = getSourceArchives();
  const connectorActivationManifest = getConnectorActivationManifest();
  const metrics = [
    { label: dict.connectorConsoleMetricConnectors, value: runtime.connectors.length },
    { label: dict.connectorConsoleMetricSkills, value: runtime.skills.length },
    { label: dict.connectorConsoleMetricMcp, value: mcpReadiness.items.length },
    { label: "activation lanes", value: connectorActivationManifest.lanes.length },
    { label: dict.connectorConsoleMetricArchives, value: archives.length }
  ];

  return (
    <main className="page-shell connector-console-shell" id="page-main-content">
      <a href="#connector-console-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">Emirhan Kudun</Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/connector-console")} aria-current="page">{dict.navConnectorConsole}</Link>
          <Link href={withLocalePath(locale, "/publishing-console")}>{dict.navPublishingConsole}</Link>
          <Link href={withLocalePath(locale, "/readiness")}>{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero connector-console-hero" id="connector-console-content">
        <p className="eyebrow">{dict.connectorConsoleEyebrow}</p>
        <h1>{dict.connectorConsoleTitle}</h1>
        <p className="page-lead">{dict.connectorConsoleLead}</p>
        <div className="readiness-metrics" aria-label={dict.connectorConsoleTitle}>
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section connector-console-section" aria-labelledby="connector-console-panels-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.connectorConsoleEyebrow}</p>
            <h2 id="connector-console-panels-title">{dict.connectorConsolePanelsTitle}</h2>
          </div>
          <p>{dict.connectorConsolePanelsLead}</p>
        </div>
        <div className="connector-console-panel-grid">
          {connectorConsolePanels.map((panel) => (
            <article className="connector-console-card" data-panel={panel.id} key={panel.id}>
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
      </section>

      <section className="section connector-console-section" aria-labelledby="connector-console-runtime-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.connectorConsoleEyebrow}</p>
            <h2 id="connector-console-runtime-title">{dict.connectorConsoleRuntimeTitle}</h2>
          </div>
          <p>{dict.connectorConsoleRuntimeLead}</p>
        </div>
        <div className="connector-console-summary-grid">
          <article className="connector-console-summary">
            <span>runtime</span>
            <strong>{runtime.summary.active}/{runtime.summary.total}</strong>
            <p>active items</p>
          </article>
          <article className="connector-console-summary">
            <span>mcp</span>
            <strong>{mcpReadiness.summary.active}/{mcpReadiness.summary.total}</strong>
            <p>active readiness items</p>
          </article>
          <article className="connector-console-summary">
            <span>auth</span>
            <strong>{runtime.summary.needsCredentials + mcpReadiness.summary.needsCredentials}</strong>
            <p>needs credentials</p>
          </article>
          <article className="connector-console-summary">
            <span>activation</span>
            <strong>{connectorActivationManifest.lanes.length}</strong>
            <p>{connectorActivationManifest.policy.mode}</p>
          </article>
        </div>
        <div className="connector-console-actions">
          <Link className="primary-link" href="/api/connector-console">{dict.connectorConsoleApiCta}</Link>
          <Link className="secondary-link" href={withLocalePath(locale, "/readiness")}>{dict.connectorConsoleReadinessCta}</Link>
        </div>
      </section>
    </main>
  );
}
