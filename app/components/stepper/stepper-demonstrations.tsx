"use client";

import * as React from "react";
import {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
} from "@/components/ui/stepper";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  CheckmarkBadge01Icon,
  Alert02Icon,
  UserIcon,
  Settings01Icon,
  Shield01Icon,
  CreditCardIcon,
  DeliveryTruck01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export function StepperDemonstrations() {
  // Demonstration states
  const [demo1Step, setDemo1Step] = React.useState<string>("profile");
  const [interactiveStep, setInteractiveStep] = React.useState<string>("shipping");
  const [verticalStep, setVerticalStep] = React.useState<string>("billing");
  const [errorStep, setErrorStep] = React.useState<string>("verification");

  return (
    <div className="space-y-12">
      {/* 1. Deterministic Process Flow */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          1. Canonical Process Progression
        </h3>
        <p className="text-sm text-muted-foreground">
          Stepper communicates sequential movement through a bounded process. Exactly one step is current, with completed steps clearly designated and upcoming steps awaiting execution.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl p-4 rounded-xl border border-border/70 bg-background shadow-xs">
            <Stepper value={demo1Step} onValueChange={setDemo1Step} interactive={true} linear={true}>
              <StepperList>
                <StepperItem value="account" status="completed">
                  <StepperTrigger>
                    <StepperIndicator />
                    <div className="flex flex-col">
                      <StepperTitle>Account</StepperTitle>
                      <StepperDescription>Completed</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>

                <StepperItem value="profile">
                  <StepperTrigger>
                    <StepperIndicator />
                    <div className="flex flex-col">
                      <StepperTitle>Profile</StepperTitle>
                      <StepperDescription>In progress</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>

                <StepperItem value="preferences">
                  <StepperTrigger>
                    <StepperIndicator />
                    <div className="flex flex-col">
                      <StepperTitle>Preferences</StepperTitle>
                      <StepperDescription>Upcoming</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>

                <StepperItem value="review">
                  <StepperTrigger>
                    <StepperIndicator />
                    <div className="flex flex-col">
                      <StepperTitle>Review</StepperTitle>
                      <StepperDescription>Final stage</StepperDescription>
                    </div>
                  </StepperTrigger>
                </StepperItem>
              </StepperList>
            </Stepper>
          </div>
        </div>
      </section>

      {/* 2. Informational Progress Mode */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          2. Informational Progress (Noninteractive)
        </h3>
        <p className="text-sm text-muted-foreground">
          When users cannot or should not jump between steps arbitrarily, Stepper renders strictly as an ordered list (<code className="font-mono text-xs">&lt;ol&gt;</code>) without synthetic button semantics or Tab stops. External form actions control the advancement.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl p-4 rounded-xl border border-border/70 bg-background shadow-xs">
            <Stepper value="step-2" interactive={false}>
              <StepperList>
                <StepperItem value="step-1" status="completed">
                  <StepperTrigger>
                    <StepperIndicator />
                    <StepperTitle>Verification</StepperTitle>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>

                <StepperItem value="step-2">
                  <StepperTrigger>
                    <StepperIndicator />
                    <StepperTitle>Identity Check</StepperTitle>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>

                <StepperItem value="step-3">
                  <StepperTrigger>
                    <StepperIndicator />
                    <StepperTitle>Provisioning</StepperTitle>
                  </StepperTrigger>
                </StepperItem>
              </StepperList>
            </Stepper>
          </div>
        </div>
      </section>

      {/* 3. Interactive Direct Navigation */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          3. Interactive Step Navigation (Linear Policy)
        </h3>
        <p className="text-sm text-muted-foreground">
          With <code className="font-mono text-xs">interactive={true}</code> and <code className="font-mono text-xs">linear={true}</code>, completed steps act as real keyboard-operable buttons (<code className="font-mono text-xs">&lt;button&gt;</code>) allowing backward review, while upcoming steps remain non-navigable until reached.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl p-4 rounded-xl border border-border/70 bg-background shadow-xs">
            <Stepper
              value={interactiveStep}
              onValueChange={setInteractiveStep}
              interactive={true}
              linear={true}
            >
              <StepperList>
                <StepperItem value="cart" status="completed">
                  <StepperTrigger>
                    <StepperIndicator />
                    <div className="flex flex-col">
                      <StepperTitle>Cart</StepperTitle>
                      <StepperDescription>Editable</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>

                <StepperItem value="shipping">
                  <StepperTrigger>
                    <StepperIndicator />
                    <div className="flex flex-col">
                      <StepperTitle>Shipping</StepperTitle>
                      <StepperDescription>Active step</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>

                <StepperItem value="payment">
                  <StepperTrigger>
                    <StepperIndicator />
                    <div className="flex flex-col">
                      <StepperTitle>Payment</StepperTitle>
                      <StepperDescription>Locked</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>

                <StepperItem value="confirmation">
                  <StepperTrigger>
                    <StepperIndicator />
                    <div className="flex flex-col">
                      <StepperTitle>Done</StepperTitle>
                      <StepperDescription>Locked</StepperDescription>
                    </div>
                  </StepperTrigger>
                </StepperItem>
              </StepperList>
            </Stepper>
          </div>
        </div>
      </section>

      {/* 4. Error State Presentation */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          4. Error State Presentation
        </h3>
        <p className="text-sm text-muted-foreground">
          Errors indicate actionable problems needing resolution. Stepper communicates errors through high-contrast alert indicators, accessible text (<code className="font-mono text-xs">(Error)</code>), and rose optical highlights without relying exclusively on color.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl p-4 rounded-xl border border-border/70 bg-background shadow-xs">
            <Stepper value={errorStep} onValueChange={setErrorStep} interactive={true}>
              <StepperList>
                <StepperItem value="credentials" status="completed">
                  <StepperTrigger>
                    <StepperIndicator />
                    <div className="flex flex-col">
                      <StepperTitle>Credentials</StepperTitle>
                      <StepperDescription>Validated</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>

                <StepperItem value="verification" status="error">
                  <StepperTrigger>
                    <StepperIndicator />
                    <div className="flex flex-col">
                      <StepperTitle>Verification</StepperTitle>
                      <StepperDescription>Invalid phone code</StepperDescription>
                    </div>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>

                <StepperItem value="onboarding">
                  <StepperTrigger>
                    <StepperIndicator />
                    <div className="flex flex-col">
                      <StepperTitle>Onboarding</StepperTitle>
                      <StepperDescription>Pending resolution</StepperDescription>
                    </div>
                  </StepperTrigger>
                </StepperItem>
              </StepperList>
            </Stepper>
          </div>
        </div>
      </section>

      {/* 5. Vertical Orientation */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          5. Vertical Orientation for Detailed Workflows
        </h3>
        <p className="text-sm text-muted-foreground">
          Vertical steppers accommodate longer descriptions, sub-content, and narrower containers like sidebars or mobile modals without causing horizontal scroll clipping.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="w-full max-w-md p-6 rounded-xl border border-border/70 bg-background shadow-xs">
            <Stepper
              value={verticalStep}
              onValueChange={setVerticalStep}
              orientation="vertical"
              interactive={true}
            >
              <StepperList>
                <StepperItem value="organization" status="completed">
                  <div className="flex flex-col w-full">
                    <StepperTrigger>
                      <StepperIndicator />
                      <div className="flex flex-col">
                        <StepperTitle>Organization Setup</StepperTitle>
                        <StepperDescription>Domain and legal entity defined</StepperDescription>
                      </div>
                    </StepperTrigger>
                    <StepperSeparator />
                  </div>
                </StepperItem>

                <StepperItem value="billing">
                  <div className="flex flex-col w-full">
                    <StepperTrigger>
                      <StepperIndicator />
                      <div className="flex flex-col">
                        <StepperTitle>Billing &amp; Tax Information</StepperTitle>
                        <StepperDescription>Select recurring plan and tax jurisdiction</StepperDescription>
                      </div>
                    </StepperTrigger>
                    <StepperSeparator />
                  </div>
                </StepperItem>

                <StepperItem value="invite">
                  <div className="flex flex-col w-full">
                    <StepperTrigger>
                      <StepperIndicator />
                      <div className="flex flex-col">
                        <StepperTitle>Team Invitations</StepperTitle>
                        <StepperDescription>Send invites to core workspace collaborators</StepperDescription>
                      </div>
                    </StepperTrigger>
                  </div>
                </StepperItem>
              </StepperList>
            </Stepper>
          </div>
        </div>
      </section>

      {/* 6. Current + Focus Contrast Matrix */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">
          6. Current Destination vs Keyboard Focus Ring Contrast
        </h3>
        <p className="text-sm text-muted-foreground">
          In compliance with WCAG 2.1 AA and HaloUI specifications, the active step indicator and the keyboard focus ring (<code className="font-mono text-xs">var(--halo-focus-color)</code>) must remain distinctly perceptible simultaneously.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl p-4 rounded-xl border border-border/70 bg-background shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-primary/20 border border-primary" /> Current Indicator
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-500" /> Completed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full border-2 border-[var(--halo-focus-color)] ring-1 ring-[var(--halo-focus-color)]" /> Focus Ring
              </span>
            </div>
            <Stepper value="review" interactive={true}>
              <StepperList>
                <StepperItem value="draft" status="completed">
                  <StepperTrigger>
                    <StepperIndicator />
                    <StepperTitle>Draft</StepperTitle>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>

                <StepperItem value="review">
                  <StepperTrigger className="ring-2 ring-[var(--halo-focus-color)] ring-offset-2">
                    <StepperIndicator />
                    <StepperTitle>Review (Simulated Focus)</StepperTitle>
                  </StepperTrigger>
                  <StepperSeparator />
                </StepperItem>

                <StepperItem value="publish">
                  <StepperTrigger>
                    <StepperIndicator />
                    <StepperTitle>Publish</StepperTitle>
                  </StepperTrigger>
                </StepperItem>
              </StepperList>
            </Stepper>
          </div>
        </div>
      </section>
    </div>
  );
}
