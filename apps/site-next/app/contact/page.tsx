import type { Metadata } from "next";

import { PageSurface } from "../../components/page-surface";

export const metadata: Metadata = {
  title: "Iletisim",
  description: "Emirhan Kudun ile tasarim ve dijital sistem calismalari icin iletisim."
};

export default function ContactPage() {
  return <PageSurface mode="contact" />;
}
