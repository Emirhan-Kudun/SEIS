import { getInsights } from "@/lib/insights-content";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export async function GET() {
  const insights = getInsights("en");

  return Response.json({
    version: "https://jsonfeed.org/version/1.1",
    title: `${siteConfig.shortName} Insights`,
    home_page_url: absoluteUrl("/insights"),
    feed_url: absoluteUrl("/insights/feed.json"),
    items: insights.map((item) => ({
      id: item.slug,
      url: absoluteUrl(`/insights/${item.slug}`),
      title: item.title,
      summary: item.summary,
      date_published: new Date(item.publishedAt).toISOString(),
      tags: item.tags
    }))
  });
}
