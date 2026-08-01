"use client";

import type { ComponentPropsWithoutRef } from "react";

import {
  APP_STORE_TAP_EVENT,
  captureAppStoreTap,
} from "@/lib/posthog";

type AppStoreLinkProps = ComponentPropsWithoutRef<"a">;

export function AppStoreLink({ onClick, ...props }: AppStoreLinkProps) {
  return (
    <a
      {...props}
      data-analytics-event={APP_STORE_TAP_EVENT}
      onClick={(event) => {
        captureAppStoreTap();
        onClick?.(event);
      }}
    />
  );
}
