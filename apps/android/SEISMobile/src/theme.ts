// Shared mobile palette, mirroring the web cockpit's dark operational theme.
export const theme = {
  bg: "#0e1116",
  surface: "#161b22",
  border: "#2b3340",
  text: "#e6e9ee",
  muted: "#9aa4b2",
  accent: "#5bc0be",
  ok: "#4ade80",
  warn: "#fbbf24",
};

export const gateTone: Record<string, string> = {
  enforced: theme.accent,
  open: theme.ok,
  blocked: theme.warn,
};
