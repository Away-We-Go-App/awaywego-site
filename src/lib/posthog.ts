import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (projectToken && !posthog.__loaded) {
  posthog.init(projectToken, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    defaults: "2026-05-30",
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    capture_performance: false,
    advanced_disable_flags: true,
    capture_heatmaps: false,
    disable_external_dependency_loading: true,
    disable_persistence: true,
    disable_session_recording: true,
  });
}

export const APP_STORE_TAP_EVENT = "marketing:app_store_tap";

export function captureAppStoreTap() {
  if (!projectToken) {
    return;
  }

  posthog.capture(APP_STORE_TAP_EVENT, null, {
    send_instantly: true,
    transport: "sendBeacon",
  });
}
