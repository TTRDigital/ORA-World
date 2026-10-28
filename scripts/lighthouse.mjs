/**
 * Lighthouse (mobile emulation) against a running server. Prints the four category scores and CWV.
 * usage: BASE_URL=http://localhost:3000 node scripts/lighthouse.mjs /en /en/residences ...
 */
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { writeFile, mkdir } from "node:fs/promises";

const base = process.env.BASE_URL || "http://localhost:3000";
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ["/en"];
const chromePath = process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome";
const chrome = await launch({
  chromePath,
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
});
await mkdir("reports/lighthouse", { recursive: true });
const rows = [];
for (const p of paths) {
  for (const formFactor of ["mobile", "desktop"]) {
    const result = await lighthouse(base + p, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      formFactor,
      screenEmulation:
        formFactor === "mobile"
          ? { mobile: true, width: 390, height: 844, deviceScaleFactor: 3, disabled: false }
          : { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false },
      throttlingMethod: "simulate",
    });
    const lhr = result.lhr;
    const s = (k) => Math.round((lhr.categories[k]?.score ?? 0) * 100);
    const a = lhr.audits;
    const row = {
      path: p,
      formFactor,
      performance: s("performance"),
      accessibility: s("accessibility"),
      bestPractices: s("best-practices"),
      seo: s("seo"),
      lcp: a["largest-contentful-paint"]?.displayValue,
      cls: a["cumulative-layout-shift"]?.displayValue,
      tbt: a["total-blocking-time"]?.displayValue,
      inp: a["interaction-to-next-paint"]?.displayValue,
    };
    rows.push(row);
    await writeFile(
      `reports/lighthouse/${(p.replace(/[^a-z0-9]+/gi, "-") || "home").replace(/^-/, "")}-${formFactor}.json`,
      result.report,
    );
    console.log(JSON.stringify(row));
  }
}
await chrome.kill();
console.table(rows);
