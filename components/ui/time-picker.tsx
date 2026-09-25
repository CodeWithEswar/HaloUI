"use client";

import * as React from "react";
import { Clock01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";
import { useFieldControlProps, useFieldContext } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Time-Only Math & Parsing Utilities                                         */
/* -------------------------------------------------------------------------- */

export interface ParsedTime {
  hours: number;
  minutes: number;
}

/**
 * Parses a canonical "HH:mm" time string into hours (0-23) and minutes (0-59).
 */
export function parseTimeString(timeStr?: string | null): ParsedTime | null {
  if (!timeStr) return null;
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null;
  }

  return { hours, minutes };
}

/**
 * Formats hours (0-23) and minutes (0-59) into a canonical "HH:mm" 24-hour string.
 */
export function formatTimeString(hours?: number | null, minutes?: number | null): string | null {
  if (hours === undefined || hours === null || minutes === undefined || minutes === null) {
    return null;
  }
  const h = String(Math.max(0, Math.min(23, hours))).padStart(2, "0");
  const m = String(Math.max(0, Math.min(59, minutes))).padStart(2, "0");
  return `${h}:${m}`;
}

/**
 * Converts 24-hour hour (0-23) to 12-hour hour (1-12) and period ("AM" | "PM").
 */
export function to12Hour(hours24: number): { hour12: number; period: "AM" | "PM" } {
  const period: "AM" | "PM" = hours24 >= 12 ? "PM" : "AM";
  const hour12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return { hour12, period };
}

/**
 * Converts 12-hour hour (1-12) and period ("AM" | "PM") to 24-hour hour (0-23).
 */
export function to24Hour(hour12: number, period: "AM" | "PM"): number {
  const normalized = hour12 % 12;
  return period === "PM" ? normalized + 12 : normalized;
}

/* -------------------------------------------------------------------------- */
/* TimePicker Context                                                         */
/* -------------------------------------------------------------------------- */

interface TimePickerContextValue {
  time: string | null;
  hours24: number | null;
  minutes: number | null;
  hour12: number | null;
  period: "AM" | "PM";
  hourCycle: 12 | 24;
  minuteStep: number;
  disabled: boolean;
  invalid: boolean;
  required: boolean;
  updateHours: (h: number) => void;
  updateMinutes: (m: number) => void;
  updatePeriod: (p: "AM" | "PM") => void;
  clearTime: () => void;
  hourRef: React.RefObject<HTMLInputElement | null>;
  minuteRef: React.RefObject<HTMLInputElement | null>;
  periodRef: React.RefObject<HTMLButtonElement | null>;
}

const TimePickerContext = React.createContext<TimePickerContextValue | null>(null);

export function useTimePickerContext() {
  const context = React.useContext(TimePickerContext);
  if (!context) {
    throw new Error("TimePicker compound components must be rendered inside a <TimePicker />");
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/* TimePicker Root                                                            */
/* -------------------------------------------------------------------------- */

export interface TimePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * Controlled time string in canonical 24-hour "HH:mm" format (e.g. "14:30").
   */
  value?: string | null;
  /**
   * Initial uncontrolled time string.
   */
  defaultValue?: string | null;
  /**
   * Callback fired when a valid time is selected or cleared.
   */
  onValueChange?: (time: string | null) => void;
  /**
   * Display hour cycle: 12-hour (with AM/PM) or 24-hour.
   * @default 12
   */
  hourCycle?: 12 | 24;
  /**
   * Stepping interval for minutes adjustment via keyboard.
   * @default 1
   */
  minuteStep?: number;
  /**
   * Earliest selectable time in "HH:mm" format.
   */
  minTime?: string;
  /**
   * Latest selectable time in "HH:mm" format.
   */
  maxTime?: string;
  /**
   * Whether to display an inline clear button.
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
   * Whether entering a complete time is required.
   */
  required?: boolean;
}

/**
 * TimePicker — Forms & Fields Primitive 31
 *
 * An accessible time-only control for selecting a local clock time without introducing a calendar date or timezone.
 * Supports structured segment keyboard navigation, 12/24 hour display modes, and Field integration.
 */
export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  function TimePicker(
    {
      value: controlledValue,
      defaultValue = null,
      onValueChange,
      hourCycle = 12,
      minuteStep = 1,
      minTime,
      maxTime,
      clearable = false,
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

    // Controlled vs Uncontrolled time value
    const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue);
    const isControlled = controlledValue !== undefined;
    const currentTime = isControlled ? controlledValue : internalValue;

    const parsed = React.useMemo(() => parseTimeString(currentTime), [currentTime]);

    const hours24 = parsed?.hours ?? null;
    const minutes = parsed?.minutes ?? null;

    const { hour12, period } = React.useMemo(() => {
      if (hours24 !== null) {
        return to12Hour(hours24);
      }
      return { hour12: null, period: "AM" as const };
    }, [hours24]);

    const hourRef = React.useRef<HTMLInputElement | null>(null);
    const minuteRef = React.useRef<HTMLInputElement | null>(null);
    const periodRef = React.useRef<HTMLButtonElement | null>(null);

    const commitTime = React.useCallback(
      (h: number | null, m: number | null) => {
        if (isDisabled) return;
        if (h === null || m === null) {
          if (!isControlled) setInternalValue(null);
          onValueChange?.(null);
          return;
        }

        const formatted = formatTimeString(h, m);
        if (!isControlled) {
          setInternalValue(formatted);
        }
        onValueChange?.(formatted);
      },
      [isControlled, isDisabled, onValueChange]
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
          return;
        }
        const current12 = to12Hour(hours24).hour12;
        const new24 = to24Hour(current12, newPeriod);
        commitTime(new24, minutes ?? 0);
      },
      [commitTime, hours24, minutes]
    );

    const clearTime = React.useCallback(() => {
      if (isDisabled) return;
      if (!isControlled) {
        setInternalValue(null);
      }
      onValueChange?.(null);
      hourRef.current?.focus();
    }, [isControlled, isDisabled, onValueChange]);

    const contextValue = React.useMemo<TimePickerContextValue>(
      () => ({
        time: currentTime,
        hours24,
        minutes,
        hour12,
        period,
        hourCycle,
        minuteStep,
        disabled: isDisabled,
        invalid: isInvalid,
        required: isRequired,
        updateHours,
        updateMinutes,
        updatePeriod,
        clearTime,
        hourRef,
        minuteRef,
        periodRef,
      }),
      [
        currentTime,
        hours24,
        minutes,
        hour12,
        period,
        hourCycle,
        minuteStep,
        isDisabled,
        isInvalid,
        isRequired,
        updateHours,
        updateMinutes,
        updatePeriod,
        clearTime,
      ]
    );

    return (
      <TimePickerContext.Provider value={contextValue}>
        <div
          ref={ref}
          id={fieldProps.id}
          data-slot="time-picker"
          aria-invalid={isInvalid ? "true" : undefined}
          aria-required={isRequired ? "true" : undefined}
          aria-describedby={fieldProps["aria-describedby"]}
          className={cn(
            "halo-liquid-glass group/time-picker relative inline-flex items-center gap-1.5 h-10 px-3 rounded-xl border border-border/80 bg-background/80 text-foreground text-sm font-medium shadow-xs transition-all",
            "focus-within:border-[var(--halo-focus-color)] focus-within:ring-2 focus-within:ring-[var(--halo-focus-color)] focus-within:ring-offset-2 focus-within:ring-offset-background halo-focus-ring",
            isInvalid && "border-destructive/80 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)]",
            isDisabled && "opacity-40 pointer-events-none cursor-not-allowed",
            className
          )}
          {...props}
        >
          <HaloIcon
            icon={Clock01Icon}
            size={18}
            className="text-muted-foreground/70 shrink-0 group-hover/time-picker:text-foreground transition-colors mr-0.5"
          />

          {children || (
            <>
              <TimePickerHourSegment />
              <span className="text-muted-foreground font-mono select-none" aria-hidden="true">
                :
              </span>
              <TimePickerMinuteSegment />
              {hourCycle === 12 && <TimePickerPeriodSegment />}
            </>
          )}

          {clearable && currentTime && !isDisabled && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear time"
              onClick={(e) => {
                e.stopPropagation();
                clearTime();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  clearTime();
                }
              }}
              className="p-1 ml-1 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <HaloIcon icon={Cancel01Icon} size={14} />
            </span>
          )}
        </div>
      </TimePickerContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* TimePickerHourSegment                                                      */
/* -------------------------------------------------------------------------- */

export interface TimePickerHourSegmentProps
  extends React.ComponentPropsWithoutRef<"input"> {}

export const TimePickerHourSegment = React.forwardRef<
  HTMLInputElement,
  TimePickerHourSegmentProps
>(function TimePickerHourSegment({ className, ...props }, ref) {
  const ctx = useTimePickerContext();
  const digitBuffer = React.useRef<string>("");

  const displayHour =
    ctx.hourCycle === 12
      ? ctx.hour12 !== null
        ? String(ctx.hour12).padStart(2, "0")
        : "--"
      : ctx.hours24 !== null
      ? String(ctx.hours24).padStart(2, "0")
      : "--";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      ctx.minuteRef.current?.focus();
      return;
    }

    // Direct numeric entry
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      const num = parseInt(e.key, 10);

      if (ctx.hourCycle === 12) {
        if (!digitBuffer.current) {
          if (num > 1) {
            // Numbers 2-9 unambiguously complete 1-digit hour in 12h mode
            ctx.updateHours(to24Hour(num, ctx.period));
            digitBuffer.current = "";
            ctx.minuteRef.current?.focus();
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
          ctx.minuteRef.current?.focus();
        }
      } else {
        // 24h mode
        if (!digitBuffer.current) {
          if (num > 2) {
            ctx.updateHours(num);
            digitBuffer.current = "";
            ctx.minuteRef.current?.focus();
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
          ctx.minuteRef.current?.focus();
        }
      }
    }
  };

  return (
    <input
      ref={(node) => {
        (ctx.hourRef as any).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      type="text"
      inputMode="numeric"
      maxLength={2}
      value={displayHour}
      readOnly
      disabled={ctx.disabled}
      aria-label="Hours"
      onKeyDown={handleKeyDown}
      className={cn(
        "w-7 text-center font-mono text-sm bg-transparent rounded-md cursor-pointer select-none outline-none transition-colors",
        "focus:bg-primary/15 focus:text-primary font-semibold",
        className
      )}
      {...props}
    />
  );
});

/* -------------------------------------------------------------------------- */
/* TimePickerMinuteSegment                                                    */
/* -------------------------------------------------------------------------- */

export interface TimePickerMinuteSegmentProps
  extends React.ComponentPropsWithoutRef<"input"> {}

export const TimePickerMinuteSegment = React.forwardRef<
  HTMLInputElement,
  TimePickerMinuteSegmentProps
>(function TimePickerMinuteSegment({ className, ...props }, ref) {
  const ctx = useTimePickerContext();
  const digitBuffer = React.useRef<string>("");

  const displayMinute =
    ctx.minutes !== null ? String(ctx.minutes).padStart(2, "0") : "--";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (ctx.disabled) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const cur = ctx.minutes ?? 0;
      const next = (cur + ctx.minuteStep) % 60;
      ctx.updateMinutes(next);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const cur = ctx.minutes ?? 0;
      const prev = (cur - ctx.minuteStep + 60) % 60;
      ctx.updateMinutes(prev);
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      ctx.hourRef.current?.focus();
      return;
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (ctx.hourCycle === 12) {
        ctx.periodRef.current?.focus();
      }
      return;
    }

    // Direct numeric typing
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      const num = parseInt(e.key, 10);

      if (!digitBuffer.current) {
        if (num >= 6) {
          ctx.updateMinutes(num);
          digitBuffer.current = "";
          if (ctx.hourCycle === 12) ctx.periodRef.current?.focus();
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
        if (ctx.hourCycle === 12) ctx.periodRef.current?.focus();
      }
    }
  };

  return (
    <input
      ref={(node) => {
        (ctx.minuteRef as any).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      type="text"
      inputMode="numeric"
      maxLength={2}
      value={displayMinute}
      readOnly
      disabled={ctx.disabled}
      aria-label="Minutes"
      onKeyDown={handleKeyDown}
      className={cn(
        "w-7 text-center font-mono text-sm bg-transparent rounded-md cursor-pointer select-none outline-none transition-colors",
        "focus:bg-primary/15 focus:text-primary font-semibold",
        className
      )}
      {...props}
    />
  );
});

/* -------------------------------------------------------------------------- */
/* TimePickerPeriodSegment (AM/PM Toggle)                                     */
/* -------------------------------------------------------------------------- */

export interface TimePickerPeriodSegmentProps
  extends React.ComponentPropsWithoutRef<"button"> {}

export const TimePickerPeriodSegment = React.forwardRef<
  HTMLButtonElement,
  TimePickerPeriodSegmentProps
>(function TimePickerPeriodSegment({ className, ...props }, ref) {
  const ctx = useTimePickerContext();

  const handleToggle = () => {
    if (ctx.disabled) return;
    ctx.updatePeriod(ctx.period === "AM" ? "PM" : "AM");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (ctx.disabled) return;

    if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === " ") {
      e.preventDefault();
      handleToggle();
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      ctx.minuteRef.current?.focus();
      return;
    }

    if (e.key === "a" || e.key === "A") {
      e.preventDefault();
      ctx.updatePeriod("AM");
      return;
    }

    if (e.key === "p" || e.key === "P") {
      e.preventDefault();
      ctx.updatePeriod("PM");
      return;
    }
  };

  return (
    <button
      ref={(node) => {
        (ctx.periodRef as any).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      type="button"
      disabled={ctx.disabled}
      aria-label={`Time period, currently ${ctx.period}`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={cn(
        "px-1.5 py-0.5 ml-1 text-xs font-mono font-bold tracking-wider uppercase rounded-md transition-colors outline-none",
        "bg-muted/60 text-muted-foreground hover:text-foreground",
        "focus:bg-primary/15 focus:text-primary",
        className
      )}
      {...props}
    >
      {ctx.period}
    </button>
  );
});
