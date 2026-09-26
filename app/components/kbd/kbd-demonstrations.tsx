"use client";

import * as React from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  CheckmarkCircle02Icon,
  HelpCircleIcon,
  InformationCircleIcon,
  Layers01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function KbdDemonstrations() {
  return (
    <div className="space-y-12">
      {/* 1. Single Keys & Natural Sizing */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Single Keys &amp; Natural Width Expansion
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Single characters respect a square minimum inline dimension, while longer keycap labels expand naturally without causing layout collapse.
          </p>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-6 flex flex-wrap items-center gap-3">
          <Kbd>Esc</Kbd>
          <Kbd>Tab</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd>Space</Kbd>
          <Kbd>Backspace</Kbd>
          <Kbd>CapsLock</Kbd>
          <Kbd>Page Up</Kbd>
          <Kbd>Page Down</Kbd>
          <Kbd>Delete</Kbd>
        </div>
      </section>

      {/* 2. Modifier Combinations & Platform Notation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Platform Notation: Symbols vs Words
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            HaloUI Kbd renders exactly the notation supplied by the consumer. It deliberately avoids platform guessing at render time to prevent hydration mismatches during Server-Side Rendering.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-3">
            <span className="text-xs font-mono font-medium text-muted-foreground uppercase">
              macOS Notation (Symbols)
            </span>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-foreground">Command Palette</span>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-foreground">Developer Tools</span>
                <KbdGroup>
                  <Kbd>⌥</Kbd>
                  <Kbd>⌘</Kbd>
                  <Kbd>I</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-foreground">Quick Open File</span>
                <KbdGroup>
                  <Kbd>⇧</Kbd>
                  <Kbd>⌘</Kbd>
                  <Kbd>O</Kbd>
                </KbdGroup>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-5 space-y-3">
            <span className="text-xs font-mono font-medium text-muted-foreground uppercase">
              Windows &amp; Linux Notation (Words)
            </span>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-foreground">Command Palette</span>
                <KbdGroup>
                  <Kbd>Ctrl</Kbd>
                  <span aria-hidden="true" className="text-muted-foreground/60">+</span>
                  <Kbd>K</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/40">
                <span className="text-foreground">Developer Tools</span>
                <KbdGroup>
                  <Kbd>Ctrl</Kbd>
                  <span aria-hidden="true" className="text-muted-foreground/60">+</span>
                  <Kbd>Shift</Kbd>
                  <span aria-hidden="true" className="text-muted-foreground/60">+</span>
                  <Kbd>I</Kbd>
                </KbdGroup>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-foreground">Quick Open File</span>
                <KbdGroup>
                  <Kbd>Ctrl</Kbd>
                  <span aria-hidden="true" className="text-muted-foreground/60">+</span>
                  <Kbd>P</Kbd>
                </KbdGroup>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sizing Scale */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Proportional Sizing Scale
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Three compact size options designed specifically for dense UI tables, inline documentation prose, and enlarged callouts.
          </p>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">Small:</span>
            <KbdGroup>
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">C</Kbd>
            </KbdGroup>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">Default:</span>
            <KbdGroup>
              <Kbd size="default">⌘</Kbd>
              <Kbd size="default">C</Kbd>
            </KbdGroup>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">Large:</span>
            <KbdGroup>
              <Kbd size="lg">⌘</Kbd>
              <Kbd size="lg">C</Kbd>
            </KbdGroup>
          </div>
        </div>
      </section>

      {/* 4. Parent Ownership & Semantic Integrity */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Parent Ownership &amp; Non-Interactivity Invariants
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            When Kbd appears inside buttons or interactive menu controls, the parent owns keyboard focus and click handling. Kbd remains purely presentational.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <HaloIcon icon={CheckmarkCircle02Icon} size={16} className="text-emerald-500" />
              <span>Native &lt;kbd&gt; Semantics</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Provides genuine HTML input notation without injecting artificial ARIA button roles or tab stops.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <HaloIcon icon={CheckmarkCircle02Icon} size={16} className="text-emerald-500" />
              <span>Copyable &amp; Selectable</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Users can select and copy keycap strings inside instructions and documentation freely.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <HaloIcon icon={CheckmarkCircle02Icon} size={16} className="text-emerald-500" />
              <span>Zero Runtime JS</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Functions as a pure Server Component without client bundle overhead, effects, or hydration delays.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
