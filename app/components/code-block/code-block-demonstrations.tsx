"use client";

import * as React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  CodeIcon,
  SparklesIcon,
  Layers01Icon,
  CpuIcon,
  File01Icon,
} from "@hugeicons/core-free-icons";

export function CodeBlockDemonstrations() {
  return (
    <div className="space-y-12">
      {/* 1. Liquid Glass Standalone */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            1. Liquid Glass Standalone
          </h3>
          <p className="text-sm text-muted-foreground">
            Hero component presentation with restrained 10-layer physical liquid glass framing, subtle specular highlight, and razor-sharp content reading plane.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/10 via-sky-500/5 to-indigo-500/10 dark:from-slate-950/80 dark:via-sky-950/20 dark:to-indigo-950/30 border border-border/50">
          <CodeBlock
            variant="glass"
            size="default"
            filename="optical-engine.ts"
            language="typescript"
            highlightLines={[4, 11]}
            code={`export interface VirtualLightEngine {
  azimuth: number;    // virtual light angle (135deg)
  intensity: number;  // balanced transmission
  specularRim: boolean;
}

export function computeSpecularReflection(angle: number): string {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad).toFixed(3);
  const y = Math.sin(rad).toFixed(3);
  return \`linear-gradient(\${angle}deg, rgba(255,255,255,0.3) 0%, transparent 60%)\`;
}`}
          />
        </div>
      </section>

      {/* 2. Word Wrap vs Horizontal Scroll */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            2. Word Wrapping & Long Lines
          </h3>
          <p className="text-sm text-muted-foreground">
            Compare non-wrapping horizontal scrolling containment with responsive soft word wrapping that never breaks the containing layout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              No Wrap (Internal Scrollbar)
            </span>
            <CodeBlock
              wrap={false}
              language="bash"
              filename="build-command.sh"
              code={`curl -sSL "https://registry.haloui.dev/packages/@haloui/optical-engine/v2.1.0/bundle.min.js" -H "Authorization: Bearer halo_live_9482937402840928340284" --output bundle.min.js --fail --show-error`}
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Word Wrap Enabled
            </span>
            <CodeBlock
              wrap={true}
              language="bash"
              filename="build-command.sh"
              code={`curl -sSL "https://registry.haloui.dev/packages/@haloui/optical-engine/v2.1.0/bundle.min.js" -H "Authorization: Bearer halo_live_9482937402840928340284" --output bundle.min.js --fail --show-error`}
            />
          </div>
        </div>
      </section>

      {/* 3. Multi-Language Roster */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            3. Multi-Language Highlighting Roster
          </h3>
          <p className="text-sm text-muted-foreground">
            Fast, deterministic synchronous syntax highlighting supporting TSX, CSS variables, and JSON configuration files.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <CodeBlock
            language="tsx"
            filename="Button.tsx"
            size="sm"
            code={`export function Button({
  variant = "glass",
  children
}: ButtonProps) {
  return (
    <button className="halo-btn">
      {children}
    </button>
  );
}`}
          />

          <CodeBlock
            language="css"
            filename="tokens.css"
            size="sm"
            code={`:root {
  --halo-blur: 16px;
  --halo-tint: rgba(255,255,255,0.06);
  --halo-specular: rgba(255,255,255,0.25);
  --halo-depth: 0 4px 20px rgba(0,0,0,0.2);
}`}
          />

          <CodeBlock
            language="json"
            filename="config.json"
            size="sm"
            code={`{
  "theme": "liquid-glass",
  "transparency": 0.85,
  "motion": "responsive",
  "touchUsable": true
}`}
          />
        </div>
      </section>

      {/* 4. Line Highlighting & Critical Callouts */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            4. Line Highlighting Callouts
          </h3>
          <p className="text-sm text-muted-foreground">
            Draw immediate attention to specific code lines using 1-indexed highlighted lines with an accent edge marker.
          </p>
        </div>

        <CodeBlock
          filename="security-middleware.ts"
          language="typescript"
          highlightLines={[5, 8, 12]}
          code={`import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.headers.get("x-halo-auth");
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Attach verified claims
  const response = NextResponse.next();
  response.headers.set("x-halo-verified", "true");
  return response;
}`}
        />
      </section>

      {/* 5. Dense Layout Inside Card */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            5. Nested Composition Inside Card
          </h3>
          <p className="text-sm text-muted-foreground">
            Using the frameless `variant="plain"` or standard `variant="default"` inside a structured Card to maintain material hierarchy.
          </p>
        </div>

        <Card className="max-w-xl">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <HaloIcon icon={CpuIcon} size={16} className="text-primary" />
              <CardTitle className="text-sm">Webhook Payload Schema</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Expected JSON body sent to consumer webhook endpoint upon event generation.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <CodeBlock
              variant="default"
              size="sm"
              language="json"
              filename="event-payload.json"
              code={`{
  "event": "deployment.succeeded",
  "timestamp": "2026-09-29T00:15:00Z",
  "environment": "production-us-east",
  "buildId": "bld_98327402",
  "durationMs": 4120
}`}
            />
          </CardContent>
        </Card>
      </section>

      {/* 6. Narrow Container Stress Test */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            6. Micro-Container Reflow (240px – 320px)
          </h3>
          <p className="text-sm text-muted-foreground">
            Automatic container query `@container/code-block` ensures the header and code viewport remain fully usable even in ultra-compact sidebars.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 items-start">
          <div className="w-[240px] space-y-2">
            <span className="text-[11px] font-mono text-muted-foreground block text-center">
              Container: 240px
            </span>
            <CodeBlock
              size="sm"
              filename="quick-start.sh"
              language="bash"
              wrap={true}
              code={`npm install @haloui/react
npm run build --filter=web`}
            />
          </div>

          <div className="w-[300px] space-y-2">
            <span className="text-[11px] font-mono text-muted-foreground block text-center">
              Container: 300px
            </span>
            <CodeBlock
              size="sm"
              filename="App.tsx"
              language="tsx"
              code={`export default function App() {
  return <h1>HaloUI Ready</h1>;
}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
