import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  SparklesIcon,
  SecurityCheckIcon,
  Layers01Icon,
  ArrowRight01Icon,
  Settings01Icon,
  Sun01Icon,
  Moon02Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { ThemePreviewStage } from "./theme-preview-stage";
import { Badge } from "@/components/ui/badge";
import { InstallCommand } from "@/components/mdx/install-command";
import { PropsTable } from "@/components/mdx/props-table";
import { FileTree } from "@/components/mdx/file-tree";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { DependencyList } from "@/components/mdx/dependency-list";

export const metadata: Metadata = {
  title: "Halo Theme Provider — Orchestration Foundation",
  description:
    "Orchestrates HaloUI light, dark, and system visual themes together with shared physical material intensity defaults across components.",
};

const PROPS_DATA = [
  {
    name: "defaultTheme",
    type: '"light" | "dark" | "system"',
    default: '"system"',
    required: false,
    description:
      "Initial visual color mode when no persisted preference is detected in storage.",
  },
  {
    name: "defaultMaterialIntensity",
    type: '"subtle" | "balanced" | "rich"',
    default: '"balanced"',
    required: false,
    description:
      "Global baseline for liquid glass optical blur, highlight intensity, and glow spread.",
  },
  {
    name: "storageKey",
    type: "string",
    default: '"halo-theme"',
    required: false,
    description: "LocalStorage key name for persisting the selected visual theme.",
  },
  {
    name: "intensityStorageKey",
    type: "string",
    default: '"halo-material-intensity"',
    required: false,
    description: "LocalStorage key name for persisting the material intensity setting.",
  },
  {
    name: "enableSystem",
    type: "boolean",
    default: "true",
    required: false,
    description: "Whether to monitor and sync with system OS color scheme preferences.",
  },
  {
    name: "attribute",
    type: "string",
    default: '"class"',
    required: false,
    description: "HTML attribute applied to the root document element (e.g. 'class' or 'data-theme').",
  },
];

const RELATED_FOUNDATIONS = [
  {
    name: "Halo Surface",
    href: "/components/halo-surface",
    role: "Material Substrate",
    description:
      "Reads ambient material intensity to calibrate blur depth, specular highlight catch, and base tint.",
  },
  {
    name: "Halo Background",
    href: "/components/halo-background",
    role: "Reference Environments",
    description:
      "Deterministic backdrops providing high-contrast and dense substrate validation across theme modes.",
  },
  {
    name: "Halo Focus Ring",
    href: "/components/halo-focus-ring",
    role: "Accessibility",
    description:
      "Dynamically swaps focus offset and luminescence values to maintain 4.5:1 contrast against light and dark materials.",
  },
];

export default function HaloThemeProviderDocsPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-16">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Halo Theme Provider
        </h1>

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Orchestrates HaloUI light, dark, and system visual themes together with shared physical material intensity defaults (<code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">subtle</code>, <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">balanced</code>, <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">rich</code>) across the application tree.
        </p>
      </div>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <ThemePreviewStage />
      </section>

      {/* 3. Installation */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install the theme provider foundation directly into your repository via the shadcn registry CLI:
        </p>
        <InstallCommand registry="http://localhost:3000/r/halo-theme-provider.json" />
      </div>

      {/* 4. Architectural Concept: Theme vs Material Intensity */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Theme vs. Material Intensity
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          In liquid-glass design systems, <strong>visual theme</strong> and <strong>material intensity</strong> are orthogonal dimensions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border bg-muted/20 space-y-2">
            <div className="flex items-center gap-2 text-foreground font-medium text-sm">
              <HaloIcon icon={Sun01Icon} size={16} className="text-amber-500" />
              <span>Visual Theme Mode</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Controls environmental luminance: <code>light</code>, <code>dark</code>, or automatic <code>system</code> preference resolution. Adjusts text contrast tokens, boundary hairlines, and specular highlight directions.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-muted/20 space-y-2">
            <div className="flex items-center gap-2 text-foreground font-medium text-sm">
              <HaloIcon icon={Layers01Icon} size={16} className="text-primary" />
              <span>Material Intensity</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Controls physical optical strength: <code>subtle</code> (8px blur, 0.40 highlight), <code>balanced</code> (16px blur, 0.85 highlight), or <code>rich</code> (28px blur, 1.20 highlight + ambient glow).
            </p>
          </div>
        </div>

        <Callout type="note" title="No Redundant Providers">
          <p className="text-xs text-muted-foreground">
            Halo Theme Provider integrates directly with <code>next-themes</code> under the hood. If your application already uses <code>next-themes</code>, you can safely replace the standard wrapper with <code>HaloThemeProvider</code> to gain seamless material-intensity orchestration without competing theme contexts.
          </p>
        </Callout>
      </div>

      {/* 5. Usage Example */}
      <div className="space-y-4 pt-4 border-t">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Root Setup & Hook Usage
        </h2>
        <p className="text-sm text-muted-foreground">
          Wrap your root layout with <code>HaloThemeProvider</code> and consume the state anywhere via <code>useHaloTheme()</code>:
        </p>

        <CodeBlock
          language="tsx"
          filename="app/layout.tsx"
          code={`import { HaloThemeProvider } from "@/components/ui/halo-theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <HaloThemeProvider
          attribute="class"
          defaultTheme="system"
          defaultMaterialIntensity="balanced"
          enableSystem
        >
          {children}
        </HaloThemeProvider>
      </body>
    </html>
  );
}`}
        />

        <div className="pt-2">
          <CodeBlock
            language="tsx"
            filename="components/theme-toggle.tsx"
            code={`"use client";

import { useHaloTheme } from "@/components/ui/halo-theme-provider";
import { HaloButton } from "@/components/ui/halo-button";

export function ThemeIntensityToggle() {
  const { theme, setTheme, materialIntensity, setMaterialIntensity } = useHaloTheme();

  return (
    <div className="flex items-center gap-2">
      <HaloButton
        size="sm"
        variant="neutral"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Theme: {theme}
      </HaloButton>
      <HaloButton
        size="sm"
        variant="neutral"
        onClick={() =>
          setMaterialIntensity(
            materialIntensity === "balanced" ? "rich" : "balanced"
          )
        }
      >
        Intensity: {materialIntensity}
      </HaloButton>
    </div>
  );
}`}
          />
        </div>
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
        <p className="text-sm text-muted-foreground">
          This foundation installs directly into your repository under your complete source control:
        </p>
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
                    { name: "halo-theme-provider.tsx", type: "file" },
                  ],
                },
              ],
            },
            {
              name: "styles",
              type: "folder",
              children: [
                { name: "halo-tokens.css", type: "file" },
              ],
            },
          ]}
        />
        <div className="pt-2">
          <DependencyList
            groups={[
              {
                title: "Core Dependencies",
                items: ["next-themes"],
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
