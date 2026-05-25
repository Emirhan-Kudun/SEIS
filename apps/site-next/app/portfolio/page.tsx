import type { Metadata } from "next";

import { PageSurface } from "../../components/page-surface";

export const metadata: Metadata = {
  title: "Portfolyo",
  description: "Emirhan Kudun Behance isleri, cizimler ve secili gorsel sistemler."
};

export default function PortfolioPage() {
  return <PageSurface mode="portfolio" />;
}
