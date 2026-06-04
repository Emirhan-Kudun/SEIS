export type ConnectorConsolePanel = {
  id: "connectors" | "skills" | "mcp" | "archives";
  title: string;
  signal: string;
  proof: string[];
};

export const connectorConsolePanels: ConnectorConsolePanel[] = [
  {
    id: "connectors",
    title: "Connector registry",
    signal: "Configured connectors stay visible with credential-aware status instead of being invoked blindly.",
    proof: ["runtime summary", "needs credentials", "safe status labels"]
  },
  {
    id: "skills",
    title: "Skill registry",
    signal: "Available skills are treated as an operating inventory that supports focused work without tool saturation.",
    proof: ["skill count", "category scope", "no random activation"]
  },
  {
    id: "mcp",
    title: "MCP readiness",
    signal: "MCP servers are tracked by auth state, probe state and archive alignment before production use.",
    proof: ["auth status", "probe mode", "archive match"]
  },
  {
    id: "archives",
    title: "Source archives",
    signal: "iCloud bundles and source archive metadata keep local progress recoverable when remote push is blocked.",
    proof: ["bundle path", "source archives", "rollback cue"]
  }
];
