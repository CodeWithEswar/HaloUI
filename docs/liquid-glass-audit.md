# Liquid Glass 2.0 material audit

## Reference principles

Reviewed Apple’s [Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/), [Materials](https://developer.apple.com/design/human-interface-guidelines/materials), and [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass). The functional layer belongs above content; geometry, optical separation, restrained interaction, and accessibility preferences must work together. HaloUI implements an original CSS approximation, not Apple's compositor or automatic pixel-based contrast adaptation.

## Existing architecture and dependency map

All twelve foundations exist in `components/haloui/foundations`, with `components/ui/halo-*` forwarding exports. Surface owns tint, blur, shadows and two pseudo-elements. Edge and Highlight additionally render independent optical layers. Noise uses a static SVG texture. Refraction adds three decorative descendants and a second backdrop filter. Glow is explicit. Focus Ring and Motion have shared CSS infrastructure. Theme Provider wraps next-themes. Background supplies deterministic environments. Scrim attenuates modal backgrounds. Portal Surface optionally creates a portal and composes Surface, Edge, Highlight, Noise and Glow.

`styles/halo-tokens.css` is imported by `app/globals.css` and embedded in registry JSON. Button, Input and Select trigger consume `.halo-liquid-glass`; Dock and Command Palette consume `.halo-liquid-glass-surface`. Many other controls share these classes; others still implement their own Tailwind blur/tint/shadows. `components/docs/material/material-lab.tsx` implements a separate toolbar and hard-coded material parameters. `components/docs/preview-stage-shell.tsx` is the canonical preview shell. Registry build scripts embed source and CSS separately; regeneration must preserve transformed consumer imports.

## Concrete problems

| Source | Finding | Consequence |
| --- | --- | --- |
| halo-tokens.css | Surface alpha is .72/.88/.95 in light and .70/.85/.95 in dark | Elevated surfaces suppress environmental transmission |
| halo-surface.tsx | Raw 8/16/28px utilities and uniform borders | Competes with tokens and the other engines |
| halo-surface.tsx | refraction/noise/specular props are destructured but unused | Public API does not reflect rendering |
| halo-tokens.css | Button and floating engines duplicate six inset shadows and 45-degree gradients | Optical direction differs from the documented 135-degree source |
| halo-tokens.css | Positive-z reflection overlays cover unwrapped text | Optical content isolation is unreliable |
| halo-refraction-layer.tsx | Nested blur plus scaled full-surface overlay | Extra filter cost without actual displacement |
| halo-portal-surface.tsx | Surface optics are duplicated by Edge/Highlight and raw shadow overrides | Inconsistent thickness and clipped focus |
| material-lab.tsx | Own blur, alpha, noise overrides and animated background decoration | Lab does not reliably exercise production recipes |
| Registry | CSS is copied into individual item payloads | Updating only site CSS would leave consumers on old optics |

## Migration plan and acceptance gate

Preserve existing uncommitted navigation changes. First consolidate shared material rendering, retaining existing class and elevation aliases. Introduce Regular/Clear/Prominent independently of intensity and density. Replace duplicate Edge/Highlight implementations with token consumers; use a cheap perimeter approximation for optional refraction. Provide solid, reduced-motion, increased-contrast and forced-colors fallbacks. Reuse the canonical preview shell for the lab. Visually inspect foundation recipes before broader component migration. Then update affected registry source/CSS, verify representative consumers, and document actual QA limitations. Do not claim full accessibility, native refraction, or all-browser validation from source checks.
