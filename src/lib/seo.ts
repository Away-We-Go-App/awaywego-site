import type { Metadata } from "next";

import { siteCopy } from "@/content/site-copy";

export const siteUrl = `https://${siteCopy.domain}`;

const socialImage = {
  url: "/og-image.jpg",
  width: 2200,
  height: 1467,
  alt: "An Away We Go travel photo book open on a table",
};

type PageMetadataOptions = {
  description: string;
  path: string;
  publishedTime?: string;
  title: string;
  type?: "article" | "website";
};

export function createPageMetadata({
  description,
  path,
  publishedTime,
  title,
  type = "website",
}: PageMetadataOptions): Metadata {
  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          title,
          description,
          url: path,
          siteName: siteCopy.name,
          images: [socialImage],
          locale: "en_US",
          type,
          publishedTime,
          authors: [siteCopy.name],
        }
      : {
          title,
          description,
          url: path,
          siteName: siteCopy.name,
          images: [socialImage],
          locale: "en_US",
          type,
        };

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
