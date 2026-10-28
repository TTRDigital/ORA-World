// Slice a tall screenshot into viewable chunks: node scripts/slice.mjs file.png [chunkHeight]
import sharp from "sharp";
const [file, h = "2600"] = process.argv.slice(2);
const img = sharp(file);
const { width, height } = await img.metadata();
const H = Number(h);
let i = 0;
for (let y = 0; y < height; y += H, i++) {
  const out = file.replace(/\.png$/, `-${String(i).padStart(2, "0")}.png`);
  await sharp(file)
    .extract({ left: 0, top: y, width, height: Math.min(H, height - y) })
    .toFile(out);
}
console.log(`${i} slices`);
