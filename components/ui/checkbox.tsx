"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "@/lib/utils";
import { MinusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Checkbox Component                                                         */
/* -------------------------------------------------------------------------- */

export interface CheckboxProps
  extends Omit<CheckboxPrimitive.Root.Props, "checked" | "onCheckedChange"> {
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  invalid?: boolean;
}

/**
 * Checkbox — Forms & Fields Primitive
 *
 * An accessible boolean selection control supporting unchecked, checked,
 * and indeterminate states, built with HaloUI's 10-layer physical liquid glass engine.
 */
export const Checkbox = React.forwardRef<HTMLElement, CheckboxProps>(
  function Checkbox(
    {
      className,
      checked: propChecked,
      indeterminate: propIndeterminate,
      defaultChecked,
      onCheckedChange,
      invalid: propInvalid,
      disabled: propDisabled,
      required: propRequired,
      id: propId,
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

    const isIndeterminate =
      propIndeterminate === true || propChecked === "indeterminate";
    const resolvedChecked =
      propChecked === "indeterminate" ? false : propChecked;

    const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);
    const isDisabled = Boolean(propDisabled || fieldProps.disabled);
    const isRequired = Boolean(propRequired || fieldProps.required);

    const handleCheckedChange = React.useCallback(
      (nextChecked: boolean) => {
        onCheckedChange?.(nextChecked);
      },
      [onCheckedChange]
    );

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        data-slot="checkbox"
        id={fieldProps.id}
        aria-describedby={fieldProps["aria-describedby"]}
        aria-invalid={isInvalid ? "true" : undefined}
        checked={resolvedChecked}
        defaultChecked={defaultChecked}
        indeterminate={isIndeterminate}
        onCheckedChange={handleCheckedChange}
        disabled={isDisabled}
        required={isRequired}
        className={cn(
          // Optical Liquid Glass Substrate & Layout
          "halo-liquid-glass peer group/checkbox relative flex size-4.5 shrink-0 items-center justify-center rounded-lg transition-all duration-150 outline-none cursor-pointer isolate select-none",
          "bg-white/60 dark:bg-white/[0.06] backdrop-blur-xl backdrop-saturate-180",
          "border border-black/[0.14] dark:border-white/[0.18]",
          "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9),0_1px_2px_0_rgba(0,0,0,0.06)]",
          "dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.18),0_1px_3px_0_rgba(0,0,0,0.5)]",
          // Hover state
          "hover:bg-white/80 dark:hover:bg-white/[0.1] hover:border-black/[0.24] dark:hover:border-white/[0.28]",
          // Tactile Active compression
          "active:scale-[0.94]",
          // Checked state: refractive liquid primary surface with optical specular edge
          "data-checked:border-primary data-checked:bg-white/90 dark:data-checked:bg-white/[0.14]",
          "data-checked:shadow-[0_2px_10px_-1px_rgba(2,132,199,0.45),inset_0_1.5px_1px_0_rgba(255,255,255,0.8),inset_0_-1px_1px_0_rgba(0,0,0,0.2)]",
          "dark:data-checked:shadow-[0_2px_12px_-1px_rgba(56,189,248,0.5),inset_0_1.5px_1px_0_rgba(255,255,255,0.35),inset_0_-1px_1px_0_rgba(0,0,0,0.6)]",
          // Indeterminate state
          "data-indeterminate:border-primary data-indeterminate:bg-white/90 dark:data-indeterminate:bg-white/[0.14]",
          "data-indeterminate:shadow-[0_2px_10px_-1px_rgba(2,132,199,0.45),inset_0_1.5px_1px_0_rgba(255,255,255,0.8),inset_0_-1px_1px_0_rgba(0,0,0,0.2)]",
          "dark:data-indeterminate:shadow-[0_2px_12px_-1px_rgba(56,189,248,0.5),inset_0_1.5px_1px_0_rgba(255,255,255,0.35),inset_0_-1px_1px_0_rgba(0,0,0,0.6)]",
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
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="grid place-content-center text-foreground dark:text-white transition-none"
        >
          <span className="hidden group-data-[indeterminate]/checkbox:inline [[data-indeterminate]_&]:inline text-foreground dark:text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
            <HaloIcon icon={MinusSignIcon} size={13} strokeWidth={2.5} />
          </span>
          <span className="inline group-data-[indeterminate]/checkbox:hidden [[data-indeterminate]_&]:hidden text-foreground dark:text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
            <HaloIcon icon={Tick02Icon} size={13} strokeWidth={2.5} />
          </span>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
