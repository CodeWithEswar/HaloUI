"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  PhoneField,
  type PhoneValueDetails,
  type CountryCode,
} from "@/components/ui/phone-field";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function PhoneFieldPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [country, setCountry] = React.useState<CountryCode>("US");
  const [statePreset, setStatePreset] = React.useState<"interactive" | "invalid" | "disabled" | "readOnly">("interactive");
  const [countrySelectEnabled, setCountrySelectEnabled] = React.useState<"enabled" | "disabled">("enabled");

  // Phone value & details state
  const [phoneValue, setPhoneValue] = React.useState<string>("(415) 555-2671");
  const [details, setDetails] = React.useState<PhoneValueDetails>({
    raw: "4155552671",
    formatted: "(415) 555-2671",
    e164: "+14155552671",
    country: "US",
    countryCallingCode: "1",
    isPossible: true,
    isValid: true,
  });

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";
  const isReadOnly = statePreset === "readOnly";
  const disableCountrySelect = countrySelectEnabled === "disabled";

  const handleValueChange = (val: string, d: PhoneValueDetails) => {
    setPhoneValue(val);
    setDetails(d);
  };

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const readOnlyAttr = isReadOnly ? " readOnly" : "";
    const disableSelectAttr = disableCountrySelect ? " disableCountrySelect" : "";

    return `import { PhoneField } from "@/components/ui/phone-field";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function ContactPhoneExample() {
  const [phone, setPhone] = React.useState<string>("${phoneValue}");

  return (
    <Field id="contact-phone-field"${invalidAttr}${disabledAttr}>
      <FieldLabel htmlFor="contact-phone-input" className="font-semibold">
        Phone number
      </FieldLabel>
      <FieldDescription>
        Include a number where you can receive account-related calls or messages.
      </FieldDescription>
      <PhoneField
        id="contact-phone-input"
        defaultCountry="${country}"
        value={phone}
        onValueChange={(val, details) => {
          setPhone(val);
          // Normalized E.164: details.e164 (e.g. "+14155552671")
          // Numbering plan validity: details.isValid
        }}${disableSelectAttr}${invalidAttr}${disabledAttr}${readOnlyAttr}
      />${
        isInvalid
          ? `\n      <FieldError>Please provide a complete and valid telephone number.</FieldError>`
          : ""
      }
    </Field>
  );
}`;
  }, [country, disableCountrySelect, isDisabled, isInvalid, isReadOnly, phoneValue]);

  return (
    <PreviewStageShell
      title="Phone Field Interactive Stage"
      description="Evaluate structured international phone-number entry, country context selection, As-You-Type formatting, E.164 normalization, and caret stability."
      badge="Telephone Identifier Primitive"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Default Country Context"
            value={country}
            onValueChange={(val) => setCountry(val as CountryCode)}
            options={[
              { value: "US", label: "United States (+1)" },
              { value: "GB", label: "United Kingdom (+44)" },
              { value: "DE", label: "Germany (+49)" },
              { value: "IN", label: "India (+91)" },
              { value: "JP", label: "Japan (+81)" },
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

          <StageControlSelect
            label="Country Selector"
            value={countrySelectEnabled}
            onValueChange={(val) => setCountrySelectEnabled(val as typeof countrySelectEnabled)}
            options={[
              { value: "enabled", label: "Enabled (Visible)" },
              { value: "disabled", label: "Disabled (Hidden)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Normalized E.164",
          value: details.e164 || "none",
          variant: details.e164 ? "success" : "default",
        },
        {
          label: "Metadata Validity",
          value: details.isValid
            ? "Valid (Numbering Plan)"
            : details.isPossible
            ? "Possible Length"
            : "Incomplete",
          variant: details.isValid ? "success" : details.isPossible ? "warning" : "default",
        },
        {
          label: "Ownership Status",
          value: "Unverified (Syntax only)",
        },
        {
          label: "Caret Stability",
          value: "Preserved (As-You-Type)",
          variant: "success",
        },
      ]}
    >
      <div className="w-full max-w-sm mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-phone-field" invalid={isInvalid} disabled={isDisabled}>
            <div className="flex items-center justify-between gap-4 mb-2">
              <FieldLabel
                htmlFor="stage-phone-input"
                className="text-sm font-semibold tracking-tight text-foreground select-none"
              >
                Phone number
              </FieldLabel>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setPhoneValue("(415) 555-2671");
                    setCountry("US");
                    setDetails({
                      raw: "4155552671",
                      formatted: "(415) 555-2671",
                      e164: "+14155552671",
                      country: "US",
                      countryCallingCode: "1",
                      isPossible: true,
                      isValid: true,
                    });
                  }}
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded border border-border bg-muted/40 cursor-pointer"
                >
                  US Demo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhoneValue("+44 20 7946 0919");
                    setCountry("GB");
                    setDetails({
                      raw: "+442079460919",
                      formatted: "+44 20 7946 0919",
                      e164: "+442079460919",
                      country: "GB",
                      countryCallingCode: "44",
                      isPossible: true,
                      isValid: true,
                    });
                  }}
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded border border-border bg-muted/40 cursor-pointer"
                >
                  UK Demo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhoneValue("");
                    setDetails({
                      raw: "",
                      formatted: "",
                      isPossible: false,
                      isValid: false,
                    });
                  }}
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded border border-border bg-muted/40 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            <FieldDescription className="text-xs text-muted-foreground mb-3 select-none leading-relaxed">
              Include a number where you can receive account-related calls or messages.
            </FieldDescription>

            <PhoneField
              id="stage-phone-input"
              defaultCountry={country}
              country={country}
              onCountryChange={setCountry}
              value={phoneValue}
              onValueChange={handleValueChange}
              disableCountrySelect={disableCountrySelect}
              disabled={isDisabled}
              readOnly={isReadOnly}
              invalid={isInvalid}
            />

            {isInvalid && (
              <FieldError className="mt-2.5 text-xs text-destructive">
                Please provide a complete and valid telephone number.
              </FieldError>
            )}

            <div className="mt-4 pt-3 border-t border-border/40 text-center">
              <span className="text-[11px] text-muted-foreground select-none">
                Formatting does not prove ownership • Normalized: <code className="font-mono text-[10px]">{details.e164 || "none"}</code>
              </span>
            </div>
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
