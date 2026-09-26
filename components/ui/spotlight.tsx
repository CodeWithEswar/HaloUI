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
export type SpotlightTheme = "adaptive" | "light" | "dark";

interface SpotlightContextValue {
  intensity: SpotlightIntensity;
  theme: SpotlightTheme;
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
   * Theme mode: adaptive (inherits system/stage), or explicit "light" / "dark".
   * @default "adaptive"
   */
  theme?: SpotlightTheme;
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
    theme = "adaptive",
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
      theme,
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
      theme,
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
        data-theme={theme !== "adaptive" ? theme : undefined}
        className={cn(
          // Layout & Containment
          "relative isolate flex w-full flex-col overflow-hidden rounded-2xl select-none transition-all duration-200",
          // 10-Layer Physical Optical Liquid Glass Engine Recipes
          intensity === "subtle" && [
            "bg-white/55 dark:bg-neutral-950/55 backdrop-blur-xl backdrop-saturate-180",
            "border border-white/70 dark:border-white/15",
            "shadow-[0_16px_40px_-6px_rgba(0,0,0,0.10),0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_-8px_rgba(0,0,0,0.65),0_4px_16px_rgba(0,0,0,0.45)]",
          ],
          intensity === "balanced" && [
            "bg-white/68 dark:bg-neutral-950/68 backdrop-blur-2xl backdrop-saturate-190",
            "border border-white/85 dark:border-white/20",
            "shadow-[0_24px_64px_-12px_rgba(0,0,0,0.15),0_8px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_28px_72px_-14px_rgba(0,0,0,0.75),0_8px_24px_rgba(0,0,0,0.55)]",
          ],
          intensity === "rich" && [
            "bg-white/78 dark:bg-neutral-950/78 backdrop-blur-3xl backdrop-saturate-200",
            "border border-white/95 dark:border-white/25",
            "shadow-[0_32px_80px_-16px_rgba(0,0,0,0.18),0_12px_32px_-6px_rgba(0,0,0,0.08)] dark:shadow-[0_36px_90px_-16px_rgba(0,0,0,0.85),0_12px_32px_rgba(0,0,0,0.65)]",
          ],
          // Layer 03: Physical Optical Specular Highlight Rim (Inner Meniscus)
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_1.5px_1.5px_0_rgba(255,255,255,1),inset_0_-1px_1px_0_rgba(0,0,0,0.05)] dark:before:shadow-[inset_0_1.5px_1.5px_0_rgba(255,255,255,0.28),inset_0_-1px_1px_0_rgba(0,0,0,0.6)]",
          // Layer 04: Top-Down Directional Specular Sheen (Natural Overhead Refraction)
          "after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-b after:from-white/25 after:via-white/5 after:to-transparent dark:after:from-white/10 dark:after:via-transparent dark:after:to-transparent",
          // Explicit theme container hooks
          theme === "dark" && "dark",
          theme === "light" && "light",
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
   * Theme mode: adaptive (inherits system/stage), or explicit "light" / "dark".
   * @default "adaptive"
   */
  theme?: SpotlightTheme;
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
  theme = "adaptive",
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
          className="fixed inset-0 z-50 bg-black/45 dark:bg-black/65 backdrop-blur-xs transition-opacity duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        />

        {/* Floating Modal Surface with Responsive Mobile Positioning */}
        <DialogPrimitive.Popup
          data-slot="spotlight-popup"
          data-theme={theme !== "adaptive" ? theme : undefined}
          className={cn(
            "fixed top-[7%] sm:top-[12%] md:top-[15%] left-1/2 z-50 w-full max-w-[calc(100vw-1.25rem)] sm:max-w-2xl md:max-w-3xl -translate-x-1/2 outline-none duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            theme === "dark" && "dark",
            theme === "light" && "light",
            className
          )}
        >
          <div className="sr-only">
            <h2 id="spotlight-modal-title">{title}</h2>
            <p id="spotlight-modal-description">{description}</p>
          </div>

          <Spotlight
            intensity={intensity}
            theme={theme}
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
   * @default "Search files, documents, team members, or actions..."
   */
  placeholder?: string;
}

export const SpotlightInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  SpotlightInputProps
>(function SpotlightInput(
  {
    accessibleLabel = "Search across files, projects, people, and commands",
    placeholder = "Search files, documents, team members, or actions...",
    className,
    value,
    defaultValue,
    ...props
  },
  ref
) {
  const context = useSpotlight();

  // Sync defaultValue to context query once if provided and context is empty
  React.useEffect(() => {
    if (defaultValue !== undefined && context && !context.query) {
      context.setQuery(String(defaultValue));
    }
  }, [defaultValue, context]);

  const isUncontrolled = defaultValue !== undefined && value === undefined;
  const currentValue = value !== undefined ? value : (context?.query ?? "");

  return (
    <div
      data-slot="spotlight-input-wrapper"
      className="relative flex items-center border-b border-black/[0.06] dark:border-white/[0.08] px-3.5 py-3 sm:px-5 sm:py-3.5 bg-black/[0.01] dark:bg-white/[0.01]"
    >
      <label className="sr-only" htmlFor="spotlight-search-field">
        {accessibleLabel}
      </label>
      <HaloIcon
        icon={Search01Icon}
        size={20}
        className="mr-3 shrink-0 text-muted-foreground/75"
      />
      {isUncontrolled ? (
        <CommandPrimitive.Input
          ref={ref}
          id="spotlight-search-field"
          data-slot="spotlight-input"
          placeholder={placeholder}
          defaultValue={defaultValue}
          onValueChange={context?.setQuery}
          className={cn(
            "flex h-9 sm:h-10 w-full rounded-md bg-transparent text-sm sm:text-base font-medium text-foreground placeholder:text-muted-foreground/50 outline-hidden select-text disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      ) : (
        <CommandPrimitive.Input
          ref={ref}
          id="spotlight-search-field"
          data-slot="spotlight-input"
          placeholder={placeholder}
          value={currentValue}
          onValueChange={context?.setQuery}
          className={cn(
            "flex h-9 sm:h-10 w-full rounded-md bg-transparent text-sm sm:text-base font-medium text-foreground placeholder:text-muted-foreground/50 outline-hidden select-text disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      )}
      {Boolean(currentValue || defaultValue) && context?.onClearQuery && (
        <button
          type="button"
          onClick={context.onClearQuery}
          className="ml-2 flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.10] hover:text-foreground transition-all cursor-pointer"
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
        "flex items-center gap-1.5 sm:gap-2 border-b border-black/[0.06] dark:border-white/[0.08] px-3 sm:px-4 py-2 overflow-x-auto no-scrollbar bg-black/[0.02] dark:bg-white/[0.02] text-xs",
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
              "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-medium transition-all duration-150 cursor-pointer whitespace-nowrap",
              isActive
                ? "bg-white/90 dark:bg-white/18 text-foreground font-semibold shadow-[0_2px_8px_-1px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,1)] dark:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.4),inset_0_1px_1px_0_rgba(255,255,255,0.25)] border border-white/90 dark:border-white/25"
                : "text-muted-foreground/80 hover:text-foreground hover:bg-white/50 dark:hover:bg-white/8 border border-transparent"
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums transition-colors",
                  isActive
                    ? "bg-black/[0.07] dark:bg-white/[0.15] text-foreground"
                    : "bg-black/[0.04] dark:bg-white/[0.08] text-muted-foreground/75"
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
        "max-h-72 sm:max-h-96 w-full overflow-y-auto overflow-x-hidden p-2 outline-none overscroll-contain scroll-py-2",
        // Smooth Sleek Scrollbar
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
        "[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] sm:[&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/75 [&_[cmdk-group-heading]]:uppercase",
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
        "group/spotlight-item relative flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 sm:py-2.5 text-xs font-medium outline-hidden select-none transition-all duration-150",
        // Inactive text
        "text-foreground/85 hover:text-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.04]",
        // Active item state (cmdk data-selected): Frosted Liquid Glass Highlight Layer
        "data-[selected=true]:bg-black/[0.06] dark:data-[selected=true]:bg-white/[0.10] data-[selected=true]:text-foreground data-[selected=true]:font-semibold data-[selected=true]:shadow-[inset_0_1px_0.5px_0_rgba(255,255,255,0.7),0_2px_6px_-1px_rgba(0,0,0,0.06)] dark:data-[selected=true]:shadow-[inset_0_1px_0.5px_0_rgba(255,255,255,0.22),0_2px_6px_-1px_rgba(0,0,0,0.3)]",
        // Disabled state
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {icon && (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] dark:bg-white/[0.07] text-foreground/80 border border-black/[0.04] dark:border-white/[0.08] group-data-[selected=true]/spotlight-item:bg-white/95 dark:group-data-[selected=true]/spotlight-item:bg-white/20 group-data-[selected=true]/spotlight-item:text-foreground group-data-[selected=true]/spotlight-item:shadow-xs group-data-[selected=true]/spotlight-item:border-white/80 dark:group-data-[selected=true]/spotlight-item:border-white/25 transition-all">
            {icon}
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="truncate">{children}</span>
            {category && (
              <span className="shrink-0 rounded-md border border-black/[0.06] dark:border-white/[0.12] bg-black/[0.03] dark:bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-semibold tracking-wider uppercase text-muted-foreground group-data-[selected=true]/spotlight-item:border-black/[0.1] dark:group-data-[selected=true]/spotlight-item:border-white/20">
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
        "pointer-events-none ml-auto shrink-0 rounded-md border border-black/[0.08] dark:border-white/[0.15] bg-white/70 dark:bg-white/10 px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-tight text-muted-foreground group-data-[selected=true]/spotlight-item:border-black/[0.15] dark:group-data-[selected=true]/spotlight-item:border-white/30 group-data-[selected=true]/spotlight-item:text-foreground transition-colors shadow-2xs",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

/* -------------------------------------------------------------------------- */
/* SpotlightSeparator (Subtle Optical Divider)                                */
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
      className={cn("mx-2 my-1 h-px bg-black/[0.06] dark:bg-white/[0.08]", className)}
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
        "flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] px-4 py-2.5 text-[11px] text-muted-foreground/80 backdrop-blur-md",
        className
      )}
      {...props}
    >
      {children || (
        <>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <kbd className="rounded-md border border-black/[0.08] dark:border-white/[0.15] bg-white/75 dark:bg-white/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-foreground/85 shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]">
                ↑↓
              </kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded-md border border-black/[0.08] dark:border-white/[0.15] bg-white/75 dark:bg-white/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-foreground/85 shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]">
                ↵
              </kbd>
              <span>Open</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded-md border border-black/[0.08] dark:border-white/[0.15] bg-white/75 dark:bg-white/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-foreground/85 shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]">
                esc
              </kbd>
              <span>Dismiss</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-muted-foreground/75">
            <HaloIcon icon={SparklesIcon} size={12} className="text-primary/80" />
            <span>HaloUI Global Spotlight</span>
          </div>
        </>
      )}
    </div>
  );
}
