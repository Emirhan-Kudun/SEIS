export const themeModes = ["dark", "light", "system"] as const;

export type ThemeMode = (typeof themeModes)[number];
export type ResolvedThemeMode = "dark" | "light";

export const defaultThemeMode: ThemeMode = "dark";

export function resolveThemeMode(value: string | null | undefined): ThemeMode {
  if (!value) return defaultThemeMode;
  return themeModes.includes(value as ThemeMode) ? (value as ThemeMode) : defaultThemeMode;
}

export function resolveSystemTheme(preferDark: boolean): ResolvedThemeMode {
  return preferDark ? "dark" : "light";
}

export function resolveAppliedTheme(mode: ThemeMode, preferDark: boolean): ResolvedThemeMode {
  if (mode === "system") {
    return resolveSystemTheme(preferDark);
  }
  return mode;
}
