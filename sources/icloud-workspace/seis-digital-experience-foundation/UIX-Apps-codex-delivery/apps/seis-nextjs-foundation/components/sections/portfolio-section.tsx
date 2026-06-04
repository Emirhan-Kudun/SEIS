import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { HomeDictionary, portfolioCards, Locale } from "@/lib/content";

type PortfolioSectionProps = {
  dict: HomeDictionary;
  locale: Locale;
};

export function PortfolioSection({ dict, locale }: PortfolioSectionProps) {
  return (
    <section id="portfolio" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.04}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionHeading eyebrow={dict.sectionPortfolio} title="Premium modules for homepage, product storytelling, and portfolio depth." />
          <Link href={`/portfolio?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Open portfolio index
          </Link>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {portfolioCards.map((card) => (
            <article key={card.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
              <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">{card.tag}</p>
              <h3 className="mt-2 font-serif text-2xl">{card.title}</h3>
              <p className="mt-2 text-sm text-seis-muted">{card.copy}</p>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
