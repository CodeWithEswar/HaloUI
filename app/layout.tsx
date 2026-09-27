import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { CodePreferencesProvider } from "@/components/code/code-preferences-provider";

const geist = localFont({
  src: "../public/fonts/Geist-Variable.woff2",
  variable: "--font-sans",
  display: "swap",
});

const fontMono = localFont({
  src: "../public/fonts/GeistMono-Variable.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "HaloUI",
    "shadcn registry",
    "liquid glass",
    "React components",
    "Next.js",
    "neoskeuomorphism",
    "Hugeicons",
    "design system",
  ],
  authors: [{ name: "HaloUI Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased bg-background", fontMono.variable, geist.variable, "font-sans")}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-foreground selection:text-background">
        <a href="#main-content" data-global-skip className="skip-link">
          Skip to content
        </a>
        <a href="#docs-content" data-docs-skip className="skip-link">
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CodePreferencesProvider>
            <TooltipProvider delay={150}>
              <SiteHeader />
              <div id="main-content" tabIndex={-1} className="flex-1 w-full outline-none">{children}</div>
              <SiteFooter />
            </TooltipProvider>
          </CodePreferencesProvider>
        </ThemeProvider>
        {/* Optical Liquid Glass Refraction SVG Filter */}
        <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true">
          <filter id="halo-glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves={2} seed={7} result="noise" />
            <feGaussianBlur in="noise" stdDeviation={2} result="blurred" />
            <feDisplacementMap in="SourceGraphic" in2="blurred" scale={18} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      </body>
    </html>
  );
}
