"use client";

import * as React from "react";
import {
  SparklesIcon,
  Sun01Icon,
  Moon02Icon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon,
  Layers01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { cn } from "@/lib/utils";

/**
 * 1. SurfaceSeparationComparison
 * Demonstrates: Insufficient separation vs Balanced vs Excessive opacity.
 */
export function SurfaceSeparationComparison() {
  return (
    <div className="my-6 rounded-2xl border border-border bg-muted/20 p-5 sm:p-6 overflow-hidden">
      <div className="mb-4 text-xs font-semibold text-foreground">
        Surface Body &amp; Tint Calibration
      </div>
      {/* Multi-pattern background substrate */}
      <div className="relative rounded-xl border border-border bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-amber-500/15 p-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:16px_16px] opacity-30" />

        <div className="relative grid gap-4 sm:grid-cols-3">
          {/* Card 1: Insufficient Separation */}
          <div className="rounded-xl border border-white/20 bg-white/15 dark:bg-black/15 backdrop-blur-[4px] p-4 text-xs shadow-xs">
            <div className="mb-2 font-mono text-[10px] text-muted-foreground uppercase font-semibold">
              Insufficient Separation
            </div>
            <h4 className="font-semibold text-foreground/70">Unanchored Text</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground/80">
              Low opacity (15%) causes substrate details to bleed through, degrading text contrast.
            </p>
          </div>

          {/* Card 2: Balanced (HaloUI Default) */}
          <div className="rounded-xl border border-[var(--halo-edge)] bg-[var(--halo-surface)] backdrop-blur-[16px] shadow-[var(--halo-shadow-elevated)] p-4 text-xs ring-1 ring-emerald-500/30">
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase font-semibold">
              <span className="text-emerald-600 dark:text-emerald-400">Balanced (Default)</span>
              <span className="text-emerald-600 dark:text-emerald-400">&bull; 72%</span>
            </div>
            <h4 className="font-semibold text-foreground">Stable Reading Plane</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Balanced tint (72%) preserves environmental awareness while guaranteeing WCAG 2.1 AA legibility.
            </p>
          </div>

          {/* Card 3: Excessive Opacity */}
          <div className="rounded-xl border border-border bg-background p-4 text-xs shadow-sm">
            <div className="mb-2 font-mono text-[10px] text-muted-foreground uppercase font-semibold">
              Excessive Opacity
            </div>
            <h4 className="font-semibold text-foreground">Opaque Container</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Near-total opacity (98%) suppresses environmental context completely, acting as a flat card.
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        A surface should never become so transparent that the component loses visual ownership of its content.
      </p>
    </div>
  );
}

/**
 * 2. EdgeComparison
 * Demonstrates: Uniform border vs Optical edge.
 */
export function EdgeComparison() {
  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 text-xs font-semibold text-foreground">
        Edge Differentiation: Uniform Border vs Optical Edge
      </div>
      <div className="relative rounded-xl border border-border bg-muted/30 p-6 overflow-hidden">
        <div className="relative grid gap-6 sm:grid-cols-2">
          {/* Uniform Border */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
            <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
              <span className="font-semibold text-xs text-foreground">Uniform Border</span>
              <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                Conventional
              </span>
            </div>
            <div className="rounded-xl border-2 border-stone-300 dark:border-stone-700 bg-background/80 p-4 text-xs space-y-2">
              <span className="font-medium text-foreground block">Flat 1px / 2px Stroke</span>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Uniform stroke with identical luminance across all sides. Fails to simulate depth or incoming virtual lighting.
              </p>
            </div>
          </div>

          {/* Optical Edge */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs ring-1 ring-emerald-500/20">
            <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
              <span className="font-semibold text-xs text-foreground">HaloUI Optical Edge</span>
              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                Directional
              </span>
            </div>
            <div className="relative rounded-xl border border-[var(--halo-edge)] bg-[var(--halo-surface)] backdrop-blur-md shadow-[var(--halo-shadow-elevated)] p-4 text-xs space-y-2 before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:rounded-[inherit] before:shadow-[var(--halo-edge-inner)]">
              <span className="font-medium text-foreground block">Direction-Aware Micro-Rim</span>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Luminous top chamfer catch facing the 135&deg; light source plus grounding hairline bottom boundary.
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Directional edge treatment must remain subtle enough that the component still reads correctly when the effect is unavailable.
      </p>
    </div>
  );
}

/**
 * 3. DiffusionComparison
 * Demonstrates: Low diffusion (8px) vs Balanced (16px) vs High (28px).
 */
export function DiffusionComparison() {
  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 text-xs font-semibold text-foreground">
        Diffusion Comparison: Environmental Legibility
      </div>
      {/* Contextual test pattern substrate */}
      <div className="relative rounded-xl border border-border bg-[#0f1115] p-6 overflow-hidden">
        {/* Geometric test markings behind glass */}
        <div className="absolute inset-0 flex items-center justify-around opacity-40 select-none">
          <span className="text-5xl font-black text-rose-500">TEST</span>
          <span className="text-5xl font-black text-cyan-400">DIFF</span>
          <span className="text-5xl font-black text-amber-400">BLUR</span>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-3">
          {/* 8px */}
          <div className="rounded-xl border border-white/20 bg-black/40 backdrop-blur-[8px] p-4 text-xs text-white space-y-1.5 shadow-sm">
            <span className="font-mono text-[10px] text-stone-400 uppercase font-semibold">Low Diffusion</span>
            <div className="font-semibold text-xs">8px Blur</div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              Background shapes clearly visible. Ideal for dense tables and forms where high-frequency blur wastes GPU cycles.
            </p>
          </div>

          {/* 16px */}
          <div className="rounded-xl border border-white/30 bg-black/50 backdrop-blur-[16px] p-4 text-xs text-white space-y-1.5 shadow-md ring-1 ring-emerald-400/40">
            <span className="font-mono text-[10px] text-emerald-400 uppercase font-semibold">Balanced (Default)</span>
            <div className="font-semibold text-xs">16px Blur</div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              Background softened into color washes. Text remains legible while maintaining environmental presence.
            </p>
          </div>

          {/* 28px */}
          <div className="rounded-xl border border-white/40 bg-black/60 backdrop-blur-[28px] p-4 text-xs text-white space-y-1.5 shadow-lg">
            <span className="font-mono text-[10px] text-stone-400 uppercase font-semibold">High Diffusion</span>
            <div className="font-semibold text-xs">28px Blur</div>
            <p className="text-[11px] text-stone-300 leading-relaxed">
              High-frequency noise fully diffused. Reserved for high-elevation floating docks, modals, and showcase panels.
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Blur is an implementation technique. Diffusion is the design property.
      </p>
    </div>
  );
}

/**
 * 4. RefractionComparison
 * Demonstrates: None vs Restrained vs Excessive.
 */
export function RefractionComparison() {
  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 text-xs font-semibold text-foreground">
        Refraction Threshold: Physical Rim vs Distortion
      </div>
      <div className="relative rounded-xl border border-border bg-muted/40 p-6 overflow-hidden">
        {/* Continuous high-contrast lines underneath */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--border)_0,var(--border)_2px,transparent_2px,transparent_16px)] opacity-50" />

        <div className="relative grid gap-4 sm:grid-cols-3">
          {/* None */}
          <div className="rounded-xl border border-border bg-card p-4 text-xs space-y-1.5">
            <span className="font-mono text-[10px] text-muted-foreground uppercase font-semibold">None (0px)</span>
            <div className="font-semibold text-xs text-foreground">Flat Surface</div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Zero optical thickness. Edge reads as a flat boundary without physical displacement.
            </p>
          </div>

          {/* Restrained */}
          <div className="relative rounded-xl border border-[var(--halo-edge)] bg-[var(--halo-surface)] backdrop-blur-md p-4 text-xs space-y-1.5 ring-1 ring-emerald-500/20 shadow-[var(--halo-shadow-elevated)]">
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/25 to-transparent rounded-t-xl" />
            <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
              Restrained (1px Rim)
            </span>
            <div className="font-semibold text-xs text-foreground">HaloUI Rim Displacement</div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Subtle 1px edge catch communicating glass density without distorting internal text legibility.
            </p>
          </div>

          {/* Excessive */}
          <div className="rounded-xl border border-red-500/30 bg-card p-4 text-xs space-y-1.5 opacity-90">
            <span className="font-mono text-[10px] text-red-500 uppercase font-semibold">Excessive Distortion</span>
            <div className="font-semibold text-xs text-foreground">Distorted Container</div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Heavy lens distortion and warped pixels degrade legibility and trigger motion discomfort.
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Diffusion softens information behind the material. Refraction changes where that information appears to be perceived.
      </p>
    </div>
  );
}

/**
 * 5. ElevationScaleVisual
 * Demonstrates the 5 canonical elevation tiers: Inset, Base, Raised, Floating, Overlay.
 */
export function ElevationScaleVisual() {
  const tiers = [
    {
      name: "Inset",
      role: "Recessed cavity",
      style: "bg-[var(--halo-surface-recessed)] shadow-inner border border-black/5 dark:border-white/5",
      detail: "Inner contact shadow",
    },
    {
      name: "Base",
      role: "Layout tier",
      style: "bg-[var(--halo-surface)] shadow-[var(--halo-shadow-contact)] border border-[var(--halo-edge-soft)]",
      detail: "Tight contact drop",
    },
    {
      name: "Raised",
      role: "Standard (Default)",
      style: "bg-[var(--halo-surface-elevated)] shadow-[var(--halo-shadow-elevated)] border border-[var(--halo-edge)] ring-1 ring-emerald-500/20",
      detail: "Contact + elevated shadow",
    },
    {
      name: "Floating",
      role: "Docks, menus",
      style: "bg-[var(--halo-surface-strong)] shadow-[var(--halo-shadow-ambient)] border border-[var(--halo-edge-bright)]",
      detail: "Wide ambient dispersion",
    },
    {
      name: "Overlay",
      role: "Modals, dialogs",
      style: "bg-[var(--halo-surface-strong)] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.25)] border border-border ring-1 ring-border",
      detail: "Full depth occlusion",
    },
  ];

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 text-xs font-semibold text-foreground">
        The Five Canonical Elevation Tiers
      </div>
      <div className="grid gap-3 sm:grid-cols-5">
        {tiers.map((tier, idx) => (
          <div
            key={tier.name}
            className={cn(
              "rounded-xl p-4 flex flex-col justify-between text-xs transition-transform hover:-translate-y-0.5",
              tier.style
            )}
          >
            <div>
              <span className="font-mono text-[10px] text-muted-foreground uppercase font-semibold">
                Tier 0{idx + 1}
              </span>
              <h4 className="font-semibold text-foreground mt-0.5">{tier.name}</h4>
              <p className="text-[10px] text-muted-foreground mt-1">{tier.role}</p>
            </div>
            <div className="mt-4 pt-2 border-t border-border/40 font-mono text-[9px] text-muted-foreground">
              {tier.detail}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Elevation affects surface tint, edge clarity, highlight intensity, diffusion, and environmental separation together.
      </p>
    </div>
  );
}

/**
 * 6. VirtualLightPreview
 * Interactive 135° virtual light vector playground.
 */
export function VirtualLightPreview() {
  const [angle, setAngle] = React.useState<number>(135);

  const angles = [45, 90, 135, 180, 225];

  // Derive directional specular highlight from angle
  const rad = (angle * Math.PI) / 180;
  const shadowX = -Math.round(Math.cos(rad) * 6);
  const shadowY = Math.round(Math.sin(rad) * 8);

  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-xs font-semibold text-foreground">Interactive Virtual Light Vector</div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Adjust the light source angle to observe synchronized specular reflections, optical edge illumination, and contact shadow cast.
          </p>
        </div>
        <div className="flex items-center gap-1">
          {angles.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAngle(a)}
              className={cn(
                "rounded-md border px-2 py-0.5 text-[11px] font-mono transition-colors",
                angle === a
                  ? "border-foreground bg-foreground text-background font-semibold"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              )}
            >
              {a}&deg;{a === 135 ? " (HaloUI Default)" : ""}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-64 rounded-xl border border-border bg-muted/20 p-6 flex items-center justify-center overflow-hidden select-none isolate">
        {/* Dynamic Light Beam Indicator */}
        <div
          className="absolute size-44 rounded-full pointer-events-none opacity-20 blur-2xl transition-all duration-300"
          style={{
            transform: `translate(${Math.cos(rad) * 90}px, ${-Math.sin(rad) * 90}px)`,
            background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)",
          }}
        />

        {/* Dynamic Light-Reactive Surface */}
        <div
          className="relative w-full max-w-xs rounded-2xl p-6 transition-all duration-300 border bg-[var(--halo-surface-elevated)] backdrop-blur-md"
          style={{
            borderColor: "var(--halo-edge)",
            boxShadow: `${shadowX}px ${shadowY}px 24px -4px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06)`,
            backgroundImage: `linear-gradient(${angle}deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.02) 40%, transparent 100%)`,
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-foreground">Light Vector Response</span>
            <span className="font-mono text-[10px] text-muted-foreground">{angle}&deg; Azimuth</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Specular highlight and shadow project in coherent optical alignment.
          </p>
          <div className="mt-3 pt-2 border-t border-border/40 flex justify-between items-center text-[10px] font-mono text-muted-foreground">
            <span>Unified Vector</span>
            <span className="text-emerald-500 font-semibold">135&deg; Standard</span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Highlights should reveal geometry, not decorate it.
      </p>
    </div>
  );
}

/**
 * 7. ThemeMaterialComparison
 * Side-by-side synchronized view: Light mode vs Dark mode.
 */
export function ThemeMaterialComparison() {
  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 text-xs font-semibold text-foreground">
        Synchronized Theme Material Comparison
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Light Theme Simulation */}
        <div className="rounded-xl border border-border bg-[#f8f9fa] p-5 text-stone-900 shadow-inner space-y-3">
          <div className="flex items-center justify-between border-b border-black/10 pb-2">
            <div className="flex items-center gap-1.5 font-semibold text-xs text-stone-900">
              <HaloIcon icon={Sun01Icon} size={14} className="text-amber-500" />
              <span>Light Theme Calibration</span>
            </div>
            <span className="font-mono text-[10px] text-stone-500">Luminous Warm Paper</span>
          </div>
          <div className="rounded-xl border border-white/80 bg-white/70 backdrop-blur-md shadow-md p-4 text-xs space-y-1.5">
            <span className="font-semibold text-stone-900 block">Luminous Tint Body</span>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Warm translucent tint with high diffuse reflection. Subtle contact shadows prevent surfaces from bleeding into bright canvases.
            </p>
          </div>
        </div>

        {/* Dark Theme Simulation */}
        <div className="rounded-xl border border-border bg-[#0d0e12] p-5 text-white shadow-inner space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-1.5 font-semibold text-xs text-white">
              <HaloIcon icon={Moon02Icon} size={14} className="text-indigo-400" />
              <span>Dark Theme Calibration</span>
            </div>
            <span className="font-mono text-[10px] text-stone-400">Deep Graphite</span>
          </div>
          <div className="rounded-xl border border-white/15 bg-stone-900/70 backdrop-blur-md shadow-lg p-4 text-xs space-y-1.5">
            <span className="font-semibold text-white block">Deep Graphite Volume</span>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Low-luminance translucent body with disciplined luminous edge rims. Avoids garish neon glows while preserving sharp boundaries.
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        HaloUI material is designed natively for both themes. Dark mode is never derived through naive CSS filter inversion.
      </p>
    </div>
  );
}

/**
 * 8. ComponentMaterialShowcase
 * Curated showcase of real HaloUI component roles.
 */
export function ComponentMaterialShowcase() {
  return (
    <div className="my-6 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="mb-4 text-xs font-semibold text-foreground">
        Material Roles Across Components
      </div>
      <div className="grid gap-4 sm:grid-cols-3 text-xs">
        {/* Button */}
        <div className="rounded-xl border border-border bg-muted/20 p-4 flex flex-col justify-between">
          <div>
            <div className="mb-2 font-mono text-[10px] text-muted-foreground uppercase font-semibold">
              Action Role
            </div>
            <h4 className="font-semibold text-foreground">Button</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Tactile compression on press with tight contact shadows. Prioritizes state feedback over high transparency.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex justify-center">
            <HaloButton variant="primary" size="sm">
              Tactile Action
            </HaloButton>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-border bg-muted/20 p-4 flex flex-col justify-between">
          <div>
            <div className="mb-2 font-mono text-[10px] text-muted-foreground uppercase font-semibold">
              Container Role
            </div>
            <h4 className="font-semibold text-foreground">Card</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Balanced diffusion and optical rim framing structured content over varying application backgrounds.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border">
            <div className="rounded-lg border border-[var(--halo-edge)] bg-[var(--halo-surface)] p-2.5 shadow-[var(--halo-shadow-contact)]">
              <span className="text-[11px] font-medium text-foreground block">Structured Surface</span>
              <span className="text-[10px] text-muted-foreground">16px diffusion</span>
            </div>
          </div>
        </div>

        {/* Dock */}
        <div className="rounded-xl border border-border bg-muted/20 p-4 flex flex-col justify-between">
          <div>
            <div className="mb-2 font-mono text-[10px] text-muted-foreground uppercase font-semibold">
              Floating Role
            </div>
            <h4 className="font-semibold text-foreground">Dock / Nav Bar</h4>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Rich optical intensity with ambient glow and elevated shadows. Suitable for high-hierarchy persistent controls.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex justify-center">
            <div className="rounded-full border border-[var(--halo-edge-bright)] bg-[var(--halo-surface-elevated)] px-3 py-1.5 shadow-[var(--halo-shadow-ambient)] flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-medium text-foreground">Floating Dock</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Material complexity decreases as interface density increases.
      </p>
    </div>
  );
}
