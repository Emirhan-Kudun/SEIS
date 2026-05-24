import type { Metadata } from "next";

import { PageSurface } from "../../components/page-surface";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Case study system for portfolio and runtime design work."
};

export default function CaseStudiesPage() {
  return <PageSurface mode="cases" />;
}
