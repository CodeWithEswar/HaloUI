import * as React from "react";
import type { Metadata } from "next";
import { FileInputPreviewStage } from "./file-input-preview-stage";
import {
  PrimaryFileInputDemo,
  ImageAcceptDemo,
  MultipleFilesDemo,
  SizeVariantsFileInputDemo,
  InvalidFileInputDemo,
  DisabledFileInputDemo,
} from "./file-input-demonstrations";
import { InstallCommand } from "@/components/mdx/install-command";
import { Anatomy, type AnatomyPart } from "@/components/mdx/anatomy";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList, type DependencyGroup } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "File Input — Forms & Fields — HaloUI",
  description:
    "An accessible native file-selection control with HaloUI form styling and clear selected-file feedback.",
};

const FILE_INPUT_PROPS: PropRow[] = [
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    required: false,
    description: "Physical dimensions and typography scale of container and native trigger button.",
  },
  {
    name: "accept",
    type: "string",
    default: "undefined",
    required: false,
    description: "Native MIME types or file extensions guiding selection in the platform file picker (e.g. 'image/*', '.pdf').",
  },
  {
    name: "multiple",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether the user can select multiple files simultaneously from the platform picker.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents opening the platform picker and dims visual opacity.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    required: false,
    description: "Marks file selection mandatory for native form submission.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "false",
    required: false,
    description: "Applies error state styling and aria-invalid attribute.",
  },
  {
    name: "onFilesChange",
    type: "(files: File[]) => void",
    default: "undefined",
    required: false,
    description: "Convenience callback delivering an array of selected File objects upon selection change.",
  },
  {
    name: "onChange",
    type: "React.ChangeEventHandler<HTMLInputElement>",
    default: "undefined",
    required: false,
    description: "Standard React change event emitted when a file selection occurs.",
  },
];

const ANATOMY_PARTS: AnatomyPart[] = [
  {
    name: "FileInput (Root)",
    description: "Native input[type='file'] element styled with HaloUI liquid optical glass and double-contrast focus boundary.",
  },
  {
    name: "File Selector Trigger",
    description: "Styled ::file-selector-button pseudoelement matching HaloUI Action button typography and elevation.",
  },
  {
    name: "Selected File Label",
    description: "Platform-rendered text indicating chosen filename, multiple count, or empty status with text truncation.",
  },
  {
    name: "Halo Focus Ring",
    description: "Double-contrast accessibility perimeter operating around the focused control.",
  },
];

const FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          { name: "file-input.tsx", type: "file" },
          { name: "field.tsx", type: "file" },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "folder",
    children: [
      { name: "halo-tokens.css", type: "file" },
    ],
  },
];

const DEPENDENCIES: DependencyGroup[] = [
  {
    title: "Core Dependencies",
    name: "Core Dependencies",
    items: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    title: "Registry Dependencies",
    name: "Registry Dependencies",
    items: ["field"],
  },
];

export default function FileInputPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            Forms & Fields 25
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            registry: file-input
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          File Input
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          An accessible native file-selection control with HaloUI form styling and clear selected-file feedback.
        </p>
      </div>

      {/* Section 132 Callout */}
      <Callout type="warning">
        <strong>File Input selects files; it does not upload them.</strong> Network transfer, progress, cancellation, retries, cloud storage, processing, and server-side validation belong to a higher-level upload workflow.
      </Callout>

      {/* Section 133 Callout */}
      <Callout type="note">
        <strong>The native accept attribute helps guide file selection.</strong> It is not a security boundary. Applications must validate uploaded content independently on the server.
      </Callout>

      {/* Section 134 Callout */}
      <Callout type="tip">
        <strong>File Input intentionally preserves the platform file picker rather than recreating it.</strong> Picker appearance and available file sources can vary by browser, operating system, and device.
      </Callout>

      {/* 1. Preview */}
      <section id="preview" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Interactive Preview Stage
        </h2>
        <p className="text-sm text-muted-foreground">
          Evaluate native file picker activation, accept filters, multiple selection, and Halo focus perimeters across physical backdrops.
        </p>
        <FileInputPreviewStage />
      </section>

      {/* 2. Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install File Input into your project via the HaloUI registry CLI:
        </p>
        <InstallCommand registry="file-input" />
      </section>

      {/* 3. Usage */}
      <section id="usage" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          code={`import * as React from "react";
import { FileInput } from "@/components/ui/file-input";

export function FilePickerExample() {
  return (
    <FileInput
      onChange={(e) => {
        const files = e.target.files;
        console.log("Selected file:", files?.[0]?.name);
      }}
    />
  );
}`}
          language="tsx"
        />
      </section>

      {/* 4. With Field */}
      <section id="with-field" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          With Field
        </h2>
        <p className="text-sm text-muted-foreground">
          Compose with <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">Field</code> for accessible label, description, and error messaging:
        </p>
        <PrimaryFileInputDemo />
      </section>

      {/* 5. Single file */}
      <section id="single-file" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Single File Selection
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          By default, File Input selects one file. Once selected, the chosen filename is displayed directly in the input label area and accessible to assistive technology.
        </p>
      </section>

      {/* 6. Multiple files */}
      <section id="multiple-files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Multiple Files Selection
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Provide the native <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">multiple</code> attribute to allow multi-file selection from the OS picker:
        </p>
        <MultipleFilesDemo />
      </section>

      {/* 7. Accepted file types */}
      <section id="accepted-file-types" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Accepted File Types
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use the native <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">accept</code> prop to filter file picker choices by MIME type or extension (e.g. <code className="font-mono text-xs">image/*</code> or <code className="font-mono text-xs">.pdf,.docx</code>):
        </p>
        <ImageAcceptDemo />
      </section>

      {/* 8. Required */}
      <section id="required" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Required Validation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Standard HTML5 form submission validates that a file is present when <code className="font-mono text-xs text-foreground bg-muted px-1.5 py-0.5 rounded">required</code> is specified.
        </p>
        <InvalidFileInputDemo />
      </section>

      {/* 9. Disabled */}
      <section id="disabled" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Disabled State
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Inhibits pointer and keyboard activation of the platform file picker with dimmed opacity:
        </p>
        <DisabledFileInputDemo />
      </section>

      {/* 10. Selected files */}
      <section id="selected-files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Selected Files Feedback
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Selection status is immediately visible. The native element indicates chosen files without initiating network transfers or synthetic upload states.
        </p>
      </section>

      {/* 11. States */}
      <section id="states" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          States Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Empty</span>
            <span className="text-[11px] text-muted-foreground">No file chosen, ready for selection.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Focused</span>
            <span className="text-[11px] text-muted-foreground">Double-contrast Halo Focus Ring.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">File Selected</span>
            <span className="text-[11px] text-muted-foreground">Filename clearly rendered with truncation.</span>
          </div>
          <div className="p-3 rounded-xl border border-border/80 bg-muted/20 text-center">
            <span className="text-xs font-semibold text-foreground block">Invalid</span>
            <span className="text-[11px] text-muted-foreground">Destructive border tone and error ring.</span>
          </div>
        </div>
      </section>

      {/* 12. Composition */}
      <section id="composition" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Composition & Sizing
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Available in <code className="font-mono text-xs">size="sm"</code> (32px), <code className="font-mono text-xs">size="default"</code> (40px), and <code className="font-mono text-xs">size="lg"</code> (48px) matching the standard Forms & Fields sizing scale:
        </p>
        <SizeVariantsFileInputDemo />
      </section>

      {/* 13. Keyboard behavior */}
      <section id="keyboard-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Keyboard Navigation
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs font-semibold text-foreground">
              <tr>
                <th className="px-4 py-3">Key</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Tab</td>
                <td className="px-4 py-2.5">Focuses the file input control.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Space / Enter</td>
                <td className="px-4 py-2.5">Activates the native operating system file picker dialog.</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">Esc</td>
                <td className="px-4 py-2.5">Dismisses the platform file dialog without modifying selection.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 14. Props */}
      <section id="props" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Props
        </h2>
        <PropsTable rows={FILE_INPUT_PROPS} />
      </section>

      {/* 15. Native props */}
      <section id="native-props" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Native Input Props
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Standard HTML <code className="font-mono text-xs">input</code> attributes such as <code className="font-mono text-xs">name</code>, <code className="font-mono text-xs">capture</code>, <code className="font-mono text-xs">form</code>, <code className="font-mono text-xs">aria-*</code>, and <code className="font-mono text-xs">data-*</code> are passed through directly to the underlying element.
        </p>
      </section>

      {/* 16. Anatomy */}
      <section id="anatomy" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Anatomy
        </h2>
        <Anatomy parts={ANATOMY_PARTS} />
      </section>

      {/* 17. Accessibility */}
      <section id="accessibility" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 leading-relaxed">
          <li><strong>Persistent Accessible Name:</strong> Pairs with <code className="font-mono text-xs">FieldLabel</code> using <code className="font-mono text-xs">htmlFor</code> association.</li>
          <li><strong>Native OS Integration:</strong> Retains standard platform assistive technology support for file selection.</li>
          <li><strong>Dual Indicator Visibility:</strong> Invalid state provides border contrast and focused ring without relying on color alone.</li>
        </ul>
      </section>

      {/* 18. Mobile behavior */}
      <section id="mobile-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Mobile Behavior
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          On iOS and Android, tapping the control opens the native sheet presenting options such as Photo Library, Take Photo, or Browse Files depending on the <code className="font-mono text-xs">accept</code> and <code className="font-mono text-xs">capture</code> attributes.
        </p>
      </section>

      {/* 19. Responsive behavior */}
      <section id="responsive-behavior" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Responsive Behavior
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Maintains strict horizontal containment on mobile viewports down to 320px width. Long filenames truncate cleanly with ellipsis rather than widening the page layout.
        </p>
      </section>

      {/* 20. Motion */}
      <section id="motion" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Motion & Transitions
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Restrained 150ms focus and hover transitions. Zero decorative animations, flying file icons, or progress spinners.
        </p>
      </section>

      {/* 21. Performance */}
      <section id="performance" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Performance
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Zero file content reading, zero image decoding, zero object URL creation, and zero background listeners. File selection is completely instantaneous.
        </p>
      </section>

      {/* 22. Security and validation */}
      <section id="security-and-validation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Security and Validation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The <code className="font-mono text-xs">accept</code> attribute is a client-side picker filter, not a security boundary. Applications must always perform rigorous server-side verification of file magic bytes, MIME types, virus scans, and file sizes.
        </p>
      </section>

      {/* 23. File Input vs File Upload */}
      <section id="file-input-vs-file-upload" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          File Input vs File Upload
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>File Input</strong> selects local files and passes references to the browser form. <strong>File Upload</strong> manages network transfer, chunking, progress tracking, cancellation, and cloud storage workflows.
        </p>
      </section>

      {/* 24. File Input vs Dropzone */}
      <section id="file-input-vs-dropzone" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          File Input vs Dropzone
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Dropzone</strong> is an expanded drag-and-drop surface. <strong>File Input</strong> is a compact native form control designed for standard field layouts.
        </p>
      </section>

      {/* 25. Dependencies */}
      <section id="dependencies" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Dependencies
        </h2>
        <DependencyList groups={DEPENDENCIES} />
      </section>

      {/* 26. Installed files */}
      <section id="installed-files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installed Files
        </h2>
        <FileTree items={FILE_TREE} />
      </section>

      {/* 27. Related components */}
      <section id="related-components" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/components/tag-input"
            className="p-3.5 rounded-xl border border-border hover:border-primary/40 bg-card/60 transition-colors block"
          >
            <span className="text-sm font-semibold text-foreground block">Tag Input</span>
            <span className="text-xs text-muted-foreground">Freeform token entry control for multiple text values.</span>
          </a>
          <a
            href="/components/field"
            className="p-3.5 rounded-xl border border-border hover:border-primary/40 bg-card/60 transition-colors block"
          >
            <span className="text-sm font-semibold text-foreground block">Field</span>
            <span className="text-xs text-muted-foreground">Accessible wrapper providing coordinated labels and error states.</span>
          </a>
        </div>
      </section>

      {/* 28. Changelog */}
      <section id="changelog" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Changelog
        </h2>
        <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-foreground">v1.0.0</span>
            <span className="text-xs text-muted-foreground">• September 25, 2026</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Initial release of File Input with native file picker semantics, mobile integration, accept filtering, and liquid optical glass styling.
          </p>
        </div>
      </section>
    </div>
  );
}
