/**
 * Capture every top-level section of a page as a viewport screenshot after scrolling it into view
 * (works around Chromium's full-page height limit and exercises scroll-driven motion).
 * usage: node scripts/sections.mjs <outDir> <path> [desktop|mobile|both]
 */
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const [outDir, path, which = "both"] = process.argv.slice(2);
const base = process.env.BASE_URL || "http://localhost:3000";
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const vps = [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]].filter(([n]) => which === "both" || which === n);
for (const [name, vp] of vps) {
  const ctx = await browser.newContext({ viewport: vp, isMobile: name === "mobile", hasTouch: name === "mobile" });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + path, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  const count = await page.evaluate(() => document.querySelectorAll("main > section, main > div > section, footer").length);
  for (let i = 0; i < count; i++) {
    const top = await page.evaluate((i) => {
      const els = document.querySelectorAll("main > section, main > div > section, footer");
      const r = els[i].getBoundingClientRect();
      return r.top + window.scrollY;
    }, i);
    // scroll gradually so ScrollTrigger reveals fire
    await page.evaluate(async (top) => {
      const start = window.scrollY;
      const steps = 12;
      for (let s = 1; s <= steps; s++) {
        window.scrollTo(0, start + ((top - start) * s) / steps);
        await new Promise((r) => setTimeout(r, 60));
      }
    }, top);
    await page.waitForTimeout(1400);
    const file = `${outDir}/${name}-${String(i).padStart(2, "0")}.png`;
    await page.screenshot({ path: file });
    console.log(file);
  }
  if (errors.length) console.log("PAGE ERRORS:", errors.join(" | ").slice(0, 500));
  await ctx.close();
}
await browser.close();
