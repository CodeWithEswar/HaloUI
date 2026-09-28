"use client";

import * as React from "react";
import {
  Callout,
  CalloutTitle,
  CalloutContent,
  type CalloutTone,
  type CalloutIntensity,
} from "@/components/ui/callout";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
  type TelemetryItem,
} from "@/components/docs/preview-stage-shell";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  SparklesIcon,
  HelpCircleIcon,
  InformationCircleIcon,
  StarIcon,
  Alert02Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const CONTAINER_WIDTH_OPTIONS = [
  { value: "full", label: "Full Container (100%)" },
  { value: "1024", label: "Desktop (1024px)" },
  { value: "768", label: "Tablet (768px)" },
  { value: "640", label: "Phablet (640px)" },
  { value: "480", label: "Mobile Large (480px)" },
  { value: "390", label: "iPhone Pro (390px)" },
  { value: "320", label: "Mobile Min (320px)" },
  { value: "280", label: "Micro Panel (280px)" },
  { value: "240", label: "Extreme 240px (240px)" },
];

const SCENARIOS = [
  { value: "standard", label: "Documentation Guidance" },
  { value: "technical", label: "Architecture / Code Detail" },
  { value: "nested", label: "List & Action Guidance" },
  { value: "compact", label: "Minimal Inline Note" },
];

export function CalloutPreviewStage() {
  const [tone, setTone] = React.useState<CalloutTone>("note");
  const [intensity, setIntensity] = React.useState<CalloutIntensity>("subtle");
  const [scenario, setScenario] = React.useState("standard");
  const [containerWidth, setContainerWidth] = React.useState("full");
  const [withTitle, setWithTitle] = React.useState(true);
  const [withCustomIcon, setWithCustomIcon] = React.useState(false);
  const [backdrop, setBackdrop] = React.useState("mesh");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");

  const handleReset = () => {
    setTone("note");
    setIntensity("subtle");
    setScenario("standard");
    setContainerWidth("full");
    setWithTitle(true);
    setWithCustomIcon(false);
  };

  const titles: Record<CalloutTone, string> = {
    note: "Liquid Optical Transmission Note",
    tip: "Best Practice: Compound Tokens",
    important: "Strict Architectural Mandate",
    warning: "Potential Gradient Banding Risk",
    caution: "High-Risk Material Performance Degradation",
  };

  const descriptions: Record<CalloutTone, string> = {
    note: "HaloUI surfaces compute transmission dynamically across 10 discrete physical optical layers rather than arbitrary opacity blurs.",
    tip: "When designing documentation callouts, prefer subtle intensity to prioritize prose legibility over aggressive refraction highlights.",
    important: "All interactive HaloUI components must support container queries (@container) down to 240px with zero JS breakpoint listeners.",
    warning: "Exceeding 3 nested translucent liquid containers on GPU-constrained mobile devices can trigger compositor layer thrashing.",
    caution: "Directly applying blur filters over text glyphs or barcode scans destroys optical clarity and fails WCAG 2.1 AA readability mandates.",
  };

  const telemetryItems: TelemetryItem[] = [
    { label: "Semantic Tone", value: tone },
    { label: "Material Mode", value: intensity },
    { label: "Container Mode", value: containerWidth === "full" ? "Fluid 100%" : `${containerWidth}px` },
    { label: "Custom Icon", value: withCustomIcon ? "Yes" : "Default Hugeicon" },
  ];

  const codeSnippet = `<Callout
  tone="${tone}"
  intensity="${intensity}"${withCustomIcon ? '\n  icon={<HaloIcon icon={SparklesIcon} size="md" />}' : ''}
>
  ${withTitle ? `<CalloutTitle>${titles[tone]}</CalloutTitle>\n  ` : ''}<CalloutContent>
    ${descriptions[tone]}
  </CalloutContent>
</Callout>`;

  return (
    <PreviewStageShell
      title="Callout"
      description="Contextual documentation and technical guidance callout primitive engineered with Subtle/Balanced Liquid Glass, automatic container-aware reflow, and 5 semantic tones."
      badge="Feedback & Status 04"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      telemetry={telemetryItems}
      viewport={viewport}
      onViewportChange={setViewport}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      onReset={handleReset}
      code={codeSnippet}
      controls={
        <div className="w-full flex flex-col gap-2.5">
          {/* Main Controls Row: Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            <StageControlSelect
              label="Semantic Tone"
              value={tone}
              options={[
                { value: "note", label: "Note (Informational)" },
                { value: "tip", label: "Tip (Best Practice)" },
                { value: "important", label: "Important (Priority)" },
                { value: "warning", label: "Warning (Caution)" },
                { value: "caution", label: "Caution (Data Loss)" },
              ]}
              onChange={(val) => setTone(val as CalloutTone)}
            />

            <StageControlSelect
              label="Material Intensity"
              value={intensity}
              options={[
                { value: "subtle", label: "Subtle (Reading-First Glass)" },
                { value: "balanced", label: "Balanced (High Contrast)" },
                { value: "plain", label: "Plain (Zero Transparency)" },
              ]}
              onChange={(val) => setIntensity(val as CalloutIntensity)}
            />

            <StageControlSelect
              label="Scenario Content"
              value={scenario}
              options={SCENARIOS}
              onChange={setScenario}
            />

            <StageControlSelect
              label="Container Width"
              value={containerWidth}
              options={CONTAINER_WIDTH_OPTIONS}
              onChange={setContainerWidth}
            />
          </div>

          {/* Interactive Flags Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-muted-foreground border-t border-border/40">
            <div className="flex items-center gap-2">
              <Checkbox
                id="callout-with-title"
                checked={withTitle}
                onCheckedChange={(checked) => setWithTitle(Boolean(checked))}
              />
              <Label htmlFor="callout-with-title" className="text-xs cursor-pointer select-none">
                Show Title Heading
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="callout-custom-icon"
                checked={withCustomIcon}
                onCheckedChange={(checked) => setWithCustomIcon(Boolean(checked))}
              />
              <Label htmlFor="callout-custom-icon" className="text-xs cursor-pointer select-none">
                Custom Leading Icon
              </Label>
            </div>
          </div>
        </div>
      }
    >
      <div
        className={cn(
          "w-full transition-all duration-300 ease-out flex justify-center py-6 px-2 sm:px-4",
          containerWidth !== "full" && "mx-auto"
        )}
        style={{
          maxWidth: containerWidth === "full" ? "100%" : `${containerWidth}px`,
        }}
      >
        <Callout
          tone={tone}
          intensity={intensity}
          icon={withCustomIcon ? <HaloIcon icon={SparklesIcon} size="md" className="text-amber-500" /> : undefined}
        >
          {withTitle && <CalloutTitle>{titles[tone]}</CalloutTitle>}
          <CalloutContent>
            {scenario === "technical" ? (
              <>
                <p>
                  To prevent layout thrashing during continuous resizing, wrap the callout within an isolated CSS container query context:
                </p>
                <code className="text-[11px] block p-2 rounded bg-black/5 dark:bg-white/10 mt-1 font-mono break-all">
                  @container/callout (max-width: 320px) &#123; flex-direction: column; &#125;
                </code>
              </>
            ) : scenario === "nested" ? (
              <>
                <p>{descriptions[tone]}</p>
                <ul className="mt-2 space-y-1">
                  <li>Respects system reduced transparency preferences</li>
                  <li>Maintains 4.5:1 text-to-background contrast across light/dark</li>
                  <li>Pure Hugeicons iconography with zero Lucide dependencies</li>
                </ul>
              </>
            ) : scenario === "compact" ? (
              <p>{descriptions[tone]}</p>
            ) : (
              <>
                <p>{descriptions[tone]}</p>
                <p className="mt-1">
                  Learn more in the <a href="/docs/liquid-material">Liquid Material specification</a>.
                </p>
              </>
            )}
          </CalloutContent>
        </Callout>
      </div>
    </PreviewStageShell>
  );
}
