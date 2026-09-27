"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  DataTable,
  DataTableColumnHeader,
} from "@/components/ui/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import {
  MoreHorizontalIcon,
  Delete02Icon,
  Download01Icon,
  RefreshIcon,
  Rocket01Icon,
  CodeIcon,
} from "@hugeicons/core-free-icons";
import { type TableVariant, type TableDensity } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface DeploymentRecord {
  id: string;
  name: string;
  environment: "Production" | "Staging" | "Preview";
  status: "healthy" | "warning" | "critical" | "neutral";
  statusLabel: string;
  commit: string;
  branch: string;
  author: string;
  latency: string;
  updatedAt: string;
}

const SAMPLE_DEPLOYMENTS: DeploymentRecord[] = [
  {
    id: "dep-001",
    name: "api-gateway-edge",
    environment: "Production",
    status: "healthy",
    statusLabel: "Active (v2.4.0)",
    commit: "e4f81c9",
    branch: "main",
    author: "Elena Rostova",
    latency: "14ms",
    updatedAt: "2m ago",
  },
  {
    id: "dep-002",
    name: "auth-mesh-service",
    environment: "Production",
    status: "healthy",
    statusLabel: "Active (v1.9.2)",
    commit: "b7201df",
    branch: "main",
    author: "Marcus Chen",
    latency: "22ms",
    updatedAt: "14m ago",
  },
  {
    id: "dep-003",
    name: "payment-checkout-worker",
    environment: "Production",
    status: "warning",
    statusLabel: "High Latency",
    commit: "88a91ec",
    branch: "hotfix/stripe",
    author: "Elena Rostova",
    latency: "185ms",
    updatedAt: "28m ago",
  },
  {
    id: "dep-004",
    name: "realtime-websocket-hub",
    environment: "Staging",
    status: "healthy",
    statusLabel: "Running (v3.0.0-rc)",
    commit: "91e4a02",
    branch: "staging",
    author: "Sophia Patel",
    latency: "35ms",
    updatedAt: "1h ago",
  },
  {
    id: "dep-005",
    name: "search-vector-indexer",
    environment: "Staging",
    status: "critical",
    statusLabel: "OOM Kill (Exited)",
    commit: "c3d19fb",
    branch: "feature/qdrant",
    author: "David Kim",
    latency: "—",
    updatedAt: "3h ago",
  },
  {
    id: "dep-006",
    name: "analytics-batch-pipeline",
    environment: "Preview",
    status: "neutral",
    statusLabel: "Queued",
    commit: "f1a2384",
    branch: "preview/pr-42",
    author: "Sophia Patel",
    latency: "—",
    updatedAt: "4h ago",
  },
  {
    id: "dep-007",
    name: "media-transcoder-node",
    environment: "Production",
    status: "healthy",
    statusLabel: "Active (v1.1.0)",
    commit: "7d09ec1",
    branch: "main",
    author: "Marcus Chen",
    latency: "48ms",
    updatedAt: "6h ago",
  },
];

export function DataTablePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Controls state
  const [variant, setVariant] = React.useState<TableVariant>("glass");
  const [density, setDensity] = React.useState<TableDensity>("default");
  const [striped, setStriped] = React.useState(false);
  const [containerWidth, setContainerWidth] = React.useState<"full" | "lg" | "md" | "sm">("full");

  const handleReset = () => {
    setVariant("glass");
    setDensity("default");
    setStriped(false);
    setContainerWidth("full");
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const columns: ColumnDef<DeploymentRecord>[] = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all rows"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={`Select deployment ${row.original.name}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Service Name" />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-mono text-xs font-semibold text-foreground">
              {row.getValue("name")}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {row.original.id}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "environment",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Environment" />
        ),
        cell: ({ row }) => {
          const env = row.getValue("environment") as string;
          return (
            <Badge
              variant={
                env === "Production"
                  ? "default"
                  : env === "Staging"
                  ? "secondary"
                  : "outline"
              }
              className="text-[11px]"
            >
              {env}
            </Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Deployment Status" />
        ),
        cell: ({ row }) => {
          const status = row.original.status;
          const tone =
            status === "healthy"
              ? "positive"
              : status === "warning"
              ? "warning"
              : status === "critical"
              ? "critical"
              : "neutral";
          return (
            <StatusBadge tone={tone} size="sm">
              {row.original.statusLabel}
            </StatusBadge>
          );
        },
      },
      {
        accessorKey: "commit",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Commit / Branch" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <HaloIcon icon={CodeIcon} size={13} />
            <span className="text-foreground">{row.getValue("commit")}</span>
            <span className="text-[10px] text-muted-foreground">({row.original.branch})</span>
          </div>
        ),
      },
      {
        accessorKey: "latency",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="P95 Latency" />
        ),
        cell: ({ row }) => (
          <div className="font-mono text-xs font-medium text-foreground">
            {row.getValue("latency")}
          </div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                aria-label={`Open menu for ${row.original.name}`}
              >
                <HaloIcon icon={MoreHorizontalIcon} size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 text-xs">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.commit)}>
                Copy commit hash
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View live metrics</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Rollback</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  );

  const telemetry: TelemetryItem[] = [
    {
      label: "Engine",
      value: "TanStack Table v8",
      variant: "success",
    },
    {
      label: "Shell Variant",
      value: variant.toUpperCase(),
      variant: "default",
    },
    {
      label: "Density",
      value: density.toUpperCase(),
      variant: "default",
    },
    {
      label: "Sort & Filter",
      value: "CLIENT-ACTIVE",
      variant: "success",
    },
    {
      label: "Bulk Bar",
      value: "BALANCED GLASS",
      variant: "default",
    },
  ];

  const codeSnippet = `<DataTable
  columns={columns}
  data={deployments}
  searchKey="name"
  searchPlaceholder="Filter deployments..."
  variant="${variant}"
  density="${density}"${striped ? "\n  striped" : ""}
  pageSize={5}
  floatingActions={(table) => (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="outline" className="h-7 text-xs">
        Export Selected
      </Button>
      <Button size="sm" variant="destructive" className="h-7 text-xs">
        Rollback Selected
      </Button>
    </div>
  )}
/>`;

  return (
    <PreviewStageShell
      title="Data Table Interactive Stage"
      description="Inspect interactive multi-column sorting, search filtering, column visibility toggles, client pagination, and floating liquid glass bulk action bar."
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
              { value: "default", label: "Default (Standard)" },
              { value: "comfortable", label: "Comfortable (Spacious)" },
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
              { value: "sm", label: "Mobile (360px)" },
            ]}
          />

          <div className="flex flex-col justify-end space-y-2 pb-0.5">
            <span className="text-xs font-medium text-muted-foreground">Options</span>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="datatable-striped-toggle"
                checked={striped}
                onCheckedChange={(c) => setStriped(!!c)}
              />
              <label
                htmlFor="datatable-striped-toggle"
                className="text-xs cursor-pointer select-none"
              >
                Zebra Striped Rows
              </label>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full flex items-center justify-center py-6">
        <div
          className={cn(
            "w-full transition-all duration-300 ease-in-out",
            containerWidth === "sm" && "max-w-[360px]",
            containerWidth === "md" && "max-w-[480px]",
            containerWidth === "lg" && "max-w-[768px]",
            containerWidth === "full" && "max-w-4xl"
          )}
        >
          <DataTable
            columns={columns}
            data={SAMPLE_DEPLOYMENTS}
            searchKey="name"
            searchPlaceholder="Filter deployments by service name..."
            variant={variant}
            density={density}
            striped={striped}
            pageSize={5}
            pageSizeOptions={[5, 10, 20]}
            toolbarActions={
              <Button size="sm" className="h-8 gap-1.5 text-xs">
                <HaloIcon icon={Rocket01Icon} size={14} />
                <span>New Deploy</span>
              </Button>
            }
            floatingActions={(table) => (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs gap-1.5 bg-background/50"
                  onClick={() => alert(`Exporting ${table.getFilteredSelectedRowModel().rows.length} rows`)}
                >
                  <HaloIcon icon={Download01Icon} size={13} />
                  <span>Export</span>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => table.resetRowSelection()}
                >
                  Cancel
                </Button>
              </div>
            )}
          />
        </div>
      </div>
    </PreviewStageShell>
  );
}
