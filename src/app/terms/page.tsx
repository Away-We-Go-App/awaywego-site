import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { siteCopy } from "@/content/site-copy";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description: `Terms of service for ${siteCopy.name}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of Service"
      title="Terms of Service"
      intro={siteCopy.legal.termsIntro}
    >
      <p>
        By using Away We Go, you agree not to misuse the app, interfere with its
        operation, or use it in violation of applicable law. You are responsible
        for the content you choose to upload, store, or print through the
        service.
      </p>
      <p>
        Features may change over time, and some product capabilities may be
        added, revised, or removed as the service develops. If paid features or
        purchases are offered, additional terms may appear at checkout.
      </p>
      <p>
        Away We Go may suspend or limit access if the service is used in a way
        that harms the product, other users, or the operation of the platform.
      </p>
      <p>
        For questions about these terms, contact{" "}
        <a href={`mailto:${siteCopy.supportEmail}`}>
          {siteCopy.supportEmail}
        </a>
        .
      </p>
    </LegalPage>
  );
}
