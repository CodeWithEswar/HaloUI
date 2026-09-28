import { Metadata } from "next";
import { CarouselPreviewStage } from "./carousel-preview-stage";
import { CarouselDemonstrations } from "./carousel-demonstrations";
import { PropsExplorer, type SubcomponentApi } from "@/components/docs/props-explorer";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Carousel — Data Display 26 — HaloUI",
  description:
    "Sequential content presentation primitive engineered with proven Embla carousel physics, container-aware responsiveness, liquid glass navigation controls, and accessible pagination.",
};

const CAROUSEL_SUBCOMPONENTS: SubcomponentApi[] = [
  {
    name: "Carousel",
    kind: "Component",
    maturity: "stable",
    description:
      "Root container for sequential content presentation. Manages Embla carousel initialization, keyboard navigation, touch gesture arbitration, and provides container query boundaries (@container/carousel).",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Inherits standard HTML div attributes including className, id, and aria-* attributes.",
    },
    props: [
      {
        name: "opts",
        type: "CarouselOptions",
        required: false,
        description: "Embla carousel options (loop, align, dragFree, containScroll, inViewThreshold, etc.).",
      },
      {
        name: "plugins",
        type: "CarouselPlugin",
        required: false,
        description: "Optional Embla plugins (e.g. Autoplay, ClassNames, WheelGestures).",
      },
      {
        name: "orientation",
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        required: false,
        description: "Axis of slide travel and navigation direction.",
      },
      {
        name: "setApi",
        type: "(api: CarouselApi) => void",
        required: false,
        description: "Callback receiving the imperative Embla Carousel API instance.",
      },
    ],
  },
  {
    name: "CarouselContent",
    kind: "Component",
    maturity: "stable",
    description: "The scrollable track viewport enclosing all sequential slide items.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Standard div attributes.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes merged with track container.",
      },
    ],
  },
  {
    name: "CarouselItem",
    kind: "Component",
    maturity: "stable",
    description: "Individual slide wrapper rendering WAI-ARIA role='group' and aria-roledescription='slide'.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Standard div attributes.",
    },
    props: [
      {
        name: "className",
        type: "string",
        required: false,
        description: "Width and flex-basis classes (e.g. 'basis-full', 'sm:basis-1/2', 'lg:basis-1/3').",
      },
    ],
  },
  {
    name: "CarouselPrevious",
    kind: "Component",
    maturity: "stable",
    description: "Accessible previous slide trigger button with Hugeicons arrow and optional liquid glass styling.",
    inheritedProps: {
      element: "React.ComponentProps<typeof Button>",
      description: "Inherits all HaloUI Button attributes.",
    },
    props: [
      {
        name: "position",
        type: "'inset' | 'edge'",
        default: "'inset'",
        required: false,
        description: "Placement strategy: 'inset' (floats safely inside container) or 'edge' (protrudes outside bounds).",
      },
      {
        name: "variant",
        type: "ButtonVariant",
        default: "'glass'",
        required: false,
        description: "Button styling variant ('glass', 'outline', 'secondary', 'ghost').",
      },
    ],
  },
  {
    name: "CarouselNext",
    kind: "Component",
    maturity: "stable",
    description: "Accessible next slide trigger button with Hugeicons arrow and optional liquid glass styling.",
    inheritedProps: {
      element: "React.ComponentProps<typeof Button>",
      description: "Inherits all HaloUI Button attributes.",
    },
    props: [
      {
        name: "position",
        type: "'inset' | 'edge'",
        default: "'inset'",
        required: false,
        description: "Placement strategy: 'inset' (floats safely inside container) or 'edge' (protrudes outside bounds).",
      },
      {
        name: "variant",
        type: "ButtonVariant",
        default: "'glass'",
        required: false,
        description: "Button styling variant ('glass', 'outline', 'secondary', 'ghost').",
      },
    ],
  },
  {
    name: "CarouselDots",
    kind: "Component",
    maturity: "stable",
    description: "Accessible pagination indicator pills synchronized with current slide scroll position.",
    inheritedProps: {
      element: "React.ComponentProps<'div'>",
      description: "Standard div attributes.",
    },
    props: [
      {
        name: "activeClassName",
        type: "string",
        required: false,
        description: "Custom classes applied to the active dot indicator.",
      },
      {
        name: "inactiveClassName",
        type: "string",
        required: false,
        description: "Custom classes applied to inactive dot indicators.",
      },
    ],
  },
];

const CAROUSEL_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "carousel.tsx",
            type: "file",
          },
          {
            name: "button.tsx",
            type: "file",
          },
        ],
      },
    ],
  },
];

export default function CarouselDocsPage() {
  return (
    <div className="space-y-12">
      {/* 1. Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Carousel
          </h1>
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            Data Display 26
          </Badge>
          <Badge variant="secondary">Stable</Badge>
        </div>
        <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
          Sequential content presentation primitive engineered with proven Embla carousel physics, container-aware responsiveness, liquid glass navigation controls, and accessible pagination.
        </p>
      </div>

      {/* 2. Interactive Preview Stage */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Interactive Preview
          </h2>
        </div>
        <CarouselPreviewStage />
      </section>

      {/* 3. Source-Owned Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <p className="text-sm text-muted-foreground">
          Install Carousel directly into your repository through the shadcn registry.
        </p>
        <InstallCommand registry="carousel" />
      </section>

      {/* 4. Architectural File Tree */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Structure & Dependencies
        </h2>
        <p className="text-sm text-muted-foreground">
          Source-owned architecture placed directly in your components directory with standard peer dependencies.
        </p>
        <FileTree items={CAROUSEL_FILE_TREE} />
      </section>

      {/* 5. Production Demonstrations */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Production Demonstrations
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-world developer scenarios demonstrating floating liquid glass controls, multi-item responsive tracks, testimonials, vertical orientation, and micro-container reflow.
          </p>
        </div>
        <CarouselDemonstrations />
      </section>

      {/* 6. Props Explorer */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component API
        </h2>
        <p className="text-sm text-muted-foreground">
          Explore all configurable properties, types, default values, and subcomponents for the Carousel system.
        </p>
        <PropsExplorer components={CAROUSEL_SUBCOMPONENTS} />
      </section>
    </div>
  );
}
