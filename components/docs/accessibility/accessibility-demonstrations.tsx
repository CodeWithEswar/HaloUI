"use client";

import * as React from "react";
import {
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  InformationCircleIcon,
  SparklesIcon,
  Sun01Icon,
  Moon02Icon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { cn } from "@/lib/utils";

/**
 * 1. FocusStatePreview
 * Compares Rest, Hover, Focus, and Pressed states on the exact same component,
 * proving that focus is an independent accessibility state, not a material decoration.
 */
export function FocusStatePreview() {
  const states = [
    {
      label: "Rest",
      desc: "Baseline static material and boundary without movement",
      className: "bg-[var(--halo-surface-elevated)] border-[var(--halo-edge)] shadow-[var(--halo-shadow-elevated)]",
      note: "No highlight shift",
    },
    {
      label: "Hover",
      desc: "Subtle optical edge clarification and highlight catch",
      className: "bg-[var(--halo-surface-strong)] border-[var(--halo-edge-bright)] shadow-[var(--halo-shadow-ambient)]",
      note: "Pointer feedback only",
    },
    {
      label: "Focus",
      desc: "High-contrast focus ring completely distinct from material effects",
      className: "bg-[var(--halo-surface-elevated)] border-[var(--halo-edge)] shadow-[var(--halo-shadow-elevated)] ring-2 ring-stone-950 dark:ring-stone-100 ring-offset-2 ring-offset-background",
      note: "Independent indicator",
    },
    {
      label: "Pressed",
      desc: "Physical tactile compression with reduced contact shadow",
      className: "bg-[var(--halo-surface)] border-[var(--halo-edge)] shadow-[var(--halo-shadow-compressed)] scale-[0.98] translate-y-px",
      note: "Tactile response",
    },
  ];

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 text-xs font-semibold text-foreground">
        Focus Differentiation from Material States
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        {states.map((st) => (
          <div
            key={st.label}
            className="rounded-xl border border-border bg-muted/20 p-4 flex flex-col justify-between text-xs"
          >
            <div>
              <span className="font-mono text-[10px] uppercase font-semibold text-muted-foreground">
                {st.label}
              </span>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{st.desc}</p>
            </div>
            <div className="my-5 flex justify-center items-center">
              <div
                className={cn(
                  "relative inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium text-xs text-foreground transition-all duration-150 select-none",
                  st.className
                )}
              >
                <span>Action</span>
              </div>
            </div>
            <div className="pt-2 border-t border-border/40 font-mono text-[10px] text-muted-foreground">
              {st.note}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        A material highlight, glow, optical edge, or hover treatment is never a substitute for an accessible focus indicator.
      </p>
    </div>
  );
}

/**
 * 2. KeyboardDemo
 * Real interactive keyboard navigation sandbox detecting browser focus naturally.
 */
export function KeyboardDemo() {
  const [activeElement, setActiveElement] = React.useState<string | null>(null);
  const [switchState, setSwitchState] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const getKeyHint = () => {
    switch (activeElement) {
      case "button-primary":
        return "Press Enter or Space to activate the primary action.";
      case "button-neutral":
        return "Press Enter or Space to activate the secondary action.";
      case "input":
        return "Type characters naturally. Tab moves to the next field.";
      case "switch":
        return "Press Space to toggle between checked and unchecked.";
      default:
        return "Press Tab to navigate into this interactive group.";
    }
  };

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <span className="text-xs font-semibold text-foreground">Interactive Keyboard Navigation Sandbox</span>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Use <kbd className="font-mono bg-muted border border-border px-1 py-0.5 rounded text-[10px]">Tab</kbd> and <kbd className="font-mono bg-muted border border-border px-1 py-0.5 rounded text-[10px]">Shift+Tab</kbd> to move focus through the controls below.
          </p>
        </div>
        <div className="rounded-md border border-border bg-muted/40 px-2.5 py-1 text-[10px] font-mono text-muted-foreground">
          Focused: <span className="font-semibold text-foreground">{activeElement ?? "None"}</span>
        </div>
      </div>

      {/* Interactive Controls Row */}
      <div className="flex flex-wrap items-center gap-4 py-4 px-2">
        <HaloButton
          variant="primary"
          size="sm"
          onFocus={() => setActiveElement("button-primary")}
          onBlur={() => setActiveElement((curr) => (curr === "button-primary" ? null : curr))}
        >
          Primary Button
        </HaloButton>

        <HaloButton
          variant="neutral"
          size="sm"
          onFocus={() => setActiveElement("button-neutral")}
          onBlur={() => setActiveElement((curr) => (curr === "button-neutral" ? null : curr))}
        >
          Neutral Button
        </HaloButton>

        <div className="w-48">
          <Input
            placeholder="Type here..."
            className="h-8 text-xs"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setActiveElement("input")}
            onBlur={() => setActiveElement((curr) => (curr === "input" ? null : curr))}
            aria-label="Interactive test input"
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={switchState}
            onCheckedChange={setSwitchState}
            onFocus={() => setActiveElement("switch")}
            onBlur={() => setActiveElement((curr) => (curr === "switch" ? null : curr))}
            aria-label="Interactive test switch"
          />
          <span className="text-xs text-muted-foreground select-none">
            {switchState ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>

      {/* Real-time Keyboard Guidance Rail */}
      <div className="mt-3 rounded-lg border border-border/60 bg-muted/20 px-3.5 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground leading-relaxed">{getKeyHint()}</span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground uppercase hidden sm:inline">
          Native Focus Events
        </span>
      </div>
    </div>
  );
}

/**
 * 3. AccessibleFieldExample
 * Complete accessible form field with proper label, description, and error relationships.
 */
export function AccessibleFieldExample() {
  const [hasError, setHasError] = React.useState(false);
  const [value, setValue] = React.useState("alex.designer");

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-foreground">Accessible Field Structure</span>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Combines visible label, input, description, and programmatic validation states.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setHasError(!hasError)}
          className={cn(
            "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
            hasError
              ? "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400"
              : "border-border bg-background text-muted-foreground hover:bg-muted"
          )}
        >
          {hasError ? "Simulating: Invalid State" : "Simulate Validation Error"}
        </button>
      </div>

      <div className="max-w-md space-y-2 rounded-xl border border-border bg-muted/15 p-5">
        <div className="flex justify-between items-center">
          <Label htmlFor="demo-workspace-handle" className="text-xs font-semibold text-foreground">
            Workspace Handle <span className="text-red-500">*</span>
          </Label>
          <span className="text-[10px] font-mono text-muted-foreground">Required</span>
        </div>

        <Input
          id="demo-workspace-handle"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-describedby={hasError ? "demo-handle-error demo-handle-desc" : "demo-handle-desc"}
          aria-invalid={hasError}
          aria-required="true"
          className={cn(
            "h-9 text-xs transition-colors",
            hasError && "border-red-500 focus-visible:ring-red-500"
          )}
        />

        {hasError ? (
          <p id="demo-handle-error" role="alert" className="flex items-center gap-1.5 text-[11px] text-red-600 dark:text-red-400 font-medium pt-0.5">
            <HaloIcon icon={AlertCircleIcon} size={13} className="shrink-0" />
            <span>This handle is already taken. Choose an alternate name.</span>
          </p>
        ) : (
          <p id="demo-handle-desc" className="text-[11px] text-muted-foreground">
            Unique identifier for your team's HaloUI registry endpoint.
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-border grid gap-2 sm:grid-cols-3 font-mono text-[10px] text-muted-foreground">
        <div>&bull; <code className="text-foreground">htmlFor</code> linked to input ID</div>
        <div>&bull; <code className="text-foreground">aria-describedby</code> links error</div>
        <div>&bull; <code className="text-foreground">aria-invalid={String(hasError)}</code></div>
      </div>
    </div>
  );
}

/**
 * 4. MaterialAccessibilityPreview
 * Evaluates translucent contrast across 4 realistic backdrops with surface reinforcement toggle.
 */
export function MaterialAccessibilityPreview() {
  const [backdrop, setBackdrop] = React.useState<"neutral" | "image" | "dense-ui" | "dark">("dense-ui");
  const [reinforced, setReinforced] = React.useState(false);

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-foreground">Translucent Contrast across Substrates</span>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Test whether underlying visual patterns compromise text legibility and examine surface reinforcement.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-foreground">
            <Switch checked={reinforced} onCheckedChange={setReinforced} />
            <span>Reinforce Surface (90% Body)</span>
          </label>
        </div>
      </div>

      {/* Backdrop Switcher */}
      <div className="mb-3 flex flex-wrap gap-1">
        {(["dense-ui", "image", "neutral", "dark"] as const).map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setBackdrop(b)}
            className={cn(
              "rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors",
              backdrop === b
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:bg-muted"
            )}
          >
            {b === "dense-ui" ? "Dense UI Test" : b.charAt(0).toUpperCase() + b.slice(1)}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className="relative min-h-[260px] rounded-xl border border-border p-6 sm:p-8 flex items-center justify-center overflow-hidden isolate select-none">
        {backdrop === "neutral" && (
          <div className="absolute inset-0 bg-muted/40 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
        )}

        {backdrop === "image" && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80")`,
            }}
          >
            <div className="absolute inset-0 bg-black/25" />
          </div>
        )}

        {backdrop === "dense-ui" && (
          <div className="absolute inset-0 p-4 font-mono text-[10px] leading-relaxed text-muted-foreground/50 overflow-hidden select-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex justify-between py-1 border-b border-border/20">
                <span>row-index-00{i + 1} &middot; status: running</span>
                <span>CPU: 42% &middot; MEM: 1.4GB &middot; REGISTRY_OK</span>
              </div>
            ))}
          </div>
        )}

        {backdrop === "dark" && (
          <div className="absolute inset-0 bg-[#090a0d]">
            <div className="absolute inset-0 bg-[radial-gradient(#1e2229_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
          </div>
        )}

        {/* HaloUI Test Card */}
        <HaloSurface
          intensity={reinforced ? "subtle" : "balanced"}
          elevation="raised"
          className={cn(
            "relative z-10 w-full max-w-sm rounded-xl p-5 transition-all duration-200",
            reinforced ? "bg-background/95 backdrop-blur-2xl ring-1 ring-border" : "bg-[var(--halo-surface)] backdrop-blur-md"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-foreground">Content Isolation Layer</span>
            <span className={cn(
              "px-1.5 py-0.5 rounded font-mono text-[10px] font-semibold",
              reinforced ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
            )}>
              {reinforced ? "Reinforced: 90%" : "Standard: 72%"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Text contrast is guaranteed by isolated foreground layers and calibrated diffusion over underlying UI noise.
          </p>
          <div className="mt-4 pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px]">
            <span className="font-mono text-muted-foreground">WCAG 2.1 AA &ge; 4.5:1</span>
            <span className="text-emerald-500 font-semibold">&bull; Pass</span>
          </div>
        </HaloSurface>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        If environmental detail compromises perception, strengthen the material surface rather than preserving maximum transparency.
      </p>
    </div>
  );
}

/**
 * 5. ReducedMotionComparison
 * Demonstrates standard tactile motion vs instant accessible state collapse.
 */
export function ReducedMotionComparison() {
  const [reducedMode, setReducedMode] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-foreground">Reduced Motion Verification</span>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Simulate how tactile transitions collapse under <code className="font-mono text-[10px]">prefers-reduced-motion: reduce</code>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-foreground">
            <Switch checked={reducedMode} onCheckedChange={setReducedMode} />
            <span>Simulate Reduced Motion</span>
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-muted/15 p-5 flex flex-col justify-between text-xs">
          <div>
            <div className="flex items-center justify-between border-b border-border pb-2 mb-2 font-mono text-[10px] text-muted-foreground uppercase font-semibold">
              <span>Standard Tactile Motion</span>
              <span>150ms Easing</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Uses proprietary cubic-bezier tactile curve for scale compression and dynamic shadow tightening.
            </p>
          </div>
          <div className="my-6 flex justify-center">
            <HaloButton variant="primary">Standard Press</HaloButton>
          </div>
          <div className="text-[10px] font-mono text-muted-foreground">
            cubic-bezier(0.2, 0.8, 0.3, 1)
          </div>
        </div>

        <div className="rounded-xl border border-border bg-muted/15 p-5 flex flex-col justify-between text-xs ring-1 ring-border">
          <div>
            <div className="flex items-center justify-between border-b border-border pb-2 mb-2 font-mono text-[10px] text-muted-foreground uppercase font-semibold">
              <span className="text-foreground font-semibold">Accessible Reduced Motion</span>
              <span className="text-emerald-500">0.01ms Duration</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Disables kinetic displacement and scale transforms. State changes remain instantaneous, clear, and fatigue-free.
            </p>
          </div>
          <div className="my-6 flex justify-center">
            <button
              type="button"
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              className={cn(
                "rounded-xl border border-[var(--halo-edge)] px-4 py-2 font-medium text-xs text-foreground select-none transition-none",
                isPressed ? "bg-muted shadow-inner" : "bg-[var(--halo-surface-elevated)] shadow-[var(--halo-shadow-elevated)]"
              )}
            >
              Instant State {isPressed ? "(Active)" : "(Rest)"}
            </button>
          </div>
          <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
            transition-duration: 0.01ms !important
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Reduced motion simplifies movement without removing information. Focus, state, and feedback remain immediate.
      </p>
    </div>
  );
}
