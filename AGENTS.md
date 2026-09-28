<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

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

---

# HALOUI — GLOBAL COMPONENT PREVIEW & VISUAL SYSTEM UPGRADE
## Apply From Button Through Every Existing and Future Component
## STRICT Liquid Glass + Automatic Responsive Preview Contract

You are working inside the EXISTING HaloUI repository.

This is a GLOBAL upgrade.

Do NOT apply this only to newly created components.

Audit and upgrade EVERY HaloUI component beginning with the first public component:

Button

and continue sequentially through EVERY currently implemented HaloUI component and every future component.

Examples include, but are not limited to:

- Button
- Icon Button
- Button Group
- Split Button
- Toggle
- Toggle Group
- Floating Action Button
- Copy Button
- Favorite Button
- Reaction Button
- Segmented Control
- Action Bar
- all Forms & Fields
- all Navigation components
- all Overlays & Menus
- all Data Display components
- every component added later

The two global requirements are:

# 1. HALOUI LIQUID GLASS MUST BE PRESENT WHERE APPROPRIATE

# 2. EVERY COMPONENT PREVIEW MUST BE AUTOMATICALLY RESPONSIVE

These are NON-OPTIONAL HaloUI system requirements.

Do not simply add a glass wrapper around every preview.

Do not simply add `md:` responsive classes.

Upgrade each component according to its actual semantic role.

---

# 1. FIRST AUDIT THE COMPLETE COMPONENT CATALOG

Before modifying components:

1. inspect the canonical component metadata
2. inspect Registry items
3. inspect component source
4. inspect preview files
5. inspect docs pages
6. inspect HaloUI foundations
7. inspect theme tokens
8. inspect preview infrastructure
9. inspect responsive infrastructure
10. inspect tests

Build an internal inventory containing:

- component name
- category
- registry slug
- source file
- preview file
- docs page
- maturity
- current material usage
- current responsive behavior
- current accessibility behavior
- client/server boundary

Do NOT invent components.

Use the actual repository.

---

# 2. DO NOT REDESIGN EVERYTHING AT ONCE

Upgrade components sequentially.

Recommended order:

1. Actions
2. Forms & Fields
3. Navigation
4. Overlays & Menus
5. Data Display
6. remaining categories

Within each category follow the canonical HaloUI component order.

For each component:

AUDIT
→ MATERIAL
→ RESPONSIVENESS
→ PREVIEW
→ ACCESSIBILITY
→ PERFORMANCE
→ DOCS
→ REGISTRY
→ TEST
→ NEXT

Do not make a huge uncontrolled global CSS change and declare completion.

---

# 3. HALOUI LIQUID GLASS IS NOT GENERIC FROSTED GLASS

STRICTLY avoid reducing HaloUI to:

```css
background: rgba(255, 255, 255, 0.12);
backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

HaloUI Liquid Glass should reuse the established optical foundations.

Conceptually:

Environmental transmission
→ Diffusion
→ Adaptive tint
→ Optical edge
→ Internal reflection
→ Directional highlight
→ Optional restrained refraction
→ Contact shadow
→ Ambient depth
→ Interactive specular response
→ Foreground content

Inspect actual implementation before changing tokens or APIs.

---

# 4. REUSE HALOUI FOUNDATIONS

Use actual existing foundations where appropriate:

* Halo Surface
* Halo Edge
* Halo Highlight
* Halo Noise
* Halo Glow
* Halo Refraction Layer
* Halo Focus Ring
* Halo Motion Presets
* Halo Theme Provider
* Halo Background
* Halo Scrim
* Halo Portal Surface

Do NOT recreate these effects inside every component CSS file.

Bad architecture:

```text
button glass engine
input glass engine
select glass engine
card glass engine
dialog glass engine
```

Correct architecture:

shared Halo optical foundations
+
component-specific composition.

---

# 5. SHARED VIRTUAL LIGHT

All components must feel illuminated by the SAME environment.

Preserve HaloUI's virtual-light direction, conceptually around:

upper-left / upper-center.

Edge, Highlight, shadow and interactive optical response should agree.

Do not make:

Button highlight from left,
Input from right,
Card from bottom,
Popover from center.

The system must feel physically coherent.

---

# 6. LIGHT AND DARK ARE DIFFERENT MATERIAL ENVIRONMENTS

Every upgraded component must have deliberate:

* Light
* Dark
* System

behavior.

Do NOT implement Dark mode by merely inverting Light colors.

Tune:

* transmission
* tint
* optical edge
* highlight
* internal boundary
* shadow
* foreground contrast
* semantic state contrast

for each environment.

---

# 7. MATERIAL INTENSITY MUST DEPEND ON COMPONENT ROLE

Do NOT make every component equally glassy.

Use the established HaloUI hierarchy.

## Restrained / Subtle

Prefer for:

* Button
* Icon Button
* Toggle
* Input
* Search Input
* Password Input
* Textarea
* Select trigger
* Checkbox
* Radio
* Switch
* Slider
* Number Field
* Currency Field
* Phone Field
* URL Field
* OTP
* Tag Input
* Badge
* Status Badge
* Item
* dense form controls

## Subtle / Balanced

Prefer for:

* Card
* Stat Card
* KPI Card
* Profile Card
* Feature Card
* List
* Description List
* Table shell
* Accordion
* Collapsible
* toolbars
* grouped controls

## Balanced / Stronger Material

Appropriate for:

* Select popup
* Combobox popup
* Multi Select popup
* Navigation Menu
* Command Palette
* Popover
* Dropdown Menu
* Context Menu
* Hover Card
* Dialog
* Sheet
* Drawer
* Dock
* Bottom Navigation
* floating Action Bar
* floating contextual controls

## Rich

Use selectively for:

* showcase hero controls
* Dock
* exceptional floating surfaces
* special demonstration previews

Rich is NOT automatically better.

---

# 8. DO NOT APPLY GLASS TO EVERYTHING INSIDE GLASS

Prevent:

Glass Card
→ Glass Item
→ Glass Input
→ Glass Badge
→ Glass Icon Button
→ Glass Tooltip

from becoming visual noise.

Establish material hierarchy.

Outer material can provide environmental context.

Inner controls may use much flatter optical treatment.

---

# 9. CONTENT FIDELITY

Never distort important content.

Do NOT apply Refraction/blur/saturation/noise directly over:

* Avatar images
* screenshots
* logos
* charts
* QR codes
* barcodes
* text
* code
* focus indicators
* table data

Material surrounds content.

It does not destroy it.

---

# 10. HALO GLOW IS EXCEPTIONAL

Do not add Glow merely because a component should look premium.

Glow should be reserved for meaningful exceptional emphasis.

No default Glow for:

* Input
* Checkbox
* Radio
* Badge
* Table cells
* Accordion rows
* List rows
* ordinary Buttons

---

# 11. REFRACTION IS OPTIONAL

Refraction must remain restrained.

Do not make Refraction mandatory for every component.

Never refract:

* text
* icon glyphs
* focus rings
* form values
* Avatar images
* chart content

Prefer localized perimeter distortion if actual Halo architecture supports it.

---

# 12. FOCUS IS NOT A GLASS HIGHLIGHT

Every interactive component must preserve Halo Focus Ring.

Focus must remain distinguishable from:

* hover
* active
* pressed
* selected
* checked
* open
* optical Edge
* Highlight
* Glow

This is mandatory.

---

# 13. GLOBAL AUTOMATIC RESPONSIVE CONTRACT

EVERY component preview must be automatically responsive.

This means the SAME component instance should survive changes in available width.

Do NOT require:

```tsx
mobile={true}
```

Do NOT require separate mobile components unless semantics genuinely differ.

Do NOT use JS viewport detection for basic layout.

---

# 14. RESPONSIVENESS MUST BE CONTAINER-AWARE

A component may be:

300px wide on a 1440px desktop

because it is inside a Sidebar.

Therefore viewport-only breakpoints are insufficient.

Prefer:

* intrinsic CSS
* Flexbox
* CSS Grid
* `minmax()`
* `min-width: 0`
* logical properties
* `clamp()`
* wrapping
* container queries

where appropriate.

---

# 15. DO NOT USE JS FOR BASIC RESPONSIVENESS

Avoid:

```ts
window.innerWidth
```

Avoid:

```ts
window.matchMedia(...)
```

for ordinary component layout.

Avoid per-component ResizeObserver for simple responsive decisions.

CSS should handle layout whenever possible.

---

# 16. GLOBAL WIDTH TEST MATRIX

For EVERY relevant component preview test approximately:

* 240px
* 280px
* 320px
* 360px
* 390px
* 480px
* 640px
* 768px
* 1024px
* 1280px+
* Fluid/resizable container

Not every component needs special styling at every width.

It must simply remain correct.

---

# 17. 200% ZOOM IS MANDATORY

Every component family must be checked at 200% browser zoom.

Verify:

* no clipped content
* no inaccessible controls
* no overlapping labels
* no broken material
* no hidden focus
* no document-level horizontal overflow

---

# 18. LONG CONTENT IS MANDATORY

Every relevant preview must test realistic long content.

Examples:

* long Button text
* long Label
* long Input value
* long Select option
* long menu item
* long Badge
* long Card title
* long Accordion trigger
* long table value
* long URL
* translated-like text

Do not optimize only for short English demo strings.

---

# 19. PREVIEW SYSTEM MUST BE UPGRADED GLOBALLY

Every component page should use the canonical HaloUI Preview system.

Do not create unique preview controls for every component.

Use one shared infrastructure.

---

# 20. PREVIEW TOOLBAR

Every relevant component preview should support the existing/canonical controls:

## Theme

* Light
* Dark
* System

## Background

* Neutral
* Warm Paper
* Spectral
* Image
* Dense UI
* Dark

## Viewport

* Phone
* Tablet
* Laptop
* Desktop
* Fluid

## Motion

* System
* Reduced

And where architecture supports:

* Reset
* Open isolated
* Copy install command
* LTR / RTL

Do not duplicate toolbar implementations.

---

# 21. FLUID MODE IS CRITICAL

Fluid preview should allow continuous container resizing.

This is one of the most important HaloUI QA modes.

The component should adapt while the preview width changes continuously.

Do NOT simply switch among fixed screenshots.

---

# 22. PREVIEW MATERIAL BACKGROUND

Liquid Glass cannot be properly evaluated on plain white only.

Every material-capable component must be tested over:

* Neutral
* Warm Paper
* Spectral
* Image
* Dense UI
* Dark

The background must reveal:

* transmission
* tint
* edge
* highlight
* depth

without compromising content.

---

# 23. PREVIEW SHOULD NOT BECOME DECORATIVE ART

The preview exists to evaluate the component.

Do not surround every preview with:

* giant gradient blobs
* animated aurora
* floating particles
* neon rings
* unnecessary illustrations

The background should test material, not distract from it.

---

# 24. PREVIEW STATES

Every interactive component must expose meaningful states relevant to its semantics.

Potential examples:

* Default
* Hover
* Focus
* Active
* Pressed
* Selected
* Checked
* Indeterminate
* Open
* Disabled
* Invalid
* Loading

ONLY show states the component actually supports.

Do not create a generic state list and pretend every component supports all states.

---

# 25. FOCUS PREVIEW

Every interactive component must have a preview where focus is clearly visible.

Do not rely only on programmatic screenshots.

Keyboard testing is required.

---

# 26. REDUCED MOTION PREVIEW

Components with meaningful motion must demonstrate reduced-motion behavior.

Examples:

* Dialog
* Sheet
* Drawer
* Accordion
* Collapsible
* Select popup
* Dropdown
* Dock
* Toggle
* Switch
* segmented indicator
* Tooltip

Reduced motion must preserve state comprehension.

---

# 27. REDUCED TRANSPARENCY

If HaloUI implements reduced-transparency/high-contrast material behavior, previews must expose/test it where possible.

The component must remain usable without optical transparency.

---

# 28. RESPONSIVE PREVIEW FRAME

The preview frame itself must not lie about component behavior.

Do not scale the component using CSS transform.

Actually change available layout width.

The component must perform real reflow.

---

# 29. PHONE PREVIEW

Phone preview should evaluate approximately narrow mobile widths.

Check:

* touch target
* wrapping
* actions
* overlay fit
* popup width
* keyboard/focus
* horizontal overflow

---

# 30. TABLET PREVIEW

Test intermediate layout behavior.

Do not assume tablet = desktop.

---

# 31. LAPTOP PREVIEW

Check dense application layouts.

---

# 32. DESKTOP PREVIEW

Check full-size composition without making components unnecessarily huge.

---

# 33. COMPONENTS MUST NOT OWN PAGE LAYOUT

Automatic responsiveness does NOT mean components should decide:

* page columns
* dashboard grid
* page max width
* marketing section width

Components respond to their parent.

Parents own macro layout.

---

# 34. ACTIONS FAMILY UPGRADE

Retroactively audit:

* Button
* Icon Button
* Button Group
* Split Button
* Toggle
* Toggle Group
* Floating Action Button
* Copy Button
* Favorite Button
* Reaction Button
* Segmented Control
* Action Bar

For each:

* add appropriate Liquid Glass treatment
* preserve semantics
* add auto-responsive preview
* test long labels
* test narrow width
* test Light/Dark
* test reduced motion
* test focus

---

# 35. BUTTON — MATERIAL REQUIREMENT

Button should use restrained HaloUI material.

Potential optical composition:

Surface

* Edge
* Highlight
* Focus
* Motion

Avoid default:

* Glow
* Refraction
* visible Noise

Primary hierarchy must remain clear.

---

# 36. BUTTON — RESPONSIVE REQUIREMENT

Button must support:

* short text
* long text
* icon + text
* narrow parent
* full-width composition where consumer requests it

Do not arbitrarily shrink text.

Do not clip icons.

---

# 37. ICON BUTTON

Liquid Glass:
restrained optical button surface.

Responsive:
touch target must remain practical.

Do not shrink below usability merely because container is narrow.

Accessible name remains mandatory.

---

# 38. BUTTON GROUP

Liquid Glass:
prefer one coherent grouped material relationship.

Avoid three unrelated glass bubbles if controls are visually grouped.

Responsive:
allow deliberate wrapping/stacking only if group semantics permit.

Do not silently destroy grouping.

---

# 39. SPLIT BUTTON

Material:
shared geometry between primary and secondary controls.

Responsive:
long primary label must not crush menu trigger.

Focus:
each control independently focusable.

---

# 40. TOGGLE / TOGGLE GROUP

Liquid Glass must make:

off
on
hover
focus

distinct.

Selected state cannot rely only on tint.

Responsive Toggle Group must handle long labels and narrow containers without inaccessible clipping.

---

# 41. FLOATING ACTION BUTTON

May use stronger Balanced material than ordinary Button.

Still avoid gratuitous Glow.

Responsive:
do not hard-code fixed page placement into primitive.

---

# 42. COPY / FAVORITE / REACTION BUTTON

Use Button/Toggle foundations.

Do not create separate glass engines.

Responsive:
compact but touch-usable.

State must remain semantic.

---

# 43. SEGMENTED CONTROL

This is a high-value Liquid Glass component.

Use:

* coherent outer material
* restrained selected indicator
* clear focus
* smooth but restrained state transition

Responsive:
long labels must not collapse.

Choose wrapping, overflow, or composition deliberately based on actual architecture.

No JS breakpoint detection.

---

# 44. ACTION BAR

Use coherent shared surface.

Floating Action Bar may use Balanced material.

Responsive:
actions should wrap/reflow/overflow according to actual semantics.

Never hide critical actions automatically.

---

# 45. FORMS & FIELDS FAMILY

Retroactively apply the same contract to ALL forms.

Material must be restrained.

Forms are readability-first.

Use:

Surface

* Edge
* Highlight
* Focus

sparingly.

No heavy Refraction.

No Glow.

No visible Noise across values.

---

# 46. FORM RESPONSIVENESS

All fields must support:

* narrow containers
* long Labels
* long descriptions
* validation messages
* prefixes/suffixes
* actions
* translated content
* 200% zoom

Invalid + Focus remains a permanent QA state.

---

# 47. INPUT GROUP RESPONSIVENESS

Prefixes/suffixes/actions must not crush the editable region.

Use intrinsic layout.

If content cannot fit, define deliberate reflow.

Do not JS-measure.

---

# 48. SELECT / COMBOBOX / MULTI SELECT

Trigger:
restrained Liquid Glass.

Popup:
Halo Portal Surface with stronger material.

Responsive:
popup width/placement must fit narrow screens.

Multi Select tokens must wrap.

No page overflow.

---

# 49. CHECKBOX / RADIO / SWITCH

Use minimal material.

State geometry is more important than glass.

Responsive:
Label wraps while control remains aligned and usable.

Do not make the entire label row an expensive glass Card.

---

# 50. SLIDER / RANGE SLIDER

Track remains visually quiet.

Thumb may use restrained material.

Focus must be distinct.

Responsive:
track uses available width without JS measurement.

---

# 51. FILE UPLOAD

Outer drop surface may use Subtle/Balanced Liquid Glass.

Do not materialize every queued file heavily.

Responsive:
queue rows/actions/progress reflow automatically.

---

# 52. COLOR PICKER

Trigger/surface can use Liquid Glass.

Actual color sample must remain optically faithful.

Do not tint/refract the selected color.

Popup uses Portal Surface.

Responsive layout must survive phone widths.

---

# 53. DATE/TIME COMPONENTS

Trigger:
restrained material.

Calendar/popover:
Portal Surface.

Responsive:
calendar must fit narrow screens or use existing responsive fallback.

Do not invent JS breakpoint logic.

---

# 54. NAVIGATION FAMILY

Apply Liquid Glass selectively.

Strong candidates:

* Navigation Menu
* Sidebar Rail
* Dock
* Bottom Navigation
* Command Palette

Restrained candidates:

* Tabs
* Breadcrumb
* Pagination
* Stepper
* Anchor Navigation
* Back To Top
* Kbd

Do not make Breadcrumb glass.

---

# 55. NAVIGATION RESPONSIVENESS

Navigation components require semantic responsive behavior.

Do not simply hide navigation items.

Test:

* long labels
* translated labels
* narrow parent
* touch
* focus
* current state
* overflow

---

# 56. OVERLAYS & MENUS

These are major Liquid Glass surfaces.

Use:

Portal Surface

* Surface
* Edge
* Highlight
* optional restrained advanced optical effects

Modal components also use Scrim.

---

# 57. OVERLAY RESPONSIVENESS

Every overlay must remain inside viewport/container constraints.

Test:

* phone
* tablet
* desktop
* long content
* virtual keyboard-sensitive layouts where relevant
* 200% zoom

No clipped close buttons.

No inaccessible footer actions.

---

# 58. DIALOG

Balanced Liquid Glass is appropriate.

Do not put glass behind every nested section.

Responsive:
dialog width and max-height adapt.

Long content scrolls intentionally.

---

# 59. SHEET / DRAWER

Use restrained material because surfaces can be large.

Responsive:
content and actions must adapt without horizontal overflow.

Reduced motion must simplify large translations.

---

# 60. POPOVER / MENUS

Portal Surface provides coherent material.

Responsive:
collision/placement belongs to proven positioning primitive.

Do not hand-roll.

---

# 61. TOOLTIP

Very small surface.

Subtle/Balanced material.

Avoid expensive effects.

Responsive:
text wraps within sensible bounds.

---

# 62. DATA DISPLAY

Apply the same contract to:

* Card
* Stat Card
* KPI Card
* Profile Card
* Feature Card
* Badge
* Status Badge
* Avatar
* Avatar Group
* Item
* List
* Description List
* Table
* Data Table
* Accordion
* Collapsible
* every later Data Display component

Follow each component's existing detailed specification.

---

# 63. CARD MATERIAL

Subtle.

No pointer-reactive Rich material in large grids by default.

Responsive:
content-driven.

No fixed height merely for visual alignment.

---

# 64. AVATAR

Do NOT apply Liquid Glass filters to the image.

Only restrained boundary/fallback treatment.

Responsive:
size remains consumer/system controlled.

Image fidelity is mandatory.

---

# 65. AVATAR GROUP

Overlap must remain correct at narrow widths.

Focus ring must not be clipped.

No Refraction/Noise over images.

---

# 66. ITEM

Usually flat/minimal.

If parent already has glass, Item should not add another heavy surface.

Responsive:
leading/content/trailing regions reflow naturally.

---

# 67. LIST

Prefer one coherent Subtle outer material.

Rows mostly flat.

Responsive:
container-aware.

---

# 68. DESCRIPTION LIST

Subtle outer material.

Responsive:
term/value layout automatically changes based on available container width.

Prefer container queries/intrinsic CSS.

---

# 69. TABLE

Subtle outer shell.

No glass per cell.

Responsive:
preserve table semantics and contain horizontal overflow inside table region.

---

# 70. DATA TABLE

Material hierarchy:

outer shell
→ Subtle

toolbar
→ Subtle/Balanced

header
→ restrained

body
→ quiet

selected state
→ semantic

popovers
→ Portal Surface

bulk action bar
→ Balanced

No per-cell glass.

---

# 71. ACCORDION

Subtle/Balanced outer disclosure material.

Items mostly flat.

Trigger responsive.

No heavy glass per Accordion item.

---

# 72. COLLAPSIBLE

Subtle contextual material.

When nested in Card/Sheet/etc., flatten the Collapsible treatment.

---

# 73. PROFESSIONAL PREVIEW PAGE STRUCTURE

Each component docs page should provide a professional component preview.

Recommended order:

1. Component title
2. Category / maturity
3. Description
4. Main interactive preview
5. Preview toolbar
6. Installation
7. Usage
8. Variants
9. States
10. Examples
11. Responsive behavior
12. Liquid Glass behavior
13. Accessibility
14. Props/API Explorer
15. Registry
16. Installed files
17. Related components

Use actual docs architecture.

---

# 74. MAIN PREVIEW

The main preview should demonstrate the component in its most representative configuration.

Do not cram every state into one canvas.

Use additional examples for special states.

---

# 75. PREVIEW CANVAS MATERIAL

The canvas background is an environment.

The component owns its own material.

Do not add an arbitrary glass Card around the component solely because it is in docs.

---

# 76. THEME SWITCHING

Changing preview Theme must update:

* component material
* foreground
* Edge
* Highlight
* shadows
* semantic colors
* portal surfaces

without changing the docs shell theme unless existing preview architecture intentionally does so.

---

# 77. BACKGROUND SWITCHING

Changing preview background must reveal environmental response.

The component should still be legible on all backgrounds.

---

# 78. VIEWPORT SWITCHING

Changing viewport changes ACTUAL available width.

Do not scale the preview.

---

# 79. FLUID RESIZE

Fluid mode should be the definitive responsive test.

Continuously resize from narrow to wide.

No manual component prop changes.

---

# 80. STATE PREVIEWS

For each component, expose only relevant states.

Examples:

Button:
Default / Hover / Focus / Pressed / Disabled

Input:
Default / Focus / Filled / Invalid / Disabled

Select:
Closed / Open / Focus / Disabled

Checkbox:
Unchecked / Checked / Indeterminate / Focus / Disabled

Dialog:
Closed / Open / Long Content / Reduced Motion

Accordion:
Closed / Open / Focus / Disabled

Table:
Default / Long / Overflow

Data Table:
Sorting / Filtering / Selection / Empty

Do not invent unsupported states.

---

# 81. PREVIEW INTERACTION MUST BE REAL

Do not fake open states using screenshots or disconnected CSS.

The preview should use the actual component.

Button should really press.

Dialog should really open.

Accordion should really expand.

Select should really open.

Copy Button should actually invoke its demo clipboard behavior where safe.

---

# 82. NO DUMMY SUCCESS CLAIMS

Do not show:

"Copied!"

unless the demo clipboard action succeeded.

Do not show:

"Saved!"

unless the preview intentionally simulates a documented local demo state.

Never confuse preview simulation with backend success.

---

# 83. RESPONSIVE PREVIEW DOCUMENTATION

Every component docs page must include:

# Responsive behavior

Explain actual:

* intrinsic sizing
* wrapping
* narrow-container behavior
* wide-container behavior
* overflow strategy
* touch behavior
* 200% zoom behavior

Do NOT merely write:

"Fully responsive."

---

# 84. LIQUID GLASS DOCUMENTATION

Every material-capable component page must include:

# Liquid Glass

Explain actual:

* material intensity
* foundations used
* Light behavior
* Dark behavior
* interaction response
* nested-surface behavior
* reduced-transparency fallback
* performance considerations

Do not document optical layers not actually implemented.

---

# 85. COMPONENT-SPECIFIC MATERIAL OVERRIDES

Do not add public props such as:

```tsx
glass
glassIntensity
refraction
glow
blur
```

to every component.

Material should primarily follow semantic recipes.

Expose intensity only where HaloUI architecture genuinely requires it.

Avoid API pollution.

---

# 86. PROPS/API EXPLORER

All components should use the professional shared Props/API Explorer.

Requirements:

* public HaloUI props first
* actual types
* required/optional
* actual defaults
* useful descriptions
* inherited native props separately
* primitive props separately where appropriate
* responsive
* keyboard accessible
* Light/Dark docs theme
* 200% zoom
* no page overflow

Do NOT apply Liquid Glass to the Props Explorer.

---

# 87. PROPS EXPLORER RESPONSIVENESS

Wide:

structured prop columns.

Narrow:

stacked property layout.

Complex TypeScript types must not destroy page width.

Use internal scrolling/expansion where appropriate.

---

# 88. DOCS SHELL REMAINS NEUTRAL

STRICT.

Do NOT apply HaloUI Liquid Glass to:

* global docs header
* left sidebar
* right TOC
* prose
* API tables
* Props Explorer
* code blocks
* search UI
* docs navigation

Only component previews/showcases should demonstrate HaloUI material.

---

# 89. PERFORMANCE BUDGET PHILOSOPHY

Do not achieve a "premium" appearance by multiplying:

* backdrop filters
* SVG filters
* WebGL layers
* observers
* pointer listeners
* animation loops

Repeated components must remain cheap.

---

# 90. REPEATED COMPONENT RULE

Components commonly rendered many times must use especially restrained material.

Examples:

* Badge
* Status Badge
* Avatar
* Item
* TableRow
* TableCell
* Checkbox
* Radio
* List Item

Do not give each one an expensive backdrop-filter.

---

# 91. PORTAL MATERIAL RULE

Portalled content should use Halo Portal Surface.

Examples:

* Select popup
* Combobox popup
* Multi Select
* Popover
* Dropdown
* Context Menu
* Hover Card
* Tooltip
* Navigation Menu flyout

Do not rebuild portal glass independently.

---

# 92. MODAL MATERIAL RULE

Modal components additionally use Halo Scrim.

Scrim only handles visual attenuation.

It does NOT own:

* focus trap
* Escape
* dismissal
* scroll lock
* open state

The underlying accessible overlay primitive owns those behaviors.

---

# 93. MOTION CONTRACT

Use Halo Motion Presets.

Typical ranges remain restrained:

micro:
50–150ms

state:
100–220ms

reveal:
200–500ms

navigation:
250–600ms

Do not make every material response slow and floaty.

---

# 94. REDUCED MOTION CONTRACT

When reduced motion is active:

disable/simplify:

* parallax
* magnetic movement
* floating
* large translation
* refraction animation
* dock magnification
* kinetic type
* large spring effects

Preserve state feedback.

---

# 95. TRANSPARENT BACKGROUND READABILITY

Every material-capable component must be checked against complex backgrounds.

This is mandatory.

A component that only works on plain white does not pass HaloUI material QA.

---

# 96. HIGH CONTRAST / REDUCED TRANSPARENCY

Where architecture supports these preferences:

material must become more opaque/defined rather than disappearing.

Do not depend on translucency to communicate component boundaries.

---

# 97. ACCESSIBILITY CONTRACT

For every interactive component verify:

* correct semantic element
* keyboard operation
* focus visibility
* accessible name
* state communication
* disabled semantics
* touch usability
* zoom/reflow
* color independence
* reduced motion

Liquid Glass is decorative enhancement.

Accessibility does not depend on it.

---

# 98. RTL

Where HaloUI supports RTL:

test:

* logical padding
* icon position
* overlap direction
* menu placement
* chevrons where directional
* segmented controls
* Slider direction
* Table overflow
* Accordion indicators

Do not hard-code left/right where logical properties are appropriate.

---

# 99. SERVER COMPONENT COMPATIBILITY

Do not add `"use client"` just to achieve:

* Liquid Glass
* hover
* responsive CSS
* theme styling
* container queries

Static components should remain Server Component compatible where existing architecture allows.

---

# 100. GLOBAL PREVIEW REGRESSION PAGE

Create/reuse a development-only visual regression route or Storybook-equivalent existing system containing representative components.

Do NOT create a competing production docs architecture.

Use it to compare:

* material consistency
* responsive behavior
* Light
* Dark
* backgrounds
* focus
* density

---

# 101. GLOBAL LIQUID GLASS REGRESSION

Test representative components together:

Button
Input
Select
Checkbox
Switch
Card
Badge
Avatar
Item
List
Table
Accordion
Dialog
Popover
Dock

They should share optical DNA.

They should NOT all have identical material intensity.

---

# 102. GLOBAL RESPONSIVE REGRESSION

Resize representative component groups from approximately:

240px → 1280px

without changing component props.

Check:

* wrapping
* overflow
* alignment
* focus
* touch
* portal placement
* long content
* material geometry

---

# 103. CONCENTRIC GEOMETRY

Nested controls/surfaces should use coherent geometry.

Do not randomly combine unrelated radii.

Examples:

Button inside Action Bar
Input inside Input Group
Badge inside Card
Menu inside Portal Surface

should feel geometrically related.

---

# 104. NO HORIZONTAL PAGE OVERFLOW

This is a global acceptance criterion.

Components may have internal scrolling where semantics require it, such as wide Table.

But a component must not accidentally make the entire page horizontally scroll.

---

# 105. REGISTRY ACCURACY

For every upgraded component, verify Registry metadata still reflects:

* exact files
* exact registry dependencies
* exact package dependencies
* CSS requirements
* token requirements
* maturity

Do not add Halo foundations as dependencies unless source actually imports/requires them according to Registry architecture.

---

# 106. CLEAN INSTALLATION

Do not validate only inside the HaloUI monorepo.

Use existing clean consumer fixture if available.

Install representative components.

Verify:

* imports
* tokens
* styles
* Liquid Glass
* theme
* responsive behavior
* TypeScript
* build

---

# 107. DO NOT CLAIM UNRUN TESTS

Completion reports must distinguish:

* implemented
* inspected
* automatically tested
* manually tested
* not tested
* blocked

Never write:

"All tests pass"

unless they were actually executed successfully.

---

# 108. MIGRATION STRATEGY

Do not break all existing components in one commit-sized conceptual step.

Upgrade category by category.

Recommended checkpoints:

## Phase 1

Shared preview infrastructure.

## Phase 2

Shared Liquid Glass recipe/tokens audit.

## Phase 3

Actions.

## Phase 4

Forms & Fields.

## Phase 5

Navigation.

## Phase 6

Overlays & Menus.

## Phase 7

Data Display.

## Phase 8

Remaining categories.

## Phase 9

Global regression.

---

# 109. DO NOT CREATE "V2" DUPLICATES

Do not create:

* ButtonV2
* GlassButton
* ResponsiveButton
* InputV2
* GlassCard
* TableNew

Upgrade canonical components.

Preserve compatibility where practical.

---

# 110. VISUAL GOAL

The result should feel like one optical system.

Not:

"a collection of components where each author invented glass separately."

Users should perceive:

* shared light
* shared depth
* shared geometry
* shared interaction language
* shared focus language
* shared motion language

with different material intensity based on function.

---

# 111. RESPONSIVE GOAL

Users should be able to place HaloUI components into:

* full pages
* dashboards
* Sidebars
* Cards
* Sheets
* Dialogs
* split panes
* mobile screens

without rebuilding the component.

The component responds to its environment.

---

# 112. PREVIEW QUALITY GOAL

Every preview should answer:

1. What does the component look like?
2. How does it behave?
3. How does it respond to interaction?
4. How does it look in Light?
5. How does it look in Dark?
6. How does Liquid Glass respond to backgrounds?
7. What happens at narrow widths?
8. What happens at wide widths?
9. What happens with long content?
10. What happens with keyboard focus?
11. What happens with reduced motion?
12. What happens at 200% zoom?

If the preview cannot answer these, it is incomplete.

---

# 113. PER-COMPONENT COMPLETION REPORT

After upgrading each component report:

## Component

Exact component.

## Existing Architecture

What was found.

## Liquid Glass

What was changed.

## Material Intensity

Actual level/recipe.

## Light Theme

Actual behavior.

## Dark Theme

Actual behavior.

## Nested Material

How glass-on-glass was avoided.

## Automatic Responsiveness

Actual CSS/layout strategy.

## Container Awareness

Actual behavior.

## Long Content

Actual result.

## 240px QA

Actual result.

## Fluid Resize

Actual result.

## 200% Zoom

Actual result.

## Keyboard

Actual result.

## Focus

Actual result.

## Reduced Motion

Actual result.

## Reduced Transparency

Actual result if supported.

## Performance

Actual findings.

## Preview

Files/changes.

## Documentation

Files/changes.

## Registry

Actual metadata changes.

## Tests

Exact commands/results.

## Build

Actual result.

## Clean Install

Actual result.

## Known Limitations

Real limitations only.

Then proceed to the next component.

---

# 114. STRICT LIQUID GLASS ACCEPTANCE

A component is NOT complete merely because it has:

`backdrop-blur`

or a translucent background.

It passes only if:

* canonical Halo foundations are reused
* optical hierarchy matches its semantic role
* shared virtual light remains coherent
* Light recipe works
* Dark recipe works
* complex backgrounds work
* focus remains distinct
* text/media fidelity is preserved
* reduced transparency has a safe fallback where supported
* performance remains appropriate

---

# 115. STRICT RESPONSIVE ACCEPTANCE

A component is NOT complete merely because it has:

`sm:`
`md:`
`lg:`

classes.

It passes only if:

* actual content reflows correctly
* parent/container width is respected
* narrow placement works even on desktop
* long content works
* translated-like content works
* touch targets remain usable
* 200% zoom works
* no page-level horizontal overflow occurs
* CSS handles layout without unnecessary JS measurement

---

# 116. STARTING POINT — BUTTON

Begin with Button.

Do not jump randomly across the catalog.

For Button first prove:

1. existing Button API is preserved where practical.
2. canonical Halo Surface/Edge/Highlight/Focus/Motion are reused.
3. no duplicate Button glass engine is created.
4. default material remains restrained.
5. Light theme is deliberate.
6. Dark theme is deliberate.
7. hover/pressed/focus/disabled remain distinct.
8. focus is not merely an optical highlight.
9. long labels work.
10. icon + long label works.
11. narrow containers work.
12. 240px preview works.
13. Fluid resizing works.
14. 200% zoom works.
15. reduced motion works.
16. transparent backgrounds remain readable.
17. no unnecessary client JavaScript is added.
18. Preview uses canonical toolbar.
19. documentation explains Liquid Glass and responsive behavior.
20. Props Explorer reflects actual source.

Complete Button.

Produce its report.

Then continue to Icon Button.

Continue sequentially through the complete actual HaloUI catalog.

---

# 117. FINAL GLOBAL ACCEPTANCE

The global migration is complete only when:

* every implemented public component has been audited
* every relevant component has appropriate HaloUI Liquid Glass
* material intensity follows semantic role
* components do not duplicate the optical engine
* all relevant previews expose theme/background/viewport/motion controls
* Fluid mode performs real resizing
* automatic responsiveness is validated
* container-aware behavior is used where appropriate
* Light/Dark/System are verified
* transparent-background readability is verified
* reduced motion is verified
* focus is verified
* 200% zoom is verified
* long content is verified
* no unnecessary JS responsiveness exists
* docs shell remains neutral
* Registry metadata remains accurate
* actual tests/builds are reported truthfully
* clean-install compatibility is validated where tooling allows

---

# FINAL PRINCIPLE

Do not "add glass to every component."

Build one coherent Liquid Glass system.

Do not "make mobile versions."

Build components that automatically adapt.

Do not optimize previews only for screenshots.

Build previews that expose real behavior.

The desired HaloUI system is:

# Liquid Glass by architecture

# responsive by construction

# container-aware by default

# accessible by behavior

# performant by restraint

# source-owned like shadcn

# visually coherent across every component

START WITH BUTTON.

Audit first.

Upgrade Button's material, automatic responsiveness, preview, accessibility, performance, docs, Registry integration, and QA.

Produce the Button report.

Then continue sequentially through every canonical HaloUI component until the final implemented component.


