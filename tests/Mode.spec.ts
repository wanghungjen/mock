// We referenced the playwright official docs: https://playwright.dev/

import { test, expect } from "@playwright/test";

/* ERROR MODE CHANGES */

test("Incorrect mode state", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode intermediate");

  page.on("dialog", async (alert) => {
    const text = alert.message();
    expect(text).toBe("Please enter 'brief' or 'verbose'");
    await alert.dismiss();
  });

  await page.getByRole("button").click();
});

/* SUCCESSFUL MODE CHANGES */

test("mode brief is defaulted", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  const value = page.getByLabel("history");

  await expect(value).toHaveText("MODE BRIEF");
});

test("mode verbose switches correctly", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode verbose");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toHaveText("MODE VERBOSE");
});
