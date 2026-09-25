"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import {
  Search01Icon,
  Copy01Icon,
  Tick02Icon,
  Cancel01Icon,
  Globe02Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function InputGroupPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [addonConfig, setAddonConfig] = React.useState<
    "prefix" | "suffix" | "both" | "icon-search" | "action-button"
  >("prefix");
  const [stateMode, setStateMode] = React.useState<"idle" | "invalid" | "disabled">("idle");
  const [inputValue, setInputValue] = React.useState("company.design");
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedAction, setCopiedAction] = React.useState(false);

  const isInvalid = stateMode === "invalid";
  const isDisabled = stateMode === "disabled";

  const handleCopyAction = () => {
    navigator.clipboard.writeText(inputValue);
    setCopiedAction(true);
    setTimeout(() => setCopiedAction(false), 2000);
  };

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? ' aria-invalid="true"' : "";
    const disabledAttr = isDisabled ? " disabled" : "";

    if (addonConfig === "prefix") {
      return `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";

export function WebsiteUrlField() {
  return (
    <Field id="domain-url"${isInvalid ? " invalid" : ""}>
      <FieldLabel htmlFor="domain-url"${isInvalid ? " required" : ""}>Company website</FieldLabel>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText className="font-mono text-xs">https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id="domain-url"
          placeholder="example.com"
          defaultValue="${isInvalid ? "invalid-domain" : inputValue}"${invalidAttr}${disabledAttr}
          aria-describedby="${isInvalid ? "domain-error" : "domain-desc"}"
        />
      </InputGroup>
      ${
        isInvalid
          ? `<FieldError id="domain-error">Please enter a valid hostname without scheme.</FieldError>`
          : `<FieldDescription id="domain-desc">Prefix is contextual UI; submitted value contains host only.</FieldDescription>`
      }
    </Field>
  );
}`;
    }

    if (addonConfig === "suffix") {
      return `import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";

export function HandleField() {
  return (
    <Field id="handle-field"${isInvalid ? " invalid" : ""}>
      <FieldLabel htmlFor="handle-field">Workspace handle</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="handle-field"
          placeholder="acme"
          defaultValue="acme"${invalidAttr}${disabledAttr}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText className="font-mono text-xs">.haloui.dev</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Subdomain allocated under HaloUI managed infrastructure.</FieldDescription>
    </Field>
  );
}`;
    }

    if (addonConfig === "both") {
      return `import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";

export function AmountField() {
  return (
    <Field id="amount-field"${isInvalid ? " invalid" : ""}>
      <FieldLabel htmlFor="amount-field">Budget allocation</FieldLabel>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id="amount-field"
          placeholder="10,000"
          defaultValue="10,000"${invalidAttr}${disabledAttr}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText className="font-mono text-xs">USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}`;
    }

    if (addonConfig === "icon-search") {
      return `import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton
} from "@/components/ui/input-group";
import { Search01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function SearchGroup() {
  return (
    <Field id="search-input">
      <FieldLabel htmlFor="search-input">Global search</FieldLabel>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <HaloIcon icon={Search01Icon} size={16} className="text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupInput
          id="search-input"
          type="search"
          placeholder="Search components..."${invalidAttr}${disabledAttr}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Clear search input"
          >
            <HaloIcon icon={Cancel01Icon} size={14} />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}`;
    }

    return `import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton
} from "@/components/ui/input-group";
import { Copy01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function SecretTokenField() {
  return (
    <Field id="token-field"${isInvalid ? " invalid" : ""}>
      <FieldLabel htmlFor="token-field">API Key</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="token-field"
          readOnly
          defaultValue="halo_live_99f2b84"
          className="font-mono text-xs"${invalidAttr}${disabledAttr}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            variant="outline"
            size="xs"
            aria-label="Copy API key"
            className="gap-1.5"
          >
            <HaloIcon icon={Copy01Icon} size={13} />
            <span>Copy</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}`;
  }, [addonConfig, stateMode, inputValue, isInvalid, isDisabled]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const resetStage = () => {
    setAddonConfig("prefix");
    setStateMode("idle");
    setInputValue("company.design");
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Compose canonical single-line Input with prefixes, suffixes, icons, and independent action buttons inside a unified 10-layer optical liquid glass boundary."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      onReset={resetStage}
      onCopy={copyCodeToClipboard}
      copied={copiedCode}
      telemetry={[
        {
          label: "Structure",
          value: "InputGroup + Input (Canonical)",
          variant: "success",
        },
        {
          label: "Group Focus",
          value: "has-[control:focus-visible]",
          variant: "success",
        },
        {
          label: "Action Focus",
          value: "Isolated & Unclipped",
          variant: "success",
        },
        {
          label: "Runtime",
          value: "0ms (Server Component)",
        },
      ]}
      controls={
        <div className="w-full grid grid-cols-1 min-[420px]:grid-cols-2 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Composition Pattern"
            value={addonConfig}
            onValueChange={(val) => {
              setAddonConfig(val as any);
              if (val === "prefix") setInputValue("company.design");
              if (val === "suffix") setInputValue("acme");
              if (val === "both") setInputValue("10,000");
              if (val === "icon-search") setInputValue("components/input");
              if (val === "action-button") setInputValue("halo_live_99f2b84a92c0182");
            }}
            options={[
              { label: "Prefix (https://)", value: "prefix" },
              { label: "Suffix (.haloui.dev)", value: "suffix" },
              { label: "Prefix & Suffix ($ ... USD)", value: "both" },
              { label: "Search Icon + Clear Action", value: "icon-search" },
              { label: "Read-only + Copy Action", value: "action-button" },
            ]}
          />

          <StageControlSelect
            label="Interaction State"
            value={stateMode}
            onValueChange={(val) => setStateMode(val as any)}
            options={[
              { label: "Valid / Rest", value: "idle" },
              { label: "Invalid State", value: "invalid" },
              { label: "Disabled", value: "disabled" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-md mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/55 dark:bg-neutral-950/55 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-input-group" invalid={isInvalid} disabled={isDisabled}>
            <FieldLabel htmlFor="stage-input-group-control" required={isInvalid}>
              {addonConfig === "prefix"
                ? "Company website"
                : addonConfig === "suffix"
                ? "Workspace subdomain"
                : addonConfig === "both"
                ? "Allocated budget"
                : addonConfig === "icon-search"
                ? "Search directory"
                : "Live API secret"}
            </FieldLabel>

            <InputGroup>
              {addonConfig === "prefix" && (
                <InputGroupAddon align="inline-start">
                  <InputGroupText className="font-mono text-xs">https://</InputGroupText>
                </InputGroupAddon>
              )}

              {addonConfig === "both" && (
                <InputGroupAddon align="inline-start">
                  <InputGroupText className="font-semibold">$</InputGroupText>
                </InputGroupAddon>
              )}

              {addonConfig === "icon-search" && (
                <InputGroupAddon align="inline-start">
                  <HaloIcon icon={Search01Icon} size={16} className="text-muted-foreground" />
                </InputGroupAddon>
              )}

              <InputGroupInput
                id="stage-input-group-control"
                disabled={isDisabled}
                aria-invalid={isInvalid ? "true" : undefined}
                value={isInvalid ? "invalid-token-signature" : inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                readOnly={addonConfig === "action-button"}
                placeholder={
                  addonConfig === "prefix"
                    ? "company.design"
                    : addonConfig === "icon-search"
                    ? "Search docs..."
                    : "Enter value..."
                }
                aria-describedby={isInvalid ? "stage-ig-err" : "stage-ig-desc"}
                className={addonConfig === "action-button" ? "font-mono text-xs" : undefined}
              />

              {addonConfig === "suffix" && (
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="font-mono text-xs">.haloui.dev</InputGroupText>
                </InputGroupAddon>
              )}

              {addonConfig === "both" && (
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="font-mono text-xs">USD</InputGroupText>
                </InputGroupAddon>
              )}

              {addonConfig === "icon-search" && inputValue.length > 0 && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setInputValue("")}
                    aria-label="Clear search input"
                  >
                    <HaloIcon icon={Cancel01Icon} size={14} />
                  </InputGroupButton>
                </InputGroupAddon>
              )}

              {addonConfig === "action-button" && (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    variant="outline"
                    size="xs"
                    onClick={handleCopyAction}
                    aria-label={copiedAction ? "Copied" : "Copy token"}
                    className="gap-1.5"
                  >
                    <HaloIcon
                      icon={copiedAction ? Tick02Icon : Copy01Icon}
                      size={13}
                      className={copiedAction ? "text-emerald-500" : ""}
                    />
                    <span>{copiedAction ? "Copied" : "Copy"}</span>
                  </InputGroupButton>
                </InputGroupAddon>
              )}
            </InputGroup>

            {isInvalid ? (
              <FieldError id="stage-ig-err">
                The input format does not satisfy security protocol standards.
              </FieldError>
            ) : (
              <FieldDescription id="stage-ig-desc">
                {addonConfig === "prefix"
                  ? "The prefix is purely visual decoration; submitted value contains the domain only."
                  : "Decorations and interactive actions share the optical boundary without altering form data."}
              </FieldDescription>
            )}
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
