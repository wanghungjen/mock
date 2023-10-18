// We referenced the playwright official docs: https://playwright.dev/

import { test, expect } from "@playwright/test";

/* ERROR VIEWS */

test("alert when I view before load", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");

  page.on("dialog", async (alert) => {
    const text = alert.message();
    expect(text).toBe("File not loaded");
    await alert.dismiss();
  });

  await page.getByRole("button").click();
});

/* SUCCESSFUL VIEWS */

test("view successful after loading filepath_with_headers", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file filepath_with_headers");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toHaveText(
    "MODE BRIEFNameAgeColorJack18BrownMichael25GreenJerry42OrangeTime18Red"
  );
});

test("view successful after loading and searching filepath_with_headers", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file filepath_with_headers");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Age 18");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toHaveText(
    "MODE BRIEFJack18BrownTim18RedNameAgeColorJack18BrownMichael25GreenJerry42OrangeTime18Red"
  );
});

test("view successful after two distinct loads", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file filepath_without_headers");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file filepath_with_headers");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toHaveText(
    "MODE BRIEFNameAgeColorJack18BrownMichael25GreenJerry42OrangeTime18Red"
  );
});
