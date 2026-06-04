"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { HomeDictionary, Locale } from "@/lib/content";
import { CommandPalette } from "@/components/navigation/command-palette";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { LocaleSwitcher } from "@/components/navigation/locale-switcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type MainNavProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  dict: HomeDictionary;
};

export function MainNav({ locale, onLocaleChange, dict }: MainNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const creative = getCreativeDictionary(locale);

  const links = useMemo(
    () => [
      { href: "#home", label: dict.navHome },
      { href: "#about", label: creative.navAbout },
      { href: "#works", label: creative.navWorks },
      { href: "#motion-showcase", label: creative.navMotion },
      { href: "#experiments", label: "Experiments" },
      { href: "#research", label: creative.navResearch },
      { href: "#services", label: "Services" },
      { href: "#experience", label: creative.navExperience },
      { href: "#cloud-readiness", label: "Cloud Deck" },
      { href: "#tools", label: creative.navTools },
      { href: "#contact", label: dict.navContact }
    ],
    [creative.navAbout, creative.navExperience, creative.navMotion, creative.navResearch, creative.navTools, creative.navWorks, dict.navContact, dict.navHome]
  );

  useEffect(() => {
    function onEsc(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-seis-line/80 bg-seis-bg/75 glass-panel">
      <div className="mx-auto flex w-[min(1200px,calc(100vw-1.5rem))] items-center gap-3 py-3">
        <Link href="#home" className="mr-auto text-xs uppercase tracking-[0.16em] text-seis-muted hover:text-seis-accent">
          Emirhan Kudun · SEIS
        </Link>

        <button
          type="button"
          className="rounded-md border border-seis-line px-3 py-1 text-xs uppercase tracking-[0.1em] text-seis-muted md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="primary-navigation"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          Menu
        </button>

        {mobileOpen ? (
          <button
            type="button"
            aria-hidden="true"
            className="fixed inset-0 z-10 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}

        <nav
          id="primary-navigation"
          className={`${mobileOpen ? "flex" : "hidden"} absolute left-3 right-3 top-14 z-20 flex-col gap-2 rounded-xl border border-seis-line bg-seis-surface p-3 md:static md:z-auto md:flex md:flex-row md:flex-wrap md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0`}
          aria-label="Primary"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              className="rounded-full px-3 py-2 text-xs uppercase tracking-[0.1em] text-seis-muted hover:bg-seis-card hover:text-seis-accent"
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/works?lang=${locale}`}
            onClick={() => setMobileOpen(false)}
            className="rounded-full px-3 py-2 text-xs uppercase tracking-[0.1em] text-seis-muted hover:bg-seis-card hover:text-seis-accent"
          >
            Works Index
          </Link>
          <Link
            href={`/studio?lang=${locale}`}
            onClick={() => setMobileOpen(false)}
            className="rounded-full border border-seis-line px-3 py-2 text-xs uppercase tracking-[0.1em] text-seis-accent hover:border-seis-accent"
          >
            Ecosystem
          </Link>

          <LocaleSwitcher locale={locale} onChange={onLocaleChange} className="mt-1 flex flex-wrap gap-1 md:hidden" />
          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <div className="md:hidden">
            <CommandPalette locale={locale} />
          </div>
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <CommandPalette locale={locale} />
          <LocaleSwitcher locale={locale} onChange={onLocaleChange} className="flex flex-wrap gap-1" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
