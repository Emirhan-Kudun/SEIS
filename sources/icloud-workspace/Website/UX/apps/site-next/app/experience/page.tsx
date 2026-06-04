import { redirect } from "next/navigation";

import { withLocalePath } from "../../lib/locale-paths";
import { resolveRequestLocale } from "../../lib/request-locale";

export default async function ExperiencePage() {
  const locale = await resolveRequestLocale();
  redirect(withLocalePath(locale, "/cv"));
}
