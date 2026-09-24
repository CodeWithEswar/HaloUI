declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const frontmatter: {
    title: string;
    description: string;
    category?: string;
    order?: number;
    status?: "experimental" | "preview" | "stable" | "deprecated";
    component?: string;
    registry?: string;
    updated?: string;
  };

  const MDXContent: ComponentType;
  export default MDXContent;
}
