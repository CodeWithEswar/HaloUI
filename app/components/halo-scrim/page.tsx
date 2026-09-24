import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  SparklesIcon,
  SecurityCheckIcon,
  Layers01Icon,
  ArrowRight01Icon,
  EyeIcon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ScrimPreviewStage } from "./scrim-preview-stage";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/mdx/install-command";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Halo Scrim — Modal Backdrop Foundation",
  description:
    "Calibrated optical diffusion blur and ambient darkness treatment behind modal dialogs, sheets, and full-screen overlay surfaces.",
};

const PROPS_DATA = [
  {
    name: "blur",
    type: '"none" | "subtle" | "balanced" | "deep"',
    default: '"balanced"',
    required: false,
    description:
      "Diffusion blur level: 'none' (0px), 'subtle' (4px), 'balanced' (8px), or 'deep' (16px).",
  },
  {
    name: "tint",
    type: '"neutral" | "soft" | "deep" | "vibrant"',
    default: '"neutral"',
    required: false,
    description:
      "Environmental darkness and occlusion: 'neutral' (45%–65%), 'soft' (25%–40%), 'deep' (70%–85%), or 'vibrant' saturated dark.",
  },
  {
    name: "onDismiss",
    type: "() => void",
    default: "undefined",
    required: false,
    description: "Callback fired when the user clicks directly on the scrim background.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    required: false,
    description: "Merges scrim styling directly onto the immediate child element using Radix Slot (e.g. DialogPrimitive.Overlay).",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional Tailwind CSS classes merged via cn().",
  },
];

const BLUR_TIERS = [
  {
    tier: "none",
    blur: "0px",
    useCase: "Pure opacity occlusion without GPU-intensive filter costs. Ideal for lower-power devices.",
  },
  {
    tier: "subtle",
    blur: "4px",
    useCase: "Soft diffusion that maintains spatial awareness of background cards and headers.",
  },
  {
    tier: "balanced",
    blur: "8px",
    useCase: "Default modal scrim. Optimal balance of visual separation and rendering performance.",
  },
  {
    tier: "deep",
    blur: "16px",
    useCase: "Cinematic isolation for critical confirmation dialogs and security challenge cards.",
  },
];

const RELATED_FOUNDATIONS = [
  {
    name: "Halo Portal Surface",
    href: "/components/halo-portal-surface",
    role: "Overlay Surface",
    description: "The liquid glass material container resting directly above the scrim layer.",
  },
  {
    name: "Halo Surface",
    href: "/components/halo-surface",
    role: "Substrate Engine",
    description: "The primary 10-layer physical container providing base elevation tiers.",
  },
  {
    name: "Halo Motion Presets",
    href: "/components/halo-motion-presets",
    role: "Kinetic Physics",
    description: "Standardized reveal and settle curves applied to scrim entry and modal presentation.",
  },
];

export default function HaloScrimDocsPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-16">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Halo Scrim
        </h1>

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Backdrop and scrim treatment positioned behind modal dialogs, drawers, and overlay surfaces to provide calibrated optical diffusion blur and ambient darkness.
        </p>
      </div>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <ScrimPreviewStage />
      </section>

      {/* 3. Installation */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install the scrim foundation into your repository:
        </p>
        <InstallCommand registry="http://localhost:3000/r/halo-scrim.json" />
      </div>

      {/* 4. Blur Tiers */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Calibrated Blur Diffusion Tiers
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Rather than arbitrary blur radii, Halo Scrim uses 4 discrete diffusion tiers aligned with human visual depth perception:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {BLUR_TIERS.map((tier) => (
            <div key={tier.tier} className="p-4 rounded-xl border bg-card space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-foreground capitalize">
                  {tier.tier}
                </span>
                <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {tier.blur} blur
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {tier.useCase}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Radix & Accessible Dialog Usage */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Radix UI & Base UI Integration
        </h2>
        <p className="text-sm text-muted-foreground">
          Pass <code>asChild</code> to merge <code>HaloScrim</code> directly with <code>Dialog.Overlay</code>:
        </p>

        <CodeBlock
          language="tsx"
          filename="components/my-dialog.tsx"
          code={`import * as Dialog from "@radix-ui/react-dialog";
import { HaloScrim } from "@/components/ui/halo-scrim";
import { HaloPortalSurface } from "@/components/ui/halo-portal-surface";

export function AccessibleModal() {
  return (
    <Dialog.Root>
      <Dialog.Portal>
        {/* Halo Scrim seamlessly enhances Dialog.Overlay with diffusion & occlusion */}
        <HaloScrim asChild blur="balanced" tint="neutral">
          <Dialog.Overlay />
        </HaloScrim>

        <Dialog.Content asChild>
          <HaloPortalSurface elevation="overlay">
            <Dialog.Title>Settings</Dialog.Title>
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
                    { name: "halo-scrim.tsx", type: "file" },
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
