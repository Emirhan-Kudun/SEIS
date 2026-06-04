import { ProjectBriefIntake } from "@/components/forms/project-brief-intake";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";

const sectionCopy: Record<Locale, { eyebrow: string; title: string; body: string; notes: string[] }> = {
  tr: {
    eyebrow: "Project brief",
    title: "Sakin ve net bir baslangic icin kisa brief.",
    body: "Kapsami, zamani ve hedefi tek yerde toplayarak ilk gorusmeyi daha odakli hale getirir.",
    notes: ["Net kapsam", "Hafif operasyon", "Token korumali inceleme"]
  },
  en: {
    eyebrow: "Project brief",
    title: "A focused brief for a calmer first step.",
    body: "Share scope, timing, and goals in one place so the first conversation can stay concrete.",
    notes: ["Clear scope", "Light operation", "Token-protected review"]
  },
  fr: {
    eyebrow: "Brief projet",
    title: "Un brief cible pour un premier pas plus calme.",
    body: "Rassemblez le perimetre, le rythme et les objectifs pour garder le premier echange concret.",
    notes: ["Perimetre clair", "Operation legere", "Revue protegee"]
  },
  it: {
    eyebrow: "Brief progetto",
    title: "Un brief mirato per un primo passo piu calmo.",
    body: "Raccoglie ambito, tempi e obiettivi per rendere il primo confronto piu concreto.",
    notes: ["Ambito chiaro", "Operativita leggera", "Revisione protetta"]
  },
  de: {
    eyebrow: "Projektbrief",
    title: "Ein fokussierter Brief fur einen ruhigeren Start.",
    body: "Umfang, Timing und Ziele bleiben an einem Ort, damit das erste Gesprach konkret bleibt.",
    notes: ["Klarer Umfang", "Leichter Betrieb", "Geschutzte Prufung"]
  }
};

export function ProjectBriefSection({ locale }: { locale: Locale }) {
  const copy = sectionCopy[locale];

  return (
    <section id="brief" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="grid gap-6 border-y border-seis-line py-6 sm:py-8" delay={0.18}>
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="max-w-xl">
            <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
            <p className="mt-3 text-sm leading-6 text-seis-muted">{copy.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2 text-xs text-seis-muted">
              {copy.notes.map((note) => (
                <li key={note} className="rounded-lg border border-seis-line px-3 py-2">
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <ProjectBriefIntake locale={locale} />
        </div>
      </FadeIn>
    </section>
  );
}
