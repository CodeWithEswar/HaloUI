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

    if (cleanName === "surface") {
      const surfacePath = path.join(cwd, "components", "haloui", "foundations", "halo-surface.tsx");
      const tokensPath = path.join(cwd, "styles", "halo-tokens.css");

      const [surfaceContent, tokensContent] = await Promise.all([
        fs.readFile(surfacePath, "utf-8"),
        fs.readFile(tokensPath, "utf-8"),
      ]);

      const registryItem = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "surface",
        type: "registry:ui",
        title: "Halo Surface",
        description: "Foundational 10-layer physical liquid material substrate component.",
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
        meta: {
          status: "stable",
          version: "1.0.0",
          category: "foundations",
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
