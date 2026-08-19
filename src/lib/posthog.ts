import posthog from "posthog-js";

const projectToken =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim() || undefined;
const postHogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com";
const webAnalyticsEnabled =
  process.env.NEXT_PUBLIC_POSTHOG_WEB_ANALYTICS_ENABLED === "true";

function safePathname(pathname: string) {
  const pathOnly = pathname.split(/[?#]/, 1)[0] || "/";
  return /^\/invite(?:\/|$)/i.test(pathOnly) ? "/invite/[code]" : pathOnly;
}

function safeUrl(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }

  if (!value.trim()) {
    return "";
  }

  try {
    const isAbsolute = /^[a-z][a-z\d+.-]*:/i.test(value);
    const url = new URL(value, "https://awaywego.invalid");
    url.username = "";
    url.password = "";
    url.pathname = safePathname(url.pathname);
    url.search = "";
    url.hash = "";
    return isAbsolute ? url.toString() : url.pathname;
  } catch {
    return safePathname(value);
  }
}

function safeProperties(properties: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(properties).map(([key, value]) => {
      if (typeof value !== "string") {
        return [key, value];
      }

      if (/url|referrer/i.test(key) && !/referring_domain/i.test(key)) {
        return [key, safeUrl(value)];
      }

      if (/pathname$/i.test(key)) {
        return [key, safePathname(value)];
      }

      return [key, value];
    }),
  );
}

if (projectToken && !posthog.__loaded) {
  posthog.init(projectToken, {
    api_host: postHogHost,
    defaults: "2026-05-30",
    autocapture: false,
    capture_pageview: webAnalyticsEnabled ? "history_change" : false,
    capture_pageleave: webAnalyticsEnabled,
    capture_performance: webAnalyticsEnabled
      ? {
          network_timing: false,
          web_vitals: true,
          web_vitals_attribution: false,
        }
      : false,
    person_profiles: "never",
    capture_exceptions: false,
    capture_heatmaps: false,
    capture_dead_clicks: false,
    rageclick: false,
    disable_surveys: true,
    advanced_disable_flags: true,
    disableDeviceModel: true,
    disable_external_dependency_loading: true,
    disable_persistence: true,
    disable_session_recording: true,
    internal_or_test_user_hostname: null,
    before_send: (event) => {
      if (!event?.properties) {
        return event;
      }

      return {
        ...event,
        properties: safeProperties(event.properties),
      };
    },
  });
}

export const APP_STORE_TAP_EVENT = "marketing:app_store_tap";

export function captureAppStoreTap(ctaLocation: string) {
  if (!projectToken) {
    return;
  }

  posthog.capture(
    APP_STORE_TAP_EVENT,
    {
      route: safePathname(window.location.pathname),
      cta_location: ctaLocation,
    },
    {
      send_instantly: true,
      transport: "sendBeacon",
    },
  );
}
