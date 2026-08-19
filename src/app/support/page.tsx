import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { siteCopy } from "@/content/site-copy";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Support",
  description: `Support contact details for ${siteCopy.name}.`,
  path: "/support",
});

export default function SupportPage() {
  return (
    <LegalPage
      eyebrow="Support"
      title="Support"
      intro={siteCopy.legal.supportIntro}
    >
      <p>
        For help with Away We Go, email{" "}
        <a href={`mailto:${siteCopy.supportEmail}`}>
          {siteCopy.supportEmail}
        </a>
        .
      </p>
      <p>
        Include as much detail as you can about what went wrong, what device you
        are using, and what you expected to happen. That gives us the shortest
        path to a useful reply.
      </p>
    </LegalPage>
  );
}
