import type { Metadata } from "next";

import { PageSurface } from "../../components/page-surface";

export const metadata: Metadata = {
  title: "Ops",
  description: "SEIS operations console for connectors, skills and runtime health."
};

export default function OpsPage() {
  return <PageSurface mode="ops" />;
}
