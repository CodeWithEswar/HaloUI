<div align="center">

# HaloUI

### Liquid Glass Design System & Component Registry for React & Next.js

A modern, accessible, physics-modeled liquid glass design system and component registry. Distributed directly into your repository through the shadcn CLI registry specification.

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Registry-black?style=flat-square)](https://ui.shadcn.com/)
[![Accessibility](https://img.shields.io/badge/WCAG-2.1_AA-emerald?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

</div>

---

## ✦ Overview

**HaloUI** is not generic glassmorphism. It replaces basic `rgba()` and `backdrop-filter: blur()` hacks with a calibrated **10-layer physical optical engine** designed for high-density enterprise applications, developer tools, and creative interfaces:

1. **Base Tint Layer** — Environmental luminance calibration preventing backdrop bleed.
2. **Environmental Diffusion** — GPU-accelerated blur stages (`8px` subtle, `16px` balanced, `28px` rich).
3. **Optical Boundary Edge** — 1px sub-pixel outer edge catch defining material thickness.
4. **135° Specular Reflection** — Directional virtual light vector generating subtle top-left sheen.
5. **Refraction Rim** — Micro-contrast inner border ensuring boundary separation on bright environments.
6. **Elevation Contact Shadow** — Coordinated contact and ambient depth shadows across 5 physical depths.
7. **Ambient Glow** — Soft luminous aura for selected interactive states and hero elements.
8. **Micro-Grain Turbulence** — Subtle dithering texture preventing 8-bit banding on dark OLED displays.
9. **Content Isolation Plane** — Strict CSS isolation ensuring 100% text contrast and readability.
10. **Tactile Compression** — Hardware-accelerated physical micro-press interactions (`active:scale-[0.98]`).

---

## ✦ Key Architecture

- **Source Ownership**: No bloated `node_modules` black boxes. Components distribute directly into your codebase via the `shadcn` CLI registry model. You inspect, customize, and own every single line of code.
- **Strict Accessibility (WCAG 2.1 AA)**: Tested and verified across 6 challenging backdrops (Neutral light/dark, Warm Paper, Spectral chromatic gradients, Image textures, Dense UI code streams, and Deep Graphite).
- **Non-Clipping Geometry**: Containers deliberately omit `overflow: hidden` on root elements, preserving external focus rings, tooltips, and floating popovers.
- **Hugeicons Exclusively**: Unified, elegant iconography powered by `@hugeicons/core-free-icons` and `@hugeicons/react`.
- **First-Class Theming**: Native integration with Tailwind CSS custom properties, system dark mode transitions, and semantic token overrides.

---

## ✦ Installation & Usage

HaloUI components are installed using the standard shadcn CLI:

### 1. Add Halo Surface Foundation

```bash
# Using pnpm
pnpm dlx shadcn@latest add http://localhost:3000/r/halo-surface.json

# Using npm
npx shadcn@latest add http://localhost:3000/r/halo-surface.json

# Using bun
bunx --bun shadcn@latest add http://localhost:3000/r/halo-surface.json
```

### 2. Basic Composition

```tsx
import { HaloSurface } from "@/components/ui/halo-surface";

export default function GlassCard() {
  return (
    <HaloSurface
      intensity="balanced"
      elevation="raised"
      className="p-6 rounded-2xl max-w-md space-y-2"
    >
      <span className="text-xs font-mono uppercase text-muted-foreground">
        Foundation Primitive
      </span>
      <h3 className="text-lg font-semibold text-foreground">
        Refractive Substrate
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Coordinates base tint, background diffusion, and 135° directional specular illumination.
      </p>
    </HaloSurface>
  );
}
```

### 3. Polymorphic Elements with `asChild`

HaloUI components support the Radix `asChild` composition pattern:

```tsx
import Link from "next/link";
import { HaloSurface } from "@/components/ui/halo-surface";

export function NavLink() {
  return (
    <HaloSurface asChild elevation="raised" className="block p-4 no-underline">
      <Link href="/docs/foundations">
        <span className="text-sm font-medium">Explore Foundations →</span>
      </Link>
    </HaloSurface>
  );
}
```

---

## ✦ Material Specifications

### Intensity Levels

| Level | Blur Depth | Use Case |
| :--- | :--- | :--- |
| `subtle` | `8px` blur | High-density tables, code editors, data streams, toolbars |
| `balanced` | `16px` blur | Standard cards, popovers, navigation menus (Default) |
| `rich` | `28px` blur | Hero showcases, floating docks, prominent focal overlays |

### Elevation Levels

| Elevation | Visual Expression | Typical Application |
| :--- | :--- | :--- |
| `inset` | Recessed cavity with inner shadow | Search inputs, toggle tracks, wells |
| `base` | Ground plane with 1px contact hairline | Standard cards, list rows, form fields |
| `raised` | Elevated depth with dual edge catch | Active cards, hovering surfaces, floating bars |
| `floating` | Ambient shadow with brightened rim | Dropdown menus, popovers, command palettes |
| `overlay` | Deep dimensional projection | Modal dialogs, drawer sheets, alert dialogs |

---

## ✦ Foundation Roadmap

- [x] **01. Halo Surface** — Foundational material body, diffusion substrate, and elevation anchoring.
- [ ] **02. Halo Edge** — Sub-pixel outer hairlines, contact boundaries, and directional edge catches.
- [ ] **03. Halo Highlight** — 135° virtual light vector providing dynamic specular reflections.
- [ ] **04. Halo Noise** — Shared micro-grain turbulence layer preventing optical banding.
- [ ] **05. Halo Glow** — Controlled luminous aura for selected interactive or hero surfaces.
- [ ] **06. Halo Focus Ring** — High-visibility dual-offset focus rings for keyboard navigation.
- [ ] **07. Halo Motion Presets** — Shared tactile press, spring deceleration, and settlement physics.

---

## ✦ Getting Started with Local Development

```bash
# Clone the repository
git clone https://github.com/CodeWithEswar/HaloUI.git

# Navigate into the project
cd HaloUI

# Install dependencies
pnpm install

# Start the development server with Turbopack
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the interactive documentation and component playground.

---

## ✦ Project Structure

```
├── app/
│   ├── components/         # Component showcase and documentation pages
│   │   ├── button/         # Button component showcase
│   │   └── halo-surface/   # Halo Surface foundation documentation
│   ├── docs/               # Architecture and system documentation
│   │   ├── accessibility/  # WCAG 2.1 AA accessibility guidelines
│   │   ├── registry/       # Source ownership & registry architecture
│   │   └── theming/        # Semantic tokens & custom theme guide
│   └── r/[name]/           # Dynamic shadcn registry API endpoint
├── components/
│   ├── haloui/             # Core liquid glass material primitives
│   │   └── foundations/    # Halo Surface & background substrate
│   ├── ui/                 # Installed shadcn/ui components
│   └── mdx/                # Interactive documentation components
├── content/docs/           # Technical MDX documentation files
├── public/r/               # Static shadcn registry schema & manifests
└── styles/
    └── halo-tokens.css     # Optical material tokens and CSS variables
```

---

## ✦ License

Distributed under the **MIT License**. See `LICENSE` for details.

---

<div align="center">
  Crafted with care by <strong><a href="https://github.com/CodeWithEswar">Eswar</a></strong>
</div>
