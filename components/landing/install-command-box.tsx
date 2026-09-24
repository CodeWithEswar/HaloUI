import { CodeBlockClient } from "@/components/code/code-block-client";
import { highlightCode } from "@/lib/code/highlight";

export async function InstallCommandBox({ command }: { command: string }) {
  const html = await highlightCode(command, "bash");
  return (
    <div className="w-full max-w-md">
      <CodeBlockClient code={command} html={html} language="bash" terminal />
    </div>
  );
}
