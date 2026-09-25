"use client";

import * as React from "react";
import { StarIcon } from "@hugeicons/core-free-icons";
import { type IconSvgElement } from "@hugeicons/react";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";
import { useFieldControlProps, useFieldContext } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* RatingInput Context                                                        */
/* -------------------------------------------------------------------------- */

interface RatingInputContextValue {
  value: number | null;
  hoveredValue: number | null;
  max: number;
  disabled: boolean;
  readOnly: boolean;
  size: "sm" | "md" | "lg";
  focusedIndex: number | null;
  icon?: IconSvgElement;
  onItemSelect: (val: number) => void;
  onItemHover: (val: number) => void;
  onItemHoverLeave: () => void;
  onItemFocus: (val: number) => void;
  onItemBlur: () => void;
}

const RatingInputContext = React.createContext<RatingInputContextValue | null>(null);

export function useRatingInputContext() {
  const context = React.useContext(RatingInputContext);
  if (!context) {
    throw new Error("RatingInput compound components must be rendered inside a <RatingInput />");
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/* Types & Interfaces                                                         */
/* -------------------------------------------------------------------------- */

export type RatingSize = "sm" | "md" | "lg";

export interface RatingInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * The controlled rating value (1 to max, or null for empty).
   */
  value?: number | null;
  /**
   * The initial uncontrolled rating value.
   */
  defaultValue?: number | null;
  /**
   * Callback fired when a rating score is committed.
   */
  onValueChange?: (value: number) => void;
  /**
   * Maximum score on the scale.
   * @default 5
   */
  max?: number;
  /**
   * Size of rating items and touch targets.
   * @default "md"
   */
  size?: RatingSize;
  /**
   * Whether the rating input is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the rating input is read-only.
   * Note: For display-only ratings, use RatingDisplay rather than read-only RatingInput.
   */
  readOnly?: boolean;
  /**
   * Whether the rating input is invalid.
   */
  invalid?: boolean;
  /**
   * Whether a selection is required.
   */
  required?: boolean;
  /**
   * Custom icon element from Hugeicons.
   * @default StarIcon
   */
  icon?: IconSvgElement;
  /**
   * Descriptive labels for each score index (1-based), e.g. ["Poor", "Fair", "Good", "Very Good", "Excellent"].
   */
  labels?: string[];
  /**
   * Accessible name generator for each rating item.
   */
  getItemAriaLabel?: (itemValue: number, max: number, label?: string) => string;
}

/* -------------------------------------------------------------------------- */
/* RatingInput Root                                                           */
/* -------------------------------------------------------------------------- */

/**
 * RatingInput — Forms & Fields Primitive 28
 *
 * An accessible single-value rating control for choosing a score from an ordered icon-based scale.
 * Implements W3C radio-group semantics, roving focus, cumulative visual fill, and temporary hover preview.
 */
export const RatingInput = React.forwardRef<HTMLDivElement, RatingInputProps>(
  function RatingInput(
    {
      value: controlledValue,
      defaultValue = null,
      onValueChange,
      max = 5,
      size = "md",
      disabled: propDisabled,
      readOnly = false,
      invalid: propInvalid,
      required: propRequired,
      icon = StarIcon,
      labels,
      getItemAriaLabel,
      className,
      id: propId,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      onKeyDown: propOnKeyDown,
      children,
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

    const fieldContext = useFieldContext();
    const isDisabled = Boolean(propDisabled || fieldProps.disabled);
    const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);
    const isRequired = Boolean(propRequired || fieldProps.required);

    // Controlled vs Uncontrolled value state
    const [internalValue, setInternalValue] = React.useState<number | null>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const committedValue = isControlled ? controlledValue : internalValue;

    // Temporary hover preview state (never commits until activation)
    const [hoveredValue, setHoveredValue] = React.useState<number | null>(null);

    // Coordinated keyboard roving focus state
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // Determine which item receives roving tabIndex={0}
    // If a value is selected, that value is the active tab stop; otherwise item 1
    const activeTabIndex = committedValue ? committedValue : 1;

    const commitRating = React.useCallback(
      (newRating: number) => {
        if (isDisabled || readOnly) return;
        const clamped = Math.max(1, Math.min(max, newRating));
        if (!isControlled) {
          setInternalValue(clamped);
        }
        onValueChange?.(clamped);
      },
      [isDisabled, isControlled, max, onValueChange, readOnly]
    );

    const handleItemHover = React.useCallback(
      (rating: number) => {
        if (isDisabled || readOnly) return;
        setHoveredValue(rating);
      },
      [isDisabled, readOnly]
    );

    const handleItemHoverLeave = React.useCallback(() => {
      setHoveredValue(null);
    }, []);

    const handleItemFocus = React.useCallback((rating: number) => {
      setFocusedIndex(rating);
    }, []);

    const handleItemBlur = React.useCallback(() => {
      setFocusedIndex(null);
    }, []);

    // Coordinated Arrow navigation across radio items
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      propOnKeyDown?.(e);
      if (isDisabled || readOnly) return;

      const current = focusedIndex ?? committedValue ?? 1;
      let target: number | null = null;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          target = current < max ? current + 1 : current;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          target = current > 1 ? current - 1 : current;
          break;
        case "Home":
          e.preventDefault();
          target = 1;
          break;
        case "End":
          e.preventDefault();
          target = max;
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          if (focusedIndex !== null) {
            commitRating(focusedIndex);
          }
          return;
      }

      if (target !== null) {
        setFocusedIndex(target);
        commitRating(target);
        // Focus the corresponding item button
        const itemEl = containerRef.current?.querySelector<HTMLButtonElement>(
          `[data-rating-value="${target}"]`
        );
        itemEl?.focus();
      }
    };

    const contextValue = React.useMemo<RatingInputContextValue>(
      () => ({
        value: committedValue,
        hoveredValue,
        max,
        disabled: isDisabled,
        readOnly,
        size,
        focusedIndex,
        icon,
        onItemSelect: commitRating,
        onItemHover: handleItemHover,
        onItemHoverLeave: handleItemHoverLeave,
        onItemFocus: handleItemFocus,
        onItemBlur: handleItemBlur,
      }),
      [
        committedValue,
        hoveredValue,
        max,
        isDisabled,
        readOnly,
        size,
        focusedIndex,
        icon,
        commitRating,
        handleItemHover,
        handleItemHoverLeave,
        handleItemFocus,
        handleItemBlur,
      ]
    );

    // Items array 1..max
    const items = React.useMemo(() => {
      return Array.from({ length: max }, (_, i) => i + 1);
    }, [max]);

    const effectiveLabelledBy = ariaLabelledBy || fieldContext?.labelId;
    const defaultGroupLabel = !ariaLabel && !effectiveLabelledBy ? "Rating" : undefined;

    return (
      <RatingInputContext.Provider value={contextValue}>
        <div
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          role="radiogroup"
          aria-label={ariaLabel || defaultGroupLabel}
          aria-labelledby={effectiveLabelledBy}
          aria-describedby={fieldProps["aria-describedby"]}
          aria-invalid={isInvalid ? "true" : undefined}
          aria-required={isRequired ? "true" : undefined}
          aria-disabled={isDisabled ? "true" : undefined}
          data-slot="rating-input"
          data-disabled={isDisabled ? "true" : undefined}
          data-invalid={isInvalid ? "true" : undefined}
          onKeyDown={handleKeyDown}
          onMouseLeave={handleItemHoverLeave}
          className={cn(
            "relative inline-flex items-center gap-1 select-none",
            isDisabled && "opacity-40 pointer-events-none cursor-not-allowed",
            className
          )}
          {...props}
        >
          {children ||
            items.map((ratingVal) => {
              const label = labels?.[ratingVal - 1];
              const computedAria = getItemAriaLabel
                ? getItemAriaLabel(ratingVal, max, label)
                : label
                ? `${ratingVal} of ${max} stars, ${label}`
                : `${ratingVal} of ${max} stars`;

              return (
                <RatingInputItem
                  key={ratingVal}
                  value={ratingVal}
                  aria-label={computedAria}
                  isRovingActive={activeTabIndex === ratingVal}
                />
              );
            })}
        </div>
      </RatingInputContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* RatingInputItem                                                            */
/* -------------------------------------------------------------------------- */

export interface RatingInputItemProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "value"> {
  /**
   * The 1-based rating score this item represents.
   */
  value: number;
  /**
   * Whether this item is the designated roving tab stop (tabIndex=0).
   */
  isRovingActive?: boolean;
}

export const RatingInputItem = React.forwardRef<HTMLButtonElement, RatingInputItemProps>(
  function RatingInputItem(
    { value: itemValue, isRovingActive, className, "aria-label": ariaLabel, ...props },
    ref
  ) {
    const ctx = useRatingInputContext();

    // Cumulative fill calculation:
    // If hovering, preview fills up to hoveredValue. Otherwise fills up to committed value.
    const effectiveRating = ctx.hoveredValue !== null ? ctx.hoveredValue : (ctx.value ?? 0);
    const isFilled = itemValue <= effectiveRating;
    const isCommitted = ctx.value === itemValue;
    const isFocused = ctx.focusedIndex === itemValue;

    // Hit target and icon size metrics
    const sizeConfig = {
      sm: { hit: "w-8 h-8", icon: 16 },
      md: { hit: "w-10 h-10", icon: 20 },
      lg: { hit: "w-12 h-12", icon: 24 },
    }[ctx.size];

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        tabIndex={isRovingActive ? 0 : -1}
        aria-checked={isCommitted}
        aria-posinset={itemValue}
        aria-setsize={ctx.max}
        aria-label={ariaLabel ?? `${itemValue} of ${ctx.max} stars`}
        disabled={ctx.disabled}
        data-slot="rating-item"
        data-rating-value={itemValue}
        data-filled={isFilled ? "true" : "false"}
        data-committed={isCommitted ? "true" : "false"}
        onClick={() => ctx.onItemSelect(itemValue)}
        onMouseEnter={() => ctx.onItemHover(itemValue)}
        onFocus={() => ctx.onItemFocus(itemValue)}
        onBlur={ctx.onItemBlur}
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl p-0 transition-transform duration-100 ease-out outline-none",
          sizeConfig.hit,
          // Touch target padding without bloating icon SVG visually
          "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 halo-focus-ring",
          !ctx.disabled && !ctx.readOnly && "cursor-pointer active:scale-90 hover:scale-110",
          ctx.disabled && "cursor-not-allowed",
          className
        )}
        {...props}
      >
        <HaloIcon
          icon={ctx.icon || StarIcon}
          size={sizeConfig.icon}
          className={cn(
            "transition-all duration-150 ease-out",
            isFilled
              ? "text-amber-400 dark:text-amber-300 [&_path]:fill-amber-400 dark:[&_path]:fill-amber-300 [&_path]:stroke-amber-400 dark:[&_path]:stroke-amber-300 filter drop-shadow-[0_1px_4px_rgba(251,191,36,0.3)]"
              : "text-muted-foreground/35 [&_path]:fill-transparent [&_path]:stroke-muted-foreground/50 hover:text-muted-foreground/60"
          )}
        />
      </button>
    );
  }
);
