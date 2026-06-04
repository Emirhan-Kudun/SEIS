import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";
import { getCloudSummary } from "@/lib/cloud-command";
import { getCloudCostSummary } from "@/lib/cloud-cost-command";
import { getHandoffSummary } from "@/lib/handoff-command";
import { getSkillsSummary } from "@/lib/skills-command";
import { getCloudSecuritySummary } from "@/lib/cloud-security-command";
import { getCloudDeployPipelineSummary } from "@/lib/cloud-deploy-pipeline-command";
import { getCloudObservabilityPlusSummary } from "@/lib/cloud-observability-plus-command";
import { getCloudHandoffCards, getCloudHandoffDictionary } from "@/lib/cloud-handoff-content";

type CloudHandoffCommandSectionProps = {
  locale: Locale;
};

export function CloudHandoffCommandSection({ locale }: CloudHandoffCommandSectionProps) {
  const dict = getCloudHandoffDictionary(locale);
  const cards = getCloudHandoffCards(locale);

  const cardSummaries = {
    cloud: getCloudSummary(),
    cloudcost: getCloudCostSummary(),
    handoff: getHandoffSummary(),
    skills: getSkillsSummary(),
    cloudsecurity: getCloudSecuritySummary(),
    clouddeploy: getCloudDeployPipelineSummary(),
    cloudobservabilityplus: getCloudObservabilityPlusSummary()
  };

  return (
    <section id="cloud-readiness" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.12}>
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
        <p className="mt-3 max-w-3xl text-sm text-seis-muted">{dict.lead}</p>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1.35fr_1fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {cards.map((card) => {
              const summary = cardSummaries[card.id];
              const totalTasks = summary.activeTasks + summary.plannedTasks;

              return (
                <article key={card.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
                  <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">{card.label}</p>
                  <p className="mt-2 font-serif text-3xl">{summary.totalSignals}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-seis-muted">{dict.coverageLabel}</p>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-seis-muted">
                    <div className="rounded border border-seis-line bg-[#1a1510] px-2 py-2 text-center">
                      <p className="font-serif text-xl text-seis-text">{summary.healthySignals}</p>
                      <p>{dict.healthyLabel}</p>
                    </div>
                    <div className="rounded border border-seis-line bg-[#1a1510] px-2 py-2 text-center">
                      <p className="font-serif text-xl text-seis-text">{summary.watchSignals}</p>
                      <p>{dict.watchLabel}</p>
                    </div>
                    <div className="rounded border border-seis-line bg-[#1a1510] px-2 py-2 text-center">
                      <p className="font-serif text-xl text-seis-text">{summary.criticalSignals}</p>
                      <p>{dict.criticalLabel}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs uppercase tracking-[0.08em] text-seis-muted">
                    {dict.tasksLabel}: {totalTasks}
                  </p>
                  <Link
                    href={`${card.href}?lang=${locale}`}
                    className="mt-3 inline-flex text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent"
                  >
                    {dict.openLabLabel}
                  </Link>
                </article>
              );
            })}
          </div>

          <article className="rounded-lg border border-seis-line bg-seis-surface p-4">
            <h3 className="font-serif text-2xl text-seis-text">{dict.principlesTitle}</h3>
            <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
              {dict.principles.map((item, index) => (
                <li key={`${item}-${index}`} className="rounded border border-seis-line bg-[#1a1510] px-3 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </FadeIn>
    </section>
  );
}
