import { polyglotGithubLanguages, softwareLanguages } from "@seis/content";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    total: softwareLanguages.length,
    githubLanguageTotal: polyglotGithubLanguages.length,
    activeGithubLanguages: polyglotGithubLanguages.filter((language) => language.status === "active").length,
    exampleGithubLanguages: polyglotGithubLanguages.filter((language) => language.status === "example").length,
    languages: softwareLanguages,
    githubLanguages: polyglotGithubLanguages
  });
}
