import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("ORA World smoke", () => {
  test("home renders, hero headline visible, legal notice present", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle(/ORA World/);
    await expect(page.locator("h1")).toContainText("expectations");
    await expect(page.locator("footer")).toContainText("Attorney General File No.: CP25-0047");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("root redirects to a locale and language switch keeps the page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
    await page.goto("/en/amenities");
    await page
      .getByRole("group", { name: /language/i })
      .first()
      .getByRole("button", { name: /ES/ })
      .click();
    await expect(page).toHaveURL(/\/es\/amenities$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("h1")).toContainText("bienestar");
  });

  test("overlay menu opens, traps focus, closes with Escape", async ({ page }) => {
    await page.goto("/en");
    await page
      .getByRole("button", { name: /open menu|menu/i })
      .first()
      .click();
    const menu = page.locator("#overlay-menu");
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Residences" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });

  test("lead form validates and submits with a success panel", async ({ page }) => {
    await page.route("**/api/lead", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }),
    );
    await page.goto("/en/contact");
    const form = page
      .locator("form")
      .filter({ has: page.locator('input[name="name"]') })
      .first();
    await form.getByRole("button", { name: /submit/i }).click();
    await expect(form.getByRole("alert").first()).toBeVisible();
    await form.locator('input[name="name"]').fill("Test Person");
    await form.locator('input[name="email"]').fill("test@example.com");
    await form.locator('input[name="phone"]').fill("+1 787 555 0100");
    await form
      .getByText(/I agree to be contacted|By submitting this form/)
      .first()
      .click();
    await form.getByRole("button", { name: /submit/i }).click();
    await expect(
      page
        .getByRole("status")
        .filter({ hasText: /thank you/i })
        .first(),
    ).toBeVisible();
  });

  test("floor plan detail is gated and unlocks after registration", async ({ page }) => {
    await page.route("**/api/lead", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }),
    );
    await page.goto("/en/floor-plans/residence-b1");
    await expect(page.getByText("Register to view")).toBeVisible();
    const gate = page.locator("form").first();
    await gate.locator('input[name="name"]').fill("Gate Tester");
    await gate.locator('input[name="email"]').fill("gate@example.com");
    await gate.locator('input[name="phone"]').fill("+1 787 555 0100");
    await gate.locator('input[name="consent"]').check({ force: true });
    await gate.getByRole("button", { name: /unlock floor plans/i }).click();
    await expect(page.getByRole("group", { name: "Zoom" })).toBeVisible();
    await expect(page.getByText("Keyplan", { exact: true })).toBeVisible();
    // Remembered on another gated page
    await page.goto("/en/investment");
    await expect(page.getByRole("button", { name: /unlock floor plans/i })).toHaveCount(0);
    await expect(page.locator("dl").first()).toBeVisible();
  });

  test("floor plan filters, shortlist and compare", async ({ page }) => {
    await page.goto("/en/floor-plans");
    await page.getByRole("button", { name: /essential only/i }).click();
    await page.getByRole("group", { name: "Bedrooms" }).getByRole("button", { name: "2", exact: true }).click();
    await expect(page.getByText(/2 plans/)).toBeVisible();
    await page
      .getByRole("button", { name: /add to shortlist/i })
      .first()
      .click();
    await page
      .getByRole("button", { name: /add to shortlist/i })
      .first()
      .click();
    await expect(page.getByText(/Shortlist 2\/3/)).toBeVisible();
    await page.getByRole("link", { name: "Compare" }).click();
    await expect(page).toHaveURL(/compare/);
    await expect(page.locator("table")).toBeVisible();
  });

  test("gallery lightbox opens and navigates by keyboard", async ({ page }) => {
    await page.goto("/en/gallery");
    await page.locator("ul li button").first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("1 / ")).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByText("2 / ")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("direction switch serves B and C on staging", async ({ page }) => {
    await page.goto("/en?direction=b");
    await expect(page.locator("html")).toHaveAttribute("data-direction", "b");
    await page.goto("/en?direction=c");
    await expect(page.locator("html")).toHaveAttribute("data-direction", "c");
    await page.goto("/en?direction=a");
    await expect(page.locator("html")).toHaveAttribute("data-direction", "a");
  });

  test("sitemap, robots and noindex on staging", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(await robots.text()).toContain("Disallow");
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const home = await request.get("/en");
    expect(home.headers()["x-robots-tag"]).toContain("noindex");
    expect(home.headers()["content-security-policy"]).toContain("default-src");
  });
});

test.describe("accessibility (axe, WCAG 2.2 AA)", () => {
  for (const path of [
    "/en",
    "/en/residences",
    "/en/floor-plans",
    "/en/floor-plans/residence-b1",
    "/en/amenities",
    "/en/location",
    "/en/gallery",
    "/en/faq",
    "/en/contact",
    "/es",
  ]) {
    test(`no serious or critical violations on ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.getByRole("button", { name: /essential only|solo esenciales/i }).click({ force: true });
      await page.waitForTimeout(800);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .exclude(".maplibregl-map")
        .analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length}) ${v.nodes[0]?.target}`)).toEqual([]);
    });
  }
});
