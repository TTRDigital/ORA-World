#!/usr/bin/env node
// Installs components from shadcn-style registries as source files, the way `shadcn add` does,
// without running `shadcn init` (which would rewrite the site's theme CSS).
//   node scripts/registry-add.mjs skiper-ui skiper47 skiper58
//   node scripts/registry-add.mjs vengeance-ui perspective-carousel stats-counter
// Files land in src/components/vendor/<registry>/; npm dependencies are printed for `npm install`.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const REGISTRIES = {
  "skiper-ui": "https://skiper-ui.com/registry/{name}.json",
  "vengeance-ui": "https://www.vengeanceui.com/r/{name}.json",
};

const [registry, ...names] = process.argv.slice(2);
const base = REGISTRIES[registry];
if (!base || names.length === 0) {
  console.error(`Usage: registry-add.mjs <${Object.keys(REGISTRIES).join("|")}> <component...>`);
  process.exit(1);
}
const outDir = path.join("src/components/vendor", registry);
await mkdir(outDir, { recursive: true });
const deps = new Set();
for (const name of names) {
  const res = await fetch(base.replace("{name}", name));
  if (!res.ok) throw new Error(`${registry}/${name}: HTTP ${res.status}`);
  const item = await res.json();
  for (const f of item.files ?? []) {
    const file = path.join(outDir, path.basename(f.path));
    await writeFile(file, `// Source: ${registry} "${name}" (${base.replace("{name}", name)})\n${f.content}`);
    console.log("wrote", file);
  }
  (item.dependencies ?? []).forEach((d) => deps.add(d));
}
if (deps.size) console.log("npm dependencies:", [...deps].join(" "));
