import type { MetadataRoute } from "next";

import { buyerPages } from "@/content/buyer-pages";
import { guides } from "@/content/guides";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  {
    path: "/",
    lastModified: "2026-08-01",
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    path: "/travel-photo-books",
    lastModified: "2026-09-05",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/guides",
    lastModified: "2026-09-05",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/privacy",
    lastModified: "2026-08-01",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    path: "/terms",
    lastModified: "2026-08-01",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    path: "/support",
    lastModified: "2026-08-01",
    changeFrequency: "yearly",
    priority: 0.3,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...guides.map((guide) => ({
      url: absoluteUrl(`/guides/${guide.slug}`),
      lastModified: guide.reviewedDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...buyerPages.map((page) => ({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: page.reviewedDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
