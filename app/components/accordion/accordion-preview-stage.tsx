"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionVariant,
  type AccordionDensity,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Shield01Icon,
  CloudSavingDone02Icon,
  CpuIcon,
  LockKeyIcon,
  SlidersHorizontalIcon,
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

export function AccordionPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Accordion configuration states
  const [variant, setVariant] = React.useState<AccordionVariant>("glass");
  const [density, setDensity] = React.useState<AccordionDensity>("default");
  const [isMultiple, setIsMultiple] = React.useState(false);
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [hasLongText, setHasLongText] = React.useState(false);
  const [hasDisabledItem, setHasDisabledItem] = React.useState(false);

  // Controlled value for single/multiple modes
  const [singleValue, setSingleValue] = React.useState<string>("item-1");
  const [multipleValue, setMultipleValue] = React.useState<string[]>(["item-1"]);

  const handleReset = () => {
    setVariant("glass");
    setDensity("default");
    setIsMultiple(false);
    setContainerWidth("full");
    setHasLongText(false);
    setHasDisabledItem(false);
    setSingleValue("item-1");
    setMultipleValue(["item-1"]);
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
      label: "Mode",
      value: isMultiple ? "MULTIPLE" : "SINGLE",
      variant: isMultiple ? "success" : "default",
    },
    {
      label: "Container",
      value: containerWidth === "full" ? "FLUID" : `${containerWidth}px`,
      variant: containerWidth === "240" ? "warning" : "default",
    },
    {
      label: "Primitive",
      value: "BASE-UI",
      variant: "default",
    },
  ];

  const codeSnippet = `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Shield01Icon, CloudSavingDone02Icon } from "@hugeicons/core-free-icons";

export function AccordionDemo() {
  return (
    <Accordion
      variant="${variant}"
      density="${density}"
      ${isMultiple ? 'multiple={true}' : 'multiple={false}'}
      defaultValue="${isMultiple ? '["item-1"]' : 'item-1'}"
      className="w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          icon={<HaloIcon icon={Shield01Icon} size={16} />}
          badge={<StatusBadge status="healthy">Active</StatusBadge>}
        >
          ${
            hasLongText
              ? "How does HaloUI handle accessibility and reduced transparency across nested Liquid Glass surfaces?"
              : "Zero-Trust Cryptographic Isolation"
          }
        </AccordionTrigger>
        <AccordionContent>
          Enterprise tenants operate in hardware-isolated enclave boundaries with continuous
          attestation and client-side key envelope rotation.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger icon={<HaloIcon icon={CloudSavingDone02Icon} size={16} />}>
          Multi-Region State Synchronisation
        </AccordionTrigger>
        <AccordionContent>
          Distributed quorum consensus with sub-5ms localized edge caching and active-active
          failover across nine geographic availability clusters.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;

  return (
    <PreviewStageShell
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
        <div className="space-y-4 w-full">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 w-full">
            {/* Surface Variant */}
            <StageControlSelect
              label="Variant"
              value={variant}
              onChange={(val) => setVariant(val as AccordionVariant)}
              options={[
                { value: "glass", label: "Glass (HaloUI Liquid)" },
                { value: "default", label: "Default (Card Tint)" },
                { value: "outline", label: "Outline (Hairline)" },
                { value: "muted", label: "Muted (Soft Fill)" },
                { value: "ghost", label: "Ghost (Borderless)" },
              ]}
            />

            {/* Density Scale */}
            <StageControlSelect
              label="Density"
              value={density}
              onChange={(val) => setDensity(val as AccordionDensity)}
              options={[
                { value: "default", label: "Default (14px)" },
                { value: "compact", label: "Compact (8-10px)" },
                { value: "relaxed", label: "Relaxed (18px)" },
              ]}
            />

            {/* Mode (Single vs Multiple) */}
            <StageControlSelect
              label="Mode"
              value={isMultiple ? "multiple" : "single"}
              onChange={(val) => setIsMultiple(val === "multiple")}
              options={[
                { value: "single", label: "Single Expansion" },
                { value: "multiple", label: "Multiple Expansion" },
              ]}
            />

            {/* Container Width Simulator */}
            <StageControlSelect
              label="Width Simulation"
              value={containerWidth}
              onChange={(val) => setContainerWidth(val)}
              options={CONTAINER_WIDTH_OPTIONS}
            />
          </div>

          {/* Test Toggles */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs font-medium text-muted-foreground mr-1">QA Toggles:</span>
            <button
              type="button"
              onClick={() => setHasLongText(!hasLongText)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                hasLongText
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {hasLongText ? "✓ Long Trigger" : "Long Trigger"}
            </button>

            <button
              type="button"
              onClick={() => setHasDisabledItem(!hasDisabledItem)}
              className={cn(
                "h-7 px-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer select-none",
                hasDisabledItem
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted/60"
              )}
            >
              {hasDisabledItem ? "✓ Disabled Item" : "Disabled Item"}
            </button>
          </div>
        </div>
      }
    >
      <div className="w-full flex items-center justify-center py-6 px-2 sm:px-4">
        <div
          className={cn(
            "w-full transition-all duration-300 mx-auto",
            getContainerMaxWidthClass(containerWidth)
          )}
        >
          {isMultiple ? (
            <Accordion
              variant={variant}
              density={density}
              multiple={true}
              value={multipleValue}
              onValueChange={(val) => setMultipleValue(val as string[])}
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger
                  icon={<HaloIcon icon={Shield01Icon} size={16} />}
                  badge={<StatusBadge tone="positive">Enforced</StatusBadge>}
                >
                  {hasLongText
                    ? "How does HaloUI handle accessibility and reduced transparency across nested Liquid Glass surfaces?"
                    : "Zero-Trust Cryptographic Enclave Isolation"}
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    Enterprise tenant workloads execute within hardware-shielded AWS Nitro / AMD
                    SEV micro-VM enclaves. Memory encryption keys are negotiated via quantum-resistant
                    ephemeral exchange and rotated every 300 seconds.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Button size="xs" variant="outline">
                      Review Key Policies
                    </Button>
                    <Badge variant="outline" className="text-[11px]">
                      FIPS 140-3 Level 4
                    </Badge>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger
                  icon={<HaloIcon icon={CloudSavingDone02Icon} size={16} />}
                  badge={<Badge variant="secondary">Global</Badge>}
                >
                  Multi-Region Deterministic State Replication
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    Read replicas synchronize against Byzantine fault-tolerant Raft log groups
                    with maximum cross-datacenter p99 replication latency bounded at 12 milliseconds.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Telemetry status: Active consensus nodes across Frankfurt, Singapore, Oregon,
                    and São Paulo.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" disabled={hasDisabledItem}>
                <AccordionTrigger
                  icon={<HaloIcon icon={CpuIcon} size={16} />}
                  badge={
                    hasDisabledItem ? (
                      <Badge variant="outline" className="opacity-70">
                        Locked
                      </Badge>
                    ) : undefined
                  }
                >
                  Dynamic Adaptive Neural Compute Allocation
                </AccordionTrigger>
                <AccordionContent>
                  Dynamic tensor allocation adjusts inference pipeline depths automatically in
                  response to sudden upstream request spikes without dropping persistent WebSocket
                  tunnels.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger icon={<HaloIcon icon={LockKeyIcon} size={16} />}>
                  Access Tokens &amp; Identity Assertion Policies
                </AccordionTrigger>
                <AccordionContent>
                  Workload identity federation translates OIDC JWT bearer tokens into scoped IAM
                  session credentials with short 15-minute time-to-live restrictions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Accordion
              variant={variant}
              density={density}
              multiple={false}
              value={singleValue}
              onValueChange={(val: any) =>
                setSingleValue(Array.isArray(val) ? val[0] || "" : val || "")
              }
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger
                  icon={<HaloIcon icon={Shield01Icon} size={16} />}
                  badge={<StatusBadge tone="positive">Enforced</StatusBadge>}
                >
                  {hasLongText
                    ? "How does HaloUI handle accessibility and reduced transparency across nested Liquid Glass surfaces?"
                    : "Zero-Trust Cryptographic Enclave Isolation"}
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    Enterprise tenant workloads execute within hardware-shielded AWS Nitro / AMD
                    SEV micro-VM enclaves. Memory encryption keys are negotiated via quantum-resistant
                    ephemeral exchange and rotated every 300 seconds.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Button size="xs" variant="outline">
                      Review Key Policies
                    </Button>
                    <Badge variant="outline" className="text-[11px]">
                      FIPS 140-3 Level 4
                    </Badge>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger
                  icon={<HaloIcon icon={CloudSavingDone02Icon} size={16} />}
                  badge={<Badge variant="secondary">Global</Badge>}
                >
                  Multi-Region Deterministic State Replication
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    Read replicas synchronize against Byzantine fault-tolerant Raft log groups
                    with maximum cross-datacenter p99 replication latency bounded at 12 milliseconds.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Telemetry status: Active consensus nodes across Frankfurt, Singapore, Oregon,
                    and São Paulo.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" disabled={hasDisabledItem}>
                <AccordionTrigger
                  icon={<HaloIcon icon={CpuIcon} size={16} />}
                  badge={
                    hasDisabledItem ? (
                      <Badge variant="outline" className="opacity-70">
                        Locked
                      </Badge>
                    ) : undefined
                  }
                >
                  Dynamic Adaptive Neural Compute Allocation
                </AccordionTrigger>
                <AccordionContent>
                  Dynamic tensor allocation adjusts inference pipeline depths automatically in
                  response to sudden upstream request spikes without dropping persistent WebSocket
                  tunnels.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger icon={<HaloIcon icon={LockKeyIcon} size={16} />}>
                  Access Tokens &amp; Identity Assertion Policies
                </AccordionTrigger>
                <AccordionContent>
                  Workload identity federation translates OIDC JWT bearer tokens into scoped IAM
                  session credentials with short 15-minute time-to-live restrictions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
