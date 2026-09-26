import { Metadata } from "next";
import { SidebarPreviewStage } from "./sidebar-preview-stage";
import { SidebarDemonstrations } from "./sidebar-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Sidebar — Navigation — HaloUI",
  description:
    "A responsive application navigation container for organizing primary destinations, grouped navigation, supporting actions, and optional collapsed states.",
};

const SIDEBAR_PROVIDER_PROPS: PropRow[] = [
  {
    name: "defaultOpen",
    type: "boolean",
    default: "true",
    required: false,
    description: "Initial uncontrolled open state on desktop viewports.",
  },
  {
    name: "open",
    type: "boolean",
    default: "undefined",
    required: false,
    description: "Controlled open state of the desktop sidebar.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: "undefined",
    required: false,
    description: "Callback fired when the open state changes via user interaction or shortcut.",
  },
];

const SIDEBAR_ROOT_PROPS: PropRow[] = [
  {
    name: "side",
    type: "'left' | 'right'",
    default: "'left'",
    required: false,
    description: "Which side of the viewport the sidebar renders on.",
  },
  {
    name: "variant",
    type: "'sidebar' | 'floating' | 'inset'",
    default: "'sidebar'",
    required: false,
    description: "Visual layout style: standard edge-docked, floating panel, or nested inside an inset application shell.",
  },
  {
    name: "collapsible",
    type: "'offcanvas' | 'icon' | 'none'",
    default: "'offcanvas'",
    required: false,
    description: "Collapse mode: completely hidden off-canvas, compacted to a 3rem icon rail, or statically non-collapsible.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "CSS classes applied to the root sidebar structural element.",
  },
];

const SIDEBAR_BUTTON_PROPS: PropRow[] = [
  {
    name: "isActive",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether the destination matches the current page. Renders aria-current='page' and distinct highlight.",
  },
  {
    name: "tooltip",
    type: "string | TooltipContentProps",
    default: "undefined",
    required: false,
    description: "Tooltip label revealed during icon-collapsed mode. Links retain their own programmatic accessible name.",
  },
  {
    name: "variant",
    type: "'default' | 'outline'",
    default: "'default'",
    required: false,
    description: "Visual styling variant for the navigation button or link.",
  },
  {
    name: "size",
    type: "'default' | 'sm' | 'lg'",
    default: "'default'",
    required: false,
    description: "Vertical size and typography scale.",
  },
];

const SIDEBAR_TRIGGER_PROPS: PropRow[] = [
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Custom classes applied to the trigger toggle button.",
  },
  {
    name: "onClick",
    type: "React.MouseEventHandler",
    default: "undefined",
    required: false,
    description: "Optional custom click callback executing alongside toggleSidebar.",
  },
];

const SIDEBAR_GROUP_PROPS: PropRow[] = [
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Optional styling overrides for the navigation group container.",
  },
];

const SIDEBAR_RAIL_PROPS: PropRow[] = [
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Custom styling applied to the interactive rail resize handle.",
  },
];

const SIDEBAR_INSET_PROPS: PropRow[] = [
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Custom styling applied to the primary main workspace content region.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/sidebar.tsx",
    type: "file",
    description: "Sidebar, SidebarProvider, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarRail, SidebarInset",
  },
  {
    name: "components/ui/sheet.tsx",
    type: "file",
    description: "Mobile overlay drawer primitive reused during mobile off-canvas presentation",
  },
  {
    name: "components/ui/collapsible.tsx",
    type: "file",
    description: "Accessible disclosure primitive for collapsible nested destination groups",
  },
  {
    name: "components/ui/tooltip.tsx",
    type: "file",
    description: "Tooltip display supplement for icon-collapsed rail mode",
  },
  {
    name: "components/icons/halo-icon.tsx",
    type: "file",
    description: "Standardized Hugeicon wrapper ensuring currentColor inheritance and optical clarity",
  },
];

export default function SidebarDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Navigation 06
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Sidebar
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A responsive application navigation container for organizing primary destinations, grouped navigation, supporting actions, and optional collapsed states.
        </p>
      </header>

      {/* 1. Interactive Preview Stage */}
      <section className="space-y-4">
        <SidebarPreviewStage />
      </section>

      {/* Core Architectural Callouts */}
      <div className="space-y-3">
        <Callout type="note">
          <strong>Sidebar is navigation, not an ARIA menu.</strong> Ordinary destination links should retain normal link semantics and keyboard behavior. Never apply ARIA menu roles merely because navigation items are organized vertically.
        </Callout>
        <Callout type="tip">
          <strong>Current destination and keyboard focus are separate states.</strong> A current Sidebar link must retain a clearly visible Focus Ring when focused.
        </Callout>
        <Callout type="warning">
          <strong>Collapsing the Sidebar may hide visible labels, but it must not remove accessible names.</strong> Links in icon-collapsed mode retain programmatic names via screen-reader text, ensuring accessibility is independent of tooltip hover.
        </Callout>
        <Callout type="important">
          <strong>Sidebar renders navigation supplied by the application.</strong> Route definitions, permissions, current-route calculation, and navigation data remain application responsibilities.
        </Callout>
      </div>

      {/* 2. Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install the sidebar primitive and its registry dependencies into your project via the shadcn CLI:
        </p>
        <InstallCommand registry="sidebar" />
      </section>

      {/* 3. Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Basic Usage</h2>
        <p className="text-sm text-muted-foreground">
          Compose primary application navigation using SidebarProvider and compound primitives:
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Home01Icon, Folder01Icon } from "@hugeicons/core-free-icons";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader className="p-3 font-semibold text-sm">
          Acme Studio
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={true} tooltip="Overview">
                    <HaloIcon icon={Home01Icon} size={16} />
                    <span>Overview</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Projects">
                    <HaloIcon icon={Folder01Icon} size={16} />
                    <span>Projects</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-3 text-xs text-muted-foreground">
          User Account
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}`}
        />
      </section>

      {/* 4. Complete Demonstrations */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Demonstrations &amp; Patterns
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Explore grouped destinations, collapsible disclosure trees, current vs focus contrast, secondary item actions, and independent content scrolling.
          </p>
        </div>
        <SidebarDemonstrations />
      </section>

      {/* 5. Architectural Semantic Matrix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Navigation Primitive Semantic Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse border border-border/80">
            <thead className="bg-muted/40 font-mono text-muted-foreground">
              <tr>
                <th className="p-3 border-b border-border">Component</th>
                <th className="p-3 border-b border-border text-foreground font-semibold">Primary Purpose</th>
                <th className="p-3 border-b border-border">Interaction Mechanism</th>
                <th className="p-3 border-b border-border">Keyboard &amp; Focus Model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3 font-semibold text-foreground">Sidebar</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Application Navigation &amp; Shell Regions</td>
                <td className="p-3 text-muted-foreground">Primary hierarchical navigation links &amp; disclosures</td>
                <td className="p-3 text-muted-foreground">Standard document Tab order; Enter activates links; disclosure toggles</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Menubar</td>
                <td className="p-3 text-muted-foreground">Persistent Application Commands</td>
                <td className="p-3 text-muted-foreground">Dropdown command categories (File, Edit, View)</td>
                <td className="p-3 text-muted-foreground">Arrow keys rove categories and items; Esc dismisses; Space/Enter activates</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Navigation Menu</td>
                <td className="p-3 text-muted-foreground">Site &amp; Product Navigation</td>
                <td className="p-3 text-muted-foreground">Direct links + hover/focus flyout disclosures</td>
                <td className="p-3 text-muted-foreground">Arrow roving across triggers; Tab/Arrow into flyouts</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Drawer / Sheet</td>
                <td className="p-3 text-muted-foreground">Mobile Off-Canvas Shell</td>
                <td className="p-3 text-muted-foreground">Modal overlay sliding from viewport edge</td>
                <td className="p-3 text-muted-foreground">Focus trap, Escape dismisses, focus restored to activating trigger</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Keyboard Behavior Specification */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Keyboard Navigation Specification
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse border border-border/80">
            <thead className="bg-muted/40 font-mono text-muted-foreground">
              <tr>
                <th className="p-3 border-b border-border">Key / Combo</th>
                <th className="p-3 border-b border-border">Target Element</th>
                <th className="p-3 border-b border-border text-foreground font-semibold">Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Tab / Shift+Tab</td>
                <td className="p-3 text-muted-foreground">Sidebar Destinations</td>
                <td className="p-3 text-muted-foreground">Advances focus sequentially through links and interactive buttons in standard document order.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Enter</td>
                <td className="p-3 text-muted-foreground">Navigation Link</td>
                <td className="p-3 text-muted-foreground">Activates the link and navigates to the destination URL.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Space / Enter</td>
                <td className="p-3 text-muted-foreground">Disclosure Trigger</td>
                <td className="p-3 text-muted-foreground">Expands or collapses nested destination groups.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Ctrl+B / ⌘B</td>
                <td className="p-3 text-muted-foreground">Global Window</td>
                <td className="p-3 text-muted-foreground">Toggles the sidebar between expanded and collapsed modes.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400">Escape</td>
                <td className="p-3 text-muted-foreground">Mobile Sheet Overlay</td>
                <td className="p-3 text-muted-foreground">Dismisses the modal mobile sidebar and restores focus to the trigger.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Props API Reference */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">API Reference</h2>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">SidebarProvider</h3>
          <p className="text-sm text-muted-foreground">Context provider coordinating responsive and collapse states.</p>
          <PropsTable rows={SIDEBAR_PROVIDER_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">Sidebar</h3>
          <p className="text-sm text-muted-foreground">Main sidebar navigation container element.</p>
          <PropsTable rows={SIDEBAR_ROOT_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">SidebarMenuButton</h3>
          <p className="text-sm text-muted-foreground">Interactive destination link or button within a sidebar menu item.</p>
          <PropsTable rows={SIDEBAR_BUTTON_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">SidebarTrigger</h3>
          <p className="text-sm text-muted-foreground">Action button toggling expanded and collapsed modes.</p>
          <PropsTable rows={SIDEBAR_TRIGGER_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">SidebarGroup</h3>
          <p className="text-sm text-muted-foreground">Semantic container for grouping related navigation items.</p>
          <PropsTable rows={SIDEBAR_GROUP_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">SidebarRail</h3>
          <p className="text-sm text-muted-foreground">Interactive boundary handle supporting cursor resize and click toggling.</p>
          <PropsTable rows={SIDEBAR_RAIL_PROPS} />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground font-mono">SidebarInset</h3>
          <p className="text-sm text-muted-foreground">Main workspace content region with responsive margins and borders.</p>
          <PropsTable rows={SIDEBAR_INSET_PROPS} />
        </div>
      </section>

      {/* 8. Component Anatomy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Component Anatomy</h2>
        <p className="text-sm text-muted-foreground">
          The Sidebar compound API coordinates layout, navigation landmarks, disclosure hierarchies, and responsive presentations:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;SidebarProvider /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Top-level context provider for expanded, collapsed, and mobile sheet state.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;Sidebar /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Structural container providing desktop layout docking and mobile sheet fallback.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;SidebarHeader /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Anchored header region for product identity and workspace switchers.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;SidebarContent /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Independently scrollable region managing all navigation groups.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;SidebarFooter /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Anchored footer region for user accounts, status, and secondary links.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;SidebarRail /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Accessible keyboard-operable boundary rail for toggling sidebar width.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;SidebarInset /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Main content container paired with inset and floating sidebar layouts.</p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1">
            <span className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">&lt;SidebarTrigger /&gt;</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Icon button triggering expanded and collapsed mode transitions.</p>
          </div>
        </div>
      </section>

      {/* 9. Installed Files */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installed Files</h2>
        <p className="text-sm text-muted-foreground">
          Files installed in your repository when adding the Sidebar primitive:
        </p>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>

      {/* 10. Accessibility & Compliance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Accessibility &amp; Standards
        </h2>
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <p>
            Sidebar adheres to W3C WAI-ARIA application navigation guidelines and WCAG 2.1 AA requirements:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>
              <strong>Real Navigation Semantics:</strong> Destinations are rendered as real links, not ARIA menus. Standard Tab order and Enter activation apply.
            </li>
            <li>
              <strong>Active Route State:</strong> The current destination receives <code className="font-mono text-xs">aria-current="page"</code> for assistive technologies.
            </li>
            <li>
              <strong>Visual State Separation:</strong> Current destination tint and keyboard focus rings are visually distinct layers, preventing confusion during keyboard navigation.
            </li>
            <li>
              <strong>Icon-Collapsed Accessibility:</strong> Tooltips provide visual hints, but links retain programmatic names independently.
            </li>
            <li>
              <strong>Mobile Focus Management:</strong> On mobile devices, the sidebar becomes a modal sheet with focus containment and Escape dismissal.
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}
