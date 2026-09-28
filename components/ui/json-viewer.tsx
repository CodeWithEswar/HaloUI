"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  ArrowRight01Icon,
  ArrowDown01Icon,
  CodeIcon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type JsonViewerVariant = "default" | "glass" | "plain";
export type JsonViewerSize = "sm" | "default" | "lg";

export interface JsonViewerProps extends React.ComponentProps<"div"> {
  /**
   * Parsed JSON-compatible data (object, array, or primitive).
   */
  data?: unknown;
  /**
   * Optional raw JSON string to parse safely.
   */
  json?: string;
  /**
   * Title or filename displayed in the toolbar (e.g. "response.json").
   */
  title?: string;
  /**
   * Default nesting depth to expand initially.
   * - 0: all collapsed.
   * - 1: root node expanded.
   * - 2: root and first child tier expanded (default).
   * - Infinity: all nodes expanded.
   * @default 2
   */
  defaultExpandedDepth?: number;
  /**
   * Visual framing variant:
   * - "default": Subtle border and stable background for dense layouts.
   * - "glass": Restrained HaloUI liquid glass outer shell with specular highlight.
   * - "plain": Borderless unpadded view for tight nesting inside cards/tabs.
   * @default "default"
   */
  variant?: JsonViewerVariant;
  /**
   * Typography and density scale:
   * - "sm": Compact 12px monospaced typography.
   * - "default": Standard 13px monospaced typography.
   * - "lg": Spacious 14px monospaced typography.
   * @default "default"
   */
  size?: JsonViewerSize;
  /**
   * Whether to show the header toolbar with title, item count, and copy button.
   * @default true
   */
  showToolbar?: boolean;
  /**
   * Whether to show copy button in toolbar.
   * @default true
   */
  showCopy?: boolean;
  /**
   * Whether to display item count badges on objects and arrays (e.g. "{ 4 keys }", "[ 12 items ]").
   * @default true
   */
  showItemCount?: boolean;
  /**
   * Optional maximum height with internal scrolling.
   */
  maxHeight?: string | number;
}

interface JsonNodeProps {
  name?: string;
  value: unknown;
  depth: number;
  defaultExpandedDepth: number;
  showItemCount: boolean;
  isLast?: boolean;
  expandTrigger?: number;
  collapseTrigger?: number;
}

/* -------------------------------------------------------------------------
 * HELPER: Safe JSON Value Serializer for Clipboard
 * ----------------------------------------------------------------------- */

function serializeForCopy(data: unknown, rawJson?: string): string {
  if (rawJson && typeof rawJson === "string") {
    try {
      // Pretty-print the raw JSON string
      const parsed = JSON.parse(rawJson);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return rawJson;
    }
  }

  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

/* -------------------------------------------------------------------------
 * 1. ROOT JSON VIEWER COMPONENT
 * Structured hierarchical JSON inspection primitive.
 * Container-aware (@container/json-viewer), accessible, and optically restrained.
 * ----------------------------------------------------------------------- */

export function JsonViewer({
  className,
  data,
  json,
  title,
  defaultExpandedDepth = 2,
  variant = "default",
  size = "default",
  showToolbar = true,
  showCopy = true,
  showItemCount = true,
  maxHeight,
  ...props
}: JsonViewerProps) {
  // Parse raw JSON string safely if provided
  const { parsedData, parseError } = React.useMemo(() => {
    if (json !== undefined) {
      try {
        const parsed = JSON.parse(json);
        return { parsedData: parsed, parseError: null };
      } catch (err) {
        return {
          parsedData: null,
          parseError: err instanceof Error ? err.message : "Malformed JSON syntax",
        };
      }
    }
    return { parsedData: data, parseError: null };
  }, [data, json]);

  // Global expand/collapse triggers
  const [expandTrigger, setExpandTrigger] = React.useState(0);
  const [collapseTrigger, setCollapseTrigger] = React.useState(0);

  const handleExpandAll = () => setExpandTrigger((prev) => prev + 1);
  const handleCollapseAll = () => setCollapseTrigger((prev) => prev + 1);

  const copyText = React.useMemo(
    () => serializeForCopy(parsedData, json),
    [parsedData, json]
  );

  return (
    <div
      data-slot="json-viewer"
      data-variant={variant}
      data-size={size}
      className={cn(
        // Container query boundary
        "@container/json-viewer group/json-viewer relative flex flex-col w-full min-w-0 overflow-hidden font-mono select-text",

        // Sizing tiers
        size === "sm" && "text-xs",
        size === "default" && "text-[13px] leading-relaxed",
        size === "lg" && "text-sm leading-relaxed",

        // Framing Variants
        variant === "default" && [
          "rounded-xl border border-border/80 bg-card/85 dark:bg-card/50 shadow-xs",
        ],
        variant === "glass" && [
          "rounded-xl border border-border/70 dark:border-white/12",
          "bg-card/75 dark:bg-card/40 backdrop-blur-md backdrop-saturate-150 halo-intensity-subtle",
          "shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_6px_20px_-3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]",
        ],
        variant === "plain" && "bg-transparent",

        className
      )}
      {...props}
    >
      {/* Header Toolbar */}
      {showToolbar && (
        <div
          data-slot="json-viewer-toolbar"
          className={cn(
            "flex flex-wrap items-center justify-between gap-2 border-b border-border/60 px-3 py-2 min-h-10",
            variant === "glass" && "bg-white/40 dark:bg-white/[0.03] backdrop-blur-xs",
            variant === "default" && "bg-muted/40 dark:bg-muted/20"
          )}
        >
          <div className="flex items-center gap-2 min-w-0">
            <HaloIcon icon={CodeIcon} size={15} className="text-muted-foreground shrink-0" />
            <span className="font-semibold text-xs text-foreground truncate">
              {title ?? "JSON Data"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleExpandAll}
              className="text-[11px] font-medium text-muted-foreground hover:text-foreground px-2 py-0.5 rounded-md hover:bg-muted/60 transition-colors cursor-pointer"
              title="Expand all nodes"
            >
              Expand all
            </button>
            <span className="text-border text-xs" aria-hidden="true">&bull;</span>
            <button
              type="button"
              onClick={handleCollapseAll}
              className="text-[11px] font-medium text-muted-foreground hover:text-foreground px-2 py-0.5 rounded-md hover:bg-muted/60 transition-colors cursor-pointer"
              title="Collapse all nodes"
            >
              Collapse all
            </button>

            {showCopy && (
              <CopyButton
                value={copyText}
                variant="ghost"
                size="sm"
                className="ml-1 size-7 rounded-md text-muted-foreground hover:text-foreground"
                aria-label="Copy formatted JSON to clipboard"
              />
            )}
          </div>
        </div>
      )}

      {/* Parse Error Display */}
      {parseError ? (
        <div className="flex items-start gap-2.5 p-4 text-xs text-destructive bg-destructive/10 border-l-2 border-destructive">
          <HaloIcon icon={AlertCircleIcon} size={16} className="shrink-0 mt-0.5" />
          <div className="space-y-1 min-w-0">
            <span className="font-semibold block">Invalid JSON Syntax</span>
            <p className="text-muted-foreground font-mono">{parseError}</p>
          </div>
        </div>
      ) : (
        /* JSON Tree Content Viewport */
        <div
          data-slot="json-viewer-content"
          tabIndex={0}
          aria-label={title ? `${title} JSON tree` : "JSON structured tree"}
          style={{ maxHeight }}
          className={cn(
            "w-full min-w-0 overflow-auto p-3.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40",
            maxHeight && "overscroll-contain"
          )}
        >
          <JsonNode
            value={parsedData}
            depth={0}
            defaultExpandedDepth={defaultExpandedDepth}
            showItemCount={showItemCount}
            isLast={true}
            expandTrigger={expandTrigger}
            collapseTrigger={collapseTrigger}
          />
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 2. RECURSIVE NODE RENDERER
 * Handles Objects, Arrays, and Primitive types with proper expansion state.
 * ----------------------------------------------------------------------- */

function JsonNode({
  name,
  value,
  depth,
  defaultExpandedDepth,
  showItemCount,
  isLast = true,
  expandTrigger = 0,
  collapseTrigger = 0,
}: JsonNodeProps) {
  const isObject = value !== null && typeof value === "object" && !Array.isArray(value);
  const isArray = Array.isArray(value);
  const isContainer = isObject || isArray;

  // Determine initial expansion state based on depth
  const [isExpanded, setIsExpanded] = React.useState<boolean>(
    depth < defaultExpandedDepth
  );

  // Sync with global Expand All / Collapse All triggers
  React.useEffect(() => {
    if (expandTrigger > 0) setIsExpanded(true);
  }, [expandTrigger]);

  React.useEffect(() => {
    if (collapseTrigger > 0) setIsExpanded(false);
  }, [collapseTrigger]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  // Render Primitive values directly
  if (!isContainer) {
    return (
      <div className="flex items-baseline gap-1 py-0.5 min-w-0 flex-wrap @[320px]/json-viewer:flex-nowrap">
        {name !== undefined && (
          <span className="text-foreground/90 font-medium shrink-0">
            <span className="text-muted-foreground/70">&quot;</span>
            <span className="text-sky-700 dark:text-sky-300">{name}</span>
            <span className="text-muted-foreground/70">&quot;</span>
            <span className="text-muted-foreground/60 mr-1.5">:</span>
          </span>
        )}
        <JsonPrimitiveValue value={value} />
        {!isLast && <span className="text-muted-foreground/60 select-none">,</span>}
      </div>
    );
  }

  // Container (Object or Array) handling
  const entries = isObject ? Object.entries(value as Record<string, unknown>) : [];
  const items = isArray ? (value as unknown[]) : [];
  const itemCount = isObject ? entries.length : items.length;
  const openBracket = isObject ? "{" : "[";
  const closeBracket = isObject ? "}" : "]";
  const emptyLabel = isObject ? "{}" : "[]";

  // Empty container rendering
  if (itemCount === 0) {
    return (
      <div className="flex items-baseline gap-1 py-0.5 min-w-0">
        {name !== undefined && (
          <span className="text-foreground/90 font-medium shrink-0">
            <span className="text-muted-foreground/70">&quot;</span>
            <span className="text-sky-700 dark:text-sky-300">{name}</span>
            <span className="text-muted-foreground/70">&quot;</span>
            <span className="text-muted-foreground/60 mr-1.5">:</span>
          </span>
        )}
        <span className="text-muted-foreground font-semibold">{emptyLabel}</span>
        {!isLast && <span className="text-muted-foreground/60 select-none">,</span>}
      </div>
    );
  }

  return (
    <div className="min-w-0 flex flex-col py-0.5">
      {/* Container Header / Disclosure Row */}
      <div className="flex items-center gap-1 min-w-0 group/row">
        {/* Expand / Collapse Disclosure Button */}
        <button
          type="button"
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          aria-label={
            isExpanded
              ? `Collapse ${name ? `property "${name}"` : "node"}`
              : `Expand ${name ? `property "${name}"` : "node"}`
          }
          className="size-4 -ml-1 flex items-center justify-center rounded text-muted-foreground/70 hover:text-foreground hover:bg-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary shrink-0 cursor-pointer"
        >
          <HaloIcon
            icon={isExpanded ? ArrowDown01Icon : ArrowRight01Icon}
            size={12}
            className="transition-transform duration-100"
          />
        </button>

        {/* Optional Property Name */}
        {name !== undefined && (
          <span
            onClick={toggleExpand}
            className="text-foreground/90 font-medium shrink-0 cursor-pointer select-none"
          >
            <span className="text-muted-foreground/70">&quot;</span>
            <span className="text-sky-700 dark:text-sky-300">{name}</span>
            <span className="text-muted-foreground/70">&quot;</span>
            <span className="text-muted-foreground/60 mr-1">:</span>
          </span>
        )}

        {/* Opening Bracket / Collapsed Summary */}
        <span className="text-muted-foreground/80 font-semibold select-none">
          {openBracket}
        </span>

        {!isExpanded && (
          <span
            onClick={toggleExpand}
            className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-muted/50 hover:bg-muted text-[11px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors select-none"
          >
            <span>&hellip;</span>
            {showItemCount && (
              <span className="text-[10px] font-normal opacity-80">
                {itemCount} {isObject ? (itemCount === 1 ? "key" : "keys") : (itemCount === 1 ? "item" : "items")}
              </span>
            )}
          </span>
        )}

        {!isExpanded && (
          <span className="text-muted-foreground/80 font-semibold select-none">
            {closeBracket}
            {!isLast && <span className="text-muted-foreground/60">,</span>}
          </span>
        )}

        {isExpanded && showItemCount && (
          <span className="text-[10px] text-muted-foreground/60 font-normal select-none pl-1">
            {itemCount} {isObject ? (itemCount === 1 ? "key" : "keys") : (itemCount === 1 ? "item" : "items")}
          </span>
        )}
      </div>

      {/* Expanded Children Container with Restrained Tokenized Indentation */}
      {isExpanded && (
        <div className="pl-3 sm:pl-4 border-l border-border/40 ml-1 mt-0.5 space-y-0.5 min-w-0">
          {isObject &&
            entries.map(([key, val], idx) => (
              <JsonNode
                key={key}
                name={key}
                value={val}
                depth={depth + 1}
                defaultExpandedDepth={defaultExpandedDepth}
                showItemCount={showItemCount}
                isLast={idx === entries.length - 1}
                expandTrigger={expandTrigger}
                collapseTrigger={collapseTrigger}
              />
            ))}

          {isArray &&
            items.map((val, idx) => (
              <JsonNode
                key={idx}
                value={val}
                depth={depth + 1}
                defaultExpandedDepth={defaultExpandedDepth}
                showItemCount={showItemCount}
                isLast={idx === items.length - 1}
                expandTrigger={expandTrigger}
                collapseTrigger={collapseTrigger}
              />
            ))}
        </div>
      )}

      {/* Closing Bracket */}
      {isExpanded && (
        <div className="text-muted-foreground/80 font-semibold select-none pt-0.5">
          {closeBracket}
          {!isLast && <span className="text-muted-foreground/60">,</span>}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * 3. PRIMITIVE VALUE FORMATTER
 * Renders strings, numbers, booleans, and null with distinct semantic colors.
 * ----------------------------------------------------------------------- */

function JsonPrimitiveValue({ value }: { value: unknown }) {
  // String
  if (typeof value === "string") {
    return (
      <span className="text-emerald-700 dark:text-emerald-400 break-words min-w-0">
        <span className="text-emerald-600/70 dark:text-emerald-500/70 select-none">&quot;</span>
        <span>{value}</span>
        <span className="text-emerald-600/70 dark:text-emerald-500/70 select-none">&quot;</span>
      </span>
    );
  }

  // Number
  if (typeof value === "number") {
    return (
      <span className="text-amber-700 dark:text-amber-400 tabular-nums font-semibold">
        {String(value)}
      </span>
    );
  }

  // Boolean
  if (typeof value === "boolean") {
    return (
      <span className="text-purple-700 dark:text-purple-400 font-semibold">
        {value ? "true" : "false"}
      </span>
    );
  }

  // Null
  if (value === null) {
    return (
      <span className="text-rose-700 dark:text-rose-400 italic font-medium opacity-90">
        null
      </span>
    );
  }

  // Undefined or unknown fallback
  return <span className="text-muted-foreground">{String(value)}</span>;
}
