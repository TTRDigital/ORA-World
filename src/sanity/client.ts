import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "./env";

export const client = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published", stega: false })
  : null;

/** Server-only client with write access (leads, seed). Never import from client components. */
export function writeClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!sanityConfigured || !token) return null;
  return createClient({ projectId, dataset, apiVersion, useCdn: false, token });
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
