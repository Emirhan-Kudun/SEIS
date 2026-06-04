"use client";

import { useEffect, useMemo, useState } from "react";

import {
  defaultThemeMode,
  resolveAppliedTheme,
  resolveThemeMode,
  themeModes,
  ThemeMode
} from "@/lib/theme";

const THEME_LABELS: Record<ThemeMode, string> = {
  dark: "Dark",
  light: "Light",
  system: "System"
};

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(defaultThemeMode);
  const [prefersDark, setPrefersDark] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = resolveThemeMode(window.localStorage.getItem("seis-theme-mode"));
    setMode(saved);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setPrefersDark(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersDark(event.matches);
    };

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }

    media.addListener(listener);
    return () => media.removeListener(listener);
  }, []);

  const applied = useMemo(() => resolveAppliedTheme(mode, prefersDark), [mode, prefersDark]);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;
    document.documentElement.setAttribute("data-theme", applied);
    window.localStorage.setItem("seis-theme-mode", mode);
  }, [applied, mode]);

  return (
    <div role="group" aria-label="Theme mode" className="flex flex-wrap gap-1">
      {themeModes.map((item) => {
        const active = mode === item;
        return (
          <button
            key={item}
            type="button"
            aria-pressed={active}
            onClick={() => setMode(item)}
            className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.1em] transition-colors ${
              active
                ? "border-seis-accent bg-seis-accent text-seis-bg"
                : "border-seis-line text-seis-muted hover:border-seis-accent"
            }`}
          >
            {THEME_LABELS[item]}
          </button>
        );
      })}
    </div>
  );
}
