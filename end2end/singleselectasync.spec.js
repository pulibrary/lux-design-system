// @ts-check
import { test, expect } from "@playwright/test"

test("has the Animal Select", async ({ page }) => {
  await page.goto("http://localhost:5002/examples/singleselectasync.html")

  // Expect a title "to contain" a substring.
  await expect(page.locator("body")).toContainText("Wikipedia page")
  await page.getByLabel("Wikipedia page").fill("t")
  await page.getByLabel("Wikipedia page").fill("te")
  await page.getByLabel("Wikipedia page").fill("testi")
  await page.getByLabel("Wikipedia page").fill("Tes")
  await page.waitForTimeout(3000)
  await expect(page.locator("body")).toContainText("Tesla")
  await page.getByLabel("Wikipedia page").press("ArrowDown")
  await page.getByLabel("Wikipedia page").press("ArrowDown")
  await page.getByLabel("Wikipedia page").press("Enter")
  await expect(page.getByLabel("Wikipedia page")).toHaveValue("Tesla, Inc.")
})
