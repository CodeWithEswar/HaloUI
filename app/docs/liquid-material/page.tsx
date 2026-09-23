import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  SparklesIcon,
  ArrowRight01Icon,
  Layers01Icon,
  InformationCircleIcon,
  CheckmarkCircle01Icon,
  CpuIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";

export const metadata: Metadata = {
  title: "Liquid Optical Engine — Documentation | HaloUI",
  description:
    "The 10-layer physical optical engine: virtual lighting, specular reflection, contact shadows, neoskeuomorphic depth, and GPU optimization.",
};

const LAYERS = [
  {
    num: "Layer 01",
    name: "Base Tint Body",
    purpose: "Defines the physical translucent volume of the material.",
    rules: "Avoid murky grey tints. Light theme uses warm luminous translucent bodies; Dark theme uses deep graphite translucency.",
  },
  {
    num: "Layer 02",
    name: "Background Diffusion",
    purpose: "Softly diffuses background noise while maintaining high contrast.",
    rules: "GPU-bounded blurs (8px for subtle, 16px for balanced, 28px for rich). Never stack uncontrolled multiple full-screen blurs.",
  },
  {
    num: "Layer 03",
    name: "Dual Optical Edge",
    purpose: "Creates crisp physical separation between the surface and surrounding environment.",
    rules: "Composed of an internal inset catch (highlighting the top inner rim) and an external 1px boundary.",
  },
  {
    num: "Layer 04",
    name: "Directional Specular Highlight",
    purpose: "Simulates environmental light bouncing off the glass surface.",
    rules: "Anchored to a virtual light source at 135° (upper-left/center). Highlights respond to geometry, never arbitrary gradients.",
  },
  {
    num: "Layer 05",
    name: "Refraction Rim",
    purpose: "Subtle optical displacement near top edges communicating physical material thickness.",
    rules: "Restrained 1px hairline highlight. Stays under 20% opacity in dark theme.",
  },
  {
    num: "Layer 06",
    name: "Contact Shadow",
    purpose: "Anchors the optical object to the surface beneath it.",
    rules: "Tightly grouped multi-stop shadow (contact + elevated ambient). Compresses on press.",
  },
  {
    num: "Layer 07",
    name: "Ambient Luminous Glow",
    purpose: "Used selectively for active, selected, or focal elevated states.",
    rules: "Never applied everywhere. Preserved for high-value interactive states.",
  },
  {
    num: "Layer 08",
    name: "Micro-Grain Noise",
    purpose: "Prevents synthetic digital banding and adds organic tactile richness.",
    rules: "Ultra-low opacity (2.5% - 3.5%) SVG fractal turbulence texture.",
  },
  {
    num: "Layer 09",
    name: "Content Isolation",
    purpose: "Ensures typography, icons, and interactive elements remain razor-sharp.",
    rules: "Isolated on top with crisp text rendering and guaranteed WCAG 2.1 AA contrast ratios.",
  },
  {
    num: "Layer 10",
    name: "Tactile Interaction Layer",
    purpose: "Physical feedback on hover, press, focus, and pointer proximity.",
    rules: "Tactile compression (scale 0.98, translateY 1px) and restrained magnetic pull.",
  },
];

export default function LiquidMaterialDocPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-3 border-b border-black/[0.06] dark:border-white/[0.06] pb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
          Architecture / Philosophy
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-950 dark:text-white">
          The Liquid Optical Engine
        </h1>
        <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
          HaloUI treats glass as a physical optical material rather than flat decoration. This document outlines the 10-layer architectural model, virtual lighting theory, and performance guidelines.
        </p>
      </div>

      {/* The 10 Optical Layers Deep Dive */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">
          The 10 Optical Layers
        </h2>

        <div className="space-y-4">
          {LAYERS.map((layer) => (
            <HaloSurface
              key={layer.num}
              elevation="raised"
              className="p-6 rounded-2xl space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-stone-400 font-semibold">
                    {layer.num}
                  </span>
                  <span className="font-semibold text-base text-stone-900 dark:text-white">
                    {layer.name}
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs font-medium text-stone-600 dark:text-stone-300">
                {layer.purpose}
              </p>
              <p className="text-xs text-stone-500 leading-relaxed">
                <span className="font-semibold text-stone-700 dark:text-stone-400">Implementation Rule: </span>
                {layer.rules}
              </p>
            </HaloSurface>
          ))}
        </div>
      </section>

      {/* Virtual Lighting Model */}
      <section className="space-y-4 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
        <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">
          Unified Virtual Lighting Model
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          Random highlights across different cards destroy the illusion of physical space. In HaloUI, every optical surface adheres to an implicit virtual light source positioned at <strong>135° (upper-left / upper-center)</strong>.
        </p>
        <div className="p-6 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] flex items-center justify-between">
          <div className="space-y-1">
            <div className="font-semibold text-sm">Light Source Vector: 135° Top-Left</div>
            <div className="text-xs text-stone-500">Affects specular reflection, inner edge brightness, and shadow projection uniformly.</div>
          </div>
          <HaloButton variant="primary" size="sm" leftIcon={SparklesIcon}>
            Sample Ray Catch
          </HaloButton>
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="pt-8 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
        <div>
          <div className="text-xs font-mono text-stone-400">First Component Implementation</div>
          <div className="font-semibold text-sm text-stone-900 dark:text-white">Inspect the Button Vertical Slice</div>
        </div>
        <Link href="/components/button">
          <HaloButton variant="primary" size="md" rightIcon={ArrowRight01Icon}>
            Explore Button Spec
          </HaloButton>
        </Link>
      </section>
    </div>
  );
}
