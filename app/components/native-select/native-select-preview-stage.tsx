"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function NativeSelectPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [stateMode, setStateMode] = React.useState<"idle" | "prompt" | "invalid" | "disabled">("idle");
  const [structure, setStructure] = React.useState<"standard" | "grouped">("standard");
  const [selectedValue, setSelectedValue] = React.useState("in");
  const [copiedCode, setCopiedCode] = React.useState(false);

  const isInvalid = stateMode === "invalid";
  const isDisabled = stateMode === "disabled";
  const isPrompt = stateMode === "prompt";

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? ' aria-invalid="true"' : "";
    const disabledAttr = isDisabled ? " disabled" : "";

    if (structure === "grouped") {
      return `import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { NativeSelect } from "@/components/ui/native-select";

export function ClusterRegionField() {
  return (
    <Field id="region-field"${isInvalid ? " invalid" : ""}>
      <FieldLabel htmlFor="region-select"${isInvalid ? " required" : ""}>Compute Region</FieldLabel>
      <NativeSelect id="region-select" defaultValue="ap-south-1"${invalidAttr}${disabledAttr}>
        <optgroup label="Asia Pacific">
          <option value="ap-south-1">Mumbai (ap-south-1)</option>
          <option value="ap-northeast-1">Tokyo (ap-northeast-1)</option>
        </optgroup>
        <optgroup label="Europe">
          <option value="eu-central-1">Frankfurt (eu-central-1)</option>
          <option value="eu-west-1">Ireland (eu-west-1)</option>
        </optgroup>
      </NativeSelect>
      <FieldDescription>Native optgroup tags organize regional datacenter clusters.</FieldDescription>
    </Field>
  );
}`;
    }

    return `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { NativeSelect } from "@/components/ui/native-select";

export function CountrySelector() {
  return (
    <Field id="country-field"${isInvalid ? " invalid" : ""}>
      <FieldLabel htmlFor="country-select"${isInvalid ? " required" : ""}>Country of incorporation</FieldLabel>
      <NativeSelect id="country-select" defaultValue="${isPrompt || isInvalid ? "" : selectedValue}"${invalidAttr}${disabledAttr}>
        <option value="" disabled>Select country...</option>
        <option value="in">India</option>
        <option value="jp">Japan</option>
        <option value="de">Germany</option>
        <option value="br">Brazil</option>
        <option value="us">United States</option>
      </NativeSelect>
      ${
        isInvalid
          ? `<FieldError id="country-error">Please select a valid operational jurisdiction.</FieldError>`
          : `<FieldDescription id="country-desc">Platform invokes OS-level pickers for authentic native interaction.</FieldDescription>`
      }
    </Field>
  );
}`;
  }, [stateMode, structure, selectedValue, isInvalid, isDisabled, isPrompt]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const resetStage = () => {
    setStateMode("idle");
    setStructure("standard");
    setSelectedValue("in");
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect closed-control optical liquid glass presentation, native OS/browser picker delegation, decorative chevron alignment, and independent Halo Focus Ring."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      onReset={resetStage}
      onCopy={copyCodeToClipboard}
      copied={copiedCode}
      telemetry={[
        {
          label: "HTML Tag",
          value: "<select> (Native)",
          variant: "success",
        },
        {
          label: "Popup System",
          value: "Browser / OS Picker",
          variant: "success",
        },
        {
          label: "Focus Ring",
          value: "Halo Double-Contrast",
          variant: "success",
        },
        {
          label: "Runtime",
          value: "0ms (Server Component)",
        },
      ]}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Interaction State"
            value={stateMode}
            onValueChange={(val) => setStateMode(val as any)}
            options={[
              { label: "Valid / Selected", value: "idle" },
              { label: "Unselected Prompt", value: "prompt" },
              { label: "Invalid State", value: "invalid" },
              { label: "Disabled", value: "disabled" },
            ]}
          />

          <StageControlSelect
            label="Option Structure"
            value={structure}
            onValueChange={(val) => setStructure(val as any)}
            options={[
              { label: "Standard Options", value: "standard" },
              { label: "Grouped (<optgroup>)", value: "grouped" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/55 dark:bg-neutral-950/55 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-select-field" invalid={isInvalid} disabled={isDisabled}>
            <FieldLabel htmlFor="stage-select-control" required={isInvalid}>
              {structure === "grouped" ? "Primary compute cluster" : "Country of incorporation"}
            </FieldLabel>

            {structure === "grouped" ? (
              <NativeSelect
                id="stage-select-control"
                disabled={isDisabled}
                aria-invalid={isInvalid ? "true" : undefined}
                defaultValue="ap-south-1"
                aria-describedby={isInvalid ? "stage-ns-err" : "stage-ns-desc"}
              >
                <optgroup label="Asia Pacific">
                  <option value="ap-south-1">Mumbai (ap-south-1)</option>
                  <option value="ap-northeast-1">Tokyo (ap-northeast-1)</option>
                  <option value="ap-southeast-1">Singapore (ap-southeast-1)</option>
                </optgroup>
                <optgroup label="Europe">
                  <option value="eu-central-1">Frankfurt (eu-central-1)</option>
                  <option value="eu-west-1">Ireland (eu-west-1)</option>
                </optgroup>
              </NativeSelect>
            ) : (
              <NativeSelect
                id="stage-select-control"
                disabled={isDisabled}
                aria-invalid={isInvalid ? "true" : undefined}
                value={isPrompt || isInvalid ? "" : selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                aria-describedby={isInvalid ? "stage-ns-err" : "stage-ns-desc"}
              >
                <option value="" disabled>
                  Select country...
                </option>
                <option value="in">India</option>
                <option value="jp">Japan</option>
                <option value="de">Germany</option>
                <option value="br">Brazil</option>
                <option value="us">United States</option>
              </NativeSelect>
            )}

            {isInvalid ? (
              <FieldError id="stage-ns-err">
                Please select a valid operational jurisdiction.
              </FieldError>
            ) : (
              <FieldDescription id="stage-ns-desc">
                Platform delegates to OS-level pickers for authentic native interaction.
              </FieldDescription>
            )}
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
