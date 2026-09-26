"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
  type StepStatus,
} from "@/components/ui/stepper";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  UserIcon,
  Settings01Icon,
  CheckmarkBadge01Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function StepperPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [intensity, setIntensity] = React.useState<"subtle" | "balanced" | "rich">("subtle");
  const [orientation, setOrientation] = React.useState<"horizontal" | "vertical">("horizontal");
  const [interactive, setInteractive] = React.useState<boolean>(true);
  const [linear, setLinear] = React.useState<boolean>(true);
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [activeStep, setActiveStep] = React.useState<string>("profile");

  const handleReset = React.useCallback(() => {
    setActiveTab("preview");
    setBackdrop("neutral");
    setViewport("desktop");
    setIntensity("subtle");
    setOrientation("horizontal");
    setInteractive(true);
    setLinear(true);
    setHasError(false);
    setActiveStep("profile");
  }, []);

  const generatedCode = React.useMemo(() => {
    return `import {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
} from "@/components/ui/stepper";

export function OnboardingProcess() {
  const [activeStep, setActiveStep] = React.useState("${activeStep}");

  return (
    <Stepper
      value={activeStep}
      onValueChange={setActiveStep}
      orientation="${orientation}"
      interactive={${interactive}}
      linear={${linear}}
      intensity="${intensity}"
    >
      <StepperList>
        <StepperItem value="account" status="completed">
          <StepperTrigger>
            <StepperIndicator />
            <div className="flex flex-col">
              <StepperTitle>Account</StepperTitle>
              <StepperDescription>Credentials &amp; auth</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>

        <StepperItem value="profile"${hasError ? ' status="error"' : ""}>
          <StepperTrigger>
            <StepperIndicator />
            <div className="flex flex-col">
              <StepperTitle>Profile</StepperTitle>
              <StepperDescription>${hasError ? "Username required" : "Personal details"}</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>

        <StepperItem value="preferences">
          <StepperTrigger>
            <StepperIndicator />
            <div className="flex flex-col">
              <StepperTitle>Preferences</StepperTitle>
              <StepperDescription>Workspace presets</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>

        <StepperItem value="review">
          <StepperTrigger>
            <StepperIndicator />
            <div className="flex flex-col">
              <StepperTitle>Review</StepperTitle>
              <StepperDescription>Confirm details</StepperDescription>
            </div>
          </StepperTrigger>
        </StepperItem>
      </StepperList>
    </Stepper>
  );
}`;
  }, [activeStep, orientation, interactive, linear, intensity, hasError]);

  return (
    <PreviewStageShell
      title="Stepper Live Stage"
      description="A structured progress and navigation component communicating user position within a bounded multi-step process with accessible status semantics."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      code={generatedCode}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      telemetry={[
        { label: "Active Step", value: activeStep, variant: "success" },
        { label: "Orientation", value: orientation },
        { label: "Mode", value: interactive ? "Interactive" : "Informational" },
        { label: "Progression", value: linear ? "Linear" : "Non-linear" },
      ]}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 w-full">
          <StageControlSelect
            label="Orientation"
            value={orientation}
            onChange={(v) => setOrientation(v as "horizontal" | "vertical")}
            options={[
              { value: "horizontal", label: "Horizontal" },
              { value: "vertical", label: "Vertical" },
            ]}
          />
          <StageControlSelect
            label="Mode"
            value={interactive ? "interactive" : "informational"}
            onChange={(v) => setInteractive(v === "interactive")}
            options={[
              { value: "interactive", label: "Interactive" },
              { value: "informational", label: "Informational" },
            ]}
          />
          <StageControlSelect
            label="Progression"
            value={linear ? "linear" : "non-linear"}
            onChange={(v) => setLinear(v === "linear")}
            options={[
              { value: "linear", label: "Linear" },
              { value: "non-linear", label: "Non-Linear" },
            ]}
          />
          <StageControlSelect
            label="Step Error"
            value={hasError ? "error" : "normal"}
            onChange={(v) => setHasError(v === "error")}
            options={[
              { value: "normal", label: "None" },
              { value: "error", label: "Error on Step 2" },
            ]}
          />
          <StageControlSelect
            label="Intensity"
            value={intensity}
            onChange={(v) => setIntensity(v as "subtle" | "balanced" | "rich")}
            options={[
              { value: "subtle", label: "Subtle" },
              { value: "balanced", label: "Balanced" },
              { value: "rich", label: "Rich" },
            ]}
          />
        </div>
      }
    >
      <div className="relative w-full flex items-center justify-center p-4 sm:p-8 overflow-hidden min-h-[460px]">
        {/* Floating Stepper Surface with Canonical Liquid Glass Optics */}
        <div className="halo-liquid-glass-surface relative z-10 w-full max-w-2xl rounded-3xl p-5 sm:p-8">
          <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-3">
            <div>
              <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
                Canonical Process Demo
              </span>
              <h4 className="text-sm font-semibold text-foreground">Account Provisioning Flow</h4>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {activeStep === "account" && "Step 1 of 4"}
              {activeStep === "profile" && "Step 2 of 4"}
              {activeStep === "preferences" && "Step 3 of 4"}
              {activeStep === "review" && "Step 4 of 4"}
            </span>
          </div>

          <Stepper
            value={activeStep}
            onValueChange={setActiveStep}
            orientation={orientation}
            interactive={interactive}
            linear={linear}
            intensity={intensity}
          >
            <StepperList>
              <StepperItem value="account" status="completed">
                <StepperTrigger>
                  <StepperIndicator />
                  <div className="flex flex-col min-w-0">
                    <StepperTitle>Account</StepperTitle>
                    <StepperDescription>Credentials</StepperDescription>
                  </div>
                </StepperTrigger>
                <StepperSeparator />
              </StepperItem>

              <StepperItem
                value="profile"
                status={hasError ? "error" : activeStep === "profile" ? "current" : undefined}
              >
                <StepperTrigger>
                  <StepperIndicator />
                  <div className="flex flex-col min-w-0">
                    <StepperTitle>Profile</StepperTitle>
                    <StepperDescription>
                      {hasError ? "Username required" : "Personal details"}
                    </StepperDescription>
                  </div>
                </StepperTrigger>
                <StepperSeparator />
              </StepperItem>

              <StepperItem value="preferences">
                <StepperTrigger>
                  <StepperIndicator />
                  <div className="flex flex-col min-w-0">
                    <StepperTitle>Preferences</StepperTitle>
                    <StepperDescription>Workspace presets</StepperDescription>
                  </div>
                </StepperTrigger>
                <StepperSeparator />
              </StepperItem>

              <StepperItem value="review">
                <StepperTrigger>
                  <StepperIndicator />
                  <div className="flex flex-col min-w-0">
                    <StepperTitle>Review</StepperTitle>
                    <StepperDescription>Confirm details</StepperDescription>
                  </div>
                </StepperTrigger>
              </StepperItem>
            </StepperList>
          </Stepper>

          {/* Contextual Flow Action Controls */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-border/50 pt-4">
            <button
              type="button"
              disabled={activeStep === "account"}
              onClick={() => {
                if (activeStep === "review") setActiveStep("preferences");
                else if (activeStep === "preferences") setActiveStep("profile");
                else if (activeStep === "profile") setActiveStep("account");
              }}
              className="halo-liquid-glass px-4 py-2 text-xs font-medium rounded-xl border border-white/60 dark:border-white/10 bg-white/40 dark:bg-white/[0.06] backdrop-blur-md shadow-xs hover:bg-white/60 dark:hover:bg-white/10 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous Step
            </button>
            <span className="hidden sm:inline text-xs text-muted-foreground text-center">
              {interactive
                ? "Click any eligible step or use buttons to advance"
                : "Informational mode: Controlled externally"}
            </span>
            <button
              type="button"
              disabled={activeStep === "review"}
              onClick={() => {
                if (activeStep === "account") setActiveStep("profile");
                else if (activeStep === "profile") setActiveStep("preferences");
                else if (activeStep === "preferences") setActiveStep("review");
              }}
              className="halo-liquid-glass px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground shadow-md hover:opacity-95 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
