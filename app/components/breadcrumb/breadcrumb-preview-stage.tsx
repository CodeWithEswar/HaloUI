"use client";

import * as React from "react";
import {
  PreviewStageShell,
  StageControlSelect,
  type StageViewport,
} from "@/components/docs/preview-stage-shell";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import {
  Home01Icon,
  Folder01Icon,
  FileCodeIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function BreadcrumbPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Controls
  const [separatorType, setSeparatorType] = React.useState<"chevron" | "slash" | "arrow">("chevron");
  const [showIcons, setShowIcons] = React.useState(true);
  const [collapseMode, setCollapseMode] = React.useState<"auto" | "expanded" | "collapsed">("auto");
  const [longPageTitle, setLongPageTitle] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState(false);

  const currentPageTitle = longPageTitle
    ? "Enterprise Fluid Optical Refraction Physical Engine Documentation & Specification"
    : "Breadcrumb";

  const effectiveCollapsed =
    collapseMode === "collapsed" ||
    (collapseMode === "auto" && viewport === "mobile");

  const generatedCode = React.useMemo(() => {
    let customSep = "";
    if (separatorType === "slash") {
      customSep = `\n        <BreadcrumbSeparator>/</BreadcrumbSeparator>`;
    } else if (separatorType === "arrow") {
      customSep = `\n        <BreadcrumbSeparator><HaloIcon icon={ArrowRight01Icon} size={12} /></BreadcrumbSeparator>`;
    }

    const isAuto = collapseMode === "auto";
    const isAlwaysCollapsed = collapseMode === "collapsed";

    return `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,${isAlwaysCollapsed || isAuto ? "\n  BreadcrumbEllipsis," : ""}
} from "@/components/ui/breadcrumb";
${showIcons ? `import { Home01Icon, Folder01Icon, FileCodeIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";` : ""}

export function NavigationTrail() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            ${showIcons ? `<HaloIcon icon={Home01Icon} size={14} className="shrink-0" />\n            ` : ""}Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />${isAlwaysCollapsed ? `
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />` : isAuto ? `
        {/* Auto-responsive intermediate hierarchy on mobile */}
        <BreadcrumbItem className="sm:hidden">
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator className="sm:hidden" />
        <BreadcrumbItem className="hidden sm:inline-flex">
          <BreadcrumbLink href="/workspace">Workspace</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden sm:inline-flex" />
        <BreadcrumbItem className="hidden sm:inline-flex">
          <BreadcrumbLink href="/components">
            ${showIcons ? `<HaloIcon icon={Folder01Icon} size={14} className="shrink-0" />\n            ` : ""}Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden sm:inline-flex" />` : `
        <BreadcrumbItem>
          <BreadcrumbLink href="/workspace">Workspace</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">
            ${showIcons ? `<HaloIcon icon={Folder01Icon} size={14} className="shrink-0" />\n            ` : ""}Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />`}
        <BreadcrumbItem>
          <BreadcrumbLink href="/navigation">Navigation</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="min-w-0">
          <BreadcrumbPage>
            ${showIcons ? `<HaloIcon icon={FileCodeIcon} size={14} className="shrink-0" />\n            ` : ""}<span className="truncate">${currentPageTitle}</span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`;
  }, [separatorType, showIcons, collapseMode, currentPageTitle]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const renderSeparator = (extraClass?: string) => {
    if (separatorType === "slash") {
      return (
        <BreadcrumbSeparator className={cn("text-muted-foreground/40 font-mono text-xs", extraClass)}>
          /
        </BreadcrumbSeparator>
      );
    }
    if (separatorType === "arrow") {
      return (
        <BreadcrumbSeparator className={extraClass}>
          <HaloIcon icon={ArrowRight01Icon} size={12} className="text-muted-foreground/40" />
        </BreadcrumbSeparator>
      );
    }
    return <BreadcrumbSeparator className={extraClass} />;
  };

  return (
    <PreviewStageShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      backdrop={backdrop}
      onBackdropChange={setBackdrop}
      viewport={viewport}
      onViewportChange={setViewport}
      code={generatedCode}
      copied={copiedCode}
      onCopy={copyCode}
      controls={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 items-center">
          <StageControlSelect
            label="Separator"
            value={separatorType}
            onChange={(val) => setSeparatorType(val as any)}
            options={[
              { value: "chevron", label: "Chevron (Default)" },
              { value: "slash", label: "Slash (/)" },
              { value: "arrow", label: "Arrow (→)" },
            ]}
          />
          <StageControlSelect
            label="Hierarchy"
            value={collapseMode}
            onChange={(val) => setCollapseMode(val as any)}
            options={[
              { value: "auto", label: "Auto (Mobile Responsive)" },
              { value: "expanded", label: "Always Expanded (5)" },
              { value: "collapsed", label: "Always Collapsed (3)" },
            ]}
          />
          <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[40px]">
            <Checkbox
              id="breadcrumb-toggle-icons"
              checked={showIcons}
              onCheckedChange={(checked) => setShowIcons(Boolean(checked))}
            />
            <Label
              htmlFor="breadcrumb-toggle-icons"
              className="text-xs sm:text-[13px] text-muted-foreground cursor-pointer font-medium select-none"
            >
              Hugeicons
            </Label>
          </div>
          <div className="flex items-center gap-2.5 p-1.5 sm:p-2 px-2.5 sm:px-3 rounded-xl border border-border/80 bg-card/75 shadow-2xs h-full min-h-[40px]">
            <Checkbox
              id="breadcrumb-toggle-long"
              checked={longPageTitle}
              onCheckedChange={(checked) => setLongPageTitle(Boolean(checked))}
            />
            <Label
              htmlFor="breadcrumb-toggle-long"
              className="text-xs sm:text-[13px] text-muted-foreground cursor-pointer font-medium select-none"
            >
              Long Title Truncation
            </Label>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <div className="p-4 sm:p-6 rounded-xl border border-border/80 bg-card/40 backdrop-blur-xs overflow-x-auto no-scrollbar">
          <Breadcrumb>
            <BreadcrumbList>
              {/* Root */}
              <BreadcrumbItem>
                <BreadcrumbLink href="#home">
                  {showIcons && <HaloIcon icon={Home01Icon} size={14} className="shrink-0" />}
                  <span>Home</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {renderSeparator()}

              {/* Intermediate hierarchy rendering based on collapseMode & viewport */}
              {effectiveCollapsed ? (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  {renderSeparator()}
                </>
              ) : collapseMode === "auto" ? (
                <>
                  {/* Mobile auto-collapse ellipsis (visible on mobile screens) */}
                  <BreadcrumbItem className="sm:hidden inline-flex">
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  {renderSeparator("sm:hidden inline-flex")}

                  {/* Desktop expanded items (hidden on mobile screens) */}
                  <BreadcrumbItem className="hidden sm:inline-flex">
                    <BreadcrumbLink href="#workspace">
                      <span>Workspace</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {renderSeparator("hidden sm:inline-flex")}

                  <BreadcrumbItem className="hidden sm:inline-flex">
                    <BreadcrumbLink href="#components">
                      {showIcons && <HaloIcon icon={Folder01Icon} size={14} className="shrink-0" />}
                      <span>Components</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {renderSeparator("hidden sm:inline-flex")}

                  <BreadcrumbItem className="hidden sm:inline-flex">
                    <BreadcrumbLink href="#navigation">
                      <span>Navigation</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {renderSeparator("hidden sm:inline-flex")}
                </>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#workspace">
                      <span>Workspace</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {renderSeparator()}

                  <BreadcrumbItem>
                    <BreadcrumbLink href="#components">
                      {showIcons && <HaloIcon icon={Folder01Icon} size={14} className="shrink-0" />}
                      <span>Components</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {renderSeparator()}

                  <BreadcrumbItem>
                    <BreadcrumbLink href="#navigation">
                      <span>Navigation</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {renderSeparator()}
                </>
              )}

              {/* Current Page item with atomic inline-flex icon + label */}
              <BreadcrumbItem className="min-w-0">
                <BreadcrumbPage className="inline-flex items-center gap-1.5 min-w-0 max-w-full">
                  {showIcons && <HaloIcon icon={FileCodeIcon} size={14} className="shrink-0" />}
                  <span className={longPageTitle ? "truncate max-w-[130px] sm:max-w-xs block" : "truncate"}>
                    {currentPageTitle}
                  </span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Diagnostics Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg bg-muted/40 border border-border/60 text-xs font-mono">
          <div className="text-muted-foreground">
            Current: <span className="text-foreground font-semibold truncate max-w-[160px] inline-block align-bottom">&quot;{currentPageTitle}&quot;</span>
          </div>
          <div className="text-muted-foreground">
            Levels: <span className="text-foreground">{effectiveCollapsed ? 3 : 5} {collapseMode === "auto" ? "(Auto)" : ""}</span>
          </div>
          <div className="text-muted-foreground">
            Separator: <span className="text-foreground">{separatorType}</span>
          </div>
          <div className="text-muted-foreground">
            Mobile Auto: <span className="text-foreground">{collapseMode === "auto" ? "Enabled" : collapseMode}</span>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
