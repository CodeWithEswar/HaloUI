import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface InputGroupProps extends React.ComponentProps<"div"> {}

/**
 * InputGroup — Forms & Fields Compound Primitive
 *
 * Composes an Input with contextual prefixes, suffixes, icons, text, or actions
 * inside a shared control boundary without creating a duplicate input implementation.
 */
export function InputGroup({ className, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-10 w-full min-w-0 items-center rounded-xl px-2 transition-all duration-150 outline-none isolate",
        "bg-black/[0.02] dark:bg-white/[0.035]",
        "backdrop-blur-xs",
        "border border-[var(--halo-glass-border)]",
        "shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.85)]",
        "dark:shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.08)]",
        // Focus-Within when the input control is active:
        "has-[[data-slot=input-group-control]:focus-visible]:border-[var(--halo-focus-color)]",
        "has-[[data-slot=input-group-control]:focus-visible]:ring-2",
        "has-[[data-slot=input-group-control]:focus-visible]:ring-[var(--halo-focus-color)]",
        "has-[[data-slot=input-group-control]:focus-visible]:ring-offset-2",
        "has-[[data-slot=input-group-control]:focus-visible]:ring-offset-background",
        // Invalid state (Dual Indicator Visibility)
        "has-[[data-slot=input-group-control][aria-invalid=true]]:border-destructive/80",
        "has-[[data-slot=input-group-control][aria-invalid=true]]:shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)]",
        "dark:has-[[data-slot=input-group-control][aria-invalid=true]]:border-destructive/70",
        // Disabled state
        "has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-40 has-disabled:shadow-none",
        className
      )}
      {...props}
    />
  );
}

export const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 shrink-0",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-1 pr-1.5",
        "inline-end": "order-last pl-1.5 pr-1",
        "block-start": "order-first w-full justify-start px-2 pt-2",
        "block-end": "order-last w-full justify-start px-2 pb-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
);

export interface InputGroupAddonProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof inputGroupAddonVariants> {}

export function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button, a")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector<HTMLInputElement | HTMLTextAreaElement>("input, textarea")?.focus();
      }}
      {...props}
    />
  );
}

export interface InputGroupTextProps extends React.ComponentProps<"span"> {}

export function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        "flex items-center gap-1.5 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

export interface InputGroupButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "size" | "type"> {
  type?: "button" | "submit" | "reset";
  size?: "xs" | "sm" | "icon-xs" | "icon-sm";
}

export function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "icon-xs",
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      size={size as any}
      className={cn(
        "shrink-0 z-10",
        size === "icon-xs" && "size-7 rounded-lg",
        size === "xs" && "h-7 px-2 text-xs rounded-lg",
        className
      )}
      {...props}
    />
  );
}

export interface InputGroupSeparatorProps extends React.ComponentProps<"div"> {}

export function InputGroupSeparator({ className, ...props }: InputGroupSeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      className={cn("h-4 w-px bg-black/[0.12] dark:bg-white/[0.16] mx-1 shrink-0", className)}
      {...props}
    />
  );
}

export interface InputGroupInputProps
  extends Omit<React.ComponentProps<typeof Input>, "variant"> {}

export function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <Input
      variant="unstyled"
      data-slot="input-group-control"
      className={cn("px-1.5", className)}
      {...props}
    />
  );
}

export interface InputGroupTextareaProps
  extends Omit<React.ComponentProps<typeof Textarea>, "variant"> {}

export function InputGroupTextarea({
  className,
  ...props
}: InputGroupTextareaProps) {
  return (
    <Textarea
      variant="unstyled"
      data-slot="input-group-control"
      className={cn("px-1.5 py-2", className)}
      {...props}
    />
  );
}

export {
  InputGroup as default,
};
