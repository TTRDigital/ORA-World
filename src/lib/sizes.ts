/**
 * `sizes` for an image shown with object-fit: cover. When the frame is narrower in aspect than the
 * image (a portrait frame holding a 16:9 render), the image is scaled up to fill the frame's height,
 * so it needs more pixels than the frame's width. Getting this wrong is what makes images look soft.
 *
 * rules: [minViewportWidthPx, frameWidthVw, frameAspect (w/h)], widest first or in any order;
 * a rule with minWidth 0 is the default.
 */
export function coverSizes(img: { width: number; height: number }, rules: [number, number, number][]): string {
  const ar = img.width / img.height;
  const sorted = [...rules].sort((a, b) => b[0] - a[0]);
  return sorted
    .map(([min, vw, frame]) => {
      const need = Math.ceil(vw * Math.max(1, ar / frame));
      return min > 0 ? `(min-width: ${min}px) ${need}vw` : `${need}vw`;
    })
    .join(", ");
}

/** Full-viewport cover: wide screens need the viewport width, tall screens need height × image aspect. */
export function fullBleedSizes(img: { width: number; height: number }, scale = 1): string {
  const ar = img.width / img.height;
  const vh = Math.ceil(100 * ar * scale);
  const vw = Math.ceil(100 * scale);
  return `(max-aspect-ratio: ${img.width}/${img.height}) ${vh}vh, ${vw}vw`;
}
