import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rating Input — HaloUI Forms & Fields",
  description:
    "An accessible single-value rating control for choosing a score from an ordered icon-based scale.",
};

export default function RatingInputLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
