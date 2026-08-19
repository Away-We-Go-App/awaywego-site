import Image from "next/image";
import Link from "next/link";

import { siteCopy } from "@/content/site-copy";

export function SiteFooter() {
  return (
    <footer className="paper-grain border-t border-[rgba(90,74,50,0.18)] bg-[var(--cream)] px-6 py-8 text-sm text-[var(--sepia)] md:px-10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/app-icon.png"
            alt=""
            width={30}
            height={30}
            className="rounded-md border border-black/10"
          />
          <div className="flex flex-col">
            <span className="text-lg [font-family:var(--font-display)]">
              {siteCopy.name}
            </span>
            <span className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--sepia-light)]">
              © {new Date().getFullYear()} · {siteCopy.footerNote}
            </span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-4 text-[0.78rem] uppercase tracking-[0.18em] [font-family:var(--font-accent)]">
          <Link href="/" className="transition-colors hover:text-[var(--brick)]">
            Home
          </Link>
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
          <a
            href={`mailto:${siteCopy.supportEmail}`}
            className="transition-colors hover:text-[var(--brick)]"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
