"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2, Send, AlertCircle } from "lucide-react";
import {
  discoverySchema,
  discoveryDefaults,
  STEPS,
  TOTAL_STEPS,
  STAGE_OPTIONS,
  PRIORITY_OPTIONS,
  MONETIZATION_OPTIONS,
  BUDGET_OPTIONS,
  REVISION_OPTIONS,
  PLATFORM_OPTIONS,
  BRAND_ASSET_OPTIONS,
  PROBLEM_SOFT_MAX,
  type DiscoveryFormValues,
} from "@/lib/discovery-schema";
import { submitDiscovery } from "@/lib/api";
import {
  TextField,
  TextArea,
  SelectField,
  ChipMultiSelect,
  CheckboxField,
  StepProgress,
  ErrorSummary,
} from "@/components/form/fields";
import { Button } from "@/components/ui/Button";

type FieldName = keyof DiscoveryFormValues;

// Short labels for the error-summary jump-links.
const FIELD_LABELS: Partial<Record<FieldName, string>> = {
  fullName: "Full name",
  companyName: "Company / brand",
  workEmail: "Work email",
  phone: "Phone",
  problemSolved: "Problem you solve",
  stage: "Product stage",
  launchDate: "Target launch date",
  idealCustomer: "Ideal customer",
  customerFeeling: "How they feel",
  audiencePlatforms: "Where they spend time",
  success30: "30-day success",
  topPriority: "#1 priority",
  monetization: "Monetization model",
  competitor1: "Competitor #1",
  differentiation: "What makes you different",
  unfairAdvantage: "Unfair advantage",
  approvalContactName: "Approval contact",
  approvalContactEmail: "Approval contact email",
  budgetRange: "Monthly budget",
  consent: "Consent",
};

function StepFields({ step }: { step: number }) {
  switch (step) {
    case 0:
      return (
        <>
          <TextField name="fullName" label="Full name" required autoComplete="name" />
          <TextField
            name="companyName"
            label="Company / brand name"
            required
            autoComplete="organization"
          />
          <TextField
            name="workEmail"
            label="Work email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            placeholder="name@company.com"
          />
          <TextField
            name="phone"
            label="Phone"
            type="tel"
            optional
            inputMode="tel"
            autoComplete="tel"
            placeholder="(555) 123-4567"
          />
        </>
      );
    case 1:
      return (
        <>
          <TextArea
            name="problemSolved"
            label="What problem does your product or service solve?"
            required
            hint="One sentence is perfect."
            rows={2}
            softMax={PROBLEM_SOFT_MAX}
          />
          <SelectField
            name="stage"
            label="What stage is it at right now?"
            required
            options={STAGE_OPTIONS}
          />
          <TextField
            name="launchDate"
            label="Target launch date or next major milestone"
            type="date"
            optional
            hint="A rough date is fine, or leave it blank."
          />
          <TextArea
            name="featuresNotReady"
            label="Any features or offerings not yet ready that affect marketing timing?"
            optional
            rows={3}
          />
        </>
      );
    case 2:
      return (
        <>
          <TextArea
            name="idealCustomer"
            label="Who is your ideal customer or user?"
            required
            hint="Age range, job title, income level, industry, or lifestyle."
          />
          <TextArea
            name="customerFeeling"
            label="What is that person feeling when they find you?"
            required
            hint="e.g. frustrated, anxious, hopeful, overwhelmed. Be specific."
            rows={2}
          />
          <TextArea
            name="earlyFeedback"
            label="Have any real customers tried it yet? What did they say?"
            optional
          />
          <ChipMultiSelect
            name="audiencePlatforms"
            label="Where does your target audience spend time online?"
            required
            options={PLATFORM_OPTIONS}
            allowOther
            otherPlaceholder="Somewhere else? Type it…"
            hint="Pick all that apply."
          />
          <TextArea
            name="objections"
            label="What objections might they have before buying or signing up?"
            optional
          />
        </>
      );
    case 3:
      return (
        <>
          <TextArea
            name="success30"
            label="What does success look like at 30 days?"
            required
            hint="Think downloads, revenue, leads, followers, press hits."
            rows={2}
          />
          <TextArea name="success60" label="…and at 60 days?" optional rows={2} />
          <TextArea name="success90" label="…and at 90 days?" optional rows={2} />
          <SelectField
            name="topPriority"
            label="What is the #1 priority right now?"
            required
            options={PRIORITY_OPTIONS}
          />
          <SelectField
            name="monetization"
            label="What is your monetization model?"
            required
            options={MONETIZATION_OPTIONS}
          />
          <TextField
            name="stakeholders"
            label="Any investors, partners, or stakeholders who need to see results?"
            optional
          />
        </>
      );
    case 4:
      return (
        <>
          <TextField name="competitor1" label="Direct competitor #1" required />
          <TextField name="competitor2" label="Direct competitor #2" optional />
          <TextField name="competitor3" label="Direct competitor #3" optional />
          <TextArea
            name="differentiation"
            label="What makes you different from your top competitors?"
            required
            hint="Price, features, audience, experience, or approach."
          />
          <TextArea
            name="competitorNotes"
            label="What do competitors do well, and where do they fall short?"
            optional
          />
          <TextArea
            name="unfairAdvantage"
            label="What is your unfair advantage, something they can’t easily replicate?"
            required
          />
        </>
      );
    case 5:
      return (
        <>
          <ChipMultiSelect
            name="brandAssets"
            label="What brand assets already exist?"
            options={BRAND_ASSET_OPTIONS}
            hint="Pick all that apply."
          />
          <TextArea
            name="brandAssetsNotes"
            label="Notes on your assets"
            optional
            rows={2}
          />
          <TextField
            name="approvalContactName"
            label="Point of contact for approvals and feedback"
            required
          />
          <TextField
            name="approvalContactEmail"
            label="Approval contact email"
            type="email"
            required
            inputMode="email"
            placeholder="name@company.com"
          />
          <TextArea
            name="reviewProcess"
            label="Content review and approval process"
            optional
            rows={2}
          />
          <SelectField
            name="revisionRounds"
            label="Revision rounds"
            optional
            options={REVISION_OPTIONS}
            placeholder="How many rounds?"
          />
          <TextField
            name="turnaround"
            label="Preferred turnaround time"
            optional
            placeholder="e.g. 3 business days"
          />
          <SelectField
            name="budgetRange"
            label="Monthly marketing budget"
            required
            options={BUDGET_OPTIONS}
          />
          <CheckboxField name="budgetFlexible" label="Budget is flexible" />
          <TextArea
            name="additionalNotes"
            label="Anything else we should know?"
            optional
            rows={3}
          />
          <CheckboxField
            name="consent"
            label={
              <>
                I agree that Clarked Strategy may contact me at the email above about my Discovery
                Session. <span className="text-error">*</span>
              </>
            }
          />
        </>
      );
    default:
      return null;
  }
}

export function DiscoveryForm() {
  const router = useRouter();
  const methods = useForm<DiscoveryFormValues>({
    resolver: zodResolver(discoverySchema),
    defaultValues: discoveryDefaults,
    // Validate fields first on blur (not on every keystroke), then - once a
    // field has an error - re-check on change so the error clears the moment
    // the user fixes it.
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const meta = STEPS[step];
  const isLast = step === TOTAL_STEPS - 1;

  // Move focus to the step heading whenever the step changes (announces + orients).
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const focusFirstError = () => {
    const errors = methods.formState.errors;
    const first = meta.fields.find((f) => errors[f]);
    if (first) {
      try {
        methods.setFocus(first);
      } catch {
        /* non-focusable control (e.g. chip group) - fall back to scroll */
      }
      document.getElementById(first)?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  const handleNext = async () => {
    const ok = await methods.trigger([...meta.fields]);
    if (!ok) {
      setShowSummary(true);
      focusFirstError();
      return;
    }
    setShowSummary(false);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const handleBack = () => {
    setShowSummary(false);
    setStep((s) => Math.max(s - 1, 0));
  };

  const onValid = async (values: DiscoveryFormValues) => {
    // Anti-spam: a filled honeypot means a bot. Pretend success, persist nothing.
    if (values.honeypot && values.honeypot.trim() !== "") {
      router.push("/thank-you");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitDiscovery(values);
      router.push("/thank-you");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
      setSubmitting(false);
    }
  };

  const onInvalid = () => {
    setShowSummary(true);
    focusFirstError();
  };

  const errors = methods.formState.errors;
  const summaryItems = showSummary
    ? meta.fields
        .filter((f) => errors[f])
        .map((f) => ({
          name: f,
          label: FIELD_LABELS[f] ?? f,
          message: String(errors[f]?.message ?? "This field needs attention."),
        }))
    : [];

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={methods.handleSubmit(onValid, onInvalid)}
        className="mx-auto w-full max-w-2xl"
      >
        <StepProgress current={step + 1} total={TOTAL_STEPS} title={meta.title} />

        {/* Screen-reader step announcement */}
        <div aria-live="polite" className="sr-only">
          Step {step + 1} of {TOTAL_STEPS}: {meta.title}
        </div>

        <div className="mt-8">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-2xl font-semibold text-ink outline-none"
          >
            {meta.title}
          </h2>
          <p className="mt-1 text-muted">{meta.blurb}</p>
        </div>

        {summaryItems.length > 0 ? (
          <div className="mt-6">
            <ErrorSummary items={summaryItems} />
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-6">
          <StepFields step={step} />
        </div>

        {/* Honeypot - visually hidden, off the tab order. Bots fill it; humans don't. */}
        <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...methods.register("honeypot")}
          />
        </div>

        {submitError ? (
          <p
            role="alert"
            className="mt-6 flex items-start gap-2 rounded-xl border border-error/40 bg-error/5 p-4 text-sm text-error"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            {submitError}
          </p>
        ) : null}

        <div className="mt-10 flex items-center justify-between gap-4">
          {step > 0 ? (
            <Button type="button" variant="secondary" onClick={handleBack}>
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </Button>
          ) : (
            <span />
          )}

          {isLast ? (
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="size-4" aria-hidden />
                  Submit Discovery Session
                </>
              )}
            </Button>
          ) : (
            <Button type="button" size="lg" onClick={handleNext}>
              Continue
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
