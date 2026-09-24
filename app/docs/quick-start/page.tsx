import type { Metadata } from "next";
import Content, { frontmatter } from "@/content/docs/quick-start.mdx";

export const metadata: Metadata = { title: frontmatter.title, description: frontmatter.description };
export default function QuickStartPage() { return <Content />; }
