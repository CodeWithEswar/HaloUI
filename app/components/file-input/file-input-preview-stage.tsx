"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { FileInput } from "@/components/ui/file-input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function FileInputPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [statePreset, setStatePreset] = React.useState<"interactive" | "invalid" | "disabled" | "required">("interactive");
  const [sizePreset, setSizePreset] = React.useState<"sm" | "default" | "lg">("default");
  const [multipleOption, setMultipleOption] = React.useState<"single" | "multiple">("single");
  const [acceptOption, setAcceptOption] = React.useState<"all" | "image" | "document">("all");

  const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";
  const isRequired = statePreset === "required";
  const isMultiple = multipleOption === "multiple";

  const acceptValue =
    acceptOption === "image"
      ? "image/*"
      : acceptOption === "document"
      ? ".pdf,.docx,.txt"
      : undefined;

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const reqAttr = isRequired ? " required" : "";
    const sizeAttr = sizePreset !== "default" ? ` size="${sizePreset}"` : "";
    const multAttr = isMultiple ? " multiple" : "";
    const accAttr = acceptValue ? ` accept="${acceptValue}"` : "";

    return `import { FileInput } from "@/components/ui/file-input";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function AttachmentExample() {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <Field id="attachment-field"${invalidAttr}${disabledAttr}${reqAttr}>
      <FieldLabel htmlFor="attachment-input" className="font-semibold">
        Attachment${isRequired ? ' <span className="text-destructive">*</span>' : ""}
      </FieldLabel>
      <FieldDescription>
        ${
          acceptOption === "image"
            ? "Choose an image file (PNG, JPG, SVG)."
            : acceptOption === "document"
            ? "Choose a document (.pdf, .docx, .txt)."
            : "Choose a file to attach from your device."
        }
      </FieldDescription>
      <FileInput
        id="attachment-input"${sizeAttr}${multAttr}${accAttr}${invalidAttr}${disabledAttr}${reqAttr}
        onFilesChange={(selected) => setFiles(selected)}
      />${
        isInvalid
          ? `\n      <FieldError>Please select an eligible file to continue.</FieldError>`
          : ""
      }
    </Field>
  );
}`;
  }, [acceptOption, acceptValue, isDisabled, isInvalid, isMultiple, isRequired, sizePreset]);

  return (
    <PreviewStageShell
      title="File Input Interactive Stage"
      description="Evaluate native platform file selection, mobile picker integration, accept filters, multiple-file selection, and double-contrast Halo focus perimeter across physical backdrops."
      badge="Forms & Fields 25"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="State Preset"
            value={statePreset}
            onValueChange={(val) => setStatePreset(val as any)}
            options={[
              { value: "interactive", label: "Interactive" },
              { value: "invalid", label: "Invalid (Error)" },
              { value: "disabled", label: "Disabled" },
              { value: "required", label: "Required" },
            ]}
          />
          <StageControlSelect
            label="Size Variant"
            value={sizePreset}
            onValueChange={(val) => setSizePreset(val as any)}
            options={[
              { value: "sm", label: "Small (sm)" },
              { value: "default", label: "Default" },
              { value: "lg", label: "Large (lg)" },
            ]}
          />
          <StageControlSelect
            label="Selection Mode"
            value={multipleOption}
            onValueChange={(val) => setMultipleOption(val as any)}
            options={[
              { value: "single", label: "Single File" },
              { value: "multiple", label: "Multiple Files" },
            ]}
          />
          <StageControlSelect
            label="Accept Filter"
            value={acceptOption}
            onValueChange={(val) => setAcceptOption(val as any)}
            options={[
              { value: "all", label: "All Types (*)" },
              { value: "image", label: "Images (image/*)" },
              { value: "document", label: "Docs (.pdf, .docx)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Selected Files",
          value: selectedFiles.length > 0 ? `${selectedFiles.length} file(s)` : "None",
          variant: selectedFiles.length > 0 ? "success" : "default",
        },
        {
          label: "Size Variant",
          value: sizePreset,
          variant: "default",
        },
        {
          label: "Multiple",
          value: isMultiple ? "Enabled" : "Disabled",
          variant: isMultiple ? "success" : "default",
        },
        {
          label: "Status",
          value: isInvalid ? "Invalid (Error)" : isDisabled ? "Disabled" : "Interactive",
          variant: isInvalid ? "warning" : "default",
        },
        {
          label: "A11y",
          value: "Native File Picker",
          variant: "success",
        },
      ]}
    >
      <div className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-file-field" aria-invalid={isInvalid ? "true" : undefined} disabled={isDisabled} required={isRequired}>
            <FieldLabel htmlFor="stage-file-input" className="font-semibold text-foreground text-sm select-none">
              Attachment
              {isRequired && <span className="text-destructive ml-1">*</span>}
            </FieldLabel>
            <FieldDescription className="text-xs text-muted-foreground leading-relaxed">
              {acceptOption === "image"
                ? "Choose an image file (PNG, JPG, SVG)."
                : acceptOption === "document"
                ? "Choose a document (.pdf, .docx, .txt)."
                : "Choose a file to attach from your device."}
            </FieldDescription>
            <FileInput
              id="stage-file-input"
              size={sizePreset}
              multiple={isMultiple}
              accept={acceptValue}
              invalid={isInvalid}
              disabled={isDisabled}
              required={isRequired}
              className="mt-1"
              onFilesChange={(files) => setSelectedFiles(files.map((f) => f.name))}
            />
            {isInvalid && (
              <FieldError className="mt-1.5">Please select an eligible file to continue.</FieldError>
            )}
          </Field>

          {selectedFiles.length > 0 && (
            <div className="mt-4 text-xs text-muted-foreground font-mono bg-muted/40 p-2.5 rounded-lg border border-border break-all">
              Selected: {selectedFiles.join(", ")}
            </div>
          )}
        </div>
      </div>
    </PreviewStageShell>
  );
}
