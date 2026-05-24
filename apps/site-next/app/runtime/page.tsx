import type { Metadata } from "next";

import { PageSurface } from "../../components/page-surface";

export const metadata: Metadata = {
  title: "Runtime",
  description: "Active SEIS runtime and connector readiness layer."
};

export default function RuntimePage() {
  return <PageSurface mode="runtime" />;
}
