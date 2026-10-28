import type { MetadataRoute } from "next";
import { isProd, siteUrl } from "@/lib/utils";

/** Staging is never indexed; production allows everything except the Studio and API. */
export default function robots(): MetadataRoute.Robots {
  if (!isProd) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] }, sitemap: `${siteUrl}/sitemap.xml` };
}
