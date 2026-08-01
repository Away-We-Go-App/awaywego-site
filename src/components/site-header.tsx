import Image from "next/image";
import Link from "next/link";

import { AppStoreLink } from "@/components/app-store-link";
import { siteCopy } from "@/content/site-copy";

type SiteHeaderProps = {
  variant?: "default" | "floating";
};

export function SiteHeader({ variant = "default" }: SiteHeaderProps) {
  const isFloating = variant === "floating";

  return (
    <header
      className={
        isFloating
          ? "absolute inset-x-0 top-0 z-50"
          : "paper-grain relative z-10 border-b border-[rgba(90,74,50,0.18)] bg-[var(--cream)]"
      }
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/app-icon.png"
            alt=""
            width={42}
            height={42}
            className="rounded-md border border-black/10 shadow-[0_4px_12px_rgba(20,29,48,0.18)]"
          />
          <div className="flex flex-col leading-none">
            <span className="text-[1.45rem] leading-none [font-family:var(--font-display)]">
              {siteCopy.name}
            </span>
            <span className="mt-1 text-[0.72rem] uppercase tracking-[0.2em] text-[var(--sepia-light)]">
              travel photo books
            </span>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-4 text-sm font-medium text-[var(--navy)] md:gap-6">
          <Link
            href="/travel-photo-books"
            className="transition-colors hover:text-[var(--brick)]"
          >
            Photo books
          </Link>
          <Link
            href="/guides"
            className="transition-colors hover:text-[var(--brick)]"
          >
            Guides
          </Link>
          {siteCopy.navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--brick)]"
            >
              {item.label}
            </Link>
          ))}
          <AppStoreLink
            href={siteCopy.appStoreUrl}
            ctaLocation="site-header"
            className="rounded-md border border-[var(--navy)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] [font-family:var(--font-accent)] transition-colors hover:border-[var(--brick)] hover:text-[var(--brick)]"
          >
            App Store
          </AppStoreLink>
        </nav>
      </div>
    </header>
  );
}
