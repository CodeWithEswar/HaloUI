"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Link01Icon, Globe02Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Types & Helpers                                                            */
/* -------------------------------------------------------------------------- */

export interface URLValueDetails {
  raw: string;
  normalized?: string;
  isSyntacticallyValid: boolean;
  protocol?: string;
  hostname?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  port?: string;
}

export interface URLFieldProps
  extends Omit<
    React.ComponentProps<"input">,
    "value" | "defaultValue" | "onChange" | "size"
  > {
  /**
   * The controlled URL string value.
   */
  value?: string;
  /**
   * The uncontrolled default URL string when initially rendered.
   */
  defaultValue?: string;
  /**
   * Event handler fired on change, delivering the raw string and syntactic metadata.
   */
  onValueChange?: (value: string, details: URLValueDetails) => void;
  /**
   * Whether to normalize the URL on blur (e.g. trimming whitespace, prepending https:// if scheme is missing).
   * @default false
   */
  normalizeOnBlur?: boolean;
  /**
   * Allowed protocols/schemes when checking syntactic validity.
   * @default ["https:", "http:"]
   */
  allowedProtocols?: string[];
  /**
   * Whether to display the leading decorative URL icon.
   * @default true
   */
  showIcon?: boolean;
  /**
   * Choice of leading icon.
   * @default "link"
   */
  icon?: "link" | "globe";
  /**
   * Size variant of the URL field assembly.
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
  /**
   * Whether the URL field is marked as invalid.
   */
  invalid?: boolean;
  /**
   * Custom class name for the inner input element.
   */
  inputClassName?: string;
}

/**
 * Parses a string into a WHATWG URL object if syntactically valid.
 */
export function parseURL(value: string): URL | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    return new URL(trimmed);
  } catch {
    return null;
  }
}

/**
 * Checks whether a string represents a syntactically valid URL with an allowed protocol.
 */
export function isSyntacticallyValidURL(
  value: string,
  allowedProtocols = ["https:", "http:"]
): boolean {
  const parsed = parseURL(value);
  if (!parsed) return false;
  return allowedProtocols.includes(parsed.protocol);
}

/**
 * Normalizes a URL string by trimming whitespace and ensuring a scheme exists if domain-like.
 */
export function normalizeURL(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  // If already has a scheme with :// (e.g. https://, http://, ftp://), return trimmed
  if (/^[a-zA-Z][a-zA-Z\d+.-]*:\/\//.test(trimmed)) {
    return trimmed;
  }


  // If localhost
  if (trimmed.startsWith("localhost")) {
    return `http://${trimmed}`;
  }

  // Prepend https://
  return `https://${trimmed}`;
}

/* -------------------------------------------------------------------------- */
/* URLField Component                                                         */
/* -------------------------------------------------------------------------- */

/**
 * URLField — Forms & Fields Primitive
 *
 * A URL-oriented text-entry control with browser-friendly input semantics,
 * optional normalization, and clear validation affordances.
 */
export const URLField = React.forwardRef<HTMLInputElement, URLFieldProps>(
  function URLField(
    {
      className,
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      normalizeOnBlur = false,
      allowedProtocols = ["https:", "http:"],
      showIcon = true,
      icon = "link",
      size = "default",
      disabled: propDisabled,
      readOnly,
      required: propRequired,
      invalid: propInvalid,
      id: propId,
      placeholder,
      inputClassName,
      onBlur,
      ...props
    },
    ref
  ) {
    const fieldProps = useFieldControlProps({
      id: propId,
      disabled: propDisabled,
      required: propRequired,
      "aria-invalid": propInvalid,
    });

    const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);
    const isDisabled = Boolean(propDisabled || fieldProps.disabled);
    const isRequired = Boolean(propRequired || fieldProps.required);

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(defaultValue);
    const displayValue = isControlled ? controlledValue : internalValue;

    // Helper to evaluate syntactic details
    const evaluateDetails = React.useCallback(
      (text: string): URLValueDetails => {
        const trimmed = text.trim();
        if (!trimmed) {
          return {
            raw: text,
            isSyntacticallyValid: false,
          };
        }

        const parsed = parseURL(trimmed);
        const isValid = parsed !== null && allowedProtocols.includes(parsed.protocol);

        return {
          raw: text,
          normalized: isValid ? parsed.href : normalizeURL(trimmed),
          isSyntacticallyValid: isValid,
          protocol: parsed?.protocol,
          hostname: parsed?.hostname,
          pathname: parsed?.pathname,
          search: parsed?.search,
          hash: parsed?.hash,
          port: parsed?.port,
        };
      },
      [allowedProtocols]
    );

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        if (!isControlled) {
          setInternalValue(raw);
        }
        const details = evaluateDetails(raw);
        onValueChange?.(raw, details);
      },
      [evaluateDetails, isControlled, onValueChange]
    );

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (normalizeOnBlur && displayValue.trim()) {
          const normalized = normalizeURL(displayValue);
          if (normalized !== displayValue) {
            if (!isControlled) {
              setInternalValue(normalized);
            }
            const details = evaluateDetails(normalized);
            onValueChange?.(normalized, details);
          }
        }
        onBlur?.(e);
      },
      [displayValue, evaluateDetails, isControlled, normalizeOnBlur, onBlur, onValueChange]
    );

    // Size variants
    const sizeClasses = {
      sm: "h-8 text-xs",
      default: "h-10 text-sm",
      lg: "h-12 text-base",
    }[size];

    const iconSize = {
      sm: 13,
      default: 15,
      lg: 17,
    }[size];

    return (
      <div
        data-slot="url-field-root"
        data-size={size}
        data-invalid={isInvalid ? "true" : undefined}
        className={cn(
          "halo-liquid-glass group/url-field relative flex w-full min-w-0 items-center rounded-xl transition-all duration-150 outline-none isolate",
          sizeClasses,
          // Shared boundary focus when input is active
          "has-[input:focus-visible]:border-[var(--halo-focus-color)]",
          "has-[input:focus-visible]:ring-2",
          "has-[input:focus-visible]:ring-[var(--halo-focus-color)]",
          "has-[input:focus-visible]:ring-offset-2",
          "has-[input:focus-visible]:ring-offset-background",
          "has-[input:focus-visible]:halo-focus-ring",
          // Invalid state (Dual Indicator Visibility)
          isInvalid && [
            "border-destructive/80 dark:border-destructive/70 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)]",
            "has-[input:focus-visible]:ring-destructive/40 has-[input:focus-visible]:border-destructive",
          ],
          // Disabled state
          isDisabled && "pointer-events-none cursor-not-allowed opacity-40 shadow-none",
          className
        )}
      >
        {/* Leading Decorative URL Icon */}
        {showIcon && (
          <span
            data-slot="url-field-icon"
            aria-hidden="true"
            className="flex items-center justify-center text-muted-foreground/80 pl-3 pr-1 shrink-0 select-none pointer-events-none"
          >
            <HaloIcon icon={icon === "globe" ? Globe02Icon : Link01Icon} size={iconSize} />
          </span>
        )}

        {/* Core Input */}
        <input
          ref={ref}
          id={fieldProps.id}
          data-slot="url-field-input"
          type="url"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          dir="ltr"
          value={displayValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isDisabled}
          readOnly={readOnly}
          required={isRequired}
          placeholder={placeholder ?? "https://example.com"}
          aria-describedby={fieldProps["aria-describedby"]}
          aria-invalid={isInvalid ? "true" : undefined}
          className={cn(
            "h-full flex-1 min-w-0 rounded-none border-0 bg-transparent px-2.5 text-foreground placeholder:text-muted-foreground outline-none ring-0 shadow-none selection:bg-primary/20",
            "disabled:cursor-not-allowed disabled:bg-transparent",
            "read-only:cursor-default read-only:select-text",
            inputClassName
          )}
          {...props}
        />
      </div>
    );
  }
);

URLField.displayName = "URLField";

export default URLField;
