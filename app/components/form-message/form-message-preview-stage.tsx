"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type StageBackdrop,
} from "@/components/docs/preview-stage-shell";
import { FormMessage, type FormMessageType } from "@/components/ui/form-message";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function FormMessagePreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<StageBackdrop>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Stage controls
  const [messageType, setMessageType] = React.useState<FormMessageType>("error");
  const [showIcon, setShowIcon] = React.useState<boolean>(true);
  const [contentLength, setContentLength] = React.useState<"concise" | "detailed">("concise");

  const messageText = React.useMemo(() => {
    if (contentLength === "detailed") {
      switch (messageType) {
        case "error":
          return "The requested cluster namespace exceeds policy quota limits. Please choose an authorized partition identifier or request elevated infrastructure quotas from your site reliability team.";
        case "success":
          return "Certificate chain verified successfully. TLS 1.3 edge termination active with automated renewal enabled through the primary authority.";
        case "warning":
          return "This API key has read-only cluster permissions. Write transactions, schema migrations, and deployment invocations will be rejected.";
        case "info":
          return "Changes will be staged immediately in your development workspace and synchronized with remote branches on your next commit.";
      }
    }

    switch (messageType) {
      case "error":
        return "Please enter a valid work email address.";
      case "success":
        return "Username is available and reserved.";
      case "warning":
        return "Password strength is fair. Consider adding numbers.";
      case "info":
        return "You can change this handle at any time in settings.";
    }
  }, [messageType, contentLength]);

  const generatedCode = React.useMemo(() => {
    const isInvalid = messageType === "error";
    const invalidAttr = isInvalid ? " invalid" : "";
    const iconAttr = !showIcon ? " showIcon={false}" : "";
    const typeAttr = messageType !== "error" ? ` type="${messageType}"` : "";

    return `import * as React from "react";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/ui/form-message";

export function ProfileField() {
  const [value, setValue] = React.useState("alex.dev");

  return (
    <Field id="user-email"${invalidAttr}>
      <FieldLabel className="font-semibold">Work Email</FieldLabel>
      <FieldDescription>Used for two-factor authentication and security alerts.</FieldDescription>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="alex@acme.corp"
      />
      <FormMessage${typeAttr}${iconAttr}>
        ${messageText}
      </FormMessage>
    </Field>
  );
}`;
  }, [messageType, showIcon, messageText]);

  return (
    <PreviewStageShell
      title="Form Message Interactive Stage"
      description="Evaluate semantic field-level feedback tones (error, success, warning, info), Hugeicons integration, automatic Field association, and responsive wrapping."
      badge="Forms & Fields 34"
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
            label="Message Tone"
            value={messageType}
            onValueChange={(val) => setMessageType(val as FormMessageType)}
            options={[
              { value: "error", label: "Error (Invalid Field)" },
              { value: "success", label: "Success (Positive)" },
              { value: "warning", label: "Warning (Cautionary)" },
              { value: "info", label: "Info (Guidance)" },
            ]}
          />

          <StageControlSelect
            label="Icon Affordance"
            value={showIcon ? "with-icon" : "no-icon"}
            onValueChange={(val) => setShowIcon(val === "with-icon")}
            options={[
              { value: "with-icon", label: "With Semantic Icon" },
              { value: "no-icon", label: "Text Only (No Icon)" },
            ]}
          />

          <StageControlSelect
            label="Content Length"
            value={contentLength}
            onValueChange={(val) => setContentLength(val as "concise" | "detailed")}
            options={[
              { value: "concise", label: "Concise (Single Line)" },
              { value: "detailed", label: "Detailed (Multi-line Wrap)" },
            ]}
          />
        </div>
      }
    >
      <div className="w-full max-w-sm mx-auto py-8">
        <Field id="user-email-preview" invalid={messageType === "error"}>
          <FieldLabel className="font-semibold text-sm">Deployment Target</FieldLabel>
          <FieldDescription>Cluster namespace and region.</FieldDescription>
          <div className="pt-1.5 pb-2">
            <Input
              defaultValue="production-us-east-1"
              placeholder="e.g. staging-eu-west-1"
              aria-label="Deployment Target"
            />
          </div>
          <FormMessage
            key={`${messageType}-${contentLength}-${showIcon}`}
            type={messageType}
            showIcon={showIcon}
          >
            {messageText}
          </FormMessage>
        </Field>
      </div>
    </PreviewStageShell>
  );
}
