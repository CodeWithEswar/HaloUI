"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { useFieldControlProps } from "@/components/ui/field";

/* -------------------------------------------------------------------------- */
/* Tag Input Context                                                          */
/* -------------------------------------------------------------------------- */

interface TagInputContextValue {
  value: string[];
  inputValue: string;
  setInputValue: (val: string) => void;
  commitTag: (text: string) => boolean;
  removeTag: (index: number) => void;
  stagedIndex: number | null;
  stagedTagIndex: number | null;
  setStagedIndex: (index: number | null) => void;
  setStagedTagIndex: (index: number | null) => void;
  announce: (message: string) => void;
  disabled: boolean;
  readOnly: boolean;
  invalid: boolean;
  size: "sm" | "default" | "lg";
  inputRef: React.RefObject<HTMLInputElement | null>;
  id?: string;
  describedBy?: string;
}

const TagInputContext = React.createContext<TagInputContextValue | null>(null);

export function useTagInputContext() {
  const context = React.useContext(TagInputContext);
  if (!context) {
    throw new Error("TagInput subcomponents must be used within a TagInput");
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/* Variants                                                                   */
/* -------------------------------------------------------------------------- */

export const tagInputVariants = cva(
  [
    // HaloUI Physical Optical Liquid Glass Engine
    "halo-liquid-glass group/tag-input relative flex w-full flex-wrap items-center transition-all duration-150 outline-none isolate cursor-text",
    // Double-contrast Halo Focus Ring on focus-within
    "focus-within:border-[var(--halo-focus-color)] focus-within:ring-2 focus-within:ring-[var(--halo-focus-color)] focus-within:ring-offset-2 focus-within:ring-offset-background halo-focus-ring",
    // Invalid state (Dual Indicator Visibility)
    "aria-invalid:border-destructive/80 aria-invalid:shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)] dark:aria-invalid:border-destructive/70",
    // Disabled state
    "data-disabled:pointer-events-none data-disabled:opacity-40 data-disabled:cursor-not-allowed data-disabled:shadow-none",
    // Read-only state
    "data-readonly:bg-black/[0.02] dark:data-readonly:bg-white/[0.02] data-readonly:cursor-default",
  ],
  {
    variants: {
      size: {
        sm: "min-h-8 rounded-lg px-2 py-1 gap-1 text-xs",
        default: "min-h-10 rounded-xl px-2.5 py-1.5 gap-1.5 text-sm",
        lg: "min-h-12 rounded-2xl px-3 py-2 gap-2 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export const tagItemVariants = cva(
  [
    // Authentic Physical Optical Liquid Glass Token Pill
    "relative inline-flex max-w-full items-center select-none font-medium text-foreground transition-all duration-150",
    "bg-white/70 dark:bg-white/[0.08] backdrop-blur-md backdrop-saturate-180",
    "border border-black/[0.12] dark:border-white/[0.18]",
    "shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.95),0_1px_2px_0_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.18),0_1px_3px_0_rgba(0,0,0,0.4)]",
    "hover:bg-white/90 dark:hover:bg-white/[0.14]",
    // Staged for deletion via Backspace
    "data-staged:border-destructive/80 data-staged:bg-destructive/15 data-staged:text-destructive data-staged:ring-1 data-staged:ring-destructive/40",
  ],
  {
    variants: {
      size: {
        sm: "rounded-md px-1.5 py-0.5 text-[11px] gap-1",
        default: "rounded-lg px-2 py-0.5 text-xs gap-1.5",
        lg: "rounded-xl px-2.5 py-1 text-sm gap-2",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

/* -------------------------------------------------------------------------- */
/* Tag Input Root                                                             */
/* -------------------------------------------------------------------------- */

export interface TagInputProps
  extends Omit<React.ComponentProps<"div">, "value" | "defaultValue" | "onChange">,
    VariantProps<typeof tagInputVariants> {
  /** Controlled tag values */
  value?: string[];
  /** Default uncontrolled tag values */
  defaultValue?: string[];
  /** Callback fired when the committed tag collection changes */
  onValueChange?: (values: string[]) => void;
  /** Controlled input text */
  inputValue?: string;
  /** Default uncontrolled input text */
  defaultInputValue?: string;
  /** Callback fired when the input text changes */
  onInputChange?: (value: string) => void;
  /** Placeholder text shown when input is ready */
  placeholder?: string;
  /** Whether the control is disabled */
  disabled?: boolean;
  /** Whether the control is read-only */
  readOnly?: boolean;
  /** Whether the control is marked invalid */
  invalid?: boolean;
  /** Whether the control is required in surrounding form */
  required?: boolean;
  /** Maximum number of tags allowed */
  maxTags?: number;
  /** Maximum character length per tag */
  maxLength?: number;
  /**
   * Whether to allow duplicate tags.
   * When false (default), duplicates are rejected after normalization.
   */
  allowDuplicates?: boolean;
  /**
   * Delimiter keys or characters that trigger commit (e.g. [",", ";"]).
   * Enter key always commits regardless of delimiter prop.
   */
  delimiters?: string[];
  /**
   * Whether to commit the pending input text when the input loses focus.
   * @default false
   */
  addOnBlur?: boolean;
  /**
   * Callback fired when an attempt is made to add a duplicate tag.
   */
  onDuplicate?: (duplicateTag: string) => void;
  /** Additional props forwarded to the underlying input */
  inputProps?: React.ComponentProps<"input">;
}

export function TagInput({
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  inputValue: controlledInputValue,
  defaultInputValue = "",
  onInputChange,
  placeholder = "Add tag...",
  disabled: propDisabled,
  readOnly = false,
  invalid: propInvalid,
  required: propRequired,
  id: propId,
  size = "default",
  maxTags,
  maxLength,
  allowDuplicates = false,
  delimiters = [","],
  addOnBlur = false,
  onDuplicate,
  inputProps,
  className,
  children,
  onClick,
  ...props
}: TagInputProps) {
  // Field integration
  const fieldProps = useFieldControlProps({
    id: propId,
    disabled: propDisabled,
    required: propRequired,
    "aria-invalid": propInvalid,
  });

  const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);
  const isDisabled = Boolean(propDisabled || fieldProps.disabled);
  const isRequired = Boolean(propRequired || fieldProps.required);

  // Controlled vs uncontrolled tags
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(defaultValue);
  const currentTags = isControlled ? controlledValue : uncontrolledValue;

  // Controlled vs uncontrolled input text
  const isInputControlled = controlledInputValue !== undefined;
  const [uncontrolledInputValue, setUncontrolledInputValue] = React.useState<string>(defaultInputValue);
  const currentInputValue = isInputControlled ? controlledInputValue : uncontrolledInputValue;

  const [stagedTagIndex, setStagedTagIndex] = React.useState<number | null>(null);
  const [announcement, setAnnouncement] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleTagsChange = React.useCallback(
    (nextTags: string[]) => {
      if (!isControlled) {
        setUncontrolledValue(nextTags);
      }
      onValueChange?.(nextTags);
    },
    [isControlled, onValueChange]
  );

  const handleInputChange = React.useCallback(
    (text: string) => {
      if (!isInputControlled) {
        setUncontrolledInputValue(text);
      }
      onInputChange?.(text);
      if (stagedTagIndex !== null) {
        setStagedTagIndex(null);
      }
    },
    [isInputControlled, onInputChange, stagedTagIndex]
  );

  const commitTag = React.useCallback(
    (rawText: string): boolean => {
      const trimmed = rawText.trim();
      if (!trimmed) {
        return false;
      }
      if (maxTags !== undefined && currentTags.length >= maxTags) {
        return false;
      }
      if (
        !allowDuplicates &&
        currentTags.some((tag) => tag.toLowerCase() === trimmed.toLowerCase())
      ) {
        onDuplicate?.(trimmed);
        return false;
      }

      const nextTags = [...currentTags, trimmed];
      handleTagsChange(nextTags);
      handleInputChange("");
      setStagedTagIndex(null);
      setAnnouncement(`Tag "${trimmed}" added.`);
      return true;
    },
    [allowDuplicates, currentTags, handleInputChange, handleTagsChange, maxTags, onDuplicate]
  );

  const removeTag = React.useCallback(
    (indexToRemove: number) => {
      if (isDisabled || readOnly) return;
      const removedTag = currentTags[indexToRemove];
      const nextTags = currentTags.filter((_, i) => i !== indexToRemove);
      handleTagsChange(nextTags);
      setStagedTagIndex(null);
      if (removedTag) {
        setAnnouncement(`Tag "${removedTag}" removed.`);
      }
      inputRef.current?.focus();
    },
    [currentTags, handleTagsChange, isDisabled, readOnly]
  );

  const handleContainerClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      // Focus the input if the click was directly on the container or background
      if (e.target === e.currentTarget) {
        inputRef.current?.focus();
      }
    },
    [onClick]
  );

  const contextValue = React.useMemo<TagInputContextValue>(
    () => ({
      value: currentTags,
      inputValue: currentInputValue,
      setInputValue: handleInputChange,
      commitTag,
      removeTag,
      stagedIndex: stagedTagIndex,
      stagedTagIndex,
      setStagedIndex: setStagedTagIndex,
      setStagedTagIndex,
      announce: setAnnouncement,
      disabled: isDisabled,
      readOnly,
      invalid: isInvalid,
      size: size ?? "default",
      inputRef,
      id: fieldProps.id,
      describedBy: fieldProps["aria-describedby"],
    }),
    [
      currentTags,
      currentInputValue,
      handleInputChange,
      commitTag,
      removeTag,
      stagedTagIndex,
      isDisabled,
      readOnly,
      isInvalid,
      size,
      fieldProps.id,
      fieldProps["aria-describedby"],
    ]
  );

  return (
    <TagInputContext.Provider value={contextValue}>
      <div
        data-slot="tag-input"
        data-disabled={isDisabled ? "true" : undefined}
        data-readonly={readOnly ? "true" : undefined}
        aria-invalid={isInvalid ? "true" : undefined}
        aria-describedby={fieldProps["aria-describedby"]}
        onClick={handleContainerClick}
        className={cn(tagInputVariants({ size }), className)}
        {...props}
      >
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </span>
        {children || (
          <>
            {currentTags.map((tag, index) => (
              <TagInputItem key={`${tag}-${index}`} index={index} value={tag}>
                <TagInputItemText>{tag}</TagInputItemText>
                {!readOnly && !isDisabled && <TagInputItemRemove />}
              </TagInputItem>
            ))}
            {!readOnly && (
              <TagInputInput
                placeholder={
                  maxTags !== undefined && currentTags.length >= maxTags
                    ? undefined
                    : currentTags.length === 0
                    ? placeholder
                    : undefined
                }
                maxLength={maxLength}
                delimiters={delimiters}
                addOnBlur={addOnBlur}
                required={isRequired && currentTags.length === 0}
                {...inputProps}
              />
            )}
          </>
        )}
      </div>
    </TagInputContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* Tag Input Item (Token Pill)                                                */
/* -------------------------------------------------------------------------- */

interface TagItemContextValue {
  index: number;
  value: string;
}

const TagItemContext = React.createContext<TagItemContextValue | null>(null);

export function useTagItemContext() {
  const context = React.useContext(TagItemContext);
  if (!context) {
    throw new Error("TagInputItem subcomponents must be used within TagInputItem");
  }
  return context;
}

export interface TagInputItemProps extends React.ComponentProps<"span"> {
  index: number;
  value: string;
}

export function TagInputItem({
  index,
  value,
  className,
  children,
  ...props
}: TagInputItemProps) {
  const { stagedIndex, size, disabled } = useTagInputContext();
  const isStaged = stagedIndex === index;

  return (
    <TagItemContext.Provider value={{ index, value }}>
      <span
        data-slot="tag-input-item"
        data-staged={isStaged ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        className={cn(tagItemVariants({ size }), className)}
        {...props}
      >
        {children}
      </span>
    </TagItemContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* Tag Input Item Text                                                        */
/* -------------------------------------------------------------------------- */

export interface TagInputItemTextProps extends React.ComponentProps<"span"> {}

export function TagInputItemText({
  className,
  children,
  ...props
}: TagInputItemTextProps) {
  const { value } = useTagItemContext();

  return (
    <span
      data-slot="tag-input-item-text"
      title={typeof children === "string" ? children : value}
      className={cn("truncate max-w-[160px] sm:max-w-[240px]", className)}
      {...props}
    >
      {children || value}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Tag Input Item Remove                                                      */
/* -------------------------------------------------------------------------- */

export interface TagInputItemRemoveProps extends React.ComponentProps<"button"> {
  label?: string;
}

export function TagInputItemRemove({
  label,
  className,
  children,
  onClick,
  ...props
}: TagInputItemRemoveProps) {
  const { index, value } = useTagItemContext();
  const { removeTag, disabled, readOnly } = useTagInputContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
    removeTag(index);
  };

  return (
    <button
      type="button"
      data-slot="tag-input-item-remove"
      aria-label={label || `Remove ${value}`}
      disabled={disabled || readOnly}
      onClick={handleClick}
      className={cn(
        "flex size-3.5 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer outline-none",
        "focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-black/10 dark:focus-visible:bg-white/10",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      {children || <HaloIcon icon={Cancel01Icon} size={11} strokeWidth={2} />}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Tag Input Clear All Button                                                 */
/* -------------------------------------------------------------------------- */

export interface TagInputClearProps extends React.ComponentProps<"button"> {}

export function TagInputClear({
  className,
  children,
  onClick,
  ...props
}: TagInputClearProps) {
  const { value, removeTag, disabled, readOnly, announce } = useTagInputContext();

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
    if (disabled || readOnly) return;
    for (let i = value.length - 1; i >= 0; i--) {
      removeTag(i);
    }
    announce("All tags cleared.");
  };

  if (value.length === 0) return null;

  return (
    <button
      type="button"
      data-slot="tag-input-clear"
      aria-label="Clear all tags"
      disabled={disabled || readOnly}
      onClick={handleClear}
      className={cn(
        "flex size-4 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-primary",
        className
      )}
      {...props}
    >
      {children || <HaloIcon icon={Cancel01Icon} size={13} strokeWidth={2} />}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Tag Input Inline Editor                                                    */
/* -------------------------------------------------------------------------- */

export interface TagInputInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "size"> {
  delimiters?: string[];
  addOnBlur?: boolean;
}

export function TagInputInput({
  delimiters = [","],
  addOnBlur = false,
  className,
  onKeyDown,
  onPaste,
  onBlur,
  ...props
}: TagInputInputProps) {
  const {
    value: tags,
    inputValue,
    setInputValue,
    commitTag,
    removeTag,
    stagedIndex,
    setStagedIndex,
    announce,
    disabled,
    readOnly,
    inputRef,
    id,
    describedBy,
  } = useTagInputContext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);

    // Enter commits valid text
    if (e.key === "Enter") {
      if (inputValue.trim()) {
        e.preventDefault();
        commitTag(inputValue);
      } else {
        // Prevent accidental form submission on empty Enter inside TagInput
        e.preventDefault();
      }
      return;
    }

    // Configured delimiters (e.g. Comma)
    if (delimiters.includes(e.key)) {
      if (inputValue.trim()) {
        e.preventDefault();
        commitTag(inputValue);
      } else {
        e.preventDefault();
      }
      return;
    }

    // Two-stage Backspace on empty input
    if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      if (stagedIndex === tags.length - 1) {
        // Second backspace: remove staged tag
        e.preventDefault();
        removeTag(tags.length - 1);
        setStagedIndex(null);
      } else {
        // First backspace: stage the last tag for removal
        e.preventDefault();
        setStagedIndex(tags.length - 1);
        announce(`Tag "${tags[tags.length - 1]}" selected for removal. Press backspace again to delete.`);
      }
      return;
    }

    // Any other key resets staged state
    if (stagedIndex !== null) {
      setStagedIndex(null);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    onPaste?.(e);
    const pasteText = e.clipboardData.getData("text");
    if (!pasteText) return;

    // Check if pasted content contains delimiter or newline
    const hasDelimiter = delimiters.some((d) => pasteText.includes(d)) || pasteText.includes("\n");
    if (hasDelimiter) {
      e.preventDefault();
      const delimiterPattern = new RegExp(`[\\n${delimiters.map((d) => `\\${d}`).join("")}]+`);
      const chunks = pasteText.split(delimiterPattern).map((s) => s.trim()).filter(Boolean);
      for (const chunk of chunks) {
        commitTag(chunk);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
    if (addOnBlur && inputValue.trim()) {
      commitTag(inputValue);
    }
    setStagedIndex(null);
  };

  return (
    <input
      ref={inputRef}
      id={id}
      data-slot="tag-input-input"
      type="text"
      value={inputValue}
      disabled={disabled}
      readOnly={readOnly}
      aria-describedby={describedBy}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onBlur={handleBlur}
      className={cn(
        "min-w-[100px] flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none border-0 p-0 shadow-none ring-0",
        "focus:outline-none focus:ring-0",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      {...props}
    />
  );
}

export default TagInput;
