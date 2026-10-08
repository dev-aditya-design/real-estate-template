import { test, expect } from "@playwright/test";
import {
  business,
  budgets,
  categories,
  locations,
  properties,
  purposes,
} from "../src/data.js";

const cards = (page) => page.locator(".property-card");
const routes = [
  "/",
  "/properties",
  "/residential",
  "/commercial",
  "/plots-land",
  "/about",
  "/contact",
];
const errors = [];
test.beforeEach(async ({ page }) => {
  errors.length = 0;
  page.on("pageerror", (error) => errors.push(error.message));
});
test.afterEach(() => expect(errors).toEqual([]));

test("all navigation routes render; unknown pages and properties show 404", async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page).toHaveTitle(/Aurevia Estates/);
    await expect(page.locator("header .brand")).toContainText("AUREVIA");
    await page.locator('header nav a[href="/about"]').click();
    await expect(page.locator("main h1")).toContainText(
      "A world of possibilities",
    );
  }
  for (const route of ["/missing", "/properties/missing"]) {
    await page.goto(route);
    await expect(
      page.getByText("PAGE NOT FOUND", { exact: true }),
    ).toBeVisible();
    await page
      .getByRole("link", {
        name: "Explore demonstration properties",
        exact: true,
      })
      .click();
    await expect(cards(page)).toHaveCount(6);
  }
});

test("each demonstration listing renders details and opens a safe property enquiry", async ({
  page,
}) => {
  for (const property of properties) {
    await page.goto(`/properties/${property.id}`);
    await expect(page.locator("h1")).toHaveText(property.name);
    await expect(page.locator(".detail-hero .concept-tag")).toHaveText(
      "Demonstration Listing",
    );
    await expect
      .poll(() =>
        page
          .locator(".detail-hero > img")
          .evaluate((img) => img.complete && img.naturalWidth > 0),
      )
      .toBe(true);
    await page
      .getByRole("link", { name: "Preview a property enquiry", exact: true })
      .click();
    await expect(page).toHaveURL(
      new RegExp(`/contact\\?property=${property.id}$`),
    );
    await expect(page.locator("#field-message")).toHaveValue(
      new RegExp(property.name),
    );
    await expect(page.locator(".enquiry-context")).toContainText(property.name);
    await expect(page.locator(".contact-list")).toContainText(business.phone);
    await expect(page.locator(".contact-list")).toContainText(business.email);
    await expect(
      page.locator(
        'a[href^="tel:"],a[href^="mailto:"],a[href*="wa.me"],a[href*="whatsapp"]',
      ),
    ).toHaveCount(0);
  }
});

test("all four filters intersect, persist on reload, reset, and show empty results", async ({
  page,
}) => {
  await page.goto("/properties");
  await expect(cards(page)).toHaveCount(6);
  await expect(page.locator(".property-card .concept-tag")).toHaveCount(6);
  for (const property of properties) {
    await page.getByRole("button", { name: "Clear filters" }).click();
    const filters = {};
    for (const [key, label] of [
      ["location", "Location"],
      ["type", "Property type"],
      ["purpose", "Purpose"],
      ["budget", "Sample budget"],
    ]) {
      filters[key] = property[key];
      await page.getByLabel(label, { exact: true }).selectOption(property[key]);
      const matches = properties.filter((p) =>
        Object.entries(filters).every(([k, v]) => p[k] === v),
      );
      await expect(cards(page)).toHaveCount(matches.length);
    }
    await expect(cards(page).first()).toContainText(property.name);
    await page.reload();
    await expect(cards(page)).toHaveCount(1);
    for (const [key, value] of Object.entries(filters))
      expect(new URL(page.url()).searchParams.get(key)).toBe(value);
  }
  await page.getByLabel("Location", { exact: true }).selectOption(locations[0]);
  await expect(cards(page)).toHaveCount(0);
  await expect(
    page.getByText("No demonstration listings match these filters."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(cards(page)).toHaveCount(6);
  expect(new URL(page.url()).search).toBe("");
});

test("categories remain scoped when navigating and query filtering", async ({
  page,
}) => {
  await page.goto("/");
  for (const category of categories) {
    await page.locator(`header nav a[href="/${category.slug}"]`).click();
    await expect(cards(page)).toHaveCount(2);
    const expected = properties.filter((p) => p.category === category.slug);
    for (const property of expected)
      await expect(cards(page).filter({ hasText: property.name })).toHaveCount(
        1,
      );
    await page
      .getByLabel("Property type", { exact: true })
      .selectOption(expected[0].type);
    await expect(cards(page)).toHaveCount(1);
  }
  await page.goto(
    `/properties?${new URLSearchParams({ location: locations[0], purpose: "Self Use" })}`,
  );
  await expect(cards(page)).toHaveCount(2);
});

async function fillEnquiry(page) {
  await page.getByLabel("Your name").fill("Example & Visitor");
  await page.getByLabel("Phone number").fill("+1 202 555 0147");
  await page.getByLabel("Preferred location").selectOption(locations[0]);
  await page.getByLabel("Budget preference").selectOption(budgets[0]);
  await page
    .getByRole("combobox", { name: "Purpose", exact: true })
    .selectOption(purposes[0]);
  await page
    .getByLabel("Your message")
    .fill("Looking for a home & plot. Budget ₹45 lakh?");
}

test("form validates inputs, previews, copies and downloads without sending", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contact");
  await page
    .getByRole("button", { name: "Preview enquiry", exact: true })
    .click();
  await expect(page.locator(".field-error")).toHaveCount(6);
  await expect(page.locator("#field-name")).toBeFocused();
  await expect(page.locator(".form-success")).toHaveCount(0);
  await fillEnquiry(page);
  for (const phone of [
    "letters 5550147",
    "12345",
    "+1+2025550147",
    "1234567890123456",
  ]) {
    await page.getByLabel("Phone number").fill(phone);
    await page
      .getByRole("button", { name: "Preview enquiry", exact: true })
      .click();
    await expect(page.locator("#field-phone")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.locator(".form-success")).toHaveCount(0);
  }
  await page.getByLabel("Phone number").fill("+1 202 555 0147");
  const requests = [];
  page.on("request", (request) => requests.push(request.url()));
  await page
    .getByRole("button", { name: "Preview enquiry", exact: true })
    .click();
  await expect(page.locator(".field-error")).toHaveCount(0);
  await expect(page.getByRole("status")).toContainText(
    "Nothing has been sent or stored",
  );
  const text = await page
    .getByLabel("Enquiry preview", { exact: true })
    .inputValue();
  expect(text).toContain("Aurevia Estates");
  expect(text).toContain("Example & Visitor");
  expect(text).toContain("Looking for a home & plot. Budget ₹45 lakh?");
  await page.getByRole("button", { name: "Copy enquiry", exact: true }).click();
  await expect(
    page.getByText("Enquiry copied to your clipboard. Nothing has been sent."),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(text);
  const downloaded = page.waitForEvent("download");
  await page
    .getByRole("link", { name: "Download enquiry", exact: true })
    .click();
  const download = await downloaded;
  expect(download.suggestedFilename()).toBe("aurevia-demo-enquiry.txt");
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  expect(Buffer.concat(chunks).toString()).toBe(text);
  expect(requests).toEqual([]);
  await page
    .getByLabel("Your message")
    .fill("Updated demonstration requirements for a shop.");
  await expect(page.locator(".form-success")).toHaveCount(0);
});

test("clipboard failure offers manual copy; preview is not stored on reload", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async () => {
          throw new Error("Clipboard unavailable");
        },
      },
    });
  });
  await page.goto("/contact");
  await fillEnquiry(page);
  await page
    .getByRole("button", { name: "Preview enquiry", exact: true })
    .click();
  await page.getByRole("button", { name: "Copy enquiry", exact: true }).click();
  await expect(page.getByText(/Clipboard access is unavailable/)).toBeVisible();
  await expect(
    page.getByLabel("Enquiry preview", { exact: true }),
  ).toBeFocused();
  await page.reload();
  await expect(page.getByLabel("Your name")).toHaveValue("");
  await expect(page.locator(".form-success")).toHaveCount(0);
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`responsive layout, images and contact links at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [...routes, `/properties/${properties[2].id}`]) {
      await page.goto(route);
      for (const img of await page.locator("img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0))
          .toBe(true);
      }
      await page.locator("footer").scrollIntoViewIfNeeded();
      await expect
        .poll(async () =>
          page
            .locator("img")
            .evaluateAll((images) =>
              images.every((img) => img.complete && img.naturalWidth > 0),
            ),
        )
        .toBe(true);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(
        page.locator(
          'a[href^="tel:"],a[href^="mailto:"],a[href*="wa.me"],a[href*="whatsapp"]',
        ),
      ).toHaveCount(0);
      await expect(page.locator("footer")).toContainText(business.email);
      await expect(page.locator(".floating-enquiry")).toHaveAttribute(
        "href",
        "/contact",
      );
    }
    if (width <= 900) {
      await page.goto("/");
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(page.locator("header nav")).toBeVisible();
      await page.locator('header nav a[href="/commercial"]').click();
      await expect(page).toHaveURL(/\/commercial$/);
      await expect(
        page.getByRole("button", { name: "Open menu" }),
      ).toHaveAttribute("aria-expanded", "false");
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.keyboard.press("Escape");
      await expect(page.locator("header nav")).toBeHidden();
    }
  });
}
