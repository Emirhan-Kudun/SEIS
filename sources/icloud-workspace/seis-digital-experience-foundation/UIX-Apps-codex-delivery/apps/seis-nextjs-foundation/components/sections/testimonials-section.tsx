import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { HomeDictionary, testimonials } from "@/lib/content";

type TestimonialsSectionProps = {
  dict: HomeDictionary;
};

export function TestimonialsSection({ dict }: TestimonialsSectionProps) {
  return (
    <section className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.14}>
        <SectionHeading eyebrow={dict.sectionTestimonials} title="Signals of trust from product and design stakeholders." />
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
              <p className="text-sm text-seis-muted">\"{item.quote}\"</p>
              <footer className="mt-3 text-xs uppercase tracking-[0.1em] text-seis-accent">
                {item.author} · {item.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
