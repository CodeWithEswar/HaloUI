<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# HaloUI — Senior Frontend Engineer & Design-System Architect Master Directive

## Core Mandates
1. **Source Ownership**: Components distribute directly into consumer repositories through the shadcn registry specification (`registry.json`, `/r/[name].json`).
2. **Liquid Glass is NOT Basic Glassmorphism**: Never reduce HaloUI to `rgba + backdrop-filter: blur`. All surfaces must honor the 10-layer physical optical engine (Base Tint, Diffusion, Optical Edge, 135° Specular Reflection, Refraction Rim, Contact Shadow, Ambient Glow, Micro-Grain Noise, Content Isolation, and Tactile Compression).
3. **Hugeicons Exclusively**: Never mix Lucide, Heroicons, Font Awesome, or Material Icons for HaloUI component icons. Use `@hugeicons/react` and `@hugeicons/core-free-icons` via `@/components/icons/halo-icon`.
4. **Shadcn Separation**:
   - **Layer A (Website UI)**: Normal shadcn/ui components (`Tabs`, `Tooltip`, `Dialog`, `Command`, `DropdownMenu`, etc.) build the documentation site interface.
   - **Layer B (Registry Components)**: HaloUI liquid optical components (`HaloSurface`, `HaloButton`, etc.) are the product being demonstrated and distributed.
5. **Phase-Driven Component Contract**:
   Every component must be completed across all 22 steps: Purpose, Anatomy, Variants, Sizes, States, Accessibility (WCAG 2.1 AA, keyboard focus, reduced motion), Material Intensity (Subtle, Balanced, Rich), Motion, Live Preview Stage (6 backdrops, viewports), Props Table, Registry Definition, and Clean Install Verification before advancing to the next component.
6. **No AI Templates / No Generic SaaS Clutter**: Zero random gradient blobs, centered 3-card clichés, fake metrics, or ungrounded glass cards. Preserve generous whitespace, asymmetric layout rhythm, and kinetic typography.
