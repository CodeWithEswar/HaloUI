"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Search01Icon,
  Cancel01Icon,
  CommandIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------- */
/* Contexts & Types                                                           */
/* -------------------------------------------------------------------------- */

export type CommandPaletteIntensity = "subtle" | "balanced" | "rich";

interface CommandPaletteContextValue {
  intensity: CommandPaletteIntensity;
  query: string;
  setQuery: (query: string) => void;
  onClearQuery: () => void;
  closeOnSelect?: boolean;
  onClose?: () => void;
}

const CommandPaletteContext = React.createContext<CommandPaletteContextValue | null>(null);

function useCommandPalette() {
  const context = React.useContext(CommandPaletteContext);
  if (!context) {
    throw new Error("CommandPalette compound components must be used within <CommandPalette />");
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/* Hook: Global Keyboard Shortcut                                             */
/* -------------------------------------------------------------------------- */

export interface UseCommandPaletteShortcutOptions {
  /**
   * Keyboard key to trigger with Cmd/Ctrl.
   * @default "k"
   */
  key?: string;
  /**
   * Whether the global shortcut is actively enabled.
   * @default true
   */
  enabled?: boolean;
}

/**
 * Deterministically binds a global keyboard shortcut (⌘K / Ctrl+K) to open the Command Palette.
 * Safely ignores events when user is typing inside text fields or editable regions unless specifically ⌘K.
 */
export function useCommandPaletteShortcut(
  callback: () => void,
  options: UseCommandPaletteShortcutOptions = {}
) {
  const { key = "k", enabled = true } = options;

  React.useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === key.toLowerCase()) {
        const target = event.target as HTMLElement | null;
        const isEditable =
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable);

        // Allow ⌘K even in inputs, but prevent default browser focus/search actions
        if (!isEditable || event.key.toLowerCase() === "k") {
          event.preventDefault();
          callback();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback, key, enabled]);
}

/* -------------------------------------------------------------------------- */
/* CommandPalette Root (Embedded or Unified Container)                        */
/* -------------------------------------------------------------------------- */

export interface CommandPaletteProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  /**
   * HaloUI liquid optical glass material intensity level.
   * @default "balanced"
   */
  intensity?: CommandPaletteIntensity;
  /**
   * Whether activating any item automatically triggers palette close (for modal layouts).
   * @default true
   */
  closeOnSelect?: boolean;
  /**
   * Callback fired when palette requests close.
   */
  onClose?: () => void;
}

export const CommandPalette = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  CommandPaletteProps
>(function CommandPalette(
  {
    intensity = "balanced",
    closeOnSelect = true,
    onClose,
    className,
    children,
    value,
    onValueChange,
    ...props
  },
  ref
) {
  const [internalQuery, setInternalQuery] = React.useState("");

  const handleQueryChange = React.useCallback(
    (newQuery: string) => {
      setInternalQuery(newQuery);
      onValueChange?.(newQuery);
    },
    [onValueChange]
  );

  const handleClearQuery = React.useCallback(() => {
    setInternalQuery("");
    onValueChange?.("");
  }, [onValueChange]);

  const contextValue = React.useMemo<CommandPaletteContextValue>(
    () => ({
      intensity,
      query: value !== undefined ? value : internalQuery,
      setQuery: handleQueryChange,
      onClearQuery: handleClearQuery,
      closeOnSelect,
      onClose,
    }),
    [intensity, value, internalQuery, handleQueryChange, handleClearQuery, closeOnSelect, onClose]
  );

  return (
    <CommandPaletteContext.Provider value={contextValue}>
      <CommandPrimitive
        ref={ref}
        data-slot="command-palette"
        data-intensity={intensity}
        className={cn(
          // Layout & Containment
          "relative isolate flex w-full flex-col overflow-hidden rounded-2xl select-none transition-all duration-200",
          "halo-liquid-glass-surface",
          className
        )}
        {...props}
      >
        {children}
      </CommandPrimitive>
    </CommandPaletteContext.Provider>
  );
});

/* -------------------------------------------------------------------------- */
/* CommandPaletteDialog (Modal Presentation)                                  */
/* -------------------------------------------------------------------------- */

export interface CommandPaletteDialogProps {
  /**
   * Controlled open state of the modal dialog.
   */
  open?: boolean;
  /**
   * Default open state for uncontrolled usage.
   */
  defaultOpen?: boolean;
  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Accessible modal title for screen reader announcement.
   * @default "Command Palette"
   */
  title?: string;
  /**
   * Accessible modal description for screen reader announcement.
   * @default "Search and launch commands and navigation destinations."
   */
  description?: string;
  /**
   * Material optical intensity level for the floating modal surface.
   * @default "balanced"
   */
  intensity?: CommandPaletteIntensity;
  /**
   * Global keyboard shortcut (Cmd/Ctrl + key) to toggle open state.
   * @default "k"
   */
  shortcutKey?: string;
  /**
   * Whether to enable the global keyboard shortcut listener.
   * @default true
   */
  enableShortcut?: boolean;
  /**
   * Optional custom container element to mount the portal into.
   */
  container?: HTMLElement | null | React.RefObject<HTMLElement | null>;
  /**
   * Additional class names applied to the dialog popup container.
   */
  className?: string;
  children: React.ReactNode;
}

export function CommandPaletteDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  title = "Command Palette",
  description = "Search and launch commands and navigation destinations.",
  intensity = "balanced",
  shortcutKey = "k",
  enableShortcut = true,
  container,
  className,
  children,
}: CommandPaletteDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const toggleOpen = React.useCallback(() => {
    handleOpenChange(!isOpen);
  }, [handleOpenChange, isOpen]);

  useCommandPaletteShortcut(toggleOpen, {
    key: shortcutKey,
    enabled: enableShortcut,
  });

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal container={container}>
        {/* Halo Scrim: Backdrop Attenuation */}
        <DialogPrimitive.Backdrop
          data-slot="command-palette-backdrop"
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs transition-opacity duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        />

        {/* Floating Modal Surface */}
        <DialogPrimitive.Popup
          data-slot="command-palette-modal"
          className={cn(
            "fixed top-[18%] left-1/2 z-50 w-full max-w-[calc(100%-2rem)] sm:max-w-2xl -translate-x-1/2 outline-none duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
        >
          {/* Accessible Hidden Dialog Header */}
          <div className="sr-only">
            <h2 id="command-palette-title">{title}</h2>
            <p id="command-palette-desc">{description}</p>
          </div>

          <CommandPalette
            intensity={intensity}
            onClose={() => handleOpenChange(false)}
            aria-labelledby="command-palette-title"
            aria-describedby="command-palette-desc"
          >
            {children}
          </CommandPalette>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/* -------------------------------------------------------------------------- */
/* CommandPaletteTrigger (Discoverable Launch Button)                          */
/* -------------------------------------------------------------------------- */

export interface CommandPaletteTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Primary label shown in the trigger field.
   * @default "Search commands or destinations..."
   */
  label?: string;
  /**
   * Keyboard shortcut representation to display.
   * @default "⌘K"
   */
  shortcut?: string;
  /**
   * Material optical intensity of the trigger surface.
   * @default "subtle"
   */
  intensity?: "subtle" | "balanced";
}

export const CommandPaletteTrigger = React.forwardRef<
  HTMLButtonElement,
  CommandPaletteTriggerProps
>(function CommandPaletteTrigger(
  {
    label = "Search commands or destinations...",
    shortcut = "⌘K",
    intensity = "subtle",
    className,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      data-slot="command-palette-trigger"
      className={cn(
        // Layout & Dimensions
        "group relative inline-flex h-10 w-full max-w-sm items-center justify-between gap-3 rounded-xl px-3.5 text-xs text-muted-foreground transition-all duration-150 cursor-pointer select-none",
        // Liquid Optical Surface
        intensity === "subtle" && "bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md",
        intensity === "balanced" && "bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl",
        "border border-white/60 dark:border-white/10 hover:border-white/90 dark:hover:border-white/20",
        // Hover & Active Depth
        "hover:bg-white/80 dark:hover:bg-neutral-900/80 hover:text-foreground",
        "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)]",
        // Focus Visible
        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 overflow-hidden truncate">
        <HaloIcon
          icon={Search01Icon}
          size={16}
          className="shrink-0 text-muted-foreground/80 group-hover:text-foreground transition-colors"
        />
        <span className="truncate">{label}</span>
      </div>
      {shortcut && (
        <kbd
          data-slot="command-palette-trigger-shortcut"
          className="pointer-events-none shrink-0 rounded border border-border/60 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground group-hover:text-foreground"
        >
          {shortcut}
        </kbd>
      )}
    </button>
  );
});

/* -------------------------------------------------------------------------- */
/* CommandPaletteInput (Search Query Field)                                   */
/* -------------------------------------------------------------------------- */

export interface CommandPaletteInputProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  /**
   * Accessible input label for screen readers.
   * @default "Search commands and destinations"
   */
  accessibleLabel?: string;
  /**
   * Placeholder text shown when input is empty.
   * @default "Search commands or destinations..."
   */
  placeholder?: string;
}

export const CommandPaletteInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  CommandPaletteInputProps
>(function CommandPaletteInput(
  {
    accessibleLabel = "Search commands and destinations",
    placeholder = "Search commands or destinations...",
    className,
    value,
    ...props
  },
  ref
) {
  const { query, setQuery, onClearQuery } = useCommandPalette();
  const currentValue = value !== undefined ? value : query;

  return (
    <div
      data-slot="command-palette-input-wrapper"
      className="relative flex items-center border-b border-border/40 px-4 py-3"
    >
      <label className="sr-only" htmlFor="command-palette-search-input">
        {accessibleLabel}
      </label>
      <HaloIcon
        icon={Search01Icon}
        size={18}
        className="mr-3 shrink-0 text-muted-foreground/70"
      />
      <CommandPrimitive.Input
        ref={ref}
        id="command-palette-search-input"
        data-slot="command-palette-input"
        placeholder={placeholder}
        value={currentValue}
        onValueChange={setQuery}
        className={cn(
          "flex h-8 w-full rounded-md bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/70 outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
      {Boolean(currentValue) && (
        <button
          type="button"
          onClick={onClearQuery}
          className="ml-2 rounded-md p-1 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors cursor-pointer"
          aria-label="Clear query"
        >
          <HaloIcon icon={Cancel01Icon} size={14} />
        </button>
      )}
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* CommandPaletteList (Scrollable Results Container)                          */
/* -------------------------------------------------------------------------- */

export interface CommandPaletteListProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {}

export const CommandPaletteList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  CommandPaletteListProps
>(function CommandPaletteList({ className, children, ...props }, ref) {
  return (
    <CommandPrimitive.List
      ref={ref}
      data-slot="command-palette-list"
      className={cn(
        // Internal scrolling with responsive max height
        "max-h-80 sm:max-h-96 w-full overflow-y-auto overflow-x-hidden p-2 outline-none overscroll-contain scroll-py-2",
        // Smooth Custom Scrollbar
        "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30",
        className
      )}
      {...props}
    >
      {children}
    </CommandPrimitive.List>
  );
});

/* -------------------------------------------------------------------------- */
/* CommandPaletteEmpty (Semantic Empty State)                                 */
/* -------------------------------------------------------------------------- */

export interface CommandPaletteEmptyProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {}

export const CommandPaletteEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  CommandPaletteEmptyProps
>(function CommandPaletteEmpty(
  { className, children = "No commands found.", ...props },
  ref
) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      data-slot="command-palette-empty"
      className={cn(
        "flex flex-col items-center justify-center gap-2 py-10 px-4 text-center text-xs text-muted-foreground select-none",
        className
      )}
      {...props}
    >
      <HaloIcon icon={Search01Icon} size={24} className="opacity-30 mb-1" />
      <span>{children}</span>
    </CommandPrimitive.Empty>
  );
});

/* -------------------------------------------------------------------------- */
/* CommandPaletteGroup (Grouped Command Section)                              */
/* -------------------------------------------------------------------------- */

export interface CommandPaletteGroupProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {
  /**
   * Accessible group heading text.
   */
  heading?: React.ReactNode;
}

export const CommandPaletteGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  CommandPaletteGroupProps
>(function CommandPaletteGroup({ heading, className, children, ...props }, ref) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      heading={heading}
      data-slot="command-palette-group"
      className={cn(
        "overflow-hidden px-1 py-1.5 text-foreground",
        // Group heading styling
        "[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase",
        className
      )}
      {...props}
    >
      {children}
    </CommandPrimitive.Group>
  );
});

/* -------------------------------------------------------------------------- */
/* CommandPaletteItem (Command Row with Activation & Hover)                   */
/* -------------------------------------------------------------------------- */

export interface CommandPaletteItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  /**
   * Leading icon element or Hugeicon.
   */
  icon?: React.ReactNode;
  /**
   * Secondary supporting text or path description.
   */
  description?: React.ReactNode;
  /**
   * Keyboard shortcut representation to display on the trailing side.
   */
  shortcut?: string;
  /**
   * Callback fired when command is deliberately activated via Enter or click.
   */
  onSelect?: (value: string) => void;
}

export const CommandPaletteItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  CommandPaletteItemProps
>(function CommandPaletteItem(
  {
    icon,
    description,
    shortcut,
    children,
    className,
    onSelect,
    ...props
  },
  ref
) {
  const { closeOnSelect, onClose } = useCommandPalette();

  const handleSelect = React.useCallback(
    (value: string) => {
      onSelect?.(value);
      if (closeOnSelect && onClose) {
        onClose();
      }
    },
    [onSelect, closeOnSelect, onClose]
  );

  return (
    <CommandPrimitive.Item
      ref={ref}
      data-slot="command-palette-item"
      onSelect={handleSelect}
      className={cn(
        // Layout & Spacing
        "group relative flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs font-medium outline-hidden select-none transition-colors duration-100",
        // Inactive state
        "text-foreground/90 hover:text-foreground",
        // Active item state (cmdk data-selected): Optical Liquid Glass Lens
        "data-[selected=true]:bg-white/80 dark:data-[selected=true]:bg-white/[0.12] data-[selected=true]:backdrop-blur-md",
        "data-[selected=true]:border data-[selected=true]:border-black/[0.06] dark:data-[selected=true]:border-white/[0.16]",
        "data-[selected=true]:shadow-[inset_0_1px_1px_0_rgba(255,255,255,1),0_2px_8px_-1px_rgba(0,0,0,0.08)] dark:data-[selected=true]:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.35),0_4px_12px_-2px_rgba(0,0,0,0.5)]",
        "data-[selected=true]:text-foreground data-[selected=true]:font-semibold",
        // Disabled state
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        {icon && (
          <div className="flex size-5 shrink-0 items-center justify-center text-muted-foreground group-data-[selected=true]:text-foreground transition-colors">
            {icon}
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate">{children}</span>
          {description && (
            <span className="truncate text-[10px] font-normal text-muted-foreground/80">
              {description}
            </span>
          )}
        </div>
      </div>

      {shortcut && (
        <CommandPaletteShortcut>{shortcut}</CommandPaletteShortcut>
      )}
    </CommandPrimitive.Item>
  );
});

/* -------------------------------------------------------------------------- */
/* CommandPaletteShortcut (Presentation Badge)                                */
/* -------------------------------------------------------------------------- */

export interface CommandPaletteShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function CommandPaletteShortcut({
  className,
  children,
  ...props
}: CommandPaletteShortcutProps) {
  return (
    <span
      data-slot="command-palette-shortcut"
      className={cn(
        "pointer-events-none ml-auto shrink-0 rounded border border-border/40 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-tight text-muted-foreground group-data-[selected=true]:border-border/70 group-data-[selected=true]:text-foreground transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* CommandPaletteSeparator (Optical Divider)                                  */
/* -------------------------------------------------------------------------- */

export interface CommandPaletteSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {}

export const CommandPaletteSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  CommandPaletteSeparatorProps
>(function CommandPaletteSeparator({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      data-slot="command-palette-separator"
      className={cn("mx-1 my-1.5 h-px bg-border/40", className)}
      {...props}
    />
  );
});
