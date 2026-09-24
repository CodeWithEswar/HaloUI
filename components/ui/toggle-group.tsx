"use client";

import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Toggle,
  type ToggleProps,
  type ToggleVariant,
  type ToggleSize,
} from "@/components/ui/toggle";

/**
 * HaloUI ToggleGroup Variants
 *
 * Coordinates a cluster of persistent toggles with:
 * - Shared stacking context for optical edges and focus rings.
 * - Connected geometry (collapsed radii, overlapping 1px seams) or separated pill layout.
 * - Horizontal and vertical spatial orientations.
 */
export const toggleGroupVariants = cva(
  [
    "inline-flex isolate items-stretch",
    // Child stacking context for borders and Halo Focus Ring layering
    "[&>[data-slot=toggle]]:hover:z-10",
    "[&>[data-slot=toggle]]:focus-visible:z-20",
    "[&>[data-slot=toggle]]:active:z-20",
    "[&>[data-slot=toggle][data-pressed]]:z-[5]",
    "[&>[data-slot=toggle][aria-pressed=true]]:z-[5]",
  ],
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      spacing: {
        connected: "",
        separated: "gap-1.5 sm:gap-2",
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        spacing: "connected",
        className: [
          "[&>[data-slot=toggle]:first-child:not(:last-child)]:rounded-e-none",
          "[&>[data-slot=toggle]:last-child:not(:first-child)]:rounded-s-none",
          "[&>[data-slot=toggle]:not(:first-child):not(:last-child)]:rounded-none",
          "[&>[data-slot=toggle]:not(:first-child)]:-ms-px",
        ],
      },
      {
        orientation: "vertical",
        spacing: "connected",
        className: [
          "[&>[data-slot=toggle]:first-child:not(:last-child)]:rounded-b-none",
          "[&>[data-slot=toggle]:last-child:not(:first-child)]:rounded-t-none",
          "[&>[data-slot=toggle]:not(:first-child):not(:last-child)]:rounded-none",
          "[&>[data-slot=toggle]:not(:first-child)]:-mt-px",
        ],
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      spacing: "connected",
    },
  }
);

export type ToggleGroupOrientation = NonNullable<
  VariantProps<typeof toggleGroupVariants>["orientation"]
>;
export type ToggleGroupSpacing = NonNullable<
  VariantProps<typeof toggleGroupVariants>["spacing"]
>;

interface ToggleGroupContextValue {
  variant?: ToggleVariant;
  size?: ToggleSize;
  spacing?: ToggleGroupSpacing;
  disabled?: boolean;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: "default",
  size: "default",
  spacing: "connected",
  disabled: false,
});

export function useToggleGroupContext() {
  return React.useContext(ToggleGroupContext);
}

export type ToggleGroupType = "single" | "multiple";

// Public props supporting both standard shadcn (type="single" | "multiple") and Base UI (multiple: boolean)
export interface ToggleGroupProps<Value extends string = string>
  extends Omit<
      React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive>,
      "value" | "defaultValue" | "onValueChange" | "multiple" | "orientation"
    >,
    VariantProps<typeof toggleGroupVariants> {
  /**
   * Selection type: "single" allows only one pressed item; "multiple" allows any number.
   * @default "single"
   */
  type?: ToggleGroupType;
  /**
   * Base UI boolean flag for multiple selection.
   * If provided, takes precedence over type="single" | "multiple".
   */
  multiple?: boolean;
  /**
   * The controlled value of the pressed toggle(s).
   * String for single selection, array of strings for multiple selection.
   */
  value?: Value | Value[];
  /**
   * The default value for uncontrolled usage.
   */
  defaultValue?: Value | Value[];
  /**
   * Event handler called when value changes.
   */
  onValueChange?: (value: any) => void;
  /**
   * Inherited variant applied to all child ToggleGroupItems unless overridden.
   * @default "default"
   */
  variant?: ToggleVariant;
  /**
   * Inherited size tier applied to all child ToggleGroupItems unless overridden.
   * @default "default"
   */
  size?: ToggleSize;
  /**
   * Layout spacing: "connected" collapses adjoining boundaries; "separated" adds gaps.
   * @default "connected"
   */
  spacing?: ToggleGroupSpacing;
}

/**
 * ToggleGroup — HaloUI Actions Primitive
 *
 * Coordinates a single- or multi-selection set of two-state toggles.
 * Powered by Base UI with roving tabindex keyboard navigation and HaloUI liquid optical physics.
 */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      spacing = "connected",
      orientation = "horizontal",
      type = "single",
      multiple: multipleProp,
      value: valueProp,
      defaultValue: defaultValueProp,
      onValueChange,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const isMultiple = multipleProp ?? type === "multiple";

    // Normalize value to array for Base UI ToggleGroup primitive
    const normalizedValue = React.useMemo(() => {
      if (valueProp === undefined) return undefined;
      if (Array.isArray(valueProp)) return valueProp;
      return valueProp ? [valueProp] : [];
    }, [valueProp]);

    // Normalize defaultValue to array for Base UI ToggleGroup primitive
    const normalizedDefaultValue = React.useMemo(() => {
      if (defaultValueProp === undefined) return undefined;
      if (Array.isArray(defaultValueProp)) return defaultValueProp;
      return defaultValueProp ? [defaultValueProp] : [];
    }, [defaultValueProp]);

    // Value change adapter: emits string for single select, array for multiple select
    const handleValueChange = React.useCallback(
      (newValues: string[], eventDetails: any) => {
        if (!onValueChange) return;
        if (isMultiple) {
          onValueChange(newValues);
        } else {
          onValueChange(newValues[0] ?? "");
        }
      },
      [isMultiple, onValueChange]
    );

    const contextValue = React.useMemo(
      () => ({
        variant,
        size,
        spacing,
        disabled,
      }),
      [variant, size, spacing, disabled]
    );

    return (
      <ToggleGroupContext.Provider value={contextValue}>
        <ToggleGroupPrimitive
          ref={ref}
          data-slot="toggle-group"
          data-orientation={orientation ?? "horizontal"}
          data-spacing={spacing}
          orientation={orientation ?? "horizontal"}
          multiple={isMultiple}
          value={normalizedValue}
          defaultValue={normalizedDefaultValue}
          onValueChange={handleValueChange}
          disabled={disabled}
          className={cn(
            toggleGroupVariants({ orientation, spacing }),
            className
          )}
          {...props}
        >
          {children}
        </ToggleGroupPrimitive>
      </ToggleGroupContext.Provider>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

export interface ToggleGroupItemProps
  extends Omit<ToggleProps, "value"> {
  /**
   * Unique value identifying this item within the group. Required.
   */
  value: string;
}

/**
 * ToggleGroupItem — HaloUI Actions Primitive
 *
 * An individual toggle button within a ToggleGroup.
 * Automatically inherits variant, size, and disabled state from the parent ToggleGroup.
 */
export const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ className, variant, size, disabled, value, children, ...props }, ref) => {
  const context = useToggleGroupContext();

  const resolvedVariant = variant ?? context.variant ?? "default";
  const resolvedSize = size ?? context.size ?? "default";
  const resolvedDisabled = disabled ?? context.disabled ?? false;

  return (
    <Toggle
      ref={ref}
      data-slot="toggle-group-item"
      value={value}
      variant={resolvedVariant}
      size={resolvedSize}
      disabled={resolvedDisabled}
      className={cn("data-slot:toggle-group-item", className)}
      {...props}
    >
      {children}
    </Toggle>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";
