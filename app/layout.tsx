import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { CodePreferencesProvider } from "@/components/code/code-preferences-provider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
      className={cn("antialiased", fontMono.variable, geist.variable, "font-sans")}
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
      </body>
    </html>
  );
}
