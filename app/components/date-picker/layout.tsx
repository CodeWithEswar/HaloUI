import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Picker — HaloUI Forms & Fields",
  description:
    "An accessible calendar-backed control for selecting a single calendar date.",
};

export default function DatePickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
