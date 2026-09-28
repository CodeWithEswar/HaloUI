import { Metadata } from "next";
import { JsonViewerPreviewStage } from "./json-viewer-preview-stage";
import { JsonViewerDemonstrations } from "./json-viewer-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "JSON Viewer — Data Display 23 — HaloUI",
  description:
    "Structured hierarchical JSON inspection primitive engineered with accessible disclosure controls, tokenized container-aware indentation, and restrained HaloUI Liquid Glass optics.",
};

const JSON_VIEWER_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "JsonViewer",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container for structured JSON inspection. Manages safe parsing, recursive node disclosure, indentation scales, clipboard serialization, and container query boundaries (@container/json-viewer).",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits all standard HTML div element properties including id, className, aria-*, and DOM events.",
    },
    props: [
      {
        name: "data",
        type: "unknown",
        required: false,
        description: "Parsed JSON-compatible structured data (object, array, or primitive).",
      },
      {
        name: "json",
        type: "string",
        required: false,
        description:
          "Optional raw JSON string to parse safely. If invalid syntax is encountered, a structured accessible error state is presented without throwing.",
      },
      {
        name: "title",
        type: "string",
        required: false,
        description: "Title or filename displayed in the toolbar header (e.g. 'response.json', 'package.json').",
      },
      {
        name: "defaultExpandedDepth",
        type: "number",
        default: "2",
        required: false,
        description:
          "Initial nesting depth to expand: 0 (all collapsed), 1 (root only), 2 (root and first level), or Infinity (fully expanded).",
      },
      {
        name: "variant",
        type: "'default' | 'glass' | 'plain'",
        default: "'default'",
        required: false,
        description:
          "Framing variant: 'default' (subtle border and stable background for dense layouts), 'glass' (restrained HaloUI liquid glass outer shell when standalone), or 'plain' (borderless unpadded view for nesting inside Cards or Tabs).",
      },
      {
        name: "size",
        type: "'sm' | 'default' | 'lg'",
        default: "'default'",
        required: false,
        description:
          "Typography scale: 'sm' (12px monospaced typography for dense views), 'default' (13px), or 'lg' (14px).",
      },
      {
        name: "showToolbar",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to render the header toolbar with title, Expand All / Collapse All controls, and copy action.",
      },
      {
        name: "showCopy",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to display the canonical CopyButton in the toolbar.",
      },
      {
        name: "showItemCount",
        type: "boolean",
        default: "true",
        required: false,
        description: "Whether to show item and key count badges on objects and arrays (e.g. '{ 4 keys }', '[ 12 items ]').",
      },
      {
        name: "maxHeight",
        type: "string | number",
        required: false,
        description: "Optional maximum height with internal overscroll-contained vertical scrolling.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Class names merged with the outer container element.",
      },
    ],
  },
];

const JSON_VIEWER_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "json-viewer.tsx",
            type: "file",
            description: "Production JsonViewer primitive with safe parser and recursive disclosure.",
          },
          {
            name: "copy-button.tsx",
            type: "file",
            description: "Canonical HaloUI clipboard action primitive.",
          },
        ],
      },
      {
        name: "icons",
        type: "folder",
        children: [
          {
            name: "halo-icon.tsx",
            type: "file",
            description: "HaloUI icon bridge for Hugeicons rendering.",
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
        description: "Focus ring and spatial tokens.",
      },
      {
        name: "halo-material.css",
        type: "file",
        description: "Liquid glass 10-layer physical optical engine recipes.",
      },
    ],
  },
];

export default function JsonViewerDocsPage() {
  return (
    <div className="space-y-12">
      {/* Header & Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            Data Display 23
          </Badge>
          <Badge variant="secondary">Stable</Badge>
          <Badge variant="outline">Structured Hierarchy</Badge>
          <Badge variant="outline">Restrained Liquid Glass</Badge>
          <Badge variant="outline">All-Device Responsive</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          JSON Viewer
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Structured hierarchical JSON inspection primitive engineered with accessible disclosure
          controls, tokenized container-aware indentation, and restrained HaloUI Liquid Glass optics.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Interactive Stage</h2>
          <span className="text-xs text-muted-foreground font-mono">
            6 Backdrops &bull; 9 Widths &bull; 6 Scenarios &bull; Depth Controls
          </span>
        </div>
        <JsonViewerPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Installation</h2>
        <InstallCommand registry="json-viewer" />
      </section>

      {/* Anatomy */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Anatomy &amp; File Structure</h2>
        <p className="text-sm text-muted-foreground">
          JSON Viewer distributes as a self-contained, dependency-free developer primitive.
        </p>
        <FileTree data={JSON_VIEWER_FILE_TREE} />
      </section>

      {/* Component Boundaries & Comparisons */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Component Boundaries &amp; Semantic Roles
        </h2>
        <p className="text-sm text-muted-foreground">
          Distinguishing JSON Viewer from related developer components guarantees appropriate tool
          selection and avoids misapplied semantics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">JSON Viewer (Data Display 23)</span>
              <Badge variant="outline">Structured Hierarchy</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use when inspecting <strong>nested objects, arrays, and payload hierarchies</strong> with
              interactive expand/collapse disclosures, key counts, and tokenized indentation.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Code Block (Data Display 22)</span>
              <Badge variant="outline">Source Text</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use when presenting <strong>exact, verbatim source code or configuration text</strong> where
              line numbers, raw indentation, and language syntax highlighting are paramount.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Diff Viewer (Data Display 24)</span>
              <Badge variant="outline">State Comparison</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>comparing two states or payload versions</strong> (before vs after),
              displaying additions, deletions, and unchanged context lines.
            </p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Tree Navigation (Navigation 12)</span>
              <Badge variant="outline">Page Navigation</Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use for <strong>application-level routing and hierarchical navigation</strong>. JSON Viewer
              is a data-inspection tool, not a routing or navigation mechanism.
            </p>
          </div>
        </div>
      </section>

      {/* Automatic Responsiveness & Container Queries */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Strict Automatic Container-Aware Responsiveness for ALL Devices
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          HaloUI JSON Viewer features <strong>zero JavaScript resize listeners</strong> or viewport
          polling hacks. It adapts automatically to any parent container width:
        </p>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">
            Responsive Engineering Principles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Tokenized Indentation</span>
              <p className="text-muted-foreground">
                Deep nesting utilizes disciplined <code className="font-mono">pl-3.5</code> indentation
                so deeply nested structures do not consume the entire width on mobile devices.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Container Queries</span>
              <p className="text-muted-foreground">
                Bound by <code className="font-mono">@container/json-viewer</code> to cleanly wrap keys
                and values when container width drops below 320px.
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3 space-y-1">
              <span className="font-semibold text-foreground block">Internal Overflow Containment</span>
              <p className="text-muted-foreground">
                Long unbroken strings, hashes, and URLs utilize <code className="font-mono">break-words min-w-0</code> to
                prevent document-level horizontal scroll blowout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liquid Glass Architecture */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          HaloUI Liquid Glass Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Because developer tools are information-dense, data legibility always takes precedence
          over decorative material:
        </p>

        <div className="rounded-xl border border-border/80 bg-card/60 p-5 space-y-4">
          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Strictly No Glass per Node:</strong> 100 JSON properties
                do not create 100 backdrop-filter surfaces. The outer shell carries the material, while
                the internal reading plane remains optically stable.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Zero Text Refraction:</strong> Key glyphs, string values,
                numbers, and braces are never distorted, blurred, or refracted.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Distinct Primitive Syntax:</strong> Strings, numbers,
                booleans, and null receive dedicated semantic colors that maintain WCAG contrast in both Light and Dark modes.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">&bull;</span>
              <span>
                <strong className="text-foreground">Flat Base for Nested Views:</strong> When embedded inside
                Cards, Sheets, or Dialogs, <code className="font-mono">variant=&quot;plain&quot;</code> eliminates
                glass-on-glass noise.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Production Demonstrations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Production Demonstrations</h2>
          <span className="text-xs text-muted-foreground font-mono">6 Scenarios</span>
        </div>
        <JsonViewerDemonstrations />
      </section>

      {/* Props & API Explorer */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">API Reference &amp; Props Explorer</h2>
        <p className="text-sm text-muted-foreground">
          Explore complete typed properties, defaults, and inherited semantic HTML attributes across the
          JsonViewer component.
        </p>
        <PropsExplorer subcomponents={JSON_VIEWER_SUBCOMPONENTS} />
      </section>
    </div>
  );
}
