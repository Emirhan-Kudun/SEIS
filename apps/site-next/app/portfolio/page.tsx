import type { Metadata } from "next";

import { PageSurface } from "../../components/page-surface";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected portfolio work by Emirhan Kudun."
};

export default function PortfolioPage() {
  return <PageSurface mode="portfolio" />;
}
