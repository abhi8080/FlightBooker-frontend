import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.afterEach(async () => {});

test("A flight is bookable", async ({ page }) => {
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
  await page.getByRole("button", { name: "Book Flight" }).click();

  const field = await page.waitForSelector(
    'input[type="number"].form-control#flightId[disabled]'
  );

  expect(field).not.toBe(null);
});

test("'All fields are required' is shown if some field(s) are missing", async ({
  page,
}) => {
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
  await page.getByRole("button", { name: "Book Flight" }).click();
  await page.getByRole("button", { name: "Book" }).click();

  const errorMessage = await page.waitForSelector(".alert-danger");

  expect(await errorMessage.innerText()).toBe("All fields are required");
});

test("A flight is successfully booked", async ({ page }) => {
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
  await page.getByRole("button", { name: "Book Flight" }).click();
  await page.locator('input[name="name"]').first().click();
  await page.locator('input[name="name"]').first().fill("Test Name");
  await page.locator('input[name="email"]').first().click();
  await page.locator('input[name="email"]').first().fill("testmail@gmail.com");
  await page.locator('input[name="name"]').nth(1).click();
  await page.locator('input[name="name"]').nth(1).fill("Test 1");
  await page.locator('input[name="email"]').nth(1).click();
  await page.locator('input[name="email"]').nth(1).fill("test1@gmail.com");
  await page.getByRole("button", { name: "Book" }).click();

  const successMessage = await page.waitForSelector(".alert-success");

  expect(await successMessage.innerText()).toContain(
    "Your flight is successfully booked. Your booking number is:"
  );
});
