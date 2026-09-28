"use client";

import * as React from "react";
import {
  DiffViewer,
  type DiffViewMode,
  type DiffViewerVariant,
  type DiffViewerSize,
} from "@/components/ui/diff-viewer";
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

const SCENARIO_OPTIONS = [
  { value: "component", label: "Component Refactor (TSX)" },
  { value: "schema", label: "Prisma Schema Migration" },
  { value: "config", label: "JSON Config Tuning" },
  { value: "security", label: "Security Header Patch" },
];

const DIFF_COMPONENT_OLD = `export function Button({ variant, children }: ButtonProps) {
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded">
      {children}
    </button>
  );
}`;

const DIFF_COMPONENT_NEW = `export function Button({
  variant = "glass",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-xl font-medium transition-all",
        "halo-surface halo-surface-subtle",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}`;

const DIFF_SCHEMA_OLD = `model User {
  id        String   @id @default(cuid())
  email     String   @unique
  role      String   @default("USER")
  createdAt DateTime @default(now())
}`;

const DIFF_SCHEMA_NEW = `model User {
  id           String    @id @default(cuid())
  email        String    @unique
  role         Role      @default(MEMBER)
  avatarUrl    String?
  mfaEnabled   Boolean   @default(false)
  lastLoginAt  DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}`;

const DIFF_CONFIG_OLD = `{
  "target": "es2020",
  "strict": false,
  "moduleResolution": "node"
}`;

const DIFF_CONFIG_NEW = `{
  "target": "es2024",
  "strict": true,
  "moduleResolution": "bundler",
  "isolatedModules": true
}`;

const DIFF_SECURITY_OLD = `// Insecure direct response
export function handler(req: Request) {
  return new Response("OK");
}`;

const DIFF_SECURITY_NEW = `// Enforce CSP and anti-sniffing headers
export function handler(req: Request) {
  const headers = new Headers();
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  return new Response("OK", { headers });
}`;

export function DiffViewerPreviewStage() {
  const [viewMode, setViewMode] = React.useState<DiffViewMode>("unified");
  const [variant, setVariant] = React.useState<DiffViewerVariant>("glass");
  const [size, setSize] = React.useState<DiffViewerSize>("default");
  const [scenario, setScenario] = React.useState("component");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [showLineNumbers, setShowLineNumbers] = React.useState(true);
  const [showStats, setShowStats] = React.useState(true);
  const [showToolbar, setShowToolbar] = React.useState(true);
  const [showCopy, setShowCopy] = React.useState(true);
  const [wrap, setWrap] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");

  const handleReset = () => {
    setViewMode("unified");
    setVariant("glass");
    setSize("default");
    setScenario("component");
    setContainerWidth("full");
    setShowLineNumbers(true);
    setShowStats(true);
    setShowToolbar(true);
    setShowCopy(true);
    setWrap(false);
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
        return "max-w-3xl";
    }
  };

  const { oldCode, newCode, filename } = React.useMemo(() => {
    switch (scenario) {
      case "schema":
        return {
          oldCode: DIFF_SCHEMA_OLD,
          newCode: DIFF_SCHEMA_NEW,
          filename: "schema.prisma",
        };
      case "config":
        return {
          oldCode: DIFF_CONFIG_OLD,
          newCode: DIFF_CONFIG_NEW,
          filename: "tsconfig.json",
        };
      case "security":
        return {
          oldCode: DIFF_SECURITY_OLD,
          newCode: DIFF_SECURITY_NEW,
          filename: "security-headers.ts",
        };
      default:
        return {
          oldCode: DIFF_COMPONENT_OLD,
          newCode: DIFF_COMPONENT_NEW,
          filename: "button.tsx",
        };
    }
  }, [scenario]);

  const telemetry: TelemetryItem[] = [
    {
      label: "View Mode",
      value: viewMode.toUpperCase(),
      variant: viewMode === "split" ? "success" : "default",
    },
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
      label: "File",
      value: filename.toUpperCase(),
      variant: "default",
    },
    {
      label: "Line Numbers",
      value: showLineNumbers ? "ACTIVE" : "OFF",
      variant: showLineNumbers ? "success" : "default",
    },
    {
      label: "Optics",
      value: variant === "glass" ? "SUBTLE GLASS" : "FLAT BASE",
      variant: "default",
    },
  ];

  const codeSnippet = `<DiffViewer
  oldCode={oldCode}
  newCode={newCode}
  filename="${filename}"
  viewMode="${viewMode}"
  variant="${variant}"
  size="${size}"
  showLineNumbers={${showLineNumbers}}
  showStats={${showStats}}
  showToolbar={${showToolbar}}
  showCopy={${showCopy}}
  wrap={${wrap}}
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
              label="View Mode"
              value={viewMode}
              options={[
                { value: "unified", label: "Unified (Inline)" },
                { value: "split", label: "Split (Side-by-Side)" },
              ]}
              onChange={(val) => setViewMode(val as DiffViewMode)}
            />

            <StageControlSelect
              label="Variant"
              value={variant}
              options={[
                { value: "glass", label: "Glass (Standalone)" },
                { value: "default", label: "Default (Bordered)" },
                { value: "plain", label: "Plain (Frameless)" },
              ]}
              onChange={(val) => setVariant(val as DiffViewerVariant)}
            />

            <StageControlSelect
              label="Size"
              value={size}
              options={[
                { value: "sm", label: "Small (SM)" },
                { value: "default", label: "Default (MD)" },
                { value: "lg", label: "Large (LG)" },
              ]}
              onChange={(val) => setSize(val as DiffViewerSize)}
            />

            <StageControlSelect
              label="Scenario"
              value={scenario}
              options={SCENARIO_OPTIONS}
              onChange={setScenario}
            />

            <StageControlSelect
              label="Width"
              value={containerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
              onChange={setContainerWidth}
            />
          </div>

          {/* Toggle Flags Row: Neatly Aligned in Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="diff-line-numbers-toggle"
                  checked={showLineNumbers}
                  onCheckedChange={(checked) => setShowLineNumbers(Boolean(checked))}
                />
                <Label htmlFor="diff-line-numbers-toggle" className="text-xs cursor-pointer select-none">
                  Line Numbers
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="diff-stats-toggle"
                  checked={showStats}
                  onCheckedChange={(checked) => setShowStats(Boolean(checked))}
                />
                <Label htmlFor="diff-stats-toggle" className="text-xs cursor-pointer select-none">
                  Diff Badges (+/-)
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="diff-wrap-toggle"
                  checked={wrap}
                  onCheckedChange={(checked) => setWrap(Boolean(checked))}
                />
                <Label htmlFor="diff-wrap-toggle" className="text-xs cursor-pointer select-none">
                  Word Wrap
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="diff-toolbar-toggle"
                  checked={showToolbar}
                  onCheckedChange={(checked) => setShowToolbar(Boolean(checked))}
                />
                <Label htmlFor="diff-toolbar-toggle" className="text-xs cursor-pointer select-none">
                  Toolbar
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="diff-copy-toggle"
                  checked={showCopy}
                  onCheckedChange={(checked) => setShowCopy(Boolean(checked))}
                />
                <Label htmlFor="diff-copy-toggle" className="text-xs cursor-pointer select-none">
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
          <DiffViewer
            oldCode={oldCode}
            newCode={newCode}
            filename={filename}
            viewMode={viewMode}
            variant={variant}
            size={size}
            showLineNumbers={showLineNumbers}
            showStats={showStats}
            showToolbar={showToolbar}
            showCopy={showCopy}
            wrap={wrap}
          />
        </div>
      </div>
    </PreviewStageShell>
  );
}
