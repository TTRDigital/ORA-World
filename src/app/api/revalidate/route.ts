import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/** Sanity webhook → on-demand revalidation. Configure the webhook with ORA_SANITY_REVALIDATE_SECRET. */
export async function POST(req: NextRequest) {
  const secret = process.env.ORA_SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "not configured" }, { status: 501 });
  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
  if (!isValidSignature) return NextResponse.json({ ok: false }, { status: 401 });
  const type = body?._type;
  if (type) revalidateTag(type, "max");
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, type });
}
