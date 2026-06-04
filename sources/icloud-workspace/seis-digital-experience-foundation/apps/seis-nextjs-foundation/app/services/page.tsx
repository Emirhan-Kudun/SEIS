import type { Metadata } from "next";
import Link from "next/link";

import { ProjectEstimator } from "@/components/forms/project-estimator";
import { pricingTiers, resolveLocale } from "@/lib/content";
import { getServiceItems } from "@/lib/creative-content";
import { getRoadmapPhases, getUiDictionary, getWorkflowMetrics } from "@/lib/site-i18n";

type ServicesPageProps = {
  searchParams?: { lang?: string };
};

export const metadata: Metadata = {
  title: "Services",
  description: "SEIS service packs, delivery roadmap, and workflow quality metrics.",
  alternates: {
    canonical: "/services"
  }
};

export default function ServicesPage({ searchParams }: ServicesPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const ui = getUiDictionary(locale);
  const roadmap = getRoadmapPhases(locale);
  const metrics = getWorkflowMetrics(locale);
  const services = getServiceItems();

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1100px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">{ui.navServices}</p>
        <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{ui.servicesTitle}</h1>
        <p className="mt-4 max-w-3xl text-sm text-seis-muted sm:text-base">{ui.servicesLead}</p>

        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <article key={tier.id} className="rounded-xl border border-seis-line bg-seis-surface p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{tier.name}</p>
              <p className="mt-1 font-serif text-3xl">{tier.price}</p>
              <p className="mt-2 text-sm text-seis-muted">{tier.summary}</p>
              <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
                {tier.bullets.map((bullet) => (
                  <li key={bullet} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.id} className="rounded-xl border border-seis-line bg-seis-surface p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{service.title}</p>
              <p className="mt-2 text-sm text-seis-muted">{service.summary}</p>
              <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
                {service.deliverables.map((item) => (
                  <li key={item} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h2 className="mt-10 font-serif text-3xl">{ui.roadmapTitle}</h2>
        <ol className="mt-4 grid gap-3 lg:grid-cols-3">
          {roadmap.map((phase) => (
            <li key={phase.id} className="rounded-xl border border-seis-line bg-seis-surface p-4">
              <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">{phase.id.toUpperCase()}</p>
              <h3 className="mt-2 font-serif text-2xl">{phase.title}</h3>
              <p className="mt-2 text-sm text-seis-muted">{phase.summary}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-10 font-serif text-3xl">{ui.workflowTitle}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {metrics.map((metric) => (
            <li key={metric.id} className="rounded-xl border border-seis-line bg-seis-surface p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{metric.label}</p>
              <p className="mt-1 font-serif text-2xl">{metric.value}</p>
              <p className="mt-2 text-sm text-seis-muted">{metric.detail}</p>
            </li>
          ))}
        </ul>

        <ProjectEstimator locale={locale} />

        <p className="mt-10">
          <Link href={`/?lang=${locale}#contact`} className="text-xs uppercase tracking-[0.1em] text-seis-muted">
            {ui.backToHomepage}
          </Link>
        </p>
        <p className="mt-3">
          <Link href="/api/integrations" className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Integration readiness endpoint
          </Link>
        </p>
        <p className="mt-3">
          <Link href={`/studio?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Open studio readiness board
          </Link>
        </p>
        <p className="mt-3">
          <Link href="/api/estimate" className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Estimate endpoint (POST /api/estimate)
          </Link>
        </p>
        <p className="mt-3">
          <Link href={`/playbooks?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            AI + automation playbooks
          </Link>
        </p>
        <p className="mt-3">
          <Link href={`/control?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Control center
          </Link>
        </p>
        <p className="mt-3">
          <Link href={`/ops?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Operations console
          </Link>
        </p>
        <p className="mt-3">
          <Link href={`/governance?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Governance matrix
          </Link>
        </p>
      </section>
    </main>
  );
}
