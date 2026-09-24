import type { Metadata } from "next";
import Content, { frontmatter } from "@/content/docs/introduction.mdx";

export const metadata: Metadata = {
  title: frontmatter.title,
  description: frontmatter.description,
};

export default function IntroductionPage() {
  return <Content />;
}
