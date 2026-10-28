import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { writeClient } from "@/sanity/client";

const schema = z.object({
  email: z.string().email().max(200),
  company: z.string().max(200).optional(),
  locale: z.enum(["en", "es"]).default("en"),
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "anon";
  if (!(await rateLimit(`newsletter:${ip}`, 5, 60_000))) return NextResponse.json({ ok: false }, { status: 429 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  const { email, locale, company } = parsed.data;
  if (company) return NextResponse.json({ ok: true }); // honeypot
  const payload = { type: "newsletter", email, locale, submittedAt: new Date().toISOString() };
  const webhook = process.env.CRM_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-ORA-Secret": process.env.CRM_WEBHOOK_SECRET || "" },
      body: JSON.stringify(payload),
    }).catch(() => null);
  }
  const client = writeClient();
  if (client)
    await client
      .create({ _type: "lead", variant: "newsletter", email, locale, submittedAt: payload.submittedAt })
      .catch(() => null);
  return NextResponse.json({ ok: true });
}
