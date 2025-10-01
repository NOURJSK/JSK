import type { Metadata } from "next";
import type { Language } from "./translations";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  locale?: Language;
}

export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = "/og-image.jpg",
    url = "/",
    type = "website",
    publishedTime,
    modifiedTime,
    authors = ["JSK Esports"],
    section,
    tags = [],
    locale = "en",
  } = config;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jsk-esports.com";
  const fullUrl = `${baseUrl}${url}`;
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  // Language-specific metadata
  const localeMap = {
    en: "en_US",
    fr: "fr_FR",
    ar: "ar_SA",
  };

  const metadata: Metadata = {
    title,
    description,
    keywords: [
      "JSK Esports",
      "esports",
      "gaming",
      "professional gaming",
      "tournaments",
      "competitive gaming",
      ...keywords,
      ...tags,
    ],
    authors: authors.map((name) => ({ name })),
    creator: "JSK Esports",
    publisher: "JSK Esports",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        en: `/en${url}`,
        fr: `/fr${url}`,
        ar: `/ar${url}`,
      },
    },
    openGraph: {
      type,
      locale: localeMap[locale],
      url: fullUrl,
      title,
      description,
      siteName: "JSK Esports",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
        section,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
      creator: "@JSKEsports",
      site: "@JSKEsports",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };

  return metadata;
}

export function generateStructuredData(type: string, data: any) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return {
    __html: JSON.stringify(baseStructuredData),
  };
}

// Organization structured data
export const organizationStructuredData = generateStructuredData(
  "Organization",
  {
    name: "JSK Esports",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://jsk-esports.com",
    logo: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://jsk-esports.com"
    }/logo.png`,
    description:
      "Professional esports organization featuring elite players, tournaments, and gaming excellence.",
    sameAs: [
      "https://twitter.com/JSKEsports",
      "https://facebook.com/JSKEsports",
      "https://instagram.com/JSKEsports",
      "https://youtube.com/JSKEsports",
      "https://twitch.tv/JSKEsports",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-JSK-GAME",
      contactType: "customer service",
      availableLanguage: ["English", "French", "Arabic"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Gaming Street",
      addressLocality: "Gaming City",
      addressRegion: "GC",
      postalCode: "12345",
      addressCountry: "US",
    },
  }
);

// Website structured data
export const websiteStructuredData = generateStructuredData("WebSite", {
  name: "JSK Esports",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jsk-esports.com",
  description:
    "Professional esports organization featuring elite players, tournaments, and gaming excellence.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${
        process.env.NEXT_PUBLIC_SITE_URL || "https://jsk-esports.com"
      }/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

// Breadcrumb generator
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
) {
  return generateStructuredData("BreadcrumbList", {
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://jsk-esports.com"}${
        item.url
      }`,
    })),
  });
}
