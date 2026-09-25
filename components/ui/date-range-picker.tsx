"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { format, isValid } from "date-fns";
import type { Locale } from "date-fns";
import type { DateRange as DayPickerDateRange } from "react-day-picker";
import { Calendar01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Calendar } from "@/components/ui/calendar";
import { parseDateOnly, formatDateOnly } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";
import { useFieldControlProps, useFieldContext } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Types & Normalization Utilities                                            */
/* -------------------------------------------------------------------------- */

export interface DateRange {
  from?: Date | null;
  to?: Date | null;
}

export interface DateRangeString {
  from?: string | null;
  to?: string | null;
}

/**
 * Normalizes input date range to ensure both endpoints use local calendar day representations.
 */
export function parseDateRange(
  range?: DateRange | { from?: string | null; to?: string | null } | null
): DateRange {
  if (!range) return { from: null, to: null };
  return {
    from: parseDateOnly(range.from),
    to: parseDateOnly(range.to),
  };
}

/**
 * Converts a DateRange into canonical ISO date-only strings (YYYY-MM-DD).
 */
export function formatDateRange(range?: DateRange | null): DateRangeString {
  if (!range) return { from: null, to: null };
  return {
    from: formatDateOnly(range.from),
    to: formatDateOnly(range.to),
  };
}

/**
 * Formats a date range into a concise human-readable string.
 * Communicates incomplete selection when only the start date is chosen.
 */
export function formatDisplayRange(
  range: DateRange | null | undefined,
  formatString = "LLL dd, y",
  locale?: Locale,
  placeholder = "Select date range"
): string {
  if (!range || !range.from || !isValid(range.from)) return placeholder;

  const fromFormatted = format(range.from, formatString, { locale });

  if (!range.to || !isValid(range.to)) {
    return `${fromFormatted} – Select end date`;
  }

  // Same day selection
  if (formatDateOnly(range.from) === formatDateOnly(range.to)) {
    return fromFormatted;
  }

  const toFormatted = format(range.to, formatString, { locale });
  return `${fromFormatted} – ${toFormatted}`;
}

/* -------------------------------------------------------------------------- */
/* DateRangePicker Context                                                    */
/* -------------------------------------------------------------------------- */

interface DateRangePickerContextValue {
  range: DateRange;
  rangeString: DateRangeString;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  disabled: boolean;
  invalid: boolean;
  required: boolean;
  placeholder: string;
  formatString: string;
  locale?: Locale;
  clearable: boolean;
  selectRange: (range: DayPickerDateRange | undefined) => void;
  clearRange: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DateRangePickerContext = React.createContext<DateRangePickerContextValue | null>(null);

export function useDateRangePickerContext() {
  const context = React.useContext(DateRangePickerContext);
  if (!context) {
    throw new Error("DateRangePicker compound components must be rendered inside a <DateRangePicker />");
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/* DateRangePicker Root                                                       */
/* -------------------------------------------------------------------------- */

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * Controlled date range value.
   */
  value?: DateRange | null;
  /**
   * Initial uncontrolled date range value.
   */
  defaultValue?: DateRange | null;
  /**
   * Callback fired when a start date or full range is selected.
   */
  onValueChange?: (range: DateRange, rangeString: DateRangeString) => void;
  /**
   * Placeholder string displayed when no date range has been selected.
   * @default "Select date range"
   */
  placeholder?: string;
  /**
   * date-fns format string for display formatting.
   * @default "LLL dd, y" (e.g. "Sep 25, 2026")
   */
  formatString?: string;
  /**
   * Optional date-fns Locale for localized names.
   */
  locale?: Locale;
  /**
   * Earliest selectable calendar date.
   */
  minDate?: Date;
  /**
   * Latest selectable calendar date.
   */
  maxDate?: Date;
  /**
   * Custom disabled dates predicate or array of disabled Date objects.
   */
  disabledDates?: ((date: Date) => boolean) | Date[];
  /**
   * Number of calendar months displayed side-by-side.
   * @default 2
   */
  numberOfMonths?: 1 | 2;
  /**
   * Whether to automatically close the popover after a complete range is selected.
   * @default true
   */
  closeOnComplete?: boolean;
  /**
   * Whether to display an inline clear button on the trigger.
   * @default false
   */
  clearable?: boolean;
  /**
   * Whether the control is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the control is invalid.
   */
  invalid?: boolean;
  /**
   * Whether choosing a complete date range is required.
   */
  required?: boolean;
  /**
   * Controlled open state.
   */
  open?: boolean;
  /**
   * Callback fired when popover opens or closes.
   */
  onOpenChange?: (open: boolean) => void;
}

/**
 * DateRangePicker — Forms & Fields Primitive 30
 *
 * An accessible calendar-backed control for selecting an ordered start and end date.
 * Reuses DatePicker calendar infrastructure while cleanly representing incomplete and complete interval states.
 */
export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  function DateRangePicker(
    {
      value: controlledValue,
      defaultValue = null,
      onValueChange,
      placeholder = "Select date range",
      formatString = "LLL dd, y",
      locale,
      minDate,
      maxDate,
      disabledDates,
      numberOfMonths = 2,
      closeOnComplete = true,
      clearable = false,
      disabled: propDisabled,
      invalid: propInvalid,
      required: propRequired,
      open: controlledOpen,
      onOpenChange,
      className,
      id: propId,
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

    const isDisabled = Boolean(propDisabled || fieldProps.disabled);
    const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);
    const isRequired = Boolean(propRequired || fieldProps.required);

    // Controlled vs Uncontrolled date range state
    const [internalValue, setInternalValue] = React.useState<DateRange>(() =>
      parseDateRange(defaultValue)
    );
    const isControlled = controlledValue !== undefined;
    const currentRange = isControlled ? parseDateRange(controlledValue) : internalValue;
    const currentRangeString = formatDateRange(currentRange);

    // Controlled vs Uncontrolled popover open state
    const [internalOpen, setInternalOpen] = React.useState<boolean>(false);
    const isControlledOpen = controlledOpen !== undefined;
    const isOpen = isControlledOpen ? controlledOpen : internalOpen;

    const triggerRef = React.useRef<HTMLButtonElement | null>(null);

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (isDisabled) return;
        if (!isControlledOpen) {
          setInternalOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
      },
      [isDisabled, isControlledOpen, onOpenChange]
    );

    const selectRange = React.useCallback(
      (dayPickerRange: DayPickerDateRange | undefined) => {
        if (isDisabled) return;

        let normalizedFrom = parseDateOnly(dayPickerRange?.from);
        let normalizedTo = parseDateOnly(dayPickerRange?.to);

        // Ensure chronological order
        if (normalizedFrom && normalizedTo && normalizedFrom > normalizedTo) {
          const temp = normalizedFrom;
          normalizedFrom = normalizedTo;
          normalizedTo = temp;
        }

        const newRange: DateRange = {
          from: normalizedFrom,
          to: normalizedTo,
        };

        if (!isControlled) {
          setInternalValue(newRange);
        }

        const formatted = formatDateRange(newRange);
        onValueChange?.(newRange, formatted);

        // If complete range selected and closeOnComplete is enabled, close popover and restore focus
        if (normalizedFrom && normalizedTo && closeOnComplete) {
          handleOpenChange(false);
          setTimeout(() => {
            triggerRef.current?.focus();
          }, 0);
        }
      },
      [closeOnComplete, handleOpenChange, isControlled, isDisabled, onValueChange]
    );

    const clearRange = React.useCallback(() => {
      if (isDisabled) return;
      const emptyRange: DateRange = { from: null, to: null };
      if (!isControlled) {
        setInternalValue(emptyRange);
      }
      onValueChange?.(emptyRange, { from: null, to: null });
      handleOpenChange(false);
      triggerRef.current?.focus();
    }, [handleOpenChange, isControlled, isDisabled, onValueChange]);

    const contextValue = React.useMemo<DateRangePickerContextValue>(
      () => ({
        range: currentRange,
        rangeString: currentRangeString,
        isOpen,
        setIsOpen: handleOpenChange,
        disabled: isDisabled,
        invalid: isInvalid,
        required: isRequired,
        placeholder,
        formatString,
        locale,
        clearable,
        selectRange,
        clearRange,
        triggerRef,
      }),
      [
        currentRange,
        currentRangeString,
        isOpen,
        handleOpenChange,
        isDisabled,
        isInvalid,
        isRequired,
        placeholder,
        formatString,
        locale,
        clearable,
        selectRange,
        clearRange,
      ]
    );

    // Compute disabled matcher
    const disabledMatcher = React.useMemo(() => {
      const matchers: Array<(d: Date) => boolean> = [];
      if (minDate) matchers.push((d) => d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()));
      if (maxDate) matchers.push((d) => d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()));
      if (disabledDates) {
        if (typeof disabledDates === "function") {
          matchers.push(disabledDates);
        } else if (Array.isArray(disabledDates)) {
          const disabledSet = new Set(disabledDates.map((d) => formatDateOnly(d)));
          matchers.push((d) => disabledSet.has(formatDateOnly(d)));
        }
      }
      return matchers.length > 0 ? (d: Date) => matchers.some((m) => m(d)) : undefined;
    }, [minDate, maxDate, disabledDates]);

    return (
      <DateRangePickerContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-slot="date-range-picker"
          className={cn("relative inline-block w-full max-w-sm", className)}
          {...props}
        >
          <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
            {children || (
              <>
                <DateRangePickerTrigger
                  id={fieldProps.id}
                  aria-describedby={fieldProps["aria-describedby"]}
                />
                <DateRangePickerContent
                  numberOfMonths={numberOfMonths}
                  disabledMatcher={disabledMatcher}
                />
              </>
            )}
          </PopoverPrimitive.Root>
        </div>
      </DateRangePickerContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* DateRangePickerTrigger                                                     */
/* -------------------------------------------------------------------------- */

export interface DateRangePickerTriggerProps
  extends React.ComponentPropsWithoutRef<"button"> {}

export const DateRangePickerTrigger = React.forwardRef<
  HTMLButtonElement,
  DateRangePickerTriggerProps
>(function DateRangePickerTrigger(
  { className, id, "aria-describedby": ariaDescribedBy, ...props },
  ref
) {
  const ctx = useDateRangePickerContext();
  const fieldContext = useFieldContext();

  const displayValue = formatDisplayRange(
    ctx.range,
    ctx.formatString,
    ctx.locale,
    ctx.placeholder
  );

  const hasSelection = Boolean(ctx.range.from);
  const isComplete = Boolean(ctx.range.from && ctx.range.to);

  return (
    <PopoverPrimitive.Trigger asChild>
      <button
        ref={(node) => {
          (ctx.triggerRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        type="button"
        id={id}
        disabled={ctx.disabled}
        aria-haspopup="dialog"
        aria-expanded={ctx.isOpen}
        aria-label={props["aria-label"] || `Date range: ${displayValue}`}
        aria-labelledby={props["aria-labelledby"] || fieldContext?.labelId}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ctx.invalid ? "true" : undefined}
        aria-required={ctx.required ? "true" : undefined}
        data-slot="date-range-picker-trigger"
        data-complete={isComplete ? "true" : "false"}
        className={cn(
          "halo-liquid-glass group/range-trigger relative flex items-center justify-between w-full h-10 px-3.5 rounded-xl border border-border/80 bg-background/80 text-foreground text-sm font-medium shadow-xs transition-all outline-none",
          "focus-visible:border-[var(--halo-focus-color)] focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background halo-focus-ring",
          ctx.invalid && "border-destructive/80 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)]",
          ctx.disabled && "opacity-40 pointer-events-none cursor-not-allowed",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2.5 truncate">
          <HaloIcon
            icon={Calendar01Icon}
            size={18}
            className="text-muted-foreground/70 shrink-0 group-hover/range-trigger:text-foreground transition-colors"
          />
          <span
            className={cn(
              "truncate",
              !hasSelection && "text-muted-foreground font-normal",
              hasSelection && !isComplete && "text-foreground font-normal"
            )}
          >
            {displayValue}
          </span>
        </div>

        {ctx.clearable && hasSelection && !ctx.disabled && (
          <span
            role="button"
            tabIndex={0}
            aria-label="Clear date range selection"
            onClick={(e) => {
              e.stopPropagation();
              ctx.clearRange();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                ctx.clearRange();
              }
            }}
            className="p-1 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <HaloIcon icon={Cancel01Icon} size={14} />
          </span>
        )}
      </button>
    </PopoverPrimitive.Trigger>
  );
});

/* -------------------------------------------------------------------------- */
/* DateRangePickerContent                                                     */
/* -------------------------------------------------------------------------- */

export interface DateRangePickerContentProps
  extends React.ComponentPropsWithoutRef<"div"> {
  numberOfMonths?: 1 | 2;
  disabledMatcher?: (date: Date) => boolean;
}

export const DateRangePickerContent = React.forwardRef<
  HTMLDivElement,
  DateRangePickerContentProps
>(function DateRangePickerContent(
  { className, numberOfMonths = 2, disabledMatcher, children, ...props },
  ref
) {
  const ctx = useDateRangePickerContext();

  const selectedForPicker: DayPickerDateRange | undefined = ctx.range.from
    ? {
        from: ctx.range.from,
        to: ctx.range.to ?? undefined,
      }
    : undefined;

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        side="bottom"
        align="start"
        sideOffset={8}
        collisionPadding={12}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          ctx.triggerRef.current?.focus();
        }}
        data-slot="date-range-picker-content"
        className={cn(
          "halo-liquid-glass-surface z-50 p-3 rounded-2xl text-foreground outline-none",
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-150 ease-out",
          className
        )}
        {...props}
      >
        <div className="relative z-10">
          {children || (
            <Calendar
              mode="range"
              defaultMonth={ctx.range.from ?? undefined}
              selected={selectedForPicker}
              onSelect={ctx.selectRange}
              numberOfMonths={numberOfMonths}
              disabled={disabledMatcher}
              locale={ctx.locale}
              className="p-1 bg-transparent"
            />
          )}
        </div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});
