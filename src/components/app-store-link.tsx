"use client";

import type { ComponentPropsWithoutRef } from "react";

import {
  APP_STORE_TAP_EVENT,
  captureAppStoreTap,
} from "@/lib/posthog";

type AppStoreLinkProps = ComponentPropsWithoutRef<"a"> & {
  ctaLocation: string;
};

export function AppStoreLink({
  ctaLocation,
  onClick,
  ...props
}: AppStoreLinkProps) {
  return (
    <a
      {...props}
      data-analytics-event={APP_STORE_TAP_EVENT}
      onClick={(event) => {
        captureAppStoreTap(ctaLocation);
        onClick?.(event);
      }}
    />
  );
}
