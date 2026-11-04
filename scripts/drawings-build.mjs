/**
 * Derive an ink-style line drawing from a rendering (Sobel edges, inked in charcoal on bone), so the
 * render/drawing slider compares two images that align exactly.
 * usage: node scripts/drawings-build.mjs <render.jpg> <out.jpg>
 */
import sharp from "sharp";
const [src, out] = process.argv.slice(2);
const base = sharp(src).resize({ width: 2400 }).greyscale();
const { data, info } = await base.clone().raw().toBuffer({ resolveWithObject: true });
const w = info.width, h = info.height;
const o = Buffer.alloc(w * h);
const g = (x, y) => data[Math.min(h - 1, Math.max(0, y)) * w + Math.min(w - 1, Math.max(0, x))];
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const gx = -g(x-1,y-1) - 2*g(x-1,y) - g(x-1,y+1) + g(x+1,y-1) + 2*g(x+1,y) + g(x+1,y+1);
  const gy = -g(x-1,y-1) - 2*g(x,y-1) - g(x+1,y-1) + g(x-1,y+1) + 2*g(x,y+1) + g(x+1,y+1);
  const m = Math.min(255, Math.sqrt(gx*gx + gy*gy) * 1.1);
  o[y*w+x] = m < 38 ? 255 : Math.max(0, 255 - (m - 38) * 2.2);
}
// tint: ink lines in charcoal on bone paper
const rgb = Buffer.alloc(w * h * 3);
for (let i = 0; i < w*h; i++) { const t = o[i] / 255; rgb[i*3] = Math.round(42 + (247-42)*t); rgb[i*3+1] = Math.round(40 + (243-40)*t); rgb[i*3+2] = Math.round(37 + (236-37)*t); }
await sharp(rgb, { raw: { width: w, height: h, channels: 3 } }).jpeg({ quality: 85 }).toFile(out);
