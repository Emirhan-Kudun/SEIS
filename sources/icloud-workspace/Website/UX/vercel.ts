import { routes, type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  framework: "nextjs",
  installCommand: "npm install",
  buildCommand: "npm run build --workspace apps/site-next",
  outputDirectory: "apps/site-next/.next",
  crons: [
    {
      path: "/api/cleanup",
      schedule: "0 2 * * *"
    }
  ],
  headers: [
    routes.cacheControl("/drawings/(.*)", {
      public: true,
      maxAge: "1 week",
      immutable: true
    })
  ]
};

export default config;
