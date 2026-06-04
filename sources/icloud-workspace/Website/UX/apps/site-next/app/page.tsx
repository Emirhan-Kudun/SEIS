import { SiteShell } from "../components/site-shell";
import { resolveRequestLocale } from "../lib/request-locale";

export default async function HomePage() {
  const locale = await resolveRequestLocale();
  return <SiteShell mode="home" locale={locale} />;
}
