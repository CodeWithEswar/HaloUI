"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Search01Icon,
  Cancel01Icon,
  ArrowRight01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------- */
/* Contexts & Types                                                           */
/* -------------------------------------------------------------------------- */

export type SpotlightIntensity = "subtle" | "balanced" | "rich";

interface SpotlightContextValue {
  intensity: SpotlightIntensity;
  query: string;
  setQuery: (query: string) => void;
  onClearQuery: () => void;
  activeCategory?: string;
  setActiveCategory?: (category: string) => void;
  closeOnSelect?: boolean;
  onClose?: () => void;
}

const SpotlightContext = React.createContext<SpotlightContextValue | null>(null);

export function useSpotlight() {
  const context = React.useContext(SpotlightContext);
  return context;
}

/* -------------------------------------------------------------------------- */
/* Spotlight Root Surface                                                     */
/* -------------------------------------------------------------------------- */

export interface SpotlightProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  /**
   * HaloUI liquid optical glass material intensity level.
   * @default "balanced"
   */
  intensity?: SpotlightIntensity;
  /**
   * Whether selecting an item automatically triggers the onClose callback.
   * @default true
   */
  closeOnSelect?: boolean;
  /**
   * Callback fired when Spotlight requests closure.
   */
  onClose?: () => void;
  /**
   * Active category filter tab (e.g. "all", "files", "people", "actions").
   */
  activeCategory?: string;
  /**
   * Callback fired when category tab changes.
   */
  onCategoryChange?: (category: string) => void;
}

export const Spotlight = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  SpotlightProps
>(function Spotlight(
  {
    intensity = "balanced",
    closeOnSelect = true,
    onClose,
    activeCategory,
    onCategoryChange,
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

  const contextValue = React.useMemo<SpotlightContextValue>(
    () => ({
      intensity,
      query: value !== undefined ? value : internalQuery,
      setQuery: handleQueryChange,
      onClearQuery: handleClearQuery,
      activeCategory,
      setActiveCategory: onCategoryChange,
      closeOnSelect,
      onClose,
    }),
    [
      intensity,
      value,
      internalQuery,
      handleQueryChange,
      handleClearQuery,
      activeCategory,
      onCategoryChange,
      closeOnSelect,
      onClose,
    ]
  );

  return (
    <SpotlightContext.Provider value={contextValue}>
      <CommandPrimitive
        ref={ref}
        data-slot="spotlight"
        data-intensity={intensity}
        className={cn(
          // Layout & Containment
          "relative isolate flex w-full flex-col overflow-hidden rounded-2xl select-none transition-all duration-200",
          // Liquid Optical Surface recipes
          intensity === "subtle" &&
            "bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md border border-white/60 dark:border-white/10",
          intensity === "balanced" &&
            "bg-white/88 dark:bg-neutral-900/88 backdrop-blur-xl border border-white/70 dark:border-white/15",
          intensity === "rich" &&
            "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border border-white/80 dark:border-white/20",
          // Physical Optical Elevation & Specular Reflection
          "shadow-[0_20px_50px_-8px_rgba(0,0,0,0.12),0_6px_16px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_56px_-10px_rgba(0,0,0,0.70),0_8px_20px_rgba(0,0,0,0.55)]",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:border before:border-white/70 dark:before:border-white/15 before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.95)] dark:before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25)]",
          className
        )}
        {...props}
      >
        {children}
      </CommandPrimitive>
    </SpotlightContext.Provider>
  );
});

/* -------------------------------------------------------------------------- */
/* SpotlightDialog (Modal Presentation Overlay)                               */
/* -------------------------------------------------------------------------- */

export interface SpotlightDialogProps {
  /**
   * Controlled open state.
   */
  open?: boolean;
  /**
   * Default open state for uncontrolled usage.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Accessible modal title for screen readers.
   * @default "Global Spotlight Search"
   */
  title?: string;
  /**
   * Accessible modal description for screen readers.
   * @default "Search across files, projects, people, navigation destinations, and application commands."
   */
  description?: string;
  /**
   * Liquid Glass material intensity.
   * @default "balanced"
   */
  intensity?: SpotlightIntensity;
  /**
   * Optional custom portal container element.
   */
  container?: HTMLElement | null | React.RefObject<HTMLElement | null>;
  /**
   * Additional classes for the dialog modal wrapper.
   */
  className?: string;
  children: React.ReactNode;
}

export function SpotlightDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  title = "Global Spotlight Search",
  description = "Search across files, projects, people, navigation destinations, and application commands.",
  intensity = "balanced",
  container,
  className,
  children,
}: SpotlightDialogProps) {
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

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal container={container}>
        {/* Halo Scrim: Calibrated Backdrop Attenuation */}
        <DialogPrimitive.Backdrop
          data-slot="spotlight-scrim"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        />

        {/* Floating Modal Surface */}
        <DialogPrimitive.Popup
          data-slot="spotlight-popup"
          className={cn(
            "fixed top-[12%] sm:top-[15%] left-1/2 z-50 w-full max-w-[calc(100%-1.5rem)] sm:max-w-3xl -translate-x-1/2 outline-none duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
        >
          <div className="sr-only">
            <h2 id="spotlight-modal-title">{title}</h2>
            <p id="spotlight-modal-description">{description}</p>
          </div>

          <Spotlight
            intensity={intensity}
            onClose={() => handleOpenChange(false)}
            aria-labelledby="spotlight-modal-title"
            aria-describedby="spotlight-modal-description"
          >
            {children}
          </Spotlight>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/* -------------------------------------------------------------------------- */
/* SpotlightSearch / SpotlightInput                                           */
/* -------------------------------------------------------------------------- */

export interface SpotlightInputProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  /**
   * Accessible input label for screen readers.
   * @default "Search across files, projects, people, and commands"
   */
  accessibleLabel?: string;
  /**
   * Placeholder text shown when input is empty.
   * @default "Search everything... (type '/' for commands, '@' for people)"
   */
  placeholder?: string;
}

export const SpotlightInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  SpotlightInputProps
>(function SpotlightInput(
  {
    accessibleLabel = "Search across files, projects, people, and commands",
    placeholder = "Search everything... (type '/' for commands, '@' for people)",
    className,
    value,
    ...props
  },
  ref
) {
  const context = useSpotlight();
  const currentValue = value !== undefined ? value : (context?.query ?? "");

  return (
    <div
      data-slot="spotlight-input-wrapper"
      className="relative flex items-center border-b border-border/40 px-4 py-3.5 sm:px-5 sm:py-4"
    >
      <label className="sr-only" htmlFor="spotlight-search-field">
        {accessibleLabel}
      </label>
      <HaloIcon
        icon={Search01Icon}
        size={20}
        className="mr-3 shrink-0 text-muted-foreground/75"
      />
      <CommandPrimitive.Input
        ref={ref}
        id="spotlight-search-field"
        data-slot="spotlight-input"
        placeholder={placeholder}
        value={currentValue}
        onValueChange={context?.setQuery}
        className={cn(
          "flex h-9 w-full rounded-md bg-transparent text-sm sm:text-base font-medium text-foreground placeholder:text-muted-foreground/60 outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
      {Boolean(currentValue) && context?.onClearQuery && (
        <button
          type="button"
          onClick={context.onClearQuery}
          className="ml-2 rounded-md p-1 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors cursor-pointer"
          aria-label="Clear query"
        >
          <HaloIcon icon={Cancel01Icon} size={16} />
        </button>
      )}
    </div>
  );
});

export const SpotlightSearch = SpotlightInput;

/* -------------------------------------------------------------------------- */
/* SpotlightFilterTabs                                                        */
/* -------------------------------------------------------------------------- */

export interface SpotlightTabItem {
  id: string;
  label: string;
  count?: number;
}

export interface SpotlightFilterTabsProps {
  tabs: SpotlightTabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

export function SpotlightFilterTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: SpotlightFilterTabsProps) {
  const context = useSpotlight();
  const currentTab = activeTab ?? context?.activeCategory ?? (tabs[0]?.id ?? "all");

  const handleSelect = (id: string) => {
    onTabChange?.(id);
    context?.setActiveCategory?.(id);
  };

  return (
    <div
      data-slot="spotlight-filter-tabs"
      className={cn(
        "flex items-center gap-1.5 border-b border-border/40 px-4 py-2 overflow-x-auto no-scrollbar bg-muted/20 text-xs",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === currentTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleSelect(tab.id)}
            data-active={isActive}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-medium transition-all cursor-pointer whitespace-nowrap",
              isActive
                ? "bg-foreground text-background shadow-xs font-semibold"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.2 text-[10px]",
                  isActive ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SpotlightList (Scrollable Discovery Container)                             */
/* -------------------------------------------------------------------------- */

export interface SpotlightListProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {}

export const SpotlightList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  SpotlightListProps
>(function SpotlightList({ className, children, ...props }, ref) {
  return (
    <CommandPrimitive.List
      ref={ref}
      data-slot="spotlight-list"
      className={cn(
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
/* SpotlightEmpty (Discovery Empty State)                                     */
/* -------------------------------------------------------------------------- */

export interface SpotlightEmptyProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {}

export const SpotlightEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  SpotlightEmptyProps
>(function SpotlightEmpty(
  {
    className,
    children = "No matching results found. Try searching for different keywords or checking another category tab.",
    ...props
  },
  ref
) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      data-slot="spotlight-empty"
      className={cn(
        "flex flex-col items-center justify-center gap-2 py-12 px-6 text-center text-xs text-muted-foreground select-none",
        className
      )}
      {...props}
    >
      <HaloIcon icon={Search01Icon} size={28} className="opacity-25 mb-1 text-muted-foreground" />
      <span className="max-w-sm leading-relaxed">{children}</span>
    </CommandPrimitive.Empty>
  );
});

/* -------------------------------------------------------------------------- */
/* SpotlightGroup (Heterogeneous Section)                                     */
/* -------------------------------------------------------------------------- */

export interface SpotlightGroupProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {
  heading?: React.ReactNode;
}

export const SpotlightGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  SpotlightGroupProps
>(function SpotlightGroup({ heading, className, children, ...props }, ref) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      heading={heading}
      data-slot="spotlight-group"
      className={cn(
        "overflow-hidden px-1 py-1.5 text-foreground",
        // Header typography
        "[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/75 [&_[cmdk-group-heading]]:uppercase",
        className
      )}
      {...props}
    >
      {children}
    </CommandPrimitive.Group>
  );
});

/* -------------------------------------------------------------------------- */
/* SpotlightItem (Rich Multi-Entity Discovery Row)                            */
/* -------------------------------------------------------------------------- */

export interface SpotlightItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  /**
   * Leading icon element or avatar.
   */
  icon?: React.ReactNode;
  /**
   * Entity category badge (e.g. "FILE", "PERSON", "PROJECT", "ACTION").
   */
  category?: string;
  /**
   * Secondary supporting text or path breadcrumb.
   */
  description?: React.ReactNode;
  /**
   * Supplemental metadata (e.g. "2.4 MB", "Edited 2h ago", "Active").
   */
  metadata?: React.ReactNode;
  /**
   * Keyboard shortcut representation.
   */
  shortcut?: string;
  /**
   * Selection execution callback.
   */
  onSelect?: (value: string) => void;
}

export const SpotlightItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  SpotlightItemProps
>(function SpotlightItem(
  {
    icon,
    category,
    description,
    metadata,
    shortcut,
    children,
    className,
    onSelect,
    ...props
  },
  ref
) {
  const context = useSpotlight();

  const handleSelect = React.useCallback(
    (value: string) => {
      onSelect?.(value);
      if (context?.closeOnSelect && context?.onClose) {
        context.onClose();
      }
    },
    [onSelect, context]
  );

  return (
    <CommandPrimitive.Item
      ref={ref}
      data-slot="spotlight-item"
      onSelect={handleSelect}
      className={cn(
        // Layout & Spacing
        "group/spotlight-item relative flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs font-medium outline-hidden select-none transition-colors duration-100",
        // Inactive text
        "text-foreground/90 hover:text-foreground",
        // Active item state (cmdk data-selected): restrained highlight state layer
        "data-[selected=true]:bg-muted/80 dark:data-[selected=true]:bg-muted/50 data-[selected=true]:text-foreground data-[selected=true]:font-semibold",
        // Disabled state
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {icon && (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground group-data-[selected=true]/spotlight-item:bg-background/80 group-data-[selected=true]/spotlight-item:text-foreground transition-colors shadow-2xs">
            {icon}
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="truncate">{children}</span>
            {category && (
              <span className="shrink-0 rounded-md border border-border/50 bg-muted/40 px-1.5 py-0.2 text-[9px] font-semibold tracking-wider uppercase text-muted-foreground">
                {category}
              </span>
            )}
          </div>
          {(description || metadata) && (
            <div className="flex items-center gap-2 truncate text-[11px] font-normal text-muted-foreground/75">
              {description && <span className="truncate">{description}</span>}
              {description && metadata && <span className="text-muted-foreground/40">•</span>}
              {metadata && <span className="shrink-0 text-muted-foreground/60">{metadata}</span>}
            </div>
          )}
        </div>
      </div>

      {shortcut ? (
        <SpotlightShortcut>{shortcut}</SpotlightShortcut>
      ) : (
        <HaloIcon
          icon={ArrowRight01Icon}
          size={14}
          className="ml-auto opacity-0 group-data-[selected=true]/spotlight-item:opacity-60 transition-opacity text-muted-foreground"
        />
      )}
    </CommandPrimitive.Item>
  );
});

/* -------------------------------------------------------------------------- */
/* SpotlightShortcut (Presentation Badge)                                     */
/* -------------------------------------------------------------------------- */

export interface SpotlightShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function SpotlightShortcut({
  className,
  children,
  ...props
}: SpotlightShortcutProps) {
  return (
    <kbd
      data-slot="spotlight-shortcut"
      className={cn(
        "pointer-events-none ml-auto shrink-0 rounded border border-border/40 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-tight text-muted-foreground group-data-[selected=true]/spotlight-item:border-border/70 group-data-[selected=true]/spotlight-item:text-foreground transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

/* -------------------------------------------------------------------------- */
/* SpotlightSeparator (Subtle Divider)                                        */
/* -------------------------------------------------------------------------- */

export interface SpotlightSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {}

export const SpotlightSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  SpotlightSeparatorProps
>(function SpotlightSeparator({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      data-slot="spotlight-separator"
      className={cn("mx-2 my-1 h-px bg-border/40", className)}
      {...props}
    />
  );
});

/* -------------------------------------------------------------------------- */
/* SpotlightFooter (Keyboard Navigation & Hints Bar)                          */
/* -------------------------------------------------------------------------- */

export interface SpotlightFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SpotlightFooter({ className, children, ...props }: SpotlightFooterProps) {
  return (
    <div
      data-slot="spotlight-footer"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-t border-border/40 bg-muted/20 px-4 py-2.5 text-[11px] text-muted-foreground",
        className
      )}
      {...props}
    >
      {children || (
        <>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border/60 bg-muted/50 px-1 py-0.5 font-mono text-[9px]">↑↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border/60 bg-muted/50 px-1 py-0.5 font-mono text-[9px]">↵</kbd>
              <span>Open</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border/60 bg-muted/50 px-1 py-0.5 font-mono text-[9px]">esc</kbd>
              <span>Dismiss</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground/70">
            <HaloIcon icon={SparklesIcon} size={12} className="text-primary/70" />
            <span>HaloUI Global Spotlight</span>
          </div>
        </>
      )}
    </div>
  );
}
