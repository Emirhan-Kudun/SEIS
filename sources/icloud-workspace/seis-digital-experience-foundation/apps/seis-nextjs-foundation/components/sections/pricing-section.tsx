import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { HomeDictionary, pricingTiers } from "@/lib/content";
import { getServiceItems } from "@/lib/creative-content";

type PricingSectionProps = {
  dict: HomeDictionary;
};

export function PricingSection({ dict }: PricingSectionProps) {
  const services = getServiceItems();

  return (
    <section className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.16}>
        <SectionHeading eyebrow={dict.sectionPricing} title="Offer structure designed for startup speed and premium execution quality." />
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <article key={tier.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{tier.name}</p>
              <p className="mt-1 font-serif text-3xl">{tier.price}</p>
              <p className="mt-2 text-sm text-seis-muted">{tier.summary}</p>
              <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
                {tier.bullets.map((bullet) => (
                  <li key={bullet} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-seis-accent">{service.title}</p>
              <p className="mt-2 text-sm text-seis-muted">{service.summary}</p>
              <ul className="mt-3 grid gap-2 text-sm text-seis-muted">
                {service.deliverables.map((item) => (
                  <li key={item} className="rounded border border-seis-line bg-[#1a1510] px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
