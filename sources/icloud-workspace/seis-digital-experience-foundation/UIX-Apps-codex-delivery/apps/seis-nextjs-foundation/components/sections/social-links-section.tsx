import { FadeIn } from "@/components/motion/fade-in";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getSocialItems } from "@/lib/creative-content";

type SocialLinksSectionProps = {
  locale: Locale;
};

export function SocialLinksSection({ locale }: SocialLinksSectionProps) {
  const dict = getCreativeDictionary(locale);
  const links = getSocialItems();

  return (
    <section id="social" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 pb-16 sm:py-8 sm:pb-20">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.22}>
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">{dict.socialEyebrow}</p>
        <h2 className="mt-2 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">{dict.socialTitle}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {links.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-seis-line px-3 py-2 text-xs uppercase tracking-[0.1em] text-seis-muted hover:border-seis-accent hover:text-seis-accent"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-seis-line bg-seis-surface p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">{dict.newsletterEyebrow}</p>
          <h3 className="mt-2 font-serif text-2xl">{dict.newsletterTitle}</h3>
          <p className="mt-2 text-sm text-seis-muted">{dict.newsletterLead}</p>
          <NewsletterForm locale={locale} />
        </div>
      </FadeIn>
    </section>
  );
}
