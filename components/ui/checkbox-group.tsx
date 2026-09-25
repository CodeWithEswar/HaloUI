"use client";

import * as React from "react";
import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import { cn } from "@/lib/utils";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* CheckboxGroup Context                                                      */
/* -------------------------------------------------------------------------- */

interface CheckboxGroupContextValue {
  disabled?: boolean;
  invalid?: boolean;
  orientation?: "vertical" | "horizontal";
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue>({});

export function useCheckboxGroupContext() {
  return React.useContext(CheckboxGroupContext);
}

/* -------------------------------------------------------------------------- */
/* CheckboxGroup Root                                                         */
/* -------------------------------------------------------------------------- */

export interface CheckboxGroupProps
  extends Omit<CheckboxGroupPrimitive.Props, "render"> {
  /**
   * Layout orientation for the grouped options.
   * - "vertical" (default): stacks options vertically.
   * - "horizontal": organizes options horizontally with natural wrapping.
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Whether the group has a validation error.
   */
  invalid?: boolean;
}

/**
 * CheckboxGroup — Forms & Fields Primitive
 *
 * A related set of independent checkbox options for selecting zero, one, or multiple values.
 * Coordinates collection state while preserving native checkbox semantics and keyboard navigation.
 */
export const CheckboxGroup = React.forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  function CheckboxGroup(
    {
      className,
      orientation = "vertical",
      disabled: propDisabled,
      invalid: propInvalid,
      children,
      id: propId,
      ...props
    },
    ref
  ) {
    const fieldProps = useFieldControlProps({
      id: propId,
      disabled: propDisabled,
      "aria-invalid": propInvalid,
    });

    const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);
    const isDisabled = Boolean(propDisabled || fieldProps.disabled);

    const contextValue = React.useMemo<CheckboxGroupContextValue>(
      () => ({
        disabled: isDisabled,
        invalid: isInvalid,
        orientation,
      }),
      [isDisabled, isInvalid, orientation]
    );

    return (
      <CheckboxGroupContext.Provider value={contextValue}>
        <CheckboxGroupPrimitive
          render={
            <fieldset
              ref={ref}
              className={cn("border-none p-0 m-0 w-full min-w-0", className)}
            />
          }
          data-slot="checkbox-group"
          data-orientation={orientation}
          aria-invalid={isInvalid ? "true" : undefined}
          aria-describedby={fieldProps["aria-describedby"]}
          disabled={isDisabled}
          {...props}
        >
          <div
            className={cn(
              "w-full",
              orientation === "vertical" && "flex flex-col gap-3",
              orientation === "horizontal" && "flex flex-wrap gap-4 sm:gap-6"
            )}
          >
            {children}
          </div>
        </CheckboxGroupPrimitive>
      </CheckboxGroupContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* CheckboxGroup Supporting Primitives                                        */
/* -------------------------------------------------------------------------- */

export interface CheckboxGroupLabelProps extends React.ComponentProps<"legend"> {
  required?: boolean;
}

export function CheckboxGroupLabel({
  className,
  children,
  required,
  ...props
}: CheckboxGroupLabelProps) {
  return (
    <legend
      data-slot="checkbox-group-label"
      className={cn(
        "text-sm font-medium text-foreground leading-none mb-3 block select-none",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span
          className="ml-1 text-destructive font-bold text-xs"
          aria-hidden="true"
        >
          *
        </span>
      )}
    </legend>
  );
}

export interface CheckboxGroupDescriptionProps extends React.ComponentProps<"p"> {}

export function CheckboxGroupDescription({
  className,
  ...props
}: CheckboxGroupDescriptionProps) {
  return (
    <p
      data-slot="checkbox-group-description"
      className={cn("text-xs text-muted-foreground leading-relaxed -mt-1.5 mb-3", className)}
      {...props}
    />
  );
}

export interface CheckboxGroupItemProps extends React.ComponentProps<"div"> {}

export function CheckboxGroupItem({ className, ...props }: CheckboxGroupItemProps) {
  return (
    <div
      data-slot="checkbox-group-item"
      className={cn("flex items-start gap-3", className)}
      {...props}
    />
  );
}
