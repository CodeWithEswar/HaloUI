"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const CONTAINER_WIDTH_OPTIONS = [
  { label: "240px (Strict Min)", value: "240px" },
  { label: "320px (Mobile S)", value: "320px" },
  { label: "375px (Mobile M)", value: "375px" },
  { label: "480px (Phablet)", value: "480px" },
  { label: "640px (Tablet)", value: "640px" },
  { label: "768px (Laptop)", value: "768px" },
  { label: "1024px (Desktop)", value: "1024px" },
  { label: "100% Fluid", value: "100%" },
];

export function FieldPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Component Controls
  const [orientation, setOrientation] = React.useState<"vertical" | "horizontal">("vertical");
  const [stateMode, setStateMode] = React.useState<"idle" | "invalid" | "disabled" | "readonly">("idle");
  const [requirement, setRequirement] = React.useState<"none" | "required" | "optional">("none");
  const [containerWidth, setContainerWidth] = React.useState("100%");
  const [showDescription, setShowDescription] = React.useState(true);
  const [longReflow, setLongReflow] = React.useState(false);

  // Field values
  const [inputValue, setInputValue] = React.useState("alex.developer@company.com");
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [copiedCode, setCopiedCode] = React.useState(false);

  const isInvalid = stateMode === "invalid";
  const isDisabled = stateMode === "disabled";
  const isReadOnly = stateMode === "readonly";
  const isRequired = requirement === "required";
  const isOptional = requirement === "optional";

  const labelText = orientation === "horizontal"
    ? longReflow
      ? "Real-time infrastructure security event notifications and incident telemetry dispatch"
      : "Security notifications"
    : longReflow
      ? "Primary corporate engineering and access delegation email address"
      : "Work email address";

  const descriptionText = orientation === "horizontal"
    ? longReflow
      ? "Receive automated SMS, encrypted push, and webhook notifications whenever elevated root privileges are claimed."
      : "Receive immediate alerts when new administrative sessions are initiated."
    : longReflow
      ? "Used for hardware multi-factor authentication, cryptographic key sign-offs, and critical build pipeline alerts."
      : "Used for two-factor authentication and transactional notifications.";

  const errorText = longReflow
    ? "Please supply a strictly verified enterprise domain email matching corporate DNS SPF records (e.g. user@corp.enterprise.com)."
    : "Please enter a valid work email address (e.g. user@domain.com).";

  const generatedCode = React.useMemo(() => {
    const fieldProps: string[] = [];
    if (orientation === "horizontal") fieldProps.push('orientation="horizontal"');
    if (isInvalid) fieldProps.push("invalid");
    if (isDisabled) fieldProps.push("disabled");
    if (isRequired) fieldProps.push("required");

    const fieldPropsStr = fieldProps.length > 0 ? " " + fieldProps.join(" ") : "";

    if (orientation === "horizontal") {
      return `import { Field, FieldLabel, FieldDescription, FieldContent } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export function SecuritySettingField() {
  return (
    <Field${fieldPropsStr} id="security-alerts">
      <FieldContent>
        <FieldLabel htmlFor="security-alerts"${isRequired ? " required" : ""}${isOptional ? " optional" : ""}>
          ${labelText}
        </FieldLabel>
        ${showDescription ? `<FieldDescription id="security-alerts-description">
          ${descriptionText}
        </FieldDescription>` : ""}
      </FieldContent>
      <Switch
        id="security-alerts"
        defaultChecked
        aria-describedby="security-alerts-description"
      />
    </Field>
  );
}`;
    }

    return `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function EmailField() {
  return (
    <Field${fieldPropsStr} id="email-address">
      <FieldLabel htmlFor="email-address"${isRequired ? " required" : ""}${isOptional ? " optional" : ""}>
        ${labelText}
      </FieldLabel>
      <Input
        id="email-address"
        type="email"
        placeholder="name@example.com"
        ${isInvalid ? 'aria-invalid="true"\n        ' : ""}${isDisabled ? "disabled\n        " : ""}${isReadOnly ? "readOnly\n        " : ""}${isRequired ? "required\n        " : ""}aria-describedby="${[showDescription ? "email-address-description" : "", isInvalid ? "email-address-error" : ""].filter(Boolean).join(" ")}"
      />
      ${showDescription ? `<FieldDescription id="email-address-description">
        ${descriptionText}
      </FieldDescription>` : ""}${isInvalid ? `
      <FieldError id="email-address-error">
        ${errorText}
      </FieldError>` : ""}
    </Field>
  );
}`;
  }, [orientation, isInvalid, isDisabled, isReadOnly, isRequired, isOptional, showDescription, labelText, descriptionText, errorText]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const resetStage = () => {
    setOrientation("vertical");
    setStateMode("idle");
    setRequirement("none");
    setContainerWidth("100%");
    setShowDescription(true);
    setLongReflow(false);
    setInputValue("alex.developer@company.com");
    setSwitchChecked(true);
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect label association, supporting description, invalid validation feedback, and independent keyboard focus indicators across viewports and themes."
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
          label: "Orientation",
          value: orientation.toUpperCase(),
          variant: "success",
        },
        {
          label: "Validity",
          value: isInvalid ? "INVALID (aria-invalid)" : "VALID / REST",
          variant: isInvalid ? "warning" : "success",
        },
        {
          label: "Container",
          value: containerWidth === "100%" ? "Fluid (100%)" : containerWidth,
        },
        {
          label: "Association",
          value: "htmlFor ↔ id",
          variant: "success",
        },
        {
          label: "Description",
          value: showDescription ? "aria-describedby" : "None",
        },
        {
          label: "Requirement",
          value: isRequired ? "Required (*)" : isOptional ? "Optional" : "None",
        },
        {
          label: "Focus Ring",
          value: "Independent (unclipped)",
          variant: "success",
        },
      ]}
      controls={
        <div className="w-full space-y-3">
          <div className="w-full grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Layout"
              value={orientation}
              onValueChange={(val) => setOrientation(val as "vertical" | "horizontal")}
              options={[
                { label: "Vertical (Default)", value: "vertical" },
                { label: "Horizontal (Row)", value: "horizontal" },
              ]}
            />

            <StageControlSelect
              label="State"
              value={stateMode}
              onValueChange={(val) => setStateMode(val as "idle" | "invalid" | "disabled" | "readonly")}
              options={[
                { label: "Valid / Idle", value: "idle" },
                { label: "Invalid + Focus", value: "invalid" },
                { label: "Disabled", value: "disabled" },
                { label: "Read-Only", value: "readonly" },
              ]}
            />

            <StageControlSelect
              label="Requirement"
              value={requirement}
              onValueChange={(val) => setRequirement(val as "none" | "required" | "optional")}
              options={[
                { label: "Standard (None)", value: "none" },
                { label: "Required (*)", value: "required" },
                { label: "Optional", value: "optional" },
              ]}
            />

            <StageControlSelect
              label="Container Simulation"
              value={containerWidth}
              onValueChange={setContainerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
            />
          </div>

          {/* QA Inspection Toggles */}
          <div className="flex flex-wrap items-center gap-4 pt-1 border-t border-border/40 text-xs">
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground select-none">
              <input
                type="checkbox"
                checked={showDescription}
                onChange={(e) => setShowDescription(e.target.checked)}
                className="rounded border-border text-primary focus:ring-1 focus:ring-primary"
              />
              <span>Supporting Description</span>
            </label>

            <label className="inline-flex items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground select-none">
              <input
                type="checkbox"
                checked={longReflow}
                onChange={(e) => setLongReflow(e.target.checked)}
                className="rounded border-border text-primary focus:ring-1 focus:ring-primary"
              />
              <span>Long Copy Reflow QA</span>
            </label>
          </div>
        </div>
      }
    >
      <div className="w-full flex flex-col items-center justify-center py-6 px-2 sm:px-4">
        {/* Real Container Width Simulation Wrapper */}
        <div
          style={{ width: containerWidth }}
          className="max-w-full transition-all duration-200 ease-out flex flex-col items-center justify-center gap-4"
        >
          <div className="w-full p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/55 dark:bg-neutral-950/55 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
            {orientation === "horizontal" ? (
              <Field
                orientation="horizontal"
                id="preview-field-switch"
                invalid={isInvalid}
                disabled={isDisabled}
                required={isRequired}
              >
                <FieldContent>
                  <FieldLabel
                    htmlFor="preview-field-switch"
                    required={isRequired}
                    optional={isOptional}
                  >
                    {labelText}
                  </FieldLabel>
                  {showDescription && (
                    <FieldDescription id="preview-field-switch-desc">
                      {descriptionText}
                    </FieldDescription>
                  )}
                </FieldContent>
                <Switch
                  id="preview-field-switch"
                  checked={switchChecked}
                  onCheckedChange={setSwitchChecked}
                  disabled={isDisabled}
                  aria-describedby={showDescription ? "preview-field-switch-desc" : undefined}
                />
              </Field>
            ) : (
              <Field
                orientation="vertical"
                id="preview-field-input"
                invalid={isInvalid}
                disabled={isDisabled}
                required={isRequired}
              >
                <FieldLabel
                  htmlFor="preview-field-input"
                  required={isRequired}
                  optional={isOptional}
                >
                  {labelText}
                </FieldLabel>
                <Input
                  id="preview-field-input"
                  type="email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isDisabled}
                  readOnly={isReadOnly}
                  required={isRequired}
                  aria-invalid={isInvalid ? true : undefined}
                  aria-describedby={[
                    showDescription ? "preview-field-input-desc" : "",
                    isInvalid ? "preview-field-input-error" : "",
                  ]
                    .filter(Boolean)
                    .join(" ") || undefined}
                  placeholder="developer@company.com"
                />
                {showDescription && (
                  <FieldDescription id="preview-field-input-desc">
                    {descriptionText}
                  </FieldDescription>
                )}
                {isInvalid && (
                  <FieldError id="preview-field-input-error">
                    {errorText}
                  </FieldError>
                )}
              </Field>
            )}
          </div>

          {/* State metadata readout */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-mono text-muted-foreground/80 text-center max-w-full px-2">
            <span>orientation="{orientation}"</span>
            <span>·</span>
            <span>state="{stateMode}"</span>
            <span>·</span>
            <span>container="{containerWidth}"</span>
            {isInvalid && (
              <>
                <span>·</span>
                <span className="text-destructive font-medium">aria-invalid="true"</span>
              </>
            )}
            {isRequired && (
              <>
                <span>·</span>
                <span className="text-amber-500 font-medium">required</span>
              </>
            )}
            {isDisabled && (
              <>
                <span>·</span>
                <span className="text-muted-foreground font-medium">disabled</span>
              </>
            )}
            {isReadOnly && (
              <>
                <span>·</span>
                <span className="text-sky-500 font-medium">readOnly</span>
              </>
            )}
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
