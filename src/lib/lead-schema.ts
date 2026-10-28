import { z } from "zod";

export const leadVariants = ["short", "full", "broker", "gate"] as const;
export type LeadVariant = (typeof leadVariants)[number];

const phone = z.string().trim().min(7).max(30).regex(/^[+\d][\d\s().-]{6,}$/);

/** Shared client + server validation. Honeypot "company" must stay empty. */
export const leadSchema = z.object({
  variant: z.enum(leadVariants),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone,
  role: z.enum(["buyer", "broker"]),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  state: z.string().trim().max(80).optional().or(z.literal("")),
  residenceType: z.string().trim().max(80).optional().or(z.literal("")),
  budget: z.string().trim().max(40).optional().or(z.literal("")),
  timeline: z.string().trim().max(40).optional().or(z.literal("")),
  heardAbout: z.string().trim().max(40).optional().or(z.literal("")),
  brokerage: z.string().trim().max(120).optional().or(z.literal("")),
  license: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal(true),
  company: z.string().max(0).optional().or(z.literal("")),
  locale: z.enum(["en", "es"]),
  source: z.string().max(300).optional().or(z.literal("")),
  turnstileToken: z.string().max(4000).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
