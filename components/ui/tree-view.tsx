"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ArrowRight01Icon,
  ArrowDown01Icon,
  Folder01Icon,
  FolderOpenIcon,
  File01Icon,
} from "@hugeicons/core-free-icons";
import { Checkbox } from "@/components/ui/checkbox";

/* -------------------------------------------------------------------------- */
/* TYPES & INTERFACES                                                         */
/* -------------------------------------------------------------------------- */

export type TreeViewVariant = "default" | "glass" | "plain";
export type TreeViewSize = "sm" | "default" | "lg";
export type TreeViewSelectionMode = "none" | "single" | "multiple";

export interface TreeNode {
  /** Unique identifier for the node */
  id: string;
  /** Primary label displayed in the tree row */
  label: string;
  /** Optional icon displayed before label */
  icon?: React.ReactNode;
  /** Optional custom icon when branch is expanded */
  expandedIcon?: React.ReactNode;
  /** Child nodes */
  children?: TreeNode[];
  /** Optional metadata badge, tag, or label */
  badge?: React.ReactNode;
  /** Whether the node is disabled from selection/interaction */
  disabled?: boolean;
  /** Optional trailing action controls */
  actions?: React.ReactNode;
  /** Arbitrary consumer metadata */
  data?: Record<string, unknown>;
}

interface TreeViewContextValue {
  expandedIds: Set<string>;
  toggleExpanded: (id: string) => void;
  isExpanded: (id: string) => boolean;
  expandAll: () => void;
  collapseAll: () => void;
  selectedIds: Set<string>;
  toggleSelected: (id: string) => void;
  isSelected: (id: string) => boolean;
  selectionMode: TreeViewSelectionMode;
  size: TreeViewSize;
  variant: TreeViewVariant;
  showConnectors: boolean;
  indentation: number;
  showCheckboxes: boolean;
  focusedId: string | null;
  setFocusedId: (id: string | null) => void;
  treeContainerRef: React.RefObject<HTMLDivElement | null>;
}

const TreeViewContext = React.createContext<TreeViewContextValue | null>(null);

export function useTreeViewContext() {
  const context = React.useContext(TreeViewContext);
  if (!context) {
    throw new Error("TreeView compound components must be used within <TreeView />");
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
/* TREE VIEW ROOT                                                             */
/* -------------------------------------------------------------------------- */

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Data-driven node hierarchy */
  nodes?: TreeNode[];
  /** Controlled array of expanded node IDs */
  expandedIds?: string[];
  /** Initial array of expanded node IDs for uncontrolled usage */
  defaultExpandedIds?: string[];
  /** Callback fired when expanded node IDs change */
  onExpandedIdsChange?: (ids: string[]) => void;
  /** Controlled array of selected node IDs */
  selectedIds?: string[];
  /** Initial array of selected node IDs for uncontrolled usage */
  defaultSelectedIds?: string[];
  /** Callback fired when selected node IDs change */
  onSelectedIdsChange?: (ids: string[]) => void;
  /** Selection mode: "none" | "single" | "multiple" @default "none" */
  selectionMode?: TreeViewSelectionMode;
  /** Whether to render accessible checkboxes alongside node labels @default false */
  showCheckboxes?: boolean;
  /** Visual framing variant: "default" | "glass" | "plain" @default "default" */
  variant?: TreeViewVariant;
  /** Size density scale: "sm" | "default" | "lg" @default "default" */
  size?: TreeViewSize;
  /** Whether to show hairline guide connector lines for nested groups @default true */
  showConnectors?: boolean;
  /** Horizontal indentation in pixels per depth tier @default 16 */
  indentation?: number;
}

export const TreeView = React.forwardRef<HTMLDivElement, TreeViewProps>(
  function TreeView(
    {
      nodes,
      expandedIds: controlledExpanded,
      defaultExpandedIds = [],
      onExpandedIdsChange,
      selectedIds: controlledSelected,
      defaultSelectedIds = [],
      onSelectedIdsChange,
      selectionMode = "none",
      showCheckboxes = false,
      variant = "default",
      size = "default",
      showConnectors = true,
      indentation = 16,
      className,
      children,
      ...props
    },
    forwardedRef
  ) {
    const internalTreeRef = React.useRef<HTMLDivElement | null>(null);
    const combinedTreeRef = (node: HTMLDivElement | null) => {
      internalTreeRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    // Uncontrolled expansion state
    const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState<Set<string>>(
      () => new Set(defaultExpandedIds)
    );
    const isExpandedControlled = controlledExpanded !== undefined;
    const currentExpandedSet = React.useMemo(() => {
      return isExpandedControlled ? new Set(controlledExpanded) : uncontrolledExpanded;
    }, [isExpandedControlled, controlledExpanded, uncontrolledExpanded]);

    // Uncontrolled selection state
    const [uncontrolledSelected, setUncontrolledSelected] = React.useState<Set<string>>(
      () => new Set(defaultSelectedIds)
    );
    const isSelectedControlled = controlledSelected !== undefined;
    const currentSelectedSet = React.useMemo(() => {
      return isSelectedControlled ? new Set(controlledSelected) : uncontrolledSelected;
    }, [isSelectedControlled, controlledSelected, uncontrolledSelected]);

    // Active focused node for roving tabindex
    const [focusedId, setFocusedId] = React.useState<string | null>(null);

    const toggleExpanded = React.useCallback(
      (id: string) => {
        const next = new Set(currentExpandedSet);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        if (!isExpandedControlled) {
          setUncontrolledExpanded(next);
        }
        onExpandedIdsChange?.(Array.from(next));
      },
      [currentExpandedSet, isExpandedControlled, onExpandedIdsChange]
    );

    const isExpanded = React.useCallback(
      (id: string) => currentExpandedSet.has(id),
      [currentExpandedSet]
    );

    // Expand all / collapse all
    const expandAll = React.useCallback(() => {
      if (!internalTreeRef.current) return;
      const allBranchElements = internalTreeRef.current.querySelectorAll<HTMLElement>("[data-node-id]");
      const allIds = new Set<string>();
      allBranchElements.forEach((el) => {
        if (el.dataset.nodeId) allIds.add(el.dataset.nodeId);
      });
      if (!isExpandedControlled) {
        setUncontrolledExpanded(allIds);
      }
      onExpandedIdsChange?.(Array.from(allIds));
    }, [isExpandedControlled, onExpandedIdsChange]);

    const collapseAll = React.useCallback(() => {
      const empty = new Set<string>();
      if (!isExpandedControlled) {
        setUncontrolledExpanded(empty);
      }
      onExpandedIdsChange?.([]);
    }, [isExpandedControlled, onExpandedIdsChange]);

    const toggleSelected = React.useCallback(
      (id: string) => {
        if (selectionMode === "none") return;
        let next: Set<string>;
        if (selectionMode === "single") {
          next = currentSelectedSet.has(id) ? new Set() : new Set([id]);
        } else {
          next = new Set(currentSelectedSet);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
        }
        if (!isSelectedControlled) {
          setUncontrolledSelected(next);
        }
        onSelectedIdsChange?.(Array.from(next));
      },
      [selectionMode, currentSelectedSet, isSelectedControlled, onSelectedIdsChange]
    );

    const isSelected = React.useCallback(
      (id: string) => currentSelectedSet.has(id),
      [currentSelectedSet]
    );

    // Visible focusable treeitems query for roving tabindex
    const getVisibleTreeItems = React.useCallback((): HTMLElement[] => {
      if (!internalTreeRef.current) return [];
      const nodes = internalTreeRef.current.querySelectorAll<HTMLElement>(
        '[role="treeitem"]:not([aria-hidden="true"])'
      );
      return Array.from(nodes).filter((node) => {
        return node.offsetParent !== null && !node.closest('[aria-hidden="true"]');
      });
    }, []);

    // Set initial focusedId to first item if none set
    React.useEffect(() => {
      if (!focusedId) {
        const visible = getVisibleTreeItems();
        if (visible[0]?.dataset.nodeId) {
          setFocusedId(visible[0].dataset.nodeId);
        }
      }
    }, [focusedId, getVisibleTreeItems]);

    // WAI-ARIA Tree View Keyboard Navigation Handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const visibleItems = getVisibleTreeItems();
      if (!visibleItems.length) return;

      const activeEl = document.activeElement as HTMLElement | null;
      const currentIndex = visibleItems.findIndex(
        (item) => item === activeEl || item.contains(activeEl)
      );

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const nextIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0;
          const target = visibleItems[nextIndex];
          target?.focus();
          setFocusedId(target?.dataset.nodeId ?? null);
          break;
        }

        case "ArrowUp": {
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1;
          const target = visibleItems[prevIndex];
          target?.focus();
          setFocusedId(target?.dataset.nodeId ?? null);
          break;
        }

        case "Home": {
          e.preventDefault();
          const target = visibleItems[0];
          target?.focus();
          setFocusedId(target?.dataset.nodeId ?? null);
          break;
        }

        case "End": {
          e.preventDefault();
          const target = visibleItems[visibleItems.length - 1];
          target?.focus();
          setFocusedId(target?.dataset.nodeId ?? null);
          break;
        }

        case "ArrowRight": {
          if (!activeEl) break;
          const currentItem = activeEl.closest("[data-node-id]") as HTMLElement | null;
          if (currentItem) {
            const id = currentItem.dataset.nodeId;
            const isBranch = currentItem.dataset.isBranch === "true";
            if (isBranch && id) {
              if (!isExpanded(id)) {
                // Collapsed branch: Expand it
                e.preventDefault();
                toggleExpanded(id);
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
          const currentItem = activeEl.closest("[data-node-id]") as HTMLElement | null;
          if (currentItem) {
            const id = currentItem.dataset.nodeId;
            const isBranch = currentItem.dataset.isBranch === "true";
            if (isBranch && id && isExpanded(id)) {
              // Expanded branch: Collapse it
              e.preventDefault();
              toggleExpanded(id);
            } else {
              // Collapsed branch or leaf: Move focus to parent branch
              const parentId = currentItem.dataset.parentId;
              if (parentId && internalTreeRef.current) {
                e.preventDefault();
                const parentNode = internalTreeRef.current.querySelector<HTMLElement>(
                  `[data-node-id="${parentId}"]`
                );
                parentNode?.focus();
                setFocusedId(parentId);
              }
            }
          }
          break;
        }

        case "Enter":
        case " ": {
          // Do not hijack button or link keypress inside actions
          if (activeEl?.tagName === "BUTTON" && activeEl.dataset.actionButton === "true") {
            return;
          }
          const currentItem = activeEl?.closest("[data-node-id]") as HTMLElement | null;
          if (currentItem) {
            e.preventDefault();
            const id = currentItem.dataset.nodeId;
            const isBranch = currentItem.dataset.isBranch === "true";
            if (id) {
              if (selectionMode !== "none") {
                toggleSelected(id);
              } else if (isBranch) {
                toggleExpanded(id);
              }
            }
          }
          break;
        }
      }
    };

    const contextValue: TreeViewContextValue = React.useMemo(
      () => ({
        expandedIds: currentExpandedSet,
        toggleExpanded,
        isExpanded,
        expandAll,
        collapseAll,
        selectedIds: currentSelectedSet,
        toggleSelected,
        isSelected,
        selectionMode,
        size,
        variant,
        showConnectors,
        indentation,
        showCheckboxes,
        focusedId,
        setFocusedId,
        treeContainerRef: internalTreeRef,
      }),
      [
        currentExpandedSet,
        toggleExpanded,
        isExpanded,
        expandAll,
        collapseAll,
        currentSelectedSet,
        toggleSelected,
        isSelected,
        selectionMode,
        size,
        variant,
        showConnectors,
        indentation,
        showCheckboxes,
        focusedId,
      ]
    );

    return (
      <TreeViewContext.Provider value={contextValue}>
        <div
          ref={combinedTreeRef}
          role="tree"
          aria-multiselectable={selectionMode === "multiple" ? true : undefined}
          onKeyDown={handleKeyDown}
          className={cn(
            "@container/tree-view w-full select-none outline-none font-sans text-foreground",
            variant === "glass" &&
              "halo-surface halo-surface-subtle border border-white/10 dark:border-white/5 backdrop-blur-md rounded-2xl p-2.5 shadow-sm",
            variant === "default" &&
              "rounded-2xl border border-border bg-card/60 p-2.5 shadow-2xs",
            variant === "plain" && "p-0",
            className
          )}
          {...props}
        >
          {nodes ? <TreeViewDataRenderer nodes={nodes} /> : children}
        </div>
      </TreeViewContext.Provider>
    );
  }
);
TreeView.displayName = "TreeView";

/* -------------------------------------------------------------------------- */
/* DATA-DRIVEN RECURSIVE RENDERER                                             */
/* -------------------------------------------------------------------------- */

function TreeViewDataRenderer({ nodes }: { nodes: TreeNode[] }) {
  return (
    <>
      {nodes.map((node) => {
        const hasChildren = Boolean(node.children && node.children.length > 0);
        if (hasChildren) {
          return (
            <TreeBranch
              key={node.id}
              id={node.id}
              label={node.label}
              icon={node.icon}
              expandedIcon={node.expandedIcon}
              badge={node.badge}
              disabled={node.disabled}
              actions={node.actions}
            >
              <TreeViewDataRenderer nodes={node.children!} />
            </TreeBranch>
          );
        }

        return (
          <TreeLeaf
            key={node.id}
            id={node.id}
            label={node.label}
            icon={node.icon}
            badge={node.badge}
            disabled={node.disabled}
            actions={node.actions}
          />
        );
      })}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* TREE BRANCH (PARENT / FOLDER NODE)                                         */
/* -------------------------------------------------------------------------- */

export interface TreeBranchProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  expandedIcon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  actions?: React.ReactNode;
}

export const TreeBranch = React.forwardRef<HTMLDivElement, TreeBranchProps>(
  function TreeBranch(
    { id, label, icon, expandedIcon, badge, disabled = false, actions, className, children, ...props },
    ref
  ) {
    const {
      isExpanded,
      toggleExpanded,
      isSelected,
      toggleSelected,
      selectionMode,
      size,
      indentation,
      showConnectors,
      showCheckboxes,
      focusedId,
      setFocusedId,
    } = useTreeViewContext();
    const { depth, parentId } = React.useContext(TreeDepthContext);

    const expanded = isExpanded(id);
    const selected = isSelected(id);
    const isFocused = focusedId === id;

    const handleRowClick = (e: React.MouseEvent) => {
      // Do not toggle if user clicked inside trailing action button or checkbox
      if ((e.target as HTMLElement).closest("button") && !(e.target as HTMLElement).closest("[data-disclosure-btn]")) {
        return;
      }
      if (disabled) return;
      setFocusedId(id);
      if (selectionMode !== "none" && !showCheckboxes) {
        toggleSelected(id);
      } else {
        toggleExpanded(id);
      }
    };

    const handleDisclosureClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      setFocusedId(id);
      toggleExpanded(id);
    };

    const handleCheckboxChange = (checked: boolean | "indeterminate") => {
      if (disabled) return;
      toggleSelected(id);
    };

    const paddingLeft = depth * indentation;

    return (
      <div
        ref={ref}
        data-node-id={id}
        data-parent-id={parentId}
        data-is-branch="true"
        role="treeitem"
        aria-expanded={expanded}
        aria-selected={selectionMode !== "none" ? selected : undefined}
        aria-disabled={disabled || undefined}
        aria-level={depth + 1}
        tabIndex={isFocused ? 0 : -1}
        onFocus={() => setFocusedId(id)}
        className={cn("group/branch flex flex-col w-full min-w-0 outline-none", className)}
        {...props}
      >
        {/* Node Interactive Row */}
        <div
          onClick={handleRowClick}
          style={{ paddingLeft: `${paddingLeft + 6}px` }}
          className={cn(
            "flex items-center justify-between gap-2 rounded-lg cursor-pointer transition-colors duration-150 select-none min-w-0 pr-2 py-1",
            // Density scale sizing
            size === "sm" && "text-xs py-0.5 min-h-[28px]",
            size === "default" && "text-xs sm:text-[13px] py-1 min-h-[32px]",
            size === "lg" && "text-sm py-1.5 min-h-[36px]",
            // Focus state
            isFocused && "ring-2 ring-ring ring-offset-1 ring-offset-background outline-none",
            // Selection state vs hover state
            selected
              ? "bg-primary/10 text-primary font-medium dark:bg-primary/15"
              : "hover:bg-muted/70 text-foreground dark:hover:bg-muted/40",
            disabled && "opacity-50 pointer-events-none cursor-not-allowed"
          )}
        >
          {/* Leading Section: Disclosure + Checkbox + Icon + Label */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            {/* Accessible Disclosure Affordance */}
            <button
              type="button"
              data-disclosure-btn="true"
              onClick={handleDisclosureClick}
              aria-label={expanded ? `Collapse ${label}` : `Expand ${label}`}
              className={cn(
                "size-5 rounded flex items-center justify-center text-muted-foreground/80 hover:text-foreground transition-transform duration-200 shrink-0 cursor-pointer",
                expanded && "rotate-90 text-foreground"
              )}
            >
              <HaloIcon icon={ArrowRight01Icon} size={13} />
            </button>

            {/* Optional Checkbox */}
            {showCheckboxes && selectionMode !== "none" && (
              <div onClick={(e) => e.stopPropagation()} className="shrink-0 flex items-center">
                <Checkbox
                  checked={selected}
                  onCheckedChange={handleCheckboxChange}
                  disabled={disabled}
                  aria-label={`Select ${label}`}
                />
              </div>
            )}

            {/* Branch Icon (Folder or custom) */}
            <span className="shrink-0 text-muted-foreground group-hover/branch:text-foreground transition-colors flex items-center">
              {expanded
                ? expandedIcon ?? icon ?? <HaloIcon icon={FolderOpenIcon} size={15} className="text-amber-500/90" />
                : icon ?? <HaloIcon icon={Folder01Icon} size={15} className="text-amber-500/80" />}
            </span>

            {/* Label */}
            <span className="truncate min-w-0 font-medium tracking-tight flex-1">
              {label}
            </span>
          </div>

          {/* Trailing Section: Badges & Actions */}
          {(badge || actions) && (
            <div className="flex items-center gap-1.5 shrink-0 pl-1">
              {badge && (
                <span className="text-[11px] text-muted-foreground font-mono shrink-0">
                  {badge}
                </span>
              )}
              {actions && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 flex items-center gap-1"
                >
                  {actions}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Group Children Container */}
        {expanded && (
          <TreeDepthContext.Provider value={{ depth: depth + 1, parentId: id }}>
            <div
              role="group"
              style={{
                marginLeft: `${paddingLeft + 15}px`,
                paddingLeft: "4px",
              }}
              className={cn(
                "relative flex flex-col min-w-0 mt-0.5",
                showConnectors && "border-l border-border/40 dark:border-border/30"
              )}
            >
              {children}
            </div>
          </TreeDepthContext.Provider>
        )}
      </div>
    );
  }
);
TreeBranch.displayName = "TreeBranch";

/* -------------------------------------------------------------------------- */
/* TREE LEAF (FILE / ITEM / TERMINAL NODE)                                    */
/* -------------------------------------------------------------------------- */

export interface TreeLeafProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  actions?: React.ReactNode;
}

export const TreeLeaf = React.forwardRef<HTMLDivElement, TreeLeafProps>(
  function TreeLeaf(
    { id, label, icon, badge, disabled = false, actions, className, ...props },
    ref
  ) {
    const {
      isSelected,
      toggleSelected,
      selectionMode,
      size,
      indentation,
      showCheckboxes,
      focusedId,
      setFocusedId,
    } = useTreeViewContext();
    const { depth, parentId } = React.useContext(TreeDepthContext);

    const selected = isSelected(id);
    const isFocused = focusedId === id;

    const handleRowClick = (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      if (disabled) return;
      setFocusedId(id);
      if (selectionMode !== "none") {
        toggleSelected(id);
      }
    };

    const handleCheckboxChange = (checked: boolean | "indeterminate") => {
      if (disabled) return;
      toggleSelected(id);
    };

    const paddingLeft = depth * indentation;

    return (
      <div
        ref={ref}
        data-node-id={id}
        data-parent-id={parentId}
        data-is-branch="false"
        role="treeitem"
        aria-selected={selectionMode !== "none" ? selected : undefined}
        aria-disabled={disabled || undefined}
        aria-level={depth + 1}
        tabIndex={isFocused ? 0 : -1}
        onFocus={() => setFocusedId(id)}
        onClick={handleRowClick}
        style={{ paddingLeft: `${paddingLeft + 6}px` }}
        className={cn(
          "group/leaf flex items-center justify-between gap-2 rounded-lg cursor-pointer transition-colors duration-150 select-none min-w-0 pr-2 py-1 outline-none",
          // Density scale sizing
          size === "sm" && "text-xs py-0.5 min-h-[28px]",
          size === "default" && "text-xs sm:text-[13px] py-1 min-h-[32px]",
          size === "lg" && "text-sm py-1.5 min-h-[36px]",
          // Focus ring
          isFocused && "ring-2 ring-ring ring-offset-1 ring-offset-background outline-none",
          // Selection state vs hover state
          selected
            ? "bg-primary/10 text-primary font-medium dark:bg-primary/15"
            : "hover:bg-muted/70 text-foreground dark:hover:bg-muted/40",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed",
          className
        )}
        {...props}
      >
        {/* Leading Section: Spacer (No fake disclosure) + Checkbox + Icon + Label */}
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          {/* Spacer to align leaf icons with branch folder icons (Strictly NO fake disclosure button!) */}
          <span className="size-5 shrink-0" aria-hidden="true" />

          {/* Optional Checkbox */}
          {showCheckboxes && selectionMode !== "none" && (
            <div onClick={(e) => e.stopPropagation()} className="shrink-0 flex items-center">
              <Checkbox
                checked={selected}
                onCheckedChange={handleCheckboxChange}
                disabled={disabled}
                aria-label={`Select ${label}`}
              />
            </div>
          )}

          {/* Leaf Icon */}
          <span className="shrink-0 text-muted-foreground/80 group-hover/leaf:text-foreground transition-colors flex items-center">
            {icon ?? <HaloIcon icon={File01Icon} size={15} />}
          </span>

          {/* Label */}
          <span className="truncate min-w-0 text-foreground/90 group-hover/leaf:text-foreground flex-1">
            {label}
          </span>
        </div>

        {/* Trailing Section: Badges & Actions */}
        {(badge || actions) && (
          <div className="flex items-center gap-1.5 shrink-0 pl-1">
            {badge && (
              <span className="text-[11px] text-muted-foreground font-mono shrink-0">
                {badge}
              </span>
            )}
            {actions && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 flex items-center gap-1"
              >
                {actions}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);
TreeLeaf.displayName = "TreeLeaf";
