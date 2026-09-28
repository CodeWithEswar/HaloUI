import { Metadata } from "next";
import { ToastPreviewStage } from "./toast-preview-stage";
import { ToastDemonstrations } from "./toast-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Toast — Feedback & Status 02 — HaloUI",
  description:
    "Ephemeral application feedback surface engineered with Balanced Liquid Glass, stacked swipe physics, non-intrusive portal rendering, and mobile-safe viewport margins.",
};

const TOAST_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Toaster",
    kind: "Component",
    maturity: "stable",
    description:
      "Provider and portal container mounted once at your application root (e.g. app/layout.tsx). Listens to imperative toast triggers and renders stacked toast cards in the configured viewport region.",
    inheritedProps: {
      element: "ToastPrimitive.Provider.Props",
      description: "Inherits base-ui toast provider attributes.",
    },
    props: [
      {
        name: "position",
        type: "'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'top-center' | 'bottom-center'",
        default: "'bottom-right'",
        required: false,
        description: "Fixed viewport placement coordinates with automatic mobile-safe gutters.",
      },
      {
        name: "intensity",
        type: "'subtle' | 'balanced' | 'plain'",
        default: "'balanced'",
        required: false,
        description:
          "Optical material recipe applied to floating toast cards. Floating toasts default to 'balanced' for prominent substrate diffusion.",
      },
    ],
  },
  {
    name: "toast",
    kind: "Subcomponent",
    maturity: "stable",
    description:
      "Imperative toast manager singleton used to dispatch, update, or dismiss notifications from event handlers or asynchronous promises.",
    props: [
      {
        name: "toast.create",
        type: "(options: { title?: string; description?: string; type?: 'success' | 'info' | 'warning' | 'error' | 'loading' }) => string",
        required: true,
        description: "Spawns a new toast with semantic type accents and returns its unique id.",
      },
      {
        name: "toast.dismiss",
        type: "(id?: string) => void",
        required: false,
        description: "Dismisses a specific toast by id or all active toasts if id is omitted.",
      },
    ],
  },
  {
    name: "ToastTitle",
    kind: "Component",
    maturity: "stable",
    description:
      "Semantic heading element for the primary toast message. Features crisp high-contrast typography.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes.",
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
    name: "ToastDescription",
    kind: "Component",
    maturity: "stable",
    description:
      "Body container for supporting explanatory copy, links, or diagnostic details.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Descriptive message body text or links.",
      },
    ],
  },
  {
    name: "ToastAction",
    kind: "Component",
    maturity: "stable",
    description:
      "Contextual action trigger rendered inside the toast (e.g. Undo, Retry, View).",
    inheritedProps: {
      element: "React.ComponentProps<'button'>",
      description: "Inherits standard HTML button attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: false,
        description: "Action button label or element.",
      },
    ],
  },
  {
    name: "ToastClose",
    kind: "Component",
    maturity: "stable",
    description:
      "Tactile close button triggering manual dismissal of the active toast with accessible labeling.",
    inheritedProps: {
      element: "React.ComponentProps<'button'>",
      description: "Inherits standard HTML button attributes.",
    },
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: false,
        description: "Optional custom close icon to replace default Cancel01Icon.",
      },
    ],
  },
];

const TOAST_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "toast.tsx",
            type: "file",
            highlight: true,
            comment: "Core Toast & Toaster primitive with Balanced Liquid Glass & swipe physics",
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
            comment: "Standardized Hugeicons wrapper",
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

export default function ToastPage() {
  return (
    <div className="space-y-14">
      {/* HEADER SECTION */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono">
            Feedback &amp; Status 02
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Stable
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Toast
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Ephemeral application feedback surface engineered with Balanced Liquid Glass, stacked swipe physics, non-intrusive portal rendering, and mobile-safe viewport margins.
        </p>
      </div>

      {/* PREVIEW STAGE */}
      <ToastPreviewStage />

      {/* INSTALLATION */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="toast" />
      </section>

      {/* WHEN TO USE / WHEN NOT TO USE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border/70 bg-card/50 p-5 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
            <span className="size-2 rounded-full bg-emerald-500" />
            When to Use
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Low-friction confirmation of user-initiated background actions (e.g. &ldquo;Copied to clipboard&rdquo;).</li>
            <li>Transient status notifications that do not require immediate blocking user decisions.</li>
            <li>Non-blocking operational telemetry recaps (e.g. &ldquo;Changes saved to cloud&rdquo;).</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border/70 bg-card/50 p-5 space-y-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
            <span className="size-2 rounded-full bg-rose-500" />
            When Not to Use
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Persistent page-wide announcements or scheduled maintenance (use <strong>Banner</strong>).</li>
            <li>Inline field-level form validation messages (use <strong>Alert</strong>).</li>
            <li>Destructive irreversible actions requiring explicit modal confirmation (use <strong>Alert Dialog</strong>).</li>
            <li>Historical notification archives (use a dedicated <strong>Notification Center</strong>).</li>
          </ul>
        </div>
      </section>

      {/* ARCHITECTURAL BOUNDARIES */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Architectural Boundaries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border/60 p-4 space-y-2 bg-muted/20">
            <h4 className="font-medium text-sm text-foreground">Toast vs Alert</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Toast</strong> is temporary, floating outside layout flow, and auto-dismisses after a timer. <strong>Alert</strong> is persistent within page content and remains visible until the state resolves.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 p-4 space-y-2 bg-muted/20">
            <h4 className="font-medium text-sm text-foreground">Toast vs Banner</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Toast</strong> informs about localized background operations. <strong>Banner</strong> announces macroscopic platform-level updates (outages, new features) across an entire section or window.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 p-4 space-y-2 bg-muted/20">
            <h4 className="font-medium text-sm text-foreground">Toast vs Alert Dialog</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Toast</strong> is passive and never steals keyboard focus. <strong>Alert Dialog</strong> is modal, applies an ambient scrim, traps keyboard focus, and halts workflow until answered.
            </p>
          </div>
        </div>
      </section>

      {/* DEMONSTRATIONS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Production Demonstrations
        </h2>
        <ToastDemonstrations />
      </section>

      {/* PROPS EXPLORER */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            API &amp; Props Explorer
          </h2>
          <p className="text-sm text-muted-foreground">
            Complete TypeScript interface specifications for the Toast subcomponents and imperative manager.
          </p>
        </div>
        <PropsExplorer components={TOAST_SUBCOMPONENTS} />
      </section>

      {/* FILE STRUCTURE */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Component Structure
        </h2>
        <FileTree items={TOAST_FILE_TREE} />
      </section>
    </div>
  );
}
