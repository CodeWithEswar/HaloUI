import { Metadata } from "next";
import { AlertPreviewStage } from "./alert-preview-stage";
import { AlertDemonstrations } from "./alert-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Alert — Feedback & Status 01 — HaloUI",
  description:
    "Contextual inline semantic feedback surface engineered with Subtle Liquid Glass, automatic container-aware reflow, Hugeicons iconography, and accessible WAI-ARIA role semantics.",
};

const ALERT_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Alert",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container for inline semantic messages. Encapsulates container query boundaries (@container/alert), subtle 10-layer liquid optical effects, semantic tone calibration, and optional dismissal triggers.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes including className, id, style, and aria-* attributes.",
    },
    props: [
      {
        name: "variant",
        type: "'default' | 'info' | 'success' | 'warning' | 'destructive'",
        default: "'default'",
        required: false,
        description:
          "Semantic tone intent: 'default' / 'info' (informational), 'success' (positive confirmation), 'warning' (attention required), or 'destructive' (critical error).",
      },
      {
        name: "intensity",
        type: "'subtle' | 'balanced' | 'plain'",
        default: "'subtle'",
        required: false,
        description:
          "Optical material depth: 'subtle' (canonical 10-layer liquid glass), 'balanced' (heightened diffusion for focal callouts), or 'plain' (solid, reduced transparency fallback).",
      },
      {
        name: "dismissible",
        type: "boolean",
        default: "false",
        required: false,
        description: "Whether to render an accessible top-right close/dismiss button.",
      },
      {
        name: "onDismiss",
        type: "() => void",
        required: false,
        description: "Callback invoked when the user clicks the dismiss button.",
      },
      {
        name: "icon",
        type: "React.ReactNode | false",
        required: false,
        description:
          "Custom leading icon element. If omitted, automatically renders the canonical Hugeicons icon matching the variant tone. Pass false to suppress.",
      },
      {
        name: "role",
        type: "string",
        default: "'region' | 'status' | 'alert'",
        required: false,
        description:
          "WAI-ARIA landmark/live role. Defaults to 'alert' for destructive errors, 'status' for warning/success, and 'region' for static informational alerts.",
      },
    ],
  },
  {
    name: "AlertTitle",
    kind: "Component",
    maturity: "stable",
    description:
      "Semantic heading element (<h5>) communicating the primary subject of the alert. Features high-contrast typography, text-balance wrapping, and zero-overflow clipping.",
    inheritedProps: {
      element: "React.ComponentProps<'h5'>",
      description: "Inherits standard HTML h5 heading attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Title heading text or formatted inline elements.",
      },
    ],
  },
  {
    name: "AlertDescription",
    kind: "Component",
    maturity: "stable",
    description:
      "Body container for supporting explanatory copy, diagnostic details, and inline contextual hyperlinks.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Descriptive message body text, paragraphs, or links.",
      },
    ],
  },
  {
    name: "AlertAction",
    kind: "Component",
    maturity: "stable",
    description:
      "Container-aware action slot for contextual buttons or links. Automatically reflows below text on viewports under 480px via CSS container queries.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Action controls such as HaloUI Button, outline links, or retry triggers.",
      },
    ],
  },
  {
    name: "AlertIcon",
    kind: "Component",
    maturity: "stable",
    description:
      "Optional explicit primitive wrapper for custom leading decorative iconography.",
    inheritedProps: {
      element: "React.ComponentProps<'span'>",
      description: "Inherits standard HTML span attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Custom icon element (e.g. HaloIcon wrapper).",
      },
    ],
  },
];

const ALERT_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "directory",
    children: [
      {
        name: "ui",
        type: "directory",
        children: [
          {
            name: "alert.tsx",
            type: "file",
            highlight: true,
            comment: "Core Alert primitive with Subtle Liquid Glass, reflow & WAI-ARIA",
          },
        ],
      },
      {
        name: "icons",
        type: "directory",
        children: [
          {
            name: "halo-icon.tsx",
            type: "file",
            comment: "Standardized Hugeicons wrapper",
          },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "directory",
    children: [
      {
        name: "halo-tokens.css",
        type: "file",
        comment: "Semantic color, radius, and focus-ring tokens",
      },
      {
        name: "halo-material.css",
        type: "file",
        comment: "10-layer physical liquid optical foundations",
      },
    ],
  },
];

export default function AlertPage() {
  return (
    <div className="space-y-14">
      {/* HEADER SECTION */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono">
            Feedback &amp; Status 01
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Stable
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Alert
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Contextual inline semantic feedback surface engineered with Subtle Liquid Glass, automatic container-aware reflow, Hugeicons iconography, and accessible WAI-ARIA role semantics.
        </p>
      </div>

      {/* PREVIEW STAGE */}
      <AlertPreviewStage />

      {/* INSTALLATION */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand command='npx shadcn@latest add "https://haloui.dev/r/alert.json"' />
      </section>

      {/* WHEN TO USE / WHEN NOT TO USE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border/70 bg-card/50 p-5 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
            <span className="size-2 rounded-full bg-emerald-500" />
            When to Use
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Inline contextual notifications inside form flows or data cards.</li>
            <li>System degradation warnings, scheduled maintenance notices, or quotas.</li>
            <li>Destructive failure summaries requiring corrective user actions.</li>
            <li>Positive task completion recaps embedded directly inside page content.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border/70 bg-card/50 p-5 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
            <span className="size-2 rounded-full bg-rose-500" />
            When Not to Use
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Ephemeral, temporary status popups (use <strong>Toast</strong> instead).</li>
            <li>High-consequence modal confirmations that interrupt workflows (use <strong>Alert Dialog</strong>).</li>
            <li>Field-level form validation messages directly beneath inputs (use <strong>Form Message</strong>).</li>
            <li>General decorative cards without semantic status intent (use <strong>Card</strong>).</li>
          </ul>
        </div>
      </section>

      {/* ARCHITECTURAL COMPARISONS */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Architectural Boundaries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border/60 p-4 space-y-2 bg-muted/20">
            <h4 className="font-medium text-sm text-foreground">Alert vs Toast</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Alert</strong> is persistent and inline within the document flow. It remains visible as long as the underlying condition exists. In contrast, <strong>Toast</strong> is a floating, transient notification portalled outside page layout that automatically dismisses after an elapsed timer.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 p-4 space-y-2 bg-muted/20">
            <h4 className="font-medium text-sm text-foreground">Alert vs Alert Dialog</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Alert</strong> provides passive or actionable feedback without stealing keyboard focus or halting execution. <strong>Alert Dialog</strong> is a modal surface with an ambient scrim that traps focus and forces the user to confirm or cancel before proceeding.
            </p>
          </div>
        </div>
      </section>

      {/* DEMONSTRATIONS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Production Demonstrations
        </h2>
        <AlertDemonstrations />
      </section>

      {/* PROPS EXPLORER */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            API &amp; Props Explorer
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete TypeScript interface specifications for all Alert subcomponents.
          </p>
        </div>
        <PropsExplorer components={ALERT_SUBCOMPONENTS} />
      </section>

      {/* FILE STRUCTURE */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Component Structure
        </h2>
        <FileTree nodes={ALERT_FILE_TREE} />
      </section>
    </div>
  );
}
