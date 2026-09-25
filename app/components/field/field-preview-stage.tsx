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

export function FieldPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Component Controls
  const [orientation, setOrientation] = React.useState<"vertical" | "horizontal">("vertical");
  const [stateMode, setStateMode] = React.useState<"idle" | "invalid" | "disabled" | "readonly">("idle");
  const [requirement, setRequirement] = React.useState<"none" | "required" | "optional">("none");
  const [showDescription, setShowDescription] = React.useState(true);

  // Field values
  const [inputValue, setInputValue] = React.useState("alex.developer@company.com");
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [copiedCode, setCopiedCode] = React.useState(false);

  const isInvalid = stateMode === "invalid";
  const isDisabled = stateMode === "disabled";
  const isReadOnly = stateMode === "readonly";
  const isRequired = requirement === "required";
  const isOptional = requirement === "optional";

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
          Security event notifications
        </FieldLabel>
        ${showDescription ? `<FieldDescription id="security-alerts-description">
          Receive real-time alerts when new tokens are minted or revoked.
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
        Email address
      </FieldLabel>
      <Input
        id="email-address"
        type="email"
        placeholder="name@example.com"
        ${isInvalid ? 'aria-invalid="true"\n        ' : ""}${isDisabled ? "disabled\n        " : ""}${isReadOnly ? "readOnly\n        " : ""}${isRequired ? "required\n        " : ""}aria-describedby="${[showDescription ? "email-address-description" : "", isInvalid ? "email-address-error" : ""].filter(Boolean).join(" ")}"
      />
      ${showDescription ? `<FieldDescription id="email-address-description">
        We use this address for critical workspace security notifications.
      </FieldDescription>` : ""}${isInvalid ? `
      <FieldError id="email-address-error">
        Please enter a valid work email address.
      </FieldError>` : ""}
    </Field>
  );
}`;
  }, [orientation, isInvalid, isDisabled, isReadOnly, isRequired, isOptional, showDescription]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const resetStage = () => {
    setOrientation("vertical");
    setStateMode("idle");
    setRequirement("none");
    setShowDescription(true);
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
      ]}
      controls={
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
            label="Description"
            value={showDescription ? "shown" : "hidden"}
            onValueChange={(val) => setShowDescription(val === "shown")}
            options={[
              { label: "With Description", value: "shown" },
              { label: "No Description", value: "hidden" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/55 dark:bg-neutral-950/55 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
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
                  Security notifications
                </FieldLabel>
                {showDescription && (
                  <FieldDescription id="preview-field-switch-desc">
                    Receive immediate alerts when new administrative sessions are initiated.
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
                Work email address
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
                  Used for two-factor authentication and transactional notifications.
                </FieldDescription>
              )}
              {isInvalid && (
                <FieldError id="preview-field-input-error">
                  Please enter a valid work email address (e.g. user@domain.com).
                </FieldError>
              )}
            </Field>
          )}
        </div>

        {/* State metadata readout */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-mono text-muted-foreground/80 text-center max-w-full px-2">
          <span>orientation="{orientation}"</span>
          <span>·</span>
          <span>state="{stateMode}"</span>
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
    </PreviewStageShell>
  );
}
