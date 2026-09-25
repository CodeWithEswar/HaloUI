"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function TextareaPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [stateMode, setStateMode] = React.useState<"idle" | "invalid" | "disabled" | "readonly">("idle");
  const [resizeMode, setResizeMode] = React.useState<"vertical" | "none" | "both">("vertical");
  const [rows, setRows] = React.useState<"3" | "4" | "6">("4");
  const [value, setValue] = React.useState(
    "The new optical liquid glass treatment provides luminous surface depth across enterprise forms."
  );
  const [copiedCode, setCopiedCode] = React.useState(false);

  const isInvalid = stateMode === "invalid";
  const isDisabled = stateMode === "disabled";
  const isReadOnly = stateMode === "readonly";

  const generatedCode = React.useMemo(() => {
    const props: string[] = [];
    if (resizeMode !== "vertical") props.push(`resize="${resizeMode}"`);
    if (rows !== "4") props.push(`rows={${rows}}`);
    if (isInvalid) props.push('aria-invalid="true"');
    if (isDisabled) props.push("disabled");
    if (isReadOnly) props.push("readOnly");

    const propsStr = props.length > 0 ? " " + props.join(" ") : "";

    return `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export function ProjectDescriptionField() {
  return (
    <Field id="project-desc"${isInvalid ? " invalid" : ""}>
      <FieldLabel htmlFor="project-desc"${isInvalid ? " required" : ""}>
        Project specification
      </FieldLabel>
      <Textarea
        id="project-desc"${propsStr}
        placeholder="Provide architectural requirements and technical scope..."
        defaultValue="${isInvalid ? "Missing scope." : value}"
        aria-describedby="${isInvalid ? "project-desc-error" : "project-desc-help"}"
      />
      ${
        isInvalid
          ? `<FieldError id="project-desc-error">
        Specification must be at least 30 characters in length.
      </FieldError>`
          : `<FieldDescription id="project-desc-help">
        Outlines deployment topology, compliance tiers, and SLA agreements.
      </FieldDescription>`
      }
    </Field>
  );
}`;
  }, [stateMode, resizeMode, rows, value, isInvalid, isDisabled, isReadOnly]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const resetStage = () => {
    setStateMode("idle");
    setResizeMode("vertical");
    setRows("4");
    setValue(
      "The new optical liquid glass treatment provides luminous surface depth across enterprise forms."
    );
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect native multiline plain-text editing, restrained optical liquid glass substrate, vertical resizing, dual-indicator invalid state, and independent Halo Focus Ring."
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
          value: "<textarea> (Native)",
          variant: "success",
        },
        {
          label: "Surface",
          value: "Subtle Liquid Glass",
          variant: "success",
        },
        {
          label: "Resizing",
          value: "Native CSS (0 JS)",
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
            label="Resize Mode"
            value={resizeMode}
            onValueChange={(val) => setResizeMode(val as any)}
            options={[
              { label: "Vertical (Default)", value: "vertical" },
              { label: "None (Fixed)", value: "none" },
              { label: "Both (Freeform)", value: "both" },
            ]}
          />

          <StageControlSelect
            label="Rows Geometry"
            value={rows}
            onValueChange={(val) => setRows(val as any)}
            options={[
              { label: "3 Rows", value: "3" },
              { label: "4 Rows (Default)", value: "4" },
              { label: "6 Rows", value: "6" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/55 dark:bg-neutral-950/55 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-textarea-field" invalid={isInvalid} disabled={isDisabled}>
            <FieldLabel htmlFor="stage-textarea-control" required={isInvalid}>
              Project specification
            </FieldLabel>
            <Textarea
              id="stage-textarea-control"
              disabled={isDisabled}
              readOnly={isReadOnly}
              aria-invalid={isInvalid ? "true" : undefined}
              resize={resizeMode}
              rows={Number(rows)}
              value={isInvalid ? "Incomplete spec." : value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Provide architectural requirements and technical scope..."
              aria-describedby={isInvalid ? "stage-ta-err" : "stage-ta-desc"}
            />
            {isInvalid ? (
              <FieldError id="stage-ta-err">
                Specification must exceed 30 characters in length.
              </FieldError>
            ) : (
              <FieldDescription id="stage-ta-desc">
                Outlines deployment topology, compliance tiers, and SLA agreements.
              </FieldDescription>
            )}
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
