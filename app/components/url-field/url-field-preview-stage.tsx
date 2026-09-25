"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  URLField,
  type URLValueDetails,
} from "@/components/ui/url-field";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function URLFieldPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [statePreset, setStatePreset] = React.useState<"interactive" | "invalid" | "disabled" | "readOnly">("interactive");
  const [iconOption, setIconOption] = React.useState<"link" | "globe" | "none">("link");
  const [normalizeOption, setNormalizeOption] = React.useState<"enabled" | "disabled">("enabled");

  // URL value & details
  const [urlValue, setUrlValue] = React.useState<string>("https://example.com/docs");
  const [details, setDetails] = React.useState<URLValueDetails>({
    raw: "https://example.com/docs",
    normalized: "https://example.com/docs",
    isSyntacticallyValid: true,
    protocol: "https:",
    hostname: "example.com",
    pathname: "/docs",
  });

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";
  const isReadOnly = statePreset === "readOnly";
  const showIcon = iconOption !== "none";
  const iconChoice = iconOption === "globe" ? "globe" : "link";
  const normalizeOnBlur = normalizeOption === "enabled";

  const handleValueChange = (val: string, d: URLValueDetails) => {
    setUrlValue(val);
    setDetails(d);
  };

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const readOnlyAttr = isReadOnly ? " readOnly" : "";
    const normAttr = normalizeOnBlur ? " normalizeOnBlur" : "";
    const iconAttr = iconOption !== "link" ? ` showIcon={${showIcon}}${showIcon ? ` icon="${iconChoice}"` : ""}` : "";

    return `import { URLField } from "@/components/ui/url-field";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function WebsiteUrlExample() {
  const [url, setUrl] = React.useState<string>("${urlValue}");

  return (
    <Field id="website-url-field"${invalidAttr}${disabledAttr}>
      <FieldLabel htmlFor="website-url-input" className="font-semibold">
        Website
      </FieldLabel>
      <FieldDescription>
        Enter the full URL for your website.
      </FieldDescription>
      <URLField
        id="website-url-input"
        value={url}
        onValueChange={(val, details) => {
          setUrl(val);
          // Syntactic validity: details.isSyntacticallyValid
          // Parsed hostname: details.hostname
        }}${normAttr}${iconAttr}${invalidAttr}${disabledAttr}${readOnlyAttr}
      />${
        isInvalid
          ? `\n      <FieldError>Please enter a valid URL with an http:// or https:// protocol.</FieldError>`
          : ""
      }
    </Field>
  );
}`;
  }, [iconChoice, iconOption, isDisabled, isInvalid, isReadOnly, normalizeOnBlur, showIcon, urlValue]);





  return (
    <PreviewStageShell
      title="URL Field Interactive Stage"
      description="Evaluate browser-friendly URL input semantics, syntactic parsing via the platform URL API, optional normalization on blur, caret preservation, and long structured URLs."
      badge="URL Text-Entry Primitive"
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
            label="Leading Icon"
            value={iconOption}
            onValueChange={(val) => setIconOption(val as typeof iconOption)}
            options={[
              { value: "link", label: "Link Icon (Link01)" },
              { value: "globe", label: "Globe Icon (Globe02)" },
              { value: "none", label: "None (Hidden)" },
            ]}
          />

          <StageControlSelect
            label="Normalize on Blur"
            value={normalizeOption}
            onValueChange={(val) => setNormalizeOption(val as typeof normalizeOption)}
            options={[
              { value: "enabled", label: "Enabled (Prepend https://)" },
              { value: "disabled", label: "Disabled (Preserve raw)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Syntactic Validity",
          value: details.isSyntacticallyValid ? "Valid URL Syntax" : "Invalid Syntax / Scheme",
          variant: details.isSyntacticallyValid ? "success" : "default",
        },
        {
          label: "Parsed Protocol",
          value: details.protocol || "none",
          variant: details.protocol ? "success" : "default",
        },
        {
          label: "Parsed Hostname",
          value: details.hostname || "none",
          variant: details.hostname ? "success" : "default",
        },
        {
          label: "Network Reachability",
          value: "Not tested (No network calls)",
        },
      ]}
    >
      <div className="w-full max-w-sm mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-url-field" invalid={isInvalid} disabled={isDisabled}>
            <div className="flex items-center justify-between gap-4 mb-2">
              <FieldLabel
                htmlFor="stage-url-input"
                className="text-sm font-semibold tracking-tight text-foreground select-none"
              >
                Website
              </FieldLabel>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    const sample = "https://example.com/docs";
                    setUrlValue(sample);
                    setDetails({
                      raw: sample,
                      normalized: sample,
                      isSyntacticallyValid: true,
                      protocol: "https:",
                      hostname: "example.com",
                      pathname: "/docs",
                    });
                  }}
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded border border-border bg-muted/40 cursor-pointer"
                >
                  Docs
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const sample = "https://example.com:8443/api?key=demo#auth";
                    setUrlValue(sample);
                    setDetails({
                      raw: sample,
                      normalized: sample,
                      isSyntacticallyValid: true,
                      protocol: "https:",
                      hostname: "example.com",
                      port: "8443",
                      pathname: "/api",
                      search: "?key=demo",
                      hash: "#auth",
                    });
                  }}
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded border border-border bg-muted/40 cursor-pointer"
                >
                  Complex
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUrlValue("");
                    setDetails({
                      raw: "",
                      isSyntacticallyValid: false,
                    });
                  }}
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded border border-border bg-muted/40 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            <FieldDescription className="text-xs text-muted-foreground mb-3 select-none leading-relaxed">
              Enter the full URL for your website.
            </FieldDescription>

            <URLField
              id="stage-url-input"
              value={urlValue}
              onValueChange={handleValueChange}
              normalizeOnBlur={normalizeOnBlur}
              showIcon={showIcon}
              icon={iconChoice}
              disabled={isDisabled}
              readOnly={isReadOnly}
              invalid={isInvalid}
            />

            {isInvalid && (
              <FieldError className="mt-2.5 text-xs text-destructive">
                Please enter a valid URL with an http:// or https:// protocol.
              </FieldError>
            )}

            <div className="mt-4 pt-3 border-t border-border/40 text-center">
              <span className="text-[11px] text-muted-foreground select-none">
                Syntax checking only • No DNS resolution or network requests
              </span>
            </div>
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
