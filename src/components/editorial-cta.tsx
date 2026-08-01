import Image from "next/image";

import { AppStoreLink } from "@/components/app-store-link";
import { siteCopy } from "@/content/site-copy";

type EditorialCtaProps = {
  copy: string;
  ctaLocation: string;
  heading: string;
};

export function EditorialCta({
  copy,
  ctaLocation,
  heading,
}: EditorialCtaProps) {
  return (
    <aside className="mt-14 rounded-[22px] border border-[#111827]/10 bg-[#fffdf6] p-7 shadow-[0_22px_60px_rgba(17,24,39,0.08)] sm:p-10">
      <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[var(--brick)]">
        Make the trip tangible
      </p>
      <h2 className="serif-display-heading mt-3 max-w-2xl text-3xl font-semibold leading-tight text-[#05070c] sm:text-4xl">
        {heading}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[#626262] sm:text-lg">
        {copy}
      </p>
      <AppStoreLink
        href={siteCopy.appStoreUrl}
        ctaLocation={ctaLocation}
        aria-label="Download Away We Go on the App Store"
        className="mt-6 inline-flex transition hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[#111827] focus:ring-offset-4 focus:ring-offset-[#fffdf6]"
      >
        <Image
          src="/marketing/download-on-the-app-store.svg"
          alt="Download on the App Store"
          width={168}
          height={56}
          className="h-14 w-auto"
        />
      </AppStoreLink>
    </aside>
  );
}
