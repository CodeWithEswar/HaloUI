"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Slider Component (Single Value)                                            */
/* -------------------------------------------------------------------------- */

export interface SliderProps
  extends Omit<
    SliderPrimitive.Root.Props<number>,
    "value" | "defaultValue" | "onValueChange" | "onValueCommitted"
  > {
  /**
   * The controlled numeric value of the slider.
   */
  value?: number;
  /**
   * The initial numeric value of the slider when uncontrolled.
   */
  defaultValue?: number;
  /**
   * Event handler called when the value changes during interaction.
   */
  onValueChange?: (value: number) => void;
  /**
   * Event handler called when a value change is committed (e.g. pointer release or keyboard stop).
   */
  onValueCommit?: (value: number) => void;
  /**
   * Optional custom accessible value text formatter.
   */
  getValueText?: (value: number) => string;
}

/**
 * Slider — Forms & Fields Primitive
 *
 * An accessible single-value range control for choosing a numeric value
 * within defined minimum and maximum bounds.
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(
    {
      className,
      value,
      defaultValue = 0,
      onValueChange,
      onValueCommit,
      min = 0,
      max = 100,
      step = 1,
      disabled: propDisabled,
      orientation = "horizontal",
      id: propId,
      "aria-label": ariaLabel = "Slider",
      "aria-labelledby": ariaLabelledBy,
      "aria-valuetext": ariaValueText,
      getValueText,
      ...props
    },
    ref
  ) {
    const fieldProps = useFieldControlProps({
      id: propId,
      disabled: propDisabled,
    });

    const isDisabled = Boolean(propDisabled || fieldProps.disabled);

    const handleValueChange = React.useCallback(
      (val: number) => {
        onValueChange?.(val);
      },
      [onValueChange]
    );

    const handleValueCommit = React.useCallback(
      (val: number) => {
        onValueCommit?.(val);
      },
      [onValueCommit]
    );

    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="slider"
        id={fieldProps.id}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        onValueCommitted={handleValueCommit}
        min={min}
        max={max}
        step={step}
        disabled={isDisabled}
        orientation={orientation}
        thumbAlignment="center"
        className={cn(
          "group/slider relative flex touch-none select-none isolate w-full",
          orientation === "horizontal"
            ? "h-6 items-center"
            : "h-48 w-6 flex-col justify-center items-center",
          isDisabled && "cursor-not-allowed opacity-40 pointer-events-none",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Control
          className={cn(
            "relative flex items-center select-none w-full",
            orientation === "horizontal" ? "w-full" : "h-full flex-col justify-center"
          )}
        >
          {/* Optical Substrate Track */}
          <SliderPrimitive.Track
            data-slot="slider-track"
            className={cn(
              "relative grow overflow-hidden rounded-full transition-colors select-none",
              // Halo Liquid Optical Channel
              "bg-black/[0.12] dark:bg-white/[0.16] border border-black/10 dark:border-white/15",
              "shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.15),0_1px_1px_0_rgba(255,255,255,0.7)]",
              "dark:shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.6),0_1px_1px_0_rgba(255,255,255,0.06)]",
              orientation === "horizontal" ? "h-2 w-full" : "h-full w-2"
            )}
          >
            {/* Active Range Fill */}
            <SliderPrimitive.Indicator
              data-slot="slider-range"
              className={cn(
                "bg-primary select-none rounded-full transition-none",
                "shadow-[0_1px_4px_-1px_rgba(2,132,199,0.4)]",
                orientation === "horizontal" ? "h-full" : "w-full"
              )}
            />
          </SliderPrimitive.Track>

          {/* Interactive Focusable Thumb */}
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-valuetext={
              ariaValueText ??
              (getValueText && typeof value === "number"
                ? getValueText(value)
                : undefined)
            }
            className={cn(
              "block size-5 shrink-0 rounded-full select-none cursor-grab active:cursor-grabbing outline-none transition-none",
              // Physical optical glass bead
              "bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(0,0,0,0.1)]",
              "dark:bg-white dark:shadow-[0_2px_6px_0_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.95)]",
              "border border-black/15 dark:border-white/20",
              // Double-Contrast Halo Focus Ring on focused thumb
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background halo-focus-ring",
              // Active drag feedback
              "active:scale-110 transition-transform duration-100 ease-out",
              // Disabled
              isDisabled && "pointer-events-none cursor-not-allowed opacity-50 shadow-none"
            )}
          />
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
