import type { Metadata } from "next";
import Link from "next/link";

import {
  briefTriageBuckets,
  briefTriageRules,
  contactQa,
  getDictionary,
  services
} from "@seis/content";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";
import { buildPageMetadata } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.briefTriageTitle,
    description: dict.briefTriageLead,
    path: "/brief-triage",
    locale
  });
}

export default async function BriefTriagePage() {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const metrics = [
    { label: dict.briefTriageMetricRules, value: briefTriageRules.length },
    { label: dict.briefTriageMetricBuckets, value: briefTriageBuckets.length },
    { label: dict.briefTriageMetricServices, value: services.length },
    { label: dict.briefTriageMetricQuestions, value: contactQa.length }
  ];

  return (
    <main className="page-shell brief-triage-shell" id="page-main-content">
      <a href="#brief-triage-content" className="skip-link">{dict.skipContent}</a>
      <nav className="top-nav" aria-label={dict.primaryNavigationLabel}>
        <Link href={withLocalePath(locale, "/")} className="brand">Emirhan Kudun</Link>
        <div className="nav-links">
          <Link href={withLocalePath(locale, "/studio-crm")}>{dict.navStudioCrm}</Link>
          <Link href={withLocalePath(locale, "/brief-triage")} aria-current="page">{dict.navBriefTriage}</Link>
          <Link href={withLocalePath(locale, "/publishing-console")}>{dict.navPublishingConsole}</Link>
          <Link href={withLocalePath(locale, "/contact")}>{dict.navContact}</Link>
        </div>
      </nav>

      <section className="section page-hero brief-triage-hero" id="brief-triage-content">
        <p className="eyebrow">{dict.briefTriageEyebrow}</p>
        <h1>{dict.briefTriageTitle}</h1>
        <p className="page-lead">{dict.briefTriageLead}</p>
        <div className="readiness-metrics" aria-label={dict.briefTriageTitle}>
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section brief-triage-section" aria-labelledby="brief-triage-rules-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.briefTriageEyebrow}</p>
            <h2 id="brief-triage-rules-title">{dict.briefTriageRulesTitle}</h2>
          </div>
          <p>{dict.briefTriageRulesLead}</p>
        </div>
        <div className="brief-triage-rule-grid">
          {briefTriageRules.map((rule) => (
            <article className="brief-triage-card" data-rule={rule.id} key={rule.id}>
              <span>{rule.weight}%</span>
              <h3>{rule.label}</h3>
              <p>{rule.signal}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section brief-triage-section" aria-labelledby="brief-triage-buckets-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{dict.briefTriageEyebrow}</p>
            <h2 id="brief-triage-buckets-title">{dict.briefTriageBucketsTitle}</h2>
          </div>
          <p>{dict.briefTriageBucketsLead}</p>
        </div>
        <div className="brief-triage-bucket-grid">
          {briefTriageBuckets.map((bucket) => (
            <article className="brief-triage-bucket" data-bucket={bucket.id} key={bucket.id}>
              <span>{bucket.threshold}</span>
              <h3>{bucket.label}</h3>
              <p>{bucket.action}</p>
            </article>
          ))}
        </div>
        <div className="brief-triage-actions">
          <Link className="primary-link" href="/api/brief-triage">{dict.briefTriageApiCta}</Link>
          <Link className="secondary-link" href={withLocalePath(locale, "/contact#brief-form")}>{dict.briefTriageContactCta}</Link>
        </div>
      </section>
    </main>
  );
}
