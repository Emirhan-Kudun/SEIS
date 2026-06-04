import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";
import { getFaqItems, getUiDictionary } from "@/lib/site-i18n";

type FaqSectionProps = {
  locale: Locale;
};

export function FaqSection({ locale }: FaqSectionProps) {
  const ui = getUiDictionary(locale);
  const faqs = getFaqItems(locale);

  return (
    <section id="faq" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.19}>
        <SectionHeading eyebrow={ui.faqEyebrow} title={ui.faqTitle} />
        <div className="mt-4 grid gap-3">
          {faqs.map((item) => (
            <details key={item.id} className="group rounded-lg border border-seis-line bg-seis-surface p-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-seis-text outline-none">
                <span className="inline-flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-seis-accent" aria-hidden="true" />
                  {item.question}
                </span>
              </summary>
              <p className="mt-3 text-sm text-seis-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
