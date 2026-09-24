"use client";

import * as React from "react";
import { FileCodeIcon, TerminalIcon } from "@hugeicons/core-free-icons";
import { CopyCodeButton } from "@/components/code/copy-code-button";
import { useCodePreferences } from "@/components/code/code-preferences-provider";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

type CodeBlockClientProps = {
  code: string;
  html?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  terminal?: boolean;
};

type ShellToken = {
  text: string;
  light?: string;
  dark?: string;
};

function parseShellTokens(line: string): ShellToken[] {
  const tokenRegex = /(\s+)|("(?:\\"|[^"])*"|'(?:\\'|[^'])*')|(https?:\/\/[^\s]+)|(--?[a-zA-Z0-9_-]+(?:=[^\s]+)?)|(@[a-zA-Z0-9_\-\/]+(?:@[a-zA-Z0-9_\-\.]+)?)|([a-zA-Z0-9_.\-]+(?:@[a-zA-Z0-9_.\-]+)?)|([^\s]+)/g;
  const tokens: ShellToken[] = [];
  let match: RegExpExecArray | null;
  let isFirstWord = true;

  while ((match = tokenRegex.exec(line)) !== null) {
    const [, whitespace, str, url, flag, scopedPkg, word, other] = match;

    if (whitespace) {
      tokens.push({ text: whitespace });
      continue;
    }

    if (str) {
      tokens.push({ text: str, light: "#032f62", dark: "#9ecbff" });
      isFirstWord = false;
      continue;
    }

    if (url) {
      tokens.push({ text: url, light: "#032f62", dark: "#9ecbff" });
      isFirstWord = false;
      continue;
    }

    if (flag) {
      tokens.push({ text: flag, light: "#005cc5", dark: "#79b8ff" });
      isFirstWord = false;
      continue;
    }

    if (scopedPkg) {
      tokens.push({ text: scopedPkg, light: "#005cc5", dark: "#79b8ff" });
      isFirstWord = false;
      continue;
    }

    if (word) {
      if (isFirstWord) {
        tokens.push({ text: word, light: "#6f42c1", dark: "#b392f0" });
        isFirstWord = false;
      } else {
        tokens.push({ text: word, light: "#032f62", dark: "#9ecbff" });
      }
      continue;
    }

    if (other) {
      tokens.push({ text: other, light: "#24292e", dark: "#e1e4e8" });
      isFirstWord = false;
    }
  }

  return tokens;
}

export function CodeBlockClient({
  code,
  html,
  language,
  filename,
  showLineNumbers,
  terminal = false,
}: CodeBlockClientProps) {
  const { wrapCode, setWrapCode } = useCodePreferences();
  const label = filename ?? (terminal ? "Terminal" : language?.toUpperCase());
  const trimmed = code.trimEnd();
  const lines = trimmed.split(/\r?\n/);
  const lineCount = lines.length;
  const useLineNumbers = showLineNumbers ?? lineCount >= 4;
  const languageLabel = terminal ? "SHELL" : (language ?? "TEXT").toUpperCase();
  const isShell = terminal || language === "bash" || language === "sh" || language === "shell";

  return (
    <figure className="code-block group/code my-5 min-w-0 overflow-hidden rounded-xl border">
      <figcaption className="code-block-header flex min-h-12 items-center justify-between gap-3 border-b px-2.5 pl-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="code-block-mark">
            <HaloIcon icon={terminal ? TerminalIcon : FileCodeIcon} size={14} />
          </span>
          <span className="code-block-label truncate font-mono text-xs font-medium">{label ?? "Code"}</span>
          <span className="code-block-meta hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] sm:inline-flex">
            <span>{languageLabel}</span>
            <span aria-hidden="true" className="code-block-meta-separator size-0.5 rounded-full" />
            <span>{lineCount} {lineCount === 1 ? "line" : "lines"}</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={() => setWrapCode(!wrapCode)}
            className="code-block-action h-7 rounded-md px-2 text-xs transition-colors focus-visible:outline-none"
            aria-pressed={wrapCode}
            title="Applies to every documentation code block"
          >
            {wrapCode ? "Wrap" : "No wrap"}
          </button>
          <CopyCodeButton code={trimmed} className="code-block-action" />
        </div>
      </figcaption>
      <div
        data-code-wrap={wrapCode ? "true" : "false"}
        className={cn("code-block-scroll min-w-0 overflow-x-auto", useLineNumbers && "code-line-numbers")}
        tabIndex={0}
        aria-label={`${language ?? "Text"} code${filename ? ` from ${filename}` : ""}`}
      >
        {html ? (
          <div className="code-highlight" dangerouslySetInnerHTML={{ __html: html }} />
        ) : isShell ? (
          <div className="code-highlight">
            <pre className="shiki shiki-themes github-light github-dark" tabIndex={0}>
              <code>
                {lines.map((lineText, idx) => {
                  const tokens = parseShellTokens(lineText);
                  return (
                    <span key={idx} className="line">
                      {tokens.map((tok, tIdx) => (
                        <span
                          key={tIdx}
                          style={
                            tok.light
                              ? ({
                                  "--shiki-light": tok.light,
                                  "--shiki-dark": tok.dark,
                                } as React.CSSProperties)
                              : undefined
                          }
                        >
                          {tok.text}
                        </span>
                      ))}
                    </span>
                  );
                })}
              </code>
            </pre>
          </div>
        ) : (
          <pre className="code-block-raw !m-0 !bg-transparent p-4 text-[13px] leading-6">
            <code>{trimmed}</code>
          </pre>
        )}
      </div>
    </figure>
  );
}
