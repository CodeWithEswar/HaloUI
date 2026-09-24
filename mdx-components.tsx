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

const components: MDXComponents = {
  h1: (props) => <MdxHeading level={1} {...props} />,
  h2: (props) => <MdxHeading level={2} {...props} />,
  h3: (props) => <MdxHeading level={3} {...props} />,
  p: (props) => <p className="my-4 max-w-3xl text-[15px] leading-7 text-muted-foreground" {...props} />,
  a: (props) => <a className="font-medium text-foreground underline underline-offset-4" {...props} />,
  ul: (props) => <ul className="my-4 ml-5 list-disc space-y-2 text-[15px] leading-7 text-muted-foreground" {...props} />,
  ol: (props) => <ol className="my-4 ml-5 list-decimal space-y-2 text-[15px] leading-7 text-muted-foreground" {...props} />,
  blockquote: (props) => <blockquote className="my-5 border-l-2 border-foreground pl-4 text-muted-foreground" {...props} />,
  code: (props) => <code className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[0.86em] text-foreground" {...props} />,
  table: (props) => <div className="my-6 overflow-x-auto"><table className="w-full min-w-[36rem] border-collapse text-sm" {...props} /></div>,
  th: (props) => <th className="border-b border-border bg-muted/50 px-3 py-2 text-left font-medium" {...props} />,
  td: (props) => <td className="border-b border-border px-3 py-2 text-muted-foreground" {...props} />,
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
};

export function useMDXComponents(): MDXComponents {
  return components;
}
