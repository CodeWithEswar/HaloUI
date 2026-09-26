import { Metadata } from "next";
import { LightboxPreviewStage } from "./lightbox-preview-stage";
import { LightboxDemonstrations } from "./lightbox-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";
import { KeyboardTable } from "@/components/mdx/keyboard-table";
import { ProcessSteps } from "@/components/mdx/process-steps";
import { SourceOwnershipComparison } from "@/components/mdx/docs-visuals";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lightbox — Overlays & Menus — HaloUI",
  description:
    "Immersive media viewing overlay engineered with deep Halo Scrim backdrop attenuation, 100% media fidelity preservation, and floating liquid glass controls.",
};

const LIGHTBOX_PROPS: PropRow[] = [
  {
    name: "items",
    type: "LightboxItem[]",
    required: false,
    description: "Array of media items for gallery mode containing src, alt, title, description, and credit.",
  },
  {
    name: "src",
    type: "string",
    required: false,
    description: "Single image URL shorthand when not utilizing the full items array.",
  },
  {
    name: "alt",
    type: "string",
    required: false,
    description: "Alternative text description for screen readers and search engines.",
  },
  {
    name: "title",
    type: "string",
    required: false,
    description: "Media title displayed inside the floating caption pill.",
  },
  {
    name: "description",
    type: "string",
    required: false,
    description: "Secondary caption text describing the image content or context.",
  },
  {
    name: "credit",
    type: "string",
    required: false,
    description: "Photographer, artist, or copyright attribution rendered in the caption.",
  },
  {
    name: "index",
    type: "number",
    required: false,
    description: "Controlled index of the currently active gallery item.",
  },
  {
    name: "defaultIndex",
    type: "number",
    default: "0",
    required: false,
    description: "Initial active index for uncontrolled gallery usage.",
  },
  {
    name: "onIndexChange",
    type: "(index: number) => void",
    required: false,
    description: "Callback invoked when navigating to a different image in gallery mode.",
  },
  {
    name: "loop",
    type: "boolean",
    default: "false",
    required: false,
    description: "Whether gallery navigation wraps around from the last image to the first.",
  },
];

const LIGHTBOX_CONTENT_PROPS: PropRow[] = [
  {
    name: "scrimIntensity",
    type: "'balanced' | 'deep'",
    default: "'deep'",
    required: false,
    description: "Halo Scrim darkness calibration: 'deep' applies 90% black with 8px Gaussian blur for theater immersion.",
  },
  {
    name: "title",
    type: "string",
    default: "'Media Viewer'",
    required: false,
    description: "Accessible dialog title announced to screen reader users on open.",
  },
  {
    name: "description",
    type: "string",
    default: "'Focused view of full-resolution image media.'",
    required: false,
    description: "Accessible dialog description announced to screen reader users.",
  },
];

const LIGHTBOX_FILES: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "lightbox.tsx",
            type: "file",
            description: "Canonical Lightbox compound components and gallery navigation orchestrator.",
          },
          {
            name: "dialog.tsx",
            type: "file",
            description: "Base UI modal dialog primitives managing focus containment and backdrop dismissal.",
          },
        ],
      },
      {
        name: "haloui",
        type: "folder",
        children: [
          {
            name: "foundations",
            type: "folder",
            children: [
              {
                name: "halo-scrim.tsx",
                type: "file",
                description: "Calibrated backdrop attenuation and ambient darkness foundation.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "folder",
    children: [
      {
        name: "halo-tokens.css",
        type: "file",
        description: "Surface, border, optical highlight, and motion tokens.",
      },
      {
        name: "halo-material.css",
        type: "file",
        description: "Physical liquid glass optical recipes for light and dark environments.",
      },
    ],
  },
];

const LIGHTBOX_KEYBOARD_SHORTCUTS = [
  {
    keys: ["Escape"],
    action: "Closes the Lightbox overlay and safely restores focus to the invoking trigger.",
  },
  {
    keys: ["ArrowRight"],
    action: "In gallery mode, advances to the next image in the sequence.",
  },
  {
    keys: ["ArrowLeft"],
    action: "In gallery mode, returns to the previous image in the sequence.",
  },
  {
    keys: ["Tab"],
    action: "Cycles focus strictly between floating controls (Previous, Next, Close).",
  },
];

export default function LightboxPage() {
  return (
    <div className="space-y-12">
      {/* Title & Description */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Overlays &amp; Menus
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Component 14
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            100% Media Fidelity
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Deep Halo Scrim
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Lightbox
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          An immersive media inspection overlay engineered with deep Halo Scrim backdrop attenuation,
          strict 100% image fidelity preservation, floating Liquid Glass controls, and accessible gallery navigation.
        </p>
      </div>

      {/* Interactive Preview Stage */}
      <LightboxPreviewStage />

      {/* Architectural Role Notice */}
      <Callout type="note" title="Architectural Distinction: Media Overlay vs Dialog vs Carousel">
        <strong>Lightbox is not merely a generic Dialog with an image placed inside it.</strong> Standard Dialogs
        are task surfaces designed for forms, text reading, and structured confirmation workflows. Lightbox is an
        immersive media inspection surface where <em>the media itself is the primary canvas</em>. Surrounding application
        distractions are heavily attenuated via deep Halo Scrim, while Liquid Glass is applied selectively to floating
        action controls and captions rather than burying the media in a frosted box.
      </Callout>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install Lightbox directly into your project via the HaloUI registry CLI:
        </p>
        <InstallCommand registry="lightbox" />
      </div>

      {/* Source Ownership Architecture */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Source Ownership Architecture
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Lightbox distributes directly into your codebase as transparent TypeScript source code, giving you full
          control over gallery pagination, responsive image ratios, and caption formatting.
        </p>

        <SourceOwnershipComparison />
      </div>

      {/* Visual Comparison Table */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">
          Media Presentation Matrix
        </h3>
        <div className="overflow-x-auto rounded-xl border border-border/50">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/50 bg-muted/30 text-muted-foreground">
              <tr>
                <th className="p-3 font-semibold">Component</th>
                <th className="p-3 font-semibold">Primary Purpose</th>
                <th className="p-3 font-semibold">Presentation Mode</th>
                <th className="p-3 font-semibold">Liquid Glass Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-foreground">
              <tr>
                <td className="p-3 font-medium">Lightbox</td>
                <td className="p-3 text-muted-foreground">Immersive inspection of full-res photos &amp; galleries</td>
                <td className="p-3 text-muted-foreground">Full-viewport modal with deep Scrim</td>
                <td className="p-3 text-muted-foreground">Floating controls (Close, Prev/Next, Caption pill)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Dialog</td>
                <td className="p-3 text-muted-foreground">Task completion, settings, and form entry</td>
                <td className="p-3 text-muted-foreground">Centered modal card with standard scrim</td>
                <td className="p-3 text-muted-foreground">Entire modal surface card</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Carousel</td>
                <td className="p-3 text-muted-foreground">Inline sequential content / image slider</td>
                <td className="p-3 text-muted-foreground">Embedded within page flow</td>
                <td className="p-3 text-muted-foreground">Slide cards and navigation arrows</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Hover Card</td>
                <td className="p-3 text-muted-foreground">Transient supplemental preview on hover</td>
                <td className="p-3 text-muted-foreground">Anchored non-modal popover</td>
                <td className="p-3 text-muted-foreground">Floating card surface</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Media Inspection Pipeline */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Media Viewing Lifecycle
        </h2>
        <p className="text-sm text-muted-foreground">
          How Lightbox coordinates deep scrim attenuation, responsive image fitting, and keyboard controls:
        </p>

        <ProcessSteps
          steps={[
            {
              title: "1. Trigger Activation & Scroll Lock",
              description: "Clicking a thumbnail or invoking button opens the Lightbox. Base UI Dialog locks page scroll and captures initial focus to the close control.",
            },
            {
              title: "2. Deep Scrim Attenuation",
              description: "Halo Scrim applies 90% dark occlusion with 8px Gaussian blur, instantly neutralizing surrounding page noise and creating a theater atmosphere.",
            },
            {
              title: "3. Media Sizing & Aspect Fitting",
              description: "The media fits within viewport boundaries using object-contain. Zero filters or blur are applied directly to the image, guaranteeing 100% optical fidelity.",
            },
            {
              title: "4. Gallery Navigation & Focus Restoration",
              description: "Arrow keys cycle through images. Pressing Escape smoothly collapses the modal and returns composite focus to the invoking thumbnail.",
            },
          ]}
        />
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage Examples
        </h2>
        <p className="text-sm text-muted-foreground">
          Multi-image gallery setup with captions, counter badge, and looping navigation:
        </p>
        <CodeBlock
          language="tsx"
          code={`import {
  Lightbox,
  LightboxTrigger,
  LightboxContent,
  LightboxMedia,
  LightboxControls,
  LightboxCaption,
} from "@/components/ui/lightbox";

const GALLERY = [
  {
    src: "https://example.com/photo-1.jpg",
    alt: "Modern architecture",
    title: "Minimalist Pavilion",
    description: "Natural illumination study.",
    credit: "Photo by Architectural Digest",
  },
  {
    src: "https://example.com/photo-2.jpg",
    alt: "Landscape view",
    title: "Alpine Ridge",
    description: "Morning mountain mist.",
  },
];

export function GalleryExample() {
  return (
    <Lightbox items={GALLERY} loop={true}>
      <LightboxTrigger className="rounded-xl border border-border/60 p-2">
        Open Photo Gallery
      </LightboxTrigger>

      <LightboxContent scrimIntensity="deep">
        <LightboxControls showCounter={true} />
        <LightboxMedia />
        <LightboxCaption />
      </LightboxContent>
    </Lightbox>
  );
}`}
        />
      </div>

      {/* Demonstrations Suite */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Interactive Capabilities &amp; Demonstrations
        </h2>
        <LightboxDemonstrations />
      </div>

      {/* Liquid Material Architecture */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Media Fidelity &amp; Liquid Glass Strategy
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Lightbox follows strict design system rules regarding optical glass usage:
        </p>
        <ul className="list-disc list-inside space-y-2 text-xs text-muted-foreground leading-relaxed pl-2">
          <li>
            <strong className="text-foreground">Strict 100% Media Fidelity:</strong> No backdrop-filter, brightness adjustments,
            refraction shaders, or procedural grain noise are ever applied to the media element itself. The image renders with pristine pixel accuracy.
          </li>
          <li>
            <strong className="text-foreground">Floating Controls Glass:</strong> Close buttons, previous/next controls, and counter
            badges utilize frosted Liquid Glass lenses (<code className="font-mono text-foreground">bg-black/40 backdrop-blur-xl border-white/30</code>)
            ensuring high legibility over both pure white and pitch-black photos.
          </li>
          <li>
            <strong className="text-foreground">Deep Scrim Theater:</strong> Scrim intensity is tuned to 90% ambient opacity, creating
            optimal contrast for inspecting intricate details and color gradients.
          </li>
        </ul>
      </div>

      {/* Keyboard Interaction */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Keyboard Navigation
        </h2>
        <p className="text-sm text-muted-foreground">
          Accessible keyboard shortcuts for navigating galleries and dismissing the overlay:
        </p>
        <KeyboardTable rows={LIGHTBOX_KEYBOARD_SHORTCUTS} />
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Accessibility (WCAG 2.1 AA)
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Lightbox meets modern accessibility standards without requiring additional plugins:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-1.5">
            <h4 className="font-semibold text-foreground">Accessible Naming &amp; Alt Text</h4>
            <p className="text-muted-foreground leading-relaxed">
              Every image receives descriptive <code className="font-mono text-foreground">alt</code> text, and controls
              feature explicit labels like &ldquo;Close media viewer (Escape)&rdquo; and &ldquo;Previous image (Left Arrow)&rdquo;.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-1.5">
            <h4 className="font-semibold text-foreground">Strict Focus Trapping</h4>
            <p className="text-muted-foreground leading-relaxed">
              Base UI Dialog captures focus within floating controls, preventing keyboard focus from escaping into
              inert background page elements.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-1.5">
            <h4 className="font-semibold text-foreground">Focus Restoration</h4>
            <p className="text-muted-foreground leading-relaxed">
              Dismissing the Lightbox via Escape or close button cleanly returns focus to the initiating thumbnail.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-1.5">
            <h4 className="font-semibold text-foreground">Mobile Safe Area Protection</h4>
            <p className="text-muted-foreground leading-relaxed">
              Media dimensions respect dynamic viewport units (<code className="font-mono text-foreground">100dvh</code>)
              and environmental safe area insets on mobile touch devices.
            </p>
          </div>
        </div>
      </div>

      {/* Component Props */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            API Reference
          </h2>
          <p className="text-sm text-muted-foreground">
            Essential configuration options for Lightbox and LightboxContent:
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">Lightbox Props</h3>
          <PropsTable rows={LIGHTBOX_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">LightboxContent Props</h3>
          <PropsTable rows={LIGHTBOX_CONTENT_PROPS} />
        </div>
      </div>

      {/* File Structure */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installed Files
        </h2>
        <p className="text-sm text-muted-foreground">
          Files installed into consumer repositories when adding the lightbox component:
        </p>
        <FileTree items={LIGHTBOX_FILES} />
      </div>

      {/* Related Components */}
      <div className="space-y-4 border-t border-border/40 pt-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Related Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/components/dialog"
            className="group rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-colors"
          >
            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Dialog
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Modal task surface with optical scrim diffusion.
            </p>
          </Link>
          <Link
            href="/components/spotlight"
            className="group rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-colors"
          >
            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Spotlight
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Global search and discovery overlay with category tabs.
            </p>
          </Link>
          <Link
            href="/components/hover-card"
            className="group rounded-xl border border-border/50 p-4 hover:border-primary/50 transition-colors"
          >
            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              Hover Card
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Supplemental destination preview on hover.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
