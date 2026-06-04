import type { Metadata } from "next";

import { HomeClient } from "@/components/home-client";
import { resolveLocale } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cinematic Portfolio",
  alternates: {
    canonical: "/"
  }
};

type HomePageProps = {
  searchParams?: { lang?: string };
};

export default function Page({ searchParams }: HomePageProps) {
  return <HomeClient initialLocale={resolveLocale(searchParams?.lang)} />;
}
