"use client"

import * as React from "react"
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  type DropdownMenuContentProps,
} from "@/components/ui/dropdown-menu"
import {
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  type ContextMenuContentProps,
} from "@/components/ui/context-menu"

/**
 * HaloUI Submenu
 *
 * Submenu is a shared nested menu branch component designed to operate within
 * an existing parent menu hierarchy (DropdownMenu, ContextMenu, or Menubar).
 * It preserves WAI-ARIA nested menu semantics, directional triangular hover grace,
 * keyboard expansion/collapse, and HaloUI Balanced Liquid Glass optical styling.
 */

// Dropdown / Menubar Submenu primitives
const Submenu = DropdownMenuSub
const SubmenuTrigger = DropdownMenuSubTrigger
const SubmenuContent = DropdownMenuSubContent

export type SubmenuContentProps = DropdownMenuContentProps

export {
  // Canonical shared aliases
  Submenu,
  SubmenuTrigger,
  SubmenuContent,

  // Direct parent-explicit exports
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
}
