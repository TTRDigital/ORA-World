import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";


/** Dynamic Open Graph image in the brand style: basalt ground, brass hairline, serif title. */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Beyond expectations").slice(0, 90);
  const eyebrow = (searchParams.get("eyebrow") || "Dorado · Puerto Rico").slice(0, 60);
  const locale = searchParams.get("locale") === "es" ? "es" : "en";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: "#1c1b19", color: "#f2ede4", fontFamily: "Georgia, 'Times New Roman', serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#d4b987", fontFamily: "Helvetica, Arial, sans-serif" }}>
          <div style={{ width: 48, height: 1, background: "#d4b987" }} />
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 92, lineHeight: 1, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
          <div style={{ width: "100%", height: 1, background: "rgba(212,185,135,0.4)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 8, textTransform: "uppercase", color: "#d4b987", fontFamily: "Helvetica, Arial, sans-serif" }}>
            <span>ORA WORLD</span>
            <span>{locale === "es" ? "Residencias de lujo" : "Luxury Residences"}</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
