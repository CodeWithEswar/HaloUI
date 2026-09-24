import * as React from "react";
import type { Metadata } from "next";
import { CopyButtonPreviewStage } from "./copy-button-preview-stage";
import {
  CopyButtonDefaultPreview,
  CopyButtonFailurePreview,
  CopyButtonVariantsPreview,
  CopyButtonSizesPreview,
  CopyButtonLabeledPreview,
  CopyButtonCodeBlockPreview,
  CopyButtonDenseUIPreview,
  CopyButtonKeyboardPreview,
  CopyButtonStatesPreview,
  CopyButtonBackgroundResponsePreview,
} from "./copy-button-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Copy Button — Actions",
  description:
    "Copies text to the clipboard and provides short-lived accessible feedback when the operation succeeds or fails.",
};

const PROPS_DATA = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: false,
    description:
      "The explicit string written to the browser clipboard upon activation. No DOM scraping is ever performed.",
  },
  {
    name: "onCopy",
    type: "() => void | Promise<void>",
    default: "undefined",
    required: false,
    description:
      "Optional custom copy operation. Supports asynchronous workflows and rejection handling for testing or custom clipboard operations.",
  },
  {
    name: "variant",
    type: '"default" | "secondary" | "outline" | "ghost"',
    default: '"default"',
    required: false,
    description:
      "Visual treatment honoring HaloUI's 10-layer physical liquid optical material engine. 'ghost' is recommended for code blocks and compact toolbars.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description:
      "Size geometry for the button: 'sm' (32px), 'default' (36px), or 'lg' (40px).",
  },
  {
    name: "feedbackDuration",
    type: "number",
    default: "2000",
    required: false,
    description:
      "Duration in milliseconds that success or error feedback remains visible before automatically resetting to idle.",
  },
  {
    name: "successMessage",
    type: "string",
    default: '"Copied to clipboard"',
    required: false,
    description:
      "Polite screen reader live region announcement broadcast upon successful clipboard write.",
  },
  {
    name: "errorMessage",
    type: "string",
    default: '"Failed to copy to clipboard"',
    required: false,
    description:
      "Polite screen reader live region announcement broadcast upon clipboard write rejection.",
  },
  {
    name: "copiedLabel",
    type: "string",
    default: '"Copied"',
    required: false,
    description:
      "Text label rendered during copied state in labeled presentations.",
  },
  {
    name: "errorLabel",
    type: "string",
    default: '"Failed"',
    required: false,
    description:
      "Text label rendered during error state in labeled presentations.",
  },
  {
    name: "onCopySuccess",
    type: "() => void",
    default: "undefined",
    required: false,
    description:
      "Callback fired immediately when clipboard write completes successfully.",
  },
  {
    name: "onCopyError",
    type: "(error: unknown) => void",
    default: "undefined",
    required: false,
    description:
      "Callback fired when clipboard write rejects or throws an exception.",
  },
  {
    name: "children",
    type: "ReactNode | ((state: { status: CopyStatus, copied: boolean, error: boolean }) => ReactNode)",
    default: "undefined",
    required: false,
    description:
      "Optional children for labeled presentations or dynamic status render prop.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "Root",
    description:
      "A native HTML <button> element with type='button' and data-slot='copy-button' maintaining tactile press and keyboard focus.",
  },
  {
    name: "Halo Focus Ring",
    description:
      "Double-contrast perimeter operating independently outside the material boundary, remaining anchored during all feedback transitions.",
  },
  {
    name: "Operation State Icon",
    description:
      "Dynamically switches between Copy01Icon (idle), CheckmarkCircle02Icon (success), and AlertCircleIcon (error).",
  },
  {
    name: "Label Container",
    description:
      "Optional text label with calibrated minimum inline size preventing surrounding layout shift between 'Copy' and 'Copied'.",
  },
  {
    name: "Status Channel (Live Region)",
    description:
      "A visually hidden polite aria-live live region (<span role='status' aria-live='polite'>) communicating transient outcomes to assistive technology.",
  },
];

const DEPENDENCIES_DATA = [
  {
    title: "Runtime Dependencies",
    items: [
      "class-variance-authority",
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
      "clsx",
      "tailwind-merge",
    ],
  },
  {
    title: "Registry Dependencies",
    items: ["halo-icon"],
  },
  {
    title: "HaloUI Foundation Tokens",
    items: [
      "halo-liquid-glass",
      "halo-focus-ring",
      "halo-tactile-press",
      "--halo-focus-color",
      "--halo-focus-offset",
    ],
  },
];

const INSTALLED_FILES_DATA: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "copy-button.tsx",
            type: "file",
            description: "Specialized clipboard action with temporary operation feedback.",
          },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "folder",
    children: [
      {
        name: "halo-tokens.css",
        type: "file",
        description: "10-layer liquid optical physics and halo-focus-ring.",
      },
    ],
  },
];

export default function CopyButtonPage() {
  return (
    <div className="space-y-12">
      {/* Component Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Actions 08
          </span>
          <span className="inline-flex items-center rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
            Preview
          </span>
          <span className="inline-flex items-center rounded-md border border-border px-2 py-0.5 text-xs font-mono text-muted-foreground">
            copy-button
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Copy Button
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Copies text to the clipboard and provides short-lived accessible feedback when the
          operation succeeds or fails. Unlike Toggle, this represents temporary operation feedback,
          not persistent selection.
        </p>
      </div>

      {/* Critical Principle Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Callout type="note" title="Temporary Feedback, Not Persistent Selection">
          <strong>Copied is temporary feedback, not a selected state.</strong> Copy Button
          automatically returns to its idle presentation after confirming the clipboard operation.
          It must never be treated as a persistent toggle or carry <code>aria-pressed</code>.
        </Callout>

        <Callout type="warning" title="Reliability Contract: Never Fake Success">
          <strong>Copy Button reports success only after the copy operation succeeds.</strong>{" "}
          Clipboard rejections and permission denials are caught and displayed as controlled error
          feedback, never false success.
        </Callout>
      </div>

      {/* Interactive Preview Stage */}
      <div className="space-y-4">
        <h2 id="preview" className="text-xl font-semibold tracking-tight text-foreground">
          Interactive Stage
        </h2>
        <CopyButtonPreviewStage />
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="copy-button" />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <p className="text-sm text-muted-foreground">
          Pass an explicit <code className="text-foreground font-mono text-xs">value</code> string
          to be written to the clipboard. Always provide an accessible name via{" "}
          <code className="text-foreground font-mono text-xs">aria-label</code> when using the
          icon-only presentation.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { CopyButton } from "@/components/ui/copy-button";

export function CopySnippet() {
  return (
    <CopyButton
      value="pnpm dlx shadcn@latest add @haloui/copy-button"
      aria-label="Copy installation command"
    />
  );
}`}
        />
      </div>

      {/* When to Use vs When Not to Use */}
      <div className="space-y-4">
        <h2 id="when-to-use" className="text-xl font-semibold tracking-tight text-foreground">
          When to Use
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] space-y-2">
            <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              Recommended Use Cases
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Terminal commands, installation scripts, and shell recipes.</li>
              <li>Syntax-highlighted code blocks and snippet containers.</li>
              <li>API keys, publishable credentials, and webhook endpoints.</li>
              <li>Resource URLs, git clone targets, and invitation tokens.</li>
              <li>Configuration files, environment variables, and hashes.</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/[0.03] space-y-2">
            <h4 className="text-sm font-semibold text-rose-600 dark:text-rose-400">
              When Not to Use
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Two-state persistent toggles (use <code>Toggle</code> instead).</li>
              <li>File downloads or exports (use standard <code>Button</code> with download handler).</li>
              <li>Sharing sheets or mobile intent pickers (use <code>IconButton</code>).</li>
              <li>Destructive or transactional actions requiring dialog confirmations.</li>
              <li>Automated clipboard writes without direct user intent.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Deterministic Failure Handling Demonstration */}
      <div className="space-y-4">
        <h2 id="error-handling" className="text-xl font-semibold tracking-tight text-foreground">
          Controlled Failure & Rejection Handling
        </h2>
        <p className="text-sm text-muted-foreground">
          The Clipboard API can reject due to permission denial, insecure HTTP contexts, or browser
          policy. Copy Button captures the rejection, transitions to an accessible error state, and
          never renders false success.
        </p>
        <CopyButtonFailurePreview />
        <CodeBlock
          language="tsx"
          code={`<CopyButton
  onCopy={async () => {
    // Custom async operation or rejection simulation
    await customClipboardSync();
  }}
  onCopyError={(err) => {
    console.error("Copy failed:", err);
  }}
  aria-label="Copy restricted resource"
/>`}
        />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="text-xl font-semibold tracking-tight text-foreground">
          Variants
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose from 4 variants honoring HaloUI's liquid optical material engine. Ghost is
          recommended for code blocks and compact toolbars to preserve clarity.
        </p>
        <CopyButtonVariantsPreview />
      </div>

      {/* Sizing */}
      <div className="space-y-4">
        <h2 id="sizes" className="text-xl font-semibold tracking-tight text-foreground">
          Sizes
        </h2>
        <p className="text-sm text-muted-foreground">
          Three proportional sizes calibrated for compact rows (32px), standard actions (36px), and
          prominent utility bars (40px).
        </p>
        <CopyButtonSizesPreview />
      </div>

      {/* Labeled Mode & Width Stability */}
      <div className="space-y-4">
        <h2 id="labeled-mode" className="text-xl font-semibold tracking-tight text-foreground">
          Labeled Mode & Width Stability
        </h2>
        <p className="text-sm text-muted-foreground">
          Provide text children to enable labeled presentation. Calibrated minimum inline sizes
          prevent layout movement when text changes from "Copy" to "Copied" or "Failed".
        </p>
        <CopyButtonLabeledPreview />
      </div>

      {/* Code Block Context */}
      <div className="space-y-4">
        <h2 id="code-surface" className="text-xl font-semibold tracking-tight text-foreground">
          Code Block Surface Context
        </h2>
        <p className="text-sm text-muted-foreground">
          Copy Button is most commonly deployed in code blocks. The ghost variant integrates cleanly
          with both light and dark syntax-highlighted containers.
        </p>
        <CopyButtonCodeBlockPreview />
      </div>

      {/* Dense UI Context */}
      <div className="space-y-4">
        <h2 id="dense-ui" className="text-xl font-semibold tracking-tight text-foreground">
          Dense UI & API Credential Rows
        </h2>
        <p className="text-sm text-muted-foreground">
          Compact rows, key/value pairs, and table metadata rows maintain optical alignment without
          overpowering surrounding information.
        </p>
        <CopyButtonDenseUIPreview />
      </div>

      {/* Real Keyboard & Focus Stability */}
      <div className="space-y-4">
        <h2 id="keyboard" className="text-xl font-semibold tracking-tight text-foreground">
          Keyboard Interaction & Focus Stability
        </h2>
        <p className="text-sm text-muted-foreground">
          Because the button element remains mounted throughout the transition, keyboard focus is
          never lost or reset when state moves between idle, copied, error, and reset.
        </p>
        <CopyButtonKeyboardPreview />
      </div>

      {/* State Reference Matrix */}
      <div className="space-y-4">
        <h2 id="states-matrix" className="text-xl font-semibold tracking-tight text-foreground">
          State Reference Matrix
        </h2>
        <p className="text-sm text-muted-foreground">
          Visual reference isolating Idle, Focus, Copied, and Error states. Focus ring remains
          visible during all operational transitions.
        </p>
        <CopyButtonStatesPreview />
      </div>

      {/* Background Response */}
      <div className="space-y-4">
        <h2 id="background-response" className="text-xl font-semibold tracking-tight text-foreground">
          Substrate Response
        </h2>
        <p className="text-sm text-muted-foreground">
          Translucent liquid optical behavior verified across Neutral, Image Mesh, Dense UI, and
          Dark substrates.
        </p>
        <CopyButtonBackgroundResponsePreview />
      </div>

      {/* Anatomy */}
      <div className="space-y-4">
        <h2 id="anatomy" className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="text-xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>
        <PropsTable rows={PROPS_DATA} />
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 id="accessibility" className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility & Assistive Technology
        </h2>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Copy Button is fully compliant with <strong>WCAG 2.1 AA</strong> standards:
          </p>
          <ul className="list-disc list-inside space-y-1.5">
            <li>
              <strong>Action Semantics:</strong> Implemented as a native{" "}
              <code className="text-foreground font-mono text-xs">&lt;button type=&quot;button&quot;&gt;</code>{" "}
              supporting native Tab, Enter, and Space activation.
            </li>
            <li>
              <strong>No Toggle Semantics:</strong> Never outputs{" "}
              <code className="text-foreground font-mono text-xs">aria-pressed</code>. Copied state
              is temporary feedback, not persistent selection.
            </li>
            <li>
              <strong>Independent Live Region:</strong> Transient outcomes are announced via a
              polite live region (
              <code className="text-foreground font-mono text-xs">role=&quot;status&quot; aria-live=&quot;polite&quot;</code>
              ) rather than mutating the button&apos;s accessible name during focus.
            </li>
            <li>
              <strong>Mandatory Accessible Name:</strong> In icon-only mode, development checks
              verify the presence of{" "}
              <code className="text-foreground font-mono text-xs">aria-label</code> or{" "}
              <code className="text-foreground font-mono text-xs">aria-labelledby</code>.
            </li>
            <li>
              <strong>Double-Contrast Focus Ring:</strong> Uses HaloUI&apos;s shared{" "}
              <code className="text-foreground font-mono text-xs">halo-focus-ring</code> which
              remains pinned to the control across all feedback transitions.
            </li>
            <li>
              <strong>Reduced Motion:</strong> Respects{" "}
              <code className="text-foreground font-mono text-xs">prefers-reduced-motion</code> by
              replacing icons instantaneously without scale transforms.
            </li>
          </ul>
        </div>
      </div>

      {/* Dependencies */}
      <div className="space-y-4">
        <h2 id="dependencies" className="text-xl font-semibold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={DEPENDENCIES_DATA} />
      </div>

      {/* Installed Files */}
      <div className="space-y-4">
        <h2 id="installed-files" className="text-xl font-semibold tracking-tight text-foreground">
          Installed files
        </h2>
        <FileTree items={INSTALLED_FILES_DATA} />
      </div>
    </div>
  );
}
