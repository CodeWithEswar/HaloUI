"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Cancel01Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  CheckmarkCircle02Icon,
  Alert02Icon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------
 * TYPES & INTERFACES
 * ----------------------------------------------------------------------- */

export type TourPopoverIntensity = "subtle" | "balanced" | "rich";

export type MissingTargetPolicy = "fallback" | "skip" | "stop";

export interface TourStep {
  /** Stable semantic identifier for step */
  id: string;
  /**
   * Target element to anchor to.
   * Can be an ID string, a React Ref, an HTMLElement, or null.
   */
  target: string | React.RefObject<HTMLElement | null> | HTMLElement | null;
  /** Primary title of the tour step */
  title: React.ReactNode;
  /** Concise instructional description */
  description: React.ReactNode;
  /** Optional supplemental content rendered between body and actions */
  content?: React.ReactNode;
  /** Preferred placement relative to the target */
  side?: "top" | "bottom" | "left" | "right";
  /** Alignment along the target's cross-axis */
  align?: "start" | "center" | "end";
  /** Distance in pixels from the target element. Defaults to 12 */
  sideOffset?: number;
  /** Offset along alignment axis. Defaults to 0 */
  alignOffset?: number;
  /** Custom label for Next action (defaults to "Next", or "Finish" on last step) */
  nextLabel?: string;
  /** Custom label for Back action (defaults to "Back") */
  backLabel?: string;
  /** Custom label for Finish action on final step (defaults to "Finish") */
  finishLabel?: string;
  /** Whether to hide the Back button on this step */
  hideBack?: boolean;
  /** Whether to hide the Skip button on this step */
  hideSkip?: boolean;
  /** Whether to hide the Close button on this step */
  hideClose?: boolean;
  /** Optional badge or eyebrow tag */
  badge?: React.ReactNode;
  /** Whether to visually highlight the target element on this step. Defaults to true */
  highlightTarget?: boolean;
}

export interface TourPopoverContextValue {
  steps: TourStep[];
  currentStepIndex: number;
  currentStep: TourStep | undefined;
  totalSteps: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  next: () => void;
  previous: () => void;
  finish: () => void;
  skip: () => void;
  goToStep: (indexOrId: number | string) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  targetElement: HTMLElement | null;
  isTargetAvailable: boolean;
  registerTarget: (id: string, element: HTMLElement | null) => void;
  missingTargetPolicy: MissingTargetPolicy;
  intensity: TourPopoverIntensity;
  highlightTarget: boolean;
  modal: boolean;
}

const TourPopoverContext = React.createContext<TourPopoverContextValue | null>(null);

export function useTourPopover(): TourPopoverContextValue {
  const context = React.useContext(TourPopoverContext);
  if (!context) {
    throw new Error("useTourPopover must be used within a TourPopover");
  }
  return context;
}

/* -------------------------------------------------------------------------
 * 1. TOUR TARGET COMPONENT
 * Wraps any target element without adding unnecessary DOM nodes.
 * Uses cloneElement with ref merging to preserve semantics & layout.
 * ----------------------------------------------------------------------- */

export interface TourTargetProps {
  id: string;
  children: React.ReactElement;
}

export function TourTarget({ id, children }: TourTargetProps) {
  const context = React.useContext(TourPopoverContext);
  const internalRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (context && internalRef.current) {
      context.registerTarget(id, internalRef.current);
    }
    return () => {
      if (context) {
        context.registerTarget(id, null);
      }
    };
  }, [context, id]);

  const handleRef = React.useCallback(
    (node: HTMLElement | null) => {
      internalRef.current = node;
      if (context) {
        context.registerTarget(id, node);
      }

      // Propagate existing ref from child
      const childRef = (children as any).ref;
      if (typeof childRef === "function") {
        childRef(node);
      } else if (childRef && typeof childRef === "object" && "current" in childRef) {
        childRef.current = node;
      }
    },
    [children, context, id]
  );

  return React.cloneElement(children as React.ReactElement<any>, {
    ref: handleRef,
    "data-tour-target": id,
  });
}

/* -------------------------------------------------------------------------
 * 2. ROOT TOUR POPOVER COMPONENT
 * State machine managing progression, target resolution, recovery, and focus.
 * ----------------------------------------------------------------------- */

export interface TourPopoverProps {
  /** Ordered list of tour steps */
  steps: TourStep[];
  /** Controlled open state */
  open?: boolean;
  /** Uncontrolled default open state */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Controlled active step index */
  currentStep?: number;
  /** Uncontrolled default step index. Defaults to 0 */
  defaultStep?: number;
  /** Callback fired when step index changes */
  onStepChange?: (index: number, step: TourStep) => void;
  /** Callback fired when user completes the tour */
  onComplete?: () => void;
  /** Callback fired when user skips or closes the tour */
  onSkip?: () => void;
  /** Callback fired when a target is not found in the DOM */
  onMissingTarget?: (step: TourStep) => void;
  /**
   * Strategy when a target is missing from the DOM:
   * - "fallback": Positions in center of viewport with informative alert banner (default)
   * - "skip": Skips missing target step and advances to next valid step
   * - "stop": Gracefully closes the tour
   */
  missingTargetPolicy?: MissingTargetPolicy;
  /** Whether to smoothly scroll targets into view. Defaults to true */
  scrollToTarget?: boolean;
  /** Top/bottom clearance padding for auto-scroll. Defaults to 40 */
  scrollPadding?: number;
  /** Whether to render a backdrop scrim and isolate interaction. Defaults to false */
  modal?: boolean;
  /** Whether to draw an optical highlight halo around the active target. Defaults to true */
  highlightTarget?: boolean;
  /** Liquid glass material intensity. Defaults to "balanced" */
  intensity?: TourPopoverIntensity;
  /** Children compound components */
  children?: React.ReactNode;
}

export function TourPopover({
  steps = [],
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  currentStep: controlledStep,
  defaultStep = 0,
  onStepChange,
  onComplete,
  onSkip,
  onMissingTarget,
  missingTargetPolicy = "fallback",
  scrollToTarget = true,
  scrollPadding = 40,
  modal = false,
  highlightTarget = true,
  intensity = "balanced",
  children,
}: TourPopoverProps) {
  // Open state management (controlled vs uncontrolled)
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [controlledOpen, onOpenChange]
  );

  // Step state management (controlled vs uncontrolled)
  const [uncontrolledStep, setUncontrolledStep] = React.useState(defaultStep);
  const activeIndex = controlledStep !== undefined ? controlledStep : uncontrolledStep;

  // Clamp active index safely to prevent runtime bounds errors
  const safeIndex = steps.length > 0 ? Math.max(0, Math.min(activeIndex, steps.length - 1)) : 0;
  const currentStep = steps[safeIndex];

  // Target registry for <TourTarget id="..."> mappings
  const registeredTargetsRef = React.useRef<Map<string, HTMLElement>>(new Map());
  const [registeredVersion, setRegisteredVersion] = React.useState(0);

  const registerTarget = React.useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      registeredTargetsRef.current.set(id, element);
    } else {
      registeredTargetsRef.current.delete(id);
    }
    setRegisteredVersion((v) => v + 1);
  }, []);

  // Target resolution state
  const [targetElement, setTargetElement] = React.useState<HTMLElement | null>(null);
  const [isTargetAvailable, setIsTargetAvailable] = React.useState(true);
  const previousFocusedElementRef = React.useRef<HTMLElement | null>(null);

  // Check reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Step resolution & auto-scroll effect
  React.useEffect(() => {
    if (!isOpen || !currentStep || steps.length === 0) {
      setTargetElement(null);
      setIsTargetAvailable(true);
      return;
    }

    // Resolve target element
    let resolved: HTMLElement | null = null;
    const rawTarget = currentStep.target;

    if (rawTarget instanceof HTMLElement) {
      resolved = rawTarget;
    } else if (rawTarget && typeof rawTarget === "object" && "current" in rawTarget) {
      resolved = rawTarget.current;
    } else if (typeof rawTarget === "string") {
      // 1. Check registered targets map
      resolved = registeredTargetsRef.current.get(rawTarget) || null;
      // 2. Fall back to DOM queries
      if (!resolved || !resolved.isConnected) {
        resolved =
          (document.querySelector(`[data-tour-target="${rawTarget}"]`) as HTMLElement) ||
          document.getElementById(rawTarget);
      }
    }

    const isAvailable = Boolean(resolved && resolved.isConnected);

    if (isAvailable && resolved) {
      setTargetElement(resolved);
      setIsTargetAvailable(true);

      // Scroll into view if enabled
      if (scrollToTarget) {
        const rect = resolved.getBoundingClientRect();
        const isInViewport =
          rect.top >= scrollPadding &&
          rect.bottom <= window.innerHeight - scrollPadding &&
          rect.left >= 0 &&
          rect.right <= window.innerWidth;

        if (!isInViewport) {
          try {
            resolved.scrollIntoView({
              behavior: prefersReducedMotion ? "auto" : "smooth",
              block: "nearest",
              inline: "nearest",
            });
          } catch {
            // Fallback for browsers with limited scrollIntoView options
            resolved.scrollIntoView();
          }
        }
      }
    } else {
      // Missing target handling
      setIsTargetAvailable(false);
      setTargetElement(null);
      onMissingTarget?.(currentStep);

      if (missingTargetPolicy === "skip") {
        if (safeIndex < steps.length - 1) {
          const nextIdx = safeIndex + 1;
          if (controlledStep === undefined) setUncontrolledStep(nextIdx);
          onStepChange?.(nextIdx, steps[nextIdx]);
        } else {
          setOpen(false);
          onComplete?.();
        }
      } else if (missingTargetPolicy === "stop") {
        setOpen(false);
      }
    }
  }, [
    isOpen,
    currentStep,
    safeIndex,
    steps,
    registeredVersion,
    scrollToTarget,
    scrollPadding,
    prefersReducedMotion,
    missingTargetPolicy,
    controlledStep,
    onMissingTarget,
    onStepChange,
    onComplete,
    setOpen,
  ]);

  // Target unmount observer: monitor if target gets detached while tour is active
  React.useEffect(() => {
    if (!isOpen || !targetElement) return;

    const observer = new MutationObserver(() => {
      if (!targetElement.isConnected) {
        setIsTargetAvailable(false);
        setTargetElement(null);
        if (currentStep) {
          onMissingTarget?.(currentStep);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [isOpen, targetElement, currentStep, onMissingTarget]);

  // Capture invoking focus on open and restore on complete/skip
  React.useEffect(() => {
    if (isOpen) {
      if (typeof document !== "undefined") {
        previousFocusedElementRef.current = document.activeElement as HTMLElement | null;
      }
    } else {
      if (previousFocusedElementRef.current && previousFocusedElementRef.current.isConnected) {
        previousFocusedElementRef.current.focus();
      }
    }
  }, [isOpen]);

  // Progression handlers
  const goToStep = React.useCallback(
    (indexOrId: number | string) => {
      let targetIndex = -1;
      if (typeof indexOrId === "number") {
        targetIndex = indexOrId;
      } else {
        targetIndex = steps.findIndex((s) => s.id === indexOrId);
      }

      if (targetIndex >= 0 && targetIndex < steps.length) {
        if (controlledStep === undefined) {
          setUncontrolledStep(targetIndex);
        }
        onStepChange?.(targetIndex, steps[targetIndex]);
      }
    },
    [steps, controlledStep, onStepChange]
  );

  const next = React.useCallback(() => {
    if (safeIndex < steps.length - 1) {
      goToStep(safeIndex + 1);
    } else {
      setOpen(false);
      onComplete?.();
    }
  }, [safeIndex, steps.length, goToStep, setOpen, onComplete]);

  const previous = React.useCallback(() => {
    if (safeIndex > 0) {
      goToStep(safeIndex - 1);
    }
  }, [safeIndex, goToStep]);

  const finish = React.useCallback(() => {
    setOpen(false);
    onComplete?.();
  }, [setOpen, onComplete]);

  const skip = React.useCallback(() => {
    setOpen(false);
    onSkip?.();
  }, [setOpen, onSkip]);

  const isFirstStep = safeIndex === 0;
  const isLastStep = safeIndex === steps.length - 1;

  const contextValue = React.useMemo<TourPopoverContextValue>(
    () => ({
      steps,
      currentStepIndex: safeIndex,
      currentStep,
      totalSteps: steps.length,
      open: isOpen,
      setOpen,
      next,
      previous,
      finish,
      skip,
      goToStep,
      isFirstStep,
      isLastStep,
      targetElement,
      isTargetAvailable,
      registerTarget,
      missingTargetPolicy,
      intensity,
      highlightTarget,
      modal,
    }),
    [
      steps,
      safeIndex,
      currentStep,
      isOpen,
      setOpen,
      next,
      previous,
      finish,
      skip,
      goToStep,
      isFirstStep,
      isLastStep,
      targetElement,
      isTargetAvailable,
      registerTarget,
      missingTargetPolicy,
      intensity,
      highlightTarget,
      modal,
    ]
  );

  return (
    <TourPopoverContext.Provider value={contextValue}>
      {children}
    </TourPopoverContext.Provider>
  );
}

/* -------------------------------------------------------------------------
 * 3. TOUR POPOVER TRIGGER
 * Optional trigger button to open/start the tour.
 * ----------------------------------------------------------------------- */

export interface TourPopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function TourPopoverTrigger({
  onClick,
  children,
  className,
  ...props
}: TourPopoverTriggerProps) {
  const { setOpen, open } = useTourPopover();

  return (
    <Button
      variant="outline"
      data-slot="tour-popover-trigger"
      className={cn("gap-2", className)}
      onClick={(e) => {
        setOpen(!open);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

/* -------------------------------------------------------------------------
 * 4. TARGET HIGHLIGHT RING
 * Renders an optical halo around the currently active target element.
 * NOTE: This is NOT keyboard focus. It is purely an optical target indicator.
 * ----------------------------------------------------------------------- */

export function TourTargetHighlight() {
  const { targetElement, open, isTargetAvailable, highlightTarget, currentStep } = useTourPopover();
  const [rect, setRect] = React.useState<DOMRect | null>(null);

  const shouldHighlight =
    open &&
    isTargetAvailable &&
    highlightTarget &&
    (currentStep?.highlightTarget ?? true) &&
    Boolean(targetElement);

  React.useEffect(() => {
    if (!shouldHighlight || !targetElement) {
      setRect(null);
      return;
    }

    const updateRect = () => {
      if (targetElement.isConnected) {
        setRect(targetElement.getBoundingClientRect());
      }
    };

    updateRect();

    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true, capture: true });

    const resizeObserver = new ResizeObserver(updateRect);
    resizeObserver.observe(targetElement);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
      resizeObserver.disconnect();
    };
  }, [shouldHighlight, targetElement]);

  if (!shouldHighlight || !rect || rect.width === 0 || rect.height === 0) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      data-slot="tour-target-highlight"
      className={cn(
        "pointer-events-none fixed z-40 transition-all duration-200 ease-out",
        "rounded-[inherit]",
        // 10-layer physical liquid highlight halo (NOT keyboard focus)
        "border-2 border-primary/60 dark:border-primary/50",
        "shadow-[0_0_0_4px_rgba(59,130,246,0.15),0_0_24px_rgba(59,130,246,0.20)]"
      )}
      style={{
        top: `${rect.top - 4}px`,
        left: `${rect.left - 4}px`,
        width: `${rect.width + 8}px`,
        height: `${rect.height + 8}px`,
      }}
    />
  );
}

/* -------------------------------------------------------------------------
 * 5. TOUR POPOVER CONTENT
 * Reuses @base-ui/react/popover Positioner & Popup with liquid glass optics.
 * Handles viewport fallback positioning when target is missing.
 * ----------------------------------------------------------------------- */

export interface TourPopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  showCloseButton?: boolean;
  showProgress?: boolean;
  showNavigation?: boolean;
  sideOffset?: number;
  alignOffset?: number;
}

export function TourPopoverContent({
  className,
  children,
  showCloseButton = true,
  showProgress = true,
  showNavigation = true,
  sideOffset: customSideOffset,
  alignOffset: customAlignOffset,
  ...props
}: TourPopoverContentProps) {
  const {
    open,
    setOpen,
    currentStep,
    targetElement,
    isTargetAvailable,
    intensity,
    modal,
    skip,
  } = useTourPopover();

  // Virtual element used as anchor fallback when the target is missing or unmounted
  const fallbackVirtualElement = React.useMemo(() => {
    if (typeof window === "undefined") return null;
    return {
      getBoundingClientRect: () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        return {
          top: vh / 2 - 1,
          bottom: vh / 2 + 1,
          left: vw / 2 - 1,
          right: vw / 2 + 1,
          width: 2,
          height: 2,
          x: vw / 2 - 1,
          y: vh / 2 - 1,
          toJSON: () => ({}),
        };
      },
    };
  }, []);

  const anchor = targetElement || fallbackVirtualElement;

  // Resolve step side/align preferences
  const side = currentStep?.side ?? "bottom";
  const align = currentStep?.align ?? "center";
  const sideOffset = customSideOffset ?? currentStep?.sideOffset ?? 12;
  const alignOffset = customAlignOffset ?? currentStep?.alignOffset ?? 0;

  // Focus trap / keyboard Escape handling
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        skip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, skip]);

  if (!open || !currentStep) {
    return null;
  }

  return (
    <>
      {/* Target highlight ring */}
      <TourTargetHighlight />

      {/* Optional modal scrim */}
      {modal && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] animate-in fade-in-0 duration-200"
          onClick={() => setOpen(false)}
        />
      )}

      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Positioner
            anchor={anchor || undefined}
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            collisionPadding={16}
            className="isolate z-50"
          >
            <PopoverPrimitive.Popup
              ref={contentRef}
              role="dialog"
              aria-modal={modal ? "true" : "false"}
              aria-labelledby="tour-popover-title"
              aria-describedby="tour-popover-description"
              data-slot="tour-popover-content"
              data-intensity={intensity}
              className={cn(
                "relative z-50 flex w-80 max-w-[calc(100vw-2rem)] origin-(--transform-origin) flex-col gap-3 rounded-2xl p-4 text-sm text-foreground outline-none duration-150 select-text",
                // 10-layer physical liquid glass optical engine
                "halo-liquid-glass-surface",
                intensity === "subtle" && "halo-intensity-subtle",
                intensity === "balanced" && "halo-intensity-balanced",
                intensity === "rich" && "halo-intensity-rich",
                // Kinematic entry/exit transitions
                "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
                "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                // Directional translation along anchor axis
                "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
                className
              )}
              {...props}
            >
              {/* Optional Arrow (only shown when target is resolved) */}
              {targetElement && <TourPopoverArrow />}

              {/* Missing Target Recovery Notice */}
              {!isTargetAvailable && (
                <div
                  role="status"
                  data-slot="tour-missing-target-notice"
                  className="flex items-center gap-1.5 rounded-lg border border-amber-500/25 bg-amber-500/10 px-2.5 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300"
                >
                  <HaloIcon icon={Alert02Icon} size={15} className="shrink-0 text-amber-500" />
                  <span>Target element is not currently visible in this view</span>
                </div>
              )}

              {/* Render children if custom composition, else default step template */}
              {children ? (
                children
              ) : (
                <>
                  <TourPopoverHeader>
                    <div className="flex items-center gap-2">
                      {showProgress && <TourPopoverProgress />}
                      {currentStep.badge && <TourPopoverBadge>{currentStep.badge}</TourPopoverBadge>}
                    </div>
                    {showCloseButton && !currentStep.hideClose && <TourPopoverClose />}
                  </TourPopoverHeader>

                  <TourPopoverTitle id="tour-popover-title">
                    {currentStep.title}
                  </TourPopoverTitle>

                  <TourPopoverDescription id="tour-popover-description">
                    {currentStep.description}
                  </TourPopoverDescription>

                  {currentStep.content && (
                    <div className="py-1 text-xs text-foreground/90">
                      {currentStep.content}
                    </div>
                  )}

                  {showNavigation && (
                    <TourPopoverFooter>
                      {!currentStep.hideSkip && <TourPopoverSkip />}
                      <div className="flex items-center gap-2">
                        {!currentStep.hideBack && <TourPopoverBack />}
                        <TourPopoverNext />
                      </div>
                    </TourPopoverFooter>
                  )}
                </>
              )}
            </PopoverPrimitive.Popup>
          </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </>
  );
}

/* -------------------------------------------------------------------------
 * 6. SUB-COMPONENTS & STRUCTURAL SLOTS
 * ----------------------------------------------------------------------- */

export function TourPopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tour-popover-header"
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    />
  );
}

export function TourPopoverTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="tour-popover-title"
      className={cn("font-heading text-sm font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  );
}

export function TourPopoverDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="tour-popover-description"
      className={cn("text-xs leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

export function TourPopoverProgress({ className }: { className?: string }) {
  const { currentStepIndex, totalSteps } = useTourPopover();

  return (
    <div
      data-slot="tour-popover-progress"
      className={cn(
        "flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase",
        className
      )}
    >
      <span>Step</span>
      <span className="text-foreground">{currentStepIndex + 1}</span>
      <span>of</span>
      <span>{totalSteps}</span>
    </div>
  );
}

export function TourPopoverBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tour-popover-badge"
      className={cn(
        "inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary",
        className
      )}
      {...props}
    />
  );
}

export function TourPopoverFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tour-popover-footer"
      className={cn("mt-1 flex items-center justify-between gap-2 pt-2 border-t border-border/40", className)}
      {...props}
    />
  );
}

export function TourPopoverNext({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { next, isLastStep, currentStep } = useTourPopover();

  const label =
    children ||
    (isLastStep
      ? currentStep?.finishLabel || "Finish"
      : currentStep?.nextLabel || "Next");

  return (
    <Button
      variant="default"
      size="sm"
      data-slot="tour-popover-next"
      className={cn("gap-1 font-medium", className)}
      onClick={next}
      {...props}
    >
      <span>{label}</span>
      {isLastStep ? (
        <HaloIcon icon={CheckmarkCircle02Icon} size={13} />
      ) : (
        <HaloIcon icon={ArrowRight01Icon} size={13} />
      )}
    </Button>
  );
}

export function TourPopoverBack({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { previous, isFirstStep, currentStep } = useTourPopover();

  if (isFirstStep) {
    return null;
  }

  const label = children || currentStep?.backLabel || "Back";

  return (
    <Button
      variant="ghost"
      size="sm"
      data-slot="tour-popover-back"
      className={cn("gap-1 text-muted-foreground hover:text-foreground", className)}
      onClick={previous}
      {...props}
    >
      <HaloIcon icon={ArrowLeft01Icon} size={13} />
      <span>{label}</span>
    </Button>
  );
}

export function TourPopoverSkip({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { skip } = useTourPopover();

  return (
    <Button
      variant="ghost"
      size="sm"
      data-slot="tour-popover-skip"
      className={cn("h-7 px-2 text-xs text-muted-foreground hover:text-foreground", className)}
      onClick={skip}
      {...props}
    >
      {children || "Skip tour"}
    </Button>
  );
}

export function TourPopoverClose({
  className,
  ...props
}: React.ComponentProps<typeof IconButton>) {
  const { skip } = useTourPopover();

  return (
    <IconButton
      variant="ghost"
      size="sm"
      data-slot="tour-popover-close"
      aria-label="Close onboarding tour"
      className={cn(
        "size-6 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/10",
        className
      )}
      onClick={skip}
      {...props}
    >
      <HaloIcon icon={Cancel01Icon} size={13} />
    </IconButton>
  );
}

export function TourPopoverArrow({
  className,
  ...props
}: PopoverPrimitive.Arrow.Props) {
  return (
    <PopoverPrimitive.Arrow
      data-slot="tour-popover-arrow"
      className={cn("fill-popover text-border drop-shadow-sm", className)}
      {...props}
    />
  );
}

export {
  TourPopover as Root,
  TourPopoverTrigger as Trigger,
  TourTarget as Target,
  TourPopoverContent as Content,
  TourPopoverHeader as Header,
  TourPopoverTitle as Title,
  TourPopoverDescription as Description,
  TourPopoverProgress as Progress,
  TourPopoverBadge as Badge,
  TourPopoverFooter as Footer,
  TourPopoverNext as Next,
  TourPopoverBack as Back,
  TourPopoverSkip as Skip,
  TourPopoverClose as Close,
  TourPopoverArrow as Arrow,
  TourTargetHighlight as TargetHighlight,
};
