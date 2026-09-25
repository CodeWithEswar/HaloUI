import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Picker — HaloUI Forms & Fields",
  description:
    "An accessible time-only control for selecting a local clock time without introducing a calendar date or timezone.",
};

export default function TimePickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
