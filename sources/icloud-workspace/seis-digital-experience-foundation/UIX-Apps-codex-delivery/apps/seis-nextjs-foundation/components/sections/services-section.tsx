import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getServiceItems } from "@/lib/creative-content";

type ServicesSectionProps = {
  locale: Locale;
};

export function ServicesSection({ locale }: ServicesSectionProps) {
  const dict = getCreativeDictionary(locale);
  const services = getServiceItems();

  return (
    <section id="services" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.12}>
        <SectionHeading eyebrow="Services" title="Premium service systems for cinematic and scalable product outcomes." />
        <p className="mt-3 max-w-3xl text-sm text-seis-muted sm:text-base">
          {dict.worksLead}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
              <h3 className="font-serif text-2xl text-seis-text">{service.title}</h3>
              <p className="mt-2 text-sm text-seis-muted">{service.summary}</p>
              <ul className="mt-3 grid gap-2 text-xs text-seis-muted">
                {service.deliverables.map((item) => (
                  <li key={item} className="rounded border border-seis-line bg-seis-bg px-2 py-1">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-6">
          <Link href={`/services?lang=${locale}`} className="text-xs uppercase tracking-[0.1em] text-seis-accent hover:text-seis-accentSoft">
            Open full services roadmap
          </Link>
        </p>
      </FadeIn>
    </section>
  );
}
