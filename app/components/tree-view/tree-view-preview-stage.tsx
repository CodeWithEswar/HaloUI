"use client";

import * as React from "react";
import {
  TreeView,
  TreeBranch,
  TreeLeaf,
  type TreeNode,
  type TreeViewVariant,
  type TreeViewSize,
  type TreeViewSelectionMode,
} from "@/components/ui/tree-view";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Folder01Icon,
  FolderOpenIcon,
  File01Icon,
  DatabaseIcon,
  CpuIcon,
  Layers01Icon,
  Globe02Icon,
  SecurityCheckIcon,
  UserGroupIcon,
  GitBranchIcon,
} from "@hugeicons/core-free-icons";
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
  { value: "files", label: "Repository File Explorer" },
  { value: "cloud", label: "Cloud Infrastructure" },
  { value: "org", label: "Organization Directory" },
  { value: "deep", label: "Deep Hierarchy (8 Levels)" },
];

/* -------------------------------------------------------------------------- */
/* SAMPLE DATA SCENARIOS                                                      */
/* -------------------------------------------------------------------------- */

const SAMPLE_FILES: TreeNode[] = [
  {
    id: "app",
    label: "app",
    children: [
      {
        id: "app-components",
        label: "components",
        children: [
          { id: "tree-view-page", label: "page.tsx", badge: "2.4 KB" },
          { id: "tree-view-layout", label: "layout.tsx", badge: "410 B" },
          { id: "tree-view-preview", label: "preview-stage.tsx", badge: "12 KB" },
        ],
      },
      { id: "globals-css", label: "globals.css", badge: "8.1 KB" },
      { id: "root-layout", label: "layout.tsx", badge: "1.2 KB" },
    ],
  },
  {
    id: "components",
    label: "components",
    children: [
      {
        id: "ui",
        label: "ui",
        children: [
          { id: "tree-view-ts", label: "tree-view.tsx", badge: "18 KB" },
          { id: "button-ts", label: "button.tsx", badge: "6.2 KB" },
          { id: "checkbox-ts", label: "checkbox.tsx", badge: "4.1 KB" },
        ],
      },
      { id: "halo-icon", label: "halo-icon.tsx", badge: "1.5 KB" },
    ],
  },
  {
    id: "lib",
    label: "lib",
    children: [
      { id: "utils-ts", label: "utils.ts", badge: "890 B" },
      { id: "tokens-ts", label: "tokens.ts", badge: "3.4 KB" },
    ],
  },
  { id: "package-json", label: "package.json", badge: "v0.0.1" },
  { id: "tsconfig-json", label: "tsconfig.json", badge: "TS 5.x" },
];

const SAMPLE_CLOUD: TreeNode[] = [
  {
    id: "us-east-1",
    label: "us-east-1 (N. Virginia)",
    icon: <HaloIcon icon={Globe02Icon} size={15} className="text-sky-500" />,
    children: [
      {
        id: "vpc-prod",
        label: "vpc-production-01",
        icon: <HaloIcon icon={Layers01Icon} size={15} className="text-indigo-500" />,
        children: [
          {
            id: "compute-cluster",
            label: "k8s-edge-cluster",
            icon: <HaloIcon icon={CpuIcon} size={15} className="text-emerald-500" />,
            badge: "16 Nodes",
            children: [
              { id: "pod-api", label: "service-gateway-7f8d", badge: "Ready" },
              { id: "pod-auth", label: "auth-worker-4b2a", badge: "Ready" },
            ],
          },
          {
            id: "db-primary",
            label: "aurora-pg-cluster",
            icon: <HaloIcon icon={DatabaseIcon} size={15} className="text-amber-500" />,
            badge: "Multi-AZ",
          },
        ],
      },
      {
        id: "security-group",
        label: "sec-group-internal",
        icon: <HaloIcon icon={SecurityCheckIcon} size={15} className="text-purple-500" />,
        badge: "Strict",
      },
    ],
  },
];

const SAMPLE_ORG: TreeNode[] = [
  {
    id: "org-root",
    label: "Antigravity Engineering",
    icon: <HaloIcon icon={UserGroupIcon} size={15} className="text-primary" />,
    children: [
      {
        id: "dept-core",
        label: "Core Architecture",
        badge: "8 engineers",
        children: [
          { id: "lead-alex", label: "Alex Rivera (Staff Architect)", badge: "Lead" },
          { id: "eng-elena", label: "Elena Rostova (Senior Systems)" },
          { id: "eng-marcus", label: "Marcus Vance (Compilers)" },
        ],
      },
      {
        id: "dept-design-system",
        label: "Design Systems & Optics",
        badge: "6 engineers",
        children: [
          { id: "lead-sophia", label: "Sophia Chen (Principal Designer)", badge: "Lead" },
          { id: "eng-david", label: "David Thorne (Design Technologist)" },
        ],
      },
    ],
  },
];

const SAMPLE_DEEP: TreeNode[] = [
  {
    id: "l1",
    label: "Level 1: Enterprise Workspace",
    children: [
      {
        id: "l2",
        label: "Level 2: Platform Infrastructure",
        children: [
          {
            id: "l3",
            label: "Level 3: Distributed Edge Services",
            children: [
              {
                id: "l4",
                label: "Level 4: Ingestion Pipeline Runtime",
                children: [
                  {
                    id: "l5",
                    label: "Level 5: Telemetry Buffering Unit",
                    children: [
                      {
                        id: "l6",
                        label: "Level 6: Stream Partition Consumer",
                        children: [
                          {
                            id: "l7",
                            label: "Level 7: Shard Routing Engine",
                            children: [
                              {
                                id: "l8",
                                label: "Level 8: Terminal Node (config.yaml)",
                                badge: "Active",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export function TreeViewPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Component configuration state
  const [variant, setVariant] = React.useState<TreeViewVariant>("glass");
  const [size, setSize] = React.useState<TreeViewSize>("default");
  const [selectionMode, setSelectionMode] = React.useState<TreeViewSelectionMode>("multiple");
  const [scenario, setScenario] = React.useState("files");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [showConnectors, setShowConnectors] = React.useState(true);
  const [showCheckboxes, setShowCheckboxes] = React.useState(true);
  const [selectedIds, setSelectedIds] = React.useState<string[]>(["tree-view-ts"]);
  const [expandedIds, setExpandedIds] = React.useState<string[]>([
    "app",
    "app-components",
    "components",
    "ui",
    "us-east-1",
    "vpc-prod",
    "compute-cluster",
    "org-root",
    "dept-core",
    "l1",
    "l2",
    "l3",
    "l4",
  ]);

  const handleReset = () => {
    setVariant("glass");
    setSize("default");
    setSelectionMode("multiple");
    setScenario("files");
    setContainerWidth("full");
    setShowConnectors(true);
    setShowCheckboxes(true);
    setSelectedIds(["tree-view-ts"]);
    setExpandedIds(["app", "app-components", "components", "ui"]);
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
        return "max-w-xl";
    }
  };

  const currentNodes = React.useMemo(() => {
    switch (scenario) {
      case "cloud":
        return SAMPLE_CLOUD;
      case "org":
        return SAMPLE_ORG;
      case "deep":
        return SAMPLE_DEEP;
      default:
        return SAMPLE_FILES;
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
      label: "Selection",
      value: selectionMode.toUpperCase(),
      variant: selectionMode !== "none" ? "success" : "default",
    },
    {
      label: "Selected Nodes",
      value: `${selectedIds.length} ITEMS`,
      variant: "default",
    },
    {
      label: "Optics",
      value: variant === "glass" ? "SUBTLE GLASS" : "FLAT BASE",
      variant: "default",
    },
    {
      label: "Connectors",
      value: showConnectors ? "HAIRLINE GUIDES" : "OFF",
      variant: "default",
    },
  ];

  const codeSnippet = `<TreeView
  variant="${variant}"
  size="${size}"
  selectionMode="${selectionMode}"
  showConnectors={${showConnectors}}
  showCheckboxes={${showCheckboxes}}
  nodes={nodes}
  expandedIds={expandedIds}
  onExpandedIdsChange={setExpandedIds}
  selectedIds={selectedIds}
  onSelectedIdsChange={setSelectedIds}
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
              onChange={(val) => setVariant(val as TreeViewVariant)}
            />

            <StageControlSelect
              label="Size"
              value={size}
              options={[
                { value: "sm", label: "Small (SM)" },
                { value: "default", label: "Default (MD)" },
                { value: "lg", label: "Large (LG)" },
              ]}
              onChange={(val) => setSize(val as TreeViewSize)}
            />

            <StageControlSelect
              label="Selection Mode"
              value={selectionMode}
              options={[
                { value: "none", label: "None (Display Only)" },
                { value: "single", label: "Single Node" },
                { value: "multiple", label: "Multi-Select" },
              ]}
              onChange={(val) => setSelectionMode(val as TreeViewSelectionMode)}
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
                  id="tree-connectors-toggle"
                  checked={showConnectors}
                  onCheckedChange={(checked) => setShowConnectors(Boolean(checked))}
                />
                <Label htmlFor="tree-connectors-toggle" className="text-xs cursor-pointer select-none">
                  Connector Guides
                </Label>
              </div>

              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="tree-checkboxes-toggle"
                  checked={showCheckboxes}
                  onCheckedChange={(checked) => setShowCheckboxes(Boolean(checked))}
                />
                <Label htmlFor="tree-checkboxes-toggle" className="text-xs cursor-pointer select-none">
                  Show Checkboxes
                </Label>
              </div>
            </div>

            <div className="text-[11px] text-muted-foreground font-mono">
              Keyboard: <kbd className="px-1 py-0.5 rounded bg-muted border border-border text-[10px]">↑↓←→</kbd> to navigate, <kbd className="px-1 py-0.5 rounded bg-muted border border-border text-[10px]">Space</kbd> to select
            </div>
          </div>
        </div>
      }
    >
      <div className="flex w-full items-center justify-center p-3 sm:p-4">
        <div
          className={cn(
            "w-full transition-all duration-200",
            getContainerMaxWidthClass(containerWidth)
          )}
        >
          <TreeView
            variant={variant}
            size={size}
            selectionMode={selectionMode}
            showConnectors={showConnectors}
            showCheckboxes={showCheckboxes}
            nodes={currentNodes}
            expandedIds={expandedIds}
            onExpandedIdsChange={setExpandedIds}
            selectedIds={selectedIds}
            onSelectedIdsChange={setSelectedIds}
            className="w-full"
          />
        </div>
      </div>
    </PreviewStageShell>
  );
}
