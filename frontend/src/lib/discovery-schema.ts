import { z } from "zod";

/**
 * Client Discovery Session - single source of truth for the intake form.
 *
 * This Zod schema powers BOTH client-side validation (React Hook Form) and,
 * mirrored in Pydantic, server-side validation on the FastAPI /discovery
 * endpoint. Field names here match the backend `DiscoveryCreate` schema.
 *
 * Option lists live here (functional config) rather than in site.ts (prose).
 */

/* ---- Option lists (also consumed by the UI) ---------------------------- */
export const STAGE_OPTIONS = ["Pre-launch", "Beta", "Live", "Scaling", "Other"] as const;
export const PRIORITY_OPTIONS = [
  "Brand awareness",
  "Lead generation",
  "App downloads",
  "Press coverage",
  "Sales / revenue",
  "Other",
] as const;
export const MONETIZATION_OPTIONS = [
  "Free",
  "Freemium",
  "Subscription",
  "One-time purchase",
  "Service retainer",
  "Other",
] as const;
export const BUDGET_OPTIONS = ["< $2k", "$2k-$5k", "$5k-$10k", "$10k-$25k", "$25k+"] as const;
export const REVISION_OPTIONS = ["1", "2", "3", "Unlimited"] as const;
export const PLATFORM_OPTIONS = [
  "LinkedIn",
  "Instagram",
  "TikTok",
  "Reddit",
  "YouTube",
  "X / Twitter",
  "Facebook",
  "Industry forums",
] as const;
export const BRAND_ASSET_OPTIONS = [
  "Logo",
  "Brand colors",
  "Fonts",
  "Photography",
  "App screenshots",
  "Existing social profiles",
  "None yet",
] as const;

/** Soft target for the "problem solved" counter; hard cap is enforced below. */
export const PROBLEM_SOFT_MAX = 200;

/* ---- Reusable field builders ------------------------------------------- */
const requiredText = (message: string, max = 2000) =>
  z
    .string()
    .trim()
    .min(1, { message })
    .max(max, { message: `Please keep this under ${max} characters.` });

const optionalText = (max = 2000) =>
  z
    .string()
    .trim()
    .max(max, { message: `Please keep this under ${max} characters.` })
    .optional();

const emailField = (message = "Enter a valid email, like name@company.com.") =>
  z.string().trim().min(1, { message: "This field is required." }).pipe(z.email({ message }));

/** A required <select>: default "" fails with a friendly, specific message. */
const requiredChoice = (options: readonly string[], message: string) =>
  z
    .string()
    .trim()
    .refine((v) => options.includes(v), { message });

/* ---- The schema -------------------------------------------------------- */
export const discoverySchema = z.object({
  // Step 0 - Your details
  fullName: requiredText("Please enter your full name.", 200),
  companyName: requiredText("Please enter your company or brand name.", 200),
  workEmail: emailField(),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .refine((v) => !v || /^[+()\-.\s\d]{7,}$/.test(v), {
      message: "Enter a valid phone number, like (555) 123-4567.",
    }),

  // Step 1 - The product
  problemSolved: requiredText("Describe the problem you solve. One sentence is perfect.", 300),
  stage: requiredChoice(STAGE_OPTIONS, "Please select the current stage."),
  launchDate: z
    .string()
    .trim()
    .max(80)
    .optional()
    .refine((v) => !v || !Number.isNaN(Date.parse(v)), {
      message: "Enter a real date, like 2026-03-15.",
    }),
  featuresNotReady: optionalText(1500),

  // Step 2 - The audience
  idealCustomer: requiredText("Describe your ideal customer or user.", 1000),
  customerFeeling: requiredText("Describe what they’re feeling when they find you.", 600),
  earlyFeedback: optionalText(1500),
  audiencePlatforms: z
    .array(z.string().trim().min(1))
    .min(1, { message: "Pick at least one place your audience spends time." }),
  objections: optionalText(1500),

  // Step 3 - The goals
  success30: requiredText("Tell us what success looks like at 30 days.", 1000),
  success60: optionalText(1000),
  success90: optionalText(1000),
  topPriority: requiredChoice(PRIORITY_OPTIONS, "Please select your #1 priority."),
  monetization: requiredChoice(MONETIZATION_OPTIONS, "Please select a monetization model."),
  stakeholders: optionalText(600),

  // Step 4 - Competitive landscape
  competitor1: requiredText("Name at least one direct competitor.", 200),
  competitor2: optionalText(200),
  competitor3: optionalText(200),
  differentiation: requiredText("Tell us what makes you different.", 1000),
  competitorNotes: optionalText(1500),
  unfairAdvantage: requiredText("Describe your unfair advantage.", 1000),

  // Step 5 - Logistics & assets
  brandAssets: z.array(z.string().trim().min(1)),
  brandAssetsNotes: optionalText(1000),
  approvalContactName: requiredText("Who approves work?", 200),
  approvalContactEmail: emailField(),
  reviewProcess: optionalText(1000),
  revisionRounds: z.string().optional(),
  turnaround: optionalText(200),
  budgetRange: requiredChoice(BUDGET_OPTIONS, "Please select a monthly budget range."),
  budgetFlexible: z.boolean(),

  // Final
  additionalNotes: optionalText(2000),

  // Consent + anti-spam
  consent: z
    .boolean()
    .refine((v) => v === true, { message: "Please agree so we can contact you about your session." }),
  honeypot: z.string().optional(),
});

export type DiscoveryFormValues = z.infer<typeof discoverySchema>;

/** Empty defaults so every input is controlled from first render. */
export const discoveryDefaults: DiscoveryFormValues = {
  fullName: "",
  companyName: "",
  workEmail: "",
  phone: "",
  problemSolved: "",
  stage: "",
  launchDate: "",
  featuresNotReady: "",
  idealCustomer: "",
  customerFeeling: "",
  earlyFeedback: "",
  audiencePlatforms: [],
  objections: "",
  success30: "",
  success60: "",
  success90: "",
  topPriority: "",
  monetization: "",
  stakeholders: "",
  competitor1: "",
  competitor2: "",
  competitor3: "",
  differentiation: "",
  competitorNotes: "",
  unfairAdvantage: "",
  brandAssets: [],
  brandAssetsNotes: "",
  approvalContactName: "",
  approvalContactEmail: "",
  reviewProcess: "",
  revisionRounds: "",
  turnaround: "",
  budgetRange: "",
  budgetFlexible: false,
  additionalNotes: "",
  consent: false,
  honeypot: "",
};

/** Field grouping that drives the 6-step wizard + per-step validation gates. */
export const STEPS = [
  {
    id: "details",
    title: "Your details",
    blurb: "So we know who we’re talking to and how to reply.",
    fields: ["fullName", "companyName", "workEmail", "phone"],
  },
  {
    id: "product",
    title: "The product",
    blurb: "What you’ve built and where it is right now.",
    fields: ["problemSolved", "stage", "launchDate", "featuresNotReady"],
  },
  {
    id: "audience",
    title: "The audience",
    blurb: "Who it’s for and how they feel when they find you.",
    fields: ["idealCustomer", "customerFeeling", "earlyFeedback", "audiencePlatforms", "objections"],
  },
  {
    id: "goals",
    title: "The goals",
    blurb: "What winning looks like over the next 90 days.",
    fields: ["success30", "success60", "success90", "topPriority", "monetization", "stakeholders"],
  },
  {
    id: "competition",
    title: "Competitive landscape",
    blurb: "Who you’re up against and why you win.",
    fields: [
      "competitor1",
      "competitor2",
      "competitor3",
      "differentiation",
      "competitorNotes",
      "unfairAdvantage",
    ],
  },
  {
    id: "logistics",
    title: "Logistics & assets",
    blurb: "How we’ll work together, and anything else.",
    fields: [
      "brandAssets",
      "brandAssetsNotes",
      "approvalContactName",
      "approvalContactEmail",
      "reviewProcess",
      "revisionRounds",
      "turnaround",
      "budgetRange",
      "budgetFlexible",
      "additionalNotes",
      "consent",
    ],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  title: string;
  blurb: string;
  fields: ReadonlyArray<keyof DiscoveryFormValues>;
}>;

export const TOTAL_STEPS = STEPS.length;
