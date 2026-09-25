"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

export function LabelPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [controlType, setControlType] = React.useState<"input" | "checkbox" | "switch">("input");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isLongText, setIsLongText] = React.useState(false);

  // Values
  const [inputValue, setInputValue] = React.useState("alex.morgan@company.com");
  const [checkboxChecked, setCheckboxChecked] = React.useState(true);
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState(false);

  const labelText = isLongText
    ? "I understand that cryptographic keys generated for this account are irreversible and acknowledge the security protocol."
    : controlType === "input"
    ? "Email address"
    : controlType === "checkbox"
    ? "Subscribe to weekly security advisories"
    : "Two-factor authentication";

  const generatedCode = React.useMemo(() => {
    if (controlType === "checkbox") {
      return `import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function TermsCheckbox() {
  return (
    <div className="flex items-start gap-3">
      <Checkbox id="terms-advisory"${isDisabled ? " disabled" : ""} defaultChecked />
      <Label htmlFor="terms-advisory" className="cursor-pointer">
        ${labelText}
      </Label>
    </div>
  );
}`;
    }

    if (controlType === "switch") {
      return `import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function TwoFactorSwitch() {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor="two-factor-toggle" className="cursor-pointer">
        ${labelText}
      </Label>
      <Switch id="two-factor-toggle"${isDisabled ? " disabled" : ""} />
    </div>
  );
}`;
    }

    return `import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ContactEmail() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email-address">
        ${labelText}
      </Label>
      <Input
        id="email-address"
        type="email"
        placeholder="name@company.com"
        ${isDisabled ? "disabled\n        " : ""}defaultValue="${inputValue}"
      />
    </div>
  );
}`;
  }, [controlType, isDisabled, isLongText, labelText, inputValue]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const resetStage = () => {
    setControlType("input");
    setIsDisabled(false);
    setIsLongText(false);
    setInputValue("alex.morgan@company.com");
    setCheckboxChecked(true);
    setSwitchChecked(false);
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect programmatic htmlFor association, click-to-focus behavior, and peer-disabled styling across controls and viewports."
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
          value: "<label> (Native)",
          variant: "success",
        },
        {
          label: "Association",
          value: "htmlFor ↔ id",
          variant: "success",
        },
        {
          label: "Tab Stop",
          value: "None (Control Owns)",
          variant: "success",
        },
        {
          label: "Runtime",
          value: "0ms (Server Component)",
        },
      ]}
      controls={
        <div className="w-full grid grid-cols-1 min-[420px]:grid-cols-3 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Associated Control"
            value={controlType}
            onValueChange={(val) => setControlType(val as "input" | "checkbox" | "switch")}
            options={[
              { label: "Text Input", value: "input" },
              { label: "Checkbox", value: "checkbox" },
              { label: "Switch", value: "switch" },
            ]}
          />

          <StageControlSelect
            label="Control State"
            value={isDisabled ? "disabled" : "enabled"}
            onValueChange={(val) => setIsDisabled(val === "disabled")}
            options={[
              { label: "Enabled", value: "enabled" },
              { label: "Disabled", value: "disabled" },
            ]}
          />

          <StageControlSelect
            label="Label Length"
            value={isLongText ? "long" : "standard"}
            onValueChange={(val) => setIsLongText(val === "long")}
            options={[
              { label: "Standard Length", value: "standard" },
              { label: "Long (Wrapping)", value: "long" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/55 dark:bg-neutral-950/55 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          {controlType === "input" && (
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="stage-input-control"
                className="cursor-pointer text-sm font-medium leading-none"
              >
                {labelText}
              </Label>
              <Input
                id="stage-input-control"
                type="email"
                disabled={isDisabled}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="name@company.com"
              />
            </div>
          )}

          {controlType === "checkbox" && (
            <div className="flex items-start gap-3">
              <Checkbox
                id="stage-checkbox-control"
                disabled={isDisabled}
                checked={checkboxChecked}
                onCheckedChange={(checked) => setCheckboxChecked(!!checked)}
                className="mt-0.5"
              />
              <Label
                htmlFor="stage-checkbox-control"
                className="cursor-pointer text-sm font-medium leading-snug"
              >
                {labelText}
              </Label>
            </div>
          )}

          {controlType === "switch" && (
            <div className="flex items-center justify-between gap-4">
              <Label
                htmlFor="stage-switch-control"
                className="cursor-pointer text-sm font-medium leading-snug"
              >
                {labelText}
              </Label>
              <Switch
                id="stage-switch-control"
                disabled={isDisabled}
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
              />
            </div>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
