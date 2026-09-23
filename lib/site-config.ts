export const siteConfig = {
  name: "HaloUI",
  wordmark: "HaloUI",
  tagline: "Build interfaces that feel alive.",
  description:
    "HaloUI is a source-owned React component registry built around accessible liquid materials, thoughtful interaction, and the shadcn/ui ecosystem.",
  url: "https://haloui.dev",
  links: {
    github: "https://github.com/haloui/haloui",
  },
  mainNav: [
    { title: "Docs", href: "/docs" },
    { title: "Components", href: "/components" },
    { title: "Showcase", href: "/showcase" },
    { title: "Themes", href: "/themes" },
  ],
  footerNav: {
    product: [
      { title: "Components", href: "/components" },
      { title: "Button Spec", href: "/components/button" },
      { title: "Showcase", href: "/showcase" },
      { title: "Themes", href: "/themes" },
    ],
    resources: [
      { title: "Documentation", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Liquid Material", href: "/docs/liquid-material" },
      { title: "Registry Architecture", href: "/docs/registry" },
      { title: "Accessibility", href: "/docs/accessibility" },
    ],
    project: [
      { title: "GitHub", href: "https://github.com/haloui/haloui", external: true },
      { title: "Changelog", href: "/changelog" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
