"use client";

import * as React from "react";
import {
  StatusBadge,
  type StatusTone,
  type StatusSize,
} from "@/components/ui/status-badge";
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
  CheckmarkCircle01Icon,
  Alert02Icon,
  CancelCircleIcon,
  HelpCircleIcon,
  HourglassIcon,
} from "@hugeicons/core-free-icons";

const STATUS_PRESETS: Record<StatusTone, { label: string; icon: any }> = {
  neutral: { label: "Offline", icon: HelpCircleIcon },
  positive: { label: "Operational", icon: CheckmarkCircle01Icon },
  warning: { label: "Degraded", icon: Alert02Icon },
  critical: { label: "Outage", icon: CancelCircleIcon },
  info: { label: "Processing", icon: HourglassIcon },
};

export function StatusBadgePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Controls state
  const [tone, setTone] = React.useState<StatusTone>("positive");
  const [size, setSize] = React.useState<StatusSize>("default");
  const [showDot, setShowDot] = React.useState(true);
  const [useIcon, setUseIcon] = React.useState(false);
  const [label, setLabel] = React.useState("Operational");

  const handleReset = () => {
    setTone("positive");
    setSize("default");
    setShowDot(true);
    setUseIcon(false);
    setLabel("Operational");
    setBackdrop("mesh");
    setViewport("desktop");
  };

  const handleToneChange = (newTone: StatusTone) => {
    setTone(newTone);
    setLabel(STATUS_PRESETS[newTone].label);
  };

  const telemetry: TelemetryItem[] = [
    {
      label: "Tone",
      value: tone.toUpperCase(),
      variant:
        tone === "positive"
          ? "success"
          : tone === "warning" || tone === "critical"
          ? "warning"
          : "default",
    },
    {
      label: "Indicator",
      value: useIcon ? "ICON" : showDot ? "DOT" : "TEXT-ONLY",
      variant: "default",
    },
    {
      label: "Size",
      value: size.toUpperCase(),
      variant: "default",
    },
  ];

  const generatedCode = React.useMemo(() => {
    const propsList = [];
    if (tone !== "neutral") propsList.push(`tone="${tone}"`);
    if (size !== "default") propsList.push(`size="${size}"`);
    if (!showDot && !useIcon) propsList.push(`dot={false}`);

    const IconComponent = STATUS_PRESETS[tone].icon;
    const iconStr = useIcon
      ? `\n  icon={<HaloIcon icon={${IconComponent.name}} size={12} />}`
      : "";

    const propsStr = propsList.length > 0 ? ` ${propsList.join(" ")}` : "";

    return `import * as React from "react";
import { StatusBadge } from "@/components/ui/status-badge";${useIcon ? `\nimport { HaloIcon } from "@/components/icons/halo-icon";\nimport { ${IconComponent.name} } from "@hugeicons/core-free-icons";` : ""}

export function ServiceStatus() {
  return (
    <StatusBadge${propsStr}${iconStr}>
      ${label}
    </StatusBadge>
  );
}`;
  }, [tone, size, showDot, useIcon, label]);

  const CurrentIcon = STATUS_PRESETS[tone].icon;

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
      code={generatedCode}
      controls={
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <StageControlSelect
              label="Semantic Tone"
              value={tone}
              onChange={(val) => handleToneChange(val as StatusTone)}
              options={[
                { value: "neutral", label: "Neutral (Offline / Draft)" },
                { value: "positive", label: "Positive (Operational / Active)" },
                { value: "warning", label: "Warning (Degraded / Pending)" },
                { value: "critical", label: "Critical (Outage / Failed)" },
                { value: "info", label: "Info (Processing / Staging)" },
              ]}
            />

            <StageControlSelect
              label="Size Scale"
              value={size}
              onChange={(val) => setSize(val as StatusSize)}
              options={[
                { value: "sm", label: "Small (Compact)" },
                { value: "default", label: "Default (Standard)" },
                { value: "lg", label: "Large (Prominent)" },
              ]}
            />

            <StageControlSelect
              label="Status Content"
              value={label}
              onChange={(val) => setLabel(val)}
              options={[
                { value: "Operational", label: "Operational" },
                { value: "Degraded", label: "Degraded" },
                { value: "Outage", label: "Outage" },
                { value: "Processing", label: "Processing" },
                { value: "Offline", label: "Offline" },
                { value: "Requires attention", label: "Requires attention (Long)" },
              ]}
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-2 sm:gap-2.5">
            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[42px]">
              <Checkbox
                id="status-toggle-dot"
                checked={showDot}
                disabled={useIcon}
                onCheckedChange={(checked) => setShowDot(Boolean(checked))}
              />
              <Label
                htmlFor="status-toggle-dot"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Indicator Dot
              </Label>
            </div>

            <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[42px]">
              <Checkbox
                id="status-toggle-icon"
                checked={useIcon}
                onCheckedChange={(checked) => setUseIcon(Boolean(checked))}
              />
              <Label
                htmlFor="status-toggle-icon"
                className="text-xs sm:text-[13px] text-muted-foreground hover:text-foreground cursor-pointer font-medium select-none"
              >
                Icon Indicator
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div className="flex w-full items-center justify-center p-8">
        <StatusBadge
          tone={tone}
          size={size}
          dot={showDot}
          icon={useIcon ? <HaloIcon icon={CurrentIcon} size={size === "sm" ? 10 : size === "lg" ? 14 : 12} /> : undefined}
        >
          {label}
        </StatusBadge>
      </div>
    </PreviewStageShell>
  );
}
