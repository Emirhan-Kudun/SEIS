import type { Metadata } from "next";

import { getDigitalLabCopy, getDictionary } from "@seis/content";

import { PageSurface } from "../../components/page-surface";
import { buildPageMetadata } from "../../lib/seo";
import { resolveRequestLocale } from "../../lib/request-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);
  const digitalLabCopy = getDigitalLabCopy(locale);

  return buildPageMetadata({
    title: dict.navLab,
    description: digitalLabCopy.lead,
    path: "/lab",
    locale
  });
}

export default async function LabPage() {
  const locale = await resolveRequestLocale();
  return <PageSurface mode="lab" locale={locale} />;
}
