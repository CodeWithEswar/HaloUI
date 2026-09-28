"use client";

import * as React from "react";
import {
  JsonViewer,
  type JsonViewerVariant,
  type JsonViewerSize,
} from "@/components/ui/json-viewer";
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
  { value: "480", label: "Mobile Wide (480px)" },
  { value: "390", label: "iPhone 15 Pro (390px)" },
  { value: "320", label: "Small Device (320px)" },
  { value: "280", label: "Compact Rail (280px)" },
  { value: "240", label: "Strict QA Min (240px)" },
];

const SCENARIO_OPTIONS = [
  { value: "api", label: "API Payload" },
  { value: "config", label: "Package Config" },
  { value: "nested", label: "Deep Hierarchy" },
  { value: "primitives", label: "Primitive Types & Null" },
  { value: "long", label: "Long Keys & URLs" },
  { value: "invalid", label: "Syntax Error State" },
];

const SAMPLE_API_DATA = {
  status: "success",
  statusCode: 200,
  latencyMs: 14.8,
  cached: true,
  region: "ap-south-1",
  metadata: {
    requestId: "req_99a8b1c4e2",
    cluster: "prod-eks-01",
    timestamp: "2026-09-28T22:30:00.000Z",
    tags: ["production", "gateway", "edge"],
    flags: {
      enableTelemetry: true,
      debugMode: false,
      deprecatedField: null,
    },
  },
  user: {
    id: 1042,
    username: "eswar",
    role: "architect",
    verified: true,
    preferences: {
      theme: "dark",
      notifications: true,
    },
  },
};

const SAMPLE_CONFIG_DATA = {
  name: "@haloui/react",
  version: "1.0.0",
  private: true,
  description: "HaloUI Liquid Glass Design System",
  main: "./dist/index.js",
  types: "./dist/index.d.ts",
  keywords: ["react", "liquid-glass", "design-system", "tailwind"],
  dependencies: {
    "@hugeicons/react": "^1.1.10",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.7.0",
  },
};

const SAMPLE_DEEP_DATA = {
  organization: "DeepMind",
  infrastructure: {
    cloud: "gcp",
    region: "asia-south1",
    zone: {
      zoneId: "asia-south1-a",
      rack: {
        rackId: "rack-42",
        chassis: {
          slot: 7,
          blade: {
            nodeId: "node-gpu-08",
            temperatures: [42, 44, 41, 48],
            online: true,
            notes: null,
          },
        },
      },
    },
  },
};

const SAMPLE_PRIMITIVES_DATA = {
  stringType: "Hello HaloUI",
  numberType: 42,
  negativeNumber: -18.5,
  zeroNumber: 0,
  booleanTrue: true,
  booleanFalse: false,
  explicitNull: null,
  emptyArray: [],
  emptyObject: {},
};

const SAMPLE_LONG_DATA = {
  endpoint: "https://api.haloui.dev/v1/workspaces/ws_01h9x3p/deployments/production/health/metrics",
  securityTokenBearerHeader: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkVzd2FyIn0",
  descriptionWithExtremelyLongTextContentThatMustWrapCleanly:
    "HaloUI liquid optical components distribute directly into consumer repositories through the shadcn registry specification with zero runtime lock-in.",
};

const SAMPLE_INVALID_JSON = `{
  "name": "Invalid Json",
  "missingComma": true
  "unclosedBrace": 42
`;

export function JsonViewerPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // JsonViewer configuration states
  const [variant, setVariant] = React.useState<JsonViewerVariant>("glass");
  const [size, setSize] = React.useState<JsonViewerSize>("default");
  const [depth, setDepth] = React.useState("2");
  const [scenario, setScenario] = React.useState("api");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [showItemCount, setShowItemCount] = React.useState(true);
  const [showToolbar, setShowToolbar] = React.useState(true);
  const [showCopy, setShowCopy] = React.useState(true);

  const handleReset = () => {
    setVariant("glass");
    setSize("default");
    setDepth("2");
    setScenario("api");
    setContainerWidth("full");
    setShowItemCount(true);
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

  // Resolve current scenario payload
  const currentPayload = React.useMemo(() => {
    switch (scenario) {
      case "config":
        return { data: SAMPLE_CONFIG_DATA, json: undefined, title: "package.json" };
      case "nested":
        return { data: SAMPLE_DEEP_DATA, json: undefined, title: "infrastructure.json" };
      case "primitives":
        return { data: SAMPLE_PRIMITIVES_DATA, json: undefined, title: "primitives.json" };
      case "long":
        return { data: SAMPLE_LONG_DATA, json: undefined, title: "auth-response.json" };
      case "invalid":
        return { data: undefined, json: SAMPLE_INVALID_JSON, title: "malformed.json" };
      default:
        return { data: SAMPLE_API_DATA, json: undefined, title: "api-response.json" };
    }
  }, [scenario]);

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
      label: "Depth",
      value: depth === "99" ? "ALL" : depth,
      variant: "default",
    },
    {
      label: "Scenario",
      value: scenario.toUpperCase(),
      variant: scenario === "invalid" ? "error" : "default",
    },
    {
      label: "Optics",
      value: variant === "glass" ? "SUBTLE GLASS" : "FLAT BASE",
      variant: "default",
    },
    {
      label: "Reading Plane",
      value: "STABLE",
      variant: "default",
    },
  ];

  const codeSnippet = `<JsonViewer
  title="${currentPayload.title}"
  variant="${variant}"
  size="${size}"
  defaultExpandedDepth={${depth}}
  showItemCount={${showItemCount}}
  showToolbar={${showToolbar}}
  showCopy={${showCopy}}
  data={${scenario === "invalid" ? "undefined" : "data"}}
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
        <div className="flex flex-wrap items-center gap-2.5">
          <StageControlSelect
            label="Variant"
            value={variant}
            options={[
              { value: "glass", label: "Glass (Standalone)" },
              { value: "default", label: "Default (Card Frame)" },
              { value: "plain", label: "Plain (Borderless)" },
            ]}
            onChange={(val) => setVariant(val as JsonViewerVariant)}
          />

          <StageControlSelect
            label="Size"
            value={size}
            options={[
              { value: "sm", label: "Small (SM)" },
              { value: "default", label: "Default (MD)" },
              { value: "lg", label: "Large (LG)" },
            ]}
            onChange={(val) => setSize(val as JsonViewerSize)}
          />

          <StageControlSelect
            label="Depth"
            value={depth}
            options={[
              { value: "1", label: "1 (Root Only)" },
              { value: "2", label: "2 (Default)" },
              { value: "3", label: "3 (Deep)" },
              { value: "99", label: "Expand All" },
            ]}
            onChange={setDepth}
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

          <div className="flex items-center gap-3 border-l border-border/60 pl-3">
            <div className="flex items-center gap-1.5">
              <Checkbox
                id="json-count-toggle"
                checked={showItemCount}
                onCheckedChange={(checked) => setShowItemCount(Boolean(checked))}
              />
              <Label htmlFor="json-count-toggle" className="text-xs cursor-pointer">
                Counts
              </Label>
            </div>

            <div className="flex items-center gap-1.5">
              <Checkbox
                id="json-toolbar-toggle"
                checked={showToolbar}
                onCheckedChange={(checked) => setShowToolbar(Boolean(checked))}
              />
              <Label htmlFor="json-toolbar-toggle" className="text-xs cursor-pointer">
                Toolbar
              </Label>
            </div>

            <div className="flex items-center gap-1.5">
              <Checkbox
                id="json-copy-toggle"
                checked={showCopy}
                onCheckedChange={(checked) => setShowCopy(Boolean(checked))}
              />
              <Label htmlFor="json-copy-toggle" className="text-xs cursor-pointer">
                Copy
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex w-full items-center justify-center p-4">
        <div
          className={cn(
            "w-full transition-all duration-200",
            getContainerMaxWidthClass(containerWidth)
          )}
        >
          <JsonViewer
            key={`${scenario}-${depth}-${variant}`}
            title={currentPayload.title}
            data={currentPayload.data}
            json={currentPayload.json}
            variant={variant}
            size={size}
            defaultExpandedDepth={Number(depth)}
            showItemCount={showItemCount}
            showToolbar={showToolbar}
            showCopy={showCopy}
            className="w-full"
          />
        </div>
      </div>
    </PreviewStageShell>
  );
}
