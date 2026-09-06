import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { EditorialCta } from "@/components/editorial-cta";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
} from "@/lib/seo";

const title = "Travel Photo Books for Family Trips";
const description =
  "Turn family trip photos into a personalized travel photo book with a first draft, photo games, custom maps, destination artwork, flexible pages, captions, and printed formats.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/travel-photo-books",
});

const workflow = [
  {
    number: "01",
    title: "Choose the trip photos",
    copy: "Bring together the people, places, candid moments, wide views, and small details that made the family trip yours. Taste Check helps narrow the set, while Cover Star helps choose an image that can lead the book.",
  },
  {
    number: "02",
    title: "Start with a real draft",
    copy: "Magic Builder creates a first version from the photos you select. Instead of facing blank pages, you can respond to a complete sequence and decide what deserves more room, what should move, and what can leave.",
  },
  {
    number: "03",
    title: "Shape the family story",
    copy: "Rearrange pages and photos, switch between feature images and photo grids, add captions or story pages, and adjust each crop and frame. The draft handles the beginning; your choices make the book recognizable.",
  },
  {
    number: "04",
    title: "Put the trip on the page",
    copy: "Add custom maps and destination artwork for more than 250 places, then personalize the cover with the destination, year, family name, photo, or artwork that identifies the journey on a shelf.",
  },
  {
    number: "05",
    title: "Print and bring it home",
    copy: "Choose a classic or premium softcover, or a premium hardcover. Review the finished book, place the order, and Away We Go handles printing and delivery.",
  },
] as const;

export default function TravelPhotoBooksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/travel-photo-books")}#page`,
        url: absoluteUrl("/travel-photo-books"),
        name: title,
        description,
        isPartOf: { "@id": `${absoluteUrl("/")}#website` },
        about: { "@id": `${absoluteUrl("/")}#app` },
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Travel photo books", path: "/travel-photo-books" },
      ]),
    ],
  };

  return (
    <SiteShell>
      <JsonLd id="travel-photo-books-structured-data" data={jsonLd} />
      <main className="bg-[#f8f7f4] text-[#111827]">
        <div className="mx-auto w-full max-w-[1120px] px-6 py-14 sm:px-9 sm:py-20 lg:px-10 lg:py-24">
          <nav aria-label="Breadcrumb" className="text-sm text-[#626262]">
            <Link href="/" className="underline underline-offset-4">
              Home
            </Link>{" "}
            <span aria-hidden="true">/</span> Travel photo books
          </nav>

          <header className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.65fr)] lg:items-end">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
                Your family trip, made tangible
              </p>
              <h1 className="serif-display-heading mt-4 text-[clamp(3.4rem,8.5vw,6.4rem)] font-semibold leading-[0.94] tracking-[0.008em] text-[#05070c]">
                Travel photo books for family trips
              </h1>
            </div>
            <p className="max-w-xl text-xl font-medium leading-8 text-[#626262] sm:text-2xl sm:leading-9">
              Away We Go turns the photos already on your iPhone into a first
              draft you can rearrange, personalize, print, and have delivered.
            </p>
          </header>

          <figure className="mt-10 grid gap-6 rounded-[22px] border border-[#111827]/10 bg-[#fffdf6] p-5 shadow-[0_18px_50px_rgba(17,24,39,0.06)] sm:grid-cols-[minmax(180px,250px)_1fr] sm:items-center sm:p-7">
            <Image
              src="/marketing/onboarding-product-book-builder.png"
              alt="Example Away We Go book draft shown in the app"
              width={720}
              height={1100}
              sizes="(min-width: 1024px) 250px, 55vw"
              className="mx-auto max-h-[420px] w-auto rounded-[12px] object-contain"
            />
            <figcaption className="max-w-xl text-base leading-7 text-[#626262] sm:text-lg sm:leading-8">
              <span className="block text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
                Example product view
              </span>
              <span className="mt-3 block">
                A first book draft gives a family vacation a place to start;
                you decide which pages, photographs, and details belong in the
                finished story.
              </span>
            </figcaption>
          </figure>

          <section className="mt-16 border-y border-[#111827]/10 py-12 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <h2 className="serif-display-heading text-3xl font-semibold leading-tight text-[#05070c] sm:text-4xl">
                A book should remember more than landmarks.
              </h2>
              <div className="space-y-5 text-lg leading-8 text-[#4d4d4d]">
                <p>
                  Family travel is made of scale and detail: the mountain view,
                  the snack bought twice, a child asleep on the train, the wrong
                  turn that became the story everyone repeats. A useful travel
                  photo book gives those moments a sequence instead of treating
                  the camera roll like an inventory.
                </p>
                <p>
                  Away We Go is an iPhone app built around that job. It creates
                  a complete starting point, then keeps the meaningful decisions
                  in your hands. The result can be orderly or playful, spare or
                  full of captions, as long as it feels like the people who took
                  the trip.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16 sm:mt-20">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
              From camera roll to coffee table
            </p>
            <h2 className="serif-display-heading mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[#05070c] sm:text-5xl">
              A simple five-part travel book workflow
            </h2>
            <ol className="mt-10 grid gap-5">
              {workflow.map((step) => (
                <li
                  key={step.number}
                  className="grid gap-4 rounded-[20px] border border-[#111827]/10 bg-[#fffdf6] p-6 sm:grid-cols-[70px_0.7fr_1.3fr] sm:items-start sm:p-8"
                >
                  <span className="text-xs font-bold tracking-[0.18em] text-[var(--brick)]">
                    {step.number}
                  </span>
                  <h3 className="serif-display-heading text-2xl font-semibold leading-tight text-[#05070c]">
                    {step.title}
                  </h3>
                  <p className="text-base leading-7 text-[#5f5f5f] sm:text-lg sm:leading-8">
                    {step.copy}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16 border-t border-[#111827]/10 pt-12 sm:mt-20">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
              Start with the trip in front of you
            </p>
            <h2 className="serif-display-heading mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[#05070c] sm:text-5xl">
              Advice for the kind of book you want to make
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <article className="rounded-[20px] border border-[#111827]/10 bg-[#fffdf6] p-6 sm:p-7">
                <h3 className="serif-display-heading text-2xl font-semibold leading-tight text-[#05070c]">
                  <Link
                    href="/honeymoon-photo-books"
                    className="transition hover:text-[var(--brick)]"
                  >
                    Honeymoon photo books
                  </Link>
                </h3>
                <p className="mt-3 text-base leading-7 text-[#626262]">
                  Build a two-person story around shared rituals, turning
                  points, and the ordinary moments behind the destination.
                </p>
              </article>
              <article className="rounded-[20px] border border-[#111827]/10 bg-[#fffdf6] p-6 sm:p-7">
                <h3 className="serif-display-heading text-2xl font-semibold leading-tight text-[#05070c]">
                  <Link
                    href="/iphone-travel-photo-books"
                    className="transition hover:text-[var(--brick)]"
                  >
                    iPhone travel photo books
                  </Link>
                </h3>
                <p className="mt-3 text-base leading-7 text-[#626262]">
                  Turn one focused camera-roll album into a first draft, then
                  edit the sequence from your iPhone.
                </p>
              </article>
              <article className="rounded-[20px] border border-[#111827]/10 bg-[#fffdf6] p-6 sm:p-7">
                <h3 className="serif-display-heading text-2xl font-semibold leading-tight text-[#05070c]">
                  <Link
                    href="/guides/how-to-make-a-road-trip-photo-book"
                    className="transition hover:text-[var(--brick)]"
                  >
                    Road trip book structure
                  </Link>
                </h3>
                <p className="mt-3 text-base leading-7 text-[#626262]">
                  Use stops, route changes, maps, and transition photographs to
                  give a long drive a readable shape.
                </p>
              </article>
            </div>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#4d4d4d]">
              When the images need more context, use our guide to{" "}
              <Link
                href="/guides/travel-photo-book-captions-and-story-prompts"
                className="font-semibold text-[var(--brick)] underline decoration-[var(--brick)]/25 underline-offset-4"
              >
                travel photo book captions and story prompts
              </Link>
              .
            </p>
          </section>

          <section className="mt-16 grid gap-8 rounded-[24px] bg-[#17243a] p-7 text-[#fffdf6] sm:p-10 lg:grid-cols-2 lg:p-12">
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#e6b8a9]">
                Plan the edit
              </p>
              <h2 className="serif-display-heading mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
                Keep the photos that carry the story.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-white/75">
              <p>
                A readable book mixes people, place, action, and details. Keep
                one strong version of repeated views, make sure the usual family
                photographer appears, and leave room for the imperfect picture
                that holds an irreplaceable memory.
              </p>
              <p>
                Use our guide to{" "}
                <Link
                  href="/guides/how-to-choose-photos-for-a-travel-photo-book"
                  className="font-semibold text-white underline decoration-white/35 underline-offset-4"
                >
                  choose photos for a travel photo book
                </Link>
                , then follow the full{" "}
                <Link
                  href="/guides/how-to-make-a-travel-photo-book"
                  className="font-semibold text-white underline decoration-white/35 underline-offset-4"
                >
                  step-by-step travel photo book guide
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mt-16 sm:mt-20">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <h2 className="serif-display-heading text-4xl font-semibold leading-tight text-[#05070c] sm:text-5xl">
                Personal without starting from scratch
              </h2>
              <div className="space-y-5 text-lg leading-8 text-[#4d4d4d]">
                <p>
                  The first draft removes the blank-page problem. From there,
                  rearrange pages and photos, choose photo grids, write captions
                  and story pages, and adjust crop and frame choices. Add a
                  custom map when geography matters. Use destination artwork as
                  a chapter break or on the cover when it helps identify the
                  trip.
                </p>
                <p>
                  Cover personalization gives the finished book a clear place
                  in family history: destination, year, travelers, and the image
                  or artwork that brings it back. Classic and premium softcover
                  formats and a premium hardcover give you a choice for the way
                  the book will be handled, shared, or given.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16 border-t border-[#111827]/10 pt-12 sm:mt-20">
            <h2 className="serif-display-heading text-4xl font-semibold leading-tight text-[#05070c]">
              Questions families ask before starting
            </h2>
            <dl className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <dt className="text-lg font-bold text-[#111827]">
                  Do I need to design every page myself?
                </dt>
                <dd className="mt-2 text-base leading-7 text-[#626262]">
                  No. Magic Builder makes a first draft from your selected
                  photos. You can keep what works and change the page order,
                  images, grids, captions, story pages, crops, and frames.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-bold text-[#111827]">
                  Can a book include maps and place artwork?
                </dt>
                <dd className="mt-2 text-base leading-7 text-[#626262]">
                  Yes. You can add custom maps and choose destination artwork
                  for more than 250 places.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-bold text-[#111827]">
                  What printed formats are available?
                </dt>
                <dd className="mt-2 text-base leading-7 text-[#626262]">
                  Away We Go offers classic and premium softcover books and a
                  premium hardcover.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-bold text-[#111827]">
                  What happens when the design is finished?
                </dt>
                <dd className="mt-2 text-base leading-7 text-[#626262]">
                  Review the book, choose the format and cover, and place the
                  order. Away We Go handles printing and delivery.
                </dd>
              </div>
            </dl>
          </section>

          <EditorialCta
            ctaLocation="travel-photo-books-bottom"
            heading="Your camera roll already has the raw material."
            copy="Download Away We Go for iPhone, choose a family trip, and turn the photos into a first draft you can make your own."
          />
        </div>
      </main>
    </SiteShell>
  );
}
