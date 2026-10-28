/**
 * Sliding-window rate limit. Uses Upstash Redis when configured; otherwise an in-memory map
 * (sufficient for a single serverless instance; document the Upstash option for production).
 */
const memory = new Map<string, number[]>();

export async function rateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const now = Date.now();
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      const res = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([["INCR", key], ["PEXPIRE", key, windowMs, "NX"]]),
      });
      const data = (await res.json()) as { result: number }[];
      return (data[0]?.result ?? 0) <= limit;
    } catch {
      /* fall through to memory */
    }
  }
  const hits = (memory.get(key) || []).filter((t) => now - t < windowMs);
  hits.push(now);
  memory.set(key, hits);
  if (memory.size > 5000) memory.clear();
  return hits.length <= limit;
}
