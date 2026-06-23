import { expect, test } from "@playwright/test";

test("homepage and legal pages render the required public content", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Away We Go" })).toBeVisible();
  await expect(
    page.getByText("YOUR TRIP · YOUR BOOK · SHIPPED"),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Privacy" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Terms" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Support" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Email address" })).toBeVisible();
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("traveler@example.com");
  await page.getByRole("button", { name: "Join the waitlist" }).click();
  await expect(
    page.getByText("Thanks. You are on the list for first access."),
  ).toBeVisible();

  await page.goto("/privacy");
  await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();

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
