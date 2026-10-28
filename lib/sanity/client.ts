import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-10-28";
export const hasSanityConfig = Boolean(projectId);

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
    })
  : null;

export async function sanityQuery<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params, {
      next: { revalidate: tags.length ? false : 300, ...(tags.length ? { tags } : {}) },
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Sanity content is unavailable; using bundled portfolio content.", error);
    }
    return null;
  }
}
