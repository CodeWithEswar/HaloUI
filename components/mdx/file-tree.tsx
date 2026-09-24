"use client";

import * as React from "react";
import { FileCodeIcon, Folder01Icon } from "@hugeicons/core-free-icons";
import { HaloIcon } from "@/components/icons/halo-icon";

export type FileNode = {
  name: string;
  type?: "file" | "folder";
  description?: string;
  children?: FileNode[];
};

export function FileTree({ items }: { items: FileNode[] }) {
  return (
    <div className="my-5 overflow-hidden rounded-xl border border-border bg-muted/15 font-mono text-xs">
      <div className="border-b border-border bg-muted/40 px-3.5 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Generated files
      </div>
      <div className="p-3">
        <ul className="space-y-1">
          {items.map((node) => (
            <TreeItem key={node.name} node={node} level={0} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function TreeItem({ node, level }: { node: FileNode; level: number }) {
  const isFolder = node.type === "folder" || (node.children && node.children.length > 0);

  return (
    <li className="leading-5">
      <div
        className="flex items-center gap-2 py-0.5"
        style={{ paddingLeft: `${level * 16}px` }}
      >
        <span className="shrink-0 text-muted-foreground">
          <HaloIcon icon={isFolder ? Folder01Icon : FileCodeIcon} size={14} />
        </span>
        <span className={isFolder ? "font-semibold text-foreground" : "text-foreground"}>
          {node.name}
        </span>
        {node.description && (
          <span className="hidden truncate text-[11px] font-sans text-muted-foreground sm:inline">
            — {node.description}
          </span>
        )}
      </div>

      {node.children && node.children.length > 0 && (
        <ul className="relative space-y-1">
          {node.children.map((child) => (
            <TreeItem key={child.name} node={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}
