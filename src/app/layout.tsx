import type { Metadata } from "next";
import {
  Abril_Fatface,
  EB_Garamond,
  Inter,
  Special_Elite,
} from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { siteCopy } from "@/content/site-copy";
import { absoluteUrl, siteUrl } from "@/lib/seo";

import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const accentFont = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-accent",
});

const serifDisplayFont = EB_Garamond({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-serif-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Away We Go: Travel Photo Books for Family Trips",
    template: `%s | ${siteCopy.name}`,
  },
  description: siteCopy.shortDescription,
  applicationName: siteCopy.name,
  category: "Travel",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Away We Go: Travel Photo Books for Family Trips",
    description: siteCopy.shortDescription,
    url: "/",
    siteName: siteCopy.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 2200,
        height: 1467,
        alt: "An Away We Go travel photo book open on a table",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Away We Go: Travel Photo Books for Family Trips",
    description: siteCopy.shortDescription,
    images: [
      {
        url: "/og-image.jpg",
        alt: "An Away We Go travel photo book open on a table",
      },
    ],
  },
  itunes: {
    appId: siteCopy.appStoreId,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim()
    ? {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.trim(),
      }
    : undefined,
};

const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteCopy.name,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/app-icon.png"),
      },
      sameAs: [siteCopy.appStoreUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteCopy.name,
      url: siteUrl,
      description: siteCopy.shortDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "MobileApplication",
      "@id": `${siteUrl}/#app`,
      name: siteCopy.name,
      url: siteUrl,
      downloadUrl: siteCopy.appStoreUrl,
      installUrl: siteCopy.appStoreUrl,
      operatingSystem: "iOS",
      applicationCategory: "TravelApplication",
      applicationSubCategory: "Lifestyle",
      isAccessibleForFree: true,
      description: siteCopy.shortDescription,
      provider: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${accentFont.variable} ${serifDisplayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--paper)]">
        <JsonLd id="site-structured-data" data={siteStructuredData} />
        {children}
      </body>
    </html>
  );
}
