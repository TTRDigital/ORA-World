/** GA4 / GTM events. No-ops until the consent banner grants analytics and dataLayer exists. */
export type EventName =
  | "form_start"
  | "form_submit"
  | "plan_view"
  | "brochure_download"
  | "whatsapp_click"
  | "call_click"
  | "booking_click"
  | "newsletter_subscribe"
  | "gate_unlock"
  | "film_play"
  | "tour_open"
  | "direction_switch";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
