import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { withLocalePath } from "../../lib/locale-paths";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default function RuntimePage() {
  redirect(withLocalePath("tr", "/portfolio"));
}
