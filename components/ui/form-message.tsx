"use client";

import * as React from "react";
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";
import { useFieldContext } from "@/components/ui/field";

export type FormMessageType = "error" | "success" | "warning" | "info";

export interface FormMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Semantic tone/type of the message.
   * If omitted and rendered inside a <Field invalid={true} />, defaults to "error".
   * Otherwise defaults to "info".
   * @default "error" (if field invalid) | "info"
   */
  type?: FormMessageType;
  /**
   * Whether to display the semantic tone icon.
   * @default true
   */
  showIcon?: boolean;
  /**
   * Custom icon override component.
   */
  icon?: any;
}

const typeIconMap = {
  error: AlertCircleIcon,
  success: CheckmarkCircle02Icon,
  warning: Alert02Icon,
  info: InformationCircleIcon,
};

const typeStyles: Record<FormMessageType, string> = {
  error: "text-destructive",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  info: "text-muted-foreground",
};

/**
 * FormMessage — Forms & Fields Primitive 34
 *
 * A semantic field-level message for communicating validation errors, success, warnings, or concise supporting feedback.
 * Automatically associates with Field IDs and applies deliberate announcement attributes without overwhelming screen readers.
 */
export const FormMessage = React.forwardRef<HTMLDivElement, FormMessageProps>(
  function FormMessage(
    {
      className,
      id: propId,
      type: propType,
      showIcon = true,
      icon: CustomIcon,
      children,
      ...props
    },
    ref
  ) {
    const fieldContext = useFieldContext();

    // Determine semantic type: explicit prop, or inferred from Field invalid context
    const resolvedType: FormMessageType =
      propType ?? (fieldContext?.invalid ? "error" : "info");

    // Accessible ID association
    const autoId =
      resolvedType === "error"
        ? fieldContext?.errorId
        : fieldContext?.descriptionId;
    const resolvedId = propId ?? autoId;

    if (!children) {
      return null;
    }

    const IconComponent = CustomIcon ?? typeIconMap[resolvedType];

    // Deliberate announcement strategy (Section 136-137):
    // Errors use role="alert" with aria-live="polite".
    // Success/warning/info use role="status" with aria-live="polite" without assertive interruption.
    const isError = resolvedType === "error";

    return (
      <div
        ref={ref}
        id={resolvedId}
        role={isError ? "alert" : "status"}
        aria-live="polite"
        data-slot="form-message"
        data-type={resolvedType}
        className={cn(
          "flex items-start gap-1.5 text-xs sm:text-sm font-medium leading-normal text-left animate-in fade-in-0 duration-150",
          typeStyles[resolvedType],
          "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:opacity-80",
          className
        )}
        {...props}
      >
        {showIcon && IconComponent && (
          <span className="shrink-0 mt-0.5" aria-hidden="true">
            <HaloIcon icon={IconComponent} size={15} />
          </span>
        )}
        <div className="flex-1 min-w-0 break-words">{children}</div>
      </div>
    );
  }
);
