// @ts-check
import { test, expect } from "@playwright/test"

test("has the Animal Select", async ({ page }) => {
  await page.goto("http://localhost:5002/examples/singleselect.html")

  // Expect a title "to contain" a substring.
  await expect(page.locator("body")).toContainText("Animals")
  await page.getByLabel("Animals").fill("")
  await page.getByLabel("Animals").press("ArrowDown")
  await page.getByLabel("Animals").press("ArrowDown")
  await page.getByLabel("Animals").press("Enter")
  await expect(page.getByLabel("Animals")).toHaveValue("bear")
})
