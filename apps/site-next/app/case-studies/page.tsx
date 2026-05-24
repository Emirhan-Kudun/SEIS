import type { Metadata } from "next";

import { PageSurface } from "../../components/page-surface";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Case study system for Behance, drawing and cinematic portfolio work."
};

export default function CaseStudiesPage() {
  return <PageSurface mode="cases" />;
}
