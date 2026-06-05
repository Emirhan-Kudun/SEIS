export type SeisConceptRuntimeSurface = {
  id: string;
  role: "primary-monorepo" | "migrated-static-app" | "content-bridge" | "runtime-bridge";
  path: string;
  status: "active" | "planned";
  notes: string;
};

export const seisConceptRuntimeSurfaces: SeisConceptRuntimeSurface[] = [
  {
    id: "emirhan-kudun-portfolio",
    role: "primary-monorepo",
    path: ".",
    status: "active",
    notes: "Private portfolio repository is the SEIS Concept monorepo host."
  },
  {
    id: "uix-web",
    role: "migrated-static-app",
    path: "apps/uix-web",
    status: "active",
    notes: "Migrated from UIX-Apps/apps/web as an independent static workspace."
  },
  {
    id: "uix-static-content",
    role: "content-bridge",
    path: "packages/content/src/uix-static.ts",
    status: "active",
    notes: "Exposes UIX route and static content metadata through @seis/content."
  },
  {
    id: "uix-runtime-governance",
    role: "runtime-bridge",
    path: "packages/runtime/src/seis-concept.ts",
    status: "active",
    notes: "Tracks SEIS Concept runtime surfaces and migration state."
  }
];
