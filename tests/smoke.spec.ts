import { expect, test } from "@playwright/test";

test("homepage and legal pages render the required public content", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Your trip should be a coffee table book.",
    }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Away We Go turns your family trips into beautiful photo books that live in your home and not in your phone.",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Download on the App Store" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Download on the App Store" }),
  ).toHaveAttribute("href", /apps\.apple\.com/);
  await expect(page.getByRole("link", { name: "Privacy" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Terms" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Support" })).toBeVisible();

  await page.goto("/privacy");
  await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
  await expect(page.getByRole("link", { name: "App Store" })).toHaveAttribute(
    "href",
    /apps\.apple\.com/,
  );

  await page.goto("/terms");
  await expect(
    page.getByRole("heading", { name: "Terms of Service" }),
  ).toBeVisible();

  await page.goto("/support");
  await expect(page.getByRole("heading", { name: "Support" })).toBeVisible();
  await expect(page.getByText("support@awaywegoapp.com")).toBeVisible();
});

test("referral invite page preserves the code and links into the app", async ({
  page,
}) => {
  await page.goto("/invite/Friend15");

  await expect(
    page.getByRole("heading", { name: "Give $15, Get $15" }),
  ).toBeVisible();
  await expect(page.getByText("FRIEND15", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Use code FRIEND15 at checkout."),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy code" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open Away We Go" }),
  ).toHaveAttribute("href", "awaywego://invite/FRIEND15");
});

test("postboy vespa starts near the hero video and follows the mouse", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");

  const postboy = page.getByTestId("postboy-vespa-chaser");
  await expect(postboy).toBeVisible();

  const startBox = await postboy.boundingBox();

  expect(startBox).not.toBeNull();

  if (!startBox) {
    throw new Error("Postboy Vespa did not render.");
  }

  expect(startBox.x).toBeGreaterThan(900);
  expect(startBox.y).toBeLessThan(180);
  expect(startBox.width).toBeGreaterThan(90);

  const routePath = page.getByTestId("postboy-route-path");

  await page.mouse.move(980, 220);

  await expect
    .poll(async () => routePath.getAttribute("d"), { timeout: 600 })
    .toMatch(/[LQ]/);
  await expect
    .poll(
      async () =>
        routePath.evaluate((element) => Number(getComputedStyle(element).opacity)),
      { timeout: 600 },
    )
    .toBeGreaterThan(0.1);

  await page.waitForTimeout(320);
  const fixedRoutePath = await routePath.getAttribute("d");

  expect(fixedRoutePath).not.toBeNull();

  if (!fixedRoutePath) {
    throw new Error("Postboy route did not render.");
  }

  await page.waitForTimeout(300);
  await expect
    .poll(async () => routePath.getAttribute("d"))
    .toBe(fixedRoutePath);

  await page.mouse.move(220, 520, { steps: 12 });

  await expect
    .poll(async () => {
      const box = await postboy.boundingBox();

      if (!box) {
        return 0;
      }

      return startBox.x - box.x;
    })
    .toBeGreaterThan(20);

  await expect
    .poll(async () => routePath.getAttribute("d"))
    .toMatch(/[LQ]/);
  await expect
    .poll(async () =>
      routePath.evaluate((element) => Number(getComputedStyle(element).opacity)),
    )
    .toBeGreaterThan(0.1);

  const trails = page.getByTestId("postboy-motion-trails");

  await expect
    .poll(async () =>
      trails.evaluate((element) => Number(getComputedStyle(element).opacity)),
    )
    .toBeGreaterThan(0.1);
});

test("postboy vespa respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.getByTestId("postboy-vespa-chaser")).toHaveCount(0);
  await expect(page.getByTestId("postboy-route-layer")).toHaveCount(0);
});

test("apple app site association exposes referral invite paths", async ({
  request,
}) => {
  const response = await request.get(
    "/.well-known/apple-app-site-association",
    { maxRedirects: 0 },
  );

  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/json");
  expect(await response.json()).toEqual({
    applinks: {
      apps: [],
      details: [
        {
          appIDs: ["5CC3T43XKF.com.sebdeluca.TravelStack"],
          components: [
            {
              "/": "/invite/*",
            },
          ],
        },
      ],
    },
  });
});

test("referral invite page rejects malformed codes", async ({ request }) => {
  const response = await request.get("/invite/friend_15");

  expect(response.status()).toBe(404);
});
