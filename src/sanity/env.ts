/**
 * ORA-specific variable names on purpose: the TTR build environment also carries
 * NEXT_PUBLIC_SANITY_PROJECT_ID / DATASET for the agency's own site, and this site
 * must never read or write that content.
 */
export const projectId = process.env.NEXT_PUBLIC_ORA_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_ORA_SANITY_DATASET || "ora-world";
export const apiVersion = process.env.NEXT_PUBLIC_ORA_SANITY_API_VERSION || "2025-10-01";
/** True only when a real project is configured; otherwise the site renders from the local seed. */
export const sanityConfigured = /^[a-z0-9-]{6,}$/.test(projectId);
export const studioBasePath = "/studio";
