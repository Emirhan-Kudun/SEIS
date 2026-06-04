import { getInsights } from "@/lib/insights-content";
import { absoluteUrl } from "@/lib/site-config";

export async function GET() {
  const insights = getInsights("en");

  const items = insights
    .map(
      (item) => `
      <item>
        <title><![CDATA[${item.title}]]></title>
        <link>${absoluteUrl(`/insights/${item.slug}`)}</link>
        <guid>${absoluteUrl(`/insights/${item.slug}`)}</guid>
        <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
        <description><![CDATA[${item.summary}]]></description>
      </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>SEIS Insights Feed</title>
      <link>${absoluteUrl("/insights")}</link>
      <description>Cinematic frontend and AI-native product engineering insights</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
