import type { Metadata } from "next";

import { PageSurface } from "../../components/page-surface";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Emirhan Kudun for design and digital system work."
};

export default function ContactPage() {
  return <PageSurface mode="contact" />;
}
