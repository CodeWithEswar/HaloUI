"use client";

import * as React from "react";
import { DiffViewer } from "@/components/ui/diff-viewer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  GitCommitIcon,
  Layers01Icon,
  DatabaseIcon,
  CpuIcon,
  SecurityCheckIcon,
} from "@hugeicons/core-free-icons";

export function DiffViewerDemonstrations() {
  return (
    <div className="space-y-12">
      {/* 1. Liquid Glass Standalone (Split View) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            1. Liquid Glass Standalone (Side-by-Side Split View)
          </h3>
          <p className="text-sm text-muted-foreground">
            Hero comparison with restrained HaloUI liquid glass outer shell, subtle specular highlight, and non-color-only change indicators.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/10 via-sky-500/5 to-indigo-500/10 dark:from-slate-950/80 dark:via-sky-950/20 dark:to-indigo-950/30 border border-border/50">
          <DiffViewer
            variant="glass"
            viewMode="split"
            filename="optical-engine.ts"
            oldFilename="v1.0 (Basic Glass)"
            newFilename="v2.0 (Physical Liquid Glass)"
            oldCode={`export function renderGlass() {
  return {
    blur: "12px",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)"
  };
}`}
            newCode={`export function renderGlass() {
  return {
    diffusion: "16px",
    transmission: 0.78,
    specularRim: "linear-gradient(135deg, white 0%, transparent 60%)",
    contactShadow: "0 6px 20px -3px rgba(0,0,0,0.4)"
  };
}`}
          />
        </div>
      </section>

      {/* 2. Unified Mode (Inline) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            2. Unified Inline Diff Mode
          </h3>
          <p className="text-sm text-muted-foreground">
            Compact single-column display showing deletions (-) in red and additions (+) in emerald with synchronized dual line numbers.
          </p>
        </div>

        <DiffViewer
          viewMode="unified"
          filename="auth-service.ts"
          oldCode={`async function verifySession(token: string) {
  const session = await db.session.findUnique({ where: { token } });
  return session?.isValid ?? false;
}`}
          newCode={`async function verifySession(token: string) {
  if (!token || token.length < 32) return false;
  const session = await db.session.findUnique({ where: { token } });
  if (!session || session.expiresAt < new Date()) {
    return false;
  }
  return true;
}`}
        />
      </section>

      {/* 3. Database Schema Migration */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            3. Database Schema Migration
          </h3>
          <p className="text-sm text-muted-foreground">
            Review column alterations, new foreign keys, and indexes before applying migrations.
          </p>
        </div>

        <DiffViewer
          filename="schema.prisma"
          viewMode="unified"
          oldCode={`model Organization {
  id        String   @id @default(uuid())
  name      String
  createdAt DateTime @default(now())
}`}
          newCode={`model Organization {
  id        String   @id @default(uuid())
  name      String
  slug      String   @unique
  plan      Plan     @default(STARTER)
  maxSeats  Int      @default(5)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}
        />
      </section>

      {/* 4. Configuration Tuning */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            4. Config Patch with Word Wrap
          </h3>
          <p className="text-sm text-muted-foreground">
            Reviewing JSON configuration files with word wrapping enabled for long lines.
          </p>
        </div>

        <DiffViewer
          filename="next.config.ts"
          wrap={true}
          oldCode={`export default {
  reactStrictMode: true,
  images: { domains: ["cdn.example.com"] }
};`}
          newCode={`export default {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.example.com" },
      { protocol: "https", hostname: "assets.haloui.dev" }
    ]
  },
  experimental: { turbo: { resolveAlias: { "@/*": ["./*"] } } }
};`}
        />
      </section>

      {/* 5. Nested Composition Inside Card */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            5. Nested Inside Card Shell
          </h3>
          <p className="text-sm text-muted-foreground">
            Using the clean `variant="default"` inside a Card layout without redundant double-borders or nested glass interference.
          </p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <HaloIcon icon={SecurityCheckIcon} size={16} className="text-emerald-500" />
              <CardTitle className="text-sm">Audit Log: Permission Grant</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Commit #82f10b by sec-admin on branch main.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <DiffViewer
              variant="default"
              size="sm"
              filename="iam-policy.json"
              oldCode={`{
  "role": "engineer",
  "permissions": ["read:repo", "write:branch"]
}`}
              newCode={`{
  "role": "engineer",
  "permissions": ["read:repo", "write:branch", "deploy:staging"]
}`}
            />
          </CardContent>
        </Card>
      </section>

      {/* 6. Micro-Container Reflow (240px – 320px) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            6. Micro-Container Reflow (240px – 320px)
          </h3>
          <p className="text-sm text-muted-foreground">
            Container query `@container/diff-viewer` confines horizontal layout safely without blowing out document widths.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 items-start">
          <div className="w-[240px] space-y-2">
            <span className="text-[11px] font-mono text-muted-foreground block text-center">
              Container: 240px
            </span>
            <DiffViewer
              size="sm"
              filename="env.txt"
              wrap={true}
              oldCode={`PORT=3000
DEBUG=false`}
              newCode={`PORT=8080
DEBUG=true
LOG_LEVEL=info`}
            />
          </div>

          <div className="w-[300px] space-y-2">
            <span className="text-[11px] font-mono text-muted-foreground block text-center">
              Container: 300px
            </span>
            <DiffViewer
              size="sm"
              filename="route.ts"
              oldCode={`export const GET = () => new Response("v1");`}
              newCode={`export const GET = () => new Response("v2");`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
