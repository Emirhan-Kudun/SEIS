import type { Metadata } from "next";
import Link from "next/link";

import {
  cloudEnvironmentPrinciples,
  cloudEnvironmentProfiles,
  cloudEnvironmentVariables,
  getDictionary
} from "@seis/content";
import { getCloudActivationPlan, getDeploymentTargets } from "@seis/runtime";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.cloudEnvironmentTitle,
    description: dict.cloudEnvironmentLead,
    path: "/cloud-environment",
    locale
  });
}

export default async function CloudEnvironmentPage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const deploymentTargets = getDeploymentTargets();
  const activationPlan = getCloudActivationPlan();
  const secretVariables = cloudEnvironmentVariables.filter((variable) => variable.scope === "secret");
  const needsCredentialsProfiles = cloudEnvironmentProfiles.filter((profile) => profile.status === "needs_credentials");
  const metrics = [
    { label: dict.cloudEnvironmentMetricProfiles, value: cloudEnvironmentProfiles.length },
    { label: dict.cloudEnvironmentMetricVariables, value: cloudEnvironmentVariables.length },
    { label: dict.cloudEnvironmentMetricSecrets, value: secretVariables.length },
    { label: dict.cloudEnvironmentMetricActivationStages, value: activationPlan.length },
    { label: dict.publishingConsoleMetricTargets, value: deploymentTargets.length }
  ];

  return (
    <main className="page-shell cloud-environment-shell" id="page-main-content">
      <a href="#cloud-environment-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">Emirhan Kudun</Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/cloud-environment")} aria-current="page">{dict.navCloudEnvironment}</Link>
          <Link href={withLocalePath(locale, "/publishing-console")}>{dict.navPublishingConsole}</Link>
          <Link href={withLocalePath(locale, "/security-posture")}>{dict.navSecurityPosture}</Link>
          <Link href={withLocalePath(locale, "/readiness")}>{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero cloud-environment-hero" id="cloud-environment-content">
        <p className="eyebrow">{dict.cloudEnvironmentEyebrow}</p>
        <h1>{dict.cloudEnvironmentTitle}</h1>
        <p className="page-lead">{dict.cloudEnvironmentLead}</p>
        <p className="cloud-environment-note">{dict.cloudEnvironmentNeedsCredentials}</p>
        <div className="readiness-metrics" aria-label={dict.cloudEnvironmentTitle}>
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section cloud-environment-section" aria-labelledby="cloud-environment-profiles-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.cloudEnvironmentEyebrow}</p>
            <h2 id="cloud-environment-profiles-title">{dict.cloudEnvironmentProfilesTitle}</h2>
          </div>
          <p>{dict.cloudEnvironmentProfilesLead}</p>
        </div>
        <div className="cloud-environment-profile-grid">
          {cloudEnvironmentProfiles.map((profile) => (
            <article className="cloud-environment-card" data-status={profile.status} key={profile.id}>
              <span>{profile.provider} / {profile.status}</span>
              <h3>{profile.label}</h3>
              <p>{profile.purpose}</p>
              <strong>{profile.safety}</strong>
              <code>{profile.command}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="section cloud-environment-section" aria-labelledby="cloud-environment-plan-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.cloudEnvironmentActivationEyebrow}</p>
            <h2 id="cloud-environment-plan-title">{dict.cloudEnvironmentActivationTitle}</h2>
          </div>
          <p>{dict.cloudEnvironmentActivationLead}</p>
        </div>
        <div className="cloud-environment-plan-grid">
          {activationPlan.map((item) => (
            <article className="cloud-environment-card" data-status={item.status} key={item.id}>
              <span>{item.stage} / {item.provider} / {item.status}</span>
              <h3>{item.name}</h3>
              <p>{item.proof}</p>
              <strong>{item.safety}</strong>
              <ul>
                {item.commands.map((command) => (
                  <li key={command}><code>{command}</code></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section cloud-environment-section" aria-labelledby="cloud-environment-variables-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.cloudEnvironmentVariablesTitle}</p>
            <h2 id="cloud-environment-variables-title">{dict.cloudEnvironmentVariablesTitle}</h2>
          </div>
          <p>{dict.cloudEnvironmentVariablesLead}</p>
        </div>
        <div className="cloud-environment-variable-grid">
          {cloudEnvironmentVariables.map((variable) => (
            <article className="cloud-environment-variable" data-scope={variable.scope} key={variable.key}>
              <span>{variable.scope} / {variable.owner}</span>
              <h3>{variable.key}</h3>
              <p>{variable.notes}</p>
              <ul>
                {variable.requiredFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section cloud-environment-section" aria-labelledby="cloud-environment-principles-title">
        <div className="cloud-environment-principles-panel">
          <div>
            <p className="eyebrow">{dict.cloudEnvironmentPrinciplesTitle}</p>
            <h2 id="cloud-environment-principles-title">{dict.cloudEnvironmentPrinciplesTitle}</h2>
            <p>{dict.cloudEnvironmentPrinciplesLead}</p>
            <div className="cloud-environment-actions">
              <Link className="primary-link" href="/api/cloud-environment">{dict.cloudEnvironmentApiCta}</Link>
              <Link className="secondary-link" href={withLocalePath(locale, "/publishing-console")}>{dict.cloudEnvironmentPublishingCta}</Link>
            </div>
          </div>
          <div className="cloud-environment-principles">
            {cloudEnvironmentPrinciples.map((principle) => (
              <article key={principle.id}>
                <span>{principle.id}</span>
                <h3>{principle.label}</h3>
                <p>{principle.rule}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
