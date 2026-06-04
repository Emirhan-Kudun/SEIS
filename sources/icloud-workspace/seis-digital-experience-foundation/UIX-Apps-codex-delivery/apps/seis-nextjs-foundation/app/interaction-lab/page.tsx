import type { Metadata } from "next";

import { HoverPreviewPanel } from "@/components/features/hover/hover-preview-panel";
import { InteractionCta } from "@/components/features/interaction/interaction-cta";
import { InteractionMetrics } from "@/components/features/interaction/interaction-metrics";
import { InteractionNav } from "@/components/features/interaction/interaction-nav";
import { InteractionPrinciples } from "@/components/features/interaction/interaction-principles";
import { InteractionSummary } from "@/components/features/interaction/interaction-summary";
import { LanguageSwitchInline } from "@/components/features/interaction/language-switch-inline";
import { MotionPreviewPanel } from "@/components/features/motion/motion-preview-panel";
import { RouteShift } from "@/components/features/motion/route-shift";
import { StaggerReveal } from "@/components/features/motion/stagger-reveal";
import { resolveLocale } from "@/lib/content";
import { getInteractionLabContent } from "@/lib/interaction-lab-content";

export const metadata: Metadata = {
  title: "Interaction Lab",
  description: "Multilingual, hover, and animation interaction system lab for premium and performance-safe UI behavior.",
  alternates: { canonical: "/interaction-lab" }
};

type InteractionLabPageProps = {
  searchParams?: { lang?: string };
};

export default function InteractionLabPage({ searchParams }: InteractionLabPageProps) {
  const locale = resolveLocale(searchParams?.lang);
  const content = getInteractionLabContent(locale);

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1120px,calc(100vw-1.5rem))] py-12 sm:py-16">
        <RouteShift>
          <InteractionSummary dict={content.dictionary} />
        </RouteShift>

        <div className="mt-4">
          <LanguageSwitchInline locale={locale} />
        </div>

        <InteractionMetrics
          hoverPatterns={content.hoverPatterns.length}
          motionPatterns={content.motionPatterns.length}
          locales={5}
          principles={content.principles.length}
        />

        <div className="mt-4">
          <InteractionNav locale={locale} />
        </div>

        <StaggerReveal>
          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            <HoverPreviewPanel />
            <MotionPreviewPanel />
          </div>
        </StaggerReveal>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <InteractionPrinciples title={content.dictionary.principlesTitle} items={content.principles} />
          <InteractionCta
            locale={locale}
            title={content.dictionary.ctaTitle}
            lead={content.dictionary.ctaLead}
            primary={content.dictionary.ctaPrimary}
            secondary={content.dictionary.ctaSecondary}
          />
        </div>
      </section>
    </main>
  );
}
