"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useFieldControlProps } from "@/components/ui/field";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Upload01Icon,
  File01Icon,
  Image01Icon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  Cancel01Icon,
  Delete02Icon,
  RefreshIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------- */
/* Types & Models                                                             */
/* -------------------------------------------------------------------------- */

export type FileUploadStatus =
  | "queued"
  | "validating"
  | "uploading"
  | "success"
  | "error"
  | "cancelled";

export interface FileUploadItemState {
  id: string;
  file: File;
  status: FileUploadStatus;
  progress?: number; // 0..100 for determinate, undefined for indeterminate
  error?: string;
  abortController?: AbortController;
}

export type FileValidationErrorCode =
  | "unsupported-type"
  | "file-too-large"
  | "too-many-files"
  | "duplicate";

export interface FileValidationError {
  code: FileValidationErrorCode;
  message: string;
}

export interface FileRejection {
  file: File;
  errors: FileValidationError[];
}

export interface UploadAdapterContext {
  onProgress: (progress: number) => void;
  abortSignal: AbortSignal;
}

export type UploadHandler = (
  item: FileUploadItemState,
  context: UploadAdapterContext
) => Promise<void> | void;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function matchFileType(file: File, accept?: string): boolean {
  if (!accept) return true;
  const patterns = accept
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean);

  if (patterns.length === 0) return true;

  const fileName = file.name.toLowerCase();
  const fileType = (file.type || "").toLowerCase();

  return patterns.some((pattern) => {
    if (pattern.startsWith(".")) {
      return fileName.endsWith(pattern);
    }
    if (pattern.endsWith("/*")) {
      const baseType = pattern.slice(0, -2);
      return fileType.startsWith(baseType + "/");
    }
    return fileType === pattern;
  });
}

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `halo-file-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/* -------------------------------------------------------------------------- */
/* Context                                                                    */
/* -------------------------------------------------------------------------- */

export interface FileUploadContextValue {
  id: string;
  queue: FileUploadItemState[];
  rejections: FileRejection[];
  isDragActive: boolean;
  isDragReject: boolean;
  disabled: boolean;
  invalid: boolean;
  multiple: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  openFilePicker: () => void;
  remove: (id: string) => void;
  cancel: (id: string) => void;
  retry: (id: string) => Promise<void>;
  upload: (id?: string) => Promise<void>;
  clearQueue: () => void;
  dismissRejection: (index: number) => void;
  clearRejections: () => void;
  itemRefs: React.MutableRefObject<Map<string, HTMLElement>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  dropzoneId: string;
}

const FileUploadContext = React.createContext<FileUploadContextValue | null>(null);

export function useFileUploadContext(): FileUploadContextValue {
  const ctx = React.useContext(FileUploadContext);
  if (!ctx) {
    throw new Error("FileUpload subcomponents must be used within <FileUpload>");
  }
  return ctx;
}

/* -------------------------------------------------------------------------- */
/* FileUpload Root Component                                                  */
/* -------------------------------------------------------------------------- */

export interface FileUploadProps {
  id?: string;
  name?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  preventDuplicates?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  autoUpload?: boolean;
  onUpload?: UploadHandler;
  onQueueChange?: (queue: FileUploadItemState[]) => void;
  onReject?: (rejections: FileRejection[]) => void;
  className?: string;
  children?: React.ReactNode;
}

/**
 * FileUpload — Forms & Fields 26
 *
 * An accessible client-side file-upload workflow with native file selection,
 * drag-and-drop, validation, queue state management, progress tracking,
 * cancellation, retry, and transport-agnostic application integration.
 */
export function FileUpload({
  id: propId,
  name,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  preventDuplicates = true,
  disabled: propDisabled,
  invalid: propInvalid,
  required: propRequired,
  autoUpload = false,
  onUpload,
  onQueueChange,
  onReject,
  className,
  children,
}: FileUploadProps) {
  // Coordinate with surrounding Field if present
  const fieldProps = useFieldControlProps({
    id: propId,
    disabled: propDisabled,
    required: propRequired,
    "aria-invalid": propInvalid,
  });

  const baseId = fieldProps.id || React.useId();
  const dropzoneId = `${baseId}-dropzone`;
  const isInvalid = Boolean(propInvalid || fieldProps["aria-invalid"]);
  const isDisabled = Boolean(propDisabled || fieldProps.disabled);

  const [queue, setQueue] = React.useState<FileUploadItemState[]>([]);
  const [rejections, setRejections] = React.useState<FileRejection[]>([]);
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [isDragReject, setIsDragReject] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState<string>("");

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const itemRefs = React.useRef<Map<string, HTMLElement>>(new Map());

  // Notify parent of queue updates
  const updateQueue = React.useCallback(
    (updater: (prev: FileUploadItemState[]) => FileUploadItemState[]) => {
      setQueue((prev) => {
        const next = updater(prev);
        onQueueChange?.(next);
        return next;
      });
    },
    [onQueueChange]
  );

  // Focus management: announce to screen readers
  const announce = React.useCallback((message: string) => {
    setAnnouncement(message);
  }, []);

  // Upload runner for a single item
  const performUpload = React.useCallback(
    async (item: FileUploadItemState) => {
      if (!onUpload) return;
      if (isDisabled) return;

      const controller = new AbortController();

      updateQueue((curr) =>
        curr.map((q) =>
          q.id === item.id
            ? { ...q, status: "uploading", progress: 0, error: undefined, abortController: controller }
            : q
        )
      );

      announce(`Uploading ${item.file.name}`);

      try {
        await onUpload(item, {
          onProgress: (p: number) => {
            const clamped = Math.max(0, Math.min(100, p));
            updateQueue((curr) =>
              curr.map((q) => (q.id === item.id ? { ...q, progress: clamped } : q))
            );
          },
          abortSignal: controller.signal,
        });

        updateQueue((curr) =>
          curr.map((q) =>
            q.id === item.id
              ? { ...q, status: "success", progress: 100, abortController: undefined }
              : q
          )
        );
        announce(`Upload succeeded for ${item.file.name}`);
      } catch (err: unknown) {
        if (controller.signal.aborted) {
          updateQueue((curr) =>
            curr.map((q) =>
              q.id === item.id
                ? { ...q, status: "cancelled", progress: undefined, abortController: undefined }
                : q
            )
          );
          announce(`Upload cancelled for ${item.file.name}`);
        } else {
          const errorMessage =
            err instanceof Error ? err.message : "Upload failed. Please try again.";
          updateQueue((curr) =>
            curr.map((q) =>
              q.id === item.id
                ? {
                    ...q,
                    status: "error",
                    progress: undefined,
                    error: errorMessage,
                    abortController: undefined,
                  }
                : q
            )
          );
          announce(`Upload failed for ${item.file.name}: ${errorMessage}`);
        }
      }
    },
    [announce, isDisabled, onUpload, updateQueue]
  );

  // Add files to queue through validation pipeline
  const processFiles = React.useCallback(
    (files: File[]) => {
      if (isDisabled || files.length === 0) return;

      const newRejections: FileRejection[] = [];
      const newItems: FileUploadItemState[] = [];

      let currentAllowedCount =
        maxFiles !== undefined ? Math.max(0, maxFiles - queue.length) : Infinity;

      if (!multiple && queue.length > 0 && files.length > 0) {
        // If single file mode and already has files, replace queue or reject
        currentAllowedCount = 1;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const errors: FileValidationError[] = [];

        // 1. Accept filter check
        if (!matchFileType(file, accept)) {
          errors.push({
            code: "unsupported-type",
            message: `File type "${file.type || file.name.split(".").pop()}" is not supported.`,
          });
        }

        // 2. Max size check
        if (maxSize !== undefined && file.size > maxSize) {
          errors.push({
            code: "file-too-large",
            message: `File size (${formatBytes(file.size)}) exceeds maximum allowable limit of ${formatBytes(maxSize)}.`,
          });
        }

        // 3. Duplicate check
        if (preventDuplicates) {
          const isDuplicate = queue.some(
            (q) =>
              q.file.name === file.name &&
              q.file.size === file.size &&
              q.file.lastModified === file.lastModified
          );
          if (isDuplicate) {
            errors.push({
              code: "duplicate",
              message: `"${file.name}" is already present in the upload queue.`,
            });
          }
        }

        // 4. Max files count check
        if (currentAllowedCount <= 0 && errors.length === 0) {
          errors.push({
            code: "too-many-files",
            message: `Maximum allowed file limit (${maxFiles}) reached.`,
          });
        }

        if (errors.length > 0) {
          newRejections.push({ file, errors });
        } else {
          currentAllowedCount--;
          newItems.push({
            id: generateId(),
            file,
            status: "queued",
          });
        }
      }

      if (newRejections.length > 0) {
        setRejections((prev) => [...prev, ...newRejections]);
        onReject?.(newRejections);
        announce(
          `${newRejections.length} file(s) rejected: ${newRejections[0].errors[0].message}`
        );
      }

      if (newItems.length > 0) {
        updateQueue((prev) => (!multiple ? newItems : [...prev, ...newItems]));
        announce(`${newItems.length} file(s) added to upload queue.`);

        if (autoUpload && onUpload) {
          newItems.forEach((item) => {
            performUpload(item);
          });
        }
      }

      // Reset native input so selecting the same file again works
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [
      accept,
      announce,
      autoUpload,
      isDisabled,
      maxFiles,
      maxSize,
      multiple,
      onReject,
      onUpload,
      performUpload,
      preventDuplicates,
      queue,
      updateQueue,
    ]
  );

  // Remove item with deterministic focus management
  const remove = React.useCallback(
    (id: string) => {
      if (isDisabled) return;

      const itemIdx = queue.findIndex((q) => q.id === id);
      const targetItem = queue[itemIdx];

      if (targetItem?.abortController) {
        targetItem.abortController.abort();
      }

      // Determine focus destination before removal
      let nextFocusElement: HTMLElement | null = null;
      if (queue.length > 1) {
        const nextId = queue[itemIdx + 1]?.id ?? queue[itemIdx - 1]?.id;
        if (nextId) {
          nextFocusElement = itemRefs.current.get(nextId) ?? null;
        }
      }
      if (!nextFocusElement) {
        nextFocusElement = document.getElementById(dropzoneId);
      }

      updateQueue((prev) => prev.filter((q) => q.id !== id));
      announce(`Removed ${targetItem?.file.name || "file"} from upload queue.`);

      // Shift focus cleanly
      requestAnimationFrame(() => {
        nextFocusElement?.focus();
      });
    },
    [announce, dropzoneId, isDisabled, queue, updateQueue]
  );

  // Cancel item upload
  const cancel = React.useCallback(
    (id: string) => {
      const target = queue.find((q) => q.id === id);
      if (target?.abortController) {
        target.abortController.abort();
      }
    },
    [queue]
  );

  // Retry failed upload
  const retry = React.useCallback(
    async (id: string) => {
      const target = queue.find((q) => q.id === id);
      if (target) {
        await performUpload(target);
      }
    },
    [performUpload, queue]
  );

  // Upload single item or all queued items
  const upload = React.useCallback(
    async (id?: string) => {
      if (id) {
        const item = queue.find((q) => q.id === id);
        if (item && (item.status === "queued" || item.status === "error" || item.status === "cancelled")) {
          await performUpload(item);
        }
      } else {
        const eligible = queue.filter(
          (q) => q.status === "queued" || q.status === "error" || q.status === "cancelled"
        );
        for (const item of eligible) {
          await performUpload(item);
        }
      }
    },
    [performUpload, queue]
  );

  const clearQueue = React.useCallback(() => {
    queue.forEach((item) => {
      item.abortController?.abort();
    });
    updateQueue(() => []);
    announce("Upload queue cleared.");
  }, [announce, queue, updateQueue]);

  const dismissRejection = React.useCallback((index: number) => {
    setRejections((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearRejections = React.useCallback(() => {
    setRejections([]);
  }, []);

  const openFilePicker = React.useCallback(() => {
    if (!isDisabled && inputRef.current) {
      inputRef.current.click();
    }
  }, [isDisabled]);

  const contextValue = React.useMemo<FileUploadContextValue>(
    () => ({
      id: baseId,
      queue,
      rejections,
      isDragActive,
      isDragReject,
      disabled: isDisabled,
      invalid: isInvalid,
      multiple,
      accept,
      maxSize,
      maxFiles,
      openFilePicker,
      remove,
      cancel,
      retry,
      upload,
      clearQueue,
      dismissRejection,
      clearRejections,
      itemRefs,
      inputRef,
      dropzoneId,
    }),
    [
      accept,
      baseId,
      cancel,
      clearQueue,
      clearRejections,
      dismissRejection,
      dropzoneId,
      isDisabled,
      isDragActive,
      isDragReject,
      isInvalid,
      maxFiles,
      maxSize,
      multiple,
      openFilePicker,
      queue,
      rejections,
      remove,
      retry,
      upload,
    ]
  );

  return (
    <FileUploadContext.Provider value={contextValue}>
      <div
        data-slot="file-upload"
        data-disabled={isDisabled ? "true" : undefined}
        data-invalid={isInvalid ? "true" : undefined}
        className={cn("w-full max-w-full space-y-3.5", className)}
      >
        {/* Hidden Accessible Native File Input */}
        <input
          ref={inputRef}
          type="file"
          id={baseId}
          name={name}
          accept={accept}
          multiple={multiple}
          disabled={isDisabled}
          required={fieldProps.required}
          aria-describedby={fieldProps["aria-describedby"]}
          aria-invalid={isInvalid ? "true" : undefined}
          tabIndex={-1}
          className="sr-only"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            processFiles(files);
          }}
        />

        {/* Live status announcements for screen readers */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {announcement}
        </div>

        {children}
      </div>
    </FileUploadContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/* FileUploadDropzone                                                         */
/* -------------------------------------------------------------------------- */

export const fileUploadDropzoneVariants = cva(
  [
    // HaloUI Physical Optical Liquid Glass Engine
    "halo-liquid-glass group/dropzone relative flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-200 outline-none select-none",
    // Double-contrast Halo Focus Ring on focus-visible
    "focus-visible:border-[var(--halo-focus-color)] focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-background halo-focus-ring",
    // Invalid border state
    "aria-invalid:border-destructive/80 aria-invalid:shadow-[inset_0_0_0_1px_rgba(244,63,94,0.3)] dark:aria-invalid:border-destructive/70",
    // Disabled state
    "data-disabled:pointer-events-none data-disabled:opacity-40 data-disabled:cursor-not-allowed data-disabled:shadow-none",
  ],
  {
    variants: {
      variant: {
        default:
          "rounded-2xl border border-dashed border-border/80 hover:border-foreground/30 hover:bg-black/[0.015] dark:hover:bg-white/[0.02]",
        solid:
          "rounded-2xl border border-border/70 hover:border-foreground/30 hover:bg-black/[0.015] dark:hover:bg-white/[0.02]",
      },
      size: {
        sm: "min-h-[120px] p-4 text-xs gap-2",
        default: "min-h-[160px] p-6 text-sm gap-3",
        lg: "min-h-[210px] p-8 text-base gap-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface FileUploadDropzoneProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof fileUploadDropzoneVariants> {
  icon?: React.ReactNode;
  heading?: React.ReactNode;
  description?: React.ReactNode;
}

export const FileUploadDropzone = React.forwardRef<HTMLDivElement, FileUploadDropzoneProps>(
  function FileUploadDropzone(
    {
      className,
      variant,
      size,
      icon,
      heading,
      description,
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) {
    const ctx = useFileUploadContext();
    const dragCounterRef = React.useRef(0);
    const [isDragOver, setIsDragOver] = React.useState(false);

    const handleDragEnter = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current++;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragOver(true);
      }
    }, []);

    const handleDragLeave = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current--;
      if (dragCounterRef.current <= 0) {
        dragCounterRef.current = 0;
        setIsDragOver(false);
      }
    }, []);

    const handleDragOver = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = "copy";
    }, []);

    const handleDrop = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current = 0;
        setIsDragOver(false);

        if (ctx.disabled) return;

        const droppedFiles = Array.from(e.dataTransfer.files || []);
        if (droppedFiles.length > 0) {
          // Trigger file processing directly on native input if accessible
          if (ctx.inputRef.current) {
            const dataTransfer = new DataTransfer();
            droppedFiles.forEach((f) => dataTransfer.items.add(f));
            ctx.inputRef.current.files = dataTransfer.files;
            const event = new Event("change", { bubbles: true });
            ctx.inputRef.current.dispatchEvent(event);
          }
        }
      },
      [ctx.disabled, ctx.inputRef]
    );

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          ctx.openFilePicker();
        }
      },
      [ctx, onClick]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(e);
        if (!e.defaultPrevented && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          ctx.openFilePicker();
        }
      },
      [ctx, onKeyDown]
    );

    return (
      <div
        ref={ref}
        id={ctx.dropzoneId}
        role="button"
        tabIndex={ctx.disabled ? -1 : 0}
        aria-label="Upload files by dragging and dropping or pressing Enter to browse"
        aria-invalid={ctx.invalid ? "true" : undefined}
        data-slot="file-upload-dropzone"
        data-drag-active={isDragOver ? "true" : undefined}
        data-disabled={ctx.disabled ? "true" : undefined}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          fileUploadDropzoneVariants({ variant, size }),
          isDragOver &&
            "border-primary ring-2 ring-primary/20 bg-primary/[0.04] dark:bg-primary/[0.08] scale-[1.005] duration-150",
          className
        )}
        {...props}
      >
        {children ? (
          children
        ) : (
          <>
            <div
              className={cn(
                "rounded-full p-3 transition-transform duration-200",
                isDragOver ? "scale-110 bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              )}
            >
              {icon || <HaloIcon icon={Upload01Icon} size="lg" strokeWidth={1.75} />}
            </div>

            <div className="space-y-1">
              <div className="font-semibold text-foreground tracking-tight">
                {heading || (
                  <span>
                    <span className="text-primary hover:underline">Click to browse</span> or drag and drop
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                {description ||
                  (ctx.accept
                    ? `Supported formats: ${ctx.accept}${ctx.maxSize ? ` (up to ${formatBytes(ctx.maxSize)})` : ""}`
                    : `Any compatible file${ctx.maxSize ? ` up to ${formatBytes(ctx.maxSize)}` : ""}`)}
              </p>
            </div>
          </>
        )}
      </div>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* FileUploadTrigger                                                          */
/* -------------------------------------------------------------------------- */

export interface FileUploadTriggerProps extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
}

export const FileUploadTrigger = React.forwardRef<HTMLButtonElement, FileUploadTriggerProps>(
  function FileUploadTrigger({ className, children, onClick, ...props }, ref) {
    const ctx = useFileUploadContext();

    return (
      <button
        ref={ref}
        type="button"
        disabled={ctx.disabled}
        data-slot="file-upload-trigger"
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) {
            ctx.openFilePicker();
          }
        }}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-xl text-xs sm:text-sm px-4 py-2 transition-all outline-none halo-focus-ring",
          "border border-border/80 bg-background/80 hover:bg-muted text-foreground shadow-xs active:scale-[0.98]",
          "disabled:opacity-40 disabled:pointer-events-none",
          className
        )}
        {...props}
      >
        {children || "Choose Files"}
      </button>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* FileUploadList                                                             */
/* -------------------------------------------------------------------------- */

export interface FileUploadListProps extends React.ComponentPropsWithoutRef<"div"> {}

export function FileUploadList({ className, children, ...props }: FileUploadListProps) {
  const ctx = useFileUploadContext();

  if (ctx.queue.length === 0 && ctx.rejections.length === 0 && !children) {
    return null;
  }

  return (
    <div
      role="list"
      aria-label="Upload files queue"
      data-slot="file-upload-list"
      className={cn("w-full space-y-2 mt-3", className)}
      {...props}
    >
      {/* Rejections alerts */}
      {ctx.rejections.length > 0 && (
        <div className="space-y-1.5 pb-2">
          {ctx.rejections.map((rej, idx) => (
            <div
              key={`rej-${idx}`}
              className="flex items-start justify-between gap-3 p-3 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive text-xs"
            >
              <div className="flex items-start gap-2 min-w-0">
                <HaloIcon icon={AlertCircleIcon} size="sm" className="mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="font-semibold truncate block">{rej.file.name}:</span>
                  <span className="text-destructive/90 leading-tight">
                    {rej.errors.map((e) => e.message).join(" ")}
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label={`Dismiss rejection for ${rej.file.name}`}
                onClick={() => ctx.dismissRejection(idx)}
                className="shrink-0 p-1 rounded-md hover:bg-destructive/10 text-destructive outline-none halo-focus-ring"
              >
                <HaloIcon icon={Cancel01Icon} size="xs" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Render queue items */}
      {children
        ? children
        : ctx.queue.map((item) => <FileUploadItem key={item.id} item={item} />)}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FileUploadItem                                                             */
/* -------------------------------------------------------------------------- */

export interface FileUploadItemProps extends React.ComponentPropsWithoutRef<"div"> {
  item: FileUploadItemState;
}

export const FileUploadItem = React.forwardRef<HTMLDivElement, FileUploadItemProps>(
  function FileUploadItem({ item, className, children, ...props }, forwardedRef) {
    const ctx = useFileUploadContext();
    const localRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      const el = localRef.current;
      if (el) {
        ctx.itemRefs.current.set(item.id, el);
        return () => {
          ctx.itemRefs.current.delete(item.id);
        };
      }
    }, [ctx.itemRefs, item.id]);

    const isImage = item.file.type.startsWith("image/");
    const isUploading = item.status === "uploading";
    const isSuccess = item.status === "success";
    const isError = item.status === "error";

    return (
      <div
        ref={(node) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        role="listitem"
        tabIndex={0}
        data-slot="file-upload-item"
        data-status={item.status}
        className={cn(
          "halo-liquid-glass group/item relative flex flex-col p-3 rounded-xl border border-border/80 bg-card/60 transition-all outline-none",
          "focus-visible:border-[var(--halo-focus-color)] focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] halo-focus-ring",
          isError && "border-destructive/40 bg-destructive/[0.02]",
          isSuccess && "border-emerald-500/30 bg-emerald-500/[0.02]",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-3 w-full">
          {/* File icon & metadata */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg shrink-0",
                isError
                  ? "bg-destructive/10 text-destructive"
                  : isSuccess
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : isUploading
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {isUploading ? (
                <HaloIcon icon={Loading03Icon} size="sm" className="animate-spin" />
              ) : isSuccess ? (
                <HaloIcon icon={CheckmarkCircle01Icon} size="sm" />
              ) : isError ? (
                <HaloIcon icon={AlertCircleIcon} size="sm" />
              ) : isImage ? (
                <HaloIcon icon={Image01Icon} size="sm" />
              ) : (
                <HaloIcon icon={File01Icon} size="sm" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground truncate" title={item.file.name}>
                {item.file.name}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                <span>{formatBytes(item.file.size)}</span>
                <span>•</span>
                <span
                  className={cn(
                    "capitalize",
                    isSuccess && "text-emerald-600 dark:text-emerald-400 font-medium",
                    isError && "text-destructive font-medium",
                    isUploading && "text-primary font-medium"
                  )}
                >
                  {isUploading
                    ? item.progress !== undefined
                      ? `Uploading ${Math.round(item.progress)}%`
                      : "Uploading..."
                    : isSuccess
                    ? "Uploaded"
                    : isError
                    ? item.error || "Failed"
                    : item.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons (Retry, Cancel, Remove) */}
          <div className="flex items-center gap-1 shrink-0">
            {isError && (
              <button
                type="button"
                aria-label={`Retry upload for ${item.file.name}`}
                onClick={() => ctx.retry(item.id)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors outline-none halo-focus-ring"
                title="Retry upload"
              >
                <HaloIcon icon={RefreshIcon} size="xs" />
              </button>
            )}

            {isUploading && (
              <button
                type="button"
                aria-label={`Cancel upload for ${item.file.name}`}
                onClick={() => ctx.cancel(item.id)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors outline-none halo-focus-ring"
                title="Cancel upload"
              >
                <HaloIcon icon={Cancel01Icon} size="xs" />
              </button>
            )}

            <button
              type="button"
              aria-label={`Remove ${item.file.name} from queue`}
              disabled={ctx.disabled}
              onClick={() => ctx.remove(item.id)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors outline-none halo-focus-ring disabled:opacity-30 disabled:pointer-events-none"
              title="Remove file"
            >
              <HaloIcon icon={Delete02Icon} size="xs" />
            </button>
          </div>
        </div>

        {/* Progress Bar (determinate or indeterminate) */}
        {isUploading && (
          <div className="w-full mt-2.5">
            <FileUploadItemProgress item={item} />
          </div>
        )}
      </div>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* FileUploadItemProgress                                                     */
/* -------------------------------------------------------------------------- */

export interface FileUploadItemProgressProps extends React.ComponentPropsWithoutRef<"div"> {
  item: FileUploadItemState;
}

export function FileUploadItemProgress({ item, className, ...props }: FileUploadItemProgressProps) {
  const isDeterminate = typeof item.progress === "number";

  return (
    <div
      role="progressbar"
      aria-label={`Upload progress for ${item.file.name}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={isDeterminate ? Math.round(item.progress!) : undefined}
      data-slot="file-upload-item-progress"
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted/80 relative", className)}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full bg-primary transition-all duration-200",
          !isDeterminate && "w-1/3 animate-indeterminate-slide"
        )}
        style={{ width: isDeterminate ? `${item.progress}%` : undefined }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FileUploadItemRemove                                                       */
/* -------------------------------------------------------------------------- */

export interface FileUploadItemRemoveProps extends React.ComponentPropsWithoutRef<"button"> {
  itemId: string;
}

export const FileUploadItemRemove = React.forwardRef<HTMLButtonElement, FileUploadItemRemoveProps>(
  function FileUploadItemRemove({ itemId, className, children, ...props }, ref) {
    const ctx = useFileUploadContext();

    return (
      <button
        ref={ref}
        type="button"
        disabled={ctx.disabled}
        data-slot="file-upload-item-remove"
        onClick={() => ctx.remove(itemId)}
        className={cn(
          "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors outline-none halo-focus-ring",
          className
        )}
        {...props}
      >
        {children || <HaloIcon icon={Delete02Icon} size="xs" />}
      </button>
    );
  }
);
