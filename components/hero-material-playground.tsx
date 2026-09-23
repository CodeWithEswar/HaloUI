"use client";

import * as React from "react";
import {
  SparklesIcon,
  ArrowRight01Icon,
  Sun01Icon,
  Moon02Icon,
  PlayIcon,
  Layers01Icon,
  Search01Icon,
  FolderIcon,
  Home01Icon,
  Settings01Icon,
  CommandIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { HaloButton } from "@/components/haloui/button/halo-button";
import { HaloSurface } from "@/components/haloui/foundations/halo-surface";
import { cn } from "@/lib/utils";

export function HeroMaterialPlayground() {
  const [lightCoords, setLightCoords] = React.useState({ x: 40, y: 30 });
  const [switchOn, setSwitchOn] = React.useState(true);
  const [sliderVal, setSliderVal] = React.useState(68);
  const [inputValue, setInputValue] = React.useState("npx shadcn@latest add @haloui/button");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const xPercent = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const yPercent = Math.round(((e.clientY - rect.top) / rect.height) * 100);
      setLightCoords({ x: xPercent, y: yPercent });
    },
    []
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] p-6 sm:p-10 overflow-hidden shadow-[0_24px_64px_-16px_rgba(0,0,0,0.08)] select-none isolate"
    >
      {/* Dynamic Virtual Light Source (Responsive Specular environmental bloom) */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out opacity-25 dark:opacity-15 blur-[100px]"
        style={{
          left: `${lightCoords.x}%`,
          top: `${lightCoords.y}%`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(180,200,240,0.5) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Editorial Watermark & Optical Status */}
      <div className="flex items-center justify-between text-xs font-mono text-stone-400 dark:text-stone-500 mb-8 border-b border-black/[0.04] dark:border-white/[0.05] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>OPTICAL LAB / MATERIAL PLAYGROUND</span>
        </div>
        <div>LIGHT SOURCE: {lightCoords.x}% X, {lightCoords.y}% Y</div>
      </div>

      {/* Floating Optical Surfaces Matrix at Different Depths */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Action & Floating Dock */}
        <div className="md:col-span-6 space-y-6">
          {/* Main Action Showcase Button */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
              01 · Kinetic Action Surface
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <HaloButton
                variant="primary"
                size="lg"
                magnetic
                leftIcon={SparklesIcon}
                rightIcon={ArrowRight01Icon}
              >
                Experience Physical Touch
              </HaloButton>
              <HaloButton variant="subtle" size="lg">
                Inspect Source
              </HaloButton>
            </div>
          </div>

          {/* Floating Liquid Mini Dock */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
              02 · Optical Floating Dock
            </div>
            <HaloSurface
              elevation="floating"
              className="inline-flex flex-row items-center gap-2 p-2 rounded-2xl"
            >
              {[
                { icon: Home01Icon, label: "Home" },
                { icon: Layers01Icon, label: "Components" },
                { icon: CommandIcon, label: "Commands" },
                { icon: SparklesIcon, label: "Optics" },
                { icon: Settings01Icon, label: "Settings" },
              ].map((item, idx) => (
                <button
                  key={item.label}
                  aria-label={item.label}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 halo-tactile-press",
                    idx === 0
                      ? "bg-black/10 dark:bg-white/15 text-foreground shadow-xs"
                      : "text-stone-500 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                  )}
                >
                  <HaloIcon icon={item.icon} size={18} />
                </button>
              ))}
            </HaloSurface>
          </div>
        </div>

        {/* Right Column: Physical Controls & Cards */}
        <div className="md:col-span-6 space-y-6">
          {/* Glass Card with Switch and Slider */}
          <HaloSurface elevation="raised" className="p-6 rounded-2xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-stone-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                NEOSKEUOMORPHIC CONTROLS
              </span>
              <span className="text-[10px] font-mono text-stone-400">INDEX: 1.52</span>
            </div>

            {/* Tactile Switch Simulation */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-medium text-stone-900 dark:text-stone-200">
                  Specular Highlight Catch
                </div>
                <div className="text-[11px] text-stone-500">
                  Adjusts rim reflection vector
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSwitchOn(!switchOn)}
                role="switch"
                aria-checked={switchOn}
                className={cn(
                  "relative w-12 h-7 rounded-full p-1 transition-colors duration-200 border",
                  switchOn
                    ? "bg-stone-900 dark:bg-white border-stone-800 dark:border-white"
                    : "bg-black/10 dark:bg-white/10 border-black/10 dark:border-white/10"
                )}
              >
                <span
                  className={cn(
                    "block w-5 h-5 rounded-full bg-white dark:bg-stone-900 shadow-sm transition-transform duration-200",
                    switchOn ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            {/* Tactile Slider Simulation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600 dark:text-stone-400">Diffusion Depth</span>
                <span className="font-mono text-stone-500">{sliderVal}%</span>
              </div>
              <div className="relative flex items-center">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-black/10 dark:bg-white/10 accent-stone-900 dark:accent-white"
                />
              </div>
            </div>

            {/* Illuminated Glass Input */}
            <div className="space-y-1 pt-1">
              <div className="text-[11px] font-mono text-stone-400 uppercase">
                Registry Stream
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full text-xs font-mono h-9 px-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>
            </div>
          </HaloSurface>
        </div>
      </div>
    </div>
  );
}
