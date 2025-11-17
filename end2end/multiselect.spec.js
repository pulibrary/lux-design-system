// @ts-check
import { test, expect } from "@playwright/test"

test("Shows the asynchronous results for a MultiSelect", async ({ page }) => {
  await page.goto("http://localhost:5002/examples/multiselect.html")

  // Expect a title "to contain" a substring.
  await expect(page.locator("body")).toContainText("Wikipedia pages")
  await page.getByLabel("Wikipedia pages").fill("a")
  await page.getByLabel("Wikipedia pages").fill("b")
  await page.getByLabel("Wikipedia pages").fill("c")
  await page.getByLabel("Wikipedia pages").fill("Frog")
  await page.waitForTimeout(3000)
  await expect(page.locator(".lux-autocomplete-results")).toBeVisible()
  await expect(page.locator("body")).toContainText("Frog legs")
  await expect(page.locator("body")).not.toContainText("Loading results")
  await page.getByLabel("Wikipedia pages").press("ArrowDown")
  await page.getByLabel("Wikipedia pages").press("ArrowDown")
  await page.getByLabel("Wikipedia pages").press("Enter")
  await expect(page.locator("lux-autocomplete-results")).not.toBeVisible()
  await expect(page.locator(".selected-items")).toContainText("Frog legs")
  await expect(page.locator("input[name=all_selected]")).toHaveValue(
    '[{"label":"Frog legs","id":543812}]'
  )
  await page.getByLabel("Wikipedia pages").fill("Cat")
  await expect(page.locator(".lux-autocomplete-results")).toBeVisible()
  await expect(page.locator("body")).not.toContainText("Loading results")
  await page.getByLabel("Wikipedia pages").press("ArrowDown")
  await page.getByLabel("Wikipedia pages").press("ArrowDown")
  await page.getByLabel("Wikipedia pages").press("Enter")
  await expect(page.locator("lux-autocomplete-results")).not.toBeVisible()
  await expect(page.locator(".selected-items")).toContainText("Catholic Church")
  await expect(page.locator("input[name=all_selected]")).toHaveValue(
    '[{"label":"Frog legs","id":543812},{"label":"Catholic Church","id":606848}]'
  )
})
