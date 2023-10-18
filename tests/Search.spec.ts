// We referenced the playwright official docs: https://playwright.dev/

import { test, expect } from "@playwright/test";

/* ERROR SEARCHES */

test("alert when I search before load", async ({ page }) => {
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

test("alert when there are no searches found for the given file", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file filepath_without_headers");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Age 18");

  page.on("dialog", async (alert) => {
    const text = alert.message();
    expect(text).toBe("No searches found given column Age and search 18");
    await alert.dismiss();
  });

  await page.getByRole("button").click();
});

/* SUCCESSFUL SEARCHES */

test("search successful after loading filepath_without_headers on column 2 for value 'to' ", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file filepath_without_headers");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 2 to");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toHaveText("MODE BRIEFIliketoeatfoodSayhellototheworld");
});

test("search successful after loading filepath_with_headers on header Age for value '18' ", async ({
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

  const value = page.getByLabel("history");

  await expect(value).toHaveText("MODE BRIEFJack18BrownTim18Red");
});

test("search successful after loading and viewing filepath_with_headers", async ({
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

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Age 18");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toHaveText(
    "MODE BRIEFNameAgeColorJack18BrownMichael25GreenJerry42OrangeTime18RedJack18BrownTim18Red"
  );
});

test("search successful after loading and searching another file", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file filepath_without_headers");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 2 to");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file filepath_with_headers");

  await page.getByRole("button").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Age 18");

  await page.getByRole("button").click();

  const value = page.getByLabel("history");

  await expect(value).toHaveText(
    "MODE BRIEFIliketoeatfoodSayhellototheworldJack18BrownTim18Red"
  );
});
