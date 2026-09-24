import "server-only";
import { codeToHtml } from "shiki";

function parseLineRanges(value?: string) {
  const lines = new Set<number>();
  if (!value) return lines;

  for (const part of value.split(",")) {
    const [start, end = start] = part.trim().split("-").map(Number);
    if (!Number.isFinite(start) || !Number.isFinite(end)) continue;
    for (let line = start; line <= end; line += 1) lines.add(line);
  }
  return lines;
}

export async function highlightCode(code: string, language: string, highlight?: string) {
  const highlightedLines = parseLineRanges(highlight);
  let line = 0;
  const html = await codeToHtml(code.trimEnd(), {
    lang: language,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });

  return html.replace(/<span class="line">/g, () => {
    line += 1;
    return `<span class="line"${highlightedLines.has(line) ? ' data-highlighted-line="true"' : ""}>`;
  });
}
