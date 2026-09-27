"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";

export function BadgePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  const [variant, setVariant] = React.useState<
    "default" | "secondary" | "destructive" | "outline" | "ghost"
  >("default");
  const [label, setLabel] = React.useState("Beta");

  const handleReset = () => {
    setVariant("default");
    setLabel("Beta");
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
      label: "Runtime JS",
      value: "0 KB",
      variant: "success",
    },
  ];

  const generatedCode = React.useMemo(() => {
    const variantProp = variant !== "default" ? ` variant="${variant}"` : "";
    return `import { Badge } from "@/components/ui/badge";

export function Example() {
  return <Badge${variantProp}>${label}</Badge>;
}`;
  }, [variant, label]);

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
        <div className="grid grid-cols-2 gap-3">
          <StageControlSelect
            label="Variant"
            value={variant}
            onChange={(val) =>
              setVariant(
                val as "default" | "secondary" | "destructive" | "outline" | "ghost"
              )
            }
            options={[
              { value: "default", label: "Default (Primary)" },
              { value: "secondary", label: "Secondary (Muted)" },
              { value: "outline", label: "Outline (Border)" },
              { value: "destructive", label: "Destructive" },
              { value: "ghost", label: "Ghost" },
            ]}
          />

          <StageControlSelect
            label="Content"
            value={label}
            onChange={(val) => setLabel(val)}
            options={[
              { value: "Beta", label: "Beta" },
              { value: "New", label: "New" },
              { value: "v2.4.0", label: "v2.4.0" },
              { value: "Pro", label: "Pro" },
              { value: "12", label: "12 (Count)" },
              { value: "0", label: "0 (Zero Count)" },
            ]}
          />
        </div>
      }
    >
      <div className="flex w-full items-center justify-center p-8">
        <Badge variant={variant}>{label}</Badge>
      </div>
    </PreviewStageShell>
  );
}
