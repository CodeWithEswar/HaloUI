import * as React from "react";
import { cn } from "@/lib/utils";

export interface FieldGroupProps extends React.ComponentProps<"div"> {
  /**
   * Layout arrangement for the grouped fields.
   * - "vertical" (default): stacks fields vertically with consistent inter-field spacing rhythm.
   * - "horizontal": organizes fields in a responsive two-column grid on wider screens, stacking on mobile.
   */
  orientation?: "vertical" | "horizontal";
}

/**
 * FieldGroup — Forms & Fields Structural Primitive
 *
 * Organizes multiple related Field compositions into a consistent structural layout
 * without taking ownership of their values, validation, or individual semantics.
 */
export function FieldGroup({
  className,
  orientation = "vertical",
  ...props
}: FieldGroupProps) {
  return (
    <div
      data-slot="field-group"
      data-orientation={orientation}
      className={cn(
        "w-full",
        orientation === "vertical" && "flex flex-col gap-4 sm:gap-5",
        orientation === "horizontal" && "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5",
        className
      )}
      {...props}
    />
  );
}
