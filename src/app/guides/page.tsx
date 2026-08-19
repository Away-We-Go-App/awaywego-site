import type { Metadata } from "next";
import Link from "next/link";

import { EditorialCta } from "@/components/editorial-cta";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { guides } from "@/content/guides";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

const description =
  "Practical guides for choosing family travel photos, shaping a clear story, and making a travel photo book people will want to open again.";

export const metadata: Metadata = createPageMetadata({
  title: "Travel Photo Book Guides",
  description,
  path: "/guides",
});

export default function GuidesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl("/guides")}#page`,
        url: absoluteUrl("/guides"),
        name: "Travel Photo Book Guides",
        description,
        isPartOf: { "@id": `${absoluteUrl("/")}#website` },
        hasPart: guides.map((guide) => ({
          "@type": "Article",
          headline: guide.title,
          url: absoluteUrl(`/guides/${guide.slug}`),
        })),
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
      ]),
    ],
  };

  return (
    <SiteShell>
      <JsonLd id="guides-structured-data" data={jsonLd} />
      <main className="bg-[#f8f7f4] text-[#111827]">
        <div className="mx-auto w-full max-w-[1120px] px-6 py-14 sm:px-9 sm:py-20 lg:px-10 lg:py-24">
          <nav aria-label="Breadcrumb" className="text-sm text-[#626262]">
            <Link href="/" className="underline underline-offset-4">
              Home
            </Link>{" "}
            <span aria-hidden="true">/</span> Guides
          </nav>

          <header className="mt-10 max-w-3xl">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
              Away We Go field notes
            </p>
            <h1 className="serif-display-heading mt-4 text-[clamp(3.25rem,8vw,5.75rem)] font-semibold leading-[0.98] tracking-[0.01em] text-[#05070c]">
              Travel photo book guides
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-medium leading-8 text-[#626262] sm:text-2xl sm:leading-9">
              Clear, family-centered advice for getting from an overflowing
              camera roll to a travel book with a story.
            </p>
          </header>

          <section aria-label="Guides" className="mt-14 grid gap-6 md:grid-cols-2">
            {guides.map((guide, index) => (
              <article
                key={guide.slug}
                className="flex h-full flex-col rounded-[22px] border border-[#111827]/10 bg-[#fffdf6] p-7 shadow-[0_18px_50px_rgba(17,24,39,0.06)] sm:p-9"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#626262]">
                  Guide {index + 1} · {guide.readTime}
                </p>
                <h2 className="serif-display-heading mt-4 text-3xl font-semibold leading-tight text-[#05070c] sm:text-4xl">
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="transition hover:text-[var(--brick)]"
                  >
                    {guide.title}
                  </Link>
                </h2>
                <p className="mt-5 text-base leading-7 text-[#626262]">
                  {guide.description}
                </p>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="mt-8 font-semibold text-[var(--brick)] underline decoration-[var(--brick)]/25 underline-offset-4"
                >
                  Read the guide
                </Link>
              </article>
            ))}
          </section>

          <p className="mt-10 max-w-3xl text-base leading-7 text-[#626262] sm:text-lg">
            Looking for the full product overview? Start with our{" "}
            <Link
              href="/travel-photo-books"
              className="font-semibold text-[var(--brick)] underline decoration-[var(--brick)]/25 underline-offset-4"
            >
              travel photo books for family trips
            </Link>{" "}
            page, then use these guides as a practical checklist while you
            build.
          </p>

          <EditorialCta
            ctaLocation="guides-index-bottom"
            heading="Start with a first draft, then make it yours."
            copy="Magic Builder creates a starting point from the photos you choose. Rearrange pages, add captions and maps, personalize the cover, and order when the story feels right."
          />
        </div>
      </main>
    </SiteShell>
  );
}
