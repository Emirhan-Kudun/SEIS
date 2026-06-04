import type { Metadata } from "next";

import { getDictionary } from "@seis/content";

import { PageSurface } from "../../components/page-surface";
import { buildPageMetadata } from "../../lib/seo";
import { resolveRequestLocale } from "../../lib/request-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.navContact,
    description: dict.contactLead,
    path: "/contact",
    locale
  });
}

export default async function ContactPage() {
  const locale = await resolveRequestLocale();
  return <PageSurface mode="contact" locale={locale} />;
}
