import type { Metadata } from "next";
import Link from "next/link";

import {
  getDictionary,
  supremeOsCapabilities,
  supremeOsEngineNodes,
  supremeOsLanes,
  supremeOsModes
} from "@seis/content";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.navSupremeOs,
    description: dict.osLead,
    path: "/os",
    locale
  });
}

export default async function SupremeOsPage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const engineModeLabels = {
    active: dict.osEngineStatusActive,
    guarded: dict.osEngineStatusGuarded,
    blocked: dict.osEngineStatusBlocked
  };

  return (
    <main className="page-shell os-shell" id="page-main-content">
      <a href="#os-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">
          Emirhan Kudun
        </Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/portfolio")}>{dict.navPortfolio}</Link>
          <Link href={withLocalePath(locale, "/motion")}>{dict.navMotion}</Link>
          <Link href={withLocalePath(locale, "/os")} aria-current="page">{dict.navSupremeOs}</Link>
          <Link href={withLocalePath(locale, "/compatibility")}>{dict.navCompatibility}</Link>
          <Link href={withLocalePath(locale, "/readiness")}>{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/cv")}>{dict.navExperience}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero os-hero" id="os-content">
        <p className="eyebrow">{dict.osEyebrow}</p>
        <h1>{dict.osTitle}</h1>
        <p className="page-lead">{dict.osLead}</p>
        <div className="os-rule-panel">
          <p className="kicker">{dict.osGovernanceTitle}</p>
          <p>{dict.osGovernanceLead}</p>
        </div>
      </section>

      <section className="section os-section" aria-labelledby="os-engine-title">
        <div className="os-engine-panel">
          <div>
            <p className="eyebrow">{dict.osGovernanceTitle}</p>
            <h2 id="os-engine-title">{dict.osEngineTitle}</h2>
            <p>{dict.osEngineLead}</p>
            <Link className="primary-link" href={withLocalePath(locale, "/readiness")}>
              {dict.navReadiness}
            </Link>
          </div>
          <div className="os-engine-grid">
            {supremeOsEngineNodes.map((node) => (
              <article className="os-engine-node" data-mode={node.mode} key={node.id}>
                <p className="kicker">{node.layer} / {engineModeLabels[node.mode]}</p>
                <h3>{node.label}</h3>
                <p>{node.role}</p>
                <ul>
                  {node.proof.map((proof) => (
                    <li key={proof}>{proof}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section os-section" aria-labelledby="os-modes-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.osEyebrow}</p>
            <h2 id="os-modes-title">{dict.osModesTitle}</h2>
          </div>
          <p>{dict.osGovernanceLead}</p>
        </div>
        <div className="os-mode-grid">
          {supremeOsModes.map((mode) => (
            <article className="os-card" key={mode.id}>
              <p className="kicker">{mode.id}</p>
              <h3>{mode.name}</h3>
              <p>{mode.purpose}</p>
              <ul>
                {mode.signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section os-section" aria-labelledby="os-capabilities-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.osCapabilitiesTitle}</p>
            <h2 id="os-capabilities-title">{dict.osCapabilitiesTitle}</h2>
          </div>
          <p>{dict.osLead}</p>
        </div>
        <div className="os-capability-grid">
          {supremeOsCapabilities.map((capability) => (
            <article className="os-card" data-status={capability.status} key={capability.id}>
              <p className="kicker">{capability.domain}</p>
              <h3>{capability.role}</h3>
              <p>{capability.outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section os-section" aria-labelledby="os-lanes-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.osLanesTitle}</p>
            <h2 id="os-lanes-title">{dict.osLanesTitle}</h2>
          </div>
          <p>{dict.osGovernanceLead}</p>
        </div>
        <div className="os-lane-grid">
          {supremeOsLanes.map((lane) => (
            <article className="os-card" key={lane.id}>
              <p className="kicker">{lane.label}</p>
              <h3>{lane.scope}</h3>
              <p>{lane.guardrail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
