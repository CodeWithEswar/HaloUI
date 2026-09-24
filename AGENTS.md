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
7. **Strict Prohibition of ASCII / Text Architecture Diagrams**: Never generate ASCII, plain-text, terminal-style, or code-block-based architecture diagrams (`language="text"`, arrows `↓`, pipes `│`, box-drawing characters). Code blocks are strictly reserved for developer code. Replace workflows with `<ProcessSteps />`, architecture with responsive SVG/HTML semantic nodes, comparisons with `<SourceOwnershipComparison />` or tables, and hierarchies with `<FileTree />`. Documentation visuals must use neutral shadcn tokens with strictly zero glass.

---

# HaloUI Documentation — Global Visual Diagram & Content Presentation Rule

## 1. Strictly Prohibited
Never create diagrams such as:
- Flowcharts or pipelines inside code blocks (`language="text"` or fences).
- Unicode/ASCII box-drawing trees (`├──`, `└──`, `│`, `┌`, `└`).
- Text arrows (`↓`, `→`, `▲`, `▼`, `->`, `-->`, `==>`).
- Terminal-style architecture flowcharts.

These formats are completely banned in documentation pages.

## 2. Code Blocks Are Strictly for Code
A documentation `CodeBlock` must contain actual developer code: TypeScript, TSX, CSS, JSON, Shell/Bash, or config. Irrelevant UI chrome (`TEXT · N LINES`, line numbers, copy buttons) must NEVER wrap conceptual architecture.

## 3. Replace Conceptual Diagrams with Native Documentation UI
- **Sequential Workflows**: Use `<ProcessSteps />` (desktop: clean horizontal rail; mobile: vertical rail; neutral border/background, no glass, no glowing connectors).
- **Architecture Relationships**: Use clean responsive SVG/HTML diagrams (`<ProductArchitecture />`) with semantic nodes and 1px muted connectors.
- **Comparisons**: Use structured two-column comparison cards (`<SourceOwnershipComparison />`) or semantic markdown tables.
- **File & Directory Structures**: Use the interactive `<FileTree />` primitive, never raw text trees.
- **Simple Concepts**: Prefer one clear, well-written sentence over an unnecessary diagram.

## 4. Hierarchy of Presentation
1. Prose (preferred when simple)
2. Semantic List
3. Table (for structured comparison)
4. `<ProcessSteps />` (when order and workflow matter)
5. Purpose-built semantic SVG/HTML visual (when spatial/architectural relationships matter)
6. Complex interactive SVG only when genuinely required

## 5. Documentation Visual Neutrality
All documentation visual components must follow standard neutral shadcn tokens (`border-border`, `bg-background`, `bg-muted/30`, `text-foreground`, `text-muted-foreground`). Strictly NO glassmorphism, no liquid blurs, no glowing connectors, and no floating effects in documentation visuals. Liquid glass is reserved exclusively for the HaloUI registry components being showcased.

