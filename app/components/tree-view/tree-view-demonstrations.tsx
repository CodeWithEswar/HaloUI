"use client";

import * as React from "react";
import {
  TreeView,
  TreeBranch,
  TreeLeaf,
  type TreeNode,
} from "@/components/ui/tree-view";
import { HaloIcon } from "@/components/icons/halo-icon";
import {
  Folder01Icon,
  FolderOpenIcon,
  File01Icon,
  DatabaseIcon,
  CpuIcon,
  Globe02Icon,
  SecurityCheckIcon,
  Shield01Icon,
  UserGroupIcon,
  Layers01Icon,
  Download01Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

export function TreeViewDemonstrations() {
  const [selectedDemo1, setSelectedDemo1] = React.useState<string[]>(["button-tsx"]);
  const [selectedDemo4, setSelectedDemo4] = React.useState<string[]>([
    "perm-read",
    "perm-write",
    "perm-deploy",
  ]);

  return (
    <div className="space-y-12">
      {/* ------------------------------------------------------------------ */}
      {/* DEMO 1: Compound Anatomy & Developer File Tree                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            1. Compound Component Anatomy & File Explorer
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Composed declaratively using <code>&lt;TreeView&gt;</code>, <code>&lt;TreeBranch&gt;</code>, and <code>&lt;TreeLeaf&gt;</code> with custom badges and trailing quick actions.
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xs max-w-xl">
          <TreeView
            variant="default"
            selectionMode="single"
            selectedIds={selectedDemo1}
            onSelectedIdsChange={setSelectedDemo1}
            defaultExpandedIds={["src", "components", "ui"]}
            className="w-full"
          >
            <TreeBranch id="src" label="src">
              <TreeBranch id="components" label="components">
                <TreeBranch id="ui" label="ui" badge="14 files">
                  <TreeLeaf
                    id="button-tsx"
                    label="button.tsx"
                    badge="6.4 KB"
                    actions={
                      <button
                        type="button"
                        data-action-button="true"
                        aria-label="Download button.tsx"
                        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        <HaloIcon icon={Download01Icon} size={13} />
                      </button>
                    }
                  />
                  <TreeLeaf id="dialog-tsx" label="dialog.tsx" badge="12.1 KB" />
                  <TreeLeaf id="tree-view-tsx" label="tree-view.tsx" badge="18.5 KB" />
                </TreeBranch>
                <TreeLeaf id="halo-icon-tsx" label="halo-icon.tsx" badge="1.8 KB" />
              </TreeBranch>
              <TreeBranch id="lib" label="lib">
                <TreeLeaf id="utils-ts" label="utils.ts" badge="920 B" />
                <TreeLeaf id="tokens-ts" label="tokens.ts" badge="4.1 KB" />
              </TreeBranch>
            </TreeBranch>
            <TreeLeaf id="package-json" label="package.json" badge="v0.0.1" />
            <TreeLeaf id="tsconfig-json" label="tsconfig.json" badge="ESNext" />
          </TreeView>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DEMO 2: Deep Hierarchy (8-10 Levels) on Narrow Container           */}
      {/* ------------------------------------------------------------------ */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            2. Deep Hierarchy Reflow (Tested at 280px Narrow Container)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Demonstrating container-aware reflow where 8 tiers of parent/child nesting survive narrow sidebars without crushing label readability or breaking page bounds.
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl border border-border/80 bg-muted/20">
          <div className="w-full max-w-[280px] p-2 rounded-xl border border-border/70 bg-card shadow-xs">
            <div className="text-[10px] font-mono text-muted-foreground px-2 py-1 border-b border-border/40 mb-1">
              CONTAINER: 280PX COMPACT RAIL
            </div>
            <TreeView
              variant="plain"
              size="sm"
              indentation={12}
              defaultExpandedIds={["d1", "d2", "d3", "d4", "d5", "d6", "d7"]}
            >
              <TreeBranch id="d1" label="1. Cloud Datacenter">
                <TreeBranch id="d2" label="2. Regional Zone">
                  <TreeBranch id="d3" label="3. Network VPC">
                    <TreeBranch id="d4" label="4. Subnet 10.0.0.0">
                      <TreeBranch id="d5" label="5. Kubernetes Pod">
                        <TreeBranch id="d6" label="6. Service Mesh">
                          <TreeBranch id="d7" label="7. Worker Thread">
                            <TreeLeaf id="d8" label="8. stream.log" badge="Active" />
                          </TreeBranch>
                        </TreeBranch>
                      </TreeBranch>
                    </TreeBranch>
                  </TreeBranch>
                </TreeBranch>
              </TreeBranch>
            </TreeView>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DEMO 3: Organization & Role Taxonomy                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            3. Organization Directory & Role Taxonomy
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Hierarchical team distribution with custom domain icons, team size metrics, and single-selection node active state.
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xs max-w-xl">
          <TreeView
            variant="default"
            selectionMode="single"
            defaultExpandedIds={["org-root", "eng-dept", "core-arch"]}
            className="w-full"
          >
            <TreeBranch
              id="org-root"
              label="Antigravity Global"
              icon={<HaloIcon icon={UserGroupIcon} size={15} className="text-primary" />}
            >
              <TreeBranch
                id="eng-dept"
                label="Engineering Division"
                badge="42 members"
                icon={<HaloIcon icon={Layers01Icon} size={15} className="text-indigo-500" />}
              >
                <TreeBranch id="core-arch" label="Core Compilers & Runtime" badge="12 leads">
                  <TreeLeaf id="eng-1" label="Elena Vance (Principal Engineer)" badge="Staff" />
                  <TreeLeaf id="eng-2" label="Dr. Liam Chen (Type Systems)" badge="Senior" />
                  <TreeLeaf id="eng-3" label="Siddharth Rao (WASM Engine)" />
                </TreeBranch>
                <TreeBranch id="ui-arch" label="Design Engineering & Optics" badge="8 leads">
                  <TreeLeaf id="eng-4" label="Aria Montgomery (Optical Systems)" badge="Lead" />
                  <TreeLeaf id="eng-5" label="Kaelen Ross (Accessibility)" />
                </TreeBranch>
              </TreeBranch>
              <TreeBranch
                id="sec-dept"
                label="Security & Compliance"
                badge="14 members"
                icon={<HaloIcon icon={Shield01Icon} size={15} className="text-rose-500" />}
              >
                <TreeLeaf id="sec-1" label="Zero-Trust Architecture" badge="SOC 2" />
                <TreeLeaf id="sec-2" label="Hardware Security Modules" badge="FIPS" />
              </TreeBranch>
            </TreeBranch>
          </TreeView>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DEMO 4: Multi-Select with Checkboxes                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            4. Access Control & Permission Scopes (Multi-Select Checkboxes)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Role permission taxonomy with accessible <code>&lt;Checkbox&gt;</code> controls integrated seamlessly into each row.
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xs max-w-xl space-y-3">
          <TreeView
            variant="default"
            selectionMode="multiple"
            showCheckboxes={true}
            selectedIds={selectedDemo4}
            onSelectedIdsChange={setSelectedDemo4}
            defaultExpandedIds={["scope-api", "scope-infra"]}
            className="w-full"
          >
            <TreeBranch id="scope-api" label="API Gateway Scopes">
              <TreeLeaf id="perm-read" label="api:read (Query endpoints)" badge="Safe" />
              <TreeLeaf id="perm-write" label="api:write (Mutate resources)" badge="Sensitive" />
              <TreeLeaf id="perm-delete" label="api:delete (Purge records)" badge="Admin" />
            </TreeBranch>
            <TreeBranch id="scope-infra" label="Cloud Infrastructure Scopes">
              <TreeLeaf id="perm-deploy" label="infra:deploy (CI/CD deployments)" />
              <TreeLeaf id="perm-ssh" label="infra:ssh (Bastion tunnel access)" badge="Restricted" />
              <TreeLeaf id="perm-billing" label="infra:billing (Invoice exports)" />
            </TreeBranch>
          </TreeView>

          <div className="p-2.5 rounded-lg border border-border/70 bg-muted/30 text-xs font-mono flex items-center justify-between">
            <span className="text-muted-foreground">Selected Permissions:</span>
            <span className="font-semibold text-primary">
              {selectedDemo4.length ? selectedDemo4.join(", ") : "None"}
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DEMO 5: Standalone HaloUI Liquid Glass                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            5. Standalone HaloUI Liquid Glass Over Dynamic Backdrop
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Leverages <code>variant="glass"</code> with subtle transmission, optical edge hairline, and directional reflection while preserving crisp foreground contrast.
          </p>
        </div>

        <div className="relative p-6 sm:p-8 rounded-2xl border border-border/80 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-sky-500/10 overflow-hidden max-w-xl">
          <div className="absolute -top-12 -left-12 size-48 rounded-full bg-sky-400/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 size-48 rounded-full bg-purple-400/20 blur-2xl pointer-events-none" />

          <TreeView
            variant="glass"
            defaultExpandedIds={["glass-root", "glass-sub"]}
            className="w-full relative z-10"
          >
            <TreeBranch
              id="glass-root"
              label="Optical Foundations"
              icon={<HaloIcon icon={Globe02Icon} size={15} className="text-sky-400" />}
            >
              <TreeBranch id="glass-sub" label="Physical Specular Layers" badge="10 tiers">
                <TreeLeaf id="gl-1" label="Base Tint Transmission" badge="Layer 1" />
                <TreeLeaf id="gl-2" label="Directional 135° Highlight" badge="Layer 4" />
                <TreeLeaf id="gl-3" label="Contact Shadow Perimeter" badge="Layer 6" />
                <TreeLeaf id="gl-4" label="Content Isolation Plane" badge="Layer 9" />
              </TreeBranch>
            </TreeBranch>
          </TreeView>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DEMO 6: Nested in Card Container (Calm Nested Material)           */}
      {/* ------------------------------------------------------------------ */}
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            6. Calm Nested Material Inside Cards & Panels
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            When placed inside parent surface cards or sidebars, <code>variant="plain"</code> ensures no competing glass-on-glass noise.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-xs max-w-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div>
              <h4 className="text-sm font-semibold text-foreground">Project Workspace Assets</h4>
              <p className="text-xs text-muted-foreground">Active branch: <code>feat/liquid-tree</code></p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-border bg-muted/40">
              Clean Tree
            </span>
          </div>

          <TreeView
            variant="plain"
            selectionMode="single"
            defaultExpandedIds={["assets", "fonts"]}
            className="w-full"
          >
            <TreeBranch id="assets" label="public / static assets">
              <TreeBranch id="fonts" label="fonts">
                <TreeLeaf id="font-sans" label="geist-sans.woff2" badge="32 KB" />
                <TreeLeaf id="font-mono" label="geist-mono.woff2" badge="28 KB" />
              </TreeBranch>
              <TreeLeaf id="logo-svg" label="halo-logo.svg" badge="4.2 KB" />
              <TreeLeaf id="favicon-ico" label="favicon.ico" badge="1.4 KB" />
            </TreeBranch>
          </TreeView>
        </div>
      </section>
    </div>
  );
}
