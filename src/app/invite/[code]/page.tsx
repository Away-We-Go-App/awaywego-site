import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ReferralCodeCopyButton } from "@/components/referral-code-copy-button";
import { SiteShell } from "@/components/site-shell";
import { siteCopy } from "@/content/site-copy";

type InvitePageProps = {
  params: Promise<{
    code: string;
  }>;
};

const referralCodePattern = /^[A-Z0-9-]{3,32}$/;

export const metadata: Metadata = {
  title: "Away We Go Invite",
  description: "Give $15, Get $15 with an Away We Go referral invite.",
};

function normalizedReferralCode(rawCode: string) {
  let decodedCode: string;

  try {
    decodedCode = decodeURIComponent(rawCode);
  } catch {
    return null;
  }

  const normalized = decodedCode.trim().toUpperCase();
  return referralCodePattern.test(normalized) ? normalized : null;
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { code: rawCode } = await params;
  const code = normalizedReferralCode(rawCode);

  if (!code) {
    notFound();
  }

  const encodedCode = encodeURIComponent(code);
  const appInviteURL = `awaywego://invite/${encodedCode}`;

  return (
    <SiteShell>
      <main className="paper-grain">
        <section className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-5xl flex-col justify-center px-6 py-16 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brick)]">
              Away We Go invite
            </p>
            <h1 className="font-[var(--font-display)] text-5xl leading-[1.02] text-[var(--navy)] sm:text-6xl md:text-7xl">
              Give $15, Get $15
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--sepia)] sm:text-xl">
              Your friend sent you $15 off your first Away We Go book. Open the app with this invite, or keep the code handy and enter it at checkout.
            </p>
          </div>

          <div className="mt-10 grid gap-5 rounded-[8px] border border-[rgba(90,74,50,0.22)] bg-[rgba(255,252,243,0.72)] p-5 shadow-[0_14px_34px_rgba(20,29,48,0.10)] sm:p-6">
            <div>
              <p className="text-sm font-semibold text-[var(--sepia)]">
                Your invite code
              </p>
              <p className="mt-2 break-all font-mono text-3xl font-bold tracking-normal text-[var(--navy)] sm:text-4xl">
                {code}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={appInviteURL}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brick)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brick-deep)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--navy)]"
              >
                Open Away We Go
              </a>
              <ReferralCodeCopyButton code={code} />
            </div>

            <p className="text-sm leading-6 text-[var(--sepia)]">
              Use code {code} at checkout. Invite discounts are valid on first orders only and cannot be combined with another code.
            </p>
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-6 text-[var(--sepia-light)]">
            If the app does not open, install {siteCopy.name} when it is available in the App Store, then enter the same code at checkout.
          </p>
        </section>
      </main>
    </SiteShell>
  );
}
