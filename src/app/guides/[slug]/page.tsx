import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EditorialCta } from "@/components/editorial-cta";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { findGuide, guides } from "@/content/guides";
import { siteCopy } from "@/content/site-copy";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = findGuide(slug);

  if (!guide) {
    notFound();
  }

  return createPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: "article",
    publishedTime: guide.publishedDate,
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = findGuide(slug);

  if (!guide) {
    notFound();
  }

  const otherGuides = guides.filter((candidate) => candidate.slug !== slug);
  const guidePath = `/guides/${guide.slug}`;
  const publishedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${guide.publishedDate}T00:00:00Z`));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${absoluteUrl(guidePath)}#article`,
        headline: guide.title,
        description: guide.description,
        datePublished: guide.publishedDate,
        dateModified: guide.publishedDate,
        mainEntityOfPage: absoluteUrl(guidePath),
        author: {
          "@type": "Organization",
          "@id": `${absoluteUrl("/")}#organization`,
          name: siteCopy.name,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${absoluteUrl("/")}#organization`,
          name: siteCopy.name,
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl("/app-icon.png"),
          },
        },
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
        { name: guide.title, path: guidePath },
      ]),
    ],
  };

  return (
    <SiteShell>
      <JsonLd id="guide-structured-data" data={jsonLd} />
      <main className="bg-[#f8f7f4] text-[#111827]">
        <article className="mx-auto w-full max-w-[920px] px-6 py-14 sm:px-9 sm:py-20 lg:px-10 lg:py-24">
          <nav aria-label="Breadcrumb" className="text-sm text-[#626262]">
            <Link href="/" className="underline underline-offset-4">
              Home
            </Link>{" "}
            <span aria-hidden="true">/</span>{" "}
            <Link href="/guides" className="underline underline-offset-4">
              Guides
            </Link>{" "}
            <span aria-hidden="true">/</span> {guide.title}
          </nav>

          <header className="mt-10 border-b border-[#111827]/10 pb-12">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
              {guide.eyebrow}
            </p>
            <h1 className="serif-display-heading mt-4 text-[clamp(3.2rem,8vw,5.6rem)] font-semibold leading-[0.99] tracking-[0.01em] text-[#05070c]">
              {guide.title}
            </h1>
            <p className="mt-7 text-xl font-medium leading-8 text-[#626262] sm:text-2xl sm:leading-9">
              {guide.intro}
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.13em] text-[#626262]">
              <time dateTime={guide.publishedDate}>{publishedDate}</time> ·{" "}
              {guide.readTime}
            </p>
          </header>

          <div className="mt-12 space-y-14">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="serif-display-heading text-3xl font-semibold leading-tight text-[#05070c] sm:text-4xl">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-5 text-lg leading-8 text-[#4d4d4d]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.checklist ? (
                  <ul className="mt-6 space-y-3 rounded-[18px] border border-[#111827]/10 bg-[#fffdf6] p-6 text-base leading-7 text-[#444] sm:p-7">
                    {section.checklist.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="text-[var(--brick)]">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <section className="mt-16 border-t border-[#111827]/10 pt-10">
            <h2 className="serif-display-heading text-3xl font-semibold text-[#05070c]">
              Keep building your book
            </h2>
            <div className="mt-5 space-y-3 text-lg leading-8 text-[#4d4d4d]">
              <p>
                See how these choices fit into Away We Go’s{" "}
                <Link
                  href="/travel-photo-books"
                  className="font-semibold text-[var(--brick)] underline decoration-[var(--brick)]/25 underline-offset-4"
                >
                  travel photo book workflow
                </Link>
                .
              </p>
              {otherGuides.map((otherGuide) => (
                <p key={otherGuide.slug}>
                  Next, read{" "}
                  <Link
                    href={`/guides/${otherGuide.slug}`}
                    className="font-semibold text-[var(--brick)] underline decoration-[var(--brick)]/25 underline-offset-4"
                  >
                    {otherGuide.title}
                  </Link>
                  .
                </p>
              ))}
            </div>
          </section>

          <EditorialCta
            ctaLocation={`guide-${guide.slug}-bottom`}
            heading="Turn the photo shortlist into a book."
            copy="Create a first draft with Magic Builder, then adjust the photos, pages, grids, captions, maps, artwork, crops, frames, and cover from your iPhone."
          />
        </article>
      </main>
    </SiteShell>
  );
}
