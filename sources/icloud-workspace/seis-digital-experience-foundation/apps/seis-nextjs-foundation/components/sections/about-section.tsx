import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";

type AboutSectionProps = {
  locale: Locale;
};

export function AboutSection({ locale }: AboutSectionProps) {
  const dict = getCreativeDictionary(locale);

  return (
    <section id="about" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.03}>
        <SectionHeading eyebrow={dict.aboutEyebrow} title={dict.aboutTitle} />
        <p className="mt-3 max-w-3xl text-sm text-seis-muted sm:text-base">{dict.aboutLead}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <article className="rounded-lg border border-seis-line bg-seis-surface p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">Design</p>
            <p className="mt-2 text-sm text-seis-muted">
              Editorial layout rhythm, premium spacing, and cinematic composition control.
            </p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">Engineering</p>
            <p className="mt-2 text-sm text-seis-muted">
              Modular architecture, predictable rendering, and rollback-safe delivery loops.
            </p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-surface p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">Product</p>
            <p className="mt-2 text-sm text-seis-muted">
              Conversion-aware storytelling that keeps accessibility and performance in balance.
            </p>
          </article>
        </div>
      </FadeIn>
    </section>
  );
}
