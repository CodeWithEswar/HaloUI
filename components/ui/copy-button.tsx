"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Copy01Icon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

/**
 * HaloUI CopyButton Variants
 *
 * Implements a specialized clipboard action with temporary operation feedback
 * honoring HaloUI's 10-layer physical liquid optical material engine:
 * - default: Signature liquid glass lens with multi-layered specular reflections and refraction boundary
 * - secondary: Translucent frosted crystal body with soft boundary
 * - outline: Recessed optical boundary with hairline perimeter
 * - ghost: Pure clarity at rest, resolving frosted glass on hover (ideal for code blocks and toolbars)
 *
 * State Dimensions:
 * - Status: idle -> copied / error -> idle (short-lived feedback, NOT a persistent toggle)
 * - Sizing: calibrated for compact utility rows, code blocks, and standalone actions
 */
export const copyButtonVariants = cva(
  [
    "group/copy-button relative inline-flex items-center justify-center font-medium select-none isolate overflow-hidden cursor-pointer",
    "transition-all duration-200 ease-out outline-none shrink-0",
    // Halo Focus Ring: double-contrast perimeter operating independently outside material boundary
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--halo-focus-offset-color)] focus-visible:z-10 halo-focus-ring",
    // Tactile press response during pointer/keyboard down
    "halo-tactile-press",
    // Reduced motion compliance
    "motion-reduce:transition-none motion-reduce:transform-none",
    // Disabled State: muted optical transmission while preserving spatial identifiability
    "disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:transform-none",
    // SVG alignment & pointer isolation
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "halo-liquid-glass text-neutral-900 dark:text-white",
          // Feedback tint adjustments without neon floodlights or glowing orbs
          "data-[status=copied]:text-emerald-700 dark:data-[status=copied]:text-emerald-300 data-[status=copied]:border-emerald-500/40 dark:data-[status=copied]:border-emerald-500/50",
          "data-[status=error]:text-rose-700 dark:data-[status=error]:text-rose-300 data-[status=error]:border-rose-500/40 dark:data-[status=error]:border-rose-500/50",
        ],
        secondary: [
          "bg-white/70 dark:bg-neutral-900/75 text-neutral-800 dark:text-neutral-100",
          "border border-black/[0.14] dark:border-white/[0.18]",
          "backdrop-blur-[16px] backdrop-saturate-150",
          "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15)]",
          "hover:bg-white/85 dark:hover:bg-neutral-900/90 hover:border-black/[0.22] dark:hover:border-white/[0.26]",
          "hover:-translate-y-0.5 active:scale-[0.96]",
          "data-[status=copied]:text-emerald-700 dark:data-[status=copied]:text-emerald-300 data-[status=copied]:border-emerald-500/40 dark:data-[status=copied]:border-emerald-500/50",
          "data-[status=error]:text-rose-700 dark:data-[status=error]:text-rose-300 data-[status=error]:border-rose-500/40 dark:data-[status=error]:border-rose-500/50",
        ],
        outline: [
          "bg-white/[0.03] dark:bg-white/[0.02] text-neutral-800 dark:text-neutral-200",
          "border border-black/[0.18] dark:border-white/[0.22]",
          "hover:border-black/[0.32] dark:hover:border-white/[0.38] hover:text-neutral-950 dark:hover:text-white",
          "backdrop-blur-[8px]",
          "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),inset_0_-1px_1px_0_rgba(0,0,0,0.15)]",
          "hover:-translate-y-0.5 active:scale-[0.96]",
          "data-[status=copied]:text-emerald-700 dark:data-[status=copied]:text-emerald-300 data-[status=copied]:border-emerald-500/40 dark:data-[status=copied]:border-emerald-500/50",
          "data-[status=error]:text-rose-700 dark:data-[status=error]:text-rose-300 data-[status=error]:border-rose-500/40 dark:data-[status=error]:border-rose-500/50",
        ],
        ghost: [
          "bg-transparent text-neutral-600 dark:text-neutral-400 border border-transparent",
          "hover:bg-white/[0.08] dark:hover:bg-white/[0.08] hover:text-neutral-900 dark:hover:text-white hover:border-black/[0.08] dark:hover:border-white/[0.12]",
          "hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),inset_0_1px_1px_0_rgba(255,255,255,0.4)]",
          "backdrop-blur-[8px] hover:-translate-y-0.5 active:scale-[0.96]",
          "data-[status=copied]:text-emerald-600 dark:data-[status=copied]:text-emerald-400 data-[status=copied]:bg-emerald-500/[0.08] dark:data-[status=copied]:bg-emerald-500/[0.12] data-[status=copied]:border-emerald-500/30",
          "data-[status=error]:text-rose-600 dark:data-[status=error]:text-rose-400 data-[status=error]:bg-rose-500/[0.08] dark:data-[status=error]:bg-rose-500/[0.12] data-[status=error]:border-rose-500/30",
        ],
      },
      size: {
        sm: "size-8 rounded-md text-xs [&_svg:not([class*='size-'])]:size-3.5",
        default: "size-9 rounded-md text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "size-10 rounded-md text-base [&_svg:not([class*='size-'])]:size-4.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type CopyButtonVariant = NonNullable<VariantProps<typeof copyButtonVariants>["variant"]>;
export type CopyButtonSize = NonNullable<VariantProps<typeof copyButtonVariants>["size"]>;

export type CopyStatus = "idle" | "copied" | "error";

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * The explicit text string written to the browser clipboard.
   */
  value?: string;
  /**
   * Optional custom copy operation. Supports asynchronous operations and rejection simulation.
   */
  onCopy?: () => void | Promise<void>;
  /**
   * Visual variant honoring HaloUI's 10-layer physical liquid optical material engine.
   * @default "default"
   */
  variant?: CopyButtonVariant;
  /**
   * Sizing geometry for the button.
   * @default "default"
   */
  size?: CopyButtonSize;
  /**
   * Duration in milliseconds that the copied or error feedback remains visible before resetting to idle.
   * @default 2000
   */
  feedbackDuration?: number;
  /**
   * Accessible message announced by screen readers via polite live region upon successful copy.
   * @default "Copied to clipboard"
   */
  successMessage?: string;
  /**
   * Accessible message announced by screen readers via polite live region upon copy failure.
   * @default "Failed to copy to clipboard"
   */
  errorMessage?: string;
  /**
   * Label rendered when in copied state for labeled presentations.
   * @default "Copied"
   */
  copiedLabel?: string;
  /**
   * Label rendered when in error state for labeled presentations.
   * @default "Failed"
   */
  errorLabel?: string;
  /**
   * Custom idle icon from Hugeicons.
   * @default Copy01Icon
   */
  icon?: any;
  /**
   * Custom success/copied icon from Hugeicons.
   * @default CheckmarkCircle02Icon
   */
  copiedIcon?: any;
  /**
   * Custom error/failure icon from Hugeicons.
   * @default AlertCircleIcon
   */
  errorIcon?: any;
  /**
   * Callback fired immediately when clipboard write completes successfully.
   */
  onCopySuccess?: () => void;
  /**
   * Callback fired when clipboard write or custom copy operation fails.
   */
  onCopyError?: (error: unknown) => void;
  /**
   * Optional children for labeled presentations or dynamic status render prop.
   */
  children?:
    | React.ReactNode
    | ((state: { status: CopyStatus; copied: boolean; error: boolean }) => React.ReactNode);
}

/**
 * CopyButton — HaloUI Actions 08
 *
 * Copies text to the clipboard and provides short-lived accessible feedback when the operation
 * succeeds or fails. Unlike Toggle, this represents temporary operation feedback, not persistent selection.
 */
export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      className,
      value,
      onCopy,
      variant = "default",
      size = "default",
      feedbackDuration = 2000,
      successMessage = "Copied to clipboard",
      errorMessage = "Failed to copy to clipboard",
      copiedLabel = "Copied",
      errorLabel = "Failed",
      icon = Copy01Icon,
      copiedIcon = CheckmarkCircle02Icon,
      errorIcon = AlertCircleIcon,
      onCopySuccess,
      onCopyError,
      onClick,
      disabled,
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    const [status, setStatus] = React.useState<CopyStatus>("idle");
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    // Development-time accessibility audit for icon-only usage
    if (process.env.NODE_ENV !== "production") {
      const isIconOnly = children === undefined;
      const hasAccessibleName = Boolean(
        props["aria-label"] || props["aria-labelledby"] || props.title
      );
      if (isIconOnly && !hasAccessibleName && typeof console !== "undefined") {
        console.warn(
          "[HaloUI CopyButton]: An accessible name is mandatory for icon-only buttons. Please provide an 'aria-label' or 'aria-labelledby' attribute."
        );
      }
    }

    // Comprehensive timer cleanup on unmount
    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }, []);

    const handleCopy = React.useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        // Forward existing onClick handler
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;

        // Clear any existing reset timer to prevent race conditions during rapid re-clicks
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        try {
          if (onCopy) {
            // Consumer-owned operation (allows custom async operations or deterministic error testing)
            await onCopy();
          } else if (value !== undefined) {
            // SSR safety: access navigator only inside client interaction
            if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
              throw new Error("Clipboard API is not available in this environment.");
            }
            await navigator.clipboard.writeText(value);
          } else {
            throw new Error("CopyButton requires either an explicit 'value' prop or an 'onCopy' handler.");
          }

          // Transition to copied feedback only after the actual write completes
          setStatus("copied");
          onCopySuccess?.();

          timeoutRef.current = setTimeout(() => {
            setStatus("idle");
            timeoutRef.current = null;
          }, feedbackDuration);
        } catch (error) {
          // Controlled error transition without false success
          setStatus("error");
          onCopyError?.(error);

          timeoutRef.current = setTimeout(() => {
            setStatus("idle");
            timeoutRef.current = null;
          }, feedbackDuration);
        }
      },
      [disabled, feedbackDuration, onClick, onCopy, onCopyError, onCopySuccess, value]
    );

    // Current state icon
    const CurrentIcon =
      status === "copied" ? copiedIcon : status === "error" ? errorIcon : icon;

    const isLabeled = children !== undefined;

    // Labeled presentation sizing classes (stable width preventing layout shift)
    const labeledSizeClasses = isLabeled
      ? size === "sm"
        ? "h-8 px-2.5 text-xs gap-1.5 w-auto min-w-[5.25rem]"
        : size === "lg"
          ? "h-10 px-3.5 text-sm gap-2 w-auto min-w-[6.25rem]"
          : "h-9 px-3 text-sm gap-2 w-auto min-w-[5.75rem]"
      : "";

    // Render children content based on status
    const renderContent = () => {
      if (typeof children === "function") {
        return children({
          status,
          copied: status === "copied",
          error: status === "error",
        });
      }

      if (isLabeled) {
        return (
          <>
            <HaloIcon
              icon={CurrentIcon}
              className={cn(
                "transition-transform duration-150 ease-out",
                status === "copied" && "scale-110",
                status === "error" && "scale-105"
              )}
            />
            <span className="truncate">
              {status === "copied"
                ? copiedLabel
                : status === "error"
                  ? errorLabel
                  : children}
            </span>
          </>
        );
      }

      return (
        <HaloIcon
          icon={CurrentIcon}
          className={cn(
            "transition-transform duration-150 ease-out",
            status === "copied" && "scale-110",
            status === "error" && "scale-105"
          )}
        />
      );
    };

    return (
      <>
        <button
          ref={ref}
          type={type}
          data-slot="copy-button"
          data-status={status}
          data-variant={variant}
          data-size={size}
          disabled={disabled}
          onClick={handleCopy}
          className={cn(
            copyButtonVariants({ variant, size }),
            labeledSizeClasses,
            className
          )}
          {...props}
        >
          {renderContent()}
        </button>

        {/* Accessible screen-reader live region for transient operation status feedback */}
        <span className="sr-only" role="status" aria-live="polite">
          {status === "copied"
            ? successMessage
            : status === "error"
              ? errorMessage
              : ""}
        </span>
      </>
    );
  }
);

CopyButton.displayName = "CopyButton";
