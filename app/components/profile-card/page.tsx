import { Metadata } from "next";
import { ProfileCardPreviewStage } from "./profile-card-preview-stage";
import { ProfileCardDemonstrations } from "./profile-card-demonstrations";
import { CodeBlock } from "@/components/mdx/code-block";
import { PropsTable, type PropRow } from "@/components/mdx/props-table";
import { FileTree, type FileNode } from "@/components/mdx/file-tree";
import { InstallCommand } from "@/components/mdx/install-command";
import { Callout } from "@/components/mdx/callout";

export const metadata: Metadata = {
  title: "Profile Card — Data Display — HaloUI",
  description:
    "Compact identity summary surface presenting an entity's avatar, display name, professional role, presence status, metadata, and optional actions.",
};

const PROFILE_CARD_PROPS: PropRow[] = [
  {
    name: "layout",
    type: "'vertical' | 'horizontal'",
    default: "'vertical'",
    required: false,
    description: "Orientation of the profile layout. 'horizontal' formats avatar and identity inline for directories and sidebars.",
  },
  {
    name: "size",
    type: "'default' | 'sm' | 'lg'",
    default: "'default'",
    required: false,
    description: "Sizing scale controlling internal padding and typography scale.",
  },
  {
    name: "intensity",
    type: "'subtle' | 'balanced' | 'rich'",
    default: "'subtle'",
    required: false,
    description: "Optical material intensity inherited from Card. Defaults to 'subtle' for peak rendering speed in dense grids.",
  },
  {
    name: "variant",
    type: "'default' | 'subtle' | 'outline' | 'elevated' | 'ghost'",
    default: "'default'",
    required: false,
    description: "Visual boundary variant. 'outline' provides a pure 1px border with zero blur overhead.",
  },
  {
    name: "interactive",
    type: "boolean",
    default: "false",
    required: false,
    description: "Enables hover lifting and focus ring if navigating to a full profile page.",
  },
  {
    name: "className",
    type: "string",
    default: "undefined",
    required: false,
    description: "Additional CSS classes merged with the Card surface tokens.",
  },
];

const PROFILE_CARD_STATUS_PROPS: PropRow[] = [
  {
    name: "status",
    type: "'online' | 'away' | 'busy' | 'offline'",
    default: "'online'",
    required: false,
    description: "Presence status indicator. Renders an accessible colored dot and accessible label.",
  },
  {
    name: "children",
    type: "ReactNode",
    default: "undefined",
    required: false,
    description: "Optional custom status label overriding the default status string.",
  },
];

const PROFILE_CARD_FILE_TREE: FileNode[] = [
  {
    name: "components",
    type: "folder",
    children: [
      {
        name: "ui",
        type: "folder",
        children: [
          {
            name: "profile-card.tsx",
            type: "file",
            description: "Server Component-compatible ProfileCard surface built directly on Card architecture.",
          },
          {
            name: "card.tsx",
            type: "file",
            description: "Base content surface defining boundary, geometry, and material tokens.",
          },
          {
            name: "avatar.tsx",
            type: "file",
            description: "Image and fallback initials component composed inside the avatar slot.",
          },
        ],
      },
    ],
  },
  {
    name: "styles",
    type: "folder",
    children: [
      {
        name: "halo-tokens.css",
        type: "file",
        description: "Shared typography, spacing, and optical border tokens.",
      },
    ],
  },
];

export default function ProfileCardDocPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground">
            Data Display 04
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Stable
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Profile Card
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Compact identity summary surface presenting an entity's avatar, display name, professional role, presence status, metadata, and optional actions.
        </p>
      </div>

      {/* Live Preview Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Preview
        </h2>
        <ProfileCardPreviewStage />
      </section>

      {/* Architecture Guidance */}
      <div className="space-y-4">
        <Callout type="note" title="Identity Summary — Not An Account Manager">
          Profile Card is strictly an identity presentation component. It does NOT own authentication, authorization, messaging logic, follow states, profile editing, or real-time presence subscriptions. Consumers provide display-ready identity data and compose action handlers.
        </Callout>

        <Callout type="important" title="Media Fidelity & Restrained Glass">
          Translucent liquid glass filters (such as specular highlights or noise) are strictly isolated to the outer Card surface. The avatar media slot never receives parent optical filters that distort facial imagery or reduce photo clarity.
        </Callout>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <InstallCommand registry="profile-card" />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock
          language="tsx"
          filename="profile-card-example.tsx"
          code={`import {
  ProfileCard,
  ProfileCardHeader,
  ProfileCardAvatar,
  ProfileCardIdentity,
  ProfileCardName,
  ProfileCardHandle,
  ProfileCardRole,
  ProfileCardStatus,
  ProfileCardBio,
  ProfileCardActions,
} from "@/components/ui/profile-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function MemberSummary() {
  return (
    <ProfileCard className="max-w-xs">
      <ProfileCardHeader>
        <ProfileCardAvatar>
          <Avatar size="lg">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Eswar" />
            <AvatarFallback>EK</AvatarFallback>
          </Avatar>
        </ProfileCardAvatar>
      </ProfileCardHeader>

      <ProfileCardIdentity>
        <div className="flex items-center justify-between gap-2">
          <ProfileCardName>Eswar Koneti</ProfileCardName>
          <ProfileCardStatus status="online" />
        </div>
        <ProfileCardHandle>@eswarkoneti</ProfileCardHandle>
        <ProfileCardRole>Staff Design Systems Architect</ProfileCardRole>
      </ProfileCardIdentity>

      <ProfileCardBio>
        Architecting physical optical materials and high-performance design primitives for enterprise dashboards.
      </ProfileCardBio>

      <ProfileCardActions>
        <Button size="sm" className="w-full">Connect</Button>
      </ProfileCardActions>
    </ProfileCard>
  );
}`}
        />
      </section>

      {/* Comparison: Profile Card vs Card vs Profile Page */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Component Boundaries & Scope
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-muted/50 text-foreground font-medium border-b border-border">
              <tr>
                <th className="p-3">Component / View</th>
                <th className="p-3">Primary Responsibility</th>
                <th className="p-3">Scope Boundary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-muted-foreground">
              <tr>
                <td className="p-3 font-medium text-foreground">Card</td>
                <td className="p-3">General-purpose content grouping surface</td>
                <td className="p-3">No identity-specific props or slots</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Profile Card</td>
                <td className="p-3">Compact identity summary (Name, Avatar, Role, Status)</td>
                <td className="p-3">No account management, auth, or extensive bios</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-foreground">Profile Page</td>
                <td className="p-3">Full application view with settings, activity feeds, and permissions</td>
                <td className="p-3">Application concern; composed of many distinct views</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Demonstrations */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Demonstrations & Variants
        </h2>
        <ProfileCardDemonstrations />
      </section>

      {/* Props */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Props Reference
        </h2>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">ProfileCard</h3>
          <PropsTable rows={PROFILE_CARD_PROPS} />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">ProfileCardStatus</h3>
          <PropsTable rows={PROFILE_CARD_STATUS_PROPS} />
        </div>
      </section>

      {/* File Structure */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Registry Structure
        </h2>
        <FileTree items={PROFILE_CARD_FILE_TREE} />
      </section>
    </div>
  );
}
