import { defineField, defineType } from "sanity";

const block = (name: string, title: string, extra: ReturnType<typeof defineField>[] = []) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: "enabled", title: "Show section", type: "boolean", initialValue: true }),
      defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
      defineField({ name: "title", title: "Title", type: "localeString", description: "Wrap one word in *asterisks* for the italic accent." }),
      defineField({ name: "intro", title: "Intro", type: "localeText" }),
      ...extra,
    ],
  });

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
        defineField({ name: "headline", title: "Headline", type: "localeString", description: "Wrap one word in *asterisks* for the italic accent.", validation: (r) => r.required() }),
        defineField({ name: "tagline", title: "Tagline", type: "localeString" }),
        defineField({ name: "poster", title: "Poster frame", type: "figure", validation: (r) => r.required() }),
        defineField({ name: "loop", title: "Background loop (MP4, 12–20 s, muted)", type: "file", options: { accept: "video/mp4" } }),
        defineField({ name: "loopWebm", title: "Background loop (WebM)", type: "file", options: { accept: "video/webm" } }),
        defineField({ name: "loopMobile", title: "Background loop, mobile (MP4 720p)", type: "file", options: { accept: "video/mp4" } }),
        defineField({ name: "stats", title: "Stats bar", type: "array", of: [{ type: "stat" }], validation: (r) => r.max(4) }),
      ],
    }),
    defineField({
      name: "manifesto",
      title: "Manifesto",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Statement", type: "localeText", description: "Wrap one word in *asterisks* for the italic accent." }),
        defineField({ name: "signature", title: "Signature line", type: "localeString" }),
      ],
    }),
    defineField({
      name: "context",
      title: "Aerial / context reveal",
      type: "object",
      fields: [defineField({ name: "image", title: "Image", type: "figure" }), defineField({ name: "captions", title: "Captions", type: "array", of: [{ type: "localeString" }] })],
    }),
    block("place", "The Place", [
      defineField({
        name: "chapters",
        title: "Chapters",
        type: "array",
        of: [{ type: "object", fields: [defineField({ name: "title", title: "Title", type: "localeString" }), defineField({ name: "text", title: "Sentence", type: "localeText" }), defineField({ name: "image", title: "Image", type: "figure" })], preview: { select: { title: "title.en", media: "image" } } }],
      }),
    ]),
    block("residences", "Residences preview"),
    block("resilience", "Resilient by Design", [
      defineField({ name: "counters", title: "Counters", type: "array", of: [{ type: "stat" }] }),
      defineField({
        name: "features",
        title: "Features",
        type: "array",
        of: [{ type: "object", fields: [defineField({ name: "title", title: "Title", type: "localeString" }), defineField({ name: "points", title: "Points", type: "array", of: [{ type: "localeString" }] })], preview: { select: { title: "title.en" } } }],
      }),
    ]),
    block("amenities", "Amenities mosaic"),
    block("family", "Family-Centered Living", [defineField({ name: "body", title: "Body", type: "localeParagraphs" }), defineField({ name: "image", title: "Image", type: "figure" })]),
    block("pets", "Happy Homes For All", [defineField({ name: "body", title: "Body", type: "localeParagraphs" }), defineField({ name: "image", title: "Image", type: "figure" })]),
    block("prosperous", "A Prosperous Environment", [defineField({ name: "body", title: "Body", type: "localeParagraphs" }), defineField({ name: "disclaimer", title: "Disclaimer", type: "localeText" })]),
    block("location", "Location map"),
    block("tour", "Virtual tour teaser", [defineField({ name: "text", title: "Text", type: "localeText" }), defineField({ name: "image", title: "Image", type: "figure" })]),
    block("team", "The Collaboratory"),
    block("press", "Press strip"),
    block("cta", "Private presentation CTA", [defineField({ name: "text", title: "Text", type: "localeText" })]),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
