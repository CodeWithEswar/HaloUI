import { Metadata } from "next";
import { LoadingOverlayPreviewStage } from "./loading-overlay-preview-stage";
import { LoadingOverlayDemonstrations } from "./loading-overlay-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Loading Overlay — Feedback & Status 09 — HaloUI",
  description:
    "Scoped blocking/loading surface engineered with Balanced Liquid Glass optics, pointer and keyboard interaction blocking, and automatic container reflow.",
};

const LOADING_OVERLAY_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "LoadingOverlay",
    kind: "Component",
    maturity: "stable",
    description:
      "Scoped loading surface that attenuates underlying content while indicating temporary blocking activity. Supports automatic children wrapping with keyboard inert isolation, or standalone insertion into positioned parent containers.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes including className, id, style, and data-* attributes.",
    },
    props: [
      {
        name: "visible",
        type: "boolean",
        default: "true",
        required: false,
        description:
          "Controls the visibility of the overlay. When active, attenuates underlying content and blocks interactions if configured.",
      },
      {
        name: "message",
        type: "React.ReactNode",
        default: "undefined",
        required: false,
        description:
          "Optional loading message displayed beneath or beside the loading indicator.",
      },
      {
        name: "spinner",
        type: "React.ReactNode",
        default: "<Spinner size='md' />",
        required: false,
        description:
          "Custom loading indicator. Defaults to canonical HaloUI Spinner primitive.",
      },
      {
        name: "intensity",
        type: "'subtle' | 'balanced' | 'opaque'",
        default: "'balanced'",
        required: false,
        description:
          "Optical material depth: 'subtle' (lightweight attenuation), 'balanced' (canonical Liquid Glass), or 'opaque' (solid base for reduced transparency).",
      },
      {
        name: "blur",
        type: "'none' | 'sm' | 'md' | 'lg'",
        default: "'md'",
        required: false,
        description:
          "Backdrop filter diffusion applied to the underlying content.",
      },
      {
        name: "blocking",
        type: "boolean",
        default: "true",
        required: false,
        description:
          "Whether the overlay blocks pointer events and keyboard Tab focus. When wrapping children, this applies the HTML inert attribute.",
      },
      {
        name: "fullPage",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "When true, renders using fixed viewport coordinates (fixed inset-0 z-50) for explicit whole-page transitions.",
      },
      {
        name: "contentClassName",
        type: "string",
        default: "undefined",
        required: false,
        description:
          "Optional className applied to the inner centered indicator and message card.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        default: "undefined",
        required: false,
        description:
          "Optional content to wrap. When provided, LoadingOverlay creates an isolated relative container.",
      },
    ],
  },
];

const LOADING_OVERLAY_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "directory",
    children: [
      {
        name: "ui",
        type: "directory",
        children: [
          {
            name: "loading-overlay.tsx",
            type: "file",
          },
          {
            name: "spinner.tsx",
            type: "file",
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
      },
      {
        name: "halo-material.css",
        type: "file",
      },
    ],
  },
];

export default function LoadingOverlayDocsPage() {
  return (
    <div className="space-y-16">
      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            Feedback &amp; Status 09
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Stable
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            role=&quot;status&quot;
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            inert Keyboard Isolation
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            Balanced Liquid Glass
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Loading Overlay</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          Scoped blocking/loading surface engineered with Balanced Liquid Glass optics, pointer and keyboard interaction blocking, and automatic container reflow.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <section className="space-y-4">
        <LoadingOverlayPreviewStage />
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install Loading Overlay directly into your project via the HaloUI shadcn-compatible CLI registry.
        </p>
        <InstallCommand registry="loading-overlay" />
      </section>

      {/* Anatomy & File Tree */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Anatomy &amp; File Tree</h2>
        <p className="text-sm text-muted-foreground">
          Source files required to compose Loading Overlay within your design system:
        </p>
        <FileTree files={LOADING_OVERLAY_FILE_TREE} />
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Demonstrations &amp; Usage Scenarios</h2>
        <LoadingOverlayDemonstrations />
      </section>

      {/* Props Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Props Reference</h2>
        <PropsExplorer components={LOADING_OVERLAY_SUBCOMPONENTS} />
      </section>

      {/* Accessibility & Design Contracts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Accessibility &amp; Design Contracts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Complete Interaction Isolation</h4>
            <p className="text-muted-foreground leading-relaxed">
              When <code className="font-mono text-xs">blocking=&#123;true&#125;</code>, pointer events are captured by the overlay and the underlying child target receives the standard HTML <code className="font-mono text-xs">inert</code> attribute, preventing keyboard users from accidentally tabbing into or submitting masked inputs.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Balanced Liquid Glass Optics</h4>
            <p className="text-muted-foreground leading-relaxed">
              Provides balanced optical attenuation (translucent backdrop blur with subtle inner highlight and border) so the user retains structural awareness of underlying content without visual distraction.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Polite Assistive Announcements</h4>
            <p className="text-muted-foreground leading-relaxed">
              The status surface declares <code className="font-mono text-xs">role=&quot;status&quot;</code> and <code className="font-mono text-xs">aria-live=&quot;polite&quot;</code>, ensuring screen readers receive notice of ongoing asynchronous operations without interrupting active user speech.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h4 className="font-semibold text-foreground">Automatic 240px Container Reflow</h4>
            <p className="text-muted-foreground leading-relaxed">
              Container queries automatically wrap the message and size the loading card proportionally to available parent width down to 240px micro-panels.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
