import type { Metadata } from "next";
import { ArrowRight01Icon, SparklesIcon } from "@hugeicons/core-free-icons";
import { HaloBackground } from "@/components/haloui/foundations/halo-background";
import { HaloButton } from "@/components/haloui/button/halo-button";

export const metadata: Metadata = { title: "Button default preview" };

export default function ButtonDefaultPreviewPage() {
  return (
    <div data-preview-route className="min-h-dvh">
      <HaloBackground environment="neutral" className="min-h-dvh">
        <div className="flex min-h-dvh items-center justify-center p-8">
          <HaloButton magnetic leftIcon={SparklesIcon} rightIcon={ArrowRight01Icon}>
            Confirm action
          </HaloButton>
        </div>
      </HaloBackground>
    </div>
  );
}
