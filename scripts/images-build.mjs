/**
 * Optimises source imagery into public/images and writes src/content/images.json
 * (src, width, height, blurDataURL) so seed content can reference images by key.
 *
 * Sources:
 *   assets-source/images/client/*   the client's own renders and photos (from oraworld.com)
 *   assets-source/images/free/*     free-license placeholders (credits in CONTENT-TODO.md)
 */
import sharp from "sharp";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const MAX_W = 2400;
const groups = [
  { dir: "assets-source/images/client", out: "public/images/client", prefix: "client" },
  { dir: "assets-source/images/free", out: "public/images/free", prefix: "free" },
];

const manifest = {};
for (const g of groups) {
  let files = [];
  try {
    files = (await readdir(g.dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  } catch {
    continue;
  }
  await mkdir(g.out, { recursive: true });
  for (const f of files) {
    const key = `${g.prefix}/${path.parse(f).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
    const outName = key.split("/")[1] + ".jpg";
    const outPath = path.join(g.out, outName);
    const src = sharp(path.join(g.dir, f)).rotate();
    const meta = await src.metadata();
    const width = Math.min(meta.width ?? MAX_W, MAX_W);
    const scale = width / (meta.width ?? width);
    const height = Math.round((meta.height ?? width) * scale);
    let needs = true;
    try {
      const [a, b] = await Promise.all([stat(outPath), stat(path.join(g.dir, f))]);
      needs = a.mtimeMs < b.mtimeMs;
    } catch {}
    if (needs) await src.clone().resize({ width }).flatten({ background: "#e3d9c8" }).jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(outPath);
    const blur = await src.clone().resize({ width: 16 }).blur(1).jpeg({ quality: 50 }).toBuffer();
    manifest[key] = { src: `/images/${g.prefix}/${outName}`, width, height, blurDataURL: `data:image/jpeg;base64,${blur.toString("base64")}` };
    console.log(key, width, height);
  }
}
await mkdir("src/content", { recursive: true });
await writeFile("src/content/images.json", JSON.stringify(manifest, null, 2));
console.log(`\n${Object.keys(manifest).length} images → src/content/images.json`);
