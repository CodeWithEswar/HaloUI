import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  SparklesIcon,
  SecurityCheckIcon,
  Layers01Icon,
  ArrowRight01Icon,
  Menu01Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { PortalPreviewStage } from "./portal-preview-stage";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/mdx/install-command";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Halo Portal Surface — Portalled Overlay Foundation",
  description:
    "Consistent liquid-glass material wrapper for portalled overlays, modal dialogs, popovers, and floating menus rendered outside the standard DOM flow.",
};

const PROPS_DATA = [
  {
    name: "asPortal",
    type: "boolean",
    default: "false",
    required: false,
    description:
      "When true, wraps the surface in React createPortal into document.body or the specified container.",
  },
  {
    name: "container",
    type: "HTMLElement | null",
    default: "document.body",
    required: false,
    description: "Custom target DOM container when asPortal is set to true.",
  },
  {
    name: "elevation",
    type: '"floating" | "overlay" | "raised"',
    default: '"overlay"',
    required: false,
    description:
      "Optical elevation tier: 'floating' provides 28px blur; 'overlay' provides 44px blur and deep ambient occlusion.",
  },
  {
    name: "intensity",
    type: '"subtle" | "balanced" | "rich"',
    default: '"balanced"',
    required: false,
    description: "Strength of specular catch highlights, edge luminescence, and diffusion blur.",
  },
  {
    name: "hasHighlight",
    type: "boolean",
    default: "true",
    required: false,
    description: "Renders the 135° directional specular reflection layer across the top-left boundary.",
  },
  {
    name: "hasEdge",
    type: "boolean",
    default: "true",
    required: false,
    description: "Renders the layered outer and inset optical boundary hairline.",
  },
  {
    name: "hasNoise",
    type: "boolean",
    default: "false",
    required: false,
    description: "Renders subtle high-frequency fractal noise mask to eliminate banding over dark backgrounds.",
  },
  {
    name: "glowColor",
    type: '"cyan" | "violet" | "amber" | "emerald" | "neutral" | "none"',
    default: '"none"',
    required: false,
    description: "Optional luminous accent glow for active or high-priority modal surfaces.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Merges classes onto child element using Radix Slot without extra container nodes.",
  },
];

const RELATED_FOUNDATIONS = [
  {
    name: "Halo Scrim",
    href: "/components/halo-scrim",
    role: "Backdrop Foundation",
    description: "Modal backdrop providing optical blur diffusion and contact darkness behind portalled surfaces.",
  },
  {
    name: "Halo Surface",
    href: "/components/halo-surface",
    role: "Base Material",
    description: "The core 10-layer physical container providing substrate geometry and blur tokens.",
  },
  {
    name: "Halo Focus Ring",
    href: "/components/halo-focus-ring",
    role: "Accessibility",
    description: "High-contrast focus perimeter for interactive action controls housed within portalled overlays.",
  },
];

export default function HaloPortalSurfaceDocsPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-16">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Halo Portal Surface
        </h1>

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Consistent liquid-glass material wrapper for portalled overlays, modal dialogs, popovers, context menus, and tooltips rendered outside the primary DOM document flow.
        </p>
      </div>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <PortalPreviewStage />
      </section>

      {/* 3. Installation */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install the portal surface foundation into your project:
        </p>
        <InstallCommand registry="http://localhost:3000/r/halo-portal-surface.json" />
      </div>

      {/* 4. Architectural Guidance: When to Use */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Architectural Guidance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border bg-card space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              When to Use
            </h3>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Modal dialogs, alert confirmations, and action sheets.</li>
              <li>Floating popovers, hover cards, and rich tooltips.</li>
              <li>Dropdown menus and right-click context menus.</li>
              <li>Overlays rendered into <code>document.body</code> or headless portal roots.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border bg-card space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              When Not to Use
            </h3>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Inline page cards, hero banners, or dashboards (use <code>HaloSurface</code>).</li>
              <li>Simple nested UI sections that do not escape parent stacking contexts.</li>
              <li>Backdrop overlays and scrims (use <code>HaloScrim</code> instead).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Radix & Base UI Integration Example */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Integration with Radix Dialog & Popover
        </h2>
        <p className="text-sm text-muted-foreground">
          Combine <code>HaloPortalSurface</code> with headless accessible primitives like Radix UI or Base UI:
        </p>

        <CodeBlock
          language="tsx"
          filename="components/dialog-example.tsx"
          code={`import * as Dialog from "@radix-ui/react-dialog";
import { HaloPortalSurface } from "@/components/ui/halo-portal-surface";
import { HaloScrim } from "@/components/ui/halo-scrim";
import { HaloButton } from "@/components/ui/halo-button";

export function ConfirmDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Optical Blur Backdrop */}
        <HaloScrim asChild>
          <Dialog.Overlay className="fixed inset-0 z-50" />
        </HaloScrim>

        {/* Liquid Portal Surface */}
        <Dialog.Content asChild>
          <HaloPortalSurface
            elevation="overlay"
            intensity="balanced"
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-6 rounded-2xl z-50 border shadow-2xl"
          >
            <Dialog.Title className="text-lg font-semibold">Confirm Deletion</Dialog.Title>
            <Dialog.Description className="text-xs text-muted-foreground mt-2">
              This action cannot be undone. Are you sure you wish to proceed?
            </Dialog.Description>
            <div className="mt-6 flex justify-end gap-2">
              <HaloButton variant="neutral" size="sm" onClick={() => onOpenChange(false)}>
                Cancel
              </HaloButton>
              <HaloButton variant="primary" size="sm" onClick={() => onOpenChange(false)}>
                Confirm
              </HaloButton>
            </div>
          </HaloPortalSurface>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`}
        />
      </div>

      {/* 6. Props Table */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component API
        </h2>
        <PropsTable rows={PROPS_DATA} />
      </div>

      {/* 7. Installed Files */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installed Files & Source Ownership
        </h2>
        <FileTree
          items={[
            {
              name: "components",
              type: "folder",
              children: [
                {
                  name: "ui",
                  type: "folder",
                  children: [
                    { name: "halo-portal-surface.tsx", type: "file" },
                  ],
                },
              ],
            },
          ]}
        />
        <div className="pt-2">
          <DependencyList
            groups={[
              {
                title: "Core Dependencies",
                items: ["@radix-ui/react-slot", "clsx", "tailwind-merge"],
              },
            ]}
          />
        </div>
      </div>

      {/* 8. Related Foundations */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Related Foundations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RELATED_FOUNDATIONS.map((foundation) => (
            <Link
              key={foundation.name}
              href={foundation.href}
              className="group p-4 rounded-xl border bg-card hover:bg-muted/40 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-primary">{foundation.role}</span>
                <HaloIcon icon={ArrowRight01Icon} size={14} className="text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">{foundation.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{foundation.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
