export type PublishingConsoleStep = {
  id: "local-readiness" | "cloud-env-preflight" | "deploy-preflight" | "icloud-bundle" | "github-origin" | "remote-hosting";
  title: string;
  signal: string;
  command: string;
  status: "active" | "blocked" | "prepared";
};

export const publishingConsoleSteps: PublishingConsoleStep[] = [
  {
    id: "local-readiness",
    title: "Local readiness",
    signal: "Run quality gates, type checks, production build and site budgets before any remote publish.",
    command: "npm run lint && npm run checks && npm run typecheck && npm run build && npm run report:budgets",
    status: "active"
  },
  {
    id: "cloud-env-preflight",
    title: "Cloud environment preflight",
    signal: "Generate a secret-safe activation packet for Vercel, Supabase, GitHub and custom server variables.",
    command: "npm run cloud:env:preflight",
    status: "active"
  },
  {
    id: "deploy-preflight",
    title: "Deploy preflight",
    signal: "Measure server, Vercel, Supabase, static fallback and credential gaps before any live deploy command.",
    command: "npm run deploy:preflight",
    status: "active"
  },
  {
    id: "icloud-bundle",
    title: "iCloud bundle",
    signal: "Generate a recoverable Git bundle and share note in the iCloud Drive export folder.",
    command: "npm run share:icloud-github",
    status: "active"
  },
  {
    id: "github-origin",
    title: "GitHub origin",
    signal: "Publish the active branch only after SSH or GitHub CLI authentication is ready.",
    command: "GIT_TERMINAL_PROMPT=0 git push -u origin codex/seis-ux-cinematic-premium-foundation",
    status: "blocked"
  },
  {
    id: "remote-hosting",
    title: "Remote hosting",
    signal: "Use Vercel or custom server deployment only after explicit credential and target confirmation.",
    command: "npm run github:publish",
    status: "prepared"
  }
];
