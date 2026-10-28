/** One-step registration gate for floor plans, brochure and pricing. Remembered for a year. */
export const REG_COOKIE = "ora_registered";

export function isRegistered() {
  if (typeof document === "undefined") return false;
  return new RegExp(`(?:^|; )${REG_COOKIE}=1`).test(document.cookie);
}

export function setRegistered() {
  document.cookie = `${REG_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  window.dispatchEvent(new Event("ora:registered"));
}
