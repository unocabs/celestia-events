import { defineArrayMember, defineField, defineType } from "sanity";

const imageWithAlt = defineField({
  name: "image",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  validation: (Rule) => Rule.required(),
});

const sectionFields = [
  defineField({ name: "introKicker", title: "Intro kicker", type: "string" }),
  defineField({ name: "introHeading", title: "Intro heading", type: "string" }),
  defineField({ name: "eventsKicker", title: "Events kicker", type: "string" }),
  defineField({ name: "eventsHeading", title: "Events heading", type: "string" }),
  defineField({ name: "offersKicker", title: "Offers kicker", type: "string" }),
  defineField({ name: "offersHeading", title: "Offers heading", type: "string" }),
  defineField({ name: "offersIntro", title: "Offers intro", type: "text" }),
  defineField({ name: "packagesKicker", title: "Packages kicker", type: "string" }),
  defineField({ name: "packagesHeading", title: "Packages heading", type: "string" }),
  defineField({ name: "galleryKicker", title: "Gallery kicker", type: "string" }),
  defineField({ name: "galleryHeading", title: "Gallery heading", type: "string" }),
  defineField({ name: "galleryIntro", title: "Gallery intro", type: "text" }),
  defineField({ name: "whyKicker", title: "Why Celestia kicker", type: "string" }),
  defineField({ name: "whyHeading", title: "Why Celestia heading", type: "string" }),
  defineField({ name: "whyIntro", title: "Why Celestia intro", type: "text" }),
  defineField({ name: "inquiryKicker", title: "Inquiry kicker", type: "string" }),
  defineField({ name: "inquiryHeading", title: "Inquiry heading", type: "string" }),
  defineField({ name: "inquiryIntro", title: "Inquiry intro", type: "text" }),
  defineField({ name: "footerBackToTop", title: "Footer back-to-top label", type: "string" }),
];

export const schemaTypes = [
  defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
      defineField({ name: "brandName", title: "Brand name", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "descriptor", title: "Brand descriptor", type: "string" }),
      defineField({ name: "tagline", title: "Tagline", type: "string" }),
      defineField({ name: "facebookUrl", title: "Facebook URL", type: "url", validation: (Rule) => Rule.required() }),
      defineField({ name: "phone", title: "Display phone number", type: "string", validation: (Rule) => Rule.required() }),
      defineField({
        name: "phoneHref",
        title: "Phone link value",
        description: "Use digits and country code, for example +639477703209.",
        type: "string",
      }),
      defineField({ name: "locationLabel", title: "Location label", type: "string" }),
      defineField({
        name: "stats",
        title: "Hero stats",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              defineField({ name: "value", title: "Value", type: "string", validation: (Rule) => Rule.required() }),
              defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            ],
          }),
        ],
      }),
      defineField({
        name: "sections",
        title: "Section Copy",
        type: "object",
        fields: sectionFields,
      }),
      defineField({
        name: "whyPoints",
        title: "Why Celestia points",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
      }),
    ],
    preview: {
      select: { title: "brandName", subtitle: "tagline" },
    },
  }),
  defineType({
    name: "hero",
    title: "Hero",
    type: "document",
    fields: [
      defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "lede", title: "Intro copy", type: "text", validation: (Rule) => Rule.required() }),
      defineField({ name: "primaryCtaLabel", title: "Primary CTA label", type: "string" }),
      defineField({ name: "secondaryCtaLabel", title: "Secondary CTA label", type: "string" }),
      defineField({ name: "note", title: "Image note", type: "string" }),
      defineField({ ...imageWithAlt, name: "mainImage", title: "Main hero image" }),
      defineField({ ...imageWithAlt, name: "sideImage", title: "Side hero image" }),
    ],
    preview: { select: { title: "headline", media: "mainImage" } },
  }),
  defineType({
    name: "eventType",
    title: "Event Type",
    type: "document",
    fields: [
      defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "accent", title: "Accent number", type: "string" }),
      defineField({ name: "copy", title: "Description", type: "text", validation: (Rule) => Rule.required() }),
      defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
    ],
    preview: { select: { title: "title", subtitle: "copy" } },
  }),
  defineType({
    name: "serviceOffer",
    title: "Service / Offer",
    type: "document",
    fields: [
      defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
      defineField({
        name: "icon",
        title: "Icon",
        type: "string",
        options: {
          list: [
            { title: "Coffee", value: "coffee" },
            { title: "Cocktail", value: "cocktail" },
            { title: "Grazing", value: "grazing" },
            { title: "Food cart", value: "cart" },
            { title: "Perfume", value: "perfume" },
            { title: "Selfie mirror", value: "mirror" },
            { title: "Event planner", value: "planner" },
          ],
          layout: "radio",
        },
        validation: (Rule) => Rule.required(),
      }),
      defineField({ name: "description", title: "Description", type: "text", validation: (Rule) => Rule.required() }),
      imageWithAlt,
      defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
    ],
    preview: { select: { title: "title", subtitle: "description", media: "image" } },
  }),
  defineType({
    name: "featuredPackage",
    title: "Featured Package",
    type: "document",
    fields: [
      defineField({ name: "name", title: "Package name", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "idealFor", title: "Ideal for", type: "text", validation: (Rule) => Rule.required() }),
      defineField({
        name: "includes",
        title: "Included items",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
        validation: (Rule) => Rule.required(),
      }),
      defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
    ],
    preview: { select: { title: "name", subtitle: "idealFor" } },
  }),
  defineType({
    name: "galleryImage",
    title: "Gallery Image",
    type: "document",
    fields: [
      defineField({ name: "category", title: "Category", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() }),
      defineField({
        name: "image",
        title: "Image",
        type: "image",
        options: { hotspot: true },
        validation: (Rule) => Rule.required(),
      }),
      defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
    ],
    preview: { select: { title: "category", subtitle: "alt", media: "image" } },
  }),
];
