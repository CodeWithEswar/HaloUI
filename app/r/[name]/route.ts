import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const cleanName = name.replace(/\.json$/, "");

  try {
    const cwd = process.cwd();

    if (cleanName === "button") {
      const buttonPath = path.join(cwd, "components", "ui", "button.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [buttonContent, tokensContent] = await Promise.all([
        fs.readFile(buttonPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "button",
        type: "registry:ui",
        title: "Button",
        description:
          "A text or icon-supported action control with HaloUI material, semantic variants, accessible interaction states, and consistent keyboard behavior.",
        dependencies: [
          "@radix-ui/react-slot",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/button.tsx",
            content: buttonContent,
            type: "registry:ui",
            target: "components/ui/button.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-surface": "rgba(255, 255, 255, 0.72)",
            "--halo-surface-elevated": "rgba(255, 255, 255, 0.88)",
            "--halo-edge": "rgba(255, 255, 255, 0.9)",
            "--halo-edge-soft": "rgba(0, 0, 0, 0.08)",
            "--halo-focus-color": "#0284c7",
          },
          dark: {
            "--halo-surface": "rgba(22, 23, 26, 0.7)",
            "--halo-surface-elevated": "rgba(30, 32, 38, 0.85)",
            "--halo-edge": "rgba(255, 255, 255, 0.14)",
            "--halo-edge-soft": "rgba(255, 255, 255, 0.06)",
            "--halo-focus-color": "#38bdf8",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "actions",
          accessibility: "WCAG 2.1 AA",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "icon-button") {
      const iconButtonPath = path.join(cwd, "components", "ui", "icon-button.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [iconButtonContent, tokensContent] = await Promise.all([
        fs.readFile(iconButtonPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "icon-button",
        type: "registry:ui",
        title: "Icon Button",
        description:
          "A compact icon-only control for common actions, with mandatory accessible naming, HaloUI material states, and consistent keyboard and touch behavior.",
        dependencies: [
          "@radix-ui/react-slot",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/icon-button.tsx",
            content: iconButtonContent,
            type: "registry:ui",
            target: "components/ui/icon-button.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-surface": "rgba(255, 255, 255, 0.72)",
            "--halo-surface-elevated": "rgba(255, 255, 255, 0.88)",
            "--halo-edge": "rgba(255, 255, 255, 0.9)",
            "--halo-edge-soft": "rgba(0, 0, 0, 0.08)",
            "--halo-focus-color": "#0284c7",
          },
          dark: {
            "--halo-surface": "rgba(22, 23, 26, 0.7)",
            "--halo-surface-elevated": "rgba(30, 32, 38, 0.85)",
            "--halo-edge": "rgba(255, 255, 255, 0.14)",
            "--halo-edge-soft": "rgba(255, 255, 255, 0.06)",
            "--halo-focus-color": "#38bdf8",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "actions",
          accessibility: "WCAG 2.1 AA",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "button-group") {
      const buttonGroupPath = path.join(cwd, "components", "ui", "button-group.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [buttonGroupContent, tokensContent] = await Promise.all([
        fs.readFile(buttonGroupPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "button-group",
        type: "registry:ui",
        title: "Button Group",
        description:
          "Visually connects related independent actions while preserving the semantics, focus behavior, and activation model of each control.",
        dependencies: [
          "@radix-ui/react-slot",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/button-group.tsx",
            content: buttonGroupContent,
            type: "registry:ui",
            target: "components/ui/button-group.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "actions",
          accessibility: "WCAG 2.1 AA",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "split-button") {
      const splitButtonPath = path.join(cwd, "components", "ui", "split-button.tsx");
      const iconPath = path.join(cwd, "components", "icons", "halo-icon.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [splitButtonContent, iconContent, tokensContent] = await Promise.all([
        fs.readFile(splitButtonPath, "utf-8"),
        fs.readFile(iconPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "split-button",
        type: "registry:ui",
        title: "Split Button",
        description:
          "Combines a primary immediate action with a secondary menu of closely related alternative actions.",
        dependencies: [
          "@base-ui/react",
          "@hugeicons/core-free-icons",
          "@hugeicons/react",
          "@radix-ui/react-slot",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        registryDependencies: ["button"],
        files: [
          {
            path: "components/ui/split-button.tsx",
            content: splitButtonContent,
            type: "registry:ui",
            target: "components/ui/split-button.tsx",
          },
          {
            path: "components/icons/halo-icon.tsx",
            content: iconContent,
            type: "registry:ui",
            target: "components/icons/halo-icon.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "actions",
          accessibility: "WCAG 2.1 AA",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "toggle") {
      const togglePath = path.join(cwd, "components", "ui", "toggle.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [toggleContent, tokensContent] = await Promise.all([
        fs.readFile(togglePath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "toggle",
        type: "registry:ui",
        title: "Toggle",
        description:
          "A two-state action control that communicates and changes a persistent pressed or unpressed state.",
        dependencies: [
          "@base-ui/react",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/toggle.tsx",
            content: toggleContent,
            type: "registry:ui",
            target: "components/ui/toggle.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-surface": "rgba(255, 255, 255, 0.72)",
            "--halo-surface-elevated": "rgba(255, 255, 255, 0.88)",
            "--halo-edge": "rgba(255, 255, 255, 0.9)",
            "--halo-edge-soft": "rgba(0, 0, 0, 0.08)",
            "--halo-focus-color": "#0284c7",
          },
          dark: {
            "--halo-surface": "rgba(22, 23, 26, 0.7)",
            "--halo-surface-elevated": "rgba(30, 32, 38, 0.85)",
            "--halo-edge": "rgba(255, 255, 255, 0.14)",
            "--halo-edge-soft": "rgba(255, 255, 255, 0.06)",
            "--halo-focus-color": "#38bdf8",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "actions",
          accessibility: "WCAG 2.1 AA",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "toggle-group") {
      const toggleGroupPath = path.join(cwd, "components", "ui", "toggle-group.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [toggleGroupContent, tokensContent] = await Promise.all([
        fs.readFile(toggleGroupPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "toggle-group",
        type: "registry:ui",
        title: "Toggle Group",
        description: "Single- or multi-selection set of toggles.",
        dependencies: [
          "@base-ui/react",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        registryDependencies: ["toggle"],
        files: [
          {
            path: "components/ui/toggle-group.tsx",
            content: toggleGroupContent,
            type: "registry:ui",
            target: "components/ui/toggle-group.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-surface": "rgba(255, 255, 255, 0.72)",
            "--halo-surface-elevated": "rgba(255, 255, 255, 0.88)",
            "--halo-edge": "rgba(255, 255, 255, 0.9)",
            "--halo-edge-soft": "rgba(0, 0, 0, 0.08)",
            "--halo-focus-color": "#0284c7",
          },
          dark: {
            "--halo-surface": "rgba(22, 23, 26, 0.7)",
            "--halo-surface-elevated": "rgba(30, 32, 38, 0.85)",
            "--halo-edge": "rgba(255, 255, 255, 0.14)",
            "--halo-edge-soft": "rgba(255, 255, 255, 0.06)",
            "--halo-focus-color": "#38bdf8",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "actions",
          accessibility: "WCAG 2.1 AA",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "floating-action-button") {
      const fabPath = path.join(cwd, "components", "ui", "floating-action-button.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [fabContent, tokensContent] = await Promise.all([
        fs.readFile(fabPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "floating-action-button",
        type: "registry:ui",
        title: "Floating Action Button",
        description:
          "A prominent floating control for exposing a high-priority contextual action above the surrounding interface.",
        dependencies: [
          "@radix-ui/react-slot",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/floating-action-button.tsx",
            content: fabContent,
            type: "registry:ui",
            target: "components/ui/floating-action-button.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-surface": "rgba(255, 255, 255, 0.72)",
            "--halo-surface-elevated": "rgba(255, 255, 255, 0.88)",
            "--halo-edge": "rgba(255, 255, 255, 0.9)",
            "--halo-edge-soft": "rgba(0, 0, 0, 0.08)",
            "--halo-focus-color": "#0284c7",
          },
          dark: {
            "--halo-surface": "rgba(22, 23, 26, 0.7)",
            "--halo-surface-elevated": "rgba(30, 32, 38, 0.85)",
            "--halo-edge": "rgba(255, 255, 255, 0.14)",
            "--halo-edge-soft": "rgba(255, 255, 255, 0.06)",
            "--halo-focus-color": "#38bdf8",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "actions",
          accessibility: "WCAG 2.1 AA",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "copy-button") {
      const copyButtonPath = path.join(cwd, "components", "ui", "copy-button.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [copyButtonContent, tokensContent] = await Promise.all([
        fs.readFile(copyButtonPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "copy-button",
        type: "registry:ui",
        title: "Copy Button",
        description:
          "Copies text to the clipboard and provides short-lived accessible feedback when the operation succeeds or fails.",
        dependencies: [
          "@hugeicons/react",
          "@hugeicons/core-free-icons",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        registryDependencies: ["halo-icon"],
        files: [
          {
            path: "components/ui/copy-button.tsx",
            content: copyButtonContent,
            type: "registry:ui",
            target: "components/ui/copy-button.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-surface": "rgba(255, 255, 255, 0.72)",
            "--halo-surface-elevated": "rgba(255, 255, 255, 0.88)",
            "--halo-edge": "rgba(255, 255, 255, 0.9)",
            "--halo-edge-soft": "rgba(0, 0, 0, 0.08)",
            "--halo-focus-color": "#0284c7",
          },
          dark: {
            "--halo-surface": "rgba(22, 23, 26, 0.7)",
            "--halo-surface-elevated": "rgba(30, 32, 38, 0.85)",
            "--halo-edge": "rgba(255, 255, 255, 0.14)",
            "--halo-edge-soft": "rgba(255, 255, 255, 0.06)",
            "--halo-focus-color": "#38bdf8",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "actions",
          accessibility: "WCAG 2.1 AA",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "favorite-button") {
      const favoriteButtonPath = path.join(cwd, "components", "ui", "favorite-button.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [favoriteButtonContent, tokensContent] = await Promise.all([
        fs.readFile(favoriteButtonPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "favorite-button",
        type: "registry:ui",
        title: "Favorite Button",
        description:
          "A specialized persistent toggle action for saving, bookmarking, or favoriting items across sessions.",
        dependencies: [
          "@base-ui/react",
          "@hugeicons/react",
          "@hugeicons/core-free-icons",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        registryDependencies: ["halo-icon"],
        files: [
          {
            path: "components/ui/favorite-button.tsx",
            content: favoriteButtonContent,
            type: "registry:ui",
            target: "components/ui/favorite-button.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-surface": "rgba(255, 255, 255, 0.72)",
            "--halo-surface-elevated": "rgba(255, 255, 255, 0.88)",
            "--halo-edge": "rgba(255, 255, 255, 0.9)",
            "--halo-edge-soft": "rgba(0, 0, 0, 0.08)",
            "--halo-focus-color": "#0284c7",
          },
          dark: {
            "--halo-surface": "rgba(22, 23, 26, 0.7)",
            "--halo-surface-elevated": "rgba(30, 32, 38, 0.85)",
            "--halo-edge": "rgba(255, 255, 255, 0.14)",
            "--halo-edge-soft": "rgba(255, 255, 255, 0.06)",
            "--halo-focus-color": "#38bdf8",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "actions",
          accessibility: "WCAG 2.1 AA",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "segmented-control") {
      const segmentedControlPath = path.join(cwd, "components", "ui", "segmented-control.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [segmentedControlContent, tokensContent] = await Promise.all([
        fs.readFile(segmentedControlPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "segmented-control",
        type: "registry:ui",
        title: "Segmented Control",
        description:
          "A compact control for switching between a small set of mutually exclusive modes or values.",
        dependencies: [
          "@base-ui/react",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        registryDependencies: ["halo-icon"],
        files: [
          {
            path: "components/ui/segmented-control.tsx",
            content: segmentedControlContent,
            type: "registry:ui",
            target: "components/ui/segmented-control.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-surface": "rgba(255, 255, 255, 0.72)",
            "--halo-surface-elevated": "rgba(255, 255, 255, 0.88)",
            "--halo-edge": "rgba(255, 255, 255, 0.9)",
            "--halo-edge-soft": "rgba(0, 0, 0, 0.08)",
            "--halo-focus-color": "#0284c7",
          },
          dark: {
            "--halo-surface": "rgba(22, 23, 26, 0.7)",
            "--halo-surface-elevated": "rgba(30, 32, 38, 0.85)",
            "--halo-edge": "rgba(255, 255, 255, 0.14)",
            "--halo-edge-soft": "rgba(255, 255, 255, 0.06)",
            "--halo-focus-color": "#38bdf8",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "actions",
          accessibility: "WCAG 2.1 AA",
          lastUpdated: "2026-09-25",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "action-bar") {
      const actionBarPath = path.join(cwd, "components", "ui", "action-bar.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [actionBarContent, tokensContent] = await Promise.all([
        fs.readFile(actionBarPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "action-bar",
        type: "registry:ui",
        title: "Action Bar",
        description:
          "A contextual container for organizing actions related to the user's current selection or task.",
        dependencies: [
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        registryDependencies: ["button", "icon-button", "button-group"],
        files: [
          {
            path: "components/ui/action-bar.tsx",
            content: actionBarContent,
            type: "registry:ui",
            target: "components/ui/action-bar.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-surface": "rgba(255, 255, 255, 0.72)",
            "--halo-surface-elevated": "rgba(255, 255, 255, 0.88)",
            "--halo-edge": "rgba(255, 255, 255, 0.9)",
            "--halo-edge-soft": "rgba(0, 0, 0, 0.08)",
            "--halo-focus-color": "#0284c7",
          },
          dark: {
            "--halo-surface": "rgba(22, 23, 26, 0.7)",
            "--halo-surface-elevated": "rgba(30, 32, 38, 0.85)",
            "--halo-edge": "rgba(255, 255, 255, 0.14)",
            "--halo-edge-soft": "rgba(255, 255, 255, 0.06)",
            "--halo-focus-color": "#38bdf8",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "actions",
          accessibility: "WCAG 2.1 AA",
          lastUpdated: "2026-09-25",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "surface" || cleanName === "halo-surface") {
      const surfacePath = path.join(cwd, "components", "haloui", "foundations", "halo-surface.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [surfaceContent, tokensContent] = await Promise.all([
        fs.readFile(surfacePath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "halo-surface",
        type: "registry:ui",
        title: "Halo Surface",
        description: "The base material container used to construct HaloUI surfaces with 10-layer physical liquid optical physics.",
        dependencies: ["@radix-ui/react-slot", "clsx", "tailwind-merge"],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/halo-surface.tsx",
            content: surfaceContent,
            type: "registry:ui",
            target: "components/ui/halo-surface.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-surface": "rgba(255, 255, 255, 0.72)",
            "--halo-surface-elevated": "rgba(255, 255, 255, 0.88)",
            "--halo-surface-strong": "rgba(255, 255, 255, 0.95)",
            "--halo-surface-recessed": "rgba(0, 0, 0, 0.03)",
            "--halo-edge": "rgba(255, 255, 255, 0.9)",
            "--halo-edge-soft": "rgba(0, 0, 0, 0.08)",
            "--halo-blur-md": "16px",
          },
          dark: {
            "--halo-surface": "rgba(22, 23, 26, 0.7)",
            "--halo-surface-elevated": "rgba(30, 32, 38, 0.85)",
            "--halo-surface-strong": "rgba(38, 41, 48, 0.95)",
            "--halo-surface-recessed": "rgba(0, 0, 0, 0.45)",
            "--halo-edge": "rgba(255, 255, 255, 0.14)",
            "--halo-edge-soft": "rgba(255, 255, 255, 0.06)",
            "--halo-blur-md": "16px",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "foundations",
          accessibility: "WCAG 2.1 AA",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "edge" || cleanName === "halo-edge") {
      const edgePath = path.join(cwd, "components", "haloui", "foundations", "halo-edge.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [edgeContent, tokensContent] = await Promise.all([
        fs.readFile(edgePath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "halo-edge",
        type: "registry:ui",
        title: "Halo Edge",
        description:
          "Layered outer and inset optical boundary treatment for translucent HaloUI materials.",
        dependencies: ["@radix-ui/react-slot", "clsx", "tailwind-merge"],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/halo-edge.tsx",
            content: edgeContent,
            type: "registry:ui",
            target: "components/ui/halo-edge.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-edge": "rgba(255, 255, 255, 0.9)",
            "--halo-edge-soft": "rgba(0, 0, 0, 0.08)",
            "--halo-edge-bright": "rgba(255, 255, 255, 1)",
            "--halo-edge-inner":
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.04)",
            "--halo-edge-outer": "0 0 0 1px rgba(0, 0, 0, 0.06)",
          },
          dark: {
            "--halo-edge": "rgba(255, 255, 255, 0.14)",
            "--halo-edge-soft": "rgba(255, 255, 255, 0.06)",
            "--halo-edge-bright": "rgba(255, 255, 255, 0.28)",
            "--halo-edge-inner":
              "inset 0 1px 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.6)",
            "--halo-edge-outer": "0 0 0 1px rgba(255, 255, 255, 0.08)",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "foundations",
          accessibility: "WCAG 2.1 AA (Decorative)",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "highlight" || cleanName === "halo-highlight") {
      const highlightPath = path.join(cwd, "components", "haloui", "foundations", "halo-highlight.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [highlightContent, tokensContent] = await Promise.all([
        fs.readFile(highlightPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "halo-highlight",
        type: "registry:ui",
        title: "Halo Highlight",
        description:
          "Directional reflected-light and restrained specular treatment communicating surface orientation and physical material response against HaloUI's 135° virtual light vector.",
        dependencies: ["@radix-ui/react-slot", "clsx", "tailwind-merge"],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/halo-highlight.tsx",
            content: highlightContent,
            type: "registry:ui",
            target: "components/ui/halo-highlight.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-highlight":
              "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.15) 35%, rgba(255, 255, 255, 0) 100%)",
            "--halo-highlight-strength": "0.85",
          },
          dark: {
            "--halo-highlight":
              "linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.04) 38%, rgba(255, 255, 255, 0) 100%)",
            "--halo-highlight-strength": "0.55",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "foundations",
          accessibility: "WCAG 2.1 AA (Decorative)",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "noise" || cleanName === "halo-noise") {
      const noisePath = path.join(cwd, "components", "haloui", "foundations", "halo-noise.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [noiseContent, tokensContent] = await Promise.all([
        fs.readFile(noisePath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "halo-noise",
        type: "registry:ui",
        title: "Halo Noise",
        description:
          "Subtle material grain and high-frequency procedural texture used to reduce sterile gradient banding and impart physical tooth to HaloUI liquid glass surfaces.",
        dependencies: ["@radix-ui/react-slot", "clsx", "tailwind-merge"],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/halo-noise.tsx",
            content: noiseContent,
            type: "registry:ui",
            target: "components/ui/halo-noise.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-noise-opacity": "0.025",
          },
          dark: {
            "--halo-noise-opacity": "0.035",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "foundations",
          accessibility: "WCAG 2.1 AA (Decorative)",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "glow" || cleanName === "halo-glow") {
      const glowPath = path.join(cwd, "components", "haloui", "foundations", "halo-glow.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [glowContent, tokensContent] = await Promise.all([
        fs.readFile(glowPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "halo-glow",
        type: "registry:ui",
        title: "Halo Glow",
        description:
          "Ambient luminous layer used selectively for active state, emphasis, or focus-adjacent depth.",
        dependencies: ["@radix-ui/react-slot", "clsx", "tailwind-merge"],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/halo-glow.tsx",
            content: glowContent,
            type: "registry:ui",
            target: "components/ui/halo-glow.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-glow": "rgba(0, 0, 0, 0.04)",
          },
          dark: {
            "--halo-glow": "rgba(255, 255, 255, 0.04)",
          },
        },
        meta: {
          status: "preview",
          version: "1.0.0",
          category: "foundations",
          accessibility: "WCAG 2.1 AA (Decorative)",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "refraction" || cleanName === "halo-refraction-layer") {
      const refractionPath = path.join(cwd, "components", "haloui", "foundations", "halo-refraction-layer.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [refractionContent, tokensContent] = await Promise.all([
        fs.readFile(refractionPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "halo-refraction-layer",
        type: "registry:ui",
        title: "Halo Refraction Layer",
        description:
          "Optional progressive-enhancement optical layer that introduces restrained environmental distortion to selected HaloUI materials with a guaranteed non-refraction fallback.",
        dependencies: ["@radix-ui/react-slot", "clsx", "tailwind-merge"],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/halo-refraction-layer.tsx",
            content: refractionContent,
            type: "registry:ui",
            target: "components/ui/halo-refraction-layer.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-refraction-strength": "0.12",
            "--halo-refraction-offset": "1.5px",
          },
          dark: {
            "--halo-refraction-strength": "0.18",
          },
        },
        meta: {
          status: "experimental",
          version: "1.0.0",
          category: "foundations",
          accessibility: "WCAG 2.1 AA (Decorative)",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "focus-ring" || cleanName === "halo-focus-ring") {
      const focusPath = path.join(cwd, "components", "haloui", "foundations", "halo-focus-ring.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [focusContent, tokensContent] = await Promise.all([
        fs.readFile(focusPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "halo-focus-ring",
        type: "registry:ui",
        title: "Halo Focus Ring",
        description:
          "Shared high-contrast focus-visible treatment for HaloUI interactive components. Operates independently outside the optical material boundary to guarantee unambiguous keyboard accessibility.",
        dependencies: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/halo-focus-ring.tsx",
            content: focusContent,
            type: "registry:ui",
            target: "components/ui/halo-focus-ring.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-focus-color": "#0284c7",
            "--halo-focus-offset": "2px",
            "--halo-focus-width": "2px",
            "--halo-focus-offset-color": "#ffffff",
            "--halo-focus-outer-color": "rgba(2, 132, 199, 0.25)",
            "--halo-focus-shadow":
              "0 0 0 2px #ffffff, 0 0 0 4px #0284c7, 0 0 0 5.5px rgba(2, 132, 199, 0.25)",
          },
          dark: {
            "--halo-focus-color": "#38bdf8",
            "--halo-focus-offset": "2px",
            "--halo-focus-width": "2px",
            "--halo-focus-offset-color": "#0c0d0f",
            "--halo-focus-outer-color": "rgba(56, 189, 248, 0.35)",
            "--halo-focus-shadow":
              "0 0 0 2px #0c0d0f, 0 0 0 4px #38bdf8, 0 0 0 5.5px rgba(56, 189, 248, 0.35)",
          },
        },
        meta: {
          status: "production",
          version: "1.0.0",
          category: "foundations",
          accessibility: "WCAG 2.1 AA (Criteria 2.4.7 & 2.4.11)",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "motion-presets" || cleanName === "halo-motion-presets") {
      const motionPath = path.join(cwd, "components", "haloui", "foundations", "halo-motion-presets.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [motionContent, tokensContent] = await Promise.all([
        fs.readFile(motionPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "halo-motion-presets",
        type: "registry:ui",
        title: "Halo Motion Presets",
        description:
          "Central motion vocabulary standardizing press compression, elevation lift, spring-settle entrance, and graceful reduced-motion fallbacks across HaloUI.",
        dependencies: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/halo-motion-presets.tsx",
            content: motionContent,
            type: "registry:ui",
            target: "components/ui/halo-motion-presets.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        cssVars: {
          light: {
            "--halo-duration-micro": "120ms",
            "--halo-duration-state": "180ms",
            "--halo-duration-reveal": "240ms",
            "--halo-duration-settle": "320ms",
            "--halo-ease-tactile": "cubic-bezier(0.2, 0.8, 0.3, 1)",
            "--halo-ease-spring": "cubic-bezier(0.16, 1, 0.3, 1)",
          },
          dark: {},
        },
        meta: {
          status: "production",
          version: "1.0.0",
          category: "foundations",
          accessibility: "WCAG 2.1 AA (Criteria 2.3.3 Compliant)",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "theme-provider" || cleanName === "halo-theme-provider") {
      const themePath = path.join(cwd, "components", "haloui", "foundations", "halo-theme-provider.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [themeContent, tokensContent] = await Promise.all([
        fs.readFile(themePath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "halo-theme-provider",
        type: "registry:ui",
        title: "Halo Theme Provider",
        description:
          "Orchestrates HaloUI light, dark and system visual themes together with shared optical material intensity defaults.",
        dependencies: ["next-themes"],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/halo-theme-provider.tsx",
            content: themeContent,
            type: "registry:ui",
            target: "components/ui/halo-theme-provider.tsx",
          },
          {
            path: "styles/halo-tokens.css",
            content: tokensContent,
            type: "registry:ui",
            target: "styles/halo-tokens.css",
          },
        ],
        meta: {
          status: "production",
          version: "1.0.0",
          category: "foundations",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "background" || cleanName === "halo-background") {
      const bgPath = path.join(cwd, "components", "haloui", "foundations", "halo-background.tsx");
      const bgContent = await fs.readFile(bgPath, "utf-8");

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "halo-background",
        type: "registry:ui",
        title: "Halo Background",
        description:
          "Reference background environments for testing and evaluating translucent liquid materials against diverse optical substrates.",
        dependencies: ["clsx", "tailwind-merge"],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/halo-background.tsx",
            content: bgContent,
            type: "registry:ui",
            target: "components/ui/halo-background.tsx",
          },
        ],
        meta: {
          status: "production",
          version: "1.0.0",
          category: "foundations",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "portal-surface" || cleanName === "halo-portal-surface") {
      const portalPath = path.join(cwd, "components", "haloui", "foundations", "halo-portal-surface.tsx");
      const portalContent = await fs.readFile(portalPath, "utf-8");

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "halo-portal-surface",
        type: "registry:ui",
        title: "Halo Portal Surface",
        description:
          "Consistent liquid-glass material wrapper for portalled floating overlays, modal dialogs, popovers, and menus.",
        dependencies: ["@radix-ui/react-slot", "clsx", "tailwind-merge"],
        registryDependencies: ["halo-surface", "halo-highlight", "halo-edge"],
        files: [
          {
            path: "components/ui/halo-portal-surface.tsx",
            content: portalContent,
            type: "registry:ui",
            target: "components/ui/halo-portal-surface.tsx",
          },
        ],
        meta: {
          status: "production",
          version: "1.0.0",
          category: "foundations",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    if (cleanName === "scrim" || cleanName === "halo-scrim") {
      const scrimPath = path.join(cwd, "components", "haloui", "foundations", "halo-scrim.tsx");
      const scrimContent = await fs.readFile(scrimPath, "utf-8");

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "halo-scrim",
        type: "registry:ui",
        title: "Halo Scrim",
        description:
          "Backdrop and scrim treatment positioned behind modal dialogs and overlays with calibrated optical diffusion blur and ambient darkness.",
        dependencies: ["@radix-ui/react-slot", "clsx", "tailwind-merge"],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/halo-scrim.tsx",
            content: scrimContent,
            type: "registry:ui",
            target: "components/ui/halo-scrim.tsx",
          },
        ],
        meta: {
          status: "production",
          version: "1.0.0",
          category: "foundations",
          lastUpdated: "2026-09-24",
        },
      };

      return NextResponse.json(registryItem);
    }

    // Fallback: check public/r/[cleanName].json
    const staticFilePath = path.join(cwd, "public", "r", `${cleanName}.json`);
    const fileContent = await fs.readFile(staticFilePath, "utf-8");
    return new NextResponse(fileContent, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Registry item '${cleanName}' not found` },
      { status: 404 }
    );
  }
}
