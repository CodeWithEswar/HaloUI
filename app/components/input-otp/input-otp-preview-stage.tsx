"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

export function InputOTPPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [slotFormat, setSlotFormat] = React.useState<"6-grouped" | "4-digit" | "8-grouped">("6-grouped");
  const [statePreset, setStatePreset] = React.useState<"interactive" | "filled" | "invalid" | "disabled">("interactive");
  const [slotSize, setSlotSize] = React.useState<"sm" | "default" | "lg">("default");

  // Logical OTP Value
  const [value, setValue] = React.useState<string>("");

  const maxLength = slotFormat === "4-digit" ? 4 : slotFormat === "8-grouped" ? 8 : 6;

  // React to preset changes
  React.useEffect(() => {
    if (statePreset === "filled") {
      setValue(slotFormat === "4-digit" ? "7429" : slotFormat === "8-grouped" ? "49182736" : "381942");
    } else if (statePreset === "interactive") {
      setValue("");
    }
  }, [statePreset, slotFormat]);

  const isInvalid = statePreset === "invalid";
  const isDisabled = statePreset === "disabled";

  const handlePasteSynthetic = () => {
    const syntheticCode = slotFormat === "4-digit" ? "7429" : slotFormat === "8-grouped" ? "49182736" : "381942";
    setValue(syntheticCode);
  };

  const handleClear = () => {
    setValue("");
  };

  const generatedCode = React.useMemo(() => {
    const invalidAttr = isInvalid ? " invalid" : "";
    const disabledAttr = isDisabled ? " disabled" : "";
    const sizeAttr = slotSize !== "default" ? ` size="${slotSize}"` : "";

    if (slotFormat === "6-grouped") {
      return `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function VerificationCodeExample() {
  const [code, setCode] = React.useState("${value}");

  return (
    <Field id="otp-field"${invalidAttr}${disabledAttr}>
      <FieldLabel htmlFor="verification-code" className="font-semibold">
        Verification Code
      </FieldLabel>
      <FieldDescription>
        Enter the 6-digit verification code sent to your device.
      </FieldDescription>
      <InputOTP
        id="verification-code"
        maxLength={6}
        value={code}
        onChange={setCode}${sizeAttr}${invalidAttr}${disabledAttr}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>${
        isInvalid
          ? `\n      <FieldError>The verification code is incorrect or expired.</FieldError>`
          : ""
      }
    </Field>
  );
}`;
    }

    if (slotFormat === "4-digit") {
      return `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function PinCodeExample() {
  const [pin, setPin] = React.useState("${value}");

  return (
    <Field id="pin-field"${invalidAttr}${disabledAttr}>
      <FieldLabel htmlFor="pin-code" className="font-semibold">
        Security PIN
      </FieldLabel>
      <FieldDescription>
        Enter your 4-digit security PIN.
      </FieldDescription>
      <InputOTP
        id="pin-code"
        maxLength={4}
        value={pin}
        onChange={setPin}${sizeAttr}${invalidAttr}${disabledAttr}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>${
        isInvalid
          ? `\n      <FieldError>Invalid security PIN.</FieldError>`
          : ""
      }
    </Field>
  );
}`;
    }

    return `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Field, FieldLabel, FieldDescription${isInvalid ? ", FieldError" : ""} } from "@/components/ui/field";

export function ExtendedCodeExample() {
  const [code, setCode] = React.useState("${value}");

  return (
    <Field id="extended-otp-field"${invalidAttr}${disabledAttr}>
      <FieldLabel htmlFor="recovery-code" className="font-semibold">
        Recovery Code
      </FieldLabel>
      <FieldDescription>
        Enter the 8-character emergency recovery code.
      </FieldDescription>
      <InputOTP
        id="recovery-code"
        maxLength={8}
        value={code}
        onChange={setCode}${sizeAttr}${invalidAttr}${disabledAttr}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
          <InputOTPSlot index={6} />
          <InputOTPSlot index={7} />
        </InputOTPGroup>
      </InputOTP>${
        isInvalid
          ? `\n      <FieldError>Recovery code could not be verified.</FieldError>`
          : ""
      }
    </Field>
  );
}`;
  }, [isDisabled, isInvalid, slotFormat, slotSize, value]);

  return (
    <PreviewStageShell
      title="Input OTP Interactive Stage"
      description="Evaluate single-logical-input verification codes, clipboard paste mechanics, caret animation, and responsive slot layout across all backgrounds."
      badge="Single Logical Input Primitive"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Layout Format"
            value={slotFormat}
            onValueChange={(val) => setSlotFormat(val as typeof slotFormat)}
            options={[
              { value: "6-grouped", label: "6 Digits (3-3 Grouped)" },
              { value: "4-digit", label: "4 Digits (Continuous)" },
              { value: "8-grouped", label: "8 Digits (4-4 Grouped)" },
            ]}
          />

          <StageControlSelect
            label="State Variant"
            value={statePreset}
            onValueChange={(val) => setStatePreset(val as typeof statePreset)}
            options={[
              { value: "interactive", label: "Interactive (Empty)" },
              { value: "filled", label: "Filled (Synthetic Code)" },
              { value: "invalid", label: "Invalid + Focus" },
              { value: "disabled", label: "Disabled (Locked)" },
            ]}
          />

          <StageControlSelect
            label="Slot Dimensions"
            value={slotSize}
            onValueChange={(val) => setSlotSize(val as typeof slotSize)}
            options={[
              { value: "sm", label: "Small (32–36px)" },
              { value: "default", label: "Default (38–42px)" },
              { value: "lg", label: "Large (44–48px)" },
            ]}
          />
        </div>
      }
      telemetry={[
        {
          label: "Logical Value",
          value: value ? `"${value}"` : '""',
          variant: "success",
        },
        {
          label: "Filled Slots",
          value: `${value.length} / ${maxLength}`,
        },
        {
          label: "Focus Model",
          value: "1 Logical Tab Stop",
          variant: "success",
        },
        {
          label: "Autofill Hint",
          value: "one-time-code",
        },
      ]}
    >
      <div className="w-full max-w-md mx-auto p-4 sm:p-6 flex flex-col items-center">
        <div className="w-full p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <Field id="stage-otp-field" invalid={isInvalid} disabled={isDisabled}>
            <div className="flex items-center justify-between gap-4 mb-2">
              <FieldLabel
                htmlFor="stage-input-otp"
                className="text-sm font-semibold tracking-tight text-foreground select-none"
              >
                Verification Code
              </FieldLabel>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePasteSynthetic}
                  className="text-[11px] font-medium text-primary hover:text-primary/80 transition-colors px-2 py-0.5 rounded border border-primary/20 bg-primary/5 cursor-pointer"
                >
                  Paste Synthetic
                </button>
                {value.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors px-1.5 py-0.5 rounded border border-border bg-muted/30 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <FieldDescription className="text-xs text-muted-foreground mb-4 select-none">
              Enter the {maxLength}-digit code sent to your device. Try typing, Backspace, or Paste.
            </FieldDescription>

            <div className="flex justify-center py-2 overflow-x-auto max-w-full">
              {slotFormat === "6-grouped" && (
                <InputOTP
                  id="stage-input-otp"
                  maxLength={6}
                  value={value}
                  onChange={setValue}
                  disabled={isDisabled}
                  invalid={isInvalid}
                  size={slotSize}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}

              {slotFormat === "4-digit" && (
                <InputOTP
                  id="stage-input-otp"
                  maxLength={4}
                  value={value}
                  onChange={setValue}
                  disabled={isDisabled}
                  invalid={isInvalid}
                  size={slotSize}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              )}

              {slotFormat === "8-grouped" && (
                <InputOTP
                  id="stage-input-otp"
                  maxLength={8}
                  value={value}
                  onChange={setValue}
                  disabled={isDisabled}
                  invalid={isInvalid}
                  size={slotSize}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            </div>

            {isInvalid && (
              <FieldError className="mt-3 text-xs text-destructive flex items-center justify-center">
                The verification code is incorrect or expired.
              </FieldError>
            )}

            <div className="mt-4 pt-3 border-t border-border/40 text-center">
              <span className="text-[11px] text-muted-foreground select-none">
                Single DOM text input • Tab enters once • No fragile focus hopping
              </span>
            </div>
          </Field>
        </div>
      </div>
    </PreviewStageShell>
  );
}
