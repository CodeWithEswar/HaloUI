"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

/* -------------------------------------------------------------------------- */
/* Field Context                                                              */
/* -------------------------------------------------------------------------- */

export interface FieldContextValue {
  /** The coordinated control ID */
  id: string;
  /** Label element ID */
  labelId: string;
  /** Description element ID */
  descriptionId: string;
  /** Error element ID */
  errorId: string;
  /** Whether the field is in an invalid state */
  invalid?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Layout orientation */
  orientation: "vertical" | "horizontal" | "responsive";
}

const FieldContext = React.createContext<FieldContextValue | null>(null);

export function useFieldContext() {
  return React.useContext(FieldContext);
}

/**
 * Convenience hook that derives standard accessibility attributes
 * (`id`, `aria-describedby`, `aria-invalid`, `disabled`, `required`)
 * for an input control composed within a Field.
 */
export function useFieldControlProps(props?: {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  disabled?: boolean;
  required?: boolean;
}) {
  const context = useFieldContext();
  if (!context) {
    return props ?? {};
  }

  const id = props?.id ?? context.id;
  const invalid = props?.["aria-invalid"] ?? context.invalid;
  const disabled = props?.disabled ?? context.disabled;
  const required = props?.required ?? context.required;

  const contextDescribedBy = [
    context.descriptionId,
    context.invalid ? context.errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const combinedDescribedBy = [props?.["aria-describedby"], contextDescribedBy]
    .filter(Boolean)
    .join(" ") || undefined;

  return {
    id,
    "aria-describedby": combinedDescribedBy,
    "aria-invalid": invalid || undefined,
    disabled: disabled || undefined,
    required: required || undefined,
  };
}

/* -------------------------------------------------------------------------- */
/* Field Root                                                                 */
/* -------------------------------------------------------------------------- */

const fieldVariants = cva(
  "group/field flex w-full transition-all duration-200",
  {
    variants: {
      orientation: {
        vertical: "flex-col gap-1.5",
        horizontal:
          "flex-row items-center justify-between gap-4 has-[>[data-slot=field-content]]:items-start",
        responsive:
          "flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 has-[>[data-slot=field-content]]:sm:items-start",
      },
      variant: {
        default: "",
        glass: [
          "p-4 sm:p-5 rounded-2xl relative isolate overflow-hidden",
          // 10-Layer Optical Liquid Glass Substrate
          "bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-200",
          "border border-white/80 dark:border-white/[0.18]",
          "shadow-[0_12px_36px_-6px_rgba(0,0,0,0.12),inset_0_1px_1.5px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(0,0,0,0.05)]",
          "dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.75),inset_0_1px_1.5px_0_rgba(255,255,255,0.25),inset_0_-1px_1px_0_rgba(0,0,0,0.6)]",
          "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit]",
          "before:bg-gradient-to-br before:from-white/30 before:via-white/5 before:to-transparent dark:before:from-white/[0.12] dark:before:via-transparent",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
      variant: "default",
    },
  }
);

export interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldVariants> {
  /** Explicit control ID to coordinate with child label, description, and error */
  id?: string;
  /** Whether the field is in an invalid/error state */
  invalid?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
}

export function Field({
  className,
  orientation = "vertical",
  variant = "default",
  invalid = false,
  disabled = false,
  required = false,
  id: explicitId,
  children,
  ...props
}: FieldProps) {
  const reactId = React.useId();
  const id = explicitId ?? reactId;

  const contextValue = React.useMemo<FieldContextValue>(
    () => ({
      id,
      labelId: `${id}-label`,
      descriptionId: `${id}-description`,
      errorId: `${id}-error`,
      invalid,
      disabled,
      required,
      orientation: orientation ?? "vertical",
    }),
    [id, invalid, disabled, required, orientation]
  );

  return (
    <FieldContext.Provider value={contextValue}>
      <div
        role="group"
        data-slot="field"
        data-orientation={orientation}
        data-variant={variant}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        data-required={required || undefined}
        className={cn(fieldVariants({ orientation, variant }), className)}
        {...props}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* FieldLabel                                                                 */
/* -------------------------------------------------------------------------- */

export interface FieldLabelProps extends React.ComponentProps<typeof Label> {
  /** Visually renders a supplemental required asterisk indicator (`*`) */
  required?: boolean;
  /** Visually renders a supplemental `(Optional)` badge */
  optional?: boolean;
}

export function FieldLabel({
  className,
  children,
  htmlFor,
  id,
  required: explicitRequired,
  optional,
  ...props
}: FieldLabelProps) {
  const context = useFieldContext();
  const targetId = htmlFor ?? context?.id;
  const labelId = id ?? context?.labelId;
  const isRequired = explicitRequired ?? context?.required;

  return (
    <Label
      id={labelId}
      htmlFor={targetId}
      data-slot="field-label"
      className={cn(
        "group/field-label flex w-fit items-center gap-1.5 text-sm font-medium leading-none text-foreground select-none",
        "group-data-[disabled=true]/field:opacity-50 group-data-[disabled=true]/field:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
      {isRequired && (
        <span
          className="text-destructive font-semibold select-none leading-none"
          aria-hidden="true"
        >
          *
        </span>
      )}
      {optional && !isRequired && (
        <span
          className="text-xs font-normal text-muted-foreground select-none ml-1"
          aria-hidden="true"
        >
          (Optional)
        </span>
      )}
    </Label>
  );
}

/* -------------------------------------------------------------------------- */
/* FieldDescription                                                           */
/* -------------------------------------------------------------------------- */

export interface FieldDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FieldDescription({
  className,
  id,
  children,
  ...props
}: FieldDescriptionProps) {
  const context = useFieldContext();
  const descriptionId = id ?? context?.descriptionId;

  if (!children) return null;

  return (
    <p
      id={descriptionId}
      data-slot="field-description"
      className={cn(
        "text-xs sm:text-sm text-muted-foreground leading-normal font-normal text-left",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* FieldError                                                                 */
/* -------------------------------------------------------------------------- */

export interface FieldErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional array of structured validation errors */
  errors?: Array<{ message?: string } | string | undefined | null>;
}

export function FieldError({
  className,
  id,
  children,
  errors,
  ...props
}: FieldErrorProps) {
  const context = useFieldContext();
  const errorId = id ?? context?.errorId;

  const content = React.useMemo(() => {
    if (children) return children;
    if (!errors || errors.length === 0) return null;

    const errorStrings = errors
      .map((e) => (typeof e === "string" ? e : e?.message))
      .filter((msg): msg is string => Boolean(msg && msg.trim().length > 0));

    const uniqueErrors = Array.from(new Set(errorStrings));

    if (uniqueErrors.length === 0) return null;
    if (uniqueErrors.length === 1) return uniqueErrors[0];

    return (
      <ul className="ml-4 list-disc space-y-0.5">
        {uniqueErrors.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    );
  }, [children, errors]);

  if (!content) return null;

  return (
    <div
      id={errorId}
      role="alert"
      aria-live="polite"
      data-slot="field-error"
      className={cn(
        "text-xs sm:text-sm font-medium text-destructive text-left leading-normal animate-in fade-in-0 duration-150",
        className
      )}
      {...props}
    >
      {content}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FieldContent (For horizontal/responsive grouped label + description)       */
/* -------------------------------------------------------------------------- */

export interface FieldContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function FieldContent({ className, ...props }: FieldContentProps) {
  return (
    <div
      data-slot="field-content"
      className={cn("flex flex-1 flex-col gap-1 leading-snug", className)}
      {...props}
    />
  );
}

import {
  FieldGroup as PrimitiveFieldGroup,
  type FieldGroupProps as PrimitiveFieldGroupProps,
} from "@/components/ui/field-group";

export interface FieldGroupProps extends PrimitiveFieldGroupProps {
  /** Optional backwards-compatibility visual variant */
  variant?: "default" | "glass";
}

export function FieldGroup({ className, variant = "default", ...props }: FieldGroupProps) {
  return (
    <PrimitiveFieldGroup
      data-variant={variant}
      className={cn(
        variant === "glass" && [
          "p-5 sm:p-7 rounded-2xl relative isolate overflow-hidden",
          "bg-white/55 dark:bg-neutral-950/55 backdrop-blur-2xl backdrop-saturate-180",
          "border border-white/70 dark:border-white/[0.14]",
          "shadow-[0_8px_32px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.85)]",
          "dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)]",
          "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit]",
          "before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent",
        ],
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* FieldSet & FieldLegend (For semantic groups like Radio / Checkbox sets)   */
/* -------------------------------------------------------------------------- */

export interface FieldSetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {}

export function FieldSet({ className, disabled, ...props }: FieldSetProps) {
  return (
    <fieldset
      disabled={disabled}
      data-slot="field-set"
      className={cn("flex flex-col gap-3 border-0 p-0 m-0", className)}
      {...props}
    />
  );
}

export interface FieldLegendProps
  extends React.HTMLAttributes<HTMLLegendElement> {
  variant?: "legend" | "label";
}

export function FieldLegend({
  className,
  variant = "legend",
  ...props
}: FieldLegendProps) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1.5 font-medium text-foreground",
        variant === "label" ? "text-sm" : "text-base font-semibold",
        className
      )}
      {...props}
    />
  );
}
