import { Metadata } from "next";
import { DockPreviewStage } from "./dock-preview-stage";
import { DockDemonstrations } from "./dock-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Dock — Navigation — HaloUI",
  description:
    "A floating surface for a small set of high-value destinations and actions that should remain quickly accessible.",
};

const DOCK_PROPS: PropRow[] = [
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    required: false,
    description: "Orientation layout of the dock items.",
  },
  {
    name: "magnification",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether to enable smooth transform-based scaling on pointer hover. Automatically disabled for users with prefers-reduced-motion.",
  },
  {
    name: "distance",
    type: "number",
    default: "120",
    required: false,
    description: "Radial proximity threshold (in pixels) across which neighbor items scale.",
  },
  {
    name: "maxScale",
    type: "number",
    default: "1.35",
    required: false,
    description: "Maximum scale factor applied to the item directly under the cursor.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "Optical diffusion depth, backdrop saturation, and glass refraction clarity.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "CSS classes applied to the root dock container.",
  },
];

const DOCK_ITEM_PROPS: PropRow[] = [
  {
    name: "label",
    type: "string",
    default: "undefined",
    required: true,
    description: "Mandatory accessible name communicated to assistive technologies and displayed via Tooltip on pointer hover and keyboard focus.",
  },
  {
    name: "icon",
    type: "IconSvgElement",
    default: "undefined",
    required: true,
    description: "Hugeicon symbol representing the item.",
  },
  {
    name: "href",
    type: "string",
    default: "undefined",
    required: false,
    description: "If provided, renders a semantic anchor <a> link with destination routing. If omitted, renders a semantic button <button>.",
  },
  {
    name: "isActive",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether the destination matches the current page. Renders aria-current='page' and distinct optical indicator.",
  },
  {
    name: "badge",
    type: "string | number",
    default: "undefined",
    required: false,
    description: "Optional notification count or status indicator dot.",
  },
  {
    name: "onClick",
    type: "React.MouseEventHandler",
    default: "undefined",
    required: false,
    description: "Click event handler invoked upon activation.",
  },
  {
    name: "tooltipSide",
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "top (horizontal) / right (vertical)",
    required: false,
    description: "Side where the discovery tooltip opens.",
  },
];

const DOCK_SEPARATOR_PROPS: PropRow[] = [
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Optional custom CSS classes applied to the optical divider element.",
  },
];

const DOCK_LABEL_PROPS: PropRow[] = [
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    required: true,
    description: "Text content displayed within the discovery tooltip or visual label badge.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Optional styling overrides for typography and placement.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/dock.tsx",
    type: "file",
    description: "Dock, DockItem, DockSeparator, DockLabel floating navigation primitives",
  },
  {
    name: "components/ui/tooltip.tsx",
    type: "file",
    description: "Accessible floating tooltip supplement for compact icon discovery",
  },
  {
    name: "components/icons/halo-icon.tsx",
    type: "file",
    description: "Standardized Hugeicon wrapper ensuring currentColor inheritance and optical clarity",
  },
  {
    name: "styles/halo-tokens.css",
    type: "file",
    description: "Core optical liquid glass tokens (refraction rim, specular highlights, depth shadows)",
  },
];

export default function DockDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Navigation 08
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Dock
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A floating surface for a small set of high-value destinations and actions that should remain quickly accessible.
        </p>
      </header>

      {/* 1. Interactive Preview Stage */}
      <section className="space-y-4">
        <DockPreviewStage />
      </section>

      {/* Mandatory Architectural Callouts */}
      <div className="space-y-3">
        <Callout type="important">
          <strong>Dock is intentionally selective.</strong> Use it for a small set of persistent, high-value destinations or actions rather than reproducing the application&apos;s entire navigation structure.
        </Callout>
        <Callout type="note">
          <strong>A Dock item does not have one universal semantic role.</strong> Destinations are real links (<code className="font-mono text-xs">&lt;a&gt;</code>); actions are real buttons (<code className="font-mono text-xs">&lt;button&gt;</code>). Preserve the native behavior and keyboard activation of the element being represented.
        </Callout>
        <Callout type="warning">
          <strong>Magnification is an optional visual enhancement.</strong> It must not alter DOM order, keyboard focus order, accessible names, hit-target reliability, or the ability to use the Dock with reduced motion.
        </Callout>
        <Callout type="tip">
          <strong>Dock can use richer Halo material than dense navigation components.</strong> Optical effects remain progressive enhancements. Icons, labels, and focus indicators must remain undistorted and readable across all background environments.
        </Callout>
        <Callout type="important">
          <strong>Dock defines the floating surface and item composition.</strong> Application layout decides whether it is fixed to the viewport, positioned inside a workspace, or placed elsewhere.
        </Callout>
      </div>

      {/* 2. Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install the dock primitive and its registry dependencies via the shadcn CLI:
        </p>
        <InstallCommand registry="dock" />
      </section>

      {/* 3. Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Basic Usage</h2>
        <p className="text-sm text-muted-foreground">
          Compose high-value destinations and actions inside the floating Dock surface:
        </p>
        <CodeBlock
          language="tsx"
          code={`import { Dock, DockItem, DockSeparator } from "@/components/ui/dock";
import {
  Home01Icon,
  Search01Icon,
  Add01Icon,
  Notification01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";

export function FloatingAppDock({ currentPath }: { currentPath: string }) {
  return (
    <Dock magnification={true} intensity="balanced">
      {/* Real Destination Links */}
      <DockItem
        href="/"
        label="Home"
        icon={Home01Icon}
        isActive={currentPath === "/"}
      />
      <DockItem
        href="/profile"
        label="Profile"
        icon={UserIcon}
        isActive={currentPath === "/profile"}
      />

      <DockSeparator />

      {/* Action Buttons */}
      <DockItem
        label="Quick Search"
        icon={Search01Icon}
        onClick={() => openSearchModal()}
      />
      <DockItem
        label="Create Project"
        icon={Add01Icon}
        onClick={() => openCreateModal()}
      />
      <DockItem
        label="Notifications"
        icon={Notification01Icon}
        badge="3"
        onClick={() => openNotifications()}
      />
    </Dock>
  );
}`}
        />
      </section>

      {/* 4. Interactive Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Component Demonstrations</h2>
        <DockDemonstrations />
      </section>

      {/* 5. Semantic Matrix: Dock vs Navigation Family */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Semantic Comparison Across Navigation Primitives
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border/80 bg-muted/40 font-semibold text-foreground">
              <tr>
                <th className="p-3">Component</th>
                <th className="p-3">Primary Responsibility</th>
                <th className="p-3">Semantic Model</th>
                <th className="p-3">Placement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground">Sidebar</td>
                <td className="p-3">Full primary application navigation hierarchy</td>
                <td className="p-3">Semantic links, groups, disclosure controls</td>
                <td className="p-3">Viewport edge (left or right)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Sidebar Rail</td>
                <td className="p-3">Compact collapsed state of primary Sidebar</td>
                <td className="p-3">Semantic links with accessible icon discovery</td>
                <td className="p-3">Viewport edge (compact 56px)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Dock</td>
                <td className="p-3">Selective set of high-value persistent destinations/actions</td>
                <td className="p-3">Mixed links (<code className="font-mono text-xs">&lt;a&gt;</code>) and buttons (<code className="font-mono text-xs">&lt;button&gt;</code>)</td>
                <td className="p-3">Floating surface (typically bottom center)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Toolbar</td>
                <td className="p-3">Task-specific command collection for active work surface</td>
                <td className="p-3">Action buttons and toggle groups</td>
                <td className="p-3">Contextual to current canvas/document</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">FAB</td>
                <td className="p-3">Singular dominant primary action</td>
                <td className="p-3">Single elevated action button</td>
                <td className="p-3">Floating corner (bottom-right)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Keyboard Behavior */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Keyboard Behavior</h2>
        <p className="text-sm text-muted-foreground">
          Dock items adhere strictly to standard web interaction conventions. Because a Dock may contain both navigation links and action buttons, it intentionally does not impose artificial arrow-key roving focus:
        </p>
        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border/80 bg-muted/40 font-semibold text-foreground">
              <tr>
                <th className="p-3">Key</th>
                <th className="p-3">Target</th>
                <th className="p-3">Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3 font-mono font-medium text-foreground">Tab</td>
                <td className="p-3">Interactive Item</td>
                <td className="p-3">Moves focus forward to the next Dock item in natural DOM order.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-medium text-foreground">Shift + Tab</td>
                <td className="p-3">Interactive Item</td>
                <td className="p-3">Moves focus backward to the previous Dock item.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-medium text-foreground">Enter</td>
                <td className="p-3">DockItem (Link)</td>
                <td className="p-3">Activates the destination link and navigates to the target URL.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-medium text-foreground">Space / Enter</td>
                <td className="p-3">DockItem (Button)</td>
                <td className="p-3">Triggers the action callback.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Component Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Component Anatomy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
            <span className="text-xs font-mono font-semibold text-primary">&lt;Dock /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Root floating toolbar surface with 10-layer physical liquid optical glass (base tint, diffusion, optical dual edge, 135° specular reflection, and floating depth shadows).
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
            <span className="text-xs font-mono font-semibold text-primary">&lt;DockItem /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Polymorphic interactive element rendering either a semantic link or button, housing transform magnification scaling, discovery Tooltip, and badge indicators.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
            <span className="text-xs font-mono font-semibold text-primary">&lt;DockSeparator /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Non-interactive optical divider separating distinct groups of items without cluttering the compact layout.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
            <span className="text-xs font-mono font-semibold text-primary">&lt;DockLabel /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Supporting typography element for always-visible or overlay visual label implementations.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Props Tables */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Dock Props</h3>
          <PropsTable rows={DOCK_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">DockItem Props</h3>
          <PropsTable rows={DOCK_ITEM_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">DockSeparator Props</h3>
          <PropsTable rows={DOCK_SEPARATOR_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">DockLabel Props</h3>
          <PropsTable rows={DOCK_LABEL_PROPS} />
        </div>
      </section>

      {/* 9. File Tree */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installed Files</h2>
        <p className="text-sm text-muted-foreground">
          Files deployed to your project repository when installing the dock registry component:
        </p>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>
    </article>
  );
}
