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
  await expect(
    page.getByRole("heading", { name: "Privacy Policy" }),
  ).toBeVisible();
  await expect(
    page.getByText("We do not sell your personal information."),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Home", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Away We Go home" }),
  ).toHaveAttribute("href", "/");
  await expect(page.getByText("travel journal app")).toHaveCount(0);
  await expect(page.getByText("Join the list")).toHaveCount(0);
  await expect(page.getByText("Made for wanderers.")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Contact" })).toHaveCount(0);

  await page.goto("/privacy");
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Your trip should be a coffee table book.",
    }),
  ).toBeVisible();

  await page.goto("/privacy");
  await expect(
    page.getByRole("link", { name: "Support", exact: true }),
  ).toHaveAttribute("href", "/support");

  await page.goto("/terms");
  await expect(
    page.getByRole("heading", { name: "Terms of Service" }),
  ).toBeVisible();
  await expect(
    page.getByText("You are responsible for the content"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Home", exact: true }),
  ).toBeVisible();

  await page.goto("/support");
  await expect(page.getByRole("heading", { name: "Support" })).toBeVisible();
  await expect(page.getByText("support@awaywegoapp.com")).toBeVisible();
  await expect(
    page.getByText("Include as much detail as you can"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Home", exact: true }),
  ).toBeVisible();
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

test("postboy reward entrance uses the slower win animation", async ({ page }) => {
  await page.goto("/");

  const animationDuration = await page.evaluate(() => {
    const element = document.createElement("div");
    element.className = "postboy-reward-postboy";
    document.body.appendChild(element);
    const duration = getComputedStyle(element).animationDuration;
    element.remove();

    return duration;
  });

  expect(animationDuration).toBe("1.53s");
});

test("postboy vespa starts above the headline, follows the mouse, and returns home after idle", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");

  await page.getByTestId("postboy-game-control").click();

  const headline = page.getByRole("heading", {
    name: "Your trip should be a coffee table book.",
  });
  const postboy = page.getByTestId("postboy-vespa-chaser");
  const sprite = page.getByTestId("postboy-vespa-sprite");
  await expect(postboy).toBeVisible();

  const headlineBox = await headline.boundingBox();
  const startBox = await postboy.boundingBox();

  expect(headlineBox).not.toBeNull();
  expect(startBox).not.toBeNull();

  if (!headlineBox || !startBox) {
    throw new Error("Postboy Vespa or headline did not render.");
  }

  expect(startBox.x).toBeGreaterThan(headlineBox.x + 20);
  expect(startBox.x).toBeLessThan(headlineBox.x + 160);
  expect(startBox.y).toBeLessThan(headlineBox.y + 20);
  expect(startBox.y + startBox.height).toBeLessThan(
    headlineBox.y + headlineBox.height * 0.72,
  );
  expect(startBox.y + startBox.height).toBeGreaterThan(headlineBox.y - 80);
  expect(startBox.width).toBeGreaterThan(90);
  await expect
    .poll(async () =>
      sprite.evaluate((element) => {
        const transform = getComputedStyle(element).transform;
        const match = transform.match(/matrix\(([^,]+)/);

        return Number(match?.[1] ?? 1);
      }),
    )
    .toBeLessThan(-0.95);

  const routePath = page.getByTestId("postboy-route-path");

  await page.mouse.move(260, 520);

  await expect
    .poll(async () => routePath.getAttribute("d"), { timeout: 1500 })
    .toMatch(/[LQ]/);
  await expect
    .poll(
      async () =>
        routePath.evaluate((element) => Number(getComputedStyle(element).opacity)),
      { timeout: 1500 },
    )
    .toBeGreaterThan(0.1);

  await page.waitForTimeout(320);
  const fixedRoutePath = await routePath.getAttribute("d");

  expect(fixedRoutePath).not.toBeNull();

  if (!fixedRoutePath) {
    throw new Error("Postboy route did not render.");
  }

  await page.waitForTimeout(200);
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
    .toBeLessThan(-20);

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

  await page.waitForTimeout(5200);

  await expect
    .poll(
      async () => {
        const box = await postboy.boundingBox();

        if (!box) {
          return Number.POSITIVE_INFINITY;
        }

        return Math.hypot(box.x - startBox.x, box.y - startBox.y);
      },
      { timeout: 7000 },
    )
    .toBeLessThan(90);
  await expect
    .poll(async () =>
      sprite.evaluate((element) => {
        const transform = getComputedStyle(element).transform;
        const match = transform.match(/matrix\(([^,]+)/);

        return Number(match?.[1] ?? 1);
      }),
    )
    .toBeLessThan(-0.95);
});

test("postboy postcard game spawns a target and increments the score", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");

  const score = page.getByTestId("postboy-game-score");
  await expect(score).toContainText("Play to Win a Free Book");
  await expect(score).toContainText("0/10");
  const timerText = await page.getByTestId("postboy-game-timer").textContent();
  const timerValue = Number(timerText?.replace("s", "") ?? 0);

  expect(timerValue).toBeGreaterThan(0);
  expect(timerValue).toBeLessThanOrEqual(30);
  await expect(page.getByTestId("postboy-game-control")).toHaveAttribute(
    "aria-label",
    "Stop postcard game",
  );

  const postboy = page.getByTestId("postboy-vespa-chaser");
  await expect(postboy).toBeVisible();

  const postcard = page.getByTestId("postboy-postcard");
  await expect(postcard).toBeVisible({ timeout: 2500 });

  const postboyBox = await postboy.boundingBox();
  const postcardBox = await postcard.boundingBox();

  expect(postboyBox).not.toBeNull();
  expect(postcardBox).not.toBeNull();

  if (!postboyBox) {
    throw new Error("Postboy Vespa did not render.");
  }

  if (!postcardBox) {
    throw new Error("Postboy postcard did not render.");
  }

  await page.mouse.move(
    postboyBox.x + postboyBox.width / 2,
    postboyBox.y + postboyBox.height / 2,
  );

  const postcardCenter = {
    x: postcardBox.x + postcardBox.width / 2,
    y: postcardBox.y + postcardBox.height / 2,
  };

  await page.mouse.move(postcardCenter.x, postcardCenter.y, { steps: 28 });

  await expect
    .poll(async () => {
      await page.mouse.move(postcardCenter.x, postcardCenter.y, { steps: 6 });
      const text = await page.getByTestId("postboy-game-count").textContent();

      return Number(text?.split("/")[0] ?? 0);
    }, {
      timeout: 15000,
    })
    .toBeGreaterThan(0);

  await page.getByTestId("postboy-game-control").click();
  await expect(page.getByTestId("postboy-game-control")).toHaveAttribute(
    "aria-label",
    "Play postcard game",
  );
  await expect(page.getByTestId("postboy-game-count")).toContainText("0/10");
  await expect(page.getByTestId("postboy-game-timer")).toContainText("30s");
  await expect(page.getByTestId("postboy-postcard")).toHaveCount(0);
});

test("postboy postcard game adds travel obstacles during active play", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");

  await expect(page.getByTestId("postboy-game-control")).toHaveAttribute(
    "aria-label",
    "Stop postcard game",
  );
  await expect(page.getByTestId("postboy-obstacle-open-suitcase")).toBeVisible({
    timeout: 5000,
  });
  await expect(page.getByTestId("postboy-obstacle-banana-peel")).toBeVisible();
  await expect(page.getByTestId("postboy-obstacle-rolling-luggage")).toBeVisible({
    timeout: 12000,
  });

  await page.getByTestId("postboy-game-control").click();
  await expect(page.getByTestId("postboy-game-control")).toHaveAttribute(
    "aria-label",
    "Play postcard game",
  );
  await expect(page.getByTestId("postboy-obstacle")).toHaveCount(0);
});

test("postboy obstacle collision temporarily stuns postboy", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/");

  const postboy = page.getByTestId("postboy-vespa-chaser");
  const obstacle = page.getByTestId("postboy-obstacle-open-suitcase");
  await expect(postboy).toBeVisible();
  await expect(obstacle).toBeVisible({ timeout: 5000 });

  const postboyBox = await postboy.boundingBox();
  const obstacleBox = await obstacle.boundingBox();

  expect(postboyBox).not.toBeNull();
  expect(obstacleBox).not.toBeNull();

  if (!postboyBox || !obstacleBox) {
    throw new Error("Postboy or suitcase obstacle did not render.");
  }

  const obstacleCenter = {
    x: obstacleBox.x + obstacleBox.width / 2,
    y: obstacleBox.y + obstacleBox.height / 2,
  };

  await page.mouse.move(
    postboyBox.x + postboyBox.width / 2,
    postboyBox.y + postboyBox.height / 2,
  );
  await page.mouse.move(obstacleCenter.x, obstacleCenter.y, { steps: 28 });

  await expect
    .poll(async () => {
      await page.mouse.move(obstacleCenter.x, obstacleCenter.y, { steps: 6 });

      return postboy.getAttribute("data-stun-kind");
    }, {
      timeout: 15000,
    })
    .toBe("open-suitcase");

  await expect(page.getByTestId("postboy-game-control")).toHaveAttribute(
    "aria-label",
    "Stop postcard game",
  );
  await expect(page.getByTestId("postboy-reward-modal")).toHaveCount(0);
  await expect
    .poll(async () => postboy.getAttribute("data-stun-kind"), {
      timeout: 4000,
    })
    .toBe("none");
});

test("postboy vespa respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.getByTestId("postboy-vespa-chaser")).toHaveCount(0);
  await expect(page.getByTestId("postboy-route-layer")).toHaveCount(0);
  await expect(page.getByTestId("postboy-game-score")).toHaveCount(0);
  await expect(page.getByTestId("postboy-postcard")).toHaveCount(0);
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
