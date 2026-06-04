export type ServerHandoffStatus = "active" | "prepared" | "needs_credentials";

export type ServerHandoffStage = {
  id: "artifact" | "target" | "dry-run" | "live-deploy" | "rollback";
  title: string;
  status: ServerHandoffStatus;
  signal: string;
  command: string;
  proof: string[];
};

export type ServerHandoffGuardrail = {
  id: "no-blind-upload" | "static-first" | "credential-boundary" | "rollback";
  label: string;
  rule: string;
};

export const serverHandoffStages: ServerHandoffStage[] = [
  {
    id: "artifact",
    title: "Static fallback artifact",
    status: "active",
    signal: "The dependency-light fallback is available before any server mutation.",
    command: "test -f apps/static-fallback/index.html",
    proof: ["apps/static-fallback/index.html", "runtime-manifest.json", "rollback surface"]
  },
  {
    id: "target",
    title: "Server target contract",
    status: "needs_credentials",
    signal: "DEPLOY_HOST, DEPLOY_USER and DEPLOY_PATH must exist outside git before rsync can run.",
    command: "npm run server:preflight",
    proof: ["DEPLOY_HOST", "DEPLOY_USER", "DEPLOY_PATH"]
  },
  {
    id: "dry-run",
    title: "Dry-run transfer",
    status: "prepared",
    signal: "The first server command must be rsync dry-run, never live upload.",
    command: "npm run deploy:static:dry-run",
    proof: ["rsync --dry-run", "explicit target", "no deletion before review"]
  },
  {
    id: "live-deploy",
    title: "Approved live handoff",
    status: "needs_credentials",
    signal: "Live deploy is allowed only after the dry-run output and target path are confirmed.",
    command: "npm run deploy:static:live",
    proof: ["green checks", "confirmed path", "manual approval"]
  },
  {
    id: "rollback",
    title: "Rollback bundle",
    status: "active",
    signal: "The latest iCloud Git bundle remains the rollback path after any server handoff.",
    command: "npm run share:icloud-github",
    proof: ["UX-exports bundle", "GitHub branch", "release evidence"]
  }
];

export const serverHandoffGuardrails: ServerHandoffGuardrail[] = [
  {
    id: "no-blind-upload",
    label: "No blind upload",
    rule: "A live server mutation is blocked until host, user, path and artifact strategy are explicit."
  },
  {
    id: "static-first",
    label: "Static first",
    rule: "The static fallback is the first server handoff candidate because it is reversible and dependency-light."
  },
  {
    id: "credential-boundary",
    label: "Credential boundary",
    rule: "SSH credentials and deploy paths stay in the shell or provider, never in source files."
  },
  {
    id: "rollback",
    label: "Rollback evidence",
    rule: "Every server handoff must keep a current iCloud bundle and GitHub branch pointer."
  }
];
