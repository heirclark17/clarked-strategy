"use client";

import { useState, type ReactNode } from "react";
import { useController } from "react-hook-form";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { DiscoveryFormValues } from "@/lib/discovery-schema";

type FieldName = keyof DiscoveryFormValues;

const inputBase =
  "min-h-[48px] w-full rounded-xl border bg-white px-4 py-2.5 text-ink placeholder:text-ink/35 " +
  "transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary";

function borderClass(invalid: boolean, success: boolean): string {
  if (invalid) return "border-error";
  if (success) return "border-success/60";
  return "border-line hover:border-ink/30";
}

/* ---- Shared error + success row --------------------------------------- */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-start gap-1.5 text-sm text-error">
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span>{message}</span>
    </p>
  );
}

function StatusRow({
  errorId,
  error,
  success,
  counter,
}: {
  errorId: string;
  error?: string;
  success: boolean;
  counter?: ReactNode;
}) {
  return (
    <div className="mt-1.5 flex items-start justify-between gap-3">
      <div className="min-w-0">
        {error ? (
          <FieldError id={errorId} message={error} />
        ) : success ? (
          <p className="flex items-center gap-1.5 text-sm text-success">
            <CheckCircle2 className="size-4 shrink-0" aria-hidden />
            <span>Looks good</span>
          </p>
        ) : null}
      </div>
      {counter}
    </div>
  );
}

/* ---- Label ------------------------------------------------------------- */
function FieldLabel({
  htmlFor,
  label,
  required,
  optional,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink">
      {label}
      {required ? (
        <span className="ml-0.5 text-error" aria-hidden>
          *
        </span>
      ) : null}
      {optional ? <span className="ml-1.5 font-normal text-muted">(optional)</span> : null}
    </label>
  );
}

function useStringField(name: FieldName) {
  const { field, fieldState } = useController<DiscoveryFormValues>({ name });
  const value = typeof field.value === "string" ? field.value : "";
  const invalid = fieldState.invalid;
  const success = fieldState.isTouched && !invalid && value.trim().length > 0;
  return { field, fieldState, value, invalid, success };
}

/* ---- Text input (text / email / tel / date) --------------------------- */
export function TextField({
  name,
  label,
  type = "text",
  hint,
  required,
  optional,
  placeholder,
  autoComplete,
  inputMode,
}: {
  name: FieldName;
  label: string;
  type?: "text" | "email" | "tel" | "date";
  hint?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
}) {
  const { field, fieldState, value, invalid, success } = useStringField(name);
  const id = name;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, invalid ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} optional={optional} />
      {hint ? (
        <p id={hintId} className="mb-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <input
        {...field}
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={`${inputBase} ${borderClass(invalid, success)}`}
      />
      <StatusRow errorId={errorId} error={fieldState.error?.message} success={success} />
    </div>
  );
}

/* ---- Textarea (with optional live counter) ---------------------------- */
export function TextArea({
  name,
  label,
  hint,
  required,
  optional,
  placeholder,
  rows = 4,
  softMax,
}: {
  name: FieldName;
  label: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  rows?: number;
  softMax?: number;
}) {
  const { field, fieldState, value, invalid, success } = useStringField(name);
  const id = name;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, invalid ? errorId : null].filter(Boolean).join(" ") || undefined;

  const over = softMax !== undefined && value.length > softMax;
  const counter =
    softMax !== undefined ? (
      <span
        className={`shrink-0 text-xs tabular-nums ${over ? "text-warning" : "text-muted"}`}
        aria-live="polite"
      >
        {value.length}/{softMax}
      </span>
    ) : undefined;

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} optional={optional} />
      {hint ? (
        <p id={hintId} className="mb-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <textarea
        {...field}
        id={id}
        value={value}
        placeholder={placeholder}
        rows={rows}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={`${inputBase} min-h-[7rem] resize-y leading-relaxed ${borderClass(invalid, success)}`}
      />
      <StatusRow
        errorId={errorId}
        error={fieldState.error?.message}
        success={success}
        counter={counter}
      />
    </div>
  );
}

/* ---- Select ------------------------------------------------------------ */
export function SelectField({
  name,
  label,
  options,
  hint,
  required,
  optional,
  placeholder = "Select an option…",
}: {
  name: FieldName;
  label: string;
  options: readonly string[];
  hint?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
}) {
  const { field, fieldState, value, invalid, success } = useStringField(name);
  const id = name;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, invalid ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <FieldLabel htmlFor={id} label={label} required={required} optional={optional} />
      {hint ? (
        <p id={hintId} className="mb-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <select
        {...field}
        id={id}
        value={value}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235c5b66%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:20px] bg-[right_0.9rem_center] bg-no-repeat pr-11 ${borderClass(invalid, success)} ${value ? "text-ink" : "text-ink/45"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <StatusRow errorId={errorId} error={fieldState.error?.message} success={success} />
    </div>
  );
}

/* ---- Chip multi-select (with optional free-text "Other") --------------- */
export function ChipMultiSelect({
  name,
  label,
  options,
  hint,
  required,
  allowOther = false,
  otherPlaceholder = "Something else…",
}: {
  name: FieldName;
  label: string;
  options: readonly string[];
  hint?: string;
  required?: boolean;
  allowOther?: boolean;
  otherPlaceholder?: string;
}) {
  const { field, fieldState } = useController<DiscoveryFormValues>({ name });
  const value: string[] = Array.isArray(field.value) ? (field.value as string[]) : [];
  const knownSelected = value.filter((v) => options.includes(v));
  const initialCustom = value.find((v) => !options.includes(v)) ?? "";
  const [otherText, setOtherText] = useState(initialCustom);

  const id = name;
  const errorId = `${id}-error`;
  const invalid = fieldState.invalid;
  const success = fieldState.isTouched && !invalid && value.length > 0;

  const commit = (known: string[], other: string) => {
    const next = [...known];
    const trimmed = other.trim();
    if (trimmed) next.push(trimmed);
    field.onChange(next);
    field.onBlur();
  };

  const toggle = (opt: string) => {
    const next = knownSelected.includes(opt)
      ? knownSelected.filter((o) => o !== opt)
      : [...knownSelected, opt];
    commit(next, otherText);
  };

  return (
    <div role="group" aria-labelledby={`${id}-label`} aria-describedby={invalid ? errorId : undefined}>
      <p id={`${id}-label`} className="mb-2 text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="ml-0.5 text-error" aria-hidden>
            *
          </span>
        ) : null}
      </p>
      {hint ? <p className="mb-3 text-sm text-muted">{hint}</p> : null}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = knownSelected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(opt)}
              className={`min-h-[44px] rounded-full border px-4 text-sm font-medium transition-colors ${
                selected
                  ? "border-primary bg-primary text-white"
                  : "border-line bg-white text-ink hover:border-ink/40"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {allowOther ? (
        <input
          type="text"
          value={otherText}
          placeholder={otherPlaceholder}
          onChange={(e) => {
            setOtherText(e.target.value);
            commit(knownSelected, e.target.value);
          }}
          onBlur={() => field.onBlur()}
          aria-label={`${label} — other`}
          className={`${inputBase} mt-3 ${borderClass(false, false)}`}
        />
      ) : null}
      <StatusRow errorId={errorId} error={fieldState.error?.message} success={success} />
    </div>
  );
}

/* ---- Checkbox ---------------------------------------------------------- */
export function CheckboxField({
  name,
  label,
}: {
  name: FieldName;
  label: ReactNode;
}) {
  const { field, fieldState } = useController<DiscoveryFormValues>({ name });
  const checked = Boolean(field.value);
  const id = name;
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          {...field}
          id={id}
          type="checkbox"
          value={undefined}
          checked={checked}
          onChange={(e) => field.onChange(e.target.checked)}
          aria-invalid={fieldState.invalid || undefined}
          aria-describedby={fieldState.invalid ? errorId : undefined}
          className="mt-0.5 size-5 shrink-0 rounded border-line accent-primary focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <span className="text-sm text-ink">{label}</span>
      </label>
      <div className="mt-1.5">
        <FieldError id={errorId} message={fieldState.error?.message} />
      </div>
    </div>
  );
}

/* ---- Step progress ----------------------------------------------------- */
export function StepProgress({
  current,
  total,
  title,
}: {
  current: number;
  total: number;
  title: string;
}) {
  const pct = Math.round((current / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-ink">
          Step {current} of {total}
        </span>
        <span className="text-muted">{title}</span>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={`Step ${current} of ${total}: ${title}`}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ---- Error summary (top of step, jump-links) --------------------------- */
export function ErrorSummary({
  items,
}: {
  items: { name: string; label: string; message: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <div role="alert" className="rounded-xl border border-error/40 bg-error/5 p-4">
      <p className="flex items-center gap-2 font-semibold text-error">
        <AlertCircle className="size-5 shrink-0" aria-hidden />
        Please fix {items.length} {items.length > 1 ? "fields" : "field"} to continue
      </p>
      <ul className="mt-2 space-y-1 pl-7">
        {items.map((it) => (
          <li key={it.name} className="list-disc text-sm text-error/90">
            <a
              href={`#${it.name}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(it.name);
                el?.scrollIntoView({ block: "center", behavior: "smooth" });
                el?.focus();
              }}
              className="underline underline-offset-2 hover:text-error"
            >
              {it.label}: {it.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
