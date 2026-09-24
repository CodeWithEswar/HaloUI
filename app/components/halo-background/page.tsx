import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  SparklesIcon,
  SecurityCheckIcon,
  Layers01Icon,
  ArrowRight01Icon,
  Image01Icon,
  EyeIcon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { BackgroundPreviewStage } from "./background-preview-stage";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/mdx/install-command";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Halo Background — Reference Testing Environments",
  description:
    "Reference background environments for rigorously testing and evaluating translucent liquid materials against diverse optical substrates.",
};

const PROPS_DATA = [
  {
    name: "environment",
    type: '"neutral" | "warm-paper" | "spectral" | "image" | "dense-ui" | "dark"',
    default: '"neutral"',
    required: false,
    description:
      "Target testing environment calibrating chromatic transmission, text legibility, and edge contrast.",
  },
  {
    name: "contentClassName",
    type: "string",
    default: '"p-6 md:p-12"',
    required: false,
    description: "Custom classes applied to the centered foreground content container.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Tailwind CSS classes passed to the outer environment wrapper.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: "undefined",
    required: false,
    description: "Translucent surfaces and interface controls being audited over the background.",
  },
];

const ENVIRONMENTS = [
  {
    name: "Neutral",
    value: "neutral",
    purpose: "Evaluate base geometry, surface tint, edge boundary, and drop shadow contrast.",
  },
  {
    name: "Warm Paper",
    value: "warm-paper",
    purpose: "Evaluate warm environmental transmission, subtle paper texture, and low-frequency warmth.",
  },
  {
    name: "Spectral",
    value: "spectral",
    purpose: "Evaluate chromatic transmission, prismatic diffusion, and tint contamination response.",
  },
  {
    name: "Image Grid",
    value: "image",
    purpose: "Evaluate translucent materials against complex geometric patterns and architectural lines.",
  },
  {
    name: "Dense UI",
    value: "dense-ui",
    purpose: "Evaluate legibility over high-frequency underlying text rows, separators, and code labels.",
  },
  {
    name: "Deep Dark",
    value: "dark",
    purpose: "Evaluate specular luminescence, edge highlights, and dark ambient occlusion separation.",
  },
];

const RELATED_FOUNDATIONS = [
  {
    name: "Halo Surface",
    href: "/components/halo-surface",
    role: "Material Substrate",
    description: "The primary 10-layer physical container evaluated against reference backgrounds.",
  },
  {
    name: "Halo Edge",
    href: "/components/halo-edge",
    role: "Optical Boundary",
    description: "Hairline edge treatment tested for high-contrast boundary separation over dense backgrounds.",
  },
  {
    name: "Halo Theme Provider",
    href: "/components/halo-theme-provider",
    role: "Orchestration",
    description: "Synchronizes light and dark themes with background testing environments.",
  },
];

export default function HaloBackgroundDocsPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-16">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Halo Background
        </h1>

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Reference background environments for rigorously testing and evaluating translucent liquid materials against diverse optical substrates, noise frequencies, and luminance conditions.
        </p>
      </div>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <BackgroundPreviewStage />
      </section>

      {/* 3. Installation */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Add the reference background foundation to your design system:
        </p>
        <InstallCommand registry="http://localhost:3000/r/halo-background.json" />
      </div>

      {/* 4. The 6 Reference Environments */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          The 6 Reference Environments
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Halo Background is not decorative wallpaper. Each environment provides a calibrated physical stress-test to detect contrast failures and visual artifacts:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {ENVIRONMENTS.map((env) => (
            <div key={env.value} className="p-4 rounded-xl border bg-card space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-foreground">{env.name}</span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  environment=&quot;{env.value}&quot;
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {env.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Implementation Usage */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage in Component Testing & Previews
        </h2>
        <p className="text-sm text-muted-foreground">
          Wrap preview stages, test suites, or documentation canvases with <code>HaloBackground</code>:
        </p>

        <CodeBlock
          language="tsx"
          filename="components/my-preview.tsx"
          code={`import { HaloBackground } from "@/components/ui/halo-background";
import { HaloSurface } from "@/components/ui/halo-surface";
import { HaloButton } from "@/components/ui/halo-button";

export function ComponentPreview() {
  return (
    <HaloBackground environment="dense-ui" className="rounded-2xl">
      <HaloSurface elevation="raised" className="p-6 rounded-xl max-w-sm">
        <h3 className="font-medium">Glass Over Data</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Testing optical diffusion blur against dense underlying code tables.
        </p>
        <div className="mt-4 flex justify-end">
          <HaloButton size="sm">Action</HaloButton>
        </div>
      </HaloSurface>
    </HaloBackground>
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
                    { name: "halo-background.tsx", type: "file" },
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
                title: "Utility Dependencies",
                items: ["clsx", "tailwind-merge"],
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
