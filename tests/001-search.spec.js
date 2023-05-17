import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.afterEach(async () => {});

test("A flight is available when searching", async ({ page }) => {
  await page
    .getByRole("combobox", { name: "Departure Airport" })
    .selectOption("1");
  await page
    .getByRole("combobox", { name: "Arrival Airport" })
    .selectOption("2");
  await page
    .getByRole("combobox", { name: "Number of Passengers" })
    .selectOption("2");
  await page.getByRole("combobox", { name: "Date" }).selectOption("2023-04-13");
  await page.getByRole("button", { name: "Search" }).click();
  await page.waitForSelector('button[type="button"]');
  const button = await page.$('button[type="button"]');
  const buttonText = await button.textContent();
  expect(buttonText).toBe(" Book Flight ");
});
