import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getVisualResearchItems } from "@/lib/creative-content";

type VisualResearchSectionProps = {
  locale: Locale;
};

export function VisualResearchSection({ locale }: VisualResearchSectionProps) {
  const dict = getCreativeDictionary(locale);
  const items = getVisualResearchItems();

  return (
    <section id="research" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.11}>
        <SectionHeading eyebrow={dict.researchEyebrow} title={dict.researchTitle} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{item.source}</p>
              <h3 className="mt-2 font-serif text-2xl text-seis-text">{item.angle}</h3>
              <p className="mt-2 text-sm text-seis-muted">{item.translation}</p>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
