"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { FieldGroup } from "@/components/ui/field-group";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function FieldGroupPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Component Controls
  const [orientation, setOrientation] = React.useState<"vertical" | "horizontal">("vertical");
  const [fieldCount, setFieldCount] = React.useState<"2" | "3" | "4">("3");
  const [validationState, setValidationState] = React.useState<"none" | "middle-invalid">("none");

  // Form states
  const [firstName, setFirstName] = React.useState("Alex");
  const [lastName, setLastName] = React.useState("Morgan");
  const [email, setEmail] = React.useState("alex.morgan@company.com");
  const [phone, setPhone] = React.useState("+1 (555) 234-5678");
  const [copiedCode, setCopiedCode] = React.useState(false);

  const isMiddleInvalid = validationState === "middle-invalid";

  const generatedCode = React.useMemo(() => {
    const orientationProp =
      orientation === "horizontal" ? ' orientation="horizontal"' : "";

    return `import { FieldGroup } from "@/components/ui/field-group";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ContactFormGroup() {
  return (
    <FieldGroup${orientationProp}>
      <Field id="first-name">
        <FieldLabel htmlFor="first-name">First name</FieldLabel>
        <Input id="first-name" defaultValue="${firstName}" placeholder="First name" />
      </Field>

      <Field id="last-name">
        <FieldLabel htmlFor="last-name">Last name</FieldLabel>
        <Input id="last-name" defaultValue="${lastName}" placeholder="Last name" />
      </Field>

      <Field id="email"${isMiddleInvalid ? " invalid" : ""}>
        <FieldLabel htmlFor="email" required>
          Work email
        </FieldLabel>
        <Input
          id="email"
          type="email"
          defaultValue="${isMiddleInvalid ? "invalid-email" : email}"
          ${isMiddleInvalid ? 'aria-invalid="true"\n          aria-describedby="email-error"' : 'aria-describedby="email-description"'}
        />
        ${isMiddleInvalid ? `<FieldError id="email-error">
          Please enter a valid work email address.
        </FieldError>` : `<FieldDescription id="email-description">
          We use this address for critical workspace notifications.
        </FieldDescription>`}
      </Field>
    </FieldGroup>
  );
}`;
  }, [orientation, fieldCount, validationState, firstName, lastName, email, isMiddleInvalid]);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const resetStage = () => {
    setOrientation("vertical");
    setFieldCount("3");
    setValidationState("none");
    setFirstName("Alex");
    setLastName("Morgan");
    setEmail("alex.morgan@company.com");
    setPhone("+1 (555) 234-5678");
  };

  return (
    <PreviewStageShell
      title="Live Preview Stage"
      description="Inspect Field Group's vertical rhythm, responsive multi-column layout, and strictly isolated child validation across viewports and optical backgrounds."
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
          label: "Orientation",
          value: orientation.toUpperCase(),
          variant: "success",
        },
        {
          label: "HTML Tag",
          value: "<div> (Neutral)",
          variant: "success",
        },
        {
          label: "Validation",
          value: isMiddleInvalid ? "Isolated to Child" : "Valid (Neutral)",
          variant: isMiddleInvalid ? "warning" : "success",
        },
        {
          label: "Surface",
          value: "Transparent Layout",
        },
      ]}
      controls={
        <div className="w-full grid grid-cols-1 min-[420px]:grid-cols-3 gap-2 sm:gap-2.5">
          <StageControlSelect
            label="Orientation"
            value={orientation}
            onValueChange={(val) => setOrientation(val as "vertical" | "horizontal")}
            options={[
              { label: "Vertical (Default)", value: "vertical" },
              { label: "Horizontal (Grid)", value: "horizontal" },
            ]}
          />

          <StageControlSelect
            label="Field Count"
            value={fieldCount}
            onValueChange={(val) => setFieldCount(val as "2" | "3" | "4")}
            options={[
              { label: "2 Fields", value: "2" },
              { label: "3 Fields", value: "3" },
              { label: "4 Fields", value: "4" },
            ]}
          />

          <StageControlSelect
            label="Validation"
            value={validationState}
            onValueChange={(val) => setValidationState(val as "none" | "middle-invalid")}
            options={[
              { label: "All Valid", value: "none" },
              { label: "Middle Invalid", value: "middle-invalid" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-lg mx-auto p-4 sm:p-6">
        <div className="p-5 sm:p-7 rounded-2xl border border-white/60 dark:border-white/15 bg-white/55 dark:bg-neutral-950/55 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.14)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all">
          <FieldGroup orientation={orientation}>
            {/* Field 1 */}
            <Field id="stage-first-name">
              <FieldLabel htmlFor="stage-first-name">First name</FieldLabel>
              <Input
                id="stage-first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
            </Field>

            {/* Field 2 */}
            <Field
              id="stage-second-field"
              invalid={isMiddleInvalid && fieldCount !== "2"}
            >
              <FieldLabel
                htmlFor="stage-second-field"
                required={isMiddleInvalid && fieldCount !== "2"}
              >
                {fieldCount === "2" ? "Last name" : "Work email"}
              </FieldLabel>
              <Input
                id="stage-second-field"
                type={fieldCount === "2" ? "text" : "email"}
                value={
                  fieldCount === "2"
                    ? lastName
                    : isMiddleInvalid
                    ? "alex.invalid-domain"
                    : email
                }
                onChange={(e) => {
                  if (fieldCount === "2") setLastName(e.target.value);
                  else setEmail(e.target.value);
                }}
                aria-invalid={
                  isMiddleInvalid && fieldCount !== "2" ? "true" : undefined
                }
                aria-describedby={
                  isMiddleInvalid && fieldCount !== "2"
                    ? "stage-second-error"
                    : "stage-second-desc"
                }
              />
              {isMiddleInvalid && fieldCount !== "2" ? (
                <FieldError id="stage-second-error">
                  Please enter a valid work email address.
                </FieldError>
              ) : (
                <FieldDescription id="stage-second-desc">
                  {fieldCount === "2"
                    ? "Your family or legal surname."
                    : "Primary communication and sign-in email."}
                </FieldDescription>
              )}
            </Field>

            {/* Field 3 */}
            {(fieldCount === "3" || fieldCount === "4") && (
              <Field id="stage-third-field">
                <FieldLabel htmlFor="stage-third-field">
                  {fieldCount === "3" ? "Last name" : "Phone number"}
                </FieldLabel>
                <Input
                  id="stage-third-field"
                  value={fieldCount === "3" ? lastName : phone}
                  onChange={(e) => {
                    if (fieldCount === "3") setLastName(e.target.value);
                    else setPhone(e.target.value);
                  }}
                  placeholder={fieldCount === "3" ? "Last name" : "+1 (555) 000-0000"}
                />
              </Field>
            )}

            {/* Field 4 */}
            {fieldCount === "4" && (
              <Field id="stage-fourth-field">
                <FieldLabel htmlFor="stage-fourth-field">Organization</FieldLabel>
                <Input
                  id="stage-fourth-field"
                  defaultValue="Acme Systems Corp."
                  placeholder="Company name"
                />
              </Field>
            )}
          </FieldGroup>
        </div>
      </div>
    </PreviewStageShell>
  );
}
