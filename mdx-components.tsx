import type { MDXComponents } from "mdx/types";
import { Anatomy } from "@/components/mdx/anatomy";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { ComponentPreview } from "@/components/mdx/component-preview";
import { ComponentStatus } from "@/components/mdx/component-status";
import { DependencyList } from "@/components/mdx/dependency-list";
import { MdxHeading } from "@/components/mdx/heading";
import { InstallCommand } from "@/components/mdx/install-command";
import { KeyboardTable } from "@/components/mdx/keyboard-table";
import { FileTree } from "@/components/mdx/file-tree";
import { InstallationButtonResult } from "@/components/mdx/installation-result";
import { QuickStartButtonPreview, QuickStartVariantPreview } from "@/components/mdx/quick-start-preview";
import { ProcessSteps } from "@/components/mdx/process-steps";
import {
  ProductArchitecture,
  SourceOwnershipComparison,
  MaterialAnatomy,
  LifecycleSteps,
} from "@/components/mdx/docs-visuals";
import {
  ProductModelDiagram,
  RegistryFlowDiagram,
  SourceOwnershipDiagram,
  MaterialLayersDiagram,
  ComponentQualityDiagram,
  ComponentLifecycleDiagram,
  InstalledSourceDiagram,
} from "@/components/mdx/docs-diagram";
import { Prerequisites } from "@/components/mdx/prerequisites";
import { PropsTable } from "@/components/mdx/props-table";
import { Steps } from "@/components/mdx/steps";
import { MaterialLab } from "@/components/docs/material/material-lab";
import { MaterialAnatomyVisual } from "@/components/docs/material/material-anatomy-visual";
import {
  SurfaceSeparationComparison,
  EdgeComparison,
  DiffusionComparison,
  RefractionComparison,
  ElevationScaleVisual,
  VirtualLightPreview,
  ThemeMaterialComparison,
  ComponentMaterialShowcase,
} from "@/components/docs/material/material-demonstrations";
import { MaterialTokenTable } from "@/components/docs/material/material-token-table";
import { MaterialComparisonTable } from "@/components/docs/material/material-comparison-table";
import {
  FocusStatePreview,
  KeyboardDemo,
  AccessibleFieldExample,
  MaterialAccessibilityPreview,
  ReducedMotionComparison,
} from "@/components/docs/accessibility/accessibility-demonstrations";
import {
  RegistryItemInspector,
  RegistryExplorer,
  InstallInspector,
} from "@/components/docs/registry/registry-components";
import {
  ThemeTokenTable,
  ThemeColorPreview,
  LightDarkThemePreview,
  MaterialThemePreview,
  TypographyPreview,
  RadiusScalePreview,
  MotionTokenPreview,
  FocusPreview,
  ThemeLab,
  ThemeTestMatrix,
} from "@/components/docs/theming/theming-components";

const components: MDXComponents = {
  h1: (props) => <MdxHeading level={1} {...props} />,
  h2: (props) => <MdxHeading level={2} {...props} />,
  h3: (props) => <MdxHeading level={3} {...props} />,
  p: (props) => <p className="my-4 max-w-3xl text-[15px] leading-7 text-muted-foreground" {...props} />,
  a: (props) => <a className="font-medium text-foreground underline underline-offset-4" {...props} />,
  ul: (props) => <ul className="my-4 ml-5 list-disc space-y-2 text-[15px] leading-7 text-muted-foreground" {...props} />,
  ol: (props) => <ol className="my-4 ml-5 list-decimal space-y-2 text-[15px] leading-7 text-muted-foreground" {...props} />,
  blockquote: (props) => <blockquote className="my-5 border-l-2 border-foreground pl-4 text-muted-foreground" {...props} />,
  pre: (props) => (
    <pre className="my-5 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-xs leading-relaxed text-foreground shadow-xs" {...props} />
  ),
  code: (props) => <code className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[0.86em] text-foreground" {...props} />,
  table: (props) => (
    <div className="my-6 w-full overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left text-xs sm:text-sm" {...props} />
      </div>
    </div>
  ),
  thead: (props) => <thead className="border-b border-border bg-muted/40 text-foreground" {...props} />,
  tbody: (props) => <tbody className="divide-y divide-border/60" {...props} />,
  tr: (props) => <tr className="transition-colors hover:bg-muted/20" {...props} />,
  th: (props) => (
    <th className="px-4 py-3 sm:px-5 sm:py-3.5 text-xs font-semibold text-foreground" {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm leading-relaxed text-muted-foreground align-top" {...props} />
  ),
  Callout,
  Steps,
  CodeBlock,
  InstallCommand,
  PropsTable,
  Anatomy,
  DependencyList,
  KeyboardTable,
  ComponentStatus,
  ComponentPreview,
  Prerequisites,
  FileTree,
  InstallationButtonResult,
  QuickStartButtonPreview,
  QuickStartVariantPreview,
  ProcessSteps,
  ProductArchitecture,
  SourceOwnershipComparison,
  MaterialAnatomy,
  LifecycleSteps,
  ProductModelDiagram,
  RegistryFlowDiagram,
  SourceOwnershipDiagram,
  MaterialLayersDiagram,
  ComponentQualityDiagram,
  ComponentLifecycleDiagram,
  InstalledSourceDiagram,
  MaterialLab,
  MaterialAnatomyVisual,
  SurfaceSeparationComparison,
  EdgeComparison,
  DiffusionComparison,
  RefractionComparison,
  ElevationScaleVisual,
  VirtualLightPreview,
  ThemeMaterialComparison,
  ComponentMaterialShowcase,
  MaterialTokenTable,
  FocusStatePreview,
  KeyboardDemo,
  AccessibleFieldExample,
  MaterialAccessibilityPreview,
  ReducedMotionComparison,
  MaterialComparisonTable,
  RegistryItemInspector,
  RegistryExplorer,
  InstallInspector,
  ThemeTokenTable,
  ThemeColorPreview,
  LightDarkThemePreview,
  MaterialThemePreview,
  TypographyPreview,
  RadiusScalePreview,
  MotionTokenPreview,
  FocusPreview,
  ThemeLab,
  ThemeTestMatrix,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
