"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  CommandIcon,
  Search01Icon,
  SparklesIcon,
  SlidersHorizontalIcon,
  ArrowRight01Icon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function KbdPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [size, setSize] = React.useState<"sm" | "default" | "lg">("default");
  const [notation, setNotation] = React.useState<"symbols" | "words">("symbols");

  const handleReset = React.useCallback(() => {
    setActiveTab("preview");
    setBackdrop("neutral");
    setViewport("desktop");
    setSize("default");
    setNotation("symbols");
  }, []);

  const generatedCode = React.useMemo(() => {
    return `import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function ShortcutInstructions() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
      <p>
        Press <Kbd size="${size}">Esc</Kbd> to dismiss active overlays, or activate the command
        launcher at any time using{" "}
        <KbdGroup>
          <Kbd size="${size}">${notation === "symbols" ? "⌘" : "Ctrl"}</Kbd>
          <span aria-hidden="true" className="text-muted-foreground/60">+</span>
          <Kbd size="${size}">K</Kbd>
        </KbdGroup>
        .
      </p>

      <p>
        To open project configuration directly, use{" "}
        <KbdGroup>
          <Kbd size="${size}">${notation === "symbols" ? "⌘" : "Ctrl"}</Kbd>
          <span aria-hidden="true" className="text-muted-foreground/60">+</span>
          <Kbd size="${size}">${notation === "symbols" ? "⇧" : "Shift"}</Kbd>
          <span aria-hidden="true" className="text-muted-foreground/60">+</span>
          <Kbd size="${size}">P</Kbd>
        </KbdGroup>
        .
      </p>
    </div>
  );
}`;
  }, [size, notation]);

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      onReset={handleReset}
      code={generatedCode}
      telemetry={[
        { label: "Semantic Tag", value: "<kbd> (Native)", variant: "success" },
        { label: "Interactive State", value: "Non-Interactive (Presentational)" },
        { label: "Keyboard Focus", value: "No TabIndex (Parent Owns Focus)" },
        { label: "Runtime", value: "Server Component (0kB Client JS)" },
      ]}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full">
          <StageControlSelect
            label="Keycap Size"
            value={size}
            onChange={(v) => setSize(v as "sm" | "default" | "lg")}
            options={[
              { value: "sm", label: "Small (16px height)" },
              { value: "default", label: "Default (20px height)" },
              { value: "lg", label: "Large (24px height)" },
            ]}
          />
          <StageControlSelect
            label="Modifier Notation"
            value={notation}
            onChange={(v) => setNotation(v as "symbols" | "words")}
            options={[
              { value: "symbols", label: "Symbols (⌘, ⇧, ⌥, ↵)" },
              { value: "words", label: "Words (Ctrl, Shift, Alt, Enter)" },
            ]}
          />
        </div>
      }
    >
      <div className="relative flex flex-col items-center justify-center p-4 sm:p-8 w-full min-h-[460px] overflow-hidden">
        {/* Card Presenting Kbd In Real Environments */}
        <div className="halo-liquid-glass-surface w-full max-w-lg space-y-5 rounded-2xl p-6 sm:p-7 relative z-10">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
                Keyboard Input Representation
              </span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Navigation 16
            </span>
          </div>

          {/* 1. Inline Prose Context */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Inline Documentation Prose
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-foreground">
              To immediately discard pending changes, tap <Kbd size={size}>Esc</Kbd>. You can trigger global search anywhere by pressing{" "}
              <KbdGroup>
                <Kbd size={size}>{notation === "symbols" ? "⌘" : "Ctrl"}</Kbd>
                <span aria-hidden="true" className="text-muted-foreground/60">+</span>
                <Kbd size={size}>K</Kbd>
              </KbdGroup>
              , or execute quick file navigation with{" "}
              <KbdGroup>
                <Kbd size={size}>{notation === "symbols" ? "⌘" : "Ctrl"}</Kbd>
                <span aria-hidden="true" className="text-muted-foreground/60">+</span>
                <Kbd size={size}>{notation === "symbols" ? "⇧" : "Shift"}</Kbd>
                <span aria-hidden="true" className="text-muted-foreground/60">+</span>
                <Kbd size={size}>P</Kbd>
              </KbdGroup>
              .
            </p>
          </div>

          {/* 2. Command Palette / Menu Item Row */}
          <div className="space-y-2 pt-2 border-t border-border/40">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Command Palette &amp; Action Hints
            </h4>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors cursor-default">
                <div className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                  <HaloIcon icon={Search01Icon} size={16} className="text-muted-foreground" />
                  <span>Search Documentation &amp; APIs</span>
                </div>
                <KbdGroup>
                  <Kbd size={size}>{notation === "symbols" ? "⌘" : "Ctrl"}</Kbd>
                  <Kbd size={size}>F</Kbd>
                </KbdGroup>
              </div>

              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors cursor-default">
                <div className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                  <HaloIcon icon={SparklesIcon} size={16} className="text-amber-500" />
                  <span>Toggle AI Optimization Engine</span>
                </div>
                <KbdGroup>
                  <Kbd size={size}>{notation === "symbols" ? "⌥" : "Alt"}</Kbd>
                  <Kbd size={size}>A</Kbd>
                </KbdGroup>
              </div>

              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors cursor-default">
                <div className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                  <HaloIcon icon={SlidersHorizontalIcon} size={16} className="text-muted-foreground" />
                  <span>Open Workspace Preferences</span>
                </div>
                <KbdGroup>
                  <Kbd size={size}>{notation === "symbols" ? "⌘" : "Ctrl"}</Kbd>
                  <Kbd size={size}>,</Kbd>
                </KbdGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
