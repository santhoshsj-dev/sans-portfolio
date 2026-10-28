import { createClient } from "next-sanity";
import { readFile } from "node:fs/promises";
import path from "node:path";
import defaults from "../content/portfolio-defaults.json" with { type: "json" };

try {
  process.loadEnvFile(".env.local");
} catch {
  // Environment variables may instead be supplied by the shell.
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local before seeding.");
}

const client = createClient({ projectId, dataset, apiVersion: "2026-10-28", token, useCdn: false });
const projectAssets = Object.fromEntries(defaults.projects.map((project) => [project.slug, `/projects/${project.slug}.svg`]));
const paths = new Set([...collectLocalImages(defaults.siteContent), ...Object.values(projectAssets)]);
const assetRefs = new Map();

for (const source of paths) {
  const filePath = path.join(process.cwd(), "public", source.replace(/^\//, ""));
  const buffer = await readFile(filePath);
  const contentType = source.endsWith(".svg") ? "image/svg+xml" : undefined;
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(source),
    ...(contentType ? { contentType } : {}),
  });
  assetRefs.set(source, asset._id);
  console.log(`Uploaded ${source}`);
}

const siteContent = transformImageFields(defaults.siteContent);
const transaction = client.transaction().createOrReplace({
  _id: "siteContent",
  _type: "siteContent",
  ...siteContent,
});

for (const [index, project] of defaults.projects.entries()) {
  const imageRef = assetRefs.get(projectAssets[project.slug]);
  transaction.createOrReplace({
    _id: `project-${project.slug}`,
    _type: "project",
    ...project,
    slug: { _type: "slug", current: project.slug },
    order: index,
    coverImage: imageRef ? { _type: "image", asset: { _type: "reference", _ref: imageRef }, alt: `${project.title} cover artwork` } : undefined,
    cardImage: imageRef ? { _type: "image", asset: { _type: "reference", _ref: imageRef }, alt: `${project.title} project artwork` } : undefined,
    published: true,
  });
}

await transaction.commit();
console.log(`Seeded ${defaults.projects.length} projects and the site content document.`);

function collectLocalImages(value, found = new Set()) {
  if (typeof value === "string" && value.startsWith("/")) found.add(value);
  else if (Array.isArray(value)) value.forEach((item) => collectLocalImages(item, found));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => collectLocalImages(item, found));
  return found;
}

const imageKeys = new Set(["heroLeftImage", "heroRightImage", "carouselPortrait", "introImage", "image", "heroImage", "bioImage", "showreelThumbnail", "calloutImage", "footerImage"]);

function transformImageFields(value, key = "", parent = {}) {
  if (imageKeys.has(key) && typeof value === "string" && assetRefs.has(value)) {
    const alt = parent[`${key}Alt`] || parent.alt;
    return {
      _type: "image",
      asset: { _type: "reference", _ref: assetRefs.get(value) },
      ...(alt ? { alt } : {}),
    };
  }
  if (Array.isArray(value)) return value.map((item) => transformImageFields(item, key, parent));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([childKey, childValue]) => [
      childKey,
      transformImageFields(childValue, childKey, value),
    ]));
  }
  return value;
}
