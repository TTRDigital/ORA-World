/** Locks page scroll (and pauses Lenis) while a modal or the overlay menu is open. */
export function lockScroll(locked: boolean) {
  const html = document.documentElement;
  if (locked) {
    html.classList.add("lenis-stopped");
    html.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("ora:lenis", { detail: { stop: true } }));
  } else {
    html.classList.remove("lenis-stopped");
    html.style.overflow = "";
    window.dispatchEvent(new CustomEvent("ora:lenis", { detail: { stop: false } }));
  }
  return () => {
    html.classList.remove("lenis-stopped");
    html.style.overflow = "";
    window.dispatchEvent(new CustomEvent("ora:lenis", { detail: { stop: false } }));
  };
}
