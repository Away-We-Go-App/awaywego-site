import type { Metadata } from "next";
import {
  Abril_Fatface,
  EB_Garamond,
  Inter,
  Special_Elite,
} from "next/font/google";

import { siteCopy } from "@/content/site-copy";

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
  metadataBase: new URL(`https://${siteCopy.domain}`),
  title: {
    default: siteCopy.name,
    template: `%s | ${siteCopy.name}`,
  },
  description: siteCopy.shortDescription,
  openGraph: {
    title: siteCopy.name,
    description: siteCopy.shortDescription,
    url: `https://${siteCopy.domain}`,
    siteName: siteCopy.name,
    images: ["/home-collage.png"],
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
