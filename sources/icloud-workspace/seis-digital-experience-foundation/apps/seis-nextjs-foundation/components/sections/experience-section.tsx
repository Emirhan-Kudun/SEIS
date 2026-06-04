import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getExperienceItems } from "@/lib/creative-content";

type ExperienceSectionProps = {
  locale: Locale;
};

export function ExperienceSection({ locale }: ExperienceSectionProps) {
  const dict = getCreativeDictionary(locale);
  const items = getExperienceItems();

  return (
    <section id="experience" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.13}>
        <SectionHeading eyebrow={dict.experienceEyebrow} title={dict.experienceTitle} />
        <ol className="mt-4 grid gap-3">
          {items.map((item) => (
            <li key={item.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{item.period}</p>
              <h3 className="mt-2 font-serif text-2xl text-seis-text">{item.role}</h3>
              <p className="mt-2 text-sm text-seis-muted">{item.summary}</p>
            </li>
          ))}
        </ol>
      </FadeIn>
    </section>
  );
}
