"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "@/lib/utils";
import { ArrowDown01Icon, Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* MultiSelect Context                                                        */
/* -------------------------------------------------------------------------- */

interface MultiSelectContextValue {
  invalid?: boolean;
  disabled?: boolean;
  id?: string;
  describedBy?: string;
  labels?: Record<string, string>;
}

const MultiSelectContext = React.createContext<MultiSelectContextValue>({});

export function useMultiSelectContext() {
  return React.useContext(MultiSelectContext);
}

/* -------------------------------------------------------------------------- */
/* MultiSelect Root                                                           */
/* -------------------------------------------------------------------------- */

export interface MultiSelectProps<Value = string>
  extends Omit<ComboboxPrimitive.Root.Props<Value, true>, "multiple"> {
  invalid?: boolean;
  labels?: Record<string, string>;
}

/**
 * MultiSelect — Forms & Fields Primitive
 *
 * A searchable multi-value picker for selecting and managing multiple options
 * as removable tokens, styled with HaloUI's 10-layer physical liquid glass engine.
 */
export function MultiSelect<Value = string>({
  children,
  invalid: propInvalid,
  disabled: propDisabled,
  id: propId,
  labels,
  ...props
}: MultiSelectProps<Value>) {
  const fieldProps = useFieldControlProps({
    id: propId,
    disabled: propDisabled,
    "aria-invalid": propInvalid,
  });

  const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);
  const isDisabled = Boolean(propDisabled || fieldProps.disabled);

  const contextValue = React.useMemo<MultiSelectContextValue>(
    () => ({
      invalid: isInvalid,
      disabled: isDisabled,
      id: fieldProps.id,
      describedBy: fieldProps["aria-describedby"],
      labels,
    }),
    [isInvalid, isDisabled, fieldProps.id, fieldProps["aria-describedby"], labels]
  );

  return (
    <MultiSelectContext.Provider value={contextValue}>
      <ComboboxPrimitive.Root
        multiple={true}
        disabled={isDisabled}
        {...props}
      >
        {children}
      </ComboboxPrimitive.Root>
    </MultiSelectContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* MultiSelect Trigger / Token Container                                      */
/* -------------------------------------------------------------------------- */

export interface MultiSelectTriggerProps extends ComboboxPrimitive.Chips.Props {}

export function MultiSelectTrigger({
  className,
  children,
  ...props
}: MultiSelectTriggerProps) {
  const { invalid, disabled } = useMultiSelectContext();

  return (
    <ComboboxPrimitive.Chips
      data-slot="multi-select-trigger"
      aria-invalid={invalid ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      className={cn(
        // HaloUI Physical Optical Liquid Glass Engine (Inherited from Button specification)
        "halo-liquid-glass group/multi-select relative flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-sm transition-all duration-150 outline-none isolate",
        // Focus-Within Ring (Independent Double-Contrast Halo Focus Ring)
        "focus-within:border-[var(--halo-focus-color)] focus-within:ring-2 focus-within:ring-[var(--halo-focus-color)] focus-within:ring-offset-2 focus-within:ring-offset-background halo-focus-ring",
        // Invalid state (Dual Indicator Visibility)
        invalid && "border-destructive/80 shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)] dark:border-destructive/70",
        // Disabled state
        disabled && "pointer-events-none opacity-40 shadow-none cursor-not-allowed",
        className
      )}
      {...props}
    >
      <div className="relative z-10 flex flex-1 flex-wrap items-center gap-1.5 min-w-0">
        {children}
      </div>
    </ComboboxPrimitive.Chips>
  );
}

/* -------------------------------------------------------------------------- */
/* MultiSelect Token                                                          */
/* -------------------------------------------------------------------------- */

export interface MultiSelectTokenProps extends ComboboxPrimitive.Chip.Props {
  label?: string;
  value?: string;
}

export function MultiSelectToken({
  className,
  children,
  label,
  value,
  ...props
}: MultiSelectTokenProps) {
  const { disabled } = useMultiSelectContext();

  return (
    <ComboboxPrimitive.Chip
      data-slot="multi-select-token"
      data-value={value}
      data-disabled={disabled ? "true" : undefined}
      className={cn(
        // Authentic Physical Optical Liquid Glass Token Pill
        "relative inline-flex max-w-full items-center gap-1.5 rounded-lg px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        "bg-white/70 dark:bg-white/[0.08] backdrop-blur-md backdrop-saturate-180 text-foreground",
        "border border-black/[0.12] dark:border-white/[0.18]",
        "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.95),0_1px_2px_0_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.18),0_1px_3px_0_rgba(0,0,0,0.4)]",
        "select-none transition-all duration-150 hover:bg-white/90 dark:hover:bg-white/[0.14]",
        "data-highlighted:ring-2 data-highlighted:ring-primary/50",
        "data-disabled:pointer-events-none data-disabled:opacity-40",
        className
      )}
      {...props}
    >
      {typeof children === "string" ? (
        <span className="truncate max-w-[120px] sm:max-w-[200px]" title={children}>
          {children}
        </span>
      ) : (
        children
      )}
    </ComboboxPrimitive.Chip>
  );
}

export interface MultiSelectTokenRemoveProps extends ComboboxPrimitive.ChipRemove.Props {
  label?: string;
}

export function MultiSelectTokenRemove({
  className,
  label,
  children,
  ...props
}: MultiSelectTokenRemoveProps) {
  const { disabled } = useMultiSelectContext();

  return (
    <ComboboxPrimitive.ChipRemove
      data-slot="multi-select-token-remove"
      aria-label={props["aria-label"] || (label ? `Remove ${label}` : "Remove item")}
      disabled={disabled}
      className={cn(
        "inline-flex shrink-0 size-3.5 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer outline-none",
        "focus-visible:ring-1 focus-visible:ring-primary",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      {children || <HaloIcon icon={Cancel01Icon} size={11} />}
    </ComboboxPrimitive.ChipRemove>
  );
}

/* -------------------------------------------------------------------------- */
/* MultiSelect Value Mapper                                                   */
/* -------------------------------------------------------------------------- */

export interface MultiSelectValueProps {
  children?: React.ReactNode | ((values: string[]) => React.ReactNode);
  formatLabel?: (value: string) => string;
}

export function MultiSelectValue({ children, formatLabel }: MultiSelectValueProps) {
  const { labels } = useMultiSelectContext();

  return (
    <ComboboxPrimitive.Value>
      {(values: string[]) => {
        if (typeof children === "function") {
          return children(values);
        }
        if (children) {
          return children;
        }
        return (values || []).map((val) => {
          const displayLabel = formatLabel ? formatLabel(val) : (labels?.[val] || val);
          return (
            <MultiSelectToken key={val} value={val} label={displayLabel}>
              <span className="truncate max-w-[120px] sm:max-w-[200px]" title={displayLabel}>
                {displayLabel}
              </span>
              <MultiSelectTokenRemove label={displayLabel} />
            </MultiSelectToken>
          );
        });
      }}
    </ComboboxPrimitive.Value>
  );
}

/* -------------------------------------------------------------------------- */
/* MultiSelect Input                                                          */
/* -------------------------------------------------------------------------- */

export interface MultiSelectInputProps extends ComboboxPrimitive.Input.Props {}

export function MultiSelectInput({
  className,
  disabled: propDisabled,
  id: propId,
  ...props
}: MultiSelectInputProps) {
  const { id, describedBy, invalid, disabled } = useMultiSelectContext();

  return (
    <ComboboxPrimitive.Input
      data-slot="multi-select-input"
      id={propId ?? id}
      aria-describedby={describedBy}
      aria-invalid={invalid ? "true" : undefined}
      disabled={propDisabled ?? disabled}
      className={cn(
        "flex-1 min-w-[120px] bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none border-none py-0.5 px-1 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* MultiSelect Content / Popup                                                */
/* -------------------------------------------------------------------------- */

export interface MultiSelectContentProps
  extends ComboboxPrimitive.Popup.Props,
    Pick<
      ComboboxPrimitive.Positioner.Props,
      "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
    > {}

export function MultiSelectContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  children,
  ...props
}: MultiSelectContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="multi-select-content"
          className={cn(
            // HaloUI Physical Optical Liquid Glass Floating Surface (10-layer optical engine without button hover/active physics)
            "relative isolate z-50 max-h-(--available-height) min-w-(--anchor-width) w-auto max-w-sm origin-(--transform-origin) overflow-hidden rounded-2xl p-1.5 text-foreground outline-none",
            "bg-white/90 dark:bg-neutral-950/85 backdrop-blur-2xl backdrop-saturate-200",
            "border border-border/80 dark:border-white/10 shadow-[var(--halo-shadow-elevated)]",
            // Inner optical rim & 135° specular light highlight
            "before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.85),inset_0_-1px_1px_0_rgba(0,0,0,0.04)] dark:before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.18),inset_0_-1px_1px_0_rgba(0,0,0,0.6)]",
            "after:content-[''] after:absolute after:inset-0 after:pointer-events-none after:rounded-[inherit] after:bg-gradient-to-br after:from-white/20 after:via-white/5 after:to-transparent dark:after:from-white/10 dark:after:via-transparent dark:after:to-transparent",
            // Smooth Base UI Native CSS Transitions
            "transition-[opacity,transform] duration-150 ease-out",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:data-[side=bottom]:-translate-y-1 data-[starting-style]:data-[side=top]:translate-y-1",
            "data-[ending-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:data-[side=bottom]:-translate-y-1 data-[ending-style]:data-[side=top]:translate-y-1",
            "data-[closed]:opacity-0 data-[closed]:scale-95 data-[closed]:pointer-events-none",
            className
          )}
          {...props}
        >
          <div className="relative z-10">{children}</div>
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

/* -------------------------------------------------------------------------- */
/* MultiSelect List & Items                                                   */
/* -------------------------------------------------------------------------- */

export function MultiSelectList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="multi-select-list"
      className={cn("max-h-60 overflow-y-auto overscroll-contain p-0.5 space-y-0.5 outline-none", className)}
      {...props}
    />
  );
}

export function MultiSelectItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="multi-select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl py-2 pl-3 pr-8 text-sm outline-none select-none transition-all duration-150",
        // Active roving focus highlight
        "data-highlighted:bg-white/80 dark:data-highlighted:bg-white/[0.14] data-highlighted:backdrop-blur-md",
        "data-highlighted:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.95),0_1px_3px_0_rgba(0,0,0,0.06)]",
        "dark:data-highlighted:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.22),0_2px_6px_0_rgba(0,0,0,0.4)]",
        "data-highlighted:text-foreground",
        // Committed selection
        "data-selected:font-medium data-selected:text-foreground",
        // Disabled option
        "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-35",
        className
      )}
      {...props}
    >
      <span className="flex flex-1 items-center gap-2 truncate">{children}</span>
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2.5 flex size-4 items-center justify-center text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.4)]">
            <HaloIcon icon={Tick02Icon} size={15} />
          </span>
        }
      />
    </ComboboxPrimitive.Item>
  );
}

export function MultiSelectGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return <ComboboxPrimitive.Group data-slot="multi-select-group" className={cn("p-1", className)} {...props} />;
}

export function MultiSelectLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="multi-select-label"
      className={cn("px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none", className)}
      {...props}
    />
  );
}

export function MultiSelectEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="multi-select-empty"
      className={cn("p-3 text-center text-xs text-muted-foreground select-none", className)}
      {...props}
    />
  );
}

export function MultiSelectClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="multi-select-clear"
      className={cn(
        "flex size-5 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer",
        className
      )}
      {...props}
    >
      <HaloIcon icon={Cancel01Icon} size={13} className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  );
}

export function MultiSelectSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="multi-select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-black/[0.08] dark:bg-white/[0.08]", className)}
      {...props}
    />
  );
}

export function MultiSelectChevron({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="multi-select-chevron"
      className={cn("flex size-4 items-center justify-center text-muted-foreground select-none pointer-events-none", className)}
      {...props}
    >
      <HaloIcon icon={ArrowDown01Icon} size={15} />
    </span>
  );
}

