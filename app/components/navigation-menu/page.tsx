import { Metadata } from "next";
import { NavigationMenuPreviewStage } from "./navigation-menu-preview-stage";
import { NavigationMenuDemonstrations } from "./navigation-menu-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Navigation Menu — Navigation — HaloUI",
  description:
    "An accessible navigation system for organizing primary site or product destinations with links and structured flyout content.",
};

const NAV_MENU_ROOT_PROPS: PropRow[] = [
  {
    name: "align",
    type: "'start' | 'center' | 'end'",
    default: "'start'",
    required: false,
    description: "Horizontal alignment of the floating liquid optical flyout positioner relative to the active trigger.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Optional CSS classes applied to the root navigation container element.",
  },
];

const NAV_MENU_TRIGGER_PROPS: PropRow[] = [
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "CSS classes applied to the disclosure button. Uses navigationMenuTriggerStyle() by default.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    required: true,
    description: "Label content. A directional Hugeicon chevron is automatically appended and smoothly rotated 180° when open.",
  },
];

const NAV_MENU_CONTENT_PROPS: PropRow[] = [
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Classes for inner content grid or columns. Widths such as 'w-[480px]' control viewport expansion.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    required: true,
    description: "Structured navigation links, cards, guides, or multi-column destination grids.",
  },
];

const NAV_MENU_LINK_PROPS: PropRow[] = [
  {
    name: "href",
    type: "string",
    default: "undefined",
    required: false,
    description: "Target destination URL. Renders a native anchor (<a>) element to maintain real link semantics.",
  },
  {
    name: "active",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether the destination matches the user's current route. Applies data-active state and distinct styling.",
  },
  {
    name: "closeOnClick",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether clicking this link immediately dismisses the active flyout overlay.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/navigation-menu.tsx",
    type: "file",
    description: "NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuPositioner",
  },
  {
    name: "lib/utils.ts",
    type: "file",
    description: "Class name merging utility (cn)",
  },
  {
    name: "styles/halo-tokens.css",
    type: "file",
    description: "Physical liquid optical floating surface (.halo-liquid-glass-surface) and focus tokens",
  },
];

export default function NavigationMenuDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Navigation 04
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Navigation Menu
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          An accessible navigation system for organizing primary site or product destinations with real links, disclosure triggers, and physical liquid optical flyout content.
        </p>
      </header>

      {/* 1. Interactive Preview Stage */}
      <section className="space-y-4">
        <NavigationMenuPreviewStage />
      </section>

      {/* Core Architectural Callouts */}
      <div className="space-y-3">
        <Callout type="note">
          <strong>Navigation Menu organizes destinations, not commands.</strong> Use Dropdown Menu or an action-oriented command primitive when items perform contextual application operations rather than destination navigation.
        </Callout>
        <Callout type="tip">
          <strong>A flyout trigger controls navigation content; a direct destination is a link.</strong> Avoid ambiguous hybrid controls where the same element attempts to navigate to a page and toggle disclosure flyouts simultaneously.
        </Callout>
        <Callout type="warning">
          <strong>Desktop flyout navigation does not need to be forced onto small screens.</strong> Preserve the same information architecture while composing a mobile-appropriate navigation pattern (such as an accessible drawer or accordion).
        </Callout>
        <Callout type="important">
          <strong>Navigation Menu renders navigation structure.</strong> Route generation, active-route detection, authorization, and prefetching remain application responsibilities unless an established HaloUI router integration explicitly owns them.
        </Callout>
      </div>

      {/* 2. Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install the navigation menu primitive and its tokens into your project via the shadcn CLI:
        </p>
        <InstallCommand registry="navigation-menu" />
      </section>

      {/* 3. Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Basic Usage</h2>
        <p className="text-sm text-muted-foreground">
          Compose top-level links and flyout triggers using the compound exports:
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function SiteNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Flyout group */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent className="w-[420px] p-3">
            <div className="grid grid-cols-2 gap-2">
              <NavigationMenuLink href="/features" className="p-2 rounded-lg hover:bg-muted/70">
                <div className="text-xs font-medium text-foreground">Features</div>
                <div className="text-[11px] text-muted-foreground">Explore core primitives</div>
              </NavigationMenuLink>
              <NavigationMenuLink href="/tokens" className="p-2 rounded-lg hover:bg-muted/70">
                <div className="text-xs font-medium text-foreground">Design Tokens</div>
                <div className="text-[11px] text-muted-foreground">Optical depth & light angles</div>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Direct link */}
        <NavigationMenuItem>
          <NavigationMenuLink href="/pricing" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}`}
        />
      </section>

      {/* 4. Complete Demonstrations */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Demonstrations & Patterns
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Explore direct destination links, structured 2-column flyouts, transparent header integration, location vs focus contrast, and mobile composition.
          </p>
        </div>
        <NavigationMenuDemonstrations />
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
                <th className="p-3 border-b border-border">Primitive</th>
                <th className="p-3 border-b border-border text-foreground font-semibold">Primary Purpose</th>
                <th className="p-3 border-b border-border">Interaction Mechanism</th>
                <th className="p-3 border-b border-border">Keyboard & Focus Model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3 font-semibold text-foreground">Navigation Menu</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400 font-medium">Major site/product destinations</td>
                <td className="p-3 text-muted-foreground">Direct links + hover/focus flyout disclosures</td>
                <td className="p-3 text-muted-foreground">Arrow keys across top items, Tab/Arrow into flyout, Esc dismisses</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Dropdown Menu</td>
                <td className="p-3 text-muted-foreground">Contextual actions & options</td>
                <td className="p-3 text-muted-foreground">Explicit click triggers commanding actions</td>
                <td className="p-3 text-muted-foreground">Roving arrow key focus, Space/Enter selects</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Tabs</td>
                <td className="p-3 text-muted-foreground">Switch peer views in context</td>
                <td className="p-3 text-muted-foreground">Roving tab triggers activating tab panels</td>
                <td className="p-3 text-muted-foreground">Left/Right arrows switch tabs, Tab enters panel</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Breadcrumb</td>
                <td className="p-3 text-muted-foreground">Location hierarchy trail</td>
                <td className="p-3 text-muted-foreground">Ordered ancestor links to current page</td>
                <td className="p-3 text-muted-foreground">Standard linear Tab sequence</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Pagination</td>
                <td className="p-3 text-muted-foreground">Discrete result page moving</td>
                <td className="p-3 text-muted-foreground">Page links with Previous / Next boundaries</td>
                <td className="p-3 text-muted-foreground">Standard linear Tab sequence</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Props & API Reference */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">API Reference</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Properties supported by HaloUI Navigation Menu compound exports.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">NavigationMenu</h3>
          <PropsTable rows={NAV_MENU_ROOT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">NavigationMenuTrigger</h3>
          <PropsTable rows={NAV_MENU_TRIGGER_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">NavigationMenuContent</h3>
          <PropsTable rows={NAV_MENU_CONTENT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">NavigationMenuLink</h3>
          <PropsTable rows={NAV_MENU_LINK_PROPS} />
        </div>
      </section>

      {/* 7. Accessibility Specifications */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1.5">
            <h4 className="font-semibold text-foreground">Real Navigation Links</h4>
            <p className="text-muted-foreground">
              Direct destinations render genuine <code className="font-mono text-xs">&lt;a&gt;</code> tags with valid <code className="font-mono text-xs">href</code> attributes, enabling native context menus, middle-click, and browser history.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1.5">
            <h4 className="font-semibold text-foreground">Disclosure Semantics</h4>
            <p className="text-muted-foreground">
              Triggers expose <code className="font-mono text-xs">aria-expanded</code> and <code className="font-mono text-xs">aria-controls</code> linking to their respective flyout content panel.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1.5">
            <h4 className="font-semibold text-foreground">Coordinated Viewport</h4>
            <p className="text-muted-foreground">
              A shared positioner viewport dynamically sizes to match active content without jumpy layout shifts or uncoordinated overlay z-index competition.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1.5">
            <h4 className="font-semibold text-foreground">Keyboard & Escape Dismissal</h4>
            <p className="text-muted-foreground">
              Pressing <kbd className="px-1 py-0.5 rounded bg-muted font-mono text-[11px]">Escape</kbd> immediately closes the active flyout and cleanly restores focus to the invoking trigger without navigating.
            </p>
          </div>
        </div>
      </section>

      {/* 8. File Structure */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Registry File Structure
        </h2>
        <p className="text-sm text-muted-foreground">
          Files installed into consumer repositories via the shadcn registry:
        </p>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>
    </article>
  );
}
