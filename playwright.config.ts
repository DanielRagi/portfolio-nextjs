import { defineConfig, devices } from "@playwright/test"

const PORT = 3100
const baseURL = `http://localhost:${PORT}`

/**
 * These run against a production build, not `next dev` — the overlay depends
 * on route interception and static generation, and dev-only behaviour would
 * make the results meaningless.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `npx next build && npx next start --port ${PORT}`,
    url: `${baseURL}/en`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
