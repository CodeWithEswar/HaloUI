"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type StageBackdrop,
} from "@/components/docs/preview-stage-shell";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  type FileUploadItemState,
  type UploadHandler,
} from "@/components/ui/file-upload";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function FileUploadPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<StageBackdrop>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [statePreset, setStatePreset] = React.useState<
    "interactive" | "invalid" | "disabled" | "required"
  >("interactive");
  const [sizePreset, setSizePreset] = React.useState<"sm" | "default" | "lg">("default");
  const [multipleOption, setMultipleOption] = React.useState<"multiple" | "single">("multiple");
  const [acceptOption, setAcceptOption] = React.useState<"all" | "images" | "documents">("all");
  const [uploadMode, setUploadMode] = React.useState<"auto" | "manual">("auto");

  const [queueCount, setQueueCount] = React.useState<number>(0);
  const [activeUploads, setActiveUploads] = React.useState<number>(0);

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";
  const isRequired = statePreset === "required";
  const isMultiple = multipleOption === "multiple";
  const isAuto = uploadMode === "auto";

  const acceptValue =
    acceptOption === "images"
      ? "image/png,image/jpeg,image/webp,image/svg+xml"
      : acceptOption === "documents"
      ? ".pdf,.docx,.txt"
      : undefined;

  // Simulated upload adapter for interactive stage preview
  const simulatedUploader = React.useCallback<UploadHandler>(
    async (item, context) => {
      let current = 0;
      while (current < 100) {
        if (context.abortSignal.aborted) {
          throw new DOMException("Aborted", "AbortError");
        }
        await new Promise((r) => setTimeout(r, 100));
        current += Math.floor(Math.random() * 20) + 10;
        if (current > 100) current = 100;
        context.onProgress(current);
      }
    },
    []
  );

  const handleQueueChange = React.useCallback((queue: FileUploadItemState[]) => {
    setQueueCount(queue.length);
    setActiveUploads(queue.filter((q) => q.status === "uploading").length);
  }, []);

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const reqAttr = isRequired ? " required" : "";
    const multAttr = isMultiple ? " multiple" : "";
    const accAttr = acceptValue ? ` accept="${acceptValue}"` : "";
    const autoAttr = isAuto ? " autoUpload" : "";

    return `import * as React from "react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  type UploadHandler,
} from "@/components/ui/file-upload";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

// Application supplies actual network transfer (e.g. S3, Supabase, fetch, XHR)
const handleUpload: UploadHandler = async (item, { onProgress, abortSignal }) => {
  const formData = new FormData();
  formData.append("file", item.file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    signal: abortSignal,
  });

  if (!response.ok) {
    throw new Error(\`Server returned status \${response.status}\`);
  }
};

export function DocumentUploadExample() {
  return (
    <Field id="stage-upload-field"${invalidAttr}${disabledAttr}${reqAttr}>
      <FieldLabel className="font-semibold">
        Attachments${isRequired ? ' <span className="text-destructive">*</span>' : ""}
      </FieldLabel>
      <FieldDescription>
        Drag and drop files to upload or click browse.
      </FieldDescription>
      <FileUpload${multAttr}${accAttr}${autoAttr}${invalidAttr}${disabledAttr}${reqAttr}
        maxSize={10 * 1024 * 1024}
        onUpload={handleUpload}
      >
        <FileUploadDropzone size="${sizePreset}" />
        ${!isAuto ? `<div className="flex justify-end pt-1">
          <FileUploadTrigger>Choose Files</FileUploadTrigger>
        </div>\n        ` : ""}<FileUploadList />
      </FileUpload>${isInvalid ? `\n      <FieldError>Please resolve file upload errors before continuing.</FieldError>` : ""}
    </Field>
  );
}`;
  }, [acceptValue, isAuto, isDisabled, isInvalid, isMultiple, isRequired, sizePreset]);

  return (
    <PreviewStageShell
      title="File Upload Interactive Stage"
      description="Evaluate drag-and-drop mechanics, native picker fallback, client-side validation, queue state, progress tracking, and focus restoration across physical backdrops."
      badge="Forms & Fields 26"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-2.5">
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
            label="Dropzone Size"
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
              { value: "multiple", label: "Multiple Files" },
              { value: "single", label: "Single File" },
            ]}
          />
          <StageControlSelect
            label="Accept Filter"
            value={acceptOption}
            onValueChange={(val) => setAcceptOption(val as any)}
            options={[
              { value: "all", label: "All Formats (*)" },
              { value: "images", label: "Images (png, jpg, webp)" },
              { value: "documents", label: "Docs (pdf, docx, txt)" },
            ]}
          />
          <StageControlSelect
            label="Upload Mode"
            value={uploadMode}
            onValueChange={(val) => setUploadMode(val as any)}
            options={[
              { value: "auto", label: "Auto Upload (Immediate)" },
              { value: "manual", label: "Manual (Queue First)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Queued Files",
          value: `${queueCount} item(s)`,
          variant: queueCount > 0 ? "success" : "default",
        },
        {
          label: "Active Transfers",
          value: activeUploads > 0 ? `${activeUploads} active` : "Idle",
          variant: activeUploads > 0 ? "warning" : "default",
        },
        {
          label: "Storage",
          value: "Application Owned",
          variant: "default",
        },
        {
          label: "A11y",
          value: "Native Picker + Live Region",
          variant: "success",
        },
      ]}
    >
      <div className="w-full max-w-lg mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate transition-all">
          <Field
            id="stage-file-upload-field"
            aria-invalid={isInvalid ? "true" : undefined}
            disabled={isDisabled}
            required={isRequired}
          >
            <FieldLabel htmlFor="stage-file-upload-dropzone" className="font-semibold text-foreground text-sm select-none">
              Project Assets
              {isRequired && <span className="text-destructive ml-1">*</span>}
            </FieldLabel>
            <FieldDescription className="text-xs text-muted-foreground leading-relaxed">
              {acceptOption === "images"
                ? "Choose images to upload into the workspace."
                : acceptOption === "documents"
                ? "Select documents (.pdf, .docx, .txt)."
                : "Select files or drop them anywhere in the dropzone."}
            </FieldDescription>

            <FileUpload
              multiple={isMultiple}
              accept={acceptValue}
              maxSize={10 * 1024 * 1024} // 10MB
              maxFiles={isMultiple ? 5 : 1}
              autoUpload={isAuto}
              disabled={isDisabled}
              invalid={isInvalid}
              required={isRequired}
              onUpload={simulatedUploader}
              onQueueChange={handleQueueChange}
            >
              <FileUploadDropzone size={sizePreset} />
              {!isAuto && (
                <div className="flex justify-end pt-1">
                  <FileUploadTrigger>Browse Files</FileUploadTrigger>
                </div>
              )}
              <FileUploadList />
            </FileUpload>

            {isInvalid && (
              <FieldError>Please resolve file upload errors before continuing.</FieldError>
            )}
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
