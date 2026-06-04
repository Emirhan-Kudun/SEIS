import { Locale } from "@/lib/content";

type Localized<T> = Record<Locale, T>;

export type UiDictionary = {
  navServices: string;
  navWorkflow: string;
  caseIndexEyebrow: string;
  caseIndexTitle: string;
  caseIndexLead: string;
  openStudy: string;
  back: string;
  challenge: string;
  process: string;
  solution: string;
  outcome: string;
  relatedStudies: string;
  backToHomepage: string;
  portfolioEyebrow: string;
  portfolioTitle: string;
  portfolioLead: string;
  servicesTitle: string;
  servicesLead: string;
  workflowEyebrow: string;
  workflowTitle: string;
  roadmapEyebrow: string;
  roadmapTitle: string;
  faqEyebrow: string;
  faqTitle: string;
};

const uiDictionaries: Record<Locale, UiDictionary> = {
  tr: {
    navServices: "Servisler",
    navWorkflow: "Workflow",
    caseIndexEyebrow: "Case Study Index",
    caseIndexTitle: "Sinematik urun ve portfolio sonuclari.",
    caseIndexLead: "Challenge, process, solution, outcome akisi ile olceklenebilir anlatim sistemi.",
    openStudy: "Calismayi ac",
    back: "Geri",
    challenge: "Zorluk",
    process: "Surec",
    solution: "Cozum",
    outcome: "Sonuc",
    relatedStudies: "Ilgili Calismalar",
    backToHomepage: "Anasayfaya don",
    portfolioEyebrow: "Portfolio System",
    portfolioTitle: "Editorial genislemeye hazir premium moduller.",
    portfolioLead: "Yeniden kullanilabilir kartlar, anlati bloklari ve responsive modul haritasi.",
    servicesTitle: "SEIS sistem paketleri ile tasarimdan uretime hizli gecis.",
    servicesLead: "Roadmap, workflow ve kalite katmanini tek operasyonda birlestiren premium servis paketi.",
    workflowEyebrow: "Workflow Signals",
    workflowTitle: "Mimari kaliteyi hiz ve geri alinabilirlik ile dengeler.",
    roadmapEyebrow: "Delivery Roadmap",
    roadmapTitle: "Kontrollu, rollback-safe ve olceklenebilir teslimat fazlari.",
    faqEyebrow: "Build FAQ",
    faqTitle: "Projeye baslamadan once en kritik sorular."
  },
  en: {
    navServices: "Services",
    navWorkflow: "Workflow",
    caseIndexEyebrow: "Case Study Index",
    caseIndexTitle: "Cinematic product and portfolio outcomes.",
    caseIndexLead: "Structured by challenge, process, solution, and outcome for scalable storytelling.",
    openStudy: "Open study",
    back: "Back",
    challenge: "Challenge",
    process: "Process",
    solution: "Solution",
    outcome: "Outcome",
    relatedStudies: "Related Studies",
    backToHomepage: "Back to homepage",
    portfolioEyebrow: "Portfolio System",
    portfolioTitle: "Premium modules ready for editorial expansion.",
    portfolioLead: "Reusable cards, storytelling blocks, and responsive module mapping for future publishing.",
    servicesTitle: "SEIS service packs for a faster design-to-production path.",
    servicesLead: "A premium package that unifies roadmap, workflow, and quality gates in one operating model.",
    workflowEyebrow: "Workflow Signals",
    workflowTitle: "Balanced architecture quality with speed and rollback safety.",
    roadmapEyebrow: "Delivery Roadmap",
    roadmapTitle: "Controlled, rollback-safe, and scalable delivery phases.",
    faqEyebrow: "Build FAQ",
    faqTitle: "Critical questions before kickoff."
  },
  fr: {
    navServices: "Services",
    navWorkflow: "Workflow",
    caseIndexEyebrow: "Index Case Study",
    caseIndexTitle: "Resultats produit et portfolio cinematographiques.",
    caseIndexLead: "Structure challenge, process, solution, outcome pour un storytelling scalable.",
    openStudy: "Ouvrir l'etude",
    back: "Retour",
    challenge: "Defi",
    process: "Processus",
    solution: "Solution",
    outcome: "Resultat",
    relatedStudies: "Etudes liees",
    backToHomepage: "Retour accueil",
    portfolioEyebrow: "Systeme Portfolio",
    portfolioTitle: "Modules premium prets pour expansion editoriale.",
    portfolioLead: "Cartes reutilisables, blocs narratifs et mapping responsive pour publication future.",
    servicesTitle: "Packs SEIS pour accelerer le passage design vers production.",
    servicesLead: "Un package premium qui unifie roadmap, workflow et quality gates.",
    workflowEyebrow: "Workflow Signals",
    workflowTitle: "Qualite architecturale equilibree avec vitesse et rollback safety.",
    roadmapEyebrow: "Delivery Roadmap",
    roadmapTitle: "Phases de livraison controlees, scalables et rollback-safe.",
    faqEyebrow: "Build FAQ",
    faqTitle: "Questions critiques avant le lancement."
  },
  it: {
    navServices: "Servizi",
    navWorkflow: "Workflow",
    caseIndexEyebrow: "Indice Case Study",
    caseIndexTitle: "Risultati cinematici per prodotto e portfolio.",
    caseIndexLead: "Struttura challenge, process, solution, outcome per storytelling scalabile.",
    openStudy: "Apri case",
    back: "Indietro",
    challenge: "Sfida",
    process: "Processo",
    solution: "Soluzione",
    outcome: "Risultato",
    relatedStudies: "Studi correlati",
    backToHomepage: "Torna homepage",
    portfolioEyebrow: "Sistema Portfolio",
    portfolioTitle: "Moduli premium pronti per espansione editoriale.",
    portfolioLead: "Card riusabili, blocchi narrativi e mappa responsive per pubblicazione futura.",
    servicesTitle: "Pacchetti SEIS per accelerare da design a produzione.",
    servicesLead: "Un pacchetto premium che unisce roadmap, workflow e quality gates.",
    workflowEyebrow: "Workflow Signals",
    workflowTitle: "Qualita architetturale bilanciata con velocita e rollback safety.",
    roadmapEyebrow: "Delivery Roadmap",
    roadmapTitle: "Fasi di delivery controllate, scalabili e rollback-safe.",
    faqEyebrow: "Build FAQ",
    faqTitle: "Domande critiche prima del kickoff."
  },
  de: {
    navServices: "Services",
    navWorkflow: "Workflow",
    caseIndexEyebrow: "Case Study Index",
    caseIndexTitle: "Cinematic Ergebnisse fuer Produkt und Portfolio.",
    caseIndexLead: "Struktur mit Challenge, Process, Solution und Outcome fuer skalierbares Storytelling.",
    openStudy: "Study oeffnen",
    back: "Zurueck",
    challenge: "Challenge",
    process: "Process",
    solution: "Solution",
    outcome: "Outcome",
    relatedStudies: "Verwandte Studies",
    backToHomepage: "Zur Startseite",
    portfolioEyebrow: "Portfolio System",
    portfolioTitle: "Premium-Module bereit fuer editoriale Erweiterung.",
    portfolioLead: "Wiederverwendbare Cards, Story-Blocs und responsive Modul-Mapping.",
    servicesTitle: "SEIS Service Packs fuer schnelleren Design-to-Production Flow.",
    servicesLead: "Ein Premium-Paket, das Roadmap, Workflow und Quality Gates in einem Modell vereint.",
    workflowEyebrow: "Workflow Signals",
    workflowTitle: "Architekturqualitaet mit Geschwindigkeit und Rollback Safety im Gleichgewicht.",
    roadmapEyebrow: "Delivery Roadmap",
    roadmapTitle: "Kontrollierte, skalierbare und rollback-safe Delivery-Phasen.",
    faqEyebrow: "Build FAQ",
    faqTitle: "Kritische Fragen vor dem Kickoff."
  }
};

export function getUiDictionary(locale: Locale): UiDictionary {
  return uiDictionaries[locale];
}

export type WorkflowMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
};

const localizedWorkflowMetrics: Array<{
  id: string;
  label: Localized<string>;
  value: string;
  detail: Localized<string>;
}> = [
  {
    id: "ship-safety",
    label: {
      tr: "Ship Safety",
      en: "Ship Safety",
      fr: "Ship Safety",
      it: "Ship Safety",
      de: "Ship Safety"
    },
    value: "PR-first",
    detail: {
      tr: "Main disinda branch-safe akis ve rollback noktasi korunur.",
      en: "Branch-safe workflow outside main with protected rollback checkpoints.",
      fr: "Flux branch-safe hors main avec checkpoints rollback proteges.",
      it: "Workflow branch-safe fuori da main con checkpoint rollback protetti.",
      de: "Branch-safe Workflow ausserhalb von main mit geschuetzten Rollback-Punkten."
    }
  },
  {
    id: "runtime-budget",
    label: {
      tr: "Runtime Budget",
      en: "Runtime Budget",
      fr: "Runtime Budget",
      it: "Runtime Budget",
      de: "Runtime Budget"
    },
    value: "Lean JS",
    detail: {
      tr: "Aksesibiliteyi bozmadan motion performansi korunur.",
      en: "Motion performance stays lean without sacrificing accessibility.",
      fr: "Performance motion maintenue sans sacrifier l'accessibilite.",
      it: "Performance motion mantenuta senza sacrificare accessibilita.",
      de: "Motion-Performance bleibt schlank ohne Accessibility-Verlust."
    }
  },
  {
    id: "i18n-coverage",
    label: {
      tr: "I18n Coverage",
      en: "I18n Coverage",
      fr: "I18n Coverage",
      it: "I18n Coverage",
      de: "I18n Coverage"
    },
    value: "5 Locales",
    detail: {
      tr: "TR/EN/FR/IT/DE icerik katmani tek data modelden yonetilir.",
      en: "TR/EN/FR/IT/DE content layer is managed through one data model.",
      fr: "La couche TR/EN/FR/IT/DE est geree via un modele de donnees unique.",
      it: "Il layer TR/EN/FR/IT/DE e gestito da un unico modello dati.",
      de: "TR/EN/FR/IT/DE werden ueber ein einziges Datenmodell gepflegt."
    }
  },
  {
    id: "quality-gates",
    label: {
      tr: "Quality Gates",
      en: "Quality Gates",
      fr: "Quality Gates",
      it: "Quality Gates",
      de: "Quality Gates"
    },
    value: "A11y + SEO",
    detail: {
      tr: "Aksesibilite, metadata, responsive ve semantic duzen tek kalite katmaninda.",
      en: "Accessibility, metadata, responsiveness, and semantics are enforced together.",
      fr: "Accessibilite, metadata, responsive et semantique sont verifies ensemble.",
      it: "Accessibilita, metadata, responsive e semantica sono controllate insieme.",
      de: "Accessibility, Metadata, Responsive und Semantik werden gemeinsam abgesichert."
    }
  }
];

export function getWorkflowMetrics(locale: Locale): WorkflowMetric[] {
  return localizedWorkflowMetrics.map((item) => ({
    id: item.id,
    label: item.label[locale],
    value: item.value,
    detail: item.detail[locale]
  }));
}

export type RoadmapPhase = {
  id: string;
  title: string;
  summary: string;
  milestones: string[];
};

const localizedRoadmapPhases: Array<{
  id: string;
  title: Localized<string>;
  summary: Localized<string>;
  milestones: Localized<string[]>;
}> = [
  {
    id: "phase-1",
    title: {
      tr: "Foundation",
      en: "Foundation",
      fr: "Foundation",
      it: "Foundation",
      de: "Foundation"
    },
    summary: {
      tr: "Design token, navigation, metadata ve i18n tabani kurulur.",
      en: "Design tokens, navigation, metadata, and i18n baseline are established.",
      fr: "Les tokens design, navigation, metadata et baseline i18n sont etablis.",
      it: "Token design, navigation, metadata e baseline i18n vengono definiti.",
      de: "Design-Tokens, Navigation, Metadata und i18n-Basis werden aufgebaut."
    },
    milestones: {
      tr: ["App Router setup", "Tokenized UI", "SEO baseline"],
      en: ["App Router setup", "Tokenized UI", "SEO baseline"],
      fr: ["App Router setup", "Tokenized UI", "SEO baseline"],
      it: ["App Router setup", "Tokenized UI", "SEO baseline"],
      de: ["App Router setup", "Tokenized UI", "SEO baseline"]
    }
  },
  {
    id: "phase-2",
    title: {
      tr: "Expansion",
      en: "Expansion",
      fr: "Expansion",
      it: "Expansion",
      de: "Expansion"
    },
    summary: {
      tr: "Portfolio/case systems ve cinematic motion olceklenir.",
      en: "Portfolio/case systems and cinematic motion are expanded.",
      fr: "Les systemes portfolio/case et la motion cinematique sont etendus.",
      it: "Portfolio/case systems e motion cinematica vengono ampliati.",
      de: "Portfolio/Case-Systeme und cinematic Motion werden ausgebaut."
    },
    milestones: {
      tr: ["Dynamic case routes", "Workflow sections", "Reusable data layer"],
      en: ["Dynamic case routes", "Workflow sections", "Reusable data layer"],
      fr: ["Dynamic case routes", "Workflow sections", "Reusable data layer"],
      it: ["Dynamic case routes", "Workflow sections", "Reusable data layer"],
      de: ["Dynamic case routes", "Workflow sections", "Reusable data layer"]
    }
  },
  {
    id: "phase-3",
    title: {
      tr: "Production Hardening",
      en: "Production Hardening",
      fr: "Production Hardening",
      it: "Production Hardening",
      de: "Production Hardening"
    },
    summary: {
      tr: "Observability, QA, deployment guardrails ve rollback runbook sertlestirilir.",
      en: "Observability, QA, deployment guardrails, and rollback runbooks are hardened.",
      fr: "Observabilite, QA, guardrails deployment et rollback runbook sont renforces.",
      it: "Observability, QA, guardrail deployment e rollback runbook vengono rafforzati.",
      de: "Observability, QA, Deployment-Guardrails und Rollback-Runbooks werden gehaertet."
    },
    milestones: {
      tr: ["Sentry + analytics", "Release checklists", "Controlled cutover"],
      en: ["Sentry + analytics", "Release checklists", "Controlled cutover"],
      fr: ["Sentry + analytics", "Release checklists", "Controlled cutover"],
      it: ["Sentry + analytics", "Release checklists", "Controlled cutover"],
      de: ["Sentry + analytics", "Release checklists", "Controlled cutover"]
    }
  }
];

export function getRoadmapPhases(locale: Locale): RoadmapPhase[] {
  return localizedRoadmapPhases.map((item) => ({
    id: item.id,
    title: item.title[locale],
    summary: item.summary[locale],
    milestones: item.milestones[locale]
  }));
}

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const localizedFaqItems: Array<{
  id: string;
  question: Localized<string>;
  answer: Localized<string>;
}> = [
  {
    id: "timeline",
    question: {
      tr: "Ne kadar surede production-ready hale gelir?",
      en: "How quickly can this become production-ready?",
      fr: "En combien de temps cela devient-il production-ready?",
      it: "Quanto velocemente puo diventare production-ready?",
      de: "Wie schnell wird das production-ready?"
    },
    answer: {
      tr: "Scope'a gore 2-6 hafta arasi asamali teslimat yapisi uygulanir.",
      en: "A phased delivery model typically runs between 2-6 weeks depending on scope.",
      fr: "Un modele de livraison par phases prend generalement 2-6 semaines selon le scope.",
      it: "Un modello di delivery a fasi richiede in genere 2-6 settimane in base allo scope.",
      de: "Ein phasenbasiertes Delivery-Modell dauert je nach Scope meist 2-6 Wochen."
    }
  },
  {
    id: "migration",
    question: {
      tr: "Mevcut static yapi bozulmadan migration mumkun mu?",
      en: "Can we migrate without breaking the current static baseline?",
      fr: "Peut-on migrer sans casser la base statique actuelle?",
      it: "Possiamo migrare senza rompere la base statica attuale?",
      de: "Koennen wir migrieren ohne die aktuelle statische Basis zu brechen?"
    },
    answer: {
      tr: "Evet. Parallel branch stratejisiyle kademeli cutover uygulanir.",
      en: "Yes. We use a parallel branch strategy with controlled cutover.",
      fr: "Oui. Strategie de branche parallele avec cutover controle.",
      it: "Si. Strategia branch parallela con cutover controllato.",
      de: "Ja. Mit paralleler Branch-Strategie und kontrolliertem Cutover."
    }
  },
  {
    id: "team-fit",
    question: {
      tr: "Kucuk ekipler icin uygun mu?",
      en: "Is this suitable for small teams?",
      fr: "Est-ce adapte aux petites equipes?",
      it: "E adatto a team piccoli?",
      de: "Ist das fuer kleine Teams geeignet?"
    },
    answer: {
      tr: "Evet. Moduler paketleme sayesinde startup hizinda ilerlerken kalite korunur.",
      en: "Yes. Modular packaging keeps startup speed while preserving quality.",
      fr: "Oui. Le packaging modulaire preserve la qualite tout en gardant la vitesse startup.",
      it: "Si. Il packaging modulare mantiene velocita startup e qualita.",
      de: "Ja. Modulares Packaging ermoeglicht Startup-Tempo bei stabiler Qualitaet."
    }
  }
];

export function getFaqItems(locale: Locale): FaqItem[] {
  return localizedFaqItems.map((item) => ({
    id: item.id,
    question: item.question[locale],
    answer: item.answer[locale]
  }));
}
