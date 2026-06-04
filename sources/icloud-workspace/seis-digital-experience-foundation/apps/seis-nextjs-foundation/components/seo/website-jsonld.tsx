import { Locale } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

type WebsiteJsonLdProps = {
  locale: Locale;
};

export function WebsiteJsonLd({ locale }: WebsiteJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    areaServed: "Global",
    inLanguage: siteConfig.inLanguages,
    availableLanguage: siteConfig.inLanguages,
    url: siteConfig.url,
    knowsAbout: [
      "Premium frontend architecture",
      "Cinematic UI systems",
      "SaaS website strategy",
      "Design systems",
      "Motion systems",
      "Accessibility-first product design"
    ],
    serviceType: "Website Architecture and Design System Engineering",
    email: siteConfig.email,
    audience: {
      "@type": "Audience",
      audienceType: "Startup founders, creative studios, SaaS operators"
    }
  };

  return (
    <script
      type="application/ld+json"
      lang={locale}
      // Safe serialization for static JSON-LD payload
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
