import { expect, test } from "@playwright/test"

const previewCases = [
  "bygg-32-341",
  "bygg-42-221",
  "bygg-stasjonsveien-1",
  "bygg-slottsplassen-1",
  "bygg-109-8",
]

test.describe("BYG0011 preview visual regression", () => {
  for (const testCase of previewCases) {
    test(`matches snapshot for ${testCase}`, async ({ page }) => {
      await page.goto(`/BYG0011/${testCase}`)

      await expect(page.locator(".preview-page")).toBeVisible()
      await expect(page.locator(".preview-header")).toBeVisible()

      // Wait one animation frame so layout and webfonts stabilize.
      await page.evaluate(async () => {
        await new Promise((resolve) =>
          requestAnimationFrame(() => resolve(null)),
        )
      })

      await expect(page.locator(".preview-page")).toHaveScreenshot(
        `${testCase}.png`,
        {
          animations: "disabled",
        },
      )
    })
  }
})
