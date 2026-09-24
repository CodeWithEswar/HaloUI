"use client";

import * as React from "react";
import {
  CheckmarkCircle01Icon,
  Copy01Icon,
  CodeIcon,
  TextWrapIcon,
} from "@hugeicons/core-free-icons";

import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface StageCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  minHeight?: string;
  showLineNumbers?: boolean;
  showToolbar?: boolean;
  defaultWrap?: boolean;
}

type Token = {
  text: string;
  light?: string;
  dark?: string;
};

const highlightCache = new Map<string, string>();

const KEYWORDS = new Set([
  "abstract",
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "keyof",
  "let",
  "new",
  "of",
  "private",
  "protected",
  "public",
  "readonly",
  "return",
  "satisfies",
  "static",
  "super",
  "switch",
  "throw",
  "try",
  "type",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
]);

const LITERALS = new Set([
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity",
]);

const TOKEN_REGEX =
  /(\/\*.*?\*\/)|(\/\/.*$)|(`(?:\\.|[^`])*`)|("(?:\\.|[^"])*")|('(?:\\.|[^'])*')|(<\/?[A-Za-z][A-Za-z0-9._:-]*)|(\/?>)|([A-Za-z_$][\w$-]*(?=\s*=))|(\b\d+(?:\.\d+)?\b)|([{}()[\],.;:=<>+\-*/!?&|])|(\s+)|([^\s{}()[\],.;:=<>+\-*/!?&|]+)/g;

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let match: RegExpExecArray | null;

  TOKEN_REGEX.lastIndex = 0;

  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    const [
      ,
      blockComment,
      lineComment,
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

    if (blockComment || lineComment) {
      tokens.push({
        text: blockComment ?? lineComment,
        light: "#6e7781",
        dark: "#8b949e",
      });
      continue;
    }

    if (templateLiteral || doubleString || singleString) {
      tokens.push({
        text: templateLiteral ?? doubleString ?? singleString,
        light: "#0a3069",
        dark: "#a5d6ff",
      });
      continue;
    }

    if (tag) {
      tokens.push({
        text: tag,
        light: "#116329",
        dark: "#7ee787",
      });
      continue;
    }

    if (tagClose) {
      tokens.push({
        text: tagClose,
        light: "#57606a",
        dark: "#8b949e",
      });
      continue;
    }

    if (attribute) {
      tokens.push({
        text: attribute,
        light: "#8250df",
        dark: "#d2a8ff",
      });
      continue;
    }

    if (number) {
      tokens.push({
        text: number,
        light: "#0550ae",
        dark: "#79c0ff",
      });
      continue;
    }

    if (punctuation) {
      tokens.push({
        text: punctuation,
        light: "#24292f",
        dark: "#c9d1d9",
      });
      continue;
    }

    if (other) {
      if (KEYWORDS.has(other)) {
        tokens.push({
          text: other,
          light: "#cf222e",
          dark: "#ff7b72",
        });
      } else if (LITERALS.has(other)) {
        tokens.push({
          text: other,
          light: "#0550ae",
          dark: "#79c0ff",
        });
      } else {
        tokens.push({
          text: other,
          light: "#24292f",
          dark: "#e6edf3",
        });
      }
    }
  }

  return tokens;
}

function getLanguageLabel(language: string) {
  const labels: Record<string, string> = {
    tsx: "TSX",
    jsx: "JSX",
    ts: "TypeScript",
    typescript: "TypeScript",
    js: "JavaScript",
    javascript: "JavaScript",
    css: "CSS",
    html: "HTML",
    json: "JSON",
    bash: "Shell",
    shell: "Shell",
    sh: "Shell",
    sql: "SQL",
    md: "Markdown",
    markdown: "Markdown",
  };

  return labels[language.toLowerCase()] ?? language.toUpperCase();
}

function CodeLine({
  line,
  index,
  showLineNumbers,
  wrap,
}: {
  line: string;
  index: number;
  showLineNumbers: boolean;
  wrap: boolean;
}) {
  const tokens = React.useMemo(() => tokenizeLine(line), [line]);

  return (
    <span
      className={cn(
        "group/line relative flex min-w-0",
        "transition-colors duration-100",
        "hover:bg-zinc-200/50 dark:hover:bg-white/[0.04]",
        wrap ? "w-full" : "w-max min-w-full"
      )}
      data-line={index + 1}
    >
      {showLineNumbers ? (
        <span
          aria-hidden="true"
          className={cn(
            "sticky left-0 z-[2] w-11 shrink-0 select-none",
            "border-r border-zinc-200/80 dark:border-white/[0.06]",
            "bg-[#f6f8fa] dark:bg-black",
            "pr-3 text-right",
            "text-[11px] leading-[22px] text-zinc-400 dark:text-[#52525b]",
            "group-hover/line:text-zinc-700 dark:group-hover/line:text-[#a1a1aa]"
          )}
        >
          {index + 1}
        </span>
      ) : null}

      <span
        className={cn(
          "block min-w-0 flex-1 px-4 leading-[22px]",
          wrap
            ? "whitespace-pre-wrap break-words"
            : "whitespace-pre"
        )}
      >
        {tokens.length === 0
          ? "\u00A0"
          : tokens.map((token, tokenIndex) => (
              <span
                key={`${index}-${tokenIndex}`}
                style={
                  token.light
                    ? ({
                        "--token-light": token.light,
                        "--token-dark": token.dark,
                      } as React.CSSProperties)
                    : undefined
                }
                className={token.light ? "stage-code-token" : undefined}
              >
                {token.text}
              </span>
            ))}
      </span>
    </span>
  );
}

export function StageCodeBlock({
  code,
  language = "tsx",
  filename,
  className,
  minHeight = "460px",
  showLineNumbers = true,
  showToolbar = true,
  defaultWrap = false,
}: StageCodeBlockProps) {
  const normalizedCode = React.useMemo(
    () => code.replace(/^\n+|\s+$/g, ""),
    [code]
  );

  const cacheKey = React.useMemo(
    () => `${language}:${normalizedCode}`,
    [language, normalizedCode]
  );

  const [copied, setCopied] = React.useState(false);
  const [wrap, setWrap] = React.useState(defaultWrap);
  const [html, setHtml] = React.useState<string | null>(
    () => highlightCache.get(cacheKey) ?? null
  );

  const copyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const lines = React.useMemo(
    () => normalizedCode.split(/\r?\n/),
    [normalizedCode]
  );

  const languageLabel = getLanguageLabel(language);

  React.useEffect(() => {
    const cached = highlightCache.get(cacheKey);

    if (cached) {
      setHtml(cached);
      return;
    }

    const controller = new AbortController();

    async function highlight() {
      try {
        const response = await fetch("/api/highlight", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: normalizedCode,
            language,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as {
          html?: string;
        };

        if (!data.html) {
          return;
        }

        highlightCache.set(cacheKey, data.html);
        setHtml(data.html);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.warn(
          "Syntax highlighting unavailable. Using local fallback.",
          error
        );
      }
    }

    void highlight();

    return () => {
      controller.abort();
    };
  }, [cacheKey, language, normalizedCode]);

  React.useEffect(() => {
    return () => {
      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }
    };
  }, []);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(normalizedCode);

      setCopied(true);

      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }

      copyTimer.current = setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      className={cn(
        "group/code relative w-full overflow-hidden",
        "border-y border-border",
        "bg-[#f6f8fa] dark:bg-black",
        "text-[#24292f] dark:text-[#f4f4f5]",
        className
      )}
      style={{ minHeight }}
    >
      {showToolbar ? (
        <header
          className={cn(
            "sticky top-0 z-20 flex h-10 items-center",
            "border-b border-zinc-200/80 dark:border-white/[0.08]",
            "bg-[#f6f8fa]/95 dark:bg-black/95",
            "supports-[backdrop-filter]:backdrop-blur-md"
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-2 px-3 sm:px-4">
            <div
              className={cn(
                "flex size-6 shrink-0 items-center justify-center",
                "rounded-[5px]",
                "border border-zinc-200 dark:border-white/[0.08]",
                "bg-zinc-200/50 dark:bg-white/[0.04]"
              )}
              aria-hidden="true"
            >
              <HaloIcon
                icon={CodeIcon}
                size={13}
                className="text-zinc-500 dark:text-[#a1a1aa]"
              />
            </div>

            <div className="flex min-w-0 items-center gap-2">
              {filename ? (
                <>
                  <span className="truncate font-mono text-[11px] font-medium text-zinc-800 dark:text-[#e4e4e7]">
                    {filename}
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-[10px] text-zinc-400 dark:text-[#52525b]"
                  >
                    /
                  </span>
                </>
              ) : null}

              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-500 dark:text-[#71717a]">
                {languageLabel}
              </span>
            </div>
          </div>

          <div className="flex h-full shrink-0 items-center border-l border-zinc-200/80 dark:border-white/[0.08]">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={
                    wrap ? "Disable code wrapping" : "Wrap long lines"
                  }
                  aria-pressed={wrap}
                  onClick={() => setWrap((current) => !current)}
                  className={cn(
                    "h-full w-10 rounded-none",
                    "text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900",
                    "dark:text-[#71717a] dark:hover:bg-white/[0.045] dark:hover:text-[#f4f4f5]",
                    wrap && "bg-zinc-200/80 text-zinc-900 dark:bg-white/[0.06] dark:text-[#e4e4e7]"
                  )}
                >
                  <HaloIcon icon={TextWrapIcon} size={15} />
                </Button>
              </TooltipTrigger>

              <TooltipContent side="bottom">
                {wrap ? "Disable wrapping" : "Wrap long lines"}
              </TooltipContent>
            </Tooltip>

            <div className="h-4 w-px bg-zinc-200/80 dark:bg-white/[0.08]" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={copyCode}
                  aria-label={copied ? "Code copied" : "Copy code"}
                  className={cn(
                    "h-full w-10 rounded-none",
                    "text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900",
                    "dark:text-[#71717a] dark:hover:bg-white/[0.045] dark:hover:text-[#f4f4f5]",
                    copied && "text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  <HaloIcon
                    icon={
                      copied
                        ? CheckmarkCircle01Icon
                        : Copy01Icon
                    }
                    size={15}
                  />
                </Button>
              </TooltipTrigger>

              <TooltipContent side="bottom">
                {copied ? "Copied" : "Copy code"}
              </TooltipContent>
            </Tooltip>
          </div>
        </header>
      ) : null}

      <div
        className={cn(
          "relative",
          wrap
            ? "overflow-x-hidden"
            : "overflow-x-auto"
        )}
      >
        <div
          className={cn(
            "relative py-3 font-mono",
            "text-[12.5px] sm:text-[13px]",
            "font-normal",
            "tabular-nums"
          )}
        >
          {/*
            Keep the local tokenizer visible immediately.

            Shiki is layered in only when its output is available.
            This prevents a blank/flickering code surface while the
            highlighting endpoint responds.
          */}

          {html ? (
            <div
              className={cn(
                "stage-shiki",
                showLineNumbers &&
                  "stage-shiki-with-lines",
                wrap && "stage-shiki-wrap"
              )}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <pre
              className={cn(
                "m-0 min-w-0 bg-transparent p-0",
                "font-inherit text-inherit"
              )}
            >
              <code className="grid">
                {lines.map((line, index) => (
                  <CodeLine
                    key={index}
                    line={line}
                    index={index}
                    showLineNumbers={showLineNumbers}
                    wrap={wrap}
                  />
                ))}
              </code>
            </pre>
          )}
        </div>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px",
          "bg-zinc-200/80 dark:bg-white/[0.08]"
        )}
      />

      <span className="sr-only" aria-live="polite">
        {copied ? "Code copied to clipboard" : ""}
      </span>
    </section>
  );
}

