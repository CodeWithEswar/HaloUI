"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupDescription,
  CheckboxGroupItem,
} from "@/components/ui/checkbox-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Field, FieldError } from "@/components/ui/field";

export function CheckboxGroupPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [stateMode, setStateMode] = React.useState<
    "multiple" | "single" | "none" | "invalid" | "disabled"
  >("multiple");
  const [orientation, setOrientation] = React.useState<"vertical" | "horizontal">("vertical");

  // Selection state
  const [selected, setSelected] = React.useState<string[]>(["email", "push"]);

  // Sync state preset
  React.useEffect(() => {
    if (stateMode === "multiple") setSelected(["email", "push"]);
    if (stateMode === "single") setSelected(["email"]);
    if (stateMode === "none") setSelected([]);
    if (stateMode === "invalid") setSelected([]);
  }, [stateMode]);

  const isInvalid = stateMode === "invalid";
  const isDisabled = stateMode === "disabled";

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? ' invalid aria-invalid="true"' : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const orientAttr = orientation === "horizontal" ? ' orientation="horizontal"' : "";

    return `import {
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupDescription,
  CheckboxGroupItem,
} from "@/components/ui/checkbox-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Field, FieldError } from "@/components/ui/field";

export function NotificationPreferences() {
  const [selected, setSelected] = React.useState<string[]>([${selected.map((s) => `"${s}"`).join(", ")}]);

  return (
    <Field id="notifications-field"${invalidAttr}>
      <CheckboxGroup
        value={selected}
        onValueChange={setSelected}${orientAttr}${disabledAttr}${invalidAttr}
      >
        <CheckboxGroupLabel${isInvalid ? " required" : ""}>Notification channels</CheckboxGroupLabel>
        <CheckboxGroupDescription>
          Choose where you want to receive critical deployment notices.
        </CheckboxGroupDescription>

        <CheckboxGroupItem>
          <Checkbox value="email" id="stage-email" />
          <Label htmlFor="stage-email" className="cursor-pointer">Email alerts</Label>
        </CheckboxGroupItem>

        <CheckboxGroupItem>
          <Checkbox value="sms" id="stage-sms" />
          <Label htmlFor="stage-sms" className="cursor-pointer">SMS escalation</Label>
        </CheckboxGroupItem>

        <CheckboxGroupItem>
          <Checkbox value="push" id="stage-push" />
          <Label htmlFor="stage-push" className="cursor-pointer">Push notifications</Label>
        </CheckboxGroupItem>
      </CheckboxGroup>
      ${
        isInvalid
          ? `
      <FieldError className="mt-3">
        Please select at least one notification delivery channel.
      </FieldError>`
          : ""
      }
    </Field>
  );
}`;
  }, [selected, isInvalid, isDisabled, orientation]);

  return (
    <PreviewStageShell
      title="Checkbox Group Interactive Stage"
      description="Test semantic collection grouping, independent multi-selection, orientation rhythm, and group-level validation."
      badge="Semantic Collection"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      controls={
        <>
          <StageControlSelect
            label="State Preset"
            value={stateMode}
            onValueChange={(val) => setStateMode(val as typeof stateMode)}
            options={[
              { value: "multiple", label: "Multiple Selected" },
              { value: "single", label: "Single Selected" },
              { value: "none", label: "None Selected" },
              { value: "invalid", label: "Invalid (Group Error)" },
              { value: "disabled", label: "Disabled (Locked)" },
            ]}
          />

          <StageControlSelect
            label="Orientation"
            value={orientation}
            onValueChange={(val) => setOrientation(val as typeof orientation)}
            options={[
              { value: "vertical", label: "Vertical (Stack)" },
              { value: "horizontal", label: "Horizontal (Inline)" },
            ]}
          />
        </>
      }
      telemetry={[
        {
          label: "Selected",
          value: `${selected.length} items`,
          variant: "success",
        },
        {
          label: "Values",
          value: selected.length > 0 ? `[${selected.map((s) => `"${s}"`).join(", ")}]` : "[]",
          variant: "success",
        },
        {
          label: "Layout",
          value: orientation === "vertical" ? "Vertical Stack" : "Horizontal Wrap",
          variant: "default",
        },
        {
          label: "A11y",
          value: "<fieldset> + role='group'",
          variant: "success",
        },
      ]}
      code={generatedCode}
    >
      <div className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-cbgroup-field" invalid={isInvalid} disabled={isDisabled}>
            <CheckboxGroup
              value={selected}
              onValueChange={(nextVals) => {
                setSelected(nextVals);
                if (stateMode === "invalid" && nextVals.length > 0) {
                  setStateMode("multiple");
                }
              }}
              orientation={orientation}
              disabled={isDisabled}
              invalid={isInvalid}
            >
              <CheckboxGroupLabel required={isInvalid}>Notification channels</CheckboxGroupLabel>
              <CheckboxGroupDescription>
                Choose where you want to receive critical deployment notices.
              </CheckboxGroupDescription>

              <CheckboxGroupItem>
                <Checkbox value="email" id="stage-opt-email" className="mt-0.5" />
                <div className="grid gap-1 leading-none">
                  <Label htmlFor="stage-opt-email" className="text-sm font-medium text-foreground cursor-pointer select-none">
                    Email delivery
                  </Label>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    Daily digests and release updates sent to your primary address.
                  </span>
                </div>
              </CheckboxGroupItem>

              <CheckboxGroupItem>
                <Checkbox value="sms" id="stage-opt-sms" className="mt-0.5" />
                <div className="grid gap-1 leading-none">
                  <Label htmlFor="stage-opt-sms" className="text-sm font-medium text-foreground cursor-pointer select-none">
                    SMS alerts
                  </Label>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    Immediate SMS texts for authentication anomalies.
                  </span>
                </div>
              </CheckboxGroupItem>

              <CheckboxGroupItem>
                <Checkbox value="push" id="stage-opt-push" className="mt-0.5" />
                <div className="grid gap-1 leading-none">
                  <Label htmlFor="stage-opt-push" className="text-sm font-medium text-foreground cursor-pointer select-none">
                    Push notifications
                  </Label>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    Desktop banners and mobile notifications.
                  </span>
                </div>
              </CheckboxGroupItem>
            </CheckboxGroup>

            {isInvalid && (
              <FieldError className="mt-3">
                Please choose at least one notification delivery channel to continue.
              </FieldError>
            )}
          </Field>
        </div>
      </div>

    </PreviewStageShell>
  );
}
