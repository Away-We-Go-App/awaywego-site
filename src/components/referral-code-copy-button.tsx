"use client";

import { useState } from "react";

type ReferralCodeCopyButtonProps = {
  code: string;
};

export function ReferralCodeCopyButton({ code }: ReferralCodeCopyButtonProps) {
  const [didCopy, setDidCopy] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setDidCopy(true);
      window.setTimeout(() => setDidCopy(false), 2200);
    } catch {
      setDidCopy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyCode}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--navy-deep)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--brick)]"
    >
      {didCopy ? "Copied" : "Copy code"}
    </button>
  );
}
