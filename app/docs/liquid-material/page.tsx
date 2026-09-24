import type { Metadata } from "next";
import Content, { frontmatter } from "@/content/docs/liquid-material.mdx";

export const metadata: Metadata = {
  title: `${frontmatter.title} — HaloUI Foundations`,
  description: frontmatter.description,
};

export default function LiquidMaterialPage() {
  return <Content />;
}
