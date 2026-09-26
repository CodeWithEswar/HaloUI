import { Metadata } from "next";
import { LinkPreviewPreviewStage } from "./link-preview-preview-stage";
import { LinkPreviewDemonstrations } from "./link-preview-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Link Preview — Navigation — HaloUI",
  description:
    "A navigation link that reveals concise supplemental destination context without replacing the link's native navigation behavior.",
};

const LINK_PREVIEW_PROPS: PropRow[] = [
  {
    name: "openDelay",
    type: "number",
    default: "300",
    required: false,
    description: "Delay in milliseconds before the supplemental preview opens on pointer hover or focus.",
  },
  {
    name: "closeDelay",
    type: "number",
    default: "200",
    required: false,
    description: "Grace period in milliseconds before dismissing the preview card when pointer leaves.",
  },
  {
    name: "open",
    type: "boolean",
    default: "undefined",
    required: false,
    description: "Controlled open state of the preview popup overlay.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    required: false,
    description: "Uncontrolled initial open state upon first mounting.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: "undefined",
    required: false,
    description: "Event handler callback triggered when open state transitions.",
  },
];

const LINK_PREVIEW_TRIGGER_PROPS: PropRow[] = [
  {
    name: "href",
    type: "string",
    default: "undefined",
    required: false,
    description: "The target destination URL. LinkPreviewTrigger always preserves real anchor navigation.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether to delegate rendering to a consumer child anchor (e.g. Next.js Link) via Base UI render.",
  },
  {
    name: "delay",
    type: "number",
    default: "context.openDelay",
    required: false,
    description: "Optional trigger-level override for pointer hover open delay in milliseconds.",
  },
  {
    name: "closeDelay",
    type: "number",
    default: "context.closeDelay",
    required: false,
    description: "Optional trigger-level override for pointer leave close delay in milliseconds.",
  },
];

const LINK_PREVIEW_CONTENT_PROPS: PropRow[] = [
  {
    name: "side",
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'bottom'",
    required: false,
    description: "Preferred orientation side relative to the anchor trigger.",
  },
  {
    name: "sideOffset",
    type: "number",
    default: "8",
    required: false,
    description: "Distance in pixels between the anchor link trigger and the floating preview card.",
  },
  {
    name: "align",
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    required: false,
    description: "Alignment along the anchor trigger's primary axis.",
  },
  {
    name: "alignOffset",
    type: "number",
    default: "0",
    required: false,
    description: "Offset in pixels along the alignment axis.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "HaloUI liquid optical glass material intensity tier.",
  },
];

const LINK_PREVIEW_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "link-preview.tsx",
            type: "file",
            description: "Primary Link Preview primitive with 10-layer physical liquid glass and semantic <a> trigger.",
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
        description: "Core physical liquid glass optical tokens and surface classes.",
      },
    ],
  },
];

export default function LinkPreviewDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Navigation 15
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Preview
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Link Preview
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A navigation link that reveals concise supplemental destination context without replacing the link&apos;s native navigation behavior.
        </p>
      </div>

      {/* Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Preview
        </h2>
        <LinkPreviewPreviewStage />
      </section>

      {/* Critical Mandate Callouts */}
      <div className="space-y-4">
        <Callout type="note" title="The Link is the Primary Interaction">
          Preview content supplements a destination but must never be required to activate, understand, copy, or open the underlying link.
        </Callout>

        <Callout type="warning" title="Link Preview Does Not Fetch or Verify URLs">
          Applications own metadata retrieval, caching, sanitization, security policy, and remote media. The primitive renders developer-supplied context safely without arbitrary scraping.
        </Callout>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="link-preview" />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          language="tsx"
          filename="components/example.tsx"
          code={`import {
  LinkPreview,
  LinkPreviewTrigger,
  LinkPreviewContent,
  LinkPreviewTitle,
  LinkPreviewDescription,
} from "@/components/ui/link-preview";

export function Example() {
  return (
    <p>
      Read about our{" "}
      <LinkPreview>
        <LinkPreviewTrigger href="/analytics">
          live analytics
        </LinkPreviewTrigger>

        <LinkPreviewContent side="bottom" className="w-72">
          <LinkPreviewTitle>Live Telemetry</LinkPreviewTitle>
          <LinkPreviewDescription>
            Observe inbound cluster latency and edge node telemetry.
          </LinkPreviewDescription>
        </LinkPreviewContent>
      </LinkPreview>{" "}
      platform.
    </p>
  );
}`}
        />
      </section>

      {/* Core Architectural Principles */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Core Architectural Principles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/70 bg-card">
            <h4 className="text-sm font-semibold text-foreground">Native Anchor Semantics</h4>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Triggers always render real HTML <code className="text-foreground">&lt;a&gt;</code> elements. Middle-click, right-click context menu, and Ctrl/Cmd+click operate natively without interception.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/70 bg-card">
            <h4 className="text-sm font-semibold text-foreground">Hover Never Navigates</h4>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Pointer hovering reveals supplemental preview context. Activating navigation requires intentional user action (Click or Enter).
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/70 bg-card">
            <h4 className="text-sm font-semibold text-foreground">Keyboard Operability</h4>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Tab focus brings up the preview overlay automatically while keeping the link&apos;s Focus Ring visibly defined. Pressing Enter navigates immediately.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/70 bg-card">
            <h4 className="text-sm font-semibold text-foreground">10-Layer Physical Liquid Glass</h4>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              The preview surface renders balanced neoskeuomorphic depth: 135° specular highlights, dual-layered optical boundaries, and backdrop diffusion.
            </p>
          </div>
        </div>
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Demonstrations &amp; Edge Cases
        </h2>
        <LinkPreviewDemonstrations />
      </section>

      {/* Touch & Coarse Pointer Policy */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Touch &amp; Mobile Policy
        </h2>
        <Callout type="note" title="Hover is an Enhancement, Not a Requirement">
          Essential destination information must remain available without opening the preview. On touch devices where hover is absent, tapping the link directly navigates to the destination without requiring a double-tap.
        </Callout>
      </section>

      {/* Comparative Architecture */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component Comparisons
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border/70">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/70 bg-muted/30">
              <tr>
                <th className="p-3 font-semibold text-foreground">Component</th>
                <th className="p-3 font-semibold text-foreground">Semantic Role</th>
                <th className="p-3 font-semibold text-foreground">Interaction Trigger</th>
                <th className="p-3 font-semibold text-foreground">Content Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-muted-foreground">
              <tr>
                <td className="p-3 font-semibold text-foreground">Link Preview</td>
                <td className="p-3">Navigation link (<code className="text-foreground">&lt;a&gt;</code>)</td>
                <td className="p-3">Hover or keyboard focus</td>
                <td className="p-3">Supplemental destination summary, title, domain, metadata</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Tooltip</td>
                <td className="p-3">Accessible description (<code className="text-foreground">role=&quot;tooltip&quot;</code>)</td>
                <td className="p-3">Hover or keyboard focus</td>
                <td className="p-3">Short string (1–4 words) explaining an icon or control</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Hover Card</td>
                <td className="p-3">Generic content card (<code className="text-foreground">&lt;div&gt;</code>)</td>
                <td className="p-3">Hover or keyboard focus</td>
                <td className="p-3">Rich arbitrary content over any trigger</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Popover</td>
                <td className="p-3">Interactive disclosure (<code className="text-foreground">&lt;dialog&gt;</code>)</td>
                <td className="p-3">Click activation</td>
                <td className="p-3">Interactive controls, forms, inputs, and action buttons</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Navigation Menu</td>
                <td className="p-3">Primary site routing (<code className="text-foreground">&lt;nav&gt;</code>)</td>
                <td className="p-3">Hover or click dropdown</td>
                <td className="p-3">Hierarchical navigation destinations and mega-menu links</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component API
        </h2>
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">LinkPreview</h3>
          <PropsTable rows={LINK_PREVIEW_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">LinkPreviewTrigger</h3>
          <PropsTable rows={LINK_PREVIEW_TRIGGER_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">LinkPreviewContent</h3>
          <PropsTable rows={LINK_PREVIEW_CONTENT_PROPS} />
        </div>
      </section>

      {/* Anatomy & Structure */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Anatomy &amp; File Structure
        </h2>
        <FileTree items={LINK_PREVIEW_FILE_TREE} />
      </section>

      {/* Accessibility Checklist */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
            <span className="font-semibold text-foreground block mb-1">True Anchor Semantics</span>
            LinkPreviewTrigger renders an authentic <code className="text-foreground">&lt;a&gt;</code> tag with standard accessible name computation.
          </div>
          <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
            <span className="font-semibold text-foreground block mb-1">Keyboard Navigation</span>
            Tabbing visits the link naturally. Enter navigates directly. Esc dismisses the preview without shifting focus.
          </div>
          <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
            <span className="font-semibold text-foreground block mb-1">Halo Focus Ring</span>
            High-contrast 2px focus ring remains completely visible and unobstructed when the preview opens.
          </div>
          <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
            <span className="font-semibold text-foreground block mb-1">Reduced Motion</span>
            Honors <code className="text-foreground">prefers-reduced-motion: reduce</code> with instant opacity transitions.
          </div>
        </div>
      </section>

      {/* Dependencies */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Dependencies
        </h2>
        <div className="rounded-xl border border-border/70 p-4 bg-card text-xs space-y-2">
          <div className="flex justify-between py-1 border-b border-border/50">
            <span className="font-medium text-foreground">@base-ui/react</span>
            <span className="text-muted-foreground font-mono">^1.0.0-alpha.1</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border/50">
            <span className="font-medium text-foreground">@hugeicons/core-free-icons &amp; @hugeicons/react</span>
            <span className="text-muted-foreground font-mono">Exclusively used</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium text-foreground">clsx &amp; tailwind-merge</span>
            <span className="text-muted-foreground font-mono">via cn utility</span>
          </div>
        </div>
      </section>

      {/* Changelog */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Changelog
        </h2>
        <div className="rounded-xl border border-border/70 p-4 bg-card text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-border/50">
            <span className="font-semibold text-foreground">1.0.0</span>
            <span className="text-muted-foreground font-mono">2026-09-26</span>
          </div>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Initial production release of HaloUI Link Preview. Implements native semantic anchor triggers, 10-layer physical liquid glass overlay surfaces, automatic collision handling, and comprehensive keyboard operability.
          </p>
        </div>
      </section>
    </div>
  );
}
