"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Switch Component                                                           */
/* -------------------------------------------------------------------------- */

export interface SwitchProps extends SwitchPrimitive.Root.Props {
  /**
   * The size variant of the switch.
   * @default "default"
   */
  size?: "sm" | "default";
  /**
   * Whether the switch is in an invalid state.
   */
  invalid?: boolean;
}

/**
 * Switch — Forms & Fields Primitive
 *
 * An accessible binary control for immediately turning a setting on or off,
 * elevated with HaloUI's 10-layer physical liquid glass engine.
 */
export const Switch = React.forwardRef<HTMLElement, SwitchProps>(
  function Switch(
    {
      className,
      size = "default",
      checked,
      defaultChecked,
      onCheckedChange,
      disabled: propDisabled,
      required: propRequired,
      invalid: propInvalid,
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

    const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);
    const isDisabled = Boolean(propDisabled || fieldProps.disabled);
    const isRequired = Boolean(propRequired || fieldProps.required);

    return (
      <SwitchPrimitive.Root
        ref={ref}
        data-slot="switch"
        data-size={size}
        id={fieldProps.id}
        aria-describedby={fieldProps["aria-describedby"]}
        aria-invalid={isInvalid ? "true" : undefined}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={isDisabled}
        required={isRequired}
        className={cn(
          "peer group/switch relative inline-flex shrink-0 items-center rounded-full transition-colors duration-150 outline-none cursor-pointer isolate select-none",
          // Optical Track: Physical liquid glass channel with high-contrast baseline
          "bg-black/[0.08] hover:bg-black/[0.12] dark:bg-white/[0.08] dark:hover:bg-white/[0.12] backdrop-blur-xl backdrop-saturate-180",
          "border border-black/[0.12] dark:border-white/[0.16]",
          "shadow-[inset_0_1px_2.5px_0_rgba(0,0,0,0.15),0_1px_1px_0_rgba(255,255,255,0.7)]",
          "dark:shadow-[inset_0_1px_2.5px_0_rgba(0,0,0,0.6),0_1px_1px_0_rgba(255,255,255,0.08)]",
          // Focus Ring (Double-Contrast Halo Focus Ring)
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background halo-focus-ring",
          // Active / Checked State: luminous refractive liquid fill
          "data-checked:bg-primary/95 data-checked:border-primary/80 dark:data-checked:bg-primary/90 dark:data-checked:border-primary/70",
          "data-checked:shadow-[0_2px_12px_-1px_rgba(2,132,199,0.5),inset_0_1.5px_1px_0_rgba(255,255,255,0.65),inset_0_-1px_1px_0_rgba(0,0,0,0.2)]",
          // Invalid State
          "aria-invalid:border-destructive/80 aria-invalid:shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)]",
          // Dimensions
          "data-[size=default]:h-6 data-[size=default]:w-11 p-0.5",
          "data-[size=sm]:h-4.5 data-[size=sm]:w-8 p-0.5",
          // Disabled
          "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-40 data-disabled:shadow-none",
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className={cn(
            "pointer-events-none block rounded-full transition-transform duration-150 ease-out motion-reduce:transition-none",
            // Physical optical glass bead thumb with specular highlight
            "bg-white shadow-[0_2px_5px_0_rgba(0,0,0,0.25),inset_0_1.5px_1px_0_rgba(255,255,255,1),inset_0_-1px_1px_0_rgba(0,0,0,0.12)] border border-black/10 dark:border-white/20",
            "dark:bg-neutral-50 dark:shadow-[0_2px_8px_0_rgba(0,0,0,0.7),inset_0_1.5px_1px_0_rgba(255,255,255,1)]",

            // Sizes
            "group-data-[size=default]/switch:size-5",
            "group-data-[size=sm]/switch:size-3.5",
            // Position translations (LTR + RTL support)
            "group-data-[size=default]/switch:data-checked:translate-x-5 rtl:group-data-[size=default]/switch:data-checked:-translate-x-5",
            "group-data-[size=sm]/switch:data-checked:translate-x-3.5 rtl:group-data-[size=sm]/switch:data-checked:-translate-x-3.5",
            "group-data-[size=default]/switch:data-unchecked:translate-x-0 rtl:group-data-[size=default]/switch:data-unchecked:translate-x-0",
            "group-data-[size=sm]/switch:data-unchecked:translate-x-0 rtl:group-data-[size=sm]/switch:data-unchecked:translate-x-0"
          )}
        />
      </SwitchPrimitive.Root>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
