import Link from "next/link";

import type { Locale } from "@/lib/content";

type InteractionCtaProps = {
  locale: Locale;
  title: string;
  lead: string;
  primary: string;
  secondary: string;
};

export function InteractionCta({ locale, title, lead, primary, secondary }: InteractionCtaProps) {
  return (
    <section className="rounded-xl border border-seis-line bg-seis-surface p-4">
      <h2 className="font-serif text-3xl">{title}</h2>
      <p className="mt-2 text-sm text-seis-muted">{lead}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <Link href={`/orchestration?lang=${locale}`} className="rounded-lg border border-seis-accent bg-seis-accent px-3 py-2 text-xs uppercase tracking-[0.08em] text-[#16110c]">
          {primary}
        </Link>
        <Link href={`/control?lang=${locale}`} className="rounded-lg border border-seis-line px-3 py-2 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
          {secondary}
        </Link>
      </div>
    </section>
  );
}
