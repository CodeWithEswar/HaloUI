"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";

export function SwitchPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [stateMode, setStateMode] = React.useState<
    "off" | "on" | "disabled-off" | "disabled-on"
  >("on");
  const [size, setSize] = React.useState<"default" | "sm">("default");
  const [withDescription, setWithDescription] = React.useState<"yes" | "no">("yes");

  // Interactive local switch state
  const [checked, setChecked] = React.useState<boolean>(true);

  // Sync state when stateMode changes
  React.useEffect(() => {
    if (stateMode === "off") setChecked(false);
    if (stateMode === "on") setChecked(true);
    if (stateMode === "disabled-off") setChecked(false);
    if (stateMode === "disabled-on") setChecked(true);
  }, [stateMode]);

  const isDisabled = stateMode === "disabled-off" || stateMode === "disabled-on";

  const generatedCode = React.useMemo(() => {
    const disabledAttr = isDisabled ? " disabled" : "";
    const sizeAttr = size === "sm" ? ' size="sm"' : "";
    const checkedAttr = checked ? " checked={true}" : " checked={false}";

    return `import { Switch } from "@/components/ui/switch";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

export function SwitchDemo() {
  const [enabled, setEnabled] = React.useState(${checked ? "true" : "false"});

  return (
    <Field id="autosave-field">
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border/80 bg-card/60 shadow-2xs">
        <div className="grid gap-1">
          <FieldLabel htmlFor="autosave-switch" className="text-sm font-medium cursor-pointer">
            Auto-save
          </FieldLabel>
          ${
            withDescription === "yes"
              ? `<FieldDescription className="text-xs text-muted-foreground">
            Save changes automatically while editing.
          </FieldDescription>`
              : ""
          }
        </div>
        <Switch
          id="autosave-switch"${sizeAttr}${checkedAttr}
          onCheckedChange={setEnabled}${disabledAttr}
        />
      </div>
    </Field>
  );
}`;
  }, [checked, isDisabled, size, withDescription]);

  return (
    <PreviewStageShell
      title="Switch Interactive Stage"
      description="Evaluate binary on/off states, optical liquid glass track, tactile thumb transitions, and settings-row integration."
      badge="Immediate Setting Primitive"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="State Mode"
            value={stateMode}
            onValueChange={(val) => setStateMode(val as typeof stateMode)}
            options={[
              { value: "on", label: "On (Active)" },
              { value: "off", label: "Off (Idle)" },
              { value: "disabled-on", label: "Disabled (On)" },
              { value: "disabled-off", label: "Disabled (Off)" },
            ]}
          />

          <StageControlSelect
            label="Size Variant"
            value={size}
            onValueChange={(val) => setSize(val as typeof size)}
            options={[
              { value: "default", label: "Default (44×24px)" },
              { value: "sm", label: "Small (32×18px)" },
            ]}
          />

          <StageControlSelect
            label="Description"
            value={withDescription}
            onValueChange={(val) => setWithDescription(val as typeof withDescription)}
            options={[
              { value: "yes", label: "Show Description" },
              { value: "no", label: "Hide Description" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Current State",
          value: checked ? "On (true)" : "Off (false)",
          variant: checked ? "success" : "default",
        },
        {
          label: "Size Mode",
          value: size === "sm" ? "Small (18px)" : "Default (24px)",
        },
        {
          label: "Semantics",
          value: 'role="switch"',
          variant: "success",
        },
        {
          label: "Keyboard Model",
          value: "Space to toggle",
        },
      ]}
    >
      <div className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-6 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-switch-field" disabled={isDisabled}>
            <div className="flex items-center justify-between gap-4">
              <div className="grid gap-1 min-w-0 pr-2">
                <FieldLabel
                  htmlFor="stage-switch-control"
                  className="text-sm font-semibold tracking-tight text-foreground cursor-pointer select-none"
                >
                  Auto-save
                </FieldLabel>
                {withDescription === "yes" && (
                  <FieldDescription className="text-xs text-muted-foreground select-none leading-relaxed">
                    Save changes automatically while editing.
                  </FieldDescription>
                )}
              </div>
              <Switch
                id="stage-switch-control"
                size={size}
                checked={checked}
                onCheckedChange={setChecked}
                disabled={isDisabled}
              />
            </div>
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
