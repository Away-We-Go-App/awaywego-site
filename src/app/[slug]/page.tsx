import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BuyerPageContent } from "@/components/buyer-page";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { buyerPages, findBuyerPage } from "@/content/buyer-pages";
import { siteCopy } from "@/content/site-copy";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

type BuyerPageRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return buyerPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: BuyerPageRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findBuyerPage(slug);

  if (!page) {
    notFound();
  }

  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
  });
}

export default async function BuyerPageRoute({
  params,
}: BuyerPageRouteProps) {
  const { slug } = await params;
  const page = findBuyerPage(slug);

  if (!page) {
    notFound();
  }

  const pagePath = `/${page.slug}`;
  const pageUrl = absoluteUrl(pagePath);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        dateModified: page.reviewedDate,
        isPartOf: { "@id": `${absoluteUrl("/")}#website` },
        about: { "@id": `${absoluteUrl("/")}#app` },
        publisher: {
          "@type": "Organization",
          "@id": `${absoluteUrl("/")}#organization`,
          name: siteCopy.name,
        },
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Travel photo books", path: "/travel-photo-books" },
        { name: page.title, path: pagePath },
      ]),
    ],
  };

  return (
    <SiteShell>
      <JsonLd id="buyer-page-structured-data" data={jsonLd} />
      <BuyerPageContent page={page} />
    </SiteShell>
  );
}
