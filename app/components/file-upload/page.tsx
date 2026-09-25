import * as React from "react";
import type { Metadata } from "next";
import { FileUploadPreviewStage } from "./file-upload-preview-stage";
import {
  PrimaryFileUploadDemo,
  SingleFileUploadDemo,
  ManualQueueUploadDemo,
  ValidationFileUploadDemo,
  ErrorAndRetryUploadDemo,
  DisabledFileUploadDemo,
} from "./file-upload-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "File Upload — Forms & Fields — HaloUI",
  description:
    "An accessible drag-and-drop file-upload workflow with validation, queue state, progress, and application-owned transfer integration.",
};

const FILE_UPLOAD_PROPS: PropRow[] = [
  {
    name: "accept",
    type: "string",
    default: "undefined",
    required: false,
    description: "Accepted MIME types or file extensions (e.g. 'image/*', '.pdf'). Guides picker and validates client drops.",
  },
  {
    name: "multiple",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether multiple files can be queued and uploaded simultaneously.",
  },
  {
    name: "maxSize",
    type: "number",
    default: "undefined",
    required: false,
    description: "Maximum allowable file size in bytes. Files exceeding this threshold are rejected with specific error feedback.",
  },
  {
    name: "maxFiles",
    type: "number",
    default: "undefined",
    required: false,
    description: "Maximum number of files allowed in the upload queue.",
  },
  {
    name: "preventDuplicates",
    type: "boolean",
    default: "true",
    required: false,
    description: "Prevents duplicate files in the queue based on filename, size, and lastModified timestamp comparison.",
  },
  {
    name: "autoUpload",
    type: "boolean",
    default: "false",
    required: false,
    description: "Automatically initiates transfer upon valid file selection instead of waiting for explicit submission.",
  },
  {
    name: "onUpload",
    type: "UploadHandler",
    default: "undefined",
    required: false,
    description: "Application-owned transfer adapter receiving file state, progress callback, and AbortSignal.",
  },
  {
    name: "onQueueChange",
    type: "(queue: FileUploadItemState[]) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked whenever the upload queue is modified (files added, removed, or state changed).",
  },
  {
    name: "onReject",
    type: "(rejections: FileRejection[]) => void",
    default: "undefined",
    required: false,
    description: "Callback fired when selected or dropped files fail validation rules.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Locks the dropzone and queue actions, suppressing pointer and keyboard interactions.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Applies error perimeter styling and coordinates aria-invalid with surrounding form Field.",
  },
];

const FILE_UPLOAD_ANATOMY: AnatomyPart[] = [
  {
    name: "FileUpload",
    description: "Root workflow container maintaining queue state, validation rules, and hidden accessible file input.",
  },
  {
    name: "FileUploadDropzone",
    description: "Drag-and-drop target with optical liquid glass perimeter, hover cues, and keyboard activation.",
  },
  {
    name: "FileUploadTrigger",
    description: "Dedicated action button opening the native platform file picker dialog.",
  },
  {
    name: "FileUploadList",
    description: "Accessible ARIA list displaying queued files, validation error banners, and item statuses.",
  },
  {
    name: "FileUploadItem",
    description: "Individual file card with file type icon, name, formatted size, progress, retry, cancel, and remove actions.",
  },
  {
    name: "FileUploadItemProgress",
    description: "Semantic ARIA progress bar displaying real determinate percentage or indeterminate sliding indicator.",
  },
  {
    name: "FileUploadItemRemove",
    description: "Action button to remove queued or completed items with deterministic keyboard focus restoration.",
  },
];

const FILE_UPLOAD_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          { name: "file-upload.tsx", type: "file" },
          { name: "file-input.tsx", type: "file" },
          { name: "field.tsx", type: "file" },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "folder",
    children: [{ name: "halo-tokens.css", type: "file" }],
  },
];

const FILE_UPLOAD_DEPENDENCIES: DependencyGroup[] = [
  {
    title: "Core Dependencies",
    items: [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
  },
  {
    title: "Icons & Registry Dependencies",
    items: [
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
      "field",
    ],
  },
];

export default function FileUploadDocsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-primary">
            Forms &amp; Fields · 26
          </span>
          <span className="text-muted-foreground/40">/</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            Compound Workflow
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          File Upload
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl sm:text-lg">
          An accessible drag-and-drop file-upload workflow with native picker fallback, client-side validation, queue state management, real progress tracking, cancellation, retry, and application-owned transfer integration.
        </p>
      </header>

      {/* Interactive Preview Stage */}
      <section id="interactive-stage" className="space-y-4">
        <FileUploadPreviewStage />
      </section>

      {/* Callout */}
      <Callout type="note" title="Application-Owned Storage Architecture">
        File Upload manages the client-side user experience, not storage infrastructure. Applications supply the transfer handler (e.g. S3, Supabase, Cloudflare R2, fetch, or XHR) via the <code>onUpload</code> adapter.
      </Callout>

      {/* Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Installation</h2>
        <InstallCommand registry="file-upload" />
      </section>

      {/* Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Usage</h2>
        <CodeBlock
          code={`import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
} from "@/components/ui/file-upload";

export function Example() {
  return (
    <FileUpload
      multiple
      maxSize={10 * 1024 * 1024} // 10MB
      onUpload={async (item, { onProgress, abortSignal }) => {
        // Application-owned transfer logic
        await uploadToStorage(item.file, onProgress, abortSignal);
      }}
    >
      <FileUploadDropzone />
      <FileUploadList />
    </FileUpload>
  );
}`}
          language="tsx"
        />
      </section>

      {/* With Field */}
      <section id="with-field" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">With Field</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          File Upload coordinates seamlessly with HaloUI&apos;s <code>Field</code> component to inherit accessible labeling, field descriptions, error messages, and validation styling:
        </p>
        <PrimaryFileUploadDemo />
      </section>

      {/* File Selection */}
      <section id="file-selection" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">File Selection</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Drag and drop is strictly an enhancement, never the sole selection path. File Upload internally renders a genuine, hidden <code>&lt;input type=&quot;file&quot;&gt;</code> accessible via keyboard activation, click on the dropzone, or an explicit <code>FileUploadTrigger</code>.
        </p>
      </section>

      {/* Single File Mode */}
      <section id="single-file" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Single File</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Configured with <code>multiple={false}</code> for avatars, identity documents, or single-attachment fields:
        </p>
        <SingleFileUploadDemo />
      </section>

      {/* Multiple Files & Manual Queue */}
      <section id="multiple-files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Multiple Files &amp; Queue Control</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          With <code>autoUpload={false}</code>, users can queue multiple items locally, inspect details, remove entries, and trigger upload on demand:
        </p>
        <ManualQueueUploadDemo />
      </section>

      {/* Validation */}
      <section id="validation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Validation &amp; Error Feedback</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Client-side validation verifies file types (<code>accept</code>), size thresholds (<code>maxSize</code>), maximum count (<code>maxFiles</code>), and duplicate entries. Rejected files generate precise, actionable error feedback while leaving valid queued files intact:
        </p>
        <ValidationFileUploadDemo />
      </section>

      {/* Security Callout */}
      <Callout type="warning" title="Security Boundary Reminder">
        Client-side file validation improves user experience by intercepting invalid files before network transmission. However, client checks are not a security boundary. The receiving backend must independently inspect MIME types, magic bytes, file sizes, and execute malware scanning.
      </Callout>

      {/* Errors & Retry */}
      <section id="errors-and-retry" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Error Handling &amp; Retry</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When network transfers fail, items enter an error state preserving the failed item. Users can retry the specific failed file without duplicating queue entries:
        </p>
        <ErrorAndRetryUploadDemo />
      </section>

      {/* Cancellation */}
      <section id="cancellation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Real Cancellation</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Cancellation utilizes standard <code>AbortController</code> signals passed to the transfer handler. Aborted transfers genuinely cancel the HTTP connection rather than merely hiding visual elements.
        </p>
      </section>

      {/* Disabled State */}
      <section id="disabled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Disabled State</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          When disabled, File Upload suppresses drag-and-drop events, locks native picker selection, and disables queue mutation actions:
        </p>
        <DisabledFileUploadDemo />
      </section>

      {/* File Upload vs File Input */}
      <section id="file-upload-vs-file-input" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">File Upload vs File Input</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Capability</th>
                <th className="px-4 py-3 font-medium">File Input (Forms &amp; Fields 25)</th>
                <th className="px-4 py-3 font-medium">File Upload (Forms &amp; Fields 26)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium">Responsibility</td>
                <td className="px-4 py-3 text-muted-foreground">Native local file selection for browser forms</td>
                <td className="px-4 py-3 text-muted-foreground">Complete upload workflow and queue lifecycle</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Drag &amp; Drop</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
                <td className="px-4 py-3 text-muted-foreground">Yes (with drag-active perimeter)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Queue State</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
                <td className="px-4 py-3 text-muted-foreground">Yes (stable IDs, item metadata)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Transfer State &amp; Progress</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
                <td className="px-4 py-3 text-muted-foreground">Yes (determinate &amp; indeterminate)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Cancellation &amp; Retry</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
                <td className="px-4 py-3 text-muted-foreground">Yes (via AbortSignal &amp; retry handlers)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props Table */}
      <section id="props" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Props Reference</h2>
        <PropsTable rows={FILE_UPLOAD_PROPS} />
      </section>

      {/* Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Anatomy</h2>
        <Anatomy parts={FILE_UPLOAD_ANATOMY} />
      </section>

      {/* Accessibility */}
      <section id="accessibility" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Accessibility (WCAG 2.1 AA)</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
          <li><strong>Keyboard Activation:</strong> Pressing <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-foreground">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-foreground">Space</kbd> on the dropzone or browse trigger opens the platform file picker.</li>
          <li><strong>Live Region Announcements:</strong> An ARIA live region (<code>aria-live=&quot;polite&quot;</code>) announces queue additions, file rejections, and transfer success/failure to screen readers.</li>
          <li><strong>Focus Restoration:</strong> When a queue item is removed, focus shifts deterministically to the next surviving item or back to the dropzone trigger.</li>
          <li><strong>Semantic Progress:</strong> Transfer progress renders with standard <code>role=&quot;progressbar&quot;</code>, <code>aria-valuenow</code>, and <code>aria-valuemax</code> attributes.</li>
          <li><strong>Double-Contrast Focus Ring:</strong> Controls use HaloUI&apos;s independent two-tone focus perimeter, remaining visible against light, dark, and complex backdrops.</li>
        </ul>
      </section>

      {/* File Tree */}
      <section id="installed-files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Installed Files</h2>
        <FileTree items={FILE_UPLOAD_FILES} />
      </section>

      {/* Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Dependencies</h2>
        <DependencyList groups={FILE_UPLOAD_DEPENDENCIES} />
      </section>
    </div>
  );
}
