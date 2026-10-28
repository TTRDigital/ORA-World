import { defineField, defineType } from "sanity";

const slug = (source: string) =>
  defineField({ name: "slug", title: "Slug", type: "slug", options: { source }, validation: (r) => r.required() });

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "localeString", validation: (r) => r.required() }),
    slug("name.en"),
    defineField({ name: "flagship", title: "Flagship project", type: "boolean", initialValue: false }),
    defineField({ name: "tagline", title: "Tagline", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "summary", title: "Summary", type: "localeParagraphs", validation: (r) => r.required() }),
    defineField({ name: "facts", title: "Key facts", type: "array", of: [{ type: "fact" }] }),
    defineField({ name: "sections", title: "Sections", type: "array", of: [{ type: "contentSection" }] }),
    defineField({ name: "hero", title: "Hero image", type: "figure", validation: (r) => r.required() }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "figure" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "name.en", subtitle: "location.en", media: "hero" } },
});

export const collection = defineType({
  name: "collection",
  title: "Residence collection",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "localeString", validation: (r) => r.required() }),
    slug("name.en"),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
    defineField({
      name: "placeholder",
      title: "Placeholder (details unconfirmed)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "tagline", title: "Tagline", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeParagraphs",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms (display)",
      type: "string",
      description: 'e.g. "2–3". Leave empty if unconfirmed.',
    }),
    defineField({
      name: "sizeRange",
      title: "Interior size range (display)",
      type: "string",
      description: 'e.g. "1,850–2,400 sq ft"',
    }),
    defineField({
      name: "fromPrice",
      title: "From price (USD)",
      type: "number",
      description: "Leave empty to show “Pricing on request”.",
    }),
    defineField({ name: "image", title: "Image", type: "figure", validation: (r) => r.required() }),
    defineField({ name: "hoverImage", title: "Hover image", type: "figure" }),
    defineField({ name: "features", title: "Features", type: "array", of: [{ type: "localeString" }] }),
    defineField({
      name: "finishes",
      title: "Finishes & materials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "group", title: "Group", type: "localeString" }),
            defineField({ name: "items", title: "Items", type: "array", of: [{ type: "localeString" }] }),
          ],
          preview: { select: { title: "group.en" } },
        },
      ],
    }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name.en", subtitle: "bedrooms", media: "image" } },
});

export const floorPlan = defineType({
  name: "floorPlan",
  title: "Floor plan",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "localeString", validation: (r) => r.required() }),
    slug("name.en"),
    defineField({ name: "placeholder", title: "Placeholder (unconfirmed plan)", type: "boolean", initialValue: true }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{ type: "collection" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "bedrooms", title: "Bedrooms", type: "number", validation: (r) => r.required().min(0).max(8) }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      validation: (r) => r.required().min(1).max(10),
    }),
    defineField({ name: "interiorSqFt", title: "Interior sq ft", type: "number" }),
    defineField({ name: "exteriorSqFt", title: "Exterior sq ft", type: "number" }),
    defineField({
      name: "orientation",
      title: "Orientation",
      type: "string",
      options: { list: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "view", title: "View", type: "localeString" }),
    defineField({ name: "tower", title: "Building / tower", type: "string", validation: (r) => r.required() }),
    defineField({ name: "floors", title: "Floors", type: "string", description: 'e.g. "4–12"' }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["available", "reserved", "sold"], layout: "radio" },
      initialValue: "available",
    }),
    defineField({ name: "fromPrice", title: "From price (USD)", type: "number" }),
    defineField({ name: "image", title: "Plan image", type: "figure", validation: (r) => r.required() }),
    defineField({ name: "keyplan", title: "Keyplan", type: "figure" }),
    defineField({
      name: "keyplanPosition",
      title: "Unit position on keyplan (%)",
      type: "object",
      fields: ["x", "y", "w", "h"].map((n) =>
        defineField({ name: n, title: n.toUpperCase(), type: "number", validation: (r) => r.min(0).max(100) }),
      ),
    }),
    defineField({ name: "pdf", title: "PDF", type: "file", options: { accept: "application/pdf" } }),
    defineField({ name: "highlights", title: "Highlights", type: "array", of: [{ type: "localeString" }] }),
  ],
  preview: { select: { title: "name.en", subtitle: "tower", media: "image" } },
});

export const amenity = defineType({
  name: "amenity",
  title: "Amenity",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "localeString", validation: (r) => r.required() }),
    slug("name.en"),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Wellness", value: "wellness" },
          { title: "Family", value: "family" },
          { title: "Pets", value: "pets" },
          { title: "Resort", value: "resort" },
          { title: "Eco", value: "eco" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Description", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "image", title: "Image", type: "figure", validation: (r) => r.required() }),
    defineField({ name: "featured", title: "Show on homepage mosaic", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "name.en", subtitle: "category", media: "image" } },
});

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery image",
  type: "document",
  fields: [
    defineField({ name: "image", title: "Image", type: "figure", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["exteriors", "interiors", "amenities", "lifestyle", "construction"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", title: "Caption", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "caption.en", subtitle: "category", media: "image" } },
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member / partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    slug("name"),
    defineField({ name: "placeholder", title: "Placeholder (unconfirmed)", type: "boolean", initialValue: true }),
    defineField({ name: "role", title: "Role", type: "localeString", validation: (r) => r.required() }),
    defineField({
      name: "discipline",
      title: "Discipline",
      type: "localeString",
      description: "Developer · Architecture · Interiors · Landscape · Partner",
    }),
    defineField({ name: "bio", title: "Bio", type: "localeParagraphs" }),
    defineField({ name: "quote", title: "Pull quote", type: "localeText" }),
    defineField({ name: "portrait", title: "Portrait", type: "figure", validation: (r) => r.required() }),
    defineField({ name: "website", title: "Website", type: "url" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "name", subtitle: "role.en", media: "portrait" } },
});

export const pointOfInterest = defineType({
  name: "pointOfInterest",
  title: "Point of interest",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "localeString", validation: (r) => r.required() }),
    slug("name.en"),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["beach", "golf", "school", "healthcare", "airport", "dining", "culture", "nature"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "lat", title: "Latitude", type: "number", validation: (r) => r.required() }),
    defineField({ name: "lng", title: "Longitude", type: "number", validation: (r) => r.required() }),
    defineField({ name: "driveMinutes", title: "Drive time (min)", type: "number" }),
    defineField({ name: "walkMinutes", title: "Walk time (min)", type: "number" }),
    defineField({ name: "note", title: "Note", type: "localeString" }),
    defineField({ name: "placeholder", title: "Placeholder (times unconfirmed)", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "name.en", subtitle: "category" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "localeString", validation: (r) => r.required() }),
    slug("question.en"),
    defineField({ name: "topic", title: "Topic", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "localeParagraphs", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "question.en", subtitle: "topic.en" } },
});

export const pressArticle = defineType({
  name: "pressArticle",
  title: "Press article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString", validation: (r) => r.required() }),
    slug("title.en"),
    defineField({ name: "placeholder", title: "Placeholder", type: "boolean", initialValue: false }),
    defineField({ name: "outlet", title: "Outlet", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "localeParagraphs" }),
    defineField({ name: "url", title: "External URL", type: "url" }),
    defineField({ name: "image", title: "Image", type: "figure" }),
  ],
  orderings: [{ title: "Newest", name: "date", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title.en", subtitle: "outlet", media: "image" } },
});

export const investmentStep = defineType({
  name: "investmentStep",
  title: "Deposit / timeline step",
  type: "document",
  fields: [
    defineField({ name: "order", title: "Order", type: "number", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "localeString", validation: (r) => r.required() }),
    defineField({ name: "detail", title: "Detail", type: "localeText" }),
    defineField({ name: "percent", title: "Percent", type: "number", validation: (r) => r.min(0).max(100) }),
    defineField({ name: "when", title: "When", type: "localeString" }),
    defineField({ name: "placeholder", title: "Placeholder", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "title.en", subtitle: "when.en" } },
});

export const incentive = defineType({
  name: "incentive",
  title: "Incentive",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString", validation: (r) => r.required() }),
    slug("title.en"),
    defineField({ name: "summary", title: "Summary", type: "localeText", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "localeParagraphs" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "title.en" } },
});

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString", validation: (r) => r.required() }),
    slug("title.en"),
    defineField({ name: "intro", title: "Intro", type: "localeText" }),
    defineField({ name: "hero", title: "Hero image", type: "figure" }),
    defineField({ name: "sections", title: "Sections", type: "array", of: [{ type: "contentSection" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "title.en", subtitle: "slug.current" } },
});

export const lead = defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "variant", title: "Form", type: "string" }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "role", title: "Buyer / Broker", type: "string" }),
    defineField({ name: "country", title: "Country", type: "string" }),
    defineField({ name: "state", title: "State", type: "string" }),
    defineField({ name: "residenceType", title: "Preferred residence", type: "string" }),
    defineField({ name: "budget", title: "Budget", type: "string" }),
    defineField({ name: "timeline", title: "Timeline", type: "string" }),
    defineField({ name: "heardAbout", title: "Heard about", type: "string" }),
    defineField({ name: "brokerage", title: "Brokerage", type: "string" }),
    defineField({ name: "license", title: "License", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({ name: "consent", title: "Consent", type: "boolean" }),
    defineField({ name: "locale", title: "Locale", type: "string" }),
    defineField({ name: "source", title: "Source page / plan", type: "string" }),
    defineField({ name: "attribution", title: "Attribution (UTM etc.)", type: "text" }),
    defineField({ name: "submittedAt", title: "Submitted", type: "datetime" }),
    defineField({ name: "crmStatus", title: "CRM webhook status", type: "string" }),
  ],
  preview: { select: { title: "name", subtitle: "email" } },
});

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "from",
      title: "From path",
      type: "string",
      validation: (r) => r.required().regex(/^\//, { name: "path" }),
    }),
    defineField({ name: "to", title: "To path or URL", type: "string", validation: (r) => r.required() }),
    defineField({ name: "permanent", title: "Permanent (308)", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "from", subtitle: "to" } },
});
