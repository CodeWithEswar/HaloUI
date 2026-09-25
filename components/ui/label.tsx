import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.ComponentProps<"label"> {}

/**
 * Label — Forms & Fields Primitive
 *
 * An accessible text label for associating a visible name with a form control.
 * Provides programmatic association via `htmlFor`, consistent typography, and
 * disabled-state coordination without adding client runtime overhead.
 */
export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        className
      )}
      {...props}
    />
  );
}
