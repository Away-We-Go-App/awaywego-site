import type { Metadata } from "next";

import { AppStoreLink } from "@/components/app-store-link";
import { SiteShell } from "@/components/site-shell";
import { siteCopy } from "@/content/site-copy";

export const metadata: Metadata = {
  title: "Open the app",
  description: "Open Away We Go on your iPhone and continue your travel book.",
  robots: { index: false, follow: false },
};

export default function OpenAppPage() {
  return (
    <SiteShell>
      <main className="paper-grain">
        <section className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-5xl flex-col justify-center px-6 py-16 sm:px-8 lg:px-10">
          <h1 className="font-[var(--font-display)] text-5xl leading-[1.02] text-[var(--navy)] sm:text-6xl">
            Your next chapter awaits.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--sepia)]">
            Open Away We Go on your iPhone to continue your travel book.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="awaywego://open"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brick)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brick-deep)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--navy)]"
            >
              Open the app
            </a>
            <AppStoreLink
              href={siteCopy.appStoreUrl}
              ctaLocation="open-app-fallback"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--navy)] px-6 py-3 text-sm font-semibold text-[var(--navy)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--navy)]"
            >
              Download on the App Store
            </AppStoreLink>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-[var(--sepia)]">
            If the app does not open, install or update it from the App Store.
            Reading this on a computer? Open the email on your iPhone.
          </p>
        </section>
      </main>
    </SiteShell>
  );
}
