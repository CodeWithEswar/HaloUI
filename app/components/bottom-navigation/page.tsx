import { Metadata } from "next";
import { BottomNavigationPreviewStage } from "./bottom-navigation-preview-stage";
import { BottomNavigationDemonstrations } from "./bottom-navigation-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Bottom Navigation — Navigation — HaloUI",
  description:
    "A mobile-first persistent navigation surface for a small set of primary application destinations.",
};

const BOTTOM_NAV_PROPS: PropRow[] = [
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "Optical diffusion depth, backdrop saturation, and glass refraction clarity.",
  },
  {
    name: "fixed",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether to anchor the navigation bar to the viewport bottom with safe-area insets.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "CSS classes applied to the root navigation element.",
  },
];

const BOTTOM_NAV_ITEM_PROPS: PropRow[] = [
  {
    name: "href",
    type: "string",
    default: "undefined",
    required: true,
    description: "Target route URL destination. Renders a native semantic <a> link.",
  },
  {
    name: "label",
    type: "string",
    default: "undefined",
    required: true,
    description: "Visible destination label and screen-reader accessible name.",
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
    description: "Whether the destination matches the current page. Renders aria-current='page' and distinct top optical indicator.",
  },
  {
    name: "badge",
    type: "string | number",
    default: "undefined",
    required: false,
    description: "Optional unread count or indicator badge.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/bottom-navigation.tsx",
    type: "file",
    description: "BottomNavigation, BottomNavigationItem, BottomNavigationLabel, BottomNavigationBadge",
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

export default function BottomNavigationDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Navigation 09
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Bottom Navigation
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A mobile-first persistent navigation surface for a small set of primary application destinations.
        </p>
      </header>

      {/* 1. Interactive Preview Stage */}
      <section className="space-y-4">
        <BottomNavigationPreviewStage />
      </section>

      {/* Mandatory Architectural Callouts */}
      <div className="space-y-3">
        <Callout type="important">
          <strong>Bottom Navigation is for primary destinations, not general actions.</strong> Use Buttons, Action Bar, Toolbar, Dock, or Floating Action Button for command-oriented interfaces.
        </Callout>
        <Callout type="note">
          <strong>Bottom Navigation is mobile-first, not mobile-only by technical necessity.</strong> Use it where compact persistent primary navigation is appropriate, and switch to broader navigation patterns (like Sidebar) when the information architecture requires more space.
        </Callout>
        <Callout type="warning">
          <strong>Fixed bottom navigation must account for device safe areas and must not cover application content.</strong> Ensure your layout provides adequate bottom padding (<code className="font-mono text-xs">pb-20</code>) so content remains completely readable above the navigation bar.
        </Callout>
        <Callout type="tip">
          <strong>Current destination and keyboard focus are independent states.</strong> The current item must retain a distinct Focus Ring when focused by keyboard.
        </Callout>
      </div>

      {/* 2. Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install the bottom-navigation primitive and its registry dependencies via the shadcn CLI:
        </p>
        <InstallCommand registry="bottom-navigation" />
      </section>

      {/* 3. Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Basic Usage</h2>
        <p className="text-sm text-muted-foreground">
          Compose primary mobile navigation destinations with native links:
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  BottomNavigation,
  BottomNavigationItem,
} from "@/components/ui/bottom-navigation";
import {
  Home01Icon,
  Search01Icon,
  Notification01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";

export function MobileNav({ currentRoute }: { currentRoute: string }) {
  return (
    <BottomNavigation fixed intensity="balanced">
      <BottomNavigationItem
        href="/"
        label="Home"
        icon={Home01Icon}
        isActive={currentRoute === "/"}
      />
      <BottomNavigationItem
        href="/search"
        label="Search"
        icon={Search01Icon}
        isActive={currentRoute === "/search"}
      />
      <BottomNavigationItem
        href="/alerts"
        label="Alerts"
        icon={Notification01Icon}
        isActive={currentRoute === "/alerts"}
        badge="3"
      />
      <BottomNavigationItem
        href="/profile"
        label="Profile"
        icon={UserIcon}
        isActive={currentRoute === "/profile"}
      />
    </BottomNavigation>
  );
}`}
        />
      </section>

      {/* 4. Interactive Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Component Demonstrations</h2>
        <BottomNavigationDemonstrations />
      </section>

      {/* 5. Semantic Comparison: Bottom Navigation vs Dock vs Tabs vs Sidebar */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Architectural Responsibility Matrix
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border/80 bg-muted/40 font-semibold text-foreground">
              <tr>
                <th className="p-3">Characteristic</th>
                <th className="p-3">Bottom Navigation</th>
                <th className="p-3">Dock</th>
                <th className="p-3">Tabs</th>
                <th className="p-3">Sidebar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground">Role</td>
                <td className="p-3">Primary top-level mobile destinations</td>
                <td className="p-3">Selective set of high-value actions/links</td>
                <td className="p-3">Peer content views within the same view</td>
                <td className="p-3">Broad primary application navigation</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Semantics</td>
                <td className="p-3">Real links (<code className="font-mono text-xs">&lt;a&gt;</code>)</td>
                <td className="p-3">Mixed links and buttons</td>
                <td className="p-3">WAI-ARIA tablist composite widget</td>
                <td className="p-3">Links, groups, disclosures</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Placement</td>
                <td className="p-3">Fixed to bottom edge with safe area</td>
                <td className="p-3">Floating surface (typically bottom center)</td>
                <td className="p-3">Embedded within page content</td>
                <td className="p-3">Docked to viewport edge</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Keyboard Model</td>
                <td className="p-3">Ordinary Tab progression</td>
                <td className="p-3">Ordinary Tab progression</td>
                <td className="p-3">Arrow-key roving focus</td>
                <td className="p-3">Ordinary Tab progression</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Keyboard Behavior */}
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
                <td className="p-3">BottomNavigationItem</td>
                <td className="p-3">Advances focus forward through destination links in standard DOM order.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-medium text-foreground">Shift + Tab</td>
                <td className="p-3">BottomNavigationItem</td>
                <td className="p-3">Moves focus backward without trapping or roving arrow hijacking.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-medium text-foreground">Enter</td>
                <td className="p-3">BottomNavigationItem</td>
                <td className="p-3">Navigates directly to the target URL destination.</td>
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
            <span className="text-xs font-mono font-semibold text-primary">&lt;BottomNavigation /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Root semantic <code className="font-mono text-[11px]">&lt;nav&gt;</code> element with optical liquid glass, safe-area padding, and top optical edge.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
            <span className="text-xs font-mono font-semibold text-primary">&lt;BottomNavigationItem /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Semantic <code className="font-mono text-[11px]">&lt;a&gt;</code> anchor with 56px touch target, active indicator pill, and Focus Ring.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
            <span className="text-xs font-mono font-semibold text-primary">&lt;BottomNavigationLabel /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Visible text label with overflow safety and bold typography on the active route.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-2">
            <span className="text-xs font-mono font-semibold text-primary">&lt;BottomNavigationBadge /&gt;</span>
            <p className="text-xs text-muted-foreground">
              Compact unread badge anchored to the upper-right corner of the destination icon.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Props Tables */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">BottomNavigation Props</h3>
          <PropsTable rows={BOTTOM_NAV_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">BottomNavigationItem Props</h3>
          <PropsTable rows={BOTTOM_NAV_ITEM_PROPS} />
        </div>
      </section>

      {/* 9. File Tree */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installed Files</h2>
        <p className="text-sm text-muted-foreground">
          Files deployed to your project repository when installing the bottom-navigation registry component:
        </p>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>
    </article>
  );
}
