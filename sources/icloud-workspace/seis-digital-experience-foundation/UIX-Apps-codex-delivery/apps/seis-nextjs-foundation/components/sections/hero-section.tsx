import { FadeIn } from "@/components/motion/fade-in";
import { HeroGlow } from "@/components/motion/hero-glow";
import { HeroAtmosphere } from "@/components/three/hero-atmosphere";
import { Button } from "@/components/ui/button";
import { HomeDictionary, Locale } from "@/lib/content";

type HeroSectionProps = {
  dict: HomeDictionary;
  locale: Locale;
};

export function HeroSection({ dict, locale }: HeroSectionProps) {
  return (
    <section id="home" className="mx-auto w-[min(1200px,calc(100vw-1.5rem))] py-10 sm:py-14">
      <FadeIn className="relative overflow-hidden rounded-xl border border-seis-line bg-seis-surface/90 p-6 shadow-cinematic glass-panel sm:p-10">
        <HeroGlow />
        <HeroAtmosphere />

        <div className="relative z-10 max-w-3xl flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-seis-line bg-seis-card px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-seis-accent">
            Hybrid Dual · Parallel Phase
          </span>
          <span className="rounded-full border border-seis-line bg-seis-bg px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-seis-muted">
            Cinematic-Lite Motion Budget
          </span>
        </div>

        <p className="relative z-10 mt-4 text-xs uppercase tracking-[0.16em] text-seis-accent">{dict.eyebrow}</p>
        <h1 className="relative z-10 mt-3 max-w-4xl font-serif text-3xl leading-tight sm:text-5xl">{dict.title}</h1>
        <p className="relative z-10 mt-4 max-w-2xl text-sm text-seis-muted sm:text-base">{dict.lead}</p>

        <div className="relative z-10 mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <a href="#works">{dict.ctaPrimary}</a>
          </Button>
          <Button asChild variant="ghost">
            <a href="#services">Open service systems</a>
          </Button>
          <Button asChild variant="ghost">
            <a href={`/case-studies?lang=${locale}`}>{dict.ctaSecondary}</a>
          </Button>
        </div>

        <div className="relative z-10 mt-6 grid gap-3 sm:grid-cols-3">
          <article className="rounded-lg border border-seis-line bg-seis-card/80 p-3">
            <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">Experience</p>
            <p className="mt-1 text-sm text-seis-muted">Premium cinematic UX with production-safe interaction depth.</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-card/80 p-3">
            <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">Scalability</p>
            <p className="mt-1 text-sm text-seis-muted">Modular sections, reusable tokens, and route-level expansion model.</p>
          </article>
          <article className="rounded-lg border border-seis-line bg-seis-card/80 p-3">
            <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">Reliability</p>
            <p className="mt-1 text-sm text-seis-muted">Governance gates, rollback-safe flow, and hybrid runtime fallback.</p>
          </article>
        </div>
      </FadeIn>
    </section>
  );
}
