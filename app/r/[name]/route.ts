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
      const buttonPath = path.join(cwd, "components", "haloui", "button", "halo-button.tsx");
      const iconPath = path.join(cwd, "components", "icons", "halo-icon.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [buttonContent, iconContent, tokensContent] = await Promise.all([
        fs.readFile(buttonPath, "utf-8"),
        fs.readFile(iconPath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "button",
        type: "registry:ui",
        title: "Halo Button",
        description:
          "An action surface with physical optical response, neoskeuomorphic depth, tactile compression, and Hugeicons integration.",
        dependencies: [
          "@hugeicons/react",
          "@hugeicons/core-free-icons",
          "@radix-ui/react-slot",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        registryDependencies: [],
        files: [
          {
            path: "components/ui/halo-button.tsx",
            content: buttonContent,
            type: "registry:ui",
            target: "components/ui/halo-button.tsx",
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
        cssVars: {
          light: {
            "--halo-surface": "rgba(255, 255, 255, 0.72)",
            "--halo-surface-elevated": "rgba(255, 255, 255, 0.88)",
            "--halo-edge": "rgba(255, 255, 255, 0.9)",
            "--halo-edge-soft": "rgba(0, 0, 0, 0.08)",
            "--halo-blur-md": "16px",
          },
          dark: {
            "--halo-surface": "rgba(22, 23, 26, 0.7)",
            "--halo-surface-elevated": "rgba(30, 32, 38, 0.85)",
            "--halo-edge": "rgba(255, 255, 255, 0.14)",
            "--halo-edge-soft": "rgba(255, 255, 255, 0.06)",
            "--halo-blur-md": "16px",
          },
        },
        meta: {
          status: "stable",
          version: "1.0.0",
          category: "actions",
          accessibility: "WCAG 2.1 AA",
          lastUpdated: "2026-09-23",
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
