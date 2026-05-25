import type { Metadata } from "next";

import { siteMeta } from "@seis/content";

const siteName = "Emirhan Kudun Portfolio";
const defaultImage = "/favicon.svg";

export function absoluteUrl(path = "/") {
  const base = siteMeta.domain.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = defaultImage
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: path
    },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${siteMeta.author}`,
      description,
      siteName,
      images: [
        {
          url: image,
          alt: `${siteMeta.author} portfolio preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteMeta.author}`,
      description,
      images: [image]
    }
  };
}

export function portfolioStructuredData() {
  const base = siteMeta.domain.replace(/\/$/, "");

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteMeta.author,
      url: base,
      email: siteMeta.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteMeta.city,
        addressCountry: siteMeta.country
      },
      jobTitle: "UI/UX designer and creative technologist",
      knowsAbout: [
        "UI/UX design",
        "Brand systems",
        "Editorial design",
        "Three.js",
        "Creative technology",
        "Frontend engineering"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: base,
      description: siteMeta.description,
      inLanguage: ["tr", "en", "fr", "it", "de"],
      publisher: {
        "@type": "Person",
        name: siteMeta.author
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: siteMeta.title,
      url: base,
      description: siteMeta.description,
      creator: {
        "@type": "Person",
        name: siteMeta.author
      },
      genre: ["Portfolio", "UI/UX", "Branding", "Drawing", "Cinematic web"]
    }
  ];
}
