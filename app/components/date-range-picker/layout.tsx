import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Range Picker — HaloUI Forms & Fields",
  description:
    "An accessible calendar-backed control for selecting a start and end date as one ordered date interval.",
};

export default function DateRangePickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
