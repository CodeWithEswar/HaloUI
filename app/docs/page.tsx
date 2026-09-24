import type { Metadata } from "next";
import Introduction, { frontmatter } from "@/content/docs/introduction.mdx";

export const metadata: Metadata = {
  title: frontmatter.title,
  description: frontmatter.description,
};

export default function DocsIndexPage() {
  return <Introduction />;
}
