import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "./env";

export const client = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published", stega: false })
  : null;

/** Server-only client with write access (leads, seed). Never import from client components. */
export function writeClient() {
  const token = process.env.ORA_SANITY_WRITE_TOKEN;
  if (!sanityConfigured) return null;
  // Without a token this only works behind an authenticating proxy (TTR build environment);
  // in production the write token is required and failures are caught by the callers.
  return createClient({ projectId, dataset, apiVersion, useCdn: false, token: token || undefined });
}

export async function sanityFetch<T>(query: string, params: QueryParams = {}, tags: string[] = []): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 300, tags } });
  } catch (err) {
    console.error("[sanity] fetch failed, falling back to seed", err);
    return null;
  }
}
