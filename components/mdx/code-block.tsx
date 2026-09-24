import { CodeBlockClient } from "@/components/code/code-block-client";
import { highlightCode } from "@/lib/code/highlight";

type CodeBlockProps = {
  code: string;
  language?: string;
  filename?: string;
  highlight?: string;
  showLineNumbers?: boolean;
  terminal?: boolean;
};

export async function CodeBlock({
  code,
  language = "text",
  filename,
  highlight,
  showLineNumbers,
  terminal,
}: CodeBlockProps) {
  const html = await highlightCode(code, language, highlight);
  return (
    <CodeBlockClient
      code={code.trimEnd()}
      html={html}
      language={language}
      filename={filename}
      showLineNumbers={showLineNumbers}
      terminal={terminal}
    />
  );
}
