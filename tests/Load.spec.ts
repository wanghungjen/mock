// We referenced the playwright official docs: https://playwright.dev/

import { test, expect } from "@playwright/test";

/* ERROR LOADS */

test("alert when filepath is incorrect", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file filepath_wrong");

  page.on("dialog", async (alert) => {
    const text = alert.message();
    expect(text).toBe("File not found");
    await alert.dismiss();
  });

  await page.getByRole("button").click();
});

/* SUCCESSFUL LOADS */

test("load a filepath_with_headers", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode verbose");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file filepath_with_headers");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toHaveText(
    "MODE VERBOSELoaded file: filepath_with_headers"
  );
});

test("load a filepath_without_headers", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode verbose");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file filepath_without_headers");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toHaveText(
    "MODE VERBOSELoaded file: filepath_without_headers"
  );
});

test("load both files and both are present in history", async ({ page }) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode verbose");

  await page.getByRole("button").click();

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

  const value = page.getByLabel("history");

  await expect(value).toHaveText(
    "MODE VERBOSELoaded file: filepath_without_headersLoaded file: filepath_with_headers"
  );
});
