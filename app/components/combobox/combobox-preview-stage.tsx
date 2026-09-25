"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxEmpty,
} from "@/components/ui/combobox";
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
  { label: "React", value: "React" },
  { label: "Remix", value: "Remix" },
  { label: "Svelte", value: "Svelte" },
  { label: "Vue", value: "Vue" },
];

export function ComboboxPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [stateMode, setStateMode] = React.useState<"idle" | "placeholder" | "invalid" | "disabled">("idle");
  const [structure, setStructure] = React.useState<"standard" | "grouped">("standard");
  const [showClear, setShowClear] = React.useState<"yes" | "no">("yes");
  const [selectedValue, setSelectedValue] = React.useState<string | null>("React");
  const [query, setQuery] = React.useState("React");
  const [copiedCode, setCopiedCode] = React.useState(false);

  const isInvalid = stateMode === "invalid";
  const isDisabled = stateMode === "disabled";
  const isPlaceholder = stateMode === "placeholder";

  const effectiveValue = isPlaceholder ? null : selectedValue;

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? ' aria-invalid="true"' : "";
    const clearProp = showClear === "yes" ? " showClear" : "";

    if (structure === "grouped") {
      return `import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  ComboboxEmpty,
} from "@/components/ui/combobox";

export function GroupedCombobox() {
  return (
    <Field id="tech-field"${isInvalid ? " invalid" : ""}>
      <FieldLabel htmlFor="tech-input"${isInvalid ? " required" : ""}>Technology stack</FieldLabel>
      <Combobox defaultValue="React"${isDisabled ? " disabled" : ""}>
        <ComboboxInput
          id="tech-input"
          placeholder="Search technologies..."${clearProp}${invalidAttr}
        />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxGroup>
              <ComboboxLabel>Frontend Frameworks</ComboboxLabel>
              <ComboboxItem value="React">React</ComboboxItem>
              <ComboboxItem value="Vue">Vue</ComboboxItem>
              <ComboboxItem value="Svelte">Svelte</ComboboxItem>
            </ComboboxGroup>
            <ComboboxSeparator />
            <ComboboxGroup>
              <ComboboxLabel>System Languages</ComboboxLabel>
              <ComboboxItem value="Rust">Rust</ComboboxItem>
              <ComboboxItem value="Go">Go</ComboboxItem>
            </ComboboxGroup>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription>Filter through categorized technology groups.</FieldDescription>
    </Field>
  );
}`;
    }

    return `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";

export function FrameworkCombobox() {
  return (
    <Field id="framework-field"${isInvalid ? " invalid" : ""}>
      <FieldLabel htmlFor="framework-input"${isInvalid ? " required" : ""}>Framework</FieldLabel>
      <Combobox defaultValue="React"${isDisabled ? " disabled" : ""}>
        <ComboboxInput
          id="framework-input"
          placeholder="Search frameworks..."${clearProp}${invalidAttr}
        />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxItem value="Angular">Angular</ComboboxItem>
            <ComboboxItem value="Astro">Astro</ComboboxItem>
            <ComboboxItem value="Next.js">Next.js</ComboboxItem>
            <ComboboxItem value="React">React</ComboboxItem>
            <ComboboxItem value="Remix">Remix</ComboboxItem>
            <ComboboxItem value="Svelte">Svelte</ComboboxItem>
            <ComboboxItem value="Vue">Vue</ComboboxItem>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      ${
        isInvalid
          ? `<FieldError>A valid template selection is required.</FieldError>`
          : `<FieldDescription>Filterable option list with query-value separation.</FieldDescription>`
      }
    </Field>
  );
}`;
  }, [structure, isInvalid, isDisabled, showClear]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleReset = () => {
    setStateMode("idle");
    setStructure("standard");
    setShowClear("yes");
    setSelectedValue("React");
    setQuery("React");
    setBackdrop("neutral");
    setViewport("desktop");
  };

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      onCopy={handleCopyCode}
      copied={copiedCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="State"
            value={stateMode}
            onValueChange={(val) => setStateMode(val as typeof stateMode)}
            options={[
              { value: "idle", label: "Selected" },
              { value: "placeholder", label: "Placeholder" },
              { value: "invalid", label: "Invalid + Focus" },
              { value: "disabled", label: "Disabled" },
            ]}
          />

          <StageControlSelect
            label="Structure"
            value={structure}
            onValueChange={(val) => setStructure(val as typeof structure)}
            options={[
              { value: "standard", label: "Standard List" },
              { value: "grouped", label: "Grouped" },
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
          label: "Query",
          value: `"${query}"`,
          variant: "success",
        },
        {
          label: "Value",
          value: effectiveValue ? `"${effectiveValue}"` : "null",
          variant: "success",
        },
        {
          label: "Status",
          value: isInvalid ? "Invalid (Dual Indicator)" : isDisabled ? "Disabled" : "Active",
          variant: isInvalid ? "warning" : "default",
        },
        {
          label: "A11y",
          value: "WAI-ARIA 1.2 Combobox",
          variant: "success",
        },
      ]}
      code={generatedCode}
    >
      <div className="w-full max-w-sm mx-auto py-6">
        <Field id="stage-combo-field" invalid={isInvalid} disabled={isDisabled}>
          <FieldLabel htmlFor="stage-combo-input" required={isInvalid}>
            Framework template
          </FieldLabel>

          <Combobox
            value={effectiveValue}
            onValueChange={(val) => {
              setSelectedValue(val);
              if (val) setQuery(val);
              if (stateMode === "placeholder") setStateMode("idle");
            }}
            inputValue={query}
            onInputValueChange={(q) => setQuery(q)}
            disabled={isDisabled}
          >
            <ComboboxInput
              id="stage-combo-input"
              placeholder="Search frameworks..."
              showClear={showClear === "yes"}
              aria-invalid={isInvalid ? "true" : undefined}
              aria-describedby={isInvalid ? "stage-combo-err" : "stage-combo-desc"}
            />

            <ComboboxContent>
              <ComboboxList>
                {structure === "standard" ? (
                  <>
                    {FRAMEWORKS.map((fw) => (
                      <ComboboxItem key={fw.value} value={fw.label}>
                        {fw.label}
                      </ComboboxItem>
                    ))}
                    <ComboboxEmpty>No frameworks match &quot;{query}&quot;</ComboboxEmpty>
                  </>
                ) : (
                  <>
                    <ComboboxGroup>
                      <ComboboxLabel>Frontend Frameworks</ComboboxLabel>
                      <ComboboxItem value="React">React</ComboboxItem>
                      <ComboboxItem value="Vue">Vue</ComboboxItem>
                      <ComboboxItem value="Svelte">Svelte</ComboboxItem>
                    </ComboboxGroup>
                    <ComboboxSeparator />
                    <ComboboxGroup>
                      <ComboboxLabel>System Languages</ComboboxLabel>
                      <ComboboxItem value="Rust">Rust</ComboboxItem>
                      <ComboboxItem value="Go">Go</ComboboxItem>
                    </ComboboxGroup>
                    <ComboboxEmpty>No technologies match &quot;{query}&quot;</ComboboxEmpty>
                  </>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          {isInvalid ? (
            <FieldError id="stage-combo-err">
              A valid framework template choice is required for workspace deployment.
            </FieldError>
          ) : (
            <FieldDescription id="stage-combo-desc">
              Filterable collection maintaining distinct active query and committed value states.
            </FieldDescription>
          )}
        </Field>
      </div>
    </PreviewStageShell>
  );
}
