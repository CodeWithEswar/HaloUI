import type { Metadata } from "next";
import Content, { frontmatter } from "@/content/docs/accessibility.mdx";

export const metadata: Metadata = { title: frontmatter.title, description: frontmatter.description };
export default function AccessibilityPage() { return <Content />; }
