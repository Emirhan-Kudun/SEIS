"use client";

import { Locale, locales } from "@/lib/content";

type LocaleSwitcherProps = {
  locale: Locale;
  onChange: (locale: Locale) => void;
  className?: string;
};

export function LocaleSwitcher({ locale, onChange, className }: LocaleSwitcherProps) {
  return (
    <div className={className} role="group" aria-label="Language switcher">
      {locales.map((langCode) => {
        const active = locale === langCode;
        return (
          <button
            key={langCode}
            type="button"
            onClick={() => onChange(langCode)}
            aria-pressed={active}
            aria-label={`Switch language to ${langCode.toUpperCase()}`}
            title={langCode.toUpperCase()}
            className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.1em] transition-colors ${
              active
                ? "border-seis-accent bg-seis-accent text-[#16110c]"
                : "border-seis-line text-seis-muted hover:border-seis-accent"
            }`}
          >
            {langCode}
          </button>
        );
      })}
    </div>
  );
}
