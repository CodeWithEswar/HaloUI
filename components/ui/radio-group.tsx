"use client";

import * as React from "react";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "@/lib/utils";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* RadioGroup Context                                                         */
/* -------------------------------------------------------------------------- */

interface RadioGroupContextValue {
  disabled?: boolean;
  invalid?: boolean;
  orientation?: "vertical" | "horizontal";
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

export function useRadioGroupContext() {
  return React.useContext(RadioGroupContext);
}

/* -------------------------------------------------------------------------- */
/* RadioGroup Root                                                            */
/* -------------------------------------------------------------------------- */

export interface RadioGroupProps<Value = string>
  extends Omit<RadioGroupPrimitive.Props<Value>, "render"> {
  /**
   * Layout arrangement for the radio items.
   * - "vertical" (default): stacks options vertically.
   * - "horizontal": organizes options horizontally with natural wrapping.
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Whether the radio group has a validation error.
   */
  invalid?: boolean;
}

/**
 * RadioGroup — Forms & Fields Primitive
 *
 * An accessible mutually exclusive option set for selecting exactly one value from a related group.
 * Features coordinated roving-focus keyboard navigation and HaloUI's 10-layer physical liquid glass engine.
 */
export function RadioGroup<Value = string>({
  className,
  orientation = "vertical",
  disabled: propDisabled,
  invalid: propInvalid,
  children,
  id: propId,
  ...props
}: RadioGroupProps<Value>) {
  const fieldProps = useFieldControlProps({
    id: propId,
    disabled: propDisabled,
    "aria-invalid": propInvalid,
  });

  const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);
  const isDisabled = Boolean(propDisabled || fieldProps.disabled);

  const contextValue = React.useMemo<RadioGroupContextValue>(
    () => ({
      disabled: isDisabled,
      invalid: isInvalid,
      orientation,
    }),
    [isDisabled, isInvalid, orientation]
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <RadioGroupPrimitive
        render={
          <fieldset
            className={cn("border-none p-0 m-0 w-full min-w-0", className)}
          />
        }
        data-slot="radio-group"
        data-orientation={orientation}
        aria-invalid={isInvalid ? "true" : undefined}
        aria-describedby={fieldProps["aria-describedby"]}
        disabled={isDisabled}
        {...props}
      >
        <div
          className={cn(
            "w-full",
            orientation === "vertical" && "flex flex-col gap-3",
            orientation === "horizontal" && "flex flex-wrap gap-4 sm:gap-6"
          )}
        >
          {children}
        </div>
      </RadioGroupPrimitive>
    </RadioGroupContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* RadioGroupItem                                                             */
/* -------------------------------------------------------------------------- */

export interface RadioGroupItemProps<Value = string>
  extends RadioPrimitive.Root.Props<Value> {
  invalid?: boolean;
}

export function RadioGroupItem<Value = string>({
  className,
  disabled: propDisabled,
  invalid: propInvalid,
  children,
  ...props
}: RadioGroupItemProps<Value>) {
  const groupContext = useRadioGroupContext();
  const isDisabled = Boolean(propDisabled || groupContext.disabled);
  const isInvalid = Boolean(propInvalid || groupContext.invalid);

  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      disabled={isDisabled}
      aria-invalid={isInvalid ? "true" : undefined}
      className={cn(
        // HaloUI Physical Optical Liquid Glass Engine
        "halo-liquid-glass peer relative flex size-4.5 shrink-0 items-center justify-center rounded-full transition-all duration-150 outline-none cursor-pointer isolate select-none aspect-square",
        "bg-white/60 dark:bg-white/[0.06] backdrop-blur-xl backdrop-saturate-180",
        "border border-black/[0.14] dark:border-white/[0.18]",
        "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_1px_2px_0_rgba(0,0,0,0.06)]",
        "dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.18),0_1px_3px_0_rgba(0,0,0,0.5)]",
        // Hover
        "hover:bg-white/80 dark:hover:bg-white/[0.1] hover:border-black/[0.24] dark:hover:border-white/[0.28]",
        // Tactile compression
        "active:scale-[0.94]",
        // Checked state
        "data-checked:border-primary data-checked:bg-white/90 dark:data-checked:bg-white/[0.12]",
        "data-checked:shadow-[0_2px_10px_-1px_rgba(2,132,199,0.4),inset_0_1.5px_1px_0_rgba(255,255,255,0.8)]",
        // Focus ring (Independent Double-Contrast Halo Focus Ring)
        "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background halo-focus-ring",
        // Invalid state (Dual Indicator Visibility)
        isInvalid && "border-destructive/90 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.4)] dark:border-destructive/80",
        // Disabled state
        isDisabled && "cursor-not-allowed opacity-35 shadow-none pointer-events-none",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-full items-center justify-center animate-in fade-in-0 zoom-in-75 duration-100"
      >
        <span className="size-2 rounded-full bg-primary shadow-[0_1px_6px_0_rgba(2,132,199,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.7)]" />
      </RadioPrimitive.Indicator>
      {children}
    </RadioPrimitive.Root>

  );
}

/* -------------------------------------------------------------------------- */
/* RadioGroup Supporting Primitives                                           */
/* -------------------------------------------------------------------------- */

export interface RadioGroupLabelProps extends React.ComponentProps<"legend"> {
  required?: boolean;
}

export function RadioGroupLabel({
  className,
  children,
  required,
  ...props
}: RadioGroupLabelProps) {
  return (
    <legend
      data-slot="radio-group-label"
      className={cn(
        "text-sm font-medium text-foreground leading-none mb-3 block select-none",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span
          className="ml-1 text-destructive font-bold text-xs"
          aria-hidden="true"
        >
          *
        </span>
      )}
    </legend>
  );
}

export interface RadioGroupDescriptionProps extends React.ComponentProps<"p"> {}

export function RadioGroupDescription({
  className,
  ...props
}: RadioGroupDescriptionProps) {
  return (
    <p
      data-slot="radio-group-description"
      className={cn("text-xs text-muted-foreground leading-relaxed -mt-1.5 mb-3", className)}
      {...props}
    />
  );
}

export interface RadioGroupOptionProps extends React.ComponentProps<"div"> {}

export function RadioGroupOption({ className, ...props }: RadioGroupOptionProps) {
  return (
    <div
      data-slot="radio-group-option"
      className={cn("flex items-start gap-3", className)}
      {...props}
    />
  );
}
