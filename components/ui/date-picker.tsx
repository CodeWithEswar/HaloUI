"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { format, isValid } from "date-fns";
import type { Locale } from "date-fns";
import { Calendar01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useFieldControlProps, useFieldContext } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Date-Only Utilities (Timezone Safe)                                        */
/* -------------------------------------------------------------------------- */

/**
 * Normalizes an input value (Date or ISO YYYY-MM-DD string) into a local Date instance
 * representing only the calendar day, strictly avoiding UTC serialization shifts.
 */
export function parseDateOnly(value: Date | string | null | undefined): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    if (isNaN(value.getTime())) return null;
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    const match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      const parsed = new Date(year, month, day);
      return isValid(parsed) ? parsed : null;
    }

    const standardParsed = new Date(trimmed);
    if (isValid(standardParsed)) {
      return new Date(
        standardParsed.getFullYear(),
        standardParsed.getMonth(),
        standardParsed.getDate()
      );
    }
  }

  return null;
}

/**
 * Formats a local calendar date into a canonical date-only ISO string (`YYYY-MM-DD`).
 * Strictly avoids UTC timestamp shifting.
 */
export function formatDateOnly(date: Date | null | undefined): string | null {
  if (!date || !isValid(date)) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/* -------------------------------------------------------------------------- */
/* DatePicker Context                                                         */
/* -------------------------------------------------------------------------- */

interface DatePickerContextValue {
  selectedDate: Date | null;
  dateString: string | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  disabled: boolean;
  invalid: boolean;
  required: boolean;
  placeholder: string;
  formatString: string;
  locale?: Locale;
  clearable: boolean;
  selectDate: (date: Date | null | undefined) => void;
  clearDate: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DatePickerContext = React.createContext<DatePickerContextValue | null>(null);

export function useDatePickerContext() {
  const context = React.useContext(DatePickerContext);
  if (!context) {
    throw new Error("DatePicker compound components must be rendered inside a <DatePicker />");
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/* DatePicker Root                                                            */
/* -------------------------------------------------------------------------- */

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * Controlled calendar date value (Date, ISO 'YYYY-MM-DD', or null for empty).
   */
  value?: Date | string | null;
  /**
   * Initial uncontrolled calendar date value. Defaults to null (empty).
   */
  defaultValue?: Date | string | null;
  /**
   * Callback fired when a date is selected or cleared.
   * Provides both the local Date instance and canonical date-only 'YYYY-MM-DD' string.
   */
  onValueChange?: (date: Date | null, dateString: string | null) => void;
  /**
   * Placeholder string displayed on the trigger when no date is selected.
   * @default "Select a date"
   */
  placeholder?: string;
  /**
   * date-fns format string for display formatting.
   * @default "PPP" (e.g. "September 25th, 2026")
   */
  formatString?: string;
  /**
   * Optional date-fns Locale for localized weekday and month names.
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
   * Whether to display an inline clear button on the trigger.
   * @default false
   */
  clearable?: boolean;
  /**
   * Whether the date picker is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the date picker has a validation error.
   */
  invalid?: boolean;
  /**
   * Whether a date selection is required.
   */
  required?: boolean;
  /**
   * Controlled open state for the calendar popover.
   */
  open?: boolean;
  /**
   * Callback fired when calendar popover opens or closes.
   */
  onOpenChange?: (open: boolean) => void;
}

/**
 * DatePicker — Forms & Fields Primitive 29
 *
 * An accessible calendar-backed control for selecting a single calendar date.
 * Features date-only timezone protection, accessible month navigation, focus restoration,
 * and high optical clarity without material contamination.
 */
export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker(
    {
      value: controlledValue,
      defaultValue = null,
      onValueChange,
      placeholder = "Select a date",
      formatString = "PPP",
      locale,
      minDate,
      maxDate,
      disabledDates,
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

    // Controlled vs Uncontrolled date value state
    const [internalValue, setInternalValue] = React.useState<Date | null>(() =>
      parseDateOnly(defaultValue)
    );
    const isControlled = controlledValue !== undefined;
    const selectedDate = isControlled ? parseDateOnly(controlledValue) : internalValue;
    const dateString = formatDateOnly(selectedDate);

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

    const selectDate = React.useCallback(
      (newDate: Date | null | undefined) => {
        if (isDisabled) return;
        const normalized = parseDateOnly(newDate);
        if (!isControlled) {
          setInternalValue(normalized);
        }
        const formatted = formatDateOnly(normalized);
        onValueChange?.(normalized, formatted);
        handleOpenChange(false);

        // Restore focus to trigger
        setTimeout(() => {
          triggerRef.current?.focus();
        }, 0);
      },
      [handleOpenChange, isControlled, isDisabled, onValueChange]
    );

    const clearDate = React.useCallback(() => {
      if (isDisabled) return;
      if (!isControlled) {
        setInternalValue(null);
      }
      onValueChange?.(null, null);
      handleOpenChange(false);
      triggerRef.current?.focus();
    }, [handleOpenChange, isControlled, isDisabled, onValueChange]);

    const contextValue = React.useMemo<DatePickerContextValue>(
      () => ({
        selectedDate,
        dateString,
        isOpen,
        setIsOpen: handleOpenChange,
        disabled: isDisabled,
        invalid: isInvalid,
        required: isRequired,
        placeholder,
        formatString,
        locale,
        clearable,
        selectDate,
        clearDate,
        triggerRef,
      }),
      [
        selectedDate,
        dateString,
        isOpen,
        handleOpenChange,
        isDisabled,
        isInvalid,
        isRequired,
        placeholder,
        formatString,
        locale,
        clearable,
        selectDate,
        clearDate,
      ]
    );

    // Compute calendar disabled matcher
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
      <DatePickerContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-slot="date-picker"
          className={cn("relative inline-block w-full max-w-sm", className)}
          {...props}
        >
          <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
            {children || (
              <>
                <DatePickerTrigger id={fieldProps.id} aria-describedby={fieldProps["aria-describedby"]} />
                <DatePickerContent disabledMatcher={disabledMatcher} />
              </>
            )}
          </PopoverPrimitive.Root>
        </div>
      </DatePickerContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* DatePickerTrigger                                                          */
/* -------------------------------------------------------------------------- */

export interface DatePickerTriggerProps
  extends React.ComponentPropsWithoutRef<"button"> {}

export const DatePickerTrigger = React.forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  function DatePickerTrigger({ className, id, "aria-describedby": ariaDescribedBy, ...props }, ref) {
    const ctx = useDatePickerContext();
    const fieldContext = useFieldContext();

    const displayValue = ctx.selectedDate
      ? format(ctx.selectedDate, ctx.formatString, { locale: ctx.locale })
      : null;

    const accessibleLabel = displayValue
      ? `Selected date: ${displayValue}`
      : ctx.placeholder;

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
          aria-label={props["aria-label"] || accessibleLabel}
          aria-labelledby={props["aria-labelledby"] || fieldContext?.labelId}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ctx.invalid ? "true" : undefined}
          aria-required={ctx.required ? "true" : undefined}
          data-slot="date-picker-trigger"
          className={cn(
            "halo-liquid-glass group/date-trigger relative flex items-center justify-between w-full h-10 px-3.5 rounded-xl border border-border/80 bg-background/80 text-foreground text-sm font-medium shadow-xs transition-all outline-none",
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
              className="text-muted-foreground/70 shrink-0 group-hover/date-trigger:text-foreground transition-colors"
            />
            <span
              className={cn(
                "truncate",
                !displayValue && "text-muted-foreground font-normal"
              )}
            >
              {displayValue || ctx.placeholder}
            </span>
          </div>

          {ctx.clearable && ctx.selectedDate && !ctx.disabled && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear date selection"
              onClick={(e) => {
                e.stopPropagation();
                ctx.clearDate();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  ctx.clearDate();
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
  }
);

/* -------------------------------------------------------------------------- */
/* DatePickerContent                                                          */
/* -------------------------------------------------------------------------- */

export interface DatePickerContentProps extends React.ComponentPropsWithoutRef<"div"> {
  disabledMatcher?: (date: Date) => boolean;
}

export const DatePickerContent = React.forwardRef<HTMLDivElement, DatePickerContentProps>(
  function DatePickerContent({ className, disabledMatcher, children, ...props }, ref) {
    const ctx = useDatePickerContext();

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          side="bottom"
          align="start"
          sideOffset={8}
          collisionPadding={12}
          onCloseAutoFocus={(e) => {
            // Predictable focus restoration to trigger
            e.preventDefault();
            ctx.triggerRef.current?.focus();
          }}
          data-slot="date-picker-content"
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
                mode="single"
                selected={ctx.selectedDate ?? undefined}
                onSelect={(date) => ctx.selectDate(date)}
                disabled={disabledMatcher}
                locale={ctx.locale}
                className="p-1 bg-transparent"
              />
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  }
);
