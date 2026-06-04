import type { Metadata } from "next";
import Link from "next/link";

import { getDictionary, serverHandoffGuardrails, serverHandoffStages } from "@seis/content";
import { getDeploymentTargets, getSourceArchives } from "@seis/runtime";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.serverHandoffTitle,
    description: dict.serverHandoffLead,
    path: "/server-handoff",
    locale
  });
}

export default async function ServerHandoffPage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const deploymentTargets = getDeploymentTargets();
  const archives = getSourceArchives();
  const serverTargets = deploymentTargets.filter((target) => target.persistence === "custom-server" || target.persistence === "filesystem");
  const blockedStages = serverHandoffStages.filter((stage) => stage.status === "needs_credentials");
  const metrics = [
    { label: dict.serverHandoffMetricStages, value: serverHandoffStages.length },
    { label: dict.serverHandoffMetricGuardrails, value: serverHandoffGuardrails.length },
    { label: dict.serverHandoffMetricTargets, value: serverTargets.length },
    { label: dict.serverHandoffMetricBlocked, value: blockedStages.length }
  ];

  return (
    <main className="page-shell server-handoff-shell" id="page-main-content">
      <a href="#server-handoff-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">Emirhan Kudun</Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/server-handoff")} aria-current="page">{dict.navServerHandoff}</Link>
          <Link href={withLocalePath(locale, "/cloud-environment")}>{dict.navCloudEnvironment}</Link>
          <Link href={withLocalePath(locale, "/publishing-console")}>{dict.navPublishingConsole}</Link>
          <Link href={withLocalePath(locale, "/security-posture")}>{dict.navSecurityPosture}</Link>
        </div>
      </nav>

      <section className="section page-hero server-handoff-hero" id="server-handoff-content">
        <p className="eyebrow">{dict.serverHandoffEyebrow}</p>
        <h1>{dict.serverHandoffTitle}</h1>
        <p className="page-lead">{dict.serverHandoffLead}</p>
        <div className="readiness-metrics" aria-label={dict.serverHandoffTitle}>
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section server-handoff-section" aria-labelledby="server-handoff-stages-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.serverHandoffEyebrow}</p>
            <h2 id="server-handoff-stages-title">{dict.serverHandoffStagesTitle}</h2>
          </div>
          <p>{dict.serverHandoffStagesLead}</p>
        </div>
        <div className="server-handoff-stage-grid">
          {serverHandoffStages.map((stage) => (
            <article className="server-handoff-card" data-status={stage.status} key={stage.id}>
              <span>{stage.status}</span>
              <h3>{stage.title}</h3>
              <p>{stage.signal}</p>
              <code>{stage.command}</code>
              <ul>
                {stage.proof.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section server-handoff-section" aria-labelledby="server-handoff-guardrails-title">
        <div className="server-handoff-panel">
          <div>
            <p className="eyebrow">{dict.serverHandoffGuardrailsTitle}</p>
            <h2 id="server-handoff-guardrails-title">{dict.serverHandoffGuardrailsTitle}</h2>
            <p>{dict.serverHandoffGuardrailsLead}</p>
            <div className="server-handoff-actions">
              <Link className="primary-link" href="/api/server-handoff">{dict.serverHandoffApiCta}</Link>
              <Link className="secondary-link" href={withLocalePath(locale, "/cloud-environment")}>{dict.serverHandoffCloudCta}</Link>
            </div>
          </div>
          <div className="server-handoff-guardrail-grid">
            {serverHandoffGuardrails.map((guardrail) => (
              <article key={guardrail.id}>
                <span>{guardrail.id}</span>
                <h3>{guardrail.label}</h3>
                <p>{guardrail.rule}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section server-handoff-section" aria-labelledby="server-handoff-targets-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.serverHandoffTargetsTitle}</p>
            <h2 id="server-handoff-targets-title">{dict.serverHandoffTargetsTitle}</h2>
          </div>
          <p>{dict.serverHandoffTargetsLead}</p>
        </div>
        <div className="server-handoff-target-grid">
          {serverTargets.map((target) => (
            <article className="server-handoff-card" data-status={target.status} key={target.id}>
              <span>{target.persistence} / {target.status}</span>
              <h3>{target.name}</h3>
              <p>{target.safety}</p>
              <code>{target.command}</code>
            </article>
          ))}
        </div>
        <p className="server-handoff-note">{dict.serverHandoffArchiveNote.replace("{count}", archives.length.toString())}</p>
      </section>
    </main>
  );
}
