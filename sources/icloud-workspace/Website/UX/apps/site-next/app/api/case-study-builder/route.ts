import { caseStudyBuilderStages, caseStudyBuilderTemplates, works } from "@seis/content";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    counts: {
      stages: caseStudyBuilderStages.length,
      templates: caseStudyBuilderTemplates.length,
      works: works.length
    },
    stages: caseStudyBuilderStages,
    templates: caseStudyBuilderTemplates
  });
}
