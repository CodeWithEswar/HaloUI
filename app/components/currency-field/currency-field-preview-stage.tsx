"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { CurrencyField } from "@/components/ui/currency-field";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function CurrencyFieldPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [configPreset, setConfigPreset] = React.useState<"usd-us" | "eur-de" | "inr-in" | "jpy-jp" | "gbp-gb">("usd-us");
  const [steppers, setSteppers] = React.useState<"none" | "right" | "split">("none");
  const [showCode, setShowCode] = React.useState<"no" | "yes">("yes");
  const [statePreset, setStatePreset] = React.useState<"interactive" | "invalid" | "disabled" | "readOnly">("interactive");

  const { currency, locale, label } = React.useMemo(() => {
    switch (configPreset) {
      case "usd-us":
        return { currency: "USD", locale: "en-US", label: "US Dollar (en-US)" };
      case "eur-de":
        return { currency: "EUR", locale: "de-DE", label: "Euro (de-DE)" };
      case "inr-in":
        return { currency: "INR", locale: "en-IN", label: "Indian Rupee (en-IN)" };
      case "jpy-jp":
        return { currency: "JPY", locale: "ja-JP", label: "Japanese Yen (ja-JP)" };
      case "gbp-gb":
        return { currency: "GBP", locale: "en-GB", label: "British Pound (en-GB)" };
    }
  }, [configPreset]);

  // The semantic numeric value is strictly preserved!
  const [value, setValue] = React.useState<number | null>(1234.5);

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";
  const isReadOnly = statePreset === "readOnly";
  const showCurrencyCode = showCode === "yes";

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const readOnlyAttr = isReadOnly ? " readOnly" : "";
    const showCodeAttr = showCurrencyCode ? " showCurrencyCode" : "";
    const steppersAttr = steppers !== "none" ? ` stepperPlacement="${steppers}"` : "";

    return `import { CurrencyField } from "@/components/ui/currency-field";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function MonetaryBudgetExample() {
  // Semantic value is strictly a JavaScript number or null
  const [amount, setAmount] = React.useState<number | null>(${value === null ? "null" : value});

  return (
    <Field id="budget-field"${invalidAttr}${disabledAttr}>
      <FieldLabel htmlFor="budget-input" className="font-semibold">
        Project Budget
      </FieldLabel>
      <FieldDescription>
        Enter total allocation in ${currency} (${locale} formatting).
      </FieldDescription>
      <CurrencyField
        id="budget-input"
        currency="${currency}"
        locale="${locale}"
        value={amount}
        onValueChange={setAmount}${showCodeAttr}${steppersAttr}${invalidAttr}${disabledAttr}${readOnlyAttr}
      />${
        isInvalid
          ? `\n      <FieldError>The amount exceeds approved budget thresholds.</FieldError>`
          : ""
      }
    </Field>
  );
}`;
  }, [currency, isDisabled, isInvalid, isReadOnly, locale, showCurrencyCode, steppers, value]);

  return (
    <PreviewStageShell
      title="Currency Field Interactive Stage"
      description="Evaluate locale-aware monetary presentation, ISO currency symbols, decimal preservation, and strict separation between semantic numbers and formatted strings."
      badge="Monetary Formatting Primitive"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Locale & Currency"
            value={configPreset}
            onValueChange={(val) => setConfigPreset(val as typeof configPreset)}
            options={[
              { value: "usd-us", label: "USD / en-US ($1,234.50)" },
              { value: "eur-de", label: "EUR / de-DE (1.234,50 €)" },
              { value: "inr-in", label: "INR / en-IN (₹1,234.50)" },
              { value: "jpy-jp", label: "JPY / ja-JP (￥1,235)" },
              { value: "gbp-gb", label: "GBP / en-GB (£1,234.50)" },
            ]}
          />

          <StageControlSelect
            label="Stepper Controls"
            value={steppers}
            onValueChange={(val) => setSteppers(val as typeof steppers)}
            options={[
              { value: "none", label: "None (Standard monetary)" },
              { value: "right", label: "Right Cluster" },
              { value: "split", label: "Split Steppers" },
            ]}
          />

          <StageControlSelect
            label="ISO Code Badge"
            value={showCode}
            onValueChange={(val) => setShowCode(val as typeof showCode)}
            options={[
              { value: "yes", label: "Visible Badge" },
              { value: "no", label: "Symbol Only" },
            ]}
          />

          <StageControlSelect
            label="State Variant"
            value={statePreset}
            onValueChange={(val) => setStatePreset(val as typeof statePreset)}
            options={[
              { value: "interactive", label: "Interactive (Normal)" },
              { value: "invalid", label: "Invalid State" },
              { value: "disabled", label: "Disabled (Locked)" },
              { value: "readOnly", label: "Read-Only (Selectable)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Semantic Numeric Value",
          value: value === null ? "null" : String(value),
          variant: "success",
        },
        {
          label: "Currency / Locale",
          value: `${currency} (${locale})`,
        },
        {
          label: "Caret Stability",
          value: "Guaranteed",
          variant: "success",
        },
        {
          label: "Conversion Policy",
          value: "Format Only (No FX)",
        },
      ]}
    >
      <div className="w-full max-w-sm mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-currency-field" invalid={isInvalid} disabled={isDisabled}>
            <div className="flex items-center justify-between gap-4 mb-2">
              <FieldLabel
                htmlFor="stage-currency-input"
                className="text-sm font-semibold tracking-tight text-foreground select-none"
              >
                Capital Investment
              </FieldLabel>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setValue(0)}
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded border border-border bg-muted/40 cursor-pointer"
                >
                  Set 0
                </button>
                <button
                  type="button"
                  onClick={() => setValue(null)}
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded border border-border bg-muted/40 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            <FieldDescription className="text-xs text-muted-foreground mb-3 select-none leading-relaxed">
              Format: {label}. Value remains numeric ({value === null ? "null" : value}).
            </FieldDescription>

            <CurrencyField
              id="stage-currency-input"
              currency={currency}
              locale={locale}
              value={value}
              onValueChange={setValue}
              showCurrencyCode={showCurrencyCode}
              stepperPlacement={steppers}
              disabled={isDisabled}
              readOnly={isReadOnly}
              invalid={isInvalid}
            />

            {isInvalid && (
              <FieldError className="mt-2.5 text-xs text-destructive">
                Entered amount exceeds authorized expenditure limits.
              </FieldError>
            )}

            <div className="mt-4 pt-3 border-t border-border/40 text-center">
              <span className="text-[11px] text-muted-foreground select-none">
                Formatting is not conversion • Consumers receive raw <code className="font-mono text-[10px]">number | null</code>
              </span>
            </div>
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
