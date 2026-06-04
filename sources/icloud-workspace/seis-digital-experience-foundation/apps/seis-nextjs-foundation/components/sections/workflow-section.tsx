import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";
import { getUiDictionary, getWorkflowMetrics } from "@/lib/site-i18n";

type WorkflowSectionProps = {
  locale: Locale;
};

export function WorkflowSection({ locale }: WorkflowSectionProps) {
  const ui = getUiDictionary(locale);
  const metrics = getWorkflowMetrics(locale);

  return (
    <section id="workflow" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.15}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionHeading eyebrow={ui.workflowEyebrow} title={ui.workflowTitle} />
          <Link
            href={`/services?lang=${locale}`}
            className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent"
          >
            {ui.navServices}
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
              <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">{metric.label}</p>
              <p className="mt-2 font-serif text-3xl">{metric.value}</p>
              <p className="mt-2 text-sm text-seis-muted">{metric.detail}</p>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
