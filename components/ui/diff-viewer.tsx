"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  File01Icon,
  GitCommitIcon,
  Layers01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type DiffViewMode = "unified" | "split";
export type DiffViewerVariant = "default" | "glass" | "plain";
export type DiffViewerSize = "sm" | "default" | "lg";
export type DiffLineType = "added" | "deleted" | "unchanged";

export interface DiffLine {
  type: DiffLineType;
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

export interface SplitDiffRow {
  left?: {
    lineNumber: number;
    content: string;
    type: "deleted" | "unchanged";
  };
  right?: {
    lineNumber: number;
    content: string;
    type: "added" | "unchanged";
  };
}

export interface DiffViewerProps extends React.ComponentProps<"div"> {
  /**
   * The original / before code string.
   */
  oldCode: string;
  /**
   * The modified / after code string.
   */
  newCode: string;
  /**
   * Optional file name displayed in the toolbar (e.g. "button.tsx").
   */
  filename?: string;
  /**
   * Optional label for original state (e.g. "v1.0" or "HEAD~1").
   */
  oldFilename?: string;
  /**
   * Optional label for modified state (e.g. "v2.0" or "HEAD").
   */
  newFilename?: string;
  /**
   * Presentation layout mode:
   * - "unified": Single column with inline additions (+) and deletions (-).
   * - "split": Side-by-side two column comparison with synchronized rows.
   * @default "unified"
   */
  viewMode?: DiffViewMode;
  /**
   * Visual framing variant:
   * - "default": Subtle border and stable background for dense developer dashboards.
   * - "glass": Restrained HaloUI liquid glass outer shell with specular highlight rim.
   * - "plain": Frameless unbordered display for nesting inside Cards or Tabs.
   * @default "default"
   */
  variant?: DiffViewerVariant;
  /**
   * Typography and density scale:
   * - "sm": Compact 12px monospaced typography.
   * - "default": Standard 13px monospaced typography.
   * - "lg": Spacious 14px monospaced typography.
   * @default "default"
   */
  size?: DiffViewerSize;
  /**
   * Whether to display tabular, unselectable line numbers in the gutter.
   * @default true
   */
  showLineNumbers?: boolean;
  /**
   * Whether to display the toolbar header with filename, statistics, view mode toggle, and copy action.
   * @default true
   */
  showToolbar?: boolean;
  /**
   * Whether to display addition (+) and deletion (-) count badges.
   * @default true
   */
  showStats?: boolean;
  /**
   * Whether to show copy button in toolbar.
   * @default true
   */
  showCopy?: boolean;
  /**
   * Whether long lines wrap onto subsequent lines (true) or scroll horizontally inside the container (false).
   * @default false
   */
  wrap?: boolean;
  /**
   * Optional maximum height with internal scrolling.
   */
  maxHeight?: string | number;
}

/* -------------------------------------------------------------------------
 * ALGORITHMIC DIFF COMPUTATION (LCS)
 * Computes additions, deletions, line numbers, and split rows with zero external dependencies.
 * ----------------------------------------------------------------------- */

export function computeLineDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = (oldText || "").split(/\r?\n/);
  const newLines = (newText || "").split(/\r?\n/);
  const m = oldLines.length;
  const n = newLines.length;

  // Guard against extreme scale (cap matrix to prevent runaway allocation)
  if (m * n > 400000) {
    // Graceful simple fallback for giant files
    const fallback: DiffLine[] = [];
    oldLines.forEach((l, idx) => fallback.push({ type: "deleted", oldLineNumber: idx + 1, content: l }));
    newLines.forEach((l, idx) => fallback.push({ type: "added", newLineNumber: idx + 1, content: l }));
    return fallback;
  }

  // 2D Longest Common Subsequence Table
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to construct aligned diff items
  const stack: DiffLine[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      stack.push({
        type: "unchanged",
        oldLineNumber: i,
        newLineNumber: j,
        content: oldLines[i - 1],
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({
        type: "added",
        newLineNumber: j,
        content: newLines[j - 1],
      });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      stack.push({
        type: "deleted",
        oldLineNumber: i,
        content: oldLines[i - 1],
      });
      i--;
    }
  }

  return stack.reverse();
}

export function computeSplitRows(diff: DiffLine[]): SplitDiffRow[] {
  const rows: SplitDiffRow[] = [];
  let leftBuffer: DiffLine[] = [];
  let rightBuffer: DiffLine[] = [];

  const flushBuffers = () => {
    const maxLen = Math.max(leftBuffer.length, rightBuffer.length);
    for (let k = 0; k < maxLen; k++) {
      const left = leftBuffer[k];
      const right = rightBuffer[k];
      rows.push({
        left: left
          ? { lineNumber: left.oldLineNumber!, content: left.content, type: "deleted" }
          : undefined,
        right: right
          ? { lineNumber: right.newLineNumber!, content: right.content, type: "added" }
          : undefined,
      });
    }
    leftBuffer = [];
    rightBuffer = [];
  };

  for (const item of diff) {
    if (item.type === "unchanged") {
      flushBuffers();
      rows.push({
        left: { lineNumber: item.oldLineNumber!, content: item.content, type: "unchanged" },
        right: { lineNumber: item.newLineNumber!, content: item.content, type: "unchanged" },
      });
    } else if (item.type === "deleted") {
      leftBuffer.push(item);
    } else if (item.type === "added") {
      rightBuffer.push(item);
    }
  }
  flushBuffers();

  return rows;
}

function serializeUnifiedPatch(diff: DiffLine[], filename?: string): string {
  const header = filename ? `--- a/${filename}\n+++ b/${filename}\n` : "";
  const body = diff
    .map((line) => {
      const prefix = line.type === "added" ? "+" : line.type === "deleted" ? "-" : " ";
      return `${prefix}${line.content}`;
    })
    .join("\n");
  return `${header}${body}`;
}

/* -------------------------------------------------------------------------
 * ROOT DIFF VIEWER COMPONENT
 * Container-aware (@container/diff-viewer), accessible semantic diff display
 * supporting Unified and Split modes with non-color-only change indicators.
 * ----------------------------------------------------------------------- */

export function DiffViewer({
  className,
  oldCode,
  newCode,
  filename,
  oldFilename,
  newFilename,
  viewMode: controlledViewMode,
  variant = "default",
  size = "default",
  showLineNumbers = true,
  showToolbar = true,
  showStats = true,
  showCopy = true,
  wrap = false,
  maxHeight,
  ...props
}: DiffViewerProps) {
  const [internalViewMode, setInternalViewMode] = React.useState<DiffViewMode>(
    controlledViewMode ?? "unified"
  );

  React.useEffect(() => {
    if (controlledViewMode !== undefined) {
      setInternalViewMode(controlledViewMode);
    }
  }, [controlledViewMode]);

  const activeMode = controlledViewMode !== undefined ? controlledViewMode : internalViewMode;

  // Compute diff and statistics
  const diff = React.useMemo(() => {
    return computeLineDiff(oldCode, newCode);
  }, [oldCode, newCode]);

  const splitRows = React.useMemo(() => {
    return computeSplitRows(diff);
  }, [diff]);

  const { additions, deletions } = React.useMemo(() => {
    let add = 0;
    let del = 0;
    for (const item of diff) {
      if (item.type === "added") add++;
      if (item.type === "deleted") del++;
    }
    return { additions: add, deletions: del };
  }, [diff]);

  const patchText = React.useMemo(() => {
    return serializeUnifiedPatch(diff, filename);
  }, [diff, filename]);

  return (
    <div
      data-slot="diff-viewer"
      data-variant={variant}
      data-size={size}
      data-mode={activeMode}
      className={cn(
        // Container query boundary
        "@container/diff-viewer group/diff-viewer relative flex flex-col w-full min-w-0 overflow-hidden font-mono select-text",

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
          data-slot="diff-viewer-toolbar"
          className={cn(
            "flex flex-wrap items-center justify-between gap-2 border-b border-border/60 px-3.5 py-2 min-h-10",
            variant === "glass" && "bg-white/40 dark:bg-white/[0.03] backdrop-blur-xs",
            variant === "default" && "bg-muted/40 dark:bg-muted/20"
          )}
        >
          {/* Filename & Change Statistics */}
          <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <HaloIcon icon={GitCommitIcon} size={15} className="text-muted-foreground shrink-0" />
              <span className="font-semibold text-xs text-foreground truncate">
                {filename ?? "Diff Comparison"}
              </span>
            </div>

            {showStats && (
              <div className="flex items-center gap-1.5 text-xs font-semibold tabular-nums shrink-0">
                <span
                  className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[11px]"
                  title={`${additions} additions`}
                >
                  +{additions}
                </span>
                <span
                  className="px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-700 dark:text-rose-400 text-[11px]"
                  title={`${deletions} deletions`}
                >
                  -{deletions}
                </span>
              </div>
            )}
          </div>

          {/* View Mode Toggle and Copy Action */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* View Mode Segmented Switch */}
            <div
              role="radiogroup"
              aria-label="Diff view layout mode"
              className="inline-flex items-center p-0.5 rounded-lg bg-muted/60 border border-border/50 text-xs"
            >
              <button
                type="button"
                role="radio"
                aria-checked={activeMode === "unified"}
                onClick={() => setInternalViewMode("unified")}
                className={cn(
                  "px-2 py-0.5 rounded-md font-medium text-[11px] transition-all cursor-pointer",
                  activeMode === "unified"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Unified
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={activeMode === "split"}
                onClick={() => setInternalViewMode("split")}
                className={cn(
                  "px-2 py-0.5 rounded-md font-medium text-[11px] transition-all cursor-pointer",
                  activeMode === "split"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Split
              </button>
            </div>

            {showCopy && (
              <CopyButton
                value={patchText}
                variant="ghost"
                size="sm"
                className="size-7 rounded-md text-muted-foreground hover:text-foreground ml-1"
                aria-label="Copy unified patch diff to clipboard"
              />
            )}
          </div>
        </div>
      )}

      {/* Content Viewport */}
      <div
        data-slot="diff-viewer-content"
        tabIndex={0}
        aria-label={filename ? `Diff comparison for ${filename}` : "Diff comparison"}
        style={{ maxHeight }}
        className={cn(
          "w-full min-w-0 overflow-auto focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40",
          maxHeight && "overscroll-contain"
        )}
      >
        {activeMode === "unified" ? (
          /* UNIFIED DIFF VIEW */
          <div className="w-full min-w-full table border-collapse">
            {diff.map((line, index) => {
              const isAdded = line.type === "added";
              const isDeleted = line.type === "deleted";
              const marker = isAdded ? "+" : isDeleted ? "-" : " ";

              return (
                <div
                  key={index}
                  data-diff-type={line.type}
                  className={cn(
                    "table-row text-left transition-colors",
                    isAdded && [
                      "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 border-l-2 border-emerald-500",
                    ],
                    isDeleted && [
                      "bg-rose-500/10 dark:bg-rose-500/15 text-rose-950 dark:text-rose-200 border-l-2 border-rose-500",
                    ],
                    !isAdded && !isDeleted && "text-foreground"
                  )}
                >
                  {/* Old Line Number */}
                  {showLineNumbers && (
                    <span
                      aria-hidden="true"
                      className="table-cell select-none w-10 py-0.5 pr-2 pl-3 text-right text-muted-foreground/45 text-xs tabular-nums border-r border-border/20"
                    >
                      {line.oldLineNumber ?? ""}
                    </span>
                  )}

                  {/* New Line Number */}
                  {showLineNumbers && (
                    <span
                      aria-hidden="true"
                      className="table-cell select-none w-10 py-0.5 pr-2 pl-2 text-right text-muted-foreground/45 text-xs tabular-nums border-r border-border/20"
                    >
                      {line.newLineNumber ?? ""}
                    </span>
                  )}

                  {/* Gutter Marker */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "table-cell select-none w-6 py-0.5 text-center font-bold text-xs",
                      isAdded && "text-emerald-600 dark:text-emerald-400",
                      isDeleted && "text-rose-600 dark:text-rose-400",
                      !isAdded && !isDeleted && "text-muted-foreground/30"
                    )}
                  >
                    {marker}
                  </span>

                  {/* Line Content */}
                  <span
                    className={cn(
                      "table-cell py-0.5 pr-4 min-w-0",
                      wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
                    )}
                  >
                    {line.content || <span className="inline-block w-0">&#8203;</span>}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          /* SPLIT DIFF VIEW */
          <div className="w-full min-w-[580px] table border-collapse">
            {/* Split Header if custom labels provided */}
            {(oldFilename || newFilename) && (
              <div className="table-row border-b border-border/60 bg-muted/30 text-xs font-semibold text-muted-foreground">
                <span className="table-cell py-1.5 px-3 border-r border-border/40 w-1/2">
                  {oldFilename ?? "Original"}
                </span>
                <span className="table-cell py-1.5 px-3 w-1/2">
                  {newFilename ?? "Modified"}
                </span>
              </div>
            )}

            {splitRows.map((row, index) => {
              const leftDeleted = row.left?.type === "deleted";
              const rightAdded = row.right?.type === "added";

              return (
                <div key={index} className="table-row text-left">
                  {/* LEFT PANE (Original / Deleted) */}
                  <div
                    className={cn(
                      "table-cell w-1/2 border-r border-border/40 align-top",
                      leftDeleted && "bg-rose-500/10 dark:bg-rose-500/15 text-rose-950 dark:text-rose-200 border-l-2 border-rose-500"
                    )}
                  >
                    <div className="flex items-start min-w-0">
                      {showLineNumbers && (
                        <span
                          aria-hidden="true"
                          className="select-none w-10 shrink-0 py-0.5 pr-2 pl-2 text-right text-muted-foreground/45 text-xs tabular-nums border-r border-border/20"
                        >
                          {row.left?.lineNumber ?? ""}
                        </span>
                      )}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "select-none w-5 shrink-0 py-0.5 text-center font-bold text-xs",
                          leftDeleted ? "text-rose-600 dark:text-rose-400" : "text-muted-foreground/30"
                        )}
                      >
                        {leftDeleted ? "-" : " "}
                      </span>
                      <span
                        className={cn(
                          "py-0.5 pr-3 min-w-0 flex-1",
                          wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
                        )}
                      >
                        {row.left?.content ?? ""}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT PANE (Modified / Added) */}
                  <div
                    className={cn(
                      "table-cell w-1/2 align-top",
                      rightAdded && "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 border-l-2 border-emerald-500"
                    )}
                  >
                    <div className="flex items-start min-w-0">
                      {showLineNumbers && (
                        <span
                          aria-hidden="true"
                          className="select-none w-10 shrink-0 py-0.5 pr-2 pl-2 text-right text-muted-foreground/45 text-xs tabular-nums border-r border-border/20"
                        >
                          {row.right?.lineNumber ?? ""}
                        </span>
                      )}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "select-none w-5 shrink-0 py-0.5 text-center font-bold text-xs",
                          rightAdded ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/30"
                        )}
                      >
                        {rightAdded ? "+" : " "}
                      </span>
                      <span
                        className={cn(
                          "py-0.5 pr-3 min-w-0 flex-1",
                          wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
                        )}
                      >
                        {row.right?.content ?? ""}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
