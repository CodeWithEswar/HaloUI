"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { TagInput } from "@/components/ui/tag-input";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function TagInputPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [statePreset, setStatePreset] = React.useState<"interactive" | "invalid" | "disabled" | "readOnly">("interactive");
  const [sizePreset, setSizePreset] = React.useState<"sm" | "default" | "lg">("default");
  const [maxTagsOption, setMaxTagsOption] = React.useState<"none" | "5">("none");
  const [allowDupesOption, setAllowDupesOption] = React.useState<"false" | "true">("false");
  const [addOnBlurOption, setAddOnBlurOption] = React.useState<"false" | "true">("false");

  // Tag state
  const [tags, setTags] = React.useState<string[]>(["React", "TypeScript", "Tailwind CSS"]);
  const [duplicateMessage, setDuplicateMessage] = React.useState<string | null>(null);

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";
  const isReadOnly = statePreset === "readOnly";
  const maxTags = maxTagsOption === "5" ? 5 : undefined;
  const allowDuplicates = allowDupesOption === "true";
  const addOnBlur = addOnBlurOption === "true";

  const handleDuplicate = (dup: string) => {
    setDuplicateMessage(`"${dup}" is already added.`);
    setTimeout(() => setDuplicateMessage(null), 3000);
  };

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const readOnlyAttr = isReadOnly ? " readOnly" : "";
    const sizeAttr = sizePreset !== "default" ? ` size="${sizePreset}"` : "";
    const maxAttr = maxTags ? ` maxTags={${maxTags}}` : "";
    const dupAttr = allowDuplicates ? " allowDuplicates" : "";
    const blurAttr = addOnBlur ? " addOnBlur" : "";

    return `import { TagInput } from "@/components/ui/tag-input";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function TagsExample() {
  const [tags, setTags] = React.useState<string[]>(${JSON.stringify(tags, null, 2)});

  return (
    <Field id="skills-field"${invalidAttr}${disabledAttr}>
      <FieldLabel htmlFor="skills-input" className="font-semibold">
        Skills & Technologies
      </FieldLabel>
      <FieldDescription>
        Type a skill name and press Enter or comma to create a tag.
      </FieldDescription>
      <TagInput
        id="skills-input"
        value={tags}
        onValueChange={setTags}${sizeAttr}${maxAttr}${dupAttr}${blurAttr}${invalidAttr}${disabledAttr}${readOnlyAttr}
        placeholder="Add skill..."
      />${isInvalid ? `
      <FieldError>
        Please specify at least one verified qualification skill.
      </FieldError>` : ""}
    </Field>
  );
}`;
  }, [
    tags,
    isInvalid,
    isDisabled,
    isReadOnly,
    sizePreset,
    maxTags,
    allowDuplicates,
    addOnBlur,
  ]);

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="State Preset"
            value={statePreset}
            onValueChange={(val) => setStatePreset(val as any)}
            options={[
              { value: "interactive", label: "Interactive" },
              { value: "invalid", label: "Invalid (Error)" },
              { value: "disabled", label: "Disabled" },
              { value: "readOnly", label: "Read-only" },
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
            label="Max Tags"
            value={maxTagsOption}
            onValueChange={(val) => setMaxTagsOption(val as any)}
            options={[
              { value: "none", label: "Unlimited" },
              { value: "5", label: "Max 5 Tags" },
            ]}
          />
          <StageControlSelect
            label="Duplicates"
            value={allowDupesOption}
            onValueChange={(val) => setAllowDupesOption(val as any)}
            options={[
              { value: "false", label: "Reject Duplicates" },
              { value: "true", label: "Allow Duplicates" },
            ]}
          />
          <StageControlSelect
            label="Commit on Blur"
            value={addOnBlurOption}
            onValueChange={(val) => setAddOnBlurOption(val as any)}
            options={[
              { value: "false", label: "Disabled (Enter/comma)" },
              { value: "true", label: "Enabled (Blur commits)" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-lg mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-tag-field" invalid={isInvalid} disabled={isDisabled}>
            <FieldLabel htmlFor="stage-tag-input" className="font-semibold text-foreground text-sm select-none">
              Technologies & Keywords
            </FieldLabel>
            <FieldDescription className="text-xs text-muted-foreground leading-relaxed">
              Type keyword and press <kbd className="px-1.5 py-0.5 rounded bg-muted/60 text-[10px] font-mono border">Enter</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-muted/60 text-[10px] font-mono border">,</kbd> to add. Backspace stages then deletes the last tag.
            </FieldDescription>

          <div className="mt-2 space-y-2">
            <TagInput
              id="stage-tag-input"
              value={tags}
              onValueChange={setTags}
              size={sizePreset}
              maxTags={maxTags}
              allowDuplicates={allowDuplicates}
              addOnBlur={addOnBlur}
              disabled={isDisabled}
              readOnly={isReadOnly}
              invalid={isInvalid}
              onDuplicate={handleDuplicate}
              placeholder="Add technology..."
            />

            {duplicateMessage && (
              <p className="text-xs font-medium text-amber-600 dark:text-amber-400 animate-pulse">
                {duplicateMessage}
              </p>
            )}

            {isInvalid && (
              <FieldError>
                Please provide at least one required category keyword for classification.
              </FieldError>
            )}

            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-black/5 dark:border-white/5">
              <span>{tags.length} tag{tags.length === 1 ? "" : "s"} committed</span>
              {maxTags && <span>Limit: {tags.length} / {maxTags}</span>}
            </div>
          </div>
        </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
