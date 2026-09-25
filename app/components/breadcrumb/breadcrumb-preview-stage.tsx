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

export function BreadcrumbPreviewStage() {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [backdrop, setBackdrop] = React.useState<string>("neutral");
  const [viewport, setViewport] = React.useState<StageViewport>("desktop");

  // Controls
  const [separatorType, setSeparatorType] = React.useState<"chevron" | "slash" | "arrow">("chevron");
  const [showIcons, setShowIcons] = React.useState(true);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [longPageTitle, setLongPageTitle] = React.useState(false);
  const [copiedCode, setCopiedCode] = React.useState(false);

  const currentPageTitle = longPageTitle
    ? "Enterprise Fluid Optical Refraction Physical Engine Documentation & Specification"
    : "Breadcrumb";

  const generatedCode = React.useMemo(() => {
    let customSep = "";
    if (separatorType === "slash") {
      customSep = `\n        <BreadcrumbSeparator>/</BreadcrumbSeparator>`;
    } else if (separatorType === "arrow") {
      customSep = `\n        <BreadcrumbSeparator><HaloIcon icon={ArrowRight01Icon} size={12} /></BreadcrumbSeparator>`;
    }

    return `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,${isCollapsed ? "\n  BreadcrumbEllipsis," : ""}
} from "@/components/ui/breadcrumb";
${showIcons ? `import { Home01Icon, Folder01Icon, FileCodeIcon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";` : ""}

export function NavigationTrail() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            ${showIcons ? `<HaloIcon icon={Home01Icon} size={14} className="mr-1" />\n            ` : ""}Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />${isCollapsed ? `
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />` : `
        <BreadcrumbItem>
          <BreadcrumbLink href="/workspace">Workspace</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">
            ${showIcons ? `<HaloIcon icon={Folder01Icon} size={14} className="mr-1" />\n            ` : ""}Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />`}
        <BreadcrumbItem>
          <BreadcrumbPage>
            ${showIcons ? `<HaloIcon icon={FileCodeIcon} size={14} className="mr-1" />\n            ` : ""}${currentPageTitle}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`;
  }, [separatorType, showIcons, isCollapsed, currentPageTitle]);

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const renderSeparator = () => {
    if (separatorType === "slash") {
      return <BreadcrumbSeparator className="text-muted-foreground/40 font-mono text-xs">/</BreadcrumbSeparator>;
    }
    if (separatorType === "arrow") {
      return (
        <BreadcrumbSeparator>
          <HaloIcon icon={ArrowRight01Icon} size={12} className="text-muted-foreground/40" />
        </BreadcrumbSeparator>
      );
    }
    return <BreadcrumbSeparator />;
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
              id="breadcrumb-toggle-collapse"
              checked={isCollapsed}
              onCheckedChange={(checked) => setIsCollapsed(Boolean(checked))}
            />
            <Label
              htmlFor="breadcrumb-toggle-collapse"
              className="text-xs sm:text-[13px] text-muted-foreground cursor-pointer font-medium select-none"
            >
              Collapse Intermediate
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
        <div className="p-6 rounded-xl border border-border/80 bg-card/40 backdrop-blur-xs">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#home">
                  {showIcons && <HaloIcon icon={Home01Icon} size={14} />}
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              {renderSeparator()}

              {isCollapsed ? (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  {renderSeparator()}
                </>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#workspace">
                      Workspace
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {renderSeparator()}

                  <BreadcrumbItem>
                    <BreadcrumbLink href="#components">
                      {showIcons && <HaloIcon icon={Folder01Icon} size={14} />}
                      Components
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {renderSeparator()}

                  <BreadcrumbItem>
                    <BreadcrumbLink href="#navigation">
                      Navigation
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {renderSeparator()}
                </>
              )}

              <BreadcrumbItem className="min-w-0 flex-1">
                <BreadcrumbPage className={longPageTitle ? "truncate block max-w-sm" : ""}>
                  {showIcons && <HaloIcon icon={FileCodeIcon} size={14} className="inline mr-1 align-middle" />}
                  {currentPageTitle}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Diagnostics Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg bg-muted/40 border border-border/60 text-xs font-mono">
          <div className="text-muted-foreground">
            Current: <span className="text-foreground font-semibold truncate max-w-[200px] inline-block align-bottom">&quot;{currentPageTitle}&quot;</span>
          </div>
          <div className="text-muted-foreground">
            Levels: <span className="text-foreground">{isCollapsed ? 3 : 5}</span>
          </div>
          <div className="text-muted-foreground">
            Separator: <span className="text-foreground">{separatorType}</span>
          </div>
          <div className="text-muted-foreground">
            Collapsed: <span className="text-foreground">{isCollapsed ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>
    </PreviewStageShell>
  );
}
