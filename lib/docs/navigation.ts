export type DocsNavItem = {
  title: string;
  href: string;
  description?: string;
  status?: "experimental" | "preview" | "stable" | "deprecated";
  keywords?: string[];
};

export type DocsNavSection = {
  title: string;
  items: DocsNavItem[];
};

export const docsNavigation: DocsNavSection[] = [
  {
    title: "Getting started",
    items: [
      { title: "Introduction", href: "/docs", description: "The HaloUI documentation system and product principles." },
      { title: "Installation", href: "/docs/installation", description: "Configure the registry and install your first component." },
      { title: "Quick start", href: "/docs/quick-start", description: "Add, import, and customize a HaloUI component." },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Liquid material", href: "/docs/liquid-material", description: "The ten-layer optical material engine." },
      {
        title: "Halo Surface",
        href: "/components/halo-surface",
        description: "The base material container used to construct HaloUI surfaces.",
        status: "preview",
        keywords: ["surface", "material", "substrate", "container", "glass"],
      },
      {
        title: "Halo Edge",
        href: "/components/halo-edge",
        description: "Layered outer and inset optical boundary treatment for translucent materials.",
        status: "preview",
        keywords: ["edge", "boundary", "hairline", "specular", "thickness"],
      },
      {
        title: "Halo Highlight",
        href: "/components/halo-highlight",
        description: "Directional reflected light and specular highlights along the 135° illumination vector.",
        status: "preview",
        keywords: ["highlight", "specular", "reflection", "directional", "lighting"],
      },
      { title: "Accessibility", href: "/docs/accessibility", description: "Keyboard, contrast, semantics, and reduced motion." },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Button",
        href: "/components/button",
        description: "A tactile action surface with accessible interaction states.",
        status: "stable",
        keywords: ["action", "loading", "icon button"],
      },
    ],
  },
  {
    title: "Developers",
    items: [
      { title: "Registry", href: "/docs/registry", description: "Source-owned distribution through the shadcn registry." },
      { title: "Theming", href: "/docs/theming", description: "Adapt material, color, and motion tokens." },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Showcase", href: "/showcase", description: "Interfaces built with HaloUI." },
    ],
  },
];

export const docsNavItems = docsNavigation.flatMap((section) => section.items);

export function getDocsPagination(pathname: string) {
  const normalizedPath = pathname === "/docs/introduction" ? "/docs" : pathname;
  const index = docsNavItems.findIndex((item) => item.href === normalizedPath);

  return {
    previous: index > 0 ? docsNavItems[index - 1] : undefined,
    next: index >= 0 && index < docsNavItems.length - 1 ? docsNavItems[index + 1] : undefined,
  };
}
