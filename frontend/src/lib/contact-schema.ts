import { z } from "zod";

/**
 * Homepage contact form - the light "just a conversation" inquiry.
 * (The deep 6-step intake lives in discovery-schema.ts.)
 * Submits to the backend POST /contact endpoint via submitContact().
 */

export const SERVICE_OPTIONS = [
  "Media Relations",
  "Social Media Strategy",
  "Crisis Communications",
  "Digital Advertising",
  "Content & Copywriting",
  "Brand Strategy",
  "Full-Service Partnership",
] as const;

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, { message: "Enter your first name." }).max(100),
  lastName: z.string().trim().min(1, { message: "Enter your last name." }).max(100),
  company: z.string().trim().min(1, { message: "Enter your company or brand name." }).max(200),
  email: z
    .string()
    .trim()
    .min(1, { message: "This field is required." })
    .pipe(z.email({ message: "Enter a valid email, like name@company.com." })),
  service: z.string().trim().max(80).optional(),
  message: z
    .string()
    .trim()
    .min(1, { message: "Tell us a little about your brand and goals." })
    .max(4000),
  // Honeypot: bots fill it, humans leave it empty. Checked in the submit handler.
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const contactDefaults: ContactFormValues = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  service: "",
  message: "",
  website: "",
};
