import type { Metadata } from "next";

import { MarketingHome } from "@/components/marketing-home";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Travel Photo Books for Family Trips",
  description:
    "Turn family trip photos into a personalized travel photo book with Away We Go for iPhone, then print it and have it delivered.",
  path: "/",
});

export default function Home() {
  return <MarketingHome />;
}
