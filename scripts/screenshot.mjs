/**
 * Capture pages at desktop (1440) and mobile (390) widths.
 * usage: node scripts/screenshot.mjs <outDir> <path> [path...]   (BASE_URL env, default http://localhost:3000)
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const [outDir, ...paths] = process.argv.slice(2);
const base = process.env.BASE_URL || "http://localhost:3000";
const full = process.env.FULL === "1";
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
for (const [name, vp] of [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
]) {
  const ctx = await browser.newContext({
    viewport: vp,
    deviceScaleFactor: 1,
    isMobile: name === "mobile",
    hasTouch: name === "mobile",
  });
  for (const p of paths) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.goto(base + p, { waitUntil: "load", timeout: 45000 });
    await page.waitForTimeout(1200);
    if (full) {
      // scroll through to trigger reveals, then back up
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(800);
    }
    const file = `${outDir}/${name}${p.replace(/[^a-z0-9]+/gi, "-") || "-root"}.png`;
    await page.screenshot({ path: file, fullPage: full });
    console.log(file, errors.length ? `ERRORS: ${errors.join(" | ").slice(0, 400)}` : "ok");
    await page.close();
  }
  await ctx.close();
}
await browser.close();
