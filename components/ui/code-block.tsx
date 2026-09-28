"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  CodeIcon,
  File01Icon,
  TextWrapIcon,
} from "@hugeicons/core-free-icons";

/* -------------------------------------------------------------------------
 * TYPES & MODELS
 * ----------------------------------------------------------------------- */

export type CodeBlockVariant = "default" | "glass" | "plain";
export type CodeBlockSize = "sm" | "default" | "lg";

export interface CodeBlockProps extends React.ComponentProps<"div"> {
  /**
   * The source code string to display.
   */
  code: string;
  /**
   * Language identifier for syntax parsing and header display (e.g. "typescript", "tsx", "css", "json", "bash").
   * @default "typescript"
   */
  language?: string;
  /**
   * Optional file name displayed in the toolbar header (e.g. "Button.tsx", "schema.prisma").
   */
  filename?: string;
  /**
   * Visual framing variant:
   * - "default": Clean bordered container with subtle background for dense technical layouts.
   * - "glass": Restrained HaloUI liquid glass outer shell with specular rim and subtle ambient depth.
   * - "plain": Frameless unbordered display for embedding directly inside tabs or card bodies.
   * @default "default"
   */
  variant?: CodeBlockVariant;
  /**
   * Typography and density scale:
   * - "sm": Compact 12px monospaced typography for dense panels or narrow sidebars.
   * - "default": Standard 13px monospaced typography with comfortable line height.
   * - "lg": Spacious 14px monospaced typography for presentations or hero code examples.
   * @default "default"
   */
  size?: CodeBlockSize;
  /**
   * Whether to render tabular, unselectable line numbers in the gutter.
   * @default true
   */
  showLineNumbers?: boolean;
  /**
   * Optional 1-indexed line numbers to highlight with accent tint.
   */
  highlightLines?: number[];
  /**
   * Whether long lines wrap onto subsequent lines (true) or scroll horizontally inside the container (false).
   * @default false
   */
  wrap?: boolean;
  /**
   * Whether to render the header toolbar with filename, language label, wrap toggle, and copy button.
   * @default true
   */
  showToolbar?: boolean;
  /**
   * Whether to render the copy-to-clipboard action.
   * @default true
   */
  showCopy?: boolean;
  /**
   * Custom string passed to clipboard if different from `code`.
   */
  copyText?: string;
  /**
   * Optional maximum height with internal scrolling.
   */
  maxHeight?: string | number;
}

interface Token {
  text: string;
  className?: string;
  light?: string;
  dark?: string;
}

/* -------------------------------------------------------------------------
 * LIGHTWEIGHT SYNCHRONOUS TOKENIZATION ENGINE
 * Produces crisp, deterministic syntax coloring without client/server hydration mismatch.
 * ----------------------------------------------------------------------- */

const KEYWORDS = new Set([
  "abstract", "as", "async", "await", "break", "case", "catch", "class",
  "const", "continue", "debugger", "default", "delete", "do", "else",
  "enum", "export", "extends", "finally", "for", "from", "function",
  "get", "if", "implements", "import", "in", "instanceof", "interface",
  "is", "keyof", "let", "new", "of", "package", "private", "protected",
  "public", "readonly", "return", "satisfies", "set", "static", "super",
  "switch", "this", "throw", "try", "type", "typeof", "var", "void",
  "while", "with", "yield",
  // Shell/Bash keywords
  "echo", "npm", "pnpm", "yarn", "bun", "npx", "git", "cd", "mkdir", "curl",
  "grep", "cat", "chmod", "sudo",
  // CSS keywords
  "@media", "@keyframes", "@container", "@import", "!important",
]);

const LITERALS = new Set([
  "true", "false", "null", "undefined", "NaN", "Infinity",
]);

const TOKEN_REGEX =
  /(\/\*[\s\S]*?\*\/)|(\/\/.*$)|(#.*$)|(`(?:\\.|[^`])*`)|("(?:\\.|[^"])*")|('(?:\\.|[^'])*')|(<\/?[A-Za-z][A-Za-z0-9._:-]*)|(\/?>)|([A-Za-z_$][\w$-]*(?=\s*=))|(\b\d+(?:\.\d+)?\b)|([{}()[\],.;:=<>+\-*/!?&|])|(\s+)|([^\s{}()[\],.;:=<>+\-*/!?&|]+)/g;

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let match: RegExpExecArray | null;

  TOKEN_REGEX.lastIndex = 0;

  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    const [
      ,
      blockComment,
      lineComment,
      hashComment,
      templateLiteral,
      doubleString,
      singleString,
      tag,
      tagClose,
      attribute,
      number,
      punctuation,
      whitespace,
      other,
    ] = match;

    if (whitespace) {
      tokens.push({ text: whitespace });
      continue;
    }

    if (blockComment || lineComment || hashComment) {
      tokens.push({
        text: blockComment ?? lineComment ?? hashComment,
        light: "#6e7781",
        dark: "#8b949e",
        className: "italic text-muted-foreground/80",
      });
      continue;
    }

    if (templateLiteral || doubleString || singleString) {
      tokens.push({
        text: templateLiteral ?? doubleString ?? singleString,
        light: "#0a3069",
        dark: "#a5d6ff",
        className: "text-emerald-700 dark:text-emerald-300",
      });
      continue;
    }

    if (tag) {
      tokens.push({
        text: tag,
        light: "#116329",
        dark: "#7ee787",
        className: "text-rose-600 dark:text-rose-400 font-medium",
      });
      continue;
    }

    if (tagClose) {
      tokens.push({
        text: tagClose,
        light: "#57606a",
        dark: "#8b949e",
        className: "text-rose-600 dark:text-rose-400 font-medium",
      });
      continue;
    }

    if (attribute) {
      tokens.push({
        text: attribute,
        light: "#8250df",
        dark: "#d2a8ff",
        className: "text-amber-700 dark:text-amber-300",
      });
      continue;
    }

    if (number) {
      tokens.push({
        text: number,
        light: "#0550ae",
        dark: "#79c0ff",
        className: "text-sky-700 dark:text-sky-400 font-semibold tabular-nums",
      });
      continue;
    }

    if (punctuation) {
      tokens.push({
        text: punctuation,
        light: "#24292f",
        dark: "#c9d1d9",
        className: "text-muted-foreground/80",
      });
      continue;
    }

    if (other) {
      if (KEYWORDS.has(other)) {
        tokens.push({
          text: other,
          light: "#cf222e",
          dark: "#ff7b72",
          className: "text-purple-600 dark:text-purple-400 font-semibold",
        });
      } else if (LITERALS.has(other)) {
        tokens.push({
          text: other,
          light: "#0550ae",
          dark: "#79c0ff",
          className: "text-sky-600 dark:text-sky-400 font-medium",
        });
      } else {
        tokens.push({
          text: other,
          light: "#24292f",
          dark: "#e6edf3",
          className: "text-foreground",
        });
      }
    }
  }

  return tokens;
}

function normalizeLanguage(lang?: string): string {
  if (!lang) return "code";
  const l = lang.toLowerCase().trim();
  if (l === "ts" || l === "typescript") return "TypeScript";
  if (l === "js" || l === "javascript") return "JavaScript";
  if (l === "tsx") return "TSX";
  if (l === "jsx") return "JSX";
  if (l === "json") return "JSON";
  if (l === "css") return "CSS";
  if (l === "html") return "HTML";
  if (l === "sh" || l === "bash" || l === "shell" || l === "zsh") return "Shell";
  if (l === "python" || l === "py") return "Python";
  if (l === "sql") return "SQL";
  return lang;
}

/* -------------------------------------------------------------------------
 * ROOT CODE BLOCK COMPONENT
 * Container-aware (@container/code-block), accessible semantic <pre><code>,
 * with unselectable tabular line numbers, line highlighting, and restrained liquid glass.
 * ----------------------------------------------------------------------- */

export function CodeBlock({
  className,
  code,
  language = "typescript",
  filename,
  variant = "default",
  size = "default",
  showLineNumbers = true,
  highlightLines = [],
  wrap: controlledWrap,
  showToolbar = true,
  showCopy = true,
  copyText,
  maxHeight,
  ...props
}: CodeBlockProps) {
  // Allow internal toggleable wrap state if not strictly controlled
  const [internalWrap, setInternalWrap] = React.useState(controlledWrap ?? false);

  React.useEffect(() => {
    if (controlledWrap !== undefined) {
      setInternalWrap(controlledWrap);
    }
  }, [controlledWrap]);

  const activeWrap = controlledWrap !== undefined ? controlledWrap : internalWrap;

  const lines = React.useMemo(() => {
    return (code || "").split(/\r?\n/);
  }, [code]);

  const highlightedSet = React.useMemo(() => {
    return new Set(highlightLines);
  }, [highlightLines]);

  const textToCopy = copyText ?? code;
  const langLabel = normalizeLanguage(language);

  return (
    <div
      data-slot="code-block"
      data-variant={variant}
      data-size={size}
      className={cn(
        // Container query boundary
        "@container/code-block group/code-block relative flex flex-col w-full min-w-0 overflow-hidden font-mono select-text",

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
          data-slot="code-block-toolbar"
          className={cn(
            "flex flex-wrap items-center justify-between gap-2 border-b border-border/60 px-3.5 py-2 min-h-10",
            variant === "glass" && "bg-white/40 dark:bg-white/[0.03] backdrop-blur-xs",
            variant === "default" && "bg-muted/40 dark:bg-muted/20"
          )}
        >
          {/* Filename and Language Meta */}
          <div className="flex items-center gap-2 min-w-0">
            {filename ? (
              <>
                <HaloIcon icon={File01Icon} size={15} className="text-muted-foreground shrink-0" />
                <span className="font-semibold text-xs text-foreground truncate">
                  {filename}
                </span>
                <span className="text-[11px] text-muted-foreground/70 hidden @[360px]/code-block:inline">
                  • {langLabel}
                </span>
              </>
            ) : (
              <>
                <HaloIcon icon={CodeIcon} size={15} className="text-muted-foreground shrink-0" />
                <span className="font-semibold text-xs text-foreground truncate">
                  {langLabel}
                </span>
              </>
            )}
          </div>

          {/* Actions: Wrap Toggle and Canonical Copy Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setInternalWrap((prev) => !prev)}
              aria-label={activeWrap ? "Disable word wrap" : "Enable word wrap"}
              aria-pressed={activeWrap}
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer",
                activeWrap
                  ? "bg-primary/10 text-primary hover:bg-primary/15"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
              title={activeWrap ? "Word wrap enabled" : "Word wrap disabled"}
            >
              <HaloIcon icon={TextWrapIcon} size={13} />
              <span className="hidden @[420px]/code-block:inline">
                {activeWrap ? "Wrapped" : "Wrap"}
              </span>
            </button>

            {showCopy && (
              <CopyButton
                value={textToCopy}
                variant="ghost"
                size="sm"
                className="size-7 rounded-md text-muted-foreground hover:text-foreground"
                aria-label={`Copy ${filename ?? langLabel} code to clipboard`}
              />
            )}
          </div>
        </div>
      )}

      {/* Semantic Code Viewport */}
      <pre
        tabIndex={0}
        aria-label={filename ? `${filename} code listing` : `${langLabel} code snippet`}
        style={{ maxHeight }}
        className={cn(
          "w-full min-w-0 font-mono m-0 p-3 sm:p-4 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40",
          activeWrap
            ? "whitespace-pre-wrap break-words overflow-x-hidden"
            : "overflow-x-auto whitespace-pre",
          maxHeight && "overscroll-contain"
        )}
      >
        <code className="block min-w-full">
          {lines.map((lineStr, lineIdx) => {
            const lineNum = lineIdx + 1;
            const isHighlighted = highlightedSet.has(lineNum);
            const tokens = tokenizeLine(lineStr);

            return (
              <div
                key={lineIdx}
                data-line-number={lineNum}
                data-highlighted={isHighlighted || undefined}
                className={cn(
                  "flex items-start min-w-0 w-full group/line -mx-3 sm:-mx-4 px-3 sm:px-4 py-0.5 transition-colors",
                  isHighlighted && [
                    "bg-primary/10 dark:bg-primary/15 border-l-2 border-primary -ml-[calc(0.75rem+2px)] sm:-ml-[calc(1rem+2px)] pl-3 sm:pl-4",
                  ]
                )}
              >
                {/* Unselectable Line Number */}
                {showLineNumbers && (
                  <span
                    aria-hidden="true"
                    className="select-none shrink-0 w-8 pr-3 text-right text-muted-foreground/45 text-xs tabular-nums"
                  >
                    {lineNum}
                  </span>
                )}

                {/* Line Tokens */}
                <span
                  className={cn(
                    "min-w-0 flex-1",
                    activeWrap && "break-words"
                  )}
                >
                  {tokens.length === 0 ? (
                    // Keep blank line height
                    <span className="inline-block w-0">&#8203;</span>
                  ) : (
                    tokens.map((tok, tIdx) => (
                      <span
                        key={tIdx}
                        className={tok.className}
                      >
                        {tok.text}
                      </span>
                    ))
                  )}
                </span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
