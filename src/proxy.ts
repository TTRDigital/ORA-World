import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intl = createIntlMiddleware(routing);
const DIRECTIONS = new Set(["a", "b", "c"]);
const isProd = process.env.NEXT_PUBLIC_SITE_ENV === "production";

/**
 * Locale routing for /en and /es, plus the staging-only design-direction switch:
 * /?direction=a|b|c stores the choice in a cookie so inner pages follow the same theme.
 */
export default function proxy(request: NextRequest) {
  const response = intl(request);
  const direction = request.nextUrl.searchParams.get("direction");
  if (!isProd && direction && DIRECTIONS.has(direction)) {
    response.cookies.set("ora_direction", direction, { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" });
  }
  // First-touch attribution: UTM, click ids, referrer and landing page are kept for the lead form.
  if (!request.cookies.get("ora_attr")) {
    const p = request.nextUrl.searchParams;
    const attr = {
      utm_source: p.get("utm_source"),
      utm_medium: p.get("utm_medium"),
      utm_campaign: p.get("utm_campaign"),
      utm_term: p.get("utm_term"),
      utm_content: p.get("utm_content"),
      gclid: p.get("gclid"),
      gbraid: p.get("gbraid"),
      wbraid: p.get("wbraid"),
      fbclid: p.get("fbclid"),
      referrer: request.headers.get("referer"),
      landing: request.nextUrl.pathname + (request.nextUrl.search || ""),
      ts: Date.now(),
    };
    response.cookies.set("ora_attr", encodeURIComponent(JSON.stringify(attr)), {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      sameSite: "lax",
    });
  }
  return response;
}

export const config = {
  // Skip Next internals, the Studio, API routes and static files.
  matcher: ["/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
