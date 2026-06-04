import type { Metadata } from "next";
import Link from "next/link";

import {
  getDictionary,
  platformCompatibilityDevices,
  platformCompatibilityPrinciples,
  platformCompatibilityTargets
} from "@seis/content";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.navCompatibility,
    description: dict.compatibilityLead,
    path: "/compatibility",
    locale
  });
}

export default async function PlatformCompatibilityPage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const activeTargets = platformCompatibilityTargets.filter((target) => target.status === "active");
  const plannedTargets = platformCompatibilityTargets.filter((target) => target.status === "planned");
  const heroSignals = ["HTML", "CSS", "JS", "JSON", "Android", "iPhone", "Windows", "Apple"];

  return (
    <main className="page-shell compatibility-shell" id="page-main-content">
      <a href="#compatibility-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">
          Emirhan Kudun
        </Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/portfolio")}>{dict.navPortfolio}</Link>
          <Link href={withLocalePath(locale, "/motion")}>{dict.navMotion}</Link>
          <Link href={withLocalePath(locale, "/os")}>{dict.navSupremeOs}</Link>
          <Link href={withLocalePath(locale, "/compatibility")} aria-current="page">{dict.navCompatibility}</Link>
          <Link href={withLocalePath(locale, "/readiness")}>{dict.navReadiness}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero compatibility-hero" id="compatibility-content">
        <p className="eyebrow">{dict.compatibilityEyebrow}</p>
        <h1>{dict.compatibilityTitle}</h1>
        <p className="page-lead">{dict.compatibilityLead}</p>
        <div className="compatibility-signal-strip" aria-label={dict.compatibilityEyebrow}>
          {heroSignals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
      </section>

      <section className="section compatibility-section" aria-labelledby="compatibility-matrix-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.compatibilityEyebrow}</p>
            <h2 id="compatibility-matrix-title">{dict.compatibilityMatrixTitle}</h2>
          </div>
          <p>{dict.compatibilityMatrixLead}</p>
        </div>
        <div className="compatibility-grid">
          {[...activeTargets, ...plannedTargets].map((target) => (
            <article className="compatibility-card" data-status={target.status} key={target.id}>
              <p className="kicker">{target.family} / {target.status}</p>
              <h3>{target.label}</h3>
              <p>{target.baseline}</p>
              <ul>
                {target.checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section compatibility-section" aria-labelledby="compatibility-devices-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.compatibilityDevicesTitle}</p>
            <h2 id="compatibility-devices-title">{dict.compatibilityDevicesTitle}</h2>
          </div>
          <p>{dict.compatibilityDevicesLead}</p>
        </div>
        <div className="compatibility-device-grid">
          {platformCompatibilityDevices.map((device) => (
            <article className="compatibility-device-card" key={device.id}>
              <p className="kicker">{device.input}</p>
              <h3>{device.label}</h3>
              <p>{device.viewport}</p>
              <ul>
                {device.watchouts.map((watchout) => (
                  <li key={watchout}>{watchout}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section compatibility-section" aria-labelledby="compatibility-governance-title">
        <div className="compatibility-governance-panel">
          <div>
            <p className="eyebrow">{dict.compatibilityGovernanceTitle}</p>
            <h2 id="compatibility-governance-title">{dict.compatibilityGovernanceTitle}</h2>
            <p>{dict.compatibilityGovernanceLead}</p>
            <Link className="primary-link" href={withLocalePath(locale, "/motion")}>{dict.navMotion}</Link>
          </div>
          <div className="compatibility-principle-list">
            {platformCompatibilityPrinciples.map((principle) => (
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
