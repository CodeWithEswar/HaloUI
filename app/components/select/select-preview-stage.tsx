"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function SelectPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [stateMode, setStateMode] = React.useState<"idle" | "placeholder" | "invalid" | "disabled">("idle");
  const [structure, setStructure] = React.useState<"standard" | "grouped" | "with-image">("standard");
  const [size, setSize] = React.useState<"default" | "sm">("default");
  const [selectedValue, setSelectedValue] = React.useState<string | null>("react");
  const [copiedCode, setCopiedCode] = React.useState(false);

  const isInvalid = stateMode === "invalid";
  const isDisabled = stateMode === "disabled";
  const isPlaceholder = stateMode === "placeholder";

  const effectiveValue = isPlaceholder ? null : selectedValue;

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? ' aria-invalid="true"' : "";
    const sizeAttr = size === "sm" ? ' size="sm"' : "";

    if (structure === "with-image") {
      return `import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function AvatarSelectDemo() {
  return (
    <Field id="assignee-field"${isInvalid ? " invalid" : ""}>
      <FieldLabel htmlFor="assignee-select"${isInvalid ? " required" : ""}>Assignee</FieldLabel>
      <Select defaultValue="sarah"${isDisabled ? " disabled" : ""}>
        <SelectTrigger id="assignee-select"${sizeAttr}${invalidAttr}>
          <SelectValue placeholder="Assign a team member..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sarah">
            <span className="flex items-center gap-2.5">
              <span className="size-5 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-[10px] font-semibold text-white shadow-2xs">SJ</span>
              <span>Sarah Jenkins (Design Lead)</span>
            </span>
          </SelectItem>
          <SelectItem value="alex">
            <span className="flex items-center gap-2.5">
              <span className="size-5 rounded-full bg-gradient-to-tr from-violet-400 to-purple-600 flex items-center justify-center text-[10px] font-semibold text-white shadow-2xs">AR</span>
              <span>Alex Rivera (Systems)</span>
            </span>
          </SelectItem>
          <SelectItem value="elena">
            <span className="flex items-center gap-2.5">
              <span className="size-5 rounded-full bg-gradient-to-tr from-rose-400 to-amber-500 flex items-center justify-center text-[10px] font-semibold text-white shadow-2xs">ER</span>
              <span>Elena Rostova (Engineering)</span>
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
      <FieldDescription>Items with rich images and avatar metadata.</FieldDescription>
    </Field>
  );
}`;
    }

    if (structure === "grouped") {
      return `import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select";

export function GroupedSelectDemo() {
  return (
    <Field id="infra-field"${isInvalid ? " invalid" : ""}>
      <FieldLabel htmlFor="infra-select"${isInvalid ? " required" : ""}>Infrastructure Engine</FieldLabel>
      <Select defaultValue="rust"${isDisabled ? " disabled" : ""}>
        <SelectTrigger id="infra-select"${sizeAttr}${invalidAttr}>
          <SelectValue placeholder="Select runtime..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frontend</SelectLabel>
            <SelectItem value="react">React 19</SelectItem>
            <SelectItem value="vue">Vue 3.5</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Backend</SelectLabel>
            <SelectItem value="rust">Rust (Axum)</SelectItem>
            <SelectItem value="go">Go (Echo)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldDescription>Structured groups with non-selectable section labels.</FieldDescription>
    </Field>
  );
}`;
    }

    return `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function FrameworkSelector() {
  return (
    <Field id="framework-field"${isInvalid ? " invalid" : ""}>
      <FieldLabel htmlFor="framework-select"${isInvalid ? " required" : ""}>Primary Framework</FieldLabel>
      <Select defaultValue="react"${isDisabled ? " disabled" : ""}>
        <SelectTrigger id="framework-select"${sizeAttr}${invalidAttr}>
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
        </SelectContent>
      </Select>
      ${
        isInvalid
          ? `<FieldError>A mandatory framework choice is required for workspace configuration.</FieldError>`
          : `<FieldDescription>Determines build configuration, SSR runtime, and routing defaults.</FieldDescription>`
      }
    </Field>
  );
}`;
  }, [structure, isInvalid, isDisabled, size]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleReset = () => {
    setStateMode("idle");
    setStructure("standard");
    setSize("default");
    setSelectedValue("react");
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
            onValueChange={(val) => {
              const next = val as typeof structure;
              setStructure(next);
              if (next === "with-image") {
                setSelectedValue("sarah");
              } else if (selectedValue === "sarah" || selectedValue === "alex" || selectedValue === "elena") {
                setSelectedValue("react");
              }
            }}
            options={[
              { value: "standard", label: "Standard List" },
              { value: "grouped", label: "Grouped" },
              { value: "with-image", label: "With Avatar / Image" },
            ]}
          />

          <StageControlSelect
            label="Size"
            value={size}
            onValueChange={(val) => setSize(val as typeof size)}
            options={[
              { value: "default", label: "Default (40px)" },
              { value: "sm", label: "Small (32px)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Value",
          value: effectiveValue ? `"${effectiveValue}"` : "null (placeholder)",
          variant: "success",
        },
        {
          label: "Status",
          value: isInvalid ? "Invalid (Dual Indicator)" : isDisabled ? "Disabled" : "Active",
          variant: isInvalid ? "warning" : "default",
        },
        {
          label: "Popup",
          value: "Portalled Liquid Glass",
          variant: "success",
        },
        {
          label: "A11y",
          value: "WAI-ARIA Listbox Pattern",
          variant: "success",
        },
      ]}
      code={generatedCode}
    >
      <div className="w-full max-w-sm mx-auto py-6">
        <Field id="stage-select-field" invalid={isInvalid} disabled={isDisabled}>
          <FieldLabel htmlFor="stage-select-trigger" required={isInvalid}>
            {structure === "with-image" ? "Project Lead / Assignee" : "Framework selection"}
          </FieldLabel>

          <Select
            value={effectiveValue}
            onValueChange={(val) => {
              setSelectedValue(val);
              if (stateMode === "placeholder") {
                setStateMode("idle");
              }
            }}
            disabled={isDisabled}
          >
            <SelectTrigger
              id="stage-select-trigger"
              size={size}
              aria-invalid={isInvalid ? "true" : undefined}
              aria-describedby={isInvalid ? "stage-select-err" : "stage-select-desc"}
            >
              <SelectValue placeholder={structure === "with-image" ? "Assign a team member..." : "Select a framework..."} />
            </SelectTrigger>

            <SelectContent>
              {structure === "standard" ? (
                <>
                  <SelectItem value="react">React 19</SelectItem>
                  <SelectItem value="vue">Vue 3.5</SelectItem>
                  <SelectItem value="svelte">Svelte 5</SelectItem>
                  <SelectItem value="angular">Angular 18</SelectItem>
                  <SelectItem value="nextjs">Next.js 16</SelectItem>
                </>
              ) : structure === "grouped" ? (
                <>
                  <SelectGroup>
                    <SelectLabel>Frontend Engine</SelectLabel>
                    <SelectItem value="react">React 19</SelectItem>
                    <SelectItem value="vue">Vue 3.5</SelectItem>
                    <SelectItem value="svelte">Svelte 5</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Backend Systems</SelectLabel>
                    <SelectItem value="rust">Rust (Axum)</SelectItem>
                    <SelectItem value="go">Go (Echo)</SelectItem>
                    <SelectItem value="node">Node.js</SelectItem>
                  </SelectGroup>
                </>
              ) : (
                <>
                  <SelectItem value="sarah">
                    <span className="flex items-center gap-2.5">
                      <span className="size-6 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-[10px] font-semibold text-white shadow-2xs">SJ</span>
                      <span className="flex flex-col text-left">
                        <span className="text-sm font-medium leading-none">Sarah Jenkins</span>
                        <span className="text-xs text-muted-foreground mt-0.5">Design Lead</span>
                      </span>
                    </span>
                  </SelectItem>
                  <SelectItem value="alex">
                    <span className="flex items-center gap-2.5">
                      <span className="size-6 rounded-full bg-gradient-to-tr from-violet-400 to-purple-600 flex items-center justify-center text-[10px] font-semibold text-white shadow-2xs">AR</span>
                      <span className="flex flex-col text-left">
                        <span className="text-sm font-medium leading-none">Alex Rivera</span>
                        <span className="text-xs text-muted-foreground mt-0.5">Systems Architect</span>
                      </span>
                    </span>
                  </SelectItem>
                  <SelectItem value="elena">
                    <span className="flex items-center gap-2.5">
                      <span className="size-6 rounded-full bg-gradient-to-tr from-rose-400 to-amber-500 flex items-center justify-center text-[10px] font-semibold text-white shadow-2xs">ER</span>
                      <span className="flex flex-col text-left">
                        <span className="text-sm font-medium leading-none">Elena Rostova</span>
                        <span className="text-xs text-muted-foreground mt-0.5">Engineering Lead</span>
                      </span>
                    </span>
                  </SelectItem>
                </>
              )}
            </SelectContent>
          </Select>

          {isInvalid ? (
            <FieldError id="stage-select-err">
              {structure === "with-image"
                ? "You must assign an owner before deploying."
                : "You must choose a valid framework before proceeding."}
            </FieldError>
          ) : (
            <FieldDescription id="stage-select-desc">
              Custom portalled popup with HaloUI liquid glass overlay and keyboard navigation.
            </FieldDescription>
          )}
        </Field>
      </div>
    </PreviewStageShell>
  );
}
