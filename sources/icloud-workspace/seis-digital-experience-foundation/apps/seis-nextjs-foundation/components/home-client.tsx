"use client";

import { useEffect, useMemo, useState } from "react";

import { MainNav } from "@/components/navigation/main-nav";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SelectedWorksSection } from "@/components/sections/selected-works-section";
import { MotionShowcaseSection } from "@/components/sections/motion-showcase-section";
import { VisualResearchSection } from "@/components/sections/visual-research-section";
import { ExperimentsSection } from "@/components/sections/experiments-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { CloudHandoffCommandSection } from "@/components/sections/cloud-handoff-command-section";
import { ToolsStackSection } from "@/components/sections/tools-stack-section";
import { FullStackRuntimeSection } from "@/components/sections/fullstack-runtime-section";
import { ProjectBriefSection } from "@/components/sections/project-brief-section";
import { ReadinessSection } from "@/components/sections/readiness-section";
import { ScopePlanSection } from "@/components/sections/scope-plan-section";
import { ContactSection } from "@/components/sections/contact-section";
import { SocialLinksSection } from "@/components/sections/social-links-section";
import { WebsiteJsonLd } from "@/components/seo/website-jsonld";
import { HomeDictionary, homeDictionaries, Locale, resolveLocale } from "@/lib/content";

type HomeClientProps = {
  initialLocale?: Locale;
};

export function HomeClient({ initialLocale = "tr" }: HomeClientProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("seis-locale") : null;
    if (stored) {
      setLocale(resolveLocale(stored));
      return;
    }

    if (typeof navigator !== "undefined") {
      setLocale(resolveLocale(navigator.language.slice(0, 2).toLowerCase()));
    }
  }, [initialLocale]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("seis-locale", locale);
      document.documentElement.lang = locale;
      const url = new URL(window.location.href);
      url.searchParams.set("lang", locale);
      window.history.replaceState({}, "", url.toString());
    }
  }, [locale]);

  const dict = useMemo<HomeDictionary>(() => homeDictionaries[locale], [locale]);

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:border focus:border-seis-line focus:bg-seis-surface focus:px-3 focus:py-2 focus:text-seis-text"
      >
        Skip to content
      </a>
      <MainNav locale={locale} onLocaleChange={setLocale} dict={dict} />
      <HeroSection dict={dict} locale={locale} />
      <AboutSection locale={locale} />
      <SelectedWorksSection locale={locale} />
      <MotionShowcaseSection locale={locale} />
      <ExperimentsSection locale={locale} />
      <VisualResearchSection locale={locale} />
      <ServicesSection locale={locale} />
      <ExperienceSection locale={locale} />
      <CloudHandoffCommandSection locale={locale} />
      <ToolsStackSection locale={locale} />
      <FullStackRuntimeSection />
      <ProjectBriefSection locale={locale} />
      <ReadinessSection locale={locale} />
      <ScopePlanSection locale={locale} />
      <ContactSection dict={dict} locale={locale} />
      <SocialLinksSection locale={locale} />
      <WebsiteJsonLd locale={locale} />
    </>
  );
}
