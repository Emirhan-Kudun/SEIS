import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getMotionShowcaseItems } from "@/lib/creative-content";

type MotionShowcaseSectionProps = {
  locale: Locale;
};

export function MotionShowcaseSection({ locale }: MotionShowcaseSectionProps) {
  const dict = getCreativeDictionary(locale);
  const items = getMotionShowcaseItems();

  return (
    <section id="motion-showcase" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.1}>
        <SectionHeading eyebrow={dict.motionEyebrow} title={dict.motionTitle} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="group rounded-lg border border-seis-line bg-seis-surface p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{item.technique}</p>
              <h3 className="mt-2 font-serif text-2xl text-seis-text group-hover:text-seis-accentSoft">{item.name}</h3>
              <p className="mt-2 text-sm text-seis-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
