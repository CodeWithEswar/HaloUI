"use client";

import * as React from "react";
import {
  CodeBlock,
  type CodeBlockVariant,
  type CodeBlockSize,
} from "@/components/ui/code-block";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const CONTAINER_WIDTH_OPTIONS = [
  { value: "full", label: "Full Container (100%)" },
  { value: "1024", label: "Desktop (1024px)" },
  { value: "768", label: "Tablet (768px)" },
  { value: "640", label: "Phablet (640px)" },
  { value: "480", label: "Mobile Large (480px)" },
  { value: "390", label: "iPhone Pro (390px)" },
  { value: "320", label: "Mobile Min (320px)" },
  { value: "280", label: "Micro Panel (280px)" },
  { value: "240", label: "Extreme 240px (240px)" },
];

const SNIPPET_OPTIONS = [
  { value: "react", label: "React Component (TSX)" },
  { value: "hook", label: "Custom Hook (TS)" },
  { value: "css", label: "Tailwind / Tokens (CSS)" },
  { value: "shell", label: "Setup Script (Bash)" },
  { value: "json", label: "API Configuration (JSON)" },
];

const CODE_REACT = `import * as React from "react";
import { cn } from "@/lib/utils";
import { HaloIcon } from "@/components/icons/halo-icon";
import { SparklesIcon } from "@hugeicons/core-free-icons";

export interface OpticalCardProps extends React.ComponentProps<"div"> {
  title: string;
  badge?: string;
  glow?: boolean;
}

export function OpticalCard({ title, badge, glow = false, className, children, ...props }: OpticalCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-xl",
        glow && "shadow-[0_0_40px_-10px_rgba(59,130,246,0.25)]",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
        {badge && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{badge}</span>}
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}`;

const CODE_HOOK = `import * as React from "react";

export function useVirtualLighting(targetRef: React.RefObject<HTMLElement | null>) {
  const [coordinates, setCoordinates] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setCoordinates({ x: Math.round(x), y: Math.round(y) });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [targetRef]);

  return coordinates;
}`;

const CODE_CSS = `@layer utilities {
  .halo-surface-subtle {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px) saturate(140%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12),
                0 4px 20px -2px rgba(0, 0, 0, 0.3);
  }

  .halo-specular-edge {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.25) 0%,
      transparent 40%,
      transparent 80%,
      rgba(255, 255, 255, 0.1) 100%
    );
  }
}`;

const CODE_SHELL = `#!/usr/bin/env bash
# HaloUI Component Scaffolding Engine
set -euo pipefail

echo "Initializing HaloUI Liquid Glass registry distribution..."
npx shadcn@latest add "https://haloui.dev/r/code-block.json"

echo "Verifying peer dependencies..."
npm install @hugeicons/react @hugeicons/core-free-icons

echo "Component ready at components/ui/code-block.tsx"`;

const CODE_JSON = `{
  "name": "haloui-optical-theme",
  "version": "1.0.0",
  "author": "HaloUI Team",
  "opticalEngine": {
    "diffusion": "16px",
    "transmission": 0.78,
    "specularAngle": "135deg",
    "contactShadow": "rgba(0, 0, 0, 0.4)",
    "responsiveQueries": ["@container/code-block"]
  }
}`;

export function CodeBlockPreviewStage() {
  const [variant, setVariant] = React.useState<CodeBlockVariant>("glass");
  const [size, setSize] = React.useState<CodeBlockSize>("default");
  const [snippet, setSnippet] = React.useState("react");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [showLineNumbers, setShowLineNumbers] = React.useState(true);
  const [wrap, setWrap] = React.useState(false);
  const [highlightFirstLine, setHighlightFirstLine] = React.useState(true);
  const [showToolbar, setShowToolbar] = React.useState(true);
  const [showCopy, setShowCopy] = React.useState(true);
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");

  const handleReset = () => {
    setVariant("glass");
    setSize("default");
    setSnippet("react");
    setContainerWidth("full");
    setShowLineNumbers(true);
    setWrap(false);
    setHighlightFirstLine(true);
    setShowToolbar(true);
    setShowCopy(true);
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const getContainerMaxWidthClass = (width: string) => {
    switch (width) {
      case "1024":
        return "max-w-[1024px]";
      case "768":
        return "max-w-[768px]";
      case "640":
        return "max-w-[640px]";
      case "480":
        return "max-w-[480px]";
      case "390":
        return "max-w-[390px]";
      case "320":
        return "max-w-[320px]";
      case "280":
        return "max-w-[280px]";
      case "240":
        return "max-w-[240px]";
      default:
        return "max-w-2xl";
    }
  };

  const { code, language, filename, highlightLines } = React.useMemo(() => {
    switch (snippet) {
      case "hook":
        return {
          code: CODE_HOOK,
          language: "typescript",
          filename: "use-virtual-lighting.ts",
          highlightLines: highlightFirstLine ? [3, 11] : [],
        };
      case "css":
        return {
          code: CODE_CSS,
          language: "css",
          filename: "optical-surface.css",
          highlightLines: highlightFirstLine ? [2, 10] : [],
        };
      case "shell":
        return {
          code: CODE_SHELL,
          language: "bash",
          filename: "install.sh",
          highlightLines: highlightFirstLine ? [5] : [],
        };
      case "json":
        return {
          code: CODE_JSON,
          language: "json",
          filename: "halo-theme.json",
          highlightLines: highlightFirstLine ? [5, 6, 7] : [],
        };
      default:
        return {
          code: CODE_REACT,
          language: "tsx",
          filename: "OpticalCard.tsx",
          highlightLines: highlightFirstLine ? [6, 12] : [],
        };
    }
  }, [snippet, highlightFirstLine]);

  const telemetry: TelemetryItem[] = [
    {
      label: "Variant",
      value: variant.toUpperCase(),
      variant: "default",
    },
    {
      label: "Size",
      value: size.toUpperCase(),
      variant: "default",
    },
    {
      label: "Language",
      value: language.toUpperCase(),
      variant: "default",
    },
    {
      label: "Line Numbers",
      value: showLineNumbers ? "ACTIVE" : "OFF",
      variant: showLineNumbers ? "success" : "default",
    },
    {
      label: "Wrapping",
      value: wrap ? "WRAPPED" : "SCROLL",
      variant: "default",
    },
    {
      label: "Optics",
      value: variant === "glass" ? "SUBTLE GLASS" : "FLAT BASE",
      variant: "default",
    },
  ];

  const codeSnippet = `<CodeBlock
  code={code}
  language="${language}"
  filename="${filename}"
  variant="${variant}"
  size="${size}"
  showLineNumbers={${showLineNumbers}}
  wrap={${wrap}}
  highlightLines={[${highlightLines.join(", ")}]}
  showToolbar={${showToolbar}}
  showCopy={${showCopy}}
/>`;

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      telemetry={telemetry}
      code={codeSnippet}
      controls={
        <div className="w-full flex flex-col gap-2.5">
          {/* Main Controls Row: Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Variant"
              value={variant}
              options={[
                { value: "glass", label: "Glass (Standalone)" },
                { value: "default", label: "Default (Bordered)" },
                { value: "plain", label: "Plain (Frameless)" },
              ]}
              onChange={(val) => setVariant(val as CodeBlockVariant)}
            />

            <StageControlSelect
              label="Size"
              value={size}
              options={[
                { value: "sm", label: "Small (SM)" },
                { value: "default", label: "Default (MD)" },
                { value: "lg", label: "Large (LG)" },
              ]}
              onChange={(val) => setSize(val as CodeBlockSize)}
            />

            <StageControlSelect
              label="Snippet"
              value={snippet}
              options={SNIPPET_OPTIONS}
              onChange={setSnippet}
            />

            <StageControlSelect
              label="Width"
              value={containerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
              onChange={setContainerWidth}
            />

            <StageControlSelect
              label="Overflow"
              value={wrap ? "wrap" : "scroll"}
              options={[
                { value: "scroll", label: "Horizontal Scroll" },
                { value: "wrap", label: "Word Wrap" },
              ]}
              onChange={(val) => setWrap(val === "wrap")}
            />
          </div>

          {/* Toggle Flags Row: Neatly Aligned in Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="cb-line-numbers-toggle"
                  checked={showLineNumbers}
                  onCheckedChange={(checked) => setShowLineNumbers(Boolean(checked))}
                />
                <Label htmlFor="cb-line-numbers-toggle" className="text-xs cursor-pointer select-none">
                  Line Numbers
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="cb-highlight-lines-toggle"
                  checked={highlightFirstLine}
                  onCheckedChange={(checked) => setHighlightFirstLine(Boolean(checked))}
                />
                <Label htmlFor="cb-highlight-lines-toggle" className="text-xs cursor-pointer select-none">
                  Highlight Lines
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="cb-toolbar-toggle"
                  checked={showToolbar}
                  onCheckedChange={(checked) => setShowToolbar(Boolean(checked))}
                />
                <Label htmlFor="cb-toolbar-toggle" className="text-xs cursor-pointer select-none">
                  Toolbar
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="cb-copy-toggle"
                  checked={showCopy}
                  onCheckedChange={(checked) => setShowCopy(Boolean(checked))}
                />
                <Label htmlFor="cb-copy-toggle" className="text-xs cursor-pointer select-none">
                  Copy Button
                </Label>
              </div>
            </div>

            <span className="text-[11px] text-muted-foreground">
              Container-aware reflow down to 240px
            </span>
          </div>
        </div>
      }
    >
      <div className="w-full flex items-center justify-center p-2 sm:p-6 transition-all duration-300">
        <div
          className={cn(
            "w-full transition-all duration-200",
            getContainerMaxWidthClass(containerWidth)
          )}
        >
          <CodeBlock
            code={code}
            language={language}
            filename={filename}
            variant={variant}
            size={size}
            showLineNumbers={showLineNumbers}
            wrap={wrap}
            highlightLines={highlightLines}
            showToolbar={showToolbar}
            showCopy={showCopy}
          />
        </div>
      </div>
    </PreviewStageShell>
  );
}
