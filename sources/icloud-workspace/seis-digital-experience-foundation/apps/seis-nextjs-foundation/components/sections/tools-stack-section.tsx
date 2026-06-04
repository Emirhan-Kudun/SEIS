import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";
import { getCreativeDictionary } from "@/lib/creative-i18n";
import { getToolGroups } from "@/lib/creative-content";

type ToolsStackSectionProps = {
  locale: Locale;
};

export function ToolsStackSection({ locale }: ToolsStackSectionProps) {
  const dict = getCreativeDictionary(locale);
  const groups = getToolGroups();

  return (
    <section id="tools" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="rounded-xl border border-seis-line bg-seis-card p-6 sm:p-8" delay={0.2}>
        <SectionHeading eyebrow={dict.toolsEyebrow} title={dict.toolsTitle} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {groups.map((group) => (
            <article key={group.id} className="rounded-lg border border-seis-line bg-seis-surface p-4">
              <h3 className="font-serif text-2xl text-seis-text">{group.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-seis-line bg-[#1a1510] px-3 py-1 text-xs text-seis-muted">
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
