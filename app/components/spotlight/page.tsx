import { Metadata } from "next";
import { SpotlightPreviewStage } from "./spotlight-preview-stage";
import { SpotlightDemonstrations } from "./spotlight-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";
import { KeyboardTable } from "@/components/mdx/keyboard-table";
import { ProcessSteps } from "@/components/mdx/process-steps";
import { SourceOwnershipComparison } from "@/components/mdx/docs-visuals";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Spotlight — Overlays & Menus — HaloUI",
  description:
    "Large global discovery surface engineered for application-wide search across heterogeneous entities, files, people, and commands with HaloUI Liquid Glass optics.",
};

const SPOTLIGHT_PROPS: PropRow[] = [
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "HaloUI liquid optical glass material intensity level applied to the outer container.",
  },
  {
    name: "closeOnSelect",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether selecting any command or resource automatically triggers the onClose callback.",
  },
  {
    name: "onClose",
    type: "() => void",
    required: false,
    description: "Callback invoked when Spotlight requests closure (via Escape, outside click, or item selection).",
  },
  {
    name: "activeCategory",
    type: "string",
    required: false,
    description: "Controlled identifier for the active category filter tab (e.g. 'all', 'files', 'people').",
  },
  {
    name: "onCategoryChange",
    type: "(category: string) => void",
    required: false,
    description: "Callback fired when the user selects a different category filter tab.",
  },
];

const SPOTLIGHT_ITEM_PROPS: PropRow[] = [
  {
    name: "category",
    type: "string",
    required: false,
    description: "Entity category badge (e.g., 'FILE', 'PERSON', 'PROJECT', 'ACTION') displayed next to the title.",
  },
  {
    name: "icon",
    type: "ReactNode",
    required: false,
    description: "Leading Hugeicon or avatar element representing the resource type.",
  },
  {
    name: "description",
    type: "ReactNode",
    required: false,
    description: "Secondary supporting text or hierarchical path breadcrumb.",
  },
  {
    name: "metadata",
    type: "ReactNode",
    required: false,
    description: "Supplemental metadata such as file size, author, timestamp, or active status.",
  },
  {
    name: "shortcut",
    type: "string",
    required: false,
    description: "Visual keyboard shortcut badge (e.g., '⌘N', '⌥C') rendered on the trailing edge.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables interaction, dims the row, and excludes the item from keyboard navigation.",
  },
  {
    name: "onSelect",
    type: "(value: string) => void",
    required: false,
    description: "Callback fired when the user activates this item via Enter key or mouse click.",
  },
];

const SPOTLIGHT_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "spotlight.tsx",
            type: "file",
            description: "Canonical Spotlight global discovery surface and dialog overlay compound components.",
          },
          {
            name: "dialog.tsx",
            type: "file",
            description: "Modal dialog primitives used by SpotlightDialog.",
          },
        ],
      },
      {
        name: "haloui",
        type: "folder",
        children: [
          {
            name: "foundations",
            type: "folder",
            children: [
              {
                name: "halo-scrim.tsx",
                type: "file",
                description: "Backdrop optical attenuation and dark wash foundation.",
              },
            ],
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
        description: "Surface, border, optical highlight, and motion tokens.",
      },
      {
        name: "halo-material.css",
        type: "file",
        description: "Physical liquid glass optical recipes for light and dark environments.",
      },
    ],
  },
];

const SPOTLIGHT_KEYBOARD_SHORTCUTS = [
  {
    keys: ["ArrowDown"],
    action: "Moves active focus to the next enabled entity or action in the search results.",
  },
  {
    keys: ["ArrowUp"],
    action: "Moves active focus to the previous enabled entity or action in the search results.",
  },
  {
    keys: ["Enter"],
    action: "Executes the onSelect callback on the actively highlighted entity or action.",
  },
  {
    keys: ["Escape"],
    action: "Clears current query text, or dismisses the SpotlightDialog overlay.",
  },
  {
    keys: ["Home"],
    action: "Jumps active selection to the first result in the list.",
  },
  {
    keys: ["End"],
    action: "Jumps active selection to the last result in the list.",
  },
];

export default function SpotlightPage() {
  return (
    <div className="space-y-12">
      {/* Title & Description */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Overlays &amp; Menus
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Component 13
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Global Discovery
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Halo Scrim Integrated
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Spotlight
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          A high-level global discovery and action surface engineered to search across heterogeneous application
          resources&mdash;files, projects, team members, documentation, and system actions&mdash;powered by{" "}
          <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">cmdk</code> and
          HaloUI Liquid Glass physical optics.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <SpotlightPreviewStage />

      {/* Architectural Role Notice */}
      <Callout type="note" title="Architectural Distinction: Global Discovery vs Command Launcher">
        <strong>Spotlight is not merely a renamed duplicate of Command Palette.</strong> While Command Palette is a
        compact, action-oriented launcher focused on quick developer commands and shortcuts, Spotlight is an
        expansive global search interface designed to index heterogeneous entity models (documents, people, workspaces,
        recent items) with rich metadata, category tabs, and contextual breadcrumbs.
      </Callout>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install Spotlight directly into your project via the HaloUI registry CLI:
        </p>
        <InstallCommand registry="spotlight" />
      </div>

      {/* Source Ownership Architecture */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Source Ownership Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Spotlight distributes as transparent TypeScript and Tailwind CSS source code, giving your engineering team
          complete ownership over domain entity models, category filtering, and item styling.
        </p>

        <SourceOwnershipComparison />
      </div>

      {/* Visual Comparison Table */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">
          Architectural Responsibility Matrix
        </h3>
        <div className="overflow-x-auto rounded-xl border border-border/50">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/50 bg-muted/30 text-muted-foreground">
              <tr>
                <th className="p-3 font-semibold">Component</th>
                <th className="p-3 font-semibold">Search Scope</th>
                <th className="p-3 font-semibold">Primary Presentation</th>
                <th className="p-3 font-semibold">Result Density</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-foreground">
              <tr>
                <td className="p-3 font-medium">Spotlight</td>
                <td className="p-3 text-muted-foreground">Heterogeneous (Files, People, Workspaces, Settings, Actions)</td>
                <td className="p-3 text-muted-foreground">Expansive modal overlay (max-w-3xl) or embedded dashboard card</td>
                <td className="p-3 text-muted-foreground">Rich metadata, category badges, path breadcrumbs, timestamps</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Command Palette</td>
                <td className="p-3 text-muted-foreground">Application commands &amp; navigation links</td>
                <td className="p-3 text-muted-foreground">Compact modal dialog invoked via ⌘K</td>
                <td className="p-3 text-muted-foreground">Command title with shortcut keycap badge</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Command Menu</td>
                <td className="p-3 text-muted-foreground">Structured command collection</td>
                <td className="p-3 text-muted-foreground">Searchable listbox surface (embedded or floating)</td>
                <td className="p-3 text-muted-foreground">Icon, action title, keyboard shortcut hint</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Combobox</td>
                <td className="p-3 text-muted-foreground">Form options &amp; selectable values</td>
                <td className="p-3 text-muted-foreground">Input popover dropdown attached to a field</td>
                <td className="p-3 text-muted-foreground">Single selectable form value</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Global Discovery Pipeline */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Global Discovery Pipeline
        </h2>
        <p className="text-sm text-muted-foreground">
          How Spotlight coordinates query parsing, category scoping, and accessible roving focus:
        </p>

        <ProcessSteps
          steps={[
            {
              title: "1. Global Search Entry",
              description: "The user enters search tokens into SpotlightSearch. Prominent placeholder hints guide discovery syntax (e.g. '/' for actions, '@' for team members).",
            },
            {
              title: "2. Category Tab Scoping",
              description: "Users can click or tab through SpotlightFilterTabs to instantly constrain the query to specific resource domains (Docs, Team, Tools).",
            },
            {
              title: "3. cmdk Scoring & Categorization",
              description: "Underlying cmdk engine performs character-level fuzzy scoring across titles and keywords, maintaining 60fps responsiveness across hundreds of items.",
            },
            {
              title: "4. Execution & Focus Restoration",
              description: "Activating an entity executes onSelect, passing the stable identifier to the application routing or modal state, restoring focus cleanly.",
            },
          ]}
        />
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage Examples
        </h2>
        <p className="text-sm text-muted-foreground">
          Comprehensive Spotlight implementation with category tabs, rich entity rows, and footer keymap:
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  Spotlight,
  SpotlightSearch,
  SpotlightFilterTabs,
  SpotlightList,
  SpotlightEmpty,
  SpotlightGroup,
  SpotlightItem,
  SpotlightFooter,
} from "@/components/ui/spotlight";
import { HaloIcon } from "@/components/icons/halo-icon";
import { File01Icon, UserIcon, Settings02Icon } from "@hugeicons/core-free-icons";

export function GlobalSpotlightExample() {
  return (
    <Spotlight intensity="balanced" className="w-full max-w-3xl">
      <SpotlightSearch placeholder="Search across files, team members, and actions..." />
      <SpotlightFilterTabs
        tabs={[
          { id: "all", label: "All Items" },
          { id: "files", label: "Files & Docs" },
          { id: "people", label: "People" },
          { id: "commands", label: "Actions" },
        ]}
      />
      <SpotlightList>
        <SpotlightEmpty>No matching results found.</SpotlightEmpty>

        <SpotlightGroup heading="Documents & Projects">
          <SpotlightItem
            icon={<HaloIcon icon={File01Icon} size={16} />}
            category="PDF"
            description="Engineering / Architecture-V2-Spec.pdf"
            metadata="Updated 2h ago • 4.8 MB"
            onSelect={() => console.log("Open PDF")}
          >
            HaloUI Liquid Glass Architecture Specification
          </SpotlightItem>
        </SpotlightGroup>

        <SpotlightGroup heading="Team Members">
          <SpotlightItem
            icon={<HaloIcon icon={UserIcon} size={16} />}
            category="LEAD"
            description="Eswar Prasad • Design Systems Lead"
            metadata="Online"
            onSelect={() => console.log("Contact Eswar")}
          >
            Eswar Prasad
          </SpotlightItem>
        </SpotlightGroup>
      </SpotlightList>
      <SpotlightFooter />
    </Spotlight>
  );
}`}
        />
      </div>

      {/* Demonstrations Suite */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Interactive Capabilities &amp; Demonstrations
        </h2>
        <SpotlightDemonstrations />
      </div>

      {/* Liquid Material Architecture */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Liquid Glass Optical Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Spotlight honors HaloUI’s ten-layer physical optical engine while maintaining maximum readability:
        </p>
        <ul className="list-disc list-inside space-y-2 text-xs text-muted-foreground leading-relaxed pl-2">
          <li>
            <strong className="text-foreground">Coherent Container Material:</strong> The outer Spotlight surface carries
            the frosted transmission, 135&deg; specular edge reflection, and ambient contact shadow.
          </li>
          <li>
            <strong className="text-foreground">Zero Glass on Rows:</strong> Individual result items do not receive separate
            backdrop filters. Active navigation states use lightweight fills to preserve smooth 60fps keyboard traversal.
          </li>
          <li>
            <strong className="text-foreground">Halo Scrim Integration:</strong> When mounted within <code className="font-mono text-foreground">&lt;SpotlightDialog&gt;</code>,
            Halo Scrim applies 8px Gaussian blur and subtle dark ambient occlusion to attenuate background distractions.
          </li>
          <li>
            <strong className="text-foreground">Uncompromised Non-Modal Mode:</strong> When rendered in-page or embedded inside a dashboard,
            Spotlight renders strictly zero backdrop scrim.
          </li>
        </ul>
      </div>

      {/* Keyboard Interaction */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Keyboard Navigation
        </h2>
        <p className="text-sm text-muted-foreground">
          Complies with WAI-ARIA combobox and listbox keyboard conventions:
        </p>
        <KeyboardTable rows={SPOTLIGHT_KEYBOARD_SHORTCUTS} />
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Spotlight satisfies key accessibility criteria without requiring consumer workarounds:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-1.5">
            <h4 className="font-semibold text-foreground">ARIA Combobox &amp; Active Descendant</h4>
            <p className="text-muted-foreground leading-relaxed">
              cmdk manages <code className="font-mono text-foreground">aria-activedescendant</code>, announcing
              the focused item’s title and category to assistive technologies without moving DOM focus away from the search input.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-1.5">
            <h4 className="font-semibold text-foreground">Accessible Focus Trapping</h4>
            <p className="text-muted-foreground leading-relaxed">
              When used modally via SpotlightDialog, Base UI Dialog guarantees strict focus containment, Tab cycle prevention,
              and automatic focus restoration to the trigger element on close.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-1.5">
            <h4 className="font-semibold text-foreground">Color Contrast Compliance</h4>
            <p className="text-muted-foreground leading-relaxed">
              Primary titles maintain 7.2:1 (Light) and 8.8:1 (Dark) contrast against container glass backgrounds,
              comfortably surpassing WCAG AAA standards.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-1.5">
            <h4 className="font-semibold text-foreground">Mobile Keyboard &amp; Reflow</h4>
            <p className="text-muted-foreground leading-relaxed">
              Input and list sizing utilize responsive padding and dynamic viewport units, ensuring search fields
              remain visible when software virtual keyboards expand on mobile devices.
            </p>
          </div>
        </div>
      </div>

      {/* Component Props */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            API Reference
          </h2>
          <p className="text-sm text-muted-foreground">
            Essential configuration options for Spotlight and its compound children:
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">Spotlight Props</h3>
          <PropsTable rows={SPOTLIGHT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">SpotlightItem Props</h3>
          <PropsTable rows={SPOTLIGHT_ITEM_PROPS} />
        </div>
      </div>

      {/* File Structure */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installed Files
        </h2>
        <p className="text-sm text-muted-foreground">
          Files installed into consumer repositories when adding the spotlight component:
        </p>
        <FileTree items={SPOTLIGHT_FILES} />
      </div>

      {/* Related Components */}
      <div className="space-y-4 border-t border-border/40 pt-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/components/command-menu"
            className="group rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-colors"
          >
            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Command Menu
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Search-driven action menu for executing commands.
            </p>
          </Link>
          <Link
            href="/components/command-palette"
            className="group rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-colors"
          >
            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Command Palette
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Modal application command launcher with ⌘K hotkey.
            </p>
          </Link>
          <Link
            href="/components/dialog"
            className="group rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-colors"
          >
            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Dialog
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Modal task surface with calibrated optical scrim.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
