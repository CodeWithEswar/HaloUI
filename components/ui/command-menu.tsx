"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Search01Icon,
  Cancel01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/* -------------------------------------------------------------------------- */
/* Contexts & Types                                                           */
/* -------------------------------------------------------------------------- */

export type CommandMenuIntensity = "subtle" | "balanced" | "rich";
export type CommandMenuVariant = "floating" | "embedded";

interface CommandMenuContextValue {
  intensity: CommandMenuIntensity;
  variant: CommandMenuVariant;
  query: string;
  setQuery: (query: string) => void;
  onClearQuery: () => void;
}

const CommandMenuContext = React.createContext<CommandMenuContextValue | null>(null);

export function useCommandMenu() {
  const context = React.useContext(CommandMenuContext);
  return context;
}

/* -------------------------------------------------------------------------- */
/* CommandMenu Root Container                                                 */
/* -------------------------------------------------------------------------- */

export interface CommandMenuProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {
  /**
   * HaloUI liquid optical glass material intensity level.
   * @default "balanced"
   */
  intensity?: CommandMenuIntensity;
  /**
   * Visual presentation variant:
   * - "floating": elevated liquid glass card with meniscus highlights and directional shadow.
   * - "embedded": flat panel styling for integration into sidebars, dashboards, or settings panels.
   * @default "floating"
   */
  variant?: CommandMenuVariant;
}

export const CommandMenu = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  CommandMenuProps
>(function CommandMenu(
  {
    intensity = "balanced",
    variant = "floating",
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

  const contextValue = React.useMemo<CommandMenuContextValue>(
    () => ({
      intensity,
      variant,
      query: value !== undefined ? value : internalQuery,
      setQuery: handleQueryChange,
      onClearQuery: handleClearQuery,
    }),
    [intensity, variant, value, internalQuery, handleQueryChange, handleClearQuery]
  );

  return (
    <CommandMenuContext.Provider value={contextValue}>
      <CommandPrimitive
        ref={ref}
        data-slot="command-menu"
        data-intensity={intensity}
        data-variant={variant}
        className={cn(
          // Layout & Containment
          "relative isolate flex w-full flex-col overflow-hidden select-none transition-all duration-200",
          // Floating Liquid Glass variant
          variant === "floating" && [
            "rounded-2xl border",
            intensity === "subtle" && "bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md border-white/60 dark:border-white/10",
            intensity === "balanced" && "bg-white/88 dark:bg-neutral-900/88 backdrop-blur-xl border-white/70 dark:border-white/15",
            intensity === "rich" && "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border-white/80 dark:border-white/20",
            // Physical Optical Elevation & Specular Reflection
            "shadow-[0_16px_40px_-4px_rgba(0,0,0,0.10),0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_48px_-6px_rgba(0,0,0,0.65),0_6px_16px_rgba(0,0,0,0.50)]",
            "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:border before:border-white/70 dark:before:border-white/15 before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9)] dark:before:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25)]",
          ],
          // Embedded Panel variant (flat panel, no floating shadow)
          variant === "embedded" && [
            "rounded-xl border border-border/60 bg-card/60 dark:bg-card/40 backdrop-blur-xs shadow-xs",
          ],
          className
        )}
        {...props}
      >
        {children}
      </CommandPrimitive>
    </CommandMenuContext.Provider>
  );
});

/* -------------------------------------------------------------------------- */
/* CommandMenuInput (Search Query Field)                                      */
/* -------------------------------------------------------------------------- */

export interface CommandMenuInputProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  /**
   * Accessible input label for screen readers.
   * @default "Search commands"
   */
  accessibleLabel?: string;
  /**
   * Placeholder text shown when input is empty.
   * @default "Type a command or search..."
   */
  placeholder?: string;
}

export const CommandMenuInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  CommandMenuInputProps
>(function CommandMenuInput(
  {
    accessibleLabel = "Search commands",
    placeholder = "Type a command or search...",
    className,
    value,
    ...props
  },
  ref
) {
  const context = useCommandMenu();
  const currentValue = value !== undefined ? value : (context?.query ?? "");

  return (
    <div
      data-slot="command-menu-input-wrapper"
      className="relative flex items-center border-b border-border/40 px-3.5 py-2.5"
    >
      <label className="sr-only" htmlFor="command-menu-search-input">
        {accessibleLabel}
      </label>
      <HaloIcon
        icon={Search01Icon}
        size={16}
        className="mr-2.5 shrink-0 text-muted-foreground/70"
      />
      <CommandPrimitive.Input
        ref={ref}
        id="command-menu-search-input"
        data-slot="command-menu-input"
        placeholder={placeholder}
        value={currentValue}
        onValueChange={context?.setQuery}
        className={cn(
          "flex h-8 w-full rounded-md bg-transparent text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground/60 outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
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
          <HaloIcon icon={Cancel01Icon} size={14} />
        </button>
      )}
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* CommandMenuList (Scrollable Results Container)                             */
/* -------------------------------------------------------------------------- */

export interface CommandMenuListProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {}

export const CommandMenuList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  CommandMenuListProps
>(function CommandMenuList({ className, children, ...props }, ref) {
  return (
    <CommandPrimitive.List
      ref={ref}
      data-slot="command-menu-list"
      className={cn(
        // Internal scrolling with responsive max height
        "max-h-72 sm:max-h-84 w-full overflow-y-auto overflow-x-hidden p-1.5 outline-none overscroll-contain scroll-py-1",
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
/* CommandMenuEmpty (Semantic Empty State)                                    */
/* -------------------------------------------------------------------------- */

export interface CommandMenuEmptyProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {}

export const CommandMenuEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  CommandMenuEmptyProps
>(function CommandMenuEmpty(
  { className, children = "No commands found.", ...props },
  ref
) {
  return (
    <CommandPrimitive.Empty
      ref={ref}
      data-slot="command-menu-empty"
      className={cn(
        "flex flex-col items-center justify-center gap-2 py-8 px-4 text-center text-xs text-muted-foreground select-none",
        className
      )}
      {...props}
    >
      <HaloIcon icon={Search01Icon} size={20} className="opacity-30 mb-0.5" />
      <span>{children}</span>
    </CommandPrimitive.Empty>
  );
});

/* -------------------------------------------------------------------------- */
/* CommandMenuGroup (Grouped Command Section)                                 */
/* -------------------------------------------------------------------------- */

export interface CommandMenuGroupProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {
  /**
   * Accessible group heading text.
   */
  heading?: React.ReactNode;
}

export const CommandMenuGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  CommandMenuGroupProps
>(function CommandMenuGroup({ heading, className, children, ...props }, ref) {
  return (
    <CommandPrimitive.Group
      ref={ref}
      heading={heading}
      data-slot="command-menu-group"
      className={cn(
        "overflow-hidden px-1 py-1 text-foreground",
        // Group heading styling
        "[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground/80 [&_[cmdk-group-heading]]:uppercase",
        className
      )}
      {...props}
    >
      {children}
    </CommandPrimitive.Group>
  );
});

/* -------------------------------------------------------------------------- */
/* CommandMenuItem (Command Row with Active State)                            */
/* -------------------------------------------------------------------------- */

export interface CommandMenuItemProps
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
}

export const CommandMenuItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  CommandMenuItemProps
>(function CommandMenuItem(
  {
    icon,
    description,
    shortcut,
    children,
    className,
    ...props
  },
  ref
) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      data-slot="command-menu-item"
      className={cn(
        // Layout & Spacing
        "group/command-item relative flex cursor-pointer items-center justify-between gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium outline-hidden select-none transition-colors duration-100",
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
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {icon && (
          <div className="flex size-4 shrink-0 items-center justify-center text-muted-foreground/80 group-data-[selected=true]/command-item:text-foreground transition-colors">
            {icon}
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate">{children}</span>
          {description && (
            <span className="truncate text-[10px] font-normal text-muted-foreground/75">
              {description}
            </span>
          )}
        </div>
      </div>

      {shortcut ? (
        <CommandMenuShortcut>{shortcut}</CommandMenuShortcut>
      ) : (
        <span className="ml-auto opacity-0 group-data-[checked=true]/command-item:opacity-100 flex items-center text-primary">
          <HaloIcon icon={Tick01Icon} size={14} />
        </span>
      )}
    </CommandPrimitive.Item>
  );
});

/* -------------------------------------------------------------------------- */
/* CommandMenuShortcut (Presentation Badge)                                   */
/* -------------------------------------------------------------------------- */

export interface CommandMenuShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export function CommandMenuShortcut({
  className,
  children,
  ...props
}: CommandMenuShortcutProps) {
  return (
    <kbd
      data-slot="command-menu-shortcut"
      className={cn(
        "pointer-events-none ml-auto shrink-0 rounded border border-border/40 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-tight text-muted-foreground group-data-[selected=true]/command-item:border-border/70 group-data-[selected=true]/command-item:text-foreground transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

/* -------------------------------------------------------------------------- */
/* CommandMenuSeparator (Optical Divider)                                     */
/* -------------------------------------------------------------------------- */

export interface CommandMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {}

export const CommandMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  CommandMenuSeparatorProps
>(function CommandMenuSeparator({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Separator
      ref={ref}
      data-slot="command-menu-separator"
      className={cn("mx-1 my-1 h-px bg-border/40", className)}
      {...props}
    />
  );
});

/* -------------------------------------------------------------------------- */
/* CommandMenuDialog (Modal Presentation Composition)                         */
/* -------------------------------------------------------------------------- */

export interface CommandMenuDialogProps
  extends Omit<React.ComponentProps<typeof Dialog>, "children"> {
  title?: string;
  description?: string;
  intensity?: CommandMenuIntensity;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export function CommandMenuDialog({
  title = "Command Menu",
  description = "Search and execute commands...",
  intensity = "balanced",
  children,
  className,
  showCloseButton = false,
  ...props
}: CommandMenuDialogProps) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-1/3 translate-y-0 overflow-hidden rounded-2xl! p-0 max-w-xl",
          className
        )}
        showCloseButton={showCloseButton}
      >
        <CommandMenu intensity={intensity} variant="embedded">
          {children}
        </CommandMenu>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Canonical Aliases for Source Ownership and shadcn Compatibility           */
/* -------------------------------------------------------------------------- */

export const Command = CommandMenu;
export const CommandInput = CommandMenuInput;
export const CommandList = CommandMenuList;
export const CommandEmpty = CommandMenuEmpty;
export const CommandGroup = CommandMenuGroup;
export const CommandItem = CommandMenuItem;
export const CommandShortcut = CommandMenuShortcut;
export const CommandSeparator = CommandMenuSeparator;
export const CommandDialog = CommandMenuDialog;
