"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { format } from "date-fns";
import type { Locale } from "date-fns";
import {
  Calendar01Icon,
  Clock01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";
import { useFieldControlProps, useFieldContext } from "@/components/ui/field";
import { Calendar } from "@/components/ui/calendar";
import {
  parseTimeString,
  formatTimeString,
  to12Hour,
  to24Hour,
} from "@/components/ui/time-picker";
import { parseDateOnly, formatDateOnly } from "@/components/ui/date-picker";

/* -------------------------------------------------------------------------- */
/* Types & Value Decomposition                                                */
/* -------------------------------------------------------------------------- */

export interface LocalDateTimeParts {
  date: Date | null;
  time: string | null; // 24-hour "HH:mm"
}

/**
 * Parses a combined local date-time string in "YYYY-MM-DDTHH:mm" format.
 * Strictly preserves local date and clock time without UTC or timezone conversions.
 */
export function parseLocalDateTime(val?: string | null): LocalDateTimeParts {
  if (!val || typeof val !== "string") {
    return { date: null, time: null };
  }
  const parts = val.trim().split("T");
  if (parts.length !== 2) {
    return { date: null, time: null };
  }
  const [dateStr, timeStr] = parts;
  const date = parseDateOnly(dateStr);
  const parsedTime = parseTimeString(timeStr);
  const time = parsedTime ? formatTimeString(parsedTime.hours, parsedTime.minutes) : null;

  return { date, time };
}

/**
 * Formats a local date and 24h "HH:mm" time into a canonical "YYYY-MM-DDTHH:mm" string.
 * Does NOT append "Z" because this is a local date-time, not a UTC timestamp.
 */
export function formatLocalDateTime(date?: Date | null, time?: string | null): string | null {
  if (!date || !time) return null;
  const dateStr = formatDateOnly(date);
  const parsedTime = parseTimeString(time);
  if (!parsedTime) return null;
  const timeStr = formatTimeString(parsedTime.hours, parsedTime.minutes);
  return `${dateStr}T${timeStr}`;
}

/**
 * Formats a local date and time for accessible user display.
 * Clearly communicates empty, partial (date only or time only), and complete states.
 */
export function formatDisplayDateTime(
  date?: Date | null,
  time?: string | null,
  options?: {
    hourCycle?: 12 | 24;
    locale?: Locale;
    dateFormat?: string;
  }
): { text: string; isComplete: boolean; isPartial: boolean } {
  const { hourCycle = 12, locale, dateFormat = "PPP" } = options || {};

  const hasDate = Boolean(date);
  const hasTime = Boolean(time && parseTimeString(time));

  if (!hasDate && !hasTime) {
    return { text: "", isComplete: false, isPartial: false };
  }

  let formattedDate = "--/--/----";
  if (date) {
    try {
      formattedDate = format(date, dateFormat, { locale });
    } catch {
      formattedDate = formatDateOnly(date) ?? "--/--/----";
    }
  }

  let formattedTime = "--:--";
  if (hasTime && time) {
    const parsed = parseTimeString(time)!;
    if (hourCycle === 12) {
      const { hour12, period } = to12Hour(parsed.hours);
      const hStr = String(hour12).padStart(2, "0");
      const mStr = String(parsed.minutes).padStart(2, "0");
      formattedTime = `${hStr}:${mStr} ${period}`;
    } else {
      formattedTime = formatTimeString(parsed.hours, parsed.minutes)!;
    }
  }

  const isComplete = hasDate && hasTime;
  const isPartial = (hasDate && !hasTime) || (!hasDate && hasTime);

  return {
    text: `${formattedDate} at ${formattedTime}`,
    isComplete,
    isPartial,
  };
}

/* -------------------------------------------------------------------------- */
/* Context                                                                    */
/* -------------------------------------------------------------------------- */

interface DateTimePickerContextValue {
  value: string | null;
  date: Date | null;
  time: string | null;
  hours24: number | null;
  minutes: number | null;
  hour12: number | null;
  period: "AM" | "PM";
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  disabled: boolean;
  invalid: boolean;
  required: boolean;
  placeholder: string;
  hourCycle: 12 | 24;
  minuteStep: number;
  locale?: Locale;
  dateFormat: string;
  clearable: boolean;
  selectDate: (date: Date | undefined) => void;
  updateHours: (h: number) => void;
  updateMinutes: (m: number) => void;
  updatePeriod: (p: "AM" | "PM") => void;
  clearAll: () => void;
  clearTime: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  hourInputRef: React.RefObject<HTMLInputElement | null>;
  minuteInputRef: React.RefObject<HTMLInputElement | null>;
}

const DateTimePickerContext = React.createContext<DateTimePickerContextValue | null>(null);

export function useDateTimePickerContext() {
  const context = React.useContext(DateTimePickerContext);
  if (!context) {
    throw new Error("DateTimePicker compound components must be rendered within <DateTimePicker />");
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/* DateTimePicker Root Component                                              */
/* -------------------------------------------------------------------------- */

export interface DateTimePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * Controlled combined local date-time string in canonical "YYYY-MM-DDTHH:mm" format.
   */
  value?: string | null;
  /**
   * Initial uncontrolled combined local date-time string in "YYYY-MM-DDTHH:mm" format.
   */
  defaultValue?: string | null;
  /**
   * Callback fired when date or time selection changes.
   * Emits canonical "YYYY-MM-DDTHH:mm" string when complete (or null when incomplete/cleared),
   * and provides explicit { date, time } decomposition for partial-state awareness.
   */
  onValueChange?: (value: string | null, parts: LocalDateTimeParts) => void;
  /**
   * Placeholder text when no value is selected.
   * @default "Pick date and time"
   */
  placeholder?: string;
  /**
   * Hour cycle: 12 (AM/PM) or 24-hour.
   * @default 12
   */
  hourCycle?: 12 | 24;
  /**
   * Step for minutes adjustment.
   * @default 1
   */
  minuteStep?: number;
  /**
   * Optional date-fns locale for calendar and date formatting.
   */
  locale?: Locale;
  /**
   * Display date format pattern (defaults to "PPP", e.g. "Sep 25, 2026").
   */
  dateFormat?: string;
  /**
   * Minimum selectable calendar date.
   */
  minDate?: Date;
  /**
   * Maximum selectable calendar date.
   */
  maxDate?: Date;
  /**
   * Earliest selectable time in "HH:mm" format.
   */
  minTime?: string;
  /**
   * Latest selectable time in "HH:mm" format.
   */
  maxTime?: string;
  /**
   * Disabled dates matcher function or array of dates.
   */
  disabledDates?: ((date: Date) => boolean) | Date[];
  /**
   * Whether to display an inline clear button on the trigger.
   * @default true
   */
  clearable?: boolean;
  /**
   * Controlled open state of the calendar-time popover.
   */
  open?: boolean;
  /**
   * Default open state for uncontrolled usage.
   */
  defaultOpen?: boolean;
  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Whether the control is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the control is invalid.
   */
  invalid?: boolean;
  /**
   * Whether the control is required.
   */
  required?: boolean;
}

/**
 * DateTimePicker — Forms & Fields Primitive 32
 *
 * An accessible control for selecting one calendar date and one local clock time as a combined date-time value.
 * Composes the proven Calendar/DatePicker and TimePicker models without introducing premature timezones or UTC offsets.
 */
export const DateTimePicker = React.forwardRef<HTMLDivElement, DateTimePickerProps>(
  function DateTimePicker(
    {
      value: controlledValue,
      defaultValue = null,
      onValueChange,
      placeholder = "Pick date and time",
      hourCycle = 12,
      minuteStep = 1,
      locale,
      dateFormat = "PPP",
      minDate,
      maxDate,
      minTime,
      maxTime,
      disabledDates,
      clearable = true,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled: propDisabled,
      invalid: propInvalid,
      required: propRequired,
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

    // Controlled vs Uncontrolled Value
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue);
    const combinedString = isControlled ? controlledValue : internalValue;

    // Local state decomposition: date + time
    const initialParts = React.useMemo(() => parseLocalDateTime(combinedString), [combinedString]);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(initialParts.date);
    const [selectedTime, setSelectedTime] = React.useState<string | null>(initialParts.time);

    // Keep internal parts synchronized when controlledValue changes
    React.useEffect(() => {
      const parts = parseLocalDateTime(combinedString);
      setSelectedDate(parts.date);
      setSelectedTime(parts.time);
    }, [combinedString]);

    // Popover open state
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlledOpen = controlledOpen !== undefined;
    const isOpen = isControlledOpen ? controlledOpen : internalOpen;

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (!isControlledOpen) {
          setInternalOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
      },
      [isControlledOpen, onOpenChange]
    );

    // Refs for focus management
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const hourInputRef = React.useRef<HTMLInputElement | null>(null);
    const minuteInputRef = React.useRef<HTMLInputElement | null>(null);

    // Parsed clock representation
    const parsedTime = React.useMemo(() => parseTimeString(selectedTime), [selectedTime]);
    const hours24 = parsedTime?.hours ?? null;
    const minutes = parsedTime?.minutes ?? null;

    const { hour12, period } = React.useMemo(() => {
      if (hours24 !== null) {
        return to12Hour(hours24);
      }
      return { hour12: null, period: "AM" as const };
    }, [hours24]);

    // Commit changes to parent & internal value
    const commitCombined = React.useCallback(
      (newDate: Date | null, newTime: string | null) => {
        if (isDisabled) return;
        const formatted = formatLocalDateTime(newDate, newTime);
        if (!isControlled) {
          setInternalValue(formatted);
        }
        onValueChange?.(formatted, { date: newDate, time: newTime });
      },
      [isDisabled, isControlled, onValueChange]
    );

    // Date selection
    const selectDate = React.useCallback(
      (newDate: Date | undefined) => {
        const nextDate = newDate ?? null;
        setSelectedDate(nextDate);
        commitCombined(nextDate, selectedTime);
      },
      [commitCombined, selectedTime]
    );

    // Time selection
    const commitTime = React.useCallback(
      (h: number | null, m: number | null) => {
        if (h === null || m === null) {
          setSelectedTime(null);
          commitCombined(selectedDate, null);
          return;
        }
        const timeStr = formatTimeString(h, m);
        setSelectedTime(timeStr);
        commitCombined(selectedDate, timeStr);
      },
      [commitCombined, selectedDate]
    );

    const updateHours = React.useCallback(
      (newH24: number) => {
        const clampedH = Math.max(0, Math.min(23, newH24));
        commitTime(clampedH, minutes ?? 0);
      },
      [commitTime, minutes]
    );

    const updateMinutes = React.useCallback(
      (newM: number) => {
        const clampedM = Math.max(0, Math.min(59, newM));
        commitTime(hours24 ?? 12, clampedM);
      },
      [commitTime, hours24]
    );

    const updatePeriod = React.useCallback(
      (newPeriod: "AM" | "PM") => {
        if (hours24 === null) {
          commitTime(newPeriod === "PM" ? 12 : 0, minutes ?? 0);
        } else {
          const current12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
          const new24 = to24Hour(current12, newPeriod);
          commitTime(new24, minutes ?? 0);
        }
      },
      [commitTime, hours24, minutes]
    );

    const clearAll = React.useCallback(() => {
      setSelectedDate(null);
      setSelectedTime(null);
      commitCombined(null, null);
    }, [commitCombined]);

    const clearTime = React.useCallback(() => {
      setSelectedTime(null);
      commitCombined(selectedDate, null);
    }, [commitCombined, selectedDate]);

    // Calendar disabled dates matcher
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

    const contextValue = React.useMemo<DateTimePickerContextValue>(
      () => ({
        value: combinedString,
        date: selectedDate,
        time: selectedTime,
        hours24,
        minutes,
        hour12,
        period,
        isOpen,
        setIsOpen: handleOpenChange,
        disabled: isDisabled,
        invalid: isInvalid,
        required: isRequired,
        placeholder,
        hourCycle,
        minuteStep,
        locale,
        dateFormat,
        clearable,
        selectDate,
        updateHours,
        updateMinutes,
        updatePeriod,
        clearAll,
        clearTime,
        triggerRef,
        hourInputRef,
        minuteInputRef,
      }),
      [
        combinedString,
        selectedDate,
        selectedTime,
        hours24,
        minutes,
        hour12,
        period,
        isOpen,
        handleOpenChange,
        isDisabled,
        isInvalid,
        isRequired,
        placeholder,
        hourCycle,
        minuteStep,
        locale,
        dateFormat,
        clearable,
        selectDate,
        updateHours,
        updateMinutes,
        updatePeriod,
        clearAll,
        clearTime,
      ]
    );

    return (
      <DateTimePickerContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-slot="date-time-picker"
          className={cn("relative inline-block w-full max-w-sm", className)}
          {...props}
        >
          <PopoverPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
            {children || (
              <>
                <DateTimePickerTrigger id={fieldProps.id} aria-describedby={fieldProps["aria-describedby"]} />
                <DateTimePickerContent disabledMatcher={disabledMatcher} minTime={minTime} maxTime={maxTime} />
              </>
            )}
          </PopoverPrimitive.Root>
        </div>
      </DateTimePickerContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* DateTimePickerTrigger                                                      */
/* -------------------------------------------------------------------------- */

export interface DateTimePickerTriggerProps
  extends React.ComponentPropsWithoutRef<"button"> {}

export const DateTimePickerTrigger = React.forwardRef<HTMLButtonElement, DateTimePickerTriggerProps>(
  function DateTimePickerTrigger({ className, id, "aria-describedby": ariaDescribedBy, ...props }, ref) {
    const ctx = useDateTimePickerContext();
    const fieldContext = useFieldContext();

    const displayInfo = formatDisplayDateTime(ctx.date, ctx.time, {
      hourCycle: ctx.hourCycle,
      locale: ctx.locale,
      dateFormat: ctx.dateFormat,
    });

    const hasValue = displayInfo.isComplete || displayInfo.isPartial;
    const accessibleLabel = hasValue
      ? `Selected date and time: ${displayInfo.text}`
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
          data-slot="date-time-picker-trigger"
          className={cn(
            "halo-liquid-glass group/datetime-trigger relative flex items-center justify-between w-full h-10 px-3.5 rounded-xl border border-border/80 bg-background/80 text-foreground text-sm font-medium shadow-xs transition-all outline-none",
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
              className="text-muted-foreground/70 shrink-0 group-hover/datetime-trigger:text-foreground transition-colors"
            />
            <span
              className={cn(
                "truncate",
                !hasValue && "text-muted-foreground font-normal",
                displayInfo.isPartial && "text-muted-foreground font-normal italic"
              )}
            >
              {hasValue ? displayInfo.text : ctx.placeholder}
            </span>
          </div>

          {ctx.clearable && hasValue && !ctx.disabled && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear date and time"
              onClick={(e) => {
                e.stopPropagation();
                ctx.clearAll();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  ctx.clearAll();
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
/* DateTimePickerContent                                                      */
/* -------------------------------------------------------------------------- */

export interface DateTimePickerContentProps extends React.ComponentPropsWithoutRef<"div"> {
  disabledMatcher?: (date: Date) => boolean;
  minTime?: string;
  maxTime?: string;
}

export const DateTimePickerContent = React.forwardRef<HTMLDivElement, DateTimePickerContentProps>(
  function DateTimePickerContent({ className, disabledMatcher, minTime, maxTime, children, ...props }, ref) {
    const ctx = useDateTimePickerContext();
    const digitBuffer = React.useRef<string>("");

    // Hour keyboard stepper
    const handleHourKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (ctx.disabled) return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (ctx.hourCycle === 12) {
          const cur12 = ctx.hour12 ?? 12;
          const next12 = cur12 >= 12 ? 1 : cur12 + 1;
          ctx.updateHours(to24Hour(next12, ctx.period));
        } else {
          const cur24 = ctx.hours24 ?? 0;
          const next24 = cur24 >= 23 ? 0 : cur24 + 1;
          ctx.updateHours(next24);
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (ctx.hourCycle === 12) {
          const cur12 = ctx.hour12 ?? 12;
          const prev12 = cur12 <= 1 ? 12 : cur12 - 1;
          ctx.updateHours(to24Hour(prev12, ctx.period));
        } else {
          const cur24 = ctx.hours24 ?? 0;
          const prev24 = cur24 <= 0 ? 23 : cur24 - 1;
          ctx.updateHours(prev24);
        }
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        ctx.minuteInputRef.current?.focus();
        return;
      }

      // Direct numeric entry
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        const num = parseInt(e.key, 10);

        if (ctx.hourCycle === 12) {
          if (!digitBuffer.current) {
            if (num > 1) {
              ctx.updateHours(to24Hour(num, ctx.period));
              digitBuffer.current = "";
              ctx.minuteInputRef.current?.focus();
            } else {
              digitBuffer.current = e.key;
              ctx.updateHours(to24Hour(num, ctx.period));
            }
          } else {
            const combined = parseInt(digitBuffer.current + e.key, 10);
            digitBuffer.current = "";
            if (combined >= 1 && combined <= 12) {
              ctx.updateHours(to24Hour(combined, ctx.period));
            }
            ctx.minuteInputRef.current?.focus();
          }
        } else {
          if (!digitBuffer.current) {
            if (num > 2) {
              ctx.updateHours(num);
              digitBuffer.current = "";
              ctx.minuteInputRef.current?.focus();
            } else {
              digitBuffer.current = e.key;
              ctx.updateHours(num);
            }
          } else {
            const combined = parseInt(digitBuffer.current + e.key, 10);
            digitBuffer.current = "";
            if (combined >= 0 && combined <= 23) {
              ctx.updateHours(combined);
            }
            ctx.minuteInputRef.current?.focus();
          }
        }
      }
    };

    // Minute keyboard stepper
    const handleMinuteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (ctx.disabled) return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const curM = ctx.minutes ?? 0;
        const nextM = (curM + ctx.minuteStep) % 60;
        ctx.updateMinutes(nextM);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const curM = ctx.minutes ?? 0;
        const prevM = (curM - ctx.minuteStep + 60) % 60;
        ctx.updateMinutes(prevM);
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        ctx.hourInputRef.current?.focus();
        return;
      }

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        const num = parseInt(e.key, 10);
        if (!digitBuffer.current) {
          if (num > 5) {
            ctx.updateMinutes(num);
            digitBuffer.current = "";
          } else {
            digitBuffer.current = e.key;
            ctx.updateMinutes(num);
          }
        } else {
          const combined = parseInt(digitBuffer.current + e.key, 10);
          digitBuffer.current = "";
          if (combined >= 0 && combined <= 59) {
            ctx.updateMinutes(combined);
          }
        }
      }
    };

    const displayHour =
      ctx.hourCycle === 12
        ? ctx.hour12 !== null
          ? String(ctx.hour12).padStart(2, "0")
          : "--"
        : ctx.hours24 !== null
        ? String(ctx.hours24).padStart(2, "0")
        : "--";

    const displayMinute =
      ctx.minutes !== null ? String(ctx.minutes).padStart(2, "0") : "--";

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
          data-slot="date-time-picker-content"
          className={cn(
            "halo-liquid-glass-surface z-50 p-3 rounded-2xl text-foreground outline-none",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-150 ease-out",
            className
          )}
          {...props}
        >
          <div className="relative z-10 flex flex-col gap-2.5">
            {children || (
              <>
                {/* 1. Shared Standalone Calendar Surface */}
                <Calendar
                  mode="single"
                  selected={ctx.date ?? undefined}
                  onSelect={(date) => ctx.selectDate(date)}
                  disabled={disabledMatcher}
                  locale={ctx.locale}
                  className="p-1 bg-transparent"
                />

                {/* 2. Optical Divider */}
                <div className="border-t border-black/[0.08] dark:border-white/[0.08] mx-1" />

                {/* 3. Integrated Clock Time Section */}
                <div className="flex items-center justify-between px-2 py-1 gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <HaloIcon icon={Clock01Icon} size={15} />
                    <span>Time</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Hour Segment */}
                    <input
                      ref={ctx.hourInputRef}
                      type="text"
                      inputMode="numeric"
                      role="spinbutton"
                      aria-label="Hours"
                      aria-valuenow={ctx.hours24 ?? undefined}
                      aria-valuetext={displayHour}
                      disabled={ctx.disabled}
                      value={displayHour}
                      onChange={() => {}}
                      onKeyDown={handleHourKeyDown}
                      className={cn(
                        "w-9 h-7 text-center font-mono text-xs font-medium rounded-lg bg-black/[0.05] dark:bg-white/[0.08] text-foreground border border-black/[0.06] dark:border-white/[0.08] outline-none transition-all",
                        "focus:ring-2 focus:ring-[var(--halo-focus-color)] focus:bg-white/90 dark:focus:bg-white/20 select-all"
                      )}
                    />

                    <span className="font-mono text-xs text-muted-foreground select-none" aria-hidden="true">
                      :
                    </span>

                    {/* Minute Segment */}
                    <input
                      ref={ctx.minuteInputRef}
                      type="text"
                      inputMode="numeric"
                      role="spinbutton"
                      aria-label="Minutes"
                      aria-valuenow={ctx.minutes ?? undefined}
                      aria-valuetext={displayMinute}
                      disabled={ctx.disabled}
                      value={displayMinute}
                      onChange={() => {}}
                      onKeyDown={handleMinuteKeyDown}
                      className={cn(
                        "w-9 h-7 text-center font-mono text-xs font-medium rounded-lg bg-black/[0.05] dark:bg-white/[0.08] text-foreground border border-black/[0.06] dark:border-white/[0.08] outline-none transition-all",
                        "focus:ring-2 focus:ring-[var(--halo-focus-color)] focus:bg-white/90 dark:focus:bg-white/20 select-all"
                      )}
                    />

                    {/* AM / PM Segment (12h cycle) */}
                    {ctx.hourCycle === 12 && (
                      <button
                        type="button"
                        disabled={ctx.disabled}
                        onClick={() => ctx.updatePeriod(ctx.period === "AM" ? "PM" : "AM")}
                        aria-label="Toggle AM/PM"
                        className={cn(
                          "ml-1 h-7 px-2 text-xs font-semibold rounded-lg bg-black/[0.05] dark:bg-white/[0.08] text-foreground border border-black/[0.06] dark:border-white/[0.08] transition-all outline-none",
                          "hover:bg-black/[0.08] dark:hover:bg-white/[0.14] active:scale-95",
                          "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)]"
                        )}
                      >
                        {ctx.period}
                      </button>
                    )}

                    {/* Clear time */}
                    {ctx.time && !ctx.disabled && (
                      <button
                        type="button"
                        onClick={ctx.clearTime}
                        aria-label="Clear time"
                        className="ml-1 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.1] transition-colors"
                      >
                        <HaloIcon icon={Cancel01Icon} size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  }
);
