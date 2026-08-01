import type { MetadataRoute } from "next";

import { guides } from "@/content/guides";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/travel-photo-books", changeFrequency: "monthly", priority: 0.9 },
  { path: "/guides", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/support", changeFrequency: "yearly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = "2026-08-01";

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...guides.map((guide) => ({
      url: absoluteUrl(`/guides/${guide.slug}`),
      lastModified: guide.publishedDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
