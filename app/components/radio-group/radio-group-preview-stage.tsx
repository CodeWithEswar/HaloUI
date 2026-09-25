"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Field, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export function RadioGroupPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [stateMode, setStateMode] = React.useState<
    "monthly" | "yearly" | "disabled-item" | "invalid" | "disabled"
  >("yearly");
  const [orientation, setOrientation] = React.useState<"vertical" | "horizontal">("vertical");

  // Selection state
  const [value, setValue] = React.useState<string>("yearly");

  // Sync state preset
  React.useEffect(() => {
    if (stateMode === "monthly") setValue("monthly");
    if (stateMode === "yearly") setValue("yearly");
    if (stateMode === "disabled-item") setValue("monthly");
    if (stateMode === "invalid") setValue("");
  }, [stateMode]);

  const isInvalid = stateMode === "invalid";
  const isDisabled = stateMode === "disabled";
  const hasDisabledItem = stateMode === "disabled-item";

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? ' invalid aria-invalid="true"' : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const orientAttr = orientation === "horizontal" ? ' orientation="horizontal"' : "";

    return `import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Field, FieldError } from "@/components/ui/field";

export function BillingPlanPicker() {
  const [plan, setPlan] = React.useState<string>("${value}");

  return (
    <Field id="plan-field"${invalidAttr}>
      <RadioGroup
        value={plan}
        onValueChange={setPlan}${orientAttr}${disabledAttr}${invalidAttr}
      >
        <RadioGroupLabel${isInvalid ? " required" : ""}>Subscription billing</RadioGroupLabel>
        <RadioGroupDescription>
          Select an invoice cadence for your team workspace.
        </RadioGroupDescription>

        <RadioGroupOption>
          <RadioGroupItem value="monthly" id="stage-monthly" />
          <Label htmlFor="stage-monthly" className="cursor-pointer">Monthly billing</Label>
        </RadioGroupOption>

        <RadioGroupOption>
          <RadioGroupItem value="quarterly" id="stage-quarterly"${hasDisabledItem ? " disabled" : ""} />
          <Label htmlFor="stage-quarterly"${hasDisabledItem ? ' className="cursor-not-allowed opacity-40"' : ' className="cursor-pointer"'}>
            Quarterly billing${hasDisabledItem ? " (Unavailable)" : ""}
          </Label>
        </RadioGroupOption>

        <RadioGroupOption>
          <RadioGroupItem value="yearly" id="stage-yearly" />
          <Label htmlFor="stage-yearly" className="cursor-pointer">Annual billing (Save 20%)</Label>
        </RadioGroupOption>
      </RadioGroup>
      ${
        isInvalid
          ? `
      <FieldError className="mt-3">
        Please select a billing cadence to provision your seats.
      </FieldError>`
          : ""
      }
    </Field>
  );
}`;
  }, [value, isInvalid, isDisabled, hasDisabledItem, orientation]);

  return (
    <PreviewStageShell
      title="Radio Group Interactive Stage"
      description="Evaluate mutually exclusive single selection with coordinated roving focus, arrow navigation, and optical liquid glass."
      badge="Mutually Exclusive"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="State Preset"
            value={stateMode}
            onValueChange={(val) => setStateMode(val as typeof stateMode)}
            options={[
              { value: "yearly", label: "Annual Selected" },
              { value: "monthly", label: "Monthly Selected" },
              { value: "disabled-item", label: "With Disabled Option" },
              { value: "invalid", label: "Invalid (Group Error)" },
              { value: "disabled", label: "Disabled (All Locked)" },
            ]}
          />

          <StageControlSelect
            label="Orientation"
            value={orientation}
            onValueChange={(val) => setOrientation(val as typeof orientation)}
            options={[
              { value: "vertical", label: "Vertical (Stack)" },
              { value: "horizontal", label: "Horizontal (Inline)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Value",
          value: value ? `"${value}"` : "none",
          variant: "success",
        },
        {
          label: "Selection",
          value: "1 of N (Exclusive)",
          variant: "success",
        },
        {
          label: "Layout",
          value: orientation === "vertical" ? "Vertical Stack" : "Horizontal Wrap",
          variant: "default",
        },
        {
          label: "A11y",
          value: "Roving Tabindex + Arrow Keys",
          variant: "success",
        },
      ]}
      code={generatedCode}
    >
      <div className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-radio-field" invalid={isInvalid} disabled={isDisabled}>
            <RadioGroup
              value={value}
              onValueChange={(nextVal) => {
                setValue(nextVal);
                if (stateMode === "invalid" && nextVal) {
                  setStateMode(nextVal === "monthly" ? "monthly" : "yearly");
                }
              }}
              orientation={orientation}
              disabled={isDisabled}
              invalid={isInvalid}
            >
              <RadioGroupLabel required={isInvalid}>Subscription billing</RadioGroupLabel>
              <RadioGroupDescription>
                Select an invoice cadence for your team workspace.
              </RadioGroupDescription>

              <RadioGroupOption>
                <RadioGroupItem value="monthly" id="stage-radio-monthly" className="mt-0.5" />
                <div className="grid gap-1 leading-none">
                  <Label htmlFor="stage-radio-monthly" className="text-sm font-medium text-foreground cursor-pointer select-none">
                    Monthly billing
                  </Label>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    $24 per seat per month. Invoiced at start of period.
                  </span>
                </div>
              </RadioGroupOption>

              <RadioGroupOption>
                <RadioGroupItem
                  value="quarterly"
                  id="stage-radio-quarterly"
                  disabled={hasDisabledItem}
                  className="mt-0.5"
                />
                <div className="grid gap-1 leading-none">
                  <Label
                    htmlFor="stage-radio-quarterly"
                    className={cn(
                      "text-sm font-medium text-foreground select-none",
                      hasDisabledItem ? "cursor-not-allowed opacity-40" : "cursor-pointer"
                    )}
                  >
                    Quarterly billing {hasDisabledItem && "(Full)"}
                  </Label>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    $60 per seat per quarter with standard queue.
                  </span>
                </div>
              </RadioGroupOption>

              <RadioGroupOption>
                <RadioGroupItem value="yearly" id="stage-radio-yearly" className="mt-0.5" />
                <div className="grid gap-1 leading-none">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="stage-radio-yearly" className="text-sm font-medium text-foreground cursor-pointer select-none">
                      Annual billing
                    </Label>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      Save 20%
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    $192 per seat per year. Best for stable teams.
                  </span>
                </div>
              </RadioGroupOption>
            </RadioGroup>

            {isInvalid && (
              <FieldError className="mt-3">
                Please choose a subscription cadence to provision your seats.
              </FieldError>
            )}
          </Field>
        </div>
      </div>

    </PreviewStageShell>
  );
}
