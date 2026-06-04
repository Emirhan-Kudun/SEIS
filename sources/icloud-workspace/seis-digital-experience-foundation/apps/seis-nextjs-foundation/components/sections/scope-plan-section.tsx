import { ScopePlanBuilder } from "@/components/forms/scope-plan-builder";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";

const sectionCopy: Record<Locale, { eyebrow: string; title: string; body: string; notes: string[] }> = {
  tr: {
    eyebrow: "Scope planner",
    title: "Kapsami buyutmeden once sakin bir plan uret.",
    body: "Hedef, odak alanlari ve bakim seviyesinden hafif bir release plani cikarir; sonuc JSONL runtime'a kaydedilir.",
    notes: ["Faz plani", "Yuksek verim", "Servissiz backend"]
  },
  en: {
    eyebrow: "Scope planner",
    title: "Generate a calm plan before the scope grows.",
    body: "Turns goals, focus areas, and maintenance level into a lightweight release plan stored in the JSONL runtime.",
    notes: ["Phase plan", "High efficiency", "Service-free backend"]
  },
  fr: {
    eyebrow: "Scope planner",
    title: "Generer un plan calme avant d'elargir le perimetre.",
    body: "Transforme objectifs, axes et maintenance en plan de release leger stocke dans le runtime JSONL.",
    notes: ["Plan par phases", "Haute efficacite", "Backend sans service"]
  },
  it: {
    eyebrow: "Scope planner",
    title: "Genera un piano calmo prima di ampliare lo scope.",
    body: "Trasforma obiettivi, focus e manutenzione in un piano release leggero salvato nel runtime JSONL.",
    notes: ["Piano a fasi", "Alta efficienza", "Backend senza servizio"]
  },
  de: {
    eyebrow: "Scope planner",
    title: "Ruhigen Plan erstellen, bevor der Umfang wachst.",
    body: "Macht aus Zielen, Fokus und Wartung einen leichten Release-Plan im JSONL-Runtime.",
    notes: ["Phasenplan", "Hohe Effizienz", "Servicefreies Backend"]
  }
};

export function ScopePlanSection({ locale }: { locale: Locale }) {
  const copy = sectionCopy[locale];

  return (
    <section id="scope-plan" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="grid gap-6 border-y border-seis-line py-6 sm:py-8" delay={0.22}>
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
          <ScopePlanBuilder locale={locale} />
        </div>
      </FadeIn>
    </section>
  );
}
