import type { Metadata } from "next";
import Link from "next/link";

import { WorksBrowser } from "@/components/pages/works-browser";
import { resolveLocale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getWorkItems } from "@/lib/creative-content";

export const metadata: Metadata = {
  title: "Works",
  description: "Selected cinematic portfolio projects across product, brand, motion, and AI-native systems.",
  alternates: {
    canonical: "/works"
  }
};

type WorksPageProps = {
  searchParams?: { lang?: string };
};

export default function WorksPage({ searchParams }: WorksPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const dict = getCreativeDictionary(locale);
  const works = getWorkItems(locale);

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1100px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">{dict.worksEyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{dict.worksTitle}</h1>
        <p className="mt-4 max-w-2xl text-sm text-seis-muted sm:text-base">{dict.worksLead}</p>
        <WorksBrowser locale={locale} works={works} />

        <p className="mt-8">
          <Link href={`/?lang=${locale}#works`} className="text-xs uppercase tracking-[0.1em] text-seis-muted">
            {dict.navWorks}
          </Link>
        </p>
      </section>
    </main>
  );
}
