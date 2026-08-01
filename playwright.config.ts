import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT ?? 3000);

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "on-first-retry",
  },
  webServer: {
    command: `pnpm dev --port ${port}`,
    port,
    reuseExistingServer: true,
    env: {
      NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: "phc_test",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
