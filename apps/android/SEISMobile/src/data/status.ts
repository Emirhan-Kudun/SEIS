// Typed accessor over the generated status snapshot. status.json is produced
// by scripts/create-cockpit-status.mjs from the same SEIS records the web
// cockpit renders; do not edit it by hand.
import raw from "./status.json";

export interface PluginLane {
  id: string;
  label: string;
  active: number;
  missing: number;
}

export interface WorkbenchModule {
  id: string;
  lane: string;
  path: string;
  deliverable: string;
  status: string;
}

export interface Gate {
  id: string;
  label: string;
  state: string;
}

export interface WorkspaceDoc {
  id: string;
  title: string;
  url: string;
}

export interface CockpitStatus {
  branch: {
    canonicalRepository: string;
    defaultBranch: string;
    mirrorBranch: string;
    seisBranchCount: number;
  };
  plugins: { installedEnabled: number; notInstalled: number; policy: string; lanes: PluginLane[] };
  workbench: { goal: string; buildOrder: string[]; modules: WorkbenchModule[] };
  workspace: {
    drive: WorkspaceDoc[];
    calendar: { title: string; recurrence: string; url: string };
  };
  safety: { consolidatedSources: string[]; fullHistoryBranches: number };
  gates: Gate[];
}

export const status = raw as unknown as CockpitStatus;
