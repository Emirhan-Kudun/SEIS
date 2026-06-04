import Link from "next/link";

import { locales, type Locale } from "@/lib/content";

type LanguageSwitchInlineProps = {
  locale: Locale;
};

export function LanguageSwitchInline({ locale }: LanguageSwitchInlineProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {locales.map((item) => (
        <Link
          key={item}
          href={`/interaction-lab?lang=${item}`}
          className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.08em] transition-colors ${item === locale ? "border-seis-accent text-seis-accent" : "border-seis-line text-seis-muted hover:border-seis-accent"}`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
