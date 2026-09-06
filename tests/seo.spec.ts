import { expect, test } from "@playwright/test";

const appStoreUrl =
  "https://apps.apple.com/us/app/away-we-go-travel-books/id6762504520";
const siteUrl = "https://awaywegoapp.com";

test.use({
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
});

type BeaconRecord = {
  data: BodyInit | null;
  url: string;
};

async function installBeaconRecorder(
  page: import("@playwright/test").Page,
) {
  await page.addInitScript(() => {
    const records: BeaconRecord[] = [];
    Object.defineProperty(navigator, "webdriver", {
      configurable: true,
      get: () => false,
    });
    Object.defineProperty(navigator, "userAgentData", {
      configurable: true,
      get: () => undefined,
    });
    Object.defineProperty(window, "__posthogBeacons", {
      configurable: true,
      value: records,
    });
    Object.defineProperty(navigator, "sendBeacon", {
      configurable: true,
      value: (url: string, data: BodyInit | null) => {
        records.push({ data, url });
        return true;
      },
    });
  });
}

async function readPostHogBeaconPayload(
  page: import("@playwright/test").Page,
) {
  return page.evaluate(async () => {
    const records =
      (
        window as Window & {
          __posthogBeacons?: BeaconRecord[];
        }
      ).__posthogBeacons ?? [];
    const record = records.find(({ url }) => url.endsWith("/e/"));

    if (!record) {
      return null;
    }

    if (record.data instanceof Blob) {
      const body = await record.data.arrayBuffer();
      const bytes = new Uint8Array(body);

      if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
        const stream = new Blob([body])
          .stream()
          .pipeThrough(new DecompressionStream("gzip"));
        return await new Response(stream).text();
      }

      return new TextDecoder().decode(bytes);
    }

    return String(record.data ?? "");
  });
}

async function readJsonLd(page: import("@playwright/test").Page, id: string) {
  const raw = await page.locator(`#${id}`).textContent();

  expect(raw).not.toBeNull();
  return JSON.parse(raw ?? "null") as Record<string, unknown>;
}

test("homepage publishes canonical, social, robots, and accurate app metadata", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Travel Photo Books for Family Trips");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    siteUrl,
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /personalized travel photo book/,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /index, follow/,
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "website",
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    siteUrl,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(
    page.locator('meta[name="google-site-verification"]'),
  ).toHaveCount(0);

  await expect(
    page.getByRole("link", { name: "Download on the App Store" }),
  ).toHaveAttribute("href", appStoreUrl);
  await expect(page.getByRole("link", { name: "Photo books" })).toHaveAttribute(
    "href",
    "/travel-photo-books",
  );
  await expect(page.getByRole("link", { name: "Guides" })).toHaveAttribute(
    "href",
    "/guides",
  );

  const jsonLd = await readJsonLd(page, "site-structured-data");
  const graph = jsonLd["@graph"] as Array<Record<string, unknown>>;
  const organization = graph.find(
    (node) => node["@type"] === "Organization",
  );
  const website = graph.find((node) => node["@type"] === "WebSite");
  const app = graph.find((node) => node["@type"] === "MobileApplication");

  expect(organization).toMatchObject({ name: "Away We Go", url: siteUrl });
  expect(website).toMatchObject({ name: "Away We Go", url: siteUrl });
  expect(app).toMatchObject({
    name: "Away We Go",
    downloadUrl: appStoreUrl,
    installUrl: appStoreUrl,
    operatingSystem: "iOS",
    applicationCategory: "TravelApplication",
    applicationSubCategory: "Lifestyle",
    isAccessibleForFree: true,
  });
  expect(JSON.stringify(jsonLd)).not.toContain("aggregateRating");
  expect(JSON.stringify(jsonLd)).not.toContain('"review"');
});

test("expanded web analytics remains off under the default CTA-only configuration", async ({
  page,
}) => {
  const ingestionRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    const isPostHogHost =
      url.hostname === "posthog.com" || url.hostname.endsWith(".posthog.com");
    const isIngestionPath =
      url.pathname.endsWith("/e/") || url.pathname.includes("/i/v0/e");

    if (isPostHogHost && isIngestionPath) {
      ingestionRequests.push(request.url());
    }
  });
  await installBeaconRecorder(page);

  await page.goto("/");
  await page.waitForTimeout(250);

  expect(ingestionRequests).toEqual([]);
  expect(
    await page.evaluate(
      () =>
        (
          window as Window & {
            __posthogBeacons?: Array<{ data: BodyInit | null; url: string }>;
          }
        ).__posthogBeacons ?? [],
    ),
  ).toEqual([]);
  await expect(
    page.getByRole("link", { name: "Download on the App Store" }),
  ).toHaveAttribute("data-analytics-event", "marketing:app_store_tap");
  expect(
    (await page.context().cookies()).some((cookie) =>
      cookie.name.startsWith("ph_"),
    ),
  ).toBe(false);
  expect(
    await page.evaluate(() =>
      Object.keys(window.localStorage).filter((key) => key.startsWith("ph_")),
    ),
  ).toEqual([]);
  expect(
    await page.evaluate(() =>
      Object.keys(window.sessionStorage).filter((key) => key.startsWith("ph_")),
    ),
  ).toEqual([]);
});

test("referral App Store taps normalize the invite path before capture", async ({
  page,
}) => {
  await installBeaconRecorder(page);
  await page.goto("/invite/Friend15");

  const appStoreLink = page.getByRole("link", {
    name: "App Store",
    exact: true,
  });
  await appStoreLink.evaluate((link) => {
    link.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
    });
  });
  await appStoreLink.click();

  const eventPayload = await readPostHogBeaconPayload(page);
  expect(eventPayload).not.toBeNull();
  expect(eventPayload).toContain('"event":"marketing:app_store_tap"');
  expect(eventPayload).toContain('"route":"/invite/[code]"');
  expect(eventPayload).toContain('"cta_location":"site-header"');
  expect(eventPayload?.toUpperCase()).not.toContain("FRIEND15");
});

test("robots and sitemap expose only the intended crawlable routes", async ({
  request,
}) => {
  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.ok()).toBeTruthy();
  const robots = await robotsResponse.text();

  expect(robots).toContain("User-Agent: *");
  expect(robots).toContain("Allow: /");
  expect(robots).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemap = await sitemapResponse.text();

  const expectedUrls = [
    `${siteUrl}/`,
    `${siteUrl}/travel-photo-books`,
    `${siteUrl}/honeymoon-photo-books`,
    `${siteUrl}/iphone-travel-photo-books`,
    `${siteUrl}/guides`,
    `${siteUrl}/guides/how-to-make-a-travel-photo-book`,
    `${siteUrl}/guides/how-to-choose-photos-for-a-travel-photo-book`,
    `${siteUrl}/guides/travel-photo-book-captions-and-story-prompts`,
    `${siteUrl}/guides/how-to-make-a-road-trip-photo-book`,
    `${siteUrl}/privacy`,
    `${siteUrl}/terms`,
    `${siteUrl}/support`,
  ];

  for (const url of expectedUrls) {
    expect(sitemap).toContain(`<loc>${url}</loc>`);
  }

  expect(sitemap).not.toContain("/invite/");
});

test("buyer pages publish indexable metadata, structured data, and purchase paths", async ({
  page,
}) => {
  const buyerPages = [
    {
      path: "/honeymoon-photo-books",
      title: "Honeymoon Photo Books",
      relatedPath: "/guides/travel-photo-book-captions-and-story-prompts",
    },
    {
      path: "/iphone-travel-photo-books",
      title: "iPhone Travel Photo Books",
      relatedPath: "/guides/how-to-choose-photos-for-a-travel-photo-book",
    },
  ];

  for (const buyerPage of buyerPages) {
    await page.goto(buyerPage.path);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      buyerPage.title,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${siteUrl}${buyerPage.path}`,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /index, follow/,
    );
    await expect(
      page.locator('a[data-analytics-event="marketing:app_store_tap"]'),
    ).toHaveCount(3);
    await expect(page.locator(`a[href="${buyerPage.relatedPath}"]`)).toHaveCount(
      1,
    );

    const jsonLd = await readJsonLd(page, "buyer-page-structured-data");
    const graph = jsonLd["@graph"] as Array<Record<string, unknown>>;
    const webPage = graph.find((node) => node["@type"] === "WebPage");
    const breadcrumbs = graph.find(
      (node) => node["@type"] === "BreadcrumbList",
    );

    expect(webPage).toMatchObject({
      name: buyerPage.title,
      url: `${siteUrl}${buyerPage.path}`,
    });
    expect(breadcrumbs).toBeTruthy();
  }
});

test("new guide pages publish article metadata and contextual navigation", async ({
  page,
}) => {
  const newGuides = [
    {
      path: "/guides/travel-photo-book-captions-and-story-prompts",
      title: "Travel Photo Book Captions and Story Prompts",
      relatedPath: "/honeymoon-photo-books",
    },
    {
      path: "/guides/how-to-make-a-road-trip-photo-book",
      title: "How to Structure a Road Trip Photo Book",
      relatedPath: "/iphone-travel-photo-books",
    },
  ];

  for (const guide of newGuides) {
    await page.goto(guide.path);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      guide.title,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${siteUrl}${guide.path}`,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /index, follow/,
    );
    await expect(page.locator(`a[href="${guide.relatedPath}"]`)).toHaveCount(1);

    const jsonLd = await readJsonLd(page, "guide-structured-data");
    const graph = jsonLd["@graph"] as Array<Record<string, unknown>>;
    const article = graph.find((node) => node["@type"] === "Article");
    const breadcrumbs = graph.find(
      (node) => node["@type"] === "BreadcrumbList",
    );

    expect(article).toMatchObject({
      headline: guide.title,
      datePublished: "2026-09-05",
      dateModified: "2026-09-05",
      mainEntityOfPage: `${siteUrl}${guide.path}`,
    });
    expect(breadcrumbs).toBeTruthy();
    await expect(
      page.locator('a[data-analytics-event="marketing:app_store_tap"]'),
    ).toHaveCount(2);
  }
});

test("buyer route rejects unknown top-level slugs and open route stays noindex", async ({
  page,
  request,
}) => {
  const unknownResponse = await request.get("/not-a-buyer-page");
  expect(unknownResponse.status()).toBe(404);

  await page.goto("/open");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex, nofollow/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});

test("pillar and guide cluster provide useful headings and reciprocal links", async ({
  page,
}) => {
  await page.goto("/travel-photo-books");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Travel photo books for family trips",
    }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    `${siteUrl}/travel-photo-books`,
  );
  await expect(
    page.getByRole("heading", { name: "A simple five-part travel book workflow" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "choose photos for a travel photo book" }),
  ).toHaveAttribute(
    "href",
    "/guides/how-to-choose-photos-for-a-travel-photo-book",
  );
  await expect(
    page.getByRole("link", { name: "step-by-step travel photo book guide" }),
  ).toHaveAttribute(
    "href",
    "/guides/how-to-make-a-travel-photo-book",
  );
  await expect(
    page.getByRole("link", { name: "Honeymoon photo books" }),
  ).toHaveAttribute("href", "/honeymoon-photo-books");
  await expect(
    page.getByRole("link", { name: "iPhone travel photo books" }),
  ).toHaveAttribute("href", "/iphone-travel-photo-books");
  await expect(
    page.getByRole("link", { name: "Road trip book structure" }),
  ).toHaveAttribute("href", "/guides/how-to-make-a-road-trip-photo-book");
  await expect(
    page.getByRole("link", {
      name: "travel photo book captions and story prompts",
    }),
  ).toHaveAttribute(
    "href",
    "/guides/travel-photo-book-captions-and-story-prompts",
  );
  await expect(
    page.getByRole("link", { name: "Download Away We Go on the App Store" }),
  ).toHaveAttribute("href", appStoreUrl);

  const pillarJsonLd = await readJsonLd(
    page,
    "travel-photo-books-structured-data",
  );
  expect(JSON.stringify(pillarJsonLd)).toContain('"WebPage"');
  expect(JSON.stringify(pillarJsonLd)).toContain('"BreadcrumbList"');

  await page.goto("/guides");
  await expect(
    page.getByRole("heading", { level: 1, name: "Travel photo book guides" }),
  ).toBeVisible();
  for (const guide of [
    {
      title: "How to Make a Travel Photo Book",
      href: "/guides/how-to-make-a-travel-photo-book",
    },
    {
      title: "How to Choose Photos for a Travel Photo Book",
      href: "/guides/how-to-choose-photos-for-a-travel-photo-book",
    },
  ]) {
    await expect(
      page.getByRole("heading", { name: guide.title }).getByRole("link"),
    ).toHaveAttribute("href", guide.href);
  }

  await page.goto("/guides/how-to-make-a-travel-photo-book");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "How to Make a Travel Photo Book",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: "How to Choose Photos for a Travel Photo Book",
    }),
  ).toHaveAttribute(
    "href",
    "/guides/how-to-choose-photos-for-a-travel-photo-book",
  );
  await expect(
    page.getByRole("link", { name: "travel photo book workflow" }),
  ).toHaveAttribute("href", "/travel-photo-books");

  const guideJsonLd = await readJsonLd(page, "guide-structured-data");
  const guideGraph = guideJsonLd["@graph"] as Array<Record<string, unknown>>;
  const article = guideGraph.find((node) => node["@type"] === "Article");
  const breadcrumbs = guideGraph.find(
    (node) => node["@type"] === "BreadcrumbList",
  );

  expect(article).toMatchObject({
    headline: "How to Make a Travel Photo Book",
    datePublished: "2026-08-01",
    dateModified: "2026-09-05",
    mainEntityOfPage: `${siteUrl}/guides/how-to-make-a-travel-photo-book`,
  });
  expect(breadcrumbs).toBeTruthy();

  await page.goto("/guides/how-to-choose-photos-for-a-travel-photo-book");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "How to Choose Photos for a Travel Photo Book",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "How to Make a Travel Photo Book" }),
  ).toHaveAttribute("href", "/guides/how-to-make-a-travel-photo-book");
});

test("referral pages stay functional while remaining out of the index", async ({
  page,
}) => {
  await page.goto("/invite/Friend15");

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex, nofollow, noarchive/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.getByText("FRIEND15", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open Away We Go" }),
  ).toHaveAttribute("href", "awaywego://invite/FRIEND15");
  await expect(
    page.getByRole("link", { name: "App Store", exact: true }),
  ).toHaveAttribute("href", appStoreUrl);
});
