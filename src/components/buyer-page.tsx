import Image from "next/image";
import Link from "next/link";

import { AppStoreLink } from "@/components/app-store-link";
import { EditorialCta } from "@/components/editorial-cta";
import type { BuyerPage } from "@/content/buyer-pages";
import { siteCopy } from "@/content/site-copy";

type BuyerPageContentProps = {
  page: BuyerPage;
};

export function BuyerPageContent({ page }: BuyerPageContentProps) {
  const reviewedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${page.reviewedDate}T00:00:00Z`));

  return (
    <main className="bg-[#f8f7f4] text-[#111827]">
      <div className="mx-auto w-full max-w-[1120px] px-6 py-14 sm:px-9 sm:py-20 lg:px-10 lg:py-24">
        <nav aria-label="Breadcrumb" className="text-sm text-[#626262]">
          <Link href="/" className="underline underline-offset-4">
            Home
          </Link>{" "}
          <span aria-hidden="true">/</span>{" "}
          <Link
            href="/travel-photo-books"
            className="underline underline-offset-4"
          >
            Travel photo books
          </Link>{" "}
          <span aria-hidden="true">/</span> {page.title}
        </nav>

        <header className="mt-10 max-w-4xl border-b border-[#111827]/10 pb-12">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
            {page.eyebrow}
          </p>
          <h1 className="serif-display-heading mt-4 text-[clamp(3.4rem,8.5vw,6.2rem)] font-semibold leading-[0.94] tracking-[0.008em] text-[#05070c]">
            {page.title}
          </h1>
          <p className="mt-7 max-w-3xl text-xl font-medium leading-8 text-[#626262] sm:text-2xl sm:leading-9">
            {page.intro}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <AppStoreLink
              href={siteCopy.appStoreUrl}
              ctaLocation={`buyer-${page.slug}-hero`}
              aria-label="Download Away We Go on the App Store"
              className="inline-flex transition hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[#111827] focus:ring-offset-4 focus:ring-offset-[#f8f7f4]"
            >
              <Image
                src="/marketing/download-on-the-app-store.svg"
                alt="Download on the App Store"
                width={168}
                height={56}
                className="h-14 w-auto"
              />
            </AppStoreLink>
            <span className="max-w-xs text-sm leading-6 text-[#626262]">
              Start on iPhone with the photographs you choose.
            </span>
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.13em] text-[#626262]">
            Editorial guide · Reviewed {reviewedDate}
          </p>
        </header>

        {page.productExample ? (
          <figure className="mt-10 grid gap-5 rounded-[22px] border border-[#111827]/10 bg-[#fffdf6] p-5 shadow-[0_18px_50px_rgba(17,24,39,0.06)] sm:grid-cols-[minmax(180px,240px)_1fr] sm:items-center sm:p-7">
            <Image
              src={page.productExample.src}
              alt={page.productExample.alt}
              width={720}
              height={1100}
              sizes="(min-width: 640px) 240px, 70vw"
              className="mx-auto max-h-[420px] w-auto rounded-[12px] object-contain"
            />
            <figcaption className="max-w-xl text-base leading-7 text-[#626262] sm:text-lg sm:leading-8">
              <span className="block text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
                In the app
              </span>
              <span className="mt-3 block">{page.productExample.caption}</span>
            </figcaption>
          </figure>
        ) : null}

        <div className="mt-12 space-y-14">
          {page.sections.map((section) => (
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
              {section.example ? (
                <aside className="mt-7 rounded-[20px] border border-[#b04a3a]/20 bg-[#f7e7df] p-6 sm:p-8">
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
                    {section.example.label}
                  </p>
                  <h3 className="serif-display-heading mt-3 text-2xl font-semibold leading-tight text-[#05070c] sm:text-3xl">
                    {section.example.heading}
                  </h3>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-[#4d4d4d] sm:text-lg sm:leading-8">
                    {section.example.copy}
                  </p>
                </aside>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-16 border-t border-[#111827]/10 pt-12 sm:mt-20">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
            Keep shaping the story
          </p>
          <h2 className="serif-display-heading mt-4 text-4xl font-semibold leading-tight text-[#05070c] sm:text-5xl">
            Choose the next useful step
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {page.relatedLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="group block rounded-[20px] border border-[#111827]/10 bg-[#fffdf6] p-6 shadow-[0_18px_50px_rgba(17,24,39,0.05)] transition hover:border-[var(--brick)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--brick)] focus:ring-offset-4 focus:ring-offset-[#f8f7f4] sm:p-7"
              >
                <h3 className="serif-display-heading text-2xl font-semibold leading-tight text-[#05070c] transition group-hover:text-[var(--brick)]">
                  {link.label}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#626262]">
                  {link.description}
                </p>
                <span className="mt-5 inline-block font-semibold text-[var(--brick)]">
                  Read next →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-[#111827]/10 pt-12 sm:mt-20">
          <h2 className="serif-display-heading text-4xl font-semibold leading-tight text-[#05070c] sm:text-5xl">
            Before you start
          </h2>
          <dl className="mt-8 grid gap-8 md:grid-cols-3">
            {page.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-lg font-bold text-[#111827]">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base leading-7 text-[#626262]">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <EditorialCta
          ctaLocation={`buyer-${page.slug}-bottom`}
          heading={page.ctaHeading}
          copy={page.ctaCopy}
        />
      </div>
    </main>
  );
}
