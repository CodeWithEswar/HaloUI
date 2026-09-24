"use client";

import * as React from "react";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * HaloUI SegmentedControl Variants
 *
 * Restrained shared track supporting compact, mutually exclusive mode/value selection.
 * Adheres strictly to the single-selection contract: one value is always selected and cannot
 * be deselected to empty.
 */
export const segmentedControlVariants = cva(
  [
    "inline-flex items-center isolate select-none overflow-hidden",
    "p-1 rounded-xl border border-black/[0.08] dark:border-white/[0.10]",
    "bg-neutral-200/50 dark:bg-neutral-900/60 backdrop-blur-md",
    "transition-colors duration-150 ease-out",
  ],
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      fullWidth: {
        true: "w-full flex",
        false: "w-fit",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      fullWidth: false,
    },
  }
);

export const segmentedControlItemVariants = cva(
  [
    "group/segment relative inline-flex items-center justify-center font-medium select-none cursor-pointer",
    "transition-all duration-150 ease-out outline-none whitespace-nowrap shrink-0",
    // Base unselected styling
    "text-muted-foreground hover:text-foreground bg-transparent border border-transparent",
    "hover:bg-black/[0.03] dark:hover:bg-white/[0.04]",
    // Selected state (aria-checked="true" / data-checked)
    "data-checked:text-foreground data-checked:font-semibold",
    "data-checked:bg-white dark:data-checked:bg-neutral-800",
    "data-checked:border-black/[0.08] dark:data-checked:border-white/[0.12]",
    "data-checked:shadow-[0_1px_3px_0_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06)]",
    "dark:data-checked:shadow-[0_1px_3px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
    // Independent Double-Contrast Focus Ring (Focus is NOT Selected)
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)]",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:z-20 halo-focus-ring",
    // Tactile press response
    "active:scale-[0.98] motion-reduce:active:scale-100",
    // Disabled state
    "disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none",
    // SVG child alignment
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      size: {
        sm: "h-7 px-2.5 text-xs rounded-lg gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        default: "h-8.5 px-3.5 text-xs sm:text-sm rounded-lg gap-2 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-10 px-4.5 text-sm sm:text-base rounded-xl gap-2.5 [&_svg:not([class*='size-'])]:size-4.5",
      },
      fullWidth: {
        true: "flex-1",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      fullWidth: false,
    },
  }
);

export type SegmentedControlSize = NonNullable<
  VariantProps<typeof segmentedControlItemVariants>["size"]
>;

interface SegmentedControlContextValue {
  size: SegmentedControlSize;
  disabled?: boolean;
  fullWidth?: boolean;
}

const SegmentedControlContext = React.createContext<SegmentedControlContextValue>({
  size: "default",
  disabled: false,
  fullWidth: false,
});

export function useSegmentedControlContext() {
  return React.useContext(SegmentedControlContext);
}

export interface SegmentedControlProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive>, "value" | "defaultValue" | "onValueChange">,
    VariantProps<typeof segmentedControlVariants> {
  /**
   * The controlled value of the selected segment.
   */
  value?: string;
  /**
   * The initial selected value for uncontrolled usage.
   */
  defaultValue?: string;
  /**
   * Callback fired when the selected segment changes.
   */
  onValueChange?: (value: string) => void;
  /**
   * Size tier applied to all child segments.
   * @default "default"
   */
  size?: SegmentedControlSize;
  /**
   * Whether the entire segmented control is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether segments expand to distribute equally across full container width.
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * SegmentedControl — HaloUI Actions 11
 *
 * A compact control for switching between a small set of mutually exclusive modes or values.
 * Powered by Base UI's accessible radiogroup primitives with roving tabindex arrow key navigation,
 * strict single selection (no empty selection), and HaloUI's restrained optical materials.
 */
export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      className,
      size = "default",
      disabled = false,
      fullWidth = false,
      orientation = "horizontal",
      value,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const handleValueChange = (val: any) => {
      if (val !== undefined && val !== null) {
        onValueChange?.(String(val));
      }
    };

    return (
      <SegmentedControlContext.Provider value={{ size, disabled, fullWidth }}>
        <RadioGroupPrimitive
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          aria-orientation={orientation ?? undefined}
          data-slot="segmented-control"
          data-size={size}
          data-orientation={orientation}
          className={cn(segmentedControlVariants({ orientation, fullWidth }), className)}
          {...props}
        >
          {children}
        </RadioGroupPrimitive>
      </SegmentedControlContext.Provider>
    );
  }
);

SegmentedControl.displayName = "SegmentedControl";

export interface SegmentedControlItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioPrimitive.Root>, "value"> {
  /**
   * Stable semantic value of the segment (e.g. "list", "grid", "compact").
   */
  value: string;
  /**
   * Accessible label for icon-only segments.
   */
  "aria-label"?: string;
  /**
   * Explicit size override for this item.
   */
  size?: SegmentedControlSize;
  /**
   * Explicit disabled state for this segment item.
   */
  disabled?: boolean;
}

/**
 * SegmentedControlItem
 *
 * An individual selectable option within a SegmentedControl.
 * Implements accessible radio semantics with roving focus, unmistakable selected state,
 * and double-contrast focus rings.
 */
export const SegmentedControlItem = React.forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  ({ className, value, size: itemSize, disabled: itemDisabled, children, ...props }, ref) => {
    const context = useSegmentedControlContext();
    const effectiveSize = itemSize ?? context.size;
    const effectiveDisabled = itemDisabled ?? context.disabled;
    const effectiveFullWidth = context.fullWidth;

    return (
      <RadioPrimitive.Root
        ref={ref}
        value={value}
        disabled={effectiveDisabled}
        data-slot="segmented-control-item"
        data-size={effectiveSize}
        render={<button type="button" />}
        className={cn(
          segmentedControlItemVariants({
            size: effectiveSize,
            fullWidth: effectiveFullWidth,
          }),
          className
        )}
        {...props}
      >
        {children}
      </RadioPrimitive.Root>
    );
  }
);

SegmentedControlItem.displayName = "SegmentedControlItem";
