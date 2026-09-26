import { Metadata } from "next";
import { ContextMenuPreviewStage } from "./context-menu-preview-stage";
import { ContextMenuDemonstrations } from "./context-menu-demonstrations";
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
  title: "Context Menu — Overlays & Menus — HaloUI",
  description:
    "Pointer and context-triggered floating action surface engineered with HaloUI Balanced Liquid Glass optics, zero backdrop dimming, boundary collision handling, and WAI-ARIA roving keyboard navigation.",
};

const CONTEXT_MENU_CONTENT_PROPS: PropRow[] = [
  {
    name: "side",
    type: "'top' | 'right' | 'bottom' | 'left' | 'inline-end' | 'inline-start'",
    default: "'bottom'",
    required: false,
    description: "Preferred placement relative to the invocation point. Automatically flips when approaching viewport boundaries.",
  },
  {
    name: "align",
    type: "'start' | 'center' | 'end'",
    default: "'start'",
    required: false,
    description: "Alignment along the secondary axis relative to the pointer coordinates.",
  },
  {
    name: "sideOffset",
    type: "number",
    default: "4",
    required: false,
    description: "Distance in pixels between the pointer activation position and the floating menu container.",
  },
  {
    name: "alignOffset",
    type: "number",
    default: "0",
    required: false,
    description: "Additional pixel offset applied along the alignment axis.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'balanced'",
    required: false,
    description: "Physical liquid glass optical intensity governing specular highlight catch and internal reflection depth.",
  },
  {
    name: "collisionBoundary",
    type: "Element | Element[] | Rect",
    default: "'clipping-ancestors'",
    required: false,
    description: "Bounding element or boundary rectangle confining the menu position.",
  },
  {
    name: "collisionPadding",
    type: "number | Padding",
    default: "8",
    required: false,
    description: "Minimum clearance maintained from viewport or container boundaries.",
  },
];

const CONTEXT_MENU_TRIGGER_PROPS: PropRow[] = [
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Merges context-menu trigger event handlers onto the immediate child element without rendering an extraneous DOM wrapper.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Prevents context menu invocation from secondary clicks or long presses within this target zone.",
  },
];

const CONTEXT_MENU_ITEM_PROPS: PropRow[] = [
  {
    name: "variant",
    type: "'default' | 'destructive'",
    default: "'default'",
    required: false,
    description: "Visual variant. Destructive applies muted danger styling for permanent actions.",
  },
  {
    name: "inset",
    type: "boolean",
    default: "false",
    required: false,
    description: "Applies left padding to align with items containing icons or checkboxes.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Disables interaction and automatically skips the item during roving keyboard navigation.",
  },
  {
    name: "onClick",
    type: "(event: MouseEvent) => void",
    default: "undefined",
    required: false,
    description: "Event handler executed when the item is activated via pointer click or Enter/Space keys.",
  },
];

const CONTEXT_MENU_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "context-menu.tsx",
            type: "file",
            description: "Production Context Menu compound component with Balanced Liquid Glass optics, roving focus, and submenus.",
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
            description: "Unified Hugeicons rendering primitive with stroke and size standardizations.",
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
        name: "halo-material.css",
        type: "file",
        description: "Shared 10-layer physical optical engine tokens and intensity classes.",
      },
    ],
  },
];

const CONTEXT_MENU_KEYBOARD_SHORTCUTS = [
  {
    keys: ["Context Menu / Shift + F10"],
    action: "Opens the context menu anchored to the focused target element or current caret position.",
  },
  {
    keys: ["ArrowDown"],
    action: "Moves keyboard highlight to the next non-disabled item. Wraps from last to first.",
  },
  {
    keys: ["ArrowUp"],
    action: "Moves keyboard highlight to the previous non-disabled item. Wraps from first to last.",
  },
  {
    keys: ["ArrowRight"],
    action: "Opens the nested submenu when focused on a ContextMenuSubTrigger.",
  },
  {
    keys: ["ArrowLeft"],
    action: "Closes the current nested submenu and returns highlight to the parent SubTrigger.",
  },
  {
    keys: ["Enter", "Space"],
    action: "Executes the currently highlighted item's action and dismisses the context menu.",
  },
  {
    keys: ["Escape"],
    action: "Immediately dismisses the active context menu and restores focus to the trigger target.",
  },
  {
    keys: ["Home", "End"],
    action: "Jumps highlight directly to the first or last enabled menu item.",
  },
  {
    keys: ["Character Keys"],
    action: "Typeahead navigation cycling through items whose labels begin with the typed key.",
  },
];

export default function ContextMenuDocsPage() {
  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            Overlays &amp; Menus · Component 09
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            WAI-ARIA Menu / MenuItem
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Zero Scrim Non-Modal
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Context Menu
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Pointer and context-triggered floating action surface engineered with HaloUI Balanced Liquid Glass optics, zero backdrop dimming, boundary collision handling, and WAI-ARIA roving keyboard navigation.
        </p>
      </div>

      {/* Live Preview Stage */}
      <ContextMenuPreviewStage />

      {/* Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Install the Context Menu component via the HaloUI registry CLI. It adds the source code directly to your components directory for full source ownership.
        </p>

        <InstallCommand registry="context-menu" />
      </section>

      {/* Source Ownership Architecture */}
      <section id="source-ownership" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Source Ownership Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Unlike monolithic npm UI libraries, HaloUI distributes fully customizable TypeScript and Tailwind CSS source code directly into your repository.
        </p>

        <SourceOwnershipComparison />
      </section>

      {/* Workflow Architecture with ProcessSteps */}
      <section id="activation-workflow" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Invocation &amp; Interaction Lifecycle
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          How Context Menu coordinates platform triggers, pointer positioning, collision prevention, and focus management across device categories.
        </p>

        <ProcessSteps
          steps={[
            {
              title: "Contextual Event Invocation",
              description:
                "Secondary click (right-click) or long press on touch devices fires on the ContextMenuTrigger zone. The native browser menu is intercepted exclusively on deliberate targets.",
            },
            {
              title: "Pointer Positioning & Portalling",
              description:
                "Base UI reads the exact viewport pointer coordinates and portals the menu into a top-level z-index layer without generating modal backdrops or layout shifts.",
            },
            {
              title: "Boundary Collision Detection",
              description:
                "Positioner computes clearance against viewport boundaries and automatically flips placement along the inline and block axes to guarantee full on-screen visibility.",
            },
            {
              title: "Roving Focus & Command Dispatch",
              description:
                "Arrow keys navigate items with roving tabindex and typeahead filtering. Activation executes the command and immediately restores focus to the contextual target.",
            },
          ]}
        />
      </section>

      {/* When to Use vs When Not to Use */}
      <section id="usage-guidelines" className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Usage Guidelines: Context Menu vs Alternatives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
            <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              When to Use Context Menu
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 leading-relaxed">
              <li>
                <strong className="text-foreground">Secondary entity actions:</strong> Exposing contextual operations on files, data rows, or canvas objects (e.g., rename, duplicate, export, delete).
              </li>
              <li>
                <strong className="text-foreground">Power-user accelerators:</strong> Providing faster shortcuts to frequently used commands already accessible via visible toolbars or inspector panels.
              </li>
              <li>
                <strong className="text-foreground">Dense productivity surfaces:</strong> IDE viewports, spreadsheet grids, and design canvases where permanent visible buttons would clutter the interface.
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-3">
            <h3 className="text-sm font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <span className="size-2 rounded-full bg-rose-500" />
              When NOT to Use Context Menu
            </h3>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4 leading-relaxed">
              <li>
                <strong className="text-foreground">Sole path to primary functionality:</strong> Secondary clicking has low discoverability on mobile and assistive devices. Always offer a primary visible button.
              </li>
              <li>
                <strong className="text-foreground">Native editable fields:</strong> Never intercept context menus inside text inputs or textareas where users rely on native spellcheck, paste, and undo.
              </li>
              <li>
                <strong className="text-foreground">Native links:</strong> Right-clicking a link must preserve the browser&apos;s &quot;Open in New Tab&quot; and &quot;Copy Link Address&quot; options unless an explicit web app override is required.
              </li>
              <li>
                <strong className="text-foreground">Complex forms or workflows:</strong> Use <Link href="/components/dialog" className="text-foreground underline underline-offset-4">Dialog</Link> or <Link href="/components/popover" className="text-foreground underline underline-offset-4">Popover</Link> instead of cramming form controls into a menu.
              </li>
            </ul>
          </div>
        </div>

        <Callout type="warning">
          <strong>Accessibility Notice:</strong> Context Menu must never be the only method to perform critical or irreversible operations. Secondary clicks and long-press gestures are not consistently discoverable. Always provide an alternate visible trigger, such as a row actions dropdown button or an inspector toolbar.
        </Callout>
      </section>

      {/* Interactive Demonstrations */}
      <ContextMenuDemonstrations />

      {/* Liquid Glass Optical Architecture */}
      <section id="liquid-glass-optics" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Liquid Glass Optical Architecture: Balanced Floating Container
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Context Menu employs the HaloUI 10-layer physical optical engine calibrated for Balanced floating surfaces. The container carries the refractive optics while individual items remain lightweight interaction layers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="font-semibold text-foreground">Container-Level Glass</h3>
            <p className="text-muted-foreground leading-relaxed">
              The floating <code className="font-mono text-[11px] font-semibold">ContextMenuContent</code> owns the Liquid Glass boundary, 135° specular highlight, and anchoring shadow. Items never nest individual blur filters.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="font-semibold text-foreground">Zero Scrim Mandate</h3>
            <p className="text-muted-foreground leading-relaxed">
              Because Context Menu is a transient, non-modal overlay, it strictly avoids background dimming or backdrop blur scrims, keeping the underlying workspace fully visible.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
            <h3 className="font-semibold text-foreground">Kinematic Reveal</h3>
            <p className="text-muted-foreground leading-relaxed">
              Spring-free instantaneous entry transition combines an opacity fade (<code className="font-mono text-[11px]">fade-in-0</code>) with a subtle scale (<code className="font-mono text-[11px]">zoom-in-95</code>) and directional axis slide.
            </p>
          </div>
        </div>
      </section>

      {/* File Structure */}
      <section id="files" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Installed File Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The registry installation places the component files into your workspace with zero external styling runtime dependencies.
        </p>

        <FileTree items={CONTEXT_MENU_FILES} />
      </section>

      {/* Keyboard Navigation */}
      <section id="keyboard" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Keyboard Navigation Specification
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Context Menu implements the complete WAI-ARIA Menu pattern with roving tabindex, typeahead matching, and focus restoration upon dismissal.
        </p>

        <KeyboardTable rows={CONTEXT_MENU_KEYBOARD_SHORTCUTS} />
      </section>

      {/* Props Reference */}
      <section id="props" className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Component API Reference
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Essential configuration options for ContextMenuContent, ContextMenuTrigger, and ContextMenuItem.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">
            ContextMenuContent Props
          </h3>
          <PropsTable rows={CONTEXT_MENU_CONTENT_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">
            ContextMenuTrigger Props
          </h3>
          <PropsTable rows={CONTEXT_MENU_TRIGGER_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">
            ContextMenuItem Props
          </h3>
          <PropsTable rows={CONTEXT_MENU_ITEM_PROPS} />
        </div>
      </section>

      {/* Related Components */}
      <section id="related-components" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <Link
            href="/components/dropdown-menu"
            className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-1 block"
          >
            <h3 className="font-semibold text-foreground">Dropdown Menu</h3>
            <p className="text-muted-foreground">Button-triggered contextual action menu with visible affordance.</p>
          </Link>
          <Link
            href="/components/popover"
            className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-1 block"
          >
            <h3 className="font-semibold text-foreground">Popover</h3>
            <p className="text-muted-foreground">Anchored transient surface for custom interactive content and forms.</p>
          </Link>
          <Link
            href="/components/dialog"
            className="p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors space-y-1 block"
          >
            <h3 className="font-semibold text-foreground">Dialog</h3>
            <p className="text-muted-foreground">Modal task surface with focus trapping and calibrated optical scrim.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
