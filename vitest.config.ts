import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "packages/content/vitest.config.ts",
      "packages/runtime/vitest.config.ts",
    ],
  },
});
