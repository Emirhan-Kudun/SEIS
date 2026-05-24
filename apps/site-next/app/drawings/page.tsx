import type { Metadata } from "next";

import { PageSurface } from "../../components/page-surface";

export const metadata: Metadata = {
  title: "Drawings",
  description: "Selected hand-drawn archive by Emirhan Kudun."
};

export default function DrawingsPage() {
  return <PageSurface mode="drawings" />;
}
