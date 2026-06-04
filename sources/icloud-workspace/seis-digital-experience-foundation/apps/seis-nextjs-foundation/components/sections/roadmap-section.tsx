import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";
import { getRoadmapPhases, getUiDictionary } from "@/lib/site-i18n";

type RoadmapSectionProps = {
  locale: Locale;
};

export function RoadmapSection({ locale }: RoadmapSectionProps) {
  const ui = getUiDictionary(locale);
  const phases = getRoadmapPhases(locale);

  return (
    <section id="roadmap" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.17}>
        <SectionHeading eyebrow={ui.roadmapEyebrow} title={ui.roadmapTitle} />
        <ol className="mt-4 grid gap-3 lg:grid-cols-3">
          {phases.map((phase) => (
            <li key={phase.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
              <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">{phase.id.toUpperCase()}</p>
              <h3 className="mt-2 font-serif text-2xl text-seis-text">{phase.title}</h3>
              <p className="mt-2 text-sm text-seis-muted">{phase.summary}</p>
              <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
                {phase.milestones.map((milestone) => (
                  <li key={milestone} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                    {milestone}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </FadeIn>
    </section>
  );
}
