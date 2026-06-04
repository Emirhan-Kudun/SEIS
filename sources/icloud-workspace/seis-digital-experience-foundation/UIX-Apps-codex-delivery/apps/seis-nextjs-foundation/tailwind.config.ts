import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        seis: {
          bg: "rgb(var(--seis-bg-rgb) / <alpha-value>)",
          surface: "rgb(var(--seis-surface-rgb) / <alpha-value>)",
          card: "rgb(var(--seis-card-rgb) / <alpha-value>)",
          text: "rgb(var(--seis-text-rgb) / <alpha-value>)",
          muted: "rgb(var(--seis-muted-rgb) / <alpha-value>)",
          line: "rgb(var(--seis-line-rgb) / <alpha-value>)",
          accent: "rgb(var(--seis-accent-rgb) / <alpha-value>)",
          accentSoft: "rgb(var(--seis-accent-soft-rgb) / <alpha-value>)"
        }
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        full: "999px"
      },
      boxShadow: {
        premium: "0 18px 48px rgba(0, 0, 0, 0.35)",
        cinematic: "0 35px 75px rgba(0, 0, 0, 0.42)"
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Manrope", "Avenir Next", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
