import { defineField, defineType } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Statistic",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value", type: "number", description: "Leave empty while the number is unconfirmed; the site shows a placeholder." }),
    defineField({ name: "prefix", title: "Prefix", type: "string" }),
    defineField({ name: "suffix", title: "Suffix", type: "string" }),
    defineField({ name: "label", title: "Label", type: "localeString", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label.en", subtitle: "value" } },
});

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "URL", type: "url", validation: (r) => r.required().uri({ scheme: ["http", "https", "mailto", "tel"] }) }),
  ],
});

export const contentSection = defineType({
  name: "contentSection",
  title: "Section",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "localeParagraphs", validation: (r) => r.required() }),
    defineField({ name: "image", title: "Image", type: "figure" }),
    defineField({ name: "layout", title: "Layout", type: "string", options: { list: ["text-left", "text-right", "full-bleed", "text-only"] }, initialValue: "text-left" }),
  ],
  preview: { select: { title: "title.en", media: "image" } },
});

export const fact = defineType({
  name: "fact",
  title: "Fact",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "value", title: "Value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "placeholder", title: "Placeholder (unconfirmed)", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "label.en", subtitle: "value" } },
});

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", title: "Meta title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Meta description", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "image", title: "Share image", type: "image" }),
  ],
});
