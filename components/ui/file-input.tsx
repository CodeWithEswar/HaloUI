"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Variants                                                                   */
/* -------------------------------------------------------------------------- */

export const fileInputVariants = cva(
  [
    // HaloUI Physical Optical Liquid Glass Engine
    "halo-liquid-glass w-full max-w-full min-w-0 transition-all duration-150 outline-none text-foreground select-none cursor-pointer overflow-hidden truncate p-0",
    // Double-contrast Halo Focus Ring on focus-visible
    "focus-visible:border-[var(--halo-focus-color)] focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background halo-focus-ring",
    // Invalid state (Dual Indicator Visibility)
    "aria-invalid:border-destructive/80 aria-invalid:shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)] dark:aria-invalid:border-destructive/70",
    // Disabled state
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none",
    // Native ::file-selector-button styling matching HaloUI Action buttons
    "file:font-medium file:cursor-pointer file:select-none file:shrink-0 file:align-middle",
    "file:border file:border-black/10 dark:file:border-white/20",
    "file:bg-white dark:file:bg-white/[0.12] file:text-foreground",
    "file:shadow-[inset_0_1px_1px_0_rgba(255,255,255,1),0_1px_2px_0_rgba(0,0,0,0.06)] dark:file:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.22),0_1px_2px_0_rgba(0,0,0,0.3)]",
    "hover:file:bg-black/[0.03] dark:hover:file:bg-white/[0.18]",
    "file:transition-all file:duration-150 file:active:scale-[0.98]",
  ],
  {
    variants: {
      size: {
        sm: "h-8 leading-[30px] rounded-lg text-xs file:h-6 file:my-[3px] file:ml-[5px] file:mr-2.5 file:px-2.5 file:rounded-md file:text-[11px]",
        default: "h-10 leading-[38px] rounded-xl text-xs sm:text-[13px] file:h-7 file:my-[5px] file:ml-[6px] file:mr-3 file:px-3.5 file:rounded-lg file:text-xs",
        lg: "h-12 leading-[46px] rounded-2xl text-sm file:h-8.5 file:my-[6px] file:ml-2 file:mr-3.5 file:px-4 file:rounded-xl file:text-[13px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

/* -------------------------------------------------------------------------- */
/* FileInput Props                                                            */
/* -------------------------------------------------------------------------- */

export interface FileInputProps
  extends Omit<
      React.ComponentProps<"input">,
      "type" | "value" | "defaultValue" | "size"
    >,
    VariantProps<typeof fileInputVariants> {
  /**
   * Whether the file input is marked invalid in the surrounding form.
   */
  invalid?: boolean;
  /**
   * Optional callback fired with the array of selected File objects.
   */
  onFilesChange?: (files: File[]) => void;
}

/* -------------------------------------------------------------------------- */
/* FileInput Component                                                        */
/* -------------------------------------------------------------------------- */

/**
 * FileInput — Forms & Fields 25
 *
 * An accessible native file-selection control with HaloUI form styling
 * and clear selected-file feedback. Preserves platform picker security,
 * native keyboard activation, and browser form integration.
 */
export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(
    {
      className,
      size = "default",
      invalid: propInvalid,
      disabled: propDisabled,
      required: propRequired,
      id: propId,
      onChange,
      onFilesChange,
      ...props
    },
    ref
  ) {
    // Coordinated Field props
    const fieldProps = useFieldControlProps({
      id: propId,
      disabled: propDisabled,
      required: propRequired,
      "aria-invalid": propInvalid,
    });

    const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);
    const isDisabled = Boolean(propDisabled || fieldProps.disabled);
    const isRequired = Boolean(propRequired || fieldProps.required);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      if (onFilesChange) {
        const fileList = e.target.files;
        const files = fileList ? Array.from(fileList) : [];
        onFilesChange(files);
      }
    };

    return (
      <input
        ref={ref}
        type="file"
        data-slot="file-input"
        id={fieldProps.id}
        disabled={isDisabled}
        required={isRequired}
        aria-invalid={isInvalid ? "true" : undefined}
        aria-describedby={fieldProps["aria-describedby"]}
        onChange={handleChange}
        className={cn(fileInputVariants({ size }), className)}
        {...props}
      />
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
