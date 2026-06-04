import type { Metadata } from "next";
import Link from "next/link";

import { portfolioCards, resolveLocale } from "@/lib/content";
import { getUiDictionary } from "@/lib/site-i18n";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "SEIS premium portfolio modules with reusable storytelling and responsive system blocks.",
  alternates: {
    canonical: "/portfolio"
  }
};

type PortfolioPageProps = {
  searchParams?: { lang?: string };
};

export default function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const ui = getUiDictionary(locale);

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1100px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">{ui.portfolioEyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{ui.portfolioTitle}</h1>
        <p className="mt-4 max-w-2xl text-sm text-seis-muted sm:text-base">{ui.portfolioLead}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioCards.map((card) => (
            <article key={card.id} className="rounded-xl border border-seis-line bg-seis-surface p-4">
              <p className="text-[11px] uppercase tracking-[0.1em] text-seis-accent">{card.tag}</p>
              <h2 className="mt-2 font-serif text-2xl">{card.title}</h2>
              <p className="mt-2 text-sm text-seis-muted">{card.copy}</p>
            </article>
          ))}
        </div>

        <p className="mt-8">
          <Link href={`/?lang=${locale}#portfolio`} className="text-xs uppercase tracking-[0.1em] text-seis-muted">
            {ui.backToHomepage}
          </Link>
        </p>
      </section>
    </main>
  );
}
