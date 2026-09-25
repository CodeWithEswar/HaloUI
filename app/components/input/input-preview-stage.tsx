"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function InputPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [inputType, setInputType] = React.useState<"text" | "email" | "password" | "search">("email");
  const [stateMode, setStateMode] = React.useState<"idle" | "invalid" | "disabled" | "readonly">("idle");
  const [composition, setComposition] = React.useState<"with-field" | "standalone">("with-field");

  // Input value
  const [value, setValue] = React.useState("alex.morgan@company.com");
  const [copiedCode, setCopiedCode] = React.useState(false);

  const isInvalid = stateMode === "invalid";
  const isDisabled = stateMode === "disabled";
  const isReadOnly = stateMode === "readonly";

  const generatedCode = React.useMemo(() => {
    const inputProps: string[] = [];
    if (inputType !== "text") inputProps.push(`type="${inputType}"`);
    if (isInvalid) inputProps.push('aria-invalid="true"');
    if (isDisabled) inputProps.push("disabled");
    if (isReadOnly) inputProps.push("readOnly");

    const inputPropsStr = inputProps.length > 0 ? " " + inputProps.join(" ") : "";

    if (composition === "standalone") {
      return `import { Input } from "@/components/ui/input";

export function StandaloneInputDemo() {
  return (
    <Input${inputPropsStr}
      placeholder="${inputType === "email" ? "name@company.com" : "Enter text..."}"
      defaultValue="${isInvalid ? "invalid-value" : value}"
    />
  );
}`;
    }

    return `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ContactField() {
  return (
    <Field id="contact-field"${isInvalid ? " invalid" : ""}>
      <FieldLabel htmlFor="contact-field"${isInvalid ? " required" : ""}>
        ${inputType === "email" ? "Email address" : inputType === "password" ? "Account password" : "User identifier"}
      </FieldLabel>
      <Input${inputPropsStr}
        id="contact-field"
        placeholder="${inputType === "email" ? "name@company.com" : "Enter text..."}"
        defaultValue="${isInvalid ? "invalid-value" : value}"
        aria-describedby="${isInvalid ? "contact-field-error" : "contact-field-desc"}"
      />
      ${isInvalid ? `<FieldError id="contact-field-error">
        Please provide a valid ${inputType} format.
      </FieldError>` : `<FieldDescription id="contact-field-desc">
        Primary communication contact for workspace alerts.
      </FieldDescription>`}
    </Field>
  );
}`;
  }, [inputType, stateMode, composition, value, isInvalid, isDisabled, isReadOnly]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const resetStage = () => {
    setInputType("email");
    setStateMode("idle");
    setComposition("with-field");
    setValue("alex.morgan@company.com");
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect single-line native input ergonomics, restrained liquid glass optical substrate, dual-indicator invalid state, and independent focus ring visibility."
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
          value: "<input> (Native)",
          variant: "success",
        },
        {
          label: "Surface",
          value: "Subtle Liquid Glass",
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
        <div className="w-full grid grid-cols-1 min-[420px]:grid-cols-3 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Input Type"
            value={inputType}
            onValueChange={(val) => setInputType(val as any)}
            options={[
              { label: "Email", value: "email" },
              { label: "Text", value: "text" },
              { label: "Password", value: "password" },
              { label: "Search", value: "search" },
            ]}
          />

          <StageControlSelect
            label="Interaction State"
            value={stateMode}
            onValueChange={(val) => setStateMode(val as any)}
            options={[
              { label: "Valid / Rest", value: "idle" },
              { label: "Invalid + Focus", value: "invalid" },
              { label: "Disabled", value: "disabled" },
              { label: "Read-Only", value: "readonly" },
            ]}
          />

          <StageControlSelect
            label="Composition"
            value={composition}
            onValueChange={(val) => setComposition(val as any)}
            options={[
              { label: "With Field (Canonical)", value: "with-field" },
              { label: "Standalone", value: "standalone" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/55 dark:bg-neutral-950/55 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          {composition === "standalone" ? (
            <Input
              type={inputType}
              disabled={isDisabled}
              readOnly={isReadOnly}
              aria-invalid={isInvalid ? "true" : undefined}
              value={isInvalid ? "invalid-format" : value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={inputType === "email" ? "name@company.com" : "Enter text..."}
            />
          ) : (
            <Field id="stage-input-field" invalid={isInvalid} disabled={isDisabled}>
              <FieldLabel htmlFor="stage-input-field" required={isInvalid}>
                {inputType === "email"
                  ? "Email address"
                  : inputType === "password"
                  ? "Account password"
                  : "User identifier"}
              </FieldLabel>
              <Input
                id="stage-input-field"
                type={inputType}
                disabled={isDisabled}
                readOnly={isReadOnly}
                aria-invalid={isInvalid ? "true" : undefined}
                value={isInvalid ? "alex.invalid-domain" : value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={inputType === "email" ? "name@company.com" : "Enter text..."}
                aria-describedby={isInvalid ? "stage-input-err" : "stage-input-desc"}
              />
              {isInvalid ? (
                <FieldError id="stage-input-err">
                  Please provide a valid {inputType} format.
                </FieldError>
              ) : (
                <FieldDescription id="stage-input-desc">
                  Primary communication contact for workspace alerts.
                </FieldDescription>
              )}
            </Field>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
