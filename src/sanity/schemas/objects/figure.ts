import { defineField, defineType } from "sanity";

export const figure = defineType({
  name: "figure",
  title: "Image",
  type: "image",
  options: { hotspot: true, metadata: ["lqip", "palette"] },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "localeString",
      validation: (r) => r.required(),
      description: "Describe the image for screen readers and SEO. Required.",
    }),
    defineField({ name: "caption", title: "Caption", type: "localeString" }),
    defineField({
      name: "rendering",
      title: "Artist's conceptual rendering",
      type: "boolean",
      initialValue: true,
      description: "Adds the legally required rendering label.",
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder image",
      type: "boolean",
      initialValue: false,
      description: "Temporary image to be replaced with client photography.",
    }),
    defineField({ name: "credit", title: "Credit / license", type: "string" }),
  ],
  preview: { select: { title: "alt.en", media: "asset" } },
});
