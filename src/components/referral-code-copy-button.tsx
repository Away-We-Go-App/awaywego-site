"use client";

import { useState } from "react";

type ReferralCodeCopyButtonProps = {
  code: string;
};

export function ReferralCodeCopyButton({ code }: ReferralCodeCopyButtonProps) {
  const [didCopy, setDidCopy] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function copyCode() {
    if (!navigator.clipboard) {
      setDidCopy(false);
      setStatusMessage("Could not copy. Select the code above.");
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setDidCopy(true);
      setStatusMessage("Code copied.");
      window.setTimeout(() => {
        setDidCopy(false);
        setStatusMessage("");
      }, 2200);
    } catch {
      setDidCopy(false);
      setStatusMessage("Could not copy. Select the code above.");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copyCode}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--navy-deep)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--brick)]"
      >
        {didCopy ? "Copied" : "Copy code"}
      </button>
      <span className="sr-only" aria-live="polite">
        {statusMessage}
      </span>
    </>
  );
}
