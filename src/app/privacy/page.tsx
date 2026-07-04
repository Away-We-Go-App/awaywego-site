import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy information for ${siteCopy.name}.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      intro={siteCopy.legal.privacyIntro}
    >
      <p>
        Away We Go collects the information needed to provide and improve the
        app, including account details, trip content, app usage data, and any
        information you choose to include in your books or trip drafts.
      </p>
      <p>
        We use that information to operate the service, secure accounts, support
        your use of the product, and process transactions when paid features are
        offered. We do not sell your personal information.
      </p>
      <p>
        We may work with service providers that help us host, secure, and
        operate the product. If those partners process data on our behalf, they
        do so only for the work required to run Away We Go.
      </p>
      <p>
        If you have privacy questions, contact{" "}
        <a href={`mailto:${siteCopy.supportEmail}`}>
          {siteCopy.supportEmail}
        </a>
        .
      </p>
    </LegalPage>
  );
}
