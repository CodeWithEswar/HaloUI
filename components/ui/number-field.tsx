"use client";

import * as React from "react";
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { cn } from "@/lib/utils";
import { PlusSignIcon, MinusSignIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Subcomponents for Flexible Composition                                     */
/* -------------------------------------------------------------------------- */

export const NumberFieldRoot = NumberFieldPrimitive.Root;

export interface NumberFieldGroupProps
  extends React.ComponentProps<typeof NumberFieldPrimitive.Group> {
  size?: "sm" | "default" | "lg";
  invalid?: boolean;
}

export const NumberFieldGroup = React.forwardRef<HTMLDivElement, NumberFieldGroupProps>(
  function NumberFieldGroup({ className, size = "default", invalid, ...props }, ref) {
    const sizeClasses = {
      sm: "h-8 text-xs px-1.5",
      default: "h-10 text-sm px-2",
      lg: "h-12 text-base px-2.5",
    }[size];

    return (
      <NumberFieldPrimitive.Group
        ref={ref}
        data-slot="number-field-group"
        data-size={size}
        data-invalid={invalid ? "true" : undefined}
        className={cn(
          "halo-liquid-glass group/number-field-group relative flex w-full min-w-0 items-center rounded-xl transition-all duration-150 outline-none isolate",
          sizeClasses,
          // Optical focus within
          "has-[[data-slot=number-field-input]:focus-visible]:border-[var(--halo-focus-color)]",
          "has-[[data-slot=number-field-input]:focus-visible]:ring-2",
          "has-[[data-slot=number-field-input]:focus-visible]:ring-[var(--halo-focus-color)]",
          "has-[[data-slot=number-field-input]:focus-visible]:ring-offset-2",
          "has-[[data-slot=number-field-input]:focus-visible]:ring-offset-background",
          "has-[[data-slot=number-field-input]:focus-visible]:halo-focus-ring",
          // Invalid state (Dual Indicator Visibility)
          invalid && [
            "border-destructive/80 dark:border-destructive/70 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)]",
            "has-[[data-slot=number-field-input]:focus-visible]:ring-destructive/40 has-[[data-slot=number-field-input]:focus-visible]:border-destructive",
          ],
          // Disabled state
          "has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-40 has-disabled:shadow-none",
          className
        )}
        {...props}
      />
    );
  }
);
NumberFieldGroup.displayName = "NumberFieldGroup";

export interface NumberFieldInputProps
  extends React.ComponentProps<typeof NumberFieldPrimitive.Input> {}

export const NumberFieldInput = React.forwardRef<HTMLInputElement, NumberFieldInputProps>(
  function NumberFieldInput({ className, ...props }, ref) {
    return (
      <NumberFieldPrimitive.Input
        ref={ref}
        data-slot="number-field-input"
        className={cn(
          "h-full flex-1 min-w-0 rounded-none border-0 bg-transparent px-1.5 text-foreground placeholder:text-muted-foreground outline-none ring-0 shadow-none selection:bg-primary/20",
          "disabled:cursor-not-allowed disabled:bg-transparent",
          "read-only:cursor-default read-only:select-text",
          className
        )}
        {...props}
      />
    );
  }
);
NumberFieldInput.displayName = "NumberFieldInput";

export interface NumberFieldStepperProps
  extends React.ComponentProps<typeof NumberFieldPrimitive.Increment> {
  size?: "sm" | "default" | "lg";
}

export const NumberFieldIncrement = React.forwardRef<HTMLButtonElement, NumberFieldStepperProps>(
  function NumberFieldIncrement(
    { className, size = "default", "aria-label": ariaLabel = "Increase value", ...props },
    ref
  ) {
    const sizeClasses = {
      sm: "size-6 rounded-md",
      default: "size-7 sm:size-7.5 rounded-lg",
      lg: "size-8 sm:size-9 rounded-xl",
    }[size];

    return (
      <NumberFieldPrimitive.Increment
        ref={ref}
        data-slot="number-field-increment"
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center justify-center cursor-pointer select-none text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 active:bg-black/10 dark:active:bg-white/15 transition-colors duration-150 outline-none shrink-0",
          sizeClasses,
          // Independent Double-Contrast Focus Ring if keyboard focused
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:z-20 halo-focus-ring",
          // Disabled at maximum bound or when field disabled
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30",
          className
        )}
        {...props}
      >
        <HaloIcon icon={PlusSignIcon} size={size === "sm" ? 12 : 14} strokeWidth={2} />
      </NumberFieldPrimitive.Increment>
    );
  }
);
NumberFieldIncrement.displayName = "NumberFieldIncrement";

export const NumberFieldDecrement = React.forwardRef<HTMLButtonElement, NumberFieldStepperProps>(
  function NumberFieldDecrement(
    { className, size = "default", "aria-label": ariaLabel = "Decrease value", ...props },
    ref
  ) {
    const sizeClasses = {
      sm: "size-6 rounded-md",
      default: "size-7 sm:size-7.5 rounded-lg",
      lg: "size-8 sm:size-9 rounded-xl",
    }[size];

    return (
      <NumberFieldPrimitive.Decrement
        ref={ref}
        data-slot="number-field-decrement"
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center justify-center cursor-pointer select-none text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 active:bg-black/10 dark:active:bg-white/15 transition-colors duration-150 outline-none shrink-0",
          sizeClasses,
          // Independent Double-Contrast Focus Ring if keyboard focused
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:z-20 halo-focus-ring",
          // Disabled at minimum bound or when field disabled
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-30",
          className
        )}
        {...props}
      >
        <HaloIcon icon={MinusSignIcon} size={size === "sm" ? 12 : 14} strokeWidth={2} />
      </NumberFieldPrimitive.Decrement>
    );
  }
);
NumberFieldDecrement.displayName = "NumberFieldDecrement";

/* -------------------------------------------------------------------------- */
/* Primary High-Level Composed Component                                      */
/* -------------------------------------------------------------------------- */

export interface NumberFieldProps
  extends Omit<
    React.ComponentProps<typeof NumberFieldPrimitive.Root>,
    "value" | "defaultValue" | "onValueChange" | "onValueCommitted"
  > {
  /**
   * The controlled numeric value of the field.
   * Can be a number or null when empty.
   */
  value?: number | null;
  /**
   * The uncontrolled default value of the field when initially rendered.
   */
  defaultValue?: number;
  /**
   * Event handler fired continuously as the value changes (typing, stepper buttons, arrow keys).
   */
  onValueChange?: (value: number | null) => void;
  /**
   * Event handler fired when the value is committed (e.g. on blur or pointer release).
   */
  onValueCommit?: (value: number | null) => void;
  /**
   * Whether the number field is in an invalid error state.
   */
  invalid?: boolean;
  /**
   * Size variant of the control assembly.
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
  /**
   * Placement of the stepper controls.
   * - "right": Decrement and increment side-by-side on the right (standard).
   * - "split": Decrement on left, input in center, increment on right (ideal for counters).
   * - "none": Text entry only without visible stepper buttons.
   * @default "right"
   */
  stepperPlacement?: "right" | "split" | "none";
  /**
   * Optional custom class for the underlying input element.
   */
  inputClassName?: string;
  /**
   * Accessible name for the increment action.
   * @default "Increase value"
   */
  incrementLabel?: string;
  /**
   * Accessible name for the decrement action.
   * @default "Decrease value"
   */
  decrementLabel?: string;
}

/**
 * NumberField — Forms & Fields Primitive
 *
 * An accessible numeric-entry control with keyboard editing, decimal precision,
 * range boundaries, and optional increment/decrement actions.
 */
export const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
  function NumberField(
    {
      className,
      value,
      defaultValue,
      onValueChange,
      onValueCommit,
      min,
      max,
      step = 1,
      disabled: propDisabled,
      readOnly,
      required: propRequired,
      invalid: propInvalid,
      id: propId,
      size = "default",
      stepperPlacement = "right",
      inputClassName,
      incrementLabel = "Increase value",
      decrementLabel = "Decrease value",
      children,
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
        data-slot="number-field"
        id={fieldProps.id}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        onValueCommitted={handleValueCommit}
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
        {children ? (
          children
        ) : (
          <NumberFieldGroup size={size} invalid={isInvalid}>
            {stepperPlacement === "split" && (
              <>
                <NumberFieldDecrement size={size} aria-label={decrementLabel} />
                <NumberFieldInput
                  className={cn("text-center", inputClassName)}
                  aria-describedby={fieldProps["aria-describedby"]}
                  aria-invalid={isInvalid ? "true" : undefined}
                />
                <NumberFieldIncrement size={size} aria-label={incrementLabel} />
              </>
            )}

            {stepperPlacement === "right" && (
              <>
                <NumberFieldInput
                  className={inputClassName}
                  aria-describedby={fieldProps["aria-describedby"]}
                  aria-invalid={isInvalid ? "true" : undefined}
                />
                <div className="flex items-center gap-0.5 pr-0.5">
                  <NumberFieldDecrement size={size} aria-label={decrementLabel} />
                  <NumberFieldIncrement size={size} aria-label={incrementLabel} />
                </div>
              </>
            )}

            {stepperPlacement === "none" && (
              <NumberFieldInput
                className={inputClassName}
                aria-describedby={fieldProps["aria-describedby"]}
                aria-invalid={isInvalid ? "true" : undefined}
              />
            )}
          </NumberFieldGroup>
        )}
      </NumberFieldPrimitive.Root>
    );
  }
);

NumberField.displayName = "NumberField";

export default NumberField;
