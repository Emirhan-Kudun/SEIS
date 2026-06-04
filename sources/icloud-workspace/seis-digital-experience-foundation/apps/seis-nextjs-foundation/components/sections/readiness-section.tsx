import { ReadinessCheck } from "@/components/forms/readiness-check";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Locale } from "@/lib/content";

const sectionCopy: Record<Locale, { eyebrow: string; title: string; body: string; notes: string[] }> = {
  tr: {
    eyebrow: "Readiness check",
    title: "Lansman hazirligini hafif bir backend ile olc.",
    body: "Icerik, tasarim, entegrasyon ve zamanlama sinyallerini sakince puanlar; sonuc JSONL runtime'a kaydedilir.",
    notes: ["Servissiz store", "Anlik skor", "Admin review"]
  },
  en: {
    eyebrow: "Readiness check",
    title: "Measure launch readiness with a light backend.",
    body: "Scores content, design, integration, and timing signals calmly; the result is stored in the JSONL runtime.",
    notes: ["Service-free store", "Instant score", "Admin review"]
  },
  fr: {
    eyebrow: "Readiness check",
    title: "Mesurer la preparation avec un backend leger.",
    body: "Evalue contenu, design, integrations et calendrier, puis stocke le resultat dans le runtime JSONL.",
    notes: ["Store sans service", "Score instantane", "Revue admin"]
  },
  it: {
    eyebrow: "Readiness check",
    title: "Misura la readiness con un backend leggero.",
    body: "Valuta contenuto, design, integrazioni e tempi, poi salva il risultato nel runtime JSONL.",
    notes: ["Store senza servizio", "Score immediato", "Review admin"]
  },
  de: {
    eyebrow: "Readiness check",
    title: "Launch-Bereitschaft mit leichtem Backend messen.",
    body: "Bewertet Inhalt, Design, Integrationen und Timing und speichert das Ergebnis im JSONL-Runtime.",
    notes: ["Servicefreier Store", "Sofort-Score", "Admin Review"]
  }
};

export function ReadinessSection({ locale }: { locale: Locale }) {
  const copy = sectionCopy[locale];

  return (
    <section id="readiness" className="mx-auto w-[min(1160px,calc(100vw-1.5rem))] py-6 sm:py-8">
      <FadeIn className="grid gap-6 rounded-xl border border-seis-line bg-seis-card/70 p-6 sm:p-8" delay={0.2}>
        <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
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
          <ReadinessCheck locale={locale} />
        </div>
      </FadeIn>
    </section>
  );
}
