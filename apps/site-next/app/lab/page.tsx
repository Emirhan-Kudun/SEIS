import type { Metadata } from "next";

import { siteMeta } from "@seis/content";

import { PageSurface } from "../../components/page-surface";

export const metadata: Metadata = {
  title: `Lab | ${siteMeta.author}`,
  description: "Long-term portfolio development lab for Behance, drawings, cinematic motion, contact intake and publish readiness.",
  alternates: {
    canonical: "/lab"
  },
  openGraph: {
    title: `Lab | ${siteMeta.author}`,
    description: "Long-term portfolio development lab for controlled cinematic portfolio growth.",
    url: "/lab"
  }
};

export default function LabPage() {
  return <PageSurface mode="lab" />;
}
