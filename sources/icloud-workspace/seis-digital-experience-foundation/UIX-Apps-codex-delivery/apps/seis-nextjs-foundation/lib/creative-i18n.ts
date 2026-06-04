import { Locale } from "@/lib/content";

export type CreativeDictionary = {
  navAbout: string;
  navWorks: string;
  navInsights: string;
  navMotion: string;
  navResearch: string;
  navExperience: string;
  navTools: string;
  navSocial: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutLead: string;
  worksEyebrow: string;
  worksTitle: string;
  worksLead: string;
  motionEyebrow: string;
  motionTitle: string;
  researchEyebrow: string;
  researchTitle: string;
  experimentsEyebrow: string;
  experimentsTitle: string;
  experienceEyebrow: string;
  experienceTitle: string;
  toolsEyebrow: string;
  toolsTitle: string;
  socialEyebrow: string;
  socialTitle: string;
  insightsEyebrow: string;
  insightsTitle: string;
  insightsLead: string;
  viewProject: string;
  viewInsight: string;
  openInsightsIndex: string;
  allCategories: string;
  contactFormName: string;
  contactFormEmail: string;
  contactFormService: string;
  contactFormMessage: string;
  contactFormSubmit: string;
  contactFormSuccess: string;
  contactFormError: string;
  newsletterEyebrow: string;
  newsletterTitle: string;
  newsletterLead: string;
  newsletterEmail: string;
  newsletterSubmit: string;
  newsletterSuccess: string;
  newsletterError: string;
};

const dictionaries: Record<Locale, CreativeDictionary> = {
  tr: {
    navAbout: "About",
    navWorks: "Works",
    navInsights: "Insights",
    navMotion: "Motion",
    navResearch: "Research",
    navExperience: "Experience",
    navTools: "Tools",
    navSocial: "Social",
    aboutEyebrow: "About",
    aboutTitle: "Cinematic urunler icin tasarim ve muhendisligi tek ritimde birlestiren bir creative operating system.",
    aboutLead: "SEIS ekosistemi; estetik kalite, teknik stabilite ve olceklenebilir urun dusuncesini tek mimaride toplar.",
    worksEyebrow: "Selected Works",
    worksTitle: "Premium, olceklenebilir ve AI-native urun katmanlari.",
    worksLead: "Her proje; marka hikayesi, conversion hedefi ve performans sinirlarini ayni anda optimize eder.",
    motionEyebrow: "Motion Showcase",
    motionTitle: "Hafif ama etkili cinematic motion koreografisi.",
    researchEyebrow: "Visual Research",
    researchTitle: "Awwwards seviyesi kompozisyonu production-safe sisteme ceviren referans analizi.",
    experimentsEyebrow: "Creative Experiments",
    experimentsTitle: "Kontrollu risk ile yeni etkileim modelleri.",
    experienceEyebrow: "Experience",
    experienceTitle: "Design, product ve fullstack kesiminde teslimat odakli deneyim.",
    toolsEyebrow: "Tools & Stack",
    toolsTitle: "Yuksek kaliteyi stabil teslimata baglayan stack matrisi.",
    socialEyebrow: "Social",
    socialTitle: "Surekli uretim ve isbirligi agi.",
    insightsEyebrow: "Insights",
    insightsTitle: "Cinematic frontend ve AI-native urun sistemleri uzerine notlar.",
    insightsLead: "Tasarim, motion, performans ve architecture kararlarini production perspektifiyle aciklayan teknik yazilar.",
    viewProject: "Projeyi ac",
    viewInsight: "Yaziyi ac",
    openInsightsIndex: "Tum insights",
    allCategories: "Tum kategoriler",
    contactFormName: "Isim",
    contactFormEmail: "E-posta",
    contactFormService: "Servis tipi",
    contactFormMessage: "Proje ozeti",
    contactFormSubmit: "Build talebi gonder",
    contactFormSuccess: "Talebiniz alindi. Kisa surede donus saglanacak.",
    contactFormError: "Talep gonderimi basarisiz oldu. Lutfen tekrar deneyin.",
    newsletterEyebrow: "Newsletter",
    newsletterTitle: "Yaratici muhendislik notlarini takip et.",
    newsletterLead: "Yeni insight, sistem guncellemesi ve sprint notlari icin abone ol.",
    newsletterEmail: "E-posta",
    newsletterSubmit: "Abone ol",
    newsletterSuccess: "Abonelik alindi. Tesekkurler.",
    newsletterError: "Abonelik basarisiz oldu. Lutfen tekrar dene."
  },
  en: {
    navAbout: "About",
    navWorks: "Works",
    navInsights: "Insights",
    navMotion: "Motion",
    navResearch: "Research",
    navExperience: "Experience",
    navTools: "Tools",
    navSocial: "Social",
    aboutEyebrow: "About",
    aboutTitle: "A creative operating system blending design and engineering into one cinematic rhythm.",
    aboutLead: "SEIS unifies visual craft, technical stability, and scalable product thinking in one architecture.",
    worksEyebrow: "Selected Works",
    worksTitle: "Premium, scalable, AI-native product layers.",
    worksLead: "Each project aligns brand narrative, conversion goals, and performance limits together.",
    motionEyebrow: "Motion Showcase",
    motionTitle: "Lightweight but expressive cinematic motion choreography.",
    researchEyebrow: "Visual Research",
    researchTitle: "Reference analysis transformed into production-safe composition systems.",
    experimentsEyebrow: "Creative Experiments",
    experimentsTitle: "New interaction models with controlled risk.",
    experienceEyebrow: "Experience",
    experienceTitle: "Delivery-focused track record across design, product, and fullstack systems.",
    toolsEyebrow: "Tools & Stack",
    toolsTitle: "A stack matrix that ties premium quality to stable delivery.",
    socialEyebrow: "Social",
    socialTitle: "Connected channels for ongoing collaboration and shipping.",
    insightsEyebrow: "Insights",
    insightsTitle: "Notes on cinematic frontend and AI-native product systems.",
    insightsLead: "Technical breakdowns covering design, motion, performance, and architecture decisions.",
    viewProject: "View project",
    viewInsight: "Read insight",
    openInsightsIndex: "All insights",
    allCategories: "All categories",
    contactFormName: "Name",
    contactFormEmail: "Email",
    contactFormService: "Service type",
    contactFormMessage: "Project brief",
    contactFormSubmit: "Submit build request",
    contactFormSuccess: "Your request is received. A response will follow shortly.",
    contactFormError: "Request failed. Please try again.",
    newsletterEyebrow: "Newsletter",
    newsletterTitle: "Follow creative engineering notes.",
    newsletterLead: "Subscribe for new insights, system updates, and sprint notes.",
    newsletterEmail: "Email",
    newsletterSubmit: "Subscribe",
    newsletterSuccess: "Subscription received. Thank you.",
    newsletterError: "Subscription failed. Please try again."
  },
  fr: {
    navAbout: "About",
    navWorks: "Works",
    navInsights: "Insights",
    navMotion: "Motion",
    navResearch: "Research",
    navExperience: "Experience",
    navTools: "Tools",
    navSocial: "Social",
    aboutEyebrow: "About",
    aboutTitle: "Un systeme creatif qui relie design et engineering dans un rythme cinematique.",
    aboutLead: "SEIS unit craft visuel, stabilite technique et thinking produit scalable.",
    worksEyebrow: "Selected Works",
    worksTitle: "Couches produit premium, scalables et AI-native.",
    worksLead: "Chaque projet aligne narration de marque, conversion et performance.",
    motionEyebrow: "Motion Showcase",
    motionTitle: "Motion cinematique expressive et legere.",
    researchEyebrow: "Visual Research",
    researchTitle: "Analyse reference transformee en systeme composition production-safe.",
    experimentsEyebrow: "Creative Experiments",
    experimentsTitle: "Nouveaux modeles d'interaction avec risque controle.",
    experienceEyebrow: "Experience",
    experienceTitle: "Execution orientee livraison entre design, produit et fullstack.",
    toolsEyebrow: "Tools & Stack",
    toolsTitle: "Matrice stack liant qualite premium et livraison stable.",
    socialEyebrow: "Social",
    socialTitle: "Canaux connectes pour collaboration continue.",
    insightsEyebrow: "Insights",
    insightsTitle: "Notes sur frontend cinematique et systemes produit AI-native.",
    insightsLead: "Analyses techniques sur design, motion, performance et architecture.",
    viewProject: "Voir projet",
    viewInsight: "Lire",
    openInsightsIndex: "Tous les insights",
    allCategories: "Toutes categories",
    contactFormName: "Nom",
    contactFormEmail: "Email",
    contactFormService: "Type de service",
    contactFormMessage: "Brief projet",
    contactFormSubmit: "Envoyer demande",
    contactFormSuccess: "Demande recue. Retour rapide prevu.",
    contactFormError: "Echec envoi. Merci de reessayer.",
    newsletterEyebrow: "Newsletter",
    newsletterTitle: "Suivre les notes creative engineering.",
    newsletterLead: "Abonnez-vous pour nouveaux insights et notes sprint.",
    newsletterEmail: "Email",
    newsletterSubmit: "S'abonner",
    newsletterSuccess: "Abonnement recu. Merci.",
    newsletterError: "Echec abonnement. Reessayez."
  },
  it: {
    navAbout: "About",
    navWorks: "Works",
    navInsights: "Insights",
    navMotion: "Motion",
    navResearch: "Research",
    navExperience: "Experience",
    navTools: "Tools",
    navSocial: "Social",
    aboutEyebrow: "About",
    aboutTitle: "Un sistema creativo che unisce design e engineering in ritmo cinematografico.",
    aboutLead: "SEIS unisce craft visivo, stabilita tecnica e visione prodotto scalabile.",
    worksEyebrow: "Selected Works",
    worksTitle: "Layer prodotto premium, scalabili e AI-native.",
    worksLead: "Ogni progetto allinea narrativa brand, conversione e performance.",
    motionEyebrow: "Motion Showcase",
    motionTitle: "Coreografia motion cinematografica, leggera ed elegante.",
    researchEyebrow: "Visual Research",
    researchTitle: "Analisi reference tradotta in composizione production-safe.",
    experimentsEyebrow: "Creative Experiments",
    experimentsTitle: "Nuovi modelli di interazione con rischio controllato.",
    experienceEyebrow: "Experience",
    experienceTitle: "Track record orientato alla delivery tra design, product e fullstack.",
    toolsEyebrow: "Tools & Stack",
    toolsTitle: "Matrice stack che collega qualita premium a delivery stabile.",
    socialEyebrow: "Social",
    socialTitle: "Canali connessi per collaborazione continua.",
    insightsEyebrow: "Insights",
    insightsTitle: "Note su frontend cinematografico e sistemi prodotto AI-native.",
    insightsLead: "Approfondimenti tecnici su design, motion, performance e architettura.",
    viewProject: "Apri progetto",
    viewInsight: "Leggi insight",
    openInsightsIndex: "Tutti gli insights",
    allCategories: "Tutte le categorie",
    contactFormName: "Nome",
    contactFormEmail: "Email",
    contactFormService: "Tipo di servizio",
    contactFormMessage: "Brief progetto",
    contactFormSubmit: "Invia richiesta",
    contactFormSuccess: "Richiesta ricevuta. Risponderemo a breve.",
    contactFormError: "Invio fallito. Riprova.",
    newsletterEyebrow: "Newsletter",
    newsletterTitle: "Segui le note di creative engineering.",
    newsletterLead: "Iscriviti per nuovi insights e aggiornamenti sprint.",
    newsletterEmail: "Email",
    newsletterSubmit: "Iscriviti",
    newsletterSuccess: "Iscrizione ricevuta. Grazie.",
    newsletterError: "Iscrizione fallita. Riprova."
  },
  de: {
    navAbout: "About",
    navWorks: "Works",
    navInsights: "Insights",
    navMotion: "Motion",
    navResearch: "Research",
    navExperience: "Experience",
    navTools: "Tools",
    navSocial: "Social",
    aboutEyebrow: "About",
    aboutTitle: "Ein kreatives Betriebssystem, das Design und Engineering in einem cinematic Rhythmus verbindet.",
    aboutLead: "SEIS vereint visuelle Qualitaet, technische Stabilitaet und skalierbares Produktdenken.",
    worksEyebrow: "Selected Works",
    worksTitle: "Premium, skalierbare und AI-native Produktlayer.",
    worksLead: "Jedes Projekt verbindet Markenstory, Conversion-Ziele und Performance-Budget.",
    motionEyebrow: "Motion Showcase",
    motionTitle: "Leichte, elegante cinematic Motion-Choreografie.",
    researchEyebrow: "Visual Research",
    researchTitle: "Referenzanalyse als production-safe Kompositionssystem.",
    experimentsEyebrow: "Creative Experiments",
    experimentsTitle: "Neue Interaktionsmodelle mit kontrolliertem Risiko.",
    experienceEyebrow: "Experience",
    experienceTitle: "Delivery-fokussierte Erfahrung zwischen Design, Produkt und Fullstack.",
    toolsEyebrow: "Tools & Stack",
    toolsTitle: "Stack-Matrix fuer Premium-Qualitaet und stabile Auslieferung.",
    socialEyebrow: "Social",
    socialTitle: "Vernetzte Kanaele fuer kontinuierliche Zusammenarbeit.",
    insightsEyebrow: "Insights",
    insightsTitle: "Notizen zu cinematic Frontend und AI-native Produktsystemen.",
    insightsLead: "Technische Einblicke zu Design, Motion, Performance und Architektur.",
    viewProject: "Projekt ansehen",
    viewInsight: "Insight lesen",
    openInsightsIndex: "Alle Insights",
    allCategories: "Alle Kategorien",
    contactFormName: "Name",
    contactFormEmail: "E-Mail",
    contactFormService: "Service-Typ",
    contactFormMessage: "Projektbriefing",
    contactFormSubmit: "Anfrage senden",
    contactFormSuccess: "Anfrage eingegangen. Rueckmeldung folgt zeitnah.",
    contactFormError: "Senden fehlgeschlagen. Bitte erneut versuchen.",
    newsletterEyebrow: "Newsletter",
    newsletterTitle: "Creative-Engineering-Notizen verfolgen.",
    newsletterLead: "Abonniere neue Insights, System-Updates und Sprint-Notizen.",
    newsletterEmail: "E-Mail",
    newsletterSubmit: "Abonnieren",
    newsletterSuccess: "Abo eingegangen. Danke.",
    newsletterError: "Abo fehlgeschlagen. Bitte erneut versuchen."
  }
};

export function getCreativeDictionary(locale: Locale): CreativeDictionary {
  return dictionaries[locale];
}
