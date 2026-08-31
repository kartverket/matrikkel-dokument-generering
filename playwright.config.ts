/// <reference types="node" />

import { defineConfig, devices } from "@playwright/test"

const pdfLikeViewport = {
  // Keep width above 900px to avoid triggering preview mobile styles.
  // A4 landscape ratio (297x210) in CSS pixels for stable PDF-like rendering.
  width: 1414,
  height: 1000,
}

export default defineConfig({
  testDir: "./visual-tests",
  testMatch: "**/*.pw.ts",
  snapshotPathTemplate:
    "{testDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      scale: "css",
      // One shared baseline across OS needs tolerance for rasterization differences.
      maxDiffPixelRatio: 0.02,
    },
  },
  use: {
    baseURL: "http://127.0.0.1:5173",
    locale: "nb-NO",
    timezoneId: "Europe/Oslo",
    colorScheme: "light",
    trace: "on-first-retry",
  },
  webServer: {
    command: "bun run dev",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium-pdf",
      use: {
        ...devices["Desktop Chrome"],
        viewport: pdfLikeViewport,
        deviceScaleFactor: 1,
      },
    },
  ],
})
