// @ts-check
import { test, expect } from "@playwright/test"

test("has the Wiki Page Select", async ({ page }) => {
  await page.goto("http://localhost:5002/examples/singleselectasync.html")

  // The default value shows in the select input and the hidden input slot
  await expect(page.getByLabel("Wikipedia page")).toHaveValue("frog")
  await expect(page.locator("#wiki_id")).toHaveValue("123")
  await expect(page.locator("#wiki_label")).toHaveValue("frog")

  // we get no drop down if we type nothing
  await page.getByLabel("Wikipedia page").click()
  await expect(page.locator(".lux-autocomplete-results")).toBeVisible()
  await page.getByLabel("Wikipedia page").fill("")
  await expect(page.locator(".lux-autocomplete-results")).toBeHidden()
  await expect(page.locator("#wiki_id")).toHaveValue("")
  await expect(page.locator("#wiki_label")).toHaveValue("")

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

  //  the hidden input slot gets updated with the value chosen
  await expect(page.locator("#wiki_id")).toHaveValue("5533631")
  await expect(page.locator("#wiki_label")).toHaveValue("Tesla, Inc.")
})
