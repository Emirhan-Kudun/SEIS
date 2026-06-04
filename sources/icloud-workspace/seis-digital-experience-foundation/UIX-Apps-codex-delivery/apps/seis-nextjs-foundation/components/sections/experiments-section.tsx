import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getCreativeExperiments } from "@/lib/creative-content";

type ExperimentsSectionProps = {
  locale: Locale;
};

const statusStyles: Record<string, string> = {
  active: "border-emerald-600/40 bg-emerald-500/10 text-emerald-200",
  beta: "border-amber-600/40 bg-amber-500/10 text-amber-200",
  planned: "border-blue-600/40 bg-blue-500/10 text-blue-200"
};

export function ExperimentsSection({ locale }: ExperimentsSectionProps) {
  const dict = getCreativeDictionary(locale);
  const items = getCreativeExperiments();

  return (
    <section id="experiments" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.12}>
        <SectionHeading eyebrow={dict.experimentsEyebrow} title={dict.experimentsTitle} />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
              <p
                className={`inline-flex rounded-full border px-2 py-1 text-[11px] uppercase tracking-[0.1em] ${
                  statusStyles[item.status]
                }`}
              >
                {item.status}
              </p>
              <h3 className="mt-3 font-serif text-2xl text-seis-text">{item.name}</h3>
              <p className="mt-2 text-sm text-seis-muted">{item.summary}</p>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
