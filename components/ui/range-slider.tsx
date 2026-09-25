"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Range Slider Component (Two Thumbs)                                        */
/* -------------------------------------------------------------------------- */

export type RangeValue = [number, number];

export interface RangeSliderProps
  extends Omit<
    SliderPrimitive.Root.Props<readonly number[]>,
    "value" | "defaultValue" | "onValueChange" | "onValueCommitted"
  > {
  /**
   * The controlled tuple value of the range slider [minVal, maxVal].
   */
  value?: RangeValue;
  /**
   * The initial tuple value of the range slider when uncontrolled.
   */
  defaultValue?: RangeValue;
  /**
   * Event handler called when either bound changes during interaction.
   */
  onValueChange?: (value: RangeValue) => void;
  /**
   * Event handler called when a bound change is committed.
   */
  onValueCommit?: (value: RangeValue) => void;
  /**
   * Accessible label for the lower/minimum bound thumb.
   * @default "Minimum value"
   */
  minLabel?: string;
  /**
   * Accessible label for the upper/maximum bound thumb.
   * @default "Maximum value"
   */
  maxLabel?: string;
  /**
   * Optional minimum steps required between the two thumbs.
   */
  minStepsBetweenThumbs?: number;
  /**
   * Collision behavior when thumbs meet.
   * @default "none"
   */
  thumbCollisionBehavior?: "push" | "swap" | "none";
  /**
   * Optional custom accessible value text formatter.
   */
  getValueText?: (value: number, index: 0 | 1) => string;
}

/**
 * RangeSlider — Forms & Fields Primitive
 *
 * An accessible two-thumb range control for selecting a bounded numeric interval
 * with independent keyboard focus, thumb collision handling, and optical liquid styling.
 */
export const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>(
  function RangeSlider(
    {
      className,
      value,
      defaultValue = [20, 80],
      onValueChange,
      onValueCommit,
      min = 0,
      max = 100,
      step = 1,
      disabled: propDisabled,
      orientation = "horizontal",
      minLabel = "Minimum value",
      maxLabel = "Maximum value",
      minStepsBetweenThumbs = 0,
      thumbCollisionBehavior = "none",
      getValueText,
      id: propId,
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
      (val: readonly number[]) => {
        if (Array.isArray(val) && val.length >= 2) {
          onValueChange?.([val[0], val[1]]);
        }
      },
      [onValueChange]
    );

    const handleValueCommit = React.useCallback(
      (val: readonly number[]) => {
        if (Array.isArray(val) && val.length >= 2) {
          onValueCommit?.([val[0], val[1]]);
        }
      },
      [onValueCommit]
    );

    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="range-slider"
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
        thumbCollisionBehavior={thumbCollisionBehavior}
        minStepsBetweenValues={minStepsBetweenThumbs}
        className={cn(
          "group/range-slider relative flex touch-none select-none isolate w-full",
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
            data-slot="range-slider-track"
            className={cn(
              "relative grow overflow-hidden rounded-full transition-colors select-none",
              // Halo Liquid Optical Channel
              "bg-black/[0.12] dark:bg-white/[0.16] border border-black/10 dark:border-white/15",
              "shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.15),0_1px_1px_0_rgba(255,255,255,0.7)]",
              "dark:shadow-[inset_0_1px_2px_0_rgba(0,0,0,0.6),0_1px_1px_0_rgba(255,255,255,0.06)]",
              orientation === "horizontal" ? "h-2 w-full" : "h-full w-2"
            )}
          >
            {/* Active Range Fill (Selected Interval Between Thumbs) */}
            <SliderPrimitive.Indicator
              data-slot="range-slider-range"
              className={cn(
                "bg-primary select-none rounded-full transition-none",
                "shadow-[0_1px_4px_-1px_rgba(2,132,199,0.4)]",
                orientation === "horizontal" ? "h-full" : "w-full"
              )}
            />
          </SliderPrimitive.Track>

          {/* Lower / Minimum Thumb */}
          <SliderPrimitive.Thumb
            index={0}
            data-slot="range-slider-thumb-min"
            aria-label={minLabel}
            aria-valuetext={
              getValueText && value
                ? getValueText(value[0], 0)
                : undefined
            }
            className={cn(
              "block size-5 shrink-0 rounded-full select-none cursor-grab active:cursor-grabbing outline-none transition-none z-10",
              // Physical optical glass bead
              "bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(0,0,0,0.1)]",
              "dark:bg-white dark:shadow-[0_2px_6px_0_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.95)]",
              "border border-black/15 dark:border-white/20",
              // Double-Contrast Halo Focus Ring on focused thumb
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background halo-focus-ring focus-visible:z-30",
              // Active drag feedback
              "active:scale-110 transition-transform duration-100 ease-out",
              // Disabled
              isDisabled && "pointer-events-none cursor-not-allowed opacity-50 shadow-none"
            )}
          />

          {/* Upper / Maximum Thumb */}
          <SliderPrimitive.Thumb
            index={1}
            data-slot="range-slider-thumb-max"
            aria-label={maxLabel}
            aria-valuetext={
              getValueText && value
                ? getValueText(value[1], 1)
                : undefined
            }
            className={cn(
              "block size-5 shrink-0 rounded-full select-none cursor-grab active:cursor-grabbing outline-none transition-none z-20",
              // Physical optical glass bead
              "bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(0,0,0,0.1)]",
              "dark:bg-white dark:shadow-[0_2px_6px_0_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.95)]",
              "border border-black/15 dark:border-white/20",
              // Double-Contrast Halo Focus Ring on focused thumb
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background halo-focus-ring focus-visible:z-30",
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

RangeSlider.displayName = "RangeSlider";

export default RangeSlider;
