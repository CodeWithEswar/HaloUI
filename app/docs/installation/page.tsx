import type { Metadata } from "next";
import Content, { frontmatter } from "@/content/docs/installation.mdx";

export const metadata: Metadata = { title: frontmatter.title, description: frontmatter.description };
export default function InstallationPage() { return <Content />; }
