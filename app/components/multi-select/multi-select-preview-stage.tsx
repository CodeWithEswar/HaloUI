"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectInput,
  MultiSelectContent,
  MultiSelectList,
  MultiSelectItem,
  MultiSelectGroup,
  MultiSelectLabel,
  MultiSelectSeparator,
  MultiSelectEmpty,
  MultiSelectClear,
  MultiSelectChevron,
} from "@/components/ui/multi-select";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

const FRAMEWORKS = [
  { label: "Angular", value: "Angular" },
  { label: "Astro", value: "Astro" },
  { label: "Next.js", value: "Next.js" },
  { label: "Nuxt", value: "Nuxt" },
  { label: "React", value: "React" },
  { label: "Remix", value: "Remix" },
  { label: "Svelte", value: "Svelte" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "Vue", value: "Vue" },
];

export function MultiSelectPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [stateMode, setStateMode] = React.useState<"idle" | "empty" | "invalid" | "disabled">("idle");
  const [structure, setStructure] = React.useState<"standard" | "grouped">("standard");
  const [showClear, setShowClear] = React.useState<"yes" | "no">("yes");
  const [selectedValues, setSelectedValues] = React.useState<string[]>(["React", "TypeScript"]);

  const isInvalid = stateMode === "invalid";
  const isDisabled = stateMode === "disabled";
  const effectiveValues = stateMode === "empty" ? [] : selectedValues;

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";

    if (structure === "grouped") {
      return `import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectInput,
  MultiSelectContent,
  MultiSelectList,
  MultiSelectItem,
  MultiSelectGroup,
  MultiSelectLabel,
  MultiSelectSeparator,
  MultiSelectEmpty,
  MultiSelectClear,
  MultiSelectChevron,
} from "@/components/ui/multi-select";

export function GroupedMultiSelect() {
  return (
    <Field id="stack-field"${invalidAttr}>
      <FieldLabel htmlFor="stack-input"${isInvalid ? " required" : ""}>Required technologies</FieldLabel>
      <MultiSelect defaultValue={["React", "Next.js"]}${disabledAttr}${invalidAttr}>
        <MultiSelectTrigger>
          <MultiSelectValue />
          <MultiSelectInput
            id="stack-input"
            placeholder="Search technologies..."
          />
          ${showClear === "yes" ? "<MultiSelectClear />" : ""}
          <MultiSelectChevron />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectList>
            <MultiSelectGroup>
              <MultiSelectLabel>Frameworks</MultiSelectLabel>
              <MultiSelectItem value="React">React</MultiSelectItem>
              <MultiSelectItem value="Next.js">Next.js</MultiSelectItem>
              <MultiSelectItem value="Vue">Vue</MultiSelectItem>
              <MultiSelectItem value="Svelte">Svelte</MultiSelectItem>
            </MultiSelectGroup>
            <MultiSelectSeparator />
            <MultiSelectGroup>
              <MultiSelectLabel>Languages</MultiSelectLabel>
              <MultiSelectItem value="TypeScript">TypeScript</MultiSelectItem>
              <MultiSelectItem value="Rust">Rust</MultiSelectItem>
              <MultiSelectItem value="Go">Go</MultiSelectItem>
            </MultiSelectGroup>
            <MultiSelectEmpty>No results found.</MultiSelectEmpty>
          </MultiSelectList>
        </MultiSelectContent>
      </MultiSelect>
      <FieldDescription>Select and organize capabilities as removable tokens.</FieldDescription>
    </Field>
  );
}`;
    }

    return `import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectInput,
  MultiSelectContent,
  MultiSelectList,
  MultiSelectItem,
  MultiSelectEmpty,
  MultiSelectClear,
  MultiSelectChevron,
} from "@/components/ui/multi-select";

export function StandardMultiSelect() {
  return (
    <Field id="frameworks-field"${invalidAttr}>
      <FieldLabel htmlFor="frameworks-input"${isInvalid ? " required" : ""}>Project frameworks</FieldLabel>
      <MultiSelect defaultValue={["React", "TypeScript"]}${disabledAttr}${invalidAttr}>
        <MultiSelectTrigger>
          <MultiSelectValue />
          <MultiSelectInput
            id="frameworks-input"
            placeholder="Select frameworks..."
          />
          ${showClear === "yes" ? "<MultiSelectClear />" : ""}
          <MultiSelectChevron />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectList>
            {FRAMEWORKS.map((fw) => (
              <MultiSelectItem key={fw.value} value={fw.value}>
                {fw.label}
              </MultiSelectItem>
            ))}
            <MultiSelectEmpty>No frameworks found.</MultiSelectEmpty>
          </MultiSelectList>
        </MultiSelectContent>
      </MultiSelect>
      <FieldDescription>Choose multiple technologies for the project.</FieldDescription>
    </Field>
  );
}`;
  }, [isInvalid, isDisabled, structure, showClear]);

  return (
    <PreviewStageShell
      title="Multi Select Interactive Stage"
      description="Test searchable token selection across physical optical material layers, backdrops, viewports, and validation states."
      badge="Optical Liquid Material"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="State Preset"
            value={stateMode}
            onValueChange={(val) => setStateMode(val as typeof stateMode)}
            options={[
              { value: "idle", label: "Selected (Active)" },
              { value: "empty", label: "Empty Selection" },
              { value: "invalid", label: "Invalid (Dual)" },
              { value: "disabled", label: "Disabled (Locked)" },
            ]}
          />

          <StageControlSelect
            label="Option Structure"
            value={structure}
            onValueChange={(val) => setStructure(val as typeof structure)}
            options={[
              { value: "standard", label: "Flat Collection" },
              { value: "grouped", label: "Categorized Groups" },
            ]}
          />

          <StageControlSelect
            label="Clear Action"
            value={showClear}
            onValueChange={(val) => setShowClear(val as typeof showClear)}
            options={[
              { value: "yes", label: "Show Clear" },
              { value: "no", label: "Hide Clear" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Selected Tokens",
          value: `${effectiveValues.length} committed`,
          variant: "success",
        },
        {
          label: "Values",
          value: effectiveValues.length > 0 ? `[${effectiveValues.map((v) => `"${v}"`).join(", ")}]` : "[]",
          variant: "success",
        },
        {
          label: "Status",
          value: isInvalid ? "Invalid (Dual Indicator)" : isDisabled ? "Disabled" : "Active",
          variant: isInvalid ? "warning" : "default",
        },
        {
          label: "A11y",
          value: "WAI-ARIA Combobox (Multiple)",
          variant: "success",
        },
      ]}
      code={generatedCode}
    >
      <div className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-multi-field" invalid={isInvalid} disabled={isDisabled}>
            <FieldLabel htmlFor="stage-multi-input" required={isInvalid}>
              Project capabilities
            </FieldLabel>

            <MultiSelect
              value={effectiveValues}
              onValueChange={(vals) => {
                setSelectedValues(vals);
                if (stateMode === "empty" && vals.length > 0) {
                  setStateMode("idle");
                }
              }}
              invalid={isInvalid}
              disabled={isDisabled}
            >
              <MultiSelectTrigger>
                <MultiSelectValue />
                <MultiSelectInput
                  id="stage-multi-input"
                  placeholder={effectiveValues.length === 0 ? "Select capabilities..." : "Add more..."}
                  aria-describedby={isInvalid ? "stage-multi-err" : "stage-multi-desc"}
                />
                {showClear === "yes" && effectiveValues.length > 0 && <MultiSelectClear />}
                <MultiSelectChevron />
              </MultiSelectTrigger>

              <MultiSelectContent>
                <MultiSelectList>
                  {structure === "standard" ? (
                    <>
                      {FRAMEWORKS.map((fw) => (
                        <MultiSelectItem key={fw.value} value={fw.value}>
                          {fw.label}
                        </MultiSelectItem>
                      ))}
                      <MultiSelectEmpty>No frameworks match your query.</MultiSelectEmpty>
                    </>
                  ) : (
                    <>
                      <MultiSelectGroup>
                        <MultiSelectLabel>Frameworks</MultiSelectLabel>
                        <MultiSelectItem value="React">React</MultiSelectItem>
                        <MultiSelectItem value="Next.js">Next.js</MultiSelectItem>
                        <MultiSelectItem value="Vue">Vue</MultiSelectItem>
                        <MultiSelectItem value="Svelte">Svelte</MultiSelectItem>
                      </MultiSelectGroup>
                      <MultiSelectSeparator />
                      <MultiSelectGroup>
                        <MultiSelectLabel>Languages</MultiSelectLabel>
                        <MultiSelectItem value="TypeScript">TypeScript</MultiSelectItem>
                        <MultiSelectItem value="Rust">Rust</MultiSelectItem>
                        <MultiSelectItem value="Go">Go</MultiSelectItem>
                      </MultiSelectGroup>
                      <MultiSelectEmpty>No technologies found.</MultiSelectEmpty>
                    </>
                  )}
                </MultiSelectList>
              </MultiSelectContent>
            </MultiSelect>

            {isInvalid ? (
              <FieldError id="stage-multi-err">
                At least one engineering capability is required for workspace provisioning.
              </FieldError>
            ) : (
              <FieldDescription id="stage-multi-desc">
                Tokens derive from committed selection; removing a token updates the collection directly.
              </FieldDescription>
            )}
          </Field>
        </div>
      </div>

    </PreviewStageShell>
  );
}
