import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "content", title: "Project content", default: true },
    { name: "media", title: "Images" },
    { name: "listing", title: "Works listing" },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "cardImage" },
  },
  fields: [
    defineField({ name: "title", title: "Project title", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "URL slug", type: "slug", group: "content", options: { source: "title", maxLength: 80 }, validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "client", title: "Client", type: "string", group: "content" }),
    defineField({ name: "year", title: "Year", type: "string", group: "content" }),
    defineField({ name: "role", title: "My role", type: "string", group: "content" }),
    defineField({ name: "services", title: "Services", type: "array", of: [{ type: "string" }], group: "content" }),
    defineField({ name: "summary", title: "Short summary", type: "text", rows: 2, group: "content" }),
    defineField({ name: "outcome", title: "Outcome", type: "text", rows: 2, group: "content" }),
    defineField({ name: "description", title: "Project description", type: "text", rows: 5, group: "content" }),
    defineField({ name: "coverImage", title: "Project hero image", type: "image", group: "media", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] }),
    defineField({ name: "cardImage", title: "Works and homepage card image", type: "image", group: "media", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] }),
    defineField({ name: "gallery", title: "Project gallery", type: "array", group: "media", of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] }] }),
    defineField({ name: "featured", title: "Show in homepage carousel", type: "boolean", initialValue: false, group: "listing" }),
    defineField({ name: "published", title: "Show on public site", type: "boolean", initialValue: true, group: "listing" }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0, group: "listing" }),
    defineField({ name: "number", title: "Editorial number", type: "string", group: "listing" }),
    defineField({ name: "palette", title: "Fallback artwork palette", type: "string", group: "listing", options: { list: ["red", "ink", "cream", "orange"] }, initialValue: "ink" }),
  ],
});
