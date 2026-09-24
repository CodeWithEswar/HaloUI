import type { Metadata } from "next";
import Content, { frontmatter } from "@/content/docs/theming.mdx";

export const metadata: Metadata = { title: frontmatter.title, description: frontmatter.description };
export default function ThemingPage() { return <Content />; }
