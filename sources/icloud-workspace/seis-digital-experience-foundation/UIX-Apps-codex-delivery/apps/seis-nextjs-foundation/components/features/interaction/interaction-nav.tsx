import Link from "next/link";

import type { Locale } from "@/lib/content";

type InteractionNavProps = {
  locale: Locale;
};

export function InteractionNav({ locale }: InteractionNavProps) {
  return (
    <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      <Link href={`/localization-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-seis-surface px-3 py-2 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
        localization-lab
      </Link>
      <Link href={`/design-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-seis-surface px-3 py-2 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
        design-lab
      </Link>
      <Link href={`/performance-lab?lang=${locale}`} className="rounded-lg border border-seis-line bg-seis-surface px-3 py-2 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
        performance-lab
      </Link>
      <Link href={`/orchestration?lang=${locale}`} className="rounded-lg border border-seis-line bg-seis-surface px-3 py-2 text-xs uppercase tracking-[0.08em] text-seis-muted hover:border-seis-accent">
        orchestration
      </Link>
    </nav>
  );
}
