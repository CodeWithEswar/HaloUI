import { Metadata } from "next";
import { StepperPreviewStage } from "./stepper-preview-stage";
import { StepperDemonstrations } from "./stepper-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Stepper — Navigation — HaloUI",
  description:
    "A structured progress and navigation component for communicating a user's position within a bounded multi-step process.",
};

const STEPPER_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: false,
    description: "Controlled identifier of the current active step.",
  },
  {
    name: "defaultValue",
    type: "string",
    default: "undefined",
    required: false,
    description: "Default active step identifier for uncontrolled operation.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    default: "undefined",
    required: false,
    description: "Callback invoked when the active step changes via user interaction.",
  },
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    required: false,
    description: "Layout axis of the stepper progression trail.",
  },
  {
    name: "interactive",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether steps render as operable buttons. If false, renders as noninteractive informational progress.",
  },
  {
    name: "linear",
    type: "boolean",
    default: "false",
    required: false,
    description: "When true, enforces linear progression: users cannot jump ahead to upcoming steps directly.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'subtle'",
    required: false,
    description: "Optical diffusion depth, backdrop saturation, and glass refraction clarity for indicators.",
  },
];

const STEPPER_ITEM_PROPS: PropRow[] = [
  {
    name: "value",
    type: "string",
    default: "undefined",
    required: true,
    description: "Unique stable identifier representing this stage in the process.",
  },
  {
    name: "status",
    type: "'completed' | 'current' | 'upcoming' | 'disabled' | 'error'",
    default: "derived",
    required: false,
    description: "Explicit status override. Derived automatically from active value and step order if omitted.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether this step is disabled and unavailable for user activation.",
  },
  {
    name: "stepIndex",
    type: "number",
    default: "derived",
    required: false,
    description: "Explicit 1-based ordinal step number to display in the indicator.",
  },
];

const FILE_TREE_ITEMS: FileNode[] = [
  {
    name: "components/ui/stepper.tsx",
    type: "file",
    description: "Stepper, StepperList, StepperItem, StepperTrigger, StepperIndicator, StepperTitle, StepperDescription, StepperSeparator, StepperContent",
  },
  {
    name: "components/icons/halo-icon.tsx",
    type: "file",
    description: "Standardized Hugeicon wrapper ensuring currentColor inheritance and optical clarity",
  },
  {
    name: "styles/halo-tokens.css",
    type: "file",
    description: "Physical liquid glass tokens for optical edge, depth glow, and tactile compression",
  },
];

export default function StepperDocsPage() {
  return (
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
            Navigation 10
          </span>
          <span className="text-muted-foreground/40 font-mono text-xs">/</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            WCAG 2.1 AA Compliant
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Stepper
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          A structured progress and navigation component for communicating a user's position within a bounded multi-step process.
        </p>
      </header>

      {/* 1. Interactive Preview Stage */}
      <section className="space-y-4">
        <StepperPreviewStage />
      </section>

      {/* Mandatory Architectural Callouts #157-#161 */}
      <div className="space-y-3">
        <Callout type="important">
          <strong>Stepper communicates process progression; it does not own the process.</strong> Forms, validation, persistence, async requests, and business rules remain application responsibilities.
        </Callout>
        <Callout type="note">
          <strong>A Stepper is not automatically interactive.</strong> If users cannot navigate directly to a step, render that step as progress information rather than a fake button.
        </Callout>
        <Callout type="warning">
          <strong>Changing the current step does not necessarily mean the previous step was successfully completed.</strong> Completion should come from the application's process state.
        </Callout>
        <Callout type="tip">
          <strong>Current, completed, unavailable, and error states must remain understandable without relying on color, connector fill, or icons alone.</strong> Stepper exposes dedicated accessible text annotations (<code className="font-mono text-xs">(Current step)</code>, <code className="font-mono text-xs">(Completed)</code>, <code className="font-mono text-xs">(Error)</code>) for screen reader clarity.
        </Callout>
        <Callout type="note">
          <strong>Responsive Stepper layouts may change presentation while preserving the same semantic step order and process state.</strong> Switch from horizontal to vertical orientation or compact representations without altering DOM ordering.
        </Callout>
      </div>

      {/* 2. Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <p className="text-sm text-muted-foreground">
          Install the stepper primitive and its registry dependencies via the shadcn CLI:
        </p>
        <InstallCommand registry="stepper" />
      </section>

      {/* 3. Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Basic Usage</h2>
        <p className="text-sm text-muted-foreground">
          Compose structured progress indicators with stable identifiers:
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
} from "@/components/ui/stepper";

export function CheckoutStepper({ currentStep }: { currentStep: string }) {
  return (
    <Stepper value={currentStep} orientation="horizontal" interactive={false}>
      <StepperList>
        <StepperItem value="cart" status="completed">
          <StepperTrigger>
            <StepperIndicator />
            <div className="flex flex-col">
              <StepperTitle>Cart</StepperTitle>
              <StepperDescription>Items verified</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>

        <StepperItem value="shipping">
          <StepperTrigger>
            <StepperIndicator />
            <div className="flex flex-col">
              <StepperTitle>Shipping</StepperTitle>
              <StepperDescription>Address details</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>

        <StepperItem value="payment">
          <StepperTrigger>
            <StepperIndicator />
            <div className="flex flex-col">
              <StepperTitle>Payment</StepperTitle>
              <StepperDescription>Card or invoice</StepperDescription>
            </div>
          </StepperTrigger>
        </StepperItem>
      </StepperList>
    </Stepper>
  );
}`}
        />
      </section>

      {/* 4. Complete Demonstrations */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Demonstrations &amp; Workflows
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Explore informational mode, direct interactive navigation, linear constraints, error handling, vertical layouts, and focus contrast.
          </p>
        </div>
        <StepperDemonstrations />
      </section>

      {/* 5. Architectural Semantic Matrix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Navigation Primitive Semantic Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse border border-border/80">
            <thead className="bg-muted/40 font-mono text-muted-foreground">
              <tr>
                <th className="p-3 border-b border-border">Component</th>
                <th className="p-3 border-b border-border text-foreground font-semibold">Primary Purpose</th>
                <th className="p-3 border-b border-border">State Model</th>
                <th className="p-3 border-b border-border">Keyboard &amp; Focus Model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3 font-semibold text-foreground">Stepper</td>
                <td className="p-3">Communicates user position and progression in a bounded multi-step process</td>
                <td className="p-3">Current, completed, upcoming, disabled, error</td>
                <td className="p-3">Ordinary Tab navigation; informational steps non-interactive</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Progress</td>
                <td className="p-3">Communicates numeric completion percentage without named stages</td>
                <td className="p-3">Value (0–100) or indeterminate</td>
                <td className="p-3">Non-interactive status display (<code className="font-mono text-xs">role="progressbar"</code>)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Tabs</td>
                <td className="p-3">Switches between concurrent peer views of equal organizational hierarchy</td>
                <td className="p-3">Active tab selection (no completion semantics)</td>
                <td className="p-3">Arrow-key roving focus composite widget</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Breadcrumb</td>
                <td className="p-3">Communicates hierarchical location within a site taxonomy</td>
                <td className="p-3">Trail of ancestor pages ending at current page</td>
                <td className="p-3">Ordinary link navigation (<code className="font-mono text-xs">&lt;a&gt;</code>)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-foreground">Timeline</td>
                <td className="p-3">Communicates historical event logs, audits, or chronological activity</td>
                <td className="p-3">Past timestamps and historical event records</td>
                <td className="p-3">Non-interactive list or links to event details</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Keyboard & Focus Specification */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Keyboard Navigation Specification
        </h2>
        <p className="text-sm text-muted-foreground">
          Stepper does not hijack Arrow keys. When interactive, steps use native button controls and standard Tab order.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse border border-border/80">
            <thead className="bg-muted/40 font-mono text-muted-foreground">
              <tr>
                <th className="p-3 border-b border-border">Key</th>
                <th className="p-3 border-b border-border text-foreground font-semibold">Mode</th>
                <th className="p-3 border-b border-border">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="p-3 font-mono">Tab</td>
                <td className="p-3 font-mono text-xs">Interactive</td>
                <td className="p-3">Moves focus forward to the next navigable step trigger in DOM order.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">Shift + Tab</td>
                <td className="p-3 font-mono text-xs">Interactive</td>
                <td className="p-3">Moves focus backward to the previous navigable step trigger in DOM order.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">Enter / Space</td>
                <td className="p-3 font-mono text-xs">Interactive</td>
                <td className="p-3">Activates the focused step trigger, changing the current step value.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">Any Key</td>
                <td className="p-3 font-mono text-xs">Informational</td>
                <td className="p-3">No focusable controls exist; informational steps are bypassed by the keyboard cursor.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Props API */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props Reference</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Stepper</h3>
          <PropsTable rows={STEPPER_PROPS} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">StepperItem</h3>
          <PropsTable rows={STEPPER_ITEM_PROPS} />
        </div>
      </section>

      {/* 8. Registry & Dependencies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Installed Files &amp; Dependencies
        </h2>
        <p className="text-sm text-muted-foreground">
          The registry installation places the component directly into your project:
        </p>
        <FileTree items={FILE_TREE_ITEMS} />
      </section>
    </article>
  );
}
