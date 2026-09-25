"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function CheckboxPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [stateMode, setStateMode] = React.useState<
    "unchecked" | "checked" | "indeterminate" | "invalid" | "disabled"
  >("checked");
  const [withDescription, setWithDescription] = React.useState<"yes" | "no">("yes");

  // Interactive local checkbox state
  const [checked, setChecked] = React.useState<boolean | "indeterminate">(true);

  // Sync state when stateMode changes
  React.useEffect(() => {
    if (stateMode === "unchecked") setChecked(false);
    if (stateMode === "checked") setChecked(true);
    if (stateMode === "indeterminate") setChecked("indeterminate");
    if (stateMode === "invalid") setChecked(false);
  }, [stateMode]);

  const isInvalid = stateMode === "invalid";
  const isDisabled = stateMode === "disabled";

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? ' invalid aria-invalid="true"' : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const isIndet = checked === "indeterminate";
    const checkedAttr = isIndet
      ? ' checked="indeterminate"'
      : checked
      ? " checked={true}"
      : " checked={false}";

    return `import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";

export function CheckboxDemo() {
  const [checked, setChecked] = React.useState<boolean | "indeterminate">(${
    isIndet ? '"indeterminate"' : checked ? "true" : "false"
  });

  return (
    <Field id="notification-pref"${invalidAttr}>
      <div className="flex items-start gap-3">
        <Checkbox
          id="security-alerts"${checkedAttr}
          onCheckedChange={setChecked}${disabledAttr}${invalidAttr}
          className="mt-0.5"
        />
        <div className="grid gap-1.5 leading-none">
          <FieldLabel htmlFor="security-alerts"${isInvalid ? " required" : ""} className="cursor-pointer">
            Critical security alerts
          </FieldLabel>
          ${
            isInvalid
              ? `<FieldError>Acceptance of critical security alerts is required.</FieldError>`
              : withDescription === "yes"
              ? `<FieldDescription>
            Receive notifications regarding authentication attempts and key rotations.
          </FieldDescription>`
              : ""
          }
        </div>
      </div>
    </Field>
  );
}`;
  }, [checked, isInvalid, isDisabled, withDescription]);

  return (
    <PreviewStageShell
      title="Checkbox Interactive Stage"
      description="Evaluate boolean selection across unchecked, checked, and indeterminate states with optical liquid glass boundaries."
      badge="Optical Liquid Material"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="State Preset"
            value={stateMode}
            onValueChange={(val) => setStateMode(val as typeof stateMode)}
            options={[
              { value: "checked", label: "Checked (True)" },
              { value: "unchecked", label: "Unchecked (False)" },
              { value: "indeterminate", label: "Indeterminate (Mixed)" },
              { value: "invalid", label: "Invalid (Dual Indicator)" },
              { value: "disabled", label: "Disabled (Locked)" },
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
          label: "State",
          value:
            checked === "indeterminate"
              ? "Indeterminate"
              : checked
              ? "Checked"
              : "Unchecked",
          variant: "success",
        },
        {
          label: "Value",
          value:
            checked === "indeterminate"
              ? '"indeterminate"'
              : checked
              ? "true"
              : "false",
          variant: "success",
        },
        {
          label: "Status",
          value: isInvalid
            ? "Invalid"
            : isDisabled
            ? "Disabled"
            : "Interactive",
          variant: isInvalid ? "warning" : "default",
        },
        {
          label: "A11y",
          value: "WAI-ARIA Checkbox",
          variant: "success",
        },
      ]}
      code={generatedCode}
    >
      <div className="w-full max-w-sm mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-check-field" invalid={isInvalid} disabled={isDisabled}>
            <div className="flex items-start gap-3">
              <Checkbox
                id="stage-checkbox-control"
                checked={checked}
                onCheckedChange={(val) => {
                  setChecked(val);
                  if (stateMode === "invalid" && val === true) {
                    setStateMode("checked");
                  }
                }}
                invalid={isInvalid}
                disabled={isDisabled}
                className="mt-0.5"
              />
              <div className="grid gap-1.5 leading-none">
                <FieldLabel
                  htmlFor="stage-checkbox-control"
                  required={isInvalid}
                  className="cursor-pointer text-sm font-medium text-foreground select-none"
                >
                  Critical security alerts
                </FieldLabel>
                {isInvalid ? (
                  <FieldError id="stage-check-err">
                    Acceptance of critical security alerts is required for production projects.
                  </FieldError>
                ) : withDescription === "yes" ? (
                  <FieldDescription id="stage-check-desc">
                    Receive immediate alerts regarding authentication anomalies and key rotations.
                  </FieldDescription>
                ) : null}
              </div>
            </div>
          </Field>
        </div>
      </div>

    </PreviewStageShell>
  );
}
