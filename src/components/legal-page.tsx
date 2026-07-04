import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { siteCopy } from "@/content/site-copy";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

const pageLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
] as const;

export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#111827]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col px-6 pb-8 pt-5 sm:px-9 lg:px-9 lg:py-7">
        <header className="flex items-center justify-between gap-6">
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

          <Link
            href="/"
            className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#a0a0a0] transition hover:text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827] focus:ring-offset-4 focus:ring-offset-[#f8f7f4]"
          >
            Home
          </Link>
        </header>

        <section className="pt-14 sm:pt-20 lg:pt-24">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#a0a0a0]">
            {eyebrow}
          </p>
          <h1 className="serif-display-heading mt-4 max-w-[760px] text-[clamp(3.05rem,11vw,4.8rem)] font-semibold leading-[1.04] tracking-[0.012em] text-[#05070c]">
            {title}
          </h1>
          <p className="mt-6 max-w-[680px] text-xl font-medium leading-7 text-[#8a8a8a] sm:text-2xl sm:leading-8">
            {intro}
          </p>
        </section>

        <article className="mt-10 max-w-[680px] space-y-5 text-base font-medium leading-7 text-[#3b3b3b] sm:text-lg sm:leading-8 [&_a]:underline [&_a]:decoration-[#111827]/25 [&_a]:underline-offset-4 [&_a]:transition [&_a:hover]:text-[#05070c]">
          {children}
        </article>

        <footer className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-16 text-[0.66rem] font-semibold uppercase tracking-[0.17em] text-[#a0a0a0]">
          <span>&copy; 2026 {siteCopy.name}</span>
          <nav className="flex flex-wrap items-center gap-4">
            {pageLinks.map((link) => (
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
    </main>
  );
}
