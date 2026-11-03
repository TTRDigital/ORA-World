/**
 * Image sharpness audit: scrolls a page and flags every image whose downloaded width is smaller than
 * the pixels it covers on screen (object-fit: cover counted), at a phone (DPR 3) and a laptop (DPR 2).
 * usage: BASE_URL=http://localhost:3000 node scripts/image-audit.mjs /en [/en/residences ...]
 */
import { chromium } from "@playwright/test";
const base = process.env.BASE_URL || "http://localhost:3000";
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ["/en"];
const vps = [
  ["mobile", { width: 390, height: 844 }, 3],
  ["desktop", { width: 1440, height: 900 }, 2],
];
const b = await chromium.launch();
let failures = 0;
for (const path of paths) {
  for (const [name, viewport, dpr] of vps) {
    const ctx = await b.newContext({ viewport, deviceScaleFactor: dpr, isMobile: name === "mobile" });
    await ctx.addInitScript(() => { try { localStorage.setItem("ora_consent", "denied"); } catch {} });
    const p = await ctx.newPage();
    await p.goto(base + path, { waitUntil: "load" });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    const seen = new Map();
    for (let y = 0; y < H; y += Math.round(viewport.height * 0.7)) {
      await p.evaluate((y) => scrollTo(0, y), y);
      await p.waitForTimeout(350);
      const rows = await p.evaluate((dpr) => {
        const out = [];
        for (const img of document.images) {
          const r = img.getBoundingClientRect();
          if (r.width < 40 || r.bottom < 0 || r.top > innerHeight || !img.currentSrc) continue;
          if (getComputedStyle(img).opacity === "0") continue;
          const m = img.currentSrc.match(/[?&]w=(\d+)/);
          if (!m) continue;
          const w = Number(m[1]);
          const src = decodeURIComponent((img.currentSrc.match(/url=([^&]+)/) || [])[1] || "");
          if (src.endsWith(".svg")) continue;
          const ar = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1.78;
          const fit = getComputedStyle(img).objectFit;
          const cssNeed = fit === "cover" ? Math.max(r.width, r.height * ar) : r.width;
          out.push({ src, w, need: Math.round(cssNeed * dpr), box: `${Math.round(r.width)}x${Math.round(r.height)}` });
        }
        return out;
      }, dpr);
      for (const row of rows) {
        const k = row.src + row.box;
        if (!seen.has(k) || seen.get(k).need < row.need) seen.set(k, row);
      }
    }
    // next/image caps at the largest device size (2560) and at the source width; accept 80% as sharp.
    const bad = [...seen.values()].filter((r) => r.w < Math.min(r.need, 2560) * 0.8);
    failures += bad.length;
    console.log(`${path} ${name}: ${seen.size} images, ${bad.length} under-resolved`);
    bad.forEach((r) => console.log(`   ${r.src.split("/").pop()}  got ${r.w}w, needs ${r.need}w  box ${r.box}`));
    await ctx.close();
  }
}
await b.close();
process.exitCode = failures ? 1 : 0;
