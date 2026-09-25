import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const textareaVariants = cva(
  "w-full min-w-0 text-sm leading-relaxed transition-all duration-150 outline-none text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none",
  {
    variants: {
      variant: {
        default: [
          "halo-liquid-glass min-h-[80px] rounded-xl px-3.5 py-2.5",
          // Independent Double-Contrast Focus Ring (Halo Focus Ring)
          "focus-visible:border-[var(--halo-focus-color)] focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background halo-focus-ring",
          // Invalid state (Dual Indicator Visibility)
          "aria-invalid:border-destructive/80 aria-invalid:shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)] dark:aria-invalid:border-destructive/70",
          // Read-only state (remains focusable, selectable, and readable)
          "read-only:bg-black/[0.02] dark:read-only:bg-white/[0.02] read-only:cursor-default",
        ],
        unstyled: [
          "h-full flex-1 rounded-none border-0 bg-transparent px-1.5 py-2 shadow-none ring-0",
          "focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent",
          "disabled:bg-transparent aria-invalid:ring-0 aria-invalid:shadow-none aria-invalid:border-transparent",
          "dark:bg-transparent dark:disabled:bg-transparent dark:aria-invalid:border-transparent",
        ],
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      variant: "default",
      resize: "vertical",
    },
  }
);

export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {}

/**
 * Textarea — Forms & Fields Primitive
 *
 * A native multiline text-entry control with HaloUI material states,
 * accessible focus treatment, validation support, and configurable resizing,
 * elevated with the 10-layer physical optical liquid glass engine.
 */
export function Textarea({
  className,
  variant = "default",
  resize = "vertical",
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, resize }), className)}
      {...props}
    />
  );
}

export default Textarea;
