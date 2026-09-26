"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

/* -------------------------------------------------------------------------- */
/* Contexts & Types                                                           */
/* -------------------------------------------------------------------------- */

export type TreeNavigationIntensity = "subtle" | "balanced" | "rich";

interface TreeNavigationContextValue {
  expandedValues: Set<string>;
  toggleExpanded: (value: string) => void;
  isExpanded: (value: string) => boolean;
  currentValue?: string;
  isCurrent: (value: string) => boolean;
  intensity: TreeNavigationIntensity;
  showConnectors: boolean;
  indentation: number;
  focusedId: string | null;
  setFocusedId: (id: string | null) => void;
  registerItem: (id: string, element: HTMLElement) => void;
  unregisterItem: (id: string) => void;
  treeContainerRef: React.RefObject<HTMLDivElement | null>;
}

const TreeNavigationContext = React.createContext<TreeNavigationContextValue | null>(null);

function useTreeNavigation() {
  const context = React.useContext(TreeNavigationContext);
  if (!context) {
    throw new Error("TreeNavigation compound components must be used within <TreeNavigation />");
  }
  return context;
}

interface TreeDepthContextValue {
  depth: number;
  parentId?: string;
}

const TreeDepthContext = React.createContext<TreeDepthContextValue>({
  depth: 0,
});

/* -------------------------------------------------------------------------- */
/* TreeNavigation Root                                                        */
/* -------------------------------------------------------------------------- */

export interface TreeNavigationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "defaultValue"> {
  /**
   * The value (or URL path) of the current destination leaf.
   * Receives aria-current="page" and distinct visual indicator.
   */
  value?: string;
  /**
   * Controlled array of expanded branch identifiers.
   */
  expandedValues?: string[];
  /**
   * Uncontrolled default array of expanded branch identifiers.
   */
  defaultExpandedValues?: string[];
  /**
   * Callback fired when expanded branch identifiers change.
   */
  onExpandedValuesChange?: (values: string[]) => void;
  /**
   * HaloUI liquid optical glass material intensity level.
   * @default "subtle"
   */
  intensity?: TreeNavigationIntensity;
  /**
   * Whether to display subtle vertical tree connector guide lines.
   * @default true
   */
  showConnectors?: boolean;
  /**
   * Horizontal indentation in pixels per depth level.
   * @default 16
   */
  indentation?: number;
}

export const TreeNavigation = React.forwardRef<HTMLDivElement, TreeNavigationProps>(
  function TreeNavigation(
    {
      value: currentValue,
      expandedValues: controlledExpanded,
      defaultExpandedValues = [],
      onExpandedValuesChange,
      intensity = "subtle",
      showConnectors = true,
      indentation = 16,
      className,
      children,
      ...props
    },
    ref
  ) {
    const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState<Set<string>>(
      () => new Set(defaultExpandedValues)
    );
    const [focusedId, setFocusedId] = React.useState<string | null>(null);
    const treeContainerRef = React.useRef<HTMLDivElement | null>(null);
    const itemElementsRef = React.useRef<Map<string, HTMLElement>>(new Map());

    const isControlled = controlledExpanded !== undefined;
    const currentExpandedSet = React.useMemo(() => {
      return isControlled ? new Set(controlledExpanded) : uncontrolledExpanded;
    }, [isControlled, controlledExpanded, uncontrolledExpanded]);

    const handleToggleExpanded = React.useCallback(
      (branchId: string) => {
        const next = new Set(currentExpandedSet);
        if (next.has(branchId)) {
          next.delete(branchId);
        } else {
          next.add(branchId);
        }

        if (!isControlled) {
          setUncontrolledExpanded(next);
        }
        onExpandedValuesChange?.(Array.from(next));
      },
      [currentExpandedSet, isControlled, onExpandedValuesChange]
    );

    const isExpanded = React.useCallback(
      (branchId: string) => currentExpandedSet.has(branchId),
      [currentExpandedSet]
    );

    const isCurrent = React.useCallback(
      (itemValue: string) => Boolean(currentValue && currentValue === itemValue),
      [currentValue]
    );

    const registerItem = React.useCallback((id: string, el: HTMLElement) => {
      itemElementsRef.current.set(id, el);
    }, []);

    const unregisterItem = React.useCallback((id: string) => {
      itemElementsRef.current.delete(id);
    }, []);

    // Get ordered visible focusable treeitems
    const getVisibleTreeItems = React.useCallback((): HTMLElement[] => {
      if (!treeContainerRef.current) return [];
      const nodes = treeContainerRef.current.querySelectorAll<HTMLElement>(
        '[role="treeitem"]:not([aria-hidden="true"])'
      );
      // Filter out nodes that are hidden by CSS or inside collapsed branches
      return Array.from(nodes).filter((node) => {
        return node.offsetParent !== null && !node.closest('[aria-hidden="true"]');
      });
    }, []);

    // Roving focus keyboard handler on the tree container
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const visibleItems = getVisibleTreeItems();
      if (!visibleItems.length) return;

      const activeEl = document.activeElement as HTMLElement | null;
      let currentIndex = visibleItems.findIndex(
        (item) => item === activeEl || item.contains(activeEl)
      );

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const nextIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0;
          visibleItems[nextIndex]?.focus();
          setFocusedId(visibleItems[nextIndex]?.dataset.nodeId ?? null);
          break;
        }

        case "ArrowUp": {
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1;
          visibleItems[prevIndex]?.focus();
          setFocusedId(visibleItems[prevIndex]?.dataset.nodeId ?? null);
          break;
        }

        case "Home": {
          e.preventDefault();
          visibleItems[0]?.focus();
          setFocusedId(visibleItems[0]?.dataset.nodeId ?? null);
          break;
        }

        case "End": {
          e.preventDefault();
          visibleItems[visibleItems.length - 1]?.focus();
          setFocusedId(visibleItems[visibleItems.length - 1]?.dataset.nodeId ?? null);
          break;
        }

        case "ArrowRight": {
          if (!activeEl) break;
          const branchRow = activeEl.closest('[data-branch-id]') as HTMLElement | null;
          if (branchRow) {
            const branchId = branchRow.dataset.branchId;
            if (branchId) {
              if (!isExpanded(branchId)) {
                // Collapsed branch: Expand it
                e.preventDefault();
                handleToggleExpanded(branchId);
              } else {
                // Expanded branch: Move to its first child
                e.preventDefault();
                const nextIndex = currentIndex + 1;
                if (nextIndex < visibleItems.length) {
                  visibleItems[nextIndex]?.focus();
                  setFocusedId(visibleItems[nextIndex]?.dataset.nodeId ?? null);
                }
              }
            }
          }
          break;
        }

        case "ArrowLeft": {
          if (!activeEl) break;
          const branchRow = activeEl.closest('[data-branch-id]') as HTMLElement | null;
          if (branchRow && isExpanded(branchRow.dataset.branchId ?? "")) {
            // Expanded branch: Collapse it
            e.preventDefault();
            handleToggleExpanded(branchRow.dataset.branchId!);
          } else {
            // Leaf or collapsed branch: Move to parent branch
            const parentItem = activeEl.closest('[data-parent-id]') as HTMLElement | null;
            if (parentItem && parentItem.dataset.parentId) {
              e.preventDefault();
              const parentBranchNode = treeContainerRef.current?.querySelector<HTMLElement>(
                `[data-node-id="${parentItem.dataset.parentId}"]`
              );
              parentBranchNode?.focus();
              setFocusedId(parentItem.dataset.parentId);
            }
          }
          break;
        }
      }
    };

    const contextValue = React.useMemo<TreeNavigationContextValue>(
      () => ({
        expandedValues: currentExpandedSet,
        toggleExpanded: handleToggleExpanded,
        isExpanded,
        currentValue,
        isCurrent,
        intensity,
        showConnectors,
        indentation,
        focusedId,
        setFocusedId,
        registerItem,
        unregisterItem,
        treeContainerRef,
      }),
      [
        currentExpandedSet,
        handleToggleExpanded,
        isExpanded,
        currentValue,
        isCurrent,
        intensity,
        showConnectors,
        indentation,
        focusedId,
        setFocusedId,
        registerItem,
        unregisterItem,
      ]
    );

    return (
      <TreeNavigationContext.Provider value={contextValue}>
        <div
          ref={(node) => {
            treeContainerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          role="tree"
          aria-label="Hierarchical tree navigation"
          onKeyDown={handleKeyDown}
          data-slot="tree-navigation"
          data-intensity={intensity}
          className={cn(
            // Physical Optical Liquid Glass Engine
            "halo-liquid-glass-surface rounded-2xl",
            intensity === "subtle" && "p-2",
            intensity === "balanced" && "p-2.5",
            intensity === "rich" && "p-3",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TreeNavigationContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* TreeNavigationList                                                         */
/* -------------------------------------------------------------------------- */

export interface TreeNavigationListProps extends React.HTMLAttributes<HTMLUListElement> {}

export const TreeNavigationList = React.forwardRef<HTMLUListElement, TreeNavigationListProps>(
  function TreeNavigationList({ className, children, ...props }, ref) {
    return (
      <ul
        ref={ref}
        role="group"
        data-slot="tree-navigation-list"
        className={cn("flex flex-col gap-0.5 list-none m-0 p-0", className)}
        {...props}
      >
        {children}
      </ul>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* TreeNavigationBranch (Expandable Parent Node)                              */
/* -------------------------------------------------------------------------- */

export interface TreeNavigationBranchProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Unique stable identifier for this branch. Required for expansion and focus management.
   */
  value: string;
  /**
   * Primary visible text label for the branch.
   */
  label: React.ReactNode;
  /**
   * Optional leading Hugeicon.
   */
  icon?: IconSvgElement;
  /**
   * Optional navigable link destination if branch is both expandable and navigable.
   */
  href?: string;
  /**
   * Optional badge count or compact supporting metadata.
   */
  badge?: React.ReactNode;
  /**
   * If true, communicates that one of this branch's descendants matches the current route.
   */
  containsCurrent?: boolean;
}

export const TreeNavigationBranch = React.forwardRef<HTMLLIElement, TreeNavigationBranchProps>(
  function TreeNavigationBranch(
    {
      value,
      label,
      icon,
      href,
      badge,
      containsCurrent = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    const { isExpanded, toggleExpanded, indentation, focusedId, setFocusedId } = useTreeNavigation();
    const { depth, parentId } = React.useContext(TreeDepthContext);

    const expanded = isExpanded(value);
    const isFocused = focusedId === value;

    const handleTriggerClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleExpanded(value);
      setFocusedId(value);
    };

    return (
      <li
        ref={ref}
        role="treeitem"
        aria-expanded={expanded}
        data-branch-id={value}
        data-node-id={value}
        data-parent-id={parentId}
        data-depth={depth}
        data-contains-current={containsCurrent ? "true" : undefined}
        tabIndex={isFocused || (!focusedId && depth === 0) ? 0 : -1}
        className={cn("group/branch flex flex-col list-none m-0 p-0 outline-none", className)}
        {...props}
      >
        {/* Branch Trigger Row */}
        <div
          onClick={handleTriggerClick}
          style={{ paddingLeft: `${depth * indentation + 6}px` }}
          className={cn(
            // Layout & Geometry
            "relative flex items-center justify-between gap-2 py-1.5 pr-2.5 rounded-xl cursor-pointer select-none transition-all duration-150",
            // Interaction States
            "text-foreground/85 hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:backdrop-blur-xs",
            // High-Contrast Focus Ring
            "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-1 focus-visible:outline-none",
            // Ancestor of current route indicator (subtle optical glass tint without aria-current)
            containsCurrent && "font-semibold text-foreground bg-black/[0.03] dark:bg-white/[0.05]"
          )}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {/* Rotating Disclosure Chevron Indicator */}
            <span
              className={cn(
                "flex size-4 shrink-0 items-center justify-center text-muted-foreground transition-transform duration-200",
                expanded && "rotate-90 text-foreground"
              )}
            >
              <HaloIcon icon={ArrowRight01Icon} size={13} />
            </span>

            {/* Optional Branch Icon */}
            {icon && (
              <span className="shrink-0 text-muted-foreground group-hover/branch:text-foreground transition-colors">
                <HaloIcon icon={icon} size={15} />
              </span>
            )}

            {/* Branch Label or Optional Destination Link */}
            {href ? (
              <a
                href={href}
                onClick={(e) => e.stopPropagation()}
                className="truncate text-xs hover:underline outline-none"
              >
                {label}
              </a>
            ) : (
              <span className="truncate text-xs">{label}</span>
            )}
          </div>

          {/* Optional Badge */}
          {badge && (
            <span className="shrink-0 text-[10px] font-mono font-medium text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded border border-border/40">
              {badge}
            </span>
          )}
        </div>

        {/* Child Group with Depth Context */}
        {children && (
          <TreeDepthContext.Provider value={{ depth: depth + 1, parentId: value }}>
            <TreeNavigationGroup
              hidden={!expanded}
              aria-hidden={!expanded}
              className={cn(
                "transition-all duration-200 overflow-hidden",
                !expanded && "hidden"
              )}
            >
              {children}
            </TreeNavigationGroup>
          </TreeDepthContext.Provider>
        )}
      </li>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* TreeNavigationLink (Leaf Destination Node)                                 */
/* -------------------------------------------------------------------------- */

export interface TreeNavigationLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Unique stable identifier for this leaf (e.g. "/dashboard").
   */
  value: string;
  /**
   * Optional leading Hugeicon.
   */
  icon?: IconSvgElement;
  /**
   * Optional badge count or compact supporting metadata.
   */
  badge?: React.ReactNode;
}

export const TreeNavigationLink = React.forwardRef<HTMLAnchorElement, TreeNavigationLinkProps>(
  function TreeNavigationLink(
    {
      value,
      href,
      icon,
      badge,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) {
    const { isCurrent, indentation, focusedId, setFocusedId } = useTreeNavigation();
    const { depth, parentId } = React.useContext(TreeDepthContext);

    const active = isCurrent(value);
    const isFocused = focusedId === value;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      setFocusedId(value);
      onClick?.(e);
    };

    return (
      <li
        role="none"
        data-parent-id={parentId}
        className="list-none m-0 p-0"
      >
        <a
          ref={ref}
          href={href}
          role="treeitem"
          aria-current={active ? "page" : undefined}
          data-slot="tree-navigation-link"
          data-node-id={value}
          data-depth={depth}
          data-active={active ? "true" : undefined}
          tabIndex={isFocused ? 0 : -1}
          onClick={handleClick}
          style={{ paddingLeft: `${depth * indentation + 18}px` }}
          className={cn(
            // Layout & Geometry
            "group/link relative flex items-center justify-between gap-2 py-1.5 pr-2.5 rounded-xl text-xs select-none transition-all duration-150 outline-none cursor-pointer",
            // Normal State
            !active && "text-muted-foreground hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:backdrop-blur-xs",
            // Active / Current Destination (Apple Liquid Glass Pill)
            active && [
              "font-semibold text-foreground",
              "bg-black/[0.06] dark:bg-white/[0.12] backdrop-blur-xl backdrop-saturate-180",
              "border border-black/[0.08] dark:border-white/[0.16]",
              "shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.9),inset_0_-1px_1px_0_rgba(0,0,0,0.04),0_2px_8px_-2px_rgba(0,0,0,0.08)]",
              "dark:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.25),inset_0_-1px_1px_0_rgba(0,0,0,0.5),0_3px_12px_-2px_rgba(0,0,0,0.4)]",
            ],
            // High-Contrast Focus Ring
            "focus-visible:ring-2 focus-visible:ring-[var(--halo-focus-color)] focus-visible:ring-offset-1 focus-visible:outline-none",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {icon && (
              <span
                className={cn(
                  "shrink-0 transition-colors",
                  active ? "text-foreground" : "text-muted-foreground group-hover/link:text-foreground"
                )}
              >
                <HaloIcon icon={icon} size={15} />
              </span>
            )}
            <span className="truncate">{children}</span>
          </div>

          {badge && (
            <span
              className={cn(
                "shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded-md border leading-none transition-colors",
                active
                  ? "border-black/[0.12] dark:border-white/[0.16] bg-black/[0.06] dark:bg-white/[0.12] text-foreground font-semibold"
                  : "border-border/40 bg-muted/50 text-muted-foreground font-medium"
              )}
            >
              {badge}
            </span>
          )}
        </a>
      </li>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* TreeNavigationGroup (Nested Branch Container)                              */
/* -------------------------------------------------------------------------- */

export interface TreeNavigationGroupProps extends React.HTMLAttributes<HTMLUListElement> {}

export const TreeNavigationGroup = React.forwardRef<HTMLUListElement, TreeNavigationGroupProps>(
  function TreeNavigationGroup({ className, children, ...props }, ref) {
    const { showConnectors, indentation } = useTreeNavigation();
    const { depth } = React.useContext(TreeDepthContext);

    return (
      <ul
        ref={ref}
        role="group"
        data-slot="tree-navigation-group"
        className={cn(
          "relative flex flex-col gap-0.5 list-none m-0 p-0",
          // Decorative Subtle Connector Line
          showConnectors && [
            "before:content-[''] before:absolute before:top-0 before:bottom-1 before:w-px before:bg-border/50",
            "before:pointer-events-none",
          ],
          className
        )}
        style={{
          // Offset connector line by depth
          ...(showConnectors ? { ["--connector-left" as string]: `${(depth - 1) * indentation + 13}px` } : {}),
        }}
        {...props}
      >
        {children}
      </ul>
    );
  }
);

/* -------------------------------------------------------------------------- */
/* TreeNavigationItem (Generic Tree Node Wrapper)                             */
/* -------------------------------------------------------------------------- */

export interface TreeNavigationItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export const TreeNavigationItem = React.forwardRef<HTMLLIElement, TreeNavigationItemProps>(
  function TreeNavigationItem({ className, children, ...props }, ref) {
    return (
      <li
        ref={ref}
        role="treeitem"
        data-slot="tree-navigation-item"
        className={cn("list-none m-0 p-0", className)}
        {...props}
      >
        {children}
      </li>
    );
  }
);
