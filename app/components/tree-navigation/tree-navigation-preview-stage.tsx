"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  TreeNavigation,
  TreeNavigationList,
  TreeNavigationBranch,
  TreeNavigationLink,
  type TreeNavigationIntensity,
} from "@/components/ui/tree-navigation";
import {
  Folder01Icon,
  PackageIcon,
  Layers01Icon,
  Analytics01Icon,
  Settings02Icon,
  File01Icon,
  DashboardSquare01Icon,
} from "@hugeicons/core-free-icons";

export function TreeNavigationPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [intensity, setIntensity] = React.useState<TreeNavigationIntensity>("balanced");
  const [showConnectors, setShowConnectors] = React.useState<boolean>(true);
  const [indentation, setIndentation] = React.useState<number>(16);
  const [currentPath, setCurrentPath] = React.useState<string>("/products/catalog");

  const [expanded, setExpanded] = React.useState<string[]>([
    "workspace",
    "products",
    "analytics",
  ]);

  const handleReset = React.useCallback(() => {
    setActiveTab("preview");
    setBackdrop("neutral");
    setViewport("desktop");
    setIntensity("balanced");
    setShowConnectors(true);
    setIndentation(16);
    setCurrentPath("/products/catalog");
    setExpanded(["workspace", "products", "analytics"]);
  }, []);

  const generatedCode = React.useMemo(() => {
    return `import {
  TreeNavigation,
  TreeNavigationList,
  TreeNavigationBranch,
  TreeNavigationLink,
} from "@/components/ui/tree-navigation";
import {
  Folder01Icon,
  PackageIcon,
  Layers01Icon,
  Analytics01Icon,
  Settings02Icon,
  File01Icon,
} from "@hugeicons/core-free-icons";

export function WorkspaceNavigation() {
  const [currentRoute, setCurrentRoute] = React.useState("${currentPath}");
  const [expandedBranches, setExpandedBranches] = React.useState(${JSON.stringify(expanded)});

  return (
    <TreeNavigation
      value={currentRoute}
      expandedValues={expandedBranches}
      onExpandedValuesChange={setExpandedBranches}
      intensity="${intensity}"
      showConnectors={${showConnectors}}
      indentation={${indentation}}
      className="max-w-xs"
    >
      <TreeNavigationList>
        <TreeNavigationBranch
          value="workspace"
          label="Workspace"
          icon={Folder01Icon}
          containsCurrent={currentRoute.startsWith("/products") || currentRoute.startsWith("/analytics")}
        >
          <TreeNavigationBranch
            value="products"
            label="Products"
            icon={PackageIcon}
            badge="3"
            containsCurrent={currentRoute.startsWith("/products")}
          >
            <TreeNavigationLink
              value="/products/catalog"
              href="#/products/catalog"
              icon={File01Icon}
              onClick={() => setCurrentRoute("/products/catalog")}
            >
              Catalog
            </TreeNavigationLink>
            <TreeNavigationLink
              value="/products/inventory"
              href="#/products/inventory"
              icon={File01Icon}
              onClick={() => setCurrentRoute("/products/inventory")}
            >
              Inventory
            </TreeNavigationLink>
            <TreeNavigationLink
              value="/products/deployments"
              href="#/products/deployments"
              icon={Layers01Icon}
              onClick={() => setCurrentRoute("/products/deployments")}
            >
              Deployments
            </TreeNavigationLink>
          </TreeNavigationBranch>

          <TreeNavigationBranch
            value="analytics"
            label="Analytics"
            icon={Analytics01Icon}
            badge="2"
            containsCurrent={currentRoute.startsWith("/analytics")}
          >
            <TreeNavigationLink
              value="/analytics/traffic"
              href="#/analytics/traffic"
              icon={File01Icon}
              onClick={() => setCurrentRoute("/analytics/traffic")}
            >
              Traffic Telemetry
            </TreeNavigationLink>
            <TreeNavigationLink
              value="/analytics/revenue"
              href="#/analytics/revenue"
              icon={File01Icon}
              onClick={() => setCurrentRoute("/analytics/revenue")}
            >
              Revenue Streams
            </TreeNavigationLink>
          </TreeNavigationBranch>
        </TreeNavigationBranch>

        <TreeNavigationBranch
          value="settings"
          label="Settings"
          icon={Settings02Icon}
          containsCurrent={currentRoute.startsWith("/settings")}
        >
          <TreeNavigationLink
            value="/settings/general"
            href="#/settings/general"
            icon={File01Icon}
            onClick={() => setCurrentRoute("/settings/general")}
          >
            General Preferences
          </TreeNavigationLink>
          <TreeNavigationLink
            value="/settings/security"
            href="#/settings/security"
            icon={File01Icon}
            onClick={() => setCurrentRoute("/settings/security")}
          >
            Security &amp; Keys
          </TreeNavigationLink>
        </TreeNavigationBranch>
      </TreeNavigationList>
    </TreeNavigation>
  );
}`;
  }, [currentPath, expanded, intensity, showConnectors, indentation]);

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      code={generatedCode}
      telemetry={[
        { label: "Current Leaf", value: currentPath, variant: "success" },
        { label: "Expanded Branches", value: `${expanded.length} open` },
        { label: "Keyboard Model", value: "ARIA Tree (Roving)" },
        { label: "Material", value: intensity },
      ]}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full">
          <StageControlSelect
            label="Intensity"
            value={intensity}
            onChange={(v) => setIntensity(v as TreeNavigationIntensity)}
            options={[
              { value: "subtle", label: "Subtle" },
              { value: "balanced", label: "Balanced" },
              { value: "rich", label: "Rich" },
            ]}
          />
          <StageControlSelect
            label="Connector Guides"
            value={showConnectors ? "visible" : "hidden"}
            onChange={(v) => setShowConnectors(v === "visible")}
            options={[
              { value: "visible", label: "Visible" },
              { value: "hidden", label: "Hidden" },
            ]}
          />
          <StageControlSelect
            label="Indentation"
            value={String(indentation)}
            onChange={(v) => setIndentation(Number(v))}
            options={[
              { value: "12", label: "12px (Compact)" },
              { value: "16", label: "16px (Standard)" },
              { value: "20", label: "20px (Relaxed)" },
            ]}
          />
        </div>
      }
    >
      <div className="relative flex flex-col items-center justify-center p-4 sm:p-8 w-full min-h-[460px] overflow-hidden">
        {/* Floating Tree Navigation Surface with Canonical Liquid Glass Optics */}
        <div className="w-full max-w-sm relative z-10">
          <TreeNavigation
            value={currentPath}
            expandedValues={expanded}
            onExpandedValuesChange={setExpanded}
            intensity={intensity}
            showConnectors={showConnectors}
            indentation={indentation}
            className="w-full"
          >
            <div className="mb-3 flex items-center justify-between border-b border-border/40 pb-2 px-1">
              <span className="text-[11px] font-mono font-medium text-muted-foreground uppercase">
                Application Explorer
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/[0.05] dark:bg-white/[0.08] text-foreground border border-black/10 dark:border-white/15">
                Tree Navigation
              </span>
            </div>

            <TreeNavigationList>
              <TreeNavigationBranch
                value="workspace"
                label="Workspace"
                icon={Folder01Icon}
                containsCurrent={currentPath.startsWith("/products") || currentPath.startsWith("/analytics")}
              >
                <TreeNavigationBranch
                  value="products"
                  label="Products"
                  icon={PackageIcon}
                  badge="3"
                  containsCurrent={currentPath.startsWith("/products")}
                >
                  <TreeNavigationLink
                    value="/products/catalog"
                    href="#/products/catalog"
                    icon={File01Icon}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPath("/products/catalog");
                    }}
                  >
                    Catalog
                  </TreeNavigationLink>
                  <TreeNavigationLink
                    value="/products/inventory"
                    href="#/products/inventory"
                    icon={File01Icon}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPath("/products/inventory");
                    }}
                  >
                    Inventory
                  </TreeNavigationLink>
                  <TreeNavigationLink
                    value="/products/deployments"
                    href="#/products/deployments"
                    icon={Layers01Icon}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPath("/products/deployments");
                    }}
                  >
                    Deployments
                  </TreeNavigationLink>
                </TreeNavigationBranch>

                <TreeNavigationBranch
                  value="analytics"
                  label="Analytics"
                  icon={Analytics01Icon}
                  badge="2"
                  containsCurrent={currentPath.startsWith("/analytics")}
                >
                  <TreeNavigationLink
                    value="/analytics/traffic"
                    href="#/analytics/traffic"
                    icon={File01Icon}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPath("/analytics/traffic");
                    }}
                  >
                    Traffic Telemetry
                  </TreeNavigationLink>
                  <TreeNavigationLink
                    value="/analytics/revenue"
                    href="#/analytics/revenue"
                    icon={File01Icon}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPath("/analytics/revenue");
                    }}
                  >
                    Revenue Streams
                  </TreeNavigationLink>
                </TreeNavigationBranch>
              </TreeNavigationBranch>

              <TreeNavigationBranch
                value="settings"
                label="Settings"
                icon={Settings02Icon}
                containsCurrent={currentPath.startsWith("/settings")}
              >
                <TreeNavigationLink
                  value="/settings/general"
                  href="#/settings/general"
                  icon={File01Icon}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPath("/settings/general");
                  }}
                >
                  General Preferences
                </TreeNavigationLink>
                <TreeNavigationLink
                  value="/settings/security"
                  href="#/settings/security"
                  icon={File01Icon}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPath("/settings/security");
                  }}
                >
                  Security &amp; Keys
                </TreeNavigationLink>
              </TreeNavigationBranch>
            </TreeNavigationList>
          </TreeNavigation>
        </div>
      </div>
    </PreviewStageShell>
  );
}
