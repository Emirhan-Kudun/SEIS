import type { Locale } from "@/lib/content";

export type InteractionDictionary = {
  eyebrow: string;
  title: string;
  lead: string;
  hoverTitle: string;
  motionTitle: string;
  i18nTitle: string;
  principlesTitle: string;
  ctaTitle: string;
  ctaLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const interactionDictionary: Record<Locale, InteractionDictionary> = {
  tr: {
    eyebrow: "SEIS Interaction Lab",
    title: "Yabanci dil, hover ve motion davranislarini tek premium interaction katmaninda yonet.",
    lead: "Bu lab, her dilde tutarli UX, premium hover feedback ve performans-guvenli motion davranislarini birlestirir.",
    hoverTitle: "Hover Architecture",
    motionTitle: "Motion Architecture",
    i18nTitle: "I18n Coverage",
    principlesTitle: "Interaction Principles",
    ctaTitle: "Bir sonraki adim",
    ctaLead: "Interaction paketini release-ready kalite kapisina bagla.",
    ctaPrimary: "Orchestration ac",
    ctaSecondary: "Control center ac"
  },
  en: {
    eyebrow: "SEIS Interaction Lab",
    title: "Unify multilingual UX, hover behavior, and motion systems in one premium interaction layer.",
    lead: "This lab keeps language parity, premium feedback loops, and performance-safe animation patterns aligned.",
    hoverTitle: "Hover Architecture",
    motionTitle: "Motion Architecture",
    i18nTitle: "I18n Coverage",
    principlesTitle: "Interaction Principles",
    ctaTitle: "Next step",
    ctaLead: "Connect interaction package to release-ready quality gates.",
    ctaPrimary: "Open orchestration",
    ctaSecondary: "Open control center"
  },
  fr: {
    eyebrow: "SEIS Interaction Lab",
    title: "Unifier UX multilingue, hover premium et motion dans une couche d'interaction unique.",
    lead: "Ce lab aligne parite linguistique, feedback premium et animations performantes.",
    hoverTitle: "Architecture Hover",
    motionTitle: "Architecture Motion",
    i18nTitle: "Couverture I18n",
    principlesTitle: "Principes Interaction",
    ctaTitle: "Etape suivante",
    ctaLead: "Relier ce pack interaction aux quality gates release-ready.",
    ctaPrimary: "Ouvrir orchestration",
    ctaSecondary: "Ouvrir control center"
  },
  it: {
    eyebrow: "SEIS Interaction Lab",
    title: "Unifica UX multilingua, hover premium e motion in un unico layer interaction.",
    lead: "Questo lab allinea parita linguistica, feedback premium e animazioni performance-safe.",
    hoverTitle: "Architettura Hover",
    motionTitle: "Architettura Motion",
    i18nTitle: "Copertura I18n",
    principlesTitle: "Principi Interaction",
    ctaTitle: "Prossimo passo",
    ctaLead: "Collega il pacchetto interaction ai quality gate release-ready.",
    ctaPrimary: "Apri orchestration",
    ctaSecondary: "Apri control center"
  },
  de: {
    eyebrow: "SEIS Interaction Lab",
    title: "Mehrsprachige UX, Hover-Feedback und Motion-Systeme in einer Premium-Interaction-Schicht vereinen.",
    lead: "Dieses Lab verbindet Sprachparitaet, hochwertiges Feedback und performante Animationen.",
    hoverTitle: "Hover Architektur",
    motionTitle: "Motion Architektur",
    i18nTitle: "I18n Abdeckung",
    principlesTitle: "Interaction Prinzipien",
    ctaTitle: "Naechster Schritt",
    ctaLead: "Das Interaction-Paket an release-ready Quality Gates anbinden.",
    ctaPrimary: "Orchestration oeffnen",
    ctaSecondary: "Control Center oeffnen"
  }
};
