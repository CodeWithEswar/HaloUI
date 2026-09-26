"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  LinkPreview,
  LinkPreviewTrigger,
  LinkPreviewContent,
  LinkPreviewTitle,
  LinkPreviewDescription,
  LinkPreviewMetadata,
} from "@/components/ui/link-preview";
import {
  Analytics01Icon,
  GlobalIcon,
  ArrowRight01Icon,
  Shield01Icon,
  Activity01Icon,
  Time02Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function LinkPreviewPreviewStage() {
  const stageContainerRef = React.useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [intensity, setIntensity] = React.useState<"subtle" | "balanced" | "rich">("balanced");
  const [side, setSide] = React.useState<"bottom" | "top" | "left" | "right">("bottom");
  const [delay, setDelay] = React.useState<number>(300);

  const handleReset = React.useCallback(() => {
    setActiveTab("preview");
    setBackdrop("neutral");
    setViewport("desktop");
    setIntensity("balanced");
    setSide("bottom");
    setDelay(300);
  }, []);

  const generatedCode = React.useMemo(() => {
    return `import {
  LinkPreview,
  LinkPreviewTrigger,
  LinkPreviewContent,
  LinkPreviewTitle,
  LinkPreviewDescription,
  LinkPreviewMetadata,
} from "@/components/ui/link-preview";
import { Analytics01Icon, Activity01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function DocumentationParagraph() {
  return (
    <p className="text-sm leading-relaxed text-muted-foreground">
      Evaluate cluster telemetry and visitor conversion metrics inside the{" "}
      <LinkPreview openDelay={${delay}}>
        <LinkPreviewTrigger href="/analytics">
          live analytics dashboard
        </LinkPreviewTrigger>

        <LinkPreviewContent
          side="${side}"
          intensity="${intensity}"
          className="w-80"
        >
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <HaloIcon icon={Analytics01Icon} size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <LinkPreviewTitle>Live Telemetry &amp; Analytics</LinkPreviewTitle>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <LinkPreviewDescription>
                Real-time edge performance, ingestion rate, and regional node latency telemetry.
              </LinkPreviewDescription>
              <LinkPreviewMetadata>
                <HaloIcon icon={Activity01Icon} size={13} className="text-primary" />
                <span>99.98% uptime</span>
                <span className="text-border">•</span>
                <span>haloui.dev/analytics</span>
              </LinkPreviewMetadata>
            </div>
          </div>
        </LinkPreviewContent>
      </LinkPreview>{" "}
      to observe pipeline traffic without interrupting your immediate workflow.
    </p>
  );
}`;
  }, [delay, side, intensity]);

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
        { label: "Target Destination", value: "/analytics", variant: "success" },
        { label: "Trigger Element", value: "Native <a> (Semantic Anchor)" },
        { label: "Activation Model", value: "Hover/Focus Preview, Click Navigates" },
        { label: "Material Tier", value: intensity },
      ]}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full">
          <StageControlSelect
            label="Material Intensity"
            value={intensity}
            onChange={(v) => setIntensity(v as "subtle" | "balanced" | "rich")}
            options={[
              { value: "subtle", label: "Subtle (12px blur)" },
              { value: "balanced", label: "Balanced (24px blur)" },
              { value: "rich", label: "Rich (36px blur)" },
            ]}
          />
          <StageControlSelect
            label="Placement Side"
            value={side}
            onChange={(v) => setSide(v as "bottom" | "top" | "left" | "right")}
            options={[
              { value: "bottom", label: "Bottom" },
              { value: "top", label: "Top" },
              { value: "right", label: "Right" },
              { value: "left", label: "Left" },
            ]}
          />
          <StageControlSelect
            label="Hover Delay"
            value={String(delay)}
            onChange={(v) => setDelay(Number(v))}
            options={[
              { value: "150", label: "150ms (Snappy)" },
              { value: "300", label: "300ms (Standard)" },
              { value: "600", label: "600ms (Deliberate)" },
            ]}
          />
        </div>
      }
    >
      <div ref={stageContainerRef} className="relative flex flex-col items-center justify-center p-4 sm:p-8 w-full min-h-[460px] overflow-visible">
        {/* Prose Card Demonstrating Inline Link Preview */}
        <div className="halo-liquid-glass-surface w-full max-w-xl rounded-2xl p-6 sm:p-8 relative z-10">
          <div className="mb-4 flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
                Production Release Notes
              </span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Navigation 15
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground mb-3">
            Next-Generation Telemetry &amp; Routing
          </h3>

          <div className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-4">
            HaloUI components now emit automated telemetry traces into the{" "}
            <LinkPreview openDelay={delay}>
              <LinkPreviewTrigger href="#/analytics">
                live analytics dashboard
              </LinkPreviewTrigger>

              <LinkPreviewContent
                side={side}
                intensity={intensity}
                container={stageContainerRef}
                className="w-80"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <HaloIcon icon={Analytics01Icon} size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <LinkPreviewTitle>Live Telemetry &amp; Analytics</LinkPreviewTitle>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 shrink-0">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    </div>
                    <LinkPreviewDescription>
                      Real-time edge performance, ingestion rate, and regional node latency telemetry.
                    </LinkPreviewDescription>
                    <LinkPreviewMetadata>
                      <HaloIcon icon={Activity01Icon} size={13} className="text-primary" />
                      <span>99.98% uptime</span>
                      <span className="text-border">•</span>
                      <span>haloui.dev/analytics</span>
                    </LinkPreviewMetadata>
                  </div>
                </div>
              </LinkPreviewContent>
            </LinkPreview>
            . Operators can inspect inbound throughput, verify{" "}
            <LinkPreview openDelay={delay}>
              <LinkPreviewTrigger href="#/security">
                security boundary policies
              </LinkPreviewTrigger>

              <LinkPreviewContent
                side={side}
                intensity={intensity}
                container={stageContainerRef}
                className="w-80"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <HaloIcon icon={Shield01Icon} size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <LinkPreviewTitle>Security Boundary Audit</LinkPreviewTitle>
                    <LinkPreviewDescription>
                      Zero-trust credential isolation, role enforcement, and encrypted peer channels.
                    </LinkPreviewDescription>
                    <LinkPreviewMetadata>
                      <HaloIcon icon={Time02Icon} size={13} className="text-amber-500" />
                      <span>Updated 4m ago</span>
                      <span className="text-border">•</span>
                      <span>SOC2 Certified</span>
                    </LinkPreviewMetadata>
                  </div>
                </div>
              </LinkPreviewContent>
            </LinkPreview>
            , and review operational alerts without triggering full page reloads or losing reading context.
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40 text-xs text-muted-foreground">
            <span>Hover or Tab focus either link to preview</span>
            <div className="flex items-center gap-1 text-primary font-medium">
              <span>Keyboard Accessible</span>
              <HaloIcon icon={ArrowRight01Icon} size={13} />
            </div>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
