"use client";

import * as React from "react";
import { Copy01Icon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";
import { cn } from "@/lib/utils";

type TokenItem = {
  token: string;
  lightValue: string;
  darkValue: string;
  purpose: string;
  category: "Surface" | "Edge" | "Highlight" | "Diffusion" | "Shadow" | "Refraction & Physics";
};

const TOKENS: TokenItem[] = [
  // Surface
  {
    token: "--halo-surface",
    lightValue: "rgba(255, 255, 255, 0.72)",
    darkValue: "rgba(22, 23, 26, 0.7)",
    purpose: "Base translucent body tint for standard cards and controls.",
    category: "Surface",
  },
  {
    token: "--halo-surface-elevated",
    lightValue: "rgba(255, 255, 255, 0.88)",
    darkValue: "rgba(30, 32, 38, 0.85)",
    purpose: "Luminous body for raised buttons, active states, and modals.",
    category: "Surface",
  },
  {
    token: "--halo-surface-recessed",
    lightValue: "rgba(0, 0, 0, 0.03)",
    darkValue: "rgba(0, 0, 0, 0.45)",
    purpose: "Recessed surface cavity for inputs and track backgrounds.",
    category: "Surface",
  },
  // Edge
  {
    token: "--halo-edge",
    lightValue: "rgba(255, 255, 255, 0.9)",
    darkValue: "rgba(255, 255, 255, 0.14)",
    purpose: "1px primary optical boundary separating surface from substrate.",
    category: "Edge",
  },
  {
    token: "--halo-edge-inner",
    lightValue: "inset 0 1px 1px 0 rgba(255,255,255,0.9)",
    darkValue: "inset 0 1px 1px 0 rgba(255,255,255,0.2)",
    purpose: "Neoskeuomorphic directional specular reflection along top inner rim.",
    category: "Edge",
  },
  {
    token: "--halo-edge-bright",
    lightValue: "rgba(255, 255, 255, 1)",
    darkValue: "rgba(255, 255, 255, 0.28)",
    purpose: "Enhanced rim catch for hover, focused, and selected states.",
    category: "Edge",
  },
  // Highlight
  {
    token: "--halo-highlight",
    lightValue: "linear-gradient(135deg, ...)",
    darkValue: "linear-gradient(135deg, ...)",
    purpose: "Directional 135° specular gradient wash across surface plane.",
    category: "Highlight",
  },
  {
    token: "--halo-highlight-strength",
    lightValue: "0.85",
    darkValue: "0.55",
    purpose: "Multiplier governing highlight luminance across themes.",
    category: "Highlight",
  },
  // Diffusion
  {
    token: "--halo-blur-sm",
    lightValue: "8px",
    darkValue: "8px",
    purpose: "Light diffusion for dense interfaces and supporting controls.",
    category: "Diffusion",
  },
  {
    token: "--halo-blur-md",
    lightValue: "16px",
    darkValue: "16px",
    purpose: "Default balanced diffusion for standard components.",
    category: "Diffusion",
  },
  {
    token: "--halo-blur-lg",
    lightValue: "28px",
    darkValue: "28px",
    purpose: "Rich diffusion for floating docks, modals, and showcase panels.",
    category: "Diffusion",
  },
  // Shadow
  {
    token: "--halo-shadow-contact",
    lightValue: "0 1px 2px -0.5px rgba(0,0,0,0.08)",
    darkValue: "0 1px 2px -0.5px rgba(0,0,0,0.4)",
    purpose: "Immediate tight contact shadow anchoring surface to substrate.",
    category: "Shadow",
  },
  {
    token: "--halo-shadow-elevated",
    lightValue: "0 6px 16px -4px rgba(0,0,0,0.08)",
    darkValue: "0 8px 24px -4px rgba(0,0,0,0.65)",
    purpose: "Default multi-stop elevation drop shadow.",
    category: "Shadow",
  },
  {
    token: "--halo-shadow-ambient",
    lightValue: "0 16px 36px -8px rgba(0,0,0,0.1)",
    darkValue: "0 20px 48px -12px rgba(0,0,0,0.85)",
    purpose: "Wide atmospheric ambient shadow for floating elements.",
    category: "Shadow",
  },
  // Refraction & Physics
  {
    token: "--halo-refraction-strength",
    lightValue: "0.12",
    darkValue: "0.18",
    purpose: "Refractive index multiplier governing edge hairline displacement.",
    category: "Refraction & Physics",
  },
  {
    token: "--halo-noise-opacity",
    lightValue: "0.025",
    darkValue: "0.035",
    purpose: "Subtle fractal turbulence mask eliminating digital banding.",
    category: "Refraction & Physics",
  },
];

export function MaterialTokenTable() {
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const categories = ["All", "Surface", "Edge", "Highlight", "Diffusion", "Shadow", "Refraction & Physics"];

  const filteredTokens =
    selectedCategory === "All"
      ? TOKENS
      : TOKENS.filter((t) => t.category === selectedCategory);

  const copyToken = (name: string) => {
    navigator.clipboard.writeText(`var(${name})`);
    setCopiedToken(name);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  return (
    <div className="my-6 rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/40 p-4 text-xs">
        <div>
          <span className="font-semibold text-foreground">Material Token Reference</span>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Declared in <code className="font-mono text-[10px]">styles/halo-tokens.css</code>
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "rounded-md border px-2 py-0.5 text-[11px] font-medium transition-colors",
                selectedCategory === cat
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/20 text-muted-foreground font-mono text-[10px] uppercase tracking-wider">
              <th className="py-2.5 px-4 font-semibold">Token</th>
              <th className="py-2.5 px-4 font-semibold hidden md:table-cell">Light Value</th>
              <th className="py-2.5 px-4 font-semibold hidden md:table-cell">Dark Value</th>
              <th className="py-2.5 px-4 font-semibold">Physical Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredTokens.map((item) => (
              <tr key={item.token} className="hover:bg-muted/30 transition-colors">
                <td className="py-2.5 px-4 font-mono font-medium text-foreground whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <code>{item.token}</code>
                    <button
                      type="button"
                      onClick={() => copyToken(item.token)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded"
                      title="Copy var() token"
                    >
                      <HaloIcon
                        icon={copiedToken === item.token ? CheckmarkCircle01Icon : Copy01Icon}
                        size={12}
                        className={copiedToken === item.token ? "text-emerald-500" : ""}
                      />
                    </button>
                  </div>
                </td>
                <td className="py-2.5 px-4 font-mono text-[11px] text-muted-foreground hidden md:table-cell truncate max-w-[180px]">
                  {item.lightValue}
                </td>
                <td className="py-2.5 px-4 font-mono text-[11px] text-muted-foreground hidden md:table-cell truncate max-w-[180px]">
                  {item.darkValue}
                </td>
                <td className="py-2.5 px-4 text-[11px] text-muted-foreground leading-relaxed">
                  {item.purpose}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
