import Image from "next/image";
import Link from "next/link";

import { MarketingDemoVideo } from "@/components/marketing-demo-video";
import {
  PostboyMobileGameEntry,
  PostboyVespaChaser,
} from "@/components/postboy-vespa-chaser";
import { siteCopy } from "@/content/site-copy";

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
] as const;

export function MarketingHome() {
  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#f8f7f4] text-[#111827] lg:h-screen lg:overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-[1800px] flex-col px-6 pb-7 pt-5 sm:px-9 lg:h-screen lg:px-9 lg:py-7">
        <header className="relative z-20 flex items-center">
          <Link href="/" aria-label="Away We Go home" className="shrink-0">
            <Image
              src="/marketing/away-we-go-logo-primary.svg"
              alt="Away We Go"
              width={304}
              height={82}
              priority
              className="h-auto w-40 sm:w-52 lg:w-64"
            />
          </Link>
        </header>

        <section className="relative z-10 grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)] gap-10 pt-10 sm:pt-12 lg:grid-cols-[minmax(330px,0.44fr)_minmax(560px,0.56fr)] lg:items-end lg:gap-12 lg:pt-0">
          <div className="order-2 flex min-w-0 flex-col justify-end pb-0 lg:order-1 lg:min-h-[calc(100vh-10rem)] lg:pb-10">
            <div className="max-w-[580px]">
              <h1
                data-postboy-home-anchor
                className="serif-display-heading max-w-full text-[clamp(3.05rem,11vw,4.15rem)] font-semibold leading-[1.08] tracking-[0.012em] text-[#05070c] sm:max-w-[430px] sm:text-[clamp(3.5rem,8vw,4.85rem)] lg:max-w-[620px] lg:text-[clamp(3.5rem,4.45vw,4.45rem)]"
              >
                Your trip should be a coffee table book.
              </h1>
              <p className="mt-6 max-w-[500px] text-xl font-medium leading-7 text-[#8a8a8a] sm:text-2xl sm:leading-8">
                Away We Go turns your family trips into beautiful photo books
                that live in your home and not in your phone.
              </p>

              <a
                id="app-store"
                href={siteCopy.appStoreUrl}
                aria-label="Download on the App Store"
                className="mt-7 inline-flex h-14 w-[168px] items-center justify-center transition hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[#111827] focus:ring-offset-4 focus:ring-offset-[#f8f7f4]"
              >
                <Image
                  src="/marketing/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  width={168}
                  height={56}
                  className="h-14 w-auto"
                />
              </a>

              <footer className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.66rem] font-semibold uppercase tracking-[0.17em] text-[#a0a0a0]">
                <span>&copy; 2026 Away We Go</span>
                <nav className="flex flex-wrap items-center gap-4">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="transition hover:text-[#111827]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </footer>
            </div>
          </div>

          <div className="order-1 flex min-w-0 flex-col items-center justify-center gap-4 lg:order-2 lg:min-h-[calc(100vh-9rem)] lg:items-end lg:justify-end lg:gap-0 lg:pb-7">
            <PostboyMobileGameEntry />
            <div className="relative aspect-square w-full max-w-[min(100%,72vh)] overflow-hidden rounded-[26px] bg-[#efe7dc] shadow-[0_38px_95px_rgba(17,24,39,0.14)] sm:rounded-[32px] lg:max-w-[min(56vw,calc(100vh-9.5rem),980px)]">
              <MarketingDemoVideo
                posterSrc="/marketing/onboarding-product-book-builder.png"
                videoSrc="/marketing/onboarding-refine-book-demo.mp4"
              />
            </div>
          </div>
        </section>
      </div>
      <PostboyVespaChaser />
    </main>
  );
}
