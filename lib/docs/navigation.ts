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
    title: "Foundations & Material",
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
      {
        title: "Halo Glow",
        href: "/components/halo-glow",
        description: "Ambient luminous layer for emphasis, active state, or focus-adjacent depth.",
        status: "preview",
        keywords: ["glow", "ambient", "emphasis", "active", "luminous", "aura"],
      },
      {
        title: "Halo Noise",
        href: "/components/halo-noise",
        description: "Subtle material grain and high-frequency procedural texture reducing gradient banding.",
        status: "preview",
        keywords: ["noise", "grain", "texture", "banding", "dither", "tactile"],
      },
      {
        title: "Halo Refraction Layer",
        href: "/components/halo-refraction-layer",
        description: "Optional progressive-enhancement optical distortion for selected HaloUI materials.",
        status: "experimental",
        keywords: ["refraction", "meniscus", "distortion", "optical", "dispersion", "progressive enhancement"],
      },
      {
        title: "Halo Focus Ring",
        href: "/components/halo-focus-ring",
        description: "Shared high-contrast focus-visible treatment for HaloUI interactive components.",
        status: "stable",
        keywords: ["focus", "focus-ring", "keyboard", "accessibility", "a11y", "focus-visible"],
      },
      {
        title: "Halo Motion Presets",
        href: "/components/halo-motion-presets",
        description: "Central motion vocabulary standardizing press, lift, reveal, settle, and float behavior.",
        status: "stable",
        keywords: ["motion", "presets", "animation", "kinetic", "press", "lift", "reveal", "transition"],
      },
      {
        title: "Halo Theme Provider",
        href: "/components/halo-theme-provider",
        description: "Light/dark/system theme and material-intensity orchestration across the interface tree.",
        status: "stable",
        keywords: ["theme", "provider", "material-intensity", "dark mode", "light mode", "system", "orchestration"],
      },
      {
        title: "Halo Background",
        href: "/components/halo-background",
        description: "Reference backgrounds for testing and evaluating translucent liquid materials.",
        status: "stable",
        keywords: ["background", "testing", "reference", "neutral", "dense", "paper", "spectral", "dark"],
      },
      {
        title: "Halo Portal Surface",
        href: "/components/halo-portal-surface",
        description: "Consistent liquid-glass material wrapper for portalled floating overlays, dialogs, and popovers.",
        status: "stable",
        keywords: ["portal", "overlay", "dialog", "popover", "menu", "floating", "modal"],
      },
      {
        title: "Halo Scrim",
        href: "/components/halo-scrim",
        description: "Backdrop and scrim treatment positioned behind modal dialogs and overlays.",
        status: "stable",
        keywords: ["scrim", "backdrop", "blur", "occlusion", "modal", "sheet", "dialog"],
      },
      { title: "Accessibility", href: "/docs/accessibility", description: "Keyboard, contrast, semantics, and reduced motion." },
    ],
  },
  {
    title: "Actions",
    items: [
      {
        title: "Button",
        href: "/components/button",
        description: "A text or icon-supported action control with HaloUI material, semantic variants, accessible interaction states, and consistent keyboard behavior.",
        status: "preview",
        keywords: ["button", "action", "primary", "secondary", "outline", "ghost", "destructive", "link", "trigger"],
      },
      {
        title: "Icon Button",
        href: "/components/icon-button",
        description: "A compact icon-only action control with mandatory accessible naming and HaloUI material interaction states.",
        status: "preview",
        keywords: ["icon-button", "icon button", "icon", "action", "toolbar", "accessible name", "aria-label", "ghost", "outline", "compact"],
      },
      {
        title: "Button Group",
        href: "/components/button-group",
        description: "Visually connects related independent actions while preserving the semantics, focus behavior, and activation model of each control.",
        status: "preview",
        keywords: ["button-group", "button group", "actions", "connected", "cluster", "toolbar", "orientation", "cluster"],
      },
      {
        title: "Split Button",
        href: "/components/split-button",
        description: "Combines a primary immediate action with a secondary menu of closely related alternative actions.",
        status: "preview",
        keywords: ["split-button", "split button", "action", "menu", "dropdown", "primary action", "secondary menu", "alternative actions"],
      },
      {
        title: "Toggle",
        href: "/components/toggle",
        description: "A two-state action control that communicates and changes a persistent pressed or unpressed state.",
        status: "preview",
        keywords: ["toggle", "pressed", "state", "aria-pressed", "switch", "toolbar", "formatting", "pin", "favorite"],
      },
      {
        title: "Toggle Group",
        href: "/components/toggle-group",
        description: "Single- or multi-selection set of toggles.",
        status: "preview",
        keywords: ["toggle-group", "toggle group", "selection", "single", "multiple", "toolbar", "alignment", "roving tabindex"],
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
