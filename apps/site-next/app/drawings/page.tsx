import type { Metadata } from "next";

import { PageSurface } from "../../components/page-surface";

export const metadata: Metadata = {
  title: "Cizimler",
  description: "Emirhan Kudun secili cizim arsivi."
};

export default function DrawingsPage() {
  return <PageSurface mode="drawings" />;
}
