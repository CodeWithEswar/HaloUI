import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * HaloUI ButtonGroup Variants
 *
 * Visually connects related independent actions into one coherent control cluster:
 * - Coordinates outer border-radius while collapsing adjoining inner geometry.
 * - Overlaps adjacent 1px borders with `-ms-px` / `-mt-px` to avoid thick 2px seams.
 * - Establishes relative stacking contexts so hovered, focused, and active controls
 *   rise above adjacent siblings without clipping focus rings or material edges.
 */
export const buttonGroupVariants = cva(
  [
    "inline-flex isolate items-stretch",
    // Child stacking context for borders and Halo Focus Ring layering
    "[&>*]:hover:z-10",
    "[&>*]:focus-visible:z-20",
    "[&>*]:active:z-20",
  ],
  {
    variants: {
      orientation: {
        horizontal: [
          "flex-row",
          "[&>:first-child:not(:last-child)]:rounded-e-none",
          "[&>:last-child:not(:first-child)]:rounded-s-none",
          "[&>:not(:first-child):not(:last-child)]:rounded-none",
          "[&>:not(:first-child)]:-ms-px",
        ],
        vertical: [
          "flex-col",
          "[&>:first-child:not(:last-child)]:rounded-b-none",
          "[&>:last-child:not(:first-child)]:rounded-t-none",
          "[&>:not(:first-child):not(:last-child)]:rounded-none",
          "[&>:not(:first-child)]:-mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

export type ButtonGroupOrientation = NonNullable<VariantProps<typeof buttonGroupVariants>["orientation"]>;

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  /**
   * Render as Radix Slot child component for polymorphic composition.
   */
  asChild?: boolean;
}

/**
 * ButtonGroup — HaloUI Actions Primitive
 *
 * Visually connects related independent actions while preserving the semantics,
 * focus behavior, and activation model of each control.
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      asChild = false,
      role,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        role={role}
        aria-orientation={orientation === "vertical" && role === "group" ? "vertical" : undefined}
        data-slot="button-group"
        data-orientation={orientation}
        className={cn(buttonGroupVariants({ orientation }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";
