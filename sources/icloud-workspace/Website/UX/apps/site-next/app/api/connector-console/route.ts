import { capabilityMeshItems, capabilityMeshSummary, connectorConsolePanels } from "@seis/content";
import {
  getConnectorActivationManifest,
  getMcpReadinessSnapshot,
  getRuntimeSnapshot,
  getSourceArchives
} from "@seis/runtime";

export const dynamic = "force-dynamic";

export function GET() {
  const runtime = getRuntimeSnapshot();
  const mcpReadiness = getMcpReadinessSnapshot();
  const archives = getSourceArchives();
  const connectorActivationManifest = getConnectorActivationManifest();
  const runtimeSummary = runtime.summary;
  const mcpSummary = mcpReadiness.summary;

  return Response.json({
    counts: {
      connectors: runtime.connectors.length,
      skills: runtime.skills.length,
      capabilityMesh: capabilityMeshItems.length,
      activationLanes: connectorActivationManifest.lanes.length,
      mcpItems: mcpReadiness.items.length,
      archives: archives.length,
      panels: connectorConsolePanels.length
    },
    runtimeSummary,
    mcpSummary,
    capabilityMeshSummary,
    capabilityMesh: capabilityMeshItems,
    connectorActivationManifest,
    panels: connectorConsolePanels,
    archives
  });
}
