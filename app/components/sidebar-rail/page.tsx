import { Metadata } from "next";
import { SidebarRailPreviewStage } from "./sidebar-rail-preview-stage";
import { SidebarRailDemonstrations } from "./sidebar-rail-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Sidebar Rail — Navigation — HaloUI",
  description:
    "A compact navigation rail for preserving essential application navigation when the primary Sidebar is collapsed.",
};

const SIDEBAR_RAIL_PROPS: PropRow[] = [
  {
    name: "standalone",
    type: "boolean",
    default: "false",
    required: false,
    description: "When true, always renders the compact rail regardless of SidebarProvider open state. When false, synchronizes with SidebarProvider.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "CSS classes applied to the root rail aside element.",
  },
];

const SIDEBAR_RAIL_LINK_PROPS: PropRow[] = [
  {
    name: "href",
    type: "string",
    default: "undefined",
    required: true,
    description: "Target route URL or anchor path. Renders a native semantic <a> tag.",
  },
  {
    name: "label",
    type: "string",
    default: "undefined",
    required: true,
    description: "Mandatory accessible name communicated to assistive technology and displayed via Tooltip on hover/focus.",
  },
  {
    name: "icon",
    type: "IconSvgElement",
    default: "undefined",
    required: true,
    description: "Hugeicon symbol representing the destination route.",
  },
  {
    name: "isActive",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether the destination matches the current page. Renders aria-current='page' and distinct optical highlight.",
  },
  {
    name: "badge",
    type: "string | number",
    default: "undefined",
    required: false,
    description: "Optional unread count or indicator badge.",
  },
  {
    name: "tooltipSide",
    type: "'right' | 'top' | 'bottom' | 'left'",
    default: "'right'",
    required: false,
    description: "Side where the discovery tooltip opens relative to the rail item.",
  },
];

const SIDEBAR_RAIL_ACTION_PROPS: PropRow[] = [
  {
    name: "label",
    type: "string",
    default: "undefined",
    required: true,
    description: "Accessible name for the action button.",
  },
  {
    name: "icon",
    type: "IconSvgElement",
    default: "undefined",
    required: true,
    description: "Hugeicon symbol representing the triggered action.",
  },
  {
    name: "onClick",
    type: "React.MouseEventHandler<HTMLButtonElement>",
    default: "undefined",
    required: false,
    description: "Click event handler invoked when user activates the action button.",
  },
  {
    name: "tooltipSide",
    type: "'right' | 'top' | 'bottom' | 'left'",
    default: "'right'",
    required: false,
    description: "Side where the discovery tooltip opens.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/sidebar-rail.tsx",
    type: "file",
    description: "SidebarRail, SidebarRailHeader, SidebarRailContent, SidebarRailFooter, SidebarRailLink, SidebarRailAction, SidebarRailExpand",
  },
  {
    name: "components/ui/sidebar.tsx",
    type: "file",
    description: "Sidebar context provider, main expanded navigation container, and SidebarResizeHandle",
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
];

export default function SidebarRailDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Navigation 07
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Sidebar Rail
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A compact navigation rail for preserving essential application navigation when the primary Sidebar is collapsed.
        </p>
      </header>

      {/* 1. Interactive Preview Stage */}
      <section className="space-y-4">
        <SidebarRailPreviewStage />
      </section>

      {/* Mandatory Architectural Callouts */}
      <div className="space-y-3">
        <Callout type="important">
          <strong>Sidebar Rail is the compact form of application navigation, not a second navigation system.</strong> Reuse the same destinations and route state as the expanded Sidebar whenever possible.
        </Callout>
        <Callout type="warning">
          <strong>Hidden labels are not missing labels.</strong> Icon-only Rail destinations must retain complete accessible names even when visible text is removed.
        </Callout>
        <Callout type="tip">
          <strong>Tooltip improves discovery of compact navigation, but it is not the accessible-name mechanism.</strong> The underlying destination link retains programmatic accessible names via <code className="font-mono text-xs">aria-label</code> and hidden screen-reader text.
        </Callout>
        <Callout type="note">
          <strong>A compact desktop Rail is not automatically a good mobile navigation pattern.</strong> Use the Sidebar&apos;s established mobile navigation composition (Sheet / off-canvas drawer) on narrow screens.
        </Callout>
      </div>

      {/* 2. Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install the sidebar-rail primitive and its registry dependencies via the shadcn CLI:
        </p>
        <InstallCommand registry="sidebar-rail" />
      </section>

      {/* 3. Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Basic Usage</h2>
        <p className="text-sm text-muted-foreground">
          Compose the compact rail inside a shared <code className="font-mono text-xs">SidebarProvider</code> or as a standalone compact navigation bar:
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  SidebarRail,
  SidebarRailHeader,
  SidebarRailContent,
  SidebarRailFooter,
  SidebarRailLink,
  SidebarRailAction,
  SidebarRailExpand,
} from "@/components/ui/sidebar-rail";
import {
  Home01Icon,
  Folder01Icon,
  Analytics01Icon,
  Settings01Icon,
  Add01Icon,
} from "@hugeicons/core-free-icons";

export function AppRail({ currentRoute }: { currentRoute: string }) {
  return (
    <SidebarRail>
      <SidebarRailHeader>
        <SidebarRailExpand />
      </SidebarRailHeader>

      <SidebarRailContent>
        <SidebarRailLink
          href="/dashboard"
          label="Overview"
          icon={Home01Icon}
          isActive={currentRoute === "/dashboard"}
        />
        <SidebarRailLink
          href="/projects"
          label="Projects"
          icon={Folder01Icon}
          isActive={currentRoute === "/projects"}
        />
        <SidebarRailLink
          href="/analytics"
          label="Analytics"
          icon={Analytics01Icon}
          isActive={currentRoute === "/analytics"}
          badge="3"
        />

        <div className="my-1.5 h-px w-6 bg-border/60" />

        <SidebarRailAction
          label="Quick Create"
          icon={Add01Icon}
          onClick={() => console.log("Create modal")}
        />
      </SidebarRailContent>

      <SidebarRailFooter>
        <SidebarRailLink
          href="/settings"
          label="Settings"
          icon={Settings01Icon}
          isActive={currentRoute === "/settings"}
        />
      </SidebarRailFooter>
    </SidebarRail>
  );
}`}
        />
      </section>

      {/* 4. Relationship to Sidebar */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Relationship to Sidebar</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In application architecture, <code className="font-mono text-xs">Sidebar</code> provides broad primary navigation with textual labels, collapsible group hierarchies, workspace selectors, and nested submenus. When horizontal space is constrained or the user prefers a focused workspace, <code className="font-mono text-xs">SidebarRail</code> presents the exact same destinations in a compact 56px (3.5rem) icon rail.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The rail does not duplicate router logic, permissions, or navigation state. It synchronizes automatically with the parent <code className="font-mono text-xs">SidebarProvider</code>, hiding when expanded and emerging when collapsed.
        </p>
      </section>

      {/* 5. Interactive Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Component Demonstrations</h2>
        <SidebarRailDemonstrations />
      </section>

      {/* 6. Semantic Matrix: Rail vs Sidebar vs Dock */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Architectural Distinction: Sidebar Rail vs Dock
        </h2>
        <p className="text-sm text-muted-foreground">
          While both render vertical or horizontal icon sequences, their architectural roles are fundamentally distinct:
        </p>
        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border/80 bg-muted/40 font-semibold text-foreground">
              <tr>
                <th className="p-3">Characteristic</th>
                <th className="p-3">Sidebar Rail</th>
                <th className="p-3">Dock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground">Role</td>
                <td className="p-3">Compact collapsed state of primary Sidebar navigation</td>
                <td className="p-3">Floating surface for a small set of high-value actions/destinations</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Scope</td>
                <td className="p-3">Full primary application navigation hierarchy</td>
                <td className="p-3">Intentionally limited subset (4–7 items)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Placement</td>
                <td className="p-3">Anchored to application shell edge (left or right)</td>
                <td className="p-3">Floating above canvas content (typically bottom center)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Material</td>
                <td className="p-3">Subtle optical diffusion with structural edge</td>
                <td className="p-3">Balanced/Rich optical liquid glass with floating elevation</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Magnification</td>
                <td className="p-3">Strictly prohibited (stable hit targets required)</td>
                <td className="p-3">Deliberate optional pointer scaling enhancement</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Keyboard Navigation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Keyboard Behavior</h2>
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
                <td className="p-3">Advances focus forward through links, actions, and expand buttons in standard DOM order.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-medium text-foreground">Shift + Tab</td>
                <td className="p-3">Interactive Item</td>
                <td className="p-3">Navigates focus backward to previous focusable element without roving focus trapping.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-medium text-foreground">Enter</td>
                <td className="p-3">SidebarRailLink</td>
                <td className="p-3">Navigates directly to the target URL destination.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-medium text-foreground">Space / Enter</td>
                <td className="p-3">SidebarRailAction</td>
                <td className="p-3">Executes the assigned action callback or opens designated modal/drawer.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-medium text-foreground">Space / Enter</td>
                <td className="p-3">SidebarRailExpand</td>
                <td className="p-3">Toggles the parent SidebarProvider state to expand the full sidebar.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Component Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Component Anatomy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
            <span className="text-xs font-mono font-semibold text-primary">&lt;SidebarRail /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Root semantic <code className="font-mono text-[11px]">&lt;aside&gt;</code> container with subtle Halo liquid glass optical engine, structural border edge, and accessible navigation landmark.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
            <span className="text-xs font-mono font-semibold text-primary">&lt;SidebarRailHeader /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Top region dedicated to product mark, workspace avatar, or the expand/collapse affordance.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
            <span className="text-xs font-mono font-semibold text-primary">&lt;SidebarRailContent /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Scrollable vertical <code className="font-mono text-[11px]">&lt;nav&gt;</code> container for destination links and supporting action buttons.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
            <span className="text-xs font-mono font-semibold text-primary">&lt;SidebarRailFooter /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Bottom region anchored with a subtle optical divider for persistent utilities like Settings or Account.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
            <span className="text-xs font-mono font-semibold text-primary">&lt;SidebarRailLink /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Semantic <code className="font-mono text-[11px]">&lt;a&gt;</code> navigation destination with built-in <code className="font-mono text-[11px]">aria-label</code>, discovery Tooltip, active edge indicator, and badge support.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
            <span className="text-xs font-mono font-semibold text-primary">&lt;SidebarRailAction /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Semantic <code className="font-mono text-[11px]">&lt;button&gt;</code> action trigger for creation tasks, search modals, or notifications.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Props Tables */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">SidebarRail Props</h3>
          <PropsTable rows={SIDEBAR_RAIL_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">SidebarRailLink Props</h3>
          <PropsTable rows={SIDEBAR_RAIL_LINK_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">SidebarRailAction Props</h3>
          <PropsTable rows={SIDEBAR_RAIL_ACTION_PROPS} />
        </div>
      </section>

      {/* 10. File Tree */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installed Files</h2>
        <p className="text-sm text-muted-foreground">
          Files deployed to your project repository when installing the sidebar-rail registry component:
        </p>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>
    </article>
  );
}
