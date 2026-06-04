import type { Metadata } from "next";
import Link from "next/link";

import { contactQa, getDictionary, services, studioCrmLanes, studioCrmSignals } from "@seis/content";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.studioCrmTitle,
    description: dict.studioCrmLead,
    path: "/studio-crm",
    locale
  });
}

export default async function StudioCrmPage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const metrics = [
    { label: dict.studioCrmMetricLanes, value: studioCrmLanes.length },
    { label: dict.studioCrmMetricSignals, value: studioCrmSignals.length },
    { label: dict.studioCrmMetricQa, value: contactQa.length },
    { label: dict.studioCrmMetricServices, value: services.length }
  ];

  return (
    <main className="page-shell studio-crm-shell" id="page-main-content">
      <a href="#studio-crm-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">Emirhan Kudun</Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/portfolio")}>{dict.navPortfolio}</Link>
          <Link href={withLocalePath(locale, "/studio-crm")} aria-current="page">{dict.navStudioCrm}</Link>
          <Link href={withLocalePath(locale, "/case-study-builder")}>{dict.navCaseStudyBuilder}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero studio-crm-hero" id="studio-crm-content">
        <p className="eyebrow">{dict.studioCrmEyebrow}</p>
        <h1>{dict.studioCrmTitle}</h1>
        <p className="page-lead">{dict.studioCrmLead}</p>
        <div className="readiness-metrics" aria-label={dict.studioCrmTitle}>
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section studio-crm-section" aria-labelledby="studio-crm-lanes-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.studioCrmEyebrow}</p>
            <h2 id="studio-crm-lanes-title">{dict.studioCrmLanesTitle}</h2>
          </div>
          <p>{dict.studioCrmLanesLead}</p>
        </div>
        <div className="studio-crm-lane-grid">
          {studioCrmLanes.map((lane) => (
            <article className="studio-crm-card" data-lane={lane.id} key={lane.id}>
              <span>{lane.id}</span>
              <h3>{lane.title}</h3>
              <p>{lane.signal}</p>
              <strong>{lane.nextAction}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section studio-crm-section" aria-labelledby="studio-crm-signals-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.studioCrmEyebrow}</p>
            <h2 id="studio-crm-signals-title">{dict.studioCrmSignalsTitle}</h2>
          </div>
          <p>{dict.studioCrmSignalsLead}</p>
        </div>
        <div className="studio-crm-signal-grid">
          {studioCrmSignals.map((signal) => (
            <article className="studio-crm-signal" key={signal.id}>
              <span>{signal.id}</span>
              <h3>{signal.label}</h3>
              <p>{signal.description}</p>
            </article>
          ))}
        </div>
        <div className="studio-crm-actions">
          <Link className="primary-link" href="/api/studio-crm">{dict.studioCrmApiCta}</Link>
          <Link className="secondary-link" href={withLocalePath(locale, "/contact")}>{dict.studioCrmContactCta}</Link>
        </div>
      </section>
    </main>
  );
}
