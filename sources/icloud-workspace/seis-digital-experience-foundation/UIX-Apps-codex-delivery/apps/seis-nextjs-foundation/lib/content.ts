export const locales = ["tr", "en", "fr", "it", "de"] as const;

export type Locale = (typeof locales)[number];

export type HomeDictionary = {
  navHome: string;
  navPortfolio: string;
  navCaseStudies: string;
  navSystems: string;
  navContact: string;
  eyebrow: string;
  title: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  sectionPortfolio: string;
  sectionCase: string;
  sectionSystems: string;
  sectionTestimonials: string;
  sectionPricing: string;
  sectionContact: string;
  contactTitle: string;
  contactCopy: string;
  contactCta: string;
};

export type PortfolioCard = {
  id: string;
  title: string;
  copy: string;
  tag: string;
};

export type SystemPillar = {
  id: string;
  label: string;
  detail: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
};

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  summary: string;
  bullets: string[];
};

export type CaseStudy = {
  slug: string;
  year: string;
  role: string;
  title: string;
  summary: string;
  challenge: string;
  process: string[];
  solution: string;
  outcome: string;
};

type Localized = Record<Locale, string>;

type LocalizedCaseStudy = {
  slug: string;
  year: string;
  role: string;
  title: Localized;
  summary: Localized;
  challenge: Localized;
  process: Record<Locale, string[]>;
  solution: Localized;
  outcome: Localized;
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : "tr";
}

export const homeDictionaries: Record<Locale, HomeDictionary> = {
  tr: {
    navHome: "Anasayfa",
    navPortfolio: "Portfolio",
    navCaseStudies: "Case Study",
    navSystems: "Sistem",
    navContact: "Iletisim",
    eyebrow: "SEIS Supreme Website OS Starter",
    title: "Cinematic homepage, premium navigation, SaaS-ready system.",
    lead: "Bu alan, SEIS referansina uygun premium, modern ve olceklenebilir website sisteminin ilk production-odakli katmanidir.",
    ctaPrimary: "Portfolio kesfini ac",
    ctaSecondary: "Case studies",
    sectionPortfolio: "Portfolio System",
    sectionCase: "Case Study System",
    sectionSystems: "SaaS + Design Systems",
    sectionTestimonials: "Proof Layer",
    sectionPricing: "Service Packs",
    sectionContact: "Build Request",
    contactTitle: "Markani premium dijital urune donusturelim.",
    contactCopy: "Bu Next.js katmani static sistemi bozmadan paralel ilerler; asamali cutover ile production guvencesi saglar.",
    contactCta: "Calisma baslat"
  },
  en: {
    navHome: "Home",
    navPortfolio: "Portfolio",
    navCaseStudies: "Case Studies",
    navSystems: "Systems",
    navContact: "Contact",
    eyebrow: "SEIS Supreme Website OS Starter",
    title: "Cinematic homepage, premium navigation, SaaS-ready system.",
    lead: "This layer is the first production-focused release of your SEIS prompt: premium, modern, scalable, and resilient.",
    ctaPrimary: "Explore portfolio",
    ctaSecondary: "Case studies",
    sectionPortfolio: "Portfolio System",
    sectionCase: "Case Study System",
    sectionSystems: "SaaS + Design Systems",
    sectionTestimonials: "Proof Layer",
    sectionPricing: "Service Packs",
    sectionContact: "Build Request",
    contactTitle: "Let us turn your brand into a premium digital product.",
    contactCopy: "This Next.js layer evolves in parallel without breaking the static baseline and stays ready for controlled cutover.",
    contactCta: "Start collaboration"
  },
  fr: {
    navHome: "Accueil",
    navPortfolio: "Portfolio",
    navCaseStudies: "Etudes",
    navSystems: "Systemes",
    navContact: "Contact",
    eyebrow: "SEIS Supreme Website OS Starter",
    title: "Homepage cinematique, navigation premium, systeme SaaS pret.",
    lead: "Premiere release orientee production de votre prompt SEIS: premium, moderne et evolutive.",
    ctaPrimary: "Explorer portfolio",
    ctaSecondary: "Etudes de cas",
    sectionPortfolio: "Systeme Portfolio",
    sectionCase: "Systeme Etude de Cas",
    sectionSystems: "SaaS + Design System",
    sectionTestimonials: "Preuve",
    sectionPricing: "Packs",
    sectionContact: "Demande de Build",
    contactTitle: "Transformons votre marque en produit digital premium.",
    contactCopy: "Cette base Next.js evolue en parallele sans casser la base statique et reste prete pour un cutover controle.",
    contactCta: "Demarrer"
  },
  it: {
    navHome: "Home",
    navPortfolio: "Portfolio",
    navCaseStudies: "Case Study",
    navSystems: "Sistemi",
    navContact: "Contatto",
    eyebrow: "SEIS Supreme Website OS Starter",
    title: "Homepage cinematica, navigazione premium, sistema SaaS-ready.",
    lead: "Primo rilascio orientato alla produzione dal tuo prompt SEIS: premium, moderno e scalabile.",
    ctaPrimary: "Esplora portfolio",
    ctaSecondary: "Case study",
    sectionPortfolio: "Sistema Portfolio",
    sectionCase: "Sistema Case Study",
    sectionSystems: "SaaS + Design System",
    sectionTestimonials: "Proof Layer",
    sectionPricing: "Service Packs",
    sectionContact: "Richiesta Build",
    contactTitle: "Trasformiamo il tuo brand in un prodotto digitale premium.",
    contactCopy: "Questa base Next.js evolve in parallelo senza rompere la base statica e resta pronta al cutover controllato.",
    contactCta: "Avvia collaborazione"
  },
  de: {
    navHome: "Start",
    navPortfolio: "Portfolio",
    navCaseStudies: "Case Studies",
    navSystems: "Systeme",
    navContact: "Kontakt",
    eyebrow: "SEIS Supreme Website OS Starter",
    title: "Cinematic Homepage, Premium Navigation, SaaS-ready System.",
    lead: "Erste production-orientierte Ausbaustufe deines SEIS-Prompts: premium, modern und skalierbar.",
    ctaPrimary: "Portfolio entdecken",
    ctaSecondary: "Case Studies",
    sectionPortfolio: "Portfolio System",
    sectionCase: "Case Study System",
    sectionSystems: "SaaS + Design Systems",
    sectionTestimonials: "Proof Layer",
    sectionPricing: "Service Packs",
    sectionContact: "Build Anfrage",
    contactTitle: "Wir machen aus deiner Marke ein premium digitales Produkt.",
    contactCopy: "Diese Next.js Ebene entwickelt sich parallel ohne die statische Basis zu brechen und bleibt fur kontrollierten Cutover bereit.",
    contactCta: "Zusammenarbeit starten"
  }
};

export const portfolioCards: PortfolioCard[] = [
  {
    id: "cinematic-landing",
    title: "Cinematic Landing",
    copy: "High-conversion hero architecture with calm premium pacing.",
    tag: "UI Direction"
  },
  {
    id: "saas-showcase",
    title: "SaaS Product Site",
    copy: "Modular component grid optimized for product storytelling.",
    tag: "Product"
  },
  {
    id: "brand-editorial",
    title: "Creative Portfolio",
    copy: "Editorial rhythm, whitespace discipline, and premium visuals.",
    tag: "Brand"
  }
];

export const systemPillars: SystemPillar[] = [
  {
    id: "core-architecture",
    label: "Next.js App Router + TypeScript",
    detail: "Type-safe page composition with predictable routing and rendering boundaries."
  },
  {
    id: "design-foundation",
    label: "Tailwind + Tokens",
    detail: "A reusable visual token surface tuned for premium dark layouts and spacing consistency."
  },
  {
    id: "component-primitives",
    label: "shadcn/Radix primitives",
    detail: "Accessible primitives ready to scale into a full design system component library."
  },
  {
    id: "motion-layer",
    label: "Framer Motion + GSAP",
    detail: "Cinematic motion with reduced-motion support and performance-conscious orchestration."
  },
  {
    id: "seo-baseline",
    label: "SEO + Metadata",
    detail: "Structured metadata and social preview readiness for deployment-phase alignment."
  },
  {
    id: "operations",
    label: "Governance + Runbook",
    detail: "Branch safety, quality gates, and rollback-aware workflow execution built into delivery."
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "studio-founder",
    quote: "SEIS transformed our fragmented pages into a focused premium narrative that felt instantly more valuable.",
    author: "A. Demir",
    role: "Studio Founder"
  },
  {
    id: "saas-operator",
    quote: "The new structure gave us clarity: design, product messaging, and engineering quality finally moved together.",
    author: "L. Weber",
    role: "SaaS Operator"
  },
  {
    id: "creative-director",
    quote: "The cinematic restraint and layout discipline made the interface feel high-end without visual noise.",
    author: "M. Laurent",
    role: "Creative Director"
  }
];

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$2.5k+",
    summary: "Premium one-page foundation for early stage launches.",
    bullets: [
      "Cinematic homepage",
      "Responsive navigation",
      "SEO baseline + social metadata"
    ]
  },
  {
    id: "growth",
    name: "Growth",
    price: "$6k+",
    summary: "Multi-section product site with case-study system and scalable content flow.",
    bullets: [
      "Portfolio and case pages",
      "Motion + interaction refinement",
      "Quality gate workflow"
    ]
  },
  {
    id: "supreme",
    name: "Supreme",
    price: "$12k+",
    summary: "Full SEIS website OS with migration roadmap, governance, and production hardening.",
    bullets: [
      "Design system expansion",
      "SaaS-ready architecture",
      "Phase-based cutover strategy"
    ]
  }
];

const localizedCaseStudies: LocalizedCaseStudy[] = [
  {
    slug: "luxury-retail-landing",
    year: "2026",
    role: "UI Direction + Frontend Architecture",
    title: {
      tr: "Luxury Retail Landing",
      en: "Luxury Retail Landing",
      fr: "Luxury Retail Landing",
      it: "Luxury Retail Landing",
      de: "Luxury Retail Landing"
    },
    summary: {
      tr: "Premium retail markasi icin hizli, duygusal ve donusum odakli landing sistemi.",
      en: "A premium retail landing system balancing emotional impact and conversion performance.",
      fr: "Landing premium retail equilibrant impact emotionnel et performance de conversion.",
      it: "Landing retail premium che bilancia impatto emotivo e conversione.",
      de: "Premium-Retail-Landing mit Balance aus emotionaler Wirkung und Conversion-Leistung."
    },
    challenge: {
      tr: "Yuksek estetik beklenti ile mobil hiz/perf gereksinimini ayni anda tutturmak.",
      en: "Aligning high-end visual expectations with strict mobile performance constraints.",
      fr: "Aligner exigence visuelle premium et contraintes fortes de performance mobile.",
      it: "Allineare aspettative visual premium con vincoli severi di performance mobile.",
      de: "Premium-Visualitaet mit strengen mobilen Performance-Vorgaben vereinen."
    },
    process: {
      tr: [
        "Hero mesajini 3 adimli hiyerarsiye indirdik.",
        "Tipografi + spacing sistemi tokenlara baglandi.",
        "Motion sadece kritik alanlarda tutuldu.",
        "Responsive grid mobil once dusunulerek kuruldu.",
        "LCP ve CLS riski olan alanlar sadeleştirildi."
      ],
      en: [
        "Reduced hero messaging into a 3-step hierarchy.",
        "Bound typography and spacing to tokenized decisions.",
        "Kept motion only in high-value interaction points.",
        "Built responsive grids mobile-first.",
        "Simplified LCP and CLS risk zones."
      ],
      fr: [
        "Hierarchie hero reduite en 3 etapes.",
        "Typographie et spacing relies aux tokens.",
        "Motion limitee aux interactions prioritaires.",
        "Grille responsive mobile-first.",
        "Zones de risque LCP/CLS simplifiees."
      ],
      it: [
        "Gerarchia hero ridotta a 3 livelli.",
        "Tipografia e spacing legati ai token.",
        "Motion limitata ai punti ad alto valore.",
        "Grid responsive mobile-first.",
        "Aree a rischio LCP/CLS semplificate."
      ],
      de: [
        "Hero-Hierarchie auf 3 Ebenen reduziert.",
        "Typografie und Spacing tokenisiert.",
        "Motion nur an wertvollen Interaktionspunkten.",
        "Responsive Grid mobile-first aufgebaut.",
        "LCP/CLS-Risikozonen vereinfacht."
      ]
    },
    solution: {
      tr: "Sinematik ama sade bir premium landing modeli ve yeniden kullanilabilir section sistemi.",
      en: "A cinematic yet restrained premium landing model with reusable sections.",
      fr: "Modele landing premium cinematique mais epure avec sections reutilisables.",
      it: "Modello landing premium cinematografico ma contenuto con sezioni riusabili.",
      de: "Cinematic aber reduziertes Premium-Landing-Modell mit wiederverwendbaren Sektionen."
    },
    outcome: {
      tr: "Ilk etkileşim kalitesi artarken render maliyeti kontrol altinda kaldi.",
      en: "Improved first-impression quality while keeping rendering cost controlled.",
      fr: "Qualite de premiere impression amelioree avec cout de rendu controle.",
      it: "Migliorata la prima impressione con costo di rendering controllato.",
      de: "Ersteindruck verbessert bei kontrollierten Rendering-Kosten."
    }
  },
  {
    slug: "saas-clarity-redesign",
    year: "2026",
    role: "Product UX + Information Architecture",
    title: {
      tr: "SaaS Clarity Redesign",
      en: "SaaS Clarity Redesign",
      fr: "SaaS Clarity Redesign",
      it: "SaaS Clarity Redesign",
      de: "SaaS Clarity Redesign"
    },
    summary: {
      tr: "Karmasik urun mesajini okunabilir bir onboarding + bilgi mimarisine ceviren redesign.",
      en: "A redesign that converted complex product messaging into a clear onboarding architecture.",
      fr: "Refonte transformant un message produit complexe en architecture d'onboarding lisible.",
      it: "Redesign che converte messaging complesso in onboarding chiaro.",
      de: "Redesign, das komplexes Produkt-Messaging in klare Onboarding-Architektur ueberfuehrt."
    },
    challenge: {
      tr: "Ozellik fazlaligini azaltmadan karar yorgunlugunu dusurmek.",
      en: "Reducing decision fatigue without hiding important capabilities.",
      fr: "Reduire la fatigue de decision sans masquer les capacites critiques.",
      it: "Ridurre la fatica decisionale senza nascondere le capacita principali.",
      de: "Entscheidungslast senken ohne wichtige Funktionen zu verstecken."
    },
    process: {
      tr: [
        "Bilgi mimarisi 3 ana akis etrafinda yeniden kurgulandi.",
        "CTA hiyerarsisi tek bir hedefe sabitlendi.",
        "Kart sistemleri birlesik komponent setine tasindi.",
        "Sosyal kanit ve guven katmani kritik noktalara yerlestirildi.",
        "Empty/loading/error state dili teklestirildi."
      ],
      en: [
        "Rebuilt IA around three primary user flows.",
        "Focused CTA hierarchy on one key conversion action.",
        "Moved card systems into a shared component model.",
        "Placed trust and social-proof layers at friction points.",
        "Unified empty/loading/error state messaging."
      ],
      fr: [
        "IA reconstruite autour de trois flux principaux.",
        "Hierarchie CTA concentree sur une action cle.",
        "Systemes de cartes unifies en composants partages.",
        "Preuves sociales placees aux points de friction.",
        "Messages empty/loading/error harmonises."
      ],
      it: [
        "IA ricostruita su tre flussi principali.",
        "Gerarchia CTA focalizzata su una conversione chiave.",
        "Card system unificato in componenti condivisi.",
        "Trust layer nei punti di attrito.",
        "Messaggi empty/loading/error unificati."
      ],
      de: [
        "IA rund um drei Haupt-Userflows neu aufgebaut.",
        "CTA-Hierarchie auf eine Kernaktion fokussiert.",
        "Kartensysteme in gemeinsames Komponentenmodell ueberfuehrt.",
        "Trust- und Social-Proof-Layer an Reibungspunkten platziert.",
        "Empty/Loading/Error-Messaging vereinheitlicht."
      ]
    },
    solution: {
      tr: "SaaS odakli moduler bilgi yapisi ve premium okunabilirlik.",
      en: "A SaaS-focused modular information system with premium readability.",
      fr: "Systeme d'information modulaire SaaS avec lisibilite premium.",
      it: "Sistema informativo modulare SaaS con leggibilita premium.",
      de: "SaaS-fokussiertes modulares Informationssystem mit Premium-Lesbarkeit."
    },
    outcome: {
      tr: "Kullanim yolu netlesti; onboarding ve karar hizi anlamli sekilde iyilesti.",
      en: "User journey clarity improved, with faster onboarding and better decision velocity.",
      fr: "Parcours utilisateur clarifie, onboarding plus rapide et meilleures decisions.",
      it: "Percorso utente piu chiaro con onboarding piu rapido.",
      de: "Klarerer User-Flow mit schnellerem Onboarding und besserer Entscheidungsrate."
    }
  },
  {
    slug: "brand-portfolio-system",
    year: "2026",
    role: "Visual Design + Motion Direction",
    title: {
      tr: "Brand Portfolio System",
      en: "Brand Portfolio System",
      fr: "Brand Portfolio System",
      it: "Brand Portfolio System",
      de: "Brand Portfolio System"
    },
    summary: {
      tr: "Marka anlatisini teknik sadelikten odun vermeden premium bir hikaye akisina tasiyan sistem.",
      en: "A system that elevates brand storytelling while preserving technical simplicity.",
      fr: "Systeme qui eleve le storytelling de marque sans sacrifier la simplicite technique.",
      it: "Sistema che alza lo storytelling del brand mantenendo semplicita tecnica.",
      de: "System, das Brand-Storytelling steigert und technische Einfachheit bewahrt."
    },
    challenge: {
      tr: "Gorsel zenginligi korurken kod ve bakim maliyetini stabil tutmak.",
      en: "Maintaining visual richness while keeping maintenance cost stable.",
      fr: "Conserver la richesse visuelle tout en stabilisant le cout de maintenance.",
      it: "Mantenere ricchezza visiva con costo manutenzione stabile.",
      de: "Visuelle Dichte erhalten und Wartungskosten stabil halten."
    },
    process: {
      tr: [
        "Moduler section katmani kuruldu.",
        "Motion dilinde restraint-first kurali uygulandi.",
        "Tipografi hiyerarsisi ekran boyutlarina gore yeniden ayarlandi.",
        "Case-study ve portfolio akislari ayrildi.",
        "Icerik ve komponent baglantisi veri katmanina tasindi."
      ],
      en: [
        "Established a modular section layer.",
        "Applied a restraint-first motion policy.",
        "Retuned typography hierarchy for multi-device readability.",
        "Separated case-study and portfolio flows.",
        "Moved content-to-component mapping into a data layer."
      ],
      fr: [
        "Mise en place d'une couche de sections modulaires.",
        "Politique motion orientee retenue appliquee.",
        "Hierarchie typo reajustee pour multi-ecrans.",
        "Flux case-study et portfolio separes.",
        "Mapping contenu-composant deplace vers la couche data."
      ],
      it: [
        "Creato layer modulare di sezioni.",
        "Applicata policy motion restraint-first.",
        "Gerarchia tipografica ricalibrata per multi-device.",
        "Separati flussi case-study e portfolio.",
        "Mappatura contenuti-componenti spostata nel data layer."
      ],
      de: [
        "Modulare Sektionsebene aufgebaut.",
        "Restraint-first Motion-Policy umgesetzt.",
        "Typografie-Hierarchie fuer Multi-Device neu abgestimmt.",
        "Case-Study- und Portfolio-Flows getrennt.",
        "Content-Komponenten-Mapping in Datenebene verschoben."
      ]
    },
    solution: {
      tr: "Surdurulebilir premium portfolio OS yapisi.",
      en: "A maintainable premium portfolio OS structure.",
      fr: "Structure portfolio OS premium et maintenable.",
      it: "Struttura portfolio OS premium e manutenibile.",
      de: "Wartbare Premium-Portfolio-OS-Struktur."
    },
    outcome: {
      tr: "Marka hikayesi daha guclu algilanirken gelistirme hizi da korunabildi.",
      en: "Brand perception strengthened while implementation velocity remained healthy.",
      fr: "Perception de marque renforcee avec velocite d'implementation preservee.",
      it: "Percezione del brand rafforzata mantenendo buona velocita di sviluppo.",
      de: "Staerkere Markenwahrnehmung bei stabiler Entwicklungsgeschwindigkeit."
    }
  }
];

export function getCaseStudies(locale: Locale): CaseStudy[] {
  return localizedCaseStudies.map((item) => ({
    slug: item.slug,
    year: item.year,
    role: item.role,
    title: item.title[locale],
    summary: item.summary[locale],
    challenge: item.challenge[locale],
    process: item.process[locale],
    solution: item.solution[locale],
    outcome: item.outcome[locale]
  }));
}

export function getCaseStudyBySlug(locale: Locale, slug: string): CaseStudy | null {
  return getCaseStudies(locale).find((item) => item.slug === slug) ?? null;
}

export function getStaticCaseSlugs(): { slug: string }[] {
  return localizedCaseStudies.map((item) => ({ slug: item.slug }));
}
