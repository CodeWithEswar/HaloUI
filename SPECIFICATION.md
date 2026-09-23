# HaloUI Product & Design-System Specification

## 1. Research Findings & Product Direction

HaloUI is designed as more than a visual glassmorphism library. Its scope is informed by the structure of modern component ecosystems such as **shadcn/ui** and accessible primitive systems such as **Radix**, while establishing an independent visual language, interaction model, documentation experience, and registry architecture.

The objective is **not to reproduce or visually reskin existing component libraries**.

Instead, HaloUI uses established component-system patterns as a baseline for expected functionality while introducing its own:
- liquid-glass material system;
- optical depth model;
- neoskeuomorphic interaction language;
- kinetic motion system;
- editorial presentation;
- component preview environment;
- developer documentation experience;
- registry workflow;
- showcase system;
- accessibility standards;
- component quality model.

HaloUI functions as both a **design system** and a **developer product**.

---

### 1.1 The Catalog Family Architecture
The HaloUI component registry is organized into clearly defined families to support complete product experiences:
1. **Foundations & Material**: Halo Surface, Halo Edge, Halo Highlight, Halo Glow, Halo Noise, Halo Refraction Layer, Halo Focus Ring, Halo Motion Presets, Halo Background, Halo Scrim, Halo Portal Surface.
2. **Actions**: Button, Icon Button, Button Group, Split Button, Toggle, Toggle Group, Floating Action Button, Segmented Control.
3. **Forms & Fields**: Field, Field Group, Label, Input, Search Input, Password Input, Textarea, Select, Combobox, Multi-Select, Checkbox, Radio Group, Switch, Slider, Range Slider, Input OTP.
4. **Navigation**: Tabs, Breadcrumb, Pagination, Navigation Menu, Menubar, Sidebar, Dock, Stepper, Command Palette.
5. **Overlays & Menus**: Dialog, Alert Dialog, Sheet, Drawer, Popover, Hover Card, Tooltip, Dropdown Menu, Context Menu, Spotlight.
6. **Data Display**: Card, Stat Card, KPI Card, Badge, Avatar, Accordion, Timeline, Code Block.
7. **Feedback & Status**: Alert, Toast, Progress, Circular Progress, Spinner, Skeleton, Empty State.
8. **Layout & Surfaces**: Separator, Aspect Ratio, Scroll Area, Resizable Panels, Glass Panel, Toolbar, Stack, Cluster.
9. **Messaging & Communication**: Message, Chat Composer, Attachment, Typing Indicator, Reaction Bar.
10. **Media & Content**: Image Preview, Lightbox Gallery, Audio Player, Video Player.
11. **Charts & Visualization**: Chart Container, Sparkline, Mini Area Chart, Metric Trend Gauge, Donut Summary.
12. **Workspace & Productivity**: Workspace Switcher, Filter Bar, Density Control, Bulk Action Bar, Inspector Panel.
13. **AI & Agent Interfaces**: AI Prompt Input, AI Response, AI Model Selector, AI Tool Call, Agent Approval Card.
14. **Commerce & SaaS**: Pricing Card, Pricing Grid, Checkout Summary, Usage Meter, Upgrade Banner.
15. **Blocks**: Pre-assembled, installable full-stack application compositions.

---

### 1.2 The Five HaloUI Product Systems
```text
                         HALOUI
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
     COMPONENTS         REGISTRY        DOCUMENTATION
          │                 │                 │
          └────────────┐    │    ┌────────────┘
                       ▼    ▼    ▼
                        PREVIEW
                           │
                           ▼
                       SHOWCASES
```

---

## 2. HaloUI Design Language & Liquid Material System

### 2.1 The Multi-Layer Optical Model
HaloUI models glass as an optical material possessing volumetric depth, surface tension, index of refraction, and environmental lighting reactions.

```text
┌─────────────────────────────────────────────────────────────┐
│  Layer 10: Interaction & Kinetic Physics                    │  (Hover, press compression, magnetic pull)
├─────────────────────────────────────────────────────────────┤
│  Layer 09: Isolated Content Substrate                       │  (WCAG 2.1 AA typography, Hugeicons)
├─────────────────────────────────────────────────────────────┤
│  Layer 08: Micro-Grain Turbulence Mask                      │  (0.025 opacity fractal noise)
├─────────────────────────────────────────────────────────────┤
│  Layer 07: Ambient Luminous Glow                            │  (Selected / focus / active states)
├─────────────────────────────────────────────────────────────┤
│  Layer 06: Contact & Elevated Shadow                        │  (Anchoring multi-stop contact drop)
├─────────────────────────────────────────────────────────────┤
│  Layer 05: Refraction Rim Hairline                          │  (1px Fresnel edge displacement)
├─────────────────────────────────────────────────────────────┤
│  Layer 04: Directional Specular Reflection                  │  (135° virtual light highlight)
├─────────────────────────────────────────────────────────────┤
│  Layer 03: Dual Optical Edge                                │  (Inner highlight + outer hairline)
├─────────────────────────────────────────────────────────────┤
│  Layer 02: Background Diffusion                             │  (GPU-bounded 8px–28px blur)
├─────────────────────────────────────────────────────────────┤
│  Layer 01: Base Tint Body                                   │  (Warm paper or deep graphite body)
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Unified Virtual Lighting Model
- **Azimuth / Vector**: Upper-left / upper-center at `135°`.
- **Top-Edge Illumination**: The top border and inner top chamfer always receive the highest specular luminescence.
- **Bottom-Edge Grounding**: The bottom border transitions to a dark hairline catch, grounding the surface.

### 2.3 Neoskeuomorphic Elevation Tiers
1. **Inset / Recessed**: 4px blur, inner shadow (`inset 0 1px 2px rgba(0,0,0,0.06)`).
2. **Base / Flat**: 8px blur, contact shadow (`var(--halo-shadow-contact)`).
3. **Raised (Default)**: 16px blur, contact + elevated shadow (`var(--halo-shadow-elevated)`).
4. **Floating**: 28px blur, elevated + ambient shadow (`var(--halo-shadow-ambient)`).
5. **Overlay / Modal**: 44px blur, deep ambient occlusion (`0 24px 64px -12px rgba(0,0,0,0.25)`).

### 2.4 Material Intensity Spectrum
- **Subtle**: 8px blur, 0.40 highlight multiplier (tables, inputs, dense UI).
- **Balanced (Default)**: 16px blur, 0.85 highlight multiplier (buttons, cards, standard UI).
- **Rich**: 28px blur, 1.20 highlight multiplier + ambient glow (hero CTAs, docks, showcase).

### 2.5 Motion Timing & Proprietary Tactile Curve
- **Micro Interactions**: 50ms – 150ms.
- **State Changes**: 100ms – 220ms.
- **Component Reveals**: 200ms – 400ms.
- **Navigation Transitions**: 250ms – 600ms.
- **Tactile Curve**: `cubic-bezier(0.2, 0.8, 0.3, 1)`.
- **Reduced Motion**: When `prefers-reduced-motion: reduce` is enabled, magnetic pull is disabled and transitions collapse to instantaneous state changes (`0.01ms`).

---

## 3. System Architecture

| Plane | Subsystems | Responsibilities |
| :--- | :--- | :--- |
| **Experience Plane** | Marketing, docs, catalog, search, showcases, theme lab | Human discovery and learning. |
| **Component Plane** | Foundations, primitives, composites, blocks | Canonical installable UI source. |
| **Registry Plane** | Manifest, item definitions, dependency graph, build output | Machine distribution. |
| **Preview Plane** | Sandbox frame, backgrounds, theme, viewport, state controls | Interactive evaluation. |
| **Reference Plane** | Props extraction, anatomy, dependency/file views | Developer reference. |
| **Quality Plane** | A11y, interaction, visual, registry, performance tests | Release gates. |
| **Release Plane** | Validation, changelog, versioning, publishing | Controlled delivery. |

### 3.1 End-to-End Flow
Specification → canonical component → tests → examples → showcase composition → MDX documentation → props/API extraction → registry item → dependency validation → clean-install test → public docs + registry publication.

### 3.2 Architectural Rule
Component source and registry metadata are authoritative. Documentation consumes them. The website must not maintain a second hidden implementation of the same public component.

---

## 4. System Design

### 4.1 Optical Material Stack

| Layer | Purpose | Examples |
| :--- | :--- | :--- |
| **Base tint** | Provides fallback readability and material body. | neutral, tinted, elevated |
| **Backdrop diffusion** | Softens content behind the surface. | blur strengths |
| **Edge** | Separates transparent surface from background. | outer border, inset border |
| **Specular highlight** | Creates reflected-light impression. | top-left sweep, radial glint |
| **Contact shadow** | Anchors material to nearby surfaces. | small ambient/contact shadow |
| **Ambient glow** | Adds selective luminous depth. | focus glow, active glow |
| **Texture** | Reduces sterile/banded surfaces. | subtle noise/grain |
| **Motion** | Communicates physical response. | press, lift, settle, reveal |

### 4.2 State Model

| State | Visual Requirement | Behavior Requirement |
| :--- | :--- | :--- |
| **Default** | Clear hierarchy without excessive shine. | No unexpected animation. |
| **Hover** | Small optical/position response. | Pointer only; not required for understanding. |
| **Focus-visible** | High-contrast focus treatment. | Keyboard discoverable. |
| **Pressed** | Tactile compression/depth change. | Immediate response. |
| **Selected** | Persistent state beyond hover. | Semantics exposed. |
| **Disabled** | Lower prominence while remaining legible. | Non-interactive. |
| **Loading** | Progress/activity indication. | Prevent accidental duplicate action when appropriate. |
| **Invalid** | Error state remains visible over glass. | Error association announced. |
| **Open/Expanded** | Overlay/disclosure state visible. | ARIA state synchronized. |

