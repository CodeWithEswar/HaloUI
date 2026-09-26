"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Tick02Icon, Alert02Icon } from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------- */
/* Types & Contexts                                                           */
/* -------------------------------------------------------------------------- */

export type StepStatus = "completed" | "current" | "upcoming" | "disabled" | "error";

interface StepperContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  orientation: "horizontal" | "vertical";
  linear: boolean;
  interactive: boolean;
  intensity: "subtle" | "balanced" | "rich";
  registerStep: (stepValue: string) => void;
  unregisterStep: (stepValue: string) => void;
  stepOrder: string[];
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("Stepper compound components must be used within a <Stepper />");
  }
  return context;
}

interface StepperItemContextValue {
  value: string;
  stepIndex: number;
  status: StepStatus;
  isCurrent: boolean;
  isCompleted: boolean;
  isUpcoming: boolean;
  isDisabled: boolean;
  isError: boolean;
  isNavigable: boolean;
}

const StepperItemContext = React.createContext<StepperItemContextValue | null>(null);

function useStepperItem() {
  const context = React.useContext(StepperItemContext);
  if (!context) {
    throw new Error("StepperItem compound components must be used within a <StepperItem />");
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/* Stepper Root                                                               */
/* -------------------------------------------------------------------------- */

export interface StepperProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Controlled value of the current active step.
   */
  value?: string;
  /**
   * Uncontrolled default value of the active step.
   */
  defaultValue?: string;
  /**
   * Callback fired when active step changes via user interaction.
   */
  onValueChange?: (value: string) => void;
  /**
   * Layout orientation of the stepper.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * When true, enforces strict forward progression: users can only navigate back
   * to completed steps or remain on the current step, but cannot jump ahead to upcoming steps.
   * @default false
   */
  linear?: boolean;
  /**
   * Whether steps can be interacted with directly as buttons.
   * If false, steps render as noninteractive informational progress indicators.
   * @default false
   */
  interactive?: boolean;
  /**
   * HaloUI liquid optical glass material intensity level.
   * @default "subtle"
   */
  intensity?: "subtle" | "balanced" | "rich";
}

export const Stepper = React.forwardRef<HTMLElement, StepperProps>(
  function Stepper(
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      linear = false,
      interactive = false,
      intensity = "subtle",
      className,
      children,
      ...props
    },
    ref
  ) {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(defaultValue);
    const [stepOrder, setStepOrder] = React.useState<string[]>([]);

    const isControlled = controlledValue !== undefined;
    const activeValue = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = React.useCallback(
      (nextValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
      },
      [isControlled, onValueChange]
    );

    const registerStep = React.useCallback((stepValue: string) => {
      setStepOrder((prev) => {
        if (prev.includes(stepValue)) return prev;
        return [...prev, stepValue];
      });
    }, []);

    const unregisterStep = React.useCallback((stepValue: string) => {
      setStepOrder((prev) => prev.filter((s) => s !== stepValue));
    }, []);

    const contextValue = React.useMemo<StepperContextValue>(
      () => ({
        value: activeValue,
        onValueChange: handleValueChange,
        orientation,
        linear,
        interactive,
        intensity,
        registerStep,
        unregisterStep,
        stepOrder,
      }),
      [
        activeValue,
        handleValueChange,
        orientation,
        linear,
        interactive,
        intensity,
        registerStep,
        unregisterStep,
        stepOrder,
      ]
    );

    return (
      <StepperContext.Provider value={contextValue}>
        <nav
          ref={ref}
          role="navigation"
          aria-label="Progress"
          data-slot="stepper"
          data-orientation={orientation}
          data-interactive={interactive ? "true" : undefined}
          data-intensity={intensity}
          className={cn("w-full", className)}
          {...props}
        >
          {children}
        </nav>
      </StepperContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* StepperList                                                                */
/* -------------------------------------------------------------------------- */

export interface StepperListProps extends React.OlHTMLAttributes<HTMLOListElement> {}

export const StepperList = React.forwardRef<HTMLOListElement, StepperListProps>(
  function StepperList({ className, children, ...props }, ref) {
    const { orientation } = useStepper();

    return (
      <ol
        ref={ref}
        role="list"
        data-slot="stepper-list"
        data-orientation={orientation}
        className={cn(
          "flex w-full p-0 m-0 list-none",
          orientation === "horizontal"
            ? "flex-row items-center justify-between"
            : "flex-col items-start space-y-4",
          className
        )}
        {...props}
      >
        {children}
      </ol>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* StepperItem                                                                */
/* -------------------------------------------------------------------------- */

export interface StepperItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /**
   * Unique stable identifier for this step.
   */
  value: string;
  /**
   * Explicit status override. If omitted, status is derived from current Stepper value
   * and step sequence order.
   */
  status?: StepStatus;
  /**
   * Whether this step is disabled and unavailable for user activation.
   * @default false
   */
  disabled?: boolean;
  /**
   * Optional manual 1-based index or ordinal position for display.
   */
  stepIndex?: number;
}

export const StepperItem = React.forwardRef<HTMLLIElement, StepperItemProps>(
  function StepperItem(
    {
      value: stepValue,
      status: explicitStatus,
      disabled = false,
      stepIndex: manualIndex,
      className,
      children,
      ...props
    },
    ref
  ) {
    const {
      value: activeValue,
      linear,
      interactive,
      registerStep,
      unregisterStep,
      stepOrder,
      orientation,
    } = useStepper();

    React.useEffect(() => {
      registerStep(stepValue);
      return () => unregisterStep(stepValue);
    }, [registerStep, unregisterStep, stepValue]);

    const computedIndex = stepOrder.indexOf(stepValue);
    const activeIndex = activeValue ? stepOrder.indexOf(activeValue) : -1;
    const finalIndex = manualIndex !== undefined ? manualIndex : computedIndex >= 0 ? computedIndex + 1 : 1;

    // Determine status
    let status: StepStatus;
    if (explicitStatus) {
      status = explicitStatus;
    } else if (disabled) {
      status = "disabled";
    } else if (activeValue === stepValue) {
      status = "current";
    } else if (activeIndex >= 0 && computedIndex >= 0) {
      status = computedIndex < activeIndex ? "completed" : "upcoming";
    } else {
      status = "upcoming";
    }

    const isCurrent = status === "current";
    const isCompleted = status === "completed";
    const isUpcoming = status === "upcoming";
    const isDisabled = status === "disabled" || disabled;
    const isError = status === "error";

    // Navigable rules
    let isNavigable = interactive && !isDisabled;
    if (linear && isUpcoming) {
      isNavigable = false; // In linear workflows, cannot jump forward to upcoming steps directly
    }

    const itemContextValue = React.useMemo<StepperItemContextValue>(
      () => ({
        value: stepValue,
        stepIndex: finalIndex,
        status,
        isCurrent,
        isCompleted,
        isUpcoming,
        isDisabled,
        isError,
        isNavigable,
      }),
      [
        stepValue,
        finalIndex,
        status,
        isCurrent,
        isCompleted,
        isUpcoming,
        isDisabled,
        isError,
        isNavigable,
      ]
    );

    return (
      <StepperItemContext.Provider value={itemContextValue}>
        <li
          ref={ref}
          role="listitem"
          data-slot="stepper-item"
          data-status={status}
          data-orientation={orientation}
          className={cn(
            "relative flex",
            orientation === "horizontal"
              ? "flex-1 last:flex-none flex-row items-center"
              : "w-full flex-col items-start",
            className
          )}
          {...props}
        >
          {children}
        </li>
      </StepperItemContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* StepperTrigger                                                             */
/* -------------------------------------------------------------------------- */

export interface StepperTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const StepperTrigger = React.forwardRef<HTMLButtonElement, StepperTriggerProps>(
  function StepperTrigger(
    {
      className,
      onClick,
      children,
      ...props
    },
    ref
  ) {
    const { interactive, onValueChange, orientation } = useStepper();
    const {
      value,
      status,
      isCurrent,
      isCompleted,
      isUpcoming,
      isDisabled,
      isError,
      isNavigable,
    } = useStepperItem();

    // Informational Mode: Non-interactive semantic progress indicator
    if (!interactive) {
      return (
        <div
          data-slot="stepper-trigger"
          data-status={status}
          data-current={isCurrent ? "true" : undefined}
          aria-current={isCurrent ? "step" : undefined}
          className={cn(
            "group inline-flex items-center gap-3 select-none text-left",
            orientation === "vertical" ? "w-full" : "",
            className
          )}
        >
          {children}
        </div>
      );
    }

    // Interactive Mode: Real button control adhering to normal Tab navigation
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented && isNavigable) {
        onValueChange?.(value);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={!isNavigable}
        onClick={handleClick}
        aria-current={isCurrent ? "step" : undefined}
        data-slot="stepper-trigger"
        data-status={status}
        data-navigable={isNavigable ? "true" : undefined}
        className={cn(
          "group inline-flex items-center gap-3 select-none text-left rounded-lg p-1.5 transition-all duration-150 outline-none",
          // Tab keyboard focus: high contrast Halo focus ring
          "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isNavigable && "cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98]",
          !isNavigable && "cursor-not-allowed opacity-75",
          orientation === "vertical" ? "w-full" : "",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* StepperIndicator                                                           */
/* -------------------------------------------------------------------------- */

export interface StepperIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export const StepperIndicator = React.forwardRef<HTMLSpanElement, StepperIndicatorProps>(
  function StepperIndicator({ className, children, ...props }, ref) {
    const { intensity } = useStepper();
    const {
      status,
      stepIndex,
      isCurrent,
      isCompleted,
      isUpcoming,
      isDisabled,
      isError,
    } = useStepperItem();

    return (
      <span
        ref={ref}
        data-slot="stepper-indicator"
        data-status={status}
        className={cn(
          "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold select-none transition-all duration-200",
          // Liquid optical edge & layer refraction
          "border backdrop-blur-md",
          // Current step: Apple liquid glass active lens
          isCurrent && [
            "border-foreground/20 dark:border-white/25 bg-black/[0.06] dark:bg-white/[0.14] text-foreground font-bold backdrop-blur-xl",
            "shadow-[0_2px_10px_rgba(0,0,0,0.08),inset_0_1px_1.5px_0_rgba(255,255,255,0.95)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_1.5px_0_rgba(255,255,255,0.3)] ring-2 ring-foreground/10 dark:ring-white/10",
          ],
          // Completed step: emerald tone & subtle confirmation depth
          isCompleted && [
            "border-emerald-500/70 dark:border-emerald-500/60 bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 backdrop-blur-md",
            "shadow-[0_0_12px_rgba(16,185,129,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_0_16px_rgba(16,185,129,0.3),inset_0_1px_1px_0_rgba(255,255,255,0.25)]",
          ],
          // Error step: rose alert tone with distinct warning boundary
          isError && [
            "border-rose-500/80 dark:border-rose-500/70 bg-rose-500/15 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 backdrop-blur-md",
            "shadow-[0_0_14px_rgba(244,63,94,0.3),inset_0_1px_1px_0_rgba(255,255,255,0.7)] dark:shadow-[0_0_18px_rgba(244,63,94,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.2)]",
          ],
          // Upcoming step: restrained subtle border & muted text
          isUpcoming && [
            "border-black/[0.08] dark:border-white/[0.12] bg-white/40 dark:bg-white/[0.04] text-muted-foreground backdrop-blur-sm",
            "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1)]",
          ],
          // Disabled step: lowered opacity
          isDisabled && [
            "border-border/40 bg-muted/10 text-muted-foreground/40 opacity-60",
          ],
          className
        )}
        {...props}
      >
        {children ? (
          children
        ) : isCompleted ? (
          <>
            <HaloIcon icon={Tick02Icon} size={15} className="stroke-[2.5]" />
            <span className="sr-only">(Completed)</span>
          </>
        ) : isError ? (
          <>
            <HaloIcon icon={Alert02Icon} size={15} className="stroke-[2.5]" />
            <span className="sr-only">(Error)</span>
          </>
        ) : isCurrent ? (
          <>
            <span>{stepIndex}</span>
            <span className="sr-only">(Current step)</span>
          </>
        ) : (
          <>
            <span>{stepIndex}</span>
            <span className="sr-only">(Upcoming)</span>
          </>
        )}
      </span>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* StepperTitle                                                               */
/* -------------------------------------------------------------------------- */

export interface StepperTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const StepperTitle = React.forwardRef<HTMLHeadingElement, StepperTitleProps>(
  function StepperTitle({ className, children, ...props }, ref) {
    const { isCurrent, isError, isUpcoming, isDisabled } = useStepperItem();

    return (
      <h3
        ref={ref}
        data-slot="stepper-title"
        className={cn(
          "text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap transition-colors duration-150",
          isCurrent && "font-semibold text-foreground",
          isError && "font-semibold text-rose-600 dark:text-rose-400",
          isUpcoming && "text-muted-foreground",
          isDisabled && "text-muted-foreground/60",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* StepperDescription                                                         */
/* -------------------------------------------------------------------------- */

export interface StepperDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const StepperDescription = React.forwardRef<HTMLParagraphElement, StepperDescriptionProps>(
  function StepperDescription({ className, children, ...props }, ref) {
    const { orientation } = useStepper();
    const { isError, isDisabled } = useStepperItem();

    return (
      <p
        ref={ref}
        data-slot="stepper-description"
        className={cn(
          "text-xs text-muted-foreground leading-normal mt-0.5",
          orientation === "horizontal" && "hidden sm:block",
          isError && "text-rose-500/90 dark:text-rose-400/90",
          isDisabled && "text-muted-foreground/50",
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* StepperSeparator                                                           */
/* -------------------------------------------------------------------------- */

export interface StepperSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const StepperSeparator = React.forwardRef<HTMLDivElement, StepperSeparatorProps>(
  function StepperSeparator({ className, ...props }, ref) {
    const { orientation } = useStepper();
    const { isCompleted } = useStepperItem();

    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          aria-hidden="true"
          data-slot="stepper-separator"
          data-orientation="vertical"
          className={cn(
            "relative w-[2px] min-h-[28px] ml-[21px] my-1 bg-border/60 transition-colors duration-200",
            isCompleted && "bg-emerald-500/60 dark:bg-emerald-400/60 shadow-[0_0_8px_rgba(16,185,129,0.3)]",
            className
          )}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        aria-hidden="true"
        data-slot="stepper-separator"
        data-orientation="horizontal"
        className={cn(
          "relative flex-1 h-[2px] mx-3 bg-border/60 transition-colors duration-200",
          isCompleted && "bg-emerald-500/60 dark:bg-emerald-400/60",
          className
        )}
        {...props}
      />
    );
  }
);

/* -------------------------------------------------------------------------- */
/* StepperContent                                                             */
/* -------------------------------------------------------------------------- */

export interface StepperContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The step value this content belongs to.
   */
  value: string;
}

export const StepperContent = React.forwardRef<HTMLDivElement, StepperContentProps>(
  function StepperContent({ value, className, children, ...props }, ref) {
    const { value: activeValue } = useStepper();
    const isCurrent = activeValue === value;

    if (!isCurrent) {
      return null;
    }

    return (
      <div
        ref={ref}
        data-slot="stepper-content"
        data-state={isCurrent ? "active" : "inactive"}
        className={cn("w-full mt-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
