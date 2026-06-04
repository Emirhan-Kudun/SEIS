import { Locale } from "@/lib/content";

type Localized<T> = Record<Locale, T>;

export type CloudHandoffDictionary = {
  eyebrow: string;
  title: string;
  lead: string;
  coverageLabel: string;
  healthyLabel: string;
  watchLabel: string;
  criticalLabel: string;
  tasksLabel: string;
  openLabLabel: string;
  principlesTitle: string;
  principles: string[];
};

export type CloudHandoffCard = {
  id:
    | "cloud"
    | "cloudcost"
    | "handoff"
    | "skills"
    | "cloudsecurity"
    | "clouddeploy"
    | "cloudobservabilityplus";
  label: string;
  href: string;
};

const localizedDictionary: Localized<CloudHandoffDictionary> = {
  tr: {
    eyebrow: "Cloud + Handoff Command Deck",
    title: "Cloud olcegi, maliyet yonetimi ve worktree devri tek premium operasyon katmaninda.",
    lead: "Yarin website sprintine girmeden once cloud ve handoff risklerini gorunur hale getirir.",
    coverageLabel: "Signal Coverage",
    healthyLabel: "Healthy",
    watchLabel: "Watch",
    criticalLabel: "Critical",
    tasksLabel: "Active/Planned Tasks",
    openLabLabel: "Lab ac",
    principlesTitle: "Calisma Prensipleri",
    principles: [
      "Main disinda branch-safe akis",
      "Cloud guvenlik ve secret disiplini",
      "Maliyet ve performans dengesi",
      "Rollback checkpoint zorunlulugu"
    ]
  },
  en: {
    eyebrow: "Cloud + Handoff Command Deck",
    title: "Cloud scale, cost governance, and worktree handoff in one premium operating layer.",
    lead: "Makes cloud and handoff risks explicit before tomorrow's website sprint starts.",
    coverageLabel: "Signal Coverage",
    healthyLabel: "Healthy",
    watchLabel: "Watch",
    criticalLabel: "Critical",
    tasksLabel: "Active/Planned Tasks",
    openLabLabel: "Open lab",
    principlesTitle: "Operating Principles",
    principles: [
      "Branch-safe flow outside main",
      "Cloud security and secret discipline",
      "Balanced cost and performance",
      "Mandatory rollback checkpoints"
    ]
  },
  fr: {
    eyebrow: "Cloud + Handoff Command Deck",
    title: "Echelle cloud, gouvernance des couts et handoff worktree dans une meme couche premium.",
    lead: "Rend visibles les risques cloud et handoff avant le sprint website de demain.",
    coverageLabel: "Signal Coverage",
    healthyLabel: "Healthy",
    watchLabel: "Watch",
    criticalLabel: "Critical",
    tasksLabel: "Active/Planned Tasks",
    openLabLabel: "Ouvrir le lab",
    principlesTitle: "Principes Operatoires",
    principles: [
      "Flux branch-safe hors main",
      "Discipline securite cloud et secrets",
      "Equilibre cout et performance",
      "Checkpoints rollback obligatoires"
    ]
  },
  it: {
    eyebrow: "Cloud + Handoff Command Deck",
    title: "Scala cloud, governance costi e handoff worktree in un unico layer premium.",
    lead: "Rende espliciti i rischi cloud e handoff prima dello sprint website di domani.",
    coverageLabel: "Signal Coverage",
    healthyLabel: "Healthy",
    watchLabel: "Watch",
    criticalLabel: "Critical",
    tasksLabel: "Active/Planned Tasks",
    openLabLabel: "Apri lab",
    principlesTitle: "Principi Operativi",
    principles: [
      "Flusso branch-safe fuori da main",
      "Disciplina cloud security e secrets",
      "Equilibrio tra costi e performance",
      "Checkpoint rollback obbligatori"
    ]
  },
  de: {
    eyebrow: "Cloud + Handoff Command Deck",
    title: "Cloud-Skalierung, Kosten-Governance und Worktree-Handoff in einer Premium-Betriebsschicht.",
    lead: "Macht Cloud- und Handoff-Risiken vor dem Website-Sprint morgen explizit sichtbar.",
    coverageLabel: "Signal Coverage",
    healthyLabel: "Healthy",
    watchLabel: "Watch",
    criticalLabel: "Critical",
    tasksLabel: "Active/Planned Tasks",
    openLabLabel: "Lab oeffnen",
    principlesTitle: "Betriebsprinzipien",
    principles: [
      "Branch-safe Ablauf ausserhalb main",
      "Cloud-Security und Secret-Disziplin",
      "Balance aus Kosten und Performance",
      "Verpflichtende Rollback-Checkpoints"
    ]
  }
};

const localizedCards: Localized<CloudHandoffCard[]> = {
  tr: [
    { id: "cloud", label: "Cloud Governance", href: "/cloud-lab" },
    { id: "cloudcost", label: "Cloud Cost", href: "/cloud-cost-lab" },
    { id: "handoff", label: "Worktree Handoff", href: "/handoff-lab" },
    { id: "skills", label: "MCP + Skills", href: "/skills-lab" },
    { id: "cloudsecurity", label: "Cloud Security", href: "/cloud-security-lab" },
    { id: "clouddeploy", label: "Cloud Deploy", href: "/cloud-deploy-pipeline-lab" },
    { id: "cloudobservabilityplus", label: "Cloud Observability+", href: "/cloud-observability-plus-lab" }
  ],
  en: [
    { id: "cloud", label: "Cloud Governance", href: "/cloud-lab" },
    { id: "cloudcost", label: "Cloud Cost", href: "/cloud-cost-lab" },
    { id: "handoff", label: "Worktree Handoff", href: "/handoff-lab" },
    { id: "skills", label: "MCP + Skills", href: "/skills-lab" },
    { id: "cloudsecurity", label: "Cloud Security", href: "/cloud-security-lab" },
    { id: "clouddeploy", label: "Cloud Deploy", href: "/cloud-deploy-pipeline-lab" },
    { id: "cloudobservabilityplus", label: "Cloud Observability+", href: "/cloud-observability-plus-lab" }
  ],
  fr: [
    { id: "cloud", label: "Cloud Governance", href: "/cloud-lab" },
    { id: "cloudcost", label: "Cloud Cost", href: "/cloud-cost-lab" },
    { id: "handoff", label: "Worktree Handoff", href: "/handoff-lab" },
    { id: "skills", label: "MCP + Skills", href: "/skills-lab" },
    { id: "cloudsecurity", label: "Cloud Security", href: "/cloud-security-lab" },
    { id: "clouddeploy", label: "Cloud Deploy", href: "/cloud-deploy-pipeline-lab" },
    { id: "cloudobservabilityplus", label: "Cloud Observability+", href: "/cloud-observability-plus-lab" }
  ],
  it: [
    { id: "cloud", label: "Cloud Governance", href: "/cloud-lab" },
    { id: "cloudcost", label: "Cloud Cost", href: "/cloud-cost-lab" },
    { id: "handoff", label: "Worktree Handoff", href: "/handoff-lab" },
    { id: "skills", label: "MCP + Skills", href: "/skills-lab" },
    { id: "cloudsecurity", label: "Cloud Security", href: "/cloud-security-lab" },
    { id: "clouddeploy", label: "Cloud Deploy", href: "/cloud-deploy-pipeline-lab" },
    { id: "cloudobservabilityplus", label: "Cloud Observability+", href: "/cloud-observability-plus-lab" }
  ],
  de: [
    { id: "cloud", label: "Cloud Governance", href: "/cloud-lab" },
    { id: "cloudcost", label: "Cloud Cost", href: "/cloud-cost-lab" },
    { id: "handoff", label: "Worktree Handoff", href: "/handoff-lab" },
    { id: "skills", label: "MCP + Skills", href: "/skills-lab" },
    { id: "cloudsecurity", label: "Cloud Security", href: "/cloud-security-lab" },
    { id: "clouddeploy", label: "Cloud Deploy", href: "/cloud-deploy-pipeline-lab" },
    { id: "cloudobservabilityplus", label: "Cloud Observability+", href: "/cloud-observability-plus-lab" }
  ]
};

export function getCloudHandoffDictionary(locale: Locale): CloudHandoffDictionary {
  return localizedDictionary[locale];
}

export function getCloudHandoffCards(locale: Locale): CloudHandoffCard[] {
  return localizedCards[locale];
}
