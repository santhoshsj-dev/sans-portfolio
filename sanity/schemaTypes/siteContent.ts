import { defineField, defineType } from "sanity";

const stringList = { type: "array" as const, of: [{ type: "string" as const }] };
const media = (name: string, title: string) => defineField({ name, title, type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] });
const service = {
  name: "service", title: "Service", type: "object" as const,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "items", title: "Included services", ...stringList }),
    media("image", "Image"),
    defineField({ name: "imageAlt", title: "Image alt text", type: "string" }),
  ],
};
const collageImage = { name: "collageImage", title: "Collage image", type: "object" as const, fields: [media("image", "Image"), defineField({ name: "alt", title: "Alt text", type: "string" })] };
const experience = {
  name: "experience", title: "Experience", type: "object" as const,
  fields: [
    defineField({ name: "date", title: "Dates", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "companyUrl", title: "Company website", type: "url" }),
    defineField({ name: "place", title: "Location", type: "string" }),
    defineField({ name: "type", title: "Employment type", type: "string" }),
  ],
};
const socialLink = { name: "socialLink", title: "Social link", type: "object" as const, fields: [defineField({ name: "label", title: "Label", type: "string" }), defineField({ name: "url", title: "URL", type: "url" })] };

export const siteContentSchema = defineType({
  name: "siteContent",
  title: "Portfolio pages & settings",
  type: "document",
  groups: [
    { name: "home", title: "Homepage" },
    { name: "about", title: "About page" },
    { name: "works", title: "Works page" },
    { name: "contact", title: "Contact page" },
    { name: "global", title: "Shared callout & footer" },
  ],
  fields: [
    defineField({ name: "home", title: "Homepage content", type: "object", group: "home", fields: [
      defineField({ name: "roles", title: "Identity role labels", ...stringList }),
      media("heroLeftImage", "Left hero photo"),
      defineField({ name: "heroLeftImageAlt", title: "Left hero image alt text", type: "string" }),
      media("heroRightImage", "Right hero photo"),
      defineField({ name: "heroRightImageAlt", title: "Right hero image alt text", type: "string" }),
      media("carouselPortrait", "Selected work portrait"),
      defineField({ name: "introText", title: "Introduction", type: "text", rows: 4 }),
      media("introImage", "Introduction image"),
      defineField({ name: "introImageAlt", title: "Introduction image alt text", type: "string" }),
      defineField({ name: "services", title: "Services", type: "array", of: [service] }),
    ] }),
    defineField({ name: "about", title: "About page content", type: "object", group: "about", fields: [
      defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string" }),
      defineField({ name: "heroTitle", title: "Hero title", type: "string" }),
      media("heroImage", "Hero image"),
      defineField({ name: "heroImageAlt", title: "Hero image alt text", type: "string" }),
      defineField({ name: "introLabel", title: "Introduction label", type: "string" }),
      defineField({ name: "introTitle", title: "Introduction title", type: "string" }),
      defineField({ name: "introHeadline", title: "Introduction headline", type: "string" }),
      defineField({ name: "bio", title: "Biography", type: "text", rows: 7 }),
      media("bioImage", "Biography image"),
      defineField({ name: "bioImageAlt", title: "Biography image alt text", type: "string" }),
      defineField({ name: "collage", title: "Image collage", type: "array", of: [collageImage] }),
      defineField({ name: "experienceLabel", title: "Experience label", type: "string" }),
      defineField({ name: "experienceHeadline", title: "Experience headline", type: "string" }),
      defineField({ name: "experience", title: "Experience entries", type: "array", of: [experience] }),
    ] }),
    defineField({ name: "works", title: "Works page content", type: "object", group: "works", fields: [
      defineField({ name: "heroTitle", title: "Hero title", type: "string" }),
      media("heroImage", "Hero image"),
      defineField({ name: "heroImageAlt", title: "Hero image alt text", type: "string" }),
      defineField({ name: "showreelTitle", title: "Showreel heading", type: "string" }),
      defineField({ name: "showreelUrl", title: "YouTube video URL", type: "url" }),
      media("showreelThumbnail", "Optional showreel thumbnail"),
      defineField({ name: "projectsTitle", title: "Projects heading", type: "string" }),
      defineField({ name: "filters", title: "Project category filters", ...stringList }),
    ] }),
    defineField({ name: "contact", title: "Contact page content", type: "object", group: "contact", fields: [
      defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string" }),
      defineField({ name: "heroTitle", title: "Hero title (use a line break between lines)", type: "text", rows: 2 }),
      media("heroImage", "Hero image"),
      defineField({ name: "heroImageAlt", title: "Hero image alt text", type: "string" }),
      defineField({ name: "formTitle", title: "Form heading", type: "string" }),
      defineField({ name: "nameLabel", title: "Name field label", type: "string" }),
      defineField({ name: "emailLabel", title: "Email field label", type: "string" }),
      defineField({ name: "phoneLabel", title: "Phone field label", type: "string" }),
      defineField({ name: "messageLabel", title: "Message field label", type: "string" }),
      defineField({ name: "submitLabel", title: "Submit button label", type: "string" }),
    ] }),
    defineField({ name: "global", title: "Shared callout and footer", type: "object", group: "global", fields: [
      defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
      defineField({ name: "menuPrompt", title: "Menu contact prompt", type: "string" }),
      defineField({ name: "menuCta", title: "Menu contact action", type: "string" }),
      defineField({ name: "workMarqueeLabel", title: "Works marquee text", type: "string" }),
      defineField({ name: "calloutEyebrow", title: "Callout eyebrow", type: "string" }),
      defineField({ name: "calloutTitle", title: "Callout title", type: "string" }),
      defineField({ name: "calloutText", title: "Callout text", type: "text", rows: 2 }),
      defineField({ name: "calloutLinkLabel", title: "Callout link label", type: "string" }),
      media("calloutImage", "Callout image"),
      defineField({ name: "calloutImageAlt", title: "Callout image alt text", type: "string" }),
      media("footerImage", "Footer banner image"),
      defineField({ name: "socialLinks", title: "Social profiles", type: "array", of: [socialLink] }),
    ] }),
  ],
});
