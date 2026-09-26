"use client";

import * as React from "react";
import {
  TreeNavigation,
  TreeNavigationList,
  TreeNavigationBranch,
  TreeNavigationLink,
} from "@/components/ui/tree-navigation";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Folder01Icon,
  PackageIcon,
  Layers01Icon,
  Analytics01Icon,
  Settings02Icon,
  File01Icon,
  DatabaseIcon,
  ServerIcon,
  Shield01Icon,
  Globe02Icon,
  CpuIcon,
} from "@hugeicons/core-free-icons";
import { Callout } from "@/components/mdx/callout";

export function TreeNavigationDemonstrations() {
  const [activeRoute, setActiveRoute] = React.useState<string>("/cloud/eu-west/k8s/pods");
  const [controlledExpanded, setControlledExpanded] = React.useState<string[]>([
    "cloud",
    "eu-west",
    "k8s",
  ]);

  return (
    <div className="space-y-16">
      {/* 1. Current Destination and Ancestor Treatment */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            1. Current Destination vs Ancestor Indicator
          </h3>
          <p className="text-sm text-muted-foreground">
            The actual current leaf receives <code className="text-xs font-mono">aria-current=&quot;page&quot;</code> and high-contrast lens styling. Its ancestor branches receive subtle structural tinting (<code className="text-xs font-mono">data-contains-current</code>) to communicate path orientation without falsely declaring ancestors as current.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 flex justify-center">
          <div className="w-full max-w-sm rounded-xl border border-border/80 bg-background/80 p-3 shadow-sm">
            <TreeNavigation
              value="/billing/invoices"
              defaultExpandedValues={["account", "billing"]}
              className="w-full"
            >
              <TreeNavigationList>
                <TreeNavigationBranch
                  value="account"
                  label="Account Organization"
                  icon={Folder01Icon}
                  containsCurrent={true}
                >
                  <TreeNavigationBranch
                    value="billing"
                    label="Billing &amp; Usage"
                    icon={PackageIcon}
                    containsCurrent={true}
                  >
                    <TreeNavigationLink
                      value="/billing/overview"
                      href="#/billing/overview"
                      icon={File01Icon}
                    >
                      Plan Overview
                    </TreeNavigationLink>
                    <TreeNavigationLink
                      value="/billing/invoices"
                      href="#/billing/invoices"
                      icon={File01Icon}
                    >
                      Past Invoices (Current)
                    </TreeNavigationLink>
                    <TreeNavigationLink
                      value="/billing/payment-methods"
                      href="#/billing/payment-methods"
                      icon={File01Icon}
                    >
                      Payment Methods
                    </TreeNavigationLink>
                  </TreeNavigationBranch>
                </TreeNavigationBranch>
              </TreeNavigationList>
            </TreeNavigation>
          </div>
        </div>
      </section>

      {/* 2. Deep Hierarchies (4 Levels of Nesting) */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            2. Deep Hierarchies (4 Levels of Nesting)
          </h3>
          <p className="text-sm text-muted-foreground">
            Tree Navigation safely scales across deeply nested branches with consistent indentation and structural guide lines, preventing layout collision or container clipping.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 flex justify-center">
          <div className="w-full max-w-md rounded-xl border border-border/80 bg-background/80 p-3 shadow-sm">
            <TreeNavigation
              value={activeRoute}
              expandedValues={controlledExpanded}
              onExpandedValuesChange={setControlledExpanded}
              indentation={16}
              className="w-full"
            >
              <TreeNavigationList>
                <TreeNavigationBranch
                  value="cloud"
                  label="Global Infrastructure"
                  icon={Globe02Icon}
                  containsCurrent={activeRoute.startsWith("/cloud")}
                >
                  <TreeNavigationBranch
                    value="eu-west"
                    label="Region eu-west-1 (Frankfurt)"
                    icon={ServerIcon}
                    containsCurrent={activeRoute.startsWith("/cloud/eu-west")}
                  >
                    <TreeNavigationBranch
                      value="k8s"
                      label="Kubernetes Cluster 01"
                      icon={CpuIcon}
                      badge="Active"
                      containsCurrent={activeRoute.startsWith("/cloud/eu-west/k8s")}
                    >
                      <TreeNavigationLink
                        value="/cloud/eu-west/k8s/pods"
                        href="#/cloud/eu-west/k8s/pods"
                        icon={File01Icon}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveRoute("/cloud/eu-west/k8s/pods");
                        }}
                      >
                        Worker Pods
                      </TreeNavigationLink>
                      <TreeNavigationLink
                        value="/cloud/eu-west/k8s/services"
                        href="#/cloud/eu-west/k8s/services"
                        icon={File01Icon}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveRoute("/cloud/eu-west/k8s/services");
                        }}
                      >
                        Ingress Services
                      </TreeNavigationLink>
                      <TreeNavigationLink
                        value="/cloud/eu-west/k8s/secrets"
                        href="#/cloud/eu-west/k8s/secrets"
                        icon={Shield01Icon}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveRoute("/cloud/eu-west/k8s/secrets");
                        }}
                      >
                        Sealed Secrets
                      </TreeNavigationLink>
                    </TreeNavigationBranch>

                    <TreeNavigationLink
                      value="/cloud/eu-west/databases"
                      href="#/cloud/eu-west/databases"
                      icon={DatabaseIcon}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveRoute("/cloud/eu-west/databases");
                      }}
                    >
                      PostgreSQL Replicas
                    </TreeNavigationLink>
                  </TreeNavigationBranch>
                </TreeNavigationBranch>
              </TreeNavigationList>
            </TreeNavigation>
          </div>
        </div>
      </section>

      {/* 3. Long Destination Labels & Container Truncation */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            3. Long Destination Labels &amp; Containment
          </h3>
          <p className="text-sm text-muted-foreground">
            Long labels truncate cleanly with ellipsis in narrow containers without triggering horizontal scrolling or distorting neighbor elements.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 flex justify-center">
          <div className="w-[280px] rounded-xl border border-border/80 bg-background/80 p-3 shadow-sm">
            <div className="mb-2 text-[10px] font-mono text-muted-foreground">
              Narrow Container (280px)
            </div>
            <TreeNavigation
              value="/long/item-1"
              defaultExpandedValues={["long-branch"]}
              className="w-full"
            >
              <TreeNavigationList>
                <TreeNavigationBranch
                  value="long-branch"
                  label="Enterprise Security &amp; Compliance Configuration"
                  icon={Folder01Icon}
                >
                  <TreeNavigationLink
                    value="/long/item-1"
                    href="#/long/item-1"
                    icon={File01Icon}
                  >
                    SOC 2 Type II Continuous Audit Logs &amp; Evidence Collection
                  </TreeNavigationLink>
                  <TreeNavigationLink
                    value="/long/item-2"
                    href="#/long/item-2"
                    icon={File01Icon}
                  >
                    PCI-DSS Level 1 Cardholder Data Environment Isolation
                  </TreeNavigationLink>
                </TreeNavigationBranch>
              </TreeNavigationList>
            </TreeNavigation>
          </div>
        </div>
      </section>

      {/* 4. True Tree Keyboard Navigation Pattern */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            4. Keyboard Tree Navigation (ARIA Pattern)
          </h3>
          <p className="text-sm text-muted-foreground">
            Operates as a single Tab stop with roving focus across visible nodes.
          </p>
        </div>

        <Callout type="tip">
          <strong>Try the ARIA Tree keys:</strong> Use <kbd className="font-mono text-xs">↓</kbd> / <kbd className="font-mono text-xs">↑</kbd> to move focus through visible items. Press <kbd className="font-mono text-xs">→</kbd> on a collapsed branch to expand it, or on an expanded branch to enter its children. Press <kbd className="font-mono text-xs">←</kbd> to collapse a branch or ascend to its parent. Press <kbd className="font-mono text-xs">Home</kbd> / <kbd className="font-mono text-xs">End</kbd> to jump to extremes.
        </Callout>

        <div className="p-6 rounded-2xl border border-border/60 bg-muted/20 flex justify-center">
          <div className="w-full max-w-sm rounded-xl border border-border/80 bg-background/80 p-3 shadow-sm">
            <TreeNavigation
              value="/interactive/item"
              defaultExpandedValues={["project"]}
              className="w-full"
            >
              <TreeNavigationList>
                <TreeNavigationBranch
                  value="project"
                  label="Project Root"
                  icon={Folder01Icon}
                >
                  <TreeNavigationLink
                    value="/interactive/item"
                    href="#/interactive/item"
                    icon={File01Icon}
                  >
                    Focused Item Demo
                  </TreeNavigationLink>
                  <TreeNavigationLink
                    value="/interactive/second"
                    href="#/interactive/second"
                    icon={File01Icon}
                  >
                    Second Destination
                  </TreeNavigationLink>
                </TreeNavigationBranch>
              </TreeNavigationList>
            </TreeNavigation>
          </div>
        </div>
      </section>

      {/* 5. Mobile Viewport Composition */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            5. Mobile Viewport &amp; Touch Disclosure Targets
          </h3>
          <p className="text-sm text-muted-foreground">
            On narrow mobile viewports, Tree Navigation adjusts depth spacing and provides generous touch targets so tapping disclosure arrows or destinations is effortless.
          </p>
        </div>

        <div className="flex justify-center p-6 rounded-2xl border border-border/60 bg-muted/20">
          <div className="w-[320px] rounded-3xl border border-border/80 bg-background/80 p-3 shadow-xl">
            <div className="mb-2 flex items-center justify-between px-1 text-[10px] text-muted-foreground">
              <span>Mobile Phone Viewport (320px)</span>
              <span>Touch targets OK</span>
            </div>
            <TreeNavigation
              value="/mobile/dest-1"
              defaultExpandedValues={["mobile-root"]}
              indentation={12}
              className="w-full"
            >
              <TreeNavigationList>
                <TreeNavigationBranch
                  value="mobile-root"
                  label="Documentation"
                  icon={Folder01Icon}
                >
                  <TreeNavigationLink
                    value="/mobile/dest-1"
                    href="#/mobile/dest-1"
                    icon={File01Icon}
                  >
                    Getting Started
                  </TreeNavigationLink>
                  <TreeNavigationLink
                    value="/mobile/dest-2"
                    href="#/mobile/dest-2"
                    icon={File01Icon}
                  >
                    Core Concepts
                  </TreeNavigationLink>
                </TreeNavigationBranch>
              </TreeNavigationList>
            </TreeNavigation>
          </div>
        </div>
      </section>
    </div>
  );
}
