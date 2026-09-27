"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  type TableVariant,
  type TableDensity,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import {
  ServerIcon,
  Globe02Icon,
  CpuIcon,
  Clock01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const CLUSTER_DATA = [
  {
    id: "node-us-east-01",
    name: "edge-gateway-alpha",
    region: "us-east (N. Virginia)",
    status: "healthy" as const,
    cpu: "24.2%",
    memory: "6.8 / 16 GB",
    latency: "14ms",
    requests: "128,490/s",
  },
  {
    id: "node-eu-west-02",
    name: "edge-gateway-beta",
    region: "eu-west (Frankfurt)",
    status: "healthy" as const,
    cpu: "38.5%",
    memory: "9.2 / 16 GB",
    latency: "28ms",
    requests: "94,120/s",
  },
  {
    id: "node-ap-se-01",
    name: "edge-gateway-gamma",
    region: "ap-southeast (Singapore)",
    status: "degraded" as const,
    cpu: "89.1%",
    memory: "15.4 / 16 GB",
    latency: "142ms",
    requests: "45,800/s",
  },
  {
    id: "node-sa-east-01",
    name: "edge-gateway-delta",
    region: "sa-east (São Paulo)",
    status: "healthy" as const,
    cpu: "18.3%",
    memory: "5.1 / 16 GB",
    latency: "62ms",
    requests: "32,900/s",
  },
  {
    id: "node-af-south-01",
    name: "edge-gateway-epsilon",
    region: "af-south (Cape Town)",
    status: "healthy" as const,
    cpu: "12.7%",
    memory: "4.2 / 16 GB",
    latency: "118ms",
    requests: "19,250/s",
  },
];

export function TablePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Controls state
  const [variant, setVariant] = React.useState<TableVariant>("glass");
  const [density, setDensity] = React.useState<TableDensity>("default");
  const [striped, setStriped] = React.useState(false);
  const [stickyHeader, setStickyHeader] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>("node-us-east-01");
  const [containerWidth, setContainerWidth] = React.useState<"full" | "lg" | "md" | "sm" | "xs">("full");

  const handleReset = () => {
    setVariant("glass");
    setDensity("default");
    setStriped(false);
    setStickyHeader(false);
    setSelectedRowId("node-us-east-01");
    setContainerWidth("full");
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Variant",
      value: variant.toUpperCase(),
      variant: "default",
    },
    {
      label: "Density",
      value: density.toUpperCase(),
      variant: "default",
    },
    {
      label: "Striped",
      value: striped ? "ON" : "OFF",
      variant: striped ? "success" : "default",
    },
    {
      label: "Overflow",
      value: "CONTAINED (x-auto)",
      variant: "success",
    },
    {
      label: "Container",
      value:
        containerWidth === "xs"
          ? "280px (Narrow)"
          : containerWidth === "sm"
          ? "360px (Mobile)"
          : containerWidth === "md"
          ? "480px (Tablet)"
          : containerWidth === "lg"
          ? "768px (Laptop)"
          : "100% (Fluid)",
      variant: containerWidth === "xs" || containerWidth === "sm" ? "warning" : "default",
    },
  ];

  const codeSnippet = `<Table
  variant="${variant}"
  density="${density}"${striped ? "\n  striped" : ""}${stickyHeader ? "\n  stickyHeader" : ""}
  containerLabel="Production cluster nodes"
>
  <TableCaption>A live inventory of active edge nodes across global distribution regions.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Node Identifier</TableHead>
      <TableHead>Region</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">CPU</TableHead>
      <TableHead className="text-right">Memory</TableHead>
      <TableHead className="text-right">Latency</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {nodes.map((node) => (
      <TableRow key={node.id} selected={node.id === selectedId}>
        <TableCell className="font-medium font-mono">{node.name}</TableCell>
        <TableCell>{node.region}</TableCell>
        <TableCell>
          <StatusBadge status={node.status} size="sm">
            {node.status}
          </StatusBadge>
        </TableCell>
        <TableCell className="text-right font-mono">{node.cpu}</TableCell>
        <TableCell className="text-right font-mono">{node.memory}</TableCell>
        <TableCell className="text-right font-mono">{node.latency}</TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <HaloIcon icon={MoreHorizontalIcon} size={14} />
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Aggregate Ingress Load</TableCell>
      <TableCell colSpan={4} className="text-right font-mono font-semibold">
        320,560 requests/sec
      </TableCell>
    </TableRow>
  </TableFooter>
</Table>`;

  return (
    <PreviewStageShell
      title="Table Interactive Stage"
      description="Inspect container-aware horizontal scroll containment, density variants, zebra striping, and restrained HaloUI Liquid Glass outer boundary."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      telemetry={telemetry}
      code={codeSnippet}
      onReset={handleReset}
      controls={
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StageControlSelect
            label="Surface Variant"
            value={variant}
            onChange={(val) => setVariant(val as TableVariant)}
            options={[
              { value: "glass", label: "Glass (Liquid Shell)" },
              { value: "default", label: "Default (Card Tint)" },
              { value: "outline", label: "Outline (Clean Border)" },
              { value: "muted", label: "Muted (Low Contrast)" },
              { value: "ghost", label: "Ghost (Minimal)" },
            ]}
          />

          <StageControlSelect
            label="Density Scale"
            value={density}
            onChange={(val) => setDensity(val as TableDensity)}
            options={[
              { value: "compact", label: "Compact (Dense Matrix)" },
              { value: "default", label: "Default (12px Spacing)" },
              { value: "comfortable", label: "Comfortable (16px Spacing)" },
            ]}
          />

          <StageControlSelect
            label="Simulated Container"
            value={containerWidth}
            onChange={(val) => setContainerWidth(val as typeof containerWidth)}
            options={[
              { value: "full", label: "Full Width (100%)" },
              { value: "lg", label: "Laptop / Split (768px)" },
              { value: "md", label: "Tablet / Column (480px)" },
              { value: "sm", label: "Mobile (360px) — Scroll" },
              { value: "xs", label: "Narrow (280px) — Scroll" },
            ]}
          />

          <div className="flex flex-col justify-end space-y-2 pb-0.5">
            <span className="text-xs font-medium text-muted-foreground">Options</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="table-striped-toggle"
                  checked={striped}
                  onCheckedChange={(c) => setStriped(!!c)}
                />
                <Label htmlFor="table-striped-toggle" className="text-xs cursor-pointer">
                  Zebra Striped
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="table-sticky-toggle"
                  checked={stickyHeader}
                  onCheckedChange={(c) => setStickyHeader(!!c)}
                />
                <Label htmlFor="table-sticky-toggle" className="text-xs cursor-pointer">
                  Sticky Head
                </Label>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full flex items-center justify-center py-6">
        <div
          className={cn(
            "w-full transition-all duration-300 ease-in-out",
            containerWidth === "xs" && "max-w-[280px]",
            containerWidth === "sm" && "max-w-[360px]",
            containerWidth === "md" && "max-w-[480px]",
            containerWidth === "lg" && "max-w-[768px]",
            containerWidth === "full" && "max-w-4xl"
          )}
        >
          {containerWidth !== "full" && (
            <div className="mb-2 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
              <span>Container Bound: {containerWidth === "xs" ? "280px" : containerWidth === "sm" ? "360px" : containerWidth === "md" ? "480px" : "768px"}</span>
              <span className="font-mono text-[10px] text-primary">← scroll horizontally →</span>
            </div>
          )}

          <Table
            variant={variant}
            density={density}
            striped={striped}
            stickyHeader={stickyHeader}
            containerLabel="Interactive cluster node inventory"
          >
            <TableCaption>
              A live telemetry inventory of edge routing clusters across global zones.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]">
                  <div className="flex items-center gap-1.5">
                    <HaloIcon icon={ServerIcon} size={14} className="text-muted-foreground" />
                    <span>Node Identifier</span>
                  </div>
                </TableHead>
                <TableHead className="min-w-[190px]">
                  <div className="flex items-center gap-1.5">
                    <HaloIcon icon={Globe02Icon} size={14} className="text-muted-foreground" />
                    <span>Region</span>
                  </div>
                </TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
                <TableHead className="min-w-[100px] text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <HaloIcon icon={CpuIcon} size={14} className="text-muted-foreground" />
                    <span>CPU</span>
                  </div>
                </TableHead>
                <TableHead className="min-w-[120px] text-right">Memory</TableHead>
                <TableHead className="min-w-[100px] text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <HaloIcon icon={Clock01Icon} size={14} className="text-muted-foreground" />
                    <span>Latency</span>
                  </div>
                </TableHead>
                <TableHead className="min-w-[70px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CLUSTER_DATA.map((node) => {
                const isSelected = selectedRowId === node.id;
                return (
                  <TableRow
                    key={node.id}
                    selected={isSelected}
                    onClick={() => setSelectedRowId(isSelected ? null : node.id)}
                    className="cursor-pointer"
                  >
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-foreground font-semibold">{node.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{node.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{node.region}</TableCell>
                    <TableCell>
                      <StatusBadge tone={node.status === "healthy" ? "positive" : "warning"} size="sm">
                        {node.status}
                      </StatusBadge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs font-medium">
                      {node.cpu}
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs text-muted-foreground">
                      {node.memory}
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">
                      <Badge
                        variant={parseInt(node.latency) > 100 ? "destructive" : "outline"}
                        className="font-mono text-[10px]"
                      >
                        {node.latency}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        aria-label={`Node options for ${node.name}`}
                      >
                        <HaloIcon icon={MoreHorizontalIcon} size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="text-xs font-medium">
                  5 Edge Nodes Active
                </TableCell>
                <TableCell colSpan={4} className="text-right font-mono text-xs font-semibold text-foreground">
                  Ingress Total: 320,560 req/s
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </PreviewStageShell>
  );
}
