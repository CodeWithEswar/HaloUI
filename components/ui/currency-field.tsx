"use client";

import * as React from "react";
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { cn } from "@/lib/utils";
import { useFieldControlProps } from "@/components/ui/field";
import {
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
} from "@/components/ui/number-field";

/* -------------------------------------------------------------------------- */
/* CurrencyField Component                                                    */
/* -------------------------------------------------------------------------- */

export interface CurrencyFieldProps
  extends Omit<
    React.ComponentProps<typeof NumberFieldPrimitive.Root>,
    "value" | "defaultValue" | "onValueChange" | "onValueCommitted" | "format" | "locale"
  > {
  /**
   * The controlled monetary numeric value.
   * Emits null when the field is empty.
   */
  value?: number | null;
  /**
   * The uncontrolled default monetary value when initially rendered.
   */
  defaultValue?: number;
  /**
   * Event handler fired with the updated semantic numeric value.
   */
  onValueChange?: (value: number | null) => void;
  /**
   * Event handler fired when the monetary value is committed (e.g. blur or pointer release).
   */
  onValueCommit?: (value: number | null) => void;
  /**
   * The standard ISO 4217 currency code (e.g. "USD", "EUR", "JPY", "INR").
   * @default "USD"
   */
  currency?: string;
  /**
   * The BCP 47 language/locale tag governing symbol placement and separators.
   * If omitted, uses runtime locale or "en-US".
   */
  locale?: string;
  /**
   * Display mode for the currency symbol/code in the formatted representation.
   * @default "symbol"
   */
  currencyDisplay?: "symbol" | "narrowSymbol" | "code" | "name";
  /**
   * Optional override for minimum fraction digits.
   * If undefined, derives automatically from currency specification.
   */
  minFractionDigits?: number;
  /**
   * Optional override for maximum fraction digits.
   * If undefined, derives automatically from currency specification.
   */
  maxFractionDigits?: number;
  /**
   * Whether to display an ISO currency badge addon within the control boundary.
   * @default false
   */
  showCurrencyCode?: boolean;
  /**
   * Placement of increment/decrement steppers.
   * Monetary inputs typically omit steppers by default.
   * @default "none"
   */
  stepperPlacement?: "none" | "right" | "split";
  /**
   * Size variant of the control assembly.
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
  /**
   * Whether the currency field is in an invalid state.
   */
  invalid?: boolean;
  /**
   * Optional custom classes for the inner input element.
   */
  inputClassName?: string;
}

/**
 * CurrencyField — Forms & Fields Primitive
 *
 * A locale-aware monetary entry control that separates the underlying semantic
 * numeric value from its localized currency presentation.
 */
export const CurrencyField = React.forwardRef<HTMLDivElement, CurrencyFieldProps>(
  function CurrencyField(
    {
      className,
      value,
      defaultValue,
      onValueChange,
      onValueCommit,
      currency = "USD",
      locale,
      currencyDisplay = "symbol",
      minFractionDigits,
      maxFractionDigits,
      showCurrencyCode = false,
      stepperPlacement = "none",
      size = "default",
      min,
      max,
      step,
      disabled: propDisabled,
      readOnly,
      required: propRequired,
      invalid: propInvalid,
      id: propId,
      inputClassName,
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

    // Format options for locale-aware currency presentation
    const formatOptions = React.useMemo<Intl.NumberFormatOptions>(() => {
      const opts: Intl.NumberFormatOptions = {
        style: "currency",
        currency,
        currencyDisplay,
      };

      if (typeof minFractionDigits === "number") {
        opts.minimumFractionDigits = minFractionDigits;
      }
      if (typeof maxFractionDigits === "number") {
        opts.maximumFractionDigits = maxFractionDigits;
      }

      return opts;
    }, [currency, currencyDisplay, minFractionDigits, maxFractionDigits]);

    const handleValueChange = React.useCallback(
      (val: number | null) => {
        onValueChange?.(val);
      },
      [onValueChange]
    );

    const handleValueCommit = React.useCallback(
      (val: number | null) => {
        onValueCommit?.(val);
      },
      [onValueCommit]
    );

    return (
      <NumberFieldPrimitive.Root
        ref={ref}
        data-slot="currency-field"
        id={fieldProps.id}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        onValueCommitted={handleValueCommit}
        format={formatOptions}
        locale={locale}
        min={min}
        max={max}
        step={step}
        disabled={isDisabled}
        readOnly={readOnly}
        required={isRequired}
        allowWheelScrub={false}
        className={cn("w-full", className)}
        {...props}
      >
        <NumberFieldGroup size={size} invalid={isInvalid}>
          {stepperPlacement === "split" && (
            <NumberFieldDecrement size={size} aria-label="Decrease amount" />
          )}

          <NumberFieldInput
            className={cn(
              stepperPlacement === "split" ? "text-center" : "text-left",
              inputClassName
            )}
            aria-describedby={fieldProps["aria-describedby"]}
            aria-invalid={isInvalid ? "true" : undefined}
          />

          {showCurrencyCode && (
            <span
              data-slot="currency-code-badge"
              className={cn(
                "inline-flex items-center text-[11px] font-mono font-semibold tracking-wider text-muted-foreground bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/10 px-2 py-0.5 rounded-md select-none shrink-0",
                stepperPlacement === "right" ? "mr-1" : "mr-0"
              )}
            >
              {currency}
            </span>
          )}

          {stepperPlacement === "right" && (
            <div className="flex items-center gap-0.5 pr-0.5">
              <NumberFieldDecrement size={size} aria-label="Decrease amount" />
              <NumberFieldIncrement size={size} aria-label="Increase amount" />
            </div>
          )}

          {stepperPlacement === "split" && (
            <NumberFieldIncrement size={size} aria-label="Increase amount" />
          )}
        </NumberFieldGroup>
      </NumberFieldPrimitive.Root>
    );
  }
);

CurrencyField.displayName = "CurrencyField";

export default CurrencyField;
