"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

const DEMO_CONTAINER_GLASS =
  "border border-white/60 dark:border-white/15 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl backdrop-saturate-180 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.10),inset_0_1px_1px_0_rgba(255,255,255,0.75)] dark:shadow-[0_16px_48px_-8px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] relative isolate before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:via-white/5 before:to-transparent dark:before:from-white/10 dark:before:via-transparent transition-all";

/* -------------------------------------------------------------------------- */
/* 1. Primary Feedback Field Demo                                              */
/* -------------------------------------------------------------------------- */

export function PrimaryFeedbackFieldDemo() {
  const [feedback, setFeedback] = React.useState("");

  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-feedback">
        <FieldLabel htmlFor="demo-feedback">Product feedback</FieldLabel>
        <Textarea
          id="demo-feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Tell us what worked well and what could be improved..."
          rows={4}
          aria-describedby="demo-feedback-desc"
        />
        <FieldDescription id="demo-feedback-desc">
          Feedback is shared directly with the product engineering group.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Interaction States (Valid, Invalid + Focused, Disabled, ReadOnly)        */
/* -------------------------------------------------------------------------- */

export function TextareaStatesDemo() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 1. Valid / Rest */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="state-rest">
          <FieldLabel htmlFor="state-rest">Standard Rest</FieldLabel>
          <Textarea
            id="state-rest"
            defaultValue="System operations nominal across all European availability zones."
            rows={3}
          />
          <FieldDescription>Rest state with 10-layer physical liquid glass substrate.</FieldDescription>
        </Field>
      </div>

      {/* 2. Invalid + Focused (Dual Indicator) */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="state-invalid" invalid>
          <FieldLabel htmlFor="state-invalid" required>
            Incident root cause (Invalid)
          </FieldLabel>
          <Textarea
            id="state-invalid"
            aria-invalid="true"
            defaultValue="Network blip."
            rows={3}
            aria-describedby="state-invalid-err"
          />
          <FieldError id="state-invalid-err">
            Root cause must exceed 30 characters and include timestamp references.
          </FieldError>
        </Field>
      </div>

      {/* 3. Disabled */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="state-disabled" disabled>
          <FieldLabel htmlFor="state-disabled">Archived manifest (Disabled)</FieldLabel>
          <Textarea
            id="state-disabled"
            disabled
            defaultValue="CLUSTER_CONFIG_V1: Immutable production manifest locked by deployment pipeline."
            rows={3}
          />
          <FieldDescription>Non-interactive control removed from keyboard tab order.</FieldDescription>
        </Field>
      </div>

      {/* 4. Read-Only */}
      <div className={cn("p-5 rounded-2xl", DEMO_CONTAINER_GLASS)}>
        <Field id="state-readonly">
          <FieldLabel htmlFor="state-readonly">Deployment audit log (Read-Only)</FieldLabel>
          <Textarea
            id="state-readonly"
            readOnly
            defaultValue="commit 98f12a (HEAD -> main) Author: CI Pipeline Date: 2026-09-25. Verification tests passed cleanly."
            rows={3}
          />
          <FieldDescription>
            Preserves selection, copying, and focus without allowing text mutation.
          </FieldDescription>
        </Field>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Resizing Configurations Demo                                             */
/* -------------------------------------------------------------------------- */

export function TextareaResizeDemo() {
  const [resizeMode, setResizeMode] = React.useState<"vertical" | "none" | "both" | "horizontal">("vertical");

  return (
    <div className={cn("w-full max-w-xl mx-auto p-5 sm:p-7 rounded-2xl space-y-4", DEMO_CONTAINER_GLASS)}>
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-border/40 text-xs">
        <span className="text-muted-foreground font-medium">Resize Mode:</span>
        {(["vertical", "none", "both", "horizontal"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setResizeMode(mode)}
            className={cn(
              "px-2.5 py-1 rounded-md transition-colors font-mono text-xs",
              resizeMode === mode
                ? "bg-foreground text-background font-semibold"
                : "bg-muted/40 hover:bg-muted text-muted-foreground"
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      <Field id="demo-resize">
        <FieldLabel htmlFor="demo-resize">Release notes ({resizeMode})</FieldLabel>
        <Textarea
          id="demo-resize"
          resize={resizeMode}
          rows={4}
          defaultValue="v2.4.0 Features:
- Added liquid optical tokens for multi-line inputs.
- Preserved native vertical resizing and selection."
        />
        <FieldDescription>
          {resizeMode === "vertical" && "Default mode. Allows height adjustment while preserving form column width."}
          {resizeMode === "none" && "Disables resize handles entirely for fixed-geometry layouts."}
          {resizeMode === "both" && "Enables freeform two-dimensional resizing."}
          {resizeMode === "horizontal" && "Enables horizontal resizing only."}
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Long Content & Scroll Behavior                                          */
/* -------------------------------------------------------------------------- */

export function TextareaLongContentDemo() {
  const sampleLog = `2026-09-25T11:00:00Z [INFO] Initializing HaloUI Liquid Optical Material Engine...
2026-09-25T11:00:01Z [INFO] Calibrating 10-layer physical shader pipeline:
  - Base tint transmission: 72% light / 70% dark
  - Directional specular highlight: 135° vector active
  - Optical boundary refraction: 1.5px offset
  - Halo double-contrast focus indicator: Armed
2026-09-25T11:00:02Z [DEBUG] Verifying WCAG 2.1 AA keyboard navigation tree.
2026-09-25T11:00:03Z [INFO] Native <textarea> bound with zero JS height observer overhead.
2026-09-25T11:00:04Z [INFO] Stress-test multiline scroll buffers allocated.
2026-09-25T11:00:05Z [INFO] System verified: 0 dropped frames during viewport resize.`;

  return (
    <div className={cn("w-full max-w-xl mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-long-content">
        <FieldLabel htmlFor="demo-long-content">Diagnostic execution telemetry</FieldLabel>
        <Textarea
          id="demo-long-content"
          defaultValue={sampleLog}
          rows={6}
          className="font-mono text-xs leading-relaxed"
        />
        <FieldDescription>
          Native scrollbars remain accessible when multiline content exceeds available height without breaking corner radii.
        </FieldDescription>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Controlled vs Uncontrolled with Character Counter                       */
/* -------------------------------------------------------------------------- */

export function TextareaControlledDemo() {
  const MAX_CHARS = 240;
  const [bio, setBio] = React.useState("Senior Design-System Architect building liquid optical interfaces.");
  const charsRemaining = MAX_CHARS - bio.length;
  const isOverLimit = charsRemaining < 0;

  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 sm:p-7 rounded-2xl", DEMO_CONTAINER_GLASS)}>
      <Field id="demo-bio" invalid={isOverLimit}>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="demo-bio">Developer bio</FieldLabel>
          <span
            className={cn(
              "text-xs font-mono",
              isOverLimit ? "text-destructive font-semibold" : "text-muted-foreground"
            )}
          >
            {bio.length} / {MAX_CHARS}
          </span>
        </div>
        <Textarea
          id="demo-bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          aria-invalid={isOverLimit ? "true" : undefined}
          aria-describedby="demo-bio-desc"
        />
        <FieldDescription id="demo-bio-desc">
          Character counting is owned by the consumer composition, keeping the base primitive lightweight.
        </FieldDescription>
      </Field>
    </div>
  );
}
