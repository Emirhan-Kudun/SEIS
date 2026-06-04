import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { HomeDictionary, systemPillars } from "@/lib/content";

type SystemsSectionProps = {
  dict: HomeDictionary;
};

export function SystemsSection({ dict }: SystemsSectionProps) {
  return (
    <section id="systems" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.12}>
        <SectionHeading eyebrow={dict.sectionSystems} title="Design, engineering, motion, and governance running as one operating model." />
        <ul className="mt-4 grid gap-3 text-sm text-seis-muted sm:grid-cols-2 lg:grid-cols-3">
          {systemPillars.map((item) => (
            <li key={item.id} className="rounded-lg border border-seis-line bg-seis-surface p-3">
              <h3 className="font-serif text-2xl text-seis-text">{item.label}</h3>
              <p className="mt-2">{item.detail}</p>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
