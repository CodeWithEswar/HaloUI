"use client";

import * as React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  CodeBlock,
} from "@/components/mdx/code-block";
import {
  DashboardSquare01Icon,
  Activity02Icon,
  Settings02Icon,
  Folder02Icon,
  UserGroupIcon,
  Notification02Icon,
  HelpCircleIcon,
  SecurityCheckIcon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export function TabsDemonstrations() {
  const [controlledTab, setControlledTab] = React.useState("code");

  return (
    <div className="space-y-12">
      {/* 1. Line / Underline Variant */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">1. Line Variant</h3>
        <p className="text-sm text-muted-foreground">
          A minimalist tab strip with a crisp bottom-border indicator for clean document or repository interfaces.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <Tabs defaultValue="readme" className="w-full">
            <TabsList variant="line">
              <TabsTrigger value="readme">README.md</TabsTrigger>
              <TabsTrigger value="license">LICENSE</TabsTrigger>
              <TabsTrigger value="contributing">CONTRIBUTING</TabsTrigger>
            </TabsList>
            <TabsContent value="readme" className="mt-4 p-4 rounded-lg bg-muted/20 border border-border/60 text-xs text-muted-foreground">
              HaloUI Liquid Optical System — Next-generation React 19 components with physical refractive glass physics.
            </TabsContent>
            <TabsContent value="license" className="mt-4 p-4 rounded-lg bg-muted/20 border border-border/60 text-xs text-muted-foreground">
              MIT License — Copyright (c) 2026 HaloUI Contributors.
            </TabsContent>
            <TabsContent value="contributing" className="mt-4 p-4 rounded-lg bg-muted/20 border border-border/60 text-xs text-muted-foreground">
              Contributions adhere to the 22-step component contract and zero-Lucide policy.
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 2. With Hugeicons & Badges */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">2. Hugeicons & Status Badges</h3>
        <p className="text-sm text-muted-foreground">
          Triggers seamlessly compose Hugeicons glyphs and numerical badge pills without interfering with accessible naming.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList>
              <TabsTrigger value="notifications">
                <HaloIcon icon={Notification02Icon} size={15} />
                Notifications
                <span className="ml-1 inline-flex items-center justify-center rounded-full bg-primary/10 px-1.5 py-0.2 text-[10px] font-semibold text-primary">
                  12
                </span>
              </TabsTrigger>
              <TabsTrigger value="security">
                <HaloIcon icon={SecurityCheckIcon} size={15} />
                Security
              </TabsTrigger>
              <TabsTrigger value="support">
                <HaloIcon icon={HelpCircleIcon} size={15} />
                Support
              </TabsTrigger>
            </TabsList>
            <TabsContent value="notifications" className="mt-4 p-4 rounded-lg bg-muted/20 border border-border/60 text-xs text-muted-foreground">
              12 unread notifications: 8 component regressions passed, 4 clean registry builds completed.
            </TabsContent>
            <TabsContent value="security" className="mt-4 p-4 rounded-lg bg-muted/20 border border-border/60 text-xs text-muted-foreground">
              Zero vulnerabilities detected across 43 source-owned registry definitions.
            </TabsContent>
            <TabsContent value="support" className="mt-4 p-4 rounded-lg bg-muted/20 border border-border/60 text-xs text-muted-foreground">
              Documentation guides and community discussions are open 24/7.
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 3. Controlled State */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">3. Controlled State</h3>
        <p className="text-sm text-muted-foreground">
          Synchronize the selected tab value with external state or command actions using <code className="font-mono text-xs">value</code> and <code className="font-mono text-xs">onValueChange</code>.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">External Switcher:</span>
            <button
              onClick={() => setControlledTab("code")}
              className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                controlledTab === "code"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border/80 bg-background hover:bg-muted"
              }`}
            >
              Select Code
            </button>
            <button
              onClick={() => setControlledTab("preview")}
              className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                controlledTab === "preview"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border/80 bg-background hover:bg-muted"
              }`}
            >
              Select Preview
            </button>
            <button
              onClick={() => setControlledTab("diff")}
              className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                controlledTab === "diff"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border/80 bg-background hover:bg-muted"
              }`}
            >
              Select Diff
            </button>
          </div>

          <Tabs value={controlledTab} onValueChange={(val) => setControlledTab(String(val))} className="w-full">
            <TabsList>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="diff">Diff</TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="mt-4 p-4 rounded-lg bg-muted/20 border border-border/60 text-xs font-mono text-muted-foreground">
              {"<Tabs defaultValue=\"overview\">...</Tabs>"}
            </TabsContent>
            <TabsContent value="preview" className="mt-4 p-4 rounded-lg bg-muted/20 border border-border/60 text-xs text-muted-foreground">
              Interactive preview rendering active peer component stage.
            </TabsContent>
            <TabsContent value="diff" className="mt-4 p-4 rounded-lg bg-muted/20 border border-border/60 text-xs font-mono text-emerald-600 dark:text-emerald-400">
              + TabsList: max-w-full overflow-x-auto scrollbar-none
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 4. Vertical Orientation */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">4. Vertical Orientation</h3>
        <p className="text-sm text-muted-foreground">
          Setting <code className="font-mono text-xs">orientation=&quot;vertical&quot;</code> aligns the tab list into a vertical rail with automatic Up/Down arrow key keyboard coordination.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50">
          <Tabs defaultValue="account" orientation="vertical" className="w-full">
            <TabsList className="w-44">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="tokens" disabled>API Tokens</TabsTrigger>
            </TabsList>
            <div className="flex-1 pl-4">
              <TabsContent value="account" className="p-4 rounded-lg bg-muted/20 border border-border/60 text-xs text-muted-foreground">
                Manage your user credentials, multi-factor authentication, and contact methods.
              </TabsContent>
              <TabsContent value="preferences" className="p-4 rounded-lg bg-muted/20 border border-border/60 text-xs text-muted-foreground">
                Set interface color theme, optical glass intensity, and motion preferences.
              </TabsContent>
              <TabsContent value="billing" className="p-4 rounded-lg bg-muted/20 border border-border/60 text-xs text-muted-foreground">
                Active plan: HaloUI Enterprise. 43 registry components licensed for redistribution.
              </TabsContent>
              <TabsContent value="tokens" className="p-4 rounded-lg bg-muted/20 border border-border/60 text-xs text-muted-foreground">
                API Tokens are disabled for your current organization role.
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* 5. Responsive Horizontal Overflow */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-foreground">5. Responsive Horizontal Overflow</h3>
        <p className="text-sm text-muted-foreground">
          In narrow viewports or dense mobile layouts, <code className="font-mono text-xs">TabsList</code> scrolls horizontally without clipping focus rings or causing page-level horizontal overflow.
        </p>
        <div className="p-6 rounded-xl border border-border/80 bg-background/50 space-y-4">
          <div className="max-w-[320px] p-4 rounded-xl border border-dashed border-border/80 bg-muted/10 mx-auto">
            <div className="text-[11px] font-mono text-muted-foreground mb-3 text-center">
              Constrained Width: 320px (Mobile Simulation)
            </div>
            <Tabs defaultValue="t1" className="w-full">
              <TabsList>
                <TabsTrigger value="t1">Overview</TabsTrigger>
                <TabsTrigger value="t2">Analytics</TabsTrigger>
                <TabsTrigger value="t3">Deployments</TabsTrigger>
                <TabsTrigger value="t4">Integrations</TabsTrigger>
                <TabsTrigger value="t5">Webhooks</TabsTrigger>
                <TabsTrigger value="t6">Audit Log</TabsTrigger>
              </TabsList>
              <TabsContent value="t1" className="mt-3 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
                Overview panel rendered cleanly without page blowout.
              </TabsContent>
              <TabsContent value="t2" className="mt-3 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
                Analytics stream within mobile constraints.
              </TabsContent>
              <TabsContent value="t3" className="mt-3 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
                Deployments view active.
              </TabsContent>
              <TabsContent value="t4" className="mt-3 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
                Integrations list.
              </TabsContent>
              <TabsContent value="t5" className="mt-3 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
                Webhooks configuration.
              </TabsContent>
              <TabsContent value="t6" className="mt-3 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
                Audit log entries.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
