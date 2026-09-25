import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export interface NativeSelectProps extends React.ComponentProps<"select"> {}

/**
 * NativeSelect — Forms & Fields Primitive
 *
 * A styled native select for simple, reliable single-value choices
 * using the browser and operating system's built-in selection behavior,
 * elevated with HaloUI's 10-layer physical liquid glass engine.
 */
export function NativeSelect({
  className,
  children,
  disabled,
  ...props
}: NativeSelectProps) {
  return (
    <div
      data-slot="native-select-root"
      className="relative w-full min-w-0 inline-flex items-center isolate rounded-xl"
    >
      <select
        data-slot="native-select"
        disabled={disabled}
        className={cn(
          "halo-liquid-glass h-10 w-full min-w-0 appearance-none rounded-xl pl-3.5 pr-9 py-2 text-sm transition-all duration-150 outline-none cursor-pointer text-foreground",
          // Independent Double-Contrast Focus Ring (Halo Focus Ring)
          "focus-visible:border-[var(--halo-focus-color)] focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background halo-focus-ring",
          // Invalid state (Dual Indicator Visibility)
          "aria-invalid:border-destructive/80 aria-invalid:shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)] dark:aria-invalid:border-destructive/70",
          // Disabled state
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <span
        data-slot="native-select-chevron"
        aria-hidden="true"
        className="pointer-events-none absolute right-3 flex items-center justify-center text-muted-foreground select-none z-10"
      >
        <HaloIcon icon={ArrowDown01Icon} size={15} />
      </span>
    </div>
  );
}

export default NativeSelect;
